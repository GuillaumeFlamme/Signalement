/** @jsx jsx */
import { React, jsx, css, Immutable, DataSourceTypes, type UseDataSource } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection, SettingRow } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { Button, TextInput } from 'jimu-ui'
import { type IMConfig, type SignalType } from '../config'
import { Triangle } from '../triangle'

// Rouge, orange et vert sont réservés aux boutons Corbeille, Formulaire et Déplacement du widget
const COLORS = ['#0079c1', '#1a237e', '#8e24aa', '#6d4c41', '#455a64', '#212121']

const S = {
  card: css`
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid var(--sys-color-divider-secondary, #444);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  head: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-weight: 600;
  `,
  title: css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  `,
  swatches: css`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,
  swatch: css`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    padding: 0;
    &.on { border-color: #fff; box-shadow: 0 0 0 2px #888; }
  `,
  label: css`
    font-size: 13px;
    margin-bottom: 4px;
  `,
  row: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `
}

const newId = () => 't' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

/** Lit un PNG et le réduit (96 px max) pour garder une config légère. Transparence conservée. */
const readPng = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const ratio = Math.min(1, 96 / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * ratio))
        canvas.height = Math.max(1, Math.round(img.height * ratio))
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/png'))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })

const Setting = (props: AllWidgetSettingProps<IMConfig>) => {
  const getTypes = (): SignalType[] =>
    props.config?.types ? (props.config.types as any).asMutable({ deep: true }) : []

  /** Enregistre la liste et déclare les couches utilisées par le widget */
  const save = (list: SignalType[]) => {
    const seen: { [id: string]: boolean } = {}
    const useDataSources: UseDataSource[] = []
    list.forEach(t => {
      const ds = t.useDataSource
      if (ds?.dataSourceId && !seen[ds.dataSourceId]) {
        seen[ds.dataSourceId] = true
        useDataSources.push(ds)
      }
    })
    props.onSettingChange({
      id: props.id,
      config: (props.config ?? Immutable({})).set('types', list),
      useDataSources
    })
  }

  const update = (index: number, patch: Partial<SignalType>) => {
    const list = getTypes()
    list[index] = { ...list[index], ...patch }
    save(list)
  }

  const add = () => {
    const list = getTypes()
    list.push({ id: newId(), label: 'Nouveau signalement', color: COLORS[list.length % COLORS.length] })
    save(list)
  }

  const remove = (index: number) => {
    const list = getTypes()
    list.splice(index, 1)
    save(list)
  }

  const move = (index: number, delta: number) => {
    const list = getTypes()
    const target = index + delta
    if (target < 0 || target >= list.length) return
    const [item] = list.splice(index, 1)
    list.splice(target, 0, item)
    save(list)
  }

  const pickImage = async (index: number, file?: File) => {
    if (!file) return
    try {
      update(index, { iconUrl: await readPng(file) })
    } catch (e) {
      window.alert("Impossible de lire cette image. Utilisez un fichier PNG.")
    }
  }

  const types = getTypes()

  return (
    <div className="widget-setting-signalement">
      <SettingSection title="Carte">
        <SettingRow>
          <MapWidgetSelector
            useMapWidgetIds={props.useMapWidgetIds}
            onSelect={(ids: string[]) => props.onSettingChange({ id: props.id, useMapWidgetIds: ids })}
          />
        </SettingRow>
      </SettingSection>

      <SettingSection title="Lier les couches">
        {types.map((t, i) => {
          const color = t.color || COLORS[0]
          const fileId = `sig-file-${t.id}`
          return (
            <div css={S.card} key={t.id}>
              <div css={S.head}>
                <span css={S.title}>
                  <Triangle color={color} iconUrl={t.iconUrl} size={30} />
                  <span>{t.label || 'Signalement'}</span>
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <Button size="sm" type="tertiary" disabled={i === 0} onClick={() => move(i, -1)} title="Monter">↑</Button>
                  <Button size="sm" type="tertiary" disabled={i === types.length - 1} onClick={() => move(i, 1)} title="Descendre">↓</Button>
                  <Button size="sm" type="tertiary" onClick={() => remove(i)}>Supprimer</Button>
                </span>
              </div>

              <div>
                <div css={S.label}>Libellé</div>
                <TextInput
                  size="sm"
                  className="w-100"
                  defaultValue={t.label}
                  onAcceptValue={(v: string) => update(i, { label: v })}
                />
              </div>

              <div>
                <div css={S.label}>Image (PNG)</div>
                <div css={S.row}>
                  <input
                    id={fileId}
                    type="file"
                    accept="image/png"
                    style={{ display: 'none' }}
                    onChange={(e: any) => {
                      pickImage(i, e.target.files?.[0])
                      e.target.value = ''
                    }}
                  />
                  <Button size="sm" type="secondary" onClick={() => document.getElementById(fileId).click()}>
                    {t.iconUrl ? 'Remplacer' : 'Choisir un fichier'}
                  </Button>
                  {t.iconUrl && (
                    <Button size="sm" type="tertiary" onClick={() => update(i, { iconUrl: undefined })}>Retirer</Button>
                  )}
                </div>
              </div>

              <div>
                <div css={S.label}>Couleur</div>
                <div css={S.swatches}>
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      css={S.swatch}
                      className={color === c ? 'on' : ''}
                      style={{ background: c }}
                      aria-label={c}
                      onClick={() => update(i, { color: c })}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div css={S.label}>Couche</div>
                <DataSourceSelector
                  types={Immutable([DataSourceTypes.FeatureLayer])}
                  useDataSources={t.useDataSource ? Immutable([t.useDataSource]) : Immutable([])}
                  mustUseDataSource
                  isMultiple={false}
                  widgetId={props.id}
                  onChange={(uds: any) => {
                    const first = uds?.[0]
                    const plain = first?.asMutable ? first.asMutable({ deep: true }) : first
                    update(i, { useDataSource: plain })
                  }}
                />
              </div>
            </div>
          )
        })}

        <SettingRow>
          <Button type="primary" className="w-100" onClick={add}>Ajouter</Button>
        </SettingRow>
      </SettingSection>
    </div>
  )
}

export default Setting
