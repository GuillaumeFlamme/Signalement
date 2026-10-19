System.register(["jimu-core","jimu-arcgis"],(function(e,t){var i={},n={};return{setters:[function(e){i.DataSourceManager=e.DataSourceManager,i.React=e.React,i.css=e.css,i.jsx=e.jsx},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent,n.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=n},891:e=>{"use strict";e.exports=i}},t={};function o(i){var n=t[i];if(void 0!==n)return n.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="";var s={};return o.p=window.jimuConfig.baseUrl,(()=>{"use strict";o.r(s),o.d(s,{__set_webpack_public_path__:()=>M,default:()=>S});var e=o(891),t=o(826);const i=({color:t,iconUrl:i,size:n=36})=>e.React.createElement("svg",{width:n,height:Math.round(.9*n),viewBox:"0 0 40 36","aria-hidden":"true",style:{flex:"0 0 auto"}},e.React.createElement("polygon",{points:"20,3 37,33 3,33",fill:"ffffff",stroke:t,strokeWidth:"4",strokeLinejoin:"round"}),i&&e.React.createElement("image",{href:i,x:"14",y:"17",width:"12",height:"12",preserveAspectRatio:"xMidYMid meet"}));var n=function(e,t,i,n){return new(i||(i=Promise))((function(o,s){function r(e){try{l(n.next(e))}catch(e){s(e)}}function a(e){try{l(n.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(r,a)}l((n=n.apply(e,t||[])).next())}))};const r=["oid","global-id","geometry","blob","raster","guid","xml"],a=["shape","shape__area","shape__length","st_area(shape)","st_length(shape)"],l=e=>{const t=e.editFieldsInfo||{},i=[t.creatorField,t.creationDateField,t.editorField,t.editDateField].filter(Boolean).map((e=>e.toLowerCase()));return(e.fields||[]).filter((e=>{const t=String(e.name).toLowerCase();return!r.includes(e.type)&&!1!==e.editable&&!a.includes(t)&&!i.includes(t)})).map((t=>{var i,n,o,s;const r={name:t.name,label:t.alias||t.name,kind:"text",required:!1===t.nullable&&(void 0===t.defaultValue||null===t.defaultValue)};if(t.name===e.typeIdField&&(null===(i=e.types)||void 0===i?void 0:i.length))return r.kind="choice",r.choices=e.types.map((e=>({code:e.id,name:e.name}))),r;if("coded-value"===(null===(n=t.domain)||void 0===n?void 0:n.type)&&(null===(o=t.domain.codedValues)||void 0===o?void 0:o.length))return r.kind="choice",r.choices=t.domain.codedValues.map((e=>({code:e.code,name:e.name}))),r;switch(t.type){case"small-integer":case"integer":case"big-integer":case"long":r.kind="int";break;case"single":case"double":r.kind="decimal";break;case"date":r.kind="date";break;case"date-only":r.kind="date-only";break;case"timestamp-offset":r.kind="timestamp-offset";break;case"time-only":r.kind="time";break;default:r.kind=!t.length||t.length>=100?"textarea":"text",r.maxLength=t.length||void 0}return"range"===(null===(s=t.domain)||void 0===s?void 0:s.type)&&(r.min=t.domain.minValue,r.max=t.domain.maxValue),r}))},c=(e,t)=>{var i;if(null!=t&&""!==t)switch(e.kind){case"int":case"decimal":return Number(t);case"date":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).getTime()}case"timestamp-offset":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).toISOString()}case"date-only":default:return t;case"time":return 5===t.length?t+":00":t;case"choice":{const n=null===(i=e.choices)||void 0===i?void 0:i.find((e=>String(e.code)===t));return n?n.code:t}}},d=e=>String(e).padStart(2,"0"),u={root:e.css`
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
  `,title:e.css`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  `,hint:e.css`
    margin: 0;
    color: #52606d;
    font-size: 13px;
  `,bigBtn:e.css`
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
  `,row:e.css`
    display: flex;
    gap: 8px;
    align-items: stretch;
  `,iconBtn:e.css`
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
  `,notice:e.css`
    margin: 0;
    padding: 10px 12px;
    border-radius: 6px;
    background: #e8f5e9;
    color: #1b5e20;
    font-size: 13px;
  `,banner:e.css`
    border-radius: 8px;
    padding: 12px;
    background: var(--c-soft);
    border: 1.5px solid var(--c);
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,field:e.css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    label { font-weight: 600; font-size: 13px; }
    .req { color: #c62828; }
    input, select, textarea {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 10px;
      font-size: 14px;
      font-family: inherit;
      color: #1f2933;
      background: #fff;
      border: 1px solid #9aa5b1;
      border-radius: 6px;
    }
    textarea { min-height: 72px; resize: vertical; }
    input:focus, select:focus, textarea:focus {
      outline: 3px solid var(--c);
      outline-offset: 0;
      border-color: var(--c);
    }
  `,actions:e.css`
    display: flex;
    gap: 8px;
    position: sticky;
    bottom: -14px;
    padding: 12px 0 4px;
    margin-top: 4px;
    background: #fff;
  `,btn:e.css`
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
  `,linkBtn:e.css`
    border: none;
    background: none;
    padding: 4px 0;
    color: #1f2933;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
    text-align: left;
  `,error:e.css`
    margin: 0;
    padding: 10px 12px;
    border-radius: 6px;
    background: #fdecea;
    color: #8a1c14;
    font-size: 13px;
  `,center:e.css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 12px;
    padding: 24px 8px;
  `},p=e=>{const t=/^#?([0-9a-f]{6})$/i.exec(e||"");if(!t)return"#eef5fb";const i=parseInt(t[1],16),n=e=>Math.round(e+.9*(255-e));return`rgb(${n(i>>16&255)}, ${n(i>>8&255)}, ${n(255&i)})`},f=e=>({"--c":e,"--c-soft":p(e)}),m="#d32f2f",v="#2e7d32",g="#ef6c00",x={delete:{color:m,fill:[211,47,47,.12],path:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />'},move:{color:v,fill:[46,125,50,.12],path:'<path d="M12 3v18M3 12h18" /><path d="M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />'},edit:{color:g,fill:[239,108,0,.12],path:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" />'}},h=e=>"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${x[e].color}" stroke-opacity="0.3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${x[e].path}</svg>`),y=(e,t,i)=>[new e({geometry:t,symbol:{type:"picture-marker",url:h(i),width:20,height:20}}),new e({geometry:t,symbol:{type:"simple-marker",style:"circle",color:x[i].fill,size:28,outline:{color:x[i].color,width:3}}})],b={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},j=()=>(0,e.jsx)("svg",Object.assign({},b),(0,e.jsx)("path",{d:"M12 3v18M3 12h18"}),(0,e.jsx)("path",{d:"M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"})),k=()=>(0,e.jsx)("svg",Object.assign({},b),(0,e.jsx)("path",{d:"M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"}),(0,e.jsx)("path",{d:"M14 3v5h5M9 13h6M9 17h6"})),w=()=>(0,e.jsx)("svg",Object.assign({},b),(0,e.jsx)("path",{d:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"})),S=o=>{var s,r,a;const p=null!==(r=null===(s=o.config)||void 0===s?void 0:s.types)&&void 0!==r?r:[],[x,h]=e.React.useState(null),[b,S]=e.React.useState("idle"),[M,z]=e.React.useState(!1),[C,I]=e.React.useState(null),[R,P]=e.React.useState(null),[E,A]=e.React.useState({}),[F,V]=e.React.useState(""),[L,$]=e.React.useState(""),[D,O]=e.React.useState(null),[G,_]=e.React.useState({}),[B,q]=e.React.useState({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),N=e.React.useCallback((()=>{S("idle"),I(null),P(null),O(null),A({}),_({}),V(""),$(""),z(!1)}),[]);e.React.useEffect((()=>{"CLOSED"===o.state&&N()}),[o.state,N]);const J=t=>{var i;try{const n=e.DataSourceManager.getInstance().getDataSource(t);null===(i=null==n?void 0:n.forceRefresh)||void 0===i||i.call(n)}catch(e){}};e.React.useEffect((()=>{var e,i;if(!["placing","deletePick","deleteConfirm","editPick"].includes(b)||!(null==x?void 0:x.view))return;const o=x.view,s=o.container,r=null==s?void 0:s.style.cursor;s&&(s.style.cursor="crosshair");try{null===(i=null===(e=o.popup)||void 0===e?void 0:e.close)||void 0===i||i.call(e)}catch(e){}const a=o.on("immediate-click",(e=>{var i;e.stopPropagation(),e.mapPoint&&("placing"===b?(P(e.mapPoint),S("form")):(i=e.mapPoint,n(void 0,void 0,void 0,(function*(){try{const[e]=yield(0,t.loadArcGISJSAPIModules)(["esri/geometry/Extent"]),n=14*(o.resolution||1),s=new e({xmin:i.x-n,ymin:i.y-n,xmax:i.x+n,ymax:i.y+n,spatialReference:i.spatialReference}),r=C.layer.objectIdField,a=yield C.layer.queryFeatures({geometry:s,spatialRelationship:"intersects",returnGeometry:!0,outFields:"editPick"===b?["*"]:[r],outSpatialReference:o.spatialReference,num:50}),l=(null==a?void 0:a.features)||[];if(0===l.length)return void V("Aucun point à cet endroit. Cliquez directement sur le point.");let c=l[0],u=1/0;if(l.forEach((e=>{const t=Math.hypot(e.geometry.x-i.x,e.geometry.y-i.y);t<u&&(u=t,c=e)})),V(""),O({oid:c.attributes[r],geometry:c.geometry}),"editPick"===b){const e={};C.fields.forEach((t=>{e[t.name]=((e,t)=>{if(null==t||""===t)return"";switch(e.kind){case"date":case"timestamp-offset":{const e=new Date(t);return isNaN(e.getTime())?"":(e=>`${e.getFullYear()}-${d(e.getMonth()+1)}-${d(e.getDate())}`)(e)}case"date-only":return String(t).slice(0,10);default:return String(t)}})(t,c.attributes[t.name])})),A(e),_(e),S("editForm")}else S("deleteConfirm")}catch(e){V("Impossible de rechercher le point. Réessayez.")}}))))}));return()=>{a.remove(),s&&(s.style.cursor=r||"")}}),[b,x,C]),e.React.useEffect((()=>{if("move"!==b||!(null==x?void 0:x.view)||!C)return;const e=x.view,i=C.layer,o=i.objectIdField,s=e.container,r=null==s?void 0:s.style.cursor;let a=!1,l=[],c=null,d=!1,u=0,p=[],f=null;const m=[],v=(t,i)=>{let n=null,o=18;return l.forEach((s=>{const r=e.toScreen(s.geometry);if(!r)return;const a=Math.hypot(r.x-t,r.y-i);a<o&&(o=a,n=s)})),n};return(0,t.loadArcGISJSAPIModules)(["esri/Graphic","esri/core/reactiveUtils"]).then((([t,g])=>{if(a)return;const x=()=>{p.length&&e.graphics.removeMany(p),f&&e.graphics.remove(f),p=[],f=null};m.push(g.watch((()=>e.stationary),(t=>{t&&n(void 0,void 0,void 0,(function*(){const t=++u;try{const n=yield i.queryFeatures({geometry:e.extent,spatialRelationship:"intersects",returnGeometry:!0,outFields:[o],outSpatialReference:e.spatialReference});a||t!==u||(l=(n.features||[]).map((e=>({oid:e.attributes[o],geometry:e.geometry}))))}catch(e){}}))}),{initial:!0})),m.push(e.on("pointer-move",(e=>{!c&&s&&(s.style.cursor=v(e.x,e.y)?"grab":r||"")}))),m.push(e.on("drag",(a=>n(void 0,void 0,void 0,(function*(){var n,l;if("start"===a.action){if(d)return;const i=v(a.x,a.y);if(!i)return;return a.stopPropagation(),c=i,V(""),$(""),p=y(t,i.geometry,"move"),f=new t({geometry:i.geometry,symbol:{type:"simple-marker",style:"circle",color:C.color,size:10,outline:{color:"#ffffff",width:2}}}),e.graphics.addMany([...p,f]),void(s&&(s.style.cursor="grabbing"))}if(c){if(a.stopPropagation(),"update"===a.action){const t=e.toMap({x:a.x,y:a.y});return f.geometry=t,void p.forEach((e=>{e.geometry=t}))}if("end"===a.action){const u=c;if(c=null,s&&(s.style.cursor=r||""),Math.hypot(a.x-a.origin.x,a.y-a.origin.y)<4)return void x();const p=e.toMap({x:a.x,y:a.y});d=!0;try{const e=new t({geometry:p,attributes:{[o]:u.oid}}),s=yield i.applyEdits({updateFeatures:[e]}),r=null===(n=null==s?void 0:s.updateFeatureResults)||void 0===n?void 0:n[0];if(!r||r.error)throw new Error((null===(l=null==r?void 0:r.error)||void 0===l?void 0:l.message)||"Échec de l’enregistrement");u.geometry=p,$("Point déplacé."),J(C.dataSourceId)}catch(e){V("Le déplacement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:""))}finally{d=!1,x()}}}})))))})),()=>{a=!0,m.forEach((e=>{try{e.remove()}catch(e){}})),p.length&&e.graphics.removeMany(p),f&&e.graphics.remove(f),s&&(s.style.cursor=r||"")}}),[b,x,C]),e.React.useEffect((()=>{if(!R||!(null==x?void 0:x.view)||!C)return;let e=null,i=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{i||(e=new t({geometry:R,symbol:{type:"simple-marker",style:"circle",color:C.color,size:16,outline:{color:"#ffffff",width:2.5}}}),x.view.graphics.add(e))})),()=>{i=!0,e&&x.view.graphics.remove(e)}}),[R,x,C]),e.React.useEffect((()=>{if(!D||!(null==x?void 0:x.view))return;const e="editForm"===b||"editSaving"===b?"edit":"delete";let i=[],n=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{n||(i=y(t,D.geometry,e),x.view.graphics.addMany(i))})),()=>{n=!0,i.length&&x.view.graphics.removeMany(i)}}),[D,x,b]),e.React.useEffect((()=>{if("success"!==b)return;const e=window.setTimeout(N,4e3);return()=>window.clearTimeout(e)}),[b,N]);const T=(t,i)=>n(void 0,void 0,void 0,(function*(){var o;V(""),z(!0);try{const s=yield((t,i)=>n(void 0,void 0,void 0,(function*(){var n,o,s,r,a;if(!(null==t?void 0:t.view)||!(null==i?void 0:i.dataSourceId))return null;const l=i.dataSourceId;let c=null;try{c=null===(s=null===(o=(n=t).getJimuLayerViewByDataSourceId)||void 0===o?void 0:o.call(n,l))||void 0===s?void 0:s.layer}catch(e){}let d=null;try{d=e.DataSourceManager.getInstance().getDataSource(l)}catch(e){}if(c||(c=null==d?void 0:d.layer),!c){const e=null===(r=t.view.map)||void 0===r?void 0:r.allLayers;if(e&&(c=e.filter((e=>(null==d?void 0:d.layerId)&&e.id===d.layerId||l===e.id||l.endsWith("-"+e.id))).toArray().sort(((e,t)=>String(t.id).length-String(e.id).length))[0],!c)){const t=null===(a=null==d?void 0:d.getLabel)||void 0===a?void 0:a.call(d);t&&(c=e.find((e=>e.title===t)))}}return c&&"function"==typeof c.applyEdits?(yield c.load(),c):null})))(x,t.useDataSource);if(!s)return V("La couche liée à ce signalement est introuvable dans la carte. Prévenez l'administrateur."),null;if(s.geometryType&&"point"!==s.geometryType)return V("Cette couche n'est pas une couche de points. Prévenez l'administrateur."),null;const r=null===(o=s.capabilities)||void 0===o?void 0:o.operations;return"add"===i&&!1===(null==r?void 0:r.supportsAdd)?(V("Vous n'avez pas le droit d'ajouter des points sur cette couche."),null):"move"===i&&!1===(null==r?void 0:r.supportsUpdate)?(V("Vous n'avez pas le droit de déplacer les points de cette couche."),null):"edit"===i&&!1===(null==r?void 0:r.supportsUpdate)?(V("Vous n'avez pas le droit de modifier les points de cette couche."),null):"delete"===i&&!1===(null==r?void 0:r.supportsDelete)?(V("Vous n'avez pas le droit de supprimer les points de cette couche."),null):{label:t.label,iconUrl:t.iconUrl||"",color:t.color||"#0079c1",layer:s,fields:l(s),dataSourceId:t.useDataSource.dataSourceId}}catch(e){return V("Impossible de charger la couche. Réessayez dans un instant."),null}finally{z(!1)}})),U=()=>n(void 0,void 0,void 0,(function*(){var e,t;V(""),S("deleting");try{const i=yield C.layer.applyEdits({deleteFeatures:[{objectId:D.oid}]}),n=null===(e=null==i?void 0:i.deleteFeatureResults)||void 0===e?void 0:e[0];if(!n||n.error)throw new Error((null===(t=null==n?void 0:n.error)||void 0===t?void 0:t.message)||"Échec de la suppression");J(C.dataSourceId),O(null),q({title:"Point supprimé",hint:"Le signalement a été supprimé de la carte."}),S("success")}catch(e){V("La suppression a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),S("deleteConfirm")}})),W=(e,t)=>{A((i=>Object.assign(Object.assign({},i),{[e]:t})))},H=()=>{if("editForm"!==b)Object.values(E).some((e=>""!==e&&void 0!==e))&&!window.confirm("Annuler ce signalement ? Les informations saisies seront perdues.")||N();else{const e=C.fields.some((e=>{var t,i;return(null!==(t=E[e.name])&&void 0!==t?t:"")!==(null!==(i=G[e.name])&&void 0!==i?i:"")}));if(e&&!window.confirm("Annuler la modification ? Les changements saisis seront perdus."))return;N()}},Y=()=>{for(const e of C.fields){const t=E[e.name],i=void 0===t||""===t;if(e.required&&i)return`Veuillez remplir le champ « ${e.label} ».`;if(!i&&("int"===e.kind||"decimal"===e.kind)){const i=Number(t);if(isNaN(i))return`« ${e.label} » doit être un nombre.`;if("int"===e.kind&&!Number.isInteger(i))return`« ${e.label} » doit être un nombre entier.`;if(void 0!==e.min&&i<e.min)return`« ${e.label} » doit être supérieur ou égal à ${e.min}.`;if(void 0!==e.max&&i>e.max)return`« ${e.label} » doit être inférieur ou égal à ${e.max}.`}}return""},Q=()=>n(void 0,void 0,void 0,(function*(){var e,i;const n=Y();if(n)return void V(n);const o=C.fields.filter((e=>{var t,i;return(null!==(t=E[e.name])&&void 0!==t?t:"")!==(null!==(i=G[e.name])&&void 0!==i?i:"")}));if(0!==o.length){V(""),S("editSaving");try{const[n]=yield(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]),s={[C.layer.objectIdField]:D.oid};o.forEach((e=>{const t=c(e,E[e.name]);s[e.name]=void 0===t?null:t}));const r=new n({attributes:s}),a=yield C.layer.applyEdits({updateFeatures:[r]}),l=null===(e=null==a?void 0:a.updateFeatureResults)||void 0===e?void 0:e[0];if(!l||l.error)throw new Error((null===(i=null==l?void 0:l.error)||void 0===i?void 0:i.message)||"Échec de l’enregistrement");J(C.dataSourceId),O(null),q({title:"Signalement modifié",hint:"Les informations du point ont été mises à jour."}),S("success")}catch(e){V("La modification a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),S("editForm")}}else V("Aucune modification à enregistrer.")})),K=()=>n(void 0,void 0,void 0,(function*(){var e,i;const n=Y();if(n)V(n);else{V(""),S("saving");try{const[n]=yield(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]),o={};C.fields.forEach((e=>{const t=c(e,E[e.name]);void 0!==t&&(o[e.name]=t)}));const s=new n({geometry:R,attributes:o}),r=yield C.layer.applyEdits({addFeatures:[s]}),a=null===(e=null==r?void 0:r.addFeatureResults)||void 0===e?void 0:e[0];if(!a||a.error)throw new Error((null===(i=null==a?void 0:a.error)||void 0===i?void 0:i.message)||"Échec de l’enregistrement");J(C.dataSourceId),P(null),q({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),S("success")}catch(e){V("L'enregistrement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),S("form")}}})),X=null===(a=o.useMapWidgetIds)||void 0===a?void 0:a[0],Z=(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:X,onActiveViewChange:e=>h(e)});if(!X)return(0,e.jsx)("div",{css:u.root},Z,(0,e.jsx)("p",{css:u.title},"Widget à configurer"),(0,e.jsx)("p",{css:u.hint},"Dans les paramètres du widget, choisissez la carte à utiliser."));const ee=p.filter((e=>{var t;return null===(t=null==e?void 0:e.useDataSource)||void 0===t?void 0:t.dataSourceId}));if(0===ee.length)return(0,e.jsx)("div",{css:u.root},Z,(0,e.jsx)("p",{css:u.title},"Widget à configurer"),(0,e.jsx)("p",{css:u.hint},"Dans les paramètres du widget, ajoutez au moins un type de signalement et choisissez sa couche."));if("idle"===b)return(0,e.jsx)("div",{css:u.root},Z,(0,e.jsx)("p",{css:u.title},"Que souhaitez-vous signaler ?"),!x&&(0,e.jsx)("p",{css:u.hint},"Chargement de la carte…"),ee.map((t=>{const o=t.color||"#0079c1";return(0,e.jsx)("div",{css:u.row,key:t.id,style:f(o)},(0,e.jsx)("button",{type:"button",css:u.bigBtn,style:{flex:1,width:"auto",minWidth:0},disabled:!x||M,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"add");t&&(I(t),A({}),P(null),S("placing"))})))(t)},(0,e.jsx)(i,{color:o,iconUrl:t.iconUrl}),(0,e.jsx)("span",null,t.label)),(0,e.jsx)("button",{type:"button",css:u.iconBtn,style:Object.assign(Object.assign({},f(v)),{color:v}),title:"Déplacer des points","aria-label":`Déplacer des points : ${t.label}`,disabled:!x||M,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"move");t&&(I(t),P(null),O(null),$(""),S("move"))})))(t)},(0,e.jsx)(j,null)),(0,e.jsx)("button",{type:"button",css:u.iconBtn,style:Object.assign(Object.assign({},f(g)),{color:g}),title:"Corriger les informations d'un point","aria-label":`Corriger les informations d'un point : ${t.label}`,disabled:!x||M,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"edit");t&&(I(t),P(null),O(null),A({}),_({}),$(""),S("editPick"))})))(t)},(0,e.jsx)(k,null)),(0,e.jsx)("button",{type:"button",css:u.iconBtn,style:Object.assign(Object.assign({},f(m)),{color:m}),title:"Supprimer un point","aria-label":`Supprimer un point : ${t.label}`,disabled:!x||M,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"delete");t&&(I(t),P(null),O(null),S("deletePick"))})))(t)},(0,e.jsx)(w,null)))})),M&&(0,e.jsx)("p",{css:u.hint},"Chargement…"),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F));if("placing"===b&&C)return(0,e.jsx)("div",{css:u.root,style:f(C.color)},Z,(0,e.jsx)("div",{css:u.banner},(0,e.jsx)("p",{css:u.title},"Cliquez sur la carte"),(0,e.jsx)("p",{css:u.hint},"Indiquez l'emplacement : ",C.label)),(0,e.jsx)("div",{css:u.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:u.btn,onClick:N},"Annuler")));if("move"===b&&C)return(0,e.jsx)("div",{css:u.root,style:f(v)},Z,(0,e.jsx)("div",{css:u.banner},(0,e.jsx)("p",{css:u.title},"Déplacer un point"),(0,e.jsx)("p",{css:u.hint},"Maintenez le clic sur un point « ",C.label," », glissez-le au bon endroit puis relâchez.")),L&&(0,e.jsx)("p",{css:u.notice,role:"status"},L),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F),(0,e.jsx)("div",{css:u.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:u.btn,className:"primary",onClick:N},"Terminer")));if("editPick"===b&&C)return(0,e.jsx)("div",{css:u.root,style:f(g)},Z,(0,e.jsx)("div",{css:u.banner},(0,e.jsx)("p",{css:u.title},"Cliquez sur le point à corriger"),(0,e.jsx)("p",{css:u.hint},"Type : ",C.label)),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F),(0,e.jsx)("div",{css:u.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:u.btn,onClick:N},"Annuler")));if("deletePick"===b&&C)return(0,e.jsx)("div",{css:u.root,style:f(m)},Z,(0,e.jsx)("div",{css:u.banner},(0,e.jsx)("p",{css:u.title},"Cliquez sur le point à supprimer"),(0,e.jsx)("p",{css:u.hint},"Type : ",C.label)),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F),(0,e.jsx)("div",{css:u.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:u.btn,onClick:N},"Annuler")));if(("deleteConfirm"===b||"deleting"===b)&&C){const t="deleting"===b;return(0,e.jsx)("div",{css:u.root,style:f(m)},Z,(0,e.jsx)("div",{css:u.banner},(0,e.jsx)("p",{css:u.title},"Voulez-vous supprimer ce point ?"),(0,e.jsx)("p",{css:u.hint},"Le point entouré en rouge sur la carte sera supprimé. Cliquez sur un autre point pour changer de sélection.")),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F),(0,e.jsx)("div",{css:u.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:u.btn,disabled:t,onClick:N},"Annuler"),(0,e.jsx)("button",{type:"button",css:u.btn,className:"primary",disabled:t,onClick:U},t?"Suppression…":"Supprimer")))}if("success"===b)return(0,e.jsx)("div",{css:u.root},Z,(0,e.jsx)("div",{css:u.center,role:"status"},(0,e.jsx)("p",{css:u.title},B.title),(0,e.jsx)("p",{css:u.hint},B.hint),(0,e.jsx)("button",{type:"button",css:u.btn,style:Object.assign(Object.assign({},f("#0079c1")),{flex:"0 0 auto",width:"100%"}),onClick:N},"Terminer")));if(("form"===b||"saving"===b||"editForm"===b||"editSaving"===b)&&C){const t="editForm"===b||"editSaving"===b,n="saving"===b||"editSaving"===b;return(0,e.jsx)("div",{css:u.root,style:f(t?g:C.color)},Z,(0,e.jsx)("div",{css:u.bigBtn,style:{cursor:"default",minHeight:48}},(0,e.jsx)(i,{color:C.color,iconUrl:C.iconUrl}),(0,e.jsx)("span",null,C.label)),(0,e.jsx)("div",null,(0,e.jsx)("p",{css:u.hint},t?"Point sélectionné sur la carte (entouré)":"Emplacement choisi sur la carte"),(0,e.jsx)("button",{type:"button",css:u.linkBtn,disabled:n,onClick:()=>{V(""),t?(O(null),A({}),_({}),S("editPick")):S("placing")}},t?"Choisir un autre point":"Changer l'emplacement")),0===C.fields.length&&(0,e.jsx)("p",{css:u.hint},"Cette couche n'a aucun champ à remplir. Validez pour enregistrer le point."),C.fields.map((t=>{var i;const o=`sig-${t.name}`,s=null!==(i=E[t.name])&&void 0!==i?i:"";return(0,e.jsx)("div",{css:u.field,key:t.name},(0,e.jsx)("label",{htmlFor:o},t.label,t.required&&(0,e.jsx)("span",{className:"req"}," *")),"textarea"===t.kind&&(0,e.jsx)("textarea",{id:o,value:s,maxLength:t.maxLength,disabled:n,onChange:e=>W(t.name,e.target.value)}),"text"===t.kind&&(0,e.jsx)("input",{id:o,type:"text",value:s,maxLength:t.maxLength,disabled:n,onChange:e=>W(t.name,e.target.value)}),("int"===t.kind||"decimal"===t.kind)&&(0,e.jsx)("input",{id:o,type:"number",inputMode:"int"===t.kind?"numeric":"decimal",step:"int"===t.kind?1:"any",min:t.min,max:t.max,value:s,disabled:n,onChange:e=>W(t.name,e.target.value)}),("date"===t.kind||"date-only"===t.kind||"timestamp-offset"===t.kind)&&(0,e.jsx)("input",{id:o,type:"date",value:s,disabled:n,onChange:e=>W(t.name,e.target.value)}),"time"===t.kind&&(0,e.jsx)("input",{id:o,type:"time",value:s,disabled:n,onChange:e=>W(t.name,e.target.value)}),"choice"===t.kind&&(0,e.jsx)("select",{id:o,value:s,disabled:n,onChange:e=>W(t.name,e.target.value)},(0,e.jsx)("option",{value:""},"— Choisir —"),t.choices.map((t=>(0,e.jsx)("option",{key:String(t.code),value:String(t.code)},t.name)))))})),F&&(0,e.jsx)("p",{css:u.error,role:"alert"},F),(0,e.jsx)("div",{css:u.actions},(0,e.jsx)("button",{type:"button",css:u.btn,disabled:n,onClick:H},"Annuler"),(0,e.jsx)("button",{type:"button",css:u.btn,className:"primary",disabled:n,onClick:t?Q:K},n?"Enregistrement…":t?"Enregistrer les modifications":"Valider")))}return null};function M(e){o.p=e}})(),s})())}}}));