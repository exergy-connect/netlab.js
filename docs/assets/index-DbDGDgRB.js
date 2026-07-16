var ka=Object.defineProperty;var Na=(e,n,t)=>n in e?ka(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var g=(e,n,t)=>Na(e,typeof n!="symbol"?n+"":n,t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();function $a(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var K={},Cn={},pe={},cr;function mn(){if(cr)return pe;cr=1;function e(o){return typeof o>"u"||o===null}function n(o){return typeof o=="object"&&o!==null}function t(o){return Array.isArray(o)?o:e(o)?[]:[o]}function r(o,l){if(l){const c=Object.keys(l);for(let u=0,f=c.length;u<f;u+=1){const m=c[u];o[m]=l[m]}}return o}function i(o,l){let c="";for(let u=0;u<l;u+=1)c+=o;return c}function a(o){return o===0&&Number.NEGATIVE_INFINITY===1/o}return pe.isNothing=e,pe.isObject=n,pe.toArray=t,pe.repeat=i,pe.isNegativeZero=a,pe.extend=r,pe}var pt,ur;function _n(){if(ur)return pt;ur=1;function e(t,r){let i="";const a=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(i+='in "'+t.mark.name+'" '),i+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!r&&t.mark.snippet&&(i+=`

`+t.mark.snippet),a+" "+i):a}function n(t,r){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=r,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.toString=function(r){return this.name+": "+e(this,r)},pt=n,pt}var ft,pr;function Ca(){if(pr)return ft;pr=1;const e=mn();function n(i,a,o,l,c){let u="",f="";const m=Math.floor(c/2)-1;return l-a>m&&(u=" ... ",a=l-m+u.length),o-l>m&&(f=" ...",o=l+m-f.length),{str:u+i.slice(a,o).replace(/\t/g,"→")+f,pos:l-a+u.length}}function t(i,a){return e.repeat(" ",a-i.length)+i}function r(i,a){if(a=Object.create(a||null),!i.buffer)return null;a.maxLength||(a.maxLength=79),typeof a.indent!="number"&&(a.indent=1),typeof a.linesBefore!="number"&&(a.linesBefore=3),typeof a.linesAfter!="number"&&(a.linesAfter=2);const o=/\r?\n|\r|\0/g,l=[0],c=[];let u,f=-1;for(;u=o.exec(i.buffer);)c.push(u.index),l.push(u.index+u[0].length),i.position<=u.index&&f<0&&(f=l.length-2);f<0&&(f=l.length-1);let m="";const _=Math.min(i.line+a.linesAfter,c.length).toString().length,y=a.maxLength-(a.indent+_+3);for(let h=1;h<=a.linesBefore&&!(f-h<0);h++){const w=n(i.buffer,l[f-h],c[f-h],i.position-(l[f]-l[f-h]),y);m=e.repeat(" ",a.indent)+t((i.line-h+1).toString(),_)+" | "+w.str+`
`+m}const d=n(i.buffer,l[f],c[f],i.position,y);m+=e.repeat(" ",a.indent)+t((i.line+1).toString(),_)+" | "+d.str+`
`,m+=e.repeat("-",a.indent+_+3+d.pos)+`^
`;for(let h=1;h<=a.linesAfter&&!(f+h>=c.length);h++){const w=n(i.buffer,l[f+h],c[f+h],i.position-(l[f]-l[f+h]),y);m+=e.repeat(" ",a.indent)+t((i.line+h+1).toString(),_)+" | "+w.str+`
`}return m.replace(/\n$/,"")}return ft=r,ft}var dt,fr;function X(){if(fr)return dt;fr=1;const e=_n(),n=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],t=["scalar","sequence","mapping"];function r(a){const o={};return a!==null&&Object.keys(a).forEach(function(l){a[l].forEach(function(c){o[String(c)]=l})}),o}function i(a,o){if(o=o||{},Object.keys(o).forEach(function(l){if(n.indexOf(l)===-1)throw new e('Unknown option "'+l+'" is met in definition of "'+a+'" YAML type.')}),this.options=o,this.tag=a,this.kind=o.kind||null,this.resolve=o.resolve||function(){return!0},this.construct=o.construct||function(l){return l},this.instanceOf=o.instanceOf||null,this.predicate=o.predicate||null,this.represent=o.represent||null,this.representName=o.representName||null,this.defaultStyle=o.defaultStyle||null,this.multi=o.multi||!1,this.styleAliases=r(o.styleAliases||null),t.indexOf(this.kind)===-1)throw new e('Unknown kind "'+this.kind+'" is specified for "'+a+'" YAML type.')}return dt=i,dt}var mt,dr;function xi(){if(dr)return mt;dr=1;const e=_n(),n=X();function t(a,o){const l=[];return a[o].forEach(function(c){let u=l.length;l.forEach(function(f,m){f.tag===c.tag&&f.kind===c.kind&&f.multi===c.multi&&(u=m)}),l[u]=c}),l}function r(){const a={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(l){l.multi?(a.multi[l.kind].push(l),a.multi.fallback.push(l)):a[l.kind][l.tag]=a.fallback[l.tag]=l}for(let l=0,c=arguments.length;l<c;l+=1)arguments[l].forEach(o);return a}function i(a){return this.extend(a)}return i.prototype.extend=function(o){let l=[],c=[];if(o instanceof n)c.push(o);else if(Array.isArray(o))c=c.concat(o);else if(o&&(Array.isArray(o.implicit)||Array.isArray(o.explicit)))o.implicit&&(l=l.concat(o.implicit)),o.explicit&&(c=c.concat(o.explicit));else throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");l.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),c.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const u=Object.create(i.prototype);return u.implicit=(this.implicit||[]).concat(l),u.explicit=(this.explicit||[]).concat(c),u.compiledImplicit=t(u,"implicit"),u.compiledExplicit=t(u,"explicit"),u.compiledTypeMap=r(u.compiledImplicit,u.compiledExplicit),u},mt=i,mt}var _t,mr;function wi(){if(mr)return _t;mr=1;const e=X();return _t=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),_t}var ht,_r;function Si(){if(_r)return ht;_r=1;const e=X();return ht=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),ht}var yt,hr;function Ai(){if(hr)return yt;hr=1;const e=X();return yt=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),yt}var gt,yr;function Ii(){if(yr)return gt;yr=1;const e=xi();return gt=new e({explicit:[wi(),Si(),Ai()]}),gt}var vt,gr;function Ti(){if(gr)return vt;gr=1;const e=X();function n(i){if(i===null)return!0;const a=i.length;return a===1&&i==="~"||a===4&&(i==="null"||i==="Null"||i==="NULL")}function t(){return null}function r(i){return i===null}return vt=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),vt}var bt,vr;function Ei(){if(vr)return bt;vr=1;const e=X();function n(i){if(i===null)return!1;const a=i.length;return a===4&&(i==="true"||i==="True"||i==="TRUE")||a===5&&(i==="false"||i==="False"||i==="FALSE")}function t(i){return i==="true"||i==="True"||i==="TRUE"}function r(i){return Object.prototype.toString.call(i)==="[object Boolean]"}return bt=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{lowercase:function(i){return i?"true":"false"},uppercase:function(i){return i?"TRUE":"FALSE"},camelcase:function(i){return i?"True":"False"}},defaultStyle:"lowercase"}),bt}var xt,br;function ki(){if(br)return xt;br=1;const e=mn(),n=X();function t(u){return u>=48&&u<=57||u>=65&&u<=70||u>=97&&u<=102}function r(u){return u>=48&&u<=55}function i(u){return u>=48&&u<=57}function a(u){if(u===null)return!1;const f=u.length;let m=0,_=!1;if(!f)return!1;let y=u[m];if((y==="-"||y==="+")&&(y=u[++m]),y==="0"){if(m+1===f)return!0;if(y=u[++m],y==="b"){for(m++;m<f;m++){if(y=u[m],y!=="0"&&y!=="1")return!1;_=!0}return _&&isFinite(o(u))}if(y==="x"){for(m++;m<f;m++){if(!t(u.charCodeAt(m)))return!1;_=!0}return _&&isFinite(o(u))}if(y==="o"){for(m++;m<f;m++){if(!r(u.charCodeAt(m)))return!1;_=!0}return _&&isFinite(o(u))}}for(;m<f;m++){if(!i(u.charCodeAt(m)))return!1;_=!0}return _?isFinite(o(u)):!1}function o(u){let f=u,m=1,_=f[0];if((_==="-"||_==="+")&&(_==="-"&&(m=-1),f=f.slice(1),_=f[0]),f==="0")return 0;if(_==="0"){if(f[1]==="b")return m*parseInt(f.slice(2),2);if(f[1]==="x")return m*parseInt(f.slice(2),16);if(f[1]==="o")return m*parseInt(f.slice(2),8)}return m*parseInt(f,10)}function l(u){return o(u)}function c(u){return Object.prototype.toString.call(u)==="[object Number]"&&u%1===0&&!e.isNegativeZero(u)}return xt=new n("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:l,predicate:c,represent:{binary:function(u){return u>=0?"0b"+u.toString(2):"-0b"+u.toString(2).slice(1)},octal:function(u){return u>=0?"0o"+u.toString(8):"-0o"+u.toString(8).slice(1)},decimal:function(u){return u.toString(10)},hexadecimal:function(u){return u>=0?"0x"+u.toString(16).toUpperCase():"-0x"+u.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),xt}var wt,xr;function Ni(){if(xr)return wt;xr=1;const e=mn(),n=X(),t=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),r=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i(u){return u===null||!t.test(u)?!1:isFinite(parseFloat(u,10))?!0:r.test(u)}function a(u){let f=u.toLowerCase();const m=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?m===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:m*parseFloat(f,10)}const o=/^[-+]?[0-9]+e/;function l(u,f){if(isNaN(u))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===u)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===u)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(u))return"-0.0";const m=u.toString(10);return o.test(m)?m.replace("e",".e"):m}function c(u){return Object.prototype.toString.call(u)==="[object Number]"&&(u%1!==0||e.isNegativeZero(u))}return wt=new n("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:a,predicate:c,represent:l,defaultStyle:"lowercase"}),wt}var St,wr;function $i(){return wr||(wr=1,St=Ii().extend({implicit:[Ti(),Ei(),ki(),Ni()]})),St}var At,Sr;function Ci(){return Sr||(Sr=1,At=$i()),At}var It,Ar;function Ri(){if(Ar)return It;Ar=1;const e=X(),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function r(o){return o===null?!1:n.exec(o)!==null||t.exec(o)!==null}function i(o){let l=0,c=null,u=n.exec(o);if(u===null&&(u=t.exec(o)),u===null)throw new Error("Date resolve error");const f=+u[1],m=+u[2]-1,_=+u[3];if(!u[4])return new Date(Date.UTC(f,m,_));const y=+u[4],d=+u[5],h=+u[6];if(u[7]){for(l=u[7].slice(0,3);l.length<3;)l+="0";l=+l}if(u[9]){const x=+u[10],k=+(u[11]||0);c=(x*60+k)*6e4,u[9]==="-"&&(c=-c)}const w=new Date(Date.UTC(f,m,_,y,d,h,l));return c&&w.setTime(w.getTime()-c),w}function a(o){return o.toISOString()}return It=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:r,construct:i,instanceOf:Date,represent:a}),It}var Tt,Ir;function Oi(){if(Ir)return Tt;Ir=1;const e=X();function n(t){return t==="<<"||t===null}return Tt=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:n}),Tt}var Et,Tr;function Pi(){if(Tr)return Et;Tr=1;const e=X(),n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function t(o){if(o===null)return!1;let l=0;const c=o.length,u=n;for(let f=0;f<c;f++){const m=u.indexOf(o.charAt(f));if(!(m>64)){if(m<0)return!1;l+=6}}return l%8===0}function r(o){const l=o.replace(/[\r\n=]/g,""),c=l.length,u=n;let f=0;const m=[];for(let y=0;y<c;y++)y%4===0&&y&&(m.push(f>>16&255),m.push(f>>8&255),m.push(f&255)),f=f<<6|u.indexOf(l.charAt(y));const _=c%4*6;return _===0?(m.push(f>>16&255),m.push(f>>8&255),m.push(f&255)):_===18?(m.push(f>>10&255),m.push(f>>2&255)):_===12&&m.push(f>>4&255),new Uint8Array(m)}function i(o){let l="",c=0;const u=o.length,f=n;for(let _=0;_<u;_++)_%3===0&&_&&(l+=f[c>>18&63],l+=f[c>>12&63],l+=f[c>>6&63],l+=f[c&63]),c=(c<<8)+o[_];const m=u%3;return m===0?(l+=f[c>>18&63],l+=f[c>>12&63],l+=f[c>>6&63],l+=f[c&63]):m===2?(l+=f[c>>10&63],l+=f[c>>4&63],l+=f[c<<2&63],l+=f[64]):m===1&&(l+=f[c>>2&63],l+=f[c<<4&63],l+=f[64],l+=f[64]),l}function a(o){return Object.prototype.toString.call(o)==="[object Uint8Array]"}return Et=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:t,construct:r,predicate:a,represent:i}),Et}var kt,Er;function Mi(){if(Er)return kt;Er=1;const e=X(),n=Object.prototype.hasOwnProperty,t=Object.prototype.toString;function r(a){if(a===null)return!0;const o=[],l=a;for(let c=0,u=l.length;c<u;c+=1){const f=l[c];let m=!1;if(t.call(f)!=="[object Object]")return!1;let _;for(_ in f)if(n.call(f,_))if(!m)m=!0;else return!1;if(!m)return!1;if(o.indexOf(_)===-1)o.push(_);else return!1}return!0}function i(a){return a!==null?a:[]}return kt=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:r,construct:i}),kt}var Nt,kr;function Di(){if(kr)return Nt;kr=1;const e=X(),n=Object.prototype.toString;function t(i){if(i===null)return!0;const a=i,o=new Array(a.length);for(let l=0,c=a.length;l<c;l+=1){const u=a[l];if(n.call(u)!=="[object Object]")return!1;const f=Object.keys(u);if(f.length!==1)return!1;o[l]=[f[0],u[f[0]]]}return!0}function r(i){if(i===null)return[];const a=i,o=new Array(a.length);for(let l=0,c=a.length;l<c;l+=1){const u=a[l],f=Object.keys(u);o[l]=[f[0],u[f[0]]]}return o}return Nt=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:t,construct:r}),Nt}var $t,Nr;function Li(){if(Nr)return $t;Nr=1;const e=X(),n=Object.prototype.hasOwnProperty;function t(i){if(i===null)return!0;const a=i;for(const o in a)if(n.call(a,o)&&a[o]!==null)return!1;return!0}function r(i){return i!==null?i:{}}return $t=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:t,construct:r}),$t}var Ct,$r;function qt(){return $r||($r=1,Ct=Ci().extend({implicit:[Ri(),Oi()],explicit:[Pi(),Mi(),Di(),Li()]})),Ct}var Cr;function Ra(){if(Cr)return Cn;Cr=1;const e=mn(),n=_n(),t=Ca(),r=qt(),i=Object.prototype.hasOwnProperty,a=1,o=2,l=3,c=4,u=1,f=2,m=3,_=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,y=/[\x85\u2028\u2029]/,d=/[,\[\]{}]/,h=/^(?:!|!!|![0-9A-Za-z-]+!)$/,w=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function x(s){return Object.prototype.toString.call(s)}function k(s){return s===10||s===13}function R(s){return s===9||s===32}function F(s){return s===9||s===32||s===10||s===13}function q(s){return s===44||s===91||s===93||s===123||s===125}function z(s){if(s>=48&&s<=57)return s-48;const v=s|32;return v>=97&&v<=102?v-97+10:-1}function H(s){return s===120?2:s===117?4:s===85?8:0}function gn(s){return s>=48&&s<=57?s-48:-1}function We(s){switch(s){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function it(s){return s<=65535?String.fromCharCode(s):String.fromCharCode((s-65536>>10)+55296,(s-65536&1023)+56320)}function Je(s,v,A){v==="__proto__"?Object.defineProperty(s,v,{configurable:!0,enumerable:!0,writable:!0,value:A}):s[v]=A}const vn=new Array(256),Xe=new Array(256);for(let s=0;s<256;s++)vn[s]=We(s)?1:0,Xe[s]=We(s);function G(s,v){this.input=s,this.filename=v.filename||null,this.schema=v.schema||r,this.onWarning=v.onWarning||null,this.legacy=v.legacy||!1,this.json=v.json||!1,this.listener=v.listener||null,this.maxDepth=typeof v.maxDepth=="number"?v.maxDepth:100,this.maxTotalMergeKeys=typeof v.maxTotalMergeKeys=="number"?v.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=s.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function bn(s,v){const A={name:s.filename,buffer:s.input.slice(0,-1),position:s.position,line:s.line,column:s.position-s.lineStart};return A.snippet=t(A),new n(v,A)}function D(s,v){throw bn(s,v)}function Me(s,v){s.onWarning&&s.onWarning.call(null,bn(s,v))}function te(s,v,A){const E=s.anchorMapTransactions;if(E.length!==0){const S=E[E.length-1];i.call(S,v)||(S[v]={existed:i.call(s.anchorMap,v),value:s.anchorMap[v]})}s.anchorMap[v]=A}function st(s){s.anchorMapTransactions.push(Object.create(null))}function ge(s){const v=s.anchorMapTransactions.pop(),A=s.anchorMapTransactions;if(A.length===0)return;const E=A[A.length-1],S=Object.keys(v);for(let O=0,p=S.length;O<p;O+=1){const b=S[O];i.call(E,b)||(E[b]=v[b])}}function at(s){const v=s.anchorMapTransactions.pop(),A=Object.keys(v);for(let E=A.length-1;E>=0;E-=1){const S=v[A[E]];S.existed?s.anchorMap[A[E]]=S.value:delete s.anchorMap[A[E]]}}function Qe(s){return{position:s.position,line:s.line,lineStart:s.lineStart,lineIndent:s.lineIndent,firstTabInLine:s.firstTabInLine,tag:s.tag,anchor:s.anchor,kind:s.kind,result:s.result}}function De(s,v){s.position=v.position,s.line=v.line,s.lineStart=v.lineStart,s.lineIndent=v.lineIndent,s.firstTabInLine=v.firstTabInLine,s.tag=v.tag,s.anchor=v.anchor,s.kind=v.kind,s.result=v.result}const xn={YAML:function(v,A,E){v.version!==null&&D(v,"duplication of %YAML directive"),E.length!==1&&D(v,"YAML directive accepts exactly one argument");const S=/^([0-9]+)\.([0-9]+)$/.exec(E[0]);S===null&&D(v,"ill-formed argument of the YAML directive");const O=parseInt(S[1],10),p=parseInt(S[2],10);O!==1&&D(v,"unacceptable YAML version of the document"),v.version=E[0],v.checkLineBreaks=p<2,p!==1&&p!==2&&Me(v,"unsupported YAML version of the document")},TAG:function(v,A,E){let S;E.length!==2&&D(v,"TAG directive accepts exactly two arguments");const O=E[0];S=E[1],h.test(O)||D(v,"ill-formed tag handle (first argument) of the TAG directive"),i.call(v.tagMap,O)&&D(v,'there is a previously declared suffix for "'+O+'" tag handle'),w.test(S)||D(v,"ill-formed tag prefix (second argument) of the TAG directive");try{S=decodeURIComponent(S)}catch{D(v,"tag prefix is malformed: "+S)}v.tagMap[O]=S}};function Q(s,v,A,E){if(v<A){const S=s.input.slice(v,A);if(E)for(let O=0,p=S.length;O<p;O+=1){const b=S.charCodeAt(O);b===9||b>=32&&b<=1114111||D(s,"expected valid JSON character")}else _.test(S)&&D(s,"the stream contains non-printable characters");s.result+=S}}function ue(s,v,A,E){e.isObject(A)||D(s,"cannot merge mappings; the provided source object is unacceptable");const S=Object.keys(A);for(let O=0,p=S.length;O<p;O+=1){const b=S[O];s.maxTotalMergeKeys!==-1&&++s.totalMergeKeys>s.maxTotalMergeKeys&&D(s,"merge keys exceeded maxTotalMergeKeys ("+s.maxTotalMergeKeys+")"),i.call(v,b)||(Je(v,b,A[b]),E[b]=!0)}}function re(s,v,A,E,S,O,p,b,$){if(Array.isArray(S)){S=Array.prototype.slice.call(S);for(let I=0,T=S.length;I<T;I+=1)Array.isArray(S[I])&&D(s,"nested arrays are not supported inside keys"),typeof S=="object"&&x(S[I])==="[object Object]"&&(S[I]="[object Object]")}if(typeof S=="object"&&x(S)==="[object Object]"&&(S="[object Object]"),S=String(S),v===null&&(v={}),E==="tag:yaml.org,2002:merge")if(Array.isArray(O))for(let I=0,T=O.length;I<T;I+=1)ue(s,v,O[I],A);else ue(s,v,O,A);else!s.json&&!i.call(A,S)&&i.call(v,S)&&(s.line=p||s.line,s.lineStart=b||s.lineStart,s.position=$||s.position,D(s,"duplicated mapping key")),Je(v,S,O),delete A[S];return v}function Le(s){const v=s.input.charCodeAt(s.position);v===10?s.position++:v===13?(s.position++,s.input.charCodeAt(s.position)===10&&s.position++):D(s,"a line break is expected"),s.line+=1,s.lineStart=s.position,s.firstTabInLine=-1}function U(s,v,A){let E=0,S=s.input.charCodeAt(s.position);for(;S!==0;){for(;R(S);)S===9&&s.firstTabInLine===-1&&(s.firstTabInLine=s.position),S=s.input.charCodeAt(++s.position);if(v&&S===35)do S=s.input.charCodeAt(++s.position);while(S!==10&&S!==13&&S!==0);if(k(S))for(Le(s),S=s.input.charCodeAt(s.position),E++,s.lineIndent=0;S===32;)s.lineIndent++,S=s.input.charCodeAt(++s.position);else break}return A!==-1&&E!==0&&s.lineIndent<A&&Me(s,"deficient indentation"),E}function Fe(s){let v=s.position,A=s.input.charCodeAt(v);return!!((A===45||A===46)&&A===s.input.charCodeAt(v+1)&&A===s.input.charCodeAt(v+2)&&(v+=3,A=s.input.charCodeAt(v),A===0||F(A)))}function ie(s,v){v===1?s.result+=" ":v>1&&(s.result+=e.repeat(`
`,v-1))}function wn(s,v,A){let E,S,O,p,b,$;const I=s.kind,T=s.result;let C=s.input.charCodeAt(s.position);if(F(C)||q(C)||C===35||C===38||C===42||C===33||C===124||C===62||C===39||C===34||C===37||C===64||C===96)return!1;if(C===63||C===45){const N=s.input.charCodeAt(s.position+1);if(F(N)||A&&q(N))return!1}for(s.kind="scalar",s.result="",E=S=s.position,O=!1;C!==0;){if(C===58){const N=s.input.charCodeAt(s.position+1);if(F(N)||A&&q(N))break}else if(C===35){const N=s.input.charCodeAt(s.position-1);if(F(N))break}else{if(s.position===s.lineStart&&Fe(s)||A&&q(C))break;if(k(C))if(p=s.line,b=s.lineStart,$=s.lineIndent,U(s,!1,-1),s.lineIndent>=v){O=!0,C=s.input.charCodeAt(s.position);continue}else{s.position=S,s.line=p,s.lineStart=b,s.lineIndent=$;break}}O&&(Q(s,E,S,!1),ie(s,s.line-p),E=S=s.position,O=!1),R(C)||(S=s.position+1),C=s.input.charCodeAt(++s.position)}return Q(s,E,S,!1),s.result?!0:(s.kind=I,s.result=T,!1)}function Sn(s,v){let A,E,S=s.input.charCodeAt(s.position);if(S!==39)return!1;for(s.kind="scalar",s.result="",s.position++,A=E=s.position;(S=s.input.charCodeAt(s.position))!==0;)if(S===39)if(Q(s,A,s.position,!0),S=s.input.charCodeAt(++s.position),S===39)A=s.position,s.position++,E=s.position;else return!0;else k(S)?(Q(s,A,E,!0),ie(s,U(s,!1,v)),A=E=s.position):s.position===s.lineStart&&Fe(s)?D(s,"unexpected end of the document within a single quoted scalar"):(s.position++,R(S)||(E=s.position));D(s,"unexpected end of the stream within a single quoted scalar")}function Ze(s,v){let A,E,S,O=s.input.charCodeAt(s.position);if(O!==34)return!1;for(s.kind="scalar",s.result="",s.position++,A=E=s.position;(O=s.input.charCodeAt(s.position))!==0;){if(O===34)return Q(s,A,s.position,!0),s.position++,!0;if(O===92){if(Q(s,A,s.position,!0),O=s.input.charCodeAt(++s.position),k(O))U(s,!1,v);else if(O<256&&vn[O])s.result+=Xe[O],s.position++;else if((S=H(O))>0){let p=S,b=0;for(;p>0;p--)O=s.input.charCodeAt(++s.position),(S=z(O))>=0?b=(b<<4)+S:D(s,"expected hexadecimal character");s.result+=it(b),s.position++}else D(s,"unknown escape sequence");A=E=s.position}else k(O)?(Q(s,A,E,!0),ie(s,U(s,!1,v)),A=E=s.position):s.position===s.lineStart&&Fe(s)?D(s,"unexpected end of the document within a double quoted scalar"):(s.position++,R(O)||(E=s.position))}D(s,"unexpected end of the stream within a double quoted scalar")}function An(s,v){let A=!0,E,S,O;const p=s.tag;let b;const $=s.anchor;let I,T,C,N;const M=Object.create(null);let P,L,j,V=s.input.charCodeAt(s.position);if(V===91)I=93,N=!1,b=[];else if(V===123)I=125,N=!0,b={};else return!1;for(s.anchor!==null&&te(s,s.anchor,b),V=s.input.charCodeAt(++s.position);V!==0;){if(U(s,!0,v),V=s.input.charCodeAt(s.position),V===I)return s.position++,s.tag=p,s.anchor=$,s.kind=N?"mapping":"sequence",s.result=b,!0;if(A?V===44&&D(s,"expected the node content, but found ','"):D(s,"missed comma between flow collection entries"),L=P=j=null,T=C=!1,V===63){const Y=s.input.charCodeAt(s.position+1);F(Y)&&(T=C=!0,s.position++,U(s,!0,v))}E=s.line,S=s.lineStart,O=s.position,ae(s,v,a,!1,!0),L=s.tag,P=s.result,U(s,!0,v),V=s.input.charCodeAt(s.position),(C||s.line===E)&&V===58&&(T=!0,V=s.input.charCodeAt(++s.position),U(s,!0,v),ae(s,v,a,!1,!0),j=s.result),N?re(s,b,M,L,P,j,E,S,O):T?b.push(re(s,null,M,L,P,j,E,S,O)):b.push(P),U(s,!0,v),V=s.input.charCodeAt(s.position),V===44?(A=!0,V=s.input.charCodeAt(++s.position)):A=!1}D(s,"unexpected end of the stream within a flow collection")}function In(s,v){let A,E=u,S=!1,O=!1,p=v,b=0,$=!1,I,T=s.input.charCodeAt(s.position);if(T===124)A=!1;else if(T===62)A=!0;else return!1;for(s.kind="scalar",s.result="";T!==0;)if(T=s.input.charCodeAt(++s.position),T===43||T===45)u===E?E=T===43?m:f:D(s,"repeat of a chomping mode identifier");else if((I=gn(T))>=0)I===0?D(s,"bad explicit indentation width of a block scalar; it cannot be less than one"):O?D(s,"repeat of an indentation width identifier"):(p=v+I-1,O=!0);else break;if(R(T)){do T=s.input.charCodeAt(++s.position);while(R(T));if(T===35)do T=s.input.charCodeAt(++s.position);while(!k(T)&&T!==0)}for(;T!==0;){for(Le(s),s.lineIndent=0,T=s.input.charCodeAt(s.position);(!O||s.lineIndent<p)&&T===32;)s.lineIndent++,T=s.input.charCodeAt(++s.position);if(!O&&s.lineIndent>p&&(p=s.lineIndent),k(T)){b++;continue}if(!O&&p===0&&D(s,"missing indentation for block scalar"),s.lineIndent<p){E===m?s.result+=e.repeat(`
`,S?1+b:b):E===u&&S&&(s.result+=`
`);break}A?R(T)?($=!0,s.result+=e.repeat(`
`,S?1+b:b)):$?($=!1,s.result+=e.repeat(`
`,b+1)):b===0?S&&(s.result+=" "):s.result+=e.repeat(`
`,b):s.result+=e.repeat(`
`,S?1+b:b),S=!0,O=!0,b=0;const C=s.position;for(;!k(T)&&T!==0;)T=s.input.charCodeAt(++s.position);Q(s,C,s.position,!1)}return!0}function se(s,v){const A=s.tag,E=s.anchor,S=[];let O=!1;if(s.firstTabInLine!==-1)return!1;s.anchor!==null&&te(s,s.anchor,S);let p=s.input.charCodeAt(s.position);for(;p!==0&&(s.firstTabInLine!==-1&&(s.position=s.firstTabInLine,D(s,"tab characters must not be used in indentation")),p===45);){const b=s.input.charCodeAt(s.position+1);if(!F(b))break;if(O=!0,s.position++,U(s,!0,-1)&&s.lineIndent<=v){S.push(null),p=s.input.charCodeAt(s.position);continue}const $=s.line;if(ae(s,v,l,!1,!0),S.push(s.result),U(s,!0,-1),p=s.input.charCodeAt(s.position),(s.line===$||s.lineIndent>v)&&p!==0)D(s,"bad indentation of a sequence entry");else if(s.lineIndent<v)break}return O?(s.tag=A,s.anchor=E,s.kind="sequence",s.result=S,!0):!1}function Tn(s,v,A){let E,S,O,p;const b=s.tag,$=s.anchor,I={},T=Object.create(null);let C=null,N=null,M=null,P=!1,L=!1;if(s.firstTabInLine!==-1)return!1;s.anchor!==null&&te(s,s.anchor,I);let j=s.input.charCodeAt(s.position);for(;j!==0;){!P&&s.firstTabInLine!==-1&&(s.position=s.firstTabInLine,D(s,"tab characters must not be used in indentation"));const V=s.input.charCodeAt(s.position+1),Y=s.line;if((j===63||j===58)&&F(V))j===63?(P&&(re(s,I,T,C,N,null,S,O,p),C=N=M=null),L=!0,P=!0,E=!0):P?(P=!1,E=!0):D(s,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),s.position+=1,j=V;else{if(S=s.line,O=s.lineStart,p=s.position,!ae(s,A,o,!1,!0))break;if(s.line===Y){for(j=s.input.charCodeAt(s.position);R(j);)j=s.input.charCodeAt(++s.position);if(j===58)j=s.input.charCodeAt(++s.position),F(j)||D(s,"a whitespace character is expected after the key-value separator within a block mapping"),P&&(re(s,I,T,C,N,null,S,O,p),C=N=M=null),L=!0,P=!1,E=!1,C=s.tag,N=s.result;else if(L)D(s,"can not read an implicit mapping pair; a colon is missed");else return s.tag=b,s.anchor=$,!0}else if(L)D(s,"can not read a block mapping entry; a multiline key may not be an implicit key");else return s.tag=b,s.anchor=$,!0}if((s.line===Y||s.lineIndent>v)&&(P&&(S=s.line,O=s.lineStart,p=s.position),ae(s,v,c,!0,E)&&(P?N=s.result:M=s.result),P||(re(s,I,T,C,N,M,S,O,p),C=N=M=null),U(s,!0,-1),j=s.input.charCodeAt(s.position)),(s.line===Y||s.lineIndent>v)&&j!==0)D(s,"bad indentation of a mapping entry");else if(s.lineIndent<v)break}return P&&re(s,I,T,C,N,null,S,O,p),L&&(s.tag=b,s.anchor=$,s.kind="mapping",s.result=I),L}function ot(s){let v=!1,A=!1,E,S,O=s.input.charCodeAt(s.position);if(O!==33)return!1;s.tag!==null&&D(s,"duplication of a tag property"),O=s.input.charCodeAt(++s.position),O===60?(v=!0,O=s.input.charCodeAt(++s.position)):O===33?(A=!0,E="!!",O=s.input.charCodeAt(++s.position)):E="!";let p=s.position;if(v){do O=s.input.charCodeAt(++s.position);while(O!==0&&O!==62);s.position<s.length?(S=s.input.slice(p,s.position),O=s.input.charCodeAt(++s.position)):D(s,"unexpected end of the stream within a verbatim tag")}else{for(;O!==0&&!F(O);)O===33&&(A?D(s,"tag suffix cannot contain exclamation marks"):(E=s.input.slice(p-1,s.position+1),h.test(E)||D(s,"named tag handle cannot contain such characters"),A=!0,p=s.position+1)),O=s.input.charCodeAt(++s.position);S=s.input.slice(p,s.position),d.test(S)&&D(s,"tag suffix cannot contain flow indicator characters")}S&&!w.test(S)&&D(s,"tag name cannot contain such characters: "+S);try{S=decodeURIComponent(S)}catch{D(s,"tag name is malformed: "+S)}return v?s.tag=S:i.call(s.tagMap,E)?s.tag=s.tagMap[E]+S:E==="!"?s.tag="!"+S:E==="!!"?s.tag="tag:yaml.org,2002:"+S:D(s,'undeclared tag handle "'+E+'"'),!0}function En(s){let v=s.input.charCodeAt(s.position);if(v!==38)return!1;s.anchor!==null&&D(s,"duplication of an anchor property"),v=s.input.charCodeAt(++s.position);const A=s.position;for(;v!==0&&!F(v)&&!q(v);)v=s.input.charCodeAt(++s.position);return s.position===A&&D(s,"name of an anchor node must contain at least one character"),s.anchor=s.input.slice(A,s.position),!0}function kn(s){let v=s.input.charCodeAt(s.position);if(v!==42)return!1;v=s.input.charCodeAt(++s.position);const A=s.position;for(;v!==0&&!F(v)&&!q(v);)v=s.input.charCodeAt(++s.position);s.position===A&&D(s,"name of an alias node must contain at least one character");const E=s.input.slice(A,s.position);return i.call(s.anchorMap,E)||D(s,'unidentified alias "'+E+'"'),s.result=s.anchorMap[E],U(s,!0,-1),!0}function lt(s,v,A,E){const S=Qe(s);return st(s),De(s,v),s.tag=null,s.anchor=null,s.kind=null,s.result=null,Tn(s,A,E)&&s.kind==="mapping"?(ge(s),!0):(at(s),De(s,S),!1)}function ae(s,v,A,E,S){let O,p,b=1,$=!1,I=!1,T=null,C,N,M;s.depth>=s.maxDepth&&D(s,"nesting exceeded maxDepth ("+s.maxDepth+")"),s.depth+=1,s.listener!==null&&s.listener("open",s),s.tag=null,s.anchor=null,s.kind=null,s.result=null;const P=O=p=c===A||l===A;if(E&&U(s,!0,-1)&&($=!0,s.lineIndent>v?b=1:s.lineIndent===v?b=0:s.lineIndent<v&&(b=-1)),b===1)for(;;){const L=s.input.charCodeAt(s.position),j=Qe(s);if($&&(L===33&&s.tag!==null||L===38&&s.anchor!==null)||!ot(s)&&!En(s))break;T===null&&(T=j),U(s,!0,-1)?($=!0,p=P,s.lineIndent>v?b=1:s.lineIndent===v?b=0:s.lineIndent<v&&(b=-1)):p=!1}if(p&&(p=$||S),b===1||c===A)if(a===A||o===A?N=v:N=v+1,M=s.position-s.lineStart,b===1)if(p&&(se(s,M)||Tn(s,M,N))||An(s,N))I=!0;else{const L=s.input.charCodeAt(s.position);T!==null&&P&&!p&&L!==124&&L!==62&&lt(s,T,T.position-T.lineStart,N)||O&&In(s,N)||Sn(s,N)||Ze(s,N)?I=!0:kn(s)?(I=!0,(s.tag!==null||s.anchor!==null)&&D(s,"alias node should not have any properties")):wn(s,N,a===A)&&(I=!0,s.tag===null&&(s.tag="?")),s.anchor!==null&&te(s,s.anchor,s.result)}else b===0&&(I=p&&se(s,M));if(s.tag===null)s.anchor!==null&&te(s,s.anchor,s.result);else if(s.tag==="?"){s.result!==null&&s.kind!=="scalar"&&D(s,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+s.kind+'"');for(let L=0,j=s.implicitTypes.length;L<j;L+=1)if(C=s.implicitTypes[L],C.resolve(s.result)){s.result=C.construct(s.result),s.tag=C.tag,s.anchor!==null&&te(s,s.anchor,s.result);break}}else if(s.tag!=="!"){if(i.call(s.typeMap[s.kind||"fallback"],s.tag))C=s.typeMap[s.kind||"fallback"][s.tag];else{C=null;const L=s.typeMap.multi[s.kind||"fallback"];for(let j=0,V=L.length;j<V;j+=1)if(s.tag.slice(0,L[j].tag.length)===L[j].tag){C=L[j];break}}C||D(s,"unknown tag !<"+s.tag+">"),s.result!==null&&C.kind!==s.kind&&D(s,"unacceptable node kind for !<"+s.tag+'> tag; it should be "'+C.kind+'", not "'+s.kind+'"'),C.resolve(s.result,s.tag)?(s.result=C.construct(s.result,s.tag),s.anchor!==null&&te(s,s.anchor,s.result)):D(s,"cannot resolve a node with !<"+s.tag+"> explicit tag")}return s.listener!==null&&s.listener("close",s),s.depth-=1,s.tag!==null||s.anchor!==null||I}function ct(s){const v=s.position;let A=!1,E;for(s.version=null,s.checkLineBreaks=s.legacy,s.tagMap=Object.create(null),s.anchorMap=Object.create(null);(E=s.input.charCodeAt(s.position))!==0&&(U(s,!0,-1),E=s.input.charCodeAt(s.position),!(s.lineIndent>0||E!==37));){A=!0,E=s.input.charCodeAt(++s.position);let S=s.position;for(;E!==0&&!F(E);)E=s.input.charCodeAt(++s.position);const O=s.input.slice(S,s.position),p=[];for(O.length<1&&D(s,"directive name must not be less than one character in length");E!==0;){for(;R(E);)E=s.input.charCodeAt(++s.position);if(E===35){do E=s.input.charCodeAt(++s.position);while(E!==0&&!k(E));break}if(k(E))break;for(S=s.position;E!==0&&!F(E);)E=s.input.charCodeAt(++s.position);p.push(s.input.slice(S,s.position))}E!==0&&Le(s),i.call(xn,O)?xn[O](s,O,p):Me(s,'unknown document directive "'+O+'"')}if(U(s,!0,-1),s.lineIndent===0&&s.input.charCodeAt(s.position)===45&&s.input.charCodeAt(s.position+1)===45&&s.input.charCodeAt(s.position+2)===45?(s.position+=3,U(s,!0,-1)):A&&D(s,"directives end mark is expected"),ae(s,s.lineIndent-1,c,!1,!0),U(s,!0,-1),s.checkLineBreaks&&y.test(s.input.slice(v,s.position))&&Me(s,"non-ASCII line breaks are interpreted as content"),s.documents.push(s.result),s.position===s.lineStart&&Fe(s)){s.input.charCodeAt(s.position)===46&&(s.position+=3,U(s,!0,-1));return}s.position<s.length-1&&D(s,"end of the stream or a document separator is expected")}function Nn(s,v){s=String(s),v=v||{},s.length!==0&&(s.charCodeAt(s.length-1)!==10&&s.charCodeAt(s.length-1)!==13&&(s+=`
`),s.charCodeAt(0)===65279&&(s=s.slice(1)));const A=new G(s,v),E=s.indexOf("\0");for(E!==-1&&(A.position=E,D(A,"null byte is not allowed in input")),A.input+="\0";A.input.charCodeAt(A.position)===32;)A.lineIndent+=1,A.position+=1;for(;A.position<A.length-1;)ct(A);return A.documents}function $n(s,v,A){v!==null&&typeof v=="object"&&typeof A>"u"&&(A=v,v=null);const E=Nn(s,A);if(typeof v!="function")return E;for(let S=0,O=E.length;S<O;S+=1)v(E[S])}function ut(s,v){const A=Nn(s,v);if(A.length!==0){if(A.length===1)return A[0];throw new n("expected a single document in the stream, but found more")}}return Cn.loadAll=$n,Cn.load=ut,Cn}var Rt={},Rr;function Oa(){if(Rr)return Rt;Rr=1;const e=mn(),n=_n(),t=qt(),r=Object.prototype.toString,i=Object.prototype.hasOwnProperty,a=65279,o=9,l=10,c=13,u=32,f=33,m=34,_=35,y=37,d=38,h=39,w=42,x=44,k=45,R=58,F=61,q=62,z=63,H=64,gn=91,We=93,it=96,Je=123,vn=124,Xe=125,G={};G[0]="\\0",G[7]="\\a",G[8]="\\b",G[9]="\\t",G[10]="\\n",G[11]="\\v",G[12]="\\f",G[13]="\\r",G[27]="\\e",G[34]='\\"',G[92]="\\\\",G[133]="\\N",G[160]="\\_",G[8232]="\\L",G[8233]="\\P";const bn=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],D=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Me(p,b){if(b===null)return{};const $={},I=Object.keys(b);for(let T=0,C=I.length;T<C;T+=1){let N=I[T],M=String(b[N]);N.slice(0,2)==="!!"&&(N="tag:yaml.org,2002:"+N.slice(2));const P=p.compiledTypeMap.fallback[N];P&&i.call(P.styleAliases,M)&&(M=P.styleAliases[M]),$[N]=M}return $}function te(p){let b,$;const I=p.toString(16).toUpperCase();if(p<=255)b="x",$=2;else if(p<=65535)b="u",$=4;else if(p<=4294967295)b="U",$=8;else throw new n("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+b+e.repeat("0",$-I.length)+I}const st=1,ge=2;function at(p){this.schema=p.schema||t,this.indent=Math.max(1,p.indent||2),this.noArrayIndent=p.noArrayIndent||!1,this.skipInvalid=p.skipInvalid||!1,this.flowLevel=e.isNothing(p.flowLevel)?-1:p.flowLevel,this.styleMap=Me(this.schema,p.styles||null),this.sortKeys=p.sortKeys||!1,this.lineWidth=p.lineWidth||80,this.noRefs=p.noRefs||!1,this.noCompatMode=p.noCompatMode||!1,this.condenseFlow=p.condenseFlow||!1,this.quotingType=p.quotingType==='"'?ge:st,this.forceQuotes=p.forceQuotes||!1,this.replacer=typeof p.replacer=="function"?p.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Qe(p,b){const $=e.repeat(" ",b);let I=0,T="";const C=p.length;for(;I<C;){let N;const M=p.indexOf(`
`,I);M===-1?(N=p.slice(I),I=C):(N=p.slice(I,M+1),I=M+1),N.length&&N!==`
`&&(T+=$),T+=N}return T}function De(p,b){return`
`+e.repeat(" ",p.indent*b)}function xn(p,b){for(let $=0,I=p.implicitTypes.length;$<I;$+=1)if(p.implicitTypes[$].resolve(b))return!0;return!1}function Q(p){return p===u||p===o}function ue(p){return p>=32&&p<=126||p>=161&&p<=55295&&p!==8232&&p!==8233||p>=57344&&p<=65533&&p!==a||p>=65536&&p<=1114111}function re(p){return ue(p)&&p!==a&&p!==c&&p!==l}function Le(p,b,$){const I=re(p),T=I&&!Q(p);return($?I:I&&p!==x&&p!==gn&&p!==We&&p!==Je&&p!==Xe)&&p!==_&&!(b===R&&!T)||re(b)&&!Q(b)&&p===_||b===R&&T}function U(p){return ue(p)&&p!==a&&!Q(p)&&p!==k&&p!==z&&p!==R&&p!==x&&p!==gn&&p!==We&&p!==Je&&p!==Xe&&p!==_&&p!==d&&p!==w&&p!==f&&p!==vn&&p!==F&&p!==q&&p!==h&&p!==m&&p!==y&&p!==H&&p!==it}function Fe(p){return!Q(p)&&p!==R}function ie(p,b){const $=p.charCodeAt(b);let I;return $>=55296&&$<=56319&&b+1<p.length&&(I=p.charCodeAt(b+1),I>=56320&&I<=57343)?($-55296)*1024+I-56320+65536:$}function wn(p){return/^\n* /.test(p)}const Sn=1,Ze=2,An=3,In=4,se=5;function Tn(p,b,$,I,T,C,N,M){let P,L=0,j=null,V=!1,Y=!1;const lr=I!==-1;let en=-1,nn=U(ie(p,0))&&Fe(ie(p,p.length-1));if(b||N)for(P=0;P<p.length;L>=65536?P+=2:P++){if(L=ie(p,P),!ue(L))return se;nn=nn&&Le(L,j,M),j=L}else{for(P=0;P<p.length;L>=65536?P+=2:P++){if(L=ie(p,P),L===l)V=!0,lr&&(Y=Y||P-en-1>I&&p[en+1]!==" ",en=P);else if(!ue(L))return se;nn=nn&&Le(L,j,M),j=L}Y=Y||lr&&P-en-1>I&&p[en+1]!==" "}return!V&&!Y?nn&&!N&&!T(p)?Sn:C===ge?se:Ze:$>9&&wn(p)?se:N?C===ge?se:Ze:Y?In:An}function ot(p,b,$,I,T){p.dump=(function(){if(b.length===0)return p.quotingType===ge?'""':"''";if(!p.noCompatMode&&(bn.indexOf(b)!==-1||D.test(b)))return p.quotingType===ge?'"'+b+'"':"'"+b+"'";const C=p.indent*Math.max(1,$),N=p.lineWidth===-1?-1:Math.max(Math.min(p.lineWidth,40),p.lineWidth-C),M=I||p.flowLevel>-1&&$>=p.flowLevel;function P(L){return xn(p,L)}switch(Tn(b,M,p.indent,N,P,p.quotingType,p.forceQuotes&&!I,T)){case Sn:return b;case Ze:return"'"+b.replace(/'/g,"''")+"'";case An:return"|"+En(b,p.indent)+kn(Qe(b,C));case In:return">"+En(b,p.indent)+kn(Qe(lt(b,N),C));case se:return'"'+ct(b)+'"';default:throw new n("impossible error: invalid scalar style")}})()}function En(p,b){const $=wn(p)?String(b):"",I=p[p.length-1]===`
`,C=I&&(p[p.length-2]===`
`||p===`
`)?"+":I?"":"-";return $+C+`
`}function kn(p){return p[p.length-1]===`
`?p.slice(0,-1):p}function lt(p,b){const $=/(\n+)([^\n]*)/g;let I=(function(){let M=p.indexOf(`
`);return M=M!==-1?M:p.length,$.lastIndex=M,ae(p.slice(0,M),b)})(),T=p[0]===`
`||p[0]===" ",C,N;for(;N=$.exec(p);){const M=N[1],P=N[2];C=P[0]===" ",I+=M+(!T&&!C&&P!==""?`
`:"")+ae(P,b),T=C}return I}function ae(p,b){if(p===""||p[0]===" ")return p;const $=/ [^ ]/g;let I,T=0,C,N=0,M=0,P="";for(;I=$.exec(p);)M=I.index,M-T>b&&(C=N>T?N:M,P+=`
`+p.slice(T,C),T=C+1),N=M;return P+=`
`,p.length-T>b&&N>T?P+=p.slice(T,N)+`
`+p.slice(N+1):P+=p.slice(T),P.slice(1)}function ct(p){let b="",$=0;for(let I=0;I<p.length;$>=65536?I+=2:I++){$=ie(p,I);const T=G[$];!T&&ue($)?(b+=p[I],$>=65536&&(b+=p[I+1])):b+=T||te($)}return b}function Nn(p,b,$){let I="";const T=p.tag;for(let C=0,N=$.length;C<N;C+=1){let M=$[C];p.replacer&&(M=p.replacer.call($,String(C),M)),(A(p,b,M,!1,!1)||typeof M>"u"&&A(p,b,null,!1,!1))&&(I!==""&&(I+=","+(p.condenseFlow?"":" ")),I+=p.dump)}p.tag=T,p.dump="["+I+"]"}function $n(p,b,$,I){let T="";const C=p.tag;for(let N=0,M=$.length;N<M;N+=1){let P=$[N];p.replacer&&(P=p.replacer.call($,String(N),P)),(A(p,b+1,P,!0,!0,!1,!0)||typeof P>"u"&&A(p,b+1,null,!0,!0,!1,!0))&&((!I||T!=="")&&(T+=De(p,b)),p.dump&&l===p.dump.charCodeAt(0)?T+="-":T+="- ",T+=p.dump)}p.tag=C,p.dump=T||"[]"}function ut(p,b,$){let I="";const T=p.tag,C=Object.keys($);for(let N=0,M=C.length;N<M;N+=1){let P="";I!==""&&(P+=", "),p.condenseFlow&&(P+='"');const L=C[N];let j=$[L];p.replacer&&(j=p.replacer.call($,L,j)),A(p,b,L,!1,!1)&&(p.dump.length>1024&&(P+="? "),P+=p.dump+(p.condenseFlow?'"':"")+":"+(p.condenseFlow?"":" "),A(p,b,j,!1,!1)&&(P+=p.dump,I+=P))}p.tag=T,p.dump="{"+I+"}"}function s(p,b,$,I){let T="";const C=p.tag,N=Object.keys($);if(p.sortKeys===!0)N.sort();else if(typeof p.sortKeys=="function")N.sort(p.sortKeys);else if(p.sortKeys)throw new n("sortKeys must be a boolean or a function");for(let M=0,P=N.length;M<P;M+=1){let L="";(!I||T!=="")&&(L+=De(p,b));const j=N[M];let V=$[j];if(p.replacer&&(V=p.replacer.call($,j,V)),!A(p,b+1,j,!0,!0,!0))continue;const Y=p.tag!==null&&p.tag!=="?"||p.dump&&p.dump.length>1024;Y&&(p.dump&&l===p.dump.charCodeAt(0)?L+="?":L+="? "),L+=p.dump,Y&&(L+=De(p,b)),A(p,b+1,V,!0,Y)&&(p.dump&&l===p.dump.charCodeAt(0)?L+=":":L+=": ",L+=p.dump,T+=L)}p.tag=C,p.dump=T||"{}"}function v(p,b,$){const I=$?p.explicitTypes:p.implicitTypes;for(let T=0,C=I.length;T<C;T+=1){const N=I[T];if((N.instanceOf||N.predicate)&&(!N.instanceOf||typeof b=="object"&&b instanceof N.instanceOf)&&(!N.predicate||N.predicate(b))){if($?N.multi&&N.representName?p.tag=N.representName(b):p.tag=N.tag:p.tag="?",N.represent){const M=p.styleMap[N.tag]||N.defaultStyle;let P;if(r.call(N.represent)==="[object Function]")P=N.represent(b,M);else if(i.call(N.represent,M))P=N.represent[M](b,M);else throw new n("!<"+N.tag+'> tag resolver accepts not "'+M+'" style');p.dump=P}return!0}}return!1}function A(p,b,$,I,T,C,N){p.tag=null,p.dump=$,v(p,$,!1)||v(p,$,!0);const M=r.call(p.dump),P=I;I&&(I=p.flowLevel<0||p.flowLevel>b);const L=M==="[object Object]"||M==="[object Array]";let j,V;if(L&&(j=p.duplicates.indexOf($),V=j!==-1),(p.tag!==null&&p.tag!=="?"||V||p.indent!==2&&b>0)&&(T=!1),V&&p.usedDuplicates[j])p.dump="*ref_"+j;else{if(L&&V&&!p.usedDuplicates[j]&&(p.usedDuplicates[j]=!0),M==="[object Object]")I&&Object.keys(p.dump).length!==0?(s(p,b,p.dump,T),V&&(p.dump="&ref_"+j+p.dump)):(ut(p,b,p.dump),V&&(p.dump="&ref_"+j+" "+p.dump));else if(M==="[object Array]")I&&p.dump.length!==0?(p.noArrayIndent&&!N&&b>0?$n(p,b-1,p.dump,T):$n(p,b,p.dump,T),V&&(p.dump="&ref_"+j+p.dump)):(Nn(p,b,p.dump),V&&(p.dump="&ref_"+j+" "+p.dump));else if(M==="[object String]")p.tag!=="?"&&ot(p,p.dump,b,C,P);else{if(M==="[object Undefined]")return!1;if(p.skipInvalid)return!1;throw new n("unacceptable kind of an object to dump "+M)}if(p.tag!==null&&p.tag!=="?"){let Y=encodeURI(p.tag[0]==="!"?p.tag.slice(1):p.tag).replace(/!/g,"%21");p.tag[0]==="!"?Y="!"+Y:Y.slice(0,18)==="tag:yaml.org,2002:"?Y="!!"+Y.slice(18):Y="!<"+Y+">",p.dump=Y+" "+p.dump}}return!0}function E(p,b){const $=[],I=[];S(p,$,I);const T=I.length;for(let C=0;C<T;C+=1)b.duplicates.push($[I[C]]);b.usedDuplicates=new Array(T)}function S(p,b,$){if(p!==null&&typeof p=="object"){const I=b.indexOf(p);if(I!==-1)$.indexOf(I)===-1&&$.push(I);else if(b.push(p),Array.isArray(p))for(let T=0,C=p.length;T<C;T+=1)S(p[T],b,$);else{const T=Object.keys(p);for(let C=0,N=T.length;C<N;C+=1)S(p[T[C]],b,$)}}}function O(p,b){b=b||{};const $=new at(b);$.noRefs||E(p,$);let I=p;return $.replacer&&(I=$.replacer.call({"":I},"",I)),A($,0,I,!0,!0)?$.dump+`
`:""}return Rt.dump=O,Rt}var Or;function Pa(){if(Or)return K;Or=1;const e=Ra(),n=Oa();function t(r,i){return function(){throw new Error("Function yaml."+r+" is removed in js-yaml 4. Use yaml."+i+" instead, which is now safe by default.")}}return K.Type=X(),K.Schema=xi(),K.FAILSAFE_SCHEMA=Ii(),K.JSON_SCHEMA=$i(),K.CORE_SCHEMA=Ci(),K.DEFAULT_SCHEMA=qt(),K.load=e.load,K.loadAll=e.loadAll,K.dump=n.dump,K.YAMLException=_n(),K.types={binary:Pi(),float:Ni(),map:Ai(),null:Ti(),pairs:Di(),set:Li(),timestamp:Ri(),bool:Ei(),int:ki(),merge:Oi(),omap:Mi(),seq:Si(),str:wi()},K.safeLoad=t("safeLoad","load"),K.safeLoadAll=t("safeLoadAll","loadAll"),K.safeDump=t("safeDump","dump"),K}var Ma=Pa();const ze=$a(Ma),{Type:ap,Schema:op,FAILSAFE_SCHEMA:lp,JSON_SCHEMA:cp,CORE_SCHEMA:up,DEFAULT_SCHEMA:pp,load:fp,loadAll:dp,dump:mp,YAMLException:_p,types:hp,safeLoad:yp,safeLoadAll:gp,safeDump:vp}=ze,rn="netlab-internal",we=`${rn}:_linkname`,Fi=["none","linux","frr","bird","iosv"];function Pr(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function ne(e,n){const t=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(const[i,a]of Object.entries(n)){if(i==="_removed_attr"){const l=Array.isArray(a)?a:[];r._removed_attr=[...t,...l.filter(c=>!t.has(c))];continue}if(t.has(i))continue;const o=r[i];Pr(o)&&Pr(a)?r[i]=ne(o,a):r[i]=Da(a)}return r}function Da(e){return structuredClone(e)}function La(e,n){return ne(e,n)}function Vn(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Yn(e){if(Array.isArray(e))return e.map(t=>Yn(t));if(!Vn(e))return e;const n={};for(const[t,r]of Object.entries(e))Fa(n,t,Yn(r));return n}function Fa(e,n,t){if(!n.includes(".")){Mr(e,n,t);return}const r=n.split(".");let i=e;for(let a=0;a<r.length-1;a++){const o=r[a],l=i[o];(l==null||!Vn(l))&&(i[o]={}),i=i[o]}Mr(i,r[r.length-1],t)}function Mr(e,n,t){const r=e[n];Vn(r)&&Vn(t)?e[n]=ne(r,t):e[n]=t}function ja(e){const n=Yn(e);for(const t of Object.keys(e))delete e[t];Object.assign(e,n)}class Va{constructor(){g(this,"items",[])}error(n){this.items.push({...n,severity:"error"})}warning(n){this.items.push({...n,severity:"warning"})}hasErrors(){return this.items.some(n=>n.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function Dr(e,n){const t=e.toLowerCase();let r="VALUE",i="VALUE";return t.includes("missing")||t.includes("required")||t.includes("mandatory")?(r="MISSING",i="MISSING"):t.includes("type")||t.includes("pattern")||t.includes("range")?(r="TYPE",i="TYPE"):t.includes("unknown")||t.includes("not allowed")||t.includes("unexpected")?(r="ATTR",i="ATTR"):t.includes("leafref")||t.includes("instance")?(r="VALUE",i="VALUE"):t.includes("depend")&&(r="DEPEND",i="DEPEND"),{code:i,category:r,module:"xyang",message:e,path:n}}const Ya={bgp:`# BGP default settings and attributes
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
`},Lr=["attributes","extra_attributes","features","hooks","requires","supported_on","no_propagate","config_after","transform_after","warnings","_top"],Ba=["vlan","vrf","vxlan","ospf","isis","bgp","evpn"];let Ot;function ji(){if(Ot)return Ot;const e={};for(const n of Ba){const t=Ya[n];if(!t)continue;const r=ze.load(t)??{};e[n]=r}return Ot=e,e}function hn(e){return ji()[e]}function Ua(e){if(!e)return[...Lr];const n=e.no_propagate;let t=[];Array.isArray(n)?t=n.map(String):n&&typeof n=="object"&&(t=Object.keys(n));for(const r of Object.keys(e))r.includes("no_propagate")&&r!=="no_propagate"&&t.push(r);return[...Lr,...t]}function qa(e){if(!e)return{};const n={...e};for(const t of Ua(e))delete n[t];return n}function Vi(e){const n=hn(e),t=n==null?void 0:n.requires;return Array.isArray(t)?t.map(String):[]}function Yi(e){const n=hn(e),t=n==null?void 0:n.transform_after;return Array.isArray(t)?t.map(String):[]}function Ga(e){const n=hn(e),t=n==null?void 0:n.config_after;return Array.isArray(t)?t.map(String):[]}function za(e){var r;const n=(r=hn(e))==null?void 0:r.attributes,t=n&&typeof n=="object"?n.node_copy:void 0;return Array.isArray(t)?t.map(String):[]}function Ka(){const e=ji(),n={};for(const[t,r]of Object.entries(e))n[t]={...r};return n}const Bi={addressing:`#
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
`};function Ha(e){const n=Bi[e];if(!n)return{};const t=ze.load(n);return!t||typeof t!="object"||Array.isArray(t)?{}:t}function Wa(){const e={};for(const n of Object.keys(Bi))e[n]=Ha(n);return e}function Ja(){return{device:"frr",provider:"clab",...Wa(),...Ka()}}function Xa(e){const n=ze.load(e);if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Topology must be a YAML/JSON object");return Yn(n)}function Qa(e,n={}){const t=Xa(e);return Ui(t,n)}function Ui(e,n={}){ja(e);const t=ne(Ja(),n.defaults??{}),r=e.defaults??{};e.defaults=ne(t,r),e.provider||(e.provider="clab"),e.name||(e.name=n.name??"topology");const i=e.defaults.addressing??{};return e.addressing=ne(i,e.addressing??{}),e}function Gt(e){return e.replace(/\\/g,"/")}function Ve(...e){const n=[],t=e.map(Gt).join("/"),r=t.startsWith("/");for(const i of t.split("/"))!i||i==="."||(i===".."?n.pop():n.push(i));return(r?"/":"")+n.join("/")}function qi(e){const n=Gt(e).replace(/\/$/,""),t=n.lastIndexOf("/");return t<0?".":t===0?"/":n.slice(0,t)}function Za(...e){return Ve(e.join("/"))}function eo(e,n){const t=Gt(e).split("/").pop()??"";return n&&t.endsWith(n)?t.slice(0,-n.length):t}const sn={resolve:Ve,dirname:qi,join:Za,basename:eo};function no(e){const n=String(e);return n.startsWith("file:")?decodeURIComponent(n.replace(/^file:\/\//,"").replace(/^file:\//,"/")):"/packages/core/src/validate/schema.js"}function to(e,n){if(!e.includes(":"))return{statementName:null,moduleName:null};const[t,r]=e.split(":",2);if(!t||!r)return{statementName:null,moduleName:null};const i=n[t];return i?i.findStatement(r)?{statementName:r,moduleName:t}:{statementName:null,moduleName:null}:{statementName:null,moduleName:null}}var ro=class extends Error{constructor(e){super(e),this.name="YangError"}},Z=class extends SyntaxError{constructor(n,t={}){const{line_num:r,line:i,context_lines:a=[],filename:o}=t,l=[];o&&l.push(`${o}:`),r&&l.push(`${r}:`),l.push(n);let c=l.join(" ");if(a.length>0){c+=`
`;for(const[u,f]of a)c+=`${u===r?">>> ":"    "}${String(u).padStart(4," ")} | ${f}
`;r&&i&&(c+=`     ${" ".repeat(String(r).length+3)}${"^".repeat(Math.max(1,i.trim().length))}`)}super(c);g(this,"messageText");g(this,"line_num");g(this,"line");g(this,"context_lines");g(this,"filename");this.name="YangSyntaxError",this.messageText=n,this.line_num=r,this.line=i,this.context_lines=a,this.filename=o}formatHeadline(){const n=[];return this.filename&&n.push(`${this.filename}:`),this.line_num!==void 0&&n.push(`${this.line_num}:`),n.push(this.messageText),n.join(" ")}toString(){return this.formatHeadline()}},B=class extends ro{constructor(e){super(e),this.name="YangSemanticError"}},io=class extends B{constructor(n){super(`Refine target path matches no node in the used grouping: '${n}'`);g(this,"target_path");this.name="YangRefineTargetNotFoundError",this.target_path=n}},so=class extends B{constructor(n,t){const r=[...n,t].join(" -> ");super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${r}). Restructure groupings to break the cycle.`);g(this,"prefix_chain");g(this,"repeated");this.name="YangCircularUsesError",this.prefix_chain=[...n],this.repeated=t}},oe=class extends Error{constructor(n,t={}){var e=(...Tp)=>(super(...Tp),g(this,"messageText"),g(this,"position"),g(this,"expression"),this);const{position:r,expression:i,context_before:a=10,context_after:o=10}=t;if(i!==void 0&&r!==void 0){const l=Math.max(0,r-a),c=Math.min(i.length,r+o),u=i.slice(l,c),f=r-l,m=[n,`
Expression: ${u}`,`           ${" ".repeat(f)}^`];r<i.length?m.push(`Position: ${r} (character: ${JSON.stringify(i[r])})`):m.push(`Position: ${r} (end of expression)`),e(m.join(`
`))}else e(n);this.name="XPathSyntaxError",this.messageText=n,this.position=r,this.expression=i}toString(){return this.messageText}},ao=new Set(["{","}",";",":","=","+","/"]);function oo(e){return e?e.split(`
`).map(n=>n.replace(/\r$/,"")):[]}function lo(e){return e==="STRING"?"string":e==="INTEGER"||e==="DOTTED_NUMBER"?"number":ao.has(e)?"symbol":"identifier"}var Pt=new Set(["{","}",";",":","=","+","/","STRING","IDENTIFIER","INTEGER","DOTTED_NUMBER"]);function co(e,n,t,r){return{type:e,value:n,line_num:t,char_pos:r,kind:lo(e),line:t,column:r+1}}var uo=class{constructor(e,n,t){g(this,"token_list");g(this,"tokens");g(this,"positions");g(this,"filename");g(this,"index");g(this,"source");g(this,"diagnostic_lines");this.token_list=e,this.tokens=e.map(r=>r.value),this.positions=e.map(r=>[r.line_num,r.char_pos]),this.source=n,this.filename=t,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error("Unexpected end of input");const n=this.tokens[this.index];if(e!==void 0&&n!==e)throw this._make_error(`Expected '${e}', got '${n}'`);return this.index+=1,n}consume_if(e){return this.peek()===e?(this.consume(),!0):!1}peek_type(){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");return this.token_list[this.index].type}peek_type_at(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];if(typeof e=="string"&&!Pt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)throw this._make_error(`Expected '${e}', got '${n.value}'`)}else if(n.type!==e)throw this._make_error(`Expected ${e}, got ${n.type} ('${n.value}')`);return this.index+=1,n.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;const n=this.token_list[this.index];if(typeof e=="string"&&!Pt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)return!1}else if(n.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];for(const t of e)if(typeof t=="string"){if(Pt.has(t)){if(n.type===t)return this.index+=1,[n.value,t]}else if(n.type==="IDENTIFIER"&&n.value===t)return this.index+=1,[n.value,t]}else if(n.type===t)return this.index+=1,[n.value,t];throw this._make_error(`Expected one of (${e.join(", ")}), got ${n.type} ('${n.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||(this.diagnostic_lines=oo(this.source)),this.diagnostic_lines}_make_error(e,n=3){const[t]=this.position(),r=this.diagnostic_lines_once(),i=[],a=Math.max(1,t-n),o=Math.min(r.length,t+n);for(let c=a;c<=o;c+=1)c<=r.length&&i.push([c,r[c-1]]);const l=t<=r.length?r[t-1]:"";return new Z(e,{line_num:t,line:l,context_lines:i,filename:this.filename})}},po=class Gi{constructor(n){g(this,"module");g(this,"current_parent");g(this,"source_dir");this.module=n.module,this.current_parent=n.current_parent,this.source_dir=n.source_dir}push_parent(n){return new Gi({module:this.module,current_parent:n,source_dir:this.source_dir})}},zt={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-9223372036854776e3,9223372036854776e3],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,18446744073709552e3]};new Set(Object.keys(zt));var Bn=class{constructor(e={}){g(this,"patterns");g(this,"length");g(this,"range");g(this,"fraction_digits");g(this,"enums");g(this,"bits");g(this,"types");Object.assign(this,e)}};function fo(e,n){const t=typeof e.error_message=="string"&&e.error_message.trim().length>0?e.error_message:n,r=typeof e.error_app_tag=="string"?e.error_app_tag.trim():"";return r.length>0?`${t} (error-app-tag: ${r})`:t}function mo(e){const n=(t,r)=>{const i=t.trim().toLowerCase();if(i==="min")return Number.NEGATIVE_INFINITY;if(i==="max")return Number.POSITIVE_INFINITY;const a=Number(i);return Number.isNaN(a)?r==="min"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:a};return e.split("|").map(t=>t.trim()).filter(Boolean).map(t=>{const[r,i]=t.split("..").map(a=>a.trim());if(!i){const a=n(r,"min");return{min:a,max:a}}return{min:n(r,"min"),max:n(i,"max")}})}function an(e,n){for(const t of mo(n))if(e>=t.min&&e<=t.max)return!0;return!1}function zi(e){return typeof e=="number"&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e=="string"&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function _o(e){return typeof e=="number"&&Number.isFinite(e)?e:typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function ho(e,n,t){const r=zt[e];if(!r)return[!1,`Unsupported integer type '${e}'`];const i=zi(n);if(i===null)return[!1,`Expected ${e}`];if(t)return an(i,t)?[!0,null]:[!1,`Integer ${i} does not match ${t}`];const[a,o]=r;return i<a?[!1,`Value ${i} is less than minimum ${a}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function yo(e,n){if(typeof e!="string")return[!1,"Expected base64 string"];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!==0)return[!1,"Expected valid base64 string"];try{const t=Buffer.from(e,"base64");if(n&&!an(t.length,n))return[!1,`Binary length ${t.length} does not match ${n}`]}catch{return[!1,"Expected valid base64 string"]}return[!0,null]}function go(e,n){if(typeof e!="string")return[!1,"Bits values must be string tokens"];const t=new Set(n.map(i=>i.name));if(e.trim()==="")return[!0,null];const r=new Set;for(const i of e.trim().split(/\s+/)){if(!t.has(i))return[!1,`Unknown bit token '${i}'`];if(r.has(i))return[!1,`Duplicate bit token '${i}'`];r.add(i)}return[!0,null]}var vo=class{validate(e,n,t){var a;const r=t??new Bn,i=n.trim();if(i==="union"){for(const o of r.types??[]){const l=typeof o.name=="string"?o.name:"string",[c]=this.validate(e,l,new Bn(o));if(c)return[!0,null]}return[!1,"Value does not match any union member type"]}if(i==="enumeration")return typeof e!="string"?[!1,"Expected enumeration value (string)"]:r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null];if(i==="string"){if(typeof e!="string")return[!1,"Expected string"];if(r.length&&!an(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];const o=Array.isArray(r.patterns)?r.patterns:[];if(o.length>0)for(const l of o){if(typeof(l==null?void 0:l.pattern)!="string"||l.pattern.length===0)continue;const c=new RegExp(`^(?:${l.pattern})$`).test(e),u=l.invert_match===!0;if(!u&&!c||u&&c){const f=u?`String matches forbidden pattern ${l.pattern} (invert-match)`:`String does not match pattern ${l.pattern}`;return[!1,fo(l,f)]}}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i==="boolean")return typeof e=="boolean"?[!0,null]:e==="true"||e==="false"?[!0,null]:[!1,"Expected boolean"];if(i==="empty")return e===null?[!0,null]:[!1,"Expected empty (null)"];if(i in zt)return ho(i,e,r.range);if(i==="binary")return yo(e,r.length);if(i==="bits")return go(e,r.bits??[]);if(i==="decimal64"||i==="number"){const o=_o(e);if(o===null)return[!1,"Expected number"];if(r.range&&!an(o,r.range))return[!1,`Number ${o} does not match ${r.range}`];if(typeof r.fraction_digits=="number"){const l=((a=`${o}`.split(".")[1])==null?void 0:a.length)??0;if(l>r.fraction_digits)return[!1,`Too many fraction digits (${l} > ${r.fraction_digits})`]}return[!0,null]}if(i==="int64"||i==="integer"){const o=zi(e);return o===null?[!1,"Expected integer"]:r.range&&!an(o,r.range)?[!1,`Integer ${o} does not match ${r.range}`]:[!0,null]}return typeof e=="string"?[!0,null]:[!1,`Unsupported type '${i}'`]}};const bo={"/yang/modules/netlab-bgp.yang":`module netlab-bgp {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:bgp";
  prefix bgp;

  import netlab-topology {
    prefix nt;
  }

  organization "Exergy Connect";
  description "BGP module augmentations.";

  revision 2026-07-16 {
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container bgp {
      leaf as {
        type uint32;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container bgp {
      leaf as {
        type uint32;
      }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container bgp {
      leaf as {
        type uint32;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container bgp {
      leaf as {
        type uint32;
      }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container evpn {
      leaf-list session { type string; }
      leaf transport { type string; }
      leaf-list vlans { type string; }
      leaf-list vrfs { type string; }
      leaf as { type uint32; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container evpn {
      leaf-list session { type string; }
      leaf transport { type string; }
      leaf-list vlans { type string; }
      leaf-list vrfs { type string; }
      leaf domain { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    container evpn {
      leaf evi { type uint32; }
      leaf rd { type string; }
      leaf-list import { type string; }
      leaf-list export { type string; }
    }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    container evpn {
      leaf evi { type uint32; }
      leaf rd { type string; }
      leaf-list import { type string; }
      leaf-list export { type string; }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container evpn {
      leaf-list session { type string; }
      leaf transport { type string; }
      leaf-list vlans { type string; }
      leaf-list vrfs { type string; }
      leaf as { type uint32; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container evpn {
      leaf-list session { type string; }
      leaf transport { type string; }
      leaf-list vlans { type string; }
      leaf-list vrfs { type string; }
      leaf domain { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    container evpn {
      leaf evi { type uint32; }
      leaf rd { type string; }
      leaf-list import { type string; }
      leaf-list export { type string; }
    }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    container evpn {
      leaf evi { type uint32; }
      leaf rd { type string; }
      leaf-list import { type string; }
      leaf-list export { type string; }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container isis {
      leaf area {
        type string;
      }
      leaf type {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container isis {
      leaf area {
        type string;
      }
      leaf net {
        type string;
      }
      leaf type {
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container isis {
      leaf area {
        type string;
      }
      leaf type {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container isis {
      leaf area {
        type string;
      }
      leaf net {
        type string;
      }
      leaf type {
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

  organization "Exergy Connect";
  description "OSPF module augmentations.";

  revision 2026-07-16 {
    description "Initial revision.";
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
      container af {
        leaf ipv4 {
          type boolean;
        }
        leaf ipv6 {
          type boolean;
        }
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container ospf {
      leaf area {
        type string;
      }
      leaf network_type {
        type string;
      }
      leaf cost {
        type uint32;
      }
      leaf passive {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container ospf {
      leaf area {
        type string;
      }
      leaf cost {
        type uint32;
      }
      leaf network_type {
        type string;
      }
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

  organization "Exergy Connect";
  description "OSPF module augmentations.";

  revision 2026-07-16 {
    description "Initial revision.";
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
      container af {
        leaf ipv4 {
          type boolean;
        }
        leaf ipv6 {
          type boolean;
        }
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container ospf {
      leaf area {
        type string;
      }
      leaf network_type {
        type string;
      }
      leaf cost {
        type uint32;
      }
      leaf passive {
        type boolean;
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container ospf {
      leaf area {
        type string;
      }
      leaf cost {
        type uint32;
      }
      leaf network_type {
        type string;
      }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    list vlans {
      key "name";
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
      container prefix {
        leaf ipv4 { type string; }
        leaf ipv6 { type string; }
      }
      leaf-list links {
        type string;
        description "Access-link shorthand (e.g. dut-h1).";
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    list vlans {
      key "name";
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
      container prefix {
        leaf ipv4 { type string; }
        leaf ipv6 { type string; }
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container vlan {
      leaf access {
        type string;
      }
      leaf-list trunk {
        type string;
      }
      leaf mode {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container vlan {
      leaf access {
        type string;
      }
      leaf-list trunk {
        type string;
      }
      leaf mode {
        type string;
      }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    list vlans {
      key "name";
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
      container prefix {
        leaf ipv4 { type string; }
        leaf ipv6 { type string; }
      }
      leaf-list links {
        type string;
        description "Access-link shorthand (e.g. dut-h1).";
      }
    }
  }

  augment "/nt:topology/nt:nodes" {
    list vlans {
      key "name";
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
      container prefix {
        leaf ipv4 { type string; }
        leaf ipv6 { type string; }
      }
    }
  }

  augment "/nt:topology/nt:links" {
    container vlan {
      leaf access {
        type string;
      }
      leaf-list trunk {
        type string;
      }
      leaf mode {
        type string;
      }
    }
  }

  augment "/nt:topology/nt:nodes/nt:interfaces" {
    container vlan {
      leaf access {
        type string;
      }
      leaf-list trunk {
        type string;
      }
      leaf mode {
        type string;
      }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    list vrfs {
      key "name";
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
  }

  augment "/nt:topology/nt:nodes" {
    list vrfs {
      key "name";
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    list vrfs {
      key "name";
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
  }

  augment "/nt:topology/nt:nodes" {
    list vrfs {
      key "name";
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container vxlan {
      leaf domain { type string; }
      leaf flooding { type string; }
      leaf-list vlans { type string; }
      leaf use_v6_vtep { type boolean; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vxlan {
      leaf domain { type string; }
      leaf flooding { type string; }
      leaf-list vlans { type string; }
      leaf vtep { type string; }
      leaf vtep_interface { type string; }
      leaf transport { type string; }
      leaf-list vtep_list { type string; }
      leaf-list l3vnis { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
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
    description "Initial revision.";
  }

  augment "/nt:topology" {
    container vxlan {
      leaf domain { type string; }
      leaf flooding { type string; }
      leaf-list vlans { type string; }
      leaf use_v6_vtep { type boolean; }
    }
  }

  augment "/nt:topology/nt:nodes" {
    container vxlan {
      leaf domain { type string; }
      leaf flooding { type string; }
      leaf-list vlans { type string; }
      leaf vtep { type string; }
      leaf vtep_interface { type string; }
      leaf transport { type string; }
      leaf-list vtep_list { type string; }
      leaf-list l3vnis { type string; }
    }
  }

  augment "/nt:topology/nt:vlans" {
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
  }

  augment "/nt:topology/nt:nodes/nt:vlans" {
    leaf vni {
      type uint32 {
        range "1..16777215";
      }
    }
    leaf-list vtep_list { type string; }
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
  description "Device registry schema (none, linux, frr, bird, iosv).";

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
  description "Device registry schema (none, linux, frr, bird, iosv).";

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
      "Core attributes.yml parity: node/link/interface/pool/group fields.";
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
      leaf mtu {
        type uint16 {
          range "64..9216";
        }
      }
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
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
        leaf type {
          type string;
        }
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf pool {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          leaf node {
            type string;
          }
          leaf ifname {
            type string;
          }
          leaf ipv4 {
            type ntype:ipv4-prefix;
          }
          leaf ipv6 {
            type ntype:ipv6-prefix;
          }
        }
      }
      container af {
        leaf ipv4 {
          type boolean;
        }
        leaf ipv6 {
          type boolean;
        }
      }
      list interfaces {
        key "ifindex";
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf linkindex {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf role {
          type string;
        }
        leaf bridge {
          type string;
        }
        leaf name {
          type string;
        }
        leaf mtu {
          type uint16 {
            range "64..9216";
          }
        }
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
          leaf ifname {
            type string;
          }
          leaf ipv4 {
            type ntype:ipv4-prefix;
          }
          leaf ipv6 {
            type ntype:ipv6-prefix;
          }
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
      leaf mtu {
        type uint16 {
          range "64..9216";
        }
      }
      container prefix {
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
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
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
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
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
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
      "Core attributes.yml parity: node/link/interface/pool/group fields.";
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
      leaf mtu {
        type uint16 {
          range "64..9216";
        }
      }
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
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
        leaf type {
          type string;
        }
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf pool {
          type string;
        }
        leaf virtual_interface {
          type boolean;
        }
        list neighbors {
          key "node";
          leaf node {
            type string;
          }
          leaf ifname {
            type string;
          }
          leaf ipv4 {
            type ntype:ipv4-prefix;
          }
          leaf ipv6 {
            type ntype:ipv6-prefix;
          }
        }
      }
      container af {
        leaf ipv4 {
          type boolean;
        }
        leaf ipv6 {
          type boolean;
        }
      }
      list interfaces {
        key "ifindex";
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf linkindex {
          type uint32;
        }
        leaf type {
          type string;
        }
        leaf role {
          type string;
        }
        leaf bridge {
          type string;
        }
        leaf name {
          type string;
        }
        leaf mtu {
          type uint16 {
            range "64..9216";
          }
        }
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
          leaf ifname {
            type string;
          }
          leaf ipv4 {
            type ntype:ipv4-prefix;
          }
          leaf ipv6 {
            type ntype:ipv6-prefix;
          }
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
      leaf mtu {
        type uint16 {
          range "64..9216";
        }
      }
      container prefix {
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
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
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf ifindex {
          type uint32;
        }
        leaf ifname {
          type string;
        }
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
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
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
      "Add iosv device and vlan_member link type (attributes.yml parity).";
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
    type enumeration {
      enum none;
      enum linux;
      enum frr;
      enum bird;
      enum iosv;
    }
    description "Supported device identities.";
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
    type string {
      pattern '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}'
           +  '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
           +  '/(([0-9])|([1-2][0-9])|(3[0-2]))'
           +  '|true|false';
    }
    description "IPv4 prefix, address/prefix, or boolean unnumbered marker.";
  }

  typedef ipv6-prefix {
    type string;
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
      "Add iosv device and vlan_member link type (attributes.yml parity).";
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
    type enumeration {
      enum none;
      enum linux;
      enum frr;
      enum bird;
      enum iosv;
    }
    description "Supported device identities.";
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
    type string {
      pattern '(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}'
           +  '([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])'
           +  '/(([0-9])|([1-2][0-9])|(3[0-2]))'
           +  '|true|false';
    }
    description "IPv4 prefix, address/prefix, or boolean unnumbered marker.";
  }

  typedef ipv6-prefix {
    type string;
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
`},xe=new Map(Object.entries(bo));function Ft(e){return e.replace(/\\/g,"/").replace(/\/+/g,"/")}function Ki(e){const n=Ft(e);if(xe.has(n))return xe.get(n);const t=[n,n.replace(/^\//,""),`/yang/${n.split("/").pop()}`,n.split("/").pop()??""];for(const i of t)if(i&&xe.has(i))return xe.get(i);const r=n.split("/").pop();if(r){for(const[i,a]of xe)if(i.endsWith(`/${r}`)||i===r)return a}}function xo(e,n){const t=Ki(e);if(t===void 0){const r=new Error(`ENOENT: no such file or directory, open '${e}' (yang files: ${[...xe.keys()].join(", ")})`);throw r.code="ENOENT",r}return t}function wo(e){return Ki(e)!==void 0}function So(e){const n=Ft(e).replace(/\/$/,""),t=new Set;for(const r of xe.keys()){const i=Ft(r);let a;i.startsWith(n+"/")?a=i.slice(n.length+1):(n==="/yang"||n==="yang")&&i.startsWith("/yang/")&&(a=i.slice(6)),a&&t.add(a.split("/")[0])}return[...t]}function Ao(e){if(!(!e||typeof e!="object"))return new Io(e)}var Io=class Hi{constructor(n){g(this,"data");this.data=n}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(t=>new Hi(t))}findStatement(n){return this.statements.find(t=>t.name===n)}},Kt=class{constructor(e,n){g(this,"data");g(this,"source");this.data=e,this.source=n}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){const e=this.data.organization;return typeof e=="string"&&e.length>0?e:void 0}get contact(){const e=this.data.contact;return typeof e=="string"&&e.length>0?e:void 0}get description(){const e=this.data.description;return typeof e=="string"?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){const e=this.data.identities;return!e||typeof e!="object"?{}:e}get statements(){const e=this.data.statements;return Array.isArray(e)?e.map(Ao).filter(n=>!!n):[]}findStatement(e){return this.statements.find(n=>n.name===e)}};function To(e,n){const t=Object.keys(e).filter(r=>!n.has(r)).sort();if(t.length>0)throw new TypeError(`unexpected keyword arguments: ${JSON.stringify(t)}`)}function Eo(e){To(e,new Set(["modules","mode"]));const n=e.mode===void 0?"complete":e.mode,t=new Set;for(let r=0;r<e.modules.length;r+=1){const a=e.modules[r].name;if(!a)throw new TypeError(`modules[${r}] must have a module name`);if(t.has(a))throw new TypeError(`duplicate module name '${a}' in modules`);t.add(a)}return{modules:[...e.modules],mode:n}}var jt="module",Wi="yang-version",Ji="namespace",Ye="prefix",Xi="organization",Qi="contact",de="description",Zi="revision",Ht="typedef",es="identity",Un="base",qn="type",ko="enumeration",Fr="path",jr="require-instance",Vr="enum",Ae="status",ns="bit",Yr="position",Br="pattern",Ur="modifier",qr="length",Gr="fraction-digits",zr="range",ts="grouping",Ke="uses",rs="refine",Ee="container",$e="list",Ce="leaf",Re="leaf-list",Oe="anydata",Pe="anyxml",ke="choice",Gn="case",Ue="must",me="when",Vt="presence",Kr="key",Hr="min-elements",Wr="max-elements",Jr="ordered-by",zn="mandatory",on="config",Dn="default",Kn="error-message",Xr="error-app-tag",J="true",fe="false",is="import",ss="include",as="revision-date",os="feature",_e="if-feature",ls="augment",cs="submodule",Qr="belongs-to",Ie="reference",Zr="argument",ei="yin-element",No="deviation",us="extension",ps="rpc",$o="action",tt="notification",ln="input",cn="output",Co=["<=",">=","!=","==","//","=","<",">","+","-","*","/"];function Ro(e){const n=[];let t=0;const r=(i,a,o=t)=>{n.push({kind:i,value:a,position:o})};for(;t<e.length;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==='"'||i==="'"){const l=i,c=t;t+=1;let u="";for(;t<e.length;){const f=e[t];if(f===l&&e[t-1]!=="\\"){t+=1;break}u+=f,t+=1}r("string",u,c);continue}if(/\d/.test(i)||i==="-"&&/\d/.test(e[t+1]??"")){const l=t;let c="";for(e[t]==="-"&&(c+="-",t+=1);t<e.length&&/\d/.test(e[t]);)c+=e[t],t+=1;if(e[t]==="."&&/\d/.test(e[t+1]??""))for(c+=".",t+=1;t<e.length&&/\d/.test(e[t]);)c+=e[t],t+=1;r("number",c,l);continue}if(/[A-Za-z_]/.test(i)){const l=t;let c="";for(;t<e.length&&/[A-Za-z0-9_:\-]/.test(e[t]);)c+=e[t],t+=1;r("identifier",c,l);continue}if(i==="/"){e[t+1]==="/"?(r("operator","//"),t+=2):(r("slash","/"),t+=1);continue}if(i==="."){e[t+1]==="."?(r("dotdot",".."),t+=2):(r("dot","."),t+=1);continue}if(i==="("){r("paren_open","("),t+=1;continue}if(i===")"){r("paren_close",")"),t+=1;continue}if(i==="["){r("bracket_open","["),t+=1;continue}if(i==="]"){r("bracket_close","]"),t+=1;continue}if(i===","){r("comma",","),t+=1;continue}const a=e.slice(t),o=Co.find(l=>a.startsWith(l));if(o){r("operator",o),t+=o.length;continue}t+=1}return r("eof","",t),n}var Oo=new Set(["=","!=","<",">","<=",">="]),Po=new Set(["+","-"]),fs=class{constructor(e){g(this,"expression");g(this,"tokens");g(this,"position",0);this.expression=e,this.tokens=Ro(e)}parse(){if(this.current().kind==="eof")throw new oe("Empty expression",{expression:this.expression,position:0});const e=this.parseExpression(),n=this.current();if(n.kind!=="eof")throw new oe(`Unexpected token: ${n.value||n.kind}`,{expression:this.expression,position:n.position});return e}current(){return this.tokens[this.position]??{kind:"eof",value:"",position:this.expression.length}}consume(e){const n=this.current();if(e&&n.kind!==e)throw new oe(`Expected ${e}, got ${n.kind} (${n.value})`,{expression:this.expression,position:n.position});return this.position+=1,n}isKeyword(e){const n=this.current();return n.kind==="identifier"&&n.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword("or");){this.consume();const n=this.parseLogicalAnd();e={kind:"binary",operator:"or",left:e,right:n}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword("and");){this.consume();const n=this.parseComparison();e={kind:"binary",operator:"and",left:e,right:n}}return e}parseComparison(){let e=this.parseAdditive();const n=this.current();if(n.kind==="operator"&&Oo.has(n.value)){const t=this.consume("operator").value,r=this.parseAdditive();e={kind:"binary",operator:t,left:e,right:r}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){const n=this.current();if(n.kind==="operator"&&Po.has(n.value)){const t=this.consume("operator").value,r=this.parseMultiplicative();e={kind:"binary",operator:t,left:e,right:r}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){const n=this.current();if(n.kind==="slash"){this.consume("slash");const t=this.parsePath(!1);e={kind:"binary",operator:"/",left:e,right:t}}else if(n.kind==="operator"&&n.value==="*"){this.consume("operator");const t=this.parseUnary();e={kind:"binary",operator:"*",left:e,right:t}}else return e}}parseUnary(){const e=this.current();if(e.kind==="operator"&&e.value==="-"){this.consume("operator");const n=this.parseUnary();return{kind:"binary",operator:"-",left:{kind:"literal",value:0},right:n}}if(e.kind==="operator"&&e.value==="+")return this.consume("operator"),this.parseUnary();if(this.isKeyword("not")){this.consume(),this.consume("paren_open");const n=this.parseExpression();return this.consume("paren_close"),{kind:"function",name:"not",args:[n]}}return this.parsePrimary()}parsePrimary(){const e=this.current();if(e.kind==="string")return{kind:"literal",value:this.consume("string").value};if(e.kind==="number"){const n=this.consume("number").value,t=n.includes(".")?Number.parseFloat(n):Number.parseInt(n,10);if(Number.isNaN(t))throw new oe(`Invalid number: ${n}`,{expression:this.expression,position:e.position});return{kind:"literal",value:t}}if(e.kind==="identifier"){if(this.isKeyword("true"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!0};if(this.isKeyword("false"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!1};const n=this.tokens[this.position+1];return(n==null?void 0:n.kind)==="paren_open"?this.parseFunctionCall():this.parsePath(!1)}if(e.kind==="dot")return this.consume("dot"),this.current().kind==="paren_open"?(this.consume("paren_open"),this.consume("paren_close"),{kind:"function",name:"current",args:[]}):this.parsePath(!1,".");if(e.kind==="dotdot")return this.parsePath(!1);if(e.kind==="slash")return this.consume("slash"),this.parsePath(!0);if(e.kind==="paren_open"){if(this.consume("paren_open"),this.current().kind==="string"||this.current().kind==="number"){const t=this.parsePrimary();if(t.kind==="literal"&&this.current().kind==="comma"){const r=[t.value];for(;this.current().kind==="comma";){this.consume("comma");const i=this.parsePrimary();if(i.kind!=="literal")throw new oe("Value list may only contain literals",{expression:this.expression,position:this.current().position});r.push(i.value)}return this.consume("paren_close"),{kind:"literal",value:r}}if(this.current().kind==="paren_close")return this.consume("paren_close"),t}const n=this.parseExpression();return this.consume("paren_close"),n}throw new oe(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){const e=this.consume("identifier").value;this.consume("paren_open");const n=[];if(this.current().kind!=="paren_close")for(n.push(this.parseExpression());this.current().kind==="comma";)this.consume("comma"),n.push(this.parseExpression());return this.consume("paren_close"),{kind:"function",name:e,args:n}}parsePath(e,n,t=!0){const r=[],i=o=>{const l={step:o};for(r.push(l);this.current().kind==="bracket_open";){if(!t)throw new oe("Predicates are not allowed in this path context",{expression:this.expression,position:this.current().position});this.consume("bracket_open");const c=this.parseExpression();l.predicate===void 0?l.predicate=c:l.predicate={kind:"binary",operator:"and",left:l.predicate,right:c},this.consume("bracket_close")}return this.current().kind==="slash"?(this.consume("slash"),!0):!1};for(n!==void 0&&i(n);this.current().kind==="dot"||this.current().kind==="dotdot"||this.current().kind==="identifier";){const o=this.consume().value;if(!i(o))break}return{kind:"path",segments:r,isAbsolute:e}}parsePathExpression(e={}){const n=e.allowPredicate??!0;if(this.current().kind==="eof")throw new oe("Empty path expression",{expression:this.expression,position:0});let t=!1;this.current().kind==="slash"&&(t=!0,this.consume("slash"));const r=this.parsePath(t,void 0,n),i=this.current();if(i.kind!=="eof")throw new oe(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function Ln(e){return new fs(e).parse()}function ds(e,n={}){return new fs(e).parsePathExpression(n)}var Mo=class{constructor(e=[]){g(this,"statements");this.statements=e}find_statement(e){return this.statements.find(n=>n.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){const e=[];for(const n of this.statements)e.push(...this.collectLeaves(n));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof hs)return[e];if(e instanceof yn||e instanceof _s){const n=[];for(const t of e.statements)n.push(...this.collectLeaves(t));return n}return[]}},He=class extends Mo{constructor(n={}){super(n.statements??[]);g(this,"keyword");g(this,"name");g(this,"description");g(this,"reference");this.keyword=n.keyword??"",this.name=n.name??"",this.description=n.description??"",this.reference=n.reference??""}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(n){return this.name?new Set([this.name]):new Set}childNames(n){return this.child_names(n)}},Do=class extends He{constructor(n={}){super(n);g(this,"must_statements");this.must_statements=n.must_statements??[]}},ee=class extends He{constructor(n={}){super(n);g(this,"when");g(this,"if_features");g(this,"config");this.when=n.when,this.if_features=n.if_features??[],this.config=n.config}get_schema_node(){return this.name||void 0}},ms=class extends He{constructor(n={}){super(n);g(this,"type");g(this,"default");this.keyword="typedef",this.type=n.type,this.default=n.default}get_schema_node(){return this.name||void 0}},ni=class extends He{constructor(n={}){super(n);g(this,"bases");g(this,"if_features");this.keyword="identity",this.bases=n.bases??[],this.if_features=n.if_features??[]}get_schema_node(){}},Lo=class{constructor(e={}){g(this,"name");g(this,"position");this.name=e.name??"",this.position=e.position}},Fo=class{constructor(e={}){g(this,"pattern");g(this,"invert_match");g(this,"error_message");g(this,"error_app_tag");this.pattern=e.pattern??"",this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},jo=class{constructor(e={}){g(this,"name");g(this,"patterns");g(this,"length");g(this,"range");g(this,"fraction_digits");g(this,"enums");g(this,"bits");g(this,"types");g(this,"path");g(this,"require_instance");g(this,"identityref_bases");this.name=e.name??"",this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},yn=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"presence");this.keyword="container",this.must_statements=n.must_statements??[],this.presence=n.presence}},Vo=class extends yn{constructor(e={}){super(e),this.keyword="notification"}},Yo=class extends yn{constructor(e={}){super({name:"input",...e}),this.keyword="input"}},Bo=class extends yn{constructor(e={}){super({name:"output",...e}),this.keyword="output"}},Uo=class extends ee{constructor(n={}){super(n);g(this,"must_statements");this.keyword="rpc",this.must_statements=n.must_statements??[]}},_s=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"key");g(this,"min_elements");g(this,"max_elements");this.keyword="list",this.must_statements=n.must_statements??[],this.key=n.key,this.min_elements=n.min_elements,this.max_elements=n.max_elements}},hs=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"type");g(this,"mandatory");g(this,"default");this.keyword="leaf",this.must_statements=n.must_statements??[],this.type=n.type,this.mandatory=n.mandatory??!1,this.default=n.default}},ys=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"type");g(this,"min_elements");g(this,"max_elements");g(this,"defaults");this.keyword="leaf-list",this.must_statements=n.must_statements??[],this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.defaults=n.defaults??[]}},qo=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"mandatory");this.keyword="anydata",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},Go=class extends ee{constructor(n={}){super(n);g(this,"must_statements");g(this,"mandatory");this.keyword="anyxml",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},Yt=class extends He{constructor(n={}){super(n);g(this,"argument_name");g(this,"argument_yin_element");g(this,"apply_callback");this.keyword="extension",this.argument_name=n.argument_name??"",this.argument_yin_element=n.argument_yin_element,this.apply_callback=n.apply_callback}apply(n,t){return this.apply_callback?this.apply_callback(n,t.context_module):n}get_schema_node(){}},zo=class extends ee{constructor(n){super(n);g(this,"must_statements");g(this,"prefix");g(this,"resolved_module");g(this,"resolved_extension");g(this,"argument");if(this.keyword="extension-invocation",this.must_statements=n.must_statements??[],this.prefix=n.prefix,this.resolved_module=n.resolved_module,this.resolved_extension=n.resolved_extension,this.argument=n.argument,!this.prefix)throw new Error("extension invocation requires a non-empty prefix");if(!this.resolved_module)throw new Error("extension invocation requires resolved_module");if(!this.resolved_extension)throw new Error("extension invocation requires resolved_extension")}get_schema_node(){}},gs=class{constructor(e){g(this,"expression");g(this,"description");g(this,"ast");this.expression=e.expression,this.description=e.description??"",this.expression&&(this.ast=Ln(this.expression))}},ti=class extends gs{constructor(n){super(n);g(this,"error_message");this.error_message=n.error_message??""}},Ko=class extends gs{constructor(n){super(n);g(this,"evaluate_with_parent_context");this.evaluate_with_parent_context=n.evaluate_with_parent_context??!1}get condition(){return this.expression}},Ho=class extends He{constructor(e={}){super(e),this.keyword="grouping"}},Wt=class extends ee{constructor(n={}){super(n);g(this,"grouping_name");g(this,"refines");g(this,"augmentations");this.keyword="uses",this.grouping_name=n.grouping_name??"",this.refines=n.refines??[],this.augmentations=n.augmentations??[]}get_schema_node(){}},Wo=class extends ee{constructor(n={}){super(n);g(this,"augment_path");this.keyword="augment",this.augment_path=n.augment_path??""}get_schema_node(){}},Fn=class extends Do{constructor(n={}){super(n);g(this,"target_path");g(this,"type");g(this,"min_elements");g(this,"max_elements");g(this,"refined_defaults");g(this,"refined_mandatory");g(this,"refined_config");g(this,"if_features");this.keyword="refine",this.target_path=n.target_path??"",this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.refined_defaults=n.refined_defaults??[],this.refined_mandatory=n.refined_mandatory,this.refined_config=n.refined_config,this.if_features=n.if_features??[]}},Rn=class extends ee{constructor(n={}){super(n);g(this,"mandatory");g(this,"cases");this.keyword="choice",this.mandatory=n.mandatory??!1,this.cases=n.cases??[]}child_names(n){for(const t of this.cases)if(t.statements.some(r=>r.name&&r.name in n))return new Set(t.statements.map(r=>r.name).filter(r=>!!r));return new Set}validate_case_unique_child_names(){const n=new Map;for(const t of this.cases)for(const r of t.statements){const i=r.get_schema_node();if(i){if(n.has(i)){const a=n.get(i);throw new B(`Choice '${this.name}': schema node '${i}' appears in case '${a}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}n.set(i,t.name)}}}},ri=class extends ee{constructor(e={}){super(e),this.keyword="case"}child_names(e){return new Set(this.statements.map(n=>n.name).filter(n=>!!n))}},Jo=class{constructor(e){g(this,"parsers");this.parsers=e}parse_anydata(e,n){e.consume(Oe);const t=e.consume(),r=new qo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Xo=class{constructor(e){g(this,"parsers");this.parsers=e}parse_anyxml(e,n){e.consume(Pe);const t=e.consume(),r=new Go({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}};function Hn(e,n){const t={...n};return t[de]??(t[de]=(r,i)=>{e.parse_description(r,i)}),t[Ie]??(t[Ie]=(r,i)=>{e.parse_reference(r,i)}),t[Ae]??(t[Ae]=(r,i)=>{e.parse_status_ignored(r,i)}),t}function Wn(e,n){const t=Hn(e,n);return t[on]??(t[on]=(r,i)=>{e.parse_config(r,i)}),t[Ae]??(t[Ae]=(r,i)=>{e.parse_status_ignored(r,i)}),t}var Qo=class{constructor(e){g(this,"parsers");g(this,"augmentBodyDispatch");this.parsers=e,this.augmentBodyDispatch=Wn(this.parsers,{[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ke]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ce]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Re]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ee]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[$e]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[ke]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[Gn]:(n,t)=>{this.parsers.choice_parser.parse_case(n,t)},[Oe]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Pe]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ue]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[tt]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parse_augment(e,n){e.consume(ls);const t=this.parsers.parse_string_concatenation(e),r=new Wo({name:"augment",augment_path:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.substatement_handler(e,this.augmentBodyDispatch);o?o(e,a):e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"?this.parsers.parse_prefixed_extension_statement_public(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,"augment")}e.consume_type("}")}const i=n.current_parent;return i instanceof Wt?i.augmentations.push(r):this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Zo=class{constructor(e){g(this,"parsers");this.parsers=e}parse_type_bit(e,n,t){e.consume(ns);const r=e.consume();let i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Yr?(e.consume(Yr),i=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}t.bits.push(new Lo({name:r,position:i})),e.consume_if_type(";")}finalize_bits_type(e){let n=-1;for(const t of e.bits)t.position===void 0&&(t.position=n+1),n=Math.max(n,t.position)}},el=new Set([Ce,Re,Ee,$e,Oe,Pe,ke]),nl=class{constructor(e){g(this,"parsers");g(this,"choiceSubstatementDispatch");g(this,"caseSubstatementDispatch");this.parsers=e,this.choiceSubstatementDispatch=Wn(this.parsers,{[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Gn]:(n,t)=>{this.parse_case(n,t)},[zn]:(n,t)=>{this.parse_choice_mandatory(n,t)}}),this.caseSubstatementDispatch=Wn(this.parsers,{[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ke]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ce]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ee]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[$e]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Re]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Oe]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Pe]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[ke]:(n,t)=>{this.parse_choice(n,t)}})}parse_choice(e,n){e.consume(ke);const t=e.consume(),r=new Rn({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_choice_substatement(e,i,t);e.consume_type("}"),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_choice_substatement(e,n,t){const r=`choice '${t}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,n);return}const a=this.parsers.dispatch_key(e);if(typeof a=="string"&&el.has(a)){this.parse_choice_implicit_case(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,n){const t=n.current_parent;t instanceof Rn||e.syntaxError("internal: implicit choice case outside choice body");const r=new ri({name:""}),i=n.push_parent(r),a=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);a||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),a(e,i),r.statements.length===0&&e.syntaxError("Expected a schema node in implicit choice case (RFC 7950 §7.9.2)");const o=r.statements[0],l=o.name||o.get_schema_node();l||e.syntaxError("Implicit choice case requires a named schema node (RFC 7950 §7.9.2)"),r.name=l,t.cases.push(r)}parse_case(e,n){e.consume(Gn);const t=e.consume(),r=new ri({name:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_case_substatement(e,a,t);e.consume_type("}")}const i=n.current_parent;return i instanceof Rn?i.cases.push(r):this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_case_substatement(e,n,t){const r=`case '${t}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);if(i){i(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,n){e.consume(zn);const[,t]=e.consume_oneof([J,fe]),r=n.current_parent;r instanceof Rn&&(r.mandatory=t===J),e.consume_if_type(";")}},tl=class{constructor(e){g(this,"parsers");g(this,"containerSubstatementDispatch");this.parsers=e,this.containerSubstatementDispatch=Wn(this.parsers,{[Vt]:(n,t)=>{this.parsers.parse_presence(n,t)},[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ue]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Ce]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ee]:(n,t)=>{this.parse_container(n,t)},[$e]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Re]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ke]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[ke]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Oe]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Pe]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[tt]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parseContainerSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`container '${t}'`)}parse_container(e,n){e.consume(Ee);const t=e.consume(),r=new yn({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseContainerSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},rl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_extension_stmt(e,n){e.consume(us);const t=e.consume_type("IDENTIFIER"),r=new Yt({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.dispatch_key(e)===Zr?this.parse_extension_argument_stmt(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}return n.module.extensions[t]=r,this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_extension_argument_stmt(e,n){e.consume(Zr);const t=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),r=n.current_parent;if(r instanceof Yt&&(r.argument_name=t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)if(e.peek()===ei){e.consume(ei);const[,i]=e.consume_oneof([J,fe]);r.argument_yin_element=i===J,e.consume_if_type(";")}else this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},il=class{constructor(e){g(this,"parsers");this.parsers=e}parse_feature_stmt(e,n){var i;e.consume(os);const t=e.consume_type("IDENTIFIER");((i=n.module).features??(i.features=new Set)).add(t);const r={if_features:[]};if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,a);e.consume_type("}")}if(r.if_features.length>0){const a=n.module,o=a.feature_if_features??(a.feature_if_features={});o[t]=[...r.if_features]}e.consume_if_type(";")}parse_if_feature_stmt(e,n){e.consume(_e);const t=this.parsers.parse_string_concatenation(e),r=n.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},sl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_grouping(e,n){e.consume(ts);const t=e.consume(),r=new Ho({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.groupings[t]=r,e.consume_if_type(";")}},al=class{constructor(e){g(this,"parsers");this.parsers=e}parse_identity(e,n){e.consume(es);const t=e.consume_type("IDENTIFIER"),r=new ni({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Un?this.parse_identity_base(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.identities[t]=r,e.consume_if_type(";")}parse_identity_base(e,n){e.consume(Un);const t=this.parsers.consume_qname_from_identifier(e),r=n.current_parent;r instanceof ni&&r.bases.push(t),e.consume_if_type(";")}},ol=class{constructor(e){g(this,"parsers");this.parsers=e}parse_leaf(e,n){e.consume(Ce);const t=e.consume(),r=new hs({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},ll=class{constructor(e){g(this,"parsers");this.parsers=e}parse_leaf_list(e,n){e.consume(Re);const t=e.consume(),r=new ys({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},cl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_list(e,n){e.consume($e);const t=e.consume(),r=new _s({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},ul=class{constructor(e){g(this,"parsers");this.parsers=e}parse_module(e,n){for(e.consume(jt),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}parse_yang_version(e,n){e.consume(Wi);const[t]=e.consume_oneof(["IDENTIFIER","DOTTED_NUMBER"]);n.module.yang_version=t,e.consume_if_type(";")}parse_namespace(e,n){e.consume(Ji),n.module.namespace=e.consume_type("STRING"),e.consume_if_type(";")}parse_prefix(e,n){e.consume(Ye);const t=this.parsers.dispatch_key(e);n.module.prefix=t==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}parse_organization(e,n){e.consume(Xi),n.module.organization=e.consume_type("STRING"),e.consume_if_type(";")}parse_contact(e,n){e.consume(Qi),n.module.contact=e.consume_type("STRING"),e.consume_if_type(";")}parse_import_stmt(e,n){e.consume(is);const t=e.consume_type("IDENTIFIER");let r,i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const a=this.parsers.dispatch_key(e);if(a===Ye){e.consume(Ye),r=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";");continue}if(a===as){i=this.parsers.revision_parser.parse_revision_date_statement(e);continue}this.skip_nested_statement(e)}e.consume_type("}")}if(e.consume_if_type(";"),!r||r.trim().length===0)throw new B(`Import '${t}' is missing required prefix substatement`);this.parsers.register_import(n,t,r,i,e)}parse_include_stmt(e,n){if(e.consume(ss),e.consume_type("IDENTIFIER"),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}parse_prefix_value_stmt(e){e.consume(Ye),e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}skip_nested_statement(e){let n=0;for(;e.has_more();){const t=this.parsers.dispatch_key(e);if(t==="{"){n+=1,e.consume_type("{");continue}if(t==="}"){if(n===0)return;n-=1,e.consume_type("}");continue}if(t===";"&&n===0){e.consume_type(";");return}e.consume()}}},pl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_notification(e,n){e.consume(tt);const t=e.consume(),r=new Vo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},fl=class{constructor(e){g(this,"parsers");g(this,"ioSubstatementDispatch");g(this,"rpcSubstatementDispatch");this.parsers=e,this.ioSubstatementDispatch=Hn(this.parsers,{[Ht]:(n,t)=>{this.parsers.typedef_parser.parse_typedef(n,t)},[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ue]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Ce]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ee]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[$e]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Re]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ke]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[ke]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Oe]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Pe]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)}}),this.rpcSubstatementDispatch=Hn(this.parsers,{[me]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ue]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[ln]:(n,t)=>{this.parse_input(n,t)},[cn]:(n,t)=>{this.parse_output(n,t)},[_e]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)}})}parseIoSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`${t} block`)}parseIoBlock(e,n,t,r){if(e.consume(t),e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseIoSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_input(e,n){return this.parseIoBlock(e,n,ln,new Yo)}parse_output(e,n){return this.parseIoBlock(e,n,cn,new Bo)}parseRpcSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${t}'`)}parse_rpc(e,n){e.consume(ps);const t=e.consume(),r=new Uo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseRpcSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},dl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_must(e,n){e.consume(Ue);const t=this.parsers.parse_string_concatenation(e),r=new ti({expression:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Kn?this.parse_must_error_message(e,a):this.parsers.parseStatement(e,a);e.consume_type("}")}const i=n.current_parent;return Array.isArray(i==null?void 0:i.must_statements)&&i.must_statements.push(r),e.consume_if_type(";"),r}parse_must_error_message(e,n){e.consume(Kn);const t=n.current_parent;t instanceof ti&&(t.error_message=e.consume_type("STRING")),e.consume_if_type(";")}},ml=class{constructor(e){g(this,"parsers");this.parsers=e}parse_refine(e,n){e.consume(rs);const t=[e.consume()];for(;e.has_more()&&e.peek_type()==="/";)e.consume_type("/"),t.push(e.consume());const r=t.join("/"),i=new Fn({name:"refine",target_path:r});if(e.consume_if_type("{")){const a=n.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,a);e.consume_type("}")}n.current_parent instanceof Wt&&n.current_parent.refines.push(i),e.consume_if_type(";")}},_l=class{constructor(e){g(this,"parsers");this.parsers=e}parse_revision(e,n){var i;e.consume(Zi);let t="";if(e.peek_type()==="STRING")t=e.consume_type("STRING");else for(;e.has_more()&&!["{",";"].includes(e.peek_type());)t+=e.consume();const r={date:t,description:"",reference:""};if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===de?(e.consume(de),r.description=e.consume_type("STRING"),e.consume_if_type(";")):e.peek()===Ie?(e.consume(Ie),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}((i=n.module).revisions??(i.revisions=[])).push(r),e.consume_if_type(";")}parse_revision_date_statement(e){e.consume(as);let n="";if(e.peek_type()==="STRING")n=e.consume_type("STRING");else for(;e.has_more()&&e.peek_type()!==";";)n+=e.consume();return e.consume_if_type(";"),n}},hl=class{constructor(e,n){g(this,"parsers");g(this,"module_parser");this.parsers=e,this.module_parser=n}parse_submodule(e,n){for(e.consume(cs),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Qr?this.parse_belongs_to(e,n):this.parsers.parseStatement(e,n);e.consume_type("}")}parse_belongs_to(e,n){for(e.consume(Qr),n.module.belongs_to_module=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Ye?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,n);e.consume_type("}"),e.consume_if_type(";")}},yl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_type(e,n){e.consume(qn);const t=e.peek_type()==="IDENTIFIER"?this.parsers.consume_qname_from_identifier(e):e.consume(),r=new jo({name:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.dispatch_key(e);if(o===Br)this.parse_type_pattern(e,a,r);else if(o===qr)this.parse_type_length(e,a,r);else if(o===zr)this.parse_type_range(e,a,r);else if(o===Gr)this.parse_type_fraction_digits(e,a,r);else if(o===Vr)this.parse_type_enum(e,a,r);else if(o===ns)this.parsers.bits_parser.parse_type_bit(e,a,r);else if(o===Fr)this.parse_type_path(e,a,r);else if(o===jr)this.parse_type_require_instance(e,a,r);else if(o===Un)this.parse_type_base(e,a,r);else if(o===qn){const l=this.parse_type(e,a);r.types.push(l)}else this.parsers.parseStatement(e,a)}e.consume_type("}"),r.name===ko&&r.enums.length===0&&e.syntaxError("enumeration type must contain at least one enum statement")}const i=n.current_parent;return i&&"type"in i&&!i.type&&(i.type=r),e.consume_if_type(";"),r}parse_type_base(e,n,t){e.consume(Un),t.identityref_bases.push(this.parsers.consume_qname_from_identifier(e)),e.consume_if_type(";")}parse_type_pattern(e,n,t){e.consume(Br);const r=this.parsers.parse_string_concatenation(e);let i=!1,a,o;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const l=this.parsers.dispatch_key(e);l===Kn?(e.consume(Kn),a=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):l===Xr?(e.consume(Xr),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):l===Ur?(e.consume(Ur),i=e.consume()==="invert-match",e.consume_if_type(";")):this.parsers.parseStatement(e,n)}e.consume_type("}")}t.patterns.push(new Fo({pattern:r,invert_match:i,error_message:a,error_app_tag:o})),e.consume_if_type(";")}parse_type_length(e,n,t){e.consume(qr),t.length=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_range(e,n,t){e.consume(zr),t.range=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_fraction_digits(e,n,t){e.consume(Gr),t.fraction_digits=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")}parse_type_enum(e,n,t){if(e.consume(Vr),t.enums.push(e.consume()),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";")}parse_type_path(e,n,t){e.consume(Fr);const r=this.parsers.parse_string_argument(e);t.path=ds(r),e.consume_if_type(";")}parse_type_require_instance(e,n,t){e.consume(jr);const[,r]=e.consume_oneof([J,fe]);t.require_instance=r===J,e.consume_if_type(";")}},gl=class{constructor(e){g(this,"parsers");g(this,"typedefBodyDispatch");this.parsers=e,this.typedefBodyDispatch=Hn(this.parsers,{[qn]:(n,t)=>{this.parsers.type_parser.parse_type(n,t)},[Dn]:(n,t)=>{this.parsers.parse_typedef_default(n,t)}})}parse_typedef(e,n){e.consume(Ht);const t=e.consume_type("IDENTIFIER"),r=new ms({name:t}),i=`typedef '${t}'`;if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.substatement_handler(e,this.typedefBodyDispatch);o?o(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type("}")}return n.module.typedefs[t]=r,e.consume_if_type(";"),r}},vl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_uses(e,n){e.consume(Ke);const t=e.peek_type()==="IDENTIFIER"?this.parsers.consume_qname_from_identifier(e):e.consume(),r=new Wt({name:"uses",grouping_name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},bl=class{constructor(e){g(this,"parsers");this.parsers=e}parse_when(e,n){e.consume(me);const t=this.parsers.parse_string_concatenation(e),r=new Ko({expression:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.current_parent instanceof ee&&(n.current_parent.when=r),e.consume_if_type(";")}},vs=new Set([No,$o]);function xl(e){let n=0;for(;e.has_more();){const t=e.peek_type();if(t==="{")n+=1,e.consume_type("{");else if(t==="}"){if(n-=1,e.consume_type("}"),n===0)return}else e.consume()}}function wl(e,{context:n}){const t=e.peek_token();if(!t||!vs.has(t.value))return;const r=t.value,[i,a]=e.position(),o=e.filename??"<string>";for(console.warn(`Ignoring unsupported YANG statement '${r}' (${n}) at ${o}:${i}:${a}`),e.consume();e.has_more();){const l=e.peek_type();if(l==="{"){xl(e);break}if(l===";"){e.consume_type(";");return}if(l==="}")return;e.consume()}e.consume_if_type(";")}function Sl(e){const n=e.peek_token();return n!==void 0&&vs.has(n.value)}function Al(e){e.consume(Ae),e.peek_type()==="IDENTIFIER"&&e.consume_type("IDENTIFIER"),e.consume_if_type(";")}function Il(e){if(typeof e.keyword=="string"&&e.keyword.trim().length>0)return e.keyword;throw new B("Internal error: cannot serialize AST statement without a keyword")}var Tl=class{constructor(e={}){g(this,"importResolver");g(this,"anydata_parser",new Jo(this));g(this,"anyxml_parser",new Xo(this));g(this,"augment_parser",new Qo(this));g(this,"bits_parser",new Zo(this));g(this,"choice_parser",new nl(this));g(this,"container_parser",new tl(this));g(this,"extension_parser",new rl(this));g(this,"feature_parser",new il(this));g(this,"grouping_parser",new sl(this));g(this,"identity_parser",new al(this));g(this,"leaf_parser",new ol(this));g(this,"leaf_list_parser",new ll(this));g(this,"list_parser",new cl(this));g(this,"module_parser",new ul(this));g(this,"notification_parser",new pl(this));g(this,"rpc_parser",new fl(this));g(this,"must_parser",new dl(this));g(this,"refine_parser",new ml(this));g(this,"revision_parser",new _l(this));g(this,"submodule_parser",new hl(this,this.module_parser));g(this,"type_parser",new yl(this));g(this,"typedef_parser",new gl(this));g(this,"uses_parser",new vl(this));g(this,"when_parser",new bl(this));g(this,"statementKeywordHandlers",{[Ce]:(e,n)=>this.fromAst(this.leaf_parser.parse_leaf(e,n)),[Re]:(e,n)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,n)),[Ee]:(e,n)=>this.fromAst(this.container_parser.parse_container(e,n)),[$e]:(e,n)=>this.fromAst(this.list_parser.parse_list(e,n)),[tt]:(e,n)=>this.fromAst(this.notification_parser.parse_notification(e,n)),[ps]:(e,n)=>this.fromAst(this.rpc_parser.parse_rpc(e,n)),[Oe]:(e,n)=>this.fromAst(this.anydata_parser.parse_anydata(e,n)),[Pe]:(e,n)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,n)),[ke]:(e,n)=>this.fromAst(this.choice_parser.parse_choice(e,n)),[Gn]:()=>{throw new Z("'case' is only valid as a substatement of 'choice' (RFC 7950)")},[ln]:()=>{throw new Z("'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[cn]:()=>{throw new Z("'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[Ht]:(e,n)=>this.fromAst(this.typedef_parser.parse_typedef(e,n)),[qn]:(e,n)=>this.fromType(this.type_parser.parse_type(e,n)),[Ke]:(e,n)=>this.fromAst(this.uses_parser.parse_uses(e,n)),[rs]:(e,n)=>(this.refine_parser.parse_refine(e,n),{__class__:"YangStatement",keyword:"refine",statements:[]}),[Ue]:(e,n)=>this.fromMust(this.must_parser.parse_must(e,n)),[me]:(e,n)=>(this.when_parser.parse_when(e,n),{__class__:"YangStatement",keyword:"when",statements:[]}),[us]:(e,n)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,n)),[os]:(e,n)=>(this.feature_parser.parse_feature_stmt(e,n),{__class__:"YangStatement",keyword:"feature",statements:[]}),[_e]:(e,n)=>(this.feature_parser.parse_if_feature_stmt(e,n),{__class__:"YangStatement",keyword:"if-feature",statements:[]}),[es]:(e,n)=>(this.identity_parser.parse_identity(e,n),{__class__:"YangStatement",keyword:"identity",statements:[]}),[ts]:(e,n)=>(this.grouping_parser.parse_grouping(e,n),{__class__:"YangStatement",keyword:"grouping",statements:[]}),[ls]:(e,n)=>this.fromAst(this.augment_parser.parse_augment(e,n)),[Zi]:(e,n)=>(this.revision_parser.parse_revision(e,n),{__class__:"YangStatement",keyword:"revision",statements:[]}),[de]:(e,n)=>({__class__:"YangStatement",keyword:"description",argument:this.parse_description(e,n),name:"description",statements:[]}),[zn]:(e,n)=>(this.parse_leaf_mandatory(e,n),{__class__:"YangStatement",keyword:"mandatory",statements:[]}),[Dn]:(e,n)=>(this.parse_leaf_default(e,n),{__class__:"YangStatement",keyword:"default",statements:[]}),[Kr]:(e,n)=>(this.parse_list_key(e,n),{__class__:"YangStatement",keyword:"key",statements:[]}),[Hr]:(e,n)=>(this.parse_min_elements(e,n),{__class__:"YangStatement",keyword:"min-elements",statements:[]}),[Wr]:(e,n)=>(this.parse_max_elements(e,n),{__class__:"YangStatement",keyword:"max-elements",statements:[]}),[Jr]:(e,n)=>(this.parse_ordered_by(e),{__class__:"YangStatement",keyword:"ordered-by",statements:[]}),[Vt]:(e,n)=>(this.parse_presence(e,n),{__class__:"YangStatement",keyword:"presence",statements:[]}),[Ie]:(e,n)=>(this.parse_reference(e,n),{__class__:"YangStatement",keyword:"reference",statements:[]}),[on]:(e,n)=>(this.parse_config(e,n),{__class__:"YangStatement",keyword:"config",statements:[]})});this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()==="IDENTIFIER"?e.peek()??"":e.peek_type()}assertStatementStartAllowed(e,n,t){const r=n instanceof Set?n:new Set(n),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return;const a=t?` ${t}`:"",o=e.peek()??"<end>",l=[...r].map(c=>String(c)).sort().join(", ");throw new Z(`Invalid statement starting with '${o}'${a}. Allowed here: ${l}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,n){const t=this.parseStatement(e,n);if(t.keyword!=="module")throw new B("Expected top-level 'module' statement");return t}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,n,t){t!=null&&t.allowedStatementStarts&&this.assertStatementStartAllowed(e,t.allowedStatementStarts,t.restrictionContext);const r=this.dispatch_key(e);if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return this.parse_prefixed_extension_statement(e,n);const i=this.statementKeywordHandlers[r];return i?i(e,n):this.parse_statement_generic(e,n)}parse_statement_generic(e,n){const t=this.dispatch_key(e);if(t===jt)return this.parse_top_level_module(e,n);if(t===cs)return this.submodule_parser.parse_submodule(e,n),{__class__:"YangStatement",keyword:"submodule",statements:[]};if(t===Wi)return this.module_parser.parse_yang_version(e,n),{__class__:"YangStatement",keyword:"yang-version",argument:n.module.yang_version,name:"yang-version",statements:[]};if(t===Ji)return this.module_parser.parse_namespace(e,n),{__class__:"YangStatement",keyword:"namespace",argument:n.module.namespace,name:"namespace",statements:[]};if(t===Ye)return this.module_parser.parse_prefix(e,n),{__class__:"YangStatement",keyword:"prefix",argument:n.module.prefix,name:"prefix",statements:[]};if(t===Xi)return this.module_parser.parse_organization(e,n),{__class__:"YangStatement",keyword:"organization",statements:[]};if(t===Qi)return this.module_parser.parse_contact(e,n),{__class__:"YangStatement",keyword:"contact",statements:[]};if(t===is)return this.module_parser.parse_import_stmt(e,n),{__class__:"YangStatement",keyword:"import",statements:[]};if(t===ss)return this.module_parser.parse_include_stmt(e,n),{__class__:"YangStatement",keyword:"include",statements:[]};if(this.skip_unsupported_if_present(e,"generic"))return{__class__:"YangStatement",keyword:"unsupported",statements:[]};const r=e.peek();(r===ln||r===cn)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let a=e.consume();e.peek_type()===":"&&(e.consume_type(":"),a=`${a}:${e.consume_type("IDENTIFIER")}`);const o=this.parse_argument(e),l=[];if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)l.push(this.parseStatement(e,n));e.consume_type("}"),e.consume_if_type(";")}else e.consume_if_type(";");const c={__class__:"YangStatement",keyword:a,name:o,argument:o,statements:l};return a==="type"&&(c.type=this.extract_type_shape(c)),c}parse_argument(e){const n=[];for(;e.has_more();){const t=e.peek_type();if(t===";"||t==="{")break;t==="STRING"?n.push(this.parse_string_concatenation(e)):t==="+"?e.consume_type("+"):n.push(e.consume())}return n.join("").trim()}parse_string_concatenation(e){const n=[e.consume_type("STRING")];for(;e.has_more()&&e.peek_type()==="+";)e.consume_type("+"),n.push(e.consume_type("STRING"));return n.join("")}parse_string_argument(e){return e.peek_type()==="STRING"?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,"")}substatement_handler(e,n){const t=this.dispatch_key(e);if(typeof t=="string")return n[t]}skip_unsupported_or_raise_unknown(e,n){const t=e.peek();if((t===ln||t===cn)&&e.syntaxError(`'${t}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,n))return!0;const r=e.peek()??"<eof>";e.syntaxError(`Invalid or unknown statement '${r}' in ${n}`)}parse_prefixed_extension_statement_public(e,n){this.parse_prefixed_extension_statement(e,n)}consume_qname_from_identifier(e){const n=[e.consume_type("IDENTIFIER")];for(;e.consume_if_type(":");)n.push(e.consume_type("IDENTIFIER"));return n.join(":")}add_to_parent_or_module(e,n){const t=e.current_parent;if(t&&Array.isArray(t.statements)){t.statements.push(n);return}const r=e.module;Array.isArray(r.statements)&&r.statements.push(n)}skip_unsupported_if_present(e,n){return Sl(e)?(wl(e,{context:n}),!0):!1}parse_top_level_module(e,n){e.consume(jt);const t=e.consume_type("IDENTIFIER");n.module.name=t,e.consume_type("{");const r=[];for(;e.has_more()&&e.peek_type()!=="}";)r.push(this.parseStatement(e,n));return e.consume_type("}"),{__class__:"YangStatement",keyword:"module",name:t,argument:t,statements:r}}fromAst(e){var u,f;const n=Il(e),t=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:"YangStatement",keyword:n,name:e.name,argument:e.name,statements:t};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);const i=e.config;if(typeof i=="boolean"&&(r.config=i),n==="leaf-list"){const m=e.defaults;Array.isArray(m)&&m.length>0&&(r.defaults=[...m])}e.key!==void 0&&(r.key=e.key);const a=e.min_elements;typeof a=="number"&&(r.min_elements=a);const o=e.max_elements;typeof o=="number"&&(r.max_elements=o),e.description&&(r.description=e.description);const l=e.reference;if(l&&(r.reference=l),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),n==="extension"&&(typeof e.argument_name=="string"&&(r.argument_name=e.argument_name),typeof e.argument_yin_element=="boolean"&&(r.argument_yin_element=e.argument_yin_element)),n==="augment"&&typeof e.augment_path=="string"&&(r.argument=e.augment_path,r.augment_path=e.augment_path),n==="extension-invocation"&&(r.keyword=e.name??"extension-invocation",r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=(u=e.resolved_module)==null?void 0:u.name,r.resolved_extension_name=(f=e.resolved_extension)==null?void 0:f.name),e.when&&typeof e.when.expression=="string"&&(r.when={expression:e.when.expression,description:e.when.description??"",evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(m=>this.fromMust(m))]),n==="uses"){const m=e;typeof m.grouping_name=="string"&&m.grouping_name.length>0&&(r.grouping_name=m.grouping_name,r.argument=m.grouping_name),Array.isArray(m.refines)&&m.refines.length>0&&(r.refines=m.refines.map(_=>this.serializeRefineStmt(_)))}const c=e.presence;return typeof c=="string"&&c.length>0&&(r.presence=c),r}serializeRefineStmt(e){const n={__class__:"YangStatement",keyword:"refine",name:"refine",argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements=="number"&&(n.min_elements=e.min_elements),typeof e.max_elements=="number"&&(n.max_elements=e.max_elements),typeof e.refined_mandatory=="boolean"&&(n.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(n.refined_defaults=[...e.refined_defaults]),typeof e.refined_config=="boolean"&&(n.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(n.if_features=[...e.if_features]),typeof e.description=="string"&&e.description.length>0&&(n.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(n.statements=e.must_statements.map(t=>this.fromMust(t))),n}serializeAstChildren(e){const n=[];for(const t of e)!t||typeof t!="object"||n.push(this.fromAst(t));return n}fromType(e){return{__class__:"YangStatement",keyword:"type",name:e.name,argument:e.name,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:"YangStatement",keyword:"must",name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){return{name:e.name,patterns:e.patterns.map(n=>({pattern:n.pattern,invert_match:n.invert_match,error_message:n.error_message,error_app_tag:n.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:[...e.identityref_bases],enums:[...e.enums],bits:e.bits.map(n=>({name:n.name,position:n.position??0})),types:e.types.map(n=>this.fromTypeShape(n))}}extract_type_shape(e){const n=e.argument??"string",t={name:n};for(const r of e.statements??[]){if(r.keyword==="pattern"&&r.argument){const i=t.patterns??[];i.push({pattern:r.argument,invert_match:!1}),t.patterns=i}if(r.keyword==="length"&&r.argument&&(t.length=r.argument),r.keyword==="range"&&r.argument&&(t.range=r.argument),r.keyword==="fraction-digits"&&r.argument){const i=Number.parseInt(r.argument,10);Number.isNaN(i)||(t.fraction_digits=i)}if(r.keyword==="enum"&&r.argument&&(t.enums=[...t.enums??[],r.argument]),r.keyword==="bit"&&r.argument){const i=t.bits??[];i.push({name:r.argument,position:i.length===0?0:Math.max(...i.map(a=>a.position))+1}),t.bits=i}n==="union"&&r.keyword==="type"&&(t.types=[...t.types??[],this.extract_type_shape(r)])}return t}parse_description(e,n){e.consume(de);const t=e.consume_type("STRING");if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";");const r=n.current_parent;return r&&"description"in r&&(r.description=t),t}parse_optional_description(e,n){e.has_more()&&e.peek()===de&&this.parse_description(e,n)}parse_reference(e,n){e.consume(Ie);const t=e.consume_type("STRING");e.consume_if_type(";");const r=n.current_parent;r&&typeof r=="object"&&"reference"in r&&(r.reference=t)}parse_reference_string_only(e,n){this.parse_reference(e,n)}parse_status_ignored(e,n){Al(e)}parse_config(e,n){e.consume(on);const t=e.consume_oneof([J,fe])[1],r=n.current_parent;r instanceof Fn?r.refined_config=t===J:r&&typeof r=="object"&&"config"in r&&(r.config=t===J),e.consume_if_type(";")}parse_typedef_default(e,n){e.consume(Dn);const t=n.current_parent;t instanceof ms&&(t.default=this.parse_default_value_tokens(e)),e.consume_if_type(";")}register_import(e,n,t,r,i){const a=e.module,o=String(a.prefix??"").replace(/^['"]|['"]$/g,"");if(t===o)throw new B(`Import prefix '${t}' must differ from this module's prefix`);const l=a.import_prefixes??{};if(a.import_prefixes=l,l[t])throw new B(`Duplicate import prefix '${t}'`);if(!this.importResolver)throw new B("Import resolution is not configured for this parser instance");l[t]=this.importResolver(n,t,r,e,i)}parse_ordered_by(e){e.consume(Jr),e.consume(),e.consume_if_type(";")}parse_list_key(e,n){e.consume(Kr);const[t]=e.consume_oneof(["STRING","IDENTIFIER"]),r=n.current_parent;r&&"key"in r&&(r.key=t),e.consume_if_type(";")}parse_min_elements(e,n){e.consume(Hr);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"min_elements"in r&&(r.min_elements=t),e.consume_if_type(";")}parse_max_elements(e,n){e.consume(Wr);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"max_elements"in r&&(r.max_elements=t),e.consume_if_type(";")}parse_leaf_mandatory(e,n){e.consume(zn);const[,t]=e.consume_oneof([J,fe]),r=n.current_parent;if(r instanceof Fn){r.refined_mandatory=t===J,e.consume_if_type(";");return}r&&typeof r=="object"&&"mandatory"in r&&(r.mandatory=t===J),e.consume_if_type(";")}parse_leaf_default(e,n){e.consume(Dn);const t=this.parse_default_value_tokens(e),r=n.current_parent;r instanceof Fn?r.refined_defaults.push(t):r instanceof ys?r.defaults.push(t):r&&typeof r=="object"&&"default"in r&&(r.default=t),e.consume_if_type(";")}parse_presence(e,n){e.consume(Vt);const t=n.current_parent,r=e.consume_type("STRING");t&&"presence"in t&&(t.presence=r),e.consume_if_type(";")}parse_default_value_tokens(e){const n=e.peek_type();if(n==="STRING")return e.consume_type("STRING");if(n==="INTEGER")return e.consume_type("INTEGER");if(n==="IDENTIFIER")return e.consume_type("IDENTIFIER");if(n===J)return e.consume(J),"true";if(n===fe)return e.consume(fe),"false";throw new B(`Expected default value, got ${n}`)}parse_prefixed_extension_statement(e,n){const t=e.consume_type("IDENTIFIER");e.consume_type(":");const r=e.consume_type("IDENTIFIER"),i=this.resolve_prefixed_module(n,t);if(!i)throw new B(`Unknown extension prefix '${t}' in invocation ${t}:${r}`);const a=this.resolve_extension_definition(i,r);if(!a)throw new B(`Unknown extension '${r}' in module '${i.name??""}' for invocation ${t}:${r}`);const o=this.consume_optional_extension_argument(e),l=new zo({name:`${t}:${r}`,prefix:t,resolved_module:i,resolved_extension:a,argument:o});if(e.consume_if_type("{")){const c=n.push_parent(l);for(;e.has_more()&&e.peek_type()!=="}";)this.parseStatement(e,c);e.consume_type("}")}return e.consume_if_type(";"),this.add_to_parent_or_module(n,l),this.fromAst(l)}consume_optional_extension_argument(e){if(!e.has_more())return;const n=e.peek_type();if(!(n==="{"||n===";")){if(n==="STRING")return this.parse_string_concatenation(e);if(n==="IDENTIFIER"||n==="INTEGER"||n==="DOTTED_NUMBER"||n===J||n===fe)return e.consume()}}resolve_prefixed_module(e,n){const t=e.module,r=String(t.prefix??"").replace(/^['"]|['"]$/g,"");if(n===r)return t;const i=t.import_prefixes;return i==null?void 0:i[n]}resolve_extension_definition(e,n){var a;const t=(a=e.extensions)==null?void 0:a[n];if(t)return t;const i=(Array.isArray(e.statements)?e.statements:[]).find(o=>o.keyword==="extension"&&o.name===n);if(i)return new Yt({name:n,argument_name:typeof i.argument_name=="string"?i.argument_name:"",argument_yin_element:typeof i.argument_yin_element=="boolean"?i.argument_yin_element:void 0})}};function El(e,n){if(n!=="'"&&n!=='"')throw new Error(`quote must be "'" or '"', got ${JSON.stringify(n)}`);const t=[];let r=0;const i=e.length;for(;r<i;){const a=e[r];if(a!=="\\"||r+1>=i){t.push(a),r+=1;continue}const o=e[r+1];if(o==="\\"){t.push("\\"),r+=2;continue}if(o==="n"){t.push(`
`),r+=2;continue}if(o==="t"){t.push("	"),r+=2;continue}if(n==='"'&&o==='"'){t.push('"'),r+=2;continue}if(n==="'"&&o==="'"){t.push("'"),r+=2;continue}if(o==="\r"||o===`
`){for(r+=2,o==="\r"&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===" "||e[r]==="	");)r+=1;continue}t.push("\\",o),r+=2}return t.join("")}var kl=/[A-Za-z_]/,Nl=/[A-Za-z0-9_.-]/,$l=class{tokenize(e,n){const t=[];let r=0;const i=e.length;let a=1,o=0;const l=()=>{r<i&&e[r]===`
`&&(a+=1,o=r+1),r+=1},c=(u,f,m,_,y)=>{const d=m-y;t.push(co(u,f,_,d))};for(;r<i;){if(/\s/.test(e[r])){l();continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="*"){for(l(),l();r<i;){if(r+1<i&&e[r]==="*"&&e[r+1]==="/"){l(),l();break}l()}continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="/"){for(l(),l();r<i&&e[r]!==`
`;)l();continue}const u=e[r];if(u==='"'||u==="'"){const f=u,m=r,_=a,y=o;l();const d=r;for(;r<i&&e[r]!==f;)e[r]==="\\"&&r+1<i&&l(),l();c("STRING",El(e.slice(d,r),f),m,_,y),l();continue}if(u==="-"&&r+1<i&&/\d/.test(e[r+1])){const f=r,m=a,_=o;l();const y=r;for(;r<i&&/\d/.test(e[r]);)l();c("INTEGER",`-${e.slice(y,r)}`,f,m,_);continue}if(/\d/.test(u)){const f=r,m=a,_=o,y=r;for(;r<i&&/\d/.test(e[r]);)l();if(r<i&&e[r]==="."&&r+1<i&&/\d/.test(e[r+1])){for(l();r<i&&/\d/.test(e[r]);)l();c("DOTTED_NUMBER",e.slice(y,r),f,m,_)}else c("INTEGER",e.slice(y,r),f,m,_);continue}if(kl.test(u)){const f=r,m=a,_=o,y=r;for(l();r<i&&Nl.test(e[r]);)l();const d=e.slice(y,r);c("IDENTIFIER",d,f,m,_);continue}u==="{"?(c("{",u,r,a,o),l()):u==="}"?(c("}",u,r,a,o),l()):u===";"?(c(";",u,r,a,o),l()):u===":"?(c(":",u,r,a,o),l()):u==="="?(c("=",u,r,a,o),l()):u==="+"?(c("+",u,r,a,o),l()):(u==="/"&&c("/",u,r,a,o),l())}return new uo(t,e,n)}},un="ietf-yang-structure-ext:structure-index";function ce(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fn(e){return Array.isArray(e)?e:[]}function Cl(e){return JSON.parse(JSON.stringify(e))}function Rl(e,n){if(n.length===0)return;const t=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...n,...t]}function Ol(e,n){if(!n||typeof n.expression!="string")return;const t=n.expression,r=ce(e.when)?e.when:void 0,i=typeof(r==null?void 0:r.expression)=="string"?r.expression:void 0;if(i){const a=typeof(r==null?void 0:r.description)=="string"?r.description:"";e.when={expression:`(${t}) and (${i})`,description:a,evaluate_with_parent_context:!0};return}e.when={expression:t,description:typeof n.description=="string"?n.description:"",evaluate_with_parent_context:!0}}function Pl(e,n){const t=String(e??"").trim();if(!t.startsWith("/"))throw new B(`${n} requires an absolute path argument`);const r=t.slice(1).split("/").map(i=>i.trim()).filter(i=>i.length>0);if(r.length===0)throw new B(`${n} path cannot be empty`);return r.map(i=>{const a=i.indexOf(":");if(a<=0||a===i.length-1)throw new B(`${n}: invalid path segment '${i}', expected 'prefix:identifier'`);return{prefix:i.slice(0,a),name:i.slice(a+1)}})}function ii(e,n,t,r){const i=String(e.prefix??"").replace(/^['"]|['"]$/g,"");if(n===i)return e;const a=ce(e.import_prefixes)?e.import_prefixes:void 0,o=a&&ce(a[n])?a[n]:void 0;if(!o)throw new B(`${r}: unknown prefix '${n}' in path '${t}'`);return o}function Ml(e,n){return fn(e.statements).find(r=>r.name===n)}function Dl(e,n){const t=ce(e.extension_runtime)?e.extension_runtime:void 0,r=t&&ce(t[un])?t[un]:void 0,i=r==null?void 0:r[n];return ce(i)?i:fn(e.statements).find(o=>(typeof o.resolved_extension_name=="string"?o.resolved_extension_name:"")==="structure"&&String(o.argument??"").trim()===n)}function Ll(e,n){const t=Pl(n,"augment-structure"),r=t[0],i=ii(e,r.prefix,n,"augment-structure");let a=Dl(i,r.name);if(!a)throw new B(`augment-structure: no top-level structure '${r.name}' in path '${n}'`);for(const o of t.slice(1)){ii(e,o.prefix,n,"augment-structure");const l=Ml(a,o.name);if(!l)throw new B(`augment-structure: no child '${o.name}' in path '${n}'`);a=l}return a}function Fl(e,n){const t=String(e.resolved_module_name??""),r=String(e.resolved_extension_name??"");if(t!=="ietf-yang-structure-ext")return e;if(r==="structure"){const i=ce(n.extension_runtime)?n.extension_runtime:n.extension_runtime={},a=ce(i[un])?i[un]:i[un]={},o=String(e.argument??"").trim();return o.length>0&&(a[o]=e,e.name=o),e.data_node_kind="container",e}if(r==="augment-structure"){const i=String(e.argument??""),a=Ll(n,i),o=fn(e.statements).map(u=>Cl(u)),l=Array.isArray(e.if_features)?e.if_features:[],c=ce(e.when)?e.when:void 0;for(const u of o){Rl(u,l),Ol(u,c);const f=fn(a.statements);f.push(u),a.statements=f}return}return e}function bs(e,n){const t=fn(e.statements),r=[];for(const i of t){let a=i;typeof i.resolved_module_name=="string"&&typeof i.resolved_extension_name=="string"&&(a=Fl(i,n)),a&&(bs(a,n),r.push(a))}e.statements=r}function jl(e){bs(e,e)}var Vl=new Set(["container","list","leaf","leaf-list","choice","case","anydata","anyxml","notification","rpc","action","input","output"]);function xs(e){return JSON.parse(JSON.stringify(e))}function qe(e){return Array.isArray(e)?e:[]}function Yl(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function si(e,n){if(n===Yl(e))return e;const t=e.import_prefixes,r=t==null?void 0:t[n];return r&&typeof r=="object"?r:void 0}function ai(e){const n=e.trim(),t=n.indexOf(":");if(t<=0||t===n.length-1)throw new Z(`Invalid augment path segment '${e}': expected 'prefix:identifier'`);return[n.slice(0,t),n.slice(t+1)]}function Bl(e){const n=(e||"").trim().replace(/^["']|["']$/g,"");if(!n.startsWith("/"))throw new Z(`Augment path must be an absolute schema node identifier, got '${e}'`);const t=n.slice(1).split("/").map(r=>r.trim()).filter(r=>r.length>0);if(t.length===0)throw new Z(`Empty augment path: '${e}'`);return t}function ws(e){const n=typeof e.keyword=="string"?e.keyword:"";return!!e.name&&Vl.has(n)}function Ul(e,n){for(const t of qe(e.statements))if(t.name===n&&ws(t))return t}function ql(e,n){for(const t of qe(e.statements))if(t.name===n&&ws(t))return t}function Gl(e,n){return zl({ctxModule:e,path:n,kind:"augment",findToplevel:ql})}function zl(e){const{ctxModule:n,path:t,kind:r,findToplevel:i}=e,a=Bl(t),[o,l]=ai(a[0]),c=si(n,o);if(!c)throw new Z(`${r}: unknown prefix '${o}' in path '${t}' (module '${String(n.name??"")}')`);let u=i(c,l);if(!u)throw new Z(`${r}: no top-level schema node '${l}' in module '${String(c.name??"")}' (path '${t}')`);for(const f of a.slice(1)){const[m,_]=ai(f);if(!si(n,m))throw new Z(`${r}: unknown prefix '${m}' in path '${t}'`);const y=Ul(u,_);if(!y)throw new Z(`${r}: no child '${_}' under node in path '${t}' (after '${String(u.name??"")}')`);u=y}if(!Array.isArray(u.statements)&&u.statements!==void 0)throw new Z(`${r}: target node '${String(u.name??"?")}' cannot contain schema substatements (path '${t}')`);return u.statements===void 0&&(u.statements=[]),u}function Ss(e,n){e.defining_module=n;for(const t of qe(e.statements))Ss(t,n)}function Kl(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function Hl(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...xs(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${String(i.expression)}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function Wl(e,n,t){const r=qe(e.statements).map(a=>xs(a));for(const a of r)Ss(a,t),Kl(e,a),Hl(e,a);const i=qe(n.statements);for(const a of r)i.push(a);n.statements=i}function Jl(e){const n=e.data,t=qe(n.statements),r=t.filter(a=>a.keyword==="augment");if(r.length===0)return e;const i=String(n.name??"");for(const a of r){const o=String(a.augment_path??a.argument??""),l=Gl(n,o);Wl(a,l,i)}return n.statements=t.filter(a=>a.keyword!=="augment"),e}function Ge(e){return JSON.parse(JSON.stringify(e))}function As(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function Is(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...Ge(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${i.expression}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function Ts(e,n){for(const t of e)if(t.name===n)return t;for(const t of e){const r=Ts(t.statements??[],n);if(r)return r}}function Es(e,n){if(n.length===0)return;const[t,...r]=n,i=Ts(e,t);if(i)return r.length===0?i:Es(i.statements??[],r)}function ks(e,n){const t=e.refines;if(!(!Array.isArray(t)||t.length===0))for(const r of t){const i=r.refine_target_path??r.argument??"",a=i.split("/").map(m=>m.trim()).filter(Boolean);if(a.length===0)continue;const o=Es(n,a);if(!o)throw new io(i);typeof r.min_elements=="number"&&(o.min_elements=r.min_elements),typeof r.max_elements=="number"&&(o.max_elements=r.max_elements),typeof r.refined_mandatory=="boolean"&&(o.mandatory=r.refined_mandatory),typeof r.refined_config=="boolean"&&(o.config=r.refined_config);const l=r.refined_defaults;Array.isArray(l)&&l.length>0&&(o.keyword==="leaf"?o.default=l[0]:o.keyword==="leaf-list"&&(o.defaults=[...l]));const c=r.if_features;if(Array.isArray(c)&&c.length>0){const m=Array.isArray(o.if_features)?o.if_features:[];o.if_features=[...c,...m]}const u=typeof r.description=="string"?r.description.trim():"";u&&(o.description=u);const f=r.statements??[];f.length>0&&(o.statements=[...o.statements??[],...Ge(f)])}}function Ns(e,n,t){if(t.includes(e))throw new so(t,e);const r=n[e];if(!r)throw new B(`Unknown grouping '${e}'`);const i=[...t,e],a=r.statements??[],o=[];for(const l of a)if(l.keyword==="uses"){const c=String(l.grouping_name??l.argument??"").trim();if(!c)continue;const u=Ns(c,n,i);ks(l,u);for(const f of u)As(l,f),Is(l,f),o.push(Ge(f))}else o.push(Ge(l));return o.map(l=>Bt(l,n,i))}function Bt(e,n,t){var r;return(r=e.statements)!=null&&r.length&&(e.statements=$s(e.statements,n,t)),e}function $s(e,n,t){const r=[];for(const i of e)if(i.keyword==="uses"){const a=String(i.grouping_name??i.argument??"").trim();if(!a)continue;const o=Ns(a,n,t);ks(i,o);for(const l of o)As(i,l),Is(i,l),r.push(Bt(l,n,t))}else r.push(Bt(Ge(i),n,t));return r}function Xl(e){const n=e.data,t=n.groupings;if(!t||Object.keys(t).length===0)return e;const r=n.import_prefixes,i=Ge(n);r&&typeof r=="object"&&(i.import_prefixes=r),n.features instanceof Set&&(i.features=new Set(n.features)),n.feature_if_features&&typeof n.feature_if_features=="object"&&(i.feature_if_features={...n.feature_if_features});const a=i.groupings,o=i.statements??[];return i.statements=$s(o,a,[]),delete i.groupings,new Kt(i,e.source)}function Cs(e){const n=[];for(const t of e??[])n.push(t),n.push(...Cs(t.statements));return n}function Ql(e){for(const n of Cs(e.data.statements)){if(n.keyword!=="list"||typeof n.key!="string"||n.key.trim()==="")continue;const t=new Map((n.statements??[]).filter(r=>r.keyword==="leaf"&&typeof r.name=="string").map(r=>[r.name,r]));for(const r of n.key.split(/\s+/).filter(Boolean)){const i=t.get(r);if(i===void 0)throw new B(`List '${n.name??""}': key leaf '${r}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let a;if(i.when!==void 0?a="when":Array.isArray(i.if_features)&&i.if_features.length>0&&(a="if-feature"),a!==void 0)throw new B(`List '${n.name??""}': key leaf '${i.name}' must not have '${a}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function Zl(e){Ql(e)}function ec(e){const n={};if(!e)return n;for(const[t,r]of Object.entries(e))n[t]={bases:Array.isArray(r.bases)?[...r.bases]:[]};return n}function nc(e,n){var c,u,f,m;if(e.keyword!=="module")throw new B("Only 'module' roots are currently supported by TS parser");const t=e.statements??[],r={};for(const _ of t)if(_.keyword==="typedef"&&_.argument){const y=(c=_.statements)==null?void 0:c.find(d=>d.keyword==="type");r[_.argument]={name:_.argument,description:typeof _.description=="string"?_.description:"",reference:typeof _.reference=="string"?_.reference:"",default:_.default,type:_.type??(y==null?void 0:y.type),statements:_.statements??[]}}const i=n.features,a=n.feature_if_features,o=t.find(_=>_.keyword==="description"),l=typeof(o==null?void 0:o.argument)=="string"?o.argument:"";return{__class__:"YangModule",name:e.argument,yang_version:((u=t.find(_=>_.keyword==="yang-version"))==null?void 0:u.argument)??"1.1",namespace:((f=t.find(_=>_.keyword==="namespace"))==null?void 0:f.argument)??"",prefix:((m=t.find(_=>_.keyword==="prefix"))==null?void 0:m.argument)??"",organization:String(n.organization??""),contact:String(n.contact??""),description:l,typedefs:r,identities:ec(n.identities),import_prefixes:n.import_prefixes??{},extensions:n.extensions??{},extension_runtime:n.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:a&&typeof a=="object"?{...a}:{},statements:t}}var Rs=class{constructor(e={}){g(this,"expandUses");g(this,"includePath");g(this,"moduleCache",new Map);g(this,"tokenizer",new $l);g(this,"parsers",new Tl({importResolver:(e,n,t,r,i)=>this.resolveImport(e,t,r,i)}));this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(n=>Ve(n))}resolveImportedModulePath(e,n,t){const r=n==null?void 0:n.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);const a=[t,...this.includePath];for(const o of a){for(const c of i){const u=Ve(o,c);if(wo(u))return u}let l=[];try{l=So(o).filter(c=>c.startsWith(`${e}@`)&&c.endsWith(".yang"))}catch{l=[]}if(l.length>0)return l.sort(),Ve(o,l[l.length-1])}throw new B(`Could not find imported module '${e}' (tried ${i.join(", ")}) under ${a.join(", ")}`)}resolveImport(e,n,t,r){const i=t.module.__source_path;if(!i)throw new B("import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)");const a=this.resolveImportedModulePath(e,n,qi(i));return this.parseFile(a).data}parseTokenStream(e,n){const t={name:"",yang_version:"1.1",namespace:"",prefix:"",organization:"",contact:"",revisions:[],belongs_to_module:"",typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:n.kind==="file"?n.value:void 0,statements:[]},r=new po({module:t,current_parent:{}}),i=this.parsers.parseModule(e,r),a=nc(i,t),o=t.groupings??{},l={};for(const[u,f]of Object.entries(o)){if(!f||typeof f!="object")continue;const m=f,_=m.name??u;l[u]={__class__:"YangStatement",keyword:"grouping",name:_,argument:_,statements:(m.statements??[]).map(y=>this.parsers.serializeAstStatement(y))}}Object.keys(l).length>0&&(a.groupings=l),jl(a);let c=new Kt(a,n);return this.expandUses&&(c=Xl(c),c=Jl(c),Zl(c)),c}parseString(e,n="<memory>"){const t=this.tokenizer.tokenize(e,n),r={kind:"string",value:e,name:n};return this.parseTokenStream(t,r)}parseFile(e){const n=Ve(e),t=this.moduleCache.get(n);if(t)return t;const r=xo(n),i=this.tokenizer.tokenize(r,n),a={kind:"file",value:n,name:n},o=this.parseTokenStream(i,a);return this.moduleCache.set(n,o),o}};new Rs;function tc(e){return String(e??"").replace(/^['"]|['"]$/g,"")}function Jt(e){return String(e.name??"")}function Os(e){const n=e.features;return n instanceof Set?new Set(n):Array.isArray(n)?new Set(n):new Set}function rc(e,n){const t=tc(e.prefix);if(n===t)return e;const r=e.import_prefixes,i=r==null?void 0:r[n];if(i&&typeof i=="object")return i}function ic(e){const n=[],t=new Set,r=i=>{if(t.has(i))return;t.add(i),n.push(i);const a=i.import_prefixes;if(a)for(const o of Object.values(a))o&&typeof o=="object"&&r(o)};return r(e),n}function sc(e,n,t){let r,i;const a=t.indexOf(":");if(a!==-1){const l=t.slice(0,a);i=t.slice(a+1);const c=rc(e,l);if(!c)return!1;r=c}else r=e,i=t;if(!Os(r).has(i))return!1;const o=n[Jt(r)];return o?o.has(i):!1}function ac(e){const n=[];let t=0;const r=e.length;for(;t<r;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==="("||i===")"){n.push(i),t+=1;continue}let a=t;for(;a<r&&!/\s/.test(e[a])&&e[a]!=="("&&e[a]!==")";)a+=1;n.push(e.slice(t,a)),t=a}return n}var oc=class{constructor(e,n,t){g(this,"toks");g(this,"ctx");g(this,"enabled");g(this,"i",0);this.toks=e,this.ctx=n,this.enabled=t}peek(){return this.toks[this.i]}eat(e){const n=this.peek();if(n===void 0)throw new Error("unexpected end of expression");if(e!==void 0&&n!==e)throw new Error(`expected ${e}, got ${n}`);return this.i+=1,n}parseExpr(){let e=this.parseTerm();for(;this.peek()==="or";){this.eat("or");const n=this.parseExpr();e=e||n}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()==="and";){this.eat("and");const n=this.parseTerm();e=e&&n}return e}parseFactor(){const e=this.peek();if(e==="not")return this.eat("not"),!this.parseFactor();if(e==="("){this.eat("(");const n=this.parseExpr();return this.eat(")"),n}if(e===void 0)throw new Error("unexpected end of expression");return this.eat(),sc(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function lc(e,n,t){const r=e.trim();if(!r)return!1;try{const i=new oc(ac(r),n,t),a=i.parseExpr();return i.atEnd()?a:!1}catch{return!1}}function tn(e,n,t){return!e||e.length===0?!0:e.every(r=>lc(r,n,t))}function cc(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function uc(e,n){let t=!0;for(;t;){t=!1;const i={};for(const[a,o]of Object.entries(n))i[a]=new Set(o);for(const a of e){const o=Jt(a),l=n[o];if(!l)continue;const c=a.feature_if_features;for(const u of[...l]){const f=c==null?void 0:c[u];f!=null&&f.length&&(tn(f,a,i)||(l.delete(u),t=!0))}}}const r={};for(const[i,a]of Object.entries(n))r[i]=new Set(a);return r}function oi(e,n){const t=ic(e),r=cc(n),i={};for(const a of t){const o=Jt(a),l=Os(a);r===null||!r.has(o)?i[o]=new Set(l):i[o]=new Set(r.get(o)??[])}return uc(t,i)}function pc(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Jn(e){const n=e.identities;return!n||typeof n!="object"?{}:n}function Ps(e,n){const t=pc(e);if(n===t)return e;const i=(e.import_prefixes??{})[n];return i&&typeof i=="object"?i:void 0}function Xn(e,n){if(!n.includes(":"))return null;const[t,r]=n.split(":",2),i=Ps(e.data,t);return!i||!(r in Jn(i))?null:{mod:i,local:r}}function fc(e,n){if(n.includes(":")){const[t,r]=n.split(":",2),i=Ps(e,t);return!i||!(r in Jn(i))?null:{mod:i,local:r}}return n in Jn(e)?{mod:e,local:n}:null}function Ms(e,n){return e.mod===n.mod&&e.local===n.local}function Ds(e,n){return n.some(t=>Ms(t,e))}var li=new WeakMap,ci=1;function dc(e){let n=li.get(e);return n===void 0&&(n=ci,ci+=1,li.set(e,n)),n}function mc(e){return`${dc(e.mod)}:${e.local}`}function Ls(e,n){const t=[],r=new Set,i=[{mod:e,local:n}];for(;i.length>0;){const a=i.pop(),o=mc(a);if(r.has(o))continue;r.add(o),t.push(a);const l=Jn(a.mod)[a.local];if(l!=null&&l.bases)for(const c of l.bases){const u=fc(a.mod,c);u&&i.push(u)}}return t}function _c(e,n,t){const r=Xn(e,n),i=Xn(e,t);if(!r||!i)return!1;const a=Ls(r.mod,r.local);return Ds(i,a)&&!Ms(i,r)}function hc(e,n,t){const r=Xn(e,n),i=Xn(e,t);if(!r||!i)return!1;const a=Ls(r.mod,r.local);return Ds(i,a)}function Se(e){return!!e&&typeof e=="object"&&"schema"in e&&"parent"in e}function je(e){return Array.isArray(e)&&(e.length===0||Se(e[0]))}function le(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e!=="":e!=null}function Ne(e){return Array.isArray(e)?e.map(n=>Se(n)?n.data:n):Se(e)?[e.data]:e==null?[]:[e]}function W(e){return Ne(e)[0]}function Xt(e,n){if(typeof e=="boolean"||typeof n=="boolean")return[le(e),le(n)];if(typeof e=="number"&&typeof n=="number")return[e,n];const t=Number(e),r=Number(n);return!Number.isNaN(t)&&!Number.isNaN(r)?[t,r]:[String(e??"").trim(),String(n??"").trim()]}function On(e,n){const t=Ne(e),r=Array.isArray(n)&&!je(n)?n:Ne(n);if(t.length===0||r.length===0)return t.length===0&&r.length===0;for(const i of t)for(const a of r){if(i==null&&a==null)return!0;if(i==null||a==null)continue;const[o,l]=Xt(i,a);if(o===l)return!0}return!1}function ui(e,n){for(const t of Ne(e))for(const r of Ne(n)){const[i,a]=Xt(t,r);if(typeof i=="number"&&typeof a=="number"){if(i<a)return!0;continue}if(`${i}`<`${a}`)return!0}return!1}function pi(e,n){for(const t of Ne(e))for(const r of Ne(n)){const[i,a]=Xt(t,r);if(typeof i=="number"&&typeof a=="number"){if(i>a)return!0;continue}if(`${i}`>`${a}`)return!0}return!1}function yc(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function gc(e,n){for(const t of yc(e))if((t==null?void 0:t.name)===n)return t;return null}function vc(e){var r,i,a;if(!e||e.keyword!=="leaf")return;const n=(r=e.data)==null?void 0:r.default;if(((a=(i=e.data)==null?void 0:i.type)==null?void 0:a.name)==="boolean"&&typeof n=="string"){const o=n.toLowerCase();if(o==="true")return!0;if(o==="false")return!1}return n}function Fs(e,n){const t=e.data,r=e.schema;if(Array.isArray(t)&&((r==null?void 0:r.keyword)==="list"||(r==null?void 0:r.keyword)==="leaf-list")){const o=[];for(const l of t){const c={data:l,schema:r,parent:e};o.push(...Fs(c,n))}return o}const i=gc(r,n);let a;if(t&&typeof t=="object"&&!Array.isArray(t)){const o=t;n in o?(a=o[n],a===null&&(a=!0)):a=vc(i)}return a===void 0?[]:(i==null?void 0:i.keyword)==="list"||(i==null?void 0:i.keyword)==="leaf-list"?Array.isArray(a)?a.map(o=>({data:o,schema:i,parent:e})):[{data:a,schema:i,parent:e}]:[{data:a,schema:i,parent:e}]}var bc=class{eval(e,n,t){switch(e.kind){case"literal":return e.value;case"path":return this.evalPath(e,n,t);case"binary":return this.evalBinary(e,n,t);case"function":return this.evalFunction(e.name,e.args,n,t);default:return null}}evalPath(e,n,t){let r=[e.isAbsolute?n.root:t];for(const i of e.segments){if(i.step!==".")if(i.step==="..")r=r.map(a=>a.parent).filter(a=>!!a);else{const a=[];for(const o of r)a.push(...Fs(o,i.step));r=a}if(i.predicate){const a=[];for(let o=0;o<r.length;o+=1){const l=r[o],c=this.eval(i.predicate,n,l);let u=!1;typeof c=="number"&&Number.isFinite(c)?u=Math.trunc(c)===o+1:u=le(c),u&&a.push(l)}r=a}}return r}evalBinary(e,n,t){const r=e.operator;if(r==="or"){const o=this.eval(e.left,n,t);return le(o)?!0:le(this.eval(e.right,n,t))}if(r==="and"){const o=this.eval(e.left,n,t);return le(o)?le(this.eval(e.right,n,t)):!1}if(r==="/"){const o=this.eval(e.left,n,t),l=je(o)?o:Se(o)?[o]:[],c=[];for(const u of l){const f=this.eval(e.right,n,u);je(f)?c.push(...f):Se(f)&&c.push(f)}return c}const i=this.eval(e.left,n,t),a=this.eval(e.right,n,t);if(r==="=")return On(i,a);if(r==="!=")return!On(i,a);if(r==="<")return ui(i,a);if(r===">")return pi(i,a);if(r==="<=")return On(i,a)||ui(i,a);if(r===">=")return On(i,a)||pi(i,a);if(r==="+"){const o=Number(W(i))+Number(W(a));return Number.isNaN(o)?Number.NaN:o}if(r==="-"){const o=Number(W(i))-Number(W(a));return Number.isNaN(o)?Number.NaN:o}if(r==="*"){const o=Number(W(i))*Number(W(a));return Number.isNaN(o)?Number.NaN:o}return null}evalFunction(e,n,t,r){var a,o,l;const i=e.toLowerCase();if(i==="current")return t.current;if(i==="not")return n.length!==1?null:!le(this.eval(n[0],t,r));if(i==="true")return!0;if(i==="false")return!1;if(i==="count"){if(n.length!==1)return 0;const c=this.eval(n[0],t,r);return je(c)?c.length:c==null?0:1}if(i==="string"){if(n.length!==1)return"";const c=W(this.eval(n[0],t,r));return c==null?"":String(c)}if(i==="number"){if(n.length!==1)return Number.NaN;const c=W(this.eval(n[0],t,r)),u=Number(c);return Number.isNaN(u)?Number.NaN:u}if(i==="boolean")return n.length!==1?!1:le(this.eval(n[0],t,r));if(i==="string-length"){if(n.length!==1)return 0;const c=W(this.eval(n[0],t,r));return c==null?0:String(c).length}if(i==="concat")return n.map(c=>String(W(this.eval(c,t,r))??"")).join("");if(i==="translate"){if(n.length!==3)return"";const c=String(W(this.eval(n[0],t,r))??""),u=String(W(this.eval(n[1],t,r))??""),f=String(W(this.eval(n[2],t,r))??"");if(u.length===0)return c;const m=new Map;for(let y=0;y<u.length;y+=1)m.set(u[y],y<f.length?f[y]:null);let _="";for(const y of c){if(!m.has(y)){_+=y;continue}const d=m.get(y);d!=null&&(_+=d)}return _}if(i==="deref"){if(n.length!==1)return[];const c=t.current??r,u=this.eval(n[0],t,c),f=je(u)?u:Se(u)?[u]:[],m=[];for(const _ of f){const y=(o=(a=_.schema)==null?void 0:a.data)==null?void 0:o.type;if(!y||y.name!=="leafref")continue;const d=y.path;if(!d||d.kind!=="path")continue;const h=this.evalPath(d,t,_);for(const w of h)w.data===_.data&&m.push(w)}return m}if(i==="derived-from"||i==="derived-from-or-self"){if(n.length!==2)return!1;const c=(l=t.root)==null?void 0:l.schema;if(!(c instanceof Kt))return!1;const u=c,f=t.current??r;let m=this.eval(n[0],t,f);if(je(m)){if(m.length===0)return!1;m=m[0].data}else Se(m)?m=m.data:m=W(m);if(typeof m!="string")return!1;const _=this.eval(n[1],t,f),y=W(_);return typeof y!="string"?!1:i==="derived-from"?_c(u,m,y):hc(u,m,y)}return null}};function Qn(e){if(e===null)return"null";const n=typeof e;if(n==="undefined")return"undefined";if(typeof e=="string"){const t=e;return t.length>100?`string(len=${t.length}):${JSON.stringify(t.slice(0,80))}…`:JSON.stringify(t)}if(n==="number"||n==="boolean"||n==="bigint")return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(n==="object")try{const t=JSON.stringify(e);return t.length>160?`${t.slice(0,160)}…`:t}catch{return"[object]"}return String(e)}function Zn(e,n,t){e&&console.debug(`[xYang:type-validation] ${n}`,t)}var Mt=class{constructor(e,n={}){g(this,"module");g(this,"system",new vo);g(this,"typeValidationDebug");this.module=e,this.typeValidationDebug=n.typeValidationDebug===!0}resolveUnderlyingBuiltinName(e){const n=new Set;let t=e;for(;n.size<64;){const r=this.module.typedefs[t];if(!(r!=null&&r.type)||typeof r.type.name!="string"||r.type.name==="union")return t;n.add(t);const i=r.type.name;if(i===t)return t;t=i}return t}validate(e,n,t){var o;let r,i;const a=this.module.typedefs[n];if(a!=null&&a.type&&typeof a.type.name=="string"){const l=new Bn(a.type);a.type.name==="union"?(r="typedef-union",i=this.validateUnion(e,l)):(r="typedef",i=this.system.validate(e,a.type.name,l))}else{const l=new Bn(t);n==="union"&&(((o=l.types)==null?void 0:o.length)??0)>0?(r="inline-union",i=this.validateUnion(e,l)):(r="direct",i=this.system.validate(e,n,l))}return Zn(this.typeValidationDebug,"TypeChecker.validate",{module:this.module.name??"(anonymous)",typeName:n,via:r,ok:i[0],reason:i[1],value:Qn(e)}),i}validateUnion(e,n){var t;Zn(this.typeValidationDebug,"TypeChecker.validateUnion",{module:this.module.name??"(anonymous)",memberCount:((t=n.types)==null?void 0:t.length)??0,value:Qn(e)});for(const r of n.types??[]){const i=r,a=typeof i.name=="string"?i.name:"string",[o]=this.validate(e,a,i);if(o)return[!0,null]}return[!1,"Value does not match any union member type"]}},xc=class{constructor(e,n={}){g(this,"xpath",new bc);g(this,"xpathCache",new Map);g(this,"rootCtx");g(this,"enabledFeaturesOverride");g(this,"contextStack",[]);g(this,"typeValidationDebug");this.enabledFeaturesOverride=n.enabledFeaturesByModule??null,this.typeValidationDebug=n.typeValidationDebug===!0;const t=n.constraintChecks??!0,r=n.leafTypeMode??(t?"full":"none"),i=e.data;this.rootCtx={module:e,typeChecker:new Mt(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:t,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:oi(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new Mt(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){const e=this.contextStack[this.contextStack.length-1];if(!e)throw new Error("DocumentValidator: internal error — no active validation context");return e}enableExtension(e,n){if(e!=="anydata_validation")throw new Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=Eo(n)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,n){this.contextStack.push(e);try{const t=[],r=[];if(!n||typeof n!="object"||Array.isArray(n))return[!1,["Document must be an object"],r];const i=n,a={data:i,schema:e.module,parent:null};for(const o of e.module.statements){if(!o.name)continue;const l=this.effectiveKeyword(o);["container","list","leaf","leaf-list","anydata","anyxml","choice"].includes(l)&&this.validateStatement(o,i[o.name],o.name,t,a,a)}return[t.length===0,t,r]}finally{this.contextStack.pop()}}validateStatement(e,n,t,r,i,a){const o=this.effectiveKeyword(e),l={data:n,schema:e,parent:i};if(o==="choice"){this.validateChoice(e,i.data,t,r,i,a);return}if(o==="case"){if(!i.data||typeof i.data!="object"||Array.isArray(i.data))return;const f=i.data;for(const m of e.statements)m.name&&this.validateStatement(m,f[m.name],`${t}.${m.name}`,r,i,a);return}const c=e.data.if_features,u=Array.isArray(c)?c:[];if(!tn(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){n!==void 0&&r.push(`${t}: Node '${e.name??"node"}' is present but its 'if-feature' condition is false — this node must not exist`);return}if(!(this.ctx.constraintChecks&&!this.checkWhen(e,n,t,r,l,a,i))){if(o==="container"){if(n===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,t,r,l,a);return}if(!n||typeof n!="object"||Array.isArray(n)){r.push(`${t}: container must be an object`);return}const f=n;this.ctx.constraintChecks&&this.checkMust(e,l,a,t,r);for(const m of e.statements){if(this.effectiveKeyword(m)==="choice"){this.validateChoice(m,f,`${t}.${m.name??"choice"}`,r,l,a);continue}m.name&&this.validateStatement(m,f[m.name],`${t}.${m.name}`,r,l,a)}this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,f,t,r);return}if(o==="list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: list must be an array`);return}const f=typeof e.data.key=="string"?e.data.key.trim():"",m=f.length>0?f.split(/\s+/).map(_=>_.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&m.length>0&&this.checkListKeyUniqueness(n,m,e.name??"list",t,r))return;for(let _=0;_<n.length;_+=1){const y=n[_];if(!y||typeof y!="object"||Array.isArray(y)){r.push(`${t}[${_}]: list item must be an object`);continue}const d={data:y,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,d,a,`${t}[${_}]`,r);const h=y;for(const w of e.statements){if(this.effectiveKeyword(w)==="choice"){this.validateChoice(w,h,`${t}[${_}].${w.name??"choice"}`,r,d,a);continue}w.name&&this.validateStatement(w,h[w.name],`${t}[${_}].${w.name}`,r,d,a)}this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,h,`${t}[${_}]`,r)}return}if(o==="leaf"){const f=!!e.data.mandatory;if(n===void 0){f&&r.push(`${t}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const m=e.data.type??{},_=m.name??"string";if(_==="leafref")this.checkLeafref(n,m,t,r,l,a);else if(_==="instance-identifier")this.checkInstanceIdentifier(n,m,t,r,l,a);else{const[y,d]=this.ctx.typeChecker.validate(n,_,m);Zn(this.ctx.typeValidationDebug,"DocumentValidator.leaf:full",{path:t,typeName:_,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:y,reason:d,value:Qn(n)}),y||r.push(`${t}: ${d??`invalid value for type ${_}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,l,a,t,r);return}if(o==="leaf-list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const f=e.data.type??{},m=f.name??"string";for(let _=0;_<n.length;_+=1){const y={data:n[_],schema:e,parent:i};if(m==="leafref")this.checkLeafref(n[_],f,`${t}[${_}]`,r,y,a);else if(m==="instance-identifier")this.checkInstanceIdentifier(n[_],f,`${t}[${_}]`,r,y,a);else{const[d,h]=this.ctx.typeChecker.validate(n[_],m,f);Zn(this.ctx.typeValidationDebug,"DocumentValidator.leaf-list:full",{path:`${t}[${_}]`,typeName:m,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:d,reason:h,value:Qn(n[_])}),d||r.push(`${t}[${_}]: ${h??`invalid value for type ${m}`}`)}this.checkMust(e,y,a,`${t}[${_}]`,r)}}return}if(o==="anydata"||o==="anyxml"){const f=!!e.data.mandatory;if(n===void 0){f&&r.push(`${t}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,l,a,t,r),o==="anydata"&&this.runAnydataSubtreeValidation(e,n,t,r)}}}collectSchemaInstanceKeys(e,n){if(!e)return;const t=this.effectiveKeyword(e);if(t==="choice"){for(const r of e.statements??[])if(r.keyword==="case")for(const i of r.statements??[])this.collectSchemaInstanceKeys(i,n);return}if(t==="list"){e.name&&n.add(e.name);return}if(t==="container"){const r=e.statements??[];!(r.length===1&&this.effectiveKeyword(r[0])==="choice")&&e.name&&n.add(e.name);for(const a of r)this.collectSchemaInstanceKeys(a,n);return}e.name&&n.add(e.name)}rejectUnknownContainerKeys(e,n,t,r){if(e.data.presence||e.name!=="array")return;const i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!=="choice")return;const a=new Set;if(this.collectSchemaInstanceKeys(i[0],a),a.size!==0)for(const o of Object.keys(n))a.has(o)||r.push(`${t}: Unknown field '${o}'`)}rejectUnknownListItemKeys(e,n,t,r){const i=this.collectDirectChildKeys(e);if(i.size!==0)for(const a of Object.keys(n))i.has(a)||r.push(`${t}: Unknown field '${a}'`)}collectDirectChildKeys(e){const n=new Set,t=r=>{const i=this.effectiveKeyword(r);if(i==="choice"||i==="case"){for(const a of r.statements??[])t(a);return}r.name&&n.add(r.name)};for(const r of e.statements??[])t(r);return n}validateChoice(e,n,t,r,i,a){if(!n||typeof n!="object"||Array.isArray(n)){e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}const o=n,l=Array.isArray(e.data.if_features)?e.data.if_features:[],c=tn(l,this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!c&&this.choiceHasBranchData(e,o)){r.push(`${t}: Choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(!c||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,t,r,i,a,i))return;const u=e.statements.filter(y=>y.keyword==="case"),f=[];let m=!1;for(const y of u){if(!this.caseHasAnyData(y,o))continue;const d=Array.isArray(y.data.if_features)?y.data.if_features:[];if(!tn(d,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${t}: Case '${y.name??"case"}' of choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(this.ctx.constraintChecks&&!this.checkWhen(y,!0,`${t}.${y.name??"case"}`,r,i,a,i)){m=!0;continue}f.push(y)}if(f.length>1){const y=f.map(d=>d.name??"<unnamed>").join(", ");r.push(`${t}: choice '${e.name??"choice"}' allows only one case, but multiple are active: ${y}`);return}const _=f[0];if(!_){if(m)return;e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}for(const y of _.statements)y.name&&this.validateStatement(y,o[y.name],`${t}.${y.name}`,r,i,a)}choiceHasBranchData(e,n){return e.statements.filter(r=>r.keyword==="case").some(r=>this.caseHasAnyData(r,n))}caseHasAnyData(e,n){return e.statements.some(t=>this.statementHasMatchingData(t,n))}statementHasMatchingData(e,n){const t=this.effectiveKeyword(e);return["leaf","leaf-list","container","list","anydata","anyxml"].includes(t)?!!(e.name&&n[e.name]!==void 0):t==="choice"?this.choiceHasBranchData(e,n):t==="case"?this.caseHasAnyData(e,n):!1}effectiveKeyword(e){const n=e.keyword??"";if(n.includes(":")){const t=e.data.data_node_kind;if(t==="container"||t==="list")return t}return n}checkListKeyUniqueness(e,n,t,r,i){if(n.length===0)return!1;const a=new Map;for(let o=0;o<e.length;o+=1){const l=e[o];if(!l||typeof l!="object"||Array.isArray(l))continue;const c=l,u=n.map(m=>c[m]),f=JSON.stringify(u);if(a.has(f)){const m=a.get(f),_=n.map(y=>`${y}='${String(c[y])}'`).join(", ");return i.push(`${r}: Duplicate key in list '${t}': ${_} (entries at index ${m} and ${o})`),!0}a.set(f,o)}return!1}leafrefPathAst(e){const n=e.path;if(typeof n=="string"&&n.trim().length>0)try{return ds(n.trim())}catch{return null}return n&&typeof n=="object"&&!Array.isArray(n)&&n.kind==="path"?n:null}checkLeafref(e,n,t,r,i,a){const o=n.require_instance!==!1,l=this.leafrefPathAst(n);if(!l||l.kind!=="path"){o&&r.push(`${t}: leafref has no path`);return}try{const c={current:i,root:a},u=this.xpath.eval(l,c,i),f=Array.isArray(u)?u:[],m=new Set;for(const y of f){if(!y||typeof y!="object"||!("data"in y))continue;const d=y.data;d!=null&&(typeof d=="string"||typeof d=="number"||typeof d=="boolean")&&m.add(String(d))}if(typeof e!="string"&&typeof e!="number"&&typeof e!="boolean"){r.push(`${t}: leafref value must be a string, number, or boolean`);return}const _=String(e);o&&!m.has(_)&&r.push(`${t}: leafref: value '${_}' does not reference an existing instance (require-instance is true)`)}catch(c){const u=c instanceof Error?c.message:String(c);r.push(`${t}: leafref: error evaluating path (${u})`)}}checkInstanceIdentifier(e,n,t,r,i,a){if(typeof e!="string"){r.push(`${t}: instance-identifier value must be a string, got ${typeof e}`);return}if(!(n.require_instance!==!1))return;const l=e.trim();if(!l){r.push(`${t}: instance-identifier path must not be empty when require-instance is true`);return}let c;try{c=Ln(l)}catch(f){const m=f instanceof Error?f.message:String(f);r.push(`${t}: instance-identifier: invalid path expression (${m})`);return}if(c.kind!=="path"){r.push(`${t}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!c.isAbsolute){r.push(`${t}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}const u={current:i,root:a};try{this.xpath.evalPath(c,u,a).length===0&&r.push(`${t}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(f){const m=f instanceof Error?f.message:String(f);r.push(`${t}: instance-identifier: invalid path expression (${m})`)}}checkMust(e,n,t,r,i){const a=e.statements.filter(o=>o.keyword==="must"&&typeof o.argument=="string");for(const o of a){const l=o.argument;let c=this.xpathCache.get(l);if(!c)try{c=Ln(l),this.xpathCache.set(l,c)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`);continue}try{const u={current:n,root:t},f=this.xpath.eval(c,u,n);if(!this.xpathBoolean(f)){const _=typeof o.data.error_message=="string"&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??"node"}'`;i.push(`${r}: ${_}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`)}}}checkWhen(e,n,t,r,i,a,o){const l=e.data.when,c=typeof(l==null?void 0:l.expression)=="string"?l.expression:void 0;if(!c||c.trim().length===0)return!0;let u=this.xpathCache.get(c);if(!u)try{u=Ln(c),this.xpathCache.set(c,u)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}try{const m=(l==null?void 0:l.evaluate_with_parent_context)===!0?o:i,_={current:m,root:a},y=this.xpath.eval(u,_,m);return this.xpathBoolean(y)?!0:(n!==void 0&&r.push(`${t}: node is not allowed by when condition`),!1)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e.length>0:e!=null}validateMandatoryChildren(e,n,t,r,i,a){const o=n&&typeof n=="object"&&!Array.isArray(n)?n:void 0;for(const l of e.statements){const c=l.keyword??"";if(!["leaf","anydata","anyxml"].includes(c)||!l.name)continue;const u=Array.isArray(l.data.if_features)?l.data.if_features:[];if(!tn(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!l.data.mandatory)continue;const f=o==null?void 0:o[l.name],m={data:f,schema:l,parent:i};this.ctx.constraintChecks&&!this.checkWhen(l,f,`${t}.${l.name}`,r,m,a,i)||(!o||o[l.name]===void 0)&&r.push(`${t}.${l.name}: mandatory ${c} is missing`)}}anydataModuleMap(e){const n={};for(const t of e){const r=t.name;r&&(n[r]=t)}return n}runAnydataSubtreeValidation(e,n,t,r){if(!this.ctx.anydataValidation||!n||typeof n!="object"||Array.isArray(n))return;const i=this.ctx.anydataValidation.mode,a=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(a),l=n;for(const[c,u]of Object.entries(l)){const{statementName:f,moduleName:m}=to(c,o);if(!f||!m){r.push(`${t}.${c}: Unknown anydata member '${c}': no matching module:identifier in the provided modules`);continue}const _=o[m],y=_==null?void 0:_.findStatement(f);if(!y){r.push(`${t}.${c}: Unknown anydata member '${c}'`);continue}if(y.keyword==="leaf"){r.push(`${t}.${c}: anydata member '${c}' maps to a leaf; nested subtree validation expects a container or list`);continue}const d={[f]:u},h=_.data,w={module:_,typeChecker:new Mt(_,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i==="complete",leafTypeMode:i==="complete"?"full":"none",typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:h,enabledByModule:oi(h,this.enabledFeaturesOverride)},[x,k]=this.validateWithContext(w,d);if(!x)for(const R of k)r.push(`${t}.${c}: ${R}`)}}},wc=class{constructor(e,n={}){g(this,"module");g(this,"documentValidator");this.module=e,this.documentValidator=new xc(e,{enabledFeaturesByModule:n.enabledFeaturesByModule??null,typeValidationDebug:n.typeValidationDebug})}setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,n){this.documentValidator.enableExtension(e,n)}enable_extension(e,n){this.enableExtension(e,n)}validate(e){const[n,t,r]=this.documentValidator.validate(e);return{isValid:n,errors:t,warnings:r}}};let Pn,fi;function js(){if(!import.meta.url.startsWith("file:"))return"/yang";const e=sn.dirname(no(import.meta.url));return sn.resolve(e,"../../../../yang")}function Sc(e=js()){if(Pn&&fi===e)return Pn;const n=sn.join(e,"netlab-topology.yang"),t=[e,sn.join(e,"modules")],r=new Rs({include_path:t,expand_uses:!0}),i=r.parseFile(n);for(const a of["netlab-internal.yang","modules/netlab-ospf.yang","modules/netlab-bgp.yang","modules/netlab-vlan.yang","modules/netlab-vrf.yang","modules/netlab-isis.yang","modules/netlab-vxlan.yang","modules/netlab-evpn.yang"])try{r.parseFile(sn.join(e,a))}catch{}return Pn=i,fi=e,Pn}function Ac(e){const n=Sc(e);return new wc(n)}function Ic(e){const n=e.nodes??{},t=Object.entries(n).map(([u,f])=>{const m={...f,name:f.name??u};return Array.isArray(m.interfaces)&&(m.interfaces=m.interfaces.map(_=>{const y={..._};return Array.isArray(y.neighbors),y})),m.vlans&&typeof m.vlans=="object"&&!Array.isArray(m.vlans)&&(m.vlans=Mn(m.vlans)),m.vrfs&&typeof m.vrfs=="object"&&!Array.isArray(m.vrfs)&&(m.vrfs=Mn(m.vrfs)),di(m),m}),r=(e.links??[]).map((u,f)=>{const m={...u};m.linkindex===void 0&&(m.linkindex=f+1);const _=m[we];return typeof _=="string"?(m._linkname=_,delete m[we]):m._linkname,di(m),m}),i=e.groups?Object.entries(e.groups).map(([u,f])=>({...f,name:f.name??u})):void 0,a=Tc(e.addressing),o={nodes:t,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),a&&(o.addressing=a),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=Mn(e.vlans)),e.vrfs&&(o.vrfs=Mn(e.vrfs));const l={topology:o},c=l.topology;return Array.isArray(e[`${rn}:_Providers`])&&(c[`${rn}:_Providers`]=e[`${rn}:_Providers`]),l}function Mn(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.entries(e).map(([n,t])=>({...typeof t=="object"&&t&&!Array.isArray(t)?t:{},name:n}))}function Tc(e){return!e||typeof e!="object"||Array.isArray(e)?void 0:{pool:Object.entries(e).map(([t,r])=>({...typeof r=="object"&&r&&!Array.isArray(r)?r:{},name:t}))}}function di(e){const n=`${rn}:`;for(const t of Object.keys(e))if(t.startsWith(n)){const r=t.slice(n.length);e[r]===void 0&&(e[r]=e[t]),delete e[t]}}function Ec(e,n,t={}){e.stage=n;const r=t.yangDir??js(),i=Ac(r),a=Ic(e),o=i.validate(a);if(t.diagnostics){for(const l of o.errors)t.diagnostics.error(Dr(l));for(const l of o.warnings)t.diagnostics.warning(Dr(l))}return{ok:o.isValid,errors:o.errors,warnings:o.warnings}}const kc={frr:`---
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
`},Nc={bird:`---
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
`};new Set(Fi);let Dt;function mi(e){const n={};for(const[t,r]of Object.entries(e)){const i=ze.load(r)??{};n[t]={...i,name:t}}return n}function $c(e,n){for(const[t,r]of Object.entries(n)){if(e[t])throw new Error(`duplicate name ${t} for a device and a daemon`);const i={...r,name:t,daemon:!0};i.parent||(i.parent="linux"),e[t]=i}}function Cc(e){const n={},t=new Set;function r(i){if(n[i])return n[i];if(t.has(i))return e[i]??{name:i};t.add(i);const a=e[i]??{name:i},o=typeof a.parent=="string"?a.parent:void 0;let l={...a,name:i};if(o&&e[o]){const c=r(o);l=ne(c,{...a,name:i}),a.daemon!==void 0&&(l.daemon=a.daemon),l.parent=o}return t.delete(i),n[i]=l,l}for(const i of Object.keys(e))r(i);return n}function Vs(){if(Dt)return Dt;const e=mi(kc);$c(e,mi(Nc));const n=Cc(e);for(const t of Object.values(n)){if(t.clab&&typeof t.clab=="object"){const r=t.clab;r.features&&(t.features=ne(t.features??{},r.features))}delete t.libvirt,delete t.virtualbox,delete t.external}return Dt=n,n}function Qt(e){return Vs()[e]??{name:e,interface_name:"eth{ifindex}",role:"router"}}function Rc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var jn={exports:{}},Oc=jn.exports,_i;function Pc(){return _i||(_i=1,(function(e){(function(n){const t="(0?\\d+|0x[a-f0-9]+)",r={fourOctet:new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`,"i"),threeOctet:new RegExp(`^${t}\\.${t}\\.${t}$`,"i"),twoOctet:new RegExp(`^${t}\\.${t}$`,"i"),longValue:new RegExp(`^${t}$`,"i")},i=new RegExp("^0[0-7]+$","i"),a=new RegExp("^0x[a-f0-9]+$","i"),o="%[0-9a-z]{1,}",l="(?:[0-9a-f]+::?)+",c={zoneIndex:new RegExp(o,"i"),native:new RegExp(`^(::)?(${l})?([0-9a-f]+)?(::)?(${o})?$`,"i"),deprecatedTransitional:new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${o})?)$`,"i"),transitional:new RegExp(`^((?:${l})|(?:::)(?:${l})?)${t}\\.${t}\\.${t}\\.${t}(${o})?$`,"i")};function u(d,h){if(d.indexOf("::")!==d.lastIndexOf("::"))return null;let w=0,x=-1,k=(d.match(c.zoneIndex)||[])[0],R,F;for(k&&(k=k.substring(1),d=d.replace(/%.+$/,""));(x=d.indexOf(":",x+1))>=0;)w++;if(d.substr(0,2)==="::"&&w--,d.substr(-2,2)==="::"&&w--,w>h)return null;for(F=h-w,R=":";F--;)R+="0:";return d=d.replace("::",R),d[0]===":"&&(d=d.slice(1)),d[d.length-1]===":"&&(d=d.slice(0,-1)),h=(function(){const q=d.split(":"),z=[];for(let H=0;H<q.length;H++)z.push(parseInt(q[H],16));return z})(),{parts:h,zoneId:k}}function f(d,h,w,x){if(d.length!==h.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");let k=0,R;for(;x>0;){if(R=w-x,R<0&&(R=0),d[k]>>R!==h[k]>>R)return!1;x-=w,k+=1}return!0}function m(d){if(a.test(d))return parseInt(d,16);if(d[0]==="0"&&!isNaN(parseInt(d[1],10))){if(i.test(d))return parseInt(d,8);throw new Error(`ipaddr: cannot parse ${d} as octal`)}return parseInt(d,10)}function _(d,h){for(;d.length<h;)d=`0${d}`;return d}const y={};y.IPv4=(function(){function d(h){if(h.length!==4)throw new Error("ipaddr: ipv4 octet count should be 4");let w,x;for(w=0;w<h.length;w++)if(x=h[w],!(0<=x&&x<=255))throw new Error("ipaddr: ipv4 octet should fit in 8 bits");this.octets=h}return d.prototype.SpecialRanges={unspecified:[[new d([0,0,0,0]),8]],broadcast:[[new d([255,255,255,255]),32]],multicast:[[new d([224,0,0,0]),4]],linkLocal:[[new d([169,254,0,0]),16]],loopback:[[new d([127,0,0,0]),8]],carrierGradeNat:[[new d([100,64,0,0]),10]],private:[[new d([10,0,0,0]),8],[new d([172,16,0,0]),12],[new d([192,168,0,0]),16]],reserved:[[new d([192,0,0,0]),24],[new d([192,0,2,0]),24],[new d([192,88,99,0]),24],[new d([198,18,0,0]),15],[new d([198,51,100,0]),24],[new d([203,0,113,0]),24],[new d([240,0,0,0]),4]],as112:[[new d([192,175,48,0]),24],[new d([192,31,196,0]),24]],amt:[[new d([192,52,193,0]),24]]},d.prototype.kind=function(){return"ipv4"},d.prototype.match=function(h,w){let x;if(w===void 0&&(x=h,h=x[0],w=x[1]),h.kind()!=="ipv4")throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return f(this.octets,h.octets,8,w)},d.prototype.prefixLengthFromSubnetMask=function(){let h=0,w=!1;const x={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0};let k,R,F;for(k=3;k>=0;k-=1)if(R=this.octets[k],R in x){if(F=x[R],w&&F!==0)return null;F!==8&&(w=!0),h+=F}else return null;return 32-h},d.prototype.range=function(){return y.subnetMatch(this,this.SpecialRanges)},d.prototype.toByteArray=function(){return this.octets.slice(0)},d.prototype.toIPv4MappedAddress=function(){return y.IPv6.parse(`::ffff:${this.toString()}`)},d.prototype.toNormalizedString=function(){return this.toString()},d.prototype.toString=function(){return this.octets.join(".")},d})(),y.IPv4.broadcastAddressFromCIDR=function(d){try{const h=this.parseCIDR(d),w=h[0].toByteArray(),x=this.subnetMaskFromPrefixLength(h[1]).toByteArray(),k=[];let R=0;for(;R<4;)k.push(parseInt(w[R],10)|parseInt(x[R],10)^255),R++;return new this(k)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},y.IPv4.isIPv4=function(d){return this.parser(d)!==null},y.IPv4.isValid=function(d){try{return new this(this.parser(d)),!0}catch{return!1}},y.IPv4.isValidCIDR=function(d){try{return this.parseCIDR(d),!0}catch{return!1}},y.IPv4.isValidFourPartDecimal=function(d){return!!(y.IPv4.isValid(d)&&d.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},y.IPv4.isValidCIDRFourPartDecimal=function(d){const h=d.match(/^(.+)\/(\d+)$/);return!y.IPv4.isValidCIDR(d)||!h?!1:y.IPv4.isValidFourPartDecimal(h[1])},y.IPv4.networkAddressFromCIDR=function(d){let h,w,x,k,R;try{for(h=this.parseCIDR(d),x=h[0].toByteArray(),R=this.subnetMaskFromPrefixLength(h[1]).toByteArray(),k=[],w=0;w<4;)k.push(parseInt(x[w],10)&parseInt(R[w],10)),w++;return new this(k)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},y.IPv4.parse=function(d){const h=this.parser(d);if(h===null)throw new Error("ipaddr: string is not formatted like an IPv4 Address");return new this(h)},y.IPv4.parseCIDR=function(d){let h;if(h=d.match(/^(.+)\/(\d+)$/)){const w=parseInt(h[2]);if(w>=0&&w<=32){const x=[this.parse(h[1]),w];return Object.defineProperty(x,"toString",{value:function(){return this.join("/")}}),x}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},y.IPv4.parser=function(d){let h,w,x;if(h=d.match(r.fourOctet))return(function(){const k=h.slice(1,6),R=[];for(let F=0;F<k.length;F++)w=k[F],R.push(m(w));return R})();if(h=d.match(r.longValue)){if(x=m(h[1]),x>4294967295||x<0)throw new Error("ipaddr: address outside defined range");return(function(){const k=[];let R;for(R=0;R<=24;R+=8)k.push(x>>R&255);return k})().reverse()}else return(h=d.match(r.twoOctet))?(function(){const k=h.slice(1,4),R=[];if(x=m(k[1]),x>16777215||x<0)throw new Error("ipaddr: address outside defined range");return R.push(m(k[0])),R.push(x>>16&255),R.push(x>>8&255),R.push(x&255),R})():(h=d.match(r.threeOctet))?(function(){const k=h.slice(1,5),R=[];if(x=m(k[2]),x>65535||x<0)throw new Error("ipaddr: address outside defined range");return R.push(m(k[0])),R.push(m(k[1])),R.push(x>>8&255),R.push(x&255),R})():null},y.IPv4.subnetMaskFromPrefixLength=function(d){if(d=parseInt(d),d<0||d>32)throw new Error("ipaddr: invalid IPv4 prefix length");const h=[0,0,0,0];let w=0;const x=Math.floor(d/8);for(;w<x;)h[w]=255,w++;return x<4&&(h[x]=Math.pow(2,d%8)-1<<8-d%8),new this(h)},y.IPv6=(function(){function d(h,w){let x,k;if(h.length===16)for(this.parts=[],x=0;x<=14;x+=2)this.parts.push(h[x]<<8|h[x+1]);else if(h.length===8)this.parts=h;else throw new Error("ipaddr: ipv6 part count should be 8 or 16");for(x=0;x<this.parts.length;x++)if(k=this.parts[x],!(0<=k&&k<=65535))throw new Error("ipaddr: ipv6 part should fit in 16 bits");w&&(this.zoneId=w)}return d.prototype.SpecialRanges={unspecified:[new d([0,0,0,0,0,0,0,0]),128],linkLocal:[new d([65152,0,0,0,0,0,0,0]),10],multicast:[new d([65280,0,0,0,0,0,0,0]),8],loopback:[new d([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new d([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new d([0,0,0,0,0,65535,0,0]),96],deprecatedSiteLocal:[new d([65216,0,0,0,0,0,0,0]),10],discard:[new d([256,0,0,0,0,0,0,0]),64],rfc6145:[new d([0,0,0,0,65535,0,0,0]),96],rfc6052:[[new d([100,65435,0,0,0,0,0,0]),96],[new d([100,65435,1,0,0,0,0,0]),48]],"6to4":[new d([8194,0,0,0,0,0,0,0]),16],teredo:[new d([8193,0,0,0,0,0,0,0]),32],benchmarking:[new d([8193,2,0,0,0,0,0,0]),48],amt:[new d([8193,3,0,0,0,0,0,0]),32],as112v6:[[new d([8193,4,274,0,0,0,0,0]),48],[new d([9760,79,32768,0,0,0,0,0]),48]],deprecatedOrchid:[new d([8193,16,0,0,0,0,0,0]),28],orchid2:[new d([8193,32,0,0,0,0,0,0]),28],droneRemoteIdProtocolEntityTags:[new d([8193,48,0,0,0,0,0,0]),28],segmentRouting:[new d([24320,0,0,0,0,0,0,0]),16],reserved:[[new d([8193,0,0,0,0,0,0,0]),23],[new d([8193,3512,0,0,0,0,0,0]),32],[new d([16383,0,0,0,0,0,0,0]),20]]},d.prototype.isIPv4MappedAddress=function(){return this.range()==="ipv4Mapped"},d.prototype.kind=function(){return"ipv6"},d.prototype.match=function(h,w){let x;if(w===void 0&&(x=h,h=x[0],w=x[1]),h.kind()!=="ipv6")throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return f(this.parts,h.parts,16,w)},d.prototype.prefixLengthFromSubnetMask=function(){let h=0,w=!1;const x={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0};let k,R;for(let F=7;F>=0;F-=1)if(k=this.parts[F],k in x){if(R=x[k],w&&R!==0)return null;R!==16&&(w=!0),h+=R}else return null;return 128-h},d.prototype.range=function(){return y.subnetMatch(this,this.SpecialRanges)},d.prototype.toByteArray=function(){let h;const w=[],x=this.parts;for(let k=0;k<x.length;k++)h=x[k],w.push(h>>8),w.push(h&255);return w},d.prototype.toFixedLengthString=function(){const h=(function(){const x=[];for(let k=0;k<this.parts.length;k++)x.push(_(this.parts[k].toString(16),4));return x}).call(this).join(":");let w="";return this.zoneId&&(w=`%${this.zoneId}`),h+w},d.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");const h=this.parts.slice(-2),w=h[0],x=h[1];return new y.IPv4([w>>8,w&255,x>>8,x&255])},d.prototype.toNormalizedString=function(){const h=(function(){const x=[];for(let k=0;k<this.parts.length;k++)x.push(this.parts[k].toString(16));return x}).call(this).join(":");let w="";return this.zoneId&&(w=`%${this.zoneId}`),h+w},d.prototype.toRFC5952String=function(){const h=/((^|:)(0(:|$)){2,})/g,w=this.toNormalizedString();let x=0,k=-1,R;for(;R=h.exec(w);)R[0].length>k&&(x=R.index,k=R[0].length);return k<0?w:`${w.substring(0,x)}::${w.substring(x+k)}`},d.prototype.toString=function(){return this.toRFC5952String()},d})(),y.IPv6.broadcastAddressFromCIDR=function(d){try{const h=this.parseCIDR(d),w=h[0].toByteArray(),x=this.subnetMaskFromPrefixLength(h[1]).toByteArray(),k=[];let R=0;for(;R<16;)k.push(parseInt(w[R],10)|parseInt(x[R],10)^255),R++;return new this(k)}catch(h){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${h})`)}},y.IPv6.isIPv6=function(d){return this.parser(d)!==null},y.IPv6.isValid=function(d){if(typeof d=="string"&&d.indexOf(":")===-1)return!1;try{const h=this.parser(d);return new this(h.parts,h.zoneId),!0}catch{return!1}},y.IPv6.isValidCIDR=function(d){if(typeof d=="string"&&d.indexOf(":")===-1)return!1;try{return this.parseCIDR(d),!0}catch{return!1}},y.IPv6.networkAddressFromCIDR=function(d){let h,w,x,k,R;try{for(h=this.parseCIDR(d),x=h[0].toByteArray(),R=this.subnetMaskFromPrefixLength(h[1]).toByteArray(),k=[],w=0;w<16;)k.push(parseInt(x[w],10)&parseInt(R[w],10)),w++;return new this(k)}catch(F){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${F})`)}},y.IPv6.parse=function(d){const h=this.parser(d);if(h.parts===null)throw new Error("ipaddr: string is not formatted like an IPv6 Address");return new this(h.parts,h.zoneId)},y.IPv6.parseCIDR=function(d){let h,w,x;if((w=d.match(/^(.+)\/(\d+)$/))&&(h=parseInt(w[2]),h>=0&&h<=128))return x=[this.parse(w[1]),h],Object.defineProperty(x,"toString",{value:function(){return this.join("/")}}),x;throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},y.IPv6.parser=function(d){let h,w,x,k,R,F;if(x=d.match(c.deprecatedTransitional))return this.parser(`::ffff:${x[1]}`);if(c.native.test(d))return u(d,8);if((x=d.match(c.transitional))&&(F=x[6]||"",h=x[1],x[1].endsWith("::")||(h=h.slice(0,-1)),h=u(h+F,6),h.parts)){for(R=[parseInt(x[2]),parseInt(x[3]),parseInt(x[4]),parseInt(x[5])],w=0;w<R.length;w++)if(k=R[w],!(0<=k&&k<=255))return null;return h.parts.push(R[0]<<8|R[1]),h.parts.push(R[2]<<8|R[3]),{parts:h.parts,zoneId:h.zoneId}}return null},y.IPv6.subnetMaskFromPrefixLength=function(d){if(d=parseInt(d),d<0||d>128)throw new Error("ipaddr: invalid IPv6 prefix length");const h=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];let w=0;const x=Math.floor(d/8);for(;w<x;)h[w]=255,w++;return x<16&&(h[x]=Math.pow(2,d%8)-1<<8-d%8),new this(h)},y.fromByteArray=function(d){const h=d.length;if(h===4)return new y.IPv4(d);if(h===16)return new y.IPv6(d);throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")},y.isValid=function(d){return y.IPv6.isValid(d)||y.IPv4.isValid(d)},y.isValidCIDR=function(d){return y.IPv6.isValidCIDR(d)||y.IPv4.isValidCIDR(d)},y.parse=function(d){if(y.IPv6.isValid(d))return y.IPv6.parse(d);if(y.IPv4.isValid(d))return y.IPv4.parse(d);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},y.parseCIDR=function(d){try{return y.IPv6.parseCIDR(d)}catch{try{return y.IPv4.parseCIDR(d)}catch{throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},y.process=function(d){const h=this.parse(d);return h.kind()==="ipv6"&&h.isIPv4MappedAddress()?h.toIPv4Address():h},y.subnetMatch=function(d,h,w){let x,k,R,F;w==null&&(w="unicast");for(k in h)if(Object.prototype.hasOwnProperty.call(h,k)){for(R=h[k],R[0]&&!(R[0]instanceof Array)&&(R=[R]),x=0;x<R.length;x++)if(F=R[x],d.kind()===F[0].kind()&&d.match.apply(d,F))return k}return w},e.exports?e.exports=y:n.ipaddr=y})(Oc)})(jn)),jn.exports}var Mc=Pc();const he=Rc(Mc);function Zt(e){const n=e==null?void 0:e.attributes;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function hi(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.keys(e)}function er(e){return Array.isArray(e)?e.map(String):[]}function Dc(e){const n=Zt(e),t=hi(n.link),r=hi(n.link_internal),i=new Set(er(n.link_no_propagate)),a=new Set([...t,...r]);for(const o of i)a.delete(o);return a}function Lc(e){return new Set(er(Zt(e).link_module_no_propagate))}function Fc(e){return new Set(er(Zt(e).pool_no_copy))}const dn={};function jc(){for(const e of Object.keys(dn))delete dn[e]}function Vc(e,n={}){const t={lan:{ipv4:typeof n.lan=="string"?n.lan:"10.0.0.0/16",prefix:typeof n.lan_subnet=="number"?n.lan_subnet:24},loopback:{ipv4:"10.0.0.0/24",prefix:32},p2p:{ipv4:typeof n.p2p=="string"?n.p2p:"10.2.0.0/16",prefix:typeof n.p2p_subnet=="number"?n.p2p_subnet:30}},r=ne(t,e),i={};for(const[a,o]of Object.entries(r)){if(o==null){i[a]={};continue}if(typeof o!="object"||Array.isArray(o)){i[a]={ipv4:o};continue}const l={...o};typeof l.ipv4=="string"&&typeof l.prefix!="number"&&(l.prefix=a.includes("loopback")?32:24),a==="mgmt"&&typeof l.prefix!="number"&&(l.prefix=24),i[a]=l}return i}function Yc(e,n={}){const t=Fc(n),r={};for(const[i,a]of Object.entries(e)){const o={};for(const[l,c]of Object.entries(a))t.has(l)||(o[l]=c);r[i]=o}return r}function Bc(e){jc();const n=e.defaults??{},t=Vc(e.addressing??{},n);e.addressing=t,e.pools=Yc(t,n);for(const[r,i]of Object.entries(t)){const a={},o=typeof i.prefix=="number"?i.prefix:24,l=typeof i.prefix6=="number"?i.prefix6:64;typeof i.ipv4=="string"&&(a.skipFirst4=o===32||r==="loopback"||r.includes("loopback"),a.ipv4=a.skipFirst4?1:0,a.cache4=[]),typeof i.ipv6=="string"&&(a.skipFirst6=l>=127||r==="loopback"||r.includes("loopback"),a.ipv6=a.skipFirst6?1:0,a.cache6=[]),dn[r]=a}}function nr(e){const n=(e.interfaces??[]).length;return n>2?"lan":n===2?"p2p":"stub"}function Uc(e,n){const t=n.prefix??{};if(typeof t.ipv4=="string"||typeof t.ipv6=="string")return;if(n.prefix===!1){n.prefix={};return}const r=nr(n),i=[];typeof n.pool=="string"&&i.push(String(n.pool)),typeof n.role=="string"&&i.push(n.role),i.push(r),i.includes("lan")||i.push("lan");const a=Ys(e,i);n.prefix=Object.keys(a).length?a:{}}function qc(e,n,t){return Ys(e,[n],t)}function Gc(e,n){const t=n.prefix??{},r=[...n.interfaces??[]].sort((o,l)=>String(o.node).localeCompare(String(l.node))),i=e.nodes??{},a=n.type==="p2p"&&r.length===2;for(const o of["ipv4","ipv6"]){const l=t[o];if(typeof l!="string")continue;if(a){r[0][o]=pn(l,1),r[1][o]=pn(l,2);for(const u of n.interfaces??[]){const f=r.find(m=>m.node===u.node);f&&(u[o]=f[o])}continue}let c=1;for(const u of n.interfaces??[]){if(u[o]!==void 0&&u[o]!==null)continue;const f=i[u.node],m=f==null?void 0:f.id,y=typeof m=="number"&&m>0&&Xc(l,m)?m:c++;u[o]=pn(l,y)}}}function Ys(e,n,t){const r=e.addressing??{},i=n.find(c=>r[c]&&typeof r[c]=="object");if(!i)return{};const a=r[i],o=dn[i]??(dn[i]={}),l={};if(typeof a.ipv4=="string"){const c=typeof a.prefix=="number"?a.prefix:24;l.ipv4=t!==void 0?Kc(a.ipv4,c,t,o):zc(a.ipv4,c,o)}if(typeof a.ipv6=="string"){const c=typeof a.prefix6=="number"?a.prefix6:64;l.ipv6=t!==void 0?Wc(a.ipv6,c,t,o):Hc(a.ipv6,c,o)}return l}function zc(e,n,t){const r=t.ipv4??0;return t.ipv4=r+1,Bs(e,n,r)}function Kc(e,n,t,r){for(r.cache4=r.cache4??[];r.cache4.length<t;){const a=r.cache4.length+(r.skipFirst4?1:0);r.cache4.push(Bs(e,n,a))}const i=(r.skipFirst4?1:0)+r.cache4.length;return(r.ipv4??0)<i&&(r.ipv4=i),r.cache4[t-1]}function Hc(e,n,t){const r=t.ipv6??0;return t.ipv6=r+1,Us(e,n,r)}function Wc(e,n,t,r){for(r.cache6=r.cache6??[];r.cache6.length<t;){const a=r.cache6.length+(r.skipFirst6?1:0);r.cache6.push(Us(e,n,a))}const i=(r.skipFirst6?1:0)+r.cache6.length;return(r.ipv6??0)<i&&(r.ipv6=i),r.cache6[t-1]}function Bs(e,n,t){const[r]=tr(e),i=2**(32-n),a=r+t*i>>>0;return`${rr(a)}/${n}`}function Us(e,n,t){const[r,i]=he.parseCIDR(e);if(r.kind()!=="ipv6")throw new Error(`Expected IPv6 pool, got ${e}`);const a=ir(r.toByteArray()),o=128n-BigInt(n),l=(a>>o)+BigInt(t)<<o,c=sr(l,16);return`${he.fromByteArray(Array.from(c)).toString()}/${n}`}function pn(e,n){const[t,r]=he.parseCIDR(e);if(t.kind()==="ipv4"){const[c]=tr(e);return`${rr(c+n>>>0)}/${r}`}const a=ir(t.toByteArray())+BigInt(n),o=sr(a,16);return`${he.fromByteArray(Array.from(o)).toString()}/${r}`}function Jc(e){try{const[n,t]=he.parseCIDR(e);if(n.kind()==="ipv4"){const[c]=tr(e),u=t===0?0:-1<<32-t>>>0;return`${rr((c&u)>>>0)}/${t}`}const r=n.toByteArray(),i=ir(r),a=128n-BigInt(t),o=i>>a<<a;return`${he.fromByteArray(Array.from(sr(o,16))).toString()}/${t}`}catch{return e}}function Xc(e,n){try{const[,t]=he.parseCIDR(e);if(he.parseCIDR(e)[0].kind()==="ipv4"){const i=2**(32-t)-2;return n>0&&n<=i}return n>0}catch{return!1}}function tr(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(Number);return[(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),Number(t??32)]}function rr(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function ir(e){let n=0n;for(const t of e)n=(n<<8n)+BigInt(t);return n}function sr(e,n){const t=new Array(n).fill(0);let r=e;for(let i=n-1;i>=0;i--)t[i]=Number(r&0xffn),r>>=8n;return t}function qs(e,n){let t;if(e&&typeof e=="object"&&!Array.isArray(e))t={...e};else{t={};for(const r of e??[])if(typeof r=="string")t[r]={name:r};else if(r&&typeof r=="object"&&!Array.isArray(r)){const i=r;if(!i.name){n==null||n.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}t[i.name]=i}}for(const r of Object.keys(t)){let i=t[r];i==null?i={name:r}:typeof i!="object"||Array.isArray(i)?(n==null||n.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${r} must be a dictionary`}),i={name:r,extra:i}):i={...i,name:r},Array.isArray(i.interfaces)||(i.interfaces=[]),t[r]=i}return t}function Qc(e){const n=new Set;for(const r of Object.values(e.nodes??{}))typeof r.id=="number"&&n.add(r.id);let t=1;for(const r of Object.values(e.nodes??{}))if(typeof r.id!="number"){for(;n.has(t);)t++;r.id=t,n.add(t),t++}}function Zc(e,n){var i;const t=String(((i=e.defaults)==null?void 0:i.device)??"frr"),r=Fi;for(const a of Object.values(e.nodes??{})){a.device||(a.device=t);let o=String(a.device);r.includes(o)||(n==null||n.warning({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${o}' on node ${a.name}; using frr (allowed: ${r.join(", ")})`,path:`nodes.${a.name}.device`}),o="frr",a.device=o);const l=Qt(o);a.role||(a.role=String(l.role??"router")),l.daemon&&(a["netlab-internal:_daemon"]=!0,l.parent&&(a["netlab-internal:_daemon_parent"]=l.parent))}}function eu(e){var i,a,o;Qc(e);const n=((i=e.addressing)==null?void 0:i.mgmt)??{},t=String(n.ipv4??"192.168.121.0/24"),r=Number(n.start??100);for(const l of Object.values(e.nodes??{})){const c=l.id??1,u=Qt(String(l.device??"frr")),f=Number(u.ifindex_offset??1),m=u.mgmt_if!==void 0?String(u.mgmt_if):et(String(u.interface_name??"eth{ifindex}"),f-1);if(l.mgmt={ifname:m||"eth0",ipv4:nu(t,r+c),mac:iu(String(n.mac??"CA-FE-00-00-00-00"),c)},l.role==="router"||l.role==="gateway"||!l.role){const _=et(String(u.loopback_interface_name??"lo{ifindex}"),0),y=qc(e,"loopback",c),d={ifindex:0,ifname:_||"lo",type:"loopback",virtual_interface:!0,neighbors:[]};typeof y.ipv4=="string"&&(d.ipv4=y.ipv4.endsWith("/32")?y.ipv4:pn(y.ipv4,1)),typeof y.ipv6=="string"&&(d.ipv6=y.ipv6.endsWith("/128")?y.ipv6:pn(y.ipv6,1)),l.loopback=d}l.af=l.af??{},((a=l.loopback)!=null&&a.ipv4||(l.interfaces??[]).some(_=>_.ipv4))&&(l.af.ipv4=!0),((o=l.loopback)!=null&&o.ipv6||(l.interfaces??[]).some(_=>_.ipv6))&&(l.af.ipv6=!0)}}function et(e,n){return e.includes("if ifindex else")?n?e.replace(/\{ifindex if ifindex else ""\}/g,String(n)):e.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):e.replace(/\{ifindex\}/g,String(n))}function nu(e,n){return tu(e,n)}function tu(e,n){const[t,,]=ru(e),r=(t&4294967295)+n;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}function ru(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(l=>Number(l)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),a=Number(t??32),o=a===0?0:-1<<32-a>>>0;return[i&o,a]}function iu(e,n){const t=n.toString(16).padStart(4,"0");return e.replace(/00-00$/,`${t.slice(0,2)}-${t.slice(2)}`)}function Gs(e,n){const t=e.nodes??{},r=e.links;if(!r)return[];const i=Array.isArray(r)?r:[],a=[];let o=0;for(const l of i){o++;const c=`links[${o}]`,u=su(l,c,t,n);u&&u.disable!==!0&&(u.linkindex=o,u[we]=c,delete u._linkname,a.push(u))}return e.links=a,a}function su(e,n,t,r){if(typeof e=="string"){const i=[];for(const a of e.split("-")){const o=a.trim();t[o]?i.push({node:o}):r==null||r.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${e} in ${n} refers to an unknown node ${o}`})}return{interfaces:i,[we]:n}}if(Array.isArray(e))return{interfaces:yi(e,t,r,n),[we]:n};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=yi(i.interfaces,t,r,n),i[we]=n,i;const a={[we]:n},o=[];for(const[l,c]of Object.entries(i))if(l in t){const u=c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:l}:{node:l};o.push(u)}else a[l]=c;return a.interfaces=o,a}return r==null||r.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof e} for ${n}`}),null}function yi(e,n,t,r){const i=[];for(const a of e)if(typeof a=="string"){if(!n[a]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${r} refers to unknown node ${a}`});continue}i.push({node:a})}else if(a&&typeof a=="object"&&!Array.isArray(a)){const o=a;if(!o.node||!n[o.node]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${r} missing/unknown node`});continue}i.push(o)}return i}function au(e){var a,o;const n=e.nodes??{},t=e.defaults??{},r=Dc(t),i=Lc(t);for(const l of e.links??[]){ou(l,n);const c=l.interfaces??[];if(l.node_count=c.length,(l.type==="lan"||l.type==="stub")&&!l.bridge){const f=String(e.name??"lab").slice(0,10);l.bridge=`${f}_${l.linkindex??1}`}Uc(e,l),Gc(e,l);const u=[];for(const f of c){const m=f.node,_=n[m];if(!_)continue;const y=new Set(r);for(const z of _.module??[])y.add(z);for(const z of i)y.delete(z);const d={};for(const[z,H]of Object.entries(l))y.has(z)&&(d[z]=structuredClone(H));const{node:h,...w}=f,x=La(structuredClone(w),d),k=Qt(String(_.device??"frr")),R=l.type==="loopback";let F,q;if(R){F=cu(_);const z=F-1e4,H=String(k.loopback_interface_name??k.interface_name??"Loopback{ifindex}");q=et(H,z),x.virtual_interface=!0}else F=lu(_),q=et(String(k.interface_name??"eth{ifindex}"),F);x.ifindex=F,x.ifname=q,x.type||(x.type=l.type??nr(l)),x.neighbors=[],f.ifindex=F,f.ifname=q,R&&(f.virtual_interface=!0),_.interfaces=_.interfaces??[],_.interfaces.push(x),u.push({node:m,data:x})}for(const f of u){f.data.neighbors=[];for(const m of u){if(m===f)continue;const _={node:m.node};m.data.ifname!==void 0&&(_.ifname=m.data.ifname),m.data.ipv4!==void 0&&(_.ipv4=m.data.ipv4),m.data.ipv6!==void 0&&(_.ipv6=m.data.ipv6),f.data.neighbors.push(_)}}}for(const l of Object.values(n))l.af=l.af??{},((a=l.loopback)!=null&&a.ipv4||(l.interfaces??[]).some(c=>typeof c.ipv4=="string"))&&(l.af.ipv4=!0),((o=l.loopback)!=null&&o.ipv6||(l.interfaces??[]).some(c=>typeof c.ipv6=="string"))&&(l.af.ipv6=!0)}function ou(e,n){const t=e.interfaces??[];t.length;let r=0;for(const i of t){const a=n[i.node];a&&a.role!=="host"&&r++}!("role"in e)&&r<=1&&e.type!=="loopback"&&!e.vlan_name&&(e.role="stub"),e.type||(e.type=nr(e))}function lu(e){const n=(e.interfaces??[]).map(r=>r.ifindex??0);let t=1;for(;n.includes(t);)t++;return t}function cu(e,n){const t=(e.interfaces??[]).map(i=>i.ifindex??0);let r=10001;for(;t.includes(r);)r++;return r}function Lt(e){return e===!0||e==="true"||e==="True"}function uu(e){if(e.groups||(e.groups={}),Array.isArray(e.groups)){const n={};for(const t of e.groups)t.name&&(n[String(t.name)]=t);e.groups=n}}function pu(e){var a;const n=e.groups??{},t=((a=e.defaults)==null?void 0:a.groups)??{},r=Lt(n._auto_create)||Lt(t._auto_create);!e.nodes||typeof e.nodes!="object"?e.nodes={}:Array.isArray(e.nodes)&&(e.nodes=qs(e.nodes));const i=e.nodes;for(const[o,l]of Object.entries(n)){if(o.startsWith("_")||!l||typeof l!="object"||Array.isArray(l))continue;const c=l,u=c.members;if(!(!Array.isArray(u)||u.length===0||!Lt(c._auto_create)&&!r||String(c.type??"node")!=="node"))for(const m of u){const _=String(m);_ in n||_ in t||_ in i||(i[_]={name:_,interfaces:[]})}}}function fu(e){const n=e.groups??{},t=e.nodes??{};for(const[r,i]of Object.entries(n)){if(r.startsWith("_")||!i||typeof i!="object"||Array.isArray(i))continue;const a=i.members??[];for(const o of a){const l=t[o];if(l){if(i.device&&!l.device&&(l.device=i.device),typeof i.provider=="string"&&!l.provider&&(l.provider=i.provider),Array.isArray(i.module)){const c=new Set(l.module??[]);for(const u of i.module)c.add(u);l.module=[...c]}if(i.node_data&&typeof i.node_data=="object"){const c=ne(i.node_data,l);Object.assign(l,c)}}}}}function du(e){var r,i;e.groups||(e.groups={});const n=e.groups,t=Number((r=e.bgp)==null?void 0:r.as);for(const[a,o]of Object.entries(e.nodes??{})){if(!(o.module??[]).includes("bgp"))continue;const l=Number(((i=o.bgp)==null?void 0:i.as)??t);if(!Number.isFinite(l)||l<=0)continue;const c=`as${l}`;n[c]||(n[c]={members:[]});const u=n[c];Array.isArray(u.members)||(u.members=[]),u.members.includes(a)||u.members.push(a)}}function mu(e){const n=e.components;if(!n||typeof n!="object")return;const t=e.nodes??{},r={},i=[],a=[];for(const[o,l]of Object.entries(t)){const c=l.include;if(typeof c!="string")continue;const u=n[c];if(!u)continue;i.push(o);const f=o,m=u.nodes??{};for(const[y,d]of Object.entries(m)){const h=`${f}_${y}`;r[h]={...d,name:h}}const _=u.links??[];for(const y of _)a.push(_u(y,f,Object.keys(m)))}for(const o of i)delete t[o];Object.assign(t,r),e.nodes=t,e.links=[...e.links??[],...a],delete e.components,Gs(e)}function _u(e,n,t){const r=i=>t.includes(i)?`${n}_${i}`:i;if(Array.isArray(e))return{interfaces:e.map(i=>({node:r(String(i))}))};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(l=>({...l,node:r(String(l.node??""))})),i;const a={interfaces:[]},o=[];for(const[l,c]of Object.entries(i))t.includes(l)?o.push(c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:r(l)}:{node:r(l)}):a[l]=c;return a.interfaces=o,a}return{interfaces:[]}}const zs="vlan";function Ks(e,n){const t=e.vlans;if(!t||typeof t!="object")return;let r=1;for(const[i,a]of Object.entries(t)){const o=a??{};if(o.id===void 0){for(;Object.values(t).some(l=>(l==null?void 0:l.id)===r);)r++;o.id=r++}t[i]=o}}function Hs(e,n,t){var i;const r=e.vlan;if(r&&typeof r.access=="string"){const a=(i=n.vlans)==null?void 0:i[r.access];a&&r.access_id===void 0&&(r.access_id=a.id)}}const hu={name:zs,module_pre_transform:Ks,link_pre_transform:Hs},yu=Object.freeze(Object.defineProperty({__proto__:null,default:hu,link_pre_transform:Hs,module_pre_transform:Ks,name:zs},Symbol.toStringTag,{value:"Module"})),Ws="vrf";function Js(e,n){const t=e.vrfs;if(!t||typeof t!="object")return;let r=1;for(const[i,a]of Object.entries(t)){const o=a??{};o.rd||(o.rd=`1:${r}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),t[i]=o,r++}}function Xs(e,n,t){const r=n.vrfs;if(!r)return;const i=new Set((e.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;const a={...e.vrfs??{}};for(const o of i)!a[o]&&r[o]&&(a[o]={...r[o]});e.vrfs=a}const gu={name:Ws,module_pre_transform:Js,node_post_transform:Xs},vu=Object.freeze(Object.defineProperty({__proto__:null,default:gu,module_pre_transform:Js,name:Ws,node_post_transform:Xs},Symbol.toStringTag,{value:"Module"})),Qs="vxlan";function ar(e){return e.vlans??{}}function Zs(e){var t;const n=(t=e.defaults)==null?void 0:t.vxlan;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function bu(e){var r;const n=Number((r=e.vxlan)==null?void 0:r.start_vni);if(Number.isFinite(n)&&n>0)return n;const t=Number(Zs(e).start_vni);return Number.isFinite(t)&&t>0?t:1e5}function ea(e,n){const t=(n==null?void 0:n.vxlan)??e.vxlan??{};return Array.isArray(t.vlans)&&t.vlans.length?t.vlans.map(String):Object.keys(ar(e))}function na(e,n){e.vxlan||(e.vxlan={})}function ta(e,n){const t=ar(e);if(!Object.keys(t).length)return;const r=new Set;for(const c of Object.values(t))typeof(c==null?void 0:c.vni)=="number"&&r.add(c.vni);const i=bu(e);let a=i;const o=ea(e);for(const c of o){const u=t[c];if(!u||u.vni===!1||typeof u.vni=="number")continue;const f=Number(u.id),m=Number.isFinite(f)?i+f:0;if(m>0&&!r.has(m))u.vni=m,r.add(m);else{for(;r.has(a);)a++;u.vni=a,r.add(a),a++}}const l=e.vxlan??{};(!Array.isArray(l.vlans)||!l.vlans.length)&&(l.vlans=o.filter(c=>{var u;return typeof((u=t[c])==null?void 0:u.vni)=="number"})),e.vxlan=l}function xu(e,n){const t=e.loopback,r=t==null?void 0:t[n];if(typeof r=="string")return r.split("/")[0]}function ra(e,n){var a,o;const t=e.vxlan??{},r=String(t.flooding??"static"),i=ar(e);for(const l of Object.values(e.nodes??{})){if(!(l.module??[]).includes("vxlan"))continue;const c=l.vxlan??{};c.domain===void 0&&(c.domain=t.domain??"global"),c.flooding=r;const u=ea(e,l).filter(d=>{var h;return typeof((h=i[d])==null?void 0:h.vni)=="number"});c.vlans=u;const f={...l.vlans??{}};for(const d of u){const h=i[d],w=f[d]??{},x=w.evpn??{},k=h.evpn&&typeof h.evpn=="object"&&!Array.isArray(h.evpn)?h.evpn:{};f[d]={...w,id:h.id,mode:h.mode,vni:h.vni,...Object.keys(k).length||Object.keys(x).length?{evpn:{...k,...x}}:{}}}Object.keys(f).length&&(l.vlans=f);const _=!!(t.use_v6_vtep??c.use_v6_vtep??Zs(e).use_v6_vtep)?"ipv6":"ipv4",y=xu(l,_);if(y?(c.vtep=y,c.vtep_interface=String(((a=l.loopback)==null?void 0:a.ifname)??"lo"),c.transport=_):n.diagnostics.error({code:"MISSING",category:"MISSING",module:"vxlan",message:`VXLAN module needs an ${_.toUpperCase()} address on loopback of ${l.name}`,path:`nodes.${l.name}.loopback.${_}`}),String(c.flooding)==="static"){const d=Object.values(e.nodes??{}).filter(w=>w!==l&&(w.module??[]).includes("vxlan")),h=new Set;for(const w of u){const x=f[w];if(!x||typeof x.vni!="number")continue;const k=[];for(const R of d){const F=(o=R.vxlan)==null?void 0:o.vtep;if(typeof F!="string"||F===y)continue;const q=R.vlans??{};Object.values(q).some(H=>(H==null?void 0:H.vni)===x.vni)&&(k.push(F),h.add(F))}k.length&&(x.vtep_list=k)}h.size&&(c.vtep_list=[...h].sort())}l.vxlan=c}}const wu={name:Qs,module_init:na,module_pre_transform:ta,module_post_transform:ra},Su=Object.freeze(Object.defineProperty({__proto__:null,default:wu,module_init:na,module_post_transform:ra,module_pre_transform:ta,name:Qs},Symbol.toStringTag,{value:"Module"})),ia="ospf";function sa(e,n){e.ospf||(e.ospf={})}function aa(e,n,t){var l,c;const r=e.ospf??{},i=n.ospf??{};if(r.area===void 0&&(r.area=i.area??"0.0.0.0"),!r.router_id){const u=e.loopback,f=typeof(u==null?void 0:u.ipv4)=="string"?u.ipv4.split("/")[0]:void 0;r.router_id=f??`10.0.0.${e.id??1}`}const a=(e.interfaces??[]).some(u=>typeof u.ipv4=="string")||typeof((l=e.loopback)==null?void 0:l.ipv4)=="string",o=(e.interfaces??[]).some(u=>typeof u.ipv6=="string")||typeof((c=e.loopback)==null?void 0:c.ipv6)=="string";r.af={ipv4:a,ipv6:o};for(const u of e.interfaces??[]){if(u.role==="external"){delete u.ospf;continue}const f=u.ospf??{};f.area===void 0&&(f.area=r.area),!f.network_type&&u.type==="p2p"&&(f.network_type="point-to-point"),u.role==="stub"||u.type==="stub"?f.passive===void 0&&(f.passive=!0):f.passive===void 0&&(f.passive=!1),u.ospf=f}if(e.loopback){const u=e.loopback,f=u.ospf??{};f.area===void 0&&(f.area=r.area),f.passive===void 0&&(f.passive=!1),u.ospf=f}e.ospf=r}const Au={name:ia,module_init:sa,node_post_transform:aa},Iu=Object.freeze(Object.defineProperty({__proto__:null,default:Au,module_init:sa,name:ia,node_post_transform:aa},Symbol.toStringTag,{value:"Module"})),oa="isis";function la(e,n){e.isis||(e.isis={})}function ca(e,n,t){const r=e.isis??{},i=n.isis??{};if(r.area||(r.area=i.area??"49.0001"),r.type||(r.type=i.type??"level-2"),!r.net){const a=(e.id??1).toString(16).padStart(4,"0");r.net=`${r.area}.0000.0000.${a}.00`}for(const a of e.interfaces??[]){const o=a.isis??{};!o.network_type&&a.type==="p2p"&&(o.network_type="point-to-point"),a.isis=o}e.isis=r}const Tu={name:oa,module_init:la,node_post_transform:ca},Eu=Object.freeze(Object.defineProperty({__proto__:null,default:Tu,module_init:la,name:oa,node_post_transform:ca},Symbol.toStringTag,{value:"Module"})),ua="bgp",gi={ipv4:["ibgp","ebgp","localas_ibgp"],ipv6:["ibgp","ebgp","localas_ibgp"]},ku={localas_ibgp:"ibgp"};function pa(e,n){e.bgp||(e.bgp={})}function fa(e,n,t){const r=e.bgp??{},i=n.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&t.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function da(e,n,t){var o,l,c,u,f,m;const r=(o=n.defaults)==null?void 0:o.bgp,i=String(((l=n.bgp)==null?void 0:l.ebgp_role)??(r==null?void 0:r.ebgp_role)??"external");if(!i||e.vlan_name)return;const a=new Set;for(const _ of e.interfaces??[]){const y=(c=n.nodes)==null?void 0:c[_.node];if(!y)continue;const d=Number((u=y.bgp)==null?void 0:u.as);Number.isFinite(d)&&d>0&&a.add(d);const h=Number(((f=_.bgp)==null?void 0:f.local_as)??((m=y.bgp)==null?void 0:m.local_as)??d);Number.isFinite(h)&&h>0&&a.add(h)}a.size>1&&!e.role&&(e.role=i)}function ma(e,n){for(const t of Object.values(e.nodes??{})){if(!(t.module??[]).includes("bgp"))continue;const r=t.bgp??{};if(!r.router_id){const i=t.loopback;r.router_id=typeof(i==null?void 0:i.ipv4)=="string"?i.ipv4.split("/")[0]:`10.0.0.${t.id??1}`}t.bgp=r}Nu(e)}function _a(e,n,t){const r=e.bgp??{};if(!r.as){e.bgp=r;return}$u(e,n),Ou(e,n),Lu(e),Mu(e),Du(e),e.bgp=r}function Nu(e){var t;const n=new Set;for(const r of Object.values(e.nodes??{})){const i=Number((t=r.bgp)==null?void 0:t.as);Number.isFinite(i)&&n.add(i)}for(const r of n){const i=ha(r,e);if(!i.length)continue;const a=i.filter(l=>l.bgp.rr_cluster_id===void 0).map(l=>String(l.bgp.router_id??"")),o=a.length?a.sort()[0]:void 0;for(const l of i){const c=l.bgp;c.rr_cluster_id===void 0&&(c.rr_cluster_id=o||c.router_id)}}}function ha(e,n){return Object.values(n.nodes??{}).filter(t=>{const r=t.bgp;return r&&Number(r.as)===e&&r.rr})}function $u(e,n){const t=e.bgp,r=t.sessions??gi,i=[];t.neighbors=i,Cu(e,r,n,i),Ru(e,r,n,i);for(const o of["ipv4","ipv6"])i.some(l=>l[o]!==void 0)&&(t[o]=!0);const a=t.activate??gi;for(const o of i){const l={};for(const c of["ipv4","ipv6"])o[c]!==void 0&&t[c]&&(a[c]??[]).includes(String(o.type))&&(l[c]=!0);Object.keys(l).length&&(o.activate=l)}}function Cu(e,n,t,r){var m;const i=e.bgp,a=Number(i.as),o=!!i.rr,l=i.next_hop_self,c=i.rr_mesh!==!1,u=o?[]:ha(a,t);let f;o||u.length===0?(f=Object.values(t.nodes??{}).filter(_=>{var y;return _.name===e.name?!1:Number((y=_.bgp)==null?void 0:y.as)===a}),o&&!c&&(f=f.filter(_=>!_.bgp.rr||_.bgp.rr_mesh!==!1))):f=u;for(const _ of f){const y=_.loopback??{},d={};(m=_.bgp)!=null&&m.rr&&(d.rr=_.bgp.rr);const h=ya(_,y,"ibgp",n,d);h&&(e.loopback&&(h._source_intf=structuredClone(e.loopback)),l&&(h.next_hop_self="ebgp"),o&&!h.rr&&(h.rr_client=!0),r.push(h))}}function Ru(e,n,t,r){var o,l;const i=e.bgp,a=Number(i.as);for(const c of e.interfaces??[])if(!(c.bgp===!1||!(typeof c.ipv4=="string"||typeof c.ipv6=="string")))for(const f of c.neighbors??[]){const m=(o=t.nodes)==null?void 0:o[f.node];if(!m)continue;const _=Number((l=m.bgp)==null?void 0:l.as);if(!Number.isFinite(_)||_<=0||_===a)continue;const y={};typeof f.ipv4=="string"&&(y.ipv4=f.ipv4),typeof f.ipv6=="string"&&(y.ipv6=f.ipv6);const d={ifindex:c.ifindex??0},h=ya(m,y,"ebgp",n,d);h&&(h.as=_,r.push(h))}}function ya(e,n,t,r,i={}){var l;const a={...i,name:e.name??"",as:(l=e.bgp)==null?void 0:l.as,type:t};let o=0;for(const c of["ipv4","ipv6"]){if(!(r[c]??[]).includes(t)||!(c in n))continue;o++;const u=n[c];typeof u=="boolean"?a[c]=u:typeof u=="string"&&(a[c]=u.split("/")[0])}return o>0?a:null}function Ou(e,n){var o;const t=(o=n.defaults)==null?void 0:o.bgp,r=(t==null?void 0:t.advertise_roles)??["stub"],i=e.bgp,a=[...e.interfaces??[],...e.loopback?[e.loopback]:[]];for(const l of a){if(l.bgp===!1)continue;const c=l.bgp??{};if("advertise"in c){l.bgp=c;continue}const u=l.role,f=l.type;if(f&&r.includes(f)||u&&r.includes(u)){u!=="stub"?c.advertise=!0:c.advertise=Pu(l,n),l.bgp=c;continue}f==="loopback"&&i.advertise_loopback&&(c.advertise=!0,l.bgp=c)}}function Pu(e,n){var t;for(const r of e.neighbors??[]){const i=(t=n.nodes)==null?void 0:t[r.node];if(i&&i.role!=="host")return!1}return!0}function Mu(e){var i;const n=e.bgp,t=Array.isArray(n.advertise)?n.advertise.filter(a=>a&&typeof a=="object"):[];Array.isArray(n.advertise)||(n.advertise=t);const r=[...e.loopback?[e.loopback]:[],...e.interfaces??[]];for(const a of r){if(!((i=a.bgp)!=null&&i.advertise))continue;const o={};for(const l of["ipv4","ipv6"])typeof a[l]=="string"&&(o[l]=Jc(String(a[l])));Object.keys(o).length&&t.push(o)}t.length?n.advertise=t:delete n.advertise}function Du(e){const n=e.bgp,t=Array.isArray(n.advertise)?n.advertise:[];for(const r of["ipv4","ipv6"])n[r]||t.some(i=>r in i)&&(n[r]=!0)}function Lu(e){const n=e.bgp,t=n.community;if(!t||typeof t!="object")return;const r=Object.fromEntries(Object.entries(t).map(([i,a])=>[i,Array.isArray(a)?[...a]:a]));for(const[i,a]of Object.entries(ku))!(i in r)&&a in r&&(r[i]=[...r[a]??[]]);n.community=r}const Fu={name:ua,module_init:pa,node_pre_transform:fa,link_pre_transform:da,module_post_transform:ma,node_post_transform:_a},ju=Object.freeze(Object.defineProperty({__proto__:null,default:Fu,link_pre_transform:da,module_init:pa,module_post_transform:ma,name:ua,node_post_transform:_a,node_pre_transform:fa},Symbol.toStringTag,{value:"Module"})),ga="evpn";function va(e){return e.vlans??{}}function Ut(e){var t;const n=(t=e.defaults)==null?void 0:t.evpn;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function Vu(e,n){var a,o,l;const t=Number((a=n==null?void 0:n.bgp)==null?void 0:a.as);if(Number.isFinite(t)&&t>0)return t;const r=Number((o=e.bgp)==null?void 0:o.as);if(Number.isFinite(r)&&r>0)return r;const i=Number(((l=e.evpn)==null?void 0:l.as)??Ut(e).as);if(Number.isFinite(i)&&i>0)return i}function ba(e,n){e.evpn||(e.evpn={}),e.vxlan||(e.vxlan={}),e.vxlan.flooding="evpn"}function xa(e,n){const t=va(e),r=e.evpn??{},i=Vu(e);let a;Array.isArray(r.vlans)&&r.vlans.length?a=r.vlans.map(String):a=Object.entries(t).filter(([,o])=>typeof(o==null?void 0:o.vni)=="number").map(([o])=>o),r.vlans=a;for(const o of a){const l=t[o];if(!l)continue;const c=l.evpn??{};c.evi===void 0&&(c.evi=l.id??0);const u=c.evi;if(i!==void 0){const f=`${i}:${u}`;c.import||(c.import=[f]),c.export||(c.export=[f])}l.evpn=c}e.evpn=r}function wa(e,n,t){var _,y;if(!(e.module??[]).includes("evpn"))return;const r=n.evpn??{},i=e.evpn??{};if(i.transport===void 0&&(i.transport=r.transport??Ut(n).transport??"vxlan"),!Array.isArray(i.session)||!i.session.length){const d=Ut(n).session;i.session=Array.isArray(r.session)?[...r.session]:Array.isArray(d)?[...d]:["ibgp"]}const a=va(n),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(a)).filter(d=>{var h;return typeof((h=a[d])==null?void 0:h.vni)=="number"});i.vlans=o;const l=String(((_=e.bgp)==null?void 0:_.router_id)??""),c={...e.vlans??{}};for(const d of o){const h=a[d],w=h.evpn??{},x={...c[d]??{},id:h.id,mode:h.mode,vni:h.vni,evpn:{...w}},k=w.evi;l&&k!==void 0&&x.evpn.rd===void 0&&(x.evpn.rd=`${l}:${k}`),c[d]=x}Object.keys(c).length&&(e.vlans=c);const u=new Set(i.session.map(String)),f=e.bgp??{},m=Array.isArray(f.neighbors)?f.neighbors:Array.isArray(f.neighbor)?f.neighbor:[];for(const d of m){const h=String(d.name??""),w=(y=n.nodes)==null?void 0:y[h];if(!w||!(w.module??[]).includes("evpn"))continue;const x=String(d.type??"");u.has(x)&&d.evpn===void 0&&(d.evpn="ipv4")}f.neighbors=m,delete f.neighbor,e.bgp=f,e.evpn=i}const Yu={name:ga,module_init:ba,module_pre_transform:xa,node_post_transform:wa},Bu=Object.freeze(Object.defineProperty({__proto__:null,default:Yu,module_init:ba,module_pre_transform:xa,name:ga,node_post_transform:wa},Symbol.toStringTag,{value:"Module"}));function ve(e){const n=e.name;return{...e,requires:Vi(n),transform_after:Yi(n)}}const rt=[ve(yu),ve(vu),ve(Su),ve(Iu),ve(Eu),ve(ju),ve(Bu)];function Sa(e,n="transform_after"){const t=new Map(rt.map(c=>[c.name,c])),r=[],i=new Set,a=new Set;function o(c){if(n==="config_after")return Ga(c);const u=t.get(c);return(u==null?void 0:u.transform_after)??Yi(c)}function l(c){var f;if(a.has(c)||i.has(c))return;i.add(c);const u=((f=t.get(c))==null?void 0:f.requires)??Vi(c);for(const m of[...u,...o(c)])e.includes(m)&&l(m);i.delete(c),a.add(c),r.push(c)}for(const c of e)l(c);return r}function or(e,n="transform_after"){const t=new Set(e.module??[]);for(const r of Object.values(e.nodes??{}))for(const i of r.module??[])t.add(i);return Sa([...t],n)}function Uu(e){const n=e.defaults??{},t=new Set(rt.map(r=>r.name));for(const r of or(e)){if(!t.has(r))continue;const i=n[r]??hn(r)??{},a=e[r]??{},o=ne(qa(i),a);e[r]=o;for(const l of Object.values(e.nodes??{})){if(!(l.module??[]).includes(r))continue;const c=l[r]??{},u=ne(e[r],c);Object.keys(u).length!==0&&(l[r]=u)}}}function be(e,n,t){const r=or(n);for(const i of r){const a=rt.find(l=>l.name===i);if(!a)continue;const o=a[e];if(typeof o=="function")if(e.startsWith("node_"))for(const l of Object.values(n.nodes??{}))(l.module??[]).includes(i)&&o(l,n,t);else if(e.startsWith("link_"))for(const l of n.links??[])o(l,n,t);else o(n,t)}}function qu(e){for(const n of Object.values(e.nodes??{}))for(const t of n.module??[]){const r=za(t);if(!r.length)continue;const i=n[t]??{};for(const a of n.interfaces??[]){const o=a[t]??{};for(const l of r)o[l]===void 0&&i[l]!==void 0&&(o[l]=i[l]);a[t]=o}}}function Gu(e,n){const t=new Set(rt.map(r=>r.name));for(const r of Object.values(e.nodes??{}))for(const i of r.module??[])t.has(i)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${i} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(const r of e.module??[])t.has(r)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${r}`,path:"module"})}function zu(e,n){e.provider||(e.provider="clab"),e.provider!=="clab"&&n.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:"provider"})}function Ku(e,n){e.provider||(e.provider="clab")}function Hu(e){for(const n of Object.values(e.nodes??{}))n.device==="bird"&&Ju(n)}function Wu(e){return`(rt,${e.split(":").join(",")})`}function Ju(e){const n=e.vrfs;if(n)for(const t of Object.values(n))for(const r of["import","export"]){const i=t[r];Array.isArray(i)&&(t[`netlab-internal:_bird_${r}`]=i.map(a=>typeof a=="string"?Wu(a):a))}}function Xu(e,n={}){var a,o,l;const t=new Va,r=Vs(),i={diagnostics:t,devices:r};if(Ui(e),zu(e,i),uu(e),e.nodes=qs(e.nodes,t),pu(e),mu(e),Gs(e,t),fu(e),Zc(e,t),Array.isArray(e.module)&&e.module.length>0)for(const c of Object.values(e.nodes))"module"in c||c.role==="host"&&!c["netlab-internal:_daemon"]||(c.module=[...e.module]);Uu(e),du(e),Gu(e,t),be("module_init",e,i),Bc(e),(a=n.afterSetup)==null||a.call(n,e,i),be("module_pre_transform",e,i),be("node_pre_transform",e,i),eu(e),be("link_pre_transform",e,i),au(e),be("link_post_transform",e,i),be("module_post_transform",e,i),qu(e),be("node_post_transform",e,i),(o=n.afterAddressed)==null||o.call(n,e,i),Hu(e),Ku(e),e.module=or(e,"config_after");for(const c of Object.values(e.nodes??{}))Array.isArray(c.module)&&c.module.length>0&&(c.module=Sa(c.module,"config_after"));return(l=n.afterTransformed)==null||l.call(n,e,i),{topology:e,diagnostics:t,ctx:i}}function Qu(e,n={}){const t={},r=n.validate===!0,i=(l,c,u)=>{var m;if(!r)return;const f=Ec(l,c,{yangDir:n.yangDir,diagnostics:u});t[c]=f.ok,(m=n.snapshots)==null||m.set(c,structuredClone(l))},{topology:a,diagnostics:o}=Xu(e,{afterSetup:(l,c)=>{const u=c.diagnostics;i(l,"user_input",u),i(l,"normalized",u)},afterAddressed:(l,c)=>{i(l,"addressed",c.diagnostics)},afterTransformed:(l,c)=>{i(l,"transformed",c.diagnostics)}});return{topology:a,diagnostics:o,stages:t}}const Zu=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;function ep(e){const n=new Date(e);if(Number.isNaN(n.getTime()))return e;const t=r=>String(r).padStart(2,"0");return`${n.getUTCFullYear()}-${t(n.getUTCMonth()+1)}-${t(n.getUTCDate())} ${t(n.getUTCHours())}:${t(n.getUTCMinutes())}:${t(n.getUTCSeconds())} UTC`}const ye=document.querySelector("#app");ye.innerHTML=`
  <header>
    <p class="build-time" title="Build timestamp">Built ${ep("2026-07-16T20:26:40.491Z")}</p>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
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
      <div id="errors" class="errors" hidden></div>
    </section>
    <section class="view">
      <div class="graph-wrap">
        <h2>Graph</h2>
        <svg id="graph" viewBox="0 0 640 360" role="img" aria-label="Topology graph"></svg>
      </div>
      <div class="json-wrap">
        <h2>Transformed JSON</h2>
        <pre id="out"></pre>
      </div>
    </section>
  </main>
`;const Te=ye.querySelector("#src"),vi=ye.querySelector("#out"),Be=ye.querySelector("#status"),nt=ye.querySelector("#errors"),Aa=ye.querySelector("#graph"),np=ye.querySelector("#run"),tp=ye.querySelector("#validate");Te.value=Zu;function Ia(){Te.style.height="auto",Te.style.height=`${Te.scrollHeight}px`}function Ta(){nt.hidden=!0,nt.innerHTML="",Be.classList.remove("is-error")}function bi(e){if(!e.length){Ta();return}Be.classList.add("is-error"),nt.hidden=!1,nt.innerHTML=`
    <h2>Transform errors</h2>
    <ul>
      ${e.map(n=>`<li>${rp(n)}</li>`).join("")}
    </ul>
  `}function rp(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function ip(e){const n=Object.keys(e.nodes??{}),t=e.links??[],r=640,i=360,a=r/2,o=i/2,l=Math.min(r,i)*.32,c=new Map;n.forEach((m,_)=>{const y=2*Math.PI*_/Math.max(n.length,1)-Math.PI/2;c.set(m,{x:a+l*Math.cos(y),y:o+l*Math.sin(y)})});const u=t.flatMap(m=>{const _=m.interfaces??[];if(_.length<2)return[];const y=[];for(let d=0;d<_.length;d++)for(let h=d+1;h<_.length;h++){const w=c.get(String(_[d].node)),x=c.get(String(_[h].node));!w||!x||y.push(`<line x1="${w.x}" y1="${w.y}" x2="${x.x}" y2="${x.y}" class="edge"/>`)}return y}).join(""),f=n.map(m=>{var d,h;const _=c.get(m),y=String(((h=(d=e.nodes)==null?void 0:d[m])==null?void 0:h.device)??"");return`
        <g class="node">
          <circle cx="${_.x}" cy="${_.y}" r="28"/>
          <text x="${_.x}" y="${_.y-2}" text-anchor="middle">${m}</text>
          <text x="${_.x}" y="${_.y+14}" text-anchor="middle" class="sub">${y}</text>
        </g>`}).join("");Aa.innerHTML=`${u}${f}`}function Ea(){Be.textContent="Running…",Ta();try{const e=ze.load(Te.value);if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Topology must be a YAML object");const n=Qa(Te.value),{topology:t,diagnostics:r,stages:i}=Qu(n,{validate:tp.checked,yangDir:"/yang"});vi.textContent=JSON.stringify(t,null,2),ip(t);const a=r.list().filter(l=>l.severity==="error"),o=r.list().filter(l=>l.severity==="warning");a.length?(Be.textContent=`${a.length} error(s); stages: ${JSON.stringify(i)}`,bi(a.map(l=>{const c=l.path?` (${l.path})`:"";return`[${l.module}/${l.code}] ${l.message}${c}`}))):Be.textContent=o.length?`OK with ${o.length} warning(s) — stages: ${JSON.stringify(i)}`:`OK — stages: ${JSON.stringify(i)}`}catch(e){const n=e instanceof Error?e.message:String(e);Be.textContent="Transform failed",bi([n]),vi.textContent="",Aa.innerHTML=""}}Te.addEventListener("input",Ia);np.addEventListener("click",Ea);Ia();Ea();
