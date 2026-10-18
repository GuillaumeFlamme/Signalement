System.register(["jimu-core","jimu-ui/advanced/setting-components","jimu-ui/advanced/data-source-selector","jimu-ui"],(function(e,t){var i={},s={},o={},a={};return{setters:[function(e){i.DataSourceTypes=e.DataSourceTypes,i.Immutable=e.Immutable,i.React=e.React,i.css=e.css,i.jsx=e.jsx},function(e){s.MapWidgetSelector=e.MapWidgetSelector,s.SettingRow=e.SettingRow,s.SettingSection=e.SettingSection},function(e){o.DataSourceSelector=e.DataSourceSelector},function(e){a.Button=e.Button,a.TextInput=e.TextInput}],execute:function(){e((()=>{var e={891:e=>{"use strict";e.exports=i},726:e=>{"use strict";e.exports=a},338:e=>{"use strict";e.exports=o},756:e=>{"use strict";e.exports=s}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.p="";var r={};return n.p=window.jimuConfig.baseUrl,(()=>{"use strict";n.r(r),n.d(r,{__set_webpack_public_path__:()=>d,default:()=>u});var e=n(891),t=n(756),i=n(338),s=n(726);const o=({color:t,iconUrl:i,size:s=36})=>e.React.createElement("svg",{width:s,height:Math.round(.9*s),viewBox:"0 0 40 36","aria-hidden":"true",style:{flex:"0 0 auto"}},e.React.createElement("polygon",{points:"20,3 37,33 3,33",fill:"ffffff",stroke:t,strokeWidth:"4",strokeLinejoin:"round"}),i&&e.React.createElement("image",{href:i,x:"14",y:"17",width:"12",height:"12",preserveAspectRatio:"xMidYMid meet"}));const a=["#0079c1","#e53935","#fb8c00","#43a047","#8e24aa","#00897b","#6d4c41","#455a64"],c={card:e.css`
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    margin-bottom: 12px;
    border: 1px solid var(--sys-color-divider-secondary, #444);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,head:e.css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-weight: 600;
  `,title:e.css`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  `,swatches:e.css`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  `,swatch:e.css`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    padding: 0;
    &.on { border-color: #fff; box-shadow: 0 0 0 2px #888; }
  `,label:e.css`
    font-size: 13px;
    margin-bottom: 4px;
  `,row:e.css`
    display: flex;
    align-items: center;
    gap: 8px;
  `},l=e=>new Promise(((t,i)=>{const s=new FileReader;s.onerror=i,s.onload=()=>{const e=new Image;e.onerror=i,e.onload=()=>{const i=Math.min(1,96/Math.max(e.width,e.height)),s=document.createElement("canvas");s.width=Math.max(1,Math.round(e.width*i)),s.height=Math.max(1,Math.round(e.height*i)),s.getContext("2d").drawImage(e,0,0,s.width,s.height),t(s.toDataURL("image/png"))},e.src=s.result},s.readAsDataURL(e)})),u=n=>{const r=()=>{var e;return(null===(e=n.config)||void 0===e?void 0:e.types)?n.config.types.asMutable({deep:!0}):[]},u=t=>{var i;const s={},o=[];t.forEach((e=>{const t=e.useDataSource;(null==t?void 0:t.dataSourceId)&&!s[t.dataSourceId]&&(s[t.dataSourceId]=!0,o.push(t))})),n.onSettingChange({id:n.id,config:(null!==(i=n.config)&&void 0!==i?i:(0,e.Immutable)({})).set("types",t),useDataSources:o})},d=(e,t)=>{const i=r();i[e]=Object.assign(Object.assign({},i[e]),t),u(i)},p=(e,t)=>{const i=r(),s=e+t;if(s<0||s>=i.length)return;const[o]=i.splice(e,1);i.splice(s,0,o),u(i)},g=r();return(0,e.jsx)("div",{className:"widget-setting-signalement"},(0,e.jsx)(t.SettingSection,{title:"Carte"},(0,e.jsx)(t.SettingRow,null,(0,e.jsx)(t.MapWidgetSelector,{useMapWidgetIds:n.useMapWidgetIds,onSelect:e=>n.onSettingChange({id:n.id,useMapWidgetIds:e})}))),(0,e.jsx)(t.SettingSection,{title:"Lier les couches"},g.map(((t,x)=>{const m=t.color||a[0],h=`sig-file-${t.id}`;return(0,e.jsx)("div",{css:c.card,key:t.id},(0,e.jsx)("div",{css:c.head},(0,e.jsx)("span",{css:c.title},(0,e.jsx)(o,{color:m,iconUrl:t.iconUrl,size:30}),(0,e.jsx)("span",null,t.label||"Signalement")),(0,e.jsx)("span",{style:{whiteSpace:"nowrap"}},(0,e.jsx)(s.Button,{size:"sm",type:"tertiary",disabled:0===x,onClick:()=>p(x,-1),title:"Monter"},"↑"),(0,e.jsx)(s.Button,{size:"sm",type:"tertiary",disabled:x===g.length-1,onClick:()=>p(x,1),title:"Descendre"},"↓"),(0,e.jsx)(s.Button,{size:"sm",type:"tertiary",onClick:()=>(e=>{const t=r();t.splice(e,1),u(t)})(x)},"Supprimer"))),(0,e.jsx)("div",null,(0,e.jsx)("div",{css:c.label},"Libellé"),(0,e.jsx)(s.TextInput,{size:"sm",className:"w-100",defaultValue:t.label,onAcceptValue:e=>d(x,{label:e})})),(0,e.jsx)("div",null,(0,e.jsx)("div",{css:c.label},"Image (PNG)"),(0,e.jsx)("div",{css:c.row},(0,e.jsx)("input",{id:h,type:"file",accept:"image/png",style:{display:"none"},onChange:e=>{var t,i,s,o,a,n,r;i=x,s=null===(t=e.target.files)||void 0===t?void 0:t[0],o=void 0,a=void 0,r=function*(){if(s)try{d(i,{iconUrl:yield l(s)})}catch(e){window.alert("Impossible de lire cette image. Utilisez un fichier PNG.")}},new((n=void 0)||(n=Promise))((function(e,t){function i(e){try{c(r.next(e))}catch(e){t(e)}}function s(e){try{c(r.throw(e))}catch(e){t(e)}}function c(t){var o;t.done?e(t.value):(o=t.value,o instanceof n?o:new n((function(e){e(o)}))).then(i,s)}c((r=r.apply(o,a||[])).next())})),e.target.value=""}}),(0,e.jsx)(s.Button,{size:"sm",type:"secondary",onClick:()=>document.getElementById(h).click()},t.iconUrl?"Remplacer":"Choisir un fichier"),t.iconUrl&&(0,e.jsx)(s.Button,{size:"sm",type:"tertiary",onClick:()=>d(x,{iconUrl:void 0})},"Retirer"))),(0,e.jsx)("div",null,(0,e.jsx)("div",{css:c.label},"Couleur"),(0,e.jsx)("div",{css:c.swatches},a.map((t=>(0,e.jsx)("button",{key:t,type:"button",css:c.swatch,className:m===t?"on":"",style:{background:t},"aria-label":t,onClick:()=>d(x,{color:t})}))))),(0,e.jsx)("div",null,(0,e.jsx)("div",{css:c.label},"Couche"),(0,e.jsx)(i.DataSourceSelector,{types:(0,e.Immutable)([e.DataSourceTypes.FeatureLayer]),useDataSources:t.useDataSource?(0,e.Immutable)([t.useDataSource]):(0,e.Immutable)([]),mustUseDataSource:!0,isMultiple:!1,widgetId:n.id,onChange:e=>{const t=null==e?void 0:e[0],i=(null==t?void 0:t.asMutable)?t.asMutable({deep:!0}):t;d(x,{useDataSource:i})}})))})),(0,e.jsx)(t.SettingRow,null,(0,e.jsx)(s.Button,{type:"primary",className:"w-100",onClick:()=>{const e=r();e.push({id:"t"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),label:"Nouveau signalement",color:a[e.length%a.length]}),u(e)}},"Ajouter"))))};function d(e){n.p=e}})(),r})())}}}));