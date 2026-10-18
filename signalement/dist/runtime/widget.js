System.register(["jimu-core","jimu-arcgis"],(function(e,t){var i={},n={};return{setters:[function(e){i.DataSourceManager=e.DataSourceManager,i.React=e.React,i.css=e.css,i.jsx=e.jsx},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent,n.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules}],execute:function(){e((()=>{var e={826:e=>{"use strict";e.exports=n},891:e=>{"use strict";e.exports=i}},t={};function o(i){var n=t[i];if(void 0!==n)return n.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,o),r.exports}o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="";var r={};return o.p=window.jimuConfig.baseUrl,(()=>{"use strict";o.r(r),o.d(r,{__set_webpack_public_path__:()=>x,default:()=>g});var e=o(891),t=o(826);const i=({color:t,iconUrl:i,size:n=36})=>e.React.createElement("svg",{width:n,height:Math.round(.9*n),viewBox:"0 0 40 36","aria-hidden":"true",style:{flex:"0 0 auto"}},e.React.createElement("polygon",{points:"20,3 37,33 3,33",fill:"ffffff",stroke:t,strokeWidth:"4",strokeLinejoin:"round"}),i&&e.React.createElement("image",{href:i,x:"14",y:"17",width:"12",height:"12",preserveAspectRatio:"xMidYMid meet"}));var n=function(e,t,i,n){return new(i||(i=Promise))((function(o,r){function s(e){try{l(n.next(e))}catch(e){r(e)}}function a(e){try{l(n.throw(e))}catch(e){r(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(s,a)}l((n=n.apply(e,t||[])).next())}))};const s=["oid","global-id","geometry","blob","raster","guid","xml"],a=["shape","shape__area","shape__length","st_area(shape)","st_length(shape)"],l=e=>{const t=e.editFieldsInfo||{},i=[t.creatorField,t.creationDateField,t.editorField,t.editDateField].filter(Boolean).map((e=>e.toLowerCase()));return(e.fields||[]).filter((e=>{const t=String(e.name).toLowerCase();return!s.includes(e.type)&&!1!==e.editable&&!a.includes(t)&&!i.includes(t)})).map((t=>{var i,n,o,r;const s={name:t.name,label:t.alias||t.name,kind:"text",required:!1===t.nullable&&(void 0===t.defaultValue||null===t.defaultValue)};if(t.name===e.typeIdField&&(null===(i=e.types)||void 0===i?void 0:i.length))return s.kind="choice",s.choices=e.types.map((e=>({code:e.id,name:e.name}))),s;if("coded-value"===(null===(n=t.domain)||void 0===n?void 0:n.type)&&(null===(o=t.domain.codedValues)||void 0===o?void 0:o.length))return s.kind="choice",s.choices=t.domain.codedValues.map((e=>({code:e.code,name:e.name}))),s;switch(t.type){case"small-integer":case"integer":case"big-integer":case"long":s.kind="int";break;case"single":case"double":s.kind="decimal";break;case"date":s.kind="date";break;case"date-only":s.kind="date-only";break;case"timestamp-offset":s.kind="timestamp-offset";break;case"time-only":s.kind="time";break;default:s.kind=!t.length||t.length>=100?"textarea":"text",s.maxLength=t.length||void 0}return"range"===(null===(r=t.domain)||void 0===r?void 0:r.type)&&(s.min=t.domain.minValue,s.max=t.domain.maxValue),s}))},c={root:e.css`
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
  `},d=e=>{const t=/^#?([0-9a-f]{6})$/i.exec(e||"");if(!t)return"#eef5fb";const i=parseInt(t[1],16),n=e=>Math.round(e+.9*(255-e));return`rgb(${n(i>>16&255)}, ${n(i>>8&255)}, ${n(255&i)})`},u=e=>({"--c":e,"--c-soft":d(e)}),p={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},f=()=>(0,e.jsx)("svg",Object.assign({},p),(0,e.jsx)("path",{d:"M12 3v18M3 12h18"}),(0,e.jsx)("path",{d:"M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"})),m=()=>(0,e.jsx)("svg",Object.assign({},p),(0,e.jsx)("path",{d:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"})),v="#d32f2f",g=o=>{var r,s,a;const d=null!==(s=null===(r=o.config)||void 0===r?void 0:r.types)&&void 0!==s?s:[],[p,g]=e.React.useState(null),[x,y]=e.React.useState("idle"),[h,b]=e.React.useState(!1),[j,k]=e.React.useState(null),[w,S]=e.React.useState(null),[z,M]=e.React.useState({}),[C,I]=e.React.useState(""),[R,P]=e.React.useState(""),[A,E]=e.React.useState(null),[L,V]=e.React.useState({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),D=e.React.useCallback((()=>{y("idle"),k(null),S(null),E(null),M({}),I(""),P(""),b(!1)}),[]);e.React.useEffect((()=>{"CLOSED"===o.state&&D()}),[o.state,D]);const F=t=>{var i;try{const n=e.DataSourceManager.getInstance().getDataSource(t);null===(i=null==n?void 0:n.forceRefresh)||void 0===i||i.call(n)}catch(e){}};e.React.useEffect((()=>{var e,i;if(!["placing","deletePick","deleteConfirm"].includes(x)||!(null==p?void 0:p.view))return;const o=p.view,r=o.container,s=null==r?void 0:r.style.cursor;r&&(r.style.cursor="crosshair");try{null===(i=null===(e=o.popup)||void 0===e?void 0:e.close)||void 0===i||i.call(e)}catch(e){}const a=o.on("immediate-click",(e=>{var i;e.stopPropagation(),e.mapPoint&&("placing"===x?(S(e.mapPoint),y("form")):(i=e.mapPoint,n(void 0,void 0,void 0,(function*(){try{const[e]=yield(0,t.loadArcGISJSAPIModules)(["esri/geometry/Extent"]),n=14*(o.resolution||1),r=new e({xmin:i.x-n,ymin:i.y-n,xmax:i.x+n,ymax:i.y+n,spatialReference:i.spatialReference}),s=j.layer.objectIdField,a=yield j.layer.queryFeatures({geometry:r,spatialRelationship:"intersects",returnGeometry:!0,outFields:[s],outSpatialReference:o.spatialReference,num:50}),l=(null==a?void 0:a.features)||[];if(0===l.length)return void I("Aucun point à cet endroit. Cliquez directement sur le point.");let c=l[0],d=1/0;l.forEach((e=>{const t=Math.hypot(e.geometry.x-i.x,e.geometry.y-i.y);t<d&&(d=t,c=e)})),I(""),E({oid:c.attributes[s],geometry:c.geometry}),y("deleteConfirm")}catch(e){I("Impossible de rechercher le point. Réessayez.")}}))))}));return()=>{a.remove(),r&&(r.style.cursor=s||"")}}),[x,p,j]),e.React.useEffect((()=>{if("move"!==x||!(null==p?void 0:p.view)||!j)return;const e=p.view,i=j.layer,o=i.objectIdField,r=e.container,s=null==r?void 0:r.style.cursor;let a=!1,l=[],c=null,d=!1,u=0,f=null,m=null;const v=[],g=(t,i)=>{let n=null,o=18;return l.forEach((r=>{const s=e.toScreen(r.geometry);if(!s)return;const a=Math.hypot(s.x-t,s.y-i);a<o&&(o=a,n=r)})),n};return(0,t.loadArcGISJSAPIModules)(["esri/Graphic","esri/core/reactiveUtils"]).then((([t,p])=>{if(a)return;const x=()=>{f&&e.graphics.remove(f),m&&e.graphics.remove(m),f=null,m=null};v.push(p.watch((()=>e.stationary),(t=>{t&&n(void 0,void 0,void 0,(function*(){const t=++u;try{const n=yield i.queryFeatures({geometry:e.extent,spatialRelationship:"intersects",returnGeometry:!0,outFields:[o],outSpatialReference:e.spatialReference});a||t!==u||(l=(n.features||[]).map((e=>({oid:e.attributes[o],geometry:e.geometry}))))}catch(e){}}))}),{initial:!0})),v.push(e.on("pointer-move",(e=>{!c&&r&&(r.style.cursor=g(e.x,e.y)?"grab":s||"")}))),v.push(e.on("drag",(a=>n(void 0,void 0,void 0,(function*(){var n,l;if("start"===a.action){if(d)return;const i=g(a.x,a.y);if(!i)return;return a.stopPropagation(),c=i,I(""),P(""),f=new t({geometry:i.geometry,symbol:{type:"simple-marker",style:"circle",color:[255,255,255,0],size:24,outline:{color:"#7b8794",width:2}}}),m=new t({geometry:i.geometry,symbol:{type:"simple-marker",style:"circle",color:j.color,size:16,outline:{color:"#ffffff",width:2.5}}}),e.graphics.addMany([f,m]),void(r&&(r.style.cursor="grabbing"))}if(c)if(a.stopPropagation(),"update"!==a.action){if("end"===a.action){const u=c;if(c=null,r&&(r.style.cursor=s||""),Math.hypot(a.x-a.origin.x,a.y-a.origin.y)<4)return void x();const p=e.toMap({x:a.x,y:a.y});d=!0;try{const e=new t({geometry:p,attributes:{[o]:u.oid}}),r=yield i.applyEdits({updateFeatures:[e]}),s=null===(n=null==r?void 0:r.updateFeatureResults)||void 0===n?void 0:n[0];if(!s||s.error)throw new Error((null===(l=null==s?void 0:s.error)||void 0===l?void 0:l.message)||"Échec de l’enregistrement");u.geometry=p,P("Point déplacé."),F(j.dataSourceId)}catch(e){I("Le déplacement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:""))}finally{d=!1,x()}}}else m.geometry=e.toMap({x:a.x,y:a.y})})))))})),()=>{a=!0,v.forEach((e=>{try{e.remove()}catch(e){}})),f&&e.graphics.remove(f),m&&e.graphics.remove(m),r&&(r.style.cursor=s||"")}}),[x,p,j]),e.React.useEffect((()=>{if(!w||!(null==p?void 0:p.view)||!j)return;let e=null,i=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{i||(e=new t({geometry:w,symbol:{type:"simple-marker",style:"circle",color:j.color,size:16,outline:{color:"#ffffff",width:2.5}}}),p.view.graphics.add(e))})),()=>{i=!0,e&&p.view.graphics.remove(e)}}),[w,p,j]),e.React.useEffect((()=>{if(!A||!(null==p?void 0:p.view))return;let e=null,i=!1;return(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]).then((([t])=>{i||(e=new t({geometry:A.geometry,symbol:{type:"simple-marker",style:"circle",color:[211,47,47,.12],size:28,outline:{color:v,width:3}}}),p.view.graphics.add(e))})),()=>{i=!0,e&&p.view.graphics.remove(e)}}),[A,p]),e.React.useEffect((()=>{if("success"!==x)return;const e=window.setTimeout(D,4e3);return()=>window.clearTimeout(e)}),[x,D]);const $=(t,i)=>n(void 0,void 0,void 0,(function*(){var o;I(""),b(!0);try{const r=yield((t,i)=>n(void 0,void 0,void 0,(function*(){var n,o,r,s,a;if(!(null==t?void 0:t.view)||!(null==i?void 0:i.dataSourceId))return null;const l=i.dataSourceId;let c=null;try{c=null===(r=null===(o=(n=t).getJimuLayerViewByDataSourceId)||void 0===o?void 0:o.call(n,l))||void 0===r?void 0:r.layer}catch(e){}let d=null;try{d=e.DataSourceManager.getInstance().getDataSource(l)}catch(e){}if(c||(c=null==d?void 0:d.layer),!c){const e=null===(s=t.view.map)||void 0===s?void 0:s.allLayers;if(e&&(c=e.filter((e=>(null==d?void 0:d.layerId)&&e.id===d.layerId||l===e.id||l.endsWith("-"+e.id))).toArray().sort(((e,t)=>String(t.id).length-String(e.id).length))[0],!c)){const t=null===(a=null==d?void 0:d.getLabel)||void 0===a?void 0:a.call(d);t&&(c=e.find((e=>e.title===t)))}}return c&&"function"==typeof c.applyEdits?(yield c.load(),c):null})))(p,t.useDataSource);if(!r)return I("La couche liée à ce signalement est introuvable dans la carte. Prévenez l'administrateur."),null;if(r.geometryType&&"point"!==r.geometryType)return I("Cette couche n'est pas une couche de points. Prévenez l'administrateur."),null;const s=null===(o=r.capabilities)||void 0===o?void 0:o.operations;return"add"===i&&!1===(null==s?void 0:s.supportsAdd)?(I("Vous n'avez pas le droit d'ajouter des points sur cette couche."),null):"move"===i&&!1===(null==s?void 0:s.supportsUpdate)?(I("Vous n'avez pas le droit de déplacer les points de cette couche."),null):"delete"===i&&!1===(null==s?void 0:s.supportsDelete)?(I("Vous n'avez pas le droit de supprimer les points de cette couche."),null):{label:t.label,iconUrl:t.iconUrl||"",color:t.color||"#0079c1",layer:r,fields:l(r),dataSourceId:t.useDataSource.dataSourceId}}catch(e){return I("Impossible de charger la couche. Réessayez dans un instant."),null}finally{b(!1)}})),_=()=>n(void 0,void 0,void 0,(function*(){var e,t;I(""),y("deleting");try{const i=yield j.layer.applyEdits({deleteFeatures:[{objectId:A.oid}]}),n=null===(e=null==i?void 0:i.deleteFeatureResults)||void 0===e?void 0:e[0];if(!n||n.error)throw new Error((null===(t=null==n?void 0:n.error)||void 0===t?void 0:t.message)||"Échec de la suppression");F(j.dataSourceId),E(null),V({title:"Point supprimé",hint:"Le signalement a été supprimé de la carte."}),y("success")}catch(e){I("La suppression a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),y("deleteConfirm")}})),O=(e,t)=>{M((i=>Object.assign(Object.assign({},i),{[e]:t})))},G=()=>{Object.values(z).some((e=>""!==e&&void 0!==e))&&!window.confirm("Annuler ce signalement ? Les informations saisies seront perdues.")||D()},q=()=>n(void 0,void 0,void 0,(function*(){var e,i;const n=(()=>{for(const e of j.fields){const t=z[e.name],i=void 0===t||""===t;if(e.required&&i)return`Veuillez remplir le champ « ${e.label} ».`;if(!i&&("int"===e.kind||"decimal"===e.kind)){const i=Number(t);if(isNaN(i))return`« ${e.label} » doit être un nombre.`;if("int"===e.kind&&!Number.isInteger(i))return`« ${e.label} » doit être un nombre entier.`;if(void 0!==e.min&&i<e.min)return`« ${e.label} » doit être supérieur ou égal à ${e.min}.`;if(void 0!==e.max&&i>e.max)return`« ${e.label} » doit être inférieur ou égal à ${e.max}.`}}return""})();if(n)I(n);else{I(""),y("saving");try{const[n]=yield(0,t.loadArcGISJSAPIModules)(["esri/Graphic"]),o={};j.fields.forEach((e=>{const t=((e,t)=>{var i;if(null!=t&&""!==t)switch(e.kind){case"int":case"decimal":return Number(t);case"date":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).getTime()}case"timestamp-offset":{const[e,i,n]=t.split("-").map(Number);return new Date(e,i-1,n,12,0,0).toISOString()}case"date-only":default:return t;case"time":return 5===t.length?t+":00":t;case"choice":{const n=null===(i=e.choices)||void 0===i?void 0:i.find((e=>String(e.code)===t));return n?n.code:t}}})(e,z[e.name]);void 0!==t&&(o[e.name]=t)}));const r=new n({geometry:w,attributes:o}),s=yield j.layer.applyEdits({addFeatures:[r]}),a=null===(e=null==s?void 0:s.addFeatureResults)||void 0===e?void 0:e[0];if(!a||a.error)throw new Error((null===(i=null==a?void 0:a.error)||void 0===i?void 0:i.message)||"Échec de l’enregistrement");F(j.dataSourceId),S(null),V({title:"Signalement enregistré",hint:"Le point a été ajouté sur la carte."}),y("success")}catch(e){I("L'enregistrement a échoué. Vérifiez votre connexion et réessayez."+((null==e?void 0:e.message)?` (${e.message})`:"")),y("form")}}})),B=null===(a=o.useMapWidgetIds)||void 0===a?void 0:a[0],J=(0,e.jsx)(t.JimuMapViewComponent,{useMapWidgetId:B,onActiveViewChange:e=>g(e)});if(!B)return(0,e.jsx)("div",{css:c.root},J,(0,e.jsx)("p",{css:c.title},"Widget à configurer"),(0,e.jsx)("p",{css:c.hint},"Dans les paramètres du widget, choisissez la carte à utiliser."));const N=d.filter((e=>{var t;return null===(t=null==e?void 0:e.useDataSource)||void 0===t?void 0:t.dataSourceId}));if(0===N.length)return(0,e.jsx)("div",{css:c.root},J,(0,e.jsx)("p",{css:c.title},"Widget à configurer"),(0,e.jsx)("p",{css:c.hint},"Dans les paramètres du widget, ajoutez au moins un type de signalement et choisissez sa couche."));if("idle"===x)return(0,e.jsx)("div",{css:c.root},J,(0,e.jsx)("p",{css:c.title},"Que souhaitez-vous signaler ?"),!p&&(0,e.jsx)("p",{css:c.hint},"Chargement de la carte…"),N.map((t=>{const o=t.color||"#0079c1";return(0,e.jsx)("div",{css:c.row,key:t.id,style:u(o)},(0,e.jsx)("button",{type:"button",css:c.bigBtn,style:{flex:1,width:"auto",minWidth:0},disabled:!p||h,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield $(e,"add");t&&(k(t),M({}),S(null),y("placing"))})))(t)},(0,e.jsx)(i,{color:o,iconUrl:t.iconUrl}),(0,e.jsx)("span",null,t.label)),(0,e.jsx)("button",{type:"button",css:c.iconBtn,title:"Déplacer des points","aria-label":`Déplacer des points : ${t.label}`,disabled:!p||h,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield $(e,"move");t&&(k(t),S(null),E(null),P(""),y("move"))})))(t)},(0,e.jsx)(f,null)),(0,e.jsx)("button",{type:"button",css:c.iconBtn,title:"Supprimer un point","aria-label":`Supprimer un point : ${t.label}`,disabled:!p||h,onClick:()=>(e=>n(void 0,void 0,void 0,(function*(){const t=yield $(e,"delete");t&&(k(t),S(null),E(null),y("deletePick"))})))(t)},(0,e.jsx)(m,null)))})),h&&(0,e.jsx)("p",{css:c.hint},"Chargement…"),C&&(0,e.jsx)("p",{css:c.error,role:"alert"},C));if("placing"===x&&j)return(0,e.jsx)("div",{css:c.root,style:u(j.color)},J,(0,e.jsx)("div",{css:c.banner},(0,e.jsx)("p",{css:c.title},"Cliquez sur la carte"),(0,e.jsx)("p",{css:c.hint},"Indiquez l'emplacement : ",j.label)),(0,e.jsx)("div",{css:c.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:c.btn,onClick:D},"Annuler")));if("move"===x&&j)return(0,e.jsx)("div",{css:c.root,style:u(j.color)},J,(0,e.jsx)("div",{css:c.banner},(0,e.jsx)("p",{css:c.title},"Déplacer un point"),(0,e.jsx)("p",{css:c.hint},"Maintenez le clic sur un point « ",j.label," », glissez-le au bon endroit puis relâchez.")),R&&(0,e.jsx)("p",{css:c.notice,role:"status"},R),C&&(0,e.jsx)("p",{css:c.error,role:"alert"},C),(0,e.jsx)("div",{css:c.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:c.btn,className:"primary",onClick:D},"Terminer")));if("deletePick"===x&&j)return(0,e.jsx)("div",{css:c.root,style:u(j.color)},J,(0,e.jsx)("div",{css:c.banner},(0,e.jsx)("p",{css:c.title},"Cliquez sur le point à supprimer"),(0,e.jsx)("p",{css:c.hint},"Type : ",j.label)),C&&(0,e.jsx)("p",{css:c.error,role:"alert"},C),(0,e.jsx)("div",{css:c.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:c.btn,onClick:D},"Annuler")));if(("deleteConfirm"===x||"deleting"===x)&&j){const t="deleting"===x;return(0,e.jsx)("div",{css:c.root,style:u(v)},J,(0,e.jsx)("div",{css:c.banner},(0,e.jsx)("p",{css:c.title},"Voulez-vous supprimer ce point ?"),(0,e.jsx)("p",{css:c.hint},"Le point entouré en rouge sur la carte sera supprimé. Cliquez sur un autre point pour changer de sélection.")),C&&(0,e.jsx)("p",{css:c.error,role:"alert"},C),(0,e.jsx)("div",{css:c.actions,style:{position:"static",padding:0}},(0,e.jsx)("button",{type:"button",css:c.btn,disabled:t,onClick:D},"Annuler"),(0,e.jsx)("button",{type:"button",css:c.btn,className:"primary",disabled:t,onClick:_},t?"Suppression…":"Supprimer")))}if("success"===x)return(0,e.jsx)("div",{css:c.root},J,(0,e.jsx)("div",{css:c.center,role:"status"},(0,e.jsx)("p",{css:c.title},L.title),(0,e.jsx)("p",{css:c.hint},L.hint),(0,e.jsx)("button",{type:"button",css:c.btn,style:Object.assign(Object.assign({},u("#0079c1")),{flex:"0 0 auto",width:"100%"}),onClick:D},"Terminer")));if(("form"===x||"saving"===x)&&j){const t="saving"===x;return(0,e.jsx)("div",{css:c.root,style:u(j.color)},J,(0,e.jsx)("div",{css:c.bigBtn,style:{cursor:"default",minHeight:48}},(0,e.jsx)(i,{color:j.color,iconUrl:j.iconUrl}),(0,e.jsx)("span",null,j.label)),(0,e.jsx)("div",null,(0,e.jsx)("p",{css:c.hint},"Emplacement choisi sur la carte"),(0,e.jsx)("button",{type:"button",css:c.linkBtn,disabled:t,onClick:()=>{I(""),y("placing")}},"Changer l'emplacement")),0===j.fields.length&&(0,e.jsx)("p",{css:c.hint},"Cette couche n'a aucun champ à remplir. Validez pour enregistrer le point."),j.fields.map((i=>{var n;const o=`sig-${i.name}`,r=null!==(n=z[i.name])&&void 0!==n?n:"";return(0,e.jsx)("div",{css:c.field,key:i.name},(0,e.jsx)("label",{htmlFor:o},i.label,i.required&&(0,e.jsx)("span",{className:"req"}," *")),"textarea"===i.kind&&(0,e.jsx)("textarea",{id:o,value:r,maxLength:i.maxLength,disabled:t,onChange:e=>O(i.name,e.target.value)}),"text"===i.kind&&(0,e.jsx)("input",{id:o,type:"text",value:r,maxLength:i.maxLength,disabled:t,onChange:e=>O(i.name,e.target.value)}),("int"===i.kind||"decimal"===i.kind)&&(0,e.jsx)("input",{id:o,type:"number",inputMode:"int"===i.kind?"numeric":"decimal",step:"int"===i.kind?1:"any",min:i.min,max:i.max,value:r,disabled:t,onChange:e=>O(i.name,e.target.value)}),("date"===i.kind||"date-only"===i.kind||"timestamp-offset"===i.kind)&&(0,e.jsx)("input",{id:o,type:"date",value:r,disabled:t,onChange:e=>O(i.name,e.target.value)}),"time"===i.kind&&(0,e.jsx)("input",{id:o,type:"time",value:r,disabled:t,onChange:e=>O(i.name,e.target.value)}),"choice"===i.kind&&(0,e.jsx)("select",{id:o,value:r,disabled:t,onChange:e=>O(i.name,e.target.value)},(0,e.jsx)("option",{value:""},"— Choisir —"),i.choices.map((t=>(0,e.jsx)("option",{key:String(t.code),value:String(t.code)},t.name)))))})),C&&(0,e.jsx)("p",{css:c.error,role:"alert"},C),(0,e.jsx)("div",{css:c.actions},(0,e.jsx)("button",{type:"button",css:c.btn,disabled:t,onClick:G},"Annuler"),(0,e.jsx)("button",{type:"button",css:c.btn,className:"primary",disabled:t,onClick:q},t?"Enregistrement…":"Valider")))}return null};function x(e){o.p=e}})(),r})())}}}));