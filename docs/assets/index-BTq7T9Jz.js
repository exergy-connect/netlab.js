var Vr=Object.defineProperty;var Wr=(r,t,l)=>t in r?Vr(r,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):r[t]=l;var yn=(r,t,l)=>Wr(r,typeof t!="symbol"?t+"":t,l);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))u(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&u(o)}).observe(document,{childList:!0,subtree:!0});function l(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(i){if(i.ep)return;i.ep=!0;const c=l(i);fetch(i.href,c)}})();function Qr(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var D={},Ie={},ee={},An;function ge(){if(An)return ee;An=1;function r(o){return typeof o>"u"||o===null}function t(o){return typeof o=="object"&&o!==null}function l(o){return Array.isArray(o)?o:r(o)?[]:[o]}function u(o,s){if(s){const d=Object.keys(s);for(let f=0,m=d.length;f<m;f+=1){const y=d[f];o[y]=s[y]}}return o}function i(o,s){let d="";for(let f=0;f<s;f+=1)d+=o;return d}function c(o){return o===0&&Number.NEGATIVE_INFINITY===1/o}return ee.isNothing=r,ee.isObject=t,ee.toArray=l,ee.repeat=i,ee.isNegativeZero=c,ee.extend=u,ee}var Ue,xn;function _e(){if(xn)return Ue;xn=1;function r(l,u){let i="";const c=l.reason||"(unknown reason)";return l.mark?(l.mark.name&&(i+='in "'+l.mark.name+'" '),i+="("+(l.mark.line+1)+":"+(l.mark.column+1)+")",!u&&l.mark.snippet&&(i+=`

`+l.mark.snippet),c+" "+i):c}function t(l,u){Error.call(this),this.name="YAMLException",this.reason=l,this.mark=u,this.message=r(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t.prototype.toString=function(u){return this.name+": "+r(this,u)},Ue=t,Ue}var Ke,Sn;function zr(){if(Sn)return Ke;Sn=1;const r=ge();function t(i,c,o,s,d){let f="",m="";const y=Math.floor(d/2)-1;return s-c>y&&(f=" ... ",c=s-y+f.length),o-s>y&&(m=" ...",o=s+y-m.length),{str:f+i.slice(c,o).replace(/\t/g,"→")+m,pos:s-c+f.length}}function l(i,c){return r.repeat(" ",c-i.length)+i}function u(i,c){if(c=Object.create(c||null),!i.buffer)return null;c.maxLength||(c.maxLength=79),typeof c.indent!="number"&&(c.indent=1),typeof c.linesBefore!="number"&&(c.linesBefore=3),typeof c.linesAfter!="number"&&(c.linesAfter=2);const o=/\r?\n|\r|\0/g,s=[0],d=[];let f,m=-1;for(;f=o.exec(i.buffer);)d.push(f.index),s.push(f.index+f[0].length),i.position<=f.index&&m<0&&(m=s.length-2);m<0&&(m=s.length-1);let y="";const T=Math.min(i.line+c.linesAfter,d.length).toString().length,I=c.maxLength-(c.indent+T+3);for(let M=1;M<=c.linesBefore&&!(m-M<0);M++){const $=t(i.buffer,s[m-M],d[m-M],i.position-(s[m]-s[m-M]),I);y=r.repeat(" ",c.indent)+l((i.line-M+1).toString(),T)+" | "+$.str+`
`+y}const q=t(i.buffer,s[m],d[m],i.position,I);y+=r.repeat(" ",c.indent)+l((i.line+1).toString(),T)+" | "+q.str+`
`,y+=r.repeat("-",c.indent+T+3+q.pos)+`^
`;for(let M=1;M<=c.linesAfter&&!(m+M>=d.length);M++){const $=t(i.buffer,s[m+M],d[m+M],i.position-(s[m]-s[m+M]),I);y+=r.repeat(" ",c.indent)+l((i.line+M+1).toString(),T)+" | "+$.str+`
`}return y.replace(/\n$/,"")}return Ke=u,Ke}var Ge,wn;function Y(){if(wn)return Ge;wn=1;const r=_e(),t=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],l=["scalar","sequence","mapping"];function u(c){const o={};return c!==null&&Object.keys(c).forEach(function(s){c[s].forEach(function(d){o[String(d)]=s})}),o}function i(c,o){if(o=o||{},Object.keys(o).forEach(function(s){if(t.indexOf(s)===-1)throw new r('Unknown option "'+s+'" is met in definition of "'+c+'" YAML type.')}),this.options=o,this.tag=c,this.kind=o.kind||null,this.resolve=o.resolve||function(){return!0},this.construct=o.construct||function(s){return s},this.instanceOf=o.instanceOf||null,this.predicate=o.predicate||null,this.represent=o.represent||null,this.representName=o.representName||null,this.defaultStyle=o.defaultStyle||null,this.multi=o.multi||!1,this.styleAliases=u(o.styleAliases||null),l.indexOf(this.kind)===-1)throw new r('Unknown kind "'+this.kind+'" is specified for "'+c+'" YAML type.')}return Ge=i,Ge}var Ve,Tn;function Qn(){if(Tn)return Ve;Tn=1;const r=_e(),t=Y();function l(c,o){const s=[];return c[o].forEach(function(d){let f=s.length;s.forEach(function(m,y){m.tag===d.tag&&m.kind===d.kind&&m.multi===d.multi&&(f=y)}),s[f]=d}),s}function u(){const c={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(s){s.multi?(c.multi[s.kind].push(s),c.multi.fallback.push(s)):c[s.kind][s.tag]=c.fallback[s.tag]=s}for(let s=0,d=arguments.length;s<d;s+=1)arguments[s].forEach(o);return c}function i(c){return this.extend(c)}return i.prototype.extend=function(o){let s=[],d=[];if(o instanceof t)d.push(o);else if(Array.isArray(o))d=d.concat(o);else if(o&&(Array.isArray(o.implicit)||Array.isArray(o.explicit)))o.implicit&&(s=s.concat(o.implicit)),o.explicit&&(d=d.concat(o.explicit));else throw new r("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");s.forEach(function(m){if(!(m instanceof t))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(m.loadKind&&m.loadKind!=="scalar")throw new r("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(m.multi)throw new r("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),d.forEach(function(m){if(!(m instanceof t))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const f=Object.create(i.prototype);return f.implicit=(this.implicit||[]).concat(s),f.explicit=(this.explicit||[]).concat(d),f.compiledImplicit=l(f,"implicit"),f.compiledExplicit=l(f,"explicit"),f.compiledTypeMap=u(f.compiledImplicit,f.compiledExplicit),f},Ve=i,Ve}var We,Cn;function zn(){if(Cn)return We;Cn=1;const r=Y();return We=new r("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}}),We}var Qe,kn;function Jn(){if(kn)return Qe;kn=1;const r=Y();return Qe=new r("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}}),Qe}var ze,En;function Xn(){if(En)return ze;En=1;const r=Y();return ze=new r("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}}),ze}var Je,On;function Zn(){if(On)return Je;On=1;const r=Qn();return Je=new r({explicit:[zn(),Jn(),Xn()]}),Je}var Xe,Ln;function er(){if(Ln)return Xe;Ln=1;const r=Y();function t(i){if(i===null)return!0;const c=i.length;return c===1&&i==="~"||c===4&&(i==="null"||i==="Null"||i==="NULL")}function l(){return null}function u(i){return i===null}return Xe=new r("tag:yaml.org,2002:null",{kind:"scalar",resolve:t,construct:l,predicate:u,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),Xe}var Ze,In;function nr(){if(In)return Ze;In=1;const r=Y();function t(i){if(i===null)return!1;const c=i.length;return c===4&&(i==="true"||i==="True"||i==="TRUE")||c===5&&(i==="false"||i==="False"||i==="FALSE")}function l(i){return i==="true"||i==="True"||i==="TRUE"}function u(i){return Object.prototype.toString.call(i)==="[object Boolean]"}return Ze=new r("tag:yaml.org,2002:bool",{kind:"scalar",resolve:t,construct:l,predicate:u,represent:{lowercase:function(i){return i?"true":"false"},uppercase:function(i){return i?"TRUE":"FALSE"},camelcase:function(i){return i?"True":"False"}},defaultStyle:"lowercase"}),Ze}var en,Nn;function rr(){if(Nn)return en;Nn=1;const r=ge(),t=Y();function l(f){return f>=48&&f<=57||f>=65&&f<=70||f>=97&&f<=102}function u(f){return f>=48&&f<=55}function i(f){return f>=48&&f<=57}function c(f){if(f===null)return!1;const m=f.length;let y=0,T=!1;if(!m)return!1;let I=f[y];if((I==="-"||I==="+")&&(I=f[++y]),I==="0"){if(y+1===m)return!0;if(I=f[++y],I==="b"){for(y++;y<m;y++){if(I=f[y],I!=="0"&&I!=="1")return!1;T=!0}return T&&isFinite(o(f))}if(I==="x"){for(y++;y<m;y++){if(!l(f.charCodeAt(y)))return!1;T=!0}return T&&isFinite(o(f))}if(I==="o"){for(y++;y<m;y++){if(!u(f.charCodeAt(y)))return!1;T=!0}return T&&isFinite(o(f))}}for(;y<m;y++){if(!i(f.charCodeAt(y)))return!1;T=!0}return T?isFinite(o(f)):!1}function o(f){let m=f,y=1,T=m[0];if((T==="-"||T==="+")&&(T==="-"&&(y=-1),m=m.slice(1),T=m[0]),m==="0")return 0;if(T==="0"){if(m[1]==="b")return y*parseInt(m.slice(2),2);if(m[1]==="x")return y*parseInt(m.slice(2),16);if(m[1]==="o")return y*parseInt(m.slice(2),8)}return y*parseInt(m,10)}function s(f){return o(f)}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&f%1===0&&!r.isNegativeZero(f)}return en=new t("tag:yaml.org,2002:int",{kind:"scalar",resolve:c,construct:s,predicate:d,represent:{binary:function(f){return f>=0?"0b"+f.toString(2):"-0b"+f.toString(2).slice(1)},octal:function(f){return f>=0?"0o"+f.toString(8):"-0o"+f.toString(8).slice(1)},decimal:function(f){return f.toString(10)},hexadecimal:function(f){return f>=0?"0x"+f.toString(16).toUpperCase():"-0x"+f.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),en}var nn,Mn;function ir(){if(Mn)return nn;Mn=1;const r=ge(),t=Y(),l=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),u=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i(f){return f===null||!l.test(f)?!1:isFinite(parseFloat(f,10))?!0:u.test(f)}function c(f){let m=f.toLowerCase();const y=m[0]==="-"?-1:1;return"+-".indexOf(m[0])>=0&&(m=m.slice(1)),m===".inf"?y===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:m===".nan"?NaN:y*parseFloat(m,10)}const o=/^[-+]?[0-9]+e/;function s(f,m){if(isNaN(f))switch(m){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===f)switch(m){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===f)switch(m){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(r.isNegativeZero(f))return"-0.0";const y=f.toString(10);return o.test(y)?y.replace("e",".e"):y}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&(f%1!==0||r.isNegativeZero(f))}return nn=new t("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:c,predicate:d,represent:s,defaultStyle:"lowercase"}),nn}var rn,Rn;function tr(){return Rn||(Rn=1,rn=Zn().extend({implicit:[er(),nr(),rr(),ir()]})),rn}var tn,jn;function or(){return jn||(jn=1,tn=tr()),tn}var on,qn;function lr(){if(qn)return on;qn=1;const r=Y(),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),l=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function u(o){return o===null?!1:t.exec(o)!==null||l.exec(o)!==null}function i(o){let s=0,d=null,f=t.exec(o);if(f===null&&(f=l.exec(o)),f===null)throw new Error("Date resolve error");const m=+f[1],y=+f[2]-1,T=+f[3];if(!f[4])return new Date(Date.UTC(m,y,T));const I=+f[4],q=+f[5],M=+f[6];if(f[7]){for(s=f[7].slice(0,3);s.length<3;)s+="0";s=+s}if(f[9]){const K=+f[10],B=+(f[11]||0);d=(K*60+B)*6e4,f[9]==="-"&&(d=-d)}const $=new Date(Date.UTC(m,y,T,I,q,M,s));return d&&$.setTime($.getTime()-d),$}function c(o){return o.toISOString()}return on=new r("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:u,construct:i,instanceOf:Date,represent:c}),on}var ln,Fn;function cr(){if(Fn)return ln;Fn=1;const r=Y();function t(l){return l==="<<"||l===null}return ln=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:t}),ln}var cn,$n;function ur(){if($n)return cn;$n=1;const r=Y(),t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function l(o){if(o===null)return!1;let s=0;const d=o.length,f=t;for(let m=0;m<d;m++){const y=f.indexOf(o.charAt(m));if(!(y>64)){if(y<0)return!1;s+=6}}return s%8===0}function u(o){const s=o.replace(/[\r\n=]/g,""),d=s.length,f=t;let m=0;const y=[];for(let I=0;I<d;I++)I%4===0&&I&&(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)),m=m<<6|f.indexOf(s.charAt(I));const T=d%4*6;return T===0?(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)):T===18?(y.push(m>>10&255),y.push(m>>2&255)):T===12&&y.push(m>>4&255),new Uint8Array(y)}function i(o){let s="",d=0;const f=o.length,m=t;for(let T=0;T<f;T++)T%3===0&&T&&(s+=m[d>>18&63],s+=m[d>>12&63],s+=m[d>>6&63],s+=m[d&63]),d=(d<<8)+o[T];const y=f%3;return y===0?(s+=m[d>>18&63],s+=m[d>>12&63],s+=m[d>>6&63],s+=m[d&63]):y===2?(s+=m[d>>10&63],s+=m[d>>4&63],s+=m[d<<2&63],s+=m[64]):y===1&&(s+=m[d>>2&63],s+=m[d<<4&63],s+=m[64],s+=m[64]),s}function c(o){return Object.prototype.toString.call(o)==="[object Uint8Array]"}return cn=new r("tag:yaml.org,2002:binary",{kind:"scalar",resolve:l,construct:u,predicate:c,represent:i}),cn}var un,Pn;function sr(){if(Pn)return un;Pn=1;const r=Y(),t=Object.prototype.hasOwnProperty,l=Object.prototype.toString;function u(c){if(c===null)return!0;const o=[],s=c;for(let d=0,f=s.length;d<f;d+=1){const m=s[d];let y=!1;if(l.call(m)!=="[object Object]")return!1;let T;for(T in m)if(t.call(m,T))if(!y)y=!0;else return!1;if(!y)return!1;if(o.indexOf(T)===-1)o.push(T);else return!1}return!0}function i(c){return c!==null?c:[]}return un=new r("tag:yaml.org,2002:omap",{kind:"sequence",resolve:u,construct:i}),un}var sn,Dn;function fr(){if(Dn)return sn;Dn=1;const r=Y(),t=Object.prototype.toString;function l(i){if(i===null)return!0;const c=i,o=new Array(c.length);for(let s=0,d=c.length;s<d;s+=1){const f=c[s];if(t.call(f)!=="[object Object]")return!1;const m=Object.keys(f);if(m.length!==1)return!1;o[s]=[m[0],f[m[0]]]}return!0}function u(i){if(i===null)return[];const c=i,o=new Array(c.length);for(let s=0,d=c.length;s<d;s+=1){const f=c[s],m=Object.keys(f);o[s]=[m[0],f[m[0]]]}return o}return sn=new r("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:l,construct:u}),sn}var fn,Yn;function ar(){if(Yn)return fn;Yn=1;const r=Y(),t=Object.prototype.hasOwnProperty;function l(i){if(i===null)return!0;const c=i;for(const o in c)if(t.call(c,o)&&c[o]!==null)return!1;return!0}function u(i){return i!==null?i:{}}return fn=new r("tag:yaml.org,2002:set",{kind:"mapping",resolve:l,construct:u}),fn}var an,Bn;function gn(){return Bn||(Bn=1,an=or().extend({implicit:[lr(),cr()],explicit:[ur(),sr(),fr(),ar()]})),an}var Hn;function Jr(){if(Hn)return Ie;Hn=1;const r=ge(),t=_e(),l=zr(),u=gn(),i=Object.prototype.hasOwnProperty,c=1,o=2,s=3,d=4,f=1,m=2,y=3,T=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,I=/[\x85\u2028\u2029]/,q=/[,\[\]{}]/,M=/^(?:!|!!|![0-9A-Za-z-]+!)$/,$=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function K(e){return Object.prototype.toString.call(e)}function B(e){return e===10||e===13}function H(e){return e===9||e===32}function P(e){return e===9||e===32||e===10||e===13}function X(e){return e===44||e===91||e===93||e===123||e===125}function je(e){if(e>=48&&e<=57)return e-48;const a=e|32;return a>=97&&a<=102?a-97+10:-1}function qe(e){return e===120?2:e===117?4:e===85?8:0}function ve(e){return e>=48&&e<=57?e-48:-1}function ue(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function Fe(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function se(e,a,g){a==="__proto__"?Object.defineProperty(e,a,{configurable:!0,enumerable:!0,writable:!0,value:g}):e[a]=g}const be=new Array(256),fe=new Array(256);for(let e=0;e<256;e++)be[e]=ue(e)?1:0,fe[e]=ue(e);function F(e,a){this.input=e,this.filename=a.filename||null,this.schema=a.schema||u,this.onWarning=a.onWarning||null,this.legacy=a.legacy||!1,this.json=a.json||!1,this.listener=a.listener||null,this.maxDepth=typeof a.maxDepth=="number"?a.maxDepth:100,this.maxTotalMergeKeys=typeof a.maxTotalMergeKeys=="number"?a.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function ye(e,a){const g={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return g.snippet=l(g),new t(a,g)}function E(e,a){throw ye(e,a)}function ie(e,a){e.onWarning&&e.onWarning.call(null,ye(e,a))}function G(e,a,g){const b=e.anchorMapTransactions;if(b.length!==0){const h=b[b.length-1];i.call(h,a)||(h[a]={existed:i.call(e.anchorMap,a),value:e.anchorMap[a]})}e.anchorMap[a]=g}function $e(e){e.anchorMapTransactions.push(Object.create(null))}function ne(e){const a=e.anchorMapTransactions.pop(),g=e.anchorMapTransactions;if(g.length===0)return;const b=g[g.length-1],h=Object.keys(a);for(let w=0,n=h.length;w<n;w+=1){const p=h[w];i.call(b,p)||(b[p]=a[p])}}function Pe(e){const a=e.anchorMapTransactions.pop(),g=Object.keys(a);for(let b=g.length-1;b>=0;b-=1){const h=a[g[b]];h.existed?e.anchorMap[g[b]]=h.value:delete e.anchorMap[g[b]]}}function ae(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,tag:e.tag,anchor:e.anchor,kind:e.kind,result:e.result}}function te(e,a){e.position=a.position,e.line=a.line,e.lineStart=a.lineStart,e.lineIndent=a.lineIndent,e.firstTabInLine=a.firstTabInLine,e.tag=a.tag,e.anchor=a.anchor,e.kind=a.kind,e.result=a.result}const Ae={YAML:function(a,g,b){a.version!==null&&E(a,"duplication of %YAML directive"),b.length!==1&&E(a,"YAML directive accepts exactly one argument");const h=/^([0-9]+)\.([0-9]+)$/.exec(b[0]);h===null&&E(a,"ill-formed argument of the YAML directive");const w=parseInt(h[1],10),n=parseInt(h[2],10);w!==1&&E(a,"unacceptable YAML version of the document"),a.version=b[0],a.checkLineBreaks=n<2,n!==1&&n!==2&&ie(a,"unsupported YAML version of the document")},TAG:function(a,g,b){let h;b.length!==2&&E(a,"TAG directive accepts exactly two arguments");const w=b[0];h=b[1],M.test(w)||E(a,"ill-formed tag handle (first argument) of the TAG directive"),i.call(a.tagMap,w)&&E(a,'there is a previously declared suffix for "'+w+'" tag handle'),$.test(h)||E(a,"ill-formed tag prefix (second argument) of the TAG directive");try{h=decodeURIComponent(h)}catch{E(a,"tag prefix is malformed: "+h)}a.tagMap[w]=h}};function U(e,a,g,b){if(a<g){const h=e.input.slice(a,g);if(b)for(let w=0,n=h.length;w<n;w+=1){const p=h.charCodeAt(w);p===9||p>=32&&p<=1114111||E(e,"expected valid JSON character")}else T.test(h)&&E(e,"the stream contains non-printable characters");e.result+=h}}function Z(e,a,g,b){r.isObject(g)||E(e,"cannot merge mappings; the provided source object is unacceptable");const h=Object.keys(g);for(let w=0,n=h.length;w<n;w+=1){const p=h[w];e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&E(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")"),i.call(a,p)||(se(a,p,g[p]),b[p]=!0)}}function V(e,a,g,b,h,w,n,p,x){if(Array.isArray(h)){h=Array.prototype.slice.call(h);for(let _=0,v=h.length;_<v;_+=1)Array.isArray(h[_])&&E(e,"nested arrays are not supported inside keys"),typeof h=="object"&&K(h[_])==="[object Object]"&&(h[_]="[object Object]")}if(typeof h=="object"&&K(h)==="[object Object]"&&(h="[object Object]"),h=String(h),a===null&&(a={}),b==="tag:yaml.org,2002:merge")if(Array.isArray(w))for(let _=0,v=w.length;_<v;_+=1)Z(e,a,w[_],g);else Z(e,a,w,g);else!e.json&&!i.call(g,h)&&i.call(a,h)&&(e.line=n||e.line,e.lineStart=p||e.lineStart,e.position=x||e.position,E(e,"duplicated mapping key")),se(a,h,w),delete g[h];return a}function oe(e){const a=e.input.charCodeAt(e.position);a===10?e.position++:a===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):E(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function j(e,a,g){let b=0,h=e.input.charCodeAt(e.position);for(;h!==0;){for(;H(h);)h===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),h=e.input.charCodeAt(++e.position);if(a&&h===35)do h=e.input.charCodeAt(++e.position);while(h!==10&&h!==13&&h!==0);if(B(h))for(oe(e),h=e.input.charCodeAt(e.position),b++,e.lineIndent=0;h===32;)e.lineIndent++,h=e.input.charCodeAt(++e.position);else break}return g!==-1&&b!==0&&e.lineIndent<g&&ie(e,"deficient indentation"),b}function le(e){let a=e.position,g=e.input.charCodeAt(a);return!!((g===45||g===46)&&g===e.input.charCodeAt(a+1)&&g===e.input.charCodeAt(a+2)&&(a+=3,g=e.input.charCodeAt(a),g===0||P(g)))}function W(e,a){a===1?e.result+=" ":a>1&&(e.result+=r.repeat(`
`,a-1))}function xe(e,a,g){let b,h,w,n,p,x;const _=e.kind,v=e.result;let S=e.input.charCodeAt(e.position);if(P(S)||X(S)||S===35||S===38||S===42||S===33||S===124||S===62||S===39||S===34||S===37||S===64||S===96)return!1;if(S===63||S===45){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))return!1}for(e.kind="scalar",e.result="",b=h=e.position,w=!1;S!==0;){if(S===58){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))break}else if(S===35){const A=e.input.charCodeAt(e.position-1);if(P(A))break}else{if(e.position===e.lineStart&&le(e)||g&&X(S))break;if(B(S))if(n=e.line,p=e.lineStart,x=e.lineIndent,j(e,!1,-1),e.lineIndent>=a){w=!0,S=e.input.charCodeAt(e.position);continue}else{e.position=h,e.line=n,e.lineStart=p,e.lineIndent=x;break}}w&&(U(e,b,h,!1),W(e,e.line-n),b=h=e.position,w=!1),H(S)||(h=e.position+1),S=e.input.charCodeAt(++e.position)}return U(e,b,h,!1),e.result?!0:(e.kind=_,e.result=v,!1)}function Se(e,a){let g,b,h=e.input.charCodeAt(e.position);if(h!==39)return!1;for(e.kind="scalar",e.result="",e.position++,g=b=e.position;(h=e.input.charCodeAt(e.position))!==0;)if(h===39)if(U(e,g,e.position,!0),h=e.input.charCodeAt(++e.position),h===39)g=e.position,e.position++,b=e.position;else return!0;else B(h)?(U(e,g,b,!0),W(e,j(e,!1,a)),g=b=e.position):e.position===e.lineStart&&le(e)?E(e,"unexpected end of the document within a single quoted scalar"):(e.position++,H(h)||(b=e.position));E(e,"unexpected end of the stream within a single quoted scalar")}function pe(e,a){let g,b,h,w=e.input.charCodeAt(e.position);if(w!==34)return!1;for(e.kind="scalar",e.result="",e.position++,g=b=e.position;(w=e.input.charCodeAt(e.position))!==0;){if(w===34)return U(e,g,e.position,!0),e.position++,!0;if(w===92){if(U(e,g,e.position,!0),w=e.input.charCodeAt(++e.position),B(w))j(e,!1,a);else if(w<256&&be[w])e.result+=fe[w],e.position++;else if((h=qe(w))>0){let n=h,p=0;for(;n>0;n--)w=e.input.charCodeAt(++e.position),(h=je(w))>=0?p=(p<<4)+h:E(e,"expected hexadecimal character");e.result+=Fe(p),e.position++}else E(e,"unknown escape sequence");g=b=e.position}else B(w)?(U(e,g,b,!0),W(e,j(e,!1,a)),g=b=e.position):e.position===e.lineStart&&le(e)?E(e,"unexpected end of the document within a double quoted scalar"):(e.position++,H(w)||(b=e.position))}E(e,"unexpected end of the stream within a double quoted scalar")}function we(e,a){let g=!0,b,h,w;const n=e.tag;let p;const x=e.anchor;let _,v,S,A;const k=Object.create(null);let C,O,L,N=e.input.charCodeAt(e.position);if(N===91)_=93,A=!1,p=[];else if(N===123)_=125,A=!0,p={};else return!1;for(e.anchor!==null&&G(e,e.anchor,p),N=e.input.charCodeAt(++e.position);N!==0;){if(j(e,!0,a),N=e.input.charCodeAt(e.position),N===_)return e.position++,e.tag=n,e.anchor=x,e.kind=A?"mapping":"sequence",e.result=p,!0;if(g?N===44&&E(e,"expected the node content, but found ','"):E(e,"missed comma between flow collection entries"),O=C=L=null,v=S=!1,N===63){const R=e.input.charCodeAt(e.position+1);P(R)&&(v=S=!0,e.position++,j(e,!0,a))}b=e.line,h=e.lineStart,w=e.position,z(e,a,c,!1,!0),O=e.tag,C=e.result,j(e,!0,a),N=e.input.charCodeAt(e.position),(S||e.line===b)&&N===58&&(v=!0,N=e.input.charCodeAt(++e.position),j(e,!0,a),z(e,a,c,!1,!0),L=e.result),A?V(e,p,k,O,C,L,b,h,w):v?p.push(V(e,null,k,O,C,L,b,h,w)):p.push(C),j(e,!0,a),N=e.input.charCodeAt(e.position),N===44?(g=!0,N=e.input.charCodeAt(++e.position)):g=!1}E(e,"unexpected end of the stream within a flow collection")}function Te(e,a){let g,b=f,h=!1,w=!1,n=a,p=0,x=!1,_,v=e.input.charCodeAt(e.position);if(v===124)g=!1;else if(v===62)g=!0;else return!1;for(e.kind="scalar",e.result="";v!==0;)if(v=e.input.charCodeAt(++e.position),v===43||v===45)f===b?b=v===43?y:m:E(e,"repeat of a chomping mode identifier");else if((_=ve(v))>=0)_===0?E(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):w?E(e,"repeat of an indentation width identifier"):(n=a+_-1,w=!0);else break;if(H(v)){do v=e.input.charCodeAt(++e.position);while(H(v));if(v===35)do v=e.input.charCodeAt(++e.position);while(!B(v)&&v!==0)}for(;v!==0;){for(oe(e),e.lineIndent=0,v=e.input.charCodeAt(e.position);(!w||e.lineIndent<n)&&v===32;)e.lineIndent++,v=e.input.charCodeAt(++e.position);if(!w&&e.lineIndent>n&&(n=e.lineIndent),B(v)){p++;continue}if(!w&&n===0&&E(e,"missing indentation for block scalar"),e.lineIndent<n){b===y?e.result+=r.repeat(`
`,h?1+p:p):b===f&&h&&(e.result+=`
`);break}g?H(v)?(x=!0,e.result+=r.repeat(`
`,h?1+p:p)):x?(x=!1,e.result+=r.repeat(`
`,p+1)):p===0?h&&(e.result+=" "):e.result+=r.repeat(`
`,p):e.result+=r.repeat(`
`,h?1+p:p),h=!0,w=!0,p=0;const S=e.position;for(;!B(v)&&v!==0;)v=e.input.charCodeAt(++e.position);U(e,S,e.position,!1)}return!0}function Q(e,a){const g=e.tag,b=e.anchor,h=[];let w=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&G(e,e.anchor,h);let n=e.input.charCodeAt(e.position);for(;n!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation")),n===45);){const p=e.input.charCodeAt(e.position+1);if(!P(p))break;if(w=!0,e.position++,j(e,!0,-1)&&e.lineIndent<=a){h.push(null),n=e.input.charCodeAt(e.position);continue}const x=e.line;if(z(e,a,s,!1,!0),h.push(e.result),j(e,!0,-1),n=e.input.charCodeAt(e.position),(e.line===x||e.lineIndent>a)&&n!==0)E(e,"bad indentation of a sequence entry");else if(e.lineIndent<a)break}return w?(e.tag=g,e.anchor=b,e.kind="sequence",e.result=h,!0):!1}function Ce(e,a,g){let b,h,w,n;const p=e.tag,x=e.anchor,_={},v=Object.create(null);let S=null,A=null,k=null,C=!1,O=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&G(e,e.anchor,_);let L=e.input.charCodeAt(e.position);for(;L!==0;){!C&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,E(e,"tab characters must not be used in indentation"));const N=e.input.charCodeAt(e.position+1),R=e.line;if((L===63||L===58)&&P(N))L===63?(C&&(V(e,_,v,S,A,null,h,w,n),S=A=k=null),O=!0,C=!0,b=!0):C?(C=!1,b=!0):E(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,L=N;else{if(h=e.line,w=e.lineStart,n=e.position,!z(e,g,o,!1,!0))break;if(e.line===R){for(L=e.input.charCodeAt(e.position);H(L);)L=e.input.charCodeAt(++e.position);if(L===58)L=e.input.charCodeAt(++e.position),P(L)||E(e,"a whitespace character is expected after the key-value separator within a block mapping"),C&&(V(e,_,v,S,A,null,h,w,n),S=A=k=null),O=!0,C=!1,b=!1,S=e.tag,A=e.result;else if(O)E(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=p,e.anchor=x,!0}else if(O)E(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=p,e.anchor=x,!0}if((e.line===R||e.lineIndent>a)&&(C&&(h=e.line,w=e.lineStart,n=e.position),z(e,a,d,!0,b)&&(C?A=e.result:k=e.result),C||(V(e,_,v,S,A,k,h,w,n),S=A=k=null),j(e,!0,-1),L=e.input.charCodeAt(e.position)),(e.line===R||e.lineIndent>a)&&L!==0)E(e,"bad indentation of a mapping entry");else if(e.lineIndent<a)break}return C&&V(e,_,v,S,A,null,h,w,n),O&&(e.tag=p,e.anchor=x,e.kind="mapping",e.result=_),O}function De(e){let a=!1,g=!1,b,h,w=e.input.charCodeAt(e.position);if(w!==33)return!1;e.tag!==null&&E(e,"duplication of a tag property"),w=e.input.charCodeAt(++e.position),w===60?(a=!0,w=e.input.charCodeAt(++e.position)):w===33?(g=!0,b="!!",w=e.input.charCodeAt(++e.position)):b="!";let n=e.position;if(a){do w=e.input.charCodeAt(++e.position);while(w!==0&&w!==62);e.position<e.length?(h=e.input.slice(n,e.position),w=e.input.charCodeAt(++e.position)):E(e,"unexpected end of the stream within a verbatim tag")}else{for(;w!==0&&!P(w);)w===33&&(g?E(e,"tag suffix cannot contain exclamation marks"):(b=e.input.slice(n-1,e.position+1),M.test(b)||E(e,"named tag handle cannot contain such characters"),g=!0,n=e.position+1)),w=e.input.charCodeAt(++e.position);h=e.input.slice(n,e.position),q.test(h)&&E(e,"tag suffix cannot contain flow indicator characters")}h&&!$.test(h)&&E(e,"tag name cannot contain such characters: "+h);try{h=decodeURIComponent(h)}catch{E(e,"tag name is malformed: "+h)}return a?e.tag=h:i.call(e.tagMap,b)?e.tag=e.tagMap[b]+h:b==="!"?e.tag="!"+h:b==="!!"?e.tag="tag:yaml.org,2002:"+h:E(e,'undeclared tag handle "'+b+'"'),!0}function ke(e){let a=e.input.charCodeAt(e.position);if(a!==38)return!1;e.anchor!==null&&E(e,"duplication of an anchor property"),a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);return e.position===g&&E(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(g,e.position),!0}function Ee(e){let a=e.input.charCodeAt(e.position);if(a!==42)return!1;a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);e.position===g&&E(e,"name of an alias node must contain at least one character");const b=e.input.slice(g,e.position);return i.call(e.anchorMap,b)||E(e,'unidentified alias "'+b+'"'),e.result=e.anchorMap[b],j(e,!0,-1),!0}function Ye(e,a,g,b){const h=ae(e);return $e(e),te(e,a),e.tag=null,e.anchor=null,e.kind=null,e.result=null,Ce(e,g,b)&&e.kind==="mapping"?(ne(e),!0):(Pe(e),te(e,h),!1)}function z(e,a,g,b,h){let w,n,p=1,x=!1,_=!1,v=null,S,A,k;e.depth>=e.maxDepth&&E(e,"nesting exceeded maxDepth ("+e.maxDepth+")"),e.depth+=1,e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null;const C=w=n=d===g||s===g;if(b&&j(e,!0,-1)&&(x=!0,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)),p===1)for(;;){const O=e.input.charCodeAt(e.position),L=ae(e);if(x&&(O===33&&e.tag!==null||O===38&&e.anchor!==null)||!De(e)&&!ke(e))break;v===null&&(v=L),j(e,!0,-1)?(x=!0,n=C,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)):n=!1}if(n&&(n=x||h),p===1||d===g)if(c===g||o===g?A=a:A=a+1,k=e.position-e.lineStart,p===1)if(n&&(Q(e,k)||Ce(e,k,A))||we(e,A))_=!0;else{const O=e.input.charCodeAt(e.position);v!==null&&C&&!n&&O!==124&&O!==62&&Ye(e,v,v.position-v.lineStart,A)||w&&Te(e,A)||Se(e,A)||pe(e,A)?_=!0:Ee(e)?(_=!0,(e.tag!==null||e.anchor!==null)&&E(e,"alias node should not have any properties")):xe(e,A,c===g)&&(_=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&G(e,e.anchor,e.result)}else p===0&&(_=n&&Q(e,k));if(e.tag===null)e.anchor!==null&&G(e,e.anchor,e.result);else if(e.tag==="?"){e.result!==null&&e.kind!=="scalar"&&E(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"');for(let O=0,L=e.implicitTypes.length;O<L;O+=1)if(S=e.implicitTypes[O],S.resolve(e.result)){e.result=S.construct(e.result),e.tag=S.tag,e.anchor!==null&&G(e,e.anchor,e.result);break}}else if(e.tag!=="!"){if(i.call(e.typeMap[e.kind||"fallback"],e.tag))S=e.typeMap[e.kind||"fallback"][e.tag];else{S=null;const O=e.typeMap.multi[e.kind||"fallback"];for(let L=0,N=O.length;L<N;L+=1)if(e.tag.slice(0,O[L].tag.length)===O[L].tag){S=O[L];break}}S||E(e,"unknown tag !<"+e.tag+">"),e.result!==null&&S.kind!==e.kind&&E(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+S.kind+'", not "'+e.kind+'"'),S.resolve(e.result,e.tag)?(e.result=S.construct(e.result,e.tag),e.anchor!==null&&G(e,e.anchor,e.result)):E(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.depth-=1,e.tag!==null||e.anchor!==null||_}function Be(e){const a=e.position;let g=!1,b;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(b=e.input.charCodeAt(e.position))!==0&&(j(e,!0,-1),b=e.input.charCodeAt(e.position),!(e.lineIndent>0||b!==37));){g=!0,b=e.input.charCodeAt(++e.position);let h=e.position;for(;b!==0&&!P(b);)b=e.input.charCodeAt(++e.position);const w=e.input.slice(h,e.position),n=[];for(w.length<1&&E(e,"directive name must not be less than one character in length");b!==0;){for(;H(b);)b=e.input.charCodeAt(++e.position);if(b===35){do b=e.input.charCodeAt(++e.position);while(b!==0&&!B(b));break}if(B(b))break;for(h=e.position;b!==0&&!P(b);)b=e.input.charCodeAt(++e.position);n.push(e.input.slice(h,e.position))}b!==0&&oe(e),i.call(Ae,w)?Ae[w](e,w,n):ie(e,'unknown document directive "'+w+'"')}if(j(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,j(e,!0,-1)):g&&E(e,"directives end mark is expected"),z(e,e.lineIndent-1,d,!1,!0),j(e,!0,-1),e.checkLineBreaks&&I.test(e.input.slice(a,e.position))&&ie(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&le(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,j(e,!0,-1));return}e.position<e.length-1&&E(e,"end of the stream or a document separator is expected")}function Oe(e,a){e=String(e),a=a||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));const g=new F(e,a),b=e.indexOf("\0");for(b!==-1&&(g.position=b,E(g,"null byte is not allowed in input")),g.input+="\0";g.input.charCodeAt(g.position)===32;)g.lineIndent+=1,g.position+=1;for(;g.position<g.length-1;)Be(g);return g.documents}function Le(e,a,g){a!==null&&typeof a=="object"&&typeof g>"u"&&(g=a,a=null);const b=Oe(e,g);if(typeof a!="function")return b;for(let h=0,w=b.length;h<w;h+=1)a(b[h])}function He(e,a){const g=Oe(e,a);if(g.length!==0){if(g.length===1)return g[0];throw new t("expected a single document in the stream, but found more")}}return Ie.loadAll=Le,Ie.load=He,Ie}var pn={},Un;function Xr(){if(Un)return pn;Un=1;const r=ge(),t=_e(),l=gn(),u=Object.prototype.toString,i=Object.prototype.hasOwnProperty,c=65279,o=9,s=10,d=13,f=32,m=33,y=34,T=35,I=37,q=38,M=39,$=42,K=44,B=45,H=58,P=61,X=62,je=63,qe=64,ve=91,ue=93,Fe=96,se=123,be=124,fe=125,F={};F[0]="\\0",F[7]="\\a",F[8]="\\b",F[9]="\\t",F[10]="\\n",F[11]="\\v",F[12]="\\f",F[13]="\\r",F[27]="\\e",F[34]='\\"',F[92]="\\\\",F[133]="\\N",F[160]="\\_",F[8232]="\\L",F[8233]="\\P";const ye=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],E=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function ie(n,p){if(p===null)return{};const x={},_=Object.keys(p);for(let v=0,S=_.length;v<S;v+=1){let A=_[v],k=String(p[A]);A.slice(0,2)==="!!"&&(A="tag:yaml.org,2002:"+A.slice(2));const C=n.compiledTypeMap.fallback[A];C&&i.call(C.styleAliases,k)&&(k=C.styleAliases[k]),x[A]=k}return x}function G(n){let p,x;const _=n.toString(16).toUpperCase();if(n<=255)p="x",x=2;else if(n<=65535)p="u",x=4;else if(n<=4294967295)p="U",x=8;else throw new t("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+p+r.repeat("0",x-_.length)+_}const $e=1,ne=2;function Pe(n){this.schema=n.schema||l,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=r.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=ie(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.quotingType=n.quotingType==='"'?ne:$e,this.forceQuotes=n.forceQuotes||!1,this.replacer=typeof n.replacer=="function"?n.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function ae(n,p){const x=r.repeat(" ",p);let _=0,v="";const S=n.length;for(;_<S;){let A;const k=n.indexOf(`
`,_);k===-1?(A=n.slice(_),_=S):(A=n.slice(_,k+1),_=k+1),A.length&&A!==`
`&&(v+=x),v+=A}return v}function te(n,p){return`
`+r.repeat(" ",n.indent*p)}function Ae(n,p){for(let x=0,_=n.implicitTypes.length;x<_;x+=1)if(n.implicitTypes[x].resolve(p))return!0;return!1}function U(n){return n===f||n===o}function Z(n){return n>=32&&n<=126||n>=161&&n<=55295&&n!==8232&&n!==8233||n>=57344&&n<=65533&&n!==c||n>=65536&&n<=1114111}function V(n){return Z(n)&&n!==c&&n!==d&&n!==s}function oe(n,p,x){const _=V(n),v=_&&!U(n);return(x?_:_&&n!==K&&n!==ve&&n!==ue&&n!==se&&n!==fe)&&n!==T&&!(p===H&&!v)||V(p)&&!U(p)&&n===T||p===H&&v}function j(n){return Z(n)&&n!==c&&!U(n)&&n!==B&&n!==je&&n!==H&&n!==K&&n!==ve&&n!==ue&&n!==se&&n!==fe&&n!==T&&n!==q&&n!==$&&n!==m&&n!==be&&n!==P&&n!==X&&n!==M&&n!==y&&n!==I&&n!==qe&&n!==Fe}function le(n){return!U(n)&&n!==H}function W(n,p){const x=n.charCodeAt(p);let _;return x>=55296&&x<=56319&&p+1<n.length&&(_=n.charCodeAt(p+1),_>=56320&&_<=57343)?(x-55296)*1024+_-56320+65536:x}function xe(n){return/^\n* /.test(n)}const Se=1,pe=2,we=3,Te=4,Q=5;function Ce(n,p,x,_,v,S,A,k){let C,O=0,L=null,N=!1,R=!1;const bn=_!==-1;let de=-1,me=j(W(n,0))&&le(W(n,n.length-1));if(p||A)for(C=0;C<n.length;O>=65536?C+=2:C++){if(O=W(n,C),!Z(O))return Q;me=me&&oe(O,L,k),L=O}else{for(C=0;C<n.length;O>=65536?C+=2:C++){if(O=W(n,C),O===s)N=!0,bn&&(R=R||C-de-1>_&&n[de+1]!==" ",de=C);else if(!Z(O))return Q;me=me&&oe(O,L,k),L=O}R=R||bn&&C-de-1>_&&n[de+1]!==" "}return!N&&!R?me&&!A&&!v(n)?Se:S===ne?Q:pe:x>9&&xe(n)?Q:A?S===ne?Q:pe:R?Te:we}function De(n,p,x,_,v){n.dump=(function(){if(p.length===0)return n.quotingType===ne?'""':"''";if(!n.noCompatMode&&(ye.indexOf(p)!==-1||E.test(p)))return n.quotingType===ne?'"'+p+'"':"'"+p+"'";const S=n.indent*Math.max(1,x),A=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-S),k=_||n.flowLevel>-1&&x>=n.flowLevel;function C(O){return Ae(n,O)}switch(Ce(p,k,n.indent,A,C,n.quotingType,n.forceQuotes&&!_,v)){case Se:return p;case pe:return"'"+p.replace(/'/g,"''")+"'";case we:return"|"+ke(p,n.indent)+Ee(ae(p,S));case Te:return">"+ke(p,n.indent)+Ee(ae(Ye(p,A),S));case Q:return'"'+Be(p)+'"';default:throw new t("impossible error: invalid scalar style")}})()}function ke(n,p){const x=xe(n)?String(p):"",_=n[n.length-1]===`
`,S=_&&(n[n.length-2]===`
`||n===`
`)?"+":_?"":"-";return x+S+`
`}function Ee(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function Ye(n,p){const x=/(\n+)([^\n]*)/g;let _=(function(){let k=n.indexOf(`
`);return k=k!==-1?k:n.length,x.lastIndex=k,z(n.slice(0,k),p)})(),v=n[0]===`
`||n[0]===" ",S,A;for(;A=x.exec(n);){const k=A[1],C=A[2];S=C[0]===" ",_+=k+(!v&&!S&&C!==""?`
`:"")+z(C,p),v=S}return _}function z(n,p){if(n===""||n[0]===" ")return n;const x=/ [^ ]/g;let _,v=0,S,A=0,k=0,C="";for(;_=x.exec(n);)k=_.index,k-v>p&&(S=A>v?A:k,C+=`
`+n.slice(v,S),v=S+1),A=k;return C+=`
`,n.length-v>p&&A>v?C+=n.slice(v,A)+`
`+n.slice(A+1):C+=n.slice(v),C.slice(1)}function Be(n){let p="",x=0;for(let _=0;_<n.length;x>=65536?_+=2:_++){x=W(n,_);const v=F[x];!v&&Z(x)?(p+=n[_],x>=65536&&(p+=n[_+1])):p+=v||G(x)}return p}function Oe(n,p,x){let _="";const v=n.tag;for(let S=0,A=x.length;S<A;S+=1){let k=x[S];n.replacer&&(k=n.replacer.call(x,String(S),k)),(g(n,p,k,!1,!1)||typeof k>"u"&&g(n,p,null,!1,!1))&&(_!==""&&(_+=","+(n.condenseFlow?"":" ")),_+=n.dump)}n.tag=v,n.dump="["+_+"]"}function Le(n,p,x,_){let v="";const S=n.tag;for(let A=0,k=x.length;A<k;A+=1){let C=x[A];n.replacer&&(C=n.replacer.call(x,String(A),C)),(g(n,p+1,C,!0,!0,!1,!0)||typeof C>"u"&&g(n,p+1,null,!0,!0,!1,!0))&&((!_||v!=="")&&(v+=te(n,p)),n.dump&&s===n.dump.charCodeAt(0)?v+="-":v+="- ",v+=n.dump)}n.tag=S,n.dump=v||"[]"}function He(n,p,x){let _="";const v=n.tag,S=Object.keys(x);for(let A=0,k=S.length;A<k;A+=1){let C="";_!==""&&(C+=", "),n.condenseFlow&&(C+='"');const O=S[A];let L=x[O];n.replacer&&(L=n.replacer.call(x,O,L)),g(n,p,O,!1,!1)&&(n.dump.length>1024&&(C+="? "),C+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),g(n,p,L,!1,!1)&&(C+=n.dump,_+=C))}n.tag=v,n.dump="{"+_+"}"}function e(n,p,x,_){let v="";const S=n.tag,A=Object.keys(x);if(n.sortKeys===!0)A.sort();else if(typeof n.sortKeys=="function")A.sort(n.sortKeys);else if(n.sortKeys)throw new t("sortKeys must be a boolean or a function");for(let k=0,C=A.length;k<C;k+=1){let O="";(!_||v!=="")&&(O+=te(n,p));const L=A[k];let N=x[L];if(n.replacer&&(N=n.replacer.call(x,L,N)),!g(n,p+1,L,!0,!0,!0))continue;const R=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024;R&&(n.dump&&s===n.dump.charCodeAt(0)?O+="?":O+="? "),O+=n.dump,R&&(O+=te(n,p)),g(n,p+1,N,!0,R)&&(n.dump&&s===n.dump.charCodeAt(0)?O+=":":O+=": ",O+=n.dump,v+=O)}n.tag=S,n.dump=v||"{}"}function a(n,p,x){const _=x?n.explicitTypes:n.implicitTypes;for(let v=0,S=_.length;v<S;v+=1){const A=_[v];if((A.instanceOf||A.predicate)&&(!A.instanceOf||typeof p=="object"&&p instanceof A.instanceOf)&&(!A.predicate||A.predicate(p))){if(x?A.multi&&A.representName?n.tag=A.representName(p):n.tag=A.tag:n.tag="?",A.represent){const k=n.styleMap[A.tag]||A.defaultStyle;let C;if(u.call(A.represent)==="[object Function]")C=A.represent(p,k);else if(i.call(A.represent,k))C=A.represent[k](p,k);else throw new t("!<"+A.tag+'> tag resolver accepts not "'+k+'" style');n.dump=C}return!0}}return!1}function g(n,p,x,_,v,S,A){n.tag=null,n.dump=x,a(n,x,!1)||a(n,x,!0);const k=u.call(n.dump),C=_;_&&(_=n.flowLevel<0||n.flowLevel>p);const O=k==="[object Object]"||k==="[object Array]";let L,N;if(O&&(L=n.duplicates.indexOf(x),N=L!==-1),(n.tag!==null&&n.tag!=="?"||N||n.indent!==2&&p>0)&&(v=!1),N&&n.usedDuplicates[L])n.dump="*ref_"+L;else{if(O&&N&&!n.usedDuplicates[L]&&(n.usedDuplicates[L]=!0),k==="[object Object]")_&&Object.keys(n.dump).length!==0?(e(n,p,n.dump,v),N&&(n.dump="&ref_"+L+n.dump)):(He(n,p,n.dump),N&&(n.dump="&ref_"+L+" "+n.dump));else if(k==="[object Array]")_&&n.dump.length!==0?(n.noArrayIndent&&!A&&p>0?Le(n,p-1,n.dump,v):Le(n,p,n.dump,v),N&&(n.dump="&ref_"+L+n.dump)):(Oe(n,p,n.dump),N&&(n.dump="&ref_"+L+" "+n.dump));else if(k==="[object String]")n.tag!=="?"&&De(n,n.dump,p,S,C);else{if(k==="[object Undefined]")return!1;if(n.skipInvalid)return!1;throw new t("unacceptable kind of an object to dump "+k)}if(n.tag!==null&&n.tag!=="?"){let R=encodeURI(n.tag[0]==="!"?n.tag.slice(1):n.tag).replace(/!/g,"%21");n.tag[0]==="!"?R="!"+R:R.slice(0,18)==="tag:yaml.org,2002:"?R="!!"+R.slice(18):R="!<"+R+">",n.dump=R+" "+n.dump}}return!0}function b(n,p){const x=[],_=[];h(n,x,_);const v=_.length;for(let S=0;S<v;S+=1)p.duplicates.push(x[_[S]]);p.usedDuplicates=new Array(v)}function h(n,p,x){if(n!==null&&typeof n=="object"){const _=p.indexOf(n);if(_!==-1)x.indexOf(_)===-1&&x.push(_);else if(p.push(n),Array.isArray(n))for(let v=0,S=n.length;v<S;v+=1)h(n[v],p,x);else{const v=Object.keys(n);for(let S=0,A=v.length;S<A;S+=1)h(n[v[S]],p,x)}}}function w(n,p){p=p||{};const x=new Pe(p);x.noRefs||b(n,x);let _=n;return x.replacer&&(_=x.replacer.call({"":_},"",_)),g(x,0,_,!0,!0)?x.dump+`
`:""}return pn.dump=w,pn}var Kn;function Zr(){if(Kn)return D;Kn=1;const r=Jr(),t=Xr();function l(u,i){return function(){throw new Error("Function yaml."+u+" is removed in js-yaml 4. Use yaml."+i+" instead, which is now safe by default.")}}return D.Type=Y(),D.Schema=Qn(),D.FAILSAFE_SCHEMA=Zn(),D.JSON_SCHEMA=tr(),D.CORE_SCHEMA=or(),D.DEFAULT_SCHEMA=gn(),D.load=r.load,D.loadAll=r.loadAll,D.dump=t.dump,D.YAMLException=_e(),D.types={binary:ur(),float:ir(),map:Xn(),null:er(),pairs:fr(),set:ar(),timestamp:lr(),bool:nr(),int:rr(),merge:cr(),omap:sr(),seq:Jn(),str:zn()},D.safeLoad=l("safeLoad","load"),D.safeLoadAll=l("safeLoadAll","loadAll"),D.safeDump=l("safeDump","dump"),D}var ei=Zr();const Re=Qr(ei),{Type:Zi,Schema:et,FAILSAFE_SCHEMA:nt,JSON_SCHEMA:rt,CORE_SCHEMA:it,DEFAULT_SCHEMA:tt,load:ot,loadAll:lt,dump:ct,YAMLException:ut,types:st,safeLoad:ft,safeLoadAll:at,safeDump:pt}=Re,ni="netlab-internal",he=`${ni}:_linkname`;function Gn(r){return r!==null&&typeof r=="object"&&!Array.isArray(r)}function J(r,t){const l=new Set(Array.isArray(r._removed_attr)?r._removed_attr:[]),u={...r};for(const[i,c]of Object.entries(t)){if(i==="_removed_attr"){const s=Array.isArray(c)?c:[];u._removed_attr=[...l,...s.filter(d=>!l.has(d))];continue}if(l.has(i))continue;const o=u[i];Gn(o)&&Gn(c)?u[i]=J(o,c):u[i]=ri(c)}return u}function ri(r){return structuredClone(r)}class ii{constructor(){yn(this,"items",[])}error(t){this.items.push({...t,severity:"error"})}warning(t){this.items.push({...t,severity:"warning"})}hasErrors(){return this.items.some(t=>t.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function ti(){return{device:"frr",provider:"clab",addressing:{loopback:{ipv4:"10.0.0.0/24"},router_id:{ipv4:"10.0.0.0/24",prefix:32},lan:{ipv4:"172.16.0.0/16"},p2p:{ipv4:"10.1.0.0/16"},mgmt:{ipv4:"192.168.121.0/24",start:100,mac:"CA-FE-00-00-00-00"},vrf_loopback:{ipv4:"10.2.0.0/24",prefix:32},l2only:{}},ospf:{area:"0.0.0.0"},bgp:{},isis:{type:"level-2"}}}function oi(r){const t=Re.load(r);if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Topology must be a YAML/JSON object");return t}function li(r,t={}){const l=oi(r);return pr(l,t)}function pr(r,t={}){const l=J(ti(),t.defaults??{}),u=r.defaults??{};r.defaults=J(l,u),r.provider||(r.provider="clab"),r.name||(r.name=t.name??"topology");const i=r.defaults.addressing??{};return r.addressing=J(i,r.addressing??{}),r}const ci={none:`description: Dummy device used to test topology transformation
_meta_device: true
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
  bfd: true
  bgp:
    activate_af: true
    advertise: true
    aggregate: true
    local_as: true
    vrf_local_as: true
    local_as_ibgp: true
    role: true
    ipv6_lla: true
    rfc8950: true
    bandwidth: true
    multihop.vrf: true
    allowas_in: true
    as_override: true
    bfd: true
    default_originate: true
    description: true
    gr: true
    gtsm: true
    passive: true
    password: true
    remove_private_as: true
    rs_client: true
    rs: true
    tcp_ao:
    - libvirt
    - external
    timers: true
    import:
    - ospf
    - isis
    - ripv2
    - connected
    - static
    - vrf
    confederation: true
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
    bundle:
    - vlan_aware
    multi_rt: true
    ipv6: true
    transport:
    - vxlan
    - mpls
    - sr
  gateway:
    protocol:
    - anycast
    - vrrp
  initial:
    ipv4:
      unnumbered: true
    ipv6:
      lla: true
    mgmt_vrf: true
    ra: true
    roles:
    - router
    - bridge
    - host
    collect: true
    reload: true
  isis:
    import:
    - bgp
    - ospf
    - ripv2
    - connected
    - vrf
    vrf: true
    unnumbered:
      ipv4: true
      ipv6: true
      network: true
  lag:
    mlag: true
    passive: true
  mpls:
    ldp: true
    bgp: true
    vpn: true
    6pe: true
  ospf:
    areas: true
    unnumbered: true
    import:
    - bgp
    - isis
    - ripv2
    - connected
    - static
    - vrf
    default.policy: true
    gr:
    - ipv4
    - ipv6
    password: true
    priority: true
    timers: true
  ripv2:
    ipv4: true
    ipv6: true
    passive: true
    import:
    - bgp
    - isis
    - ospf
    - connected
    - vrf
  routing:
    policy:
      set:
        locpref: true
        med: true
        weight: true
        prepend: true
        community: true
      match:
        prefix: true
        nexthop: true
        aspath: true
        community:
          standard: true
          large: true
      delete:
        community: true
    prefix: true
    aspath: true
    community:
      standard: true
      large: true
    static:
      vrf: true
      inter_vrf: true
      discard: true
  sr:
    af:
    - ipv4
    - ipv6
    protocol:
    - isis
    - ospfv2
  srv6:
    isis: true
    ospf: true
    bgp: true
    vpn: true
  stp:
    supported_protocols:
    - stp
    - rstp
    - mstp
    - pvrst
    enable_per_port: true
    port_type: true
  vlan:
    model: router
    subif_name: '{ifname}.{subif_index}'
    svi_interface_name: Vlan{vlan}
    mixed_trunk: true
    native_routed: true
  vrf:
    ospfv2: true
    ospfv3: true
    bgp: true
    ripv2: true
    ripng: true
    isis: true
  vxlan:
    vtep6: true
  tunnel:
    gre:
    - vrf
    wireguard:
    - vrf
`,linux:`description: Generic Linux host
interface_name: eth{ifindex}
lag_interface_name: bond{lag.ifindex}
loopback_interface_name: lo{ifindex if ifindex else ""}
mgmt_if: eth0
role: host
features:
  lag:
    passive: false
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
    roles:
    - host
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
  netlab_lldp_enable: false
  netlab_net_tools: false
clab:
  node_config:
    initial: :ns
    lag: :ns
    vlan: :ns
    routing: :ns
  features:
    initial:
      roles:
      - host
      - bridge
      generate_mac:
      - svi
      config_mode:
      - sh
    vlan:
      mixed_trunk: true
      model: router
      native_routed: true
      subif_name: '{ifname}.{vlan.access_id}'
      svi_interface_name: vlan{vlan}
  image: python:3.13-alpine
  mtu: 1500
  kmods: null
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
`,frr:`description: FRR container
interface_name: eth{ifindex}
mgmt_if: eth0
loopback_interface_name: lo{ifindex if ifindex else ""}
tunnel_interface_name: tun{ifindex}
lag_interface_name: bond{lag.ifindex}
role: router
routing:
  _rm_per_af: true
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
    bfd:
    - bfdd
    bgp:
    - bgpd
    ospf:
    - ospfd
    - ospf6d
    ripv2:
    - ripd
    - ripngd
    isis:
    - isisd
    vrf:
    - bgpd
    gateway:
    - vrrpd
    mpls:
    - ldpd
mtu: 1500
clab:
  group_vars:
    ansible_connection: docker
    ansible_user: root
    netlab_show_command:
    - vtysh
    - -c
    - show $@
    netlab_mgmt_vrf: true
    netlab_config_mode: sh
    netlab_default_shebang: '#!/usr/bin/vtysh -f'
    netlab_config_exec:
    - sleep 1
  features:
    initial:
      config_mode:
      - sh
  image: quay.io/frrouting/frr:10.6.1
  kmods:
    initial:
    - vrf?
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
    netlab_show_command:
    - sudo
    - vtysh
    - -c
    - show $@
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
    roles:
    - host
    - router
    - bridge
    generate_mac:
    - svi
    collect: true
    reload: true
  bfd: true
  bgp:
    activate_af: true
    advertise: true
    ipv6_lla: true
    rfc8950: true
    local_as: true
    local_as_ibgp: true
    vrf_local_as: true
    import:
    - ospf
    - ripv2
    - isis
    - connected
    - static
    - vrf
    community:
      standard:
      - standard
      - large
      large:
      - large
      extended:
      - extended
      2octet:
      - standard
    confederation: true
    allowas_in: true
    as_override: true
    bfd: true
    default_originate: true
    description: true
    gr: true
    gtsm: true
    passive: true
    password: true
    remove_private_as.valid:
    - 'on'
    - all
    - replace
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
    asymmetrical_irb: true
    multi_rt: true
    transport:
    - vxlan
    ipv6: true
  gateway:
    protocol:
    - vrrp
    - anycast
  isis:
    circuit_type: true
    import:
    - bgp
    - ripv2
    - ospf
    - connected
    - static
    - vrf
    unnumbered:
      ipv4: true
      ipv6: true
      network: true
  lag:
    passive: false
  mpls:
    ldp: true
    vpn:
      ipv4: true
  ospf:
    unnumbered: true
    import:
    - bgp
    - ripv2
    - isis
    - connected
    - static
    - vrf
    default: true
    gr:
    - ipv4
    - ipv6
    password: true
    priority: true
    timers: true
    areas: true
  ripv2:
    ipv4: true
    ipv6: true
    passive: true
    import:
    - bgp
    - isis
    - ospf
    - connected
    - static
    - vrf
  routing:
    policy:
      set:
        locpref: true
        med: true
        weight: true
        prepend: true
        community:
          standard: true
          large: true
          extended: true
          append: true
      match:
        prefix: true
        nexthop: true
        aspath: true
        community:
          standard: true
          large: true
      delete:
        community: clist
    prefix: true
    aspath: true
    community:
      standard: true
      large: true
    static:
      vrf: true
      inter_vrf: true
      discard: true
  sr:
    af:
    - ipv4
    - ipv6
    protocol:
    - isis
    - ospfv2
  srv6:
    bgp: true
    isis: true
    vpn: true
  stp:
    supported_protocols:
    - stp
    enable_per_port: false
  tunnel:
    gre:
    - vrf
    wireguard:
    - vrf
  vlan:
    mixed_trunk: true
    model: router
    native_routed: true
    subif_name: '{ifname}.{vlan.access_id}'
    svi_interface_name: vlan{vlan}
  vrf:
    keep_module: true
    ospfv2: true
    ospfv3: true
    ripv2: true
    ripng: true
    bgp: true
    isis: true
  vxlan:
    vtep6: true
graphite.icon: router
attributes:
  global:
    frr:
      debug:
        type: list
        split_lines: true
      daemons:
        type: list
        _subtype: str
      logfile: str
  node:
    frr:
      debug:
        type: list
        split_lines: true
      daemons:
        type: list
        _subtype: str
      logfile: str
`,bird:`description: BIRD Internet Routing Daemon
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
    netlab_show_command:
    - birdcl
    - show $@
    docker_shell: bash -il
    netlab_config_mode: sh
    netlab_start_daemon: /usr/sbin/bird -d -c /etc/bird/bird.conf
  image: netlab/bird:latest
  build: true
  sw_version: 2.19.1
  sw_download_url: https://bird.nic.cz/download/bird-{sw_version}.tar.gz
  features:
    initial:
      roles:
      - host
      - router
      config_mode:
      - sh
      dataplane_config:
      - vxlan
      - vrf
      extra_daemon_config:
        vrf: /etc/bird/vrf.mod.conf
libvirt:
  image: null
virtualbox:
  image: null
features:
  bfd: true
  bgp:
    activate_af: true
    advertise: true
    ipv6_lla: false
    rfc8950: true
    local_as: true
    vrf_local_as: true
    local_as_ibgp: true
    community:
      standard:
      - standard
      - large
      large:
      - large
      extended:
      - extended
      2octet:
      - standard
    import:
    - ospf
    - connected
    - static
    - vrf
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
    import:
    - bgp
    - connected
    - static
    - vrf
    default: true
    gr:
    - ipv4
    - ipv6
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
    protocol:
    - anycast
  initial:
    ipv4:
      unnumbered: peer
    ipv6:
      lla: true
    reload: false
    roles:
    - host
    - router
  vxlan:
    vtep6: true
  vrf:
    ospfv2: true
    ospfv3: true
    bgp: true
  evpn:
    transport:
    - vxlan
daemon: true
parent: linux
interface_name: eth{ifindex}
mgmt_if: eth0
role: router
`},ui=new Set(["none","linux","frr","bird"]);let dn;function dr(){if(dn)return dn;const r={};for(const t of ui){const l=ci[t];if(!l)continue;const u=Re.load(l);r[t]={...u,name:t}}r.bird&&r.linux&&(r.bird=J(r.linux,{...r.bird,daemon:!0,parent:"linux"}));for(const t of Object.values(r)){if(t.clab&&typeof t.clab=="object"){const l=t.clab;l.features&&(t.features=J(t.features??{},l.features))}delete t.libvirt,delete t.virtualbox,delete t.external}return dn=r,r}function _n(r){return dr()[r]??{name:r,interface_name:"eth{ifindex}",role:"router"}}function si(r,t){let l;if(r&&typeof r=="object"&&!Array.isArray(r))l={...r};else{l={};for(const u of r??[])if(typeof u=="string")l[u]={name:u};else if(u&&typeof u=="object"&&!Array.isArray(u)){const i=u;if(!i.name){t==null||t.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(u)}`});continue}l[i.name]=i}}for(const u of Object.keys(l)){let i=l[u];i==null?i={name:u}:typeof i!="object"||Array.isArray(i)?(t==null||t.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${u} must be a dictionary`}),i={name:u,extra:i}):i={...i,name:u},Array.isArray(i.interfaces)||(i.interfaces=[]),l[u]=i}return l}function fi(r){const t=new Set;for(const u of Object.values(r.nodes??{}))typeof u.id=="number"&&t.add(u.id);let l=1;for(const u of Object.values(r.nodes??{}))if(typeof u.id!="number"){for(;t.has(l);)l++;u.id=l,t.add(l),l++}}function ai(r,t){var u;const l=String(((u=r.defaults)==null?void 0:u.device)??"frr");for(const i of Object.values(r.nodes??{})){i.device||(i.device=l);const c=i.device;if(!["none","linux","frr","bird"].includes(c)){t==null||t.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${c}' on node ${i.name} (allowed: none, linux, frr, bird)`,path:`nodes.${i.name}.device`});continue}const o=_n(c);i.role||(i.role=String(o.role??"router")),o.daemon&&(i["netlab-internal:_daemon"]=!0,o.parent&&(i["netlab-internal:_daemon_parent"]=o.parent))}}function pi(r){var o,s;fi(r);const t=((o=r.addressing)==null?void 0:o.mgmt)??{},l=((s=r.addressing)==null?void 0:s.loopback)??{},u=String(t.ipv4??"192.168.121.0/24"),i=Number(t.start??100),c=String(l.ipv4??"10.0.0.0/24");for(const d of Object.values(r.nodes??{})){const f=d.id??1,m=_n(String(d.device??"frr"));if(d.mgmt={ifname:String(m.mgmt_if??"eth0"),ipv4:di(u,i+f),mac:hi(String(t.mac??"CA-FE-00-00-00-00"),f)},d.role==="router"||d.role==="gateway"||!d.role){const y=mr(String(m.loopback_interface_name??"lo{ifindex}"),0);d.loopback={ifindex:0,ifname:y||"lo",type:"loopback",virtual_interface:!0,ipv4:`${hr(c,f)}/32`}}d.af=d.af??{},d.af.ipv4=!0}}function mr(r,t){return r.includes("if ifindex else")?t?r.replace(/\{ifindex if ifindex else ""\}/g,String(t)):r.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):r.replace(/\{ifindex\}/g,String(t))}function di(r,t){return hr(r,t)}function hr(r,t){const[l,,]=mi(r),u=(l&4294967295)+t;return[u>>>24&255,u>>>16&255,u>>>8&255,u&255].join(".")}function mi(r){const[t,l]=r.split("/"),u=(t??"0.0.0.0").split(".").map(s=>Number(s)),i=(u[0]<<24>>>0)+(u[1]<<16>>>0)+(u[2]<<8>>>0)+(u[3]>>>0),c=Number(l??32),o=c===0?0:-1<<32-c>>>0;return[i&o,c]}function hi(r,t){const l=t.toString(16).padStart(4,"0");return r.replace(/00-00$/,`${l.slice(0,2)}-${l.slice(2)}`)}const Me={};function gi(){for(const r of Object.keys(Me))delete Me[r]}function _i(r){gi();const t=r.addressing??{};r.addressing=t,r.pools={...t}}function vi(r,t){var s;if(t.prefix&&typeof t.prefix=="object")return;const l=t.type==="p2p"?"p2p":"lan",i=(((s=r.addressing)==null?void 0:s[l])??{}).ipv4;if(typeof i!="string"){t.prefix={};return}const c=t.type==="p2p"?30:24,o=yi(i,c,l);t.prefix={ipv4:Ai(o.base,o.plen)}}function bi(r,t){const u=(t.prefix??{}).ipv4;if(typeof u!="string")return;const i=gr(u),c=[...t.interfaces??[]].sort((d,f)=>String(d.node).localeCompare(String(f.node)));if(t.type==="p2p"&&c.length===2){c[0].ipv4=`${Ne(i,1)}/${i.plen}`,c[1].ipv4=`${Ne(i,2)}/${i.plen}`;for(const d of t.interfaces??[]){const f=c.find(m=>m.node===d.node);f&&(d.ipv4=f.ipv4)}return}const o=r.nodes??{};let s=1;for(const d of t.interfaces??[]){if(d.ipv4!==void 0&&d.ipv4!==null)continue;const f=o[d.node],m=f==null?void 0:f.id;typeof m=="number"&&m>0&&m<2**(32-i.plen)-1?d.ipv4=`${Ne(i,m)}/${i.plen}`:(d.ipv4=`${Ne(i,s)}/${i.plen}`,s++)}}function yi(r,t,l){const u=gr(r),i=2**(32-t),c=Me[l]??0;return Me[l]=c+1,{base:u.base+c*i>>>0,plen:t}}function gr(r){const[t,l]=r.split("/"),u=(t??"0.0.0.0").split(".").map(Number);return{base:(u[0]<<24>>>0)+(u[1]<<16>>>0)+(u[2]<<8>>>0)+(u[3]>>>0),plen:Number(l??32)}}function Ne(r,t){const l=r.base+t>>>0;return[l>>>24&255,l>>>16&255,l>>>8&255,l&255].join(".")}function Ai(r,t){return`${[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}/${t}`}function _r(r,t){const l=r.nodes??{},u=r.links;if(!u)return[];const i=Array.isArray(u)?u:[],c=[];let o=0;for(const s of i){o++;const d=`links[${o}]`,f=xi(s,d,l,t);f&&f.disable!==!0&&(f.linkindex=o,f[he]=d,delete f._linkname,c.push(f))}return r.links=c,c}function xi(r,t,l,u){if(typeof r=="string"){const i=[];for(const c of r.split("-")){const o=c.trim();l[o]?i.push({node:o}):u==null||u.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${r} in ${t} refers to an unknown node ${o}`})}return{interfaces:i,[he]:t}}if(Array.isArray(r))return{interfaces:Vn(r,l,u,t),[he]:t};if(r&&typeof r=="object"){const i={...r};if(Array.isArray(i.interfaces))return i.interfaces=Vn(i.interfaces,l,u,t),i[he]=t,i;const c={[he]:t},o=[];for(const[s,d]of Object.entries(i))if(s in l){const f=d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:s}:{node:s};o.push(f)}else c[s]=d;return c.interfaces=o,c}return u==null||u.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof r} for ${t}`}),null}function Vn(r,t,l,u){const i=[];for(const c of r)if(typeof c=="string"){if(!t[c]){l==null||l.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${u} refers to unknown node ${c}`});continue}i.push({node:c})}else if(c&&typeof c=="object"&&!Array.isArray(c)){const o=c;if(!o.node||!t[o.node]){l==null||l.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${u} missing/unknown node`});continue}i.push(o)}return i}function Si(r){const t=r.nodes??{};for(const l of r.links??[]){const u=l.interfaces??[],i=u.length;l.type||(l.type=i===2?"p2p":"lan"),l.type==="lan"&&!l.bridge&&(l.bridge=`${r.name??"lab"}_${l.linkindex??1}`),vi(r,l),bi(r,l);for(const c of u){const o=t[c.node];if(!o)continue;const s=_n(String(o.device??"frr")),d=wi(o),f=mr(String(s.interface_name??"eth{ifindex}"),d);c.ifindex=d,c.ifname=f;const m=u.filter(T=>T.node!==c.node).map(T=>{const I={node:T.node??""};return T.ifname!==void 0&&(I.ifname=T.ifname),T.ipv4!==void 0&&(I.ipv4=T.ipv4),T.ipv6!==void 0&&(I.ipv6=T.ipv6),I}),y={ifindex:d,ifname:f,type:l.type??"p2p",neighbors:m};c.ipv4!==void 0&&(y.ipv4=c.ipv4),c.ipv6!==void 0&&(y.ipv6=c.ipv6),l.linkindex!==void 0&&(y.linkindex=l.linkindex),l.ospf&&(y.ospf={...l.ospf}),l.vlan&&(y.vlan={...l.vlan}),l.isis&&(y.isis={...l.isis}),o.interfaces=o.interfaces??[],o.interfaces.push(y)}}}function wi(r){const t=(r.interfaces??[]).map(u=>u.ifindex??0);let l=1;for(;t.includes(l);)l++;return l}function Ti(r){if(r.groups||(r.groups={}),Array.isArray(r.groups)){const t={};for(const l of r.groups)l.name&&(t[String(l.name)]=l);r.groups=t}}function Ci(r){const t=r.groups??{},l=r.nodes??{};for(const[,u]of Object.entries(t)){const i=u.members??[];for(const c of i){const o=l[c];if(o){if(u.device&&!o.device&&(o.device=u.device),Array.isArray(u.module)){const s=new Set(o.module??[]);for(const d of u.module)s.add(d);o.module=[...s]}if(u.node_data&&typeof u.node_data=="object"){const s=J(u.node_data,o);Object.assign(o,s)}}}}}function ki(r){const t=r.components;if(!t||typeof t!="object")return;const l=r.nodes??{},u={},i=[],c=[];for(const[o,s]of Object.entries(l)){const d=s.include;if(typeof d!="string")continue;const f=t[d];if(!f)continue;i.push(o);const m=o,y=f.nodes??{};for(const[I,q]of Object.entries(y)){const M=`${m}_${I}`;u[M]={...q,name:M}}const T=f.links??[];for(const I of T)c.push(Ei(I,m,Object.keys(y)))}for(const o of i)delete l[o];Object.assign(l,u),r.nodes=l,r.links=[...r.links??[],...c],delete r.components,_r(r)}function Ei(r,t,l){const u=i=>l.includes(i)?`${t}_${i}`:i;if(Array.isArray(r))return{interfaces:r.map(i=>({node:u(String(i))}))};if(r&&typeof r=="object"){const i={...r};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(s=>({...s,node:u(String(s.node??""))})),i;const c={interfaces:[]},o=[];for(const[s,d]of Object.entries(i))l.includes(s)?o.push(d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:u(s)}:{node:u(s)}):c[s]=d;return c.interfaces=o,c}return{interfaces:[]}}const vr="vlan",br=[],yr=[];function Ar(r,t){const l=r.vlans;if(!l||typeof l!="object")return;let u=1;for(const[i,c]of Object.entries(l)){const o=c??{};if(o.id===void 0){for(;Object.values(l).some(s=>(s==null?void 0:s.id)===u);)u++;o.id=u++}l[i]=o}}function xr(r,t,l){var i;const u=r.vlan;if(u&&typeof u.access=="string"){const c=(i=t.vlans)==null?void 0:i[u.access];c&&u.access_id===void 0&&(u.access_id=c.id)}}const Oi={name:vr,transform_after:br,requires:yr,module_pre_transform:Ar,link_pre_transform:xr},Li=Object.freeze(Object.defineProperty({__proto__:null,default:Oi,link_pre_transform:xr,module_pre_transform:Ar,name:vr,requires:yr,transform_after:br},Symbol.toStringTag,{value:"Module"})),Sr="vrf",wr=["vlan"],Tr=[];function Cr(r,t){const l=r.vrfs;if(!l||typeof l!="object")return;let u=1;for(const[i,c]of Object.entries(l)){const o=c??{};o.rd||(o.rd=`1:${u}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),l[i]=o,u++}}function kr(r,t,l){const u=t.vrfs;if(!u)return;const i=new Set((r.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;const c={...r.vrfs??{}};for(const o of i)!c[o]&&u[o]&&(c[o]={...u[o]});r.vrfs=c}const Ii={name:Sr,transform_after:wr,requires:Tr,module_pre_transform:Cr,node_post_transform:kr},Ni=Object.freeze(Object.defineProperty({__proto__:null,default:Ii,module_pre_transform:Cr,name:Sr,node_post_transform:kr,requires:Tr,transform_after:wr},Symbol.toStringTag,{value:"Module"})),Er="ospf",Or=["vlan","vrf"],Lr=[];function Ir(r,t){r.ospf||(r.ospf={area:"0.0.0.0"})}function Nr(r,t,l){var o;const u=r.ospf??{},i=t.ospf??{};if(u.area===void 0&&(u.area=i.area??"0.0.0.0"),!u.router_id){const s=r.loopback,d=typeof(s==null?void 0:s.ipv4)=="string"?s.ipv4.split("/")[0]:void 0;u.router_id=d??`10.0.0.${r.id??1}`}const c=(r.interfaces??[]).some(s=>s.ipv4)||!!((o=r.loopback)!=null&&o.ipv4);u.af={ipv4:c,ipv6:!1};for(const s of r.interfaces??[]){const d=s.ospf??{};d.area===void 0&&(d.area=u.area),!d.network_type&&s.type==="p2p"&&(d.network_type="point-to-point"),s.ospf=d}r.ospf=u}const Mi={name:Er,transform_after:Or,requires:Lr,module_init:Ir,node_post_transform:Nr},Ri=Object.freeze(Object.defineProperty({__proto__:null,default:Mi,module_init:Ir,name:Er,node_post_transform:Nr,requires:Lr,transform_after:Or},Symbol.toStringTag,{value:"Module"})),Mr="isis",Rr=["vlan","vrf"],jr=[];function qr(r,t){r.isis||(r.isis={type:"level-2"})}function Fr(r,t,l){const u=r.isis??{},i=t.isis??{};if(u.area||(u.area=i.area??"49.0001"),u.type||(u.type=i.type??"level-2"),!u.net){const c=(r.id??1).toString(16).padStart(4,"0");u.net=`${u.area}.0000.0000.${c}.00`}for(const c of r.interfaces??[]){const o=c.isis??{};!o.network_type&&c.type==="p2p"&&(o.network_type="point-to-point"),c.isis=o}r.isis=u}const ji={name:Mr,transform_after:Rr,requires:jr,module_init:qr,node_post_transform:Fr},qi=Object.freeze(Object.defineProperty({__proto__:null,default:ji,module_init:qr,name:Mr,node_post_transform:Fr,requires:jr,transform_after:Rr},Symbol.toStringTag,{value:"Module"})),$r="bgp",Pr=["vlan","vrf","ospf","isis"],Dr=[];function Yr(r,t){r.bgp||(r.bgp={})}function Br(r,t,l){const u=r.bgp??{},i=t.bgp??{};u.as===void 0&&i.as!==void 0&&(u.as=i.as),u.as===void 0&&l.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${r.name} is missing bgp.as`,path:`nodes.${r.name}.bgp.as`}),r.bgp=u}function Hr(r,t,l){var c;const u=r.bgp??{};if(!u.router_id){const o=r.loopback;u.router_id=typeof(o==null?void 0:o.ipv4)=="string"?o.ipv4.split("/")[0]:`10.0.0.${r.id??1}`}const i=[];for(const o of r.interfaces??[])for(const s of o.neighbors??[]){const d=(c=t.nodes)==null?void 0:c[s.node];if(!d||!(d.module??[]).includes("bgp"))continue;const f=d.bgp??{},m=Number(u.as),y=Number(f.as),T={name:s.node??"",as:y,type:m===y?"ibgp":"ebgp"};typeof s.ipv4=="string"?T.ipv4=s.ipv4.split("/")[0]:typeof s.ipv4=="boolean"&&(T.ipv4=s.ipv4),i.push(T)}u.neighbor=i,r.bgp=u}const Fi={name:$r,transform_after:Pr,requires:Dr,module_init:Yr,node_pre_transform:Br,node_post_transform:Hr},$i=Object.freeze(Object.defineProperty({__proto__:null,default:Fi,module_init:Yr,name:$r,node_post_transform:Hr,node_pre_transform:Br,requires:Dr,transform_after:Pr},Symbol.toStringTag,{value:"Module"}));const Ur=[Li,Ni,Ri,qi,$i];function Pi(r){const t=new Map(Ur.map(o=>[o.name,o])),l=[],u=new Set,i=new Set;function c(o){if(i.has(o)||u.has(o))return;u.add(o);const s=t.get(o);for(const d of[...(s==null?void 0:s.requires)??[],...(s==null?void 0:s.transform_after)??[]])r.includes(d)&&c(d);u.delete(o),i.add(o),l.push(o)}for(const o of r)c(o);return l}function vn(r){const t=new Set(r.module??[]);for(const l of Object.values(r.nodes??{}))for(const u of l.module??[])t.add(u);return Pi([...t])}function Di(r){const t=r.defaults??{};for(const l of vn(r)){const u=t[l]??{},i=r[l]??{};r[l]=J(u,i);for(const c of Object.values(r.nodes??{})){if(!(c.module??[]).includes(l))continue;const o=c[l]??{};c[l]=J(r[l],o)}}}function re(r,t,l){const u=vn(t);for(const i of u){const c=Ur.find(s=>s.name===i);if(!c)continue;const o=c[r];if(typeof o=="function")if(r.startsWith("node_"))for(const s of Object.values(t.nodes??{}))(s.module??[]).includes(i)&&o(s,t,l);else if(r.startsWith("link_"))for(const s of t.links??[])o(s,t,l);else o(t,l)}}function Yi(r){const t={ospf:["area","passive","network_type","cost"],isis:["network_type","metric","passive"]};for(const l of Object.values(r.nodes??{}))for(const[u,i]of Object.entries(t)){if(!(l.module??[]).includes(u))continue;const c=l[u]??{};for(const o of l.interfaces??[]){const s=o[u]??{};for(const d of i)s[d]===void 0&&c[d]!==void 0&&(s[d]=c[d]);o[u]=s}}}function Bi(r,t){r.provider||(r.provider="clab"),r.provider!=="clab"&&t.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${r.provider}' (only clab is supported)`,path:"provider"})}function Hi(r,t){r.provider||(r.provider="clab")}function Ui(r){for(const t of Object.values(r.nodes??{}))t.device==="bird"&&Gi(t)}function Ki(r){return`(rt,${r.split(":").join(",")})`}function Gi(r){const t=r.vrfs;if(t)for(const l of Object.values(t))for(const u of["import","export"]){const i=l[u];Array.isArray(i)&&(l[`netlab-internal:_bird_${u}`]=i.map(c=>typeof c=="string"?Ki(c):c))}}function Vi(r,t={}){var c,o,s;const l=new ii,u=dr(),i={diagnostics:l,devices:u};if(pr(r),Bi(r,i),r.nodes=si(r.nodes,l),Ti(r),ki(r),_r(r,l),Ci(r),ai(r,l),Array.isArray(r.module))for(const d of Object.values(r.nodes)){if(d.role==="host"&&!d["netlab-internal:_daemon"])continue;const f=new Set([...d.module??[],...r.module]);d.module=[...f]}return Di(r),re("module_init",r,i),_i(r),(c=t.afterSetup)==null||c.call(t,r,i),re("module_pre_transform",r,i),re("node_pre_transform",r,i),pi(r),re("link_pre_transform",r,i),Si(r),re("link_post_transform",r,i),re("node_post_transform",r,i),Yi(r),re("module_post_transform",r,i),(o=t.afterAddressed)==null||o.call(t,r,i),Ui(r),Hi(r),r.module=vn(r),(s=t.afterTransformed)==null||s.call(t,r,i),{topology:r,diagnostics:l,ctx:i}}function Wi(r,t={}){const{topology:l,diagnostics:u}=Vi(r);return{topology:l,diagnostics:u,stages:{}}}const Qi=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`,ce=document.querySelector("#app");ce.innerHTML=`
  <header>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false"></textarea>
      <div class="actions">
        <button id="run" type="button">Transform</button>
        <span id="status"></span>
      </div>
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
`;const hn=ce.querySelector("#src"),Wn=ce.querySelector("#out"),mn=ce.querySelector("#status"),Kr=ce.querySelector("#graph"),zi=ce.querySelector("#run");hn.value=Qi;function Ji(r){const t=Object.keys(r.nodes??{}),l=r.links??[],u=640,i=360,c=u/2,o=i/2,s=Math.min(u,i)*.32,d=new Map;t.forEach((y,T)=>{const I=2*Math.PI*T/Math.max(t.length,1)-Math.PI/2;d.set(y,{x:c+s*Math.cos(I),y:o+s*Math.sin(I)})});const f=l.flatMap(y=>{const T=y.interfaces??[];if(T.length<2)return[];const I=[];for(let q=0;q<T.length;q++)for(let M=q+1;M<T.length;M++){const $=d.get(String(T[q].node)),K=d.get(String(T[M].node));!$||!K||I.push(`<line x1="${$.x}" y1="${$.y}" x2="${K.x}" y2="${K.y}" class="edge"/>`)}return I}).join(""),m=t.map(y=>{var q,M;const T=d.get(y),I=String(((M=(q=r.nodes)==null?void 0:q[y])==null?void 0:M.device)??"");return`
        <g class="node">
          <circle cx="${T.x}" cy="${T.y}" r="28"/>
          <text x="${T.x}" y="${T.y-2}" text-anchor="middle">${y}</text>
          <text x="${T.x}" y="${T.y+14}" text-anchor="middle" class="sub">${I}</text>
        </g>`}).join("");Kr.innerHTML=`${f}${m}`}function Gr(){mn.textContent="Running…";try{const r=Re.load(hn.value);if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Topology must be a YAML object");const t=li(hn.value),{topology:l,diagnostics:u,stages:i}=Wi(t,{validate:!1});Wn.textContent=JSON.stringify(l,null,2),Ji(l);const c=u.list().filter(o=>o.severity==="error");mn.textContent=c.length?`${c.length} error(s); stages: ${JSON.stringify(i)}`:`OK — stages: ${JSON.stringify(i)}`}catch(r){mn.textContent=r instanceof Error?r.message:String(r),Wn.textContent="",Kr.innerHTML=""}}zi.addEventListener("click",Gr);Gr();
