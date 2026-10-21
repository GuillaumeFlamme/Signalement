/** @jsx jsx */
import { React, jsx, css, DataSourceManager, type AllWidgetProps } from 'jimu-core'
import { JimuMapViewComponent, type JimuMapView, loadArcGISJSAPIModules } from 'jimu-arcgis'
import { type IMConfig } from '../config'
import { Triangle } from '../triangle'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Step =
  | 'idle' | 'placing' | 'form' | 'saving' | 'success'
  | 'move' | 'deletePick' | 'deleteConfirm' | 'deleting'
  | 'editPick' | 'editForm' | 'editSaving'

type Mode = 'add' | 'move' | 'delete' | 'edit'

interface Choice { code: string | number, name: string }

type FieldKind =
  | 'text' | 'textarea' | 'int' | 'decimal'
  | 'date' | 'date-only' | 'timestamp-offset' | 'time' | 'choice'

interface FieldDef {
  name: string
  label: string
  kind: FieldKind
  required: boolean
  maxLength?: number
  min?: number
  max?: number
  choices?: Choice[]
}

interface Selected {
  label: string
  iconUrl: string
  color: string
  layer: any
  fields: FieldDef[]
  dataSourceId: string
}

/* ------------------------------------------------------------------ */
/*  Outils : retrouver la couche + construire les champs               */
/* ------------------------------------------------------------------ */

/** Retrouve la couche ArcGIS (FeatureLayer) dans la carte à partir de la source de données choisie */
const resolveLayer = async (jmv: JimuMapView, useDs: any): Promise<any> => {
  if (!jmv?.view || !useDs?.dataSourceId) return null
  const dsId: string = useDs.dataSourceId
  let layer: any = null

  // 1) Via JimuMapView
  try {
    layer = (jmv as any).getJimuLayerViewByDataSourceId?.(dsId)?.layer
  } catch (e) { /* on essaie la suite */ }

  // 2) Via la source de données
  let ds: any = null
  try { ds = DataSourceManager.getInstance().getDataSource(dsId) } catch (e) { /* ignore */ }
  if (!layer) layer = ds?.layer

  // 3) Recherche dans la carte (par id, puis par titre)
  if (!layer) {
    const all: any = jmv.view.map?.allLayers
    if (all) {
      const byId = all
        .filter((l: any) => (ds?.layerId && l.id === ds.layerId) || dsId === l.id || dsId.endsWith('-' + l.id))
        .toArray()
        .sort((a: any, b: any) => String(b.id).length - String(a.id).length)
      layer = byId[0]
      if (!layer) {
        const label = ds?.getLabel?.()
        if (label) layer = all.find((l: any) => l.title === label)
      }
    }
  }

  if (!layer || typeof layer.applyEdits !== 'function') return null
  await layer.load()
  return layer
}

const HIDDEN_FIELD_TYPES = ['oid', 'global-id', 'geometry', 'blob', 'raster', 'guid', 'xml']
const HIDDEN_FIELD_NAMES = ['shape', 'shape__area', 'shape__length', 'st_area(shape)', 'st_length(shape)']

/** Construit la liste des champs à afficher : tous les champs saisissables de la couche */
const buildFields = (layer: any): FieldDef[] => {
  const info = layer.editFieldsInfo || {}
  const tracking = [info.creatorField, info.creationDateField, info.editorField, info.editDateField]
    .filter(Boolean)
    .map((n: string) => n.toLowerCase())

  return (layer.fields || [])
    .filter((f: any) => {
      const n = String(f.name).toLowerCase()
      if (HIDDEN_FIELD_TYPES.includes(f.type)) return false
      if (f.editable === false) return false
      if (HIDDEN_FIELD_NAMES.includes(n)) return false
      if (tracking.includes(n)) return false
      return true
    })
    .map((f: any): FieldDef => {
      const def: FieldDef = {
        name: f.name,
        label: f.alias || f.name,
        kind: 'text',
        required: true // tous les champs du formulaire sont obligatoires
      }

      // Sous-types
      if (f.name === layer.typeIdField && layer.types?.length) {
        def.kind = 'choice'
        def.choices = layer.types.map((t: any) => ({ code: t.id, name: t.name }))
        return def
      }
      // Liste de valeurs (domaine)
      if (f.domain?.type === 'coded-value' && f.domain.codedValues?.length) {
        def.kind = 'choice'
        def.choices = f.domain.codedValues.map((c: any) => ({ code: c.code, name: c.name }))
        return def
      }

      switch (f.type) {
        case 'small-integer':
        case 'integer':
        case 'big-integer':
        case 'long':
          def.kind = 'int'
          break
        case 'single':
        case 'double':
          def.kind = 'decimal'
          break
        case 'date':
          def.kind = 'date'
          break
        case 'date-only':
          def.kind = 'date-only'
          break
        case 'timestamp-offset':
          def.kind = 'timestamp-offset'
          break
        case 'time-only':
          def.kind = 'time'
          break
        default:
          def.kind = (!f.length || f.length >= 100) ? 'textarea' : 'text'
          def.maxLength = f.length || undefined
      }
      if (f.domain?.type === 'range') {
        def.min = f.domain.minValue
        def.max = f.domain.maxValue
      }
      return def
    })
}

