System.register(["jimu-core","jimu-arcgis"],(function(e,t){var i={},n={};return{setters:[function(e){i.DataSourceManager=e.DataSourceManager,i.React=e.React,i.css=e.css,i.jsx=e.jsx},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent,n.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=n},891:e=>{"use strict";e.exports=i}},t={};function o(i){var n=t[i];if(void 0!==n)return n.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,o),r.exports}o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="";var r={};return o.p=window.jimuConfig.baseUrl,(()=>{"use strict";o.r(r),o.d(r,{__set_webpack_public_path__:()=>z,default:()=>M});var e=o(891),t=o(826);const i=({color:t,iconUrl:i,size:n=36})=>e.React.createElement("svg",{width:n,height:Math.round(.9*n),viewBox:"0 0 40 36","aria-hidden":"true",style:{flex:"0 0 auto"}},e.React.createElement("polygon",{points:"20,3 37,33 3,33",fill:"#FFFFFF",stroke:t,strokeWidth:"4",strokeLinejoin:"round"}),i&&e.React.createElement("image",{href:i,x:"14",y:"17",width:"12",height:"12",preserveAspectRatio:"xMidYMid meet"}));var n=function(e,t,i,n){return new(i||(i=Promise))((function(o,r){function s(e){try{l(n.next(e))}catch(e){r(e)}}function a(e){try{l(n.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,a)}l((n=n.apply(e,t||[])).next())}))};const s=["oid","global-id","geometry","blob","raster","guid","xml"],a=["shape","shape__area","shape__length","st_area(shape)","st_length(shape)"],l=e=>{const t=e.editFieldsInfo||{},i=[t.creatorField,t.creationDateField,t.editorField,t.editDateField].filter(Boolean).map((e=>e.toLowerCase()));return(e.fields||[]).filter((e=>{const t=String(e.name).toLowerCase();return!s.includes(e.type)&&!1!==e.editable&&!a.includes(t)&&!i.includes(t)})).map((t=>{var i,n,o,r;const s={name:t.name,label:t.alias||t.name,kind:"text",required:!0};if(t.name===e.typeIdField&&(null===(i=e.types)||void 0===i?void 0:i.length))return s.kind="choice",s.choices=e.types.map((e=>({code:e.id,name:e.name}))),s;if("coded-value"===(null===(n=t.domain)||void 0===n?void 0:n.type)&&(null===(o=t.domain.codedValues)||void 0===o?void 0:o.length))return s.kind="choice",s.choices=t.domain.codedValues.map((e=>({code:e.code,name:e.name}))),s;switch(t.type){case"small-integer":case"integer":case"big-integer":case"long":s.kind="int";break;case"single":case"double":s.kind="decimal";break;case"date":s.kind="date";break;case"date-only":s.kind="date-only";break;case"timestamp-offset":s.kind="timestamp-offset";break;case"time-only":s.kind="time";break;default:s.kind=!t.length||t.length>=100?"textarea":"text",s.maxLength=t.length||void 0}return"range"===(null===(r=t.domain)||void 0===r?void 0:r.type)&&(s.min=t.domain.minValue,s.max=t.domain.maxValue),s}))},c=e=>{const t=e.search(/\S/);return t<0?e:e.slice(0,t)+e.charAt(t).toUpperCase()+e.slice(t+1)},d=(e,t)=>{var i;if(null!=t&&""!==t)switch(e.kind){case"int":case"decimal":return Number(t);case"date":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).getTime()}case"timestamp-offset":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).toISOString()}case"date-only":return t;case"time":return 5===t.length?t+":00":t;case"choice":{const n=null===(i=e.choices)||void 0===i?void 0:i.find((e=>String(e.code)===t));return n?n.code:t}default:return c(t)}},u=e=>String(e).padStart(2,"0"),p={root:e.css`
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
    color: var(--c, #1f2933);
    font-size: 14px;
    font-weight: 700;
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
  `},m=e=>{const t=/^#?([0-9a-f]{6})$/i.exec(e||"");if(!t)return"#eef5fb";const i=parseInt(t[1],16),n=e=>Math.round(e+.9*(255-e));return`rgb(${n(i>>16&255)}, ${n(i>>8&255)}, ${n(255&i)})`},f=e=>({"--c":e,"--c-soft":m(e)}),v="#d32f2f",g="#2e7d32",h="#ef6c00",x={delete:{color:v,fill:[211,47,47,.12],path:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />'},move:{color:g,fill:[46,125,50,.12],path:'<path d="M12 3v18M3 12h18" /><path d="M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3" />'},edit:{color:h,fill:[239,108,0,.12],path:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" />'}},y=e=>"data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="${x[e].color}" stroke-opacity="0.3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${x[e].path}</svg>`),b=(e,t,i)=>[new e({geometry:t,symbol:{type:"picture-marker",url:y(i),width:20,height:20}}),new e({geometry:t,symbol:{type:"simple-marker",style:"circle",color:x[i].fill,size:28,outline:{color:x[i].color,width:3}}})],j={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},k=()=>(0,e.jsx)("svg",Object.assign({},j),(0,e.jsx)("path",{d:"M12 3v18M3 12h18"}),(0,e.jsx)("path",{d:"M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"})),w=()=>(0,e.jsx)("svg",Object.assign({},j),(0,e.jsx)("path",{d:"M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"}),(0,e.jsx)("path",{d:"M14 3v5h5M9 13h6M9 17h6"})),S=()=>(0,e.jsx)("svg",Object.assign({},j),(0,e.jsx)("path",{d:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"})),M=o=>{var r,s,a;const m=null!==(s=null===(r=o.config)||void 0===r?void 0:r.types)&&void 0!==s?s:[],[x,y]=e.React.useState(null),[j,M]=e.React.useState("idle"),[z,C]=e.React.useState(!1),[I,R]=e.React.useState(null),[F,P]=e.React.useState(null),[A,E]=e.React.useState({}),[L,V]=e.React.useState(""),[$,D]=e.React.useState(""),[O,G]=e.React.useState(null),[_,B]=e.React.useState({}),[q,N]=e.React.useState({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),U=e.React.useCallback((()=>{M("idle"),R(null),P(null),G(null),E({}),B({}),V(""),D(""),C(!1)}),[]);e.React.useEffect((()=>{"CLOSED"===o.state&&U()}),[o.state,U]);const J=t=>{var i;try{const n=e.DataSourceManager.getInstance().getDataSource(t);null===(i=null==n?void 0:n.forceRefresh)||void 0===i||i.call(n)}catch(e){}};e.React.useEffect((()=>{var e,i;if(!["placing","deletePick","deleteConfirm","editPick"].includes(j)||!(null==x?void 0:x.view))return;const o=x.view,r=o.container,s=null==r?void 0:r.style.cursor;r&&(r.style.cursor="crosshair");try{null===(i=null===(e=o.popup)||void 0===e?void 0:e.close)||void 0===i||i.call(e)}catch(e){}const a=o.on("immediate-click",(e=>{var i;e.stopPropagation(),e.mapPoint&&("placing"===j?(P(e.mapPoint),M("form")):(i=e.mapPoint,n(void 0,void 0,void 0,(function*(){try{const[e]=yield(0,t.loadArcGISJSAPIModules)(["esri/geometry/Extent"]),n=14*(o.resolution||1),r=new e({xmin:i.x-n,ymin:i.y-n,xmax:i.x+n,ymax:i.y+n,spatialReference:i.spatialReference}),s=I.layer.objectIdField,a=yield I.layer.queryFeatures({geometry:r,spatialRelationship:"intersects",returnGeometry:!0,outFields:"editPick"===j?["*"]:[s],outSpatialReference:o.spatialReference,num:50}),l=(null==a?void 0:a.features)||[];if(0===l.length)return void V("Aucun point à cet endroit. Cliquez directement sur le point.");let c=l[0],d=1/0;if(l.forEach((e=>{const t=Math.hypot(e.geometry.x-i.x,e.geometry.y-i.y);t<d&&(d=t,c=e)})),V(""),G({oid:c.attributes[s],geometry:c.geometry}),"editPick"===j){const e={};I.fields.forEach((t=>{e[t.name]=((e,t)=>{if(null==t||""===t)return"";switch(e.kind){case"date":case"timestamp-offset":{const e=new Date(t);return isNaN(e.getTime())?"":(e=>`${e.getFullYear()}-${u(e.getMonth()+1)}-${u(e.getDate())}`)(e)}case"date-only":return String(t).slice(0,10);default:return String(t)}})(t,c.attributes[t.name])})),E(e),B(e),M("editForm")}else M("deleteConfirm")}catch(e){V("Impossible de rechercher le point. Réessayez.")}}))))}));return()=>{a.remove(),r&&(r.style.cursor=s||"")}}),[j,x,I]),e.React.useEffect((()=>{if("move"!==j||!(null==x?void 0:x.view)||!I)return;const e=x.view,i=I.layer,o=i.objectIdField,r=e.container,s=null==r?void 0:r.style.cursor;let a=!1,l=[],c=null,d=!1,u=0,p=[],m=null;const f=[],v=(t,i)=>{let n=null,o=18;return l.forEach((r=>{const s=e.toScreen(r.geometry);if(!s)return;const a=Math.hypot(s.x-t,s.y-i);a<o&&(o=a,n=r)})),n};return(0,t.loadArcGISJSAPIModules)(["esri/Graphic","esri/core/reactiveUtils"]).then((([t,g])=>{if(a)return;const h=()=>{p.length&&e.graphics.removeMany(p),m&&e.graphics.remove(m),p=[],m=null};f.push(g.watch((()=>e.stationary),(t=>{t&&n(void 0,void 0,void 0,(function*(){const t=++u;try{const n=yield i.queryFeatures({geometry:e.extent,spatialRelationship:"intersects",returnGeometry:!0,outFields:[o],outSpatialReference:e.spatialReference});a||t!==u||(l=(n.features||[]).map((e=>({oid:e.attributes[o],geometry:e.geometry}))))}catch(e){}}))}),{initial:!0})),f.push(e.on("pointer-move",(e=>{!c&&r&&(r.style.cursor=v(e.x,e.y)?"grab":s||"")}))),f.push(e.on("drag",(a=>n(void 0,void 0,void 0,(function*(){var n,l;if("start"===a.action){if(d)return;const i=v(a.x,a.y);if(!i)return;return a.stopPropagation(),c=i,V(""),D(""),p=b(t,i.geometry,"move"),m=new t({geometry:i.geometry,symbol:{type:"simple-marker",style:"circle",color:I.color,size:10,outline:{color:"#ffffff",width:2}}}),e.graphics.addMany([...p,m]),void(r&&(r.style.cursor="grabbing"))}if(c){if(a.stopPropagation(),"update"===a.action){const t=e.toMap({x:a.x,y:a.y});return m.geometry=t,void p.forEach((e=>{e.geometry=t}))}if("end"===a.action){const u=c;if(c=null,r&&(r.style.cursor=s||""),Math.hypot(a.x-a.origin.x,a.y-a.origin.y)<4)return void h();const p=e.toMap({x:a.x,y:a.y});d=!0;try{const e=new t({geometry:p,attributes:{[o]:u.oid}}),r=yield i.applyEdits({updateFeatures:[e]}),s=null===(n=null==r?void 0:r.updateFeatureResults)||void 0===n?void 0:n[0];if(!s||s.error)throw new Error((null===(l=null==s?void 0:s.error)||void 0===l?void 0:l.message)||"Échec de l’enregistrement");u.geometry=p,D("Point déplacé."),J(I.dataSourceId)}catch(e){V("Le déplacement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:""))}finally{d=!1,h()}}}})))))})),()=>{a=!0,f.forEach((e=>{try{e.remove()}catch(e){}})),p.length&&e.graphics.removeMany(p),m&&e.graphics.remove(m),r&&(r.style.cursor=s||"")}}),[j,x,I]),e.React.useEffect((()=>{if(!F||!(null==x?void 0:x.view)||!I)return;let e=null,i=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{i||(e=new t({geometry:F,symbol:{type:"simple-marker",style:"circle",color:I.color,size:16,outline:{color:"#ffffff",width:2.5}}}),x.view.graphics.add(e))})),()=>{i=!0,e&&x.view.graphics.remove(e)}}),[F,x,I]),e.React.useEffect((()=>{if(!O||!(null==x?void 0:x.view))return;const e="editForm"===j||"editSaving"===j?"edit":"delete";let i=[],n=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{n||(i=b(t,O.geometry,e),x.view.graphics.addMany(i))})),()=>{n=!0,i.length&&x.view.graphics.removeMany(i)}}),[O,x,j]),e.React.useEffect((()=>{if("success"!==j)return;const e=window.setTimeout(U,4e3);return()=>window.clearTimeout(e)}),[j,U]);const T=(t,i)=>n(void 0,void 0,void 0,(function*(){var o;V(""),C(!0);try{const r=yield((t,i)=>n(void 0,void 0,void 0,(function*(){var n,o,r,s,a;if(!(null==t?void 0:t.view)||!(null==i?void 0:i.dataSourceId))return null;const l=i.dataSourceId;let c=null;try{c=null===(r=null===(o=(n=t).getJimuLayerViewByDataSourceId)||void 0===o?void 0:o.call(n,l))||void 0===r?void 0:r.layer}catch(e){}let d=null;try{d=e.DataSourceManager.getInstance().getDataSource(l)}catch(e){}if(c||(c=null==d?void 0:d.layer),!c){const e=null===(s=t.view.map)||void 0===s?void 0:s.allLayers;if(e&&(c=e.filter((e=>(null==d?void 0:d.layerId)&&e.id===d.layerId||l===e.id||l.endsWith("-"+e.id))).toArray().sort(((e,t)=>String(t.id).length-String(e.id).length))[0],!c)){const t=null===(a=null==d?void 0:d.getLabel)||void 0===a?void 0:a.call(d);t&&(c=e.find((e=>e.title===t)))}}return c&&"function"==typeof c.applyEdits?(yield c.load(),c):null})))(x,t.useDataSource);if(!r)return V("La couche liée à ce signalement est introuvable dans la carte. Prévenez l'administrateur."),null;if(r.geometryType&&"point"!==r.geometryType)return V("Cette couche n'est pas une couche de points. Prévenez l'administrateur."),null;const s=null===(o=r.capabilities)||void 0===o?void 0:o.operations;return"add"===i&&!1===(null==s?void 0:s.supportsAdd)?(V("Vous n'avez pas le droit d'ajouter des points sur cette couche."),null):"move"===i&&!1===(null==s?void 0:s.supportsUpdate)?(V("Vous n'avez pas le droit de déplacer les points de cette couche."),null):"edit"===i&&!1===(null==s?void 0:s.supportsUpdate)?(V("Vous n'avez pas le droit de modifier les points de cette couche."),null):"delete"===i&&!1===(null==s?void 0:s.supportsDelete)?(V("Vous n'avez pas le droit de supprimer les points de cette couche."),null):{label:t.label,iconUrl:t.iconUrl||"",color:t.color||"#0079c1",layer:r,fields:l(r),dataSourceId:t.useDataSource.dataSourceId}}catch(e){return V("Impossible de charger la couche. Réessayez dans un instant."),null}finally{C(!1)}})),W=()=>n(void 0,void 0,void 0,(function*(){var e,t;V(""),M("deleting");try{const i=yield I.layer.applyEdits({deleteFeatures:[{objectId:O.oid}]}),n=null===(e=null==i?void 0:i.deleteFeatureResults)||void 0===e?void 0:e[0];if(!n||n.error)throw new Error((null===(t=null==n?void 0:n.error)||void 0===t?void 0:t.message)||"Échec de la suppression");J(I.dataSourceId),G(null),N({title:"Point supprimé",hint:"Le signalement a été supprimé de la carte."}),M("success")}catch(e){V("La suppression a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),M("deleteConfirm")}})),H=(e,t)=>{E((i=>Object.assign(Object.assign({},i),{[e]:t})))},Y=()=>{if("editForm"!==j)Object.values(A).some((e=>""!==e&&void 0!==e))&&!window.confirm("Annuler ce signalement ? Les informations saisies seront perdues.")||U();else{const e=I.fields.some((e=>{var t,i;return(null!==(t=A[e.name])&&void 0!==t?t:"")!==(null!==(i=_[e.name])&&void 0!==i?i:"")}));if(e&&!window.confirm("Annuler la modification ? Les changements saisis seront perdus."))return;U()}},Q=()=>{for(const e of I.fields){const t=A[e.name],i=void 0===t||""===t;if(e.required&&i)return`Veuillez remplir le champ « ${e.label} ».`;if(!i&&("int"===e.kind||"decimal"===e.kind)){const i=Number(t);if(isNaN(i))return`« ${e.label} » doit être un nombre.`;if("int"===e.kind&&!Number.isInteger(i))return`« ${e.label} » doit être un nombre entier.`;if(void 0!==e.min&&i<e.min)return`« ${e.label} » doit être supérieur ou égal à ${e.min}.`;if(void 0!==e.max&&i>e.max)return`« ${e.label} » doit être inférieur ou égal à ${e.max}.`}}return""},K=()=>n(void 0,void 0,void 0,(function*(){var e,i;const n=Q();if(n)return void V(n);const o=I.fields.filter((e=>{var t,i;return(null!==(t=A[e.name])&&void 0!==t?t:"")!==(null!==(i=_[e.name])&&void 0!==i?i:"")}));if(0!==o.length){V(""),M("editSaving");try{const[n]=yield(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]),r={[I.layer.objectIdField]:O.oid};o.forEach((e=>{const t=d(e,A[e.name]);r[e.name]=void 0===t?null:t}));const s=new n({attributes:r}),a=yield I.layer.applyEdits({updateFeatures:[s]}),l=null===(e=null==a?void 0:a.updateFeatureResults)||void 0===e?void 0:e[0];if(!l||l.error)throw new Error((null===(i=null==l?void 0:l.error)||void 0===i?void 0:i.message)||"Échec de l’enregistrement");J(I.dataSourceId),G(null),N({title:"Signalement modifié",hint:"Les informations du point ont été mises à jour."}),M("success")}catch(e){V("La modification a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),M("editForm")}}else V("Aucune modification à enregistrer.")})),X=()=>n(void 0,void 0,void 0,(function*(){var e,i;const n=Q();if(n)V(n);else{V(""),M("saving");try{const[n]=yield(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]),o={};I.fields.forEach((e=>{const t=d(e,A[e.name]);void 0!==t&&(o[e.name]=t)}));const r=new n({geometry:F,attributes:o}),s=yield I.layer.applyEdits({addFeatures:[r]}),a=null===(e=null==s?void 0:s.addFeatureResults)||void 0===e?void 0:e[0];if(!a||a.error)throw new Error((null===(i=null==a?void 0:a.error)||void 0===i?void 0:i.message)||"Échec de l’enregistrement");J(I.dataSourceId),P(null),N({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),M("success")}catch(e){V("L'enregistrement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),M("form")}}})),Z=null===(a=o.useMapWidgetIds)||void 0===a?void 0:a[0],ee=(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:Z,onActiveViewChange:e=>y(e)});if(!Z)return(0,e.jsx)("div",{css:p.root},ee,(0,e.jsx)("p",{css:p.title},"Widget à configurer"),(0,e.jsx)("p",{css:p.hint},"Dans les paramètres du widget, choisissez la carte à utiliser."));const te=m.filter((e=>{var t;return null===(t=null==e?void 0:e.useDataSource)||void 0===t?void 0:t.dataSourceId}));if(0===te.length)return(0,e.jsx)("div",{css:p.root},ee,(0,e.jsx)("p",{css:p.title},"Widget à configurer"),(0,e.jsx)("p",{css:p.hint},"Dans les paramètres du widget, ajoutez au moins un type de signalement et choisissez sa couche."));if("idle"===j)return(0,e.jsx)("div",{css:p.root},ee,(0,e.jsx)("p",{css:p.title},"Que souhaitez-vous signaler ?"),!x&&(0,e.jsx)("p",{css:p.hint},"Chargement de la carte…"),te.map((t=>{const o=t.color||"#0079c1";return(0,e.jsx)("div",{css:p.row,key:t.id,style:f(o)},(0,e.jsx)("button",{type:"button",css:p.bigBtn,style:{flex:1,width:"auto",minWidth:0},disabled:!x||z,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"add");t&&(R(t),E({}),P(null),M("placing"))})))(t)},(0,e.jsx)(i,{color:o,iconUrl:t.iconUrl}),(0,e.jsx)("span",null,t.label)),(0,e.jsx)("button",{type:"button",css:p.iconBtn,style:Object.assign(Object.assign({},f(g)),{color:g}),title:"Déplacer des points","aria-label":`Déplacer des points : ${t.label}`,disabled:!x||z,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"move");t&&(R(t),P(null),G(null),D(""),M("move"))})))(t)},(0,e.jsx)(k,null)),(0,e.jsx)("button",{type:"button",css:p.iconBtn,style:Object.assign(Object.assign({},f(h)),{color:h}),title:"Corriger les informations d'un point","aria-label":`Corriger les informations d'un point : ${t.label}`,disabled:!x||z,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"edit");t&&(R(t),P(null),G(null),E({}),B({}),D(""),M("editPick"))})))(t)},(0,e.jsx)(w,null)),(0,e.jsx)("button",{type:"button",css:p.iconBtn,style:Object.assign(Object.assign({},f(v)),{color:v}),title:"Supprimer un point","aria-label":`Supprimer un point : ${t.label}`,disabled:!x||z,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield T(e,"delete");t&&(R(t),P(null),G(null),M("deletePick"))})))(t)},(0,e.jsx)(S,null)))})),z&&(0,e.jsx)("p",{css:p.hint},"Chargement…"),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L));if("placing"===j&&I)return(0,e.jsx)("div",{css:p.root,style:f(I.color)},ee,(0,e.jsx)("div",{css:p.banner},(0,e.jsx)("p",{css:p.title},"Cliquez sur la carte"),(0,e.jsx)("p",{css:p.hint},"Indiquez l'emplacement : ",I.label)),(0,e.jsx)("div",{css:p.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:p.btn,onClick:U},"Annuler")));if("move"===j&&I)return(0,e.jsx)("div",{css:p.root,style:f(g)},ee,(0,e.jsx)("div",{css:p.banner},(0,e.jsx)("p",{css:p.title},"Déplacer un point"),(0,e.jsx)("p",{css:p.hint},"Maintenez le clic sur un point « ",I.label," », glissez-le au bon endroit puis relâchez.")),$&&(0,e.jsx)("p",{css:p.notice,role:"status"},$),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L),(0,e.jsx)("div",{css:p.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:p.btn,className:"primary",onClick:U},"Terminer")));if("editPick"===j&&I)return(0,e.jsx)("div",{css:p.root,style:f(h)},ee,(0,e.jsx)("div",{css:p.banner},(0,e.jsx)("p",{css:p.title},"Cliquez sur le point à corriger"),(0,e.jsx)("p",{css:p.hint},"Type : ",I.label)),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L),(0,e.jsx)("div",{css:p.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:p.btn,onClick:U},"Annuler")));if("deletePick"===j&&I)return(0,e.jsx)("div",{css:p.root,style:f(v)},ee,(0,e.jsx)("div",{css:p.banner},(0,e.jsx)("p",{css:p.title},"Cliquez sur le point à supprimer"),(0,e.jsx)("p",{css:p.hint},"Type : ",I.label)),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L),(0,e.jsx)("div",{css:p.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:p.btn,onClick:U},"Annuler")));if(("deleteConfirm"===j||"deleting"===j)&&I){const t="deleting"===j;return(0,e.jsx)("div",{css:p.root,style:f(v)},ee,(0,e.jsx)("div",{css:p.banner},(0,e.jsx)("p",{css:p.title},"Voulez-vous supprimer ce point ?"),(0,e.jsx)("p",{css:p.hint},"Le point entouré en rouge sur la carte sera supprimé. Cliquez sur un autre point pour changer de sélection.")),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L),(0,e.jsx)("div",{css:p.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:p.btn,disabled:t,onClick:U},"Annuler"),(0,e.jsx)("button",{type:"button",css:p.btn,className:"primary",disabled:t,onClick:W},t?"Suppression…":"Supprimer")))}if("success"===j)return(0,e.jsx)("div",{css:p.root},ee,(0,e.jsx)("div",{css:p.center,role:"status"},(0,e.jsx)("p",{css:p.title},q.title),(0,e.jsx)("p",{css:p.hint},q.hint),(0,e.jsx)("button",{type:"button",css:p.btn,style:Object.assign(Object.assign({},f("#0079c1")),{flex:"0 0 auto",width:"100%"}),onClick:U},"Terminer")));if(("form"===j||"saving"===j||"editForm"===j||"editSaving"===j)&&I){const t="editForm"===j||"editSaving"===j,n="saving"===j||"editSaving"===j;return(0,e.jsx)("div",{css:p.root,style:f(t?h:I.color)},ee,(0,e.jsx)("div",{css:p.bigBtn,style:{cursor:"default",minHeight:48}},(0,e.jsx)(i,{color:I.color,iconUrl:I.iconUrl}),(0,e.jsx)("span",null,I.label)),(0,e.jsx)("div",null,(0,e.jsx)("p",{css:p.hint},t?"Point sélectionné sur la carte (entouré)":"Emplacement choisi sur la carte"),(0,e.jsx)("button",{type:"button",css:p.linkBtn,disabled:n,onClick:()=>{V(""),t?(G(null),E({}),B({}),M("editPick")):M("placing")}},t?"Choisir un autre point":"Changer l'emplacement")),0===I.fields.length&&(0,e.jsx)("p",{css:p.hint},"Cette couche n'a aucun champ à remplir. Validez pour enregistrer le point."),I.fields.map((t=>{var i;const o=`sig-${t.name}`,r=null!==(i=A[t.name])&&void 0!==i?i:"";return(0,e.jsx)("div",{css:p.field,key:t.name},(0,e.jsx)("label",{htmlFor:o},t.label,t.required&&(0,e.jsx)("span",{className:"req"}," *")),"textarea"===t.kind&&(0,e.jsx)("textarea",{id:o,value:r,maxLength:t.maxLength,disabled:n,onChange:e=>H(t.name,c(e.target.value))}),"text"===t.kind&&(0,e.jsx)("input",{id:o,type:"text",value:r,maxLength:t.maxLength,disabled:n,onChange:e=>H(t.name,c(e.target.value))}),("int"===t.kind||"decimal"===t.kind)&&(0,e.jsx)("input",{id:o,type:"number",inputMode:"int"===t.kind?"numeric":"decimal",step:"int"===t.kind?1:"any",min:t.min,max:t.max,value:r,disabled:n,onChange:e=>H(t.name,e.target.value)}),("date"===t.kind||"date-only"===t.kind||"timestamp-offset"===t.kind)&&(0,e.jsx)("input",{id:o,type:"date",value:r,disabled:n,onChange:e=>H(t.name,e.target.value)}),"time"===t.kind&&(0,e.jsx)("input",{id:o,type:"time",value:r,disabled:n,onChange:e=>H(t.name,e.target.value)}),"choice"===t.kind&&(0,e.jsx)("select",{id:o,value:r,disabled:n,onChange:e=>H(t.name,e.target.value)},(0,e.jsx)("option",{value:""},"— Choisir —"),t.choices.map((t=>(0,e.jsx)("option",{key:String(t.code),value:String(t.code)},t.name)))))})),L&&(0,e.jsx)("p",{css:p.error,role:"alert"},L),(0,e.jsx)("div",{css:p.actions},(0,e.jsx)("button",{type:"button",css:p.btn,disabled:n,onClick:Y},"Annuler"),(0,e.jsx)("button",{type:"button",css:p.btn,className:"primary",disabled:n,onClick:t?K:X},n?"Enregistrement…":t?"Enregistrer les modifications":"Valider")))}return null};function z(e){o.p=e}})(),r})())}}}));