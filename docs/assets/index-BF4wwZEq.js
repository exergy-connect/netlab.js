var Ja=Object.defineProperty;var Xa=(e,n,t)=>n in e?Ja(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var y=(e,n,t)=>Xa(e,typeof n!="symbol"?n+"":n,t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Za(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var K={},Ln={},de={},br;function gn(){if(br)return de;br=1;function e(o){return typeof o>"u"||o===null}function n(o){return typeof o=="object"&&o!==null}function t(o){return Array.isArray(o)?o:e(o)?[]:[o]}function r(o,c){if(c){const l=Object.keys(c);for(let u=0,p=l.length;u<p;u+=1){const d=l[u];o[d]=c[d]}}return o}function i(o,c){let l="";for(let u=0;u<c;u+=1)l+=o;return l}function s(o){return o===0&&Number.NEGATIVE_INFINITY===1/o}return de.isNothing=e,de.isObject=n,de.toArray=t,de.repeat=i,de.isNegativeZero=s,de.extend=r,de}var vt,xr;function yn(){if(xr)return vt;xr=1;function e(t,r){let i="";const s=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(i+='in "'+t.mark.name+'" '),i+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!r&&t.mark.snippet&&(i+=`

`+t.mark.snippet),s+" "+i):s}function n(t,r){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=r,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.toString=function(r){return this.name+": "+e(this,r)},vt=n,vt}var bt,wr;function Qa(){if(wr)return bt;wr=1;const e=gn();function n(i,s,o,c,l){let u="",p="";const d=Math.floor(l/2)-1;return c-s>d&&(u=" ... ",s=c-d+u.length),o-c>d&&(p=" ...",o=c+d-p.length),{str:u+i.slice(s,o).replace(/\t/g,"→")+p,pos:c-s+u.length}}function t(i,s){return e.repeat(" ",s-i.length)+i}function r(i,s){if(s=Object.create(s||null),!i.buffer)return null;s.maxLength||(s.maxLength=79),typeof s.indent!="number"&&(s.indent=1),typeof s.linesBefore!="number"&&(s.linesBefore=3),typeof s.linesAfter!="number"&&(s.linesAfter=2);const o=/\r?\n|\r|\0/g,c=[0],l=[];let u,p=-1;for(;u=o.exec(i.buffer);)l.push(u.index),c.push(u.index+u[0].length),i.position<=u.index&&p<0&&(p=c.length-2);p<0&&(p=c.length-1);let d="";const h=Math.min(i.line+s.linesAfter,l.length).toString().length,g=s.maxLength-(s.indent+h+3);for(let _=1;_<=s.linesBefore&&!(p-_<0);_++){const w=n(i.buffer,c[p-_],l[p-_],i.position-(c[p]-c[p-_]),g);d=e.repeat(" ",s.indent)+t((i.line-_+1).toString(),h)+" | "+w.str+`
`+d}const m=n(i.buffer,c[p],l[p],i.position,g);d+=e.repeat(" ",s.indent)+t((i.line+1).toString(),h)+" | "+m.str+`
`,d+=e.repeat("-",s.indent+h+3+m.pos)+`^
`;for(let _=1;_<=s.linesAfter&&!(p+_>=l.length);_++){const w=n(i.buffer,c[p+_],l[p+_],i.position-(c[p]-c[p+_]),g);d+=e.repeat(" ",s.indent)+t((i.line+_+1).toString(),h)+" | "+w.str+`
`}return d.replace(/\n$/,"")}return bt=r,bt}var xt,Sr;function Z(){if(Sr)return xt;Sr=1;const e=yn(),n=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],t=["scalar","sequence","mapping"];function r(s){const o={};return s!==null&&Object.keys(s).forEach(function(c){s[c].forEach(function(l){o[String(l)]=c})}),o}function i(s,o){if(o=o||{},Object.keys(o).forEach(function(c){if(n.indexOf(c)===-1)throw new e('Unknown option "'+c+'" is met in definition of "'+s+'" YAML type.')}),this.options=o,this.tag=s,this.kind=o.kind||null,this.resolve=o.resolve||function(){return!0},this.construct=o.construct||function(c){return c},this.instanceOf=o.instanceOf||null,this.predicate=o.predicate||null,this.represent=o.represent||null,this.representName=o.representName||null,this.defaultStyle=o.defaultStyle||null,this.multi=o.multi||!1,this.styleAliases=r(o.styleAliases||null),t.indexOf(this.kind)===-1)throw new e('Unknown kind "'+this.kind+'" is specified for "'+s+'" YAML type.')}return xt=i,xt}var wt,Ar;function Ri(){if(Ar)return wt;Ar=1;const e=yn(),n=Z();function t(s,o){const c=[];return s[o].forEach(function(l){let u=c.length;c.forEach(function(p,d){p.tag===l.tag&&p.kind===l.kind&&p.multi===l.multi&&(u=d)}),c[u]=l}),c}function r(){const s={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(c){c.multi?(s.multi[c.kind].push(c),s.multi.fallback.push(c)):s[c.kind][c.tag]=s.fallback[c.tag]=c}for(let c=0,l=arguments.length;c<l;c+=1)arguments[c].forEach(o);return s}function i(s){return this.extend(s)}return i.prototype.extend=function(o){let c=[],l=[];if(o instanceof n)l.push(o);else if(Array.isArray(o))l=l.concat(o);else if(o&&(Array.isArray(o.implicit)||Array.isArray(o.explicit)))o.implicit&&(c=c.concat(o.implicit)),o.explicit&&(l=l.concat(o.explicit));else throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");c.forEach(function(p){if(!(p instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(p.loadKind&&p.loadKind!=="scalar")throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(p.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(p){if(!(p instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const u=Object.create(i.prototype);return u.implicit=(this.implicit||[]).concat(c),u.explicit=(this.explicit||[]).concat(l),u.compiledImplicit=t(u,"implicit"),u.compiledExplicit=t(u,"explicit"),u.compiledTypeMap=r(u.compiledImplicit,u.compiledExplicit),u},wt=i,wt}var St,Ir;function Pi(){if(Ir)return St;Ir=1;const e=Z();return St=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),St}var At,Tr;function Li(){if(Tr)return At;Tr=1;const e=Z();return At=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),At}var It,Er;function ji(){if(Er)return It;Er=1;const e=Z();return It=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),It}var Tt,kr;function Mi(){if(kr)return Tt;kr=1;const e=Ri();return Tt=new e({explicit:[Pi(),Li(),ji()]}),Tt}var Et,Nr;function Di(){if(Nr)return Et;Nr=1;const e=Z();function n(i){if(i===null)return!0;const s=i.length;return s===1&&i==="~"||s===4&&(i==="null"||i==="Null"||i==="NULL")}function t(){return null}function r(i){return i===null}return Et=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),Et}var kt,$r;function Fi(){if($r)return kt;$r=1;const e=Z();function n(i){if(i===null)return!1;const s=i.length;return s===4&&(i==="true"||i==="True"||i==="TRUE")||s===5&&(i==="false"||i==="False"||i==="FALSE")}function t(i){return i==="true"||i==="True"||i==="TRUE"}function r(i){return Object.prototype.toString.call(i)==="[object Boolean]"}return kt=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{lowercase:function(i){return i?"true":"false"},uppercase:function(i){return i?"TRUE":"FALSE"},camelcase:function(i){return i?"True":"False"}},defaultStyle:"lowercase"}),kt}var Nt,Cr;function Vi(){if(Cr)return Nt;Cr=1;const e=gn(),n=Z();function t(u){return u>=48&&u<=57||u>=65&&u<=70||u>=97&&u<=102}function r(u){return u>=48&&u<=55}function i(u){return u>=48&&u<=57}function s(u){if(u===null)return!1;const p=u.length;let d=0,h=!1;if(!p)return!1;let g=u[d];if((g==="-"||g==="+")&&(g=u[++d]),g==="0"){if(d+1===p)return!0;if(g=u[++d],g==="b"){for(d++;d<p;d++){if(g=u[d],g!=="0"&&g!=="1")return!1;h=!0}return h&&isFinite(o(u))}if(g==="x"){for(d++;d<p;d++){if(!t(u.charCodeAt(d)))return!1;h=!0}return h&&isFinite(o(u))}if(g==="o"){for(d++;d<p;d++){if(!r(u.charCodeAt(d)))return!1;h=!0}return h&&isFinite(o(u))}}for(;d<p;d++){if(!i(u.charCodeAt(d)))return!1;h=!0}return h?isFinite(o(u)):!1}function o(u){let p=u,d=1,h=p[0];if((h==="-"||h==="+")&&(h==="-"&&(d=-1),p=p.slice(1),h=p[0]),p==="0")return 0;if(h==="0"){if(p[1]==="b")return d*parseInt(p.slice(2),2);if(p[1]==="x")return d*parseInt(p.slice(2),16);if(p[1]==="o")return d*parseInt(p.slice(2),8)}return d*parseInt(p,10)}function c(u){return o(u)}function l(u){return Object.prototype.toString.call(u)==="[object Number]"&&u%1===0&&!e.isNegativeZero(u)}return Nt=new n("tag:yaml.org,2002:int",{kind:"scalar",resolve:s,construct:c,predicate:l,represent:{binary:function(u){return u>=0?"0b"+u.toString(2):"-0b"+u.toString(2).slice(1)},octal:function(u){return u>=0?"0o"+u.toString(8):"-0o"+u.toString(8).slice(1)},decimal:function(u){return u.toString(10)},hexadecimal:function(u){return u>=0?"0x"+u.toString(16).toUpperCase():"-0x"+u.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Nt}var $t,Or;function Yi(){if(Or)return $t;Or=1;const e=gn(),n=Z(),t=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),r=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i(u){return u===null||!t.test(u)?!1:isFinite(parseFloat(u,10))?!0:r.test(u)}function s(u){let p=u.toLowerCase();const d=p[0]==="-"?-1:1;return"+-".indexOf(p[0])>=0&&(p=p.slice(1)),p===".inf"?d===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:p===".nan"?NaN:d*parseFloat(p,10)}const o=/^[-+]?[0-9]+e/;function c(u,p){if(isNaN(u))switch(p){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===u)switch(p){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===u)switch(p){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(u))return"-0.0";const d=u.toString(10);return o.test(d)?d.replace("e",".e"):d}function l(u){return Object.prototype.toString.call(u)==="[object Number]"&&(u%1!==0||e.isNegativeZero(u))}return $t=new n("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:s,predicate:l,represent:c,defaultStyle:"lowercase"}),$t}var Ct,Rr;function Bi(){return Rr||(Rr=1,Ct=Mi().extend({implicit:[Di(),Fi(),Vi(),Yi()]})),Ct}var Ot,Pr;function Ui(){return Pr||(Pr=1,Ot=Bi()),Ot}var Rt,Lr;function qi(){if(Lr)return Rt;Lr=1;const e=Z(),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function r(o){return o===null?!1:n.exec(o)!==null||t.exec(o)!==null}function i(o){let c=0,l=null,u=n.exec(o);if(u===null&&(u=t.exec(o)),u===null)throw new Error("Date resolve error");const p=+u[1],d=+u[2]-1,h=+u[3];if(!u[4])return new Date(Date.UTC(p,d,h));const g=+u[4],m=+u[5],_=+u[6];if(u[7]){for(c=u[7].slice(0,3);c.length<3;)c+="0";c=+c}if(u[9]){const b=+u[10],T=+(u[11]||0);l=(b*60+T)*6e4,u[9]==="-"&&(l=-l)}const w=new Date(Date.UTC(p,d,h,g,m,_,c));return l&&w.setTime(w.getTime()-l),w}function s(o){return o.toISOString()}return Rt=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:r,construct:i,instanceOf:Date,represent:s}),Rt}var Pt,jr;function Gi(){if(jr)return Pt;jr=1;const e=Z();function n(t){return t==="<<"||t===null}return Pt=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:n}),Pt}var Lt,Mr;function zi(){if(Mr)return Lt;Mr=1;const e=Z(),n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function t(o){if(o===null)return!1;let c=0;const l=o.length,u=n;for(let p=0;p<l;p++){const d=u.indexOf(o.charAt(p));if(!(d>64)){if(d<0)return!1;c+=6}}return c%8===0}function r(o){const c=o.replace(/[\r\n=]/g,""),l=c.length,u=n;let p=0;const d=[];for(let g=0;g<l;g++)g%4===0&&g&&(d.push(p>>16&255),d.push(p>>8&255),d.push(p&255)),p=p<<6|u.indexOf(c.charAt(g));const h=l%4*6;return h===0?(d.push(p>>16&255),d.push(p>>8&255),d.push(p&255)):h===18?(d.push(p>>10&255),d.push(p>>2&255)):h===12&&d.push(p>>4&255),new Uint8Array(d)}function i(o){let c="",l=0;const u=o.length,p=n;for(let h=0;h<u;h++)h%3===0&&h&&(c+=p[l>>18&63],c+=p[l>>12&63],c+=p[l>>6&63],c+=p[l&63]),l=(l<<8)+o[h];const d=u%3;return d===0?(c+=p[l>>18&63],c+=p[l>>12&63],c+=p[l>>6&63],c+=p[l&63]):d===2?(c+=p[l>>10&63],c+=p[l>>4&63],c+=p[l<<2&63],c+=p[64]):d===1&&(c+=p[l>>2&63],c+=p[l<<4&63],c+=p[64],c+=p[64]),c}function s(o){return Object.prototype.toString.call(o)==="[object Uint8Array]"}return Lt=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:t,construct:r,predicate:s,represent:i}),Lt}var jt,Dr;function Ki(){if(Dr)return jt;Dr=1;const e=Z(),n=Object.prototype.hasOwnProperty,t=Object.prototype.toString;function r(s){if(s===null)return!0;const o=[],c=s;for(let l=0,u=c.length;l<u;l+=1){const p=c[l];let d=!1;if(t.call(p)!=="[object Object]")return!1;let h;for(h in p)if(n.call(p,h))if(!d)d=!0;else return!1;if(!d)return!1;if(o.indexOf(h)===-1)o.push(h);else return!1}return!0}function i(s){return s!==null?s:[]}return jt=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:r,construct:i}),jt}var Mt,Fr;function Hi(){if(Fr)return Mt;Fr=1;const e=Z(),n=Object.prototype.toString;function t(i){if(i===null)return!0;const s=i,o=new Array(s.length);for(let c=0,l=s.length;c<l;c+=1){const u=s[c];if(n.call(u)!=="[object Object]")return!1;const p=Object.keys(u);if(p.length!==1)return!1;o[c]=[p[0],u[p[0]]]}return!0}function r(i){if(i===null)return[];const s=i,o=new Array(s.length);for(let c=0,l=s.length;c<l;c+=1){const u=s[c],p=Object.keys(u);o[c]=[p[0],u[p[0]]]}return o}return Mt=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:t,construct:r}),Mt}var Dt,Vr;function Wi(){if(Vr)return Dt;Vr=1;const e=Z(),n=Object.prototype.hasOwnProperty;function t(i){if(i===null)return!0;const s=i;for(const o in s)if(n.call(s,o)&&s[o]!==null)return!1;return!0}function r(i){return i!==null?i:{}}return Dt=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:t,construct:r}),Dt}var Ft,Yr;function nr(){return Yr||(Yr=1,Ft=Ui().extend({implicit:[qi(),Gi()],explicit:[zi(),Ki(),Hi(),Wi()]})),Ft}var Br;function eo(){if(Br)return Ln;Br=1;const e=gn(),n=yn(),t=Qa(),r=nr(),i=Object.prototype.hasOwnProperty,s=1,o=2,c=3,l=4,u=1,p=2,d=3,h=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/[\x85\u2028\u2029]/,m=/[,\[\]{}]/,_=/^(?:!|!!|![0-9A-Za-z-]+!)$/,w=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function b(a){return Object.prototype.toString.call(a)}function T(a){return a===10||a===13}function N(a){return a===9||a===32}function M(a){return a===9||a===32||a===10||a===13}function Y(a){return a===44||a===91||a===93||a===123||a===125}function G(a){if(a>=48&&a<=57)return a-48;const v=a|32;return v>=97&&v<=102?v-97+10:-1}function H(a){return a===120?2:a===117?4:a===85?8:0}function wn(a){return a>=48&&a<=57?a-48:-1}function Xe(a){switch(a){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function ft(a){return a<=65535?String.fromCharCode(a):String.fromCharCode((a-65536>>10)+55296,(a-65536&1023)+56320)}function Ze(a,v,A){v==="__proto__"?Object.defineProperty(a,v,{configurable:!0,enumerable:!0,writable:!0,value:A}):a[v]=A}const Sn=new Array(256),Qe=new Array(256);for(let a=0;a<256;a++)Sn[a]=Xe(a)?1:0,Qe[a]=Xe(a);function z(a,v){this.input=a,this.filename=v.filename||null,this.schema=v.schema||r,this.onWarning=v.onWarning||null,this.legacy=v.legacy||!1,this.json=v.json||!1,this.listener=v.listener||null,this.maxDepth=typeof v.maxDepth=="number"?v.maxDepth:100,this.maxTotalMergeKeys=typeof v.maxTotalMergeKeys=="number"?v.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=a.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function An(a,v){const A={name:a.filename,buffer:a.input.slice(0,-1),position:a.position,line:a.line,column:a.position-a.lineStart};return A.snippet=t(A),new n(v,A)}function j(a,v){throw An(a,v)}function De(a,v){a.onWarning&&a.onWarning.call(null,An(a,v))}function te(a,v,A){const k=a.anchorMapTransactions;if(k.length!==0){const S=k[k.length-1];i.call(S,v)||(S[v]={existed:i.call(a.anchorMap,v),value:a.anchorMap[v]})}a.anchorMap[v]=A}function dt(a){a.anchorMapTransactions.push(Object.create(null))}function we(a){const v=a.anchorMapTransactions.pop(),A=a.anchorMapTransactions;if(A.length===0)return;const k=A[A.length-1],S=Object.keys(v);for(let R=0,f=S.length;R<f;R+=1){const x=S[R];i.call(k,x)||(k[x]=v[x])}}function mt(a){const v=a.anchorMapTransactions.pop(),A=Object.keys(v);for(let k=A.length-1;k>=0;k-=1){const S=v[A[k]];S.existed?a.anchorMap[A[k]]=S.value:delete a.anchorMap[A[k]]}}function en(a){return{position:a.position,line:a.line,lineStart:a.lineStart,lineIndent:a.lineIndent,firstTabInLine:a.firstTabInLine,tag:a.tag,anchor:a.anchor,kind:a.kind,result:a.result}}function Fe(a,v){a.position=v.position,a.line=v.line,a.lineStart=v.lineStart,a.lineIndent=v.lineIndent,a.firstTabInLine=v.firstTabInLine,a.tag=v.tag,a.anchor=v.anchor,a.kind=v.kind,a.result=v.result}const In={YAML:function(v,A,k){v.version!==null&&j(v,"duplication of %YAML directive"),k.length!==1&&j(v,"YAML directive accepts exactly one argument");const S=/^([0-9]+)\.([0-9]+)$/.exec(k[0]);S===null&&j(v,"ill-formed argument of the YAML directive");const R=parseInt(S[1],10),f=parseInt(S[2],10);R!==1&&j(v,"unacceptable YAML version of the document"),v.version=k[0],v.checkLineBreaks=f<2,f!==1&&f!==2&&De(v,"unsupported YAML version of the document")},TAG:function(v,A,k){let S;k.length!==2&&j(v,"TAG directive accepts exactly two arguments");const R=k[0];S=k[1],_.test(R)||j(v,"ill-formed tag handle (first argument) of the TAG directive"),i.call(v.tagMap,R)&&j(v,'there is a previously declared suffix for "'+R+'" tag handle'),w.test(S)||j(v,"ill-formed tag prefix (second argument) of the TAG directive");try{S=decodeURIComponent(S)}catch{j(v,"tag prefix is malformed: "+S)}v.tagMap[R]=S}};function Q(a,v,A,k){if(v<A){const S=a.input.slice(v,A);if(k)for(let R=0,f=S.length;R<f;R+=1){const x=S.charCodeAt(R);x===9||x>=32&&x<=1114111||j(a,"expected valid JSON character")}else h.test(S)&&j(a,"the stream contains non-printable characters");a.result+=S}}function fe(a,v,A,k){e.isObject(A)||j(a,"cannot merge mappings; the provided source object is unacceptable");const S=Object.keys(A);for(let R=0,f=S.length;R<f;R+=1){const x=S[R];a.maxTotalMergeKeys!==-1&&++a.totalMergeKeys>a.maxTotalMergeKeys&&j(a,"merge keys exceeded maxTotalMergeKeys ("+a.maxTotalMergeKeys+")"),i.call(v,x)||(Ze(v,x,A[x]),k[x]=!0)}}function re(a,v,A,k,S,R,f,x,C){if(Array.isArray(S)){S=Array.prototype.slice.call(S);for(let I=0,E=S.length;I<E;I+=1)Array.isArray(S[I])&&j(a,"nested arrays are not supported inside keys"),typeof S=="object"&&b(S[I])==="[object Object]"&&(S[I]="[object Object]")}if(typeof S=="object"&&b(S)==="[object Object]"&&(S="[object Object]"),S=String(S),v===null&&(v={}),k==="tag:yaml.org,2002:merge")if(Array.isArray(R))for(let I=0,E=R.length;I<E;I+=1)fe(a,v,R[I],A);else fe(a,v,R,A);else!a.json&&!i.call(A,S)&&i.call(v,S)&&(a.line=f||a.line,a.lineStart=x||a.lineStart,a.position=C||a.position,j(a,"duplicated mapping key")),Ze(v,S,R),delete A[S];return v}function Ve(a){const v=a.input.charCodeAt(a.position);v===10?a.position++:v===13?(a.position++,a.input.charCodeAt(a.position)===10&&a.position++):j(a,"a line break is expected"),a.line+=1,a.lineStart=a.position,a.firstTabInLine=-1}function q(a,v,A){let k=0,S=a.input.charCodeAt(a.position);for(;S!==0;){for(;N(S);)S===9&&a.firstTabInLine===-1&&(a.firstTabInLine=a.position),S=a.input.charCodeAt(++a.position);if(v&&S===35)do S=a.input.charCodeAt(++a.position);while(S!==10&&S!==13&&S!==0);if(T(S))for(Ve(a),S=a.input.charCodeAt(a.position),k++,a.lineIndent=0;S===32;)a.lineIndent++,S=a.input.charCodeAt(++a.position);else break}return A!==-1&&k!==0&&a.lineIndent<A&&De(a,"deficient indentation"),k}function Ye(a){let v=a.position,A=a.input.charCodeAt(v);return!!((A===45||A===46)&&A===a.input.charCodeAt(v+1)&&A===a.input.charCodeAt(v+2)&&(v+=3,A=a.input.charCodeAt(v),A===0||M(A)))}function ie(a,v){v===1?a.result+=" ":v>1&&(a.result+=e.repeat(`
`,v-1))}function Tn(a,v,A){let k,S,R,f,x,C;const I=a.kind,E=a.result;let O=a.input.charCodeAt(a.position);if(M(O)||Y(O)||O===35||O===38||O===42||O===33||O===124||O===62||O===39||O===34||O===37||O===64||O===96)return!1;if(O===63||O===45){const $=a.input.charCodeAt(a.position+1);if(M($)||A&&Y($))return!1}for(a.kind="scalar",a.result="",k=S=a.position,R=!1;O!==0;){if(O===58){const $=a.input.charCodeAt(a.position+1);if(M($)||A&&Y($))break}else if(O===35){const $=a.input.charCodeAt(a.position-1);if(M($))break}else{if(a.position===a.lineStart&&Ye(a)||A&&Y(O))break;if(T(O))if(f=a.line,x=a.lineStart,C=a.lineIndent,q(a,!1,-1),a.lineIndent>=v){R=!0,O=a.input.charCodeAt(a.position);continue}else{a.position=S,a.line=f,a.lineStart=x,a.lineIndent=C;break}}R&&(Q(a,k,S,!1),ie(a,a.line-f),k=S=a.position,R=!1),N(O)||(S=a.position+1),O=a.input.charCodeAt(++a.position)}return Q(a,k,S,!1),a.result?!0:(a.kind=I,a.result=E,!1)}function En(a,v){let A,k,S=a.input.charCodeAt(a.position);if(S!==39)return!1;for(a.kind="scalar",a.result="",a.position++,A=k=a.position;(S=a.input.charCodeAt(a.position))!==0;)if(S===39)if(Q(a,A,a.position,!0),S=a.input.charCodeAt(++a.position),S===39)A=a.position,a.position++,k=a.position;else return!0;else T(S)?(Q(a,A,k,!0),ie(a,q(a,!1,v)),A=k=a.position):a.position===a.lineStart&&Ye(a)?j(a,"unexpected end of the document within a single quoted scalar"):(a.position++,N(S)||(k=a.position));j(a,"unexpected end of the stream within a single quoted scalar")}function nn(a,v){let A,k,S,R=a.input.charCodeAt(a.position);if(R!==34)return!1;for(a.kind="scalar",a.result="",a.position++,A=k=a.position;(R=a.input.charCodeAt(a.position))!==0;){if(R===34)return Q(a,A,a.position,!0),a.position++,!0;if(R===92){if(Q(a,A,a.position,!0),R=a.input.charCodeAt(++a.position),T(R))q(a,!1,v);else if(R<256&&Sn[R])a.result+=Qe[R],a.position++;else if((S=H(R))>0){let f=S,x=0;for(;f>0;f--)R=a.input.charCodeAt(++a.position),(S=G(R))>=0?x=(x<<4)+S:j(a,"expected hexadecimal character");a.result+=ft(x),a.position++}else j(a,"unknown escape sequence");A=k=a.position}else T(R)?(Q(a,A,k,!0),ie(a,q(a,!1,v)),A=k=a.position):a.position===a.lineStart&&Ye(a)?j(a,"unexpected end of the document within a double quoted scalar"):(a.position++,N(R)||(k=a.position))}j(a,"unexpected end of the stream within a double quoted scalar")}function kn(a,v){let A=!0,k,S,R;const f=a.tag;let x;const C=a.anchor;let I,E,O,$;const L=Object.create(null);let P,D,F,V=a.input.charCodeAt(a.position);if(V===91)I=93,$=!1,x=[];else if(V===123)I=125,$=!0,x={};else return!1;for(a.anchor!==null&&te(a,a.anchor,x),V=a.input.charCodeAt(++a.position);V!==0;){if(q(a,!0,v),V=a.input.charCodeAt(a.position),V===I)return a.position++,a.tag=f,a.anchor=C,a.kind=$?"mapping":"sequence",a.result=x,!0;if(A?V===44&&j(a,"expected the node content, but found ','"):j(a,"missed comma between flow collection entries"),D=P=F=null,E=O=!1,V===63){const B=a.input.charCodeAt(a.position+1);M(B)&&(E=O=!0,a.position++,q(a,!0,v))}k=a.line,S=a.lineStart,R=a.position,ae(a,v,s,!1,!0),D=a.tag,P=a.result,q(a,!0,v),V=a.input.charCodeAt(a.position),(O||a.line===k)&&V===58&&(E=!0,V=a.input.charCodeAt(++a.position),q(a,!0,v),ae(a,v,s,!1,!0),F=a.result),$?re(a,x,L,D,P,F,k,S,R):E?x.push(re(a,null,L,D,P,F,k,S,R)):x.push(P),q(a,!0,v),V=a.input.charCodeAt(a.position),V===44?(A=!0,V=a.input.charCodeAt(++a.position)):A=!1}j(a,"unexpected end of the stream within a flow collection")}function Nn(a,v){let A,k=u,S=!1,R=!1,f=v,x=0,C=!1,I,E=a.input.charCodeAt(a.position);if(E===124)A=!1;else if(E===62)A=!0;else return!1;for(a.kind="scalar",a.result="";E!==0;)if(E=a.input.charCodeAt(++a.position),E===43||E===45)u===k?k=E===43?d:p:j(a,"repeat of a chomping mode identifier");else if((I=wn(E))>=0)I===0?j(a,"bad explicit indentation width of a block scalar; it cannot be less than one"):R?j(a,"repeat of an indentation width identifier"):(f=v+I-1,R=!0);else break;if(N(E)){do E=a.input.charCodeAt(++a.position);while(N(E));if(E===35)do E=a.input.charCodeAt(++a.position);while(!T(E)&&E!==0)}for(;E!==0;){for(Ve(a),a.lineIndent=0,E=a.input.charCodeAt(a.position);(!R||a.lineIndent<f)&&E===32;)a.lineIndent++,E=a.input.charCodeAt(++a.position);if(!R&&a.lineIndent>f&&(f=a.lineIndent),T(E)){x++;continue}if(!R&&f===0&&j(a,"missing indentation for block scalar"),a.lineIndent<f){k===d?a.result+=e.repeat(`
`,S?1+x:x):k===u&&S&&(a.result+=`
`);break}A?N(E)?(C=!0,a.result+=e.repeat(`
`,S?1+x:x)):C?(C=!1,a.result+=e.repeat(`
`,x+1)):x===0?S&&(a.result+=" "):a.result+=e.repeat(`
`,x):a.result+=e.repeat(`
`,S?1+x:x),S=!0,R=!0,x=0;const O=a.position;for(;!T(E)&&E!==0;)E=a.input.charCodeAt(++a.position);Q(a,O,a.position,!1)}return!0}function se(a,v){const A=a.tag,k=a.anchor,S=[];let R=!1;if(a.firstTabInLine!==-1)return!1;a.anchor!==null&&te(a,a.anchor,S);let f=a.input.charCodeAt(a.position);for(;f!==0&&(a.firstTabInLine!==-1&&(a.position=a.firstTabInLine,j(a,"tab characters must not be used in indentation")),f===45);){const x=a.input.charCodeAt(a.position+1);if(!M(x))break;if(R=!0,a.position++,q(a,!0,-1)&&a.lineIndent<=v){S.push(null),f=a.input.charCodeAt(a.position);continue}const C=a.line;if(ae(a,v,c,!1,!0),S.push(a.result),q(a,!0,-1),f=a.input.charCodeAt(a.position),(a.line===C||a.lineIndent>v)&&f!==0)j(a,"bad indentation of a sequence entry");else if(a.lineIndent<v)break}return R?(a.tag=A,a.anchor=k,a.kind="sequence",a.result=S,!0):!1}function $n(a,v,A){let k,S,R,f;const x=a.tag,C=a.anchor,I={},E=Object.create(null);let O=null,$=null,L=null,P=!1,D=!1;if(a.firstTabInLine!==-1)return!1;a.anchor!==null&&te(a,a.anchor,I);let F=a.input.charCodeAt(a.position);for(;F!==0;){!P&&a.firstTabInLine!==-1&&(a.position=a.firstTabInLine,j(a,"tab characters must not be used in indentation"));const V=a.input.charCodeAt(a.position+1),B=a.line;if((F===63||F===58)&&M(V))F===63?(P&&(re(a,I,E,O,$,null,S,R,f),O=$=L=null),D=!0,P=!0,k=!0):P?(P=!1,k=!0):j(a,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),a.position+=1,F=V;else{if(S=a.line,R=a.lineStart,f=a.position,!ae(a,A,o,!1,!0))break;if(a.line===B){for(F=a.input.charCodeAt(a.position);N(F);)F=a.input.charCodeAt(++a.position);if(F===58)F=a.input.charCodeAt(++a.position),M(F)||j(a,"a whitespace character is expected after the key-value separator within a block mapping"),P&&(re(a,I,E,O,$,null,S,R,f),O=$=L=null),D=!0,P=!1,k=!1,O=a.tag,$=a.result;else if(D)j(a,"can not read an implicit mapping pair; a colon is missed");else return a.tag=x,a.anchor=C,!0}else if(D)j(a,"can not read a block mapping entry; a multiline key may not be an implicit key");else return a.tag=x,a.anchor=C,!0}if((a.line===B||a.lineIndent>v)&&(P&&(S=a.line,R=a.lineStart,f=a.position),ae(a,v,l,!0,k)&&(P?$=a.result:L=a.result),P||(re(a,I,E,O,$,L,S,R,f),O=$=L=null),q(a,!0,-1),F=a.input.charCodeAt(a.position)),(a.line===B||a.lineIndent>v)&&F!==0)j(a,"bad indentation of a mapping entry");else if(a.lineIndent<v)break}return P&&re(a,I,E,O,$,null,S,R,f),D&&(a.tag=x,a.anchor=C,a.kind="mapping",a.result=I),D}function ht(a){let v=!1,A=!1,k,S,R=a.input.charCodeAt(a.position);if(R!==33)return!1;a.tag!==null&&j(a,"duplication of a tag property"),R=a.input.charCodeAt(++a.position),R===60?(v=!0,R=a.input.charCodeAt(++a.position)):R===33?(A=!0,k="!!",R=a.input.charCodeAt(++a.position)):k="!";let f=a.position;if(v){do R=a.input.charCodeAt(++a.position);while(R!==0&&R!==62);a.position<a.length?(S=a.input.slice(f,a.position),R=a.input.charCodeAt(++a.position)):j(a,"unexpected end of the stream within a verbatim tag")}else{for(;R!==0&&!M(R);)R===33&&(A?j(a,"tag suffix cannot contain exclamation marks"):(k=a.input.slice(f-1,a.position+1),_.test(k)||j(a,"named tag handle cannot contain such characters"),A=!0,f=a.position+1)),R=a.input.charCodeAt(++a.position);S=a.input.slice(f,a.position),m.test(S)&&j(a,"tag suffix cannot contain flow indicator characters")}S&&!w.test(S)&&j(a,"tag name cannot contain such characters: "+S);try{S=decodeURIComponent(S)}catch{j(a,"tag name is malformed: "+S)}return v?a.tag=S:i.call(a.tagMap,k)?a.tag=a.tagMap[k]+S:k==="!"?a.tag="!"+S:k==="!!"?a.tag="tag:yaml.org,2002:"+S:j(a,'undeclared tag handle "'+k+'"'),!0}function Cn(a){let v=a.input.charCodeAt(a.position);if(v!==38)return!1;a.anchor!==null&&j(a,"duplication of an anchor property"),v=a.input.charCodeAt(++a.position);const A=a.position;for(;v!==0&&!M(v)&&!Y(v);)v=a.input.charCodeAt(++a.position);return a.position===A&&j(a,"name of an anchor node must contain at least one character"),a.anchor=a.input.slice(A,a.position),!0}function On(a){let v=a.input.charCodeAt(a.position);if(v!==42)return!1;v=a.input.charCodeAt(++a.position);const A=a.position;for(;v!==0&&!M(v)&&!Y(v);)v=a.input.charCodeAt(++a.position);a.position===A&&j(a,"name of an alias node must contain at least one character");const k=a.input.slice(A,a.position);return i.call(a.anchorMap,k)||j(a,'unidentified alias "'+k+'"'),a.result=a.anchorMap[k],q(a,!0,-1),!0}function _t(a,v,A,k){const S=en(a);return dt(a),Fe(a,v),a.tag=null,a.anchor=null,a.kind=null,a.result=null,$n(a,A,k)&&a.kind==="mapping"?(we(a),!0):(mt(a),Fe(a,S),!1)}function ae(a,v,A,k,S){let R,f,x=1,C=!1,I=!1,E=null,O,$,L;a.depth>=a.maxDepth&&j(a,"nesting exceeded maxDepth ("+a.maxDepth+")"),a.depth+=1,a.listener!==null&&a.listener("open",a),a.tag=null,a.anchor=null,a.kind=null,a.result=null;const P=R=f=l===A||c===A;if(k&&q(a,!0,-1)&&(C=!0,a.lineIndent>v?x=1:a.lineIndent===v?x=0:a.lineIndent<v&&(x=-1)),x===1)for(;;){const D=a.input.charCodeAt(a.position),F=en(a);if(C&&(D===33&&a.tag!==null||D===38&&a.anchor!==null)||!ht(a)&&!Cn(a))break;E===null&&(E=F),q(a,!0,-1)?(C=!0,f=P,a.lineIndent>v?x=1:a.lineIndent===v?x=0:a.lineIndent<v&&(x=-1)):f=!1}if(f&&(f=C||S),x===1||l===A)if(s===A||o===A?$=v:$=v+1,L=a.position-a.lineStart,x===1)if(f&&(se(a,L)||$n(a,L,$))||kn(a,$))I=!0;else{const D=a.input.charCodeAt(a.position);E!==null&&P&&!f&&D!==124&&D!==62&&_t(a,E,E.position-E.lineStart,$)||R&&Nn(a,$)||En(a,$)||nn(a,$)?I=!0:On(a)?(I=!0,(a.tag!==null||a.anchor!==null)&&j(a,"alias node should not have any properties")):Tn(a,$,s===A)&&(I=!0,a.tag===null&&(a.tag="?")),a.anchor!==null&&te(a,a.anchor,a.result)}else x===0&&(I=f&&se(a,L));if(a.tag===null)a.anchor!==null&&te(a,a.anchor,a.result);else if(a.tag==="?"){a.result!==null&&a.kind!=="scalar"&&j(a,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+a.kind+'"');for(let D=0,F=a.implicitTypes.length;D<F;D+=1)if(O=a.implicitTypes[D],O.resolve(a.result)){a.result=O.construct(a.result),a.tag=O.tag,a.anchor!==null&&te(a,a.anchor,a.result);break}}else if(a.tag!=="!"){if(i.call(a.typeMap[a.kind||"fallback"],a.tag))O=a.typeMap[a.kind||"fallback"][a.tag];else{O=null;const D=a.typeMap.multi[a.kind||"fallback"];for(let F=0,V=D.length;F<V;F+=1)if(a.tag.slice(0,D[F].tag.length)===D[F].tag){O=D[F];break}}O||j(a,"unknown tag !<"+a.tag+">"),a.result!==null&&O.kind!==a.kind&&j(a,"unacceptable node kind for !<"+a.tag+'> tag; it should be "'+O.kind+'", not "'+a.kind+'"'),O.resolve(a.result,a.tag)?(a.result=O.construct(a.result,a.tag),a.anchor!==null&&te(a,a.anchor,a.result)):j(a,"cannot resolve a node with !<"+a.tag+"> explicit tag")}return a.listener!==null&&a.listener("close",a),a.depth-=1,a.tag!==null||a.anchor!==null||I}function gt(a){const v=a.position;let A=!1,k;for(a.version=null,a.checkLineBreaks=a.legacy,a.tagMap=Object.create(null),a.anchorMap=Object.create(null);(k=a.input.charCodeAt(a.position))!==0&&(q(a,!0,-1),k=a.input.charCodeAt(a.position),!(a.lineIndent>0||k!==37));){A=!0,k=a.input.charCodeAt(++a.position);let S=a.position;for(;k!==0&&!M(k);)k=a.input.charCodeAt(++a.position);const R=a.input.slice(S,a.position),f=[];for(R.length<1&&j(a,"directive name must not be less than one character in length");k!==0;){for(;N(k);)k=a.input.charCodeAt(++a.position);if(k===35){do k=a.input.charCodeAt(++a.position);while(k!==0&&!T(k));break}if(T(k))break;for(S=a.position;k!==0&&!M(k);)k=a.input.charCodeAt(++a.position);f.push(a.input.slice(S,a.position))}k!==0&&Ve(a),i.call(In,R)?In[R](a,R,f):De(a,'unknown document directive "'+R+'"')}if(q(a,!0,-1),a.lineIndent===0&&a.input.charCodeAt(a.position)===45&&a.input.charCodeAt(a.position+1)===45&&a.input.charCodeAt(a.position+2)===45?(a.position+=3,q(a,!0,-1)):A&&j(a,"directives end mark is expected"),ae(a,a.lineIndent-1,l,!1,!0),q(a,!0,-1),a.checkLineBreaks&&g.test(a.input.slice(v,a.position))&&De(a,"non-ASCII line breaks are interpreted as content"),a.documents.push(a.result),a.position===a.lineStart&&Ye(a)){a.input.charCodeAt(a.position)===46&&(a.position+=3,q(a,!0,-1));return}a.position<a.length-1&&j(a,"end of the stream or a document separator is expected")}function Rn(a,v){a=String(a),v=v||{},a.length!==0&&(a.charCodeAt(a.length-1)!==10&&a.charCodeAt(a.length-1)!==13&&(a+=`
`),a.charCodeAt(0)===65279&&(a=a.slice(1)));const A=new z(a,v),k=a.indexOf("\0");for(k!==-1&&(A.position=k,j(A,"null byte is not allowed in input")),A.input+="\0";A.input.charCodeAt(A.position)===32;)A.lineIndent+=1,A.position+=1;for(;A.position<A.length-1;)gt(A);return A.documents}function Pn(a,v,A){v!==null&&typeof v=="object"&&typeof A>"u"&&(A=v,v=null);const k=Rn(a,A);if(typeof v!="function")return k;for(let S=0,R=k.length;S<R;S+=1)v(k[S])}function yt(a,v){const A=Rn(a,v);if(A.length!==0){if(A.length===1)return A[0];throw new n("expected a single document in the stream, but found more")}}return Ln.loadAll=Pn,Ln.load=yt,Ln}var Vt={},Ur;function no(){if(Ur)return Vt;Ur=1;const e=gn(),n=yn(),t=nr(),r=Object.prototype.toString,i=Object.prototype.hasOwnProperty,s=65279,o=9,c=10,l=13,u=32,p=33,d=34,h=35,g=37,m=38,_=39,w=42,b=44,T=45,N=58,M=61,Y=62,G=63,H=64,wn=91,Xe=93,ft=96,Ze=123,Sn=124,Qe=125,z={};z[0]="\\0",z[7]="\\a",z[8]="\\b",z[9]="\\t",z[10]="\\n",z[11]="\\v",z[12]="\\f",z[13]="\\r",z[27]="\\e",z[34]='\\"',z[92]="\\\\",z[133]="\\N",z[160]="\\_",z[8232]="\\L",z[8233]="\\P";const An=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],j=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function De(f,x){if(x===null)return{};const C={},I=Object.keys(x);for(let E=0,O=I.length;E<O;E+=1){let $=I[E],L=String(x[$]);$.slice(0,2)==="!!"&&($="tag:yaml.org,2002:"+$.slice(2));const P=f.compiledTypeMap.fallback[$];P&&i.call(P.styleAliases,L)&&(L=P.styleAliases[L]),C[$]=L}return C}function te(f){let x,C;const I=f.toString(16).toUpperCase();if(f<=255)x="x",C=2;else if(f<=65535)x="u",C=4;else if(f<=4294967295)x="U",C=8;else throw new n("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+x+e.repeat("0",C-I.length)+I}const dt=1,we=2;function mt(f){this.schema=f.schema||t,this.indent=Math.max(1,f.indent||2),this.noArrayIndent=f.noArrayIndent||!1,this.skipInvalid=f.skipInvalid||!1,this.flowLevel=e.isNothing(f.flowLevel)?-1:f.flowLevel,this.styleMap=De(this.schema,f.styles||null),this.sortKeys=f.sortKeys||!1,this.lineWidth=f.lineWidth||80,this.noRefs=f.noRefs||!1,this.noCompatMode=f.noCompatMode||!1,this.condenseFlow=f.condenseFlow||!1,this.quotingType=f.quotingType==='"'?we:dt,this.forceQuotes=f.forceQuotes||!1,this.replacer=typeof f.replacer=="function"?f.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function en(f,x){const C=e.repeat(" ",x);let I=0,E="";const O=f.length;for(;I<O;){let $;const L=f.indexOf(`
`,I);L===-1?($=f.slice(I),I=O):($=f.slice(I,L+1),I=L+1),$.length&&$!==`
`&&(E+=C),E+=$}return E}function Fe(f,x){return`
`+e.repeat(" ",f.indent*x)}function In(f,x){for(let C=0,I=f.implicitTypes.length;C<I;C+=1)if(f.implicitTypes[C].resolve(x))return!0;return!1}function Q(f){return f===u||f===o}function fe(f){return f>=32&&f<=126||f>=161&&f<=55295&&f!==8232&&f!==8233||f>=57344&&f<=65533&&f!==s||f>=65536&&f<=1114111}function re(f){return fe(f)&&f!==s&&f!==l&&f!==c}function Ve(f,x,C){const I=re(f),E=I&&!Q(f);return(C?I:I&&f!==b&&f!==wn&&f!==Xe&&f!==Ze&&f!==Qe)&&f!==h&&!(x===N&&!E)||re(x)&&!Q(x)&&f===h||x===N&&E}function q(f){return fe(f)&&f!==s&&!Q(f)&&f!==T&&f!==G&&f!==N&&f!==b&&f!==wn&&f!==Xe&&f!==Ze&&f!==Qe&&f!==h&&f!==m&&f!==w&&f!==p&&f!==Sn&&f!==M&&f!==Y&&f!==_&&f!==d&&f!==g&&f!==H&&f!==ft}function Ye(f){return!Q(f)&&f!==N}function ie(f,x){const C=f.charCodeAt(x);let I;return C>=55296&&C<=56319&&x+1<f.length&&(I=f.charCodeAt(x+1),I>=56320&&I<=57343)?(C-55296)*1024+I-56320+65536:C}function Tn(f){return/^\n* /.test(f)}const En=1,nn=2,kn=3,Nn=4,se=5;function $n(f,x,C,I,E,O,$,L){let P,D=0,F=null,V=!1,B=!1;const vr=I!==-1;let tn=-1,rn=q(ie(f,0))&&Ye(ie(f,f.length-1));if(x||$)for(P=0;P<f.length;D>=65536?P+=2:P++){if(D=ie(f,P),!fe(D))return se;rn=rn&&Ve(D,F,L),F=D}else{for(P=0;P<f.length;D>=65536?P+=2:P++){if(D=ie(f,P),D===c)V=!0,vr&&(B=B||P-tn-1>I&&f[tn+1]!==" ",tn=P);else if(!fe(D))return se;rn=rn&&Ve(D,F,L),F=D}B=B||vr&&P-tn-1>I&&f[tn+1]!==" "}return!V&&!B?rn&&!$&&!E(f)?En:O===we?se:nn:C>9&&Tn(f)?se:$?O===we?se:nn:B?Nn:kn}function ht(f,x,C,I,E){f.dump=(function(){if(x.length===0)return f.quotingType===we?'""':"''";if(!f.noCompatMode&&(An.indexOf(x)!==-1||j.test(x)))return f.quotingType===we?'"'+x+'"':"'"+x+"'";const O=f.indent*Math.max(1,C),$=f.lineWidth===-1?-1:Math.max(Math.min(f.lineWidth,40),f.lineWidth-O),L=I||f.flowLevel>-1&&C>=f.flowLevel;function P(D){return In(f,D)}switch($n(x,L,f.indent,$,P,f.quotingType,f.forceQuotes&&!I,E)){case En:return x;case nn:return"'"+x.replace(/'/g,"''")+"'";case kn:return"|"+Cn(x,f.indent)+On(en(x,O));case Nn:return">"+Cn(x,f.indent)+On(en(_t(x,$),O));case se:return'"'+gt(x)+'"';default:throw new n("impossible error: invalid scalar style")}})()}function Cn(f,x){const C=Tn(f)?String(x):"",I=f[f.length-1]===`
`,O=I&&(f[f.length-2]===`
`||f===`
`)?"+":I?"":"-";return C+O+`
`}function On(f){return f[f.length-1]===`
`?f.slice(0,-1):f}function _t(f,x){const C=/(\n+)([^\n]*)/g;let I=(function(){let L=f.indexOf(`
`);return L=L!==-1?L:f.length,C.lastIndex=L,ae(f.slice(0,L),x)})(),E=f[0]===`
`||f[0]===" ",O,$;for(;$=C.exec(f);){const L=$[1],P=$[2];O=P[0]===" ",I+=L+(!E&&!O&&P!==""?`
`:"")+ae(P,x),E=O}return I}function ae(f,x){if(f===""||f[0]===" ")return f;const C=/ [^ ]/g;let I,E=0,O,$=0,L=0,P="";for(;I=C.exec(f);)L=I.index,L-E>x&&(O=$>E?$:L,P+=`
`+f.slice(E,O),E=O+1),$=L;return P+=`
`,f.length-E>x&&$>E?P+=f.slice(E,$)+`
`+f.slice($+1):P+=f.slice(E),P.slice(1)}function gt(f){let x="",C=0;for(let I=0;I<f.length;C>=65536?I+=2:I++){C=ie(f,I);const E=z[C];!E&&fe(C)?(x+=f[I],C>=65536&&(x+=f[I+1])):x+=E||te(C)}return x}function Rn(f,x,C){let I="";const E=f.tag;for(let O=0,$=C.length;O<$;O+=1){let L=C[O];f.replacer&&(L=f.replacer.call(C,String(O),L)),(A(f,x,L,!1,!1)||typeof L>"u"&&A(f,x,null,!1,!1))&&(I!==""&&(I+=","+(f.condenseFlow?"":" ")),I+=f.dump)}f.tag=E,f.dump="["+I+"]"}function Pn(f,x,C,I){let E="";const O=f.tag;for(let $=0,L=C.length;$<L;$+=1){let P=C[$];f.replacer&&(P=f.replacer.call(C,String($),P)),(A(f,x+1,P,!0,!0,!1,!0)||typeof P>"u"&&A(f,x+1,null,!0,!0,!1,!0))&&((!I||E!=="")&&(E+=Fe(f,x)),f.dump&&c===f.dump.charCodeAt(0)?E+="-":E+="- ",E+=f.dump)}f.tag=O,f.dump=E||"[]"}function yt(f,x,C){let I="";const E=f.tag,O=Object.keys(C);for(let $=0,L=O.length;$<L;$+=1){let P="";I!==""&&(P+=", "),f.condenseFlow&&(P+='"');const D=O[$];let F=C[D];f.replacer&&(F=f.replacer.call(C,D,F)),A(f,x,D,!1,!1)&&(f.dump.length>1024&&(P+="? "),P+=f.dump+(f.condenseFlow?'"':"")+":"+(f.condenseFlow?"":" "),A(f,x,F,!1,!1)&&(P+=f.dump,I+=P))}f.tag=E,f.dump="{"+I+"}"}function a(f,x,C,I){let E="";const O=f.tag,$=Object.keys(C);if(f.sortKeys===!0)$.sort();else if(typeof f.sortKeys=="function")$.sort(f.sortKeys);else if(f.sortKeys)throw new n("sortKeys must be a boolean or a function");for(let L=0,P=$.length;L<P;L+=1){let D="";(!I||E!=="")&&(D+=Fe(f,x));const F=$[L];let V=C[F];if(f.replacer&&(V=f.replacer.call(C,F,V)),!A(f,x+1,F,!0,!0,!0))continue;const B=f.tag!==null&&f.tag!=="?"||f.dump&&f.dump.length>1024;B&&(f.dump&&c===f.dump.charCodeAt(0)?D+="?":D+="? "),D+=f.dump,B&&(D+=Fe(f,x)),A(f,x+1,V,!0,B)&&(f.dump&&c===f.dump.charCodeAt(0)?D+=":":D+=": ",D+=f.dump,E+=D)}f.tag=O,f.dump=E||"{}"}function v(f,x,C){const I=C?f.explicitTypes:f.implicitTypes;for(let E=0,O=I.length;E<O;E+=1){const $=I[E];if(($.instanceOf||$.predicate)&&(!$.instanceOf||typeof x=="object"&&x instanceof $.instanceOf)&&(!$.predicate||$.predicate(x))){if(C?$.multi&&$.representName?f.tag=$.representName(x):f.tag=$.tag:f.tag="?",$.represent){const L=f.styleMap[$.tag]||$.defaultStyle;let P;if(r.call($.represent)==="[object Function]")P=$.represent(x,L);else if(i.call($.represent,L))P=$.represent[L](x,L);else throw new n("!<"+$.tag+'> tag resolver accepts not "'+L+'" style');f.dump=P}return!0}}return!1}function A(f,x,C,I,E,O,$){f.tag=null,f.dump=C,v(f,C,!1)||v(f,C,!0);const L=r.call(f.dump),P=I;I&&(I=f.flowLevel<0||f.flowLevel>x);const D=L==="[object Object]"||L==="[object Array]";let F,V;if(D&&(F=f.duplicates.indexOf(C),V=F!==-1),(f.tag!==null&&f.tag!=="?"||V||f.indent!==2&&x>0)&&(E=!1),V&&f.usedDuplicates[F])f.dump="*ref_"+F;else{if(D&&V&&!f.usedDuplicates[F]&&(f.usedDuplicates[F]=!0),L==="[object Object]")I&&Object.keys(f.dump).length!==0?(a(f,x,f.dump,E),V&&(f.dump="&ref_"+F+f.dump)):(yt(f,x,f.dump),V&&(f.dump="&ref_"+F+" "+f.dump));else if(L==="[object Array]")I&&f.dump.length!==0?(f.noArrayIndent&&!$&&x>0?Pn(f,x-1,f.dump,E):Pn(f,x,f.dump,E),V&&(f.dump="&ref_"+F+f.dump)):(Rn(f,x,f.dump),V&&(f.dump="&ref_"+F+" "+f.dump));else if(L==="[object String]")f.tag!=="?"&&ht(f,f.dump,x,O,P);else{if(L==="[object Undefined]")return!1;if(f.skipInvalid)return!1;throw new n("unacceptable kind of an object to dump "+L)}if(f.tag!==null&&f.tag!=="?"){let B=encodeURI(f.tag[0]==="!"?f.tag.slice(1):f.tag).replace(/!/g,"%21");f.tag[0]==="!"?B="!"+B:B.slice(0,18)==="tag:yaml.org,2002:"?B="!!"+B.slice(18):B="!<"+B+">",f.dump=B+" "+f.dump}}return!0}function k(f,x){const C=[],I=[];S(f,C,I);const E=I.length;for(let O=0;O<E;O+=1)x.duplicates.push(C[I[O]]);x.usedDuplicates=new Array(E)}function S(f,x,C){if(f!==null&&typeof f=="object"){const I=x.indexOf(f);if(I!==-1)C.indexOf(I)===-1&&C.push(I);else if(x.push(f),Array.isArray(f))for(let E=0,O=f.length;E<O;E+=1)S(f[E],x,C);else{const E=Object.keys(f);for(let O=0,$=E.length;O<$;O+=1)S(f[E[O]],x,C)}}}function R(f,x){x=x||{};const C=new mt(x);C.noRefs||k(f,C);let I=f;return C.replacer&&(I=C.replacer.call({"":I},"",I)),A(C,0,I,!0,!0)?C.dump+`
`:""}return Vt.dump=R,Vt}var qr;function to(){if(qr)return K;qr=1;const e=eo(),n=no();function t(r,i){return function(){throw new Error("Function yaml."+r+" is removed in js-yaml 4. Use yaml."+i+" instead, which is now safe by default.")}}return K.Type=Z(),K.Schema=Ri(),K.FAILSAFE_SCHEMA=Mi(),K.JSON_SCHEMA=Bi(),K.CORE_SCHEMA=Ui(),K.DEFAULT_SCHEMA=nr(),K.load=e.load,K.loadAll=e.loadAll,K.dump=n.dump,K.YAMLException=yn(),K.types={binary:zi(),float:Yi(),map:ji(),null:Di(),pairs:Hi(),set:Wi(),timestamp:qi(),bool:Fi(),int:Vi(),merge:Gi(),omap:Ki(),seq:Li(),str:Pi()},K.safeLoad=t("safeLoad","load"),K.safeLoadAll=t("safeLoadAll","loadAll"),K.safeDump=t("safeDump","dump"),K}var ro=to();const He=Za(ro),{Type:nf,Schema:tf,FAILSAFE_SCHEMA:rf,JSON_SCHEMA:sf,CORE_SCHEMA:af,DEFAULT_SCHEMA:of,load:cf,loadAll:lf,dump:uf,YAMLException:pf,types:ff,safeLoad:df,safeLoadAll:mf,safeDump:hf}=He,an="netlab-internal",_e=`${an}:_linkname`,Ji=["none","linux","frr","bird","iosv"];function Gr(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function X(e,n){const t=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(const[i,s]of Object.entries(n)){if(i==="_removed_attr"){const c=Array.isArray(s)?s:[];r._removed_attr=[...t,...c.filter(l=>!t.has(l))];continue}if(t.has(i))continue;const o=r[i];Gr(o)&&Gr(s)?r[i]=X(o,s):r[i]=io(s)}return r}function io(e){return structuredClone(e)}function so(e,n){return X(e,n)}function zn(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Kn(e){if(Array.isArray(e))return e.map(t=>Kn(t));if(!zn(e))return e;const n={};for(const[t,r]of Object.entries(e))ao(n,t,Kn(r));return n}function ao(e,n,t){if(!n.includes(".")){zr(e,n,t);return}const r=n.split(".");let i=e;for(let s=0;s<r.length-1;s++){const o=r[s],c=i[o];(c==null||!zn(c))&&(i[o]={}),i=i[o]}zr(i,r[r.length-1],t)}function zr(e,n,t){const r=e[n];zn(r)&&zn(t)?e[n]=X(r,t):e[n]=t}function oo(e){const n=Kn(e);for(const t of Object.keys(e))delete e[t];Object.assign(e,n)}class co{constructor(){y(this,"items",[])}error(n){this.items.push({...n,severity:"error"})}warning(n){this.items.push({...n,severity:"warning"})}hasErrors(){return this.items.some(n=>n.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function Kr(e,n){const t=e.toLowerCase();let r="VALUE",i="VALUE";return t.includes("missing")||t.includes("required")||t.includes("mandatory")?(r="MISSING",i="MISSING"):t.includes("type")||t.includes("pattern")||t.includes("range")?(r="TYPE",i="TYPE"):t.includes("unknown")||t.includes("not allowed")||t.includes("unexpected")?(r="ATTR",i="ATTR"):t.includes("leafref")||t.includes("instance")?(r="VALUE",i="VALUE"):t.includes("depend")&&(r="DEPEND",i="DEPEND"),{code:i,category:r,module:"xyang",message:e,path:n}}const lo={bgp:`# BGP default settings and attributes
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
`},Hr=["attributes","extra_attributes","features","hooks","requires","supported_on","no_propagate","config_after","transform_after","warnings","_top"],uo=["vlan","vrf","vxlan","ospf","isis","bgp","evpn"];let Yt;function Xi(){if(Yt)return Yt;const e={};for(const n of uo){const t=lo[n];if(!t)continue;const r=He.load(t)??{};e[n]=r}return Yt=e,e}function vn(e){return Xi()[e]}function po(e){if(!e)return[...Hr];const n=e.no_propagate;let t=[];Array.isArray(n)?t=n.map(String):n&&typeof n=="object"&&(t=Object.keys(n));for(const r of Object.keys(e))r.includes("no_propagate")&&r!=="no_propagate"&&t.push(r);return[...Hr,...t]}function fo(e){if(!e)return{};const n={...e};for(const t of po(e))delete n[t];return n}function Zi(e){const n=vn(e),t=n==null?void 0:n.requires;return Array.isArray(t)?t.map(String):[]}function Qi(e){const n=vn(e),t=n==null?void 0:n.transform_after;return Array.isArray(t)?t.map(String):[]}function mo(e){const n=vn(e),t=n==null?void 0:n.config_after;return Array.isArray(t)?t.map(String):[]}function ho(e){var r;const n=(r=vn(e))==null?void 0:r.attributes,t=n&&typeof n=="object"?n.node_copy:void 0;return Array.isArray(t)?t.map(String):[]}function _o(){const e=Xi(),n={};for(const[t,r]of Object.entries(e))n[t]={...r};return n}const es={addressing:`#
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
`};function go(e){const n=es[e];if(!n)return{};const t=He.load(n);return!t||typeof t!="object"||Array.isArray(t)?{}:t}function yo(){const e={};for(const n of Object.keys(es))e[n]=go(n);return e}function vo(){return{device:"frr",provider:"clab",...yo(),..._o()}}function bo(e){const n=He.load(e);if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Topology must be a YAML/JSON object");return Kn(n)}function xo(e,n={}){const t=bo(e);return ns(t,n)}function ns(e,n={}){oo(e);const t=X(vo(),n.defaults??{}),r=e.defaults??{};e.defaults=X(t,r),e.provider||(e.provider="clab"),e.name||(e.name=n.name??"topology");const i=e.defaults.addressing??{};return e.addressing=X(i,e.addressing??{}),e}function tr(e){return e.replace(/\\/g,"/")}function Ue(...e){const n=[],t=e.map(tr).join("/"),r=t.startsWith("/");for(const i of t.split("/"))!i||i==="."||(i===".."?n.pop():n.push(i));return(r?"/":"")+n.join("/")}function ts(e){const n=tr(e).replace(/\/$/,""),t=n.lastIndexOf("/");return t<0?".":t===0?"/":n.slice(0,t)}function wo(...e){return Ue(e.join("/"))}function So(e,n){const t=tr(e).split("/").pop()??"";return n&&t.endsWith(n)?t.slice(0,-n.length):t}const on={resolve:Ue,dirname:ts,join:wo,basename:So};function Ao(e){const n=String(e);return n.startsWith("file:")?decodeURIComponent(n.replace(/^file:\/\//,"").replace(/^file:\//,"/")):"/packages/core/src/validate/schema.js"}function Io(e,n){if(!e.includes(":"))return{statementName:null,moduleName:null};const[t,r]=e.split(":",2);if(!t||!r)return{statementName:null,moduleName:null};const i=n[t];return i?i.findStatement(r)?{statementName:r,moduleName:t}:{statementName:null,moduleName:null}:{statementName:null,moduleName:null}}var To=class extends Error{constructor(e){super(e),this.name="YangError"}},ee=class extends SyntaxError{constructor(n,t={}){const{line_num:r,line:i,context_lines:s=[],filename:o}=t,c=[];o&&c.push(`${o}:`),r&&c.push(`${r}:`),c.push(n);let l=c.join(" ");if(s.length>0){l+=`
`;for(const[u,p]of s)l+=`${u===r?">>> ":"    "}${String(u).padStart(4," ")} | ${p}
`;r&&i&&(l+=`     ${" ".repeat(String(r).length+3)}${"^".repeat(Math.max(1,i.trim().length))}`)}super(l);y(this,"messageText");y(this,"line_num");y(this,"line");y(this,"context_lines");y(this,"filename");this.name="YangSyntaxError",this.messageText=n,this.line_num=r,this.line=i,this.context_lines=s,this.filename=o}formatHeadline(){const n=[];return this.filename&&n.push(`${this.filename}:`),this.line_num!==void 0&&n.push(`${this.line_num}:`),n.push(this.messageText),n.join(" ")}toString(){return this.formatHeadline()}},U=class extends To{constructor(e){super(e),this.name="YangSemanticError"}},Eo=class extends U{constructor(n){super(`Refine target path matches no node in the used grouping: '${n}'`);y(this,"target_path");this.name="YangRefineTargetNotFoundError",this.target_path=n}},ko=class extends U{constructor(n,t){const r=[...n,t].join(" -> ");super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${r}). Restructure groupings to break the cycle.`);y(this,"prefix_chain");y(this,"repeated");this.name="YangCircularUsesError",this.prefix_chain=[...n],this.repeated=t}},oe=class extends Error{constructor(n,t={}){var e=(...wf)=>(super(...wf),y(this,"messageText"),y(this,"position"),y(this,"expression"),this);const{position:r,expression:i,context_before:s=10,context_after:o=10}=t;if(i!==void 0&&r!==void 0){const c=Math.max(0,r-s),l=Math.min(i.length,r+o),u=i.slice(c,l),p=r-c,d=[n,`
Expression: ${u}`,`           ${" ".repeat(p)}^`];r<i.length?d.push(`Position: ${r} (character: ${JSON.stringify(i[r])})`):d.push(`Position: ${r} (end of expression)`),e(d.join(`
`))}else e(n);this.name="XPathSyntaxError",this.messageText=n,this.position=r,this.expression=i}toString(){return this.messageText}},No=new Set(["{","}",";",":","=","+","/"]);function $o(e){return e?e.split(`
`).map(n=>n.replace(/\r$/,"")):[]}function Co(e){return e==="STRING"?"string":e==="INTEGER"||e==="DOTTED_NUMBER"?"number":No.has(e)?"symbol":"identifier"}var Bt=new Set(["{","}",";",":","=","+","/","STRING","IDENTIFIER","INTEGER","DOTTED_NUMBER"]);function Oo(e,n,t,r){return{type:e,value:n,line_num:t,char_pos:r,kind:Co(e),line:t,column:r+1}}var Ro=class{constructor(e,n,t){y(this,"token_list");y(this,"tokens");y(this,"positions");y(this,"filename");y(this,"index");y(this,"source");y(this,"diagnostic_lines");this.token_list=e,this.tokens=e.map(r=>r.value),this.positions=e.map(r=>[r.line_num,r.char_pos]),this.source=n,this.filename=t,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error("Unexpected end of input");const n=this.tokens[this.index];if(e!==void 0&&n!==e)throw this._make_error(`Expected '${e}', got '${n}'`);return this.index+=1,n}consume_if(e){return this.peek()===e?(this.consume(),!0):!1}peek_type(){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");return this.token_list[this.index].type}peek_type_at(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];if(typeof e=="string"&&!Bt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)throw this._make_error(`Expected '${e}', got '${n.value}'`)}else if(n.type!==e)throw this._make_error(`Expected ${e}, got ${n.type} ('${n.value}')`);return this.index+=1,n.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;const n=this.token_list[this.index];if(typeof e=="string"&&!Bt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)return!1}else if(n.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];for(const t of e)if(typeof t=="string"){if(Bt.has(t)){if(n.type===t)return this.index+=1,[n.value,t]}else if(n.type==="IDENTIFIER"&&n.value===t)return this.index+=1,[n.value,t]}else if(n.type===t)return this.index+=1,[n.value,t];throw this._make_error(`Expected one of (${e.join(", ")}), got ${n.type} ('${n.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||(this.diagnostic_lines=$o(this.source)),this.diagnostic_lines}_make_error(e,n=3){const[t]=this.position(),r=this.diagnostic_lines_once(),i=[],s=Math.max(1,t-n),o=Math.min(r.length,t+n);for(let l=s;l<=o;l+=1)l<=r.length&&i.push([l,r[l-1]]);const c=t<=r.length?r[t-1]:"";return new ee(e,{line_num:t,line:c,context_lines:i,filename:this.filename})}},Po=class rs{constructor(n){y(this,"module");y(this,"current_parent");y(this,"source_dir");this.module=n.module,this.current_parent=n.current_parent,this.source_dir=n.source_dir}push_parent(n){return new rs({module:this.module,current_parent:n,source_dir:this.source_dir})}},rr={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-9223372036854776e3,9223372036854776e3],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,18446744073709552e3]};new Set(Object.keys(rr));var Hn=class{constructor(e={}){y(this,"patterns");y(this,"length");y(this,"range");y(this,"fraction_digits");y(this,"enums");y(this,"bits");y(this,"types");Object.assign(this,e)}};function Lo(e,n){const t=typeof e.error_message=="string"&&e.error_message.trim().length>0?e.error_message:n,r=typeof e.error_app_tag=="string"?e.error_app_tag.trim():"";return r.length>0?`${t} (error-app-tag: ${r})`:t}function jo(e){const n=(t,r)=>{const i=t.trim().toLowerCase();if(i==="min")return Number.NEGATIVE_INFINITY;if(i==="max")return Number.POSITIVE_INFINITY;const s=Number(i);return Number.isNaN(s)?r==="min"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:s};return e.split("|").map(t=>t.trim()).filter(Boolean).map(t=>{const[r,i]=t.split("..").map(s=>s.trim());if(!i){const s=n(r,"min");return{min:s,max:s}}return{min:n(r,"min"),max:n(i,"max")}})}function cn(e,n){for(const t of jo(n))if(e>=t.min&&e<=t.max)return!0;return!1}function is(e){return typeof e=="number"&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e=="string"&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function Mo(e){return typeof e=="number"&&Number.isFinite(e)?e:typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function Do(e,n,t){const r=rr[e];if(!r)return[!1,`Unsupported integer type '${e}'`];const i=is(n);if(i===null)return[!1,`Expected ${e}`];if(t)return cn(i,t)?[!0,null]:[!1,`Integer ${i} does not match ${t}`];const[s,o]=r;return i<s?[!1,`Value ${i} is less than minimum ${s}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function Fo(e,n){if(typeof e!="string")return[!1,"Expected base64 string"];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!==0)return[!1,"Expected valid base64 string"];try{const t=Buffer.from(e,"base64");if(n&&!cn(t.length,n))return[!1,`Binary length ${t.length} does not match ${n}`]}catch{return[!1,"Expected valid base64 string"]}return[!0,null]}function Vo(e,n){if(typeof e!="string")return[!1,"Bits values must be string tokens"];const t=new Set(n.map(i=>i.name));if(e.trim()==="")return[!0,null];const r=new Set;for(const i of e.trim().split(/\s+/)){if(!t.has(i))return[!1,`Unknown bit token '${i}'`];if(r.has(i))return[!1,`Duplicate bit token '${i}'`];r.add(i)}return[!0,null]}var Yo=class{validate(e,n,t){var s;const r=t??new Hn,i=n.trim();if(i==="union"){for(const o of r.types??[]){const c=typeof o.name=="string"?o.name:"string",[l]=this.validate(e,c,new Hn(o));if(l)return[!0,null]}return[!1,"Value does not match any union member type"]}if(i==="enumeration")return typeof e!="string"?[!1,"Expected enumeration value (string)"]:r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null];if(i==="string"){if(typeof e!="string")return[!1,"Expected string"];if(r.length&&!cn(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];const o=Array.isArray(r.patterns)?r.patterns:[];if(o.length>0)for(const c of o){if(typeof(c==null?void 0:c.pattern)!="string"||c.pattern.length===0)continue;const l=new RegExp(`^(?:${c.pattern})$`).test(e),u=c.invert_match===!0;if(!u&&!l||u&&l){const p=u?`String matches forbidden pattern ${c.pattern} (invert-match)`:`String does not match pattern ${c.pattern}`;return[!1,Lo(c,p)]}}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i==="boolean")return typeof e=="boolean"?[!0,null]:e==="true"||e==="false"?[!0,null]:[!1,"Expected boolean"];if(i==="empty")return e===null?[!0,null]:[!1,"Expected empty (null)"];if(i in rr)return Do(i,e,r.range);if(i==="binary")return Fo(e,r.length);if(i==="bits")return Vo(e,r.bits??[]);if(i==="decimal64"||i==="number"){const o=Mo(e);if(o===null)return[!1,"Expected number"];if(r.range&&!cn(o,r.range))return[!1,`Number ${o} does not match ${r.range}`];if(typeof r.fraction_digits=="number"){const c=((s=`${o}`.split(".")[1])==null?void 0:s.length)??0;if(c>r.fraction_digits)return[!1,`Too many fraction digits (${c} > ${r.fraction_digits})`]}return[!0,null]}if(i==="int64"||i==="integer"){const o=is(e);return o===null?[!1,"Expected integer"]:r.range&&!cn(o,r.range)?[!1,`Integer ${o} does not match ${r.range}`]:[!0,null]}return typeof e=="string"?[!0,null]:[!1,`Unsupported type '${i}'`]}};const Bo={"/yang/modules/netlab-bgp.yang":`module netlab-bgp {
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
`},ce=new Map(Object.entries(Bo));function Wn(e){return e.replace(/\\/g,"/").replace(/\/+/g,"/")}function Uo(e){const n=Wn(e);if(!n||n==="/")return!1;const t=n.startsWith("/")?n.slice(1):n;return t.length>0&&!t.includes("/")}function ss(e){const n=Wn(e);if(ce.has(n))return ce.get(n);if(n.startsWith("/")){const t=n.slice(1);if(ce.has(t))return ce.get(t)}else if(ce.has(`/${n}`))return ce.get(`/${n}`);if(Uo(n)){const t=n.replace(/^\//,"");for(const[r,i]of ce)if(r.endsWith(`/${t}`)||r===t)return i}}function qo(e,n){const t=ss(e);if(t===void 0){const r=new Error(`ENOENT: no such file or directory, open '${e}' (yang files: ${[...ce.keys()].join(", ")})`);throw r.code="ENOENT",r}return t}function Go(e){return ss(e)!==void 0}function zo(e){const n=Wn(e).replace(/\/$/,""),t=new Set;for(const r of ce.keys()){const i=Wn(r);let s;i.startsWith(n+"/")?s=i.slice(n.length+1):(n==="/yang"||n==="yang")&&i.startsWith("/yang/")&&(s=i.slice(6)),s&&t.add(s.split("/")[0])}return[...t]}function ln(e){return e.prefix?`${e.prefix}:${e.name}`:e.name}function bn(e){const n=e.indexOf(":");return n<=0||n>=e.length-1?{name:e}:{prefix:e.slice(0,n),name:e.slice(n+1)}}function ct(e){const n=e.replace(/^["']|["']$/g,"");if(!n.startsWith("/"))throw new Error(`Schema path must be absolute, got '${e}'`);const t=n.slice(1).split("/").map(r=>r.trim()).filter(r=>r.length>0);if(t.length===0)throw new Error(`Empty schema path: '${e}'`);return t.map(r=>{const i=bn(r);if(!i.prefix)throw new Error(`Invalid schema path segment '${r}': expected 'prefix:identifier'`);return i})}function Ko(e){if(typeof e=="string"&&e.length>0)return bn(e);if(e&&typeof e=="object"&&!Array.isArray(e)){const n=e;if(typeof n.name=="string"&&n.name.length>0)return typeof n.prefix=="string"&&n.prefix.length>0?{prefix:n.prefix,name:n.name}:{name:n.name}}}function Ho(e){if(!(!e||typeof e!="object"))return new Wo(e)}var Wo=class as{constructor(n){y(this,"data");this.data=n}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(t=>new as(t))}findStatement(n){return this.statements.find(t=>t.name===n)}},ir=class{constructor(e,n){y(this,"data");y(this,"source");this.data=e,this.source=n}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){const e=this.data.organization;return typeof e=="string"&&e.length>0?e:void 0}get contact(){const e=this.data.contact;return typeof e=="string"&&e.length>0?e:void 0}get description(){const e=this.data.description;return typeof e=="string"?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){const e=this.data.identities;return!e||typeof e!="object"?{}:e}get statements(){const e=this.data.statements;return Array.isArray(e)?e.map(Ho).filter(n=>!!n):[]}findStatement(e){return this.statements.find(n=>n.name===e)}};function Jo(e,n){const t=Object.keys(e).filter(r=>!n.has(r)).sort();if(t.length>0)throw new TypeError(`unexpected keyword arguments: ${JSON.stringify(t)}`)}function Xo(e){Jo(e,new Set(["modules","mode"]));const n=e.mode===void 0?"complete":e.mode,t=new Set;for(let r=0;r<e.modules.length;r+=1){const s=e.modules[r].name;if(!s)throw new TypeError(`modules[${r}] must have a module name`);if(t.has(s))throw new TypeError(`duplicate module name '${s}' in modules`);t.add(s)}return{modules:[...e.modules],mode:n}}var zt="module",os="yang-version",cs="namespace",qe="prefix",ls="organization",us="contact",ge="description",ps="revision",sr="typedef",fs="identity",Jn="base",Xn="type",Zo="enumeration",Wr="path",Jr="require-instance",Xr="enum",Te="status",ds="bit",Zr="position",Qr="pattern",ei="modifier",ni="length",ti="fraction-digits",ri="range",ms="grouping",We="uses",hs="refine",$e="container",Re="list",Pe="leaf",Le="leaf-list",je="anydata",Me="anyxml",Ce="choice",Zn="case",ze="must",ye="when",Kt="presence",ii="key",si="min-elements",ai="max-elements",oi="ordered-by",Qn="mandatory",un="config",Yn="default",et="error-message",ci="error-app-tag",J="true",he="false",_s="import",gs="include",ys="revision-date",vs="feature",ve="if-feature",bs="augment",xs="submodule",li="belongs-to",Ee="reference",ui="argument",pi="yin-element",Qo="deviation",ws="extension",Ss="rpc",ec="action",lt="notification",pn="input",fn="output",nc=["<=",">=","!=","==","//","=","<",">","+","-","*","/"];function tc(e){const n=[];let t=0;const r=(i,s,o=t)=>{n.push({kind:i,value:s,position:o})};for(;t<e.length;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==='"'||i==="'"){const c=i,l=t;t+=1;let u="";for(;t<e.length;){const p=e[t];if(p===c&&e[t-1]!=="\\"){t+=1;break}u+=p,t+=1}r("string",u,l);continue}if(/\d/.test(i)||i==="-"&&/\d/.test(e[t+1]??"")){const c=t;let l="";for(e[t]==="-"&&(l+="-",t+=1);t<e.length&&/\d/.test(e[t]);)l+=e[t],t+=1;if(e[t]==="."&&/\d/.test(e[t+1]??""))for(l+=".",t+=1;t<e.length&&/\d/.test(e[t]);)l+=e[t],t+=1;r("number",l,c);continue}if(/[A-Za-z_]/.test(i)){const c=t;let l="";for(;t<e.length&&/[A-Za-z0-9_:\-]/.test(e[t]);)l+=e[t],t+=1;r("identifier",l,c);continue}if(i==="/"){e[t+1]==="/"?(r("operator","//"),t+=2):(r("slash","/"),t+=1);continue}if(i==="."){e[t+1]==="."?(r("dotdot",".."),t+=2):(r("dot","."),t+=1);continue}if(i==="("){r("paren_open","("),t+=1;continue}if(i===")"){r("paren_close",")"),t+=1;continue}if(i==="["){r("bracket_open","["),t+=1;continue}if(i==="]"){r("bracket_close","]"),t+=1;continue}if(i===","){r("comma",","),t+=1;continue}const s=e.slice(t),o=nc.find(c=>s.startsWith(c));if(o){r("operator",o),t+=o.length;continue}t+=1}return r("eof","",t),n}var rc=new Set(["=","!=","<",">","<=",">="]),ic=new Set(["+","-"]),As=class{constructor(e){y(this,"expression");y(this,"tokens");y(this,"position",0);this.expression=e,this.tokens=tc(e)}parse(){if(this.current().kind==="eof")throw new oe("Empty expression",{expression:this.expression,position:0});const e=this.parseExpression(),n=this.current();if(n.kind!=="eof")throw new oe(`Unexpected token: ${n.value||n.kind}`,{expression:this.expression,position:n.position});return e}current(){return this.tokens[this.position]??{kind:"eof",value:"",position:this.expression.length}}consume(e){const n=this.current();if(e&&n.kind!==e)throw new oe(`Expected ${e}, got ${n.kind} (${n.value})`,{expression:this.expression,position:n.position});return this.position+=1,n}isKeyword(e){const n=this.current();return n.kind==="identifier"&&n.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword("or");){this.consume();const n=this.parseLogicalAnd();e={kind:"binary",operator:"or",left:e,right:n}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword("and");){this.consume();const n=this.parseComparison();e={kind:"binary",operator:"and",left:e,right:n}}return e}parseComparison(){let e=this.parseAdditive();const n=this.current();if(n.kind==="operator"&&rc.has(n.value)){const t=this.consume("operator").value,r=this.parseAdditive();e={kind:"binary",operator:t,left:e,right:r}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){const n=this.current();if(n.kind==="operator"&&ic.has(n.value)){const t=this.consume("operator").value,r=this.parseMultiplicative();e={kind:"binary",operator:t,left:e,right:r}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){const n=this.current();if(n.kind==="slash"){this.consume("slash");const t=this.parsePath(!1);e={kind:"binary",operator:"/",left:e,right:t}}else if(n.kind==="operator"&&n.value==="*"){this.consume("operator");const t=this.parseUnary();e={kind:"binary",operator:"*",left:e,right:t}}else return e}}parseUnary(){const e=this.current();if(e.kind==="operator"&&e.value==="-"){this.consume("operator");const n=this.parseUnary();return{kind:"binary",operator:"-",left:{kind:"literal",value:0},right:n}}if(e.kind==="operator"&&e.value==="+")return this.consume("operator"),this.parseUnary();if(this.isKeyword("not")){this.consume(),this.consume("paren_open");const n=this.parseExpression();return this.consume("paren_close"),{kind:"function",name:"not",args:[n]}}return this.parsePrimary()}parsePrimary(){const e=this.current();if(e.kind==="string")return{kind:"literal",value:this.consume("string").value};if(e.kind==="number"){const n=this.consume("number").value,t=n.includes(".")?Number.parseFloat(n):Number.parseInt(n,10);if(Number.isNaN(t))throw new oe(`Invalid number: ${n}`,{expression:this.expression,position:e.position});return{kind:"literal",value:t}}if(e.kind==="identifier"){if(this.isKeyword("true"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!0};if(this.isKeyword("false"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!1};const n=this.tokens[this.position+1];return(n==null?void 0:n.kind)==="paren_open"?this.parseFunctionCall():this.parsePath(!1)}if(e.kind==="dot")return this.consume("dot"),this.current().kind==="paren_open"?(this.consume("paren_open"),this.consume("paren_close"),{kind:"function",name:"current",args:[]}):this.parsePath(!1,".");if(e.kind==="dotdot")return this.parsePath(!1);if(e.kind==="slash")return this.consume("slash"),this.parsePath(!0);if(e.kind==="paren_open"){if(this.consume("paren_open"),this.current().kind==="string"||this.current().kind==="number"){const t=this.parsePrimary();if(t.kind==="literal"&&this.current().kind==="comma"){const r=[t.value];for(;this.current().kind==="comma";){this.consume("comma");const i=this.parsePrimary();if(i.kind!=="literal")throw new oe("Value list may only contain literals",{expression:this.expression,position:this.current().position});r.push(i.value)}return this.consume("paren_close"),{kind:"literal",value:r}}if(this.current().kind==="paren_close")return this.consume("paren_close"),t}const n=this.parseExpression();return this.consume("paren_close"),n}throw new oe(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){const e=this.consume("identifier").value;this.consume("paren_open");const n=[];if(this.current().kind!=="paren_close")for(n.push(this.parseExpression());this.current().kind==="comma";)this.consume("comma"),n.push(this.parseExpression());return this.consume("paren_close"),{kind:"function",name:e,args:n}}parsePath(e,n,t=!0){const r=[],i=o=>{const c={step:o};for(r.push(c);this.current().kind==="bracket_open";){if(!t)throw new oe("Predicates are not allowed in this path context",{expression:this.expression,position:this.current().position});this.consume("bracket_open");const l=this.parseExpression();c.predicate===void 0?c.predicate=l:c.predicate={kind:"binary",operator:"and",left:c.predicate,right:l},this.consume("bracket_close")}return this.current().kind==="slash"?(this.consume("slash"),!0):!1};for(n!==void 0&&i(n);this.current().kind==="dot"||this.current().kind==="dotdot"||this.current().kind==="identifier";){const o=this.consume().value;if(!i(o))break}return{kind:"path",segments:r,isAbsolute:e}}parsePathExpression(e={}){const n=e.allowPredicate??!0;if(this.current().kind==="eof")throw new oe("Empty path expression",{expression:this.expression,position:0});let t=!1;this.current().kind==="slash"&&(t=!0,this.consume("slash"));const r=this.parsePath(t,void 0,n),i=this.current();if(i.kind!=="eof")throw new oe(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function Bn(e){return new As(e).parse()}function Is(e,n={}){return new As(e).parsePathExpression(n)}var sc=class{constructor(e=[]){y(this,"statements");this.statements=e}find_statement(e){return this.statements.find(n=>n.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){const e=[];for(const n of this.statements)e.push(...this.collectLeaves(n));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof ks)return[e];if(e instanceof xn||e instanceof Es){const n=[];for(const t of e.statements)n.push(...this.collectLeaves(t));return n}return[]}},Je=class extends sc{constructor(n={}){super(n.statements??[]);y(this,"keyword");y(this,"name");y(this,"description");y(this,"reference");this.keyword=n.keyword??"",this.name=n.name??"",this.description=n.description??"",this.reference=n.reference??""}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(n){return this.name?new Set([this.name]):new Set}childNames(n){return this.child_names(n)}},ac=class extends Je{constructor(n={}){super(n);y(this,"must_statements");this.must_statements=n.must_statements??[]}},ne=class extends Je{constructor(n={}){super(n);y(this,"when");y(this,"if_features");y(this,"config");this.when=n.when,this.if_features=n.if_features??[],this.config=n.config}get_schema_node(){return this.name||void 0}},Ts=class extends Je{constructor(n={}){super(n);y(this,"type");y(this,"default");this.keyword="typedef",this.type=n.type,this.default=n.default}get_schema_node(){return this.name||void 0}},fi=class extends Je{constructor(n={}){super(n);y(this,"bases");y(this,"if_features");this.keyword="identity",this.bases=n.bases??[],this.if_features=n.if_features??[]}get_schema_node(){}},oc=class{constructor(e={}){y(this,"name");y(this,"position");this.name=e.name??"",this.position=e.position}},cc=class{constructor(e={}){y(this,"pattern");y(this,"invert_match");y(this,"error_message");y(this,"error_app_tag");this.pattern=e.pattern??"",this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},lc=class{constructor(e={}){y(this,"name");y(this,"prefix");y(this,"patterns");y(this,"length");y(this,"range");y(this,"fraction_digits");y(this,"enums");y(this,"bits");y(this,"types");y(this,"path");y(this,"require_instance");y(this,"identityref_bases");this.name=e.name??"",this.prefix=e.prefix,this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},xn=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"presence");this.keyword="container",this.must_statements=n.must_statements??[],this.presence=n.presence}},uc=class extends xn{constructor(e={}){super(e),this.keyword="notification"}},pc=class extends xn{constructor(e={}){super({name:"input",...e}),this.keyword="input"}},fc=class extends xn{constructor(e={}){super({name:"output",...e}),this.keyword="output"}},dc=class extends ne{constructor(n={}){super(n);y(this,"must_statements");this.keyword="rpc",this.must_statements=n.must_statements??[]}},Es=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"key");y(this,"min_elements");y(this,"max_elements");this.keyword="list",this.must_statements=n.must_statements??[],this.key=n.key,this.min_elements=n.min_elements,this.max_elements=n.max_elements}},ks=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"type");y(this,"mandatory");y(this,"default");this.keyword="leaf",this.must_statements=n.must_statements??[],this.type=n.type,this.mandatory=n.mandatory??!1,this.default=n.default}},Ns=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"type");y(this,"min_elements");y(this,"max_elements");y(this,"defaults");this.keyword="leaf-list",this.must_statements=n.must_statements??[],this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.defaults=n.defaults??[]}},mc=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"mandatory");this.keyword="anydata",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},hc=class extends ne{constructor(n={}){super(n);y(this,"must_statements");y(this,"mandatory");this.keyword="anyxml",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},Ht=class extends Je{constructor(n={}){super(n);y(this,"argument_name");y(this,"argument_yin_element");y(this,"apply_callback");this.keyword="extension",this.argument_name=n.argument_name??"",this.argument_yin_element=n.argument_yin_element,this.apply_callback=n.apply_callback}apply(n,t){return this.apply_callback?this.apply_callback(n,t.context_module):n}get_schema_node(){}},_c=class extends ne{constructor(n){super(n);y(this,"must_statements");y(this,"prefix");y(this,"resolved_module");y(this,"resolved_extension");y(this,"argument");if(this.keyword="extension-invocation",this.must_statements=n.must_statements??[],this.prefix=n.prefix,this.resolved_module=n.resolved_module,this.resolved_extension=n.resolved_extension,this.argument=n.argument,!this.prefix)throw new Error("extension invocation requires a non-empty prefix");if(!this.resolved_module)throw new Error("extension invocation requires resolved_module");if(!this.resolved_extension)throw new Error("extension invocation requires resolved_extension")}get_schema_node(){}},$s=class{constructor(e){y(this,"expression");y(this,"description");y(this,"ast");this.expression=e.expression,this.description=e.description??"",this.expression&&(this.ast=Bn(this.expression))}},di=class extends $s{constructor(n){super(n);y(this,"error_message");this.error_message=n.error_message??""}},gc=class extends $s{constructor(n){super(n);y(this,"evaluate_with_parent_context");this.evaluate_with_parent_context=n.evaluate_with_parent_context??!1}get condition(){return this.expression}},yc=class extends Je{constructor(e={}){super(e),this.keyword="grouping"}},ar=class extends ne{constructor(n={}){super(n);y(this,"grouping_name");y(this,"grouping_prefix");y(this,"refines");y(this,"augmentations");this.keyword="uses",this.grouping_name=n.grouping_name??"",this.grouping_prefix=n.grouping_prefix,this.refines=n.refines??[],this.augmentations=n.augmentations??[]}grouping_qname(){return this.grouping_prefix?`${this.grouping_prefix}:${this.grouping_name}`:this.grouping_name}get_schema_node(){}},vc=class extends ne{constructor(n={}){super(n);y(this,"augment_path");y(this,"augment_path_segments");this.keyword="augment",this.augment_path=n.augment_path??"",this.augment_path_segments=n.augment_path_segments??[]}get_schema_node(){}},Un=class extends ac{constructor(n={}){super(n);y(this,"target_path");y(this,"type");y(this,"min_elements");y(this,"max_elements");y(this,"refined_defaults");y(this,"refined_mandatory");y(this,"refined_config");y(this,"if_features");this.keyword="refine",this.target_path=n.target_path??"",this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.refined_defaults=n.refined_defaults??[],this.refined_mandatory=n.refined_mandatory,this.refined_config=n.refined_config,this.if_features=n.if_features??[]}},jn=class extends ne{constructor(n={}){super(n);y(this,"mandatory");y(this,"cases");this.keyword="choice",this.mandatory=n.mandatory??!1,this.cases=n.cases??[]}child_names(n){for(const t of this.cases)if(t.statements.some(r=>r.name&&r.name in n))return new Set(t.statements.map(r=>r.name).filter(r=>!!r));return new Set}validate_case_unique_child_names(){const n=new Map;for(const t of this.cases)for(const r of t.statements){const i=r.get_schema_node();if(i){if(n.has(i)){const s=n.get(i);throw new U(`Choice '${this.name}': schema node '${i}' appears in case '${s}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}n.set(i,t.name)}}}},mi=class extends ne{constructor(e={}){super(e),this.keyword="case"}child_names(e){return new Set(this.statements.map(n=>n.name).filter(n=>!!n))}},bc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_anydata(e,n){e.consume(je);const t=e.consume(),r=new mc({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},xc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_anyxml(e,n){e.consume(Me);const t=e.consume(),r=new hc({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}};function nt(e,n){const t={...n};return t[ge]??(t[ge]=(r,i)=>{e.parse_description(r,i)}),t[Ee]??(t[Ee]=(r,i)=>{e.parse_reference(r,i)}),t[Te]??(t[Te]=(r,i)=>{e.parse_status_ignored(r,i)}),t}function tt(e,n){const t=nt(e,n);return t[un]??(t[un]=(r,i)=>{e.parse_config(r,i)}),t[Te]??(t[Te]=(r,i)=>{e.parse_status_ignored(r,i)}),t}var wc=class{constructor(e){y(this,"parsers");y(this,"augmentBodyDispatch");this.parsers=e,this.augmentBodyDispatch=tt(this.parsers,{[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[We]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Pe]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Le]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[$e]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Re]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Ce]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[Zn]:(n,t)=>{this.parsers.choice_parser.parse_case(n,t)},[je]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Me]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ze]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[lt]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parse_augment(e,n){e.consume(bs);const t=this.parsers.parse_string_concatenation(e);let r=[];if(t.replace(/^["']|["']$/g,"").startsWith("/"))try{r=ct(t)}catch(c){throw new ee(c instanceof Error?c.message:String(c))}const s=new vc({name:"augment",augment_path:t,augment_path_segments:r});if(e.consume_if_type("{")){const c=n.push_parent(s);for(;e.has_more()&&e.peek_type()!=="}";){const l=this.parsers.substatement_handler(e,this.augmentBodyDispatch);l?l(e,c):e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"?this.parsers.parse_prefixed_extension_statement_public(e,c):this.parsers.skip_unsupported_or_raise_unknown(e,"augment")}e.consume_type("}")}const o=n.current_parent;return o instanceof ar?o.augmentations.push(s):this.parsers.add_to_parent_or_module(n,s),e.consume_if_type(";"),s}},Sc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_type_bit(e,n,t){e.consume(ds);const r=e.consume();let i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Zr?(e.consume(Zr),i=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}t.bits.push(new oc({name:r,position:i})),e.consume_if_type(";")}finalize_bits_type(e){let n=-1;for(const t of e.bits)t.position===void 0&&(t.position=n+1),n=Math.max(n,t.position)}},Ac=new Set([Pe,Le,$e,Re,je,Me,Ce]),Ic=class{constructor(e){y(this,"parsers");y(this,"choiceSubstatementDispatch");y(this,"caseSubstatementDispatch");this.parsers=e,this.choiceSubstatementDispatch=tt(this.parsers,{[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Zn]:(n,t)=>{this.parse_case(n,t)},[Qn]:(n,t)=>{this.parse_choice_mandatory(n,t)}}),this.caseSubstatementDispatch=tt(this.parsers,{[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[We]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Pe]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[$e]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Re]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Le]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[je]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Me]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[Ce]:(n,t)=>{this.parse_choice(n,t)}})}parse_choice(e,n){e.consume(Ce);const t=e.consume(),r=new jn({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_choice_substatement(e,i,t);e.consume_type("}"),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_choice_substatement(e,n,t){const r=`choice '${t}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,n);return}const s=this.parsers.dispatch_key(e);if(typeof s=="string"&&Ac.has(s)){this.parse_choice_implicit_case(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,n){const t=n.current_parent;t instanceof jn||e.syntaxError("internal: implicit choice case outside choice body");const r=new mi({name:""}),i=n.push_parent(r),s=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);s||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),s(e,i),r.statements.length===0&&e.syntaxError("Expected a schema node in implicit choice case (RFC 7950 §7.9.2)");const o=r.statements[0],c=o.name||o.get_schema_node();c||e.syntaxError("Implicit choice case requires a named schema node (RFC 7950 §7.9.2)"),r.name=c,t.cases.push(r)}parse_case(e,n){e.consume(Zn);const t=e.consume(),r=new mi({name:t});if(e.consume_if_type("{")){const s=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_case_substatement(e,s,t);e.consume_type("}")}const i=n.current_parent;return i instanceof jn?i.cases.push(r):this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_case_substatement(e,n,t){const r=`case '${t}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);if(i){i(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,n){e.consume(Qn);const[,t]=e.consume_oneof([J,he]),r=n.current_parent;r instanceof jn&&(r.mandatory=t===J),e.consume_if_type(";")}},Tc=class{constructor(e){y(this,"parsers");y(this,"containerSubstatementDispatch");this.parsers=e,this.containerSubstatementDispatch=tt(this.parsers,{[Kt]:(n,t)=>{this.parsers.parse_presence(n,t)},[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ze]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Pe]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[$e]:(n,t)=>{this.parse_container(n,t)},[Re]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Le]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[We]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ce]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[je]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Me]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[lt]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parseContainerSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`container '${t}'`)}parse_container(e,n){e.consume($e);const t=e.consume(),r=new xn({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseContainerSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Ec=class{constructor(e){y(this,"parsers");this.parsers=e}parse_extension_stmt(e,n){e.consume(ws);const t=e.consume_type("IDENTIFIER"),r=new Ht({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.dispatch_key(e)===ui?this.parse_extension_argument_stmt(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}return n.module.extensions[t]=r,this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_extension_argument_stmt(e,n){e.consume(ui);const t=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),r=n.current_parent;if(r instanceof Ht&&(r.argument_name=t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)if(e.peek()===pi){e.consume(pi);const[,i]=e.consume_oneof([J,he]);r.argument_yin_element=i===J,e.consume_if_type(";")}else this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},kc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_feature_stmt(e,n){var i;e.consume(vs);const t=e.consume_type("IDENTIFIER");((i=n.module).features??(i.features=new Set)).add(t);const r={if_features:[]};if(e.consume_if_type("{")){const s=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}if(r.if_features.length>0){const s=n.module,o=s.feature_if_features??(s.feature_if_features={});o[t]=[...r.if_features]}e.consume_if_type(";")}parse_if_feature_stmt(e,n){e.consume(ve);const t=this.parsers.parse_string_concatenation(e),r=n.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},Nc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_grouping(e,n){e.consume(ms);const t=e.consume(),r=new yc({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.groupings[t]=r,e.consume_if_type(";")}},$c=class{constructor(e){y(this,"parsers");this.parsers=e}parse_identity(e,n){e.consume(fs);const t=e.consume_type("IDENTIFIER"),r=new fi({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Jn?this.parse_identity_base(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.identities[t]=r,e.consume_if_type(";")}parse_identity_base(e,n){e.consume(Jn);const t=this.parsers.consume_identifier_ref(e),r=n.current_parent;r instanceof fi&&r.bases.push(t),e.consume_if_type(";")}},Cc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_leaf(e,n){e.consume(Pe);const t=e.consume(),r=new ks({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Oc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_leaf_list(e,n){e.consume(Le);const t=e.consume(),r=new Ns({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Rc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_list(e,n){e.consume(Re);const t=e.consume(),r=new Es({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Pc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_module(e,n){for(e.consume(zt),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}parse_yang_version(e,n){e.consume(os);const[t]=e.consume_oneof(["IDENTIFIER","DOTTED_NUMBER"]);n.module.yang_version=t,e.consume_if_type(";")}parse_namespace(e,n){e.consume(cs),n.module.namespace=e.consume_type("STRING"),e.consume_if_type(";")}parse_prefix(e,n){e.consume(qe);const t=this.parsers.dispatch_key(e);n.module.prefix=t==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}parse_organization(e,n){e.consume(ls),n.module.organization=e.consume_type("STRING"),e.consume_if_type(";")}parse_contact(e,n){e.consume(us),n.module.contact=e.consume_type("STRING"),e.consume_if_type(";")}parse_import_stmt(e,n){e.consume(_s);const t=e.consume_type("IDENTIFIER");let r,i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const s=this.parsers.dispatch_key(e);if(s===qe){e.consume(qe),r=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";");continue}if(s===ys){i=this.parsers.revision_parser.parse_revision_date_statement(e);continue}this.skip_nested_statement(e)}e.consume_type("}")}if(e.consume_if_type(";"),!r||r.trim().length===0)throw new U(`Import '${t}' is missing required prefix substatement`);this.parsers.register_import(n,t,r,i,e)}parse_include_stmt(e,n){if(e.consume(gs),e.consume_type("IDENTIFIER"),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}parse_prefix_value_stmt(e){e.consume(qe),e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}skip_nested_statement(e){let n=0;for(;e.has_more();){const t=this.parsers.dispatch_key(e);if(t==="{"){n+=1,e.consume_type("{");continue}if(t==="}"){if(n===0)return;n-=1,e.consume_type("}");continue}if(t===";"&&n===0){e.consume_type(";");return}e.consume()}}},Lc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_notification(e,n){e.consume(lt);const t=e.consume(),r=new uc({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},jc=class{constructor(e){y(this,"parsers");y(this,"ioSubstatementDispatch");y(this,"rpcSubstatementDispatch");this.parsers=e,this.ioSubstatementDispatch=nt(this.parsers,{[sr]:(n,t)=>{this.parsers.typedef_parser.parse_typedef(n,t)},[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ze]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Pe]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[$e]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Re]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Le]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[We]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ce]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[je]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[Me]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)}}),this.rpcSubstatementDispatch=nt(this.parsers,{[ye]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[ze]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[pn]:(n,t)=>{this.parse_input(n,t)},[fn]:(n,t)=>{this.parse_output(n,t)},[ve]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)}})}parseIoSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`${t} block`)}parseIoBlock(e,n,t,r){if(e.consume(t),e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseIoSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_input(e,n){return this.parseIoBlock(e,n,pn,new pc)}parse_output(e,n){return this.parseIoBlock(e,n,fn,new fc)}parseRpcSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${t}'`)}parse_rpc(e,n){e.consume(Ss);const t=e.consume(),r=new dc({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseRpcSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Mc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_must(e,n){e.consume(ze);const t=this.parsers.parse_string_concatenation(e),r=new di({expression:t});if(e.consume_if_type("{")){const s=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===et?this.parse_must_error_message(e,s):this.parsers.parseStatement(e,s);e.consume_type("}")}const i=n.current_parent;return Array.isArray(i==null?void 0:i.must_statements)&&i.must_statements.push(r),e.consume_if_type(";"),r}parse_must_error_message(e,n){e.consume(et);const t=n.current_parent;t instanceof di&&(t.error_message=e.consume_type("STRING")),e.consume_if_type(";")}},Dc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_refine(e,n){e.consume(hs);const t=[e.consume()];for(;e.has_more()&&e.peek_type()==="/";)e.consume_type("/"),t.push(e.consume());const r=t.join("/"),i=new Un({name:"refine",target_path:r});if(e.consume_if_type("{")){const s=n.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}n.current_parent instanceof ar&&n.current_parent.refines.push(i),e.consume_if_type(";")}},Fc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_revision(e,n){var i;e.consume(ps);let t="";if(e.peek_type()==="STRING")t=e.consume_type("STRING");else for(;e.has_more()&&!["{",";"].includes(e.peek_type());)t+=e.consume();const r={date:t,description:"",reference:""};if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===ge?(e.consume(ge),r.description=e.consume_type("STRING"),e.consume_if_type(";")):e.peek()===Ee?(e.consume(Ee),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}((i=n.module).revisions??(i.revisions=[])).push(r),e.consume_if_type(";")}parse_revision_date_statement(e){e.consume(ys);let n="";if(e.peek_type()==="STRING")n=e.consume_type("STRING");else for(;e.has_more()&&e.peek_type()!==";";)n+=e.consume();return e.consume_if_type(";"),n}},Vc=class{constructor(e,n){y(this,"parsers");y(this,"module_parser");this.parsers=e,this.module_parser=n}parse_submodule(e,n){for(e.consume(xs),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===li?this.parse_belongs_to(e,n):this.parsers.parseStatement(e,n);e.consume_type("}")}parse_belongs_to(e,n){for(e.consume(li),n.module.belongs_to_module=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===qe?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,n);e.consume_type("}"),e.consume_if_type(";")}},Yc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_type(e,n){e.consume(Xn);let t,r;if(e.peek_type()==="IDENTIFIER"){const o=this.parsers.consume_identifier_ref(e);t=o.prefix,r=o.name}else r=e.consume().trim();const i=new lc({name:r,prefix:t});if(e.consume_if_type("{")){const o=n.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";){const c=this.parsers.dispatch_key(e);if(c===Qr)this.parse_type_pattern(e,o,i);else if(c===ni)this.parse_type_length(e,o,i);else if(c===ri)this.parse_type_range(e,o,i);else if(c===ti)this.parse_type_fraction_digits(e,o,i);else if(c===Xr)this.parse_type_enum(e,o,i);else if(c===ds)this.parsers.bits_parser.parse_type_bit(e,o,i);else if(c===Wr)this.parse_type_path(e,o,i);else if(c===Jr)this.parse_type_require_instance(e,o,i);else if(c===Jn)this.parse_type_base(e,o,i);else if(c===Xn){const l=this.parse_type(e,o);i.types.push(l)}else this.parsers.parseStatement(e,o)}e.consume_type("}"),i.name===Zo&&i.enums.length===0&&e.syntaxError("enumeration type must contain at least one enum statement")}const s=n.current_parent;return s&&"type"in s&&!s.type&&(s.type=i),e.consume_if_type(";"),i}parse_type_base(e,n,t){e.consume(Jn),t.identityref_bases.push(this.parsers.consume_identifier_ref(e)),e.consume_if_type(";")}parse_type_pattern(e,n,t){e.consume(Qr);const r=this.parsers.parse_string_concatenation(e);let i=!1,s,o;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const c=this.parsers.dispatch_key(e);c===et?(e.consume(et),s=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):c===ci?(e.consume(ci),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):c===ei?(e.consume(ei),i=e.consume()==="invert-match",e.consume_if_type(";")):this.parsers.parseStatement(e,n)}e.consume_type("}")}t.patterns.push(new cc({pattern:r,invert_match:i,error_message:s,error_app_tag:o})),e.consume_if_type(";")}parse_type_length(e,n,t){e.consume(ni),t.length=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_range(e,n,t){e.consume(ri),t.range=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_fraction_digits(e,n,t){e.consume(ti),t.fraction_digits=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")}parse_type_enum(e,n,t){if(e.consume(Xr),t.enums.push(e.consume()),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";")}parse_type_path(e,n,t){e.consume(Wr);const r=this.parsers.parse_string_argument(e);t.path=Is(r),e.consume_if_type(";")}parse_type_require_instance(e,n,t){e.consume(Jr);const[,r]=e.consume_oneof([J,he]);t.require_instance=r===J,e.consume_if_type(";")}},Bc=class{constructor(e){y(this,"parsers");y(this,"typedefBodyDispatch");this.parsers=e,this.typedefBodyDispatch=nt(this.parsers,{[Xn]:(n,t)=>{this.parsers.type_parser.parse_type(n,t)},[Yn]:(n,t)=>{this.parsers.parse_typedef_default(n,t)}})}parse_typedef(e,n){e.consume(sr);const t=e.consume_type("IDENTIFIER"),r=new Ts({name:t}),i=`typedef '${t}'`;if(e.consume_if_type("{")){const s=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.substatement_handler(e,this.typedefBodyDispatch);o?o(e,s):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type("}")}return n.module.typedefs[t]=r,this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Uc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_uses(e,n){e.consume(We);let t,r;if(e.peek_type()==="IDENTIFIER"){const s=this.parsers.consume_identifier_ref(e);t=s.prefix,r=s.name}else r=e.consume().trim();const i=new ar({name:"uses",grouping_name:r,grouping_prefix:t});if(e.consume_if_type("{")){const s=n.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,i),e.consume_if_type(";"),i}},qc=class{constructor(e){y(this,"parsers");this.parsers=e}parse_when(e,n){e.consume(ye);const t=this.parsers.parse_string_concatenation(e),r=new gc({expression:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.current_parent instanceof ne&&(n.current_parent.when=r),e.consume_if_type(";")}},Cs=new Set([Qo,ec]);function Gc(e){let n=0;for(;e.has_more();){const t=e.peek_type();if(t==="{")n+=1,e.consume_type("{");else if(t==="}"){if(n-=1,e.consume_type("}"),n===0)return}else e.consume()}}function zc(e,{context:n}){const t=e.peek_token();if(!t||!Cs.has(t.value))return;const r=t.value,[i,s]=e.position(),o=e.filename??"<string>";for(console.warn(`Ignoring unsupported YANG statement '${r}' (${n}) at ${o}:${i}:${s}`),e.consume();e.has_more();){const c=e.peek_type();if(c==="{"){Gc(e);break}if(c===";"){e.consume_type(";");return}if(c==="}")return;e.consume()}e.consume_if_type(";")}function Kc(e){const n=e.peek_token();return n!==void 0&&Cs.has(n.value)}function Hc(e){e.consume(Te),e.peek_type()==="IDENTIFIER"&&e.consume_type("IDENTIFIER"),e.consume_if_type(";")}function Wc(e){if(typeof e.keyword=="string"&&e.keyword.trim().length>0)return e.keyword;throw new U("Internal error: cannot serialize AST statement without a keyword")}var Jc=class{constructor(e={}){y(this,"importResolver");y(this,"anydata_parser",new bc(this));y(this,"anyxml_parser",new xc(this));y(this,"augment_parser",new wc(this));y(this,"bits_parser",new Sc(this));y(this,"choice_parser",new Ic(this));y(this,"container_parser",new Tc(this));y(this,"extension_parser",new Ec(this));y(this,"feature_parser",new kc(this));y(this,"grouping_parser",new Nc(this));y(this,"identity_parser",new $c(this));y(this,"leaf_parser",new Cc(this));y(this,"leaf_list_parser",new Oc(this));y(this,"list_parser",new Rc(this));y(this,"module_parser",new Pc(this));y(this,"notification_parser",new Lc(this));y(this,"rpc_parser",new jc(this));y(this,"must_parser",new Mc(this));y(this,"refine_parser",new Dc(this));y(this,"revision_parser",new Fc(this));y(this,"submodule_parser",new Vc(this,this.module_parser));y(this,"type_parser",new Yc(this));y(this,"typedef_parser",new Bc(this));y(this,"uses_parser",new Uc(this));y(this,"when_parser",new qc(this));y(this,"statementKeywordHandlers",{[Pe]:(e,n)=>this.fromAst(this.leaf_parser.parse_leaf(e,n)),[Le]:(e,n)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,n)),[$e]:(e,n)=>this.fromAst(this.container_parser.parse_container(e,n)),[Re]:(e,n)=>this.fromAst(this.list_parser.parse_list(e,n)),[lt]:(e,n)=>this.fromAst(this.notification_parser.parse_notification(e,n)),[Ss]:(e,n)=>this.fromAst(this.rpc_parser.parse_rpc(e,n)),[je]:(e,n)=>this.fromAst(this.anydata_parser.parse_anydata(e,n)),[Me]:(e,n)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,n)),[Ce]:(e,n)=>this.fromAst(this.choice_parser.parse_choice(e,n)),[Zn]:()=>{throw new ee("'case' is only valid as a substatement of 'choice' (RFC 7950)")},[pn]:()=>{throw new ee("'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[fn]:()=>{throw new ee("'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[sr]:(e,n)=>this.fromAst(this.typedef_parser.parse_typedef(e,n)),[Xn]:(e,n)=>this.fromType(this.type_parser.parse_type(e,n)),[We]:(e,n)=>this.fromAst(this.uses_parser.parse_uses(e,n)),[hs]:(e,n)=>(this.refine_parser.parse_refine(e,n),{__class__:"YangStatement",keyword:"refine",statements:[]}),[ze]:(e,n)=>this.fromMust(this.must_parser.parse_must(e,n)),[ye]:(e,n)=>(this.when_parser.parse_when(e,n),{__class__:"YangStatement",keyword:"when",statements:[]}),[ws]:(e,n)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,n)),[vs]:(e,n)=>(this.feature_parser.parse_feature_stmt(e,n),{__class__:"YangStatement",keyword:"feature",statements:[]}),[ve]:(e,n)=>(this.feature_parser.parse_if_feature_stmt(e,n),{__class__:"YangStatement",keyword:"if-feature",statements:[]}),[fs]:(e,n)=>(this.identity_parser.parse_identity(e,n),{__class__:"YangStatement",keyword:"identity",statements:[]}),[ms]:(e,n)=>(this.grouping_parser.parse_grouping(e,n),{__class__:"YangStatement",keyword:"grouping",statements:[]}),[bs]:(e,n)=>this.fromAst(this.augment_parser.parse_augment(e,n)),[ps]:(e,n)=>(this.revision_parser.parse_revision(e,n),{__class__:"YangStatement",keyword:"revision",statements:[]}),[ge]:(e,n)=>({__class__:"YangStatement",keyword:"description",argument:this.parse_description(e,n),name:"description",statements:[]}),[Qn]:(e,n)=>(this.parse_leaf_mandatory(e,n),{__class__:"YangStatement",keyword:"mandatory",statements:[]}),[Yn]:(e,n)=>(this.parse_leaf_default(e,n),{__class__:"YangStatement",keyword:"default",statements:[]}),[ii]:(e,n)=>(this.parse_list_key(e,n),{__class__:"YangStatement",keyword:"key",statements:[]}),[si]:(e,n)=>(this.parse_min_elements(e,n),{__class__:"YangStatement",keyword:"min-elements",statements:[]}),[ai]:(e,n)=>(this.parse_max_elements(e,n),{__class__:"YangStatement",keyword:"max-elements",statements:[]}),[oi]:(e,n)=>(this.parse_ordered_by(e),{__class__:"YangStatement",keyword:"ordered-by",statements:[]}),[Kt]:(e,n)=>(this.parse_presence(e,n),{__class__:"YangStatement",keyword:"presence",statements:[]}),[Ee]:(e,n)=>(this.parse_reference(e,n),{__class__:"YangStatement",keyword:"reference",statements:[]}),[un]:(e,n)=>(this.parse_config(e,n),{__class__:"YangStatement",keyword:"config",statements:[]})});this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()==="IDENTIFIER"?e.peek()??"":e.peek_type()}assertStatementStartAllowed(e,n,t){const r=n instanceof Set?n:new Set(n),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return;const s=t?` ${t}`:"",o=e.peek()??"<end>",c=[...r].map(l=>String(l)).sort().join(", ");throw new ee(`Invalid statement starting with '${o}'${s}. Allowed here: ${c}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,n){const t=this.parseStatement(e,n);if(t.keyword!=="module")throw new U("Expected top-level 'module' statement");return t}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,n,t){t!=null&&t.allowedStatementStarts&&this.assertStatementStartAllowed(e,t.allowedStatementStarts,t.restrictionContext);const r=this.dispatch_key(e);if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return this.parse_prefixed_extension_statement(e,n);const i=this.statementKeywordHandlers[r];return i?i(e,n):this.parse_statement_generic(e,n)}parse_statement_generic(e,n){const t=this.dispatch_key(e);if(t===zt)return this.parse_top_level_module(e,n);if(t===xs)return this.submodule_parser.parse_submodule(e,n),{__class__:"YangStatement",keyword:"submodule",statements:[]};if(t===os)return this.module_parser.parse_yang_version(e,n),{__class__:"YangStatement",keyword:"yang-version",argument:n.module.yang_version,name:"yang-version",statements:[]};if(t===cs)return this.module_parser.parse_namespace(e,n),{__class__:"YangStatement",keyword:"namespace",argument:n.module.namespace,name:"namespace",statements:[]};if(t===qe)return this.module_parser.parse_prefix(e,n),{__class__:"YangStatement",keyword:"prefix",argument:n.module.prefix,name:"prefix",statements:[]};if(t===ls)return this.module_parser.parse_organization(e,n),{__class__:"YangStatement",keyword:"organization",statements:[]};if(t===us)return this.module_parser.parse_contact(e,n),{__class__:"YangStatement",keyword:"contact",statements:[]};if(t===_s)return this.module_parser.parse_import_stmt(e,n),{__class__:"YangStatement",keyword:"import",statements:[]};if(t===gs)return this.module_parser.parse_include_stmt(e,n),{__class__:"YangStatement",keyword:"include",statements:[]};if(this.skip_unsupported_if_present(e,"generic"))return{__class__:"YangStatement",keyword:"unsupported",statements:[]};const r=e.peek();(r===pn||r===fn)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let s=e.consume();e.peek_type()===":"&&(e.consume_type(":"),s=`${s}:${e.consume_type("IDENTIFIER")}`);const o=this.parse_argument(e),c=[];if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)c.push(this.parseStatement(e,n));e.consume_type("}"),e.consume_if_type(";")}else e.consume_if_type(";");const l={__class__:"YangStatement",keyword:s,name:o,argument:o,statements:c};return s==="type"&&(l.type=this.extract_type_shape(l)),l}parse_argument(e){const n=[];for(;e.has_more();){const t=e.peek_type();if(t===";"||t==="{")break;t==="STRING"?n.push(this.parse_string_concatenation(e)):t==="+"?e.consume_type("+"):n.push(e.consume())}return n.join("").trim()}parse_string_concatenation(e){const n=[e.consume_type("STRING")];for(;e.has_more()&&e.peek_type()==="+";)e.consume_type("+"),n.push(e.consume_type("STRING"));return n.join("")}parse_string_argument(e){return e.peek_type()==="STRING"?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,"")}substatement_handler(e,n){const t=this.dispatch_key(e);if(typeof t=="string")return n[t]}skip_unsupported_or_raise_unknown(e,n){const t=e.peek();if((t===pn||t===fn)&&e.syntaxError(`'${t}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,n))return!0;const r=e.peek()??"<eof>";e.syntaxError(`Invalid or unknown statement '${r}' in ${n}`)}parse_prefixed_extension_statement_public(e,n){this.parse_prefixed_extension_statement(e,n)}consume_identifier_ref(e){const n=e.consume_type("IDENTIFIER").trim();return e.consume_if_type(":")?{prefix:n,name:e.consume_type("IDENTIFIER").trim()}:{name:n}}consume_qname_from_identifier(e){const n=this.consume_identifier_ref(e);return n.prefix?`${n.prefix}:${n.name}`:n.name}add_to_parent_or_module(e,n){const t=e.current_parent;if(t&&Array.isArray(t.statements)){t.statements.push(n);return}const r=e.module;Array.isArray(r.statements)&&r.statements.push(n)}skip_unsupported_if_present(e,n){return Kc(e)?(zc(e,{context:n}),!0):!1}parse_top_level_module(e,n){e.consume(zt);const t=e.consume_type("IDENTIFIER");n.module.name=t,e.consume_type("{");const r=[];for(;e.has_more()&&e.peek_type()!=="}";)r.push(this.parseStatement(e,n));return e.consume_type("}"),{__class__:"YangStatement",keyword:"module",name:t,argument:t,statements:r}}fromAst(e){var u,p;const n=Wc(e),t=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:"YangStatement",keyword:n,name:e.name,argument:e.name,statements:t};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);const i=e.config;if(typeof i=="boolean"&&(r.config=i),n==="leaf-list"){const d=e.defaults;Array.isArray(d)&&d.length>0&&(r.defaults=[...d])}e.key!==void 0&&(r.key=e.key);const s=e.min_elements;typeof s=="number"&&(r.min_elements=s);const o=e.max_elements;typeof o=="number"&&(r.max_elements=o),e.description&&(r.description=e.description);const c=e.reference;if(c&&(r.reference=c),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),n==="extension"&&(typeof e.argument_name=="string"&&(r.argument_name=e.argument_name),typeof e.argument_yin_element=="boolean"&&(r.argument_yin_element=e.argument_yin_element)),n==="augment"&&typeof e.augment_path=="string"){r.argument=e.augment_path,r.augment_path=e.augment_path;const d=e.augment_path_segments;Array.isArray(d)&&d.length>0&&(r.augment_path_segments=d.map(h=>h.prefix?{prefix:h.prefix,name:h.name}:{name:h.name}))}if(n==="extension-invocation"&&(r.keyword=e.name??"extension-invocation",r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=(u=e.resolved_module)==null?void 0:u.name,r.resolved_extension_name=(p=e.resolved_extension)==null?void 0:p.name),e.when&&typeof e.when.expression=="string"&&(r.when={expression:e.when.expression,description:e.when.description??"",evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(d=>this.fromMust(d))]),n==="uses"){const d=e;typeof d.grouping_name=="string"&&d.grouping_name.length>0&&(r.grouping_name=d.grouping_name,typeof d.grouping_prefix=="string"&&d.grouping_prefix.length>0&&(r.grouping_prefix=d.grouping_prefix),r.argument=d.grouping_qname()),Array.isArray(d.refines)&&d.refines.length>0&&(r.refines=d.refines.map(h=>this.serializeRefineStmt(h)))}const l=e.presence;return typeof l=="string"&&l.length>0&&(r.presence=l),r}serializeRefineStmt(e){const n={__class__:"YangStatement",keyword:"refine",name:"refine",argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements=="number"&&(n.min_elements=e.min_elements),typeof e.max_elements=="number"&&(n.max_elements=e.max_elements),typeof e.refined_mandatory=="boolean"&&(n.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(n.refined_defaults=[...e.refined_defaults]),typeof e.refined_config=="boolean"&&(n.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(n.if_features=[...e.if_features]),typeof e.description=="string"&&e.description.length>0&&(n.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(n.statements=e.must_statements.map(t=>this.fromMust(t))),n}serializeAstChildren(e){const n=[];for(const t of e)!t||typeof t!="object"||n.push(this.fromAst(t));return n}fromType(e){const n=ln({name:e.name,prefix:e.prefix});return{__class__:"YangStatement",keyword:"type",name:e.name,argument:n,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:"YangStatement",keyword:"must",name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){const n={name:e.name,patterns:e.patterns.map(t=>({pattern:t.pattern,invert_match:t.invert_match,error_message:t.error_message,error_app_tag:t.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:e.identityref_bases.map(t=>t.prefix?{prefix:t.prefix,name:t.name}:{name:t.name}),enums:[...e.enums],bits:e.bits.map(t=>({name:t.name,position:t.position??0})),types:e.types.map(t=>this.fromTypeShape(t))};return e.prefix&&(n.prefix=e.prefix),n}extract_type_shape(e){const n=e.argument??"string",t={name:n};for(const r of e.statements??[]){if(r.keyword==="pattern"&&r.argument){const i=t.patterns??[];i.push({pattern:r.argument,invert_match:!1}),t.patterns=i}if(r.keyword==="length"&&r.argument&&(t.length=r.argument),r.keyword==="range"&&r.argument&&(t.range=r.argument),r.keyword==="fraction-digits"&&r.argument){const i=Number.parseInt(r.argument,10);Number.isNaN(i)||(t.fraction_digits=i)}if(r.keyword==="enum"&&r.argument&&(t.enums=[...t.enums??[],r.argument]),r.keyword==="bit"&&r.argument){const i=t.bits??[];i.push({name:r.argument,position:i.length===0?0:Math.max(...i.map(s=>s.position))+1}),t.bits=i}n==="union"&&r.keyword==="type"&&(t.types=[...t.types??[],this.extract_type_shape(r)])}return t}parse_description(e,n){e.consume(ge);const t=e.consume_type("STRING");if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";");const r=n.current_parent;return r&&"description"in r&&(r.description=t),t}parse_optional_description(e,n){e.has_more()&&e.peek()===ge&&this.parse_description(e,n)}parse_reference(e,n){e.consume(Ee);const t=e.consume_type("STRING");e.consume_if_type(";");const r=n.current_parent;r&&typeof r=="object"&&"reference"in r&&(r.reference=t)}parse_reference_string_only(e,n){this.parse_reference(e,n)}parse_status_ignored(e,n){Hc(e)}parse_config(e,n){e.consume(un);const t=e.consume_oneof([J,he])[1],r=n.current_parent;r instanceof Un?r.refined_config=t===J:r&&typeof r=="object"&&"config"in r&&(r.config=t===J),e.consume_if_type(";")}parse_typedef_default(e,n){e.consume(Yn);const t=n.current_parent;t instanceof Ts&&(t.default=this.parse_default_value_tokens(e)),e.consume_if_type(";")}register_import(e,n,t,r,i){const s=e.module,o=String(s.prefix??"").replace(/^['"]|['"]$/g,"");if(t===o)throw new U(`Import prefix '${t}' must differ from this module's prefix`);const c=s.import_prefixes??{};if(s.import_prefixes=c,c[t])throw new U(`Duplicate import prefix '${t}'`);if(!this.importResolver)throw new U("Import resolution is not configured for this parser instance");c[t]=this.importResolver(n,t,r,e,i)}parse_ordered_by(e){e.consume(oi),e.consume(),e.consume_if_type(";")}parse_list_key(e,n){e.consume(ii);const[t]=e.consume_oneof(["STRING","IDENTIFIER"]),r=n.current_parent;r&&"key"in r&&(r.key=t),e.consume_if_type(";")}parse_min_elements(e,n){e.consume(si);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"min_elements"in r&&(r.min_elements=t),e.consume_if_type(";")}parse_max_elements(e,n){e.consume(ai);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"max_elements"in r&&(r.max_elements=t),e.consume_if_type(";")}parse_leaf_mandatory(e,n){e.consume(Qn);const[,t]=e.consume_oneof([J,he]),r=n.current_parent;if(r instanceof Un){r.refined_mandatory=t===J,e.consume_if_type(";");return}r&&typeof r=="object"&&"mandatory"in r&&(r.mandatory=t===J),e.consume_if_type(";")}parse_leaf_default(e,n){e.consume(Yn);const t=this.parse_default_value_tokens(e),r=n.current_parent;r instanceof Un?r.refined_defaults.push(t):r instanceof Ns?r.defaults.push(t):r&&typeof r=="object"&&"default"in r&&(r.default=t),e.consume_if_type(";")}parse_presence(e,n){e.consume(Kt);const t=n.current_parent,r=e.consume_type("STRING");t&&"presence"in t&&(t.presence=r),e.consume_if_type(";")}parse_default_value_tokens(e){const n=e.peek_type();if(n==="STRING")return e.consume_type("STRING");if(n==="INTEGER")return e.consume_type("INTEGER");if(n==="IDENTIFIER")return e.consume_type("IDENTIFIER");if(n===J)return e.consume(J),"true";if(n===he)return e.consume(he),"false";throw new U(`Expected default value, got ${n}`)}parse_prefixed_extension_statement(e,n){const t=e.consume_type("IDENTIFIER");e.consume_type(":");const r=e.consume_type("IDENTIFIER"),i=this.resolve_prefixed_module(n,t);if(!i)throw new U(`Unknown extension prefix '${t}' in invocation ${t}:${r}`);const s=this.resolve_extension_definition(i,r);if(!s)throw new U(`Unknown extension '${r}' in module '${i.name??""}' for invocation ${t}:${r}`);const o=this.consume_optional_extension_argument(e),c=new _c({name:`${t}:${r}`,prefix:t,resolved_module:i,resolved_extension:s,argument:o});if(e.consume_if_type("{")){const l=n.push_parent(c);for(;e.has_more()&&e.peek_type()!=="}";)this.parseStatement(e,l);e.consume_type("}")}return e.consume_if_type(";"),this.add_to_parent_or_module(n,c),this.fromAst(c)}consume_optional_extension_argument(e){if(!e.has_more())return;const n=e.peek_type();if(!(n==="{"||n===";")){if(n==="STRING")return this.parse_string_concatenation(e);if(n==="IDENTIFIER"||n==="INTEGER"||n==="DOTTED_NUMBER"||n===J||n===he)return e.consume()}}resolve_prefixed_module(e,n){const t=e.module,r=String(t.prefix??"").replace(/^['"]|['"]$/g,"");if(n===r)return t;const i=t.import_prefixes;return i==null?void 0:i[n]}resolve_extension_definition(e,n){var s;const t=(s=e.extensions)==null?void 0:s[n];if(t)return t;const i=(Array.isArray(e.statements)?e.statements:[]).find(o=>o.keyword==="extension"&&o.name===n);if(i)return new Ht({name:n,argument_name:typeof i.argument_name=="string"?i.argument_name:"",argument_yin_element:typeof i.argument_yin_element=="boolean"?i.argument_yin_element:void 0})}};function Xc(e,n){if(n!=="'"&&n!=='"')throw new Error(`quote must be "'" or '"', got ${JSON.stringify(n)}`);const t=[];let r=0;const i=e.length;for(;r<i;){const s=e[r];if(s!=="\\"||r+1>=i){t.push(s),r+=1;continue}const o=e[r+1];if(o==="\\"){t.push("\\"),r+=2;continue}if(o==="n"){t.push(`
`),r+=2;continue}if(o==="t"){t.push("	"),r+=2;continue}if(n==='"'&&o==='"'){t.push('"'),r+=2;continue}if(n==="'"&&o==="'"){t.push("'"),r+=2;continue}if(o==="\r"||o===`
`){for(r+=2,o==="\r"&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===" "||e[r]==="	");)r+=1;continue}t.push("\\",o),r+=2}return t.join("")}var Zc=/[A-Za-z_]/,Qc=/[A-Za-z0-9_.-]/,el=class{tokenize(e,n){const t=[];let r=0;const i=e.length;let s=1,o=0;const c=()=>{r<i&&e[r]===`
`&&(s+=1,o=r+1),r+=1},l=(u,p,d,h,g)=>{const m=d-g;t.push(Oo(u,p,h,m))};for(;r<i;){if(/\s/.test(e[r])){c();continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="*"){for(c(),c();r<i;){if(r+1<i&&e[r]==="*"&&e[r+1]==="/"){c(),c();break}c()}continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="/"){for(c(),c();r<i&&e[r]!==`
`;)c();continue}const u=e[r];if(u==='"'||u==="'"){const p=u,d=r,h=s,g=o;c();const m=r;for(;r<i&&e[r]!==p;)e[r]==="\\"&&r+1<i&&c(),c();l("STRING",Xc(e.slice(m,r),p),d,h,g),c();continue}if(u==="-"&&r+1<i&&/\d/.test(e[r+1])){const p=r,d=s,h=o;c();const g=r;for(;r<i&&/\d/.test(e[r]);)c();l("INTEGER",`-${e.slice(g,r)}`,p,d,h);continue}if(/\d/.test(u)){const p=r,d=s,h=o,g=r;for(;r<i&&/\d/.test(e[r]);)c();if(r<i&&e[r]==="."&&r+1<i&&/\d/.test(e[r+1])){for(c();r<i&&/\d/.test(e[r]);)c();l("DOTTED_NUMBER",e.slice(g,r),p,d,h)}else l("INTEGER",e.slice(g,r),p,d,h);continue}if(Zc.test(u)){const p=r,d=s,h=o,g=r;for(c();r<i&&Qc.test(e[r]);)c();const m=e.slice(g,r);l("IDENTIFIER",m,p,d,h);continue}u==="{"?(l("{",u,r,s,o),c()):u==="}"?(l("}",u,r,s,o),c()):u===";"?(l(";",u,r,s,o),c()):u===":"?(l(":",u,r,s,o),c()):u==="="?(l("=",u,r,s,o),c()):u==="+"?(l("+",u,r,s,o),c()):(u==="/"&&l("/",u,r,s,o),c())}return new Ro(t,e,n)}},dn="ietf-yang-structure-ext:structure-index";function ue(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function hn(e){return Array.isArray(e)?e:[]}function nl(e){return JSON.parse(JSON.stringify(e))}function tl(e,n){if(n.length===0)return;const t=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...n,...t]}function rl(e,n){if(!n||typeof n.expression!="string")return;const t=n.expression,r=ue(e.when)?e.when:void 0,i=typeof(r==null?void 0:r.expression)=="string"?r.expression:void 0;if(i){const s=typeof(r==null?void 0:r.description)=="string"?r.description:"";e.when={expression:`(${t}) and (${i})`,description:s,evaluate_with_parent_context:!0};return}e.when={expression:t,description:typeof n.description=="string"?n.description:"",evaluate_with_parent_context:!0}}function il(e,n){try{return ct(e)}catch(t){const r=t instanceof Error?t.message:String(t);throw new U(`${n}: ${r}`)}}function hi(e,n,t,r){const i=String(e.prefix??"").replace(/^['"]|['"]$/g,"");if(n===i)return e;const s=ue(e.import_prefixes)?e.import_prefixes:void 0,o=s&&ue(s[n])?s[n]:void 0;if(!o)throw new U(`${r}: unknown prefix '${n}' in path '${t}'`);return o}function sl(e,n){return hn(e.statements).find(r=>r.name===n)}function al(e,n){const t=ue(e.extension_runtime)?e.extension_runtime:void 0,r=t&&ue(t[dn])?t[dn]:void 0,i=r==null?void 0:r[n];return ue(i)?i:hn(e.statements).find(o=>(typeof o.resolved_extension_name=="string"?o.resolved_extension_name:"")==="structure"&&String(o.argument??"").trim()===n)}function ol(e,n){const t=il(n,"augment-structure"),r=t[0],i=r.prefix,s=hi(e,i,n,"augment-structure");let o=al(s,r.name);if(!o)throw new U(`augment-structure: no top-level structure '${r.name}' in path '${n}'`);for(const c of t.slice(1)){hi(e,c.prefix,n,"augment-structure");const l=sl(o,c.name);if(!l)throw new U(`augment-structure: no child '${c.name}' in path '${n}'`);o=l}return o}function cl(e,n){const t=String(e.resolved_module_name??""),r=String(e.resolved_extension_name??"");if(t!=="ietf-yang-structure-ext")return e;if(r==="structure"){const i=ue(n.extension_runtime)?n.extension_runtime:n.extension_runtime={},s=ue(i[dn])?i[dn]:i[dn]={},o=String(e.argument??"").trim();return o.length>0&&(s[o]=e,e.name=o),e.data_node_kind="container",e}if(r==="augment-structure"){const i=String(e.argument??""),s=ol(n,i),o=hn(e.statements).map(u=>nl(u)),c=Array.isArray(e.if_features)?e.if_features:[],l=ue(e.when)?e.when:void 0;for(const u of o){tl(u,c),rl(u,l);const p=hn(s.statements);p.push(u),s.statements=p}return}return e}function Os(e,n){const t=hn(e.statements),r=[];for(const i of t){let s=i;typeof i.resolved_module_name=="string"&&typeof i.resolved_extension_name=="string"&&(s=cl(i,n)),s&&(Os(s,n),r.push(s))}e.statements=r}function ll(e){Os(e,e)}var ul=new Set(["container","list","leaf","leaf-list","choice","case","anydata","anyxml","notification","rpc","action","input","output"]);function Rs(e){return JSON.parse(JSON.stringify(e))}function Ke(e){return Array.isArray(e)?e:[]}function pl(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function _i(e,n){if(n===pl(e))return e;const t=e.import_prefixes,r=t==null?void 0:t[n];return r&&typeof r=="object"?r:void 0}function fl(e,n){const t=e.augment_path_segments;if(Array.isArray(t)&&t.length>0)return t;try{return ct(n)}catch(r){throw new ee(r instanceof Error?r.message:String(r))}}function Ps(e){const n=typeof e.keyword=="string"?e.keyword:"";return!!e.name&&ul.has(n)}function dl(e,n){for(const t of Ke(e.statements))if(t.name===n&&Ps(t))return t}function ml(e,n){for(const t of Ke(e.statements))if(t.name===n&&Ps(t))return t}function hl(e,n,t){return _l({ctxModule:e,path:n,segments:t?fl(t,n):void 0,kind:"augment",findToplevel:ml})}function _l(e){const{ctxModule:n,path:t,kind:r,findToplevel:i}=e;let s=e.segments;if(!s||s.length===0)try{s=ct(t)}catch(d){throw new ee(d instanceof Error?d.message:String(d))}const o=s[0],c=o.prefix,l=o.name,u=_i(n,c);if(!u)throw new ee(`${r}: unknown prefix '${c}' in path '${t}' (module '${String(n.name??"")}')`);let p=i(u,l);if(!p)throw new ee(`${r}: no top-level schema node '${l}' in module '${String(u.name??"")}' (path '${t}')`);for(const d of s.slice(1)){const h=d.prefix,g=d.name;if(!_i(n,h))throw new ee(`${r}: unknown prefix '${h}' in path '${t}'`);const m=dl(p,g);if(!m)throw new ee(`${r}: no child '${g}' under node in path '${t}' (after '${String(p.name??"")}')`);p=m}if(!Array.isArray(p.statements)&&p.statements!==void 0)throw new ee(`${r}: target node '${String(p.name??"?")}' cannot contain schema substatements (path '${t}')`);return p.statements===void 0&&(p.statements=[]),p}function Ls(e,n){e.defining_module=n;for(const t of Ke(e.statements))Ls(t,n)}function gl(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function yl(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...Rs(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${String(i.expression)}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function vl(e,n,t){const r=Ke(e.statements).map(s=>Rs(s));for(const s of r)Ls(s,t),gl(e,s),yl(e,s);const i=Ke(n.statements);for(const s of r)i.push(s);n.statements=i}function bl(e){const n=e.data,t=Ke(n.statements),r=t.filter(s=>s.keyword==="augment");if(r.length===0)return e;const i=String(n.name??"");for(const s of r){const o=String(s.augment_path??s.argument??""),c=hl(n,o,s);vl(s,c,i)}return n.statements=t.filter(s=>s.keyword!=="augment"),e}function ke(e){return JSON.parse(JSON.stringify(e))}function js(e){return!e||typeof e!="object"?{}:e}function Ms(e){return!e||typeof e!="object"?{}:e}function Ds(e){if(typeof e.grouping_name!="string"||!e.grouping_name)return;const n=e.grouping_name,t=typeof e.grouping_prefix=="string"&&e.grouping_prefix?e.grouping_prefix:void 0;return t?{prefix:t,name:n}:{name:n}}function xl(e,n){const t=ln(e);if(!e.name)throw new U("Empty grouping name in uses");if(e.prefix){const i=n.import_prefixes[e.prefix];if(!i)throw new U(`Unknown import prefix '${e.prefix}' in uses '${t}'`);const s=js(i.groupings),o=s[e.name];if(!o)throw new U(`Unknown grouping '${t}'`);return{key:t,grouping:o,nestedScope:{groupings:s,import_prefixes:Ms(i.import_prefixes)}}}const r=n.groupings[e.name];if(!r)throw new U(`Unknown grouping '${t}'`);return{key:t,grouping:r,nestedScope:n}}function Fs(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function Vs(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...ke(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${i.expression}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function Ys(e,n){for(const t of e)if(t.name===n)return t;for(const t of e){const r=Ys(t.statements??[],n);if(r)return r}}function Bs(e,n){if(n.length===0)return;const[t,...r]=n,i=Ys(e,t);if(i)return r.length===0?i:Bs(i.statements??[],r)}function Us(e,n){const t=e.refines;if(!(!Array.isArray(t)||t.length===0))for(const r of t){const i=r.refine_target_path??r.argument??"",s=i.split("/").map(d=>d.trim()).filter(Boolean);if(s.length===0)continue;const o=Bs(n,s);if(!o)throw new Eo(i);typeof r.min_elements=="number"&&(o.min_elements=r.min_elements),typeof r.max_elements=="number"&&(o.max_elements=r.max_elements),typeof r.refined_mandatory=="boolean"&&(o.mandatory=r.refined_mandatory),typeof r.refined_config=="boolean"&&(o.config=r.refined_config);const c=r.refined_defaults;Array.isArray(c)&&c.length>0&&(o.keyword==="leaf"?o.default=c[0]:o.keyword==="leaf-list"&&(o.defaults=[...c]));const l=r.if_features;if(Array.isArray(l)&&l.length>0){const d=Array.isArray(o.if_features)?o.if_features:[];o.if_features=[...l,...d]}const u=typeof r.description=="string"?r.description.trim():"";u&&(o.description=u);const p=r.statements??[];p.length>0&&(o.statements=[...o.statements??[],...ke(p)])}}function wl(e,n){var i;const t=typeof n.argument=="string"&&n.argument||typeof n.name=="string"&&n.name||"";if(!t||t in e)return;const r=(i=n.statements)==null?void 0:i.find(s=>s.keyword==="type");e[t]={name:t,description:typeof n.description=="string"?n.description:"",reference:typeof n.reference=="string"?n.reference:"",default:n.default,type:n.type??(r==null?void 0:r.type),statements:n.statements??[]}}function Sl(e,n){const t=[];for(const r of n){if(r.keyword==="typedef"){wl(e,r);continue}t.push(r)}return t}function qs(e,n,t,r){const i=xl(e,n);if(t.includes(i.key))throw new ko(t,i.key);const s=[...t,i.key],o=i.grouping.statements??[],c=[];for(const u of o)if(u.keyword==="uses"){const p=Ds(u);if(!p)continue;const d=qs(p,i.nestedScope,s,r);Us(u,d);for(const h of d)Fs(u,h),Vs(u,h),c.push(ke(h))}else u.keyword,c.push(ke(u));return Sl(r,c).map(u=>Wt(u,i.nestedScope,s,r))}function Wt(e,n,t,r){var i;return(i=e.statements)!=null&&i.length&&(e.statements=Jt(e.statements,n,t,r)),e}function Jt(e,n,t,r){const i=[];for(const s of e)if(s.keyword==="uses"){const o=Ds(s);if(!o)continue;const c=qs(o,n,t,r);Us(s,c);for(const l of c)Fs(s,l),Vs(s,l),i.push(Wt(l,n,t,r))}else i.push(Wt(ke(s),n,t,r));return i}function Al(e){var c;const n=e.data,t=n.import_prefixes,r=ke(n);t&&typeof t=="object"&&(r.import_prefixes=t),n.features instanceof Set&&(r.features=new Set(n.features)),n.feature_if_features&&typeof n.feature_if_features=="object"&&(r.feature_if_features={...n.feature_if_features});const i={groupings:js(r.groupings),import_prefixes:Ms(r.import_prefixes)},s=r.typedefs&&typeof r.typedefs=="object"?r.typedefs:{};r.typedefs=s;const o=r.statements??[];r.statements=Jt(o,i,[],s);for(const l of Object.values(i.groupings))(c=l.statements)!=null&&c.length&&(l.statements=Jt(l.statements,i,[],s));return new ir(r,e.source)}function Gs(e){const n=[];for(const t of e??[])n.push(t),n.push(...Gs(t.statements));return n}function Il(e){for(const n of Gs(e.data.statements)){if(n.keyword!=="list"||typeof n.key!="string"||n.key.trim()==="")continue;const t=new Map((n.statements??[]).filter(r=>r.keyword==="leaf"&&typeof r.name=="string").map(r=>[r.name,r]));for(const r of n.key.split(/\s+/).filter(Boolean)){const i=t.get(r);if(i===void 0)throw new U(`List '${n.name??""}': key leaf '${r}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let s;if(i.when!==void 0?s="when":Array.isArray(i.if_features)&&i.if_features.length>0&&(s="if-feature"),s!==void 0)throw new U(`List '${n.name??""}': key leaf '${i.name}' must not have '${s}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function Tl(e){Il(e)}function El(e){const n={};if(!e)return n;for(const[t,r]of Object.entries(e)){const i=Array.isArray(r.bases)?r.bases.map(s=>Ko(s)).filter(s=>!!s):[];n[t]={bases:i}}return n}function kl(e,n){var l,u,p,d;if(e.keyword!=="module")throw new U("Only 'module' roots are currently supported by TS parser");const t=e.statements??[],r={};for(const h of t)if(h.keyword==="typedef"&&h.argument){const g=(l=h.statements)==null?void 0:l.find(m=>m.keyword==="type");r[h.argument]={name:h.argument,description:typeof h.description=="string"?h.description:"",reference:typeof h.reference=="string"?h.reference:"",default:h.default,type:h.type??(g==null?void 0:g.type),statements:h.statements??[]}}const i=n.features,s=n.feature_if_features,o=t.find(h=>h.keyword==="description"),c=typeof(o==null?void 0:o.argument)=="string"?o.argument:"";return{__class__:"YangModule",name:e.argument,yang_version:((u=t.find(h=>h.keyword==="yang-version"))==null?void 0:u.argument)??"1.1",namespace:((p=t.find(h=>h.keyword==="namespace"))==null?void 0:p.argument)??"",prefix:((d=t.find(h=>h.keyword==="prefix"))==null?void 0:d.argument)??"",organization:String(n.organization??""),contact:String(n.contact??""),description:c,typedefs:r,identities:El(n.identities),import_prefixes:n.import_prefixes??{},extensions:n.extensions??{},extension_runtime:n.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:s&&typeof s=="object"?{...s}:{},statements:t}}var zs=class{constructor(e={}){y(this,"expandUses");y(this,"includePath");y(this,"moduleCache",new Map);y(this,"tokenizer",new el);y(this,"parsers",new Jc({importResolver:(e,n,t,r,i)=>this.resolveImport(e,t,r,i)}));this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(n=>Ue(n))}resolveImportedModulePath(e,n,t){const r=n==null?void 0:n.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);const s=[t,...this.includePath];for(const o of s){for(const l of i){const u=Ue(o,l);if(Go(u))return u}let c=[];try{c=zo(o).filter(l=>l.startsWith(`${e}@`)&&l.endsWith(".yang"))}catch{c=[]}if(c.length>0)return c.sort(),Ue(o,c[c.length-1])}throw new U(`Could not find imported module '${e}' (tried ${i.join(", ")}) under ${s.join(", ")}`)}resolveImport(e,n,t,r){const i=t.module.__source_path;if(!i)throw new U("import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)");const s=this.resolveImportedModulePath(e,n,ts(i));return this.parseFile(s).data}parseTokenStream(e,n){const t={name:"",yang_version:"1.1",namespace:"",prefix:"",organization:"",contact:"",revisions:[],belongs_to_module:"",typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:n.kind==="file"?n.value:void 0,statements:[]},r=new Po({module:t,current_parent:{}}),i=this.parsers.parseModule(e,r),s=kl(i,t),o=t.groupings??{},c={};for(const[u,p]of Object.entries(o)){if(!p||typeof p!="object")continue;const d=p,h=d.name??u;c[u]={__class__:"YangStatement",keyword:"grouping",name:h,argument:h,statements:(d.statements??[]).map(g=>this.parsers.serializeAstStatement(g))}}Object.keys(c).length>0&&(s.groupings=c),ll(s);let l=new ir(s,n);return this.expandUses&&(l=Al(l),l=bl(l),Tl(l)),l}parseString(e,n="<memory>"){const t=this.tokenizer.tokenize(e,n),r={kind:"string",value:e,name:n};return this.parseTokenStream(t,r)}parseFile(e){const n=Ue(e),t=this.moduleCache.get(n);if(t)return t;const r=qo(n),i=this.tokenizer.tokenize(r,n),s={kind:"file",value:n,name:n},o=this.parseTokenStream(i,s);return this.moduleCache.set(n,o),o}};new zs;function Nl(e){return String(e??"").replace(/^['"]|['"]$/g,"")}function or(e){return String(e.name??"")}function Ks(e){const n=e.features;return n instanceof Set?new Set(n):Array.isArray(n)?new Set(n):new Set}function Hs(e,n){const t=Nl(e.prefix);if(n===t)return e;const r=e.import_prefixes,i=r==null?void 0:r[n];if(i&&typeof i=="object")return i}function $l(e){const n=[],t=new Set,r=i=>{if(t.has(i))return;t.add(i),n.push(i);const s=i.import_prefixes;if(s)for(const o of Object.values(s))o&&typeof o=="object"&&r(o)};return r(e),n}function Cl(e,n,t){const r=typeof t=="string"?bn(t):t;let i;if(r.prefix){const c=Hs(e,r.prefix);if(!c)return!1;i=c}else i=e;const s=r.name;if(!Ks(i).has(s))return!1;const o=n[or(i)];return o?o.has(s):!1}function Ol(e){const n=[];let t=0;const r=e.length;for(;t<r;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==="("||i===")"){n.push(i),t+=1;continue}let s=t;for(;s<r&&!/\s/.test(e[s])&&e[s]!=="("&&e[s]!==")";)s+=1;n.push(e.slice(t,s)),t=s}return n}var Rl=class{constructor(e,n,t){y(this,"toks");y(this,"ctx");y(this,"enabled");y(this,"i",0);this.toks=e,this.ctx=n,this.enabled=t}peek(){return this.toks[this.i]}eat(e){const n=this.peek();if(n===void 0)throw new Error("unexpected end of expression");if(e!==void 0&&n!==e)throw new Error(`expected ${e}, got ${n}`);return this.i+=1,n}parseExpr(){let e=this.parseTerm();for(;this.peek()==="or";){this.eat("or");const n=this.parseExpr();e=e||n}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()==="and";){this.eat("and");const n=this.parseTerm();e=e&&n}return e}parseFactor(){const e=this.peek();if(e==="not")return this.eat("not"),!this.parseFactor();if(e==="("){this.eat("(");const n=this.parseExpr();return this.eat(")"),n}if(e===void 0)throw new Error("unexpected end of expression");return this.eat(),Cl(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function Pl(e,n,t){const r=e.trim();if(!r)return!1;try{const i=new Rl(Ol(r),n,t),s=i.parseExpr();return i.atEnd()?s:!1}catch{return!1}}function sn(e,n,t){return!e||e.length===0?!0:e.every(r=>Pl(r,n,t))}function Ll(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function jl(e,n){let t=!0;for(;t;){t=!1;const i={};for(const[s,o]of Object.entries(n))i[s]=new Set(o);for(const s of e){const o=or(s),c=n[o];if(!c)continue;const l=s.feature_if_features;for(const u of[...c]){const p=l==null?void 0:l[u];p!=null&&p.length&&(sn(p,s,i)||(c.delete(u),t=!0))}}}const r={};for(const[i,s]of Object.entries(n))r[i]=new Set(s);return r}function gi(e,n){const t=$l(e),r=Ll(n),i={};for(const s of t){const o=or(s),c=Ks(s);r===null||!r.has(o)?i[o]=new Set(c):i[o]=new Set(r.get(o)??[])}return jl(t,i)}function Ml(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Xt(e){const n=e.identities;return!n||typeof n!="object"?{}:n}function Dl(e){return typeof e=="string"?bn(e):e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}}function Fl(e,n){const t=Ml(e);if(n===t)return e;const i=(e.import_prefixes??{})[n];return i&&typeof i=="object"?i:void 0}function rt(e,n){const t=bn(n);return t.prefix?Ws(e.data,t):null}function Ws(e,n){const t=Dl(n);if(t.prefix){const r=Fl(e,t.prefix);return!r||!(t.name in Xt(r))?null:{mod:r,local:t.name}}return t.name in Xt(e)?{mod:e,local:t.name}:null}function cr(e,n){return e.mod===n.mod&&e.local===n.local}function Js(e,n){return n.some(t=>cr(t,e))}var yi=new WeakMap,vi=1;function Vl(e){let n=yi.get(e);return n===void 0&&(n=vi,vi+=1,yi.set(e,n)),n}function Yl(e){return`${Vl(e.mod)}:${e.local}`}function Xs(e,n){const t={mod:e,local:n},r=[],i=new Set,s=[t];for(;s.length>0;){const o=s.pop(),c=Yl(o);if(i.has(c))continue;i.add(c),r.push(o);const l=Xt(o.mod)[o.local];if(l!=null&&l.bases)for(const u of l.bases){const p=Ws(o.mod,u);p&&s.push(p)}}return r}function Bl(e,n,t){const r=rt(e,n),i=rt(e,t);if(!r||!i)return!1;const s=Xs(r.mod,r.local).filter(o=>!cr(o,r));return Js(i,s)}function Ul(e,n,t){const r=rt(e,n),i=rt(e,t);return!r||!i?!1:cr(r,i)?!0:Js(i,Xs(r.mod,r.local))}function Ie(e){return!!e&&typeof e=="object"&&"schema"in e&&"parent"in e}function Be(e){return Array.isArray(e)&&(e.length===0||Ie(e[0]))}function le(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e!=="":e!=null}function Oe(e){return Array.isArray(e)?e.map(n=>Ie(n)?n.data:n):Ie(e)?[e.data]:e==null?[]:[e]}function W(e){return Oe(e)[0]}function lr(e,n){if(typeof e=="boolean"||typeof n=="boolean")return[le(e),le(n)];if(typeof e=="number"&&typeof n=="number")return[e,n];const t=Number(e),r=Number(n);return!Number.isNaN(t)&&!Number.isNaN(r)?[t,r]:[String(e??"").trim(),String(n??"").trim()]}function Mn(e,n){const t=Oe(e),r=Array.isArray(n)&&!Be(n)?n:Oe(n);if(t.length===0||r.length===0)return t.length===0&&r.length===0;for(const i of t)for(const s of r){if(i==null&&s==null)return!0;if(i==null||s==null)continue;const[o,c]=lr(i,s);if(o===c)return!0}return!1}function bi(e,n){for(const t of Oe(e))for(const r of Oe(n)){const[i,s]=lr(t,r);if(typeof i=="number"&&typeof s=="number"){if(i<s)return!0;continue}if(`${i}`<`${s}`)return!0}return!1}function xi(e,n){for(const t of Oe(e))for(const r of Oe(n)){const[i,s]=lr(t,r);if(typeof i=="number"&&typeof s=="number"){if(i>s)return!0;continue}if(`${i}`>`${s}`)return!0}return!1}function ql(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function Gl(e,n){for(const t of ql(e))if((t==null?void 0:t.name)===n)return t;return null}function zl(e){var r,i,s;if(!e||e.keyword!=="leaf")return;const n=(r=e.data)==null?void 0:r.default;if(((s=(i=e.data)==null?void 0:i.type)==null?void 0:s.name)==="boolean"&&typeof n=="string"){const o=n.toLowerCase();if(o==="true")return!0;if(o==="false")return!1}return n}function Zs(e,n){const t=e.data,r=e.schema;if(Array.isArray(t)&&((r==null?void 0:r.keyword)==="list"||(r==null?void 0:r.keyword)==="leaf-list")){const o=[];for(const c of t){const l={data:c,schema:r,parent:e};o.push(...Zs(l,n))}return o}const i=Gl(r,n);let s;if(t&&typeof t=="object"&&!Array.isArray(t)){const o=t;n in o?(s=o[n],s===null&&(s=!0)):s=zl(i)}return s===void 0?[]:(i==null?void 0:i.keyword)==="list"||(i==null?void 0:i.keyword)==="leaf-list"?Array.isArray(s)?s.map(o=>({data:o,schema:i,parent:e})):[{data:s,schema:i,parent:e}]:[{data:s,schema:i,parent:e}]}var Kl=class{eval(e,n,t){switch(e.kind){case"literal":return e.value;case"path":return this.evalPath(e,n,t);case"binary":return this.evalBinary(e,n,t);case"function":return this.evalFunction(e.name,e.args,n,t);default:return null}}evalPath(e,n,t){let r=[e.isAbsolute?n.root:t];for(const i of e.segments){if(i.step!==".")if(i.step==="..")r=r.map(s=>s.parent).filter(s=>!!s);else{const s=[];for(const o of r)s.push(...Zs(o,i.step));r=s}if(i.predicate){const s=[];for(let o=0;o<r.length;o+=1){const c=r[o],l=this.eval(i.predicate,n,c);let u=!1;typeof l=="number"&&Number.isFinite(l)?u=Math.trunc(l)===o+1:u=le(l),u&&s.push(c)}r=s}}return r}evalBinary(e,n,t){const r=e.operator;if(r==="or"){const o=this.eval(e.left,n,t);return le(o)?!0:le(this.eval(e.right,n,t))}if(r==="and"){const o=this.eval(e.left,n,t);return le(o)?le(this.eval(e.right,n,t)):!1}if(r==="/"){const o=this.eval(e.left,n,t),c=Be(o)?o:Ie(o)?[o]:[],l=[];for(const u of c){const p=this.eval(e.right,n,u);Be(p)?l.push(...p):Ie(p)&&l.push(p)}return l}const i=this.eval(e.left,n,t),s=this.eval(e.right,n,t);if(r==="=")return Mn(i,s);if(r==="!=")return!Mn(i,s);if(r==="<")return bi(i,s);if(r===">")return xi(i,s);if(r==="<=")return Mn(i,s)||bi(i,s);if(r===">=")return Mn(i,s)||xi(i,s);if(r==="+"){const o=Number(W(i))+Number(W(s));return Number.isNaN(o)?Number.NaN:o}if(r==="-"){const o=Number(W(i))-Number(W(s));return Number.isNaN(o)?Number.NaN:o}if(r==="*"){const o=Number(W(i))*Number(W(s));return Number.isNaN(o)?Number.NaN:o}return null}evalFunction(e,n,t,r){var s,o,c;const i=e.toLowerCase();if(i==="current")return t.current;if(i==="not")return n.length!==1?null:!le(this.eval(n[0],t,r));if(i==="true")return!0;if(i==="false")return!1;if(i==="count"){if(n.length!==1)return 0;const l=this.eval(n[0],t,r);return Be(l)?l.length:l==null?0:1}if(i==="string"){if(n.length!==1)return"";const l=W(this.eval(n[0],t,r));return l==null?"":String(l)}if(i==="number"){if(n.length!==1)return Number.NaN;const l=W(this.eval(n[0],t,r)),u=Number(l);return Number.isNaN(u)?Number.NaN:u}if(i==="boolean")return n.length!==1?!1:le(this.eval(n[0],t,r));if(i==="string-length"){if(n.length!==1)return 0;const l=W(this.eval(n[0],t,r));return l==null?0:String(l).length}if(i==="concat")return n.map(l=>String(W(this.eval(l,t,r))??"")).join("");if(i==="translate"){if(n.length!==3)return"";const l=String(W(this.eval(n[0],t,r))??""),u=String(W(this.eval(n[1],t,r))??""),p=String(W(this.eval(n[2],t,r))??"");if(u.length===0)return l;const d=new Map;for(let g=0;g<u.length;g+=1)d.set(u[g],g<p.length?p[g]:null);let h="";for(const g of l){if(!d.has(g)){h+=g;continue}const m=d.get(g);m!=null&&(h+=m)}return h}if(i==="deref"){if(n.length!==1)return[];const l=t.current??r,u=this.eval(n[0],t,l),p=Be(u)?u:Ie(u)?[u]:[],d=[];for(const h of p){const g=(o=(s=h.schema)==null?void 0:s.data)==null?void 0:o.type;if(!g||g.name!=="leafref")continue;const m=g.path;if(!m||m.kind!=="path")continue;const _=this.evalPath(m,t,h);for(const w of _)w.data===h.data&&d.push(w)}return d}if(i==="derived-from"||i==="derived-from-or-self"){if(n.length!==2)return!1;const l=(c=t.root)==null?void 0:c.schema;if(!(l instanceof ir))return!1;const u=l,p=t.current??r;let d=this.eval(n[0],t,p);if(Be(d)){if(d.length===0)return!1;d=d[0].data}else Ie(d)?d=d.data:d=W(d);if(typeof d!="string")return!1;const h=this.eval(n[1],t,p),g=W(h);return typeof g!="string"?!1:i==="derived-from"?Bl(u,d,g):Ul(u,d,g)}return null}};function it(e){if(e===null)return"null";const n=typeof e;if(n==="undefined")return"undefined";if(typeof e=="string"){const t=e;return t.length>100?`string(len=${t.length}):${JSON.stringify(t.slice(0,80))}…`:JSON.stringify(t)}if(n==="number"||n==="boolean"||n==="bigint")return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(n==="object")try{const t=JSON.stringify(e);return t.length>160?`${t.slice(0,160)}…`:t}catch{return"[object]"}return String(e)}function st(e,n,t){e&&console.debug(`[xYang:type-validation] ${n}`,t)}function Dn(e,n){const t=n&&typeof n.prefix=="string"&&n.prefix?n.prefix:void 0;return t?{prefix:t,name:e}:{name:e}}var Ut=class{constructor(e,n={}){y(this,"module");y(this,"system",new Yo);y(this,"typeValidationDebug");this.module=e,this.typeValidationDebug=n.typeValidationDebug===!0}lookupTypedef(e){var t;if(e.prefix){const r=Hs(this.module.data,e.prefix);if(!r)return;const i=(t=r.typedefs)==null?void 0:t[e.name];return i!=null&&i.type&&typeof i.type.name=="string"?i:void 0}const n=this.module.typedefs[e.name];if(n!=null&&n.type&&typeof n.type.name=="string")return n}resolveUnderlyingBuiltinName(e,n){const t=new Set;let r=Dn(e,n);for(;t.size<64;){const i=this.lookupTypedef(r);if(!(i!=null&&i.type)||typeof i.type.name!="string")return r.name;if(i.type.name==="union")return ln(r);const s=ln(r);t.add(s);const o=Dn(i.type.name,i.type);if(ln(o)===s)return r.name;r=o}return r.name}validate(e,n,t){var c;let r,i;const s=Dn(n,t),o=this.lookupTypedef(s);if(o!=null&&o.type&&typeof o.type.name=="string"){const l=new Hn(o.type);o.type.name==="union"?(r="typedef-union",i=this.validateUnion(e,l)):this.lookupTypedef(Dn(o.type.name,o.type))?(r="typedef",i=this.validate(e,o.type.name,o.type)):(r="typedef",i=this.system.validate(e,o.type.name,l))}else{const l=new Hn(t);n==="union"&&(((c=l.types)==null?void 0:c.length)??0)>0?(r="inline-union",i=this.validateUnion(e,l)):(r="direct",i=this.system.validate(e,n,l))}return st(this.typeValidationDebug,"TypeChecker.validate",{module:this.module.name??"(anonymous)",typeName:n,via:r,ok:i[0],reason:i[1],value:it(e)}),i}validateUnion(e,n){var t;st(this.typeValidationDebug,"TypeChecker.validateUnion",{module:this.module.name??"(anonymous)",memberCount:((t=n.types)==null?void 0:t.length)??0,value:it(e)});for(const r of n.types??[]){const i=r,s=typeof i.name=="string"?i.name:"string",[o]=this.validate(e,s,i);if(o)return[!0,null]}return[!1,"Value does not match any union member type"]}},Hl=class{constructor(e,n={}){y(this,"xpath",new Kl);y(this,"xpathCache",new Map);y(this,"rootCtx");y(this,"enabledFeaturesOverride");y(this,"contextStack",[]);y(this,"typeValidationDebug");this.enabledFeaturesOverride=n.enabledFeaturesByModule??null,this.typeValidationDebug=n.typeValidationDebug===!0;const t=n.constraintChecks??!0,r=n.leafTypeMode??(t?"full":"none"),i=e.data;this.rootCtx={module:e,typeChecker:new Ut(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:t,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:gi(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new Ut(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){const e=this.contextStack[this.contextStack.length-1];if(!e)throw new Error("DocumentValidator: internal error — no active validation context");return e}enableExtension(e,n){if(e!=="anydata_validation")throw new Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=Xo(n)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,n){this.contextStack.push(e);try{const t=[],r=[];if(!n||typeof n!="object"||Array.isArray(n))return[!1,["Document must be an object"],r];const i=n,s={data:i,schema:e.module,parent:null};for(const o of e.module.statements){if(!o.name)continue;const c=this.effectiveKeyword(o);["container","list","leaf","leaf-list","anydata","anyxml","choice"].includes(c)&&this.validateStatement(o,i[o.name],o.name,t,s,s)}return[t.length===0,t,r]}finally{this.contextStack.pop()}}validateStatement(e,n,t,r,i,s){const o=this.effectiveKeyword(e),c={data:n,schema:e,parent:i};if(o==="choice"){this.validateChoice(e,i.data,t,r,i,s);return}if(o==="case"){if(!i.data||typeof i.data!="object"||Array.isArray(i.data))return;const p=i.data;for(const d of e.statements)d.name&&this.validateStatement(d,p[d.name],`${t}.${d.name}`,r,i,s);return}const l=e.data.if_features,u=Array.isArray(l)?l:[];if(!sn(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){n!==void 0&&r.push(`${t}: Node '${e.name??"node"}' is present but its 'if-feature' condition is false — this node must not exist`);return}if(!(this.ctx.constraintChecks&&!this.checkWhen(e,n,t,r,c,s,i))){if(o==="container"){if(n===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,t,r,c,s);return}if(!n||typeof n!="object"||Array.isArray(n)){r.push(`${t}: container must be an object`);return}const p=n;this.ctx.constraintChecks&&this.checkMust(e,c,s,t,r);for(const d of e.statements){if(this.effectiveKeyword(d)==="choice"){this.validateChoice(d,p,`${t}.${d.name??"choice"}`,r,c,s);continue}d.name&&this.validateStatement(d,p[d.name],`${t}.${d.name}`,r,c,s)}this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,p,t,r);return}if(o==="list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: list must be an array`);return}const p=typeof e.data.key=="string"?e.data.key.trim():"",d=p.length>0?p.split(/\s+/).map(h=>h.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&d.length>0&&this.checkListKeyUniqueness(n,d,e.name??"list",t,r))return;for(let h=0;h<n.length;h+=1){const g=n[h];if(!g||typeof g!="object"||Array.isArray(g)){r.push(`${t}[${h}]: list item must be an object`);continue}const m={data:g,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,m,s,`${t}[${h}]`,r);const _=g;for(const w of e.statements){if(this.effectiveKeyword(w)==="choice"){this.validateChoice(w,_,`${t}[${h}].${w.name??"choice"}`,r,m,s);continue}w.name&&this.validateStatement(w,_[w.name],`${t}[${h}].${w.name}`,r,m,s)}this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,_,`${t}[${h}]`,r)}return}if(o==="leaf"){const p=!!e.data.mandatory;if(n===void 0){p&&r.push(`${t}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const d=e.data.type??{},h=d.name??"string";if(h==="leafref")this.checkLeafref(n,d,t,r,c,s);else if(h==="instance-identifier")this.checkInstanceIdentifier(n,d,t,r,c,s);else{const[g,m]=this.ctx.typeChecker.validate(n,h,d);st(this.ctx.typeValidationDebug,"DocumentValidator.leaf:full",{path:t,typeName:h,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:g,reason:m,value:it(n)}),g||r.push(`${t}: ${m??`invalid value for type ${h}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,c,s,t,r);return}if(o==="leaf-list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const p=e.data.type??{},d=p.name??"string";for(let h=0;h<n.length;h+=1){const g={data:n[h],schema:e,parent:i};if(d==="leafref")this.checkLeafref(n[h],p,`${t}[${h}]`,r,g,s);else if(d==="instance-identifier")this.checkInstanceIdentifier(n[h],p,`${t}[${h}]`,r,g,s);else{const[m,_]=this.ctx.typeChecker.validate(n[h],d,p);st(this.ctx.typeValidationDebug,"DocumentValidator.leaf-list:full",{path:`${t}[${h}]`,typeName:d,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:m,reason:_,value:it(n[h])}),m||r.push(`${t}[${h}]: ${_??`invalid value for type ${d}`}`)}this.checkMust(e,g,s,`${t}[${h}]`,r)}}return}if(o==="anydata"||o==="anyxml"){const p=!!e.data.mandatory;if(n===void 0){p&&r.push(`${t}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,c,s,t,r),o==="anydata"&&this.runAnydataSubtreeValidation(e,n,t,r)}}}collectSchemaInstanceKeys(e,n){if(!e)return;const t=this.effectiveKeyword(e);if(t==="choice"){for(const r of e.statements??[])if(r.keyword==="case")for(const i of r.statements??[])this.collectSchemaInstanceKeys(i,n);return}if(t==="list"){e.name&&n.add(e.name);return}if(t==="container"){const r=e.statements??[];!(r.length===1&&this.effectiveKeyword(r[0])==="choice")&&e.name&&n.add(e.name);for(const s of r)this.collectSchemaInstanceKeys(s,n);return}e.name&&n.add(e.name)}rejectUnknownContainerKeys(e,n,t,r){if(e.data.presence||e.name!=="array")return;const i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!=="choice")return;const s=new Set;if(this.collectSchemaInstanceKeys(i[0],s),s.size!==0)for(const o of Object.keys(n))s.has(o)||r.push(`${t}: Unknown field '${o}'`)}rejectUnknownListItemKeys(e,n,t,r){const i=this.collectDirectChildKeys(e);if(i.size!==0)for(const s of Object.keys(n))i.has(s)||r.push(`${t}: Unknown field '${s}'`)}collectDirectChildKeys(e){const n=new Set,t=r=>{const i=this.effectiveKeyword(r);if(i==="choice"||i==="case"){for(const s of r.statements??[])t(s);return}r.name&&n.add(r.name)};for(const r of e.statements??[])t(r);return n}validateChoice(e,n,t,r,i,s){if(!n||typeof n!="object"||Array.isArray(n)){e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}const o=n,c=Array.isArray(e.data.if_features)?e.data.if_features:[],l=sn(c,this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!l&&this.choiceHasBranchData(e,o)){r.push(`${t}: Choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(!l||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,t,r,i,s,i))return;const u=e.statements.filter(g=>g.keyword==="case"),p=[];let d=!1;for(const g of u){if(!this.caseHasAnyData(g,o))continue;const m=Array.isArray(g.data.if_features)?g.data.if_features:[];if(!sn(m,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${t}: Case '${g.name??"case"}' of choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(this.ctx.constraintChecks&&!this.checkWhen(g,!0,`${t}.${g.name??"case"}`,r,i,s,i)){d=!0;continue}p.push(g)}if(p.length>1){const g=p.map(m=>m.name??"<unnamed>").join(", ");r.push(`${t}: choice '${e.name??"choice"}' allows only one case, but multiple are active: ${g}`);return}const h=p[0];if(!h){if(d)return;e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}for(const g of h.statements)g.name&&this.validateStatement(g,o[g.name],`${t}.${g.name}`,r,i,s)}choiceHasBranchData(e,n){return e.statements.filter(r=>r.keyword==="case").some(r=>this.caseHasAnyData(r,n))}caseHasAnyData(e,n){return e.statements.some(t=>this.statementHasMatchingData(t,n))}statementHasMatchingData(e,n){const t=this.effectiveKeyword(e);return["leaf","leaf-list","container","list","anydata","anyxml"].includes(t)?!!(e.name&&n[e.name]!==void 0):t==="choice"?this.choiceHasBranchData(e,n):t==="case"?this.caseHasAnyData(e,n):!1}effectiveKeyword(e){const n=e.keyword??"";if(n.includes(":")){const t=e.data.data_node_kind;if(t==="container"||t==="list")return t}return n}checkListKeyUniqueness(e,n,t,r,i){if(n.length===0)return!1;const s=new Map;for(let o=0;o<e.length;o+=1){const c=e[o];if(!c||typeof c!="object"||Array.isArray(c))continue;const l=c,u=n.map(d=>l[d]),p=JSON.stringify(u);if(s.has(p)){const d=s.get(p),h=n.map(g=>`${g}='${String(l[g])}'`).join(", ");return i.push(`${r}: Duplicate key in list '${t}': ${h} (entries at index ${d} and ${o})`),!0}s.set(p,o)}return!1}leafrefPathAst(e){const n=e.path;if(typeof n=="string"&&n.trim().length>0)try{return Is(n.trim())}catch{return null}return n&&typeof n=="object"&&!Array.isArray(n)&&n.kind==="path"?n:null}checkLeafref(e,n,t,r,i,s){const o=n.require_instance!==!1,c=this.leafrefPathAst(n);if(!c||c.kind!=="path"){o&&r.push(`${t}: leafref has no path`);return}try{const l={current:i,root:s},u=this.xpath.eval(c,l,i),p=Array.isArray(u)?u:[],d=new Set;for(const g of p){if(!g||typeof g!="object"||!("data"in g))continue;const m=g.data;m!=null&&(typeof m=="string"||typeof m=="number"||typeof m=="boolean")&&d.add(String(m))}if(typeof e!="string"&&typeof e!="number"&&typeof e!="boolean"){r.push(`${t}: leafref value must be a string, number, or boolean`);return}const h=String(e);o&&!d.has(h)&&r.push(`${t}: leafref: value '${h}' does not reference an existing instance (require-instance is true)`)}catch(l){const u=l instanceof Error?l.message:String(l);r.push(`${t}: leafref: error evaluating path (${u})`)}}checkInstanceIdentifier(e,n,t,r,i,s){if(typeof e!="string"){r.push(`${t}: instance-identifier value must be a string, got ${typeof e}`);return}if(!(n.require_instance!==!1))return;const c=e.trim();if(!c){r.push(`${t}: instance-identifier path must not be empty when require-instance is true`);return}let l;try{l=Bn(c)}catch(p){const d=p instanceof Error?p.message:String(p);r.push(`${t}: instance-identifier: invalid path expression (${d})`);return}if(l.kind!=="path"){r.push(`${t}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!l.isAbsolute){r.push(`${t}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}const u={current:i,root:s};try{this.xpath.evalPath(l,u,s).length===0&&r.push(`${t}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(p){const d=p instanceof Error?p.message:String(p);r.push(`${t}: instance-identifier: invalid path expression (${d})`)}}checkMust(e,n,t,r,i){const s=e.statements.filter(o=>o.keyword==="must"&&typeof o.argument=="string");for(const o of s){const c=o.argument;let l=this.xpathCache.get(c);if(!l)try{l=Bn(c),this.xpathCache.set(c,l)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`);continue}try{const u={current:n,root:t},p=this.xpath.eval(l,u,n);if(!this.xpathBoolean(p)){const h=typeof o.data.error_message=="string"&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??"node"}'`;i.push(`${r}: ${h}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`)}}}checkWhen(e,n,t,r,i,s,o){const c=e.data.when,l=typeof(c==null?void 0:c.expression)=="string"?c.expression:void 0;if(!l||l.trim().length===0)return!0;let u=this.xpathCache.get(l);if(!u)try{u=Bn(l),this.xpathCache.set(l,u)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}try{const d=(c==null?void 0:c.evaluate_with_parent_context)===!0?o:i,h={current:d,root:s},g=this.xpath.eval(u,h,d);return this.xpathBoolean(g)?!0:(n!==void 0&&r.push(`${t}: node is not allowed by when condition`),!1)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e.length>0:e!=null}validateMandatoryChildren(e,n,t,r,i,s){const o=n&&typeof n=="object"&&!Array.isArray(n)?n:void 0;for(const c of e.statements){const l=c.keyword??"";if(!["leaf","anydata","anyxml"].includes(l)||!c.name)continue;const u=Array.isArray(c.data.if_features)?c.data.if_features:[];if(!sn(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!c.data.mandatory)continue;const p=o==null?void 0:o[c.name],d={data:p,schema:c,parent:i};this.ctx.constraintChecks&&!this.checkWhen(c,p,`${t}.${c.name}`,r,d,s,i)||(!o||o[c.name]===void 0)&&r.push(`${t}.${c.name}: mandatory ${l} is missing`)}}anydataModuleMap(e){const n={};for(const t of e){const r=t.name;r&&(n[r]=t)}return n}runAnydataSubtreeValidation(e,n,t,r){if(!this.ctx.anydataValidation||!n||typeof n!="object"||Array.isArray(n))return;const i=this.ctx.anydataValidation.mode,s=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(s),c=n;for(const[l,u]of Object.entries(c)){const{statementName:p,moduleName:d}=Io(l,o);if(!p||!d){r.push(`${t}.${l}: Unknown anydata member '${l}': no matching module:identifier in the provided modules`);continue}const h=o[d],g=h==null?void 0:h.findStatement(p);if(!g){r.push(`${t}.${l}: Unknown anydata member '${l}'`);continue}if(g.keyword==="leaf"){r.push(`${t}.${l}: anydata member '${l}' maps to a leaf; nested subtree validation expects a container or list`);continue}const m={[p]:u},_=h.data,w={module:h,typeChecker:new Ut(h,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i==="complete",leafTypeMode:i==="complete"?"full":"none",typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:_,enabledByModule:gi(_,this.enabledFeaturesOverride)},[b,T]=this.validateWithContext(w,m);if(!b)for(const N of T)r.push(`${t}.${l}: ${N}`)}}},Wl=class{constructor(e,n={}){y(this,"module");y(this,"documentValidator");this.module=e,this.documentValidator=new Hl(e,{enabledFeaturesByModule:n.enabledFeaturesByModule??null,typeValidationDebug:n.typeValidationDebug})}setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,n){this.documentValidator.enableExtension(e,n)}enable_extension(e,n){this.enableExtension(e,n)}validate(e){const[n,t,r]=this.documentValidator.validate(e);return{isValid:n,errors:t,warnings:r}}};let Fn,wi;function Qs(){if(!import.meta.url.startsWith("file:"))return"/yang";const e=on.dirname(Ao(import.meta.url));return on.resolve(e,"../../../../yang")}function Jl(e=Qs()){if(Fn&&wi===e)return Fn;const n=on.join(e,"netlab-topology.yang"),t=[e,on.join(e,"modules")],r=new zs({include_path:t,expand_uses:!0}),i=r.parseFile(n);for(const s of["netlab-internal.yang","modules/netlab-ospf.yang","modules/netlab-bgp.yang","modules/netlab-vlan.yang","modules/netlab-vrf.yang","modules/netlab-isis.yang","modules/netlab-vxlan.yang","modules/netlab-evpn.yang"]){const o=on.join(e,s);try{r.parseFile(o)}catch(c){if((c==null?void 0:c.code)!=="ENOENT")throw c}}return Fn=i,wi=e,Fn}function Xl(e){const n=Jl(e);return new Wl(n)}function Zl(e){const n=e.nodes??{},t=Object.entries(n).map(([u,p])=>{const d={...p,name:p.name??u};return Array.isArray(d.interfaces)&&(d.interfaces=d.interfaces.map(h=>{const g={...h};return Array.isArray(g.neighbors),g})),d.vlans&&typeof d.vlans=="object"&&!Array.isArray(d.vlans)&&(d.vlans=Vn(d.vlans)),d.vrfs&&typeof d.vrfs=="object"&&!Array.isArray(d.vrfs)&&(d.vrfs=Vn(d.vrfs)),Si(d),d}),r=(e.links??[]).map((u,p)=>{const d={...u};d.linkindex===void 0&&(d.linkindex=p+1);const h=d[_e];return typeof h=="string"?(d._linkname=h,delete d[_e]):d._linkname,Si(d),d}),i=e.groups?Object.entries(e.groups).map(([u,p])=>({...p,name:p.name??u})):void 0,s=Ql(e.addressing),o={nodes:t,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),s&&(o.addressing=s),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=Vn(e.vlans)),e.vrfs&&(o.vrfs=Vn(e.vrfs));const c={topology:o},l=c.topology;return Array.isArray(e[`${an}:_Providers`])&&(l[`${an}:_Providers`]=e[`${an}:_Providers`]),c}function Vn(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.entries(e).map(([n,t])=>({...typeof t=="object"&&t&&!Array.isArray(t)?t:{},name:n}))}function Ql(e){return!e||typeof e!="object"||Array.isArray(e)?void 0:{pool:Object.entries(e).map(([t,r])=>({...typeof r=="object"&&r&&!Array.isArray(r)?r:{},name:t}))}}function Si(e){const n=`${an}:`;for(const t of Object.keys(e))if(t.startsWith(n)){const r=t.slice(n.length);e[r]===void 0&&(e[r]=e[t]),delete e[t]}}function eu(e,n,t={}){e.stage=n;const r=t.yangDir??Qs(),i=Xl(r),s=Zl(e),o=i.validate(s);if(t.diagnostics){for(const c of o.errors)t.diagnostics.error(Kr(c));for(const c of o.warnings)t.diagnostics.warning(Kr(c))}return{ok:o.isValid,errors:o.errors,warnings:o.warnings}}const nu={frr:`---
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
`},tu={bird:`---
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
`};new Set(Ji);let qt;function Ai(e){const n={};for(const[t,r]of Object.entries(e)){const i=He.load(r)??{};n[t]={...i,name:t}}return n}function ru(e,n){for(const[t,r]of Object.entries(n)){if(e[t])throw new Error(`duplicate name ${t} for a device and a daemon`);const i={...r,name:t,daemon:!0};i.parent||(i.parent="linux"),e[t]=i}}function iu(e){const n={},t=new Set;function r(i){if(n[i])return n[i];if(t.has(i))return e[i]??{name:i};t.add(i);const s=e[i]??{name:i},o=typeof s.parent=="string"?s.parent:void 0;let c={...s,name:i};if(o&&e[o]){const l=r(o);c=X(l,{...s,name:i}),s.daemon!==void 0&&(c.daemon=s.daemon),c.parent=o}return t.delete(i),n[i]=c,c}for(const i of Object.keys(e))r(i);return n}function ea(){if(qt)return qt;const e=Ai(nu);ru(e,Ai(tu));const n=iu(e);for(const t of Object.values(n)){if(t.clab&&typeof t.clab=="object"){const r=t.clab;r.features&&(t.features=X(t.features??{},r.features))}delete t.libvirt,delete t.virtualbox,delete t.external}return qt=n,n}function ut(e){return ea()[e]??{name:e,interface_name:"eth{ifindex}",role:"router"}}function su(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var qn={exports:{}},au=qn.exports,Ii;function ou(){return Ii||(Ii=1,(function(e){(function(n){const t="(0?\\d+|0x[a-f0-9]+)",r={fourOctet:new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`,"i"),threeOctet:new RegExp(`^${t}\\.${t}\\.${t}$`,"i"),twoOctet:new RegExp(`^${t}\\.${t}$`,"i"),longValue:new RegExp(`^${t}$`,"i")},i=new RegExp("^0[0-7]+$","i"),s=new RegExp("^0x[a-f0-9]+$","i"),o="%[0-9a-z]{1,}",c="(?:[0-9a-f]+::?)+",l={zoneIndex:new RegExp(o,"i"),native:new RegExp(`^(::)?(${c})?([0-9a-f]+)?(::)?(${o})?$`,"i"),deprecatedTransitional:new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${o})?)$`,"i"),transitional:new RegExp(`^((?:${c})|(?:::)(?:${c})?)${t}\\.${t}\\.${t}\\.${t}(${o})?$`,"i")};function u(m,_){if(m.indexOf("::")!==m.lastIndexOf("::"))return null;let w=0,b=-1,T=(m.match(l.zoneIndex)||[])[0],N,M;for(T&&(T=T.substring(1),m=m.replace(/%.+$/,""));(b=m.indexOf(":",b+1))>=0;)w++;if(m.substr(0,2)==="::"&&w--,m.substr(-2,2)==="::"&&w--,w>_)return null;for(M=_-w,N=":";M--;)N+="0:";return m=m.replace("::",N),m[0]===":"&&(m=m.slice(1)),m[m.length-1]===":"&&(m=m.slice(0,-1)),_=(function(){const Y=m.split(":"),G=[];for(let H=0;H<Y.length;H++)G.push(parseInt(Y[H],16));return G})(),{parts:_,zoneId:T}}function p(m,_,w,b){if(m.length!==_.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");let T=0,N;for(;b>0;){if(N=w-b,N<0&&(N=0),m[T]>>N!==_[T]>>N)return!1;b-=w,T+=1}return!0}function d(m){if(s.test(m))return parseInt(m,16);if(m[0]==="0"&&!isNaN(parseInt(m[1],10))){if(i.test(m))return parseInt(m,8);throw new Error(`ipaddr: cannot parse ${m} as octal`)}return parseInt(m,10)}function h(m,_){for(;m.length<_;)m=`0${m}`;return m}const g={};g.IPv4=(function(){function m(_){if(_.length!==4)throw new Error("ipaddr: ipv4 octet count should be 4");let w,b;for(w=0;w<_.length;w++)if(b=_[w],!(0<=b&&b<=255))throw new Error("ipaddr: ipv4 octet should fit in 8 bits");this.octets=_}return m.prototype.SpecialRanges={unspecified:[[new m([0,0,0,0]),8]],broadcast:[[new m([255,255,255,255]),32]],multicast:[[new m([224,0,0,0]),4]],linkLocal:[[new m([169,254,0,0]),16]],loopback:[[new m([127,0,0,0]),8]],carrierGradeNat:[[new m([100,64,0,0]),10]],private:[[new m([10,0,0,0]),8],[new m([172,16,0,0]),12],[new m([192,168,0,0]),16]],reserved:[[new m([192,0,0,0]),24],[new m([192,0,2,0]),24],[new m([192,88,99,0]),24],[new m([198,18,0,0]),15],[new m([198,51,100,0]),24],[new m([203,0,113,0]),24],[new m([240,0,0,0]),4]],as112:[[new m([192,175,48,0]),24],[new m([192,31,196,0]),24]],amt:[[new m([192,52,193,0]),24]]},m.prototype.kind=function(){return"ipv4"},m.prototype.match=function(_,w){let b;if(w===void 0&&(b=_,_=b[0],w=b[1]),_.kind()!=="ipv4")throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return p(this.octets,_.octets,8,w)},m.prototype.prefixLengthFromSubnetMask=function(){let _=0,w=!1;const b={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0};let T,N,M;for(T=3;T>=0;T-=1)if(N=this.octets[T],N in b){if(M=b[N],w&&M!==0)return null;M!==8&&(w=!0),_+=M}else return null;return 32-_},m.prototype.range=function(){return g.subnetMatch(this,this.SpecialRanges)},m.prototype.toByteArray=function(){return this.octets.slice(0)},m.prototype.toIPv4MappedAddress=function(){return g.IPv6.parse(`::ffff:${this.toString()}`)},m.prototype.toNormalizedString=function(){return this.toString()},m.prototype.toString=function(){return this.octets.join(".")},m})(),g.IPv4.broadcastAddressFromCIDR=function(m){try{const _=this.parseCIDR(m),w=_[0].toByteArray(),b=this.subnetMaskFromPrefixLength(_[1]).toByteArray(),T=[];let N=0;for(;N<4;)T.push(parseInt(w[N],10)|parseInt(b[N],10)^255),N++;return new this(T)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},g.IPv4.isIPv4=function(m){return this.parser(m)!==null},g.IPv4.isValid=function(m){try{return new this(this.parser(m)),!0}catch{return!1}},g.IPv4.isValidCIDR=function(m){try{return this.parseCIDR(m),!0}catch{return!1}},g.IPv4.isValidFourPartDecimal=function(m){return!!(g.IPv4.isValid(m)&&m.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},g.IPv4.isValidCIDRFourPartDecimal=function(m){const _=m.match(/^(.+)\/(\d+)$/);return!g.IPv4.isValidCIDR(m)||!_?!1:g.IPv4.isValidFourPartDecimal(_[1])},g.IPv4.networkAddressFromCIDR=function(m){let _,w,b,T,N;try{for(_=this.parseCIDR(m),b=_[0].toByteArray(),N=this.subnetMaskFromPrefixLength(_[1]).toByteArray(),T=[],w=0;w<4;)T.push(parseInt(b[w],10)&parseInt(N[w],10)),w++;return new this(T)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},g.IPv4.parse=function(m){const _=this.parser(m);if(_===null)throw new Error("ipaddr: string is not formatted like an IPv4 Address");return new this(_)},g.IPv4.parseCIDR=function(m){let _;if(_=m.match(/^(.+)\/(\d+)$/)){const w=parseInt(_[2]);if(w>=0&&w<=32){const b=[this.parse(_[1]),w];return Object.defineProperty(b,"toString",{value:function(){return this.join("/")}}),b}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},g.IPv4.parser=function(m){let _,w,b;if(_=m.match(r.fourOctet))return(function(){const T=_.slice(1,6),N=[];for(let M=0;M<T.length;M++)w=T[M],N.push(d(w));return N})();if(_=m.match(r.longValue)){if(b=d(_[1]),b>4294967295||b<0)throw new Error("ipaddr: address outside defined range");return(function(){const T=[];let N;for(N=0;N<=24;N+=8)T.push(b>>N&255);return T})().reverse()}else return(_=m.match(r.twoOctet))?(function(){const T=_.slice(1,4),N=[];if(b=d(T[1]),b>16777215||b<0)throw new Error("ipaddr: address outside defined range");return N.push(d(T[0])),N.push(b>>16&255),N.push(b>>8&255),N.push(b&255),N})():(_=m.match(r.threeOctet))?(function(){const T=_.slice(1,5),N=[];if(b=d(T[2]),b>65535||b<0)throw new Error("ipaddr: address outside defined range");return N.push(d(T[0])),N.push(d(T[1])),N.push(b>>8&255),N.push(b&255),N})():null},g.IPv4.subnetMaskFromPrefixLength=function(m){if(m=parseInt(m),m<0||m>32)throw new Error("ipaddr: invalid IPv4 prefix length");const _=[0,0,0,0];let w=0;const b=Math.floor(m/8);for(;w<b;)_[w]=255,w++;return b<4&&(_[b]=Math.pow(2,m%8)-1<<8-m%8),new this(_)},g.IPv6=(function(){function m(_,w){let b,T;if(_.length===16)for(this.parts=[],b=0;b<=14;b+=2)this.parts.push(_[b]<<8|_[b+1]);else if(_.length===8)this.parts=_;else throw new Error("ipaddr: ipv6 part count should be 8 or 16");for(b=0;b<this.parts.length;b++)if(T=this.parts[b],!(0<=T&&T<=65535))throw new Error("ipaddr: ipv6 part should fit in 16 bits");w&&(this.zoneId=w)}return m.prototype.SpecialRanges={unspecified:[new m([0,0,0,0,0,0,0,0]),128],linkLocal:[new m([65152,0,0,0,0,0,0,0]),10],multicast:[new m([65280,0,0,0,0,0,0,0]),8],loopback:[new m([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new m([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new m([0,0,0,0,0,65535,0,0]),96],deprecatedSiteLocal:[new m([65216,0,0,0,0,0,0,0]),10],discard:[new m([256,0,0,0,0,0,0,0]),64],rfc6145:[new m([0,0,0,0,65535,0,0,0]),96],rfc6052:[[new m([100,65435,0,0,0,0,0,0]),96],[new m([100,65435,1,0,0,0,0,0]),48]],"6to4":[new m([8194,0,0,0,0,0,0,0]),16],teredo:[new m([8193,0,0,0,0,0,0,0]),32],benchmarking:[new m([8193,2,0,0,0,0,0,0]),48],amt:[new m([8193,3,0,0,0,0,0,0]),32],as112v6:[[new m([8193,4,274,0,0,0,0,0]),48],[new m([9760,79,32768,0,0,0,0,0]),48]],deprecatedOrchid:[new m([8193,16,0,0,0,0,0,0]),28],orchid2:[new m([8193,32,0,0,0,0,0,0]),28],droneRemoteIdProtocolEntityTags:[new m([8193,48,0,0,0,0,0,0]),28],segmentRouting:[new m([24320,0,0,0,0,0,0,0]),16],reserved:[[new m([8193,0,0,0,0,0,0,0]),23],[new m([8193,3512,0,0,0,0,0,0]),32],[new m([16383,0,0,0,0,0,0,0]),20]]},m.prototype.isIPv4MappedAddress=function(){return this.range()==="ipv4Mapped"},m.prototype.kind=function(){return"ipv6"},m.prototype.match=function(_,w){let b;if(w===void 0&&(b=_,_=b[0],w=b[1]),_.kind()!=="ipv6")throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return p(this.parts,_.parts,16,w)},m.prototype.prefixLengthFromSubnetMask=function(){let _=0,w=!1;const b={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0};let T,N;for(let M=7;M>=0;M-=1)if(T=this.parts[M],T in b){if(N=b[T],w&&N!==0)return null;N!==16&&(w=!0),_+=N}else return null;return 128-_},m.prototype.range=function(){return g.subnetMatch(this,this.SpecialRanges)},m.prototype.toByteArray=function(){let _;const w=[],b=this.parts;for(let T=0;T<b.length;T++)_=b[T],w.push(_>>8),w.push(_&255);return w},m.prototype.toFixedLengthString=function(){const _=(function(){const b=[];for(let T=0;T<this.parts.length;T++)b.push(h(this.parts[T].toString(16),4));return b}).call(this).join(":");let w="";return this.zoneId&&(w=`%${this.zoneId}`),_+w},m.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");const _=this.parts.slice(-2),w=_[0],b=_[1];return new g.IPv4([w>>8,w&255,b>>8,b&255])},m.prototype.toNormalizedString=function(){const _=(function(){const b=[];for(let T=0;T<this.parts.length;T++)b.push(this.parts[T].toString(16));return b}).call(this).join(":");let w="";return this.zoneId&&(w=`%${this.zoneId}`),_+w},m.prototype.toRFC5952String=function(){const _=/((^|:)(0(:|$)){2,})/g,w=this.toNormalizedString();let b=0,T=-1,N;for(;N=_.exec(w);)N[0].length>T&&(b=N.index,T=N[0].length);return T<0?w:`${w.substring(0,b)}::${w.substring(b+T)}`},m.prototype.toString=function(){return this.toRFC5952String()},m})(),g.IPv6.broadcastAddressFromCIDR=function(m){try{const _=this.parseCIDR(m),w=_[0].toByteArray(),b=this.subnetMaskFromPrefixLength(_[1]).toByteArray(),T=[];let N=0;for(;N<16;)T.push(parseInt(w[N],10)|parseInt(b[N],10)^255),N++;return new this(T)}catch(_){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${_})`)}},g.IPv6.isIPv6=function(m){return this.parser(m)!==null},g.IPv6.isValid=function(m){if(typeof m=="string"&&m.indexOf(":")===-1)return!1;try{const _=this.parser(m);return new this(_.parts,_.zoneId),!0}catch{return!1}},g.IPv6.isValidCIDR=function(m){if(typeof m=="string"&&m.indexOf(":")===-1)return!1;try{return this.parseCIDR(m),!0}catch{return!1}},g.IPv6.networkAddressFromCIDR=function(m){let _,w,b,T,N;try{for(_=this.parseCIDR(m),b=_[0].toByteArray(),N=this.subnetMaskFromPrefixLength(_[1]).toByteArray(),T=[],w=0;w<16;)T.push(parseInt(b[w],10)&parseInt(N[w],10)),w++;return new this(T)}catch(M){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${M})`)}},g.IPv6.parse=function(m){const _=this.parser(m);if(_.parts===null)throw new Error("ipaddr: string is not formatted like an IPv6 Address");return new this(_.parts,_.zoneId)},g.IPv6.parseCIDR=function(m){let _,w,b;if((w=m.match(/^(.+)\/(\d+)$/))&&(_=parseInt(w[2]),_>=0&&_<=128))return b=[this.parse(w[1]),_],Object.defineProperty(b,"toString",{value:function(){return this.join("/")}}),b;throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},g.IPv6.parser=function(m){let _,w,b,T,N,M;if(b=m.match(l.deprecatedTransitional))return this.parser(`::ffff:${b[1]}`);if(l.native.test(m))return u(m,8);if((b=m.match(l.transitional))&&(M=b[6]||"",_=b[1],b[1].endsWith("::")||(_=_.slice(0,-1)),_=u(_+M,6),_.parts)){for(N=[parseInt(b[2]),parseInt(b[3]),parseInt(b[4]),parseInt(b[5])],w=0;w<N.length;w++)if(T=N[w],!(0<=T&&T<=255))return null;return _.parts.push(N[0]<<8|N[1]),_.parts.push(N[2]<<8|N[3]),{parts:_.parts,zoneId:_.zoneId}}return null},g.IPv6.subnetMaskFromPrefixLength=function(m){if(m=parseInt(m),m<0||m>128)throw new Error("ipaddr: invalid IPv6 prefix length");const _=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];let w=0;const b=Math.floor(m/8);for(;w<b;)_[w]=255,w++;return b<16&&(_[b]=Math.pow(2,m%8)-1<<8-m%8),new this(_)},g.fromByteArray=function(m){const _=m.length;if(_===4)return new g.IPv4(m);if(_===16)return new g.IPv6(m);throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")},g.isValid=function(m){return g.IPv6.isValid(m)||g.IPv4.isValid(m)},g.isValidCIDR=function(m){return g.IPv6.isValidCIDR(m)||g.IPv4.isValidCIDR(m)},g.parse=function(m){if(g.IPv6.isValid(m))return g.IPv6.parse(m);if(g.IPv4.isValid(m))return g.IPv4.parse(m);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},g.parseCIDR=function(m){try{return g.IPv6.parseCIDR(m)}catch{try{return g.IPv4.parseCIDR(m)}catch{throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},g.process=function(m){const _=this.parse(m);return _.kind()==="ipv6"&&_.isIPv4MappedAddress()?_.toIPv4Address():_},g.subnetMatch=function(m,_,w){let b,T,N,M;w==null&&(w="unicast");for(T in _)if(Object.prototype.hasOwnProperty.call(_,T)){for(N=_[T],N[0]&&!(N[0]instanceof Array)&&(N=[N]),b=0;b<N.length;b++)if(M=N[b],m.kind()===M[0].kind()&&m.match.apply(m,M))return T}return w},e.exports?e.exports=g:n.ipaddr=g})(au)})(qn)),qn.exports}var cu=ou();const be=su(cu);function ur(e){const n=e==null?void 0:e.attributes;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function Ti(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.keys(e)}function pr(e){return Array.isArray(e)?e.map(String):[]}function lu(e){const n=ur(e),t=Ti(n.link),r=Ti(n.link_internal),i=new Set(pr(n.link_no_propagate)),s=new Set([...t,...r]);for(const o of i)s.delete(o);return s}function uu(e){return new Set(pr(ur(e).link_module_no_propagate))}function pu(e){return new Set(pr(ur(e).pool_no_copy))}const _n={};function fu(){for(const e of Object.keys(_n))delete _n[e]}function du(e,n={}){const t={lan:{ipv4:typeof n.lan=="string"?n.lan:"10.0.0.0/16",prefix:typeof n.lan_subnet=="number"?n.lan_subnet:24},loopback:{ipv4:"10.0.0.0/24",prefix:32},p2p:{ipv4:typeof n.p2p=="string"?n.p2p:"10.2.0.0/16",prefix:typeof n.p2p_subnet=="number"?n.p2p_subnet:30}},r=X(t,e),i={};for(const[s,o]of Object.entries(r)){if(o==null){i[s]={};continue}if(typeof o!="object"||Array.isArray(o)){i[s]={ipv4:o};continue}const c={...o};typeof c.ipv4=="string"&&typeof c.prefix!="number"&&(c.prefix=s.includes("loopback")?32:24),s==="mgmt"&&typeof c.prefix!="number"&&(c.prefix=24),i[s]=c}return i}function mu(e,n={}){const t=pu(n),r={};for(const[i,s]of Object.entries(e)){const o={};for(const[c,l]of Object.entries(s))t.has(c)||(o[c]=l);r[i]=o}return r}function hu(e){fu();const n=e.defaults??{},t=du(e.addressing??{},n);e.addressing=t,e.pools=mu(t,n);for(const[r,i]of Object.entries(t)){const s={},o=typeof i.prefix=="number"?i.prefix:24,c=typeof i.prefix6=="number"?i.prefix6:64;typeof i.ipv4=="string"&&(s.skipFirst4=o===32||r==="loopback"||r.includes("loopback"),s.ipv4=s.skipFirst4?1:0,s.cache4=[]),typeof i.ipv6=="string"&&(s.skipFirst6=c>=127||r==="loopback"||r.includes("loopback"),s.ipv6=s.skipFirst6?1:0,s.cache6=[]),_n[r]=s}}function fr(e){const n=(e.interfaces??[]).length;return n>2?"lan":n===2?"p2p":"stub"}function _u(e,n){const t=n.prefix??{};if(typeof t.ipv4=="string"||typeof t.ipv6=="string")return;if(n.prefix===!1){n.prefix={};return}const r=fr(n),i=[];typeof n.pool=="string"&&i.push(String(n.pool)),typeof n.role=="string"&&i.push(n.role),i.push(r),i.includes("lan")||i.push("lan");const s=na(e,i);n.prefix=Object.keys(s).length?s:{}}function gu(e,n,t){return na(e,[n],t)}function yu(e,n){const t=n.prefix??{},r=[...n.interfaces??[]].sort((o,c)=>String(o.node).localeCompare(String(c.node))),i=e.nodes??{},s=n.type==="p2p"&&r.length===2;for(const o of["ipv4","ipv6"]){const c=t[o];if(typeof c!="string")continue;if(s){r[0][o]=mn(c,1),r[1][o]=mn(c,2);for(const u of n.interfaces??[]){const p=r.find(d=>d.node===u.node);p&&(u[o]=p[o])}continue}let l=1;for(const u of n.interfaces??[]){if(u[o]!==void 0&&u[o]!==null)continue;const p=i[u.node],d=p==null?void 0:p.id,g=typeof d=="number"&&d>0&&Au(c,d)?d:l++;u[o]=mn(c,g)}}}function na(e,n,t){const r=e.addressing??{},i=n.find(l=>r[l]&&typeof r[l]=="object");if(!i)return{};const s=r[i],o=_n[i]??(_n[i]={}),c={};if(typeof s.ipv4=="string"){const l=typeof s.prefix=="number"?s.prefix:24;c.ipv4=t!==void 0?bu(s.ipv4,l,t,o):vu(s.ipv4,l,o)}if(typeof s.ipv6=="string"){const l=typeof s.prefix6=="number"?s.prefix6:64;c.ipv6=t!==void 0?wu(s.ipv6,l,t,o):xu(s.ipv6,l,o)}return c}function vu(e,n,t){const r=t.ipv4??0;return t.ipv4=r+1,ta(e,n,r)}function bu(e,n,t,r){for(r.cache4=r.cache4??[];r.cache4.length<t;){const s=r.cache4.length+(r.skipFirst4?1:0);r.cache4.push(ta(e,n,s))}const i=(r.skipFirst4?1:0)+r.cache4.length;return(r.ipv4??0)<i&&(r.ipv4=i),r.cache4[t-1]}function xu(e,n,t){const r=t.ipv6??0;return t.ipv6=r+1,ra(e,n,r)}function wu(e,n,t,r){for(r.cache6=r.cache6??[];r.cache6.length<t;){const s=r.cache6.length+(r.skipFirst6?1:0);r.cache6.push(ra(e,n,s))}const i=(r.skipFirst6?1:0)+r.cache6.length;return(r.ipv6??0)<i&&(r.ipv6=i),r.cache6[t-1]}function ta(e,n,t){const[r]=dr(e),i=2**(32-n),s=r+t*i>>>0;return`${mr(s)}/${n}`}function ra(e,n,t){const[r,i]=be.parseCIDR(e);if(r.kind()!=="ipv6")throw new Error(`Expected IPv6 pool, got ${e}`);const s=hr(r.toByteArray()),o=128n-BigInt(n),c=(s>>o)+BigInt(t)<<o,l=_r(c,16);return`${be.fromByteArray(Array.from(l)).toString()}/${n}`}function mn(e,n){const[t,r]=be.parseCIDR(e);if(t.kind()==="ipv4"){const[l]=dr(e);return`${mr(l+n>>>0)}/${r}`}const s=hr(t.toByteArray())+BigInt(n),o=_r(s,16);return`${be.fromByteArray(Array.from(o)).toString()}/${r}`}function Su(e){try{const[n,t]=be.parseCIDR(e);if(n.kind()==="ipv4"){const[l]=dr(e),u=t===0?0:-1<<32-t>>>0;return`${mr((l&u)>>>0)}/${t}`}const r=n.toByteArray(),i=hr(r),s=128n-BigInt(t),o=i>>s<<s;return`${be.fromByteArray(Array.from(_r(o,16))).toString()}/${t}`}catch{return e}}function Au(e,n){try{const[,t]=be.parseCIDR(e);if(be.parseCIDR(e)[0].kind()==="ipv4"){const i=2**(32-t)-2;return n>0&&n<=i}return n>0}catch{return!1}}function dr(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(Number);return[(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),Number(t??32)]}function mr(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function hr(e){let n=0n;for(const t of e)n=(n<<8n)+BigInt(t);return n}function _r(e,n){const t=new Array(n).fill(0);let r=e;for(let i=n-1;i>=0;i--)t[i]=Number(r&0xffn),r>>=8n;return t}function ia(e,n){let t;if(e&&typeof e=="object"&&!Array.isArray(e))t={...e};else{t={};for(const r of e??[])if(typeof r=="string")t[r]={name:r};else if(r&&typeof r=="object"&&!Array.isArray(r)){const i=r;if(!i.name){n==null||n.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}t[i.name]=i}}for(const r of Object.keys(t)){let i=t[r];i==null?i={name:r}:typeof i!="object"||Array.isArray(i)?(n==null||n.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${r} must be a dictionary`}),i={name:r,extra:i}):i={...i,name:r},Array.isArray(i.interfaces)||(i.interfaces=[]),t[r]=i}return t}function Iu(e){const n=new Set;for(const r of Object.values(e.nodes??{}))typeof r.id=="number"&&n.add(r.id);let t=1;for(const r of Object.values(e.nodes??{}))if(typeof r.id!="number"){for(;n.has(t);)t++;r.id=t,n.add(t),t++}}function Tu(e,n){var i;const t=String(((i=e.defaults)==null?void 0:i.device)??"frr"),r=Ji;for(const s of Object.values(e.nodes??{})){s.device||(s.device=t);let o=String(s.device);r.includes(o)||(n==null||n.warning({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${o}' on node ${s.name}; using frr (allowed: ${r.join(", ")})`,path:`nodes.${s.name}.device`}),o="frr",s.device=o);const c=ut(o);s.role||(s.role=String(c.role??"router")),c.daemon&&(s["netlab-internal:_daemon"]=!0,c.parent&&(s["netlab-internal:_daemon_parent"]=c.parent))}}function Eu(e){var i,s,o;Iu(e);const n=((i=e.addressing)==null?void 0:i.mgmt)??{},t=String(n.ipv4??"192.168.121.0/24"),r=Number(n.start??100);for(const c of Object.values(e.nodes??{})){const l=c.id??1,u=ut(String(c.device??"frr")),p=Number(u.ifindex_offset??1),d=u.mgmt_if!==void 0?String(u.mgmt_if):at(String(u.interface_name??"eth{ifindex}"),p-1);if(c.mgmt={ifname:d||"eth0",ipv4:Nu(t,r+l),mac:Ou(String(n.mac??"CA-FE-00-00-00-00"),l)},c.role==="router"||c.role==="gateway"||!c.role){const h=at(String(u.loopback_interface_name??"lo{ifindex}"),0),g=gu(e,"loopback",l),m={ifindex:0,ifname:h||"lo",type:"loopback",virtual_interface:!0,neighbors:[]};typeof g.ipv4=="string"&&(m.ipv4=g.ipv4.endsWith("/32")?g.ipv4:mn(g.ipv4,1)),typeof g.ipv6=="string"&&(m.ipv6=g.ipv6.endsWith("/128")?g.ipv6:mn(g.ipv6,1)),c.loopback=m}c.af=c.af??{},((s=c.loopback)!=null&&s.ipv4||(c.interfaces??[]).some(h=>h.ipv4))&&(c.af.ipv4=!0),((o=c.loopback)!=null&&o.ipv6||(c.interfaces??[]).some(h=>h.ipv6))&&(c.af.ipv6=!0)}}function at(e,n){return e.includes("if ifindex else")?n?e.replace(/\{ifindex if ifindex else ""\}/g,String(n)):e.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):e.replace(/\{ifindex\}/g,String(n))}function ku(e,n){let t=e;for(const[r,i]of Object.entries(n))i!==void 0&&(t=t.replaceAll(`{${r}}`,String(i)));return t}function Nu(e,n){return $u(e,n)}function $u(e,n){const[t,,]=Cu(e),r=(t&4294967295)+n;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}function Cu(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(c=>Number(c)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),s=Number(t??32),o=s===0?0:-1<<32-s>>>0;return[i&o,s]}function Ou(e,n){const t=n.toString(16).padStart(4,"0");return e.replace(/00-00$/,`${t.slice(0,2)}-${t.slice(2)}`)}function sa(e,n){const t=e.nodes??{},r=e.links;if(!r)return[];const i=Array.isArray(r)?r:[],s=[];let o=0;for(const c of i){o++;const l=`links[${o}]`,u=aa(c,l,t,n);u&&u.disable!==!0&&(u.linkindex=o,u[_e]=l,delete u._linkname,s.push(u))}return e.links=s,s}function aa(e,n,t,r){if(typeof e=="string"){const i=[];for(const s of e.split("-")){const o=s.trim();t[o]?i.push({node:o}):r==null||r.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${e} in ${n} refers to an unknown node ${o}`})}return{interfaces:i,[_e]:n}}if(Array.isArray(e))return{interfaces:Ei(e,t,r,n),[_e]:n};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=Ei(i.interfaces,t,r,n),i[_e]=n,i;const s={[_e]:n},o=[];for(const[c,l]of Object.entries(i))if(c in t){const u=l&&typeof l=="object"&&!Array.isArray(l)?{...l,node:c}:{node:c};o.push(u)}else s[c]=l;return s.interfaces=o,s}return r==null||r.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof e} for ${n}`}),null}function Ei(e,n,t,r){const i=[];for(const s of e)if(typeof s=="string"){if(!n[s]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${r} refers to unknown node ${s}`});continue}i.push({node:s})}else if(s&&typeof s=="object"&&!Array.isArray(s)){const o=s;if(!o.node||!n[o.node]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${r} missing/unknown node`});continue}i.push(o)}return i}function Ru(e){let n=0;for(const t of e.links??[]){const r=Number(t.linkindex??0);r>n&&(n=r)}return n+1}function Pu(e,n){const t=(e.interfaces??[]).map(i=>i.ifindex??0);let r=n;for(;t.includes(r);)r++;return r}function Lu(e){var s,o;const n=e.nodes??{},t=e.defaults??{},r=lu(t),i=uu(t);for(const c of e.links??[]){ju(c,n);const l=c.interfaces??[];if(c.node_count=l.length,(c.type==="lan"||c.type==="stub")&&!c.bridge){const p=String(e.name??"lab").slice(0,10);c.bridge=`${p}_${c.linkindex??1}`}_u(e,c),yu(e,c);const u=[];for(const p of l){const d=p.node,h=n[d];if(!h)continue;const g=new Set(r);for(const G of h.module??[])g.add(G);for(const G of i)g.delete(G);const m={};for(const[G,H]of Object.entries(c))g.has(G)&&(m[G]=structuredClone(H));const{node:_,...w}=p,b=so(structuredClone(w),m),T=ut(String(h.device??"frr")),N=c.type==="loopback";let M,Y;if(N){M=Du(h);const G=M-1e4,H=String(T.loopback_interface_name??T.interface_name??"Loopback{ifindex}");Y=at(H,G),b.virtual_interface=!0}else M=Mu(h),Y=at(String(T.interface_name??"eth{ifindex}"),M);b.ifindex=M,b.ifname=Y,b.type||(b.type=c.type??fr(c)),b.neighbors=[],p.ifindex=M,p.ifname=Y,N&&(p.virtual_interface=!0),h.interfaces=h.interfaces??[],h.interfaces.push(b),u.push({node:d,data:b})}for(const p of u){p.data.neighbors=[];for(const d of u){if(d===p)continue;const h={node:d.node};d.data.ifname!==void 0&&(h.ifname=d.data.ifname),d.data.ipv4!==void 0&&(h.ipv4=d.data.ipv4),d.data.ipv6!==void 0&&(h.ipv6=d.data.ipv6),p.data.neighbors.push(h)}}}for(const c of Object.values(n))c.af=c.af??{},((s=c.loopback)!=null&&s.ipv4||(c.interfaces??[]).some(l=>typeof l.ipv4=="string"))&&(c.af.ipv4=!0),((o=c.loopback)!=null&&o.ipv6||(c.interfaces??[]).some(l=>typeof l.ipv6=="string"))&&(c.af.ipv6=!0)}function ju(e,n){const t=e.interfaces??[];t.length;let r=0;for(const i of t){const s=n[i.node];s&&s.role!=="host"&&r++}!("role"in e)&&r<=1&&e.type!=="loopback"&&!e.vlan_name&&(e.role="stub"),e.type||(e.type=fr(e))}function Mu(e){const n=(e.interfaces??[]).map(r=>r.ifindex??0);let t=1;for(;n.includes(t);)t++;return t}function Du(e,n){const t=(e.interfaces??[]).map(i=>i.ifindex??0);let r=10001;for(;t.includes(r);)r++;return r}function Gt(e){return e===!0||e==="true"||e==="True"}function Fu(e){if(e.groups||(e.groups={}),Array.isArray(e.groups)){const n={};for(const t of e.groups)t.name&&(n[String(t.name)]=t);e.groups=n}}function Vu(e){var s;const n=e.groups??{},t=((s=e.defaults)==null?void 0:s.groups)??{},r=Gt(n._auto_create)||Gt(t._auto_create);!e.nodes||typeof e.nodes!="object"?e.nodes={}:Array.isArray(e.nodes)&&(e.nodes=ia(e.nodes));const i=e.nodes;for(const[o,c]of Object.entries(n)){if(o.startsWith("_")||!c||typeof c!="object"||Array.isArray(c))continue;const l=c,u=l.members;if(!(!Array.isArray(u)||u.length===0||!Gt(l._auto_create)&&!r||String(l.type??"node")!=="node"))for(const d of u){const h=String(d);h in n||h in t||h in i||(i[h]={name:h,interfaces:[]})}}}function Yu(e){const n=e.groups??{},t=e.nodes??{};for(const[r,i]of Object.entries(n)){if(r.startsWith("_")||!i||typeof i!="object"||Array.isArray(i))continue;const s=i.members??[];for(const o of s){const c=t[o];if(c){if(i.device&&!c.device&&(c.device=i.device),typeof i.provider=="string"&&!c.provider&&(c.provider=i.provider),Array.isArray(i.module)){const l=new Set(c.module??[]);for(const u of i.module)l.add(u);c.module=[...l]}if(i.node_data&&typeof i.node_data=="object"){const l=X(i.node_data,c);Object.assign(c,l)}}}}}function Bu(e){var r,i;e.groups||(e.groups={});const n=e.groups,t=Number((r=e.bgp)==null?void 0:r.as);for(const[s,o]of Object.entries(e.nodes??{})){if(!(o.module??[]).includes("bgp"))continue;const c=Number(((i=o.bgp)==null?void 0:i.as)??t);if(!Number.isFinite(c)||c<=0)continue;const l=`as${c}`;n[l]||(n[l]={members:[]});const u=n[l];Array.isArray(u.members)||(u.members=[]),u.members.includes(s)||u.members.push(s)}}function Uu(e){const n=e.components;if(!n||typeof n!="object")return;const t=e.nodes??{},r={},i=[],s=[];for(const[o,c]of Object.entries(t)){const l=c.include;if(typeof l!="string")continue;const u=n[l];if(!u)continue;i.push(o);const p=o,d=u.nodes??{};for(const[g,m]of Object.entries(d)){const _=`${p}_${g}`;r[_]={...m,name:_}}const h=u.links??[];for(const g of h)s.push(qu(g,p,Object.keys(d)))}for(const o of i)delete t[o];Object.assign(t,r),e.nodes=t,e.links=[...e.links??[],...s],delete e.components,sa(e)}function qu(e,n,t){const r=i=>t.includes(i)?`${n}_${i}`:i;if(Array.isArray(e))return{interfaces:e.map(i=>({node:r(String(i))}))};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(c=>({...c,node:r(String(c.node??""))})),i;const s={interfaces:[]},o=[];for(const[c,l]of Object.entries(i))t.includes(c)?o.push(l&&typeof l=="object"&&!Array.isArray(l)?{...l,node:r(c)}:{node:r(c)}):s[c]=l;return s.interfaces=o,s}return{interfaces:[]}}const oa="vlan",Gu=4e4,zu=["id","vni","mode","prefix","evpn","stp","lag","links"],Ku=["bridge","ifindex","parentindex","ifname","linkindex","type","vlan","mtu","bandwidth","_selfloop_ifindex","stp","virtual_interface","lag","evpn"];function ca(e){var t;const n=(t=e.defaults)==null?void 0:t.vlan;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function Gn(e,n){var r;const t=(r=ca(e).attributes)==null?void 0:r[n];return t&&typeof t=="object"&&!Array.isArray(t)?Object.keys(t):n==="vlan_no_propagate"?[...zu]:n==="phy_ifattr"?[...Ku]:n==="copy_vlan_to_intf"?["ipv4","ipv6","gateway"]:[]}function xe(e){return e.vlans??{}}function Hu(e){var r;const n=Number((r=e.vlan)==null?void 0:r.start_vlan_id);if(Number.isFinite(n)&&n>0)return n;const t=Number(ca(e).start_vlan_id);return Number.isFinite(t)&&t>0?t:1e3}function Wu(e,n,t){n.prefix!==void 0&&(t.prefix=structuredClone(n.prefix)),t.type===void 0&&(t.type=n.type??"lan"),t.vlan_name=e}function Ju(e,n,t){var s,o,c,l,u,p,d;const r=((s=e.vlan)==null?void 0:s.access)??((o=e.vlan)==null?void 0:o.native);if(!r)return"irb";const i=n.vlans??{};return e._vlan_mode||((c=e.vlan)==null?void 0:c.mode)||((l=i[String(r)])==null?void 0:l.mode)||((u=n.vlan)==null?void 0:u.mode)||((p=xe(t)[String(r)])==null?void 0:p.mode)||((d=t.vlan)==null?void 0:d.mode)||"irb"}function Xu(e,n){var t;for(const r of e.interfaces??[]){if(!r.vlan)continue;const i=(t=n.nodes)==null?void 0:t[String(r.node)];i&&(r._vlan_mode=Ju(r,i,n))}}function la(e){return e._vlan_mode}function ua(e,n){const t=xe(e);if(Object.keys(t).length){e.links||(e.links=[]);for(const[r,i]of Object.entries(t))if(!(!i||typeof i!="object")&&Array.isArray(i.links)){for(let s=0;s<i.links.length;s++){const o=aa(i.links[s],`vlans.${r}.links[${s+1}]`,e.nodes??{},n==null?void 0:n.diagnostics);if(!o)continue;const c=o.vlan??{};c.access=r,o.vlan=c,o.linkindex=Ru(e),o[_e]=`vlans.${r}.links[${s+1}]`,e.links.push(o)}delete i.links}}}function Zu(e){const n=xe(e);if(!Object.keys(n).length)return;const t=new Set;for(const i of Object.values(n))typeof(i==null?void 0:i.id)=="number"&&t.add(i.id);for(const i of Object.values(e.nodes??{})){const s=i.vlans;if(s)for(const o of Object.values(s))typeof(o==null?void 0:o.id)=="number"&&t.add(o.id)}let r=Hu(e);for(const[i,s]of Object.entries(n)){const o=s??{};if(o.id===void 0){for(;t.has(r);)r++;o.id=r,t.add(r),r++}n[i]=o}e.vlans=n}function pa(e,n){e.vlans&&!e.links&&(e.links=[]),Zu(e),ua(e,n)}function fa(e,n,t){var s,o;if(e.type==="vlan_member")return;const r=e.vlan;if(!r)return;for(const c of e.interfaces??[]){const l=(s=n.nodes)==null?void 0:s[String(c.node)];l&&(l.module??[]).includes("vlan")&&(c.vlan=X(structuredClone(r),c.vlan??{}))}const i=typeof r.access=="string"?r.access:typeof r.native=="string"?r.native:void 0;if(i){const c=xe(n)[i];c&&r.access_id===void 0&&typeof c.id=="number"&&(r.access_id=c.id);for(const l of e.interfaces??[]){const u=l.vlan;u&&u.access_id===void 0&&r.access_id!==void 0&&(u.access_id=r.access_id)}if(Xu(e,n),c){const l=new Set(Gn(n,"vlan_no_propagate")),u={};for(const[p,d]of Object.entries(c))l.has(p)||(u[p]=structuredClone(d));for(const[p,d]of Object.entries(u))e[p]===void 0?e[p]=d:e[p]&&typeof e[p]=="object"&&!Array.isArray(e[p])&&d&&typeof d=="object"&&!Array.isArray(d)&&(e[p]=X(d,e[p]));Wu(i,c,e)}for(const l of e.interfaces??[]){const u=(o=n.nodes)==null?void 0:o[String(l.node)];u&&(u.module??[]).includes("vlan")&&la(l)==="bridge"&&(l.ipv4=!1,l.ipv6=!1)}}}function da(e,n,t){var c,l,u;n.vlans||(n.vlans={});const r=n.vlans;if((c=r[e])!=null&&c._global_merge)return r[e];const i=r[e]??{},s=xe(t)[e]??{};i.mode=i.mode||((l=n.vlan)==null?void 0:l.mode)||s.mode||((u=t.vlan)==null?void 0:u.mode)||"irb",i._global_merge=!0;const o=X(structuredClone(s),i);for(const p of Object.keys(o))!(n.module??[]).includes(p)&&(t.module??[]).includes(p)&&delete o[p];return r[e]=o,o}function Qu(e,n,t){e.vlans||(e.vlans={});const r=e.vlans;if(!(n in r)&&!xe(t)[n])return;n in r||(r[n]={});const i=da(n,e,t);if(i.bridge_group===void 0){const s=e.vlan??{},o=Number(s.max_bridge_group??0)+1;s.max_bridge_group=o,e.vlan=s,i.bridge_group=o}return i}function ma(e,n,t,r){var o,c,l;const i=xe(t)[e];if(i)return i;const s=(o=n.vlans)==null?void 0:o[e];if(s)return s;if(r!=null&&r.neighbors)for(const u of r.neighbors){if(!u.node)continue;const p=(c=t.nodes)==null?void 0:c[u.node],d=(l=p==null?void 0:p.vlans)==null?void 0:l[e];if(d)return d}}function ep(e,n,t,r,i){const s=ma(e,r,i,n);if(!s)return;Array.isArray(s.neighbors)||(s.neighbors=[]);const o=s.neighbors,c=new Set(o.map(h=>h.node));for(const h of n.neighbors??[])c.has(h.node)||o.push({...h});const l=new Set([...r.module??[],"ipv4","ipv6"]),u=String(r.name??""),p={node:u};t.ifname!==void 0&&(p.ifname=t.ifname);for(const h of l){const g=t[h];g!==void 0&&(p[h]=g)}const d=o.filter(h=>h.node!==u);d.push(p),s.neighbors=d}function np(e,n,t){var l;const r=new Set([...Gn(n,"phy_ifattr"),...Object.keys(((l=n.defaults)==null?void 0:l.providers)??{})]),i=new Set([...Gn(n,"vlan_no_propagate").filter(u=>u!=="mode"),...Gn(n,"vlan_svi_no_propagate")]),s={},o=e.interfaces??[],c=o.length;for(let u=0;u<c;u++){const p=o[u],d=p.vlan;if(!d)continue;const h=d.access??d.native;if(!h||(la(p)??"irb")==="route")continue;const m=Qu(e,h,n);if(!m)continue;const _=(ut(String(e.device??"none")).features??{}).vlan,w=_==null?void 0:_.svi_interface_name;if(!w||typeof w!="string"){t.diagnostics.error({code:"VALUE",category:"VALUE",module:"vlan",message:`Device ${e.device} used by ${e.name} does not support VLAN interfaces (access vlan ${h})`,path:`nodes.${e.name}`});return}let b=s[h];if(!b){const T=d.mode||m.mode||"",N=["vlan_name","gateway"];T!=="bridge"&&N.push("ipv4","ipv6");const M={};for(const Y of N)p[Y]!==void 0&&(M[Y]=structuredClone(p[Y]));b=M,T?b.vlan={mode:T,name:h}:b.vlan={name:h},b.type="svi",b.ifindex=Pu(e,Gu),b.ifname=ku(w,{vlan:Number(m.id),bvi:Number(m.bridge_group??m.id),ifname:p.ifname}),b.name=`VLAN ${h} (${m.id})`,b.virtual_interface=!0,b.neighbors=[];for(const[Y,G]of Object.entries(m))i.has(Y)||N.includes(Y)||G===!0&&b[Y]!==void 0||b[Y]===void 0&&(b[Y]=structuredClone(G));e.interfaces=e.interfaces??[],e.interfaces.push(b),s[h]=b}ep(h,p,b,e,n),p.neighbors!==void 0&&(p._vlan_saved_neighbors=p.neighbors);for(const T of Object.keys(p))T.includes("_vlan_saved")||r.has(T)||delete p[T];p.vlan={...p.vlan,access_id:m.id,access:h}}}function tp(e,n){for(const t of e.interfaces??[]){if(t.vlan_name===void 0)continue;const r=ma(String(t.vlan_name),e,n,t);!r||!Array.isArray(r.neighbors)||(t.neighbors=r.neighbors.filter(i=>i.node!==e.name))}}function rp(e){for(const n of e.links??[]){delete n.vlan_name;for(const t of n.interfaces??[])t._vlan_mode!==void 0&&(t.vlan={...t.vlan??{},mode:t._vlan_mode},delete t._vlan_mode)}for(const n of Object.values(e.nodes??{})){for(const r of n.interfaces??[])delete r.vlan_name,delete r._global_merge,r._vlan_mode!==void 0&&(r.vlan={...r.vlan??{},mode:r._vlan_mode},delete r._vlan_mode),r._vlan_saved_neighbors!==void 0&&(r.neighbors=r._vlan_saved_neighbors,delete r._vlan_saved_neighbors);const t=n.vlans;if(t)for(const r of Object.values(t))delete r._global_merge,delete r.neighbors}for(const n of Object.values(xe(e)))delete n.neighbors}function ha(e,n){for(const t of Object.values(e.nodes??{})){if(!(t.module??[]).includes("vlan"))continue;const r=t.vlans;if(r)for(const i of Object.keys(r))da(i,t,e);np(t,e,n)}for(const t of Object.values(e.nodes??{}))(t.module??[]).includes("vlan")&&tp(t,e);rp(e)}const ip={name:oa,module_pre_transform:pa,link_pre_transform:fa,module_post_link_transform:ha},sp=Object.freeze(Object.defineProperty({__proto__:null,createVlanAccessLinks:ua,default:ip,link_pre_transform:fa,module_post_link_transform:ha,module_pre_transform:pa,name:oa},Symbol.toStringTag,{value:"Module"})),_a="vrf";function ga(e,n){const t=e.vrfs;if(!t||typeof t!="object")return;let r=1;for(const[i,s]of Object.entries(t)){const o=s??{};o.rd||(o.rd=`1:${r}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),t[i]=o,r++}}function ya(e,n,t){const r=n.vrfs;if(!r)return;const i=new Set((e.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;const s={...e.vrfs??{}};for(const o of i)!s[o]&&r[o]&&(s[o]={...r[o]});e.vrfs=s}const ap={name:_a,module_pre_transform:ga,node_post_transform:ya},op=Object.freeze(Object.defineProperty({__proto__:null,default:ap,module_pre_transform:ga,name:_a,node_post_transform:ya},Symbol.toStringTag,{value:"Module"})),va="vxlan";function gr(e){return e.vlans??{}}function ba(e){var t;const n=(t=e.defaults)==null?void 0:t.vxlan;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function cp(e){var r;const n=Number((r=e.vxlan)==null?void 0:r.start_vni);if(Number.isFinite(n)&&n>0)return n;const t=Number(ba(e).start_vni);return Number.isFinite(t)&&t>0?t:1e5}function xa(e,n){const t=(n==null?void 0:n.vxlan)??e.vxlan??{};return Array.isArray(t.vlans)&&t.vlans.length?t.vlans.map(String):Object.keys(gr(e))}function wa(e,n){e.vxlan||(e.vxlan={})}function Sa(e,n){const t=gr(e);if(!Object.keys(t).length)return;const r=new Set;for(const l of Object.values(t))typeof(l==null?void 0:l.vni)=="number"&&r.add(l.vni);const i=cp(e);let s=i;const o=xa(e);for(const l of o){const u=t[l];if(!u||u.vni===!1||typeof u.vni=="number")continue;const p=Number(u.id),d=Number.isFinite(p)?i+p:0;if(d>0&&!r.has(d))u.vni=d,r.add(d);else{for(;r.has(s);)s++;u.vni=s,r.add(s),s++}}const c=e.vxlan??{};(!Array.isArray(c.vlans)||!c.vlans.length)&&(c.vlans=o.filter(l=>{var u;return typeof((u=t[l])==null?void 0:u.vni)=="number"})),e.vxlan=c}function lp(e,n){const t=e.loopback,r=t==null?void 0:t[n];if(typeof r=="string")return r.split("/")[0]}function Aa(e,n){var s,o;const t=e.vxlan??{},r=String(t.flooding??"static"),i=gr(e);for(const c of Object.values(e.nodes??{})){if(!(c.module??[]).includes("vxlan"))continue;const l=c.vxlan??{};l.domain===void 0&&(l.domain=t.domain??"global"),l.flooding=r;const u=xa(e,c).filter(m=>{var _;return typeof((_=i[m])==null?void 0:_.vni)=="number"});l.vlans=u;const p={...c.vlans??{}};for(const m of u){const _=i[m],w=p[m]??{},b=w.evpn??{},T=_.evpn&&typeof _.evpn=="object"&&!Array.isArray(_.evpn)?_.evpn:{};p[m]={...w,id:_.id,mode:_.mode,vni:_.vni,...Object.keys(T).length||Object.keys(b).length?{evpn:{...T,...b}}:{}}}Object.keys(p).length&&(c.vlans=p);const h=!!(t.use_v6_vtep??l.use_v6_vtep??ba(e).use_v6_vtep)?"ipv6":"ipv4",g=lp(c,h);if(g?(l.vtep=g,l.vtep_interface=String(((s=c.loopback)==null?void 0:s.ifname)??"lo"),l.transport=h):n.diagnostics.error({code:"MISSING",category:"MISSING",module:"vxlan",message:`VXLAN module needs an ${h.toUpperCase()} address on loopback of ${c.name}`,path:`nodes.${c.name}.loopback.${h}`}),String(l.flooding)==="static"){const m=Object.values(e.nodes??{}).filter(w=>w!==c&&(w.module??[]).includes("vxlan")),_=new Set;for(const w of u){const b=p[w];if(!b||typeof b.vni!="number")continue;const T=[];for(const N of m){const M=(o=N.vxlan)==null?void 0:o.vtep;if(typeof M!="string"||M===g)continue;const Y=N.vlans??{};Object.values(Y).some(H=>(H==null?void 0:H.vni)===b.vni)&&(T.push(M),_.add(M))}T.length&&(b.vtep_list=T)}_.size&&(l.vtep_list=[..._].sort())}c.vxlan=l}}const up={name:va,module_init:wa,module_pre_transform:Sa,module_post_transform:Aa},pp=Object.freeze(Object.defineProperty({__proto__:null,default:up,module_init:wa,module_post_transform:Aa,module_pre_transform:Sa,name:va},Symbol.toStringTag,{value:"Module"})),Ia="ospf";function Ta(e,n){e.ospf||(e.ospf={})}function Ea(e,n,t){var c,l;const r=e.ospf??{},i=n.ospf??{};if(r.area===void 0&&(r.area=i.area??"0.0.0.0"),!r.router_id){const u=e.loopback,p=typeof(u==null?void 0:u.ipv4)=="string"?u.ipv4.split("/")[0]:void 0;r.router_id=p??`10.0.0.${e.id??1}`}const s=(e.interfaces??[]).some(u=>typeof u.ipv4=="string")||typeof((c=e.loopback)==null?void 0:c.ipv4)=="string",o=(e.interfaces??[]).some(u=>typeof u.ipv6=="string")||typeof((l=e.loopback)==null?void 0:l.ipv6)=="string";r.af={ipv4:s,ipv6:o};for(const u of e.interfaces??[]){if(u.role==="external"){delete u.ospf;continue}const p=u.ospf??{};p.area===void 0&&(p.area=r.area),!p.network_type&&u.type==="p2p"&&(p.network_type="point-to-point"),u.role==="stub"||u.type==="stub"?p.passive===void 0&&(p.passive=!0):p.passive===void 0&&(p.passive=!1),u.ospf=p}if(e.loopback){const u=e.loopback,p=u.ospf??{};p.area===void 0&&(p.area=r.area),p.passive===void 0&&(p.passive=!1),u.ospf=p}e.ospf=r}const fp={name:Ia,module_init:Ta,node_post_transform:Ea},dp=Object.freeze(Object.defineProperty({__proto__:null,default:fp,module_init:Ta,name:Ia,node_post_transform:Ea},Symbol.toStringTag,{value:"Module"})),ka="isis";function Na(e,n){e.isis||(e.isis={})}function $a(e,n,t){const r=e.isis??{},i=n.isis??{};if(r.area||(r.area=i.area??"49.0001"),r.type||(r.type=i.type??"level-2"),!r.net){const s=(e.id??1).toString(16).padStart(4,"0");r.net=`${r.area}.0000.0000.${s}.00`}for(const s of e.interfaces??[]){const o=s.isis??{};!o.network_type&&s.type==="p2p"&&(o.network_type="point-to-point"),s.isis=o}e.isis=r}const mp={name:ka,module_init:Na,node_post_transform:$a},hp=Object.freeze(Object.defineProperty({__proto__:null,default:mp,module_init:Na,name:ka,node_post_transform:$a},Symbol.toStringTag,{value:"Module"})),Ca="bgp",ki={ipv4:["ibgp","ebgp","localas_ibgp"],ipv6:["ibgp","ebgp","localas_ibgp"]},_p={localas_ibgp:"ibgp"};function Oa(e,n){e.bgp||(e.bgp={})}function Ra(e,n,t){const r=e.bgp??{},i=n.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&t.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function Pa(e,n,t){var o,c,l,u,p,d;const r=(o=n.defaults)==null?void 0:o.bgp,i=String(((c=n.bgp)==null?void 0:c.ebgp_role)??(r==null?void 0:r.ebgp_role)??"external");if(!i||e.vlan_name)return;const s=new Set;for(const h of e.interfaces??[]){const g=(l=n.nodes)==null?void 0:l[h.node];if(!g)continue;const m=Number((u=g.bgp)==null?void 0:u.as);Number.isFinite(m)&&m>0&&s.add(m);const _=Number(((p=h.bgp)==null?void 0:p.local_as)??((d=g.bgp)==null?void 0:d.local_as)??m);Number.isFinite(_)&&_>0&&s.add(_)}s.size>1&&!e.role&&(e.role=i)}function La(e,n){for(const t of Object.values(e.nodes??{})){if(!(t.module??[]).includes("bgp"))continue;const r=t.bgp??{};if(!r.router_id){const i=t.loopback;r.router_id=typeof(i==null?void 0:i.ipv4)=="string"?i.ipv4.split("/")[0]:`10.0.0.${t.id??1}`}t.bgp=r}gp(e)}function ja(e,n,t){const r=e.bgp??{};if(!r.as){e.bgp=r;return}yp(e,n),xp(e,n),Ip(e),Sp(e),Ap(e),e.bgp=r}function gp(e){var t;const n=new Set;for(const r of Object.values(e.nodes??{})){const i=Number((t=r.bgp)==null?void 0:t.as);Number.isFinite(i)&&n.add(i)}for(const r of n){const i=Ma(r,e);if(!i.length)continue;const s=i.filter(c=>c.bgp.rr_cluster_id===void 0).map(c=>String(c.bgp.router_id??"")),o=s.length?s.sort()[0]:void 0;for(const c of i){const l=c.bgp;l.rr_cluster_id===void 0&&(l.rr_cluster_id=o||l.router_id)}}}function Ma(e,n){return Object.values(n.nodes??{}).filter(t=>{const r=t.bgp;return r&&Number(r.as)===e&&r.rr})}function yp(e,n){const t=e.bgp,r=t.sessions??ki,i=[];t.neighbors=i,vp(e,r,n,i),bp(e,r,n,i);for(const o of["ipv4","ipv6"])i.some(c=>c[o]!==void 0)&&(t[o]=!0);const s=t.activate??ki;for(const o of i){const c={};for(const l of["ipv4","ipv6"])o[l]!==void 0&&t[l]&&(s[l]??[]).includes(String(o.type))&&(c[l]=!0);Object.keys(c).length&&(o.activate=c)}}function vp(e,n,t,r){var d;const i=e.bgp,s=Number(i.as),o=!!i.rr,c=i.next_hop_self,l=i.rr_mesh!==!1,u=o?[]:Ma(s,t);let p;o||u.length===0?(p=Object.values(t.nodes??{}).filter(h=>{var g;return h.name===e.name?!1:Number((g=h.bgp)==null?void 0:g.as)===s}),o&&!l&&(p=p.filter(h=>!h.bgp.rr||h.bgp.rr_mesh!==!1))):p=u;for(const h of p){const g=h.loopback??{},m={};(d=h.bgp)!=null&&d.rr&&(m.rr=h.bgp.rr);const _=Da(h,g,"ibgp",n,m);_&&(e.loopback&&(_._source_intf=structuredClone(e.loopback)),c&&(_.next_hop_self="ebgp"),o&&!_.rr&&(_.rr_client=!0),r.push(_))}}function bp(e,n,t,r){var o,c;const i=e.bgp,s=Number(i.as);for(const l of e.interfaces??[])if(!(l.bgp===!1||!(typeof l.ipv4=="string"||typeof l.ipv6=="string")))for(const p of l.neighbors??[]){const d=(o=t.nodes)==null?void 0:o[p.node];if(!d)continue;const h=Number((c=d.bgp)==null?void 0:c.as);if(!Number.isFinite(h)||h<=0||h===s)continue;const g={};typeof p.ipv4=="string"&&(g.ipv4=p.ipv4),typeof p.ipv6=="string"&&(g.ipv6=p.ipv6);const m={ifindex:l.ifindex??0},_=Da(d,g,"ebgp",n,m);_&&(_.as=h,r.push(_))}}function Da(e,n,t,r,i={}){var c;const s={...i,name:e.name??"",as:(c=e.bgp)==null?void 0:c.as,type:t};let o=0;for(const l of["ipv4","ipv6"]){if(!(r[l]??[]).includes(t)||!(l in n))continue;o++;const u=n[l];typeof u=="boolean"?s[l]=u:typeof u=="string"&&(s[l]=u.split("/")[0])}return o>0?s:null}function xp(e,n){var o;const t=(o=n.defaults)==null?void 0:o.bgp,r=(t==null?void 0:t.advertise_roles)??["stub"],i=e.bgp,s=[...e.interfaces??[],...e.loopback?[e.loopback]:[]];for(const c of s){if(c.bgp===!1)continue;const l=c.bgp??{};if("advertise"in l){c.bgp=l;continue}const u=c.role,p=c.type;if(p&&r.includes(p)||u&&r.includes(u)){u!=="stub"?l.advertise=!0:l.advertise=wp(c,n),c.bgp=l;continue}p==="loopback"&&i.advertise_loopback&&(l.advertise=!0,c.bgp=l)}}function wp(e,n){var t;for(const r of e.neighbors??[]){const i=(t=n.nodes)==null?void 0:t[r.node];if(i&&i.role!=="host")return!1}return!0}function Sp(e){var i;const n=e.bgp,t=Array.isArray(n.advertise)?n.advertise.filter(s=>s&&typeof s=="object"):[];Array.isArray(n.advertise)||(n.advertise=t);const r=[...e.loopback?[e.loopback]:[],...e.interfaces??[]];for(const s of r){if(!((i=s.bgp)!=null&&i.advertise))continue;const o={};for(const c of["ipv4","ipv6"])typeof s[c]=="string"&&(o[c]=Su(String(s[c])));Object.keys(o).length&&t.push(o)}t.length?n.advertise=t:delete n.advertise}function Ap(e){const n=e.bgp,t=Array.isArray(n.advertise)?n.advertise:[];for(const r of["ipv4","ipv6"])n[r]||t.some(i=>r in i)&&(n[r]=!0)}function Ip(e){const n=e.bgp,t=n.community;if(!t||typeof t!="object")return;const r=Object.fromEntries(Object.entries(t).map(([i,s])=>[i,Array.isArray(s)?[...s]:s]));for(const[i,s]of Object.entries(_p))!(i in r)&&s in r&&(r[i]=[...r[s]??[]]);n.community=r}const Tp={name:Ca,module_init:Oa,node_pre_transform:Ra,link_pre_transform:Pa,module_post_transform:La,node_post_transform:ja},Ep=Object.freeze(Object.defineProperty({__proto__:null,default:Tp,link_pre_transform:Pa,module_init:Oa,module_post_transform:La,name:Ca,node_post_transform:ja,node_pre_transform:Ra},Symbol.toStringTag,{value:"Module"})),Fa="evpn";function Va(e){return e.vlans??{}}function Zt(e){var t;const n=(t=e.defaults)==null?void 0:t.evpn;return n&&typeof n=="object"&&!Array.isArray(n)?n:{}}function kp(e,n){var s,o,c;const t=Number((s=n==null?void 0:n.bgp)==null?void 0:s.as);if(Number.isFinite(t)&&t>0)return t;const r=Number((o=e.bgp)==null?void 0:o.as);if(Number.isFinite(r)&&r>0)return r;const i=Number(((c=e.evpn)==null?void 0:c.as)??Zt(e).as);if(Number.isFinite(i)&&i>0)return i}function Ya(e,n){e.evpn||(e.evpn={}),e.vxlan||(e.vxlan={}),e.vxlan.flooding="evpn"}function Ba(e,n){const t=Va(e),r=e.evpn??{},i=kp(e);let s;Array.isArray(r.vlans)&&r.vlans.length?s=r.vlans.map(String):s=Object.entries(t).filter(([,o])=>typeof(o==null?void 0:o.vni)=="number").map(([o])=>o),r.vlans=s;for(const o of s){const c=t[o];if(!c)continue;const l=c.evpn??{};l.evi===void 0&&(l.evi=c.id??0);const u=l.evi;if(i!==void 0){const p=`${i}:${u}`;l.import||(l.import=[p]),l.export||(l.export=[p])}c.evpn=l}e.evpn=r}function Ua(e,n,t){var h,g;if(!(e.module??[]).includes("evpn"))return;const r=n.evpn??{},i=e.evpn??{};if(i.transport===void 0&&(i.transport=r.transport??Zt(n).transport??"vxlan"),!Array.isArray(i.session)||!i.session.length){const m=Zt(n).session;i.session=Array.isArray(r.session)?[...r.session]:Array.isArray(m)?[...m]:["ibgp"]}const s=Va(n),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(s)).filter(m=>{var _;return typeof((_=s[m])==null?void 0:_.vni)=="number"});i.vlans=o;const c=String(((h=e.bgp)==null?void 0:h.router_id)??""),l={...e.vlans??{}};for(const m of o){const _=s[m],w=_.evpn??{},b={...l[m]??{},id:_.id,mode:_.mode,vni:_.vni,evpn:{...w}},T=w.evi;c&&T!==void 0&&b.evpn.rd===void 0&&(b.evpn.rd=`${c}:${T}`),l[m]=b}Object.keys(l).length&&(e.vlans=l);const u=new Set(i.session.map(String)),p=e.bgp??{},d=Array.isArray(p.neighbors)?p.neighbors:Array.isArray(p.neighbor)?p.neighbor:[];for(const m of d){const _=String(m.name??""),w=(g=n.nodes)==null?void 0:g[_];if(!w||!(w.module??[]).includes("evpn"))continue;const b=String(m.type??"");u.has(b)&&m.evpn===void 0&&(m.evpn="ipv4")}p.neighbors=d,delete p.neighbor,e.bgp=p,e.evpn=i}const Np={name:Fa,module_init:Ya,module_pre_transform:Ba,node_post_transform:Ua},$p=Object.freeze(Object.defineProperty({__proto__:null,default:Np,module_init:Ya,module_pre_transform:Ba,name:Fa,node_post_transform:Ua},Symbol.toStringTag,{value:"Module"}));function Se(e){const n=e.name;return{...e,requires:Zi(n),transform_after:Qi(n)}}const pt=[Se(sp),Se(op),Se(pp),Se(dp),Se(hp),Se(Ep),Se($p)];function qa(e,n="transform_after"){const t=new Map(pt.map(l=>[l.name,l])),r=[],i=new Set,s=new Set;function o(l){if(n==="config_after")return mo(l);const u=t.get(l);return(u==null?void 0:u.transform_after)??Qi(l)}function c(l){var p;if(s.has(l)||i.has(l))return;i.add(l);const u=((p=t.get(l))==null?void 0:p.requires)??Zi(l);for(const d of[...u,...o(l)])e.includes(d)&&c(d);i.delete(l),s.add(l),r.push(l)}for(const l of e)c(l);return r}function yr(e,n="transform_after"){const t=new Set(e.module??[]);for(const r of Object.values(e.nodes??{}))for(const i of r.module??[])t.add(i);return qa([...t],n)}function Cp(e){const n=e.defaults??{},t=new Set(pt.map(r=>r.name));for(const r of yr(e)){if(!t.has(r))continue;const i=n[r]??vn(r)??{},s=e[r]??{},o=X(fo(i),s);e[r]=o;for(const c of Object.values(e.nodes??{})){if(!(c.module??[]).includes(r))continue;const l=c[r]??{},u=X(e[r],l);Object.keys(u).length!==0&&(c[r]=u)}}}function me(e,n,t){const r=yr(n);for(const i of r){const s=pt.find(c=>c.name===i);if(!s)continue;const o=s[e];if(typeof o=="function")if(e.startsWith("node_"))for(const c of Object.values(n.nodes??{}))(c.module??[]).includes(i)&&o(c,n,t);else if(e.startsWith("link_"))for(const c of n.links??[])o(c,n,t);else o(n,t)}}function Op(e){for(const n of Object.values(e.nodes??{}))for(const t of n.module??[]){const r=ho(t);if(!r.length)continue;const i=n[t]??{};for(const s of n.interfaces??[]){const o=s[t]??{};for(const c of r)o[c]===void 0&&i[c]!==void 0&&(o[c]=i[c]);s[t]=o}}}function Rp(e,n){const t=new Set(pt.map(r=>r.name));for(const r of Object.values(e.nodes??{}))for(const i of r.module??[])t.has(i)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${i} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(const r of e.module??[])t.has(r)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${r}`,path:"module"})}function Pp(e,n){e.provider||(e.provider="clab"),e.provider!=="clab"&&n.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:"provider"})}function Lp(e,n){e.provider||(e.provider="clab")}function jp(e){for(const n of Object.values(e.nodes??{}))n.device==="bird"&&Dp(n)}function Mp(e){return`(rt,${e.split(":").join(",")})`}function Dp(e){const n=e.vrfs;if(n)for(const t of Object.values(n))for(const r of["import","export"]){const i=t[r];Array.isArray(i)&&(t[`netlab-internal:_bird_${r}`]=i.map(s=>typeof s=="string"?Mp(s):s))}}function Fp(e,n={}){var s,o,c;const t=new co,r=ea(),i={diagnostics:t,devices:r};if(ns(e),Pp(e,i),Fu(e),e.nodes=ia(e.nodes,t),Vu(e),Uu(e),sa(e,t),Yu(e),Tu(e,t),Array.isArray(e.module)&&e.module.length>0)for(const l of Object.values(e.nodes))"module"in l||l.role==="host"&&!l["netlab-internal:_daemon"]||(l.module=[...e.module]);Cp(e),Bu(e),Rp(e,t),me("module_init",e,i),hu(e),(s=n.afterSetup)==null||s.call(n,e,i),me("module_pre_transform",e,i),me("node_pre_transform",e,i),Eu(e),me("link_pre_transform",e,i),Lu(e),me("module_post_link_transform",e,i),me("link_post_transform",e,i),me("module_post_transform",e,i),Op(e),me("node_post_transform",e,i),(o=n.afterAddressed)==null||o.call(n,e,i),jp(e),Lp(e),e.module=yr(e,"config_after");for(const l of Object.values(e.nodes??{}))Array.isArray(l.module)&&l.module.length>0&&(l.module=qa(l.module,"config_after"));return(c=n.afterTransformed)==null||c.call(n,e,i),{topology:e,diagnostics:t,ctx:i}}function Vp(e,n={}){const t={},r=n.validate===!0,i=(c,l,u)=>{var d;if(!r)return;const p=eu(c,l,{yangDir:n.yangDir,diagnostics:u});t[l]=p.ok,(d=n.snapshots)==null||d.set(l,structuredClone(c))},{topology:s,diagnostics:o}=Fp(e,{afterSetup:(c,l)=>{const u=l.diagnostics;i(c,"user_input",u),i(c,"normalized",u)},afterAddressed:(c,l)=>{i(c,"addressed",l.diagnostics)},afterTransformed:(c,l)=>{i(c,"transformed",l.diagnostics)}});return{topology:s,diagnostics:o,stages:t}}function Yp(e){const n=new Set,t=[];for(const r of e.links??[]){const i=r.interfaces??[];if(!(i.length<2))for(let s=0;s<i.length;s++)for(let o=s+1;o<i.length;o++){const c=String(i[s].node),l=String(i[o].node);if(!c||!l||c===l)continue;const u=c<l?`${c}\0${l}`:`${l}\0${c}`;n.has(u)||(n.add(u),t.push(c<l?[c,l]:[l,c]))}}return t}function Ae(e,n){if(e.length<4||n.length<2)return 0;const r=new Map;e.forEach((o,c)=>r.set(o,c));const i=[];for(const[o,c]of n){const l=r.get(o),u=r.get(c);l===void 0||u===void 0||i.push(l<u?[l,u]:[u,l])}let s=0;for(let o=0;o<i.length;o++){const[c,l]=i[o];for(let u=o+1;u<i.length;u++){const[p,d]=i[u];c===p||c===d||l===p||l===d||(c<p&&p<l&&l<d||p<c&&c<d&&d<l)&&s++}}return s}function Bp(e,n){const t=new Map;for(const r of e)t.set(r,0);for(const[r,i]of n)t.has(r)&&t.set(r,(t.get(r)??0)+1),t.has(i)&&t.set(i,(t.get(i)??0)+1);return t}function Up(e,n){if(e.length===0)return[];const t=Bp(e,n),r=new Map;for(const p of e)r.set(p,[]);for(const[p,d]of n)!r.has(p)||!r.has(d)||(r.get(p).push(d),r.get(d).push(p));for(const p of r.values())p.sort((d,h)=>d.localeCompare(h));let i=e[0],s=t.get(i)??0;for(const p of e){const d=t.get(p)??0;(d>s||d===s&&p.localeCompare(i)<0)&&(i=p,s=d)}const o=[],c=new Set,l=[i];for(c.add(i);l.length;){const p=l.shift();o.push(p);for(const d of r.get(p)??[])c.has(d)||(c.add(d),l.push(d))}const u=e.filter(p=>!c.has(p)).sort((p,d)=>p.localeCompare(d));for(const p of u){if(c.has(p))continue;const d=[p];for(c.add(p);d.length;){const h=d.shift();o.push(h);for(const g of r.get(h)??[])c.has(g)||(c.add(g),d.push(g))}}return o}function qp(e,n){if(e.length===0)return 0;let t=0,r=0;for(const o of e){const c=2*Math.PI*o/n;t+=Math.cos(c),r+=Math.sin(c)}const i=Math.atan2(r/e.length,t/e.length);let s=Math.round(i/(2*Math.PI)*n);return s=(s%n+n)%n,s}function Gp(e,n){const t=e.length;if(t<3)return e.slice();const r=new Map;for(const c of e)r.set(c,[]);for(const[c,l]of n)!r.has(c)||!r.has(l)||(r.get(c).push(l),r.get(l).push(c));const i=new Map;e.forEach((c,l)=>i.set(c,l));const s=new Map;for(const c of e){const l=r.get(c)??[];if(l.length===0){s.set(c,i.get(c));continue}const u=l.map(p=>i.get(p));s.set(c,qp(u,t))}return e.slice().sort((c,l)=>{const u=s.get(c),p=s.get(l);if(u!==p)return u-p;const d=i.get(c),h=i.get(l);return d!==h?d-h:c.localeCompare(l)})}function zp(e,n){const t=e.slice();let r=Ae(t,n),i=!0;for(;i;){i=!1;for(let s=0;s<t.length;s++){const o=(s+1)%t.length,c=t.slice(),l=c[s];c[s]=c[o],c[o]=l;const u=Ae(c,n);if(u<r){for(let p=0;p<t.length;p++)t[p]=c[p];r=u,i=!0}}}return t}function Kp(e){if(e.length===0)return[[]];if(e.length===1)return[[e[0]]];const n=[],t=new Array(e.length).fill(!1),r=[],i=()=>{if(r.length===e.length){n.push(r.slice());return}for(let s=0;s<e.length;s++)t[s]||(t[s]=!0,r.push(e[s]),i(),r.pop(),t[s]=!1)};return i(),n}function Hp(e,n){if(e.length<=1)return e.slice();if(n.length===0)return e.slice().sort((c,l)=>c.localeCompare(l));if(e.length<=8){let c=e.slice(),l=Ae(c,n);for(const u of Kp(e)){const p=Ae(u,n);if(p<l&&(c=u,l=p,l===0))break}return c}let t=Up(e,n),r=t.slice(),i=Ae(r,n);for(let c=0;c<24;c++){t=Gp(t,n),t=zp(t,n);const l=Ae(t,n);if(l<i&&(r=t.slice(),i=l,i===0))break}const s=r.slice().reverse();return Ae(s,n)<i?s:r}const Wp=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;function Jp(e){const n=new Date(e);if(Number.isNaN(n.getTime()))return e;const t=r=>String(r).padStart(2,"0");return`${n.getUTCFullYear()}-${t(n.getUTCMonth()+1)}-${t(n.getUTCDate())} ${t(n.getUTCHours())}:${t(n.getUTCMinutes())}:${t(n.getUTCSeconds())} UTC`}const pe=document.querySelector("#app");pe.innerHTML=`
  <header>
    <p class="build-time" title="Build timestamp">Built ${Jp("2026-07-16T22:21:28.841Z")}</p>
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
`;const Ne=pe.querySelector("#src"),Ni=pe.querySelector("#out"),Ge=pe.querySelector("#status"),ot=pe.querySelector("#diagnostics"),Ga=pe.querySelector("#graph"),Xp=pe.querySelector("#run"),Zp=pe.querySelector("#validate"),za=pe.querySelector("#full-json");let Qt;Ne.value=Wp;function Ka(){Ne.style.height="auto",Ne.style.height=`${Ne.scrollHeight}px`}function $i(e){const n=e.path?` (${e.path})`:"";return`[${e.module}/${e.code}] ${e.message}${n}`}function Ha(){ot.hidden=!0,ot.innerHTML="",Ge.classList.remove("is-error","is-warning")}function Ci(e){const n=e.errors??[],t=e.warnings??[];if(!n.length&&!t.length){Ha();return}Ge.classList.toggle("is-error",n.length>0),Ge.classList.toggle("is-warning",n.length===0&&t.length>0),ot.hidden=!1;const r=[];n.length&&r.push(`
      <div class="diag-block is-error">
        <h2>Transform errors</h2>
        <ul>
          ${n.map(i=>`<li>${Oi(i)}</li>`).join("")}
        </ul>
      </div>`),t.length&&r.push(`
      <div class="diag-block is-warning">
        <h2>Transform warnings</h2>
        <ul>
          ${t.map(i=>`<li>${Oi(i)}</li>`).join("")}
        </ul>
      </div>`),ot.innerHTML=r.join("")}function Oi(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function er(e){if(!e){Ni.textContent="";return}const n=za.checked?e:{nodes:e.nodes??{},links:e.links??[]};Ni.textContent=JSON.stringify(n,null,2)}function Qp(e){const n=Object.keys(e.nodes??{}),t=Yp(e),r=Hp(n,t),i=640,s=360,o=i/2,c=s/2,l=Math.min(i,s)*.32,u=new Map;r.forEach((h,g)=>{const m=2*Math.PI*g/Math.max(r.length,1)-Math.PI/2;u.set(h,{x:o+l*Math.cos(m),y:c+l*Math.sin(m)})});const p=t.map(([h,g])=>{const m=u.get(h),_=u.get(g);return!m||!_?"":`<line x1="${m.x}" y1="${m.y}" x2="${_.x}" y2="${_.y}" class="edge"/>`}).filter(Boolean).join(""),d=r.map(h=>{var _,w;const g=u.get(h),m=String(((w=(_=e.nodes)==null?void 0:_[h])==null?void 0:w.device)??"");return`
        <g class="node">
          <circle cx="${g.x}" cy="${g.y}" r="28"/>
          <text x="${g.x}" y="${g.y-2}" text-anchor="middle">${h}</text>
          <text x="${g.x}" y="${g.y+14}" text-anchor="middle" class="sub">${m}</text>
        </g>`}).join("");Ga.innerHTML=`${p}${d}`}function Wa(){Ge.textContent="Running…",Ha();try{const e=He.load(Ne.value);if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Topology must be a YAML object");const n=xo(Ne.value),{topology:t,diagnostics:r,stages:i}=Vp(n,{validate:Zp.checked,yangDir:"/yang"});Qt=t,er(t),Qp(t);const s=r.list().filter(l=>l.severity==="error"),o=r.list().filter(l=>l.severity==="warning"),c=[];s.length&&c.push(`${s.length} error(s)`),o.length&&c.push(`${o.length} warning(s)`),Ge.textContent=c.length?`${c.join(", ")}; stages: ${JSON.stringify(i)}`:`OK — stages: ${JSON.stringify(i)}`,Ci({errors:s.map($i),warnings:o.map($i)})}catch(e){const n=e instanceof Error?e.message:String(e);Ge.textContent="Transform failed",Ci({errors:[n]}),Qt=void 0,er(void 0),Ga.innerHTML=""}}Ne.addEventListener("input",Ka);Xp.addEventListener("click",Wa);za.addEventListener("change",()=>er(Qt));Ka();Wa();