/** Met la première lettre en majuscule (champs texte) */
const capitalize = (v: string): string => {
  const i = v.search(/\S/)
  return i < 0 ? v : v.slice(0, i) + v.charAt(i).toUpperCase() + v.slice(i + 1)
}

/** Convertit la saisie en valeur d'attribut. Retourne undefined si vide. */
const toAttribute = (f: FieldDef, raw: string): any => {
  if (raw === undefined || raw === null || raw === '') return undefined
  switch (f.kind) {
    case 'int':
    case 'decimal':
      return Number(raw)
    case 'date': {
      // Midi (heure locale) : évite tout décalage de jour lié aux fuseaux horaires
      const [y, m, d] = raw.split('-').map(Number)
      return new Date(y, m - 1, d, 12, 0, 0).getTime()
    }
    case 'timestamp-offset': {
      const [y, m, d] = raw.split('-').map(Number)
      return new Date(y, m - 1, d, 12, 0, 0).toISOString()
    }
    case 'date-only':
      return raw
    case 'time':
      return raw.length === 5 ? raw + ':00' : raw
    case 'choice': {
      const found = f.choices?.find(c => String(c.code) === raw)
      return found ? found.code : raw
    }
    default:
      return capitalize(raw)
  }
}

/** Inverse de toAttribute : valeur d'attribut existante -> texte du formulaire */
const pad2 = (n: number) => String(n).padStart(2, '0')
const toLocalDate = (d: Date) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`

const fromAttribute = (f: FieldDef, val: any): string => {
  if (val === undefined || val === null || val === '') return ''
  switch (f.kind) {
    case 'date':
    case 'timestamp-offset': {
      const d = new Date(val)
      return isNaN(d.getTime()) ? '' : toLocalDate(d)
    }
    case 'date-only':
      return String(val).slice(0, 10)
    case 'time':
      return String(val)
    default:
      return String(val)
  }
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const S = {
  root: css`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding: 14px;
    background: #fff;
    color: #1f2933;
    font-size: 14px;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  title: css`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  `,
  hint: css`
    margin: 0;
    color: #52606d;
    font-size: 13px;
  `,
  bigBtn: css`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    min-height: 48px;
    padding: 6px 12px;
    box-sizing: border-box;
    border: 1.5px solid var(--c);
    border-radius: 8px;
    background: #fff;
    color: #1f2933;
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s;
    &:hover:not(:disabled) { background: var(--c-soft); }
    &:focus-visible { outline: 3px solid #1f2933; outline-offset: 2px; }
    &:disabled { opacity: 0.55; cursor: default; }
  `,
  row: css`
    display: flex;
    gap: 8px;
    align-items: stretch;
  `,
  iconBtn: css`
    flex: 0 0 auto;
    width: 48px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--c);
    border-radius: 8px;
    background: #fff;
    color: #1f2933;
    cursor: pointer;
    transition: background 0.15s;
    &:hover:not(:disabled) { background: var(--c-soft); }
    &:focus-visible { outline: 3px solid #1f2933; outline-offset: 2px; }
    &:disabled { opacity: 0.55; cursor: default; }
  `,
  notice: css`
    margin: 0;
    padding: 10px 12px;
    border-radius: 6px;
    background: #e8f5e9;
    color: #1b5e20;
    font-size: 13px;
  `,
  banner: css`
    border-radius: 8px;
    padding: 12px;
    background: var(--c-soft);
    border: 1.5px solid var(--c);
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  field: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    label { font-weight: 600; font-size: 13px; }
    .req { color: #c62828; }
    input, select, textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 6px 10px;
      font-size: 14px;
      font-family: inherit;
      color: #1f2933;
      background: #fff;
      border: 1px solid #9aa5b1;
      border-radius: 6px;
    }
    textarea { min-height: 56px; resize: vertical; }
    input:focus, select:focus, textarea:focus {
      outline: 3px solid var(--c);
      outline-offset: 0;
      border-color: var(--c);
    }
  `,
  actions: css`
    display: flex;
    gap: 8px;
    position: sticky;
    bottom: -14px;
    padding: 12px 0 4px;
    margin-top: 4px;
    background: #fff;
  `,
  btn: css`
    flex: 1 1 0;
    min-height: 40px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: 1.5px solid var(--c);
    background: #fff;
    color: #1f2933;
    &:focus-visible { outline: 3px solid #1f2933; outline-offset: 2px; }
    &:disabled { opacity: 0.55; cursor: default; }
    &.primary { background: var(--c); color: #fff; }
  `,
  linkBtn: css`
    border: none;
    background: none;
    padding: 4px 0;
    color: var(--c, #1f2933);
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
    text-align: left;
  `,
  error: css`
    margin: 0;
    padding: 10px 12px;
    border-radius: 6px;
    background: #fdecea;
    color: #8a1c14;
    font-size: 13px;
  `,
  center: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    padding: 24px 8px;
  `
}

/** Éclaircit une couleur hex pour les fonds (mélange avec du blanc) */
const soft = (hex: string): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '')
  if (!m) return '#eef5fb'
  const n = parseInt(m[1], 16)
  const mix = (c: number) => Math.round(c + (255 - c) * 0.9)
  return `rgb(${mix((n >> 16) & 255)}, ${mix((n >> 8) & 255)}, ${mix(n & 255)})`
}

const colorVars = (hex: string): any => ({ '--c': hex, '--c-soft': soft(hex) })

/* Couleurs fixes des 3 actions (identiques pour le bouton et pour le point sélectionné) */
const RED = '#d32f2f'
const GREEN = '#2e7d32'
const ORANGE = '#ef6c00'

type Action = 'delete' | 'move' | 'edit'

const ACTIONS: { [k in Action]: { color: string, fill: number[], path: string } } = {
  delete: { color: RED, fill: [211, 47, 47, 0.12], path: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />' },
  move: { color: GREEN, fill: [46, 125, 50, 0.12], path: '<path d="M12 3v18M3 12h18" /><path d="M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />' },
  edit: { color: ORANGE, fill: [239, 108, 0, 0.12], path: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" />' }
}

/** Picto très léger affiché en fond du rond */
const pictoUrl = (a: Action): string =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${ACTIONS[a].color}" stroke-opacity="0.3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ACTIONS[a].path}</svg>`
  )

