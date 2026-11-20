var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,o)=>(o=n==null?{}:e(i(n)),c(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=Symbol(`NOT_RESOLVED`);function d(e,t){return{tagName:e,nodeKind:`scalar`,implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(e=>String(e)),representTagName:t.representTagName??(()=>e)}}function f(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`sequence`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}function p(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:`mapping`,implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(e=>e),carrierIsResult:n,identify:t.identify,represent:t.represent??(e=>e),representTagName:t.representTagName??(()=>e)}}var ee=d(`tag:yaml.org,2002:str`,{resolve:e=>e,identify:e=>typeof e==`string`}),te=[``,`~`,`null`,`Null`,`NULL`],ne=d(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>te.indexOf(e)===-1?u:null,identify:e=>e===null,represent:()=>`null`}),re=d(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[`n`],resolve:(e,t)=>e===`null`||t&&e===``?null:u,identify:e=>e===null,represent:()=>`null`}),ie=[``,`~`,`null`,`Null`,`NULL`],ae=d(`tag:yaml.org,2002:null`,{implicit:!0,implicitFirstChars:[``,`~`,`n`,`N`],resolve:e=>ie.indexOf(e)===-1?u:null,identify:e=>e===null,represent:()=>`null`}),oe=[`true`,`True`,`TRUE`],se=[`false`,`False`,`FALSE`],ce=d(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`T`,`f`,`F`],resolve:e=>oe.indexOf(e)!==-1||se.indexOf(e)===-1&&u,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),le=[`true`],ue=[`false`],de=d(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`t`,`f`],resolve:e=>le.indexOf(e)!==-1||ue.indexOf(e)===-1&&u,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),fe=[`true`,`True`,`TRUE`,`y`,`Y`,`yes`,`Yes`,`YES`,`on`,`On`,`ON`],pe=[`false`,`False`,`FALSE`,`n`,`N`,`no`,`No`,`NO`,`off`,`Off`,`OFF`],me=d(`tag:yaml.org,2002:bool`,{implicit:!0,implicitFirstChars:[`y`,`Y`,`n`,`N`,`t`,`T`,`f`,`F`,`o`,`O`],resolve:e=>fe.indexOf(e)!==-1||pe.indexOf(e)===-1&&u,identify:e=>Object.prototype.toString.call(e)===`[object Boolean]`,represent:e=>e?`true`:`false`}),he=RegExp(`^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$`),ge=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`);function _e(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function ve(e,t){if(t){if(!ge.test(e))return u}else if(!he.test(e))return u;let n=_e(e);return Number.isFinite(n)?n:u}var ye=d(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:ve,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),be=RegExp(`^-?(?:0|[1-9][0-9]*)$`),xe=RegExp(`^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$`);function Se(e){let t=e,n=1;return(t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`)?n*parseInt(t.slice(2),2):t.startsWith(`0o`)?n*parseInt(t.slice(2),8):t.startsWith(`0x`)?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Ce(e,t){if(t){if(!xe.test(e))return u}else if(!be.test(e))return u;let n=Se(e);return Number.isFinite(n)?n:u}var we=d(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Ce,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),Te=RegExp(`^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$`);function Ee(e){let t=e.replace(/_/g,``),n=1;if((t[0]===`-`||t[0]===`+`)&&(t[0]===`-`&&(n=-1),t=t.slice(1)),t.startsWith(`0b`))return n*parseInt(t.slice(2),2);if(t.startsWith(`0x`))return n*parseInt(t.slice(2),16);if(t.includes(`:`)){let e=0;for(let n of t.split(`:`))e=e*60+Number(n);return n*e}return t!==`0`&&t[0]===`0`?n*parseInt(t,8):n*parseInt(t,10)}function De(e){if(!Te.test(e))return u;let t=Ee(e);return Number.isFinite(t)?t:u}var Oe=d(`tag:yaml.org,2002:int`,{implicit:!0,implicitFirstChars:[`-`,`+`,...`0123456789`],resolve:De,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf(`e`)<0,represent:e=>e.toString(10)}),ke=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Ae=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`);function je(e){if(!ke.test(e))return u;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||Ae.test(e)?r:u}function Me(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}var Ne=d(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:je,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Me}),Pe=RegExp(`^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$`),Fe=RegExp(`^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`);function Ie(e,t){if(t){if(!Fe.test(e))return u;let t=e.toLowerCase(),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=n*parseFloat(t);return Number.isFinite(r)?r:u}if(!Pe.test(e))return u;let n=Number(e);return Number.isFinite(n)?n:u}function Le(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}var Re=d(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,...`0123456789`],resolve:Ie,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:Le}),ze=RegExp(`^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`),Be=RegExp(`^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$`);function Ve(e){if(!ze.test(e))return u;let t=e.toLowerCase().replace(/_/g,``),n=t[0]===`-`?-1:1;if(`+-`.includes(t[0])&&(t=t.slice(1)),t===`.inf`)return n===1?1/0:-1/0;if(t===`.nan`)return NaN;let r=0;if(t.includes(`:`)){for(let e of t.split(`:`))r=r*60+Number(e);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Be.test(e)?r:u}function He(e){if(isNaN(e))return`.nan`;if(e===1/0)return`.inf`;if(e===-1/0)return`-.inf`;if(Object.is(e,-0))return`-0.0`;let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace(`e`,`.e`):t}var Ue=d(`tag:yaml.org,2002:float`,{implicit:!0,implicitFirstChars:[`-`,`+`,`.`,...`0123456789`],resolve:Ve,identify:e=>typeof e==`number`&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf(`e`)>=0),represent:He}),We=d(`tag:yaml.org,2002:merge`,{implicit:!0,implicitFirstChars:[`<`],resolve:(e,t)=>e===`<<`||t&&e===``?`<<`:u,identify:()=>!1}),Ge=/^[A-Za-z0-9+/]*={0,2}$/;function Ke(e){let t=e.replace(/\s/g,``);if(t.length%4!=0||!Ge.test(t))return u;let n=atob(t),r=new Uint8Array(n.length);for(let e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r}function qe(e){let t=``;for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var Je=d(`tag:yaml.org,2002:binary`,{resolve:Ke,identify:e=>Object.prototype.toString.call(e)===`[object Uint8Array]`,represent:qe}),Ye=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$`),Xe=RegExp(`^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$`);function Ze(e,t,n,r=0,i=0,a=0,o=0){let s=new Date(Date.UTC(e,t,n,r,i,a,o));return s.setUTCFullYear(e,t,n),s}function Qe(e){let t=Ye.exec(e);if(t===null&&(t=Xe.exec(e)),t===null)return u;let n=+t[1],r=t[2]-1,i=+t[3];if(!t[4]){let e=Ze(n,r,i);return e.getUTCFullYear()!==n||e.getUTCMonth()!==r||e.getUTCDate()!==i?u:e}let a=+t[4],o=+t[5],s=+t[6],c=0;if(a>23||o>59||s>59)return u;if(t[7]){let e=t[7].slice(0,3);for(;e.length<3;)e+=`0`;c=+e}let l=Ze(n,r,i,a,o,s,c);if(l.getUTCFullYear()!==n||l.getUTCMonth()!==r||l.getUTCDate()!==i)return u;if(t[9]){let e=+t[10],n=+(t[11]||0);if(e>23||n>59)return u;let r=(e*60+n)*6e4;l.setTime(l.getTime()-(t[9]===`-`?-r:r))}return l}var $e=d(`tag:yaml.org,2002:timestamp`,{implicit:!0,implicitFirstChars:[...`0123456789`],resolve:Qe,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),et=f(`tag:yaml.org,2002:seq`,{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function tt(e){if(typeof e!=`object`||!e||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function nt(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}var rt=f(`tag:yaml.org,2002:omap`,{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return`cannot resolve an ordered map item`;n=t.keys().next().value}else if(tt(t)){let e=Object.keys(t);if(e.length!==1)return`cannot resolve an ordered map item`;n=e[0]}else return`cannot resolve an ordered map item`;return e.seen.has(n)?`duplicate key in ordered map`:(e.seen.add(n),e.list.push(t),``)},finalize:e=>e.list,identify:()=>!1}),it=f(`tag:yaml.org,2002:pairs`,{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size===1?(e.push(t.entries().next().value),``):`cannot resolve a pairs item`;if(Object.prototype.toString.call(t)!==`[object Object]`)return`cannot resolve a pairs item`;let n=t,r=Object.keys(n);return r.length===1?(e.push([r[0],n[r[0]]]),``):`cannot resolve a pairs item`},identify:()=>!1}),at=p(`tag:yaml.org,2002:map`,{create:()=>({}),identify:tt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(typeof t==`object`&&t)return`object-based map does not support complex keys`;let r=String(t);return r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``},has:(e,t)=>typeof t==`object`&&t?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),ot=p(`tag:yaml.org,2002:set`,{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n===null?(e.add(t),``):`cannot resolve a set item`,has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function st(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function ct(){return{scalar:[],sequence:[],mapping:[]}}function lt(e){let t=[];for(let n of e){let e=t.length;for(let r=0;r<t.length;r++){let i=t[r];if(i.nodeKind===n.nodeKind&&i.tagName===n.tagName&&i.matchByTagPrefix===n.matchByTagPrefix){e=r;break}}t[e]=n}return t}var ut=class e{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(e){let t=lt(e),n=[],r=st(),i=ct();for(let e of t){if(e.nodeKind===`scalar`&&e.implicit){if(e.matchByTagPrefix)throw Error(`Implicit scalar tags cannot match by tag prefix`);n.push(e)}switch(e.nodeKind){case`scalar`:e.matchByTagPrefix?i.scalar.push(e):r.scalar[e.tagName]=e;break;case`sequence`:e.matchByTagPrefix?i.sequence.push(e):r.sequence[e.tagName]=e;break;case`mapping`:e.matchByTagPrefix?i.mapping.push(e):r.mapping[e.tagName]=e}}let a=n.filter(e=>e.implicitFirstChars===null),o=new Set;for(let e of n)if(e.implicitFirstChars!==null)for(let t of e.implicitFirstChars)o.add(t);let s=new Map;for(let e of o)s.set(e,n.filter(t=>t.implicitFirstChars===null||t.implicitFirstChars.indexOf(e)!==-1));let c=r.scalar[`tag:yaml.org,2002:str`];if(!c)throw Error(`schema does not define the default scalar tag (tag:yaml.org,2002:str)`);this.tags=t,this.implicitScalarTags=n,this.implicitScalarByFirstChar=s,this.implicitScalarAnyFirstChar=a,this.defaultScalarTag=c,this.defaultSequenceTag=r.sequence[`tag:yaml.org,2002:seq`],this.defaultMappingTag=r.mapping[`tag:yaml.org,2002:map`],this.exact=r,this.prefix=i}lookupScalarTag(e){let t=this.exact.scalar[e];if(t)return t;for(let t of this.prefix.scalar)if(e.startsWith(t.tagName))return t}lookupSequenceTag(e){let t=this.exact.sequence[e];if(t)return t;for(let t of this.prefix.sequence)if(e.startsWith(t.tagName))return t}lookupMappingTag(e){let t=this.exact.mapping[e];if(t)return t;for(let t of this.prefix.mapping)if(e.startsWith(t.tagName))return t}resolveImplicitScalarTag(e){let t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(let n of t){let t=n.resolve(e,!1,n.tagName);if(t!==u)return{value:t,tag:n}}let n=this.defaultScalarTag;return{value:n.resolve(e,!1,n.tagName),tag:n}}withTags(...t){let n=[];for(let e of t)n=n.concat(e);return new e([...this.tags,...n])}},dt=new ut([ee,et,at]);new ut([...dt.tags,re,de,we,Re]);var ft=new ut([...dt.tags,ne,ce,ye,Ne]);new ut([...dt.tags,ae,me,Oe,Ue,$e,We,Je,rt,it,ot]).withTags({...Oe,resolve:(e,t,n)=>{let r=Oe.resolve(e,t,n);return r===u?ye.resolve(e,t,n):r}},{...Ue,resolve:(e,t,n)=>{let r=Ue.resolve(e,t,n);return r===u?Ne.resolve(e,t,n):r}}),p(`tag:yaml.org,2002:map`,{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),``),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||tt(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let e of Object.keys(n))t.set(e,n[e]);return t}});function pt(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let e=0;e<t.length;e++){if(Array.isArray(t[e]))return null;typeof t[e]==`object`&&Object.prototype.toString.call(t[e])===`[object Object]`&&(t[e]=`[object Object]`)}return String(t)}return typeof e==`object`&&Object.prototype.toString.call(e)===`[object Object]`?`[object Object]`:String(e)}p(`tag:yaml.org,2002:map`,{create:()=>({}),identify:tt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=pt(t);return r===null?`nested arrays are not supported inside keys`:(r===`__proto__`?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,``)},has:(e,t)=>{let n=pt(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}});var mt={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function ht(e,t,n,r,i){let a=``,o=``,s=Math.floor(i/2)-1;return r-t>s&&(a=` ... `,t=r-s+a.length),n-r>s&&(o=` ...`,n=r+s-o.length),{str:a+e.slice(t,n).replace(/\t/g,`→`)+o,pos:r-t+a.length}}function gt(e,t){return` `.repeat(Math.max(t-e.length,0))+e}function _t(e,t){if(!e.buffer)return null;let n={...mt,...t},r=/\r?\n|\r|\0/g,i=[0],a=[],o,s=-1;for(;o=r.exec(e.buffer);)a.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);let c=``,l=Math.min(e.line+n.linesAfter,a.length).toString().length,u=n.maxLength-(n.indent+l+3);for(let t=1;t<=n.linesBefore&&!(s-t<0);t++){let r=ht(e.buffer,i[s-t],a[s-t],e.position-(i[s]-i[s-t]),u);c=`${` `.repeat(n.indent)}${gt((e.line-t+1).toString(),l)} | ${r.str}\n${c}`}let d=ht(e.buffer,i[s],a[s],e.position,u);c+=`${` `.repeat(n.indent)}${gt((e.line+1).toString(),l)} | ${d.str}\n`,c+=`${`-`.repeat(n.indent+l+3+d.pos)}^\n`;for(let t=1;t<=n.linesAfter&&!(s+t>=a.length);t++){let r=ht(e.buffer,i[s+t],a[s+t],e.position-(i[s]-i[s+t]),u);c+=`${` `.repeat(n.indent)}${gt((e.line+t+1).toString(),l)} | ${r.str}\n`}return c.replace(/\n$/,``)}function vt(e,t){let n=``;return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`\n\n${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var yt=class e extends Error{reason;mark;constructor(e,t){super(),this.name=`YAMLException`,this.reason=e,this.mark=t,this.message=vt(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(e){return`${this.name}: ${vt(this,e)}`}static throwAt(t,n,r,i=``){let a=0,o=0;for(let e=0;e<n;e++){let n=t.charCodeAt(e);n===10?(a++,o=e+1):n===13&&(a++,t.charCodeAt(e+1)===10&&e++,o=e+1)}let s={name:i,buffer:t,position:n,line:a,column:n-o};throw s.snippet=_t(s),new e(r,s)}},m={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},h={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},g={BLOCK:1,FLOW:2},_={CLIP:1,STRIP:2,KEEP:3},bt=-1;function xt(e){switch(e){case 48:return`\0`;case 97:return`\x07`;case 98:return`\b`;case 116:return`	`;case 9:return`	`;case 110:return`
`;case 118:return`\v`;case 102:return`\f`;case 114:return`\r`;case 101:return`\x1B`;case 32:return` `;case 34:return`"`;case 47:return`/`;case 92:return`\\`;case 78:return``;case 95:return`\xA0`;case 76:return`\u2028`;case 80:return`\u2029`;default:return``}}var St=Array(256),Ct=Array(256);for(let e=0;e<256;e++)St[e]=+!!xt(e),Ct[e]=xt(e);function wt(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Tt(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Et(e){return e===120?2:e===117?4:8}function Dt(e,t,n){let r=0;for(;t<n;){let n=e.charCodeAt(t);if(n===10)r++,t++;else if(n===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(n===32||n===9)t++;else break}return{position:t,breaks:r}}function Ot(e){return e===1?` `:`
`.repeat(e-1)}function kt(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===10||t===13){r+=e.slice(a,o);let t=Dt(e,i,n);r+=Ot(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,o)}function At(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===39)r+=e.slice(a,i)+`'`,i+=2,a=o=i;else if(t===10||t===13){r+=e.slice(a,o);let t=Dt(e,i,n);r+=Ot(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function jt(e,t,n){let r=``,i=t,a=t,o=t;for(;i<n;){let t=e.charCodeAt(i);if(t===92){r+=e.slice(a,i),i++;let t=e.charCodeAt(i);if(t===10||t===13)i=Dt(e,i,n).position;else if(t<256&&St[t])r+=Ct[t],i++;else{let n=Et(t),a=0;for(;n>0;n--){i++;let t=Tt(e.charCodeAt(i));a=(a<<4)+t}r+=wt(a),i++}a=o=i}else if(t===10||t===13){r+=e.slice(a,o);let t=Dt(e,i,n);r+=Ot(t.breaks),i=a=o=t.position}else i++,t!==32&&t!==9&&(o=i)}return r+e.slice(a,n)}function Mt(e,t,n,r,i,a){let o=r<0?0:r,s=e.slice(t,n).replace(/\r\n?/g,`
`),c=s===``?[]:(s.endsWith(`
`)?s.slice(0,-1):s).split(`
`),l=``,u=!1,d=0,f=!1;for(let e of c){let t=0;for(;t<o&&e.charCodeAt(t)===32;)t++;if(r<0||t>=e.length){d++;continue}let n=e.slice(o),i=n.charCodeAt(0);a?i===32||i===9?(f=!0,l+=`
`.repeat(u?1+d:d)):f?(f=!1,l+=`
`.repeat(d+1)):d===0?u&&(l+=` `):l+=`
`.repeat(d):l+=`
`.repeat(u?1+d:d),l+=n,u=!0,d=0}return i===_.KEEP?l+=`
`.repeat(u?1+d:d):i!==_.STRIP&&u&&(l+=`
`),l}function Nt(e,t){if(t.valueStart===bt)return``;let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case h.SINGLE_QUOTED:return At(e,n,r);case h.DOUBLE_QUOTED:return jt(e,n,r);case h.LITERAL_BLOCK:return Mt(e,n,r,t.indent,t.chomping,!1);case h.FOLDED_BLOCK:return Mt(e,n,r,t.indent,t.chomping,!0);default:return kt(e,n,r)}}var Pt=Object.assign(Object.create(null),{"!":`!`,"!!":`tag:yaml.org,2002:`});function Ft(e){let t=``,n=0;for(;n<e.length;){if(e.charCodeAt(n)!==37){t+=e[n++];continue}let r=parseInt(e.slice(n+1,n+3),16);if(n+=3,r>=192){let t=r<224?1:r<240?2:3;for(r&=(1<<6-t)-1;t-->0;)r=r<<6|parseInt(e.slice(n+1,n+3),16)&63,n+=3}r<65536?t+=String.fromCharCode(r):(r-=65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023))}return t}function It(e,t){if(e.startsWith(`!<`)&&e.endsWith(`>`))return Ft(e.slice(2,-1));let n=e.indexOf(`!`,1),r=n===-1?`!`:e.slice(0,n+1);return Ft(t?.[r]??Pt[r]??r)+Ft(e.slice(r.length))}var Lt=-1,Rt=`tag:yaml.org,2002:merge`,zt={filename:``,schema:ft,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Bt(e){return`tagStart`in e&&e.tagStart!==Lt?e.tagStart:`anchorStart`in e&&e.anchorStart!==Lt?e.anchorStart:`valueStart`in e&&e.valueStart!==Lt?e.valueStart:`start`in e?e.start:0}function v(e,t){yt.throwAt(e.source,e.position,t,e.filename)}function Vt(e,t,n,r){try{return n.finalize(r)}catch(n){if(n instanceof yt)throw n;yt.throwAt(e.source,t,n instanceof Error?n.message:String(n),e.filename)}}function Ht(e,t){let n=Nt(e.source,t),r=t.tagStart===Lt?``:e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==``){if(r===`!`)return{value:n,tag:i};let t=It(r,e.tagHandlers),a=e.schema.lookupScalarTag(t);if(a){let r=a.resolve(n,!0,t);return r===u&&v(e,`cannot resolve a node with !<${t}> explicit tag`),{value:r,tag:a}}let o=e.schema.lookupMappingTag(t)??e.schema.lookupSequenceTag(t);if(o){n!==``&&v(e,`cannot resolve a node with !<${t}> explicit tag`);let r=o.create(t);return{value:o.carrierIsResult?r:Vt(e,e.position,o,r),tag:o}}v(e,`unknown scalar tag !<${t}>`)}return t.style===h.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function Ut(e,t,n){let r=t.tagStart===Lt?``:e.source.slice(t.tagStart,t.tagEnd);return r===``||r===`!`?n:It(r,e.tagHandlers)}function Wt(e){return e.nodeKind===`mapping`}function Gt(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&v(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function Kt(e,t,n,r){Gt(e);for(let i of r.keys(n)){if(Gt(e),t.tag.has(t.value,i))continue;let a=t.tag.addPair(t.value,i,r.get(n,i));a&&v(e,a),t.overridable??=new Set,t.overridable.add(i)}}function qt(e,t,n,r){if(e.position=t.keyPosition,Wt(r))Kt(e,t,n,r);else if(r.nodeKind===`sequence`&&Array.isArray(n)){n.length>100&&v(e,`abnormal merge sequence size`);for(let r of n){let n=e.nodeTags.get(r);n||v(e,`cannot merge mappings; the provided source object is unacceptable`),Kt(e,t,r,n)}}else v(e,`cannot merge mappings; the provided source object is unacceptable`)}function Jt(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){qt(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&v(e,`duplicated mapping key`);let a=t.tag.addPair(t.value,n,r);a&&v(e,a),t.overridable?.delete(n)}function Yt(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind===`document`)r.value=t,r.hasValue=!0;else if(r.kind===`sequence`){Wt(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&v(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,Jt(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===Rt}function Xt(e,t,n,r,i){if(t.anchorStart!==Lt){let a={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),a),a}return null}function Zt(e,t){let n={...zt,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let e=n.events[n.eventIndex++];switch(n.position=Bt(e),e.type){case m.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let t of e.directives)t.kind===`tag`&&(n.tagHandlers[t.handle]=t.prefix);n.frames.push({kind:`document`,position:n.position,value:void 0,hasValue:!1});break;case m.SCALAR:{let{value:t,tag:r}=Ht(n,e);Xt(n,e,t,r,!0),Yt(n,t,r);break}case m.SEQUENCE:{let t=Ut(n,e,`tag:yaml.org,2002:seq`),r=n.schema.lookupSequenceTag(t);r||v(n,`unknown sequence tag !<${t}>`);let i=r.create(t),a=Xt(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`sequence`,position:n.position,value:i,tag:r,anchor:a,index:0});break}case m.MAPPING:{let t=Ut(n,e,`tag:yaml.org,2002:map`),r=n.schema.lookupMappingTag(t);r||v(n,`unknown mapping tag !<${t}>`);let i=r.create(t),a=Xt(n,e,i,r,r.carrierIsResult);n.frames.push({kind:`mapping`,position:n.position,value:i,tag:r,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case m.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&v(n,`aliases exceeded maxAliases (${n.maxAliases})`);let t=n.source.slice(e.anchorStart,e.anchorEnd),r=n.anchors.get(t);r||v(n,`unidentified alias "${t}"`),r.isValueFinal||v(n,`recursive alias "${t}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),Yt(n,r.value,r.tag);break}case m.POP:{let e=n.frames.pop();if(e.kind===`mapping`&&e.hasKey&&(n.position=e.keyPosition,v(n,`incomplete mapping pair in event stream`)),e.kind===`document`)n.documents.push(e.value);else{let t=e.tag.carrierIsResult?e.value:Vt(n,e.position,e.tag,e.value);e.anchor&&(e.anchor.value=t,e.anchor.isValueFinal=!0),Yt(n,t,e.tag)}break}}}return n.documents}var y=-1,Qt=Object.prototype.hasOwnProperty,$t=1,en=2,tn=3,nn=4,rn=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,an=/[,\[\]{}]/,on=/^(?:!|!!|![0-9A-Za-z-]+!)$/,sn=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,cn=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,ln=RegExp(`^(?:${sn})*$`),un=RegExp(`^(?:${cn})+$`),dn=RegExp(`^(?:!(?:${sn})*|${cn}(?:${sn})*)$`),fn={filename:``,maxDepth:100};function pn(e,t,n){e.events.push({type:m.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function mn(e,t,n,r,i,a,o){e.events.push({type:m.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function hn(e,t,n,r,i,a,o){e.events.push({type:m.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:a,style:o})}function gn(e,t){e.events.splice(t.eventsLength,0,{type:m.MAPPING,start:t.position,anchorStart:y,anchorEnd:y,tagStart:y,tagEnd:y,style:g.FLOW})}function _n(e,t,n,r,i,a,o,s,c=_.CLIP,l=-1,u=!1){e.events.push({type:m.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:a,tagEnd:o,style:s,chomping:c,indent:l,fast:u})}function vn(e,t,n){e.events.push({type:m.ALIAS,anchorStart:t,anchorEnd:n})}function yn(e){e.events.push({type:m.POP})}function b(e){_n(e,y,y,y,y,y,y,h.PLAIN)}function bn(){return{anchorStart:y,anchorEnd:y,tagStart:y,tagEnd:y}}function xn(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Sn(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function x(e,t){yt.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function S(e){return e===10||e===13}function Cn(e){return e===9||e===32}function C(e){return Cn(e)||S(e)}function w(e){return e===0||C(e)}function T(e){return e===44||e===91||e===93||e===123||e===125}function wn(e){return e>=48&&e<=57?e-48:-1}function Tn(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function En(e){return e===120?2:e===117?4:e===85?8:0}function Dn(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function On(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function E(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||C(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;Cn(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!S(r)&&r!==0);if(!S(r))break;for(On(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function kn(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let n=e.input.charCodeAt(t+3);return n===0||C(n)}return!1}function An(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function jn(e){if(e.position!==e.lineStart)return!1;if(kn(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=xn(e);An(e),E(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&kn(e));return Sn(e,t),r}function Mn(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!S(t);)t=e.input.charCodeAt(++e.position)}function Nn(e,t,n){let r=rn.exec(e.input.slice(t,n));r!==null&&(e.position=t+r.index+r[0].length-1,x(e,`the stream contains non-printable characters`))}function Pn(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==y&&x(e,`duplication of a tag property`);let r=e.position,i=!1,a=!1,o=`!`,s=e.input.charCodeAt(++e.position);s===60?(i=!0,s=e.input.charCodeAt(++e.position)):s===33&&(a=!0,o=`!!`,s=e.input.charCodeAt(++e.position));let c=e.position,l;if(i){for(;s!==0&&s!==62;)s=e.input.charCodeAt(++e.position);s!==62&&x(e,`unexpected end of the stream within a verbatim tag`),l=e.input.slice(c,e.position),e.position++}else{for(;s!==0&&!C(s)&&!(n&&T(s));)s===33&&(a?x(e,`tag suffix cannot contain exclamation marks`):(o=e.input.slice(c-1,e.position+1),on.test(o)||x(e,`named tag handle cannot contain such characters`),a=!0,c=e.position+1)),s=e.input.charCodeAt(++e.position);l=e.input.slice(c,e.position),an.test(l)&&x(e,`tag suffix cannot contain flow indicator characters`)}return l&&!(i?ln.test(l):un.test(l))&&x(e,`tag name cannot contain such characters: ${l}`),!i&&o!==`!`&&o!==`!!`&&!Qt.call(e.tagHandlers,o)&&x(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Fn(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==y&&x(e,`duplication of an anchor property`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!C(e.input.charCodeAt(e.position))&&!T(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&x(e,`name of an anchor node must contain at least one character`),t.anchorStart=n,t.anchorEnd=e.position,!0}function In(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==y||t.tagStart!==y)&&x(e,`alias node should not have any properties`),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!C(e.input.charCodeAt(e.position))&&!T(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&x(e,`name of an alias node must contain at least one character`),vn(e,n,e.position),!0}function Ln(e,t){E(e,!1),e.lineIndent<t&&x(e,`deficient indentation`)}function Rn(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let t=e.position;return e.position++,_n(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,h.SINGLE_QUOTED,_.CLIP,-1,i),!0}S(a)?(i=!1,Ln(e,t)):e.position===e.lineStart&&kn(e)?x(e,`unexpected end of the document within a single quoted scalar`):a!==9&&a<32?x(e,`expected valid JSON character`):e.position++}x(e,`unexpected end of the stream within a single quoted scalar`)}function zn(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let a=e.input.charCodeAt(e.position);if(a===34){let t=e.position;return e.position++,_n(e,r,t,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,h.DOUBLE_QUOTED,_.CLIP,-1,i),!0}if(a===92){i=!1;let n=e.input.charCodeAt(++e.position);if(S(n))Ln(e,t);else if(Dn(n))e.position++;else{let t=En(n);for(t===0&&x(e,`unknown escape sequence`);t-->0;)e.position++,Tn(e.input.charCodeAt(e.position))<0&&x(e,`expected hexadecimal character`);e.position++}}else S(a)?(i=!1,Ln(e,t)):e.position===e.lineStart&&kn(e)?x(e,`unexpected end of the document within a double quoted scalar`):a!==9&&a<32?x(e,`expected valid JSON character`):e.position++}x(e,`unexpected end of the stream within a double quoted scalar`)}function Bn(e,t,n){let r=e.input.charCodeAt(e.position),i=_.CLIP,a=-1,o=!1;if(r!==124&&r!==62)return!1;let s=r===124?h.LITERAL_BLOCK:h.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let n=e.input.charCodeAt(e.position),r=wn(n);if(n===43||n===45)i!==_.CLIP&&x(e,`repeat of a chomping mode identifier`),i=n===43?_.KEEP:_.STRIP,e.position++;else if(r>=0)r===0&&x(e,`bad explicit indentation width of a block scalar; it cannot be less than one`),o&&x(e,`repeat of an indentation width identifier`),a=t+r-1,o=!0,e.position++;else break}let c=!1;for(;Cn(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&Mn(e),S(e.input.charCodeAt(e.position))?On(e):e.input.charCodeAt(e.position)!==0&&x(e,`a line break is expected`);let l=o?a:-1,u=0,d=e.position,f=e.position;for(;e.input.charCodeAt(e.position)!==0;){let n=e.position,r=0;for(;e.input.charCodeAt(n+r)===32;)r++;let i=e.input.charCodeAt(n+r);if(i===0){l>=0?r>l&&(f=n+r):r>0&&(f=n+r);break}if(jn(e))break;if(!o&&l===-1&&S(i)&&(u=Math.max(u,r)),!o&&l===-1&&!S(i)&&(i===9&&r<t&&(e.position=n+r,x(e,`tab characters must not be used in indentation`)),r>=t&&r<u&&(e.position=n+r,x(e,`bad indentation of a mapping entry`))),l===-1&&i!==0&&!S(i)&&r<t){e.lineIndent=r,e.position=n+r;break}!o&&i!==0&&!S(i)&&l===-1&&(l=r);let a=l===-1?t+1:l;if(i!==0&&!S(i)&&r<a){e.lineIndent=r,e.position=n+r;break}Mn(e),f=e.position,S(e.input.charCodeAt(e.position))&&(On(e),f=e.position)}return Nn(e,d,f),_n(e,d,f,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,s,i,l),!0}function Vn(e,t){let n=e.input.charCodeAt(e.position),r=t===$t;if(n===0||C(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||T(n))return!1;if(n===63||n===45){let t=e.input.charCodeAt(e.position+1);if(w(t)||r&&T(t))return!1}return!0}function Hn(e,t,n,r){if(!Vn(e,n))return!1;let i=e.position,a=e.position,o=e.input.charCodeAt(e.position),s=n===$t,c=!1;for(;o!==0&&!jn(e);){if(o===58){let t=e.input.charCodeAt(e.position+1);if(w(t)||s&&T(t))break}else if(o===35){if(C(e.input.charCodeAt(e.position-1)))break}else if(s&&T(o))break;else if(S(o)){let n=e.position,r=e.line,i=e.lineStart,a=e.lineIndent;if(E(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=n,e.line=r,e.lineStart=i,e.lineIndent=a;break}Cn(o)||(a=e.position+1),o=e.input.charCodeAt(++e.position)}return a!==i&&(Nn(e,i,a),_n(e,i,a,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,h.PLAIN,_.CLIP,-1,!c),!0)}function Un(e,t){let n=e.line;E(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&x(e,`deficient indentation`)}function Wn(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,a=e.position,o=!0;if(r!==91&&r!==123)return!1;let s=i?125:93;for(i?hn(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,g.FLOW):mn(e,a,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,g.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){Un(e,t);let n=e.input.charCodeAt(e.position);if(n===s)return e.position++,yn(e),!0;o?n===44&&x(e,`expected the node content, but found ','`):x(e,`missed comma between flow collection entries`);let r=!1,a=!1;n===63&&C(e.input.charCodeAt(e.position+1))&&(r=a=!0,e.position+=1,Un(e,t));let c=e.line,l=xn(e),u=qn(e,t,$t,!1,!0);Un(e,t),n=e.input.charCodeAt(e.position),(i||a||e.line===c)&&n===58?(r=!0,e.position++,Un(e,t),i||gn(e,l),u||b(e),qn(e,t,$t,!1,!0)||b(e),Un(e,t),i||yn(e)):i&&r?(u||b(e),b(e)):i?b(e):r&&(gn(e,l),u||b(e),b(e),yn(e)),n=e.input.charCodeAt(e.position),n===44?(o=!0,e.position++):o=!1}x(e,`unexpected end of the stream within a flow collection`)}function Gn(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!w(e.input.charCodeAt(e.position+1)))return!1;for(mn(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,g.BLOCK);e.input.charCodeAt(e.position)===45&&w(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,x(e,`tab characters must not be used in indentation`));let n=e.line;e.position++;let r=E(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&w(e.input.charCodeAt(e.position+1))&&x(e,`bad indentation of a sequence entry`),r&&e.lineIndent<=t?b(e):qn(e,t,tn,!1,!0),E(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&x(e,`bad indentation of a sequence entry`),e.line===n&&e.input.charCodeAt(e.position)===45&&w(e.input.charCodeAt(e.position+1))&&x(e,`bad indentation of a sequence entry`)}return yn(e),!0}function Kn(e,t,n,r){let i=!1,a=!1,o=!1,s=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,x(e,`tab characters must not be used in indentation`));let l=e.input.charCodeAt(e.position+1),u=e.line;if((c===63||c===58)&&w(l))o||=(hn(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,g.BLOCK),!0),c===63?(i&&b(e),a=!0,i=!0):(i||(b(e),a=!0),i=!1),e.position+=1,s=!0;else{i&&=(b(e),!1);let t=xn(e);if(!qn(e,n,en,!1,!0))break;if(e.line===u){for(c=e.input.charCodeAt(e.position);Cn(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),w(c)||x(e,`a whitespace character is expected after the key-value separator within a block mapping`),o||=(e.events.splice(t.eventsLength,0,{type:m.MAPPING,start:t.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:g.BLOCK}),!0),a=!0,i=!1,s=!1;else if(a)x(e,`expected ':' after a mapping key`);else return r.anchorStart!==y||r.tagStart!==y?(Sn(e,t),!1):!0}else if(a)x(e,`can not read a block mapping entry; a multiline key may not be an implicit key`);else return r.anchorStart!==y||r.tagStart!==y?(Sn(e,t),!1):!0}if(qn(e,t,nn,!0,s)&&(s=!1),i||(s&&=(b(e),!1)),E(e,!0),c=e.input.charCodeAt(e.position),(e.line===u||e.lineIndent>t)&&c!==0)x(e,`bad indentation of a mapping entry`);else if(e.lineIndent<t)break}return a?(i&&b(e),o&&yn(e),!0):!1}function qn(e,t,n,r,i,a=!0){e.depth>=e.maxDepth&&x(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,s=!1,c=!1,l=null,u=bn(),d=n===nn||n===tn,f=d,p=d;if(r&&E(e,!0)&&(s=!0,o=e.lineIndent>t?1:e.lineIndent===t?0:-1),o===1)for(;;){let r=e.input.charCodeAt(e.position),i=xn(e);if(s&&o!==1&&(r===33||r===38))break;if(s&&p&&(u.tagStart!==y||u.anchorStart!==y)&&(r===33||r===38)){let n=xn(e),r=t+1;if(Kn(e,e.position-e.lineStart,r,u)&&e.events[n.eventsLength]?.type===m.MAPPING)return e.depth--,!0;Sn(e,n)}if(s&&(r===33&&u.tagStart!==y||r===38&&u.anchorStart!==y)||!Pn(e,u,n===$t)&&!Fn(e,u))break;l===null&&(l=i),E(e,!0)?(s=!0,f=p,o=e.lineIndent>t?1:e.lineIndent===t?0:-1):f=!1}if(f&&=s||i,o===1||n===nn){let r=n===$t||n===en?t:t+1,i=e.position-e.lineStart;if(o===1){if(f&&(Gn(e,i,u)||Kn(e,i,r,u))||Wn(e,r,u))c=!0;else{let t=e.input.charCodeAt(e.position);if(l!==null&&a&&p&&!f&&t!==124&&t!==62){let t=xn(e),n=l.position-l.lineStart;Sn(e,l),Kn(e,n,r,bn())&&e.events[t.eventsLength]?.type===m.MAPPING?c=!0:Sn(e,t)}!c&&(d&&Bn(e,r,u)||Rn(e,r,u)||zn(e,r,u)||In(e,u)||Hn(e,r,n,u))&&(c=!0)}}else o===0&&(c=f&&Gn(e,i,u))}return d&&=!c,!c&&(u.anchorStart!==y||u.tagStart!==y||d)&&(_n(e,y,y,u.anchorStart,u.anchorEnd,u.tagStart,u.tagEnd,h.PLAIN),c=!0),e.depth--,c||u.anchorStart!==y||u.tagStart!==y}function Jn(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!C(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&x(e,`directive name must not be less than one character in length`);e.input.charCodeAt(e.position)!==0&&!S(e.input.charCodeAt(e.position));){for(;Cn(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||S(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!C(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(t,e.position))}if(S(e.input.charCodeAt(e.position))&&On(e),n===`YAML`){e.directives.some(e=>e.kind===`yaml`)&&x(e,`duplication of %YAML directive`),r.length!==1&&x(e,`YAML directive accepts exactly one argument`);let t=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);t===null&&x(e,`ill-formed argument of the YAML directive`),parseInt(t[1],10)!==1&&x(e,`unacceptable YAML version of the document`),e.directives.push({kind:`yaml`,version:r[0]})}else if(n===`TAG`){r.length!==2&&x(e,`TAG directive accepts exactly two arguments`);let[t,n]=r;on.test(t)||x(e,`ill-formed tag handle (first argument) of the TAG directive`),Qt.call(e.tagHandlers,t)&&x(e,`there is a previously declared suffix for "${t}" tag handle`),dn.test(n)||x(e,`ill-formed tag prefix (second argument) of the TAG directive`),e.tagHandlers[t]=n,e.directives.push({kind:`tag`,handle:t,prefix:n})}return!0}function Yn(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(E(e,!0);Jn(e);)t=!0,E(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&w(e.input.charCodeAt(e.position+3))){n=!0;let t=e.line;e.position+=3,E(e,!0),i=e.line>t}else t&&x(e,`directives end mark is expected`);let a=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&kn(e)){e.position+=3,E(e,!0);return}if(pn(e,n,!1),qn(e,e.lineIndent-1,nn,!1,i,i)||b(e),E(e,!0),e.position===e.lineStart&&kn(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let t=e.line;e.position+=3,E(e,!0),e.line===t&&e.position<e.length&&x(e,`end of the stream or a document separator is expected`)}let o=e.events[a];o?.type===m.DOCUMENT&&(o.explicitEnd=r),yn(e),!r&&e.position<e.length&&!jn(e)&&x(e,`end of the stream or a document separator is expected`)}function Xn(e,t){let n=e.length,r={...fn,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf(`\0`);for(i!==-1&&yt.throwAt(e,i,`null byte is not allowed in input`,r.filename);r.position<r.length&&(An(r),E(r,!0),!(r.position>=r.length));){let e=r.position;Yn(r),r.position===e&&x(r,`can not read a document`)}return r.events}var Zn={...fn,...zt};function Qn(e,t={}){let n={...Zn,...t},r=String(e),i=Object.keys(fn),a=Object.keys(zt);return Zt(Xn(r,nt(n,i)),{...nt(n,a),source:r})}function $n(e,t){let n=Qn(e,t);if(n.length===0)throw new yt(`expected a document, but the input is empty`);if(n.length===1)return n[0];throw new yt(`expected a single document in the stream, but found more`)}function er(e,t){return!!(e&1<<t)}var tr={applyQuoteFlowKeysOption:rr,doubleQuoteForInvisibles:ir,doubleQuoteWhitespaceOnly:ar,applyForceQuotesOption:or,tryLongOrMultilineAsBlock:sr,quoteInvalidPlain:cr,fallbackToDoubleQuoted:lr};function nr(e){return e.presenterOptions.quoteStyle===`single`&&er(e.allowedStylesMask,h.SINGLE_QUOTED)?h.SINGLE_QUOTED:h.DOUBLE_QUOTED}function rr(e){e.presenterOptions.quoteFlowKeys&&e.isKey&&e.flowOnly&&e.style===h.PLAIN&&(e.style=h.DOUBLE_QUOTED)}function ir(e){e.style===h.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=h.DOUBLE_QUOTED)}function ar(e){e.style===h.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=h.DOUBLE_QUOTED)}function or(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==h.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?h.DOUBLE_QUOTED:nr(e)))}function sr(e){if(e.style!==h.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!er(e.allowedStylesMask,h.LITERAL_BLOCK)){n&&(e.style=h.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=h.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),a=0,o=!1;for(;a<=t.length;){let e=t.length,n=t.indexOf(`
`,a);n!==-1&&(e=n);let r=t.slice(a,e);if(r.length>i&&r[0]!==` `&&/ [^ \t]/.test(r)&&(o=!0),n===-1)break;a=n+1}o?e.style=h.FOLDED_BLOCK:n&&(e.style=h.LITERAL_BLOCK)}function cr(e){e.style===h.PLAIN&&!er(e.allowedStylesMask,h.PLAIN)&&(e.style=nr(e))}function lr(e){er(e.allowedStylesMask,e.style)||(e.style=h.DOUBLE_QUOTED)}var ur=`[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]`,dr=`[\\n\\r]`,fr=`\\uFEFF`,pr=`[ \\t]`,mr=`(?:(?!(?:${dr}|${fr}))${ur})`,hr=`(?:(?!${pr})${mr})`,gr=`[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]`,_r=`[-?:,\\[\\]{}#&*!|>'"%@\`]`,vr=`[,\\[\\]{}]`,yr=hr,br=`(?:(?!${vr})${hr})`,xr=`(?:(?:(?!${_r})${hr})|[?:-](?=${yr}))`,Sr=`(?:(?:(?!${_r})${hr})|[?:-](?=${br}))`,Cr=`(?:(?:(?![:#])${yr})|:(?=${yr}))#*`,wr=`(?:(?:(?![:#])${br})|:(?=${br}))#*`,Tr=`(?:${pr}*${Cr})*`,Er=`(?:${pr}*${wr})*`,Dr=`${xr}#*${Tr}`,Or=`${Sr}#*${Er}`,kr=Dr,Ar=Or,jr=`\\n+${Cr}${Tr}`,Mr=`\\n+${wr}${Er}`,Nr=`${Dr}(?:${jr})*`,Pr=`${Or}(?:${Mr})*`;RegExp(`^(?:${Nr})$`,`u`),RegExp(`^(?:${Pr})$`,`u`),RegExp(`^(?:${kr})$`,`u`),RegExp(`^(?:${Ar})$`,`u`),RegExp(`^(?:${gr})*$`,`u`),RegExp(`^(?:${gr}|\\n)*$`,`u`),RegExp(`^(?:${mr}|\\n)*$`,`u`),Object.keys(tr).map(e=>Reflect.get(tr,e)),m.DOCUMENT,m.SEQUENCE,m.MAPPING,m.SCALAR,m.ALIAS,m.POP,h.PLAIN,h.SINGLE_QUOTED,h.DOUBLE_QUOTED,h.LITERAL_BLOCK,h.FOLDED_BLOCK,g.BLOCK,g.FLOW,_.CLIP,_.STRIP,_.KEEP;var Fr=`netlab-internal`,D=`${Fr}:_linkname`,Ir=[`none`,`linux`,`frr`,`bird`,`iosv`];function Lr(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function O(e,t){let n=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(let[e,i]of Object.entries(t)){if(e===`_removed_attr`){let e=Array.isArray(i)?i:[];r._removed_attr=[...n,...e.filter(e=>!n.has(e))];continue}if(n.has(e))continue;let t=r[e];r[e]=Lr(t)&&Lr(i)?O(t,i):Rr(i)}return r}function Rr(e){return structuredClone(e)}function zr(e,t){return O(e,t)}function Br(e){return typeof e==`object`&&!!e&&!Array.isArray(e)}function Vr(e){if(Array.isArray(e))return e.map(e=>Vr(e));if(!Br(e))return e;let t={};for(let[n,r]of Object.entries(e))Hr(t,n,Vr(r));return t}function Hr(e,t,n){if(!t.includes(`.`)){Ur(e,t,n);return}let r=t.split(`.`),i=e;for(let e=0;e<r.length-1;e++){let t=r[e],n=i[t];n!=null&&Br(n)||(i[t]={}),i=i[t]}Ur(i,r[r.length-1],n)}function Ur(e,t,n){let r=e[t];e[t]=Br(r)&&Br(n)?O(r,n):n}function Wr(e){let t=Vr(e);for(let t of Object.keys(e))delete e[t];Object.assign(e,t)}var Gr=class{items=[];error(e){this.items.push({...e,severity:`error`})}warning(e){this.items.push({...e,severity:`warning`})}hasErrors(){return this.items.some(e=>e.severity===`error`)}list(){return[...this.items]}clear(){this.items=[]}};function Kr(e,t){let n=e.toLowerCase(),r=`VALUE`,i=`VALUE`;return n.includes(`missing`)||n.includes(`required`)||n.includes(`mandatory`)?(r=`MISSING`,i=`MISSING`):n.includes(`type`)||n.includes(`pattern`)||n.includes(`range`)?(r=`TYPE`,i=`TYPE`):n.includes(`unknown`)||n.includes(`not allowed`)||n.includes(`unexpected`)?(r=`ATTR`,i=`ATTR`):n.includes(`leafref`)||n.includes(`instance`)?(r=`VALUE`,i=`VALUE`):n.includes(`depend`)&&(r=`DEPEND`,i=`DEPEND`),{code:i,category:r,module:`xyang`,message:e,path:t}}var qr={bgp:`# BGP default settings and attributes
#
---
no_propagate:
  ebgp_role:
  advertise_roles:
  rr_list:
  as_list:
  confederation:
transform_after: [ vlan ]
config_after: [ routing, ospf, isis, eigrp, ripv2 ]
hooks: [ normalize ]

# Default BGP attribute settings
advertise_roles: [ stub ]
advertise_loopback: True
community:
  ibgp: [ standard, extended ]
  ebgp: [ standard ]
ebgp_role: external
next_hop_self: true

# Module attributes
_top:                         # Define custom data types used by the BGP module
  attributes:
    bgp_session_type:
      _description: BGP session types
      type: str
      valid_values:           # Valid values are structured like a dict to allow plugins to add values
        ibgp:
        ebgp:
        localas_ibgp:
    bgp_community_type:
      _description: BGP community types
      type: str
      valid_values:
        standard:
        extended:
        large:
        2octet:
    bgp_prefix_list:
      _description: BGP prefix list
      type: list
      _subtype:
        ipv4: { type: ipv4, use: subnet_prefix }
        ipv6: { type: ipv6, use: subnet_prefix }
        _alt_types: [ prefix_str ]

attributes:
  global:
    as: asn
    next_hop_self: bool
    rr_cluster_id: { type: ipv4, use: id }
    rr_list: list
    rr_mesh: bool           # Rarely used, hard-coded default: True
    ebgp_role: str
    as_list: dict
    sessions:
      ipv4: { type: list, _subtype: bgp_session_type }
      ipv6: { type: list, _subtype: bgp_session_type }
    activate:
      ipv4: { type: list, _subtype: bgp_session_type }
      ipv6: { type: list, _subtype: bgp_session_type }
    advertise_loopback: bool
    advertise_roles: list
    community:
      ibgp: { type: list, _subtype: bgp_community_type }
      ebgp: { type: list, _subtype: bgp_community_type }
      _value_to_dict:
        ibgp: '{value}'
        ebgp: '{value}'
    replace_global_as: bool
    confederation:
      type: dict
      _keytype: asn
      _subtype:
        members:
          type: list
          _subtype: asn

  _inherit_community:                 # This is a lookup table for rare session types so you don't
    localas_ibgp: ibgp                # have to specify them in bgp.community attribute
    confed_ebgp: ibgp

  node:
    as:
      type: asn
      _required: True
    next_hop_self: { copy: global }
    rr: bool
    rr_cluster_id: { copy: global }
    rr_mesh: { copy: global }
    advertise: bgp_prefix_list
    originate: bgp_prefix_list
    advertise_loopback: { copy: global }
    sessions: { copy: global }
    activate: { copy: global }
    community: { copy: global }
    router_id: { type: ipv4, use: id }
    local_as: asn
    replace_global_as: bool
    import: _r_import
  vrf:
    router_id: { type: ipv4, use: id }
    advertise: bgp_prefix_list
    originate: bgp_prefix_list
    import: _r_import
  node_copy: [ local_as, replace_global_as ]
  link:
    advertise: { type: bool, _intra_as: True }
  interface:
    local_as: asn
    replace_global_as: bool
  loopback:
    advertise: bool
  as_list:
    type: dict
    _keytype: int
    _subtype:
      name: str
      members:
        type: list
        _subtype: str
        _required: True
      rr:
        type: list
        _subtype: str
features:
  core:
    _title:
    activate_af: Can control activation of individual address families
    advertise: Can advertise IGP prefixes
    local_as: Supports local-as functionality
    vrf_local_as: Supports local-as within a VRF
    local_as_ibgp: Can use local-as to create IBGP sesssions
    ipv6_lla: Can run EBGP sessions over IPv6 link-local addresses
    rfc8950: Can run IPv4 AF over regular IPv6 EBGP sessions
    community: Granular BGP community propagation
    confederation: BGP confederations
    import: Import routes from other routing protocols
  session:
    _title: BGP session parameters
    allowas_in: Allow own AS in incoming AS path (allowas in)
    as_override: Override AS in AS path
    bfd: Use BFD to detect BGP neighbor failure
    default_originate: Originate per-neighbor default route
    description: Use "description" attribute
    gtsm: Supports GTSM
    passive: Supports passive BGP peers
    password: Supports MD5 passwords
    remove_private_as: Can remove private AS from AS path
    rs: Can be a BGP route server
    rs_client: Can be a client of a BGP route server
    timers: Can configure BGP timers
    tcp_ao: Supports TCP-AO session protection
    multihop: Supports EBGP multihop sessions
  policy:
    _title: BGP policy parameters
    _default_locpref: Device-wide local preference
    aggregate: BGP route aggregation
    bandwidth: Support BGP DMZ bandwidth
warnings:
  missing_igp: True
  igp_list: [ ospf, eigrp, isis, ripv2 ]
`,evpn:`# EVPN default settings and attributes
#
requires: [ bgp ]
no_propagate: [ start_transit_vni, transport, vlan_bundle_service, as ]
transform_after: [ vlan, vxlan, vrf ]
config_after: [ vlan, vxlan, vrf ]
session: [ ibgp ]
start_transit_vni: 200000
attributes:
  global:
    session: [ ibgp, ebgp ]
    start_transit_vni: { type: int, min_value: 1, max_value: 16777215 }
    transport: { type: str, valid_values: [ vxlan, mpls, sr ] }
    vlans: list
    vrfs: list
    as: asn
  bundle: [ vlan_aware, vlan, port, port_vlan ]
  node:
    session:
    vlans:
    vrfs:
    domain: str
  vlan:
    evi: rd
    rd: rd
    import: list
    export: list
  node_vlan:
    import: { copy: vlan }
    export: { copy: vlan }
  vrf:
    transit_vni: { type: int, min_value: 1, max_value: 16777215, _alt_types: [ str, bool ] }
    bundle: { type: str, valid_values: [ vlan_aware, vlan, port, port_vlan ]}
features:
  irb: Supports symmetrical IRB (routing on ingress and egress)
  asymmetrical_irb: Support asymmetrical IRB (routing on ingress, bridging on egress)
  bundle: EVPN bundle service support
  multi_rt: Multiple import/export route targets
  transport: Supported data-plane encapsulations
`,isis:`# ISIS default settings and attributes
#
---
area: "49.0001"
type: level-2
instance: Gandalf
transform_after: [ vlan, vrf ]
config_after: [ vlan, dhcp, routing ]
attributes:
  global:
    af:
      _list_to_dict: True
      _alt_types: [ NoneType ]
      ipv4: bool
      ipv6: bool
    area: net
    type: { type: str, valid_values: [ level-1, level-2, level-1-2 ] }
    bfd:
      ipv4: bool
      ipv6: bool
      _alt_types: [ bool ]
    instance: str
  node:
    af:
    area:
    bfd:
    import: _r_import
    instance:
    net: net
    type:
  vrf:
    active: bool
    af: { copy: global }
  link:
    metric: { type: int, min_value: 1, max_value: 16777215 }
    cost: { type: int, min_value: 1, max_value: 16777215 }
    type: { type: str, valid_values: [ level-1, level-2, level-1-2 ] }
    bfd:
      ipv4: bool
      ipv6: bool
      _alt_types: [ bool ]
    network_type:
      type: str
      valid_values: [ point-to-point ]
      _alt_types: [ bool ]
    passive: bool
  loopback:
    type: { copy: link }
    metric: { copy: link }
    cost: { copy: link }
features:
  unnumbered:
    ipv4: IPv4 unnumbered interfaces
    ipv6: IPv6 unnumbered interfaces
    network: multi-access unnumbered links
  import: Route redistribution
  circuit_type: Circuit type
warnings:
  inactive: True
`,ospf:`# OSPFv2/OSPFv3 default settings and attributes
#
---
area: 0.0.0.0
transform_after: [ vlan, vrf ]
config_after: [ vlan, dhcp, routing ]
attributes:
  global:
    af:
      _list_to_dict: True
      _alt_types: [ NoneType ]
      ipv4: bool
      ipv6: bool
    area: { type: ipv4, use: id }
    bfd:
      ipv4: bool
      ipv6: bool
      strict: bool                                                # Support RFC9355
      strict_delay: { type: int, min_value: 0, max_value: 600 }   # optional delay in seconds
      _alt_types: [ bool ]
    passive: bool
    password: str
    process: { type: int, min_value: 1 }
    reference_bandwidth: { type: int, min_value: 1 }
    timers:
      hello: { type: int, min_value: 1, max_value: 8192 }
      dead: { type: int, min_value: 3, max_value: 8192 }

  node:
    af:
    area:
    bfd:
    default:
      _alt_types: [ bool ]
      type: dict
      _keys:                                                      # Use 'keys' to make 'type' a valid attribute
        always: bool
        policy: id
        cost: int
        type: { type: str, valid_values: [ e1, e2 ] }
    digest: { type: dict }
    gr:
      _remove_when_false: True
      _value_to_dict:
        restart: '{value}'
      restart:
        type: dict
        _keys:
          grace_period: { type: int, min_value: 1, max_value: 1800 }
        true_value: {}
        _remove_when_false: True
      helper:
        type: dict
        _keys:
          grace_period: { type: int, min_value: 10, max_value: 1800 }
        true_value: {}
        _remove_when_false: True
    import: _r_import
    passive:
    password: { copy: global }
    priority: { type: int, min_value: 0, max_value: 255 }
    process:
    reference_bandwidth:
    router_id: { type: ipv4, use: id }
    timers: { copy: global }

  node_copy: [ area, passive, digest, password, priority, timers ]

  vrf_aware: [ area ]
  vrf_copy: [ area, router_id, reference_bandwidth, gr ]
  vrf:
    active: bool
    af: { copy: global }
    area: { copy: global }
    import: _r_import
    default: { copy: node }
    digest: { copy: node }
    gr: { copy: node }
    passive: bool
    password: { copy: global }
    router_id: { copy: node }
    timers: { copy: global }

  link:
    area: { copy: global }
    bfd: bool
    cost: { type: int, min_value: 1, max_value: 65534 }
    digest: { copy: node }
    network_type: { type: str, valid_values: [ point-to-point, point-to-multipoint, broadcast, non-broadcast ] }
    passive: bool
    password: { copy: global }
    timers: { copy: global }

  intf_to_neighbor: False
  intf_optional: [ timers, priority, password, digest ]
  interface:
    priority: { copy: node }

  loopback:
    area: { copy: global }
    cost: { copy: link }

features:
  default: Originate external default route
  digest: MD5 authentication
  gr: OSPF graceful restart (restart and helper)
  import: Import routes from other routing protocols
  password: Cleartext authentication
  priority: Router priority
  strict_bfd: Supports strict BFD mode (RFC 9355)
  timers: Supports OSPF interface timers
  unnumbered: Can run OSPFv2 over unnumbered IPv4 interfaces

warnings:
  inactive: True
  gr_helper_grace: True
`,vlan:`# VLAN default settings and attributes
#
config_after: [ lag ]
transform_after: [ lag ]
no_propagate: [ start_vlan_id, mode ]
start_vlan_id: 1000
mode: irb
attributes:
  global:
    mode: { type: str, valid_values: [ bridge, irb, route ] }
  node:
    mode:
  link:
    access: id
    native: id
    mode:  { type: str, valid_values: [ route ] }      # You can only use link/intf vlan.mode for routed subinterfaces
    trunk:
  #
  # The next sets of attributes control propagation of VLAN and interface
  # attributes into links and SVI interfaces
  #
  # They are structured as dictionaries so it's easy to add new attributes
  #

  # Do not propagate these attributes into links or SVI interfaces
  vlan_no_propagate:
    id:
    vni:
    mode:
    prefix:
    evpn:
    stp:
    lag:

  # Copy these attributes from node VLAN data into interface-on-link data
  copy_vlan_to_intf:
    ipv4:
    ipv6:
    gateway:

  #
  # Do not copy these VLAN attributes into SVI interfaces
  #vlan_svi_no_propagate:
  #  gateway:
  #
  # Do not copy these attributes into SVI interfaces, and don't pop() them
  phy_ifattr:
    bridge:
    ifindex:
    parentindex:
    ifname:
    linkindex:
    type:
    vlan:
    mtu:
    bandwidth:
    _selfloop_ifindex:
    stp:
    virtual_interface:  # Use case: VLAN on lag interface
    lag:                # Keep lag parameters such as lacp settings
    evpn:               # Use case: ESI-LAG

  #
  # Keep these subinterface attributes
  keep_subif:
    vlan:
    ifindex:
    ifname:
    type:
    virtual_interface:

features:
  model: Conceptual device configuration model
  mixed_trunk: Supports trunk interfaces with mixed routed/bridged VLANs
  native_routed: Supports native layer-3 interface on a trunk port
_top:                               # Modification of global defaults
  attributes:
    vlan:                           # Define the VLAN object type
      _description: Global VLAN definition
      id: { type: int, min_value: 1, max_value: 4095 }
      vni: { type: int, min_value: 1, max_value: 16777215 }
      mode: { type: str, valid_values: [ bridge, irb, route ] }
      links: list
      prefix:
      _namespace: [ link ]          # VLANs can include link attributes
    node_vlan:
      _description: Node VLAN definition
      id: { type: int, min_value: 1, max_value: 4095 }
      vni: { type: int, min_value: 1, max_value: 16777215 }
      mode: { type: str, valid_values: [ bridge, irb, route ] }
      links: list
      prefix:
      _namespace: [ link, interface ]   # Node VLAN definition can include link and interface attributes
    global:
      vlans:                        # vlans is a valid global parameter
        type: dict                  # It's a dictionary
        _subtype: vlan              # ... of VLAN definitions
        _keytype: id                # ... where the VLAN names must be valid identifiers
        _requires: [ vlan ]         # ... that requires VLAN module
    node:
      vlans:                        # Repeat the definition for node VLANs
        type: dict
        _subtype: node_vlan
        _keytype: id
        _requires: [ vlan ]

warnings:
  mixed_fwd_check: True
`,vrf:`# VRF default settings and attributes
#
---
config_after: [ vlan, ospf, isis, bgp, mpls ]
transform_after: [ vlan, bgp ]
as: 65000
attributes:
  global:
    as: asn
    loopback: bool
  node:
    as:
    loopback: bool
  link: id
  interface: id
  # Reserved VRF names
  reserved: [ default, system, global, base, mgmt, management, mgmt_junos ]

warnings:
  inactive: True
_top:                               # Modification of global defaults
  attributes:
    vrf:                            # Define the VRF object type
      _description: Global or node-level VRF definition
      rd: rd
      import: list
      export: list
      id: { type: int, min_value: 1 }
      links: list
      loopback:
        type: dict                  # Further validation will be done in the VRF module
        _alt_types: [ bool, prefix_str, NoneType ]
      _namespace: [ link ]          # VRFs can include link attributes
    global:
      vrfs:                         # vrfs is a valid global parameter
        type: dict                  # It's a dictionary
        _subtype: vrf               # ... of VRF definitions
        _keytype: id                # ... where the VRF names must be valid identifiers
        _requires: [ vrf ]          # ... that requires VRF module
    node:
      vrfs:                         # Repeat the definition for node vrfs
        type: dict
        _subtype: vrf
        _keytype: id
        _requires: [ vrf ]

features:
  ospfv2: VRF-aware OSPFv2
  ospfv3: VRF-aware OSPFv3
  ripv2: VRF-aware RIPv2
  ripng: VRF-aware RIPng
  isis: VRF-aware IS-IS
  bgp: BGP neighbors in VRF BGP instances
`,vxlan:`# VXLAN default settings and attributes
#
requires: [ vlan ]
config_after: [ vrf, bgp ]        # VRFs must be created before L3 VXLAN, some platforms also need BGP router_id
transform_after: [ vlan, vrf ]
domain: global
flooding: static
start_vni: 100000
attributes:
  global:
    domain: id
    flooding: { type: str, valid_values: [ static, evpn ] }
    vlans: list
    use_v6_vtep: bool
  node:
    domain:
    flooding:
    vlans:
  link:
    vtep: bool
no_propagate: [ use_v6_vtep, start_vni ]
use_v6_vtep: false
features:
  vtep6: VXLAN over IPv6
`},Jr=[`attributes`,`extra_attributes`,`features`,`hooks`,`requires`,`supported_on`,`no_propagate`,`config_after`,`transform_after`,`warnings`,`_top`],Yr=[`vlan`,`vrf`,`vxlan`,`ospf`,`isis`,`bgp`,`evpn`],Xr;function Zr(){if(Xr)return Xr;let e={};for(let t of Yr){let n=qr[t];n&&(e[t]=$n(n)??{})}return Xr=e,e}function Qr(e){return Zr()[e]}function $r(e){if(!e)return[...Jr];let t=e.no_propagate,n=[];Array.isArray(t)?n=t.map(String):t&&typeof t==`object`&&(n=Object.keys(t));for(let t of Object.keys(e))t.includes(`no_propagate`)&&t!==`no_propagate`&&n.push(t);return[...Jr,...n]}function ei(e){if(!e)return{};let t={...e};for(let n of $r(e))delete t[n];return t}function ti(e){let t=Qr(e)?.requires;return Array.isArray(t)?t.map(String):[]}function ni(e){let t=Qr(e)?.transform_after;return Array.isArray(t)?t.map(String):[]}function ri(e){let t=Qr(e)?.config_after;return Array.isArray(t)?t.map(String):[]}function ii(e){let t=Qr(e)?.attributes,n=t&&typeof t==`object`?t.node_copy:void 0;return Array.isArray(n)?n.map(String):[]}function ai(){let e=Zr(),t={};for(let[n,r]of Object.entries(e))t[n]={...r};return t}var oi={addressing:`#
# Default loopback, LAN, and P2P prefixes
loopback:
  ipv4: 10.0.0.0/24
router_id:
  ipv4: 10.0.0.0/24
  prefix: 32
lan:
  ipv4: 172.16.0.0/16
p2p:
  ipv4: 10.1.0.0/16
mgmt:
  ipv4: 192.168.121.0/24
  start: 100
  mac: CA-FE-00-00-00-00
l2only:
vrf_loopback:
  ipv4: 10.2.0.0/24
  prefix: 32
`,attributes:`# Core _netlab_ attributes: global, link, interface, node, VLAN, VRF...
#
# yaml-language-server: $schema=https://json.schemastore.org/yamllint.json
---
global:                     # Common global attributes
  addressing:               # We can do at least some baseline validation ;)
    type: dict
    _keytype: id
  defaults:
  groups:
  links:
  module:
  name:
    type: id
    _help: |
      Topology name should be no longer than 16 characters. It should start with a letter
      and contain letters, underscores or numbers. netlab derives it from the directory name
      when it's not specified in the lab topology file.
  nodes:
  plugin:
    type: list
    _subtype: str
  prefix:
    type: dict
    _keytype: id
    _subtype: _prefix
  provider: id
  tools:
    type: dict
    _subtype:
      type: dict
      create_empty: True
  validate:
    type: dict
    _keytype: id
    _subtype: _v_entry
  version:

internal:                   # Internal attributes, not validated
  input:
  pools: dict
  Provider:
  Plugin:
  message: str

global_extra_ns: [ providers, outputs ]

can_be_false: [ link, interface, loopback ]

link:                       # Global link attributes
  bandwidth: int
  bridge: id
  disable: bool
  shutdown: bool            # Shut down then interface during the initial configuration
  name: str
  prefix:
    type: dict
    _keys:
      ipv4: { type: ipv4, use: subnet_prefix }
      ipv6: { type: ipv6, use: subnet_prefix }
      allocation: { type: str, valid_values: [ p2p, sequential, id_based ] }
      _name: str
    _alt_types: [ bool_false, prefix_str, named_pfx ]
  ra:
    disable: bool
    slaac: bool
    dhcp: { type: str, valid_values: [ all, other ] }
    onlink: bool
  role: id
  pool: id
  tc:
    delay: time
    jitter: time
    loss: { type: float, min_value: 0, max_value: 100 }
    corrupt: { type: float, min_value: 0, max_value: 100 }
    duplicate: { type: float, min_value: 0, max_value: 100 }
    reorder: { type: float, min_value: 0, max_value: 100 }
    rate: { type: int, min_value: 1 }
  type: { type: str, valid_values: [ lan, p2p, stub, loopback, tunnel, vlan_member ] }
  unnumbered: bool
  interfaces:
  mtu: { type: int, min_value: 64, max_value: 9216 }
  vlan_name: id

link_internal:              # Internal link attributes
  linkindex: int
  parentindex: int
link_no_propagate: [ prefix, interfaces, gateway ]
# Do not propagate VLAN attributes to node interfaces -- see #575
# Also: do not propagate DHCP attributes from links to interfaces
link_module_no_propagate: [ vlan, dhcp ]

interface:                  # Interface (node-to-link attachment) attributes
  node: node_id
  ipv4: { type: ipv4, use: interface }
  ipv6: { type: ipv6, use: interface }
  ifindex: int
  ifname: str

node_extra_ns: [ providers, tools, outputs ]

node:
  name: str                                         # Validity of node name is checked in the nodes module
  interfaces: list
  module:
    type: list
    _subtype: id
  device: device
  box: str
  id: { type: int, min_value: 1, max_value: MAX_NODE_ID }
  config:
    type: dict
    _subtype:
      type: error
      _err_msg: Enable "files" plugin to use the inline node/group configuration template(s)
    _alt_types: [ list ]
  skip_config: list
  group: list
  role: { type: str, valid_values: [ router, host, bridge, gateway ] }
  router_id: { type: ipv4, use: id }
  mgmt:
    ipv4: { type: ipv4, use: interface }
    ipv6: { type: ipv6, use: interface }
    mac: str
    ifname: str
  mtu: { type: int, min_value: 64, max_value: 9216 }
  loopback:
    type: dict
    _alt_types: [ bool ]
  provider: id
  cpu:
  memory: int
  unmanaged: bool

loopback:
  ipv4: { type: ipv4, use: host_prefix, _alt_types: [ bool ] }
  ipv6: { type: ipv6, use: host_prefix, _alt_types: [ bool ] }
  pool: addr_pool

pool:                       # Address pool definition
  ipv4: { type: ipv4, use: subnet_prefix }
  ipv6: { type: ipv6, use: subnet_prefix }
  start: { type: int, min_value: 0 }
  prefix: { type: int, min_value: 1, max_value: 32 }
  prefix6: { type: int, min_value: 1, max_value: 128 }
  allocation: { type: str, valid_values: [ p2p, sequential, id_based ] }
  mac: mac
  unnumbered: bool
pool_no_copy: [ start, prefix, prefix6, mac ]

prefix:                     # Link prefix (called by link module directly)
  ipv4: { type: ipv4, use: subnet_prefix }
  ipv6: { type: ipv6, use: subnet_prefix }
  allocation: { type: str, valid_values: [ p2p, sequential, id_based ] }

node_group:
  _description: Node groups
  _namespace: [ node ]
  members:
    type: list
    _subtype: { type: id, max_length: MAX_NODE_ID_LENGTH }
  vars: dict
  config: list
  node_data:
    type: dict
    true_value: {}
  device: device
  module: list

vlan_group:
  _description: VLAN groups
  _namespace: [ vlan, link ]
  type: str
  members:
    type: list
    _subtype: id

vrf_group:
  _description: VRF groups
  _namespace: [ vrf ]
  type: str
  members:
    type: list
    _subtype: id

_prefix:                    # Generic named prefix entry
  ipv4: { type: ipv4, use: prefix }
  ipv6: { type: ipv6, use: prefix }
  allocation: { type: str, valid_values: [ p2p, sequential, id_based ] }
  pool:
    type: str
    _valid_with: [ allocation ]

_v_entry:                   # Validation entry
  _description: Single network validation test (an entry in the validate dictionary)
  description: str
  fail: str
  pass: str
  wait: { type: int, _alt_types: [ id ] }          # Wait time could be an integer or a reference to a constant
  wait_msg: str
  nodes:
    type: list
    _subtype: node_id
  devices:
    type: list
    _subtype: device
  exec: _v_option
  show: _v_option
  config:
    template: str
    variable: dict
    inline:
      type: error
      _err_msg: Enable "files" plugin to use the "inline" configuration template
    _alt_types: [ str ]
  valid: _v_option
  suzieq:
    _alt_types: [ str ]
    show: str
    expect: { type: str, valid_values: [ empty ] }
    valid: { type: str, valid_values: [ all, any ]}
  plugin: str
  stop_on_error: bool
  level: { type: str, valid_values: [ warning ] }
_v_option:
  _description: |
    A "show", "exec" or "valid" parameter in a network validation test. It's a
    dictionary of device types with each value being a command to execute or
    expression to evaluate.
  type: dict
  _alt_types: [ str ]
  _keytype: device

_r_import:
  _description: |
    Routing protocol import specification. Each entry specifies a protocol to
    import. Values might contain routing policies
  type: dict
  _keytype: r_proto
  _list_to_dict: True
  _subtype:
    _alt_types: [ NoneType, bool ]
    policy:
      type: id
      _requires: [ routing ]
`};function si(e){let t=oi[e];if(!t)return{};let n=$n(t);return!n||typeof n!=`object`||Array.isArray(n)?{}:n}function ci(){let e={};for(let t of Object.keys(oi))e[t]=si(t);return e}function li(){return{device:`frr`,provider:`clab`,...ci(),...ai()}}function ui(e){let t=$n(e);if(!t||typeof t!=`object`||Array.isArray(t))throw Error(`Topology must be a YAML/JSON object`);return Vr(t)}function di(e,t={}){return fi(ui(e),t)}function fi(e,t={}){return Wr(e),e.defaults=O(O(li(),t.defaults??{}),e.defaults??{}),e.provider||=`clab`,e.name||=t.name??`topology`,e.addressing=O(e.defaults.addressing??{},e.addressing??{}),e}function pi(e){return e.replace(/\\/g,`/`)}function mi(...e){let t=[],n=e.map(pi).join(`/`),r=n.startsWith(`/`);for(let e of n.split(`/`))e&&e!==`.`&&(e===`..`?t.pop():t.push(e));return(r?`/`:``)+t.join(`/`)}function hi(e){let t=pi(e).replace(/\/$/,``),n=t.lastIndexOf(`/`);return n<0?`.`:n===0?`/`:t.slice(0,n)}function gi(...e){return mi(e.join(`/`))}function _i(e,t){let n=pi(e).split(`/`).pop()??``;return t&&n.endsWith(t)?n.slice(0,-t.length):n}var vi={resolve:mi,dirname:hi,join:gi,basename:_i};function yi(e){let t=String(e);return t.startsWith(`file:`)?decodeURIComponent(t.replace(/^file:\/\//,``).replace(/^file:\//,`/`)):`/packages/core/src/validate/schema.js`}function bi(e,t){if(!e.includes(`:`))return{statementName:null,moduleName:null};let[n,r]=e.split(`:`,2);if(!n||!r)return{statementName:null,moduleName:null};let i=t[n];return!i||!i.findStatement(r)?{statementName:null,moduleName:null}:{statementName:r,moduleName:n}}var xi=class extends Error{constructor(e){super(e),this.name=`YangError`}},k=class extends SyntaxError{messageText;line_num;line;context_lines;filename;constructor(e,t={}){let{line_num:n,line:r,context_lines:i=[],filename:a}=t,o=[];a&&o.push(`${a}:`),n&&o.push(`${n}:`),o.push(e);let s=o.join(` `);if(i.length>0){s+=`
`;for(let[e,t]of i)s+=`${e===n?`>>> `:`    `}${String(e).padStart(4,` `)} | ${t}
`;n&&r&&(s+=`     ${` `.repeat(String(n).length+3)}${`^`.repeat(Math.max(1,r.trim().length))}`)}super(s),this.name=`YangSyntaxError`,this.messageText=e,this.line_num=n,this.line=r,this.context_lines=i,this.filename=a}formatHeadline(){let e=[];return this.filename&&e.push(`${this.filename}:`),this.line_num!==void 0&&e.push(`${this.line_num}:`),e.push(this.messageText),e.join(` `)}toString(){return this.formatHeadline()}},A=class extends xi{constructor(e){super(e),this.name=`YangSemanticError`}},Si=class extends A{target_path;constructor(e){super(`Refine target path matches no node in the used grouping: '${e}'`),this.name=`YangRefineTargetNotFoundError`,this.target_path=e}},Ci=class extends A{prefix_chain;repeated;constructor(e,t){let n=[...e,t].join(` -> `);super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${n}). Restructure groupings to break the cycle.`),this.name=`YangCircularUsesError`,this.prefix_chain=[...e],this.repeated=t}},j=class extends Error{messageText;position;expression;constructor(e,t={}){let{position:n,expression:r,context_before:i=10,context_after:a=10}=t;if(r!==void 0&&n!==void 0){let t=Math.max(0,n-i),o=Math.min(r.length,n+a),s=r.slice(t,o),c=n-t,l=[e,`
Expression: ${s}`,`           ${` `.repeat(c)}^`];n<r.length?l.push(`Position: ${n} (character: ${JSON.stringify(r[n])})`):l.push(`Position: ${n} (end of expression)`),super(l.join(`
`))}else super(e);this.name=`XPathSyntaxError`,this.messageText=e,this.position=n,this.expression=r}toString(){return this.messageText}},wi=new Set([`{`,`}`,`;`,`:`,`=`,`+`,`/`]);function Ti(e){return e?e.split(`
`).map(e=>e.replace(/\r$/,``)):[]}function Ei(e){return e===`STRING`?`string`:e===`INTEGER`||e===`DOTTED_NUMBER`?`number`:wi.has(e)?`symbol`:`identifier`}var Di=new Set([`{`,`}`,`;`,`:`,`=`,`+`,`/`,`STRING`,`IDENTIFIER`,`INTEGER`,`DOTTED_NUMBER`]);function Oi(e,t,n,r){return{type:e,value:t,line_num:n,char_pos:r,kind:Ei(e),line:n,column:r+1}}var ki=class{token_list;tokens;positions;filename;index;source;diagnostic_lines;constructor(e,t,n){this.token_list=e,this.tokens=e.map(e=>e.value),this.positions=e.map(e=>[e.line_num,e.char_pos]),this.source=t,this.filename=n,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){return this.token_list[this.index+e]?.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error(`Unexpected end of input`);let t=this.tokens[this.index];if(e!==void 0&&t!==e)throw this._make_error(`Expected '${e}', got '${t}'`);return this.index+=1,t}consume_if(e){return this.peek()===e&&(this.consume(),!0)}peek_type(){if(this.index>=this.token_list.length)throw this._make_error(`Unexpected end of input`);return this.token_list[this.index].type}peek_type_at(e=0){return this.token_list[this.index+e]?.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error(`Unexpected end of input`);let t=this.token_list[this.index];if(typeof e==`string`&&!Di.has(e)){if(t.type!==`IDENTIFIER`||t.value!==e)throw this._make_error(`Expected '${e}', got '${t.value}'`)}else if(t.type!==e)throw this._make_error(`Expected ${e}, got ${t.type} ('${t.value}')`);return this.index+=1,t.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;let t=this.token_list[this.index];if(typeof e==`string`&&!Di.has(e)){if(t.type!==`IDENTIFIER`||t.value!==e)return!1}else if(t.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error(`Unexpected end of input`);let t=this.token_list[this.index];for(let n of e)if(typeof n==`string`){if(!Di.has(n)){if(t.type===`IDENTIFIER`&&t.value===n)return this.index+=1,[t.value,n]}else if(t.type===n)return this.index+=1,[t.value,n]}else if(t.type===n)return this.index+=1,[t.value,n];throw this._make_error(`Expected one of (${e.join(`, `)}), got ${t.type} ('${t.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||=Ti(this.source),this.diagnostic_lines}_make_error(e,t=3){let[n]=this.position(),r=this.diagnostic_lines_once(),i=[],a=Math.max(1,n-t),o=Math.min(r.length,n+t);for(let e=a;e<=o;e+=1)e<=r.length&&i.push([e,r[e-1]]);return new k(e,{line_num:n,line:n<=r.length?r[n-1]:``,context_lines:i,filename:this.filename})}},Ai=class e{module;current_parent;source_dir;constructor(e){this.module=e.module,this.current_parent=e.current_parent,this.source_dir=e.source_dir}push_parent(t){return new e({module:this.module,current_parent:t,source_dir:this.source_dir})}},ji={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-0x8000000000000000,0x8000000000000000],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,0x10000000000000000]};new Set(Object.keys(ji));var Mi=class{patterns;length;range;fraction_digits;enums;bits;types;constructor(e={}){Object.assign(this,e)}};function Ni(e,t){let n=typeof e.error_message==`string`&&e.error_message.trim().length>0?e.error_message:t,r=typeof e.error_app_tag==`string`?e.error_app_tag.trim():``;return r.length>0?`${n} (error-app-tag: ${r})`:n}function Pi(e){let t=(e,t)=>{let n=e.trim().toLowerCase();if(n===`min`)return-1/0;if(n===`max`)return 1/0;let r=Number(n);return Number.isNaN(r)?t===`min`?-1/0:1/0:r};return e.split(`|`).map(e=>e.trim()).filter(Boolean).map(e=>{let[n,r]=e.split(`..`).map(e=>e.trim());if(!r){let e=t(n,`min`);return{min:e,max:e}}return{min:t(n,`min`),max:t(r,`max`)}})}function Fi(e,t){for(let n of Pi(t))if(e>=n.min&&e<=n.max)return!0;return!1}function Ii(e){return typeof e==`number`&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e==`string`&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function Li(e){return typeof e==`number`&&Number.isFinite(e)?e:typeof e==`string`&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function Ri(e,t,n){let r=ji[e];if(!r)return[!1,`Unsupported integer type '${e}'`];let i=Ii(t);if(i===null)return[!1,`Expected ${e}`];if(n)return Fi(i,n)?[!0,null]:[!1,`Integer ${i} does not match ${n}`];let[a,o]=r;return i<a?[!1,`Value ${i} is less than minimum ${a}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function zi(e,t){if(typeof e!=`string`)return[!1,`Expected base64 string`];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!=0)return[!1,`Expected valid base64 string`];try{let n=Buffer.from(e,`base64`);if(t&&!Fi(n.length,t))return[!1,`Binary length ${n.length} does not match ${t}`]}catch{return[!1,`Expected valid base64 string`]}return[!0,null]}function Bi(e,t){if(typeof e!=`string`)return[!1,`Bits values must be string tokens`];let n=new Set(t.map(e=>e.name));if(e.trim()===``)return[!0,null];let r=new Set;for(let t of e.trim().split(/\s+/)){if(!n.has(t))return[!1,`Unknown bit token '${t}'`];if(r.has(t))return[!1,`Duplicate bit token '${t}'`];r.add(t)}return[!0,null]}var Vi=class{validate(e,t,n){let r=n??new Mi,i=t.trim();if(i===`union`){for(let t of r.types??[]){let n=typeof t.name==`string`?t.name:`string`,[r]=this.validate(e,n,new Mi(t));if(r)return[!0,null]}return[!1,`Value does not match any union member type`]}if(i===`enumeration`)return typeof e==`string`?r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]:[!1,`Expected enumeration value (string)`];if(i===`string`){if(typeof e!=`string`)return[!1,`Expected string`];if(r.length&&!Fi(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];let t=Array.isArray(r.patterns)?r.patterns:[];if(t.length>0)for(let n of t){if(typeof n?.pattern!=`string`||n.pattern.length===0)continue;let t=RegExp(`^(?:${n.pattern})$`).test(e),r=n.invert_match===!0;if(!r&&!t||r&&t)return[!1,Ni(n,r?`String matches forbidden pattern ${n.pattern} (invert-match)`:`String does not match pattern ${n.pattern}`)]}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i===`boolean`)return typeof e==`boolean`||e===`true`||e===`false`?[!0,null]:[!1,`Expected boolean`];if(i===`empty`)return e===null?[!0,null]:[!1,`Expected empty (null)`];if(i in ji)return Ri(i,e,r.range);if(i===`binary`)return zi(e,r.length);if(i===`bits`)return Bi(e,r.bits??[]);if(i===`decimal64`||i===`number`){let t=Li(e);if(t===null)return[!1,`Expected number`];if(r.range&&!Fi(t,r.range))return[!1,`Number ${t} does not match ${r.range}`];if(typeof r.fraction_digits==`number`){let e=`${t}`.split(`.`)[1]?.length??0;if(e>r.fraction_digits)return[!1,`Too many fraction digits (${e} > ${r.fraction_digits})`]}return[!0,null]}if(i===`int64`||i===`integer`){let t=Ii(e);return t===null?[!1,`Expected integer`]:r.range&&!Fi(t,r.range)?[!1,`Integer ${t} does not match ${r.range}`]:[!0,null]}return typeof e==`string`?[!0,null]:[!1,`Unsupported type '${i}'`]}},M=new Map(Object.entries({"/yang/modules/netlab-bgp.yang":`module netlab-bgp {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:bgp";
  prefix bgp;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "BGP module augmentations.";

  revision 2026-07-16 {
    description "bgp-rr-attrs grouping for group/node BGP containers.";
  }

  grouping bgp-rr-attrs {
    description "BGP AS and route-reflector attributes shared by groups and nodes.";
    leaf as {
      type uint32;
    }
    leaf rr {
      type boolean;
    }
    leaf rr_cluster_id {
      type string;
    }
    leaf rr_mesh {
      type boolean;
    }
  }

  augment "/nt:topology" {
    container bgp {
      leaf as {
        type uint32;
      }
    }
  }

  // Groups inherit the node attribute namespace (attributes.yml node_group).
  augment "/nt:topology/nt:groups" {
    container bgp {
      uses bgp-rr-attrs;
    }
  }

  augment "/nt:topology/nt:nodes" {
    container bgp {
      uses bgp-rr-attrs;
      leaf router_id {
        type string;
      }
      list neighbor {
        key "name";
        leaf name {
          type string;
        }
        leaf as {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf ipv4 {
          type string;
        }
        leaf ipv6 {
          type string;
        }
        leaf evpn {
          type string;
          description "EVPN address-family activation (e.g. ipv4).";
        }
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container bgp {
      leaf local_as {
        type uint32;
      }
      leaf replace_global_as {
        type boolean;
      }
      leaf advertise {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container bgp {
      leaf advertise {
        type boolean;
      }
    }
  }
}
`,"yang/modules/netlab-bgp.yang":`module netlab-bgp {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:bgp";
  prefix bgp;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "BGP module augmentations.";

  revision 2026-07-16 {
    description "bgp-rr-attrs grouping for group/node BGP containers.";
  }

  grouping bgp-rr-attrs {
    description "BGP AS and route-reflector attributes shared by groups and nodes.";
    leaf as {
      type uint32;
    }
    leaf rr {
      type boolean;
    }
    leaf rr_cluster_id {
      type string;
    }
    leaf rr_mesh {
      type boolean;
    }
  }

  augment "/nt:topology" {
    container bgp {
      leaf as {
        type uint32;
      }
    }
  }

  // Groups inherit the node attribute namespace (attributes.yml node_group).
  augment "/nt:topology/nt:groups" {
    container bgp {
      uses bgp-rr-attrs;
    }
  }

  augment "/nt:topology/nt:nodes" {
    container bgp {
      uses bgp-rr-attrs;
      leaf router_id {
        type string;
      }
      list neighbor {
        key "name";
        leaf name {
          type string;
        }
        leaf as {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf ipv4 {
          type string;
        }
        leaf ipv6 {
          type string;
        }
        leaf evpn {
          type string;
          description "EVPN address-family activation (e.g. ipv4).";
        }
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container bgp {
      leaf local_as {
        type uint32;
      }
      leaf replace_global_as {
        type boolean;
      }
      leaf advertise {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container bgp {
      leaf advertise {
        type boolean;
      }
    }
  }
}
`,"/yang/modules/netlab-evpn.yang":`module netlab-evpn {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:evpn";
  prefix evpn;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "EVPN module augmentations.";

  revision 2026-07-16 {
    description "evpn-common and evpn-rt-attrs groupings.";
  }

  grouping evpn-common {
    description "EVPN attributes shared by topology and node containers.";
    leaf-list session { type string; }
    leaf transport { type string; }
    leaf-list vlans { type string; }
    leaf-list vrfs { type string; }
  }

  grouping evpn-rt-attrs {
    description "EVPN route-target / EVI attributes on VLAN objects.";
    leaf evi { type uint32; }
    leaf rd { type string; }
    leaf-list import { type string; }
    leaf-list export { type string; }
  }

  augment "/nt:topology" {
    container evpn {
      uses evpn-common;
      leaf as { type uint32; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container evpn {
      uses evpn-common;
      leaf domain { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    container evpn {
      uses evpn-rt-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    container evpn {
      uses evpn-rt-attrs;
    }
  }
}
`,"yang/modules/netlab-evpn.yang":`module netlab-evpn {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:evpn";
  prefix evpn;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "EVPN module augmentations.";

  revision 2026-07-16 {
    description "evpn-common and evpn-rt-attrs groupings.";
  }

  grouping evpn-common {
    description "EVPN attributes shared by topology and node containers.";
    leaf-list session { type string; }
    leaf transport { type string; }
    leaf-list vlans { type string; }
    leaf-list vrfs { type string; }
  }

  grouping evpn-rt-attrs {
    description "EVPN route-target / EVI attributes on VLAN objects.";
    leaf evi { type uint32; }
    leaf rd { type string; }
    leaf-list import { type string; }
    leaf-list export { type string; }
  }

  augment "/nt:topology" {
    container evpn {
      uses evpn-common;
      leaf as { type uint32; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container evpn {
      uses evpn-common;
      leaf domain { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    container evpn {
      uses evpn-rt-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    container evpn {
      uses evpn-rt-attrs;
    }
  }
}
`,"/yang/modules/netlab-isis.yang":`module netlab-isis {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:isis";
  prefix isis;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "IS-IS module augmentations.";

  revision 2026-07-16 {
    description "isis-common grouping for topology/node IS-IS containers.";
  }

  grouping isis-common {
    description "IS-IS attributes shared by topology and node containers.";
    leaf area {
      type string;
    }
    leaf type {
      type string;
    }
  }

  augment "/nt:topology" {
    container isis {
      uses isis-common;
    }
  }

  augment "/nt:topology/nt:nodes" {
    container isis {
      uses isis-common;
      leaf net {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container isis {
      leaf network_type {
        type string;
      }
      leaf metric {
        type uint32;
      }
      leaf passive {
        type boolean;
      }
    }
  }
}
`,"yang/modules/netlab-isis.yang":`module netlab-isis {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:isis";
  prefix isis;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "IS-IS module augmentations.";

  revision 2026-07-16 {
    description "isis-common grouping for topology/node IS-IS containers.";
  }

  grouping isis-common {
    description "IS-IS attributes shared by topology and node containers.";
    leaf area {
      type string;
    }
    leaf type {
      type string;
    }
  }

  augment "/nt:topology" {
    container isis {
      uses isis-common;
    }
  }

  augment "/nt:topology/nt:nodes" {
    container isis {
      uses isis-common;
      leaf net {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container isis {
      leaf network_type {
        type string;
      }
      leaf metric {
        type uint32;
      }
      leaf passive {
        type boolean;
      }
    }
  }
}
`,"/yang/modules/netlab-ospf.yang":`module netlab-ospf {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:ospf";
  prefix ospf;

  import netlab-topology {
    prefix nt;
  }
  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description "OSPF module augmentations.";

  revision 2026-07-16 {
    description
      "ospf-link-attrs grouping; reuse ntype:af-flags (requires xYang ≥ 0.1.6).";
  }

  grouping ospf-link-attrs {
    description "OSPF attributes common to interfaces and links.";
    leaf area {
      type string;
    }
    leaf network_type {
      type string;
    }
    leaf cost {
      type uint32;
    }
  }

  augment "/nt:topology" {
    container ospf {
      leaf area {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container ospf {
      leaf area {
        type string;
      }
      leaf router_id {
        type string;
      }
      leaf passive {
        type boolean;
      }
      uses ntype:af-flags;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container ospf {
      uses ospf-link-attrs;
      leaf passive {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container ospf {
      uses ospf-link-attrs;
    }
  }
}
`,"yang/modules/netlab-ospf.yang":`module netlab-ospf {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:ospf";
  prefix ospf;

  import netlab-topology {
    prefix nt;
  }
  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description "OSPF module augmentations.";

  revision 2026-07-16 {
    description
      "ospf-link-attrs grouping; reuse ntype:af-flags (requires xYang ≥ 0.1.6).";
  }

  grouping ospf-link-attrs {
    description "OSPF attributes common to interfaces and links.";
    leaf area {
      type string;
    }
    leaf network_type {
      type string;
    }
    leaf cost {
      type uint32;
    }
  }

  augment "/nt:topology" {
    container ospf {
      leaf area {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container ospf {
      leaf area {
        type string;
      }
      leaf router_id {
        type string;
      }
      leaf passive {
        type boolean;
      }
      uses ntype:af-flags;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container ospf {
      uses ospf-link-attrs;
      leaf passive {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container ospf {
      uses ospf-link-attrs;
    }
  }
}
`,"/yang/modules/netlab-vlan.yang":`module netlab-vlan {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vlan";
  prefix vlan;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VLAN module augmentations.";

  revision 2026-07-16 {
    description
      "vlan-definition grouping for global/node VLAN lists; keep vlan-if-attrs.";
  }

  grouping vlan-if-attrs {
    description "VLAN attributes on a physical or SVI interface.";
    leaf access {
      type string;
    }
    leaf-list trunk {
      type string;
    }
    leaf native {
      type string;
    }
    leaf mode {
      type string;
    }
    leaf name {
      type string;
      description "VLAN name on SVI interfaces.";
    }
    leaf access_id {
      type uint16 {
        range "1..4094";
      }
    }
  }

  grouping vlan-definition {
    description "Shared VLAN object fields (global and per-node).";
    leaf name {
      type string;
    }
    leaf id {
      type uint16 {
        range "1..4094";
      }
    }
    leaf mode {
      type string;
    }
    leaf bridge_group {
      type uint32;
    }
    container prefix {
      leaf ipv4 { type string; }
      leaf ipv6 { type string; }
    }
  }

  augment "/nt:topology" {
    list vlans {
      key "name";
      uses vlan-definition;
      leaf-list links {
        type string;
        description "Access-link shorthand (e.g. dut-h1).";
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vlan {
      description "Node-level VLAN module state (e.g. max_bridge_group).";
      leaf mode {
        type string;
      }
      leaf max_bridge_group {
        type uint32;
      }
    }
    list vlans {
      key "name";
      uses vlan-definition;
    }
  }

  augment "/nt:topology/nt:links" {
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:links/nt:interfaces" {
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    leaf mode {
      type string;
      description "Copied onto SVI from VLAN data during transform.";
    }
    leaf bridge_group {
      type uint32;
      description "Copied onto SVI from VLAN data during transform.";
    }
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces/nt:neighbors" {
    container vlan {
      uses vlan-if-attrs;
    }
  }
}
`,"yang/modules/netlab-vlan.yang":`module netlab-vlan {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vlan";
  prefix vlan;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VLAN module augmentations.";

  revision 2026-07-16 {
    description
      "vlan-definition grouping for global/node VLAN lists; keep vlan-if-attrs.";
  }

  grouping vlan-if-attrs {
    description "VLAN attributes on a physical or SVI interface.";
    leaf access {
      type string;
    }
    leaf-list trunk {
      type string;
    }
    leaf native {
      type string;
    }
    leaf mode {
      type string;
    }
    leaf name {
      type string;
      description "VLAN name on SVI interfaces.";
    }
    leaf access_id {
      type uint16 {
        range "1..4094";
      }
    }
  }

  grouping vlan-definition {
    description "Shared VLAN object fields (global and per-node).";
    leaf name {
      type string;
    }
    leaf id {
      type uint16 {
        range "1..4094";
      }
    }
    leaf mode {
      type string;
    }
    leaf bridge_group {
      type uint32;
    }
    container prefix {
      leaf ipv4 { type string; }
      leaf ipv6 { type string; }
    }
  }

  augment "/nt:topology" {
    list vlans {
      key "name";
      uses vlan-definition;
      leaf-list links {
        type string;
        description "Access-link shorthand (e.g. dut-h1).";
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vlan {
      description "Node-level VLAN module state (e.g. max_bridge_group).";
      leaf mode {
        type string;
      }
      leaf max_bridge_group {
        type uint32;
      }
    }
    list vlans {
      key "name";
      uses vlan-definition;
    }
  }

  augment "/nt:topology/nt:links" {
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:links/nt:interfaces" {
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    leaf mode {
      type string;
      description "Copied onto SVI from VLAN data during transform.";
    }
    leaf bridge_group {
      type uint32;
      description "Copied onto SVI from VLAN data during transform.";
    }
    container vlan {
      uses vlan-if-attrs;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces/nt:neighbors" {
    container vlan {
      uses vlan-if-attrs;
    }
  }
}
`,"/yang/modules/netlab-vrf.yang":`module netlab-vrf {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vrf";
  prefix vrf;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VRF module augmentations.";

  revision 2026-07-16 {
    description "vrf-definition grouping for global/node VRF lists.";
  }

  grouping vrf-definition {
    description "Shared VRF object fields (global and per-node).";
    leaf name {
      type string;
    }
    leaf rd {
      type string;
    }
    leaf-list import {
      type string;
    }
    leaf-list export {
      type string;
    }
  }

  augment "/nt:topology" {
    list vrfs {
      key "name";
      uses vrf-definition;
    }
  }

  augment "/nt:topology/nt:nodes" {
    list vrfs {
      key "name";
      uses vrf-definition;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    leaf vrf {
      type string;
    }
  }
}
`,"yang/modules/netlab-vrf.yang":`module netlab-vrf {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vrf";
  prefix vrf;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VRF module augmentations.";

  revision 2026-07-16 {
    description "vrf-definition grouping for global/node VRF lists.";
  }

  grouping vrf-definition {
    description "Shared VRF object fields (global and per-node).";
    leaf name {
      type string;
    }
    leaf rd {
      type string;
    }
    leaf-list import {
      type string;
    }
    leaf-list export {
      type string;
    }
  }

  augment "/nt:topology" {
    list vrfs {
      key "name";
      uses vrf-definition;
    }
  }

  augment "/nt:topology/nt:nodes" {
    list vrfs {
      key "name";
      uses vrf-definition;
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    leaf vrf {
      type string;
    }
  }
}
`,"/yang/modules/netlab-vxlan.yang":`module netlab-vxlan {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vxlan";
  prefix vxlan;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VXLAN module augmentations.";

  revision 2026-07-16 {
    description "vxlan-common and vxlan-vlan-attrs groupings.";
  }

  grouping vxlan-common {
    description "VXLAN attributes shared by topology and node containers.";
    leaf domain { type string; }
    leaf flooding { type string; }
    leaf-list vlans { type string; }
  }

  grouping vxlan-vlan-attrs {
    description "VXLAN attributes attached to VLAN objects.";
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
  }

  augment "/nt:topology" {
    container vxlan {
      uses vxlan-common;
      leaf use_v6_vtep { type boolean; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vxlan {
      uses vxlan-common;
      leaf vtep { type string; }
      leaf vtep_interface { type string; }
      leaf transport { type string; }
      leaf-list vtep_list { type string; }
      leaf-list l3vnis { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    uses vxlan-vlan-attrs;
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    uses vxlan-vlan-attrs;
  }
}
`,"yang/modules/netlab-vxlan.yang":`module netlab-vxlan {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:vxlan";
  prefix vxlan;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "VXLAN module augmentations.";

  revision 2026-07-16 {
    description "vxlan-common and vxlan-vlan-attrs groupings.";
  }

  grouping vxlan-common {
    description "VXLAN attributes shared by topology and node containers.";
    leaf domain { type string; }
    leaf flooding { type string; }
    leaf-list vlans { type string; }
  }

  grouping vxlan-vlan-attrs {
    description "VXLAN attributes attached to VLAN objects.";
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
  }

  augment "/nt:topology" {
    container vxlan {
      uses vxlan-common;
      leaf use_v6_vtep { type boolean; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vxlan {
      uses vxlan-common;
      leaf vtep { type string; }
      leaf vtep_interface { type string; }
      leaf transport { type string; }
      leaf-list vtep_list { type string; }
      leaf-list l3vnis { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    uses vxlan-vlan-attrs;
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    uses vxlan-vlan-attrs;
  }
}
`,"/yang/netlab-device.yang":`module netlab-device {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:device";
  prefix ndev;

  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description "Device registry schema (open device-name; runtime subset varies).";

  revision 2026-07-16 {
    description "Initial revision.";
  }

  container devices {
    list device {
      key "name";
      leaf name {
        type ntype:device-name;
      }
      leaf description {
        type string;
      }
      leaf interface_name {
        type string;
      }
      leaf mgmt_if {
        type string;
      }
      leaf loopback_interface_name {
        type string;
      }
      leaf role {
        type ntype:node-role;
      }
      leaf parent {
        type ntype:device-name;
      }
      leaf daemon {
        type boolean;
      }
      leaf _meta_device {
        type boolean;
      }
    }
  }
}
`,"yang/netlab-device.yang":`module netlab-device {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:device";
  prefix ndev;

  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description "Device registry schema (open device-name; runtime subset varies).";

  revision 2026-07-16 {
    description "Initial revision.";
  }

  container devices {
    list device {
      key "name";
      leaf name {
        type ntype:device-name;
      }
      leaf description {
        type string;
      }
      leaf interface_name {
        type string;
      }
      leaf mgmt_if {
        type string;
      }
      leaf loopback_interface_name {
        type string;
      }
      leaf role {
        type ntype:node-role;
      }
      leaf parent {
        type ntype:device-name;
      }
      leaf daemon {
        type boolean;
      }
      leaf _meta_device {
        type boolean;
      }
    }
  }
}
`,"/yang/netlab-internal.yang":`module netlab-internal {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:internal";
  prefix ni;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description
    "Transform-only attributes in a separate namespace. Instance JSON uses
     RFC 7951 qualified names that preserve underscore local names
     (e.g. netlab-internal:_linkname).";

  revision 2026-07-16 {
    description "Initial revision.";
  }

  augment "/nt:topology/nt:links" {
    leaf _linkname {
      type string;
      description "Stable diagnostic link name (Netlab _linkname).";
    }
    must "/nt:topology/nt:stage = 'user_input' or _linkname" {
      error-message "netlab-internal:_linkname is required after user_input stage";
      error-app-tag "MISSING";
    }
  }

  augment "/nt:topology/nt:nodes" {
    leaf _daemon {
      type boolean;
    }
    leaf _daemon_parent {
      type string;
    }
    leaf-list _removed_attr {
      type string;
    }
  }

  augment "/nt:topology" {
    leaf-list _Providers {
      type string;
    }
  }
}
`,"yang/netlab-internal.yang":`module netlab-internal {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:internal";
  prefix ni;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description
    "Transform-only attributes in a separate namespace. Instance JSON uses
     RFC 7951 qualified names that preserve underscore local names
     (e.g. netlab-internal:_linkname).";

  revision 2026-07-16 {
    description "Initial revision.";
  }

  augment "/nt:topology/nt:links" {
    leaf _linkname {
      type string;
      description "Stable diagnostic link name (Netlab _linkname).";
    }
    must "/nt:topology/nt:stage = 'user_input' or _linkname" {
      error-message "netlab-internal:_linkname is required after user_input stage";
      error-app-tag "MISSING";
    }
  }

  augment "/nt:topology/nt:nodes" {
    leaf _daemon {
      type boolean;
    }
    leaf _daemon_parent {
      type string;
    }
    leaf-list _removed_attr {
      type string;
    }
  }

  augment "/nt:topology" {
    leaf-list _Providers {
      type string;
    }
  }
}
`,"/yang/netlab-topology.yang":`module netlab-topology {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:topology";
  prefix nt;

  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description
    "Public Netlab topology root. Runtime uses unprefixed JSON members matching
     this module's data nodes (xYang hybrid encoding).

     Schema coverage mirrors Netlab defaults/attributes.yml for core topology
     objects; transform-control lists (link_no_propagate, pool_no_copy, …)
     stay in YAML and are applied by the JS pipeline.";

  revision 2026-07-16 {
    description
      "Factor shared interface/neighbor/addressing leaves into groupings.";
  }

  grouping mtu {
    leaf mtu {
      type uint16 {
        range "64..9216";
      }
    }
  }

  grouping ipv4-ipv6 {
    description "Address leaves typed as Netlab prefixes (or boolean unnumbered).";
    leaf ipv4 {
      type ntype:ipv4-prefix;
    }
    leaf ipv6 {
      type ntype:ipv6-prefix;
    }
  }

  grouping neighbor-body {
    description "Neighbor ifname and addresses (key leaf node supplied by caller).";
    leaf ifname {
      type string;
    }
    uses ipv4-ipv6;
  }

  grouping neighbor {
    description "Neighbor attachment with a string node key.";
    leaf node {
      type string;
    }
    uses neighbor-body;
  }

  grouping if-identity {
    description "Interface index and name.";
    leaf ifindex {
      type uint32;
    }
    leaf ifname {
      type string;
    }
  }

  container topology {
    leaf stage {
      type ntype:stage-name;
      description "Set by the orchestrator immediately before each validate() call.";
    }

    leaf name {
      type string;
    }

    leaf provider {
      type ntype:provider-name;
      default clab;
    }

    leaf-list module {
      type string;
    }

    container defaults {
      leaf device {
        type ntype:device-name;
      }
    }

    list nodes {
      key "name";
      leaf name {
        type ntype:node-id-ref;
      }
      leaf device {
        type ntype:device-name;
      }
      leaf provider {
        type ntype:provider-name;
        description "Per-node provider override (e.g. from groups).";
      }
      leaf id {
        type uint32 {
          range "1..150";
        }
      }
      leaf role {
        type ntype:node-role;
      }
      leaf-list module {
        type string;
      }
      leaf box {
        type string;
      }
      leaf router_id {
        type string;
        description "IPv4 router id (attributes.yml use: id).";
      }
      uses mtu;
      leaf unmanaged {
        type boolean;
      }
      leaf memory {
        type uint32;
      }
      leaf cpu {
        type string;
      }
      leaf-list skip_config {
        type string;
      }
      leaf-list group {
        type string;
      }
      anydata config {
        description "Inline config templates (list or dict; files plugin).";
      }
      leaf _daemon {
        type boolean;
      }
      leaf _daemon_parent {
        type string;
      }
      container mgmt {
        leaf ipv4 {
          type string;
        }
        leaf ipv6 {
          type string;
        }
        leaf mac {
          type string;
        }
        leaf ifname {
          type string;
        }
      }
      container loopback {
        uses if-identity;
        leaf type {
          type string;
        }
        uses ipv4-ipv6;
        leaf pool {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          uses neighbor;
        }
      }
      uses ntype:af-flags;
      list interfaces {
        key "ifindex";
        uses if-identity;
        uses ipv4-ipv6;
        leaf linkindex {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf role {
          type string;
        }
        leaf pool {
          type string;
          description "Address pool name copied from the parent link.";
        }
        leaf bridge {
          type string;
        }
        leaf name {
          type string;
        }
        uses mtu;
        leaf vrf {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          leaf node {
            type leafref {
              path "/topology/nodes/name";
            }
          }
          uses neighbor-body;
        }
      }
      must "/topology/stage = 'user_input' or /topology/stage = 'normalized' or id" {
        error-message "node id is required from addressed stage onward";
        error-app-tag "MISSING";
      }
    }

    list links {
      key "linkindex";
      leaf linkindex {
        type uint32;
      }
      leaf _linkname {
        type string;
        description
          "Internal diagnostic name. Runtime stores netlab-internal:_linkname;
           the validate adapter maps that qualified member onto this leaf.";
      }
      must "/topology/stage = 'user_input' or _linkname" {
        error-message "netlab-internal:_linkname is required after user_input stage";
        error-app-tag "MISSING";
      }
      leaf type {
        type ntype:link-type;
      }
      leaf bridge {
        type string;
      }
      leaf name {
        type string;
      }
      leaf role {
        type string;
      }
      leaf pool {
        type string;
      }
      leaf node_count {
        type uint32;
        description "Number of attachment points on the link (set during transform).";
      }
      leaf disable {
        type boolean;
      }
      leaf shutdown {
        type boolean;
      }
      leaf unnumbered {
        type boolean;
      }
      leaf vlan_name {
        type string;
      }
      leaf parentindex {
        type uint32;
      }
      leaf bandwidth {
        type uint64;
      }
      uses mtu;
      container prefix {
        uses ipv4-ipv6;
        leaf allocation {
          type ntype:allocation-mode;
        }
      }
      list interfaces {
        key "node";
        leaf node {
          type leafref {
            path "/topology/nodes/name";
          }
        }
        uses ipv4-ipv6;
        uses if-identity;
      }
      must "/topology/stage = 'user_input' or linkindex" {
        error-message "linkindex is required after user_input stage";
        error-app-tag "MISSING";
      }
    }

    container addressing {
      list pool {
        key "name";
        leaf name {
          type string;
        }
        uses ipv4-ipv6;
        leaf prefix {
          type uint8 {
            range "1..32";
          }
        }
        leaf prefix6 {
          type uint8 {
            range "1..128";
          }
        }
        leaf start {
          type uint32;
        }
        leaf allocation {
          type ntype:allocation-mode;
        }
        leaf mac {
          type string;
        }
        leaf unnumbered {
          type boolean;
        }
      }
    }

    list groups {
      key "name";
      leaf name {
        type string;
      }
      leaf-list members {
        type string;
      }
      leaf device {
        type ntype:device-name;
      }
      leaf provider {
        type ntype:provider-name;
      }
      leaf-list module {
        type string;
      }
      leaf-list config {
        type string;
      }
      anydata vars {
        description "Group Ansible vars.";
      }
      anydata node_data {
        description "Data copied onto group member nodes.";
      }
      leaf _auto_create {
        type boolean;
      }
    }
  }
}
`,"yang/netlab-topology.yang":`module netlab-topology {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:topology";
  prefix nt;

  import netlab-types {
    prefix ntype;
  }

  organization "Exergy Connect";
  description
    "Public Netlab topology root. Runtime uses unprefixed JSON members matching
     this module's data nodes (xYang hybrid encoding).

     Schema coverage mirrors Netlab defaults/attributes.yml for core topology
     objects; transform-control lists (link_no_propagate, pool_no_copy, …)
     stay in YAML and are applied by the JS pipeline.";

  revision 2026-07-16 {
    description
      "Factor shared interface/neighbor/addressing leaves into groupings.";
  }

  grouping mtu {
    leaf mtu {
      type uint16 {
        range "64..9216";
      }
    }
  }

  grouping ipv4-ipv6 {
    description "Address leaves typed as Netlab prefixes (or boolean unnumbered).";
    leaf ipv4 {
      type ntype:ipv4-prefix;
    }
    leaf ipv6 {
      type ntype:ipv6-prefix;
    }
  }

  grouping neighbor-body {
    description "Neighbor ifname and addresses (key leaf node supplied by caller).";
    leaf ifname {
      type string;
    }
    uses ipv4-ipv6;
  }

  grouping neighbor {
    description "Neighbor attachment with a string node key.";
    leaf node {
      type string;
    }
    uses neighbor-body;
  }

  grouping if-identity {
    description "Interface index and name.";
    leaf ifindex {
      type uint32;
    }
    leaf ifname {
      type string;
    }
  }

  container topology {
    leaf stage {
      type ntype:stage-name;
      description "Set by the orchestrator immediately before each validate() call.";
    }

    leaf name {
      type string;
    }

    leaf provider {
      type ntype:provider-name;
      default clab;
    }

    leaf-list module {
      type string;
    }

    container defaults {
      leaf device {
        type ntype:device-name;
      }
    }

    list nodes {
      key "name";
      leaf name {
        type ntype:node-id-ref;
      }
      leaf device {
        type ntype:device-name;
      }
      leaf provider {
        type ntype:provider-name;
        description "Per-node provider override (e.g. from groups).";
      }
      leaf id {
        type uint32 {
          range "1..150";
        }
      }
      leaf role {
        type ntype:node-role;
      }
      leaf-list module {
        type string;
      }
      leaf box {
        type string;
      }
      leaf router_id {
        type string;
        description "IPv4 router id (attributes.yml use: id).";
      }
      uses mtu;
      leaf unmanaged {
        type boolean;
      }
      leaf memory {
        type uint32;
      }
      leaf cpu {
        type string;
      }
      leaf-list skip_config {
        type string;
      }
      leaf-list group {
        type string;
      }
      anydata config {
        description "Inline config templates (list or dict; files plugin).";
      }
      leaf _daemon {
        type boolean;
      }
      leaf _daemon_parent {
        type string;
      }
      container mgmt {
        leaf ipv4 {
          type string;
        }
        leaf ipv6 {
          type string;
        }
        leaf mac {
          type string;
        }
        leaf ifname {
          type string;
        }
      }
      container loopback {
        uses if-identity;
        leaf type {
          type string;
        }
        uses ipv4-ipv6;
        leaf pool {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          uses neighbor;
        }
      }
      uses ntype:af-flags;
      list interfaces {
        key "ifindex";
        uses if-identity;
        uses ipv4-ipv6;
        leaf linkindex {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf role {
          type string;
        }
        leaf pool {
          type string;
          description "Address pool name copied from the parent link.";
        }
        leaf bridge {
          type string;
        }
        leaf name {
          type string;
        }
        uses mtu;
        leaf vrf {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          leaf node {
            type leafref {
              path "/topology/nodes/name";
            }
          }
          uses neighbor-body;
        }
      }
      must "/topology/stage = 'user_input' or /topology/stage = 'normalized' or id" {
        error-message "node id is required from addressed stage onward";
        error-app-tag "MISSING";
      }
    }

    list links {
      key "linkindex";
      leaf linkindex {
        type uint32;
      }
      leaf _linkname {
        type string;
        description
          "Internal diagnostic name. Runtime stores netlab-internal:_linkname;
           the validate adapter maps that qualified member onto this leaf.";
      }
      must "/topology/stage = 'user_input' or _linkname" {
        error-message "netlab-internal:_linkname is required after user_input stage";
        error-app-tag "MISSING";
      }
      leaf type {
        type ntype:link-type;
      }
      leaf bridge {
        type string;
      }
      leaf name {
        type string;
      }
      leaf role {
        type string;
      }
      leaf pool {
        type string;
      }
      leaf node_count {
        type uint32;
        description "Number of attachment points on the link (set during transform).";
      }
      leaf disable {
        type boolean;
      }
      leaf shutdown {
        type boolean;
      }
      leaf unnumbered {
        type boolean;
      }
      leaf vlan_name {
        type string;
      }
      leaf parentindex {
        type uint32;
      }
      leaf bandwidth {
        type uint64;
      }
      uses mtu;
      container prefix {
        uses ipv4-ipv6;
        leaf allocation {
          type ntype:allocation-mode;
        }
      }
      list interfaces {
        key "node";
        leaf node {
          type leafref {
            path "/topology/nodes/name";
          }
        }
        uses ipv4-ipv6;
        uses if-identity;
      }
      must "/topology/stage = 'user_input' or linkindex" {
        error-message "linkindex is required after user_input stage";
        error-app-tag "MISSING";
      }
    }

    container addressing {
      list pool {
        key "name";
        leaf name {
          type string;
        }
        uses ipv4-ipv6;
        leaf prefix {
          type uint8 {
            range "1..32";
          }
        }
        leaf prefix6 {
          type uint8 {
            range "1..128";
          }
        }
        leaf start {
          type uint32;
        }
        leaf allocation {
          type ntype:allocation-mode;
        }
        leaf mac {
          type string;
        }
        leaf unnumbered {
          type boolean;
        }
      }
    }

    list groups {
      key "name";
      leaf name {
        type string;
      }
      leaf-list members {
        type string;
      }
      leaf device {
        type ntype:device-name;
      }
      leaf provider {
        type ntype:provider-name;
      }
      leaf-list module {
        type string;
      }
      leaf-list config {
        type string;
      }
      anydata vars {
        description "Group Ansible vars.";
      }
      anydata node_data {
        description "Data copied onto group member nodes.";
      }
      leaf _auto_create {
        type boolean;
      }
    }
  }
}
`,"/yang/netlab-types.yang":`module netlab-types {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:types";
  prefix ntype;

  organization "Exergy Connect";
  description "Shared typedefs and identities for the Netlab data model.";

  revision 2026-07-16 {
    description
      "Add af-flags grouping; device-name remains an open id string.";
  }

  grouping af-flags {
    description "Per-AF boolean enable flags (shared by topology and modules).";
    container af {
      leaf ipv4 {
        type boolean;
      }
      leaf ipv6 {
        type boolean;
      }
    }
  }

  typedef stage-name {
    type enumeration {
      enum user_input;
      enum normalized;
      enum addressed;
      enum transformed;
    }
    description "Pipeline validation stage.";
  }

  typedef device-name {
    type string {
      length "1..32";
      pattern '[A-Za-z]([-_.A-Za-z0-9]*[A-Za-z0-9])?';
    }
    description
      "Device identity string. Runtime supports a subset (none, linux, frr,
       bird, iosv) and remaps others with a warning; YANG accepts any valid id
       so lab topologies using other Netlab platforms still validate.";
  }

  typedef provider-name {
    type enumeration {
      enum clab;
    }
    description "Supported virtualization provider (clab only).";
  }

  typedef node-role {
    type enumeration {
      enum router;
      enum host;
      enum bridge;
      enum gateway;
    }
  }

  typedef link-type {
    type enumeration {
      enum p2p;
      enum lan;
      enum stub;
      enum loopback;
      enum lag;
      enum tunnel;
      enum vlan_member;
    }
  }

  typedef ipv4-prefix {
    type union {
      type string {
        pattern '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}'
             +  '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
             +  '/(([0-9])|([1-2][0-9])|(3[0-2]))'
             +  '|true|false';
      }
      type boolean;
    }
    description "IPv4 prefix, address/prefix, or boolean unnumbered marker.";
  }

  typedef ipv6-prefix {
    type union {
      type string;
      type boolean;
    }
    description "IPv6 prefix or boolean unnumbered marker (validated loosely).";
  }

  typedef node-id-ref {
    type string {
      length "1..32";
      pattern '[A-Za-z]([-_.A-Za-z0-9]*[A-Za-z0-9])?';
    }
  }

  typedef allocation-mode {
    type enumeration {
      enum p2p;
      enum sequential;
      enum id_based;
    }
  }
}
`,"yang/netlab-types.yang":`module netlab-types {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:types";
  prefix ntype;

  organization "Exergy Connect";
  description "Shared typedefs and identities for the Netlab data model.";

  revision 2026-07-16 {
    description
      "Add af-flags grouping; device-name remains an open id string.";
  }

  grouping af-flags {
    description "Per-AF boolean enable flags (shared by topology and modules).";
    container af {
      leaf ipv4 {
        type boolean;
      }
      leaf ipv6 {
        type boolean;
      }
    }
  }

  typedef stage-name {
    type enumeration {
      enum user_input;
      enum normalized;
      enum addressed;
      enum transformed;
    }
    description "Pipeline validation stage.";
  }

  typedef device-name {
    type string {
      length "1..32";
      pattern '[A-Za-z]([-_.A-Za-z0-9]*[A-Za-z0-9])?';
    }
    description
      "Device identity string. Runtime supports a subset (none, linux, frr,
       bird, iosv) and remaps others with a warning; YANG accepts any valid id
       so lab topologies using other Netlab platforms still validate.";
  }

  typedef provider-name {
    type enumeration {
      enum clab;
    }
    description "Supported virtualization provider (clab only).";
  }

  typedef node-role {
    type enumeration {
      enum router;
      enum host;
      enum bridge;
      enum gateway;
    }
  }

  typedef link-type {
    type enumeration {
      enum p2p;
      enum lan;
      enum stub;
      enum loopback;
      enum lag;
      enum tunnel;
      enum vlan_member;
    }
  }

  typedef ipv4-prefix {
    type union {
      type string {
        pattern '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}'
             +  '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
             +  '/(([0-9])|([1-2][0-9])|(3[0-2]))'
             +  '|true|false';
      }
      type boolean;
    }
    description "IPv4 prefix, address/prefix, or boolean unnumbered marker.";
  }

  typedef ipv6-prefix {
    type union {
      type string;
      type boolean;
    }
    description "IPv6 prefix or boolean unnumbered marker (validated loosely).";
  }

  typedef node-id-ref {
    type string {
      length "1..32";
      pattern '[A-Za-z]([-_.A-Za-z0-9]*[A-Za-z0-9])?';
    }
  }

  typedef allocation-mode {
    type enumeration {
      enum p2p;
      enum sequential;
      enum id_based;
    }
  }
}
`}));function Hi(e){return e.replace(/\\/g,`/`).replace(/\/+/g,`/`)}function Ui(e){let t=Hi(e);if(!t||t===`/`)return!1;let n=t.startsWith(`/`)?t.slice(1):t;return n.length>0&&!n.includes(`/`)}function Wi(e){let t=Hi(e);if(M.has(t))return M.get(t);if(t.startsWith(`/`)){let e=t.slice(1);if(M.has(e))return M.get(e)}else if(M.has(`/${t}`))return M.get(`/${t}`);if(Ui(t)){let e=t.replace(/^\//,``);for(let[t,n]of M)if(t.endsWith(`/${e}`)||t===e)return n}}function Gi(e,t){let n=Wi(e);if(n===void 0){let t=Error(`ENOENT: no such file or directory, open '${e}' (yang files: ${[...M.keys()].join(`, `)})`);throw t.code=`ENOENT`,t}return n}function Ki(e){return Wi(e)!==void 0}function qi(e){let t=Hi(e).replace(/\/$/,``),n=new Set;for(let e of M.keys()){let r=Hi(e),i;r.startsWith(t+`/`)?i=r.slice(t.length+1):(t===`/yang`||t===`yang`)&&r.startsWith(`/yang/`)&&(i=r.slice(6)),i&&n.add(i.split(`/`)[0])}return[...n]}function Ji(e){return e.prefix?`${e.prefix}:${e.name}`:e.name}function Yi(e){let t=e.indexOf(`:`);return t<=0||t>=e.length-1?{name:e}:{prefix:e.slice(0,t),name:e.slice(t+1)}}function Xi(e){let t=e.replace(/^["']|["']$/g,``);if(!t.startsWith(`/`))throw Error(`Schema path must be absolute, got '${e}'`);let n=t.slice(1).split(`/`).map(e=>e.trim()).filter(e=>e.length>0);if(n.length===0)throw Error(`Empty schema path: '${e}'`);return n.map(e=>{let t=Yi(e);if(!t.prefix)throw Error(`Invalid schema path segment '${e}': expected 'prefix:identifier'`);return t})}function Zi(e){if(typeof e==`string`&&e.length>0)return Yi(e);if(e&&typeof e==`object`&&!Array.isArray(e)){let t=e;if(typeof t.name==`string`&&t.name.length>0)return typeof t.prefix==`string`&&t.prefix.length>0?{prefix:t.prefix,name:t.name}:{name:t.name}}}function Qi(e){if(e&&typeof e==`object`)return new $i(e)}var $i=class e{data;constructor(e){this.data=e}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(t=>new e(t))}findStatement(e){return this.statements.find(t=>t.name===e)}},ea=class{data;source;constructor(e,t){this.data=e,this.source=t}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){let e=this.data.organization;return typeof e==`string`&&e.length>0?e:void 0}get contact(){let e=this.data.contact;return typeof e==`string`&&e.length>0?e:void 0}get description(){let e=this.data.description;return typeof e==`string`?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){let e=this.data.identities;return!e||typeof e!=`object`?{}:e}get statements(){let e=this.data.statements;return Array.isArray(e)?e.map(Qi).filter(e=>!!e):[]}findStatement(e){return this.statements.find(t=>t.name===e)}};function ta(e,t){let n=Object.keys(e).filter(e=>!t.has(e)).sort();if(n.length>0)throw TypeError(`unexpected keyword arguments: ${JSON.stringify(n)}`)}function na(e){ta(e,new Set([`modules`,`mode`]));let t=e.mode===void 0?`complete`:e.mode,n=new Set;for(let t=0;t<e.modules.length;t+=1){let r=e.modules[t].name;if(!r)throw TypeError(`modules[${t}] must have a module name`);if(n.has(r))throw TypeError(`duplicate module name '${r}' in modules`);n.add(r)}return{modules:[...e.modules],mode:t}}var ra=`module`,ia=`yang-version`,aa=`namespace`,oa=`prefix`,sa=`organization`,ca=`contact`,la=`description`,ua=`revision`,da=`typedef`,fa=`identity`,pa=`base`,ma=`type`,ha=`enumeration`,ga=`path`,_a=`require-instance`,va=`enum`,ya=`status`,ba=`bit`,xa=`position`,Sa=`pattern`,Ca=`modifier`,wa=`length`,Ta=`fraction-digits`,Ea=`range`,Da=`grouping`,Oa=`uses`,ka=`refine`,N=`container`,P=`list`,F=`leaf`,I=`leaf-list`,L=`anydata`,R=`anyxml`,z=`choice`,Aa=`case`,ja=`must`,B=`when`,Ma=`presence`,Na=`key`,Pa=`min-elements`,Fa=`max-elements`,Ia=`ordered-by`,La=`mandatory`,Ra=`config`,za=`default`,Ba=`error-message`,Va=`error-app-tag`,V=`true`,H=`false`,Ha=`import`,Ua=`include`,Wa=`revision-date`,Ga=`feature`,U=`if-feature`,Ka=`augment`,qa=`submodule`,Ja=`belongs-to`,Ya=`reference`,Xa=`argument`,Za=`yin-element`,Qa=`deviation`,$a=`extension`,eo=`rpc`,to=`action`,no=`notification`,ro=`input`,io=`output`,ao=[`<=`,`>=`,`!=`,`==`,`//`,`=`,`<`,`>`,`+`,`-`,`*`,`/`];function oo(e){let t=[],n=0,r=(e,r,i=n)=>{t.push({kind:e,value:r,position:i})};for(;n<e.length;){let t=e[n];if(/\s/.test(t)){n+=1;continue}if(t===`"`||t===`'`){let i=t,a=n;n+=1;let o=``;for(;n<e.length;){let t=e[n];if(t===i&&e[n-1]!==`\\`){n+=1;break}o+=t,n+=1}r(`string`,o,a);continue}if(/\d/.test(t)||t===`-`&&/\d/.test(e[n+1]??``)){let t=n,i=``;for(e[n]===`-`&&(i+=`-`,n+=1);n<e.length&&/\d/.test(e[n]);)i+=e[n],n+=1;if(e[n]===`.`&&/\d/.test(e[n+1]??``))for(i+=`.`,n+=1;n<e.length&&/\d/.test(e[n]);)i+=e[n],n+=1;r(`number`,i,t);continue}if(/[A-Za-z_]/.test(t)){let t=n,i=``;for(;n<e.length&&/[A-Za-z0-9_:\-]/.test(e[n]);)i+=e[n],n+=1;r(`identifier`,i,t);continue}if(t===`/`){e[n+1]===`/`?(r(`operator`,`//`),n+=2):(r(`slash`,`/`),n+=1);continue}if(t===`.`){e[n+1]===`.`?(r(`dotdot`,`..`),n+=2):(r(`dot`,`.`),n+=1);continue}if(t===`(`){r(`paren_open`,`(`),n+=1;continue}if(t===`)`){r(`paren_close`,`)`),n+=1;continue}if(t===`[`){r(`bracket_open`,`[`),n+=1;continue}if(t===`]`){r(`bracket_close`,`]`),n+=1;continue}if(t===`,`){r(`comma`,`,`),n+=1;continue}let i=e.slice(n),a=ao.find(e=>i.startsWith(e));a?(r(`operator`,a),n+=a.length):n+=1}return r(`eof`,``,n),t}var so=new Set([`=`,`!=`,`<`,`>`,`<=`,`>=`]),co=new Set([`+`,`-`]),lo=class{constructor(e){this.expression=e,this.tokens=oo(e)}expression;tokens;position=0;parse(){if(this.current().kind===`eof`)throw new j(`Empty expression`,{expression:this.expression,position:0});let e=this.parseExpression(),t=this.current();if(t.kind!==`eof`)throw new j(`Unexpected token: ${t.value||t.kind}`,{expression:this.expression,position:t.position});return e}current(){return this.tokens[this.position]??{kind:`eof`,value:``,position:this.expression.length}}consume(e){let t=this.current();if(e&&t.kind!==e)throw new j(`Expected ${e}, got ${t.kind} (${t.value})`,{expression:this.expression,position:t.position});return this.position+=1,t}isKeyword(e){let t=this.current();return t.kind===`identifier`&&t.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword(`or`);){this.consume();let t=this.parseLogicalAnd();e={kind:`binary`,operator:`or`,left:e,right:t}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword(`and`);){this.consume();let t=this.parseComparison();e={kind:`binary`,operator:`and`,left:e,right:t}}return e}parseComparison(){let e=this.parseAdditive(),t=this.current();if(t.kind===`operator`&&so.has(t.value)){let t=this.consume(`operator`).value,n=this.parseAdditive();e={kind:`binary`,operator:t,left:e,right:n}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){let t=this.current();if(t.kind===`operator`&&co.has(t.value)){let t=this.consume(`operator`).value,n=this.parseMultiplicative();e={kind:`binary`,operator:t,left:e,right:n}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){let t=this.current();if(t.kind===`slash`){this.consume(`slash`);let t=this.parsePath(!1);e={kind:`binary`,operator:`/`,left:e,right:t}}else if(t.kind===`operator`&&t.value===`*`){this.consume(`operator`);let t=this.parseUnary();e={kind:`binary`,operator:`*`,left:e,right:t}}else return e}}parseUnary(){let e=this.current();if(e.kind===`operator`&&e.value===`-`)return this.consume(`operator`),{kind:`binary`,operator:`-`,left:{kind:`literal`,value:0},right:this.parseUnary()};if(e.kind===`operator`&&e.value===`+`)return this.consume(`operator`),this.parseUnary();if(this.isKeyword(`not`)){this.consume(),this.consume(`paren_open`);let e=this.parseExpression();return this.consume(`paren_close`),{kind:`function`,name:`not`,args:[e]}}return this.parsePrimary()}parsePrimary(){let e=this.current();if(e.kind===`string`)return{kind:`literal`,value:this.consume(`string`).value};if(e.kind===`number`){let t=this.consume(`number`).value,n=t.includes(`.`)?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(n))throw new j(`Invalid number: ${t}`,{expression:this.expression,position:e.position});return{kind:`literal`,value:n}}if(e.kind===`identifier`)return this.isKeyword(`true`)?(this.consume(),this.current().kind===`paren_open`&&(this.consume(`paren_open`),this.consume(`paren_close`)),{kind:`literal`,value:!0}):this.isKeyword(`false`)?(this.consume(),this.current().kind===`paren_open`&&(this.consume(`paren_open`),this.consume(`paren_close`)),{kind:`literal`,value:!1}):this.tokens[this.position+1]?.kind===`paren_open`?this.parseFunctionCall():this.parsePath(!1);if(e.kind===`dot`)return this.consume(`dot`),this.current().kind===`paren_open`?(this.consume(`paren_open`),this.consume(`paren_close`),{kind:`function`,name:`current`,args:[]}):this.parsePath(!1,`.`);if(e.kind===`dotdot`)return this.parsePath(!1);if(e.kind===`slash`)return this.consume(`slash`),this.parsePath(!0);if(e.kind===`paren_open`){if(this.consume(`paren_open`),this.current().kind===`string`||this.current().kind===`number`){let e=this.parsePrimary();if(e.kind===`literal`&&this.current().kind===`comma`){let t=[e.value];for(;this.current().kind===`comma`;){this.consume(`comma`);let e=this.parsePrimary();if(e.kind!==`literal`)throw new j(`Value list may only contain literals`,{expression:this.expression,position:this.current().position});t.push(e.value)}return this.consume(`paren_close`),{kind:`literal`,value:t}}if(this.current().kind===`paren_close`)return this.consume(`paren_close`),e}let e=this.parseExpression();return this.consume(`paren_close`),e}throw new j(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){let e=this.consume(`identifier`).value;this.consume(`paren_open`);let t=[];if(this.current().kind!==`paren_close`)for(t.push(this.parseExpression());this.current().kind===`comma`;)this.consume(`comma`),t.push(this.parseExpression());return this.consume(`paren_close`),{kind:`function`,name:e,args:t}}parsePath(e,t,n=!0){let r=[],i=e=>{let t={step:e};for(r.push(t);this.current().kind===`bracket_open`;){if(!n)throw new j(`Predicates are not allowed in this path context`,{expression:this.expression,position:this.current().position});this.consume(`bracket_open`);let e=this.parseExpression();t.predicate=t.predicate===void 0?e:{kind:`binary`,operator:`and`,left:t.predicate,right:e},this.consume(`bracket_close`)}return this.current().kind===`slash`&&(this.consume(`slash`),!0)};for(t!==void 0&&i(t);this.current().kind===`dot`||this.current().kind===`dotdot`||this.current().kind===`identifier`;){let e=this.consume().value;if(!i(e))break}return{kind:`path`,segments:r,isAbsolute:e}}parsePathExpression(e={}){let t=e.allowPredicate??!0;if(this.current().kind===`eof`)throw new j(`Empty path expression`,{expression:this.expression,position:0});let n=!1;this.current().kind===`slash`&&(n=!0,this.consume(`slash`));let r=this.parsePath(n,void 0,t),i=this.current();if(i.kind!==`eof`)throw new j(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function uo(e){return new lo(e).parse()}function fo(e,t={}){return new lo(e).parsePathExpression(t)}var po=class{statements;constructor(e=[]){this.statements=e}find_statement(e){return this.statements.find(t=>t.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){let e=[];for(let t of this.statements)e.push(...this.collectLeaves(t));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof Do)return[e];if(e instanceof xo||e instanceof Eo){let t=[];for(let n of e.statements)t.push(...this.collectLeaves(n));return t}return[]}},mo=class extends po{keyword;name;description;reference;constructor(e={}){super(e.statements??[]),this.keyword=e.keyword??``,this.name=e.name??``,this.description=e.description??``,this.reference=e.reference??``}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(e){return this.name?new Set([this.name]):new Set}childNames(e){return this.child_names(e)}},ho=class extends mo{must_statements;constructor(e={}){super(e),this.must_statements=e.must_statements??[]}},W=class extends mo{when;if_features;config;constructor(e={}){super(e),this.when=e.when,this.if_features=e.if_features??[],this.config=e.config}get_schema_node(){return this.name||void 0}},go=class extends mo{type;default;constructor(e={}){super(e),this.keyword=`typedef`,this.type=e.type,this.default=e.default}get_schema_node(){return this.name||void 0}},_o=class extends mo{bases;if_features;constructor(e={}){super(e),this.keyword=`identity`,this.bases=e.bases??[],this.if_features=e.if_features??[]}get_schema_node(){}},vo=class{name;position;constructor(e={}){this.name=e.name??``,this.position=e.position}},yo=class{pattern;invert_match;error_message;error_app_tag;constructor(e={}){this.pattern=e.pattern??``,this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},bo=class{name;prefix;patterns;length;range;fraction_digits;enums;bits;types;path;require_instance;identityref_bases;constructor(e={}){this.name=e.name??``,this.prefix=e.prefix,this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},xo=class extends W{must_statements;presence;constructor(e={}){super(e),this.keyword=`container`,this.must_statements=e.must_statements??[],this.presence=e.presence}},So=class extends xo{constructor(e={}){super(e),this.keyword=`notification`}},Co=class extends xo{constructor(e={}){super({name:`input`,...e}),this.keyword=`input`}},wo=class extends xo{constructor(e={}){super({name:`output`,...e}),this.keyword=`output`}},To=class extends W{must_statements;constructor(e={}){super(e),this.keyword=`rpc`,this.must_statements=e.must_statements??[]}},Eo=class extends W{must_statements;key;min_elements;max_elements;constructor(e={}){super(e),this.keyword=`list`,this.must_statements=e.must_statements??[],this.key=e.key,this.min_elements=e.min_elements,this.max_elements=e.max_elements}},Do=class extends W{must_statements;type;mandatory;default;constructor(e={}){super(e),this.keyword=`leaf`,this.must_statements=e.must_statements??[],this.type=e.type,this.mandatory=e.mandatory??!1,this.default=e.default}},Oo=class extends W{must_statements;type;min_elements;max_elements;defaults;constructor(e={}){super(e),this.keyword=`leaf-list`,this.must_statements=e.must_statements??[],this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.defaults=e.defaults??[]}},ko=class extends W{must_statements;mandatory;constructor(e={}){super(e),this.keyword=`anydata`,this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},Ao=class extends W{must_statements;mandatory;constructor(e={}){super(e),this.keyword=`anyxml`,this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},jo=class extends mo{argument_name;argument_yin_element;apply_callback;constructor(e={}){super(e),this.keyword=`extension`,this.argument_name=e.argument_name??``,this.argument_yin_element=e.argument_yin_element,this.apply_callback=e.apply_callback}apply(e,t){return this.apply_callback?this.apply_callback(e,t.context_module):e}get_schema_node(){}},Mo=class extends W{must_statements;prefix;resolved_module;resolved_extension;argument;constructor(e){if(super(e),this.keyword=`extension-invocation`,this.must_statements=e.must_statements??[],this.prefix=e.prefix,this.resolved_module=e.resolved_module,this.resolved_extension=e.resolved_extension,this.argument=e.argument,!this.prefix)throw Error(`extension invocation requires a non-empty prefix`);if(!this.resolved_module)throw Error(`extension invocation requires resolved_module`);if(!this.resolved_extension)throw Error(`extension invocation requires resolved_extension`)}get_schema_node(){}},No=class{expression;description;ast;constructor(e){this.expression=e.expression,this.description=e.description??``,this.expression&&(this.ast=uo(this.expression))}},Po=class extends No{error_message;constructor(e){super(e),this.error_message=e.error_message??``}},Fo=class extends No{evaluate_with_parent_context;constructor(e){super(e),this.evaluate_with_parent_context=e.evaluate_with_parent_context??!1}get condition(){return this.expression}},Io=class extends mo{constructor(e={}){super(e),this.keyword=`grouping`}},Lo=class extends W{grouping_name;grouping_prefix;refines;augmentations;constructor(e={}){super(e),this.keyword=`uses`,this.grouping_name=e.grouping_name??``,this.grouping_prefix=e.grouping_prefix,this.refines=e.refines??[],this.augmentations=e.augmentations??[]}grouping_qname(){return this.grouping_prefix?`${this.grouping_prefix}:${this.grouping_name}`:this.grouping_name}get_schema_node(){}},Ro=class extends W{augment_path;augment_path_segments;constructor(e={}){super(e),this.keyword=`augment`,this.augment_path=e.augment_path??``,this.augment_path_segments=e.augment_path_segments??[]}get_schema_node(){}},zo=class extends ho{target_path;type;min_elements;max_elements;refined_defaults;refined_mandatory;refined_config;if_features;constructor(e={}){super(e),this.keyword=`refine`,this.target_path=e.target_path??``,this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.refined_defaults=e.refined_defaults??[],this.refined_mandatory=e.refined_mandatory,this.refined_config=e.refined_config,this.if_features=e.if_features??[]}},Bo=class extends W{mandatory;cases;constructor(e={}){super(e),this.keyword=`choice`,this.mandatory=e.mandatory??!1,this.cases=e.cases??[]}child_names(e){for(let t of this.cases)if(t.statements.some(t=>t.name&&t.name in e))return new Set(t.statements.map(e=>e.name).filter(e=>!!e));return new Set}validate_case_unique_child_names(){let e=new Map;for(let t of this.cases)for(let n of t.statements){let r=n.get_schema_node();if(r){if(e.has(r)){let n=e.get(r);throw new A(`Choice '${this.name}': schema node '${r}' appears in case '${n}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}e.set(r,t.name)}}}},Vo=class extends W{constructor(e={}){super(e),this.keyword=`case`}child_names(e){return new Set(this.statements.map(e=>e.name).filter(e=>!!e))}},Ho=class{constructor(e){this.parsers=e}parsers;parse_anydata(e,t){e.consume(L);let n=new ko({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}},Uo=class{constructor(e){this.parsers=e}parsers;parse_anyxml(e,t){e.consume(R);let n=new Ao({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}};function Wo(e,t){let n={...t};return n[la]??=(t,n)=>{e.parse_description(t,n)},n[Ya]??=(t,n)=>{e.parse_reference(t,n)},n[ya]??=(t,n)=>{e.parse_status_ignored(t,n)},n}function Go(e,t){let n=Wo(e,t);return n[Ra]??=(t,n)=>{e.parse_config(t,n)},n[ya]??=(t,n)=>{e.parse_status_ignored(t,n)},n}var Ko=class{constructor(e){this.parsers=e,this.augmentBodyDispatch=Go(this.parsers,{[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)},[Oa]:(e,t)=>{this.parsers.uses_parser.parse_uses(e,t)},[F]:(e,t)=>{this.parsers.leaf_parser.parse_leaf(e,t)},[I]:(e,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(e,t)},[N]:(e,t)=>{this.parsers.container_parser.parse_container(e,t)},[P]:(e,t)=>{this.parsers.list_parser.parse_list(e,t)},[z]:(e,t)=>{this.parsers.choice_parser.parse_choice(e,t)},[Aa]:(e,t)=>{this.parsers.choice_parser.parse_case(e,t)},[L]:(e,t)=>{this.parsers.anydata_parser.parse_anydata(e,t)},[R]:(e,t)=>{this.parsers.anyxml_parser.parse_anyxml(e,t)},[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[ja]:(e,t)=>{this.parsers.must_parser.parse_must(e,t)},[no]:(e,t)=>{this.parsers.notification_parser.parse_notification(e,t)}})}parsers;augmentBodyDispatch;parse_augment(e,t){e.consume(Ka);let n=this.parsers.parse_string_concatenation(e),r=[];if(n.replace(/^["']|["']$/g,``).startsWith(`/`))try{r=Xi(n)}catch(e){throw new k(e instanceof Error?e.message:String(e))}let i=new Ro({name:`augment`,augment_path:n,augment_path_segments:r});if(e.consume_if_type(`{`)){let n=t.push_parent(i);for(;e.has_more()&&e.peek_type()!==`}`;){let t=this.parsers.substatement_handler(e,this.augmentBodyDispatch);t?t(e,n):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,n):this.parsers.skip_unsupported_or_raise_unknown(e,`augment`)}e.consume_type(`}`)}let a=t.current_parent;return a instanceof Lo?a.augmentations.push(i):this.parsers.add_to_parent_or_module(t,i),e.consume_if_type(`;`),i}},qo=class{constructor(e){this.parsers=e}parsers;parse_type_bit(e,t,n){e.consume(ba);let r=e.consume(),i;if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)e.peek()===xa?(e.consume(xa),i=Number.parseInt(e.consume_type(`INTEGER`),10),e.consume_if_type(`;`)):this.parsers.parseStatement(e,t);e.consume_type(`}`)}n.bits.push(new vo({name:r,position:i})),e.consume_if_type(`;`)}finalize_bits_type(e){let t=-1;for(let n of e.bits)n.position===void 0&&(n.position=t+1),t=Math.max(t,n.position)}},Jo=new Set([F,I,N,P,L,R,z]),Yo=class{constructor(e){this.parsers=e,this.choiceSubstatementDispatch=Go(this.parsers,{[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)},[Aa]:(e,t)=>{this.parse_case(e,t)},[La]:(e,t)=>{this.parse_choice_mandatory(e,t)}}),this.caseSubstatementDispatch=Go(this.parsers,{[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)},[Oa]:(e,t)=>{this.parsers.uses_parser.parse_uses(e,t)},[F]:(e,t)=>{this.parsers.leaf_parser.parse_leaf(e,t)},[N]:(e,t)=>{this.parsers.container_parser.parse_container(e,t)},[P]:(e,t)=>{this.parsers.list_parser.parse_list(e,t)},[I]:(e,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(e,t)},[L]:(e,t)=>{this.parsers.anydata_parser.parse_anydata(e,t)},[R]:(e,t)=>{this.parsers.anyxml_parser.parse_anyxml(e,t)},[z]:(e,t)=>{this.parse_choice(e,t)}})}parsers;choiceSubstatementDispatch;caseSubstatementDispatch;parse_choice(e,t){e.consume(z);let n=e.consume(),r=new Bo({name:n});if(e.consume_if_type(`{`)){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parse_choice_substatement(e,i,n);e.consume_type(`}`),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}parse_choice_substatement(e,t,n){let r=`choice '${n}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,t);return}let a=this.parsers.dispatch_key(e);typeof a==`string`&&Jo.has(a)?this.parse_choice_implicit_case(e,t):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,t):this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,t){let n=t.current_parent;n instanceof Bo||e.syntaxError(`internal: implicit choice case outside choice body`);let r=new Vo({name:``}),i=t.push_parent(r),a=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);a||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),a(e,i),r.statements.length===0&&e.syntaxError(`Expected a schema node in implicit choice case (RFC 7950 §7.9.2)`);let o=r.statements[0],s=o.name||o.get_schema_node();s||e.syntaxError(`Implicit choice case requires a named schema node (RFC 7950 §7.9.2)`),r.name=s,n.cases.push(r)}parse_case(e,t){e.consume(Aa);let n=e.consume(),r=new Vo({name:n});if(e.consume_if_type(`{`)){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parse_case_substatement(e,i,n);e.consume_type(`}`)}let i=t.current_parent;return i instanceof Bo?i.cases.push(r):this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}parse_case_substatement(e,t,n){let r=`case '${n}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);i?i(e,t):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,t):this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,t){e.consume(La);let[,n]=e.consume_oneof([V,H]),r=t.current_parent;r instanceof Bo&&(r.mandatory=n===V),e.consume_if_type(`;`)}},Xo=class{constructor(e){this.parsers=e,this.containerSubstatementDispatch=Go(this.parsers,{[Ma]:(e,t)=>{this.parsers.parse_presence(e,t)},[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[ja]:(e,t)=>{this.parsers.must_parser.parse_must(e,t)},[F]:(e,t)=>{this.parsers.leaf_parser.parse_leaf(e,t)},[N]:(e,t)=>{this.parse_container(e,t)},[P]:(e,t)=>{this.parsers.list_parser.parse_list(e,t)},[I]:(e,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(e,t)},[Oa]:(e,t)=>{this.parsers.uses_parser.parse_uses(e,t)},[z]:(e,t)=>{this.parsers.choice_parser.parse_choice(e,t)},[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)},[L]:(e,t)=>{this.parsers.anydata_parser.parse_anydata(e,t)},[R]:(e,t)=>{this.parsers.anyxml_parser.parse_anyxml(e,t)},[no]:(e,t)=>{this.parsers.notification_parser.parse_notification(e,t)}})}parsers;containerSubstatementDispatch;parseContainerSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);r?r(e,t):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,t):this.parsers.skip_unsupported_or_raise_unknown(e,`container '${n}'`)}parse_container(e,t){e.consume(N);let n=e.consume(),r=new xo({name:n});if(e.consume_if_type(`{`)){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parseContainerSubstatement(e,i,n);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}},Zo=class{constructor(e){this.parsers=e}parsers;parse_extension_stmt(e,t){e.consume($a);let n=e.consume_type(`IDENTIFIER`),r=new jo({name:n});if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.dispatch_key(e)===Xa?this.parse_extension_argument_stmt(e,n):this.parsers.parseStatement(e,n);e.consume_type(`}`)}return t.module.extensions[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}parse_extension_argument_stmt(e,t){e.consume(Xa);let n=e.peek_type()===`STRING`?e.consume_type(`STRING`):e.consume_type(`IDENTIFIER`),r=t.current_parent;if(r instanceof jo&&(r.argument_name=n),e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)if(e.peek()===Za){e.consume(Za);let[,t]=e.consume_oneof([V,H]);r.argument_yin_element=t===V,e.consume_if_type(`;`)}else this.parsers.parseStatement(e,t);e.consume_type(`}`)}e.consume_if_type(`;`)}},Qo=class{constructor(e){this.parsers=e}parsers;parse_feature_stmt(e,t){e.consume(Ga);let n=e.consume_type(`IDENTIFIER`);(t.module.features??=new Set).add(n);let r={if_features:[]};if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,n);e.consume_type(`}`)}if(r.if_features.length>0){let e=t.module,i=e.feature_if_features??={};i[n]=[...r.if_features]}e.consume_if_type(`;`)}parse_if_feature_stmt(e,t){e.consume(U);let n=this.parsers.parse_string_concatenation(e),r=t.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(n),e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,t);e.consume_type(`}`)}e.consume_if_type(`;`)}},$o=class{constructor(e){this.parsers=e}parsers;parse_grouping(e,t){e.consume(Da);let n=e.consume(),r=new Io({name:n});if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,n);e.consume_type(`}`)}t.module.groupings[n]=r,e.consume_if_type(`;`)}},es=class{constructor(e){this.parsers=e}parsers;parse_identity(e,t){e.consume(fa);let n=e.consume_type(`IDENTIFIER`),r=new _o({name:n});if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)e.peek()===pa?this.parse_identity_base(e,n):this.parsers.parseStatement(e,n);e.consume_type(`}`)}t.module.identities[n]=r,e.consume_if_type(`;`)}parse_identity_base(e,t){e.consume(pa);let n=this.parsers.consume_identifier_ref(e),r=t.current_parent;r instanceof _o&&r.bases.push(n),e.consume_if_type(`;`)}},ts=class{constructor(e){this.parsers=e}parsers;parse_leaf(e,t){e.consume(F);let n=new Do({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}},ns=class{constructor(e){this.parsers=e}parsers;parse_leaf_list(e,t){e.consume(I);let n=new Oo({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}},rs=class{constructor(e){this.parsers=e}parsers;parse_list(e,t){e.consume(P);let n=new Eo({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}},is=class{constructor(e){this.parsers=e}parsers;parse_module(e,t){for(e.consume(ra),t.module.name=e.consume_type(`IDENTIFIER`),e.consume_type(`{`);e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,t);e.consume_type(`}`)}parse_yang_version(e,t){e.consume(ia);let[n]=e.consume_oneof([`IDENTIFIER`,`DOTTED_NUMBER`]);t.module.yang_version=n,e.consume_if_type(`;`)}parse_namespace(e,t){e.consume(aa),t.module.namespace=e.consume_type(`STRING`),e.consume_if_type(`;`)}parse_prefix(e,t){e.consume(oa);let n=this.parsers.dispatch_key(e);t.module.prefix=n===`STRING`?e.consume_type(`STRING`):e.consume_type(`IDENTIFIER`),e.consume_if_type(`;`)}parse_organization(e,t){e.consume(sa),t.module.organization=e.consume_type(`STRING`),e.consume_if_type(`;`)}parse_contact(e,t){e.consume(ca),t.module.contact=e.consume_type(`STRING`),e.consume_if_type(`;`)}parse_import_stmt(e,t){e.consume(Ha);let n=e.consume_type(`IDENTIFIER`),r,i;if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;){let t=this.parsers.dispatch_key(e);t===oa?(e.consume(oa),r=e.peek_type()===`STRING`?e.consume_type(`STRING`):e.consume_type(`IDENTIFIER`),e.consume_if_type(`;`)):t===Wa?i=this.parsers.revision_parser.parse_revision_date_statement(e):this.skip_nested_statement(e)}e.consume_type(`}`)}if(e.consume_if_type(`;`),!r||r.trim().length===0)throw new A(`Import '${n}' is missing required prefix substatement`);this.parsers.register_import(t,n,r,i,e)}parse_include_stmt(e,t){if(e.consume(Ua),e.consume_type(`IDENTIFIER`),e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,t);e.consume_type(`}`)}e.consume_if_type(`;`)}parse_prefix_value_stmt(e){e.consume(oa),e.peek_type()===`STRING`?e.consume_type(`STRING`):e.consume_type(`IDENTIFIER`),e.consume_if_type(`;`)}skip_nested_statement(e){let t=0;for(;e.has_more();){let n=this.parsers.dispatch_key(e);if(n===`{`)t+=1,e.consume_type(`{`);else if(n===`}`){if(t===0)return;--t,e.consume_type(`}`)}else{if(n===`;`&&t===0){e.consume_type(`;`);return}e.consume()}}}},as=class{constructor(e){this.parsers=e}parsers;parse_notification(e,t){e.consume(no);let n=new So({name:e.consume()});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,n),e.consume_if_type(`;`),n}},os=class{constructor(e){this.parsers=e,this.ioSubstatementDispatch=Wo(this.parsers,{[da]:(e,t)=>{this.parsers.typedef_parser.parse_typedef(e,t)},[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[ja]:(e,t)=>{this.parsers.must_parser.parse_must(e,t)},[F]:(e,t)=>{this.parsers.leaf_parser.parse_leaf(e,t)},[N]:(e,t)=>{this.parsers.container_parser.parse_container(e,t)},[P]:(e,t)=>{this.parsers.list_parser.parse_list(e,t)},[I]:(e,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(e,t)},[Oa]:(e,t)=>{this.parsers.uses_parser.parse_uses(e,t)},[z]:(e,t)=>{this.parsers.choice_parser.parse_choice(e,t)},[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)},[L]:(e,t)=>{this.parsers.anydata_parser.parse_anydata(e,t)},[R]:(e,t)=>{this.parsers.anyxml_parser.parse_anyxml(e,t)}}),this.rpcSubstatementDispatch=Wo(this.parsers,{[B]:(e,t)=>{this.parsers.when_parser.parse_when(e,t)},[ja]:(e,t)=>{this.parsers.must_parser.parse_must(e,t)},[ro]:(e,t)=>{this.parse_input(e,t)},[io]:(e,t)=>{this.parse_output(e,t)},[U]:(e,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(e,t)}})}parsers;ioSubstatementDispatch;rpcSubstatementDispatch;parseIoSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);r?r(e,t):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,t):this.parsers.skip_unsupported_or_raise_unknown(e,`${n} block`)}parseIoBlock(e,t,n,r){if(e.consume(n),e.consume_if_type(`{`)){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parseIoSubstatement(e,i,n);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}parse_input(e,t){return this.parseIoBlock(e,t,ro,new Co)}parse_output(e,t){return this.parseIoBlock(e,t,io,new wo)}parseRpcSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);r?r(e,t):e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`?this.parsers.parse_prefixed_extension_statement_public(e,t):this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${n}'`)}parse_rpc(e,t){e.consume(eo);let n=e.consume(),r=new To({name:n});if(e.consume_if_type(`{`)){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parseRpcSubstatement(e,i,n);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}},ss=class{constructor(e){this.parsers=e}parsers;parse_must(e,t){e.consume(ja);let n=new Po({expression:this.parsers.parse_string_concatenation(e)});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)e.peek()===Ba?this.parse_must_error_message(e,r):this.parsers.parseStatement(e,r);e.consume_type(`}`)}let r=t.current_parent;return Array.isArray(r?.must_statements)&&r.must_statements.push(n),e.consume_if_type(`;`),n}parse_must_error_message(e,t){e.consume(Ba);let n=t.current_parent;n instanceof Po&&(n.error_message=e.consume_type(`STRING`)),e.consume_if_type(`;`)}},cs=class{constructor(e){this.parsers=e}parsers;parse_refine(e,t){e.consume(ka);let n=[e.consume()];for(;e.has_more()&&e.peek_type()===`/`;)e.consume_type(`/`),n.push(e.consume());let r=new zo({name:`refine`,target_path:n.join(`/`)});if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,n);e.consume_type(`}`)}t.current_parent instanceof Lo&&t.current_parent.refines.push(r),e.consume_if_type(`;`)}},ls=class{constructor(e){this.parsers=e}parsers;parse_revision(e,t){e.consume(ua);let n=``;if(e.peek_type()===`STRING`)n=e.consume_type(`STRING`);else for(;e.has_more()&&![`{`,`;`].includes(e.peek_type());)n+=e.consume();let r={date:n,description:``,reference:``};if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)e.peek()===la?(e.consume(la),r.description=e.consume_type(`STRING`),e.consume_if_type(`;`)):e.peek()===Ya?(e.consume(Ya),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(`;`)):this.parsers.parseStatement(e,t);e.consume_type(`}`)}(t.module.revisions??=[]).push(r),e.consume_if_type(`;`)}parse_revision_date_statement(e){e.consume(Wa);let t=``;if(e.peek_type()===`STRING`)t=e.consume_type(`STRING`);else for(;e.has_more()&&e.peek_type()!==`;`;)t+=e.consume();return e.consume_if_type(`;`),t}},us=class{constructor(e,t){this.parsers=e,this.module_parser=t}parsers;module_parser;parse_submodule(e,t){for(e.consume(qa),t.module.name=e.consume_type(`IDENTIFIER`),e.consume_type(`{`);e.has_more()&&e.peek_type()!==`}`;)e.peek()===Ja?this.parse_belongs_to(e,t):this.parsers.parseStatement(e,t);e.consume_type(`}`)}parse_belongs_to(e,t){for(e.consume(Ja),t.module.belongs_to_module=e.consume_type(`IDENTIFIER`),e.consume_type(`{`);e.has_more()&&e.peek_type()!==`}`;)e.peek()===oa?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,t);e.consume_type(`}`),e.consume_if_type(`;`)}},ds=class{constructor(e){this.parsers=e}parsers;parse_type(e,t){e.consume(ma);let n,r;if(e.peek_type()===`IDENTIFIER`){let t=this.parsers.consume_identifier_ref(e);n=t.prefix,r=t.name}else r=e.consume().trim();let i=new bo({name:r,prefix:n});if(e.consume_if_type(`{`)){let n=t.push_parent(i);for(;e.has_more()&&e.peek_type()!==`}`;){let t=this.parsers.dispatch_key(e);if(t===Sa)this.parse_type_pattern(e,n,i);else if(t===wa)this.parse_type_length(e,n,i);else if(t===Ea)this.parse_type_range(e,n,i);else if(t===Ta)this.parse_type_fraction_digits(e,n,i);else if(t===va)this.parse_type_enum(e,n,i);else if(t===ba)this.parsers.bits_parser.parse_type_bit(e,n,i);else if(t===ga)this.parse_type_path(e,n,i);else if(t===_a)this.parse_type_require_instance(e,n,i);else if(t===pa)this.parse_type_base(e,n,i);else if(t===ma){let t=this.parse_type(e,n);i.types.push(t)}else this.parsers.parseStatement(e,n)}e.consume_type(`}`),i.name===ha&&i.enums.length===0&&e.syntaxError(`enumeration type must contain at least one enum statement`)}let a=t.current_parent;return a&&`type`in a&&!a.type&&(a.type=i),e.consume_if_type(`;`),i}parse_type_base(e,t,n){e.consume(pa),n.identityref_bases.push(this.parsers.consume_identifier_ref(e)),e.consume_if_type(`;`)}parse_type_pattern(e,t,n){e.consume(Sa);let r=this.parsers.parse_string_concatenation(e),i=!1,a,o;if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;){let n=this.parsers.dispatch_key(e);n===Ba?(e.consume(Ba),a=this.parsers.parse_string_concatenation(e),e.consume_if_type(`;`)):n===Va?(e.consume(Va),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(`;`)):n===Ca?(e.consume(Ca),i=e.consume()===`invert-match`,e.consume_if_type(`;`)):this.parsers.parseStatement(e,t)}e.consume_type(`}`)}n.patterns.push(new yo({pattern:r,invert_match:i,error_message:a,error_app_tag:o})),e.consume_if_type(`;`)}parse_type_length(e,t,n){e.consume(wa),n.length=this.parsers.parse_string_argument(e),e.consume_if_type(`;`)}parse_type_range(e,t,n){e.consume(Ea),n.range=this.parsers.parse_string_argument(e),e.consume_if_type(`;`)}parse_type_fraction_digits(e,t,n){e.consume(Ta),n.fraction_digits=Number.parseInt(e.consume_type(`INTEGER`),10),e.consume_if_type(`;`)}parse_type_enum(e,t,n){if(e.consume(va),n.enums.push(e.consume()),e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)e.consume();e.consume_type(`}`)}e.consume_if_type(`;`)}parse_type_path(e,t,n){e.consume(ga),n.path=fo(this.parsers.parse_string_argument(e)),e.consume_if_type(`;`)}parse_type_require_instance(e,t,n){e.consume(_a);let[,r]=e.consume_oneof([V,H]);n.require_instance=r===V,e.consume_if_type(`;`)}},fs=class{constructor(e){this.parsers=e,this.typedefBodyDispatch=Wo(this.parsers,{[ma]:(e,t)=>{this.parsers.type_parser.parse_type(e,t)},[za]:(e,t)=>{this.parsers.parse_typedef_default(e,t)}})}parsers;typedefBodyDispatch;parse_typedef(e,t){e.consume(da);let n=e.consume_type(`IDENTIFIER`),r=new go({name:n}),i=`typedef '${n}'`;if(e.consume_if_type(`{`)){let n=t.push_parent(r);for(;e.has_more()&&e.peek_type()!==`}`;){let t=this.parsers.substatement_handler(e,this.typedefBodyDispatch);t?t(e,n):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type(`}`)}return t.module.typedefs[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(`;`),r}},ps=class{constructor(e){this.parsers=e}parsers;parse_uses(e,t){e.consume(Oa);let n,r;if(e.peek_type()===`IDENTIFIER`){let t=this.parsers.consume_identifier_ref(e);n=t.prefix,r=t.name}else r=e.consume().trim();let i=new Lo({name:`uses`,grouping_name:r,grouping_prefix:n});if(e.consume_if_type(`{`)){let n=t.push_parent(i);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,n);e.consume_type(`}`)}return this.parsers.add_to_parent_or_module(t,i),e.consume_if_type(`;`),i}},ms=class{constructor(e){this.parsers=e}parsers;parse_when(e,t){e.consume(B);let n=new Fo({expression:this.parsers.parse_string_concatenation(e)});if(e.consume_if_type(`{`)){let r=t.push_parent(n);for(;e.has_more()&&e.peek_type()!==`}`;)this.parsers.parseStatement(e,r);e.consume_type(`}`)}t.current_parent instanceof W&&(t.current_parent.when=n),e.consume_if_type(`;`)}},hs=new Set([Qa,to]);function gs(e){let t=0;for(;e.has_more();){let n=e.peek_type();if(n===`{`)t+=1,e.consume_type(`{`);else if(n===`}`){if(--t,e.consume_type(`}`),t===0)return}else e.consume()}}function _s(e,{context:t}){let n=e.peek_token();if(!n||!hs.has(n.value))return;let r=n.value,[i,a]=e.position(),o=e.filename??`<string>`;for(console.warn(`Ignoring unsupported YANG statement '${r}' (${t}) at ${o}:${i}:${a}`),e.consume();e.has_more();){let t=e.peek_type();if(t===`{`){gs(e);break}if(t===`;`){e.consume_type(`;`);return}if(t===`}`)return;e.consume()}e.consume_if_type(`;`)}function vs(e){let t=e.peek_token();return t!==void 0&&hs.has(t.value)}function ys(e){e.consume(ya),e.peek_type()===`IDENTIFIER`&&e.consume_type(`IDENTIFIER`),e.consume_if_type(`;`)}function bs(e){if(typeof e.keyword==`string`&&e.keyword.trim().length>0)return e.keyword;throw new A(`Internal error: cannot serialize AST statement without a keyword`)}var xs=class{importResolver;anydata_parser=new Ho(this);anyxml_parser=new Uo(this);augment_parser=new Ko(this);bits_parser=new qo(this);choice_parser=new Yo(this);container_parser=new Xo(this);extension_parser=new Zo(this);feature_parser=new Qo(this);grouping_parser=new $o(this);identity_parser=new es(this);leaf_parser=new ts(this);leaf_list_parser=new ns(this);list_parser=new rs(this);module_parser=new is(this);notification_parser=new as(this);rpc_parser=new os(this);must_parser=new ss(this);refine_parser=new cs(this);revision_parser=new ls(this);submodule_parser=new us(this,this.module_parser);type_parser=new ds(this);typedef_parser=new fs(this);uses_parser=new ps(this);when_parser=new ms(this);statementKeywordHandlers={[F]:(e,t)=>this.fromAst(this.leaf_parser.parse_leaf(e,t)),[I]:(e,t)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,t)),[N]:(e,t)=>this.fromAst(this.container_parser.parse_container(e,t)),[P]:(e,t)=>this.fromAst(this.list_parser.parse_list(e,t)),[no]:(e,t)=>this.fromAst(this.notification_parser.parse_notification(e,t)),[eo]:(e,t)=>this.fromAst(this.rpc_parser.parse_rpc(e,t)),[L]:(e,t)=>this.fromAst(this.anydata_parser.parse_anydata(e,t)),[R]:(e,t)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,t)),[z]:(e,t)=>this.fromAst(this.choice_parser.parse_choice(e,t)),[Aa]:()=>{throw new k(`'case' is only valid as a substatement of 'choice' (RFC 7950)`)},[ro]:()=>{throw new k(`'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`)},[io]:()=>{throw new k(`'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`)},[da]:(e,t)=>this.fromAst(this.typedef_parser.parse_typedef(e,t)),[ma]:(e,t)=>this.fromType(this.type_parser.parse_type(e,t)),[Oa]:(e,t)=>this.fromAst(this.uses_parser.parse_uses(e,t)),[ka]:(e,t)=>(this.refine_parser.parse_refine(e,t),{__class__:`YangStatement`,keyword:`refine`,statements:[]}),[ja]:(e,t)=>this.fromMust(this.must_parser.parse_must(e,t)),[B]:(e,t)=>(this.when_parser.parse_when(e,t),{__class__:`YangStatement`,keyword:`when`,statements:[]}),[$a]:(e,t)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,t)),[Ga]:(e,t)=>(this.feature_parser.parse_feature_stmt(e,t),{__class__:`YangStatement`,keyword:`feature`,statements:[]}),[U]:(e,t)=>(this.feature_parser.parse_if_feature_stmt(e,t),{__class__:`YangStatement`,keyword:`if-feature`,statements:[]}),[fa]:(e,t)=>(this.identity_parser.parse_identity(e,t),{__class__:`YangStatement`,keyword:`identity`,statements:[]}),[Da]:(e,t)=>(this.grouping_parser.parse_grouping(e,t),{__class__:`YangStatement`,keyword:`grouping`,statements:[]}),[Ka]:(e,t)=>this.fromAst(this.augment_parser.parse_augment(e,t)),[ua]:(e,t)=>(this.revision_parser.parse_revision(e,t),{__class__:`YangStatement`,keyword:`revision`,statements:[]}),[la]:(e,t)=>({__class__:`YangStatement`,keyword:`description`,argument:this.parse_description(e,t),name:`description`,statements:[]}),[La]:(e,t)=>(this.parse_leaf_mandatory(e,t),{__class__:`YangStatement`,keyword:`mandatory`,statements:[]}),[za]:(e,t)=>(this.parse_leaf_default(e,t),{__class__:`YangStatement`,keyword:`default`,statements:[]}),[Na]:(e,t)=>(this.parse_list_key(e,t),{__class__:`YangStatement`,keyword:`key`,statements:[]}),[Pa]:(e,t)=>(this.parse_min_elements(e,t),{__class__:`YangStatement`,keyword:`min-elements`,statements:[]}),[Fa]:(e,t)=>(this.parse_max_elements(e,t),{__class__:`YangStatement`,keyword:`max-elements`,statements:[]}),[Ia]:(e,t)=>(this.parse_ordered_by(e),{__class__:`YangStatement`,keyword:`ordered-by`,statements:[]}),[Ma]:(e,t)=>(this.parse_presence(e,t),{__class__:`YangStatement`,keyword:`presence`,statements:[]}),[Ya]:(e,t)=>(this.parse_reference(e,t),{__class__:`YangStatement`,keyword:`reference`,statements:[]}),[Ra]:(e,t)=>(this.parse_config(e,t),{__class__:`YangStatement`,keyword:`config`,statements:[]})};constructor(e={}){this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()===`IDENTIFIER`?e.peek()??``:e.peek_type()}assertStatementStartAllowed(e,t,n){let r=t instanceof Set?t:new Set(t),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`)return;let a=n?` ${n}`:``;throw new k(`Invalid statement starting with '${e.peek()??`<end>`}'${a}. Allowed here: ${[...r].map(e=>String(e)).sort().join(`, `)}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,t){let n=this.parseStatement(e,t);if(n.keyword!==`module`)throw new A(`Expected top-level 'module' statement`);return n}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,t,n){n?.allowedStatementStarts&&this.assertStatementStartAllowed(e,n.allowedStatementStarts,n.restrictionContext);let r=this.dispatch_key(e);if(e.peek_type()===`IDENTIFIER`&&e.peek_type_at(1)===`:`)return this.parse_prefixed_extension_statement(e,t);let i=this.statementKeywordHandlers[r];return i?i(e,t):this.parse_statement_generic(e,t)}parse_statement_generic(e,t){let n=this.dispatch_key(e);if(n===ra)return this.parse_top_level_module(e,t);if(n===qa)return this.submodule_parser.parse_submodule(e,t),{__class__:`YangStatement`,keyword:`submodule`,statements:[]};if(n===ia)return this.module_parser.parse_yang_version(e,t),{__class__:`YangStatement`,keyword:`yang-version`,argument:t.module.yang_version,name:`yang-version`,statements:[]};if(n===aa)return this.module_parser.parse_namespace(e,t),{__class__:`YangStatement`,keyword:`namespace`,argument:t.module.namespace,name:`namespace`,statements:[]};if(n===oa)return this.module_parser.parse_prefix(e,t),{__class__:`YangStatement`,keyword:`prefix`,argument:t.module.prefix,name:`prefix`,statements:[]};if(n===sa)return this.module_parser.parse_organization(e,t),{__class__:`YangStatement`,keyword:`organization`,statements:[]};if(n===ca)return this.module_parser.parse_contact(e,t),{__class__:`YangStatement`,keyword:`contact`,statements:[]};if(n===Ha)return this.module_parser.parse_import_stmt(e,t),{__class__:`YangStatement`,keyword:`import`,statements:[]};if(n===Ua)return this.module_parser.parse_include_stmt(e,t),{__class__:`YangStatement`,keyword:`include`,statements:[]};if(this.skip_unsupported_if_present(e,`generic`))return{__class__:`YangStatement`,keyword:`unsupported`,statements:[]};let r=e.peek();(r===ro||r===io)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let i=e.consume();e.peek_type()===`:`&&(e.consume_type(`:`),i=`${i}:${e.consume_type(`IDENTIFIER`)}`);let a=this.parse_argument(e),o=[];if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)o.push(this.parseStatement(e,t));e.consume_type(`}`),e.consume_if_type(`;`)}else e.consume_if_type(`;`);let s={__class__:`YangStatement`,keyword:i,name:a,argument:a,statements:o};return i===`type`&&(s.type=this.extract_type_shape(s)),s}parse_argument(e){let t=[];for(;e.has_more();){let n=e.peek_type();if(n===`;`||n===`{`)break;n===`STRING`?t.push(this.parse_string_concatenation(e)):n===`+`?e.consume_type(`+`):t.push(e.consume())}return t.join(``).trim()}parse_string_concatenation(e){let t=[e.consume_type(`STRING`)];for(;e.has_more()&&e.peek_type()===`+`;)e.consume_type(`+`),t.push(e.consume_type(`STRING`));return t.join(``)}parse_string_argument(e){return e.peek_type()===`STRING`?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,``)}substatement_handler(e,t){let n=this.dispatch_key(e);if(typeof n==`string`)return t[n]}skip_unsupported_or_raise_unknown(e,t){let n=e.peek();if((n===ro||n===io)&&e.syntaxError(`'${n}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,t))return!0;let r=e.peek()??`<eof>`;e.syntaxError(`Invalid or unknown statement '${r}' in ${t}`)}parse_prefixed_extension_statement_public(e,t){this.parse_prefixed_extension_statement(e,t)}consume_identifier_ref(e){let t=e.consume_type(`IDENTIFIER`).trim();return e.consume_if_type(`:`)?{prefix:t,name:e.consume_type(`IDENTIFIER`).trim()}:{name:t}}consume_qname_from_identifier(e){let t=this.consume_identifier_ref(e);return t.prefix?`${t.prefix}:${t.name}`:t.name}add_to_parent_or_module(e,t){let n=e.current_parent;if(n&&Array.isArray(n.statements)){n.statements.push(t);return}let r=e.module;Array.isArray(r.statements)&&r.statements.push(t)}skip_unsupported_if_present(e,t){return vs(e)?(_s(e,{context:t}),!0):!1}parse_top_level_module(e,t){e.consume(ra);let n=e.consume_type(`IDENTIFIER`);t.module.name=n,e.consume_type(`{`);let r=[];for(;e.has_more()&&e.peek_type()!==`}`;)r.push(this.parseStatement(e,t));return e.consume_type(`}`),{__class__:`YangStatement`,keyword:`module`,name:n,argument:n,statements:r}}fromAst(e){let t=bs(e),n=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:`YangStatement`,keyword:t,name:e.name,argument:e.name,statements:n};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);let i=e.config;if(typeof i==`boolean`&&(r.config=i),t===`leaf-list`){let t=e.defaults;Array.isArray(t)&&t.length>0&&(r.defaults=[...t])}e.key!==void 0&&(r.key=e.key);let a=e.min_elements;typeof a==`number`&&(r.min_elements=a);let o=e.max_elements;typeof o==`number`&&(r.max_elements=o),e.description&&(r.description=e.description);let s=e.reference;if(s&&(r.reference=s),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),t===`extension`&&(typeof e.argument_name==`string`&&(r.argument_name=e.argument_name),typeof e.argument_yin_element==`boolean`&&(r.argument_yin_element=e.argument_yin_element)),t===`augment`&&typeof e.augment_path==`string`){r.argument=e.augment_path,r.augment_path=e.augment_path;let t=e.augment_path_segments;Array.isArray(t)&&t.length>0&&(r.augment_path_segments=t.map(e=>e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}))}if(t===`extension-invocation`&&(r.keyword=e.name??`extension-invocation`,r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=e.resolved_module?.name,r.resolved_extension_name=e.resolved_extension?.name),e.when&&typeof e.when.expression==`string`&&(r.when={expression:e.when.expression,description:e.when.description??``,evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(e=>this.fromMust(e))]),t===`uses`){let t=e;typeof t.grouping_name==`string`&&t.grouping_name.length>0&&(r.grouping_name=t.grouping_name,typeof t.grouping_prefix==`string`&&t.grouping_prefix.length>0&&(r.grouping_prefix=t.grouping_prefix),r.argument=t.grouping_qname()),Array.isArray(t.refines)&&t.refines.length>0&&(r.refines=t.refines.map(e=>this.serializeRefineStmt(e)))}let c=e.presence;return typeof c==`string`&&c.length>0&&(r.presence=c),r}serializeRefineStmt(e){let t={__class__:`YangStatement`,keyword:`refine`,name:`refine`,argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements==`number`&&(t.min_elements=e.min_elements),typeof e.max_elements==`number`&&(t.max_elements=e.max_elements),typeof e.refined_mandatory==`boolean`&&(t.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(t.refined_defaults=[...e.refined_defaults]),typeof e.refined_config==`boolean`&&(t.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(t.if_features=[...e.if_features]),typeof e.description==`string`&&e.description.length>0&&(t.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(t.statements=e.must_statements.map(e=>this.fromMust(e))),t}serializeAstChildren(e){let t=[];for(let n of e)n&&typeof n==`object`&&t.push(this.fromAst(n));return t}fromType(e){let t=Ji({name:e.name,prefix:e.prefix});return{__class__:`YangStatement`,keyword:`type`,name:e.name,argument:t,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:`YangStatement`,keyword:`must`,name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){let t={name:e.name,patterns:e.patterns.map(e=>({pattern:e.pattern,invert_match:e.invert_match,error_message:e.error_message,error_app_tag:e.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:e.identityref_bases.map(e=>e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}),enums:[...e.enums],bits:e.bits.map(e=>({name:e.name,position:e.position??0})),types:e.types.map(e=>this.fromTypeShape(e))};return e.prefix&&(t.prefix=e.prefix),t}extract_type_shape(e){let t=e.argument??`string`,n={name:t};for(let r of e.statements??[]){if(r.keyword===`pattern`&&r.argument){let e=n.patterns??[];e.push({pattern:r.argument,invert_match:!1}),n.patterns=e}if(r.keyword===`length`&&r.argument&&(n.length=r.argument),r.keyword===`range`&&r.argument&&(n.range=r.argument),r.keyword===`fraction-digits`&&r.argument){let e=Number.parseInt(r.argument,10);Number.isNaN(e)||(n.fraction_digits=e)}if(r.keyword===`enum`&&r.argument&&(n.enums=[...n.enums??[],r.argument]),r.keyword===`bit`&&r.argument){let e=n.bits??[];e.push({name:r.argument,position:e.length===0?0:Math.max(...e.map(e=>e.position))+1}),n.bits=e}t===`union`&&r.keyword===`type`&&(n.types=[...n.types??[],this.extract_type_shape(r)])}return n}parse_description(e,t){e.consume(la);let n=e.consume_type(`STRING`);if(e.consume_if_type(`{`)){for(;e.has_more()&&e.peek_type()!==`}`;)e.consume();e.consume_type(`}`)}e.consume_if_type(`;`);let r=t.current_parent;return r&&`description`in r&&(r.description=n),n}parse_optional_description(e,t){e.has_more()&&e.peek()===la&&this.parse_description(e,t)}parse_reference(e,t){e.consume(Ya);let n=e.consume_type(`STRING`);e.consume_if_type(`;`);let r=t.current_parent;r&&typeof r==`object`&&`reference`in r&&(r.reference=n)}parse_reference_string_only(e,t){this.parse_reference(e,t)}parse_status_ignored(e,t){ys(e)}parse_config(e,t){e.consume(Ra);let n=e.consume_oneof([V,H])[1],r=t.current_parent;r instanceof zo?r.refined_config=n===V:r&&typeof r==`object`&&`config`in r&&(r.config=n===V),e.consume_if_type(`;`)}parse_typedef_default(e,t){e.consume(za);let n=t.current_parent;n instanceof go&&(n.default=this.parse_default_value_tokens(e)),e.consume_if_type(`;`)}register_import(e,t,n,r,i){let a=e.module;if(n===String(a.prefix??``).replace(/^['"]|['"]$/g,``))throw new A(`Import prefix '${n}' must differ from this module's prefix`);let o=a.import_prefixes??{};if(a.import_prefixes=o,o[n])throw new A(`Duplicate import prefix '${n}'`);if(!this.importResolver)throw new A(`Import resolution is not configured for this parser instance`);o[n]=this.importResolver(t,n,r,e,i)}parse_ordered_by(e){e.consume(Ia),e.consume(),e.consume_if_type(`;`)}parse_list_key(e,t){e.consume(Na);let[n]=e.consume_oneof([`STRING`,`IDENTIFIER`]),r=t.current_parent;r&&`key`in r&&(r.key=n),e.consume_if_type(`;`)}parse_min_elements(e,t){e.consume(Pa);let n=Number.parseInt(e.consume_type(`INTEGER`),10),r=t.current_parent;r&&`min_elements`in r&&(r.min_elements=n),e.consume_if_type(`;`)}parse_max_elements(e,t){e.consume(Fa);let n=Number.parseInt(e.consume_type(`INTEGER`),10),r=t.current_parent;r&&`max_elements`in r&&(r.max_elements=n),e.consume_if_type(`;`)}parse_leaf_mandatory(e,t){e.consume(La);let[,n]=e.consume_oneof([V,H]),r=t.current_parent;r instanceof zo?(r.refined_mandatory=n===V,e.consume_if_type(`;`)):(r&&typeof r==`object`&&`mandatory`in r&&(r.mandatory=n===V),e.consume_if_type(`;`))}parse_leaf_default(e,t){e.consume(za);let n=this.parse_default_value_tokens(e),r=t.current_parent;r instanceof zo?r.refined_defaults.push(n):r instanceof Oo?r.defaults.push(n):r&&typeof r==`object`&&`default`in r&&(r.default=n),e.consume_if_type(`;`)}parse_presence(e,t){e.consume(Ma);let n=t.current_parent,r=e.consume_type(`STRING`);n&&`presence`in n&&(n.presence=r),e.consume_if_type(`;`)}parse_default_value_tokens(e){let t=e.peek_type();if(t===`STRING`)return e.consume_type(`STRING`);if(t===`INTEGER`)return e.consume_type(`INTEGER`);if(t===`IDENTIFIER`)return e.consume_type(`IDENTIFIER`);if(t===V)return e.consume(V),`true`;if(t===H)return e.consume(H),`false`;throw new A(`Expected default value, got ${t}`)}parse_prefixed_extension_statement(e,t){let n=e.consume_type(`IDENTIFIER`);e.consume_type(`:`);let r=e.consume_type(`IDENTIFIER`),i=this.resolve_prefixed_module(t,n);if(!i)throw new A(`Unknown extension prefix '${n}' in invocation ${n}:${r}`);let a=this.resolve_extension_definition(i,r);if(!a)throw new A(`Unknown extension '${r}' in module '${i.name??``}' for invocation ${n}:${r}`);let o=this.consume_optional_extension_argument(e),s=new Mo({name:`${n}:${r}`,prefix:n,resolved_module:i,resolved_extension:a,argument:o});if(e.consume_if_type(`{`)){let n=t.push_parent(s);for(;e.has_more()&&e.peek_type()!==`}`;)this.parseStatement(e,n);e.consume_type(`}`)}return e.consume_if_type(`;`),this.add_to_parent_or_module(t,s),this.fromAst(s)}consume_optional_extension_argument(e){if(!e.has_more())return;let t=e.peek_type();if(t!==`{`&&t!==`;`){if(t===`STRING`)return this.parse_string_concatenation(e);if(t===`IDENTIFIER`||t===`INTEGER`||t===`DOTTED_NUMBER`||t===V||t===H)return e.consume()}}resolve_prefixed_module(e,t){let n=e.module;return t===String(n.prefix??``).replace(/^['"]|['"]$/g,``)?n:n.import_prefixes?.[t]}resolve_extension_definition(e,t){let n=e.extensions?.[t];if(n)return n;let r=(Array.isArray(e.statements)?e.statements:[]).find(e=>e.keyword===`extension`&&e.name===t);if(r)return new jo({name:t,argument_name:typeof r.argument_name==`string`?r.argument_name:``,argument_yin_element:typeof r.argument_yin_element==`boolean`?r.argument_yin_element:void 0})}};function Ss(e,t){if(t!==`'`&&t!==`"`)throw Error(`quote must be "'" or '"', got ${JSON.stringify(t)}`);let n=[],r=0,i=e.length;for(;r<i;){let a=e[r];if(a!==`\\`||r+1>=i){n.push(a),r+=1;continue}let o=e[r+1];if(o===`\\`)n.push(`\\`),r+=2;else if(o===`n`)n.push(`
`),r+=2;else if(o===`t`)n.push(`	`),r+=2;else if(t===`"`&&o===`"`)n.push(`"`),r+=2;else if(t===`'`&&o===`'`)n.push(`'`),r+=2;else if(o===`\r`||o===`
`)for(r+=2,o===`\r`&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===` `||e[r]===`	`);)r+=1;else n.push(`\\`,o),r+=2}return n.join(``)}var Cs=/[A-Za-z_]/,ws=/[A-Za-z0-9_.-]/,Ts=class{tokenize(e,t){let n=[],r=0,i=e.length,a=1,o=0,s=()=>{r<i&&e[r]===`
`&&(a+=1,o=r+1),r+=1},c=(e,t,r,i,a)=>{let o=r-a;n.push(Oi(e,t,i,o))};for(;r<i;){if(/\s/.test(e[r])){s();continue}if(e[r]===`/`&&r+1<i&&e[r+1]===`*`){for(s(),s();r<i;){if(r+1<i&&e[r]===`*`&&e[r+1]===`/`){s(),s();break}s()}continue}if(e[r]===`/`&&r+1<i&&e[r+1]===`/`){for(s(),s();r<i&&e[r]!==`
`;)s();continue}let t=e[r];if(t===`"`||t===`'`){let n=t,l=r,u=a,d=o;s();let f=r;for(;r<i&&e[r]!==n;)e[r]===`\\`&&r+1<i&&s(),s();c(`STRING`,Ss(e.slice(f,r),n),l,u,d),s()}else if(t===`-`&&r+1<i&&/\d/.test(e[r+1])){let t=r,n=a,l=o;s();let u=r;for(;r<i&&/\d/.test(e[r]);)s();c(`INTEGER`,`-${e.slice(u,r)}`,t,n,l)}else if(/\d/.test(t)){let t=r,n=a,l=o,u=r;for(;r<i&&/\d/.test(e[r]);)s();if(r<i&&e[r]===`.`&&r+1<i&&/\d/.test(e[r+1])){for(s();r<i&&/\d/.test(e[r]);)s();c(`DOTTED_NUMBER`,e.slice(u,r),t,n,l)}else c(`INTEGER`,e.slice(u,r),t,n,l)}else if(Cs.test(t)){let t=r,n=a,l=o,u=r;for(s();r<i&&ws.test(e[r]);)s();c(`IDENTIFIER`,e.slice(u,r),t,n,l)}else t===`{`?(c(`{`,t,r,a,o),s()):t===`}`?(c(`}`,t,r,a,o),s()):t===`;`?(c(`;`,t,r,a,o),s()):t===`:`?(c(`:`,t,r,a,o),s()):t===`=`?(c(`=`,t,r,a,o),s()):t===`+`?(c(`+`,t,r,a,o),s()):(t===`/`&&c(`/`,t,r,a,o),s())}return new ki(n,e,t)}},Es=`ietf-yang-structure-ext:structure-index`;function G(e){return!!e&&typeof e==`object`&&!Array.isArray(e)}function Ds(e){return Array.isArray(e)?e:[]}function Os(e){return JSON.parse(JSON.stringify(e))}function ks(e,t){if(t.length===0)return;let n=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...t,...n]}function As(e,t){if(!t||typeof t.expression!=`string`)return;let n=t.expression,r=G(e.when)?e.when:void 0,i=typeof r?.expression==`string`?r.expression:void 0;if(i){let t=typeof r?.description==`string`?r.description:``;e.when={expression:`(${n}) and (${i})`,description:t,evaluate_with_parent_context:!0}}else e.when={expression:n,description:typeof t.description==`string`?t.description:``,evaluate_with_parent_context:!0}}function js(e,t){try{return Xi(e)}catch(e){throw new A(`${t}: ${e instanceof Error?e.message:String(e)}`)}}function Ms(e,t,n,r){if(t===String(e.prefix??``).replace(/^['"]|['"]$/g,``))return e;let i=G(e.import_prefixes)?e.import_prefixes:void 0,a=i&&G(i[t])?i[t]:void 0;if(!a)throw new A(`${r}: unknown prefix '${t}' in path '${n}'`);return a}function Ns(e,t){return Ds(e.statements).find(e=>e.name===t)}function Ps(e,t){let n=G(e.extension_runtime)?e.extension_runtime:void 0,r=(n&&G(n[Es])?n[Es]:void 0)?.[t];return G(r)?r:Ds(e.statements).find(e=>(typeof e.resolved_extension_name==`string`?e.resolved_extension_name:``)===`structure`&&String(e.argument??``).trim()===t)}function Fs(e,t){let n=js(t,`augment-structure`),r=n[0],i=r.prefix,a=Ps(Ms(e,i,t,`augment-structure`),r.name);if(!a)throw new A(`augment-structure: no top-level structure '${r.name}' in path '${t}'`);for(let r of n.slice(1)){Ms(e,r.prefix,t,`augment-structure`);let n=Ns(a,r.name);if(!n)throw new A(`augment-structure: no child '${r.name}' in path '${t}'`);a=n}return a}function Is(e,t){let n=String(e.resolved_module_name??``),r=String(e.resolved_extension_name??``);if(n!==`ietf-yang-structure-ext`)return e;if(r===`structure`){let n=G(t.extension_runtime)?t.extension_runtime:t.extension_runtime={},r=G(n[Es])?n[Es]:n[Es]={},i=String(e.argument??``).trim();return i.length>0&&(r[i]=e,e.name=i),e.data_node_kind=`container`,e}if(r===`augment-structure`){let n=Fs(t,String(e.argument??``)),r=Ds(e.statements).map(e=>Os(e)),i=Array.isArray(e.if_features)?e.if_features:[],a=G(e.when)?e.when:void 0;for(let e of r){ks(e,i),As(e,a);let t=Ds(n.statements);t.push(e),n.statements=t}}else return e}function Ls(e,t){let n=Ds(e.statements),r=[];for(let e of n){let n=e;typeof e.resolved_module_name==`string`&&typeof e.resolved_extension_name==`string`&&(n=Is(e,t)),n&&(Ls(n,t),r.push(n))}e.statements=r}function Rs(e){Ls(e,e)}var zs=new Set([`container`,`list`,`leaf`,`leaf-list`,`choice`,`case`,`anydata`,`anyxml`,`notification`,`rpc`,`action`,`input`,`output`]);function Bs(e){return JSON.parse(JSON.stringify(e))}function Vs(e){return Array.isArray(e)?e:[]}function Hs(e){return String(e.prefix??``).replace(/^['"]|['"]$/g,``)}function Us(e,t){if(t===Hs(e))return e;let n=e.import_prefixes?.[t];return n&&typeof n==`object`?n:void 0}function Ws(e,t){let n=e.augment_path_segments;if(Array.isArray(n)&&n.length>0)return n;try{return Xi(t)}catch(e){throw new k(e instanceof Error?e.message:String(e))}}function Gs(e){let t=typeof e.keyword==`string`?e.keyword:``;return!!e.name&&zs.has(t)}function Ks(e,t){for(let n of Vs(e.statements))if(n.name===t&&Gs(n))return n}function qs(e,t){for(let n of Vs(e.statements))if(n.name===t&&Gs(n))return n}function Js(e,t,n){return Ys({ctxModule:e,path:t,segments:n?Ws(n,t):void 0,kind:`augment`,findToplevel:qs})}function Ys(e){let{ctxModule:t,path:n,kind:r,findToplevel:i}=e,a=e.segments;if(!a||a.length===0)try{a=Xi(n)}catch(e){throw new k(e instanceof Error?e.message:String(e))}let o=a[0],s=o.prefix,c=o.name,l=Us(t,s);if(!l)throw new k(`${r}: unknown prefix '${s}' in path '${n}' (module '${String(t.name??``)}')`);let u=i(l,c);if(!u)throw new k(`${r}: no top-level schema node '${c}' in module '${String(l.name??``)}' (path '${n}')`);for(let e of a.slice(1)){let i=e.prefix,a=e.name;if(!Us(t,i))throw new k(`${r}: unknown prefix '${i}' in path '${n}'`);let o=Ks(u,a);if(!o)throw new k(`${r}: no child '${a}' under node in path '${n}' (after '${String(u.name??``)}')`);u=o}if(!Array.isArray(u.statements)&&u.statements!==void 0)throw new k(`${r}: target node '${String(u.name??`?`)}' cannot contain schema substatements (path '${n}')`);return u.statements===void 0&&(u.statements=[]),u}function Xs(e,t){e.defining_module=t;for(let n of Vs(e.statements))Xs(n,t)}function Zs(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function Qs(e,t){let n=e.when;if(!n||typeof n.expression!=`string`||n.expression.trim()===``)return;let r={...Bs(n),evaluate_with_parent_context:!0},i=t.when;t.when=i?.expression?{...i,expression:`(${String(i.expression)}) and (${n.expression})`,description:String(i.description??``),evaluate_with_parent_context:!0}:r}function $s(e,t,n){let r=Vs(e.statements).map(e=>Bs(e));for(let t of r)Xs(t,n),Zs(e,t),Qs(e,t);let i=Vs(t.statements);for(let e of r)i.push(e);t.statements=i}function ec(e){let t=e.data,n=Vs(t.statements),r=n.filter(e=>e.keyword===`augment`);if(r.length===0)return e;let i=String(t.name??``);for(let e of r)$s(e,Js(t,String(e.augment_path??e.argument??``),e),i);return t.statements=n.filter(e=>e.keyword!==`augment`),e}function tc(e){return JSON.parse(JSON.stringify(e))}function nc(e){return!e||typeof e!=`object`?{}:e}function rc(e){return!e||typeof e!=`object`?{}:e}function ic(e){if(typeof e.grouping_name!=`string`||!e.grouping_name)return;let t=e.grouping_name,n=typeof e.grouping_prefix==`string`&&e.grouping_prefix?e.grouping_prefix:void 0;return n?{prefix:n,name:t}:{name:t}}function ac(e,t){let n=Ji(e);if(!e.name)throw new A(`Empty grouping name in uses`);if(e.prefix){let r=t.import_prefixes[e.prefix];if(!r)throw new A(`Unknown import prefix '${e.prefix}' in uses '${n}'`);let i=nc(r.groupings),a=i[e.name];if(!a)throw new A(`Unknown grouping '${n}'`);return{key:n,grouping:a,nestedScope:{groupings:i,import_prefixes:rc(r.import_prefixes)}}}let r=t.groupings[e.name];if(!r)throw new A(`Unknown grouping '${n}'`);return{key:n,grouping:r,nestedScope:t}}function oc(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function sc(e,t){let n=e.when;if(!n||typeof n.expression!=`string`||n.expression.trim()===``)return;let r={...tc(n),evaluate_with_parent_context:!0},i=t.when;t.when=i?.expression?{...i,expression:`(${i.expression}) and (${n.expression})`,description:String(i.description??``),evaluate_with_parent_context:!0}:r}function cc(e,t){for(let n of e)if(n.name===t)return n;for(let n of e){let e=cc(n.statements??[],t);if(e)return e}}function lc(e,t){if(t.length===0)return;let[n,...r]=t,i=cc(e,n);if(i)return r.length===0?i:lc(i.statements??[],r)}function uc(e,t){let n=e.refines;if(Array.isArray(n)&&n.length!==0)for(let e of n){let n=e.refine_target_path??e.argument??``,r=n.split(`/`).map(e=>e.trim()).filter(Boolean);if(r.length===0)continue;let i=lc(t,r);if(!i)throw new Si(n);typeof e.min_elements==`number`&&(i.min_elements=e.min_elements),typeof e.max_elements==`number`&&(i.max_elements=e.max_elements),typeof e.refined_mandatory==`boolean`&&(i.mandatory=e.refined_mandatory),typeof e.refined_config==`boolean`&&(i.config=e.refined_config);let a=e.refined_defaults;Array.isArray(a)&&a.length>0&&(i.keyword===`leaf`?i.default=a[0]:i.keyword===`leaf-list`&&(i.defaults=[...a]));let o=e.if_features;if(Array.isArray(o)&&o.length>0){let e=Array.isArray(i.if_features)?i.if_features:[];i.if_features=[...o,...e]}let s=typeof e.description==`string`?e.description.trim():``;s&&(i.description=s);let c=e.statements??[];c.length>0&&(i.statements=[...i.statements??[],...tc(c)])}}function dc(e,t){let n=typeof t.argument==`string`&&t.argument||typeof t.name==`string`&&t.name||``;if(!n||n in e)return;let r=t.statements?.find(e=>e.keyword===`type`);e[n]={name:n,description:typeof t.description==`string`?t.description:``,reference:typeof t.reference==`string`?t.reference:``,default:t.default,type:t.type??r?.type,statements:t.statements??[]}}function fc(e,t){let n=[];for(let r of t)r.keyword===`typedef`?dc(e,r):n.push(r);return n}function pc(e,t,n,r){let i=ac(e,t);if(n.includes(i.key))throw new Ci(n,i.key);let a=[...n,i.key],o=i.grouping.statements??[],s=[];for(let e of o)if(e.keyword===`uses`){let t=ic(e);if(!t)continue;let n=pc(t,i.nestedScope,a,r);uc(e,n);for(let t of n)oc(e,t),sc(e,t),s.push(tc(t))}else e.keyword,s.push(tc(e));return fc(r,s).map(e=>mc(e,i.nestedScope,a,r))}function mc(e,t,n,r){return e.statements?.length&&(e.statements=hc(e.statements,t,n,r)),e}function hc(e,t,n,r){let i=[];for(let a of e)if(a.keyword===`uses`){let e=ic(a);if(!e)continue;let o=pc(e,t,n,r);uc(a,o);for(let e of o)oc(a,e),sc(a,e),i.push(mc(e,t,n,r))}else i.push(mc(tc(a),t,n,r));return i}function gc(e){let t=e.data,n=t.import_prefixes,r=tc(t);n&&typeof n==`object`&&(r.import_prefixes=n),t.features instanceof Set&&(r.features=new Set(t.features)),t.feature_if_features&&typeof t.feature_if_features==`object`&&(r.feature_if_features={...t.feature_if_features});let i={groupings:nc(r.groupings),import_prefixes:rc(r.import_prefixes)},a=r.typedefs&&typeof r.typedefs==`object`?r.typedefs:{};r.typedefs=a,r.statements=hc(r.statements??[],i,[],a);for(let e of Object.values(i.groupings))e.statements?.length&&(e.statements=hc(e.statements,i,[],a));return new ea(r,e.source)}function _c(e){let t=[];for(let n of e??[])t.push(n),t.push(..._c(n.statements));return t}function vc(e){for(let t of _c(e.data.statements)){if(t.keyword!==`list`||typeof t.key!=`string`||t.key.trim()===``)continue;let e=new Map((t.statements??[]).filter(e=>e.keyword===`leaf`&&typeof e.name==`string`).map(e=>[e.name,e]));for(let n of t.key.split(/\s+/).filter(Boolean)){let r=e.get(n);if(r===void 0)throw new A(`List '${t.name??``}': key leaf '${n}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let i;if(r.when===void 0?Array.isArray(r.if_features)&&r.if_features.length>0&&(i=`if-feature`):i=`when`,i!==void 0)throw new A(`List '${t.name??``}': key leaf '${r.name}' must not have '${i}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function yc(e){vc(e)}function bc(e){let t={};if(!e)return t;for(let[n,r]of Object.entries(e))t[n]={bases:Array.isArray(r.bases)?r.bases.map(e=>Zi(e)).filter(e=>!!e):[]};return t}function xc(e,t){if(e.keyword!==`module`)throw new A(`Only 'module' roots are currently supported by TS parser`);let n=e.statements??[],r={};for(let e of n)if(e.keyword===`typedef`&&e.argument){let t=e.statements?.find(e=>e.keyword===`type`);r[e.argument]={name:e.argument,description:typeof e.description==`string`?e.description:``,reference:typeof e.reference==`string`?e.reference:``,default:e.default,type:e.type??t?.type,statements:e.statements??[]}}let i=t.features,a=t.feature_if_features,o=n.find(e=>e.keyword===`description`),s=typeof o?.argument==`string`?o.argument:``;return{__class__:`YangModule`,name:e.argument,yang_version:n.find(e=>e.keyword===`yang-version`)?.argument??`1.1`,namespace:n.find(e=>e.keyword===`namespace`)?.argument??``,prefix:n.find(e=>e.keyword===`prefix`)?.argument??``,organization:String(t.organization??``),contact:String(t.contact??``),description:s,typedefs:r,identities:bc(t.identities),import_prefixes:t.import_prefixes??{},extensions:t.extensions??{},extension_runtime:t.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:a&&typeof a==`object`?{...a}:{},statements:n}}var Sc=class{expandUses;includePath;moduleCache=new Map;tokenizer=new Ts;parsers=new xs({importResolver:(e,t,n,r,i)=>this.resolveImport(e,n,r,i)});constructor(e={}){this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(e=>mi(e))}resolveImportedModulePath(e,t,n){let r=t?.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);let a=[n,...this.includePath];for(let t of a){for(let e of i){let n=mi(t,e);if(Ki(n))return n}let n=[];try{n=qi(t).filter(t=>t.startsWith(`${e}@`)&&t.endsWith(`.yang`))}catch{n=[]}if(n.length>0)return n.sort(),mi(t,n[n.length-1])}throw new A(`Could not find imported module '${e}' (tried ${i.join(`, `)}) under ${a.join(`, `)}`)}resolveImport(e,t,n,r){let i=n.module.__source_path;if(!i)throw new A(`import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)`);let a=this.resolveImportedModulePath(e,t,hi(i));return this.parseFile(a).data}parseTokenStream(e,t){let n={name:``,yang_version:`1.1`,namespace:``,prefix:``,organization:``,contact:``,revisions:[],belongs_to_module:``,typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:t.kind===`file`?t.value:void 0,statements:[]},r=new Ai({module:n,current_parent:{}}),i=xc(this.parsers.parseModule(e,r),n),a=n.groupings??{},o={};for(let[e,t]of Object.entries(a)){if(!t||typeof t!=`object`)continue;let n=t,r=n.name??e;o[e]={__class__:`YangStatement`,keyword:`grouping`,name:r,argument:r,statements:(n.statements??[]).map(e=>this.parsers.serializeAstStatement(e))}}Object.keys(o).length>0&&(i.groupings=o),Rs(i);let s=new ea(i,t);return this.expandUses&&(s=gc(s),s=ec(s),yc(s)),s}parseString(e,t=`<memory>`){let n=this.tokenizer.tokenize(e,t),r={kind:`string`,value:e,name:t};return this.parseTokenStream(n,r)}parseFile(e){let t=mi(e),n=this.moduleCache.get(t);if(n)return n;let r=Gi(t,`utf-8`),i=this.tokenizer.tokenize(r,t),a={kind:`file`,value:t,name:t},o=this.parseTokenStream(i,a);return this.moduleCache.set(t,o),o}};new Sc;function Cc(e){return String(e??``).replace(/^['"]|['"]$/g,``)}function wc(e){return String(e.name??``)}function Tc(e){let t=e.features;return t instanceof Set||Array.isArray(t)?new Set(t):new Set}function Ec(e,t){if(t===Cc(e.prefix))return e;let n=e.import_prefixes?.[t];if(n&&typeof n==`object`)return n}function Dc(e){let t=[],n=new Set,r=e=>{if(n.has(e))return;n.add(e),t.push(e);let i=e.import_prefixes;if(i)for(let e of Object.values(i))e&&typeof e==`object`&&r(e)};return r(e),t}function Oc(e,t,n){let r=typeof n==`string`?Yi(n):n,i;if(r.prefix){let t=Ec(e,r.prefix);if(!t)return!1;i=t}else i=e;let a=r.name;if(!Tc(i).has(a))return!1;let o=t[wc(i)];return o?o.has(a):!1}function kc(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e[n];if(/\s/.test(i)){n+=1;continue}if(i===`(`||i===`)`){t.push(i),n+=1;continue}let a=n;for(;a<r&&!/\s/.test(e[a])&&e[a]!==`(`&&e[a]!==`)`;)a+=1;t.push(e.slice(n,a)),n=a}return t}var Ac=class{constructor(e,t,n){this.toks=e,this.ctx=t,this.enabled=n}toks;ctx;enabled;i=0;peek(){return this.toks[this.i]}eat(e){let t=this.peek();if(t===void 0)throw Error(`unexpected end of expression`);if(e!==void 0&&t!==e)throw Error(`expected ${e}, got ${t}`);return this.i+=1,t}parseExpr(){let e=this.parseTerm();for(;this.peek()===`or`;){this.eat(`or`);let t=this.parseExpr();e||=t}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()===`and`;){this.eat(`and`);let t=this.parseTerm();e&&=t}return e}parseFactor(){let e=this.peek();if(e===`not`)return this.eat(`not`),!this.parseFactor();if(e===`(`){this.eat(`(`);let e=this.parseExpr();return this.eat(`)`),e}if(e===void 0)throw Error(`unexpected end of expression`);return this.eat(),Oc(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function jc(e,t,n){let r=e.trim();if(!r)return!1;try{let e=new Ac(kc(r),t,n),i=e.parseExpr();return e.atEnd()?i:!1}catch{return!1}}function Mc(e,t,n){return!e||e.length===0||e.every(e=>jc(e,t,n))}function Nc(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function Pc(e,t){let n=!0;for(;n;){n=!1;let r={};for(let[e,n]of Object.entries(t))r[e]=new Set(n);for(let i of e){let e=t[wc(i)];if(!e)continue;let a=i.feature_if_features;for(let t of[...e]){let o=a?.[t];o?.length&&(Mc(o,i,r)||(e.delete(t),n=!0))}}}let r={};for(let[e,n]of Object.entries(t))r[e]=new Set(n);return r}function Fc(e,t){let n=Dc(e),r=Nc(t),i={};for(let e of n){let t=wc(e),n=Tc(e);i[t]=r===null||!r.has(t)?new Set(n):new Set(r.get(t)??[])}return Pc(n,i)}function Ic(e){return String(e.prefix??``).replace(/^['"]|['"]$/g,``)}function Lc(e){let t=e.identities;return!t||typeof t!=`object`?{}:t}function Rc(e){return typeof e==`string`?Yi(e):e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}}function zc(e,t){if(t===Ic(e))return e;let n=(e.import_prefixes??{})[t];return n&&typeof n==`object`?n:void 0}function Bc(e,t){let n=Yi(t);return n.prefix?Vc(e.data,n):null}function Vc(e,t){let n=Rc(t);if(n.prefix){let t=zc(e,n.prefix);return!t||!(n.name in Lc(t))?null:{mod:t,local:n.name}}return n.name in Lc(e)?{mod:e,local:n.name}:null}function Hc(e,t){return e.mod===t.mod&&e.local===t.local}function Uc(e,t){return t.some(t=>Hc(t,e))}var Wc=new WeakMap,Gc=1;function Kc(e){let t=Wc.get(e);return t===void 0&&(t=Gc,Gc+=1,Wc.set(e,t)),t}function qc(e){return`${Kc(e.mod)}:${e.local}`}function Jc(e,t){let n={mod:e,local:t},r=[],i=new Set,a=[n];for(;a.length>0;){let e=a.pop(),t=qc(e);if(i.has(t))continue;i.add(t),r.push(e);let n=Lc(e.mod)[e.local];if(n?.bases)for(let t of n.bases){let n=Vc(e.mod,t);n&&a.push(n)}}return r}function Yc(e,t,n){let r=Bc(e,t),i=Bc(e,n);return!r||!i?!1:Uc(i,Jc(r.mod,r.local).filter(e=>!Hc(e,r)))}function Xc(e,t,n){let r=Bc(e,t),i=Bc(e,n);return!r||!i?!1:Hc(r,i)?!0:Uc(i,Jc(r.mod,r.local))}function Zc(e){return!!e&&typeof e==`object`&&`schema`in e&&`parent`in e}function Qc(e){return Array.isArray(e)&&(e.length===0||Zc(e[0]))}function K(e){return Array.isArray(e)?e.length>0:typeof e==`boolean`?e:typeof e==`number`?e!==0&&!Number.isNaN(e):typeof e==`string`?e!==``:e!=null}function $c(e){return Array.isArray(e)?e.map(e=>Zc(e)?e.data:e):Zc(e)?[e.data]:e==null?[]:[e]}function q(e){return $c(e)[0]}function el(e,t){if(typeof e==`boolean`||typeof t==`boolean`)return[K(e),K(t)];if(typeof e==`number`&&typeof t==`number`)return[e,t];let n=Number(e),r=Number(t);return!Number.isNaN(n)&&!Number.isNaN(r)?[n,r]:[String(e??``).trim(),String(t??``).trim()]}function tl(e,t){let n=$c(e),r=Array.isArray(t)&&!Qc(t)?t:$c(t);if(n.length===0||r.length===0)return n.length===0&&r.length===0;for(let e of n)for(let t of r){if(e==null&&t==null)return!0;if(e==null||t==null)continue;let[n,r]=el(e,t);if(n===r)return!0}return!1}function nl(e,t){for(let n of $c(e))for(let e of $c(t)){let[t,r]=el(n,e);if(typeof t==`number`&&typeof r==`number`){if(t<r)return!0}else if(`${t}`<`${r}`)return!0}return!1}function rl(e,t){for(let n of $c(e))for(let e of $c(t)){let[t,r]=el(n,e);if(typeof t==`number`&&typeof r==`number`){if(t>r)return!0}else if(`${t}`>`${r}`)return!0}return!1}function il(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function al(e,t){for(let n of il(e))if(n?.name===t)return n;return null}function ol(e){if(!e||e.keyword!==`leaf`)return;let t=e.data?.default;if(e.data?.type?.name===`boolean`&&typeof t==`string`){let e=t.toLowerCase();if(e===`true`)return!0;if(e===`false`)return!1}return t}function sl(e,t){let n=e.data,r=e.schema;if(Array.isArray(n)&&(r?.keyword===`list`||r?.keyword===`leaf-list`)){let i=[];for(let a of n){let n={data:a,schema:r,parent:e};i.push(...sl(n,t))}return i}let i=al(r,t),a;if(n&&typeof n==`object`&&!Array.isArray(n)){let e=n;t in e?(a=e[t],a===null&&(a=!0)):a=ol(i)}return a===void 0?[]:(i?.keyword===`list`||i?.keyword===`leaf-list`)&&Array.isArray(a)?a.map(t=>({data:t,schema:i,parent:e})):[{data:a,schema:i,parent:e}]}var cl=class{eval(e,t,n){switch(e.kind){case`literal`:return e.value;case`path`:return this.evalPath(e,t,n);case`binary`:return this.evalBinary(e,t,n);case`function`:return this.evalFunction(e.name,e.args,t,n);default:return null}}evalPath(e,t,n){let r=[e.isAbsolute?t.root:n];for(let n of e.segments){if(n.step!==`.`){if(n.step===`..`)r=r.map(e=>e.parent).filter(e=>!!e);else{let e=[];for(let t of r)e.push(...sl(t,n.step));r=e}}if(n.predicate){let e=[];for(let i=0;i<r.length;i+=1){let a=r[i],o=this.eval(n.predicate,t,a),s=!1;s=typeof o==`number`&&Number.isFinite(o)?Math.trunc(o)===i+1:K(o),s&&e.push(a)}r=e}}return r}evalBinary(e,t,n){let r=e.operator;if(r===`or`)return K(this.eval(e.left,t,n))?!0:K(this.eval(e.right,t,n));if(r===`and`)return K(this.eval(e.left,t,n))?K(this.eval(e.right,t,n)):!1;if(r===`/`){let r=this.eval(e.left,t,n),i=Qc(r)?r:Zc(r)?[r]:[],a=[];for(let n of i){let r=this.eval(e.right,t,n);Qc(r)?a.push(...r):Zc(r)&&a.push(r)}return a}let i=this.eval(e.left,t,n),a=this.eval(e.right,t,n);if(r===`=`)return tl(i,a);if(r===`!=`)return!tl(i,a);if(r===`<`)return nl(i,a);if(r===`>`)return rl(i,a);if(r===`<=`)return tl(i,a)||nl(i,a);if(r===`>=`)return tl(i,a)||rl(i,a);if(r===`+`){let e=Number(q(i))+Number(q(a));return Number.isNaN(e)?NaN:e}if(r===`-`){let e=Number(q(i))-Number(q(a));return Number.isNaN(e)?NaN:e}if(r===`*`){let e=Number(q(i))*Number(q(a));return Number.isNaN(e)?NaN:e}return null}evalFunction(e,t,n,r){let i=e.toLowerCase();if(i===`current`)return n.current;if(i===`not`)return t.length===1?!K(this.eval(t[0],n,r)):null;if(i===`true`)return!0;if(i===`false`)return!1;if(i===`count`){if(t.length!==1)return 0;let e=this.eval(t[0],n,r);return Qc(e)?e.length:e==null?0:1}if(i===`string`){if(t.length!==1)return``;let e=q(this.eval(t[0],n,r));return e==null?``:String(e)}if(i===`number`){if(t.length!==1)return NaN;let e=q(this.eval(t[0],n,r)),i=Number(e);return Number.isNaN(i)?NaN:i}if(i===`boolean`)return t.length===1&&K(this.eval(t[0],n,r));if(i===`string-length`){if(t.length!==1)return 0;let e=q(this.eval(t[0],n,r));return e==null?0:String(e).length}if(i===`concat`)return t.map(e=>String(q(this.eval(e,n,r))??``)).join(``);if(i===`translate`){if(t.length!==3)return``;let e=String(q(this.eval(t[0],n,r))??``),i=String(q(this.eval(t[1],n,r))??``),a=String(q(this.eval(t[2],n,r))??``);if(i.length===0)return e;let o=new Map;for(let e=0;e<i.length;e+=1)o.set(i[e],e<a.length?a[e]:null);let s=``;for(let t of e){if(!o.has(t)){s+=t;continue}let e=o.get(t);e!=null&&(s+=e)}return s}if(i===`deref`){if(t.length!==1)return[];let e=n.current??r,i=this.eval(t[0],n,e),a=Qc(i)?i:Zc(i)?[i]:[],o=[];for(let e of a){let t=e.schema?.data?.type;if(!t||t.name!==`leafref`)continue;let r=t.path;if(!r||r.kind!==`path`)continue;let i=this.evalPath(r,n,e);for(let t of i)t.data===e.data&&o.push(t)}return o}if(i===`derived-from`||i===`derived-from-or-self`){if(t.length!==2)return!1;let e=n.root?.schema;if(!(e instanceof ea))return!1;let a=e,o=n.current??r,s=this.eval(t[0],n,o);if(Qc(s)){if(s.length===0)return!1;s=s[0].data}else s=Zc(s)?s.data:q(s);if(typeof s!=`string`)return!1;let c=q(this.eval(t[1],n,o));return typeof c==`string`?i===`derived-from`?Yc(a,s,c):Xc(a,s,c):!1}return null}};function ll(e){if(e===null)return`null`;let t=typeof e;if(t===`undefined`)return`undefined`;if(typeof e==`string`){let t=e;return t.length>100?`string(len=${t.length}):${JSON.stringify(t.slice(0,80))}\u2026`:JSON.stringify(t)}if(t===`number`||t===`boolean`||t===`bigint`)return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(t===`object`)try{let t=JSON.stringify(e);return t.length>160?`${t.slice(0,160)}\u2026`:t}catch{return`[object]`}return String(e)}function ul(e,t,n){e&&console.debug(`[xYang:type-validation] ${t}`,n)}function dl(e,t){let n=t&&typeof t.prefix==`string`&&t.prefix?t.prefix:void 0;return n?{prefix:n,name:e}:{name:e}}var fl=class{constructor(e,t={}){this.module=e,this.typeValidationDebug=t.typeValidationDebug===!0}module;system=new Vi;typeValidationDebug;lookupTypedef(e){if(e.prefix){let t=Ec(this.module.data,e.prefix);if(!t)return;let n=t.typedefs?.[e.name];return n?.type&&typeof n.type.name==`string`?n:void 0}let t=this.module.typedefs[e.name];if(t?.type&&typeof t.type.name==`string`)return t}resolveUnderlyingBuiltinName(e,t){let n=new Set,r=dl(e,t);for(;n.size<64;){let e=this.lookupTypedef(r);if(!e?.type||typeof e.type.name!=`string`)return r.name;if(e.type.name===`union`)return Ji(r);let t=Ji(r);n.add(t);let i=dl(e.type.name,e.type);if(Ji(i)===t)return r.name;r=i}return r.name}validate(e,t,n){let r,i,a=dl(t,n),o=this.lookupTypedef(a);if(o?.type&&typeof o.type.name==`string`){let t=new Mi(o.type);o.type.name===`union`?(r=`typedef-union`,i=this.validateUnion(e,t)):this.lookupTypedef(dl(o.type.name,o.type))?(r=`typedef`,i=this.validate(e,o.type.name,o.type)):(r=`typedef`,i=this.system.validate(e,o.type.name,t))}else{let a=new Mi(n);t===`union`&&(a.types?.length??0)>0?(r=`inline-union`,i=this.validateUnion(e,a)):(r=`direct`,i=this.system.validate(e,t,a))}return ul(this.typeValidationDebug,`TypeChecker.validate`,{module:this.module.name??`(anonymous)`,typeName:t,via:r,ok:i[0],reason:i[1],value:ll(e)}),i}validateUnion(e,t){ul(this.typeValidationDebug,`TypeChecker.validateUnion`,{module:this.module.name??`(anonymous)`,memberCount:t.types?.length??0,value:ll(e)});for(let n of t.types??[]){let t=n,r=typeof t.name==`string`?t.name:`string`,[i]=this.validate(e,r,t);if(i)return[!0,null]}return[!1,`Value does not match any union member type`]}},pl=class{xpath=new cl;xpathCache=new Map;rootCtx;enabledFeaturesOverride;contextStack=[];typeValidationDebug;constructor(e,t={}){this.enabledFeaturesOverride=t.enabledFeaturesByModule??null,this.typeValidationDebug=t.typeValidationDebug===!0;let n=t.constraintChecks??!0,r=t.leafTypeMode??(n?`full`:`none`),i=e.data;this.rootCtx={module:e,typeChecker:new fl(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:n,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:Fc(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new fl(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){let e=this.contextStack[this.contextStack.length-1];if(!e)throw Error(`DocumentValidator: internal error — no active validation context`);return e}enableExtension(e,t){if(e!==`anydata_validation`)throw Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=na(t)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,t){this.contextStack.push(e);try{let n=[],r=[];if(!t||typeof t!=`object`||Array.isArray(t))return[!1,[`Document must be an object`],r];let i=t,a={data:i,schema:e.module,parent:null};for(let t of e.module.statements){if(!t.name)continue;let e=this.effectiveKeyword(t);[`container`,`list`,`leaf`,`leaf-list`,`anydata`,`anyxml`,`choice`].includes(e)&&this.validateStatement(t,i[t.name],t.name,n,a,a)}return[n.length===0,n,r]}finally{this.contextStack.pop()}}validateStatement(e,t,n,r,i,a){let o=this.effectiveKeyword(e),s={data:t,schema:e,parent:i};if(o===`choice`){this.validateChoice(e,i.data,n,r,i,a);return}if(o===`case`){if(!i.data||typeof i.data!=`object`||Array.isArray(i.data))return;let t=i.data;for(let o of e.statements)o.name&&this.validateStatement(o,t[o.name],`${n}.${o.name}`,r,i,a);return}let c=e.data.if_features;if(!Mc(Array.isArray(c)?c:[],this.ctx.ifFeatureCtx,this.ctx.enabledByModule))t!==void 0&&r.push(`${n}: Node '${e.name??`node`}' is present but its 'if-feature' condition is false \u2014 this node must not exist`);else if(!this.ctx.constraintChecks||this.checkWhen(e,t,n,r,s,a,i)){if(o===`container`){if(t===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,n,r,s,a);return}if(!t||typeof t!=`object`||Array.isArray(t)){r.push(`${n}: container must be an object`);return}let i=t;this.ctx.constraintChecks&&this.checkMust(e,s,a,n,r);for(let t of e.statements)this.effectiveKeyword(t)===`choice`?this.validateChoice(t,i,`${n}.${t.name??`choice`}`,r,s,a):t.name&&this.validateStatement(t,i[t.name],`${n}.${t.name}`,r,s,a);this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,i,n,r)}else if(o===`list`){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: list must be an array`);return}let o=typeof e.data.key==`string`?e.data.key.trim():``,s=o.length>0?o.split(/\s+/).map(e=>e.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&s.length>0&&this.checkListKeyUniqueness(t,s,e.name??`list`,n,r))return;for(let o=0;o<t.length;o+=1){let s=t[o];if(!s||typeof s!=`object`||Array.isArray(s)){r.push(`${n}[${o}]: list item must be an object`);continue}let c={data:s,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,c,a,`${n}[${o}]`,r);let l=s;for(let t of e.statements)this.effectiveKeyword(t)===`choice`?this.validateChoice(t,l,`${n}[${o}].${t.name??`choice`}`,r,c,a):t.name&&this.validateStatement(t,l[t.name],`${n}[${o}].${t.name}`,r,c,a);this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,l,`${n}[${o}]`,r)}}else if(o===`leaf`){let i=!!e.data.mandatory;if(t===void 0){i&&r.push(`${n}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode===`full`&&this.ctx.constraintChecks){let i=e.data.type??{},o=i.name??`string`;if(o===`leafref`)this.checkLeafref(t,i,n,r,s,a);else if(o===`instance-identifier`)this.checkInstanceIdentifier(t,i,n,r,s,a);else{let[e,a]=this.ctx.typeChecker.validate(t,o,i);ul(this.ctx.typeValidationDebug,`DocumentValidator.leaf:full`,{path:n,typeName:o,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:e,reason:a,value:ll(t)}),e||r.push(`${n}: ${a??`invalid value for type ${o}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,s,a,n,r)}else if(o===`leaf-list`){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode===`full`&&this.ctx.constraintChecks){let o=e.data.type??{},s=o.name??`string`;for(let c=0;c<t.length;c+=1){let l={data:t[c],schema:e,parent:i};if(s===`leafref`)this.checkLeafref(t[c],o,`${n}[${c}]`,r,l,a);else if(s===`instance-identifier`)this.checkInstanceIdentifier(t[c],o,`${n}[${c}]`,r,l,a);else{let[e,i]=this.ctx.typeChecker.validate(t[c],s,o);ul(this.ctx.typeValidationDebug,`DocumentValidator.leaf-list:full`,{path:`${n}[${c}]`,typeName:s,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:e,reason:i,value:ll(t[c])}),e||r.push(`${n}[${c}]: ${i??`invalid value for type ${s}`}`)}this.checkMust(e,l,a,`${n}[${c}]`,r)}}}else if(o===`anydata`||o===`anyxml`){let i=!!e.data.mandatory;if(t===void 0){i&&r.push(`${n}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,s,a,n,r),o===`anydata`&&this.runAnydataSubtreeValidation(e,t,n,r)}}}collectSchemaInstanceKeys(e,t){if(!e)return;let n=this.effectiveKeyword(e);if(n===`choice`){for(let n of e.statements??[])if(n.keyword===`case`)for(let e of n.statements??[])this.collectSchemaInstanceKeys(e,t)}else if(n===`list`)e.name&&t.add(e.name);else if(n===`container`){let n=e.statements??[];(n.length!==1||this.effectiveKeyword(n[0])!==`choice`)&&e.name&&t.add(e.name);for(let e of n)this.collectSchemaInstanceKeys(e,t)}else e.name&&t.add(e.name)}rejectUnknownContainerKeys(e,t,n,r){if(e.data.presence||e.name!==`array`)return;let i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!==`choice`)return;let a=new Set;if(this.collectSchemaInstanceKeys(i[0],a),a.size!==0)for(let e of Object.keys(t))a.has(e)||r.push(`${n}: Unknown field '${e}'`)}rejectUnknownListItemKeys(e,t,n,r){let i=this.collectDirectChildKeys(e);if(i.size!==0)for(let e of Object.keys(t))i.has(e)||r.push(`${n}: Unknown field '${e}'`)}collectDirectChildKeys(e){let t=new Set,n=e=>{let r=this.effectiveKeyword(e);if(r===`choice`||r===`case`)for(let t of e.statements??[])n(t);else e.name&&t.add(e.name)};for(let t of e.statements??[])n(t);return t}validateChoice(e,t,n,r,i,a){if(!t||typeof t!=`object`||Array.isArray(t)){e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`);return}let o=t,s=Mc(Array.isArray(e.data.if_features)?e.data.if_features:[],this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!s&&this.choiceHasBranchData(e,o)){r.push(`${n}: Choice '${e.name??`choice`}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}if(!s||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,n,r,i,a,i))return;let c=e.statements.filter(e=>e.keyword===`case`),l=[],u=!1;for(let t of c)if(this.caseHasAnyData(t,o)){if(!Mc(Array.isArray(t.data.if_features)?t.data.if_features:[],this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${n}: Case '${t.name??`case`}' of choice '${e.name??`choice`}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}this.ctx.constraintChecks&&!this.checkWhen(t,!0,`${n}.${t.name??`case`}`,r,i,a,i)?u=!0:l.push(t)}if(l.length>1){let t=l.map(e=>e.name??`<unnamed>`).join(`, `);r.push(`${n}: choice '${e.name??`choice`}' allows only one case, but multiple are active: ${t}`);return}let d=l[0];if(d)for(let e of d.statements)e.name&&this.validateStatement(e,o[e.name],`${n}.${e.name}`,r,i,a);else{if(u)return;e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`)}}choiceHasBranchData(e,t){return e.statements.filter(e=>e.keyword===`case`).some(e=>this.caseHasAnyData(e,t))}caseHasAnyData(e,t){return e.statements.some(e=>this.statementHasMatchingData(e,t))}statementHasMatchingData(e,t){let n=this.effectiveKeyword(e);return[`leaf`,`leaf-list`,`container`,`list`,`anydata`,`anyxml`].includes(n)?!!(e.name&&t[e.name]!==void 0):n===`choice`?this.choiceHasBranchData(e,t):n===`case`&&this.caseHasAnyData(e,t)}effectiveKeyword(e){let t=e.keyword??``;if(t.includes(`:`)){let t=e.data.data_node_kind;if(t===`container`||t===`list`)return t}return t}checkListKeyUniqueness(e,t,n,r,i){if(t.length===0)return!1;let a=new Map;for(let o=0;o<e.length;o+=1){let s=e[o];if(!s||typeof s!=`object`||Array.isArray(s))continue;let c=s,l=t.map(e=>c[e]),u=JSON.stringify(l);if(a.has(u)){let e=a.get(u),s=t.map(e=>`${e}='${String(c[e])}'`).join(`, `);return i.push(`${r}: Duplicate key in list '${n}': ${s} (entries at index ${e} and ${o})`),!0}a.set(u,o)}return!1}leafrefPathAst(e){let t=e.path;if(typeof t==`string`&&t.trim().length>0)try{return fo(t.trim())}catch{return null}return t&&typeof t==`object`&&!Array.isArray(t)&&t.kind===`path`?t:null}checkLeafref(e,t,n,r,i,a){let o=t.require_instance!==!1,s=this.leafrefPathAst(t);if(!s||s.kind!==`path`)o&&r.push(`${n}: leafref has no path`);else try{let t={current:i,root:a},c=this.xpath.eval(s,t,i),l=Array.isArray(c)?c:[],u=new Set;for(let e of l){if(!e||typeof e!=`object`||!(`data`in e))continue;let t=e.data;t!=null&&(typeof t==`string`||typeof t==`number`||typeof t==`boolean`)&&u.add(String(t))}if(typeof e!=`string`&&typeof e!=`number`&&typeof e!=`boolean`){r.push(`${n}: leafref value must be a string, number, or boolean`);return}let d=String(e);o&&!u.has(d)&&r.push(`${n}: leafref: value '${d}' does not reference an existing instance (require-instance is true)`)}catch(e){let t=e instanceof Error?e.message:String(e);r.push(`${n}: leafref: error evaluating path (${t})`)}}checkInstanceIdentifier(e,t,n,r,i,a){if(typeof e!=`string`){r.push(`${n}: instance-identifier value must be a string, got ${typeof e}`);return}if(t.require_instance===!1)return;let o=e.trim();if(!o){r.push(`${n}: instance-identifier path must not be empty when require-instance is true`);return}let s;try{s=uo(o)}catch(e){let t=e instanceof Error?e.message:String(e);r.push(`${n}: instance-identifier: invalid path expression (${t})`);return}if(s.kind!==`path`){r.push(`${n}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!s.isAbsolute){r.push(`${n}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}let c={current:i,root:a};try{this.xpath.evalPath(s,c,a).length===0&&r.push(`${n}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(e){let t=e instanceof Error?e.message:String(e);r.push(`${n}: instance-identifier: invalid path expression (${t})`)}}checkMust(e,t,n,r,i){let a=e.statements.filter(e=>e.keyword===`must`&&typeof e.argument==`string`);for(let o of a){let a=o.argument,s=this.xpathCache.get(a);if(!s)try{s=uo(a),this.xpathCache.set(a,s)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??`node`}'`);continue}try{let a={current:t,root:n},c=this.xpath.eval(s,a,t);if(!this.xpathBoolean(c)){let t=typeof o.data.error_message==`string`&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??`node`}'`;i.push(`${r}: ${t}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??`node`}'`)}}}checkWhen(e,t,n,r,i,a,o){let s=e.data.when,c=typeof s?.expression==`string`?s.expression:void 0;if(!c||c.trim().length===0)return!0;let l=this.xpathCache.get(c);if(!l)try{l=uo(c),this.xpathCache.set(c,l)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??`node`}'`),!1}try{let e=s?.evaluate_with_parent_context===!0?o:i,c={current:e,root:a},u=this.xpath.eval(l,c,e);return this.xpathBoolean(u)?!0:(t!==void 0&&r.push(`${n}: node is not allowed by when condition`),!1)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??`node`}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e==`boolean`?e:typeof e==`number`?e!==0&&!Number.isNaN(e):typeof e==`string`?e.length>0:e!=null}validateMandatoryChildren(e,t,n,r,i,a){let o=t&&typeof t==`object`&&!Array.isArray(t)?t:void 0;for(let t of e.statements){let e=t.keyword??``;if(![`leaf`,`anydata`,`anyxml`].includes(e)||!t.name||!Mc(Array.isArray(t.data.if_features)?t.data.if_features:[],this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!t.data.mandatory)continue;let s=o?.[t.name],c={data:s,schema:t,parent:i};this.ctx.constraintChecks&&!this.checkWhen(t,s,`${n}.${t.name}`,r,c,a,i)||o&&o[t.name]!==void 0||r.push(`${n}.${t.name}: mandatory ${e} is missing`)}}anydataModuleMap(e){let t={};for(let n of e){let e=n.name;e&&(t[e]=n)}return t}runAnydataSubtreeValidation(e,t,n,r){if(!this.ctx.anydataValidation||!t||typeof t!=`object`||Array.isArray(t))return;let i=this.ctx.anydataValidation.mode,a=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(a),s=t;for(let[e,t]of Object.entries(s)){let{statementName:a,moduleName:s}=bi(e,o);if(!a||!s){r.push(`${n}.${e}: Unknown anydata member '${e}': no matching module:identifier in the provided modules`);continue}let c=o[s],l=c?.findStatement(a);if(!l){r.push(`${n}.${e}: Unknown anydata member '${e}'`);continue}if(l.keyword===`leaf`){r.push(`${n}.${e}: anydata member '${e}' maps to a leaf; nested subtree validation expects a container or list`);continue}let u={[a]:t},d=c.data,f={module:c,typeChecker:new fl(c,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i===`complete`,leafTypeMode:i===`complete`?`full`:`none`,typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:d,enabledByModule:Fc(d,this.enabledFeaturesOverride)},[p,ee]=this.validateWithContext(f,u);if(!p)for(let t of ee)r.push(`${n}.${e}: ${t}`)}}},ml=class{constructor(e,t={}){this.module=e,this.documentValidator=new pl(e,{enabledFeaturesByModule:t.enabledFeaturesByModule??null,typeValidationDebug:t.typeValidationDebug})}module;documentValidator;setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,t){this.documentValidator.enableExtension(e,t)}enable_extension(e,t){this.enableExtension(e,t)}validate(e){let[t,n,r]=this.documentValidator.validate(e);return{isValid:t,errors:n,warnings:r}}},hl,gl;function _l(){if(!import.meta.url.startsWith(`file:`))return`/yang`;let e=vi.dirname(yi(import.meta.url));return vi.resolve(e,`../../../../yang`)}function vl(e=_l()){if(hl&&gl===e)return hl;let t=vi.join(e,`netlab-topology.yang`),n=new Sc({include_path:[e,vi.join(e,`modules`)],expand_uses:!0}),r=n.parseFile(t);for(let t of[`netlab-internal.yang`,`modules/netlab-ospf.yang`,`modules/netlab-bgp.yang`,`modules/netlab-vlan.yang`,`modules/netlab-vrf.yang`,`modules/netlab-isis.yang`,`modules/netlab-vxlan.yang`,`modules/netlab-evpn.yang`]){let r=vi.join(e,t);try{n.parseFile(r)}catch(e){if(e?.code!==`ENOENT`)throw e}}return hl=r,gl=e,hl}function yl(e){return new ml(vl(e))}function bl(e){let t=e.nodes??{},n=Object.entries(t).map(([e,t])=>{let n={...t,name:t.name??e};return Array.isArray(n.interfaces)&&(n.interfaces=n.interfaces.map(e=>{let t={...e};return Array.isArray(t.neighbors),t})),n.vlans&&typeof n.vlans==`object`&&!Array.isArray(n.vlans)&&(n.vlans=xl(n.vlans)),n.vrfs&&typeof n.vrfs==`object`&&!Array.isArray(n.vrfs)&&(n.vrfs=xl(n.vrfs)),Cl(n),n}),r=(e.links??[]).map((e,t)=>{let n={...e};n.linkindex===void 0&&(n.linkindex=t+1);let r=n[D];return typeof r==`string`?(n._linkname=r,delete n[D]):n._linkname,Cl(n),n}),i=e.groups?Object.entries(e.groups).map(([e,t])=>({...t,name:t.name??e})):void 0,a=Sl(e.addressing),o={nodes:n,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),a&&(o.addressing=a),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=xl(e.vlans)),e.vrfs&&(o.vrfs=xl(e.vrfs));let s={topology:o},c=s.topology;return Array.isArray(e[`netlab-internal:_Providers`])&&(c[`${Fr}:_Providers`]=e[`${Fr}:_Providers`]),s}function xl(e){return!e||typeof e!=`object`||Array.isArray(e)?[]:Object.entries(e).map(([e,t])=>({...typeof t==`object`&&t&&!Array.isArray(t)?t:{},name:e}))}function Sl(e){if(e&&typeof e==`object`&&!Array.isArray(e))return{pool:Object.entries(e).map(([e,t])=>({...typeof t==`object`&&t&&!Array.isArray(t)?t:{},name:e}))}}function Cl(e){let t=`${Fr}:`;for(let n of Object.keys(e))if(n.startsWith(t)){let r=n.slice(t.length);e[r]===void 0&&(e[r]=e[n]),delete e[n]}}function wl(e,t,n={}){e.stage=t;let r=yl(n.yangDir??_l()),i=bl(e),a=r.validate(i);if(n.diagnostics){for(let e of a.errors)n.diagnostics.error(Kr(e));for(let e of a.warnings)n.diagnostics.warning(Kr(e))}return{ok:a.isValid,errors:a.errors,warnings:a.warnings}}var Tl={frr:`---
description: FRR container
interface_name: eth{ifindex}
mgmt_if: eth0
loopback_interface_name: lo{ifindex if ifindex else ""}
tunnel_interface_name: "tun{ifindex}"
lag_interface_name: "bond{lag.ifindex}"
role: router
routing:
  _rm_per_af: True
sr:
  srgb:
    start: 24000
    size: 8000
group_vars:
  ansible_network_os: frr
  ansible_python_interpreter: auto_silent
  netlab_initial: always
  netlab_linux_packages:
    gnupg: gpg
    curl: curl
    iproute2: bridge
  netlab_frr_daemons:
    bfd: [ bfdd ]
    bgp: [ bgpd ]
    ospf: [ ospfd, ospf6d ]
    ripv2: [ ripd, ripngd ]
    isis: [ isisd ]
    vrf: [ bgpd ]
    gateway: [ vrrpd ]
    mpls: [ ldpd ]
mtu: 1500
clab:
  group_vars:
    ansible_connection: docker
    ansible_user: root
    netlab_show_command: [ vtysh, -c, 'show $@' ]
    netlab_mgmt_vrf: True
    netlab_config_mode: sh
    netlab_default_shebang: '#!/usr/bin/vtysh -f'
    netlab_config_exec: [ sleep 1 ]     # FRR daemons need a bit of time before they can be configured
  features:
    initial:
      config_mode: [ sh ]
  image: quay.io/frrouting/frr:10.6.1
  kmods:
    initial: [ 'vrf?' ]
  node:
    kind: linux
    config_templates:
      daemons: /etc/frr/daemons
      hosts: /etc/hosts:shared

libvirt:
  image: debian/bookworm64
  create_image: netlab/frr
  create_template: frr.xml.j2
  create_iso: frr
  group_vars:
    ansible_connection: paramiko
    ansible_user: vagrant
    ansible_ssh_pass: vagrant
    ansible_ssh_private_key_file: .vagrant/machines/{{ inventory_hostname }}/libvirt/private_key
    netlab_show_command: [ sudo, vtysh, -c, 'show $@' ]

external:
  image: none
features:
  initial:
    ipv4:
      unnumbered: true
    ipv6:
      lla: true
      use_ra: true
    ra: true
    roles: [ host, router, bridge ]
    generate_mac: [ svi ]
    collect: true
    reload: true
  bfd: True
  bgp:
    activate_af: true
    advertise: true
    ipv6_lla: true
    rfc8950: true
    local_as: true
    local_as_ibgp: true
    vrf_local_as: true
    import: [ ospf, ripv2, isis, connected, static, vrf ]
    community:
      standard: [ standard, large ]
      large: [ large ]
      extended: [ extended ]
      2octet: [ standard ]
    confederation: True
    allowas_in: true
    as_override: true
    bfd: true
    default_originate: true
    description: true
    gr: true
    gtsm: true
    passive: true
    password: true
    remove_private_as.valid: [ 'on', all, replace ]
    rs: true
    rs_client: true
    role: true
    timers: true
    _default_locpref: true
    aggregate: true
    bandwidth:
      in: int
      out: int
    multihop.vrf: true
  evpn:
    irb: true
    asymmetrical_irb: True
    multi_rt: True
    transport: [ vxlan ]
    ipv6: True
  gateway:
    protocol: [ vrrp, anycast ]
  isis:
    circuit_type: true
    import: [ bgp, ripv2, ospf, connected, static, vrf ]
    unnumbered:
      ipv4: true
      ipv6: true
      network: true
  lag:
    passive: False
  mpls:
    ldp: true
    vpn:
      ipv4: true
  ospf:
    unnumbered: true
    import: [ bgp, ripv2, isis, connected, static, vrf ]
    default: true
    gr: [ ipv4, ipv6 ]
    password: true
    priority: true
    timers: true
    areas: true
  ripv2:
    ipv4: true
    ipv6: true
    passive: true
    import: [ bgp, isis, ospf, connected, static, vrf ]
  routing:
    policy:
      set:
        locpref: True
        med: True
        weight: True
        prepend: True
        community:
          standard: True
          large: True
          extended: True
          append: True
      match:
        prefix: True
        nexthop: True
        aspath: True
        community:
          standard: True
          large: True
      delete:
        community: clist
    prefix: True
    aspath: True
    community:
      standard: True
      large: True
    static:
      vrf: True
      inter_vrf: True
      discard: True
  sr:
    af: [ ipv4, ipv6 ]
    protocol: [ isis, ospfv2 ]
  srv6:
    bgp: true
    isis: true
    vpn: true
  stp:
    supported_protocols: [ stp ]  # Implementation uses a separate bridge per VLAN
    enable_per_port: False
  tunnel:
    gre: [ vrf ]
    wireguard: [ vrf ]
  vlan:
    mixed_trunk: true
    model: router
    native_routed: true
    subif_name: '{ifname}.{vlan.access_id}'
    svi_interface_name: vlan{vlan}
  vrf:
    keep_module: true
    ospfv2: True
    ospfv3: True
    ripv2: True
    ripng: True
    bgp: True
    isis: True
  vxlan:
    vtep6: true

graphite.icon: router

attributes:
  global:
    frr:
      debug: { type: list, split_lines: True }
      daemons: { type: list, _subtype: str }
      logfile: str
  node:
    frr:
      debug: { type: list, split_lines: True }
      daemons: { type: list, _subtype: str }
      logfile: str
`,ios:`---
description: Generic Cisco IOS device (meta device, used only as parent)
_meta_device: True
template: True
attributes:
  global:
    ios:
      debug: { type: list, split_lines: True }
  node:
    ios:
      debug: { type: list, split_lines: True }

loopback_interface_name: Loopback{ifindex}
tunnel_interface_name: Tunnel{ifindex}
group_vars:
  ansible_become_method: enable
  ansible_network_os: ios
  ansible_connection: network_cli
  # yamllint disable-line rule:line-length
  netlab_ssh_args: "-o KexAlgorithms=+diffie-hellman-group-exchange-sha1 -o PubkeyAcceptedKeyTypes=ssh-rsa -o HostKeyAlgorithms=+ssh-rsa"

clab:
  group_vars:
    ansible_ssh_pass: admin
    ansible_user: admin
    ansible_become_password: admin
    netlab_check_retries: 50
    netlab_ready: [ ssh ]
  features:
    initial:
      config_mode: [ startup ]

role: router
routing:
  _rm_per_af: True
evpn._start_transit_vlan: 3800
features:
  bfd: true
  bgp:
    activate_af: true
    advertise: true
    local_as: true
    vrf_local_as: true
    local_as_ibgp: true
    import: [ ospf, isis, ripv2, connected, static, vrf ]
    community:
      standard: [ standard ]
      extended: [ extended ]
    confederation: True
    allowas_in: true
    as_override: true
    bfd: true
    default_originate: true
    gtsm: true
    passive: true
    password: true
    remove_private_as.valid: [ 'on', all, replace ]
    rs: true
    rs_client: true
    timers: true
    _default_locpref: true
    aggregate: true
    bandwidth:
      in: auto
    multihop.vrf: true
  dhcp:
    client:
      ipv4: true
      ipv6: true
      routing: true
    relay: true
    vrf: true
    server: true
  eigrp: true
  initial:
    ipv4:
      unnumbered: [ tunnel ]
    ipv6:
      lla: true
      use_ra: true
    roles: [ host, router, bridge ]
    mgmt_vrf: true
    ra: true
    collect: true
    reload: true
  isis:
    circuit_type: true
    import: [ bgp, ospf, ripv2, connected, static ]
    unnumbered:
      ipv4: true
      ipv6: true
      network: true
  mpls:
    ldp: true
    bgp: true
    vpn: true
    6pe: true
  ospf:
    unnumbered: true
    import: [ bgp, isis, ripv2, connected, static, vrf ]
    default.policy: true
    password: true
    priority: true
    timers: true
    areas:
      external_range: Cisco IOS cannot configure NSSA type-7 ranges
      external_filter: Cisco IOS cannot suppress NSSA type-7 ranges
  ripv2:
    ipv4: true
    ipv6: true
    passive: true
    unnumbered: true
    import: [ bgp, isis, ospf, connected, static, vrf ]
  routing:
    policy:
      set:
        locpref: True
        med: True
        weight: True
        prepend: True
        community:
          standard: True
          append: True
      delete:
        community: clist
      match:
        prefix: True
        nexthop: True
        aspath: True
        community:
          standard: True
    prefix.strict: True
    aspath: True
    community:
      standard: True
    static:
      vrf: True
      inter_vrf: True
      discard: True
  tunnel:
    gre: [ vrf ]
  vlan:
    model: router
    svi_interface_name: BVI{bvi}
    subif_name: "{ifname}.{subif_index}"
    mixed_trunk: true
    native_routed: true
  vrf:
    ospfv2: True
    ospfv3: True
    bgp: True
    ripv2: True
    ripng: True
  gateway:
    protocol: [ vrrp ]
external:
  image: none
graphite.icon: router
`,iosv:`---
description: Cisco IOSv
parent: ios
interface_name: GigabitEthernet0/{ifindex}
group_vars:
  netlab_device_type: ios
  ansible_user: vagrant
  ansible_ssh_pass: vagrant
  ansible_become_password: vagrant
libvirt:
  image: cisco/iosv
  build: https://netlab.tools/labs/iosv/
  create_template: iosv.xml.j2
features:
  initial:
    min_mtu: 64
    max_mtu: 9600
clab:
  image: vrnetlab/cisco_vios:15.9.3
  node:
    kind: cisco_vios
  interface.name: eth{ifindex}
  build: https://github.com/srl-labs/vrnetlab/tree/master/vios
`,linux:`description: Generic Linux host
interface_name: eth{ifindex}
lag_interface_name: "bond{lag.ifindex}"
loopback_interface_name: lo{ifindex if ifindex else ""}
mgmt_if: eth0
role: host
features:
  lag:
    passive: False
  routing:
    static: true
  initial:
    collect: false
    reload: false
    ipv4:
      unnumbered: peer
    ipv6:
      lla: true
      use_ra: true
    roles: [ host ]
libvirt:
  image: bento/ubuntu-24.04
  create_image: netlab/linux
  create_template: frr.xml.j2
  create_iso: linux
  group_vars:
    netlab_linux_distro: ubuntu
  features:
    dhcp:
      client:
        ipv4: true
        ipv6: true
      server: true
      relay:
        ipv4: true
group_vars:
  ansible_network_os: linux
  ansible_connection: paramiko
  ansible_user: vagrant
  ansible_ssh_pass: vagrant
  docker_shell: sh -il
  ansible_python_interpreter: auto_silent
  netlab_lldp_enable: False
  netlab_net_tools: False
clab:
  node_config:
    initial: :ns
    lag: :ns
    vlan: :ns
    routing: :ns
  features:
    initial:
      roles: [ host, bridge ]
      generate_mac: [ svi ]
      config_mode: [ sh ]
    vlan:
      mixed_trunk: true
      model: router
      native_routed: true
      subif_name: '{ifname}.{vlan.access_id}'
      svi_interface_name: vlan{vlan}
  image: python:3.13-alpine
  mtu: 1500
  kmods:
  node:
    kind: linux
    config_templates:
      hosts: /etc/hosts:shared
  group_vars:
    ansible_connection: docker
    ansible_user: root
    netlab_linux_distro: vanilla
external:
  image: none
graphite.icon: server
`,none:`---
description: Dummy device used to test topology transformation
_meta_device: True
#
# Most features are enabled on the dummy device -- this file is a pretty
# good template if you want to figure out what device features there are.
#
interface_name: eth{ifindex}
lag_interface_name: bond{lag.ifindex}
loopback_interface_name: Loopback{ifindex}
tunnel_interface_name: Tunnel{ifindex}
libvirt:
  image: none
clab:
  image: none
external:
  image: none
group_vars:
  ansible_connection: paramiko_ssh
  ansible_network_os: none
features:
  bfd: True
  bgp:
    activate_af: True
    advertise: True
    aggregate: true
    local_as: True
    vrf_local_as: True
    local_as_ibgp: True
    role: True
    ipv6_lla: True
    rfc8950: True
    bandwidth: True
    multihop.vrf: True
    allowas_in: True
    as_override: True
    bfd: True
    default_originate: True
    description: True
    gr: True
    gtsm: True
    passive: True
    password: True
    remove_private_as: True
    rs_client: True
    rs: True
    tcp_ao: [ libvirt, external ]
    timers: True
    import: [ ospf, isis, ripv2, connected, static, vrf ]
    confederation: True
  dhcp:
    client:
      ipv4: true
      ipv6: true
      routing: true
    relay: true
    vrf: true
    server: true
  eigrp: true
  evpn:
    irb: true
    asymmetrical_irb: true
    bundle: [ vlan_aware ]
    multi_rt: true
    ipv6: true
    transport: [ vxlan, mpls, sr ]
  gateway:
    protocol: [ anycast, vrrp ]
  initial:
    ipv4:
      unnumbered: True
    ipv6:
      lla: True
    mgmt_vrf: True
    ra: True
    roles: [ router, bridge, host ]
    collect: True
    reload: True
  isis:
    import: [ bgp, ospf, ripv2, connected, vrf ]
    vrf: True
    unnumbered:
      ipv4: True
      ipv6: True
      network: True
  lag:
    mlag: True
    passive: True
  mpls:
    ldp: True
    bgp: True
    vpn: True
    6pe: True
  ospf:
    areas: true
    unnumbered: True
    import: [ bgp, isis, ripv2, connected, static, vrf ]
    default.policy: true
    gr: [ ipv4, ipv6 ]
    password: true
    priority: true
    timers: true
  ripv2:
    ipv4: true
    ipv6: true
    passive: true
    import: [ bgp, isis, ospf, connected, vrf ]
  routing:
    policy:
      set:
        locpref: True
        med: True
        weight: True
        prepend: True
        community: True
      match:
        prefix: True
        nexthop: True
        aspath: True
        community:
          standard: True
          large: True
      delete:
        community: True
    prefix: True
    aspath: True
    community:
      standard: True
      large: True
    static:
      vrf: True
      inter_vrf: True
      discard: True
  sr:
    af: [ ipv4, ipv6 ]
    protocol: [ isis, ospfv2 ]
  srv6:
    isis: True
    ospf: True
    bgp: True
    vpn: True
  stp:
    supported_protocols: [ stp, rstp, mstp, pvrst ]
    enable_per_port: True
    port_type: True
  vlan:
    model: router
    subif_name: '{ifname}.{subif_index}'
    svi_interface_name: Vlan{vlan}
    mixed_trunk: True
    native_routed: True
  vrf:
    ospfv2: True
    ospfv3: True
    bgp: True
    ripv2: True
    ripng: True
    isis: True
  vxlan:
    vtep6: true
  tunnel:
    gre: [ vrf ]
    wireguard: [ vrf ]
`},El={bird:`---
description: BIRD Internet Routing Daemon
group_vars:
  netlab_import_map:
    bgp: RTS_BGP
    ospf: RTS_OSPF
    connected: RTS_DEVICE
    static: RTS_STATIC_DEVICE,RTS_STATIC
packages:
  bird: bird
daemon_config:
  bird: /etc/bird/bird.conf
  bfd: /etc/bird/bfd.conf
  bgp: /etc/bird/bgp.mod.conf
  bgp@session: /etc/bird/bgp.session.conf
  bgp@policy: /etc/bird/bgp.policy.conf
  ospf@areas: /etc/bird/ospf.areas.conf
  ospf: /etc/bird/ospf.mod.conf
  routing: /etc/bird/routing.mod.conf
  evpn: /etc/bird/evpn.mod.conf
clab:
  group_vars:
    netlab_show_command: [ birdcl, 'show $@' ]
    docker_shell: bash -il
    netlab_config_mode: sh
    netlab_start_daemon: "/usr/sbin/bird -d -c /etc/bird/bird.conf"
  image: netlab/bird:latest
  build: True
  sw_version: 2.19.1
  sw_download_url: https://bird.nic.cz/download/bird-{sw_version}.tar.gz
  features:
    initial:
      roles: [ host, router ]
      config_mode: [ sh ]
      dataplane_config: [ vxlan, vrf ]
      extra_daemon_config:
        vrf: /etc/bird/vrf.mod.conf
libvirt:                        # Not yet available on libvirt or virtualbox
  image:
virtualbox:
  image:
features:
  bfd: true
  bgp:
    activate_af: true
    advertise: true
    ipv6_lla: false             # Bird supports dynamic neighbors using 'range', but not active discovery based on RAs
    rfc8950: true
    local_as: true
    vrf_local_as: true
    local_as_ibgp: true
    community:
      standard: [ standard, large ]
      large: [ large ]
      extended: [ extended ]
      2octet: [ standard ]
    import: [ ospf, connected, static, vrf ]
    bfd: true
    default_originate: static
    gtsm: true
    passive: true
    password: true
    remove_private_as: true
    rs: true
    rs_client: true
    role: true
    confederation: true
    timers: true
  ospf:
    import: [ bgp, connected, static, vrf ]
    default: true
    gr: [ ipv4, ipv6 ]
    password: true
    priority: true
    timers: true
    unnumbered: true
    areas: true
  routing:
    static:
      vrf: true
      inter_vrf: true
      discard: true
  dhcp: false
  gateway:
    protocol: [ anycast ]
  initial:
    ipv4:
      unnumbered: peer
    ipv6:
      lla: true
    reload: false
    roles: [ host, router ]
  vxlan:
    vtep6: true
  vrf:
    ospfv2: true
    ospfv3: true
    bgp: true
  evpn:
    transport: [ vxlan ]
`};new Set(Ir);var Dl;function Ol(e){let t={};for(let[n,r]of Object.entries(e))t[n]={...$n(r)??{},name:n};return t}function kl(e,t){for(let[n,r]of Object.entries(t)){if(e[n])throw Error(`duplicate name ${n} for a device and a daemon`);let t={...r,name:n,daemon:!0};t.parent||=`linux`,e[n]=t}}function Al(e){let t={},n=new Set;function r(i){if(t[i])return t[i];if(n.has(i))return e[i]??{name:i};n.add(i);let a=e[i]??{name:i},o=typeof a.parent==`string`?a.parent:void 0,s={...a,name:i};return o&&e[o]&&(s=O(r(o),{...a,name:i}),a.daemon!==void 0&&(s.daemon=a.daemon),s.parent=o),n.delete(i),t[i]=s,s}for(let t of Object.keys(e))r(t);return t}function jl(){if(Dl)return Dl;let e=Ol(Tl);kl(e,Ol(El));let t=Al(e);for(let e of Object.values(t)){if(e.clab&&typeof e.clab==`object`){let t=e.clab;t.features&&(e.features=O(e.features??{},t.features))}delete e.libvirt,delete e.virtualbox,delete e.external}return Dl=t,t}function Ml(e){return jl()[e]??{name:e,interface_name:`eth{ifindex}`,role:`router`}}var J=l(o(((e,t,n)=>{(function(e){let n=`(0?\\d+|0x[a-f0-9]+)`,r={fourOctet:RegExp(`^${n}\\.${n}\\.${n}\\.${n}$`,`i`),threeOctet:RegExp(`^${n}\\.${n}\\.${n}$`,`i`),twoOctet:RegExp(`^${n}\\.${n}$`,`i`),longValue:RegExp(`^${n}$`,`i`)},i=RegExp(`^0[0-7]+$`,`i`),a=RegExp(`^0x[a-f0-9]+$`,`i`),o=`%[0-9a-z]{1,}`,s=`(?:[0-9a-f]+::?)+`,c={zoneIndex:RegExp(o,`i`),native:RegExp(`^(::)?(${s})?([0-9a-f]+)?(::)?(${o})?$`,`i`),deprecatedTransitional:RegExp(`^(?:::)(${n}\\.${n}\\.${n}\\.${n}(${o})?)$`,`i`),transitional:RegExp(`^((?:${s})|(?:::)(?:${s})?)${n}\\.${n}\\.${n}\\.${n}(${o})?$`,`i`)};function l(e,t){if(e.indexOf(`::`)!==e.lastIndexOf(`::`))return null;let n=0,r=-1,i=(e.match(c.zoneIndex)||[])[0],a,o;for(i&&(i=i.substring(1),e=e.replace(/%.+$/,``));(r=e.indexOf(`:`,r+1))>=0;)n++;if(e.substr(0,2)===`::`&&n--,e.substr(-2,2)===`::`&&n--,n>t)return null;for(o=t-n,a=`:`;o--;)a+=`0:`;return e=e.replace(`::`,a),e[0]===`:`&&(e=e.slice(1)),e[e.length-1]===`:`&&(e=e.slice(0,-1)),t=(function(){let t=e.split(`:`),n=[];for(let e=0;e<t.length;e++)n.push(parseInt(t[e],16));return n})(),{parts:t,zoneId:i}}function u(e,t,n,r){if(e.length!==t.length)throw Error(`ipaddr: cannot match CIDR for objects with different lengths`);let i=0,a;for(;r>0;){if(a=n-r,a<0&&(a=0),e[i]>>a!==t[i]>>a)return!1;r-=n,i+=1}return!0}function d(e){if(a.test(e))return parseInt(e,16);if(e[0]===`0`&&!isNaN(parseInt(e[1],10))){if(i.test(e))return parseInt(e,8);throw Error(`ipaddr: cannot parse ${e} as octal`)}return parseInt(e,10)}function f(e,t){for(;e.length<t;)e=`0${e}`;return e}let p={};p.IPv4=(function(){function e(e){if(e.length!==4)throw Error(`ipaddr: ipv4 octet count should be 4`);let t,n;for(t=0;t<e.length;t++)if(n=e[t],!(0<=n&&n<=255))throw Error(`ipaddr: ipv4 octet should fit in 8 bits`);this.octets=e}return e.prototype.SpecialRanges={unspecified:[[new e([0,0,0,0]),8]],broadcast:[[new e([255,255,255,255]),32]],multicast:[[new e([224,0,0,0]),4]],linkLocal:[[new e([169,254,0,0]),16]],loopback:[[new e([127,0,0,0]),8]],carrierGradeNat:[[new e([100,64,0,0]),10]],private:[[new e([10,0,0,0]),8],[new e([172,16,0,0]),12],[new e([192,168,0,0]),16]],reserved:[[new e([192,0,0,0]),24],[new e([192,0,2,0]),24],[new e([192,88,99,0]),24],[new e([198,18,0,0]),15],[new e([198,51,100,0]),24],[new e([203,0,113,0]),24],[new e([240,0,0,0]),4]],as112:[[new e([192,175,48,0]),24],[new e([192,31,196,0]),24]],amt:[[new e([192,52,193,0]),24]]},e.prototype.kind=function(){return`ipv4`},e.prototype.match=function(e,t){let n;if(t===void 0&&(n=e,e=n[0],t=n[1]),e.kind()!==`ipv4`)throw Error(`ipaddr: cannot match ipv4 address with non-ipv4 one`);return u(this.octets,e.octets,8,t)},e.prototype.prefixLengthFromSubnetMask=function(){let e=0,t=!1,n={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0},r,i,a;for(r=3;r>=0;--r)if(i=this.octets[r],i in n){if(a=n[i],t&&a!==0)return null;a!==8&&(t=!0),e+=a}else return null;return 32-e},e.prototype.range=function(){return p.subnetMatch(this,this.SpecialRanges)},e.prototype.toByteArray=function(){return this.octets.slice(0)},e.prototype.toIPv4MappedAddress=function(){return p.IPv6.parse(`::ffff:${this.toString()}`)},e.prototype.toNormalizedString=function(){return this.toString()},e.prototype.toString=function(){return this.octets.join(`.`)},e})(),p.IPv4.broadcastAddressFromCIDR=function(e){try{let t=this.parseCIDR(e),n=t[0].toByteArray(),r=this.subnetMaskFromPrefixLength(t[1]).toByteArray(),i=[],a=0;for(;a<4;)i.push(parseInt(n[a],10)|parseInt(r[a],10)^255),a++;return new this(i)}catch{throw Error(`ipaddr: the address does not have IPv4 CIDR format`)}},p.IPv4.isIPv4=function(e){return this.parser(e)!==null},p.IPv4.isValid=function(e){try{return new this(this.parser(e)),!0}catch{return!1}},p.IPv4.isValidCIDR=function(e){try{return this.parseCIDR(e),!0}catch{return!1}},p.IPv4.isValidFourPartDecimal=function(e){return!!(p.IPv4.isValid(e)&&e.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},p.IPv4.isValidCIDRFourPartDecimal=function(e){let t=e.match(/^(.+)\/(\d+)$/);return!p.IPv4.isValidCIDR(e)||!t?!1:p.IPv4.isValidFourPartDecimal(t[1])},p.IPv4.networkAddressFromCIDR=function(e){let t,n,r,i,a;try{for(t=this.parseCIDR(e),r=t[0].toByteArray(),a=this.subnetMaskFromPrefixLength(t[1]).toByteArray(),i=[],n=0;n<4;)i.push(parseInt(r[n],10)&parseInt(a[n],10)),n++;return new this(i)}catch{throw Error(`ipaddr: the address does not have IPv4 CIDR format`)}},p.IPv4.parse=function(e){let t=this.parser(e);if(t===null)throw Error(`ipaddr: string is not formatted like an IPv4 Address`);return new this(t)},p.IPv4.parseCIDR=function(e){let t;if(t=e.match(/^(.+)\/(\d+)$/)){let e=parseInt(t[2]);if(e>=0&&e<=32){let n=[this.parse(t[1]),e];return Object.defineProperty(n,"toString",{value:function(){return this.join(`/`)}}),n}}throw Error(`ipaddr: string is not formatted like an IPv4 CIDR range`)},p.IPv4.parser=function(e){let t,n,i;if(t=e.match(r.fourOctet))return(function(){let e=t.slice(1,6),r=[];for(let t=0;t<e.length;t++)n=e[t],r.push(d(n));return r})();if(t=e.match(r.longValue)){if(i=d(t[1]),i>4294967295||i<0)throw Error(`ipaddr: address outside defined range`);return(function(){let e=[],t=0;for(;t<=24;t+=8)e.push(i>>t&255);return e})().reverse()}return(t=e.match(r.twoOctet))?(function(){let e=t.slice(1,4),n=[];if(i=d(e[1]),i>16777215||i<0)throw Error(`ipaddr: address outside defined range`);return n.push(d(e[0])),n.push(i>>16&255),n.push(i>>8&255),n.push(i&255),n})():(t=e.match(r.threeOctet))?(function(){let e=t.slice(1,5),n=[];if(i=d(e[2]),i>65535||i<0)throw Error(`ipaddr: address outside defined range`);return n.push(d(e[0])),n.push(d(e[1])),n.push(i>>8&255),n.push(i&255),n})():null},p.IPv4.subnetMaskFromPrefixLength=function(e){if(e=parseInt(e),e<0||e>32)throw Error(`ipaddr: invalid IPv4 prefix length`);let t=[0,0,0,0],n=0,r=Math.floor(e/8);for(;n<r;)t[n]=255,n++;return r<4&&(t[r]=2**(e%8)-1<<8-e%8),new this(t)},p.IPv6=(function(){function e(e,t){let n,r;if(e.length===16)for(this.parts=[],n=0;n<=14;n+=2)this.parts.push(e[n]<<8|e[n+1]);else if(e.length===8)this.parts=e;else throw Error(`ipaddr: ipv6 part count should be 8 or 16`);for(n=0;n<this.parts.length;n++)if(r=this.parts[n],!(0<=r&&r<=65535))throw Error(`ipaddr: ipv6 part should fit in 16 bits`);t&&(this.zoneId=t)}return e.prototype.SpecialRanges={unspecified:[new e([0,0,0,0,0,0,0,0]),128],linkLocal:[new e([65152,0,0,0,0,0,0,0]),10],multicast:[new e([65280,0,0,0,0,0,0,0]),8],loopback:[new e([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new e([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new e([0,0,0,0,0,65535,0,0]),96],deprecatedSiteLocal:[new e([65216,0,0,0,0,0,0,0]),10],discard:[new e([256,0,0,0,0,0,0,0]),64],rfc6145:[new e([0,0,0,0,65535,0,0,0]),96],rfc6052:[[new e([100,65435,0,0,0,0,0,0]),96],[new e([100,65435,1,0,0,0,0,0]),48]],"6to4":[new e([8194,0,0,0,0,0,0,0]),16],teredo:[new e([8193,0,0,0,0,0,0,0]),32],benchmarking:[new e([8193,2,0,0,0,0,0,0]),48],amt:[new e([8193,3,0,0,0,0,0,0]),32],as112v6:[[new e([8193,4,274,0,0,0,0,0]),48],[new e([9760,79,32768,0,0,0,0,0]),48]],deprecatedOrchid:[new e([8193,16,0,0,0,0,0,0]),28],orchid2:[new e([8193,32,0,0,0,0,0,0]),28],droneRemoteIdProtocolEntityTags:[new e([8193,48,0,0,0,0,0,0]),28],segmentRouting:[new e([24320,0,0,0,0,0,0,0]),16],reserved:[[new e([8193,0,0,0,0,0,0,0]),23],[new e([8193,3512,0,0,0,0,0,0]),32],[new e([16383,0,0,0,0,0,0,0]),20]]},e.prototype.isIPv4MappedAddress=function(){return this.range()===`ipv4Mapped`},e.prototype.kind=function(){return`ipv6`},e.prototype.match=function(e,t){let n;if(t===void 0&&(n=e,e=n[0],t=n[1]),e.kind()!==`ipv6`)throw Error(`ipaddr: cannot match ipv6 address with non-ipv6 one`);return u(this.parts,e.parts,16,t)},e.prototype.prefixLengthFromSubnetMask=function(){let e=0,t=!1,n={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0},r,i;for(let a=7;a>=0;--a)if(r=this.parts[a],r in n){if(i=n[r],t&&i!==0)return null;i!==16&&(t=!0),e+=i}else return null;return 128-e},e.prototype.range=function(){return p.subnetMatch(this,this.SpecialRanges)},e.prototype.toByteArray=function(){let e,t=[],n=this.parts;for(let r=0;r<n.length;r++)e=n[r],t.push(e>>8),t.push(e&255);return t},e.prototype.toFixedLengthString=function(){let e=(function(){let e=[];for(let t=0;t<this.parts.length;t++)e.push(f(this.parts[t].toString(16),4));return e}).call(this).join(`:`),t=``;return this.zoneId&&(t=`%${this.zoneId}`),e+t},e.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw Error(`ipaddr: trying to convert a generic ipv6 address to ipv4`);let e=this.parts.slice(-2),t=e[0],n=e[1];return new p.IPv4([t>>8,t&255,n>>8,n&255])},e.prototype.toNormalizedString=function(){let e=(function(){let e=[];for(let t=0;t<this.parts.length;t++)e.push(this.parts[t].toString(16));return e}).call(this).join(`:`),t=``;return this.zoneId&&(t=`%${this.zoneId}`),e+t},e.prototype.toRFC5952String=function(){let e=/((^|:)(0(:|$)){2,})/g,t=this.toNormalizedString(),n=0,r=-1,i;for(;i=e.exec(t);)i[0].length>r&&(n=i.index,r=i[0].length);return r<0?t:`${t.substring(0,n)}::${t.substring(n+r)}`},e.prototype.toString=function(){return this.toRFC5952String()},e})(),p.IPv6.broadcastAddressFromCIDR=function(e){try{let t=this.parseCIDR(e),n=t[0].toByteArray(),r=this.subnetMaskFromPrefixLength(t[1]).toByteArray(),i=[],a=0;for(;a<16;)i.push(parseInt(n[a],10)|parseInt(r[a],10)^255),a++;return new this(i)}catch(e){throw Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`)}},p.IPv6.isIPv6=function(e){return this.parser(e)!==null},p.IPv6.isValid=function(e){if(typeof e==`string`&&e.indexOf(`:`)===-1)return!1;try{let t=this.parser(e);return new this(t.parts,t.zoneId),!0}catch{return!1}},p.IPv6.isValidCIDR=function(e){if(typeof e==`string`&&e.indexOf(`:`)===-1)return!1;try{return this.parseCIDR(e),!0}catch{return!1}},p.IPv6.networkAddressFromCIDR=function(e){let t,n,r,i,a;try{for(t=this.parseCIDR(e),r=t[0].toByteArray(),a=this.subnetMaskFromPrefixLength(t[1]).toByteArray(),i=[],n=0;n<16;)i.push(parseInt(r[n],10)&parseInt(a[n],10)),n++;return new this(i)}catch(e){throw Error(`ipaddr: the address does not have IPv6 CIDR format (${e})`)}},p.IPv6.parse=function(e){let t=this.parser(e);if(t.parts===null)throw Error(`ipaddr: string is not formatted like an IPv6 Address`);return new this(t.parts,t.zoneId)},p.IPv6.parseCIDR=function(e){let t,n,r;if((n=e.match(/^(.+)\/(\d+)$/))&&(t=parseInt(n[2]),t>=0&&t<=128))return r=[this.parse(n[1]),t],Object.defineProperty(r,"toString",{value:function(){return this.join(`/`)}}),r;throw Error(`ipaddr: string is not formatted like an IPv6 CIDR range`)},p.IPv6.parser=function(e){let t,n,r,i,a,o;if(r=e.match(c.deprecatedTransitional))return this.parser(`::ffff:${r[1]}`);if(c.native.test(e))return l(e,8);if((r=e.match(c.transitional))&&(o=r[6]||``,t=r[1],r[1].endsWith(`::`)||(t=t.slice(0,-1)),t=l(t+o,6),t.parts)){for(a=[parseInt(r[2]),parseInt(r[3]),parseInt(r[4]),parseInt(r[5])],n=0;n<a.length;n++)if(i=a[n],!(0<=i&&i<=255))return null;return t.parts.push(a[0]<<8|a[1]),t.parts.push(a[2]<<8|a[3]),{parts:t.parts,zoneId:t.zoneId}}return null},p.IPv6.subnetMaskFromPrefixLength=function(e){if(e=parseInt(e),e<0||e>128)throw Error(`ipaddr: invalid IPv6 prefix length`);let t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0,r=Math.floor(e/8);for(;n<r;)t[n]=255,n++;return r<16&&(t[r]=2**(e%8)-1<<8-e%8),new this(t)},p.fromByteArray=function(e){let t=e.length;if(t===4)return new p.IPv4(e);if(t===16)return new p.IPv6(e);throw Error(`ipaddr: the binary input is neither an IPv6 nor IPv4 address`)},p.isValid=function(e){return p.IPv6.isValid(e)||p.IPv4.isValid(e)},p.isValidCIDR=function(e){return p.IPv6.isValidCIDR(e)||p.IPv4.isValidCIDR(e)},p.parse=function(e){if(p.IPv6.isValid(e))return p.IPv6.parse(e);if(p.IPv4.isValid(e))return p.IPv4.parse(e);throw Error(`ipaddr: the address has neither IPv6 nor IPv4 format`)},p.parseCIDR=function(e){try{return p.IPv6.parseCIDR(e)}catch{try{return p.IPv4.parseCIDR(e)}catch{throw Error(`ipaddr: the address has neither IPv6 nor IPv4 CIDR format`)}}},p.process=function(e){let t=this.parse(e);return t.kind()===`ipv6`&&t.isIPv4MappedAddress()?t.toIPv4Address():t},p.subnetMatch=function(e,t,n){let r,i,a,o;for(i in n??=`unicast`,t)if(Object.prototype.hasOwnProperty.call(t,i)){for(a=t[i],a[0]&&!(a[0]instanceof Array)&&(a=[a]),r=0;r<a.length;r++)if(o=a[r],e.kind()===o[0].kind()&&e.match.apply(e,o))return i}return n},t!==void 0&&t.exports?t.exports=p:e.ipaddr=p})(n)}))(),1);function Nl(e){let t=e?.attributes;return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}function Pl(e){return!e||typeof e!=`object`||Array.isArray(e)?[]:Object.keys(e)}function Fl(e){return Array.isArray(e)?e.map(String):[]}function Il(e){let t=Nl(e),n=Pl(t.link),r=Pl(t.link_internal),i=new Set(Fl(t.link_no_propagate)),a=new Set([...n,...r]);for(let e of i)a.delete(e);return a}function Ll(e){return new Set(Fl(Nl(e).link_module_no_propagate))}function Rl(e){return new Set(Fl(Nl(e).pool_no_copy))}var zl={};function Bl(){for(let e of Object.keys(zl))delete zl[e]}function Vl(e,t={}){let n=O({lan:{ipv4:typeof t.lan==`string`?t.lan:`10.0.0.0/16`,prefix:typeof t.lan_subnet==`number`?t.lan_subnet:24},loopback:{ipv4:`10.0.0.0/24`,prefix:32},p2p:{ipv4:typeof t.p2p==`string`?t.p2p:`10.2.0.0/16`,prefix:typeof t.p2p_subnet==`number`?t.p2p_subnet:30}},e),r={};for(let[e,t]of Object.entries(n)){if(t==null){r[e]={};continue}if(typeof t!=`object`||Array.isArray(t)){r[e]={ipv4:t};continue}let n={...t};typeof n.ipv4==`string`&&typeof n.prefix!=`number`&&(n.prefix=e.includes(`loopback`)?32:24),e===`mgmt`&&typeof n.prefix!=`number`&&(n.prefix=24),r[e]=n}return r}function Hl(e,t={}){let n=Rl(t),r={};for(let[t,i]of Object.entries(e)){let e={};for(let[t,r]of Object.entries(i))n.has(t)||(e[t]=r);r[t]=e}return r}function Ul(e){Bl();let t=e.defaults??{},n=Vl(e.addressing??{},t);e.addressing=n,e.pools=Hl(n,t);for(let[e,t]of Object.entries(n)){let n={},r=typeof t.prefix==`number`?t.prefix:24,i=typeof t.prefix6==`number`?t.prefix6:64;typeof t.ipv4==`string`&&(n.skipFirst4=r===32||e===`loopback`||e.includes(`loopback`),n.ipv4=+!!n.skipFirst4,n.cache4=[]),typeof t.ipv6==`string`&&(n.skipFirst6=i>=127||e===`loopback`||e.includes(`loopback`),n.ipv6=+!!n.skipFirst6,n.cache6=[]),zl[e]=n}}function Wl(e){let t=(e.interfaces??[]).length;return t>2?`lan`:t===2?`p2p`:`stub`}function Gl(e,t){let n=t.prefix??{};if(typeof n.ipv4==`string`||typeof n.ipv6==`string`)return;if(t.prefix===!1){t.prefix={};return}let r=Wl(t),i=[];typeof t.pool==`string`&&i.push(String(t.pool)),typeof t.role==`string`&&i.push(t.role),i.push(r),i.includes(`lan`)||i.push(`lan`);let a=Jl(e,i);t.prefix=Object.keys(a).length?a:{}}function Kl(e,t,n){return Jl(e,[t],n)}function ql(e,t){let n=t.prefix??{},r=[...t.interfaces??[]].sort((e,t)=>String(e.node).localeCompare(String(t.node))),i=e.nodes??{},a=t.type===`p2p`&&r.length===2;for(let e of[`ipv4`,`ipv6`]){let o=n[e];if(typeof o!=`string`)continue;if(a){r[0][e]=tu(o,1),r[1][e]=tu(o,2);for(let n of t.interfaces??[]){let t=r.find(e=>e.node===n.node);t&&(n[e]=t[e])}continue}let s=1;for(let n of t.interfaces??[]){if(n[e]!==void 0&&n[e]!==null)continue;let t=i[n.node]?.id;n[e]=tu(o,typeof t==`number`&&t>0&&ru(o,t)?t:s++)}}}function Jl(e,t,n){let r=e.addressing??{},i=t.find(e=>r[e]&&typeof r[e]==`object`);if(!i)return{};let a=r[i],o=zl[i]??(zl[i]={}),s={};if(typeof a.ipv4==`string`){let e=typeof a.prefix==`number`?a.prefix:24;s.ipv4=n===void 0?Yl(a.ipv4,e,o):Xl(a.ipv4,e,n,o)}if(typeof a.ipv6==`string`){let e=typeof a.prefix6==`number`?a.prefix6:64;s.ipv6=n===void 0?Zl(a.ipv6,e,o):Ql(a.ipv6,e,n,o)}return s}function Yl(e,t,n){let r=n.ipv4??0;return n.ipv4=r+1,$l(e,t,r)}function Xl(e,t,n,r){for(r.cache4=r.cache4??[];r.cache4.length<n;){let n=r.cache4.length+ +!!r.skipFirst4;r.cache4.push($l(e,t,n))}let i=+!!r.skipFirst4+r.cache4.length;return(r.ipv4??0)<i&&(r.ipv4=i),r.cache4[n-1]}function Zl(e,t,n){let r=n.ipv6??0;return n.ipv6=r+1,eu(e,t,r)}function Ql(e,t,n,r){for(r.cache6=r.cache6??[];r.cache6.length<n;){let n=r.cache6.length+ +!!r.skipFirst6;r.cache6.push(eu(e,t,n))}let i=+!!r.skipFirst6+r.cache6.length;return(r.ipv6??0)<i&&(r.ipv6=i),r.cache6[n-1]}function $l(e,t,n){let[r,i]=iu(e);return`${au(r+n*2**(32-t)>>>0)}/${t}`}function eu(e,t,n){let[r,i]=J.default.parseCIDR(e);if(r.kind()!==`ipv6`)throw Error(`Expected IPv6 pool, got ${e}`);let a=ou(r.toByteArray()),o=128n-BigInt(t),s=su((a>>o)+BigInt(n)<<o,16);return`${J.default.fromByteArray(Array.from(s)).toString()}/${t}`}function tu(e,t){let[n,r]=J.default.parseCIDR(e);if(n.kind()===`ipv4`){let[n]=iu(e);return`${au(n+t>>>0)}/${r}`}let i=su(ou(n.toByteArray())+BigInt(t),16);return`${J.default.fromByteArray(Array.from(i)).toString()}/${r}`}function nu(e){try{let[t,n]=J.default.parseCIDR(e);if(t.kind()===`ipv4`){let[t]=iu(e);return`${au((t&(n===0?0:-1<<32-n>>>0))>>>0)}/${n}`}let r=ou(t.toByteArray()),i=128n-BigInt(n),a=r>>i<<i;return`${J.default.fromByteArray(Array.from(su(a,16))).toString()}/${n}`}catch{return e}}function ru(e,t){try{let[,n]=J.default.parseCIDR(e);if(J.default.parseCIDR(e)[0].kind()===`ipv4`){let e=2**(32-n)-2;return t>0&&t<=e}return t>0}catch{return!1}}function iu(e){let[t,n]=e.split(`/`),r=(t??`0.0.0.0`).split(`.`).map(Number);return[(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),Number(n??32)]}function au(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(`.`)}function ou(e){let t=0n;for(let n of e)t=(t<<8n)+BigInt(n);return t}function su(e,t){let n=Array(t).fill(0),r=e;for(let e=t-1;e>=0;e--)n[e]=Number(r&255n),r>>=8n;return n}function cu(e,t){let n;if(e&&typeof e==`object`&&!Array.isArray(e))n={...e};else{n={};for(let r of e??[])if(typeof r==`string`)n[r]={name:r};else if(r&&typeof r==`object`&&!Array.isArray(r)){let e=r;if(!e.name){t?.error({code:`VALUE`,category:`VALUE`,module:`nodes`,message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}n[e.name]=e}}for(let e of Object.keys(n)){let r=n[e];r==null?r={name:e}:typeof r!=`object`||Array.isArray(r)?(t?.error({code:`TYPE`,category:`TYPE`,module:`nodes`,message:`Node data for node ${e} must be a dictionary`}),r={name:e,extra:r}):r={...r,name:e},Array.isArray(r.interfaces)||(r.interfaces=[]),n[e]=r}return n}function lu(e){let t=new Set;for(let n of Object.values(e.nodes??{}))typeof n.id==`number`&&t.add(n.id);let n=1;for(let r of Object.values(e.nodes??{}))if(typeof r.id!=`number`){for(;t.has(n);)n++;r.id=n,t.add(n),n++}}function uu(e,t){let n=String(e.defaults?.device??`frr`),r=Ir;for(let i of Object.values(e.nodes??{})){i.device||=n;let e=String(i.device);r.includes(e)||(t?.warning({code:`VALUE`,category:`VALUE`,module:`nodes`,message:`Unsupported device '${e}' on node ${i.name}; using frr (allowed: ${r.join(`, `)})`,path:`nodes.${i.name}.device`}),e=`frr`,i.device=e);let a=Ml(e);i.role||=String(a.role??`router`),a.daemon&&(i[`netlab-internal:_daemon`]=!0,a.parent&&(i[`netlab-internal:_daemon_parent`]=a.parent))}}function du(e){lu(e);let t=e.addressing?.mgmt??{},n=String(t.ipv4??`192.168.121.0/24`),r=Number(t.start??100);for(let i of Object.values(e.nodes??{})){let a=i.id??1,o=Ml(String(i.device??`frr`)),s=Number(o.ifindex_offset??1);if(i.mgmt={ifname:(o.mgmt_if===void 0?fu(String(o.interface_name??`eth{ifindex}`),s-1):String(o.mgmt_if))||`eth0`,ipv4:mu(n,r+a),mac:_u(String(t.mac??`CA-FE-00-00-00-00`),a)},i.role===`router`||i.role===`gateway`||!i.role){let t=fu(String(o.loopback_interface_name??`lo{ifindex}`),0),n=Kl(e,`loopback`,a),r={ifindex:0,ifname:t||`lo`,type:`loopback`,virtual_interface:!0,neighbors:[]};typeof n.ipv4==`string`&&(r.ipv4=n.ipv4.endsWith(`/32`)?n.ipv4:tu(n.ipv4,1)),typeof n.ipv6==`string`&&(r.ipv6=n.ipv6.endsWith(`/128`)?n.ipv6:tu(n.ipv6,1)),i.loopback=r}i.af=i.af??{},(i.loopback?.ipv4||(i.interfaces??[]).some(e=>e.ipv4))&&(i.af.ipv4=!0),(i.loopback?.ipv6||(i.interfaces??[]).some(e=>e.ipv6))&&(i.af.ipv6=!0)}}function fu(e,t){return e.includes(`if ifindex else`)?t?e.replace(/\{ifindex if ifindex else ""\}/g,String(t)):e.replace(/lo\{ifindex if ifindex else ""\}/g,`lo`).replace(/\{ifindex if ifindex else ""\}/g,``):e.replace(/\{ifindex\}/g,String(t))}function pu(e,t){let n=e;for(let[e,r]of Object.entries(t))r!==void 0&&(n=n.replaceAll(`{${e}}`,String(r)));return n}function mu(e,t){return hu(e,t)}function hu(e,t){let[n,,]=gu(e),r=(n|0)+t;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(`.`)}function gu(e){let[t,n]=e.split(`/`),r=(t??`0.0.0.0`).split(`.`).map(e=>Number(e)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),a=Number(n??32);return[i&(a===0?0:-1<<32-a>>>0),a]}function _u(e,t){let n=t.toString(16).padStart(4,`0`);return e.replace(/00-00$/,`${n.slice(0,2)}-${n.slice(2)}`)}function vu(e,t){let n=e.nodes??{},r=e.links;if(!r)return[];let i=Array.isArray(r)?r:[],a=[],o=0;for(let e of i){o++;let r=`links[${o}]`,i=yu(e,r,n,t);i&&i.disable!==!0&&(i.linkindex=o,i[D]=r,delete i._linkname,a.push(i))}return e.links=a,a}function yu(e,t,n,r){if(typeof e==`string`){let i=[];for(let a of e.split(`-`)){let o=a.trim();n[o]?i.push({node:o}):r?.error({code:`VALUE`,category:`VALUE`,module:`links`,message:`Link string ${e} in ${t} refers to an unknown node ${o}`})}return{interfaces:i,[D]:t}}if(Array.isArray(e))return{interfaces:bu(e,n,r,t),[D]:t};if(e&&typeof e==`object`){let i={...e};if(Array.isArray(i.interfaces))return i.interfaces=bu(i.interfaces,n,r,t),i[D]=t,i;let a={[D]:t},o=[];for(let[e,t]of Object.entries(i))if(e in n){let n=t&&typeof t==`object`&&!Array.isArray(t)?{...t,node:e}:{node:e};o.push(n)}else a[e]=t;return a.interfaces=o,a}return r?.error({code:`TYPE`,category:`TYPE`,module:`links`,message:`Invalid type ${typeof e} for ${t}`}),null}function bu(e,t,n,r){let i=[];for(let a of e)if(typeof a==`string`){if(!t[a]){n?.error({code:`VALUE`,category:`VALUE`,module:`links`,message:`Interface in ${r} refers to unknown node ${a}`});continue}i.push({node:a})}else if(a&&typeof a==`object`&&!Array.isArray(a)){let e=a;if(!e.node||!t[e.node]){n?.error({code:`VALUE`,category:`VALUE`,module:`links`,message:`Interface data in ${r} missing/unknown node`});continue}i.push(e)}return i}function xu(e){let t=0;for(let n of e.links??[]){let e=Number(n.linkindex??0);e>t&&(t=e)}return t+1}function Su(e,t){let n=(e.interfaces??[]).map(e=>e.ifindex??0),r=t;for(;n.includes(r);)r++;return r}function Cu(e){let t=e.nodes??{},n=e.defaults??{},r=Il(n),i=Ll(n);for(let n of e.links??[]){wu(n,t);let a=n.interfaces??[];n.node_count=a.length,n.type!==`lan`&&n.type!==`stub`||n.bridge||(n.bridge=`${String(e.name??`lab`).slice(0,10)}_${n.linkindex??1}`),Gl(e,n),ql(e,n);let o=[];for(let e of a){let a=e.node,s=t[a];if(!s)continue;let c=new Set(r);for(let e of s.module??[])c.add(e);for(let e of i)c.delete(e);let l={};for(let[e,t]of Object.entries(n))c.has(e)&&(l[e]=structuredClone(t));let{node:u,...d}=e,f=zr(structuredClone(d),l),p=Ml(String(s.device??`frr`)),ee=n.type===`loopback`,te,ne;if(ee){te=Eu(s,`loopback`);let e=te-1e4;ne=fu(String(p.loopback_interface_name??p.interface_name??`Loopback{ifindex}`),e),f.virtual_interface=!0}else te=Tu(s),ne=fu(String(p.interface_name??`eth{ifindex}`),te);f.ifindex=te,f.ifname=ne,f.type||=n.type??Wl(n),f.neighbors=[],e.ifindex=te,e.ifname=ne,ee&&(e.virtual_interface=!0),s.interfaces=s.interfaces??[],s.interfaces.push(f),o.push({node:a,data:f})}for(let e of o){e.data.neighbors=[];for(let t of o){if(t===e)continue;let n={node:t.node};t.data.ifname!==void 0&&(n.ifname=t.data.ifname),t.data.ipv4!==void 0&&(n.ipv4=t.data.ipv4),t.data.ipv6!==void 0&&(n.ipv6=t.data.ipv6),e.data.neighbors.push(n)}}}for(let e of Object.values(t))e.af=e.af??{},(e.loopback?.ipv4||(e.interfaces??[]).some(e=>typeof e.ipv4==`string`))&&(e.af.ipv4=!0),(e.loopback?.ipv6||(e.interfaces??[]).some(e=>typeof e.ipv6==`string`))&&(e.af.ipv6=!0)}function wu(e,t){let n=e.interfaces??[];n.length;let r=0;for(let e of n){let n=t[e.node];n&&n.role!==`host`&&r++}!(`role`in e)&&r<=1&&e.type!==`loopback`&&!e.vlan_name&&(e.role=`stub`),e.type||=Wl(e)}function Tu(e){let t=(e.interfaces??[]).map(e=>e.ifindex??0),n=1;for(;t.includes(n);)n++;return n}function Eu(e,t){let n=(e.interfaces??[]).map(e=>e.ifindex??0),r=10001;for(;n.includes(r);)r++;return r}function Du(e){return e===!0||e===`true`||e===`True`}function Ou(e){if(e.groups||={},Array.isArray(e.groups)){let t={};for(let n of e.groups)n.name&&(t[String(n.name)]=n);e.groups=t}}function ku(e){let t=e.groups??{},n=e.defaults?.groups??{},r=Du(t._auto_create)||Du(n._auto_create);!e.nodes||typeof e.nodes!=`object`?e.nodes={}:Array.isArray(e.nodes)&&(e.nodes=cu(e.nodes));let i=e.nodes;for(let[e,a]of Object.entries(t)){if(e.startsWith(`_`)||!a||typeof a!=`object`||Array.isArray(a))continue;let o=a,s=o.members;if(Array.isArray(s)&&s.length!==0&&(Du(o._auto_create)||r)&&String(o.type??`node`)===`node`)for(let e of s){let r=String(e);r in t||r in n||r in i||(i[r]={name:r,interfaces:[]})}}}function Au(e){let t=e.groups??{},n=e.nodes??{};for(let[r,i]of Object.entries(t)){if(r.startsWith(`_`)||!i||typeof i!=`object`||Array.isArray(i))continue;let t=i.members??[];for(let r of t){let t=n[r];if(!t)continue;if(i.device&&!t.device&&(t.device=i.device),typeof i.provider==`string`&&!t.provider&&(t.provider=i.provider),Array.isArray(i.module)){let e=new Set(t.module??[]);for(let t of i.module)e.add(t);t.module=[...e]}let a=new Set([...e.module??[],...i.module??[],...t.module??[]]);for(let e of a){let n=i[e];if(!n||typeof n!=`object`||Array.isArray(n))continue;let r=t[e];r===void 0?t[e]=structuredClone(n):r&&typeof r==`object`&&!Array.isArray(r)&&(t[e]=O(n,r))}if(i.node_data&&typeof i.node_data==`object`){let e=O(i.node_data,t);Object.assign(t,e)}}}}function ju(e){e.groups||={};let t=e.groups,n=Number(e.bgp?.as);for(let[r,i]of Object.entries(e.nodes??{})){if(!(i.module??[]).includes(`bgp`))continue;let e=Number(i.bgp?.as??n);if(!Number.isFinite(e)||e<=0)continue;let a=`as${e}`;t[a]||(t[a]={members:[]});let o=t[a];Array.isArray(o.members)||(o.members=[]),o.members.includes(r)||o.members.push(r)}}function Mu(e){let t=e.components;if(!t||typeof t!=`object`)return;let n=e.nodes??{},r={},i=[],a=[];for(let[e,o]of Object.entries(n)){let n=o.include;if(typeof n!=`string`)continue;let s=t[n];if(!s)continue;i.push(e);let c=e,l=s.nodes??{};for(let[e,t]of Object.entries(l)){let n=`${c}_${e}`;r[n]={...t,name:n}}let u=s.links??[];for(let e of u)a.push(Nu(e,c,Object.keys(l)))}for(let e of i)delete n[e];Object.assign(n,r),e.nodes=n,e.links=[...e.links??[],...a],delete e.components,vu(e)}function Nu(e,t,n){let r=e=>n.includes(e)?`${t}_${e}`:e;if(Array.isArray(e))return{interfaces:e.map(e=>({node:r(String(e))}))};if(e&&typeof e==`object`){let t={...e};if(Array.isArray(t.interfaces))return t.interfaces=t.interfaces.map(e=>({...e,node:r(String(e.node??``))})),t;let i={interfaces:[]},a=[];for(let[e,o]of Object.entries(t))n.includes(e)?a.push(o&&typeof o==`object`&&!Array.isArray(o)?{...o,node:r(e)}:{node:r(e)}):i[e]=o;return i.interfaces=a,i}return{interfaces:[]}}var Pu=s({createVlanAccessLinks:()=>Ku,default:()=>id,link_pre_transform:()=>Yu,module_post_link_transform:()=>rd,module_pre_transform:()=>Ju,name:()=>Fu}),Fu=`vlan`,Iu=4e4,Lu=[`id`,`vni`,`mode`,`prefix`,`evpn`,`stp`,`lag`,`links`],Ru=[`bridge`,`ifindex`,`parentindex`,`ifname`,`linkindex`,`type`,`vlan`,`mtu`,`bandwidth`,`_selfloop_ifindex`,`stp`,`virtual_interface`,`lag`,`evpn`];function zu(e){let t=e.defaults?.vlan;return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}function Bu(e,t){let n=zu(e).attributes?.[t];return n&&typeof n==`object`&&!Array.isArray(n)?Object.keys(n):t===`vlan_no_propagate`?[...Lu]:t===`phy_ifattr`?[...Ru]:t===`copy_vlan_to_intf`?[`ipv4`,`ipv6`,`gateway`]:[]}function Y(e){return e.vlans??{}}function Vu(e){let t=Number(e.vlan?.start_vlan_id);if(Number.isFinite(t)&&t>0)return t;let n=Number(zu(e).start_vlan_id);return Number.isFinite(n)&&n>0?n:1e3}function Hu(e,t,n){t.prefix!==void 0&&(n.prefix=structuredClone(t.prefix)),n.type===void 0&&(n.type=t.type??`lan`),n.vlan_name=e}function Uu(e,t,n){let r=e.vlan?.access??e.vlan?.native;if(!r)return`irb`;let i=t.vlans??{};return e._vlan_mode||e.vlan?.mode||i[String(r)]?.mode||t.vlan?.mode||Y(n)[String(r)]?.mode||n.vlan?.mode||`irb`}function Wu(e,t){for(let n of e.interfaces??[]){if(!n.vlan)continue;let e=t.nodes?.[String(n.node)];e&&(n._vlan_mode=Uu(n,e,t))}}function Gu(e){return e._vlan_mode}function Ku(e,t){let n=Y(e);if(Object.keys(n).length){e.links||=[];for(let[r,i]of Object.entries(n))if(i&&typeof i==`object`&&Array.isArray(i.links)){for(let n=0;n<i.links.length;n++){let a=yu(i.links[n],`vlans.${r}.links[${n+1}]`,e.nodes??{},t?.diagnostics);if(!a)continue;let o=a.vlan??{};o.access=r,a.vlan=o,a.linkindex=xu(e),a[D]=`vlans.${r}.links[${n+1}]`,e.links.push(a)}delete i.links}}}function qu(e){let t=Y(e);if(!Object.keys(t).length)return;let n=new Set;for(let e of Object.values(t))typeof e?.id==`number`&&n.add(e.id);for(let t of Object.values(e.nodes??{})){let e=t.vlans;if(e)for(let t of Object.values(e))typeof t?.id==`number`&&n.add(t.id)}let r=Vu(e);for(let[e,i]of Object.entries(t)){let a=i??{};if(a.id===void 0){for(;n.has(r);)r++;a.id=r,n.add(r),r++}t[e]=a}e.vlans=t}function Ju(e,t){e.vlans&&!e.links&&(e.links=[]),qu(e),Ku(e,t)}function Yu(e,t,n){if(e.type===`vlan_member`)return;let r=e.vlan;if(!r)return;for(let n of e.interfaces??[]){let e=t.nodes?.[String(n.node)];e&&(e.module??[]).includes(`vlan`)&&(n.vlan=O(structuredClone(r),n.vlan??{}))}let i=typeof r.access==`string`?r.access:typeof r.native==`string`?r.native:void 0;if(i){let n=Y(t)[i];n&&r.access_id===void 0&&typeof n.id==`number`&&(r.access_id=n.id);for(let t of e.interfaces??[]){let e=t.vlan;e&&e.access_id===void 0&&r.access_id!==void 0&&(e.access_id=r.access_id)}if(Wu(e,t),n){let r=new Set(Bu(t,`vlan_no_propagate`)),a={};for(let[e,t]of Object.entries(n))r.has(e)||(a[e]=structuredClone(t));for(let[t,n]of Object.entries(a))e[t]===void 0?e[t]=n:e[t]&&typeof e[t]==`object`&&!Array.isArray(e[t])&&n&&typeof n==`object`&&!Array.isArray(n)&&(e[t]=O(n,e[t]));Hu(i,n,e)}for(let n of e.interfaces??[]){let e=t.nodes?.[String(n.node)];e&&(e.module??[]).includes(`vlan`)&&Gu(n)===`bridge`&&(n.ipv4=!1,n.ipv6=!1)}}}function Xu(e,t,n){t.vlans||={};let r=t.vlans;if(r[e]?._global_merge)return r[e];let i=r[e]??{},a=Y(n)[e]??{};i.mode=i.mode||t.vlan?.mode||a.mode||n.vlan?.mode||`irb`,i._global_merge=!0;let o=O(structuredClone(a),i);for(let e of Object.keys(o))!(t.module??[]).includes(e)&&(n.module??[]).includes(e)&&delete o[e];return r[e]=o,o}function Zu(e,t,n){e.vlans||={};let r=e.vlans;if(!(t in r)&&!Y(n)[t])return;t in r||(r[t]={});let i=Xu(t,e,n);if(i.bridge_group===void 0){let t=e.vlan??{},n=Number(t.max_bridge_group??0)+1;t.max_bridge_group=n,e.vlan=t,i.bridge_group=n}return i}function Qu(e,t,n,r){let i=Y(n)[e];if(i)return i;let a=t.vlans?.[e];if(a)return a;if(r?.neighbors)for(let t of r.neighbors){if(!t.node)continue;let r=n.nodes?.[t.node]?.vlans?.[e];if(r)return r}}function $u(e,t,n,r,i){let a=Qu(e,r,i,t);if(!a)return;Array.isArray(a.neighbors)||(a.neighbors=[]);let o=a.neighbors,s=new Set(o.map(e=>e.node));for(let e of t.neighbors??[])s.has(e.node)||o.push({...e});let c=new Set([...r.module??[],`ipv4`,`ipv6`]),l=String(r.name??``),u={node:l};n.ifname!==void 0&&(u.ifname=n.ifname);for(let e of c){let t=n[e];t!==void 0&&(u[e]=t)}let d=o.filter(e=>e.node!==l);d.push(u),a.neighbors=d}function ed(e,t,n){let r=new Set([...Bu(t,`phy_ifattr`),...Object.keys(t.defaults?.providers??{})]),i=new Set([...Bu(t,`vlan_no_propagate`).filter(e=>e!==`mode`),...Bu(t,`vlan_svi_no_propagate`)]),a={},o=e.interfaces??[],s=o.length;for(let c=0;c<s;c++){let s=o[c],l=s.vlan;if(!l)continue;let u=l.access??l.native;if(!u||(Gu(s)??`irb`)===`route`)continue;let d=Zu(e,u,t);if(!d)continue;let f=(Ml(String(e.device??`none`)).features??{}).vlan?.svi_interface_name;if(!f||typeof f!=`string`){n.diagnostics.error({code:`VALUE`,category:`VALUE`,module:`vlan`,message:`Device ${e.device} used by ${e.name} does not support VLAN interfaces (access vlan ${u})`,path:`nodes.${e.name}`});return}let p=a[u];if(!p){let t=l.mode||d.mode||``,n=[`vlan_name`,`gateway`];t!==`bridge`&&n.push(`ipv4`,`ipv6`);let r={};for(let e of n)s[e]!==void 0&&(r[e]=structuredClone(s[e]));p=r,t?p.vlan={mode:t,name:u}:p.vlan={name:u},p.type=`svi`,p.ifindex=Su(e,Iu),p.ifname=pu(f,{vlan:Number(d.id),bvi:Number(d.bridge_group??d.id),ifname:s.ifname}),p.name=`VLAN ${u} (${d.id})`,p.virtual_interface=!0,p.neighbors=[];for(let[e,t]of Object.entries(d))i.has(e)||n.includes(e)||(t!==!0||p[e]===void 0)&&p[e]===void 0&&(p[e]=structuredClone(t));e.interfaces=e.interfaces??[],e.interfaces.push(p),a[u]=p}$u(u,s,p,e,t),s.neighbors!==void 0&&(s._vlan_saved_neighbors=s.neighbors);for(let e of Object.keys(s))e.includes(`_vlan_saved`)||r.has(e)||delete s[e];s.vlan={...s.vlan,access_id:d.id,access:u}}}function td(e,t){for(let n of e.interfaces??[]){if(n.vlan_name===void 0)continue;let r=Qu(String(n.vlan_name),e,t,n);r&&Array.isArray(r.neighbors)&&(n.neighbors=r.neighbors.filter(t=>t.node!==e.name))}}function nd(e){for(let t of e.links??[]){delete t.vlan_name;for(let e of t.interfaces??[])e._vlan_mode!==void 0&&(e.vlan={...e.vlan??{},mode:e._vlan_mode},delete e._vlan_mode)}for(let t of Object.values(e.nodes??{})){for(let e of t.interfaces??[])delete e.vlan_name,delete e._global_merge,e._vlan_mode!==void 0&&(e.vlan={...e.vlan??{},mode:e._vlan_mode},delete e._vlan_mode),e._vlan_saved_neighbors!==void 0&&(e.neighbors=e._vlan_saved_neighbors,delete e._vlan_saved_neighbors);let e=t.vlans;if(e)for(let t of Object.values(e))delete t._global_merge,delete t.neighbors}for(let t of Object.values(Y(e)))delete t.neighbors}function rd(e,t){for(let n of Object.values(e.nodes??{})){if(!(n.module??[]).includes(`vlan`))continue;let r=n.vlans;if(r)for(let t of Object.keys(r))Xu(t,n,e);ed(n,e,t)}for(let t of Object.values(e.nodes??{}))(t.module??[]).includes(`vlan`)&&td(t,e);nd(e)}var id={name:Fu,module_pre_transform:Ju,link_pre_transform:Yu,module_post_link_transform:rd},ad=s({default:()=>cd,module_pre_transform:()=>od,name:()=>`vrf`,node_post_transform:()=>sd});function od(e,t){let n=e.vrfs;if(!n||typeof n!=`object`)return;let r=1;for(let[e,t]of Object.entries(n)){let i=t??{};i.rd||=`1:${r}`,i.import||=[String(i.rd)],i.export||=[String(i.rd)],n[e]=i,r++}}function sd(e,t,n){let r=t.vrfs;if(!r)return;let i=new Set((e.interfaces??[]).map(e=>e.vrf).filter(e=>typeof e==`string`));if(!i.size)return;let a={...e.vrfs??{}};for(let e of i)!a[e]&&r[e]&&(a[e]={...r[e]});e.vrfs=a}var cd={name:`vrf`,module_pre_transform:od,node_post_transform:sd},ld=s({default:()=>yd,module_init:()=>hd,module_post_transform:()=>vd,module_pre_transform:()=>gd,name:()=>ud}),ud=`vxlan`;function dd(e){return e.vlans??{}}function fd(e){let t=e.defaults?.vxlan;return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}function pd(e){let t=Number(e.vxlan?.start_vni);if(Number.isFinite(t)&&t>0)return t;let n=Number(fd(e).start_vni);return Number.isFinite(n)&&n>0?n:1e5}function md(e,t){let n=t?.vxlan??e.vxlan??{};return Array.isArray(n.vlans)&&n.vlans.length?n.vlans.map(String):Object.keys(dd(e))}function hd(e,t){e.vxlan||={}}function gd(e,t){let n=dd(e);if(!Object.keys(n).length)return;let r=new Set;for(let e of Object.values(n))typeof e?.vni==`number`&&r.add(e.vni);let i=pd(e),a=i,o=md(e);for(let e of o){let t=n[e];if(!t||t.vni===!1||typeof t.vni==`number`)continue;let o=Number(t.id),s=Number.isFinite(o)?i+o:0;if(s>0&&!r.has(s))t.vni=s,r.add(s);else{for(;r.has(a);)a++;t.vni=a,r.add(a),a++}}let s=e.vxlan??{};Array.isArray(s.vlans)&&s.vlans.length||(s.vlans=o.filter(e=>typeof n[e]?.vni==`number`)),e.vxlan=s}function _d(e,t){let n=e.loopback?.[t];if(typeof n==`string`)return n.split(`/`)[0]}function vd(e,t){let n=e.vxlan??{},r=String(n.flooding??`static`),i=dd(e);for(let a of Object.values(e.nodes??{})){if(!(a.module??[]).includes(`vxlan`))continue;let o=a.vxlan??{};o.domain===void 0&&(o.domain=n.domain??`global`),o.flooding=r;let s=md(e,a).filter(e=>typeof i[e]?.vni==`number`);o.vlans=s;let c={...a.vlans??{}};for(let e of s){let t=i[e],n=c[e]??{},r=n.evpn??{},a=t.evpn&&typeof t.evpn==`object`&&!Array.isArray(t.evpn)?t.evpn:{};c[e]={...n,id:t.id,mode:t.mode,vni:t.vni,...Object.keys(a).length||Object.keys(r).length?{evpn:{...a,...r}}:{}}}Object.keys(c).length&&(a.vlans=c);let l=n.use_v6_vtep??o.use_v6_vtep??fd(e).use_v6_vtep?`ipv6`:`ipv4`,u=_d(a,l);if(u?(o.vtep=u,o.vtep_interface=String(a.loopback?.ifname??`lo`),o.transport=l):t.diagnostics.error({code:`MISSING`,category:`MISSING`,module:`vxlan`,message:`VXLAN module needs an ${l.toUpperCase()} address on loopback of ${a.name}`,path:`nodes.${a.name}.loopback.${l}`}),String(o.flooding)===`static`){let t=Object.values(e.nodes??{}).filter(e=>e!==a&&(e.module??[]).includes(`vxlan`)),n=new Set;for(let e of s){let r=c[e];if(!r||typeof r.vni!=`number`)continue;let i=[];for(let e of t){let t=e.vxlan?.vtep;if(typeof t!=`string`||t===u)continue;let a=e.vlans??{};Object.values(a).some(e=>e?.vni===r.vni)&&(i.push(t),n.add(t))}i.length&&(r.vtep_list=i)}n.size&&(o.vtep_list=[...n].sort())}a.vxlan=o}}var yd={name:ud,module_init:hd,module_pre_transform:gd,module_post_transform:vd},bd=s({default:()=>wd,module_init:()=>Sd,name:()=>xd,node_post_transform:()=>Cd}),xd=`ospf`;function Sd(e,t){e.ospf||={}}function Cd(e,t,n){let r=e.ospf??{},i=t.ospf??{};if(r.area===void 0&&(r.area=i.area??`0.0.0.0`),!r.router_id){let t=e.loopback;r.router_id=(typeof t?.ipv4==`string`?t.ipv4.split(`/`)[0]:void 0)??`10.0.0.${e.id??1}`}r.af={ipv4:(e.interfaces??[]).some(e=>typeof e.ipv4==`string`)||typeof e.loopback?.ipv4==`string`,ipv6:(e.interfaces??[]).some(e=>typeof e.ipv6==`string`)||typeof e.loopback?.ipv6==`string`};for(let t of e.interfaces??[]){if(t.role===`external`){delete t.ospf;continue}let e=t.ospf??{};e.area===void 0&&(e.area=r.area),!e.network_type&&t.type===`p2p`&&(e.network_type=`point-to-point`),t.role===`stub`||t.type===`stub`?e.passive===void 0&&(e.passive=!0):e.passive===void 0&&(e.passive=!1),t.ospf=e}if(e.loopback){let t=e.loopback,n=t.ospf??{};n.area===void 0&&(n.area=r.area),n.passive===void 0&&(n.passive=!1),t.ospf=n}e.ospf=r}var wd={name:xd,module_init:Sd,node_post_transform:Cd},Td=s({default:()=>kd,module_init:()=>Dd,name:()=>Ed,node_post_transform:()=>Od}),Ed=`isis`;function Dd(e,t){e.isis||={}}function Od(e,t,n){let r=e.isis??{},i=t.isis??{};if(r.area||=i.area??`49.0001`,r.type||=i.type??`level-2`,!r.net){let t=(e.id??1).toString(16).padStart(4,`0`);r.net=`${r.area}.0000.0000.${t}.00`}for(let t of e.interfaces??[]){let e=t.isis??{};!e.network_type&&t.type===`p2p`&&(e.network_type=`point-to-point`),t.isis=e}e.isis=r}var kd={name:Ed,module_init:Dd,node_post_transform:Od},Ad=s({default:()=>Yd,link_pre_transform:()=>Fd,module_init:()=>Nd,module_post_transform:()=>Id,name:()=>`bgp`,node_post_transform:()=>Ld,node_pre_transform:()=>Pd}),jd={ipv4:[`ibgp`,`ebgp`,`localas_ibgp`],ipv6:[`ibgp`,`ebgp`,`localas_ibgp`]},Md={localas_ibgp:`ibgp`};function Nd(e,t){e.bgp||={}}function Pd(e,t,n){let r=e.bgp??{},i=t.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&n.diagnostics.error({code:`MISSING`,category:`MISSING`,module:`bgp`,message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function Fd(e,t,n){let r=t.defaults?.bgp,i=String(t.bgp?.ebgp_role??r?.ebgp_role??`external`);if(!i||e.vlan_name)return;let a=new Set;for(let n of e.interfaces??[]){let e=t.nodes?.[n.node];if(!e)continue;let r=Number(e.bgp?.as);Number.isFinite(r)&&r>0&&a.add(r);let i=Number(n.bgp?.local_as??e.bgp?.local_as??r);Number.isFinite(i)&&i>0&&a.add(i)}a.size>1&&!e.role&&(e.role=i)}function Id(e,t){for(let t of Object.values(e.nodes??{})){if(!(t.module??[]).includes(`bgp`))continue;let e=t.bgp??{};if(!e.router_id){let n=t.loopback;e.router_id=typeof n?.ipv4==`string`?n.ipv4.split(`/`)[0]:`10.0.0.${t.id??1}`}t.bgp=e}Rd(e)}function Ld(e,t,n){let r=e.bgp??{};r.as&&(Bd(e,t),Wd(e,t),Jd(e),Kd(e),qd(e)),e.bgp=r}function Rd(e){let t=new Set;for(let n of Object.values(e.nodes??{})){let e=Number(n.bgp?.as);Number.isFinite(e)&&t.add(e)}for(let n of t){let t=zd(n,e);if(!t.length)continue;let r=t.filter(e=>e.bgp.rr_cluster_id===void 0).map(e=>String(e.bgp.router_id??``)),i=r.length?r.sort()[0]:void 0;for(let e of t){let t=e.bgp;t.rr_cluster_id===void 0&&(t.rr_cluster_id=i||t.router_id)}}}function zd(e,t){return Object.values(t.nodes??{}).filter(t=>{let n=t.bgp;return n&&Number(n.as)===e&&n.rr})}function Bd(e,t){let n=e.bgp,r=n.sessions??jd,i=[];n.neighbors=i,Vd(e,r,t,i),Hd(e,r,t,i);for(let e of[`ipv4`,`ipv6`])i.some(t=>t[e]!==void 0)&&(n[e]=!0);let a=n.activate??jd;for(let e of i){let t={};for(let r of[`ipv4`,`ipv6`])e[r]!==void 0&&n[r]&&(a[r]??[]).includes(String(e.type))&&(t[r]=!0);Object.keys(t).length&&(e.activate=t)}}function Vd(e,t,n,r){let i=e.bgp,a=Number(i.as),o=!!i.rr,s=i.next_hop_self,c=i.rr_mesh!==!1,l=o?[]:zd(a,n),u;o||l.length===0?(u=Object.values(n.nodes??{}).filter(t=>t.name!==e.name&&Number(t.bgp?.as)===a),o&&!c&&(u=u.filter(e=>!e.bgp.rr||e.bgp.rr_mesh!==!1))):u=l;for(let n of u){let i=n.loopback??{},a={};n.bgp?.rr&&(a.rr=n.bgp.rr);let c=Ud(n,i,`ibgp`,t,a);c&&(e.loopback&&(c._source_intf=structuredClone(e.loopback)),s&&(c.next_hop_self=`ebgp`),o&&!c.rr&&(c.rr_client=!0),r.push(c))}}function Hd(e,t,n,r){let i=e.bgp,a=Number(i.as);for(let i of e.interfaces??[])if(i.bgp!==!1&&(typeof i.ipv4==`string`||typeof i.ipv6==`string`))for(let e of i.neighbors??[]){let o=n.nodes?.[e.node];if(!o)continue;let s=Number(o.bgp?.as);if(!Number.isFinite(s)||s<=0||s===a)continue;let c={};typeof e.ipv4==`string`&&(c.ipv4=e.ipv4),typeof e.ipv6==`string`&&(c.ipv6=e.ipv6);let l=Ud(o,c,`ebgp`,t,{ifindex:i.ifindex??0});l&&(l.as=s,r.push(l))}}function Ud(e,t,n,r,i={}){let a={...i,name:e.name??``,as:e.bgp?.as,type:n},o=0;for(let e of[`ipv4`,`ipv6`]){if(!(r[e]??[]).includes(n)||!(e in t))continue;o++;let i=t[e];typeof i==`boolean`?a[e]=i:typeof i==`string`&&(a[e]=i.split(`/`)[0])}return o>0?a:null}function Wd(e,t){let n=t.defaults?.bgp?.advertise_roles??[`stub`],r=e.bgp,i=[...e.interfaces??[],...e.loopback?[e.loopback]:[]];for(let e of i){if(e.bgp===!1)continue;let i=e.bgp??{};if(`advertise`in i){e.bgp=i;continue}let a=e.role,o=e.type;o&&n.includes(o)||a&&n.includes(a)?(i.advertise=a!==`stub`||Gd(e,t),e.bgp=i):o===`loopback`&&r.advertise_loopback&&(i.advertise=!0,e.bgp=i)}}function Gd(e,t){for(let n of e.neighbors??[]){let e=t.nodes?.[n.node];if(e&&e.role!==`host`)return!1}return!0}function Kd(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise.filter(e=>e&&typeof e==`object`):[];Array.isArray(t.advertise)||(t.advertise=n);let r=[...e.loopback?[e.loopback]:[],...e.interfaces??[]];for(let e of r){if(!e.bgp?.advertise)continue;let t={};for(let n of[`ipv4`,`ipv6`])typeof e[n]==`string`&&(t[n]=nu(String(e[n])));Object.keys(t).length&&n.push(t)}n.length?t.advertise=n:delete t.advertise}function qd(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise:[];for(let e of[`ipv4`,`ipv6`])t[e]||n.some(t=>e in t)&&(t[e]=!0)}function Jd(e){let t=e.bgp,n=t.community;if(!n||typeof n!=`object`)return;let r=Object.fromEntries(Object.entries(n).map(([e,t])=>[e,Array.isArray(t)?[...t]:t]));for(let[e,t]of Object.entries(Md))!(e in r)&&t in r&&(r[e]=[...r[t]??[]]);t.community=r}var Yd={name:`bgp`,module_init:Nd,node_pre_transform:Pd,link_pre_transform:Fd,module_post_transform:Id,node_post_transform:Ld},Xd=s({default:()=>af,module_init:()=>tf,module_pre_transform:()=>nf,name:()=>Zd,node_post_transform:()=>rf}),Zd=`evpn`;function Qd(e){return e.vlans??{}}function $d(e){let t=e.defaults?.evpn;return t&&typeof t==`object`&&!Array.isArray(t)?t:{}}function ef(e,t){let n=Number(t?.bgp?.as);if(Number.isFinite(n)&&n>0)return n;let r=Number(e.bgp?.as);if(Number.isFinite(r)&&r>0)return r;let i=Number(e.evpn?.as??$d(e).as);if(Number.isFinite(i)&&i>0)return i}function tf(e,t){e.evpn||={},e.vxlan||={},e.vxlan.flooding=`evpn`}function nf(e,t){let n=Qd(e),r=e.evpn??{},i=ef(e),a;a=Array.isArray(r.vlans)&&r.vlans.length?r.vlans.map(String):Object.entries(n).filter(([,e])=>typeof e?.vni==`number`).map(([e])=>e),r.vlans=a;for(let e of a){let t=n[e];if(!t)continue;let r=t.evpn??{};r.evi===void 0&&(r.evi=t.id??0);let a=r.evi;if(i!==void 0){let e=`${i}:${a}`;r.import||=[e],r.export||=[e]}t.evpn=r}e.evpn=r}function rf(e,t,n){if(!(e.module??[]).includes(`evpn`))return;let r=t.evpn??{},i=e.evpn??{};if(i.transport===void 0&&(i.transport=r.transport??$d(t).transport??`vxlan`),!Array.isArray(i.session)||!i.session.length){let e=$d(t).session;i.session=Array.isArray(r.session)?[...r.session]:Array.isArray(e)?[...e]:[`ibgp`]}let a=Qd(t),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(a)).filter(e=>typeof a[e]?.vni==`number`);i.vlans=o;let s=String(e.bgp?.router_id??``),c={...e.vlans??{}};for(let e of o){let t=a[e],n=t.evpn??{},r={...c[e]??{},id:t.id,mode:t.mode,vni:t.vni,evpn:{...n}},i=n.evi;s&&i!==void 0&&r.evpn.rd===void 0&&(r.evpn.rd=`${s}:${i}`),c[e]=r}Object.keys(c).length&&(e.vlans=c);let l=new Set(i.session.map(String)),u=e.bgp??{},d=Array.isArray(u.neighbors)?u.neighbors:Array.isArray(u.neighbor)?u.neighbor:[];for(let e of d){let n=String(e.name??``),r=t.nodes?.[n];if(!r||!(r.module??[]).includes(`evpn`))continue;let i=String(e.type??``);l.has(i)&&e.evpn===void 0&&(e.evpn=`ipv4`)}u.neighbors=d,delete u.neighbor,e.bgp=u,e.evpn=i}var af={name:Zd,module_init:tf,module_pre_transform:nf,node_post_transform:rf};function of(e){let t=e.name;return{...e,requires:ti(t),transform_after:ni(t)}}var sf=[of(Pu),of(ad),of(ld),of(bd),of(Td),of(Ad),of(Xd)];function cf(e,t=`transform_after`){let n=new Map(sf.map(e=>[e.name,e])),r=[],i=new Set,a=new Set;function o(e){return t===`config_after`?ri(e):n.get(e)?.transform_after??ni(e)}function s(t){if(a.has(t)||i.has(t))return;i.add(t);let c=n.get(t)?.requires??ti(t);for(let n of[...c,...o(t)])e.includes(n)&&s(n);i.delete(t),a.add(t),r.push(t)}for(let t of e)s(t);return r}function lf(e,t=`transform_after`){let n=new Set(e.module??[]);for(let t of Object.values(e.nodes??{}))for(let e of t.module??[])n.add(e);return cf([...n],t)}function uf(e){let t=e.defaults??{},n=new Set(sf.map(e=>e.name));for(let r of lf(e)){if(!n.has(r))continue;let i=t[r]??Qr(r)??{},a=e[r]??{};e[r]=O(ei(i),a);for(let t of Object.values(e.nodes??{})){if(!(t.module??[]).includes(r))continue;let n=t[r]??{},i=O(e[r],n);Object.keys(i).length!==0&&(t[r]=i)}}}function X(e,t,n){let r=lf(t);for(let i of r){let r=sf.find(e=>e.name===i);if(!r)continue;let a=r[e];if(typeof a==`function`){if(e.startsWith(`node_`))for(let e of Object.values(t.nodes??{}))(e.module??[]).includes(i)&&a(e,t,n);else if(e.startsWith(`link_`))for(let e of t.links??[])a(e,t,n);else a(t,n)}}}function df(e){for(let t of Object.values(e.nodes??{}))for(let e of t.module??[]){let n=ii(e);if(!n.length)continue;let r=t[e]??{};for(let i of t.interfaces??[]){let t=i[e]??{};for(let e of n)t[e]===void 0&&r[e]!==void 0&&(t[e]=r[e]);i[e]=t}}}function ff(e,t){let n=new Set(sf.map(e=>e.name));for(let r of Object.values(e.nodes??{}))for(let e of r.module??[])n.has(e)||t.error({code:`VALUE`,category:`VALUE`,module:`modules`,message:`Unknown module ${e} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(let r of e.module??[])n.has(r)||t.error({code:`VALUE`,category:`VALUE`,module:`modules`,message:`Unknown module ${r}`,path:`module`})}function pf(e,t){e.provider||=`clab`,e.provider!==`clab`&&t.diagnostics.error({code:`VALUE`,category:`VALUE`,module:`provider`,message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:`provider`})}function mf(e,t){e.provider||=`clab`}function hf(e){for(let t of Object.values(e.nodes??{}))t.device===`bird`&&_f(t)}function gf(e){return`(rt,${e.split(`:`).join(`,`)})`}function _f(e){let t=e.vrfs;if(t)for(let e of Object.values(t))for(let t of[`import`,`export`]){let n=e[t];Array.isArray(n)&&(e[`netlab-internal:_bird_${t}`]=n.map(e=>typeof e==`string`?gf(e):e))}}function vf(e,t={}){let n=new Gr,r={diagnostics:n,devices:jl()};if(fi(e),pf(e,r),Ou(e),e.nodes=cu(e.nodes,n),ku(e),Mu(e),vu(e,n),Au(e),uu(e,n),Array.isArray(e.module)&&e.module.length>0)for(let t of Object.values(e.nodes))`module`in t||(t.role!==`host`||t[`netlab-internal:_daemon`])&&(t.module=[...e.module]);uf(e),ju(e),ff(e,n),X(`module_init`,e,r),Ul(e),t.afterSetup?.(e,r),X(`module_pre_transform`,e,r),X(`node_pre_transform`,e,r),du(e),X(`link_pre_transform`,e,r),Cu(e),X(`module_post_link_transform`,e,r),X(`link_post_transform`,e,r),X(`module_post_transform`,e,r),df(e),X(`node_post_transform`,e,r),t.afterAddressed?.(e,r),hf(e),mf(e,r),e.module=lf(e,`config_after`);for(let t of Object.values(e.nodes??{}))Array.isArray(t.module)&&t.module.length>0&&(t.module=cf(t.module,`config_after`));return t.afterTransformed?.(e,r),{topology:e,diagnostics:n,ctx:r}}function yf(e,t={}){let n={},r=t.validate===!0,i=(e,i,a)=>{if(!r)return;let o=wl(e,i,{yangDir:t.yangDir,diagnostics:a});n[i]=o.ok,t.snapshots?.set(i,structuredClone(e))},{topology:a,diagnostics:o}=vf(e,{afterSetup:(e,t)=>{let n=t.diagnostics;i(e,`user_input`,n),i(e,`normalized`,n)},afterAddressed:(e,t)=>{i(e,`addressed`,t.diagnostics)},afterTransformed:(e,t)=>{i(e,`transformed`,t.diagnostics)}});return{topology:a,diagnostics:o,stages:n}}function bf(e){let t=new Set,n=[];for(let r of e.links??[]){let e=r.interfaces??[];if(!(e.length<2))for(let r=0;r<e.length;r++)for(let i=r+1;i<e.length;i++){let a=String(e[r].node),o=String(e[i].node);if(!a||!o||a===o)continue;let s=a<o?`${a}\0${o}`:`${o}\0${a}`;t.has(s)||(t.add(s),n.push(a<o?[a,o]:[o,a]))}}return n}function xf(e,t){if(e.length<4||t.length<2)return 0;let n=new Map;e.forEach((e,t)=>n.set(e,t));let r=[];for(let[e,i]of t){let t=n.get(e),a=n.get(i);t!==void 0&&a!==void 0&&r.push(t<a?[t,a]:[a,t])}let i=0;for(let e=0;e<r.length;e++){let[t,n]=r[e];for(let a=e+1;a<r.length;a++){let[e,o]=r[a];t!==e&&t!==o&&n!==e&&n!==o&&(t<e&&e<n&&n<o||e<t&&t<o&&o<n)&&i++}}return i}function Sf(e,t){let n=new Map;for(let t of e)n.set(t,0);for(let[e,r]of t)n.has(e)&&n.set(e,(n.get(e)??0)+1),n.has(r)&&n.set(r,(n.get(r)??0)+1);return n}function Cf(e,t){if(e.length===0)return[];let n=Sf(e,t),r=new Map;for(let t of e)r.set(t,[]);for(let[e,n]of t)r.has(e)&&r.has(n)&&(r.get(e).push(n),r.get(n).push(e));for(let e of r.values())e.sort((e,t)=>e.localeCompare(t));let i=e[0],a=n.get(i)??0;for(let t of e){let e=n.get(t)??0;(e>a||e===a&&t.localeCompare(i)<0)&&(i=t,a=e)}let o=[],s=new Set,c=[i];for(s.add(i);c.length;){let e=c.shift();o.push(e);for(let t of r.get(e)??[])s.has(t)||(s.add(t),c.push(t))}let l=e.filter(e=>!s.has(e)).sort((e,t)=>e.localeCompare(t));for(let e of l){if(s.has(e))continue;let t=[e];for(s.add(e);t.length;){let e=t.shift();o.push(e);for(let n of r.get(e)??[])s.has(n)||(s.add(n),t.push(n))}}return o}function wf(e,t){if(e.length===0)return 0;let n=0,r=0;for(let i of e){let e=2*Math.PI*i/t;n+=Math.cos(e),r+=Math.sin(e)}let i=Math.atan2(r/e.length,n/e.length),a=Math.round(i/(2*Math.PI)*t);return a=(a%t+t)%t,a}function Tf(e,t){let n=e.length;if(n<3)return e.slice();let r=new Map;for(let t of e)r.set(t,[]);for(let[e,n]of t)r.has(e)&&r.has(n)&&(r.get(e).push(n),r.get(n).push(e));let i=new Map;e.forEach((e,t)=>i.set(e,t));let a=new Map;for(let t of e){let e=r.get(t)??[];if(e.length===0){a.set(t,i.get(t));continue}let o=e.map(e=>i.get(e));a.set(t,wf(o,n))}return e.slice().sort((e,t)=>{let n=a.get(e),r=a.get(t);if(n!==r)return n-r;let o=i.get(e),s=i.get(t);return o===s?e.localeCompare(t):o-s})}function Ef(e,t){let n=e.slice(),r=xf(n,t),i=!0;for(;i;){i=!1;for(let e=0;e<n.length;e++){let a=(e+1)%n.length,o=n.slice(),s=o[e];o[e]=o[a],o[a]=s;let c=xf(o,t);if(c<r){for(let e=0;e<n.length;e++)n[e]=o[e];r=c,i=!0}}}return n}function Df(e){if(e.length===0)return[[]];if(e.length===1)return[[e[0]]];let t=[],n=Array(e.length).fill(!1),r=[],i=()=>{if(r.length===e.length)t.push(r.slice());else for(let t=0;t<e.length;t++)n[t]||(n[t]=!0,r.push(e[t]),i(),r.pop(),n[t]=!1)};return i(),t}function Of(e,t){if(e.length<=1)return e.slice();if(t.length===0)return e.slice().sort((e,t)=>e.localeCompare(t));if(e.length<=8){let n=e.slice(),r=xf(n,t);for(let i of Df(e)){let e=xf(i,t);if(e<r&&(n=i,r=e,r===0))break}return n}let n=Cf(e,t),r=n.slice(),i=xf(r,t);for(let e=0;e<24;e++){n=Tf(n,t),n=Ef(n,t);let e=xf(n,t);if(e<i&&(r=n.slice(),i=e,i===0))break}let a=r.slice().reverse();return xf(a,t)<i?a:r}var kf=[{title:`BGP basic labs`,url:`https://github.com/bgplab/bgplab/tree/master`,include:[`basic/*/topology.yml`]},{title:`netlab integration`,url:`https://github.com/ipspace/netlab/tree/dev/tests/integration`,include:[`bgp/*.{yml,yaml}`,`evpn/*.{yml,yaml}`,`evpn.multihoming/*.{yml,yaml}`,`gateway/*.{yml,yaml}`,`isis/*.{yml,yaml}`,`mpls/*.{yml,yaml}`,`ospf/*/*.{yml,yaml}`,`vlan/*.{yml,yaml}`,`vxlan/*.{yml,yaml}`]}];function Af(e){let t=`^`;for(let n=0;n<e.length;n++){let r=e[n];t+=r===`*`?`[^/]*`:r===`?`?`[^/]`:r.replace(/[.+^${}()|[\]\\]/g,`\\$&`)}return RegExp(t+`$`)}async function jf(e,t=fetch){let[n,r,,i,...a]=new URL(e.url).pathname.split(`/`).filter(Boolean),o=a.length?a.join(`/`)+`/`:``,s=e.include.flatMap(e=>{let t=/\{([^{}]+)\}/.exec(e);return t?t[1].split(`,`).map(n=>Af(e.replace(t[0],n))):[Af(e)]}),c=await t(`https://api.github.com/repos/${n}/${r}/git/trees/${encodeURIComponent(i)}?recursive=1`);if(!c.ok)throw Error(`${e.title}: HTTP ${c.status}`);let l=await c.json();if(l.truncated)throw Error(`${e.title}: incomplete GitHub file list`);return l.tree.filter(e=>e.type===`blob`&&e.path.startsWith(o)).map(e=>({path:e.path.slice(o.length),url:`https://raw.githubusercontent.com/${n}/${r}/${encodeURIComponent(i)}/${e.path.split(`/`).map(encodeURIComponent).join(`/`)}`})).filter(e=>s.some(t=>t.test(e.path))).sort((e,t)=>e.path.localeCompare(t.path))}var Mf=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;function Nf(e){let t=new Date(e);if(Number.isNaN(t.getTime()))return e;let n=e=>String(e).padStart(2,`0`);return`${t.getUTCFullYear()}-${n(t.getUTCMonth()+1)}-${n(t.getUTCDate())} ${n(t.getUTCHours())}:${n(t.getUTCMinutes())}:${n(t.getUTCSeconds())} UTC`}var Z=document.querySelector(`#app`);Z.innerHTML=`
  <header>
    <p class="build-time" title="Build timestamp">Built ${Nf(`2026-11-20T14:40:56.796Z`)}</p>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
      <label for="examples">GitHub topologies</label>
      <select id="examples" disabled><option value="">Loading topologies…</option></select>
      <p id="catalog-status" role="status"></p>
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false" rows="1"></textarea>
      <div class="actions">
        <button id="run" type="button">Transform</button>
        <label class="check">
          <input id="validate" type="checkbox" />
          Validate (YANG)
        </label>
        <span id="status"></span>
      </div>
      <div id="diagnostics" class="diagnostics" hidden></div>
    </section>
    <section class="view">
      <div class="graph-wrap">
        <h2>Graph</h2>
        <svg id="graph" viewBox="0 0 640 360" role="img" aria-label="Topology graph"></svg>
      </div>
      <div class="json-wrap">
        <div class="json-head">
          <h2>Transformed JSON</h2>
          <label class="check">
            <input id="full-json" type="checkbox" />
            Full JSON
          </label>
        </div>
        <pre id="out"></pre>
      </div>
    </section>
  </main>
`;var Q=Z.querySelector(`#examples`),Pf=Z.querySelector(`#catalog-status`),$=Z.querySelector(`#src`),Ff=Z.querySelector(`#out`),If=Z.querySelector(`#status`),Lf=Z.querySelector(`#diagnostics`),Rf=Z.querySelector(`#graph`),zf=Z.querySelector(`#run`),Bf=Z.querySelector(`#validate`),Vf=Z.querySelector(`#full-json`),Hf,Uf;$.value=Mf;function Wf(){$.style.height=`auto`,$.style.height=`${$.scrollHeight}px`}function Gf(e){let t=e.path?` (${e.path})`:``;return`[${e.module}/${e.code}] ${e.message}${t}`}function Kf(){Lf.hidden=!0,Lf.innerHTML=``,If.classList.remove(`is-error`,`is-warning`)}function qf(e){let t=e.errors??[],n=e.warnings??[];if(!t.length&&!n.length){Kf();return}If.classList.toggle(`is-error`,t.length>0),If.classList.toggle(`is-warning`,t.length===0&&n.length>0),Lf.hidden=!1;let r=[];t.length&&r.push(`
      <div class="diag-block is-error">
        <h2>Transform errors</h2>
        <ul>
          ${t.map(e=>`<li>${Jf(e)}</li>`).join(``)}
        </ul>
        ${e.sourceUrl?`<p>Lab file: ${Jf(e.sourceUrl)}</p>`:``}
        <button class="copy-error" type="button">Copy error text</button>
        <span class="copy-status" role="status"></span>
      </div>`),n.length&&r.push(`
      <div class="diag-block is-warning">
        <h2>Transform warnings</h2>
        <ul>
          ${n.map(e=>`<li>${Jf(e)}</li>`).join(``)}
        </ul>
      </div>`),Lf.innerHTML=r.join(``);let i=Lf.querySelector(`.copy-error`);if(i){let n=[`Transform errors`,...t,...e.sourceUrl?[`Lab file: ${e.sourceUrl}`]:[]].join(`
`);i.addEventListener(`click`,async()=>{let e=Lf.querySelector(`.copy-status`);try{await navigator.clipboard.writeText(n),e.textContent=`Copied.`}catch{e.textContent=`Could not copy. Select the text and copy it manually.`}})}}function Jf(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function Yf(e){if(!e){Ff.textContent=``;return}let t=Vf.checked?e:{nodes:e.nodes??{},links:e.links??[]};Ff.textContent=JSON.stringify(t,null,2)}function Xf(e){let t=Object.keys(e.nodes??{}),n=bf(e),r=Of(t,n),i=115.2,a=new Map;r.forEach((e,t)=>{let n=2*Math.PI*t/Math.max(r.length,1)-Math.PI/2;a.set(e,{x:320+i*Math.cos(n),y:180+i*Math.sin(n)})}),Rf.innerHTML=`${n.map(([e,t])=>{let n=a.get(e),r=a.get(t);return!n||!r?``:`<line x1="${n.x}" y1="${n.y}" x2="${r.x}" y2="${r.y}" class="edge"/>`}).filter(Boolean).join(``)}${r.map(t=>{let n=a.get(t),r=String(e.nodes?.[t]?.device??``);return`
        <g class="node">
          <circle cx="${n.x}" cy="${n.y}" r="28"/>
          <text x="${n.x}" y="${n.y-2}" text-anchor="middle">${t}</text>
          <text x="${n.x}" y="${n.y+14}" text-anchor="middle" class="sub">${r}</text>
        </g>`}).join(``)}`}function Zf(){If.textContent=`Running…`,Kf();try{let e=$n($.value);if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Topology must be a YAML object`);let{topology:t,diagnostics:n,stages:r}=yf(di($.value),{validate:Bf.checked,yangDir:`/yang`});Hf=t,Yf(t),Xf(t);let i=n.list().filter(e=>e.severity===`error`),a=n.list().filter(e=>e.severity===`warning`),o=[];i.length&&o.push(`${i.length} error(s)`),a.length&&o.push(`${a.length} warning(s)`),If.textContent=o.length?`${o.join(`, `)}; stages: ${JSON.stringify(r)}`:`OK — stages: ${JSON.stringify(r)}`,qf({errors:i.map(Gf),sourceUrl:Uf,warnings:a.map(Gf)})}catch(e){let t=e instanceof Error?e.message:String(e);If.textContent=`Transform failed`,qf({errors:[t],sourceUrl:Uf}),Hf=void 0,Yf(void 0),Rf.innerHTML=``}}var Qf=0;Q.addEventListener(`change`,async()=>{let e=++Qf;if(Q.value){Pf.textContent=`Loading topology…`;try{let t=await fetch(Q.value);if(!t.ok)throw Error(`HTTP ${t.status}`);let n=await t.text();if(e!==Qf)return;$.value=n,Uf=Q.value,Wf(),Pf.textContent=`Topology loaded. Edit it or select Transform.`}catch(t){if(e!==Qf)return;Pf.textContent=`Could not load topology: ${t instanceof Error?t.message:String(t)}. Choose it again to retry.`,Q.value=``}}}),$.addEventListener(`input`,()=>{++Qf,Q.value=``,Wf()}),Promise.allSettled(kf.map(e=>jf(e))).then(e=>{Q.replaceChildren(new Option(`Choose a topology…`,``));let t=[];e.forEach((e,n)=>{if(e.status===`rejected`){t.push(String(e.reason));return}let r=document.createElement(`optgroup`);r.label=kf[n].title;for(let t of e.value)r.append(new Option(t.path,t.url));Q.append(r)}),Q.disabled=Q.options.length<=1,Pf.textContent=t.length?`Some lists could not load: ${t.join(`; `)}`:`Select a topology from GitHub.`}),zf.addEventListener(`click`,Zf),Vf.addEventListener(`change`,()=>Yf(Hf)),Wf(),Zf();