/** Rond (bord + fond transparent de la couleur de l'action) + picto en fond */
const makeHighlight = (Graphic: any, geometry: any, a: Action): any[] => [
  new Graphic({
    geometry,
    symbol: { type: 'picture-marker', url: pictoUrl(a), width: 20, height: 20 }
  }),
  new Graphic({
    geometry,
    symbol: { type: 'simple-marker', style: 'circle', color: ACTIONS[a].fill, size: 28, outline: { color: ACTIONS[a].color, width: 3 } }
  })
]

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true
}

const MoveIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3v18M3 12h18" />
    <path d="M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />
  </svg>
)

const FormIcon = () => (
  <svg {...iconProps}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
)

const TrashIcon = () => (
  <svg {...iconProps}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)

/* ------------------------------------------------------------------ */
/*  Widget                                                             */
/* ------------------------------------------------------------------ */

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const types: any[] = (props.config?.types as any) ?? []

  const [jmv, setJmv] = React.useState<JimuMapView>(null)
  const [step, setStep] = React.useState<Step>('idle')
  const [busy, setBusy] = React.useState(false)
  const [selected, setSelected] = React.useState<Selected>(null)
  const [point, setPoint] = React.useState<any>(null)
  const [values, setValues] = React.useState<{ [name: string]: string }>({})
  const [error, setError] = React.useState('')
  const [notice, setNotice] = React.useState('')
  const [target, setTarget] = React.useState<{ oid: any, geometry: any }>(null)
  const [initialValues, setInitialValues] = React.useState<{ [name: string]: string }>({})
  const [done, setDone] = React.useState({ title: 'Signalement enregistré', hint: 'Le point a été ajouté sur la carte.' })

  const reset = React.useCallback(() => {
    setStep('idle')
    setSelected(null)
    setPoint(null)
    setTarget(null)
    setValues({})
    setInitialValues({})
    setError('')
    setNotice('')
    setBusy(false)
  }, [])

  // Si le widget est fermé (bouton du Widget Controller), on repart de zéro
  React.useEffect(() => {
    if ((props as any).state === 'CLOSED') reset()
  }, [(props as any).state, reset])

  /* ---- Prévient les autres widgets (tableau, liste…) que la couche a changé ---- */
  const refreshOthers = (dataSourceId: string) => {
    try {
      const ds: any = DataSourceManager.getInstance().getDataSource(dataSourceId)
      ds?.forceRefresh?.()
    } catch (e) { /* facultatif */ }
  }

  /* ---- Clic sur la carte : ajout / choix du point à supprimer ---- */
  React.useEffect(() => {
    if (!['placing', 'deletePick', 'deleteConfirm', 'editPick'].includes(step) || !jmv?.view) return
    const view: any = jmv.view
    const container: HTMLElement = view.container
    const previousCursor = container?.style.cursor
    if (container) container.style.cursor = 'crosshair'
    try { view.popup?.close?.() } catch (e) { /* ignore */ }

    // Cherche le point existant le plus proche du clic
    const pickFeature = async (mapPoint: any) => {
      try {
        const [Extent]: any[] = await loadArcGISJSAPIModules(['esri/geometry/Extent'])
        const tol = (view.resolution || 1) * 14
        const extent = new Extent({
          xmin: mapPoint.x - tol,
          ymin: mapPoint.y - tol,
          xmax: mapPoint.x + tol,
          ymax: mapPoint.y + tol,
          spatialReference: mapPoint.spatialReference
        })
        const oidField = selected.layer.objectIdField
        const result = await selected.layer.queryFeatures({
          geometry: extent,
          spatialRelationship: 'intersects',
          returnGeometry: true,
          outFields: step === 'editPick' ? ['*'] : [oidField],
          outSpatialReference: view.spatialReference,
          num: 50
        })
        const list: any[] = result?.features || []
        if (list.length === 0) {
          setError('Aucun point à cet endroit. Cliquez directement sur le point.')
          return
        }
        let best = list[0]
        let bestDist = Infinity
        list.forEach(f => {
          const d = Math.hypot(f.geometry.x - mapPoint.x, f.geometry.y - mapPoint.y)
          if (d < bestDist) { bestDist = d; best = f }
        })
        setError('')
        setTarget({ oid: best.attributes[oidField], geometry: best.geometry })
        if (step === 'editPick') {
          const init: { [name: string]: string } = {}
          selected.fields.forEach(f => { init[f.name] = fromAttribute(f, best.attributes[f.name]) })
          setValues(init)
          setInitialValues(init)
          setStep('editForm')
        } else {
          setStep('deleteConfirm')
        }
      } catch (e) {
        setError('Impossible de rechercher le point. Réessayez.')
      }
    }

    // "immediate-click" + stopPropagation : empêche l'ouverture de la fenêtre contextuelle
    const handle = view.on('immediate-click', (event: any) => {
      event.stopPropagation()
      if (!event.mapPoint) return
      if (step === 'placing') {
        setPoint(event.mapPoint)
        setStep('form')
      } else {
        pickFeature(event.mapPoint)
      }
    })

    return () => {
      handle.remove()
      if (container) container.style.cursor = previousCursor || ''
    }
  }, [step, jmv, selected])

  /* ---- Déplacement : maintenir le clic sur un point et le glisser ---- */
  React.useEffect(() => {
    if (step !== 'move' || !jmv?.view || !selected) return
    const view: any = jmv.view
    const layer = selected.layer
    const oidField = layer.objectIdField
    const container: HTMLElement = view.container
    const previousCursor = container?.style.cursor

    let disposed = false
    let features: Array<{ oid: any, geometry: any }> = []
    let dragging: { oid: any, geometry: any } = null
    let saving = false
    let reqId = 0
    let ring: any[] = []
    let preview: any = null
    const handles: any[] = []

    // Points de la couche dans la zone visible (permet un choix instantané au début du glissement)
    const refreshCache = async () => {
      const id = ++reqId
      try {
        const res = await layer.queryFeatures({
          geometry: view.extent,
          spatialRelationship: 'intersects',
          returnGeometry: true,
          outFields: [oidField],
          outSpatialReference: view.spatialReference
        })
        if (!disposed && id === reqId) {
          features = (res.features || []).map((f: any) => ({ oid: f.attributes[oidField], geometry: f.geometry }))
        }
      } catch (e) { /* on réessaiera au prochain arrêt de la carte */ }
    }

    // Point le plus proche du pointeur (en pixels)
    const nearest = (x: number, y: number) => {
      let best: any = null
      let bestDist = 18
      features.forEach(f => {
        const sp = view.toScreen(f.geometry)
        if (!sp) return
        const d = Math.hypot(sp.x - x, sp.y - y)
        if (d < bestDist) { bestDist = d; best = f }
      })
      return best
    }

    loadArcGISJSAPIModules(['esri/Graphic', 'esri/core/reactiveUtils']).then(([Graphic, reactiveUtils]: any[]) => {
      if (disposed) return

      const clearGraphics = () => {
        if (ring.length) view.graphics.removeMany(ring)
        if (preview) view.graphics.remove(preview)
        ring = []
        preview = null
      }

      handles.push(reactiveUtils.watch(
        () => view.stationary,
        (stationary: boolean) => { if (stationary) refreshCache() },
        { initial: true }
      ))

      handles.push(view.on('pointer-move', (e: any) => {
        if (dragging || !container) return
        container.style.cursor = nearest(e.x, e.y) ? 'grab' : (previousCursor || '')
      }))

      handles.push(view.on('drag', async (event: any) => {
        if (event.action === 'start') {
          if (saving) return
          const hit = nearest(event.x, event.y)
          if (!hit) return // pas de point ici : la carte se déplace normalement
          event.stopPropagation()
          dragging = hit
          setError('')
          setNotice('')
          ring = makeHighlight(Graphic, hit.geometry, 'move')
          preview = new Graphic({
            geometry: hit.geometry,
            symbol: { type: 'simple-marker', style: 'circle', color: selected.color, size: 10, outline: { color: '#ffffff', width: 2 } }
          })
          view.graphics.addMany([...ring, preview])
          if (container) container.style.cursor = 'grabbing'
          return
        }

        if (!dragging) return
        event.stopPropagation()

        if (event.action === 'update') {
          const p = view.toMap({ x: event.x, y: event.y })
          preview.geometry = p
          ring.forEach((g: any) => { g.geometry = p })
          return
        }

        if (event.action === 'end') {
          const moved = dragging
          dragging = null
          if (container) container.style.cursor = previousCursor || ''
          const px = Math.hypot(event.x - event.origin.x, event.y - event.origin.y)
          if (px < 4) { clearGraphics(); return } // simple clic, pas de déplacement
          const newGeometry = view.toMap({ x: event.x, y: event.y })
          saving = true
          try {
            const feature = new Graphic({ geometry: newGeometry, attributes: { [oidField]: moved.oid } })
            const result = await layer.applyEdits({ updateFeatures: [feature] })
            const res = result?.updateFeatureResults?.[0]
            if (!res || res.error) throw new Error(res?.error?.message || 'Échec de l’enregistrement')
            moved.geometry = newGeometry
            setNotice('Point déplacé.')
            refreshOthers(selected.dataSourceId)
          } catch (e: any) {
            setError('Le déplacement a échoué. Vérifiez votre connexion et réessayez.' + (e?.message ? ` (${e.message})` : ''))
          } finally {
            saving = false
            clearGraphics()
          }
        }
      }))
    })

    return () => {
      disposed = true
      handles.forEach(h => { try { h.remove() } catch (e) { /* ignore */ } })
      if (ring.length) view.graphics.removeMany(ring)
      if (preview) view.graphics.remove(preview)
      if (container) container.style.cursor = previousCursor || ''
    }
  }, [step, jmv, selected])

  /* ---- Repère temporaire du nouveau point (ajout) ---- */
  React.useEffect(() => {
    if (!point || !jmv?.view || !selected) return
    let graphic: any = null
    let cancelled = false
    loadArcGISJSAPIModules(['esri/Graphic']).then(([Graphic]: any[]) => {
      if (cancelled) return
      graphic = new Graphic({
        geometry: point,
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          color: selected.color,
          size: 16,
          outline: { color: '#ffffff', width: 2.5 }
        }
      })
      jmv.view.graphics.add(graphic)
    })
    return () => {
      cancelled = true
      if (graphic) jmv.view.graphics.remove(graphic)
    }
  }, [point, jmv, selected])

  /* ---- Rond + picto autour du point sélectionné (rouge = supprimer, orange = corriger) ---- */
  React.useEffect(() => {
    if (!target || !jmv?.view) return
    const action: Action = (step === 'editForm' || step === 'editSaving') ? 'edit' : 'delete'
    let graphics: any[] = []
    let cancelled = false
    loadArcGISJSAPIModules(['esri/Graphic']).then(([Graphic]: any[]) => {
      if (cancelled) return
      graphics = makeHighlight(Graphic, target.geometry, action)
      jmv.view.graphics.addMany(graphics)
    })
    return () => {
      cancelled = true
      if (graphics.length) jmv.view.graphics.removeMany(graphics)
    }
  }, [target, jmv, step])

  /* ---- Retour automatique à l'écran de départ après succès ---- */
  React.useEffect(() => {
    if (step !== 'success') return
    const t = window.setTimeout(reset, 4000)
    return () => window.clearTimeout(t)
  }, [step, reset])

  /* ---- Charge la couche d'un type et vérifie les droits ---- */
  const prepareType = async (t: any, mode: Mode): Promise<Selected | null> => {
    setError('')
    setBusy(true)
    try {
      const layer = await resolveLayer(jmv, t.useDataSource)
      if (!layer) {
        setError("La couche liée à ce signalement est introuvable dans la carte. Prévenez l'administrateur.")
        return null
      }
      if (layer.geometryType && layer.geometryType !== 'point') {
        setError("Cette couche n'est pas une couche de points. Prévenez l'administrateur.")
        return null
      }
      const ops = layer.capabilities?.operations
      if (mode === 'add' && ops?.supportsAdd === false) {
        setError("Vous n'avez pas le droit d'ajouter des points sur cette couche.")
        return null
      }
      if (mode === 'move' && ops?.supportsUpdate === false) {
        setError("Vous n'avez pas le droit de déplacer les points de cette couche.")
        return null
      }
      if (mode === 'edit' && ops?.supportsUpdate === false) {
        setError("Vous n'avez pas le droit de modifier les points de cette couche.")
        return null
      }
      if (mode === 'delete' && ops?.supportsDelete === false) {
        setError("Vous n'avez pas le droit de supprimer les points de cette couche.")
        return null
      }
      return {
        label: t.label,
        iconUrl: t.iconUrl || '',
        color: t.color || '#0079c1',
        layer,
        fields: buildFields(layer),
        dataSourceId: t.useDataSource.dataSourceId
      }
    } catch (e) {
      setError('Impossible de charger la couche. Réessayez dans un instant.')
      return null
    } finally {
      setBusy(false)
    }
  }

  /* ---- Bouton principal : ajouter un point ---- */
  const chooseType = async (t: any) => {
    const sel = await prepareType(t, 'add')
    if (!sel) return
    setSelected(sel)
    setValues({})
    setPoint(null)
    setStep('placing')
  }

  /* ---- Bouton déplacer ---- */
  const startMove = async (t: any) => {
    const sel = await prepareType(t, 'move')
    if (!sel) return
    setSelected(sel)
    setPoint(null)
    setTarget(null)
    setNotice('')
    setStep('move')
  }

  /* ---- Bouton formulaire : corriger les attributs d'un point ---- */
  const startEdit = async (t: any) => {
    const sel = await prepareType(t, 'edit')
    if (!sel) return
    setSelected(sel)
    setPoint(null)
    setTarget(null)
    setValues({})
    setInitialValues({})
    setNotice('')
    setStep('editPick')
  }

  /* ---- Bouton corbeille ---- */
  const startDelete = async (t: any) => {
    const sel = await prepareType(t, 'delete')
    if (!sel) return
    setSelected(sel)
    setPoint(null)
    setTarget(null)
    setStep('deletePick')
  }

  const confirmDelete = async () => {
    setError('')
    setStep('deleting')
    try {
      const result = await selected.layer.applyEdits({ deleteFeatures: [{ objectId: target.oid }] })
      const res = result?.deleteFeatureResults?.[0]
      if (!res || res.error) throw new Error(res?.error?.message || 'Échec de la suppression')
      refreshOthers(selected.dataSourceId)
      setTarget(null)
      setDone({ title: 'Point supprimé', hint: 'Le signalement a été supprimé de la carte.' })
      setStep('success')
    } catch (e: any) {
      setError('La suppression a échoué. Vérifiez votre connexion et réessayez.' + (e?.message ? ` (${e.message})` : ''))
      setStep('deleteConfirm')
    }
  }

  const setValue = (name: string, v: string) => {
    setValues(prev => ({ ...prev, [name]: v }))
  }

  const cancelForm = () => {
    if (step === 'editForm') {
      const changed = selected.fields.some(f => (values[f.name] ?? '') !== (initialValues[f.name] ?? ''))
      if (changed && !window.confirm('Annuler la modification ? Les changements saisis seront perdus.')) return
      reset()
      return
    }
    const hasData = Object.values(values).some(v => v !== '' && v !== undefined)
    if (hasData && !window.confirm('Annuler ce signalement ? Les informations saisies seront perdues.')) return
    reset()
  }

  const validate = (): string => {
    for (const f of selected.fields) {
      const v = values[f.name]
      const empty = v === undefined || v === ''
      if (f.required && empty) return `Veuillez remplir le champ « ${f.label} ».`
      if (!empty && (f.kind === 'int' || f.kind === 'decimal')) {
        const n = Number(v)
        if (isNaN(n)) return `« ${f.label} » doit être un nombre.`
        if (f.kind === 'int' && !Number.isInteger(n)) return `« ${f.label} » doit être un nombre entier.`
        if (f.min !== undefined && n < f.min) return `« ${f.label} » doit être supérieur ou égal à ${f.min}.`
        if (f.max !== undefined && n > f.max) return `« ${f.label} » doit être inférieur ou égal à ${f.max}.`
      }
    }
    return ''
  }

  /* ---- Modification : enregistrement des attributs corrigés ---- */
  const submitEdit = async () => {
    const problem = validate()
    if (problem) { setError(problem); return }
    const changedFields = selected.fields.filter(f => (values[f.name] ?? '') !== (initialValues[f.name] ?? ''))
    if (changedFields.length === 0) {
      setError('Aucune modification à enregistrer.')
      return
    }
    setError('')
    setStep('editSaving')
    try {
      const [Graphic]: any[] = await loadArcGISJSAPIModules(['esri/Graphic'])
      const oidField = selected.layer.objectIdField
      const attributes: { [k: string]: any } = { [oidField]: target.oid }
      changedFields.forEach(f => {
        const v = toAttribute(f, values[f.name])
        attributes[f.name] = v === undefined ? null : v // champ vidé = valeur effacée
      })
      const feature = new Graphic({ attributes })
      const result = await selected.layer.applyEdits({ updateFeatures: [feature] })
      const res = result?.updateFeatureResults?.[0]
      if (!res || res.error) throw new Error(res?.error?.message || 'Échec de l’enregistrement')
      refreshOthers(selected.dataSourceId)
      setTarget(null)
      setDone({ title: 'Signalement modifié', hint: 'Les informations du point ont été mises à jour.' })
      setStep('success')
    } catch (e: any) {
      setError("La modification a échoué. Vérifiez votre connexion et réessayez." + (e?.message ? ` (${e.message})` : ''))
      setStep('editForm')
    }
  }

  /* ---- Ajout : enregistrement ---- */
  const submit = async () => {
    const problem = validate()
    if (problem) { setError(problem); return }
    setError('')
    setStep('saving')
    try {
      const [Graphic]: any[] = await loadArcGISJSAPIModules(['esri/Graphic'])
      const attributes: { [k: string]: any } = {}
      selected.fields.forEach(f => {
        const v = toAttribute(f, values[f.name])
        if (v !== undefined) attributes[f.name] = v
      })
      const feature = new Graphic({ geometry: point, attributes })
      const result = await selected.layer.applyEdits({ addFeatures: [feature] })
      const res = result?.addFeatureResults?.[0]
      if (!res || res.error) {
        throw new Error(res?.error?.message || 'Échec de l’enregistrement')
      }
      refreshOthers(selected.dataSourceId)
      setPoint(null)
      setDone({ title: 'Signalement enregistré', hint: 'Le point a été ajouté sur la carte.' })
      setStep('success')
    } catch (e: any) {
      setError("L'enregistrement a échoué. Vérifiez votre connexion et réessayez." + (e?.message ? ` (${e.message})` : ''))
      setStep('form')
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Rendu                                                              */
  /* ------------------------------------------------------------------ */

  const mapWidgetId = props.useMapWidgetIds?.[0]
  const mapComponent = (
    <JimuMapViewComponent
      useMapWidgetId={mapWidgetId}
      onActiveViewChange={(v: JimuMapView) => setJmv(v)}
    />
  )

  if (!mapWidgetId) {
    return (
      <div css={S.root}>
        {mapComponent}
        <p css={S.title}>Widget à configurer</p>
        <p css={S.hint}>Dans les paramètres du widget, choisissez la carte à utiliser.</p>
      </div>
    )
  }
  const usable = types.filter(t => t?.useDataSource?.dataSourceId)
  if (usable.length === 0) {
    return (
      <div css={S.root}>
        {mapComponent}
        <p css={S.title}>Widget à configurer</p>
        <p css={S.hint}>Dans les paramètres du widget, ajoutez au moins un type de signalement et choisissez sa couche.</p>
      </div>
    )
  }

  /* ---- Accueil : une ligne par type (ajouter / déplacer / corriger / supprimer) ---- */
  if (step === 'idle') {
    return (
      <div css={S.root}>
        {mapComponent}
        <p css={S.title}>Que souhaitez-vous signaler ?</p>
        {!jmv && <p css={S.hint}>Chargement de la carte…</p>}
        {usable.map((t: any) => {
          const color = t.color || '#0079c1'
          return (
            <div css={S.row} key={t.id} style={colorVars(color)}>
              <button
                type="button"
                css={S.bigBtn}
                style={{ flex: 1, width: 'auto', minWidth: 0 }}
                disabled={!jmv || busy}
                onClick={() => chooseType(t)}
              >
                <Triangle color={color} iconUrl={t.iconUrl} />
                <span>{t.label}</span>
              </button>
              <button
                type="button"
                css={S.iconBtn}
                style={{ ...colorVars(GREEN), color: GREEN }}
                title="Déplacer des points"
                aria-label={`Déplacer des points : ${t.label}`}
                disabled={!jmv || busy}
                onClick={() => startMove(t)}
              >
                <MoveIcon />
              </button>
              <button
                type="button"
                css={S.iconBtn}
                style={{ ...colorVars(ORANGE), color: ORANGE }}
                title="Corriger les informations d'un point"
                aria-label={`Corriger les informations d'un point : ${t.label}`}
                disabled={!jmv || busy}
                onClick={() => startEdit(t)}
              >
                <FormIcon />
              </button>
              <button
                type="button"
                css={S.iconBtn}
                style={{ ...colorVars(RED), color: RED }}
                title="Supprimer un point"
                aria-label={`Supprimer un point : ${t.label}`}
                disabled={!jmv || busy}
                onClick={() => startDelete(t)}
              >
                <TrashIcon />
              </button>
            </div>
          )
        })}
        {busy && <p css={S.hint}>Chargement…</p>}
        {error && <p css={S.error} role="alert">{error}</p>}
      </div>
    )
  }

  /* ---- Ajout : cliquer sur la carte ---- */
  if (step === 'placing' && selected) {
    return (
      <div css={S.root} style={colorVars(selected.color)}>
        {mapComponent}
        <div css={S.banner}>
          <p css={S.title}>Cliquez sur la carte</p>
          <p css={S.hint}>Indiquez l'emplacement : {selected.label}</p>
        </div>
        <div css={S.actions} style={{ position: 'static', padding: 0 }}>
          <button type="button" css={S.btn} onClick={reset}>Annuler</button>
        </div>
      </div>
    )
  }

  /* ---- Déplacement : glisser-déposer ---- */
  if (step === 'move' && selected) {
    return (
      <div css={S.root} style={colorVars(GREEN)}>
        {mapComponent}
        <div css={S.banner}>
          <p css={S.title}>Déplacer un point</p>
          <p css={S.hint}>
            Maintenez le clic sur un point « {selected.label} », glissez-le au bon endroit puis relâchez.
          </p>
        </div>
        {notice && <p css={S.notice} role="status">{notice}</p>}
        {error && <p css={S.error} role="alert">{error}</p>}
        <div css={S.actions} style={{ position: 'static', padding: 0 }}>
          <button type="button" css={S.btn} className="primary" onClick={reset}>Terminer</button>
        </div>
      </div>
    )
  }

  /* ---- Modification : cliquer sur le point à corriger ---- */
  if (step === 'editPick' && selected) {
    return (
      <div css={S.root} style={colorVars(ORANGE)}>
        {mapComponent}
        <div css={S.banner}>
          <p css={S.title}>Cliquez sur le point à corriger</p>
          <p css={S.hint}>Type : {selected.label}</p>
        </div>
        {error && <p css={S.error} role="alert">{error}</p>}
        <div css={S.actions} style={{ position: 'static', padding: 0 }}>
          <button type="button" css={S.btn} onClick={reset}>Annuler</button>
        </div>
      </div>
    )
  }

  /* ---- Suppression : cliquer sur le point ---- */
  if (step === 'deletePick' && selected) {
    return (
      <div css={S.root} style={colorVars(RED)}>
        {mapComponent}
        <div css={S.banner}>
          <p css={S.title}>Cliquez sur le point à supprimer</p>
          <p css={S.hint}>Type : {selected.label}</p>
        </div>
        {error && <p css={S.error} role="alert">{error}</p>}
        <div css={S.actions} style={{ position: 'static', padding: 0 }}>
          <button type="button" css={S.btn} onClick={reset}>Annuler</button>
        </div>
      </div>
    )
  }

  /* ---- Suppression : confirmation ---- */
  if ((step === 'deleteConfirm' || step === 'deleting') && selected) {
    const deleting = step === 'deleting'
    return (
      <div css={S.root} style={colorVars(RED)}>
        {mapComponent}
        <div css={S.banner}>
          <p css={S.title}>Voulez-vous supprimer ce point ?</p>
          <p css={S.hint}>
            Le point entouré en rouge sur la carte sera supprimé. Cliquez sur un autre point pour changer de sélection.
          </p>
        </div>
        {error && <p css={S.error} role="alert">{error}</p>}
        <div css={S.actions} style={{ position: 'static', padding: 0 }}>
          <button type="button" css={S.btn} disabled={deleting} onClick={reset}>Annuler</button>
          <button type="button" css={S.btn} className="primary" disabled={deleting} onClick={confirmDelete}>
            {deleting ? 'Suppression…' : 'Supprimer'}
          </button>
        </div>
      </div>
    )
  }

  /* ---- Succès ---- */
  if (step === 'success') {
    return (
      <div css={S.root}>
        {mapComponent}
        <div css={S.center} role="status">
          <p css={S.title}>{done.title}</p>
          <p css={S.hint}>{done.hint}</p>
          <button
            type="button"
            css={S.btn}
            style={{ ...colorVars('#0079c1'), flex: '0 0 auto', width: '100%' }}
            onClick={reset}
          >
            Terminer
          </button>
        </div>
      </div>
    )
  }

  /* ---- Ajout : formulaire (et enregistrement en cours) ---- */
  if ((step === 'form' || step === 'saving' || step === 'editForm' || step === 'editSaving') && selected) {
    const isEdit = step === 'editForm' || step === 'editSaving'
    const saving = step === 'saving' || step === 'editSaving'
    return (
      <div css={S.root} style={colorVars(isEdit ? ORANGE : selected.color)}>
        {mapComponent}
        <div css={S.bigBtn} style={{ cursor: 'default', minHeight: 48 }}>
          <Triangle color={selected.color} iconUrl={selected.iconUrl} />
          <span>{selected.label}</span>
        </div>

        <div>
          <p css={S.hint}>{isEdit ? 'Point sélectionné sur la carte (entouré)' : 'Emplacement choisi sur la carte'}</p>
          <button
            type="button"
            css={S.linkBtn}
            disabled={saving}
            onClick={() => {
              setError('')
              if (isEdit) { setTarget(null); setValues({}); setInitialValues({}); setStep('editPick') } else setStep('placing')
            }}
          >
            {isEdit ? 'Choisir un autre point' : "Changer l'emplacement"}
          </button>
        </div>

        {selected.fields.length === 0 && (
          <p css={S.hint}>Cette couche n'a aucun champ à remplir. Validez pour enregistrer le point.</p>
        )}

        {selected.fields.map(f => {
          const id = `sig-${f.name}`
          const v = values[f.name] ?? ''
          return (
            <div css={S.field} key={f.name}>
              <label htmlFor={id}>
                {f.label}{f.required && <span className="req"> *</span>}
              </label>

              {f.kind === 'textarea' && (
                <textarea id={id} value={v} maxLength={f.maxLength} disabled={saving}
                  onChange={e => setValue(f.name, capitalize(e.target.value))} />
              )}
              {f.kind === 'text' && (
                <input id={id} type="text" value={v} maxLength={f.maxLength} disabled={saving}
                  onChange={e => setValue(f.name, capitalize(e.target.value))} />
              )}
              {(f.kind === 'int' || f.kind === 'decimal') && (
                <input id={id} type="number" inputMode={f.kind === 'int' ? 'numeric' : 'decimal'}
                  step={f.kind === 'int' ? 1 : 'any'} min={f.min} max={f.max} value={v} disabled={saving}
                  onChange={e => setValue(f.name, e.target.value)} />
              )}
              {(f.kind === 'date' || f.kind === 'date-only' || f.kind === 'timestamp-offset') && (
                <input id={id} type="date" value={v} disabled={saving}
                  onChange={e => setValue(f.name, e.target.value)} />
              )}
              {f.kind === 'time' && (
                <input id={id} type="time" value={v} disabled={saving}
                  onChange={e => setValue(f.name, e.target.value)} />
              )}
              {f.kind === 'choice' && (
                <select id={id} value={v} disabled={saving}
                  onChange={e => setValue(f.name, e.target.value)}>
                  <option value="">— Choisir —</option>
                  {f.choices.map(c => (
                    <option key={String(c.code)} value={String(c.code)}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>
          )
        })}

        {error && <p css={S.error} role="alert">{error}</p>}

        <div css={S.actions}>
          <button type="button" css={S.btn} disabled={saving} onClick={cancelForm}>Annuler</button>
          <button type="button" css={S.btn} className="primary" disabled={saving} onClick={isEdit ? submitEdit : submit}>
            {saving ? 'Enregistrement…' : (isEdit ? 'Enregistrer les modifications' : 'Valider')}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default Widget
