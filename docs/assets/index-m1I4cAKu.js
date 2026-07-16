var Jr=Object.defineProperty;var Xr=(r,t,l)=>t in r?Jr(r,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):r[t]=l;var An=(r,t,l)=>Xr(r,typeof t!="symbol"?t+"":t,l);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))u(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const o of c.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&u(o)}).observe(document,{childList:!0,subtree:!0});function l(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function u(i){if(i.ep)return;i.ep=!0;const c=l(i);fetch(i.href,c)}})();function Zr(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var D={},Me={},ee={},Tn;function ve(){if(Tn)return ee;Tn=1;function r(o){return typeof o>"u"||o===null}function t(o){return typeof o=="object"&&o!==null}function l(o){return Array.isArray(o)?o:r(o)?[]:[o]}function u(o,s){if(s){const d=Object.keys(s);for(let f=0,m=d.length;f<m;f+=1){const y=d[f];o[y]=s[y]}}return o}function i(o,s){let d="";for(let f=0;f<s;f+=1)d+=o;return d}function c(o){return o===0&&Number.NEGATIVE_INFINITY===1/o}return ee.isNothing=r,ee.isObject=t,ee.toArray=l,ee.repeat=i,ee.isNegativeZero=c,ee.extend=u,ee}var Ve,xn;function be(){if(xn)return Ve;xn=1;function r(l,u){let i="";const c=l.reason||"(unknown reason)";return l.mark?(l.mark.name&&(i+='in "'+l.mark.name+'" '),i+="("+(l.mark.line+1)+":"+(l.mark.column+1)+")",!u&&l.mark.snippet&&(i+=`

`+l.mark.snippet),c+" "+i):c}function t(l,u){Error.call(this),this.name="YAMLException",this.reason=l,this.mark=u,this.message=r(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t.prototype.toString=function(u){return this.name+": "+r(this,u)},Ve=t,Ve}var We,Sn;function ei(){if(Sn)return We;Sn=1;const r=ve();function t(i,c,o,s,d){let f="",m="";const y=Math.floor(d/2)-1;return s-c>y&&(f=" ... ",c=s-y+f.length),o-s>y&&(m=" ...",o=s+y-m.length),{str:f+i.slice(c,o).replace(/\t/g,"→")+m,pos:s-c+f.length}}function l(i,c){return r.repeat(" ",c-i.length)+i}function u(i,c){if(c=Object.create(c||null),!i.buffer)return null;c.maxLength||(c.maxLength=79),typeof c.indent!="number"&&(c.indent=1),typeof c.linesBefore!="number"&&(c.linesBefore=3),typeof c.linesAfter!="number"&&(c.linesAfter=2);const o=/\r?\n|\r|\0/g,s=[0],d=[];let f,m=-1;for(;f=o.exec(i.buffer);)d.push(f.index),s.push(f.index+f[0].length),i.position<=f.index&&m<0&&(m=s.length-2);m<0&&(m=s.length-1);let y="";const w=Math.min(i.line+c.linesAfter,d.length).toString().length,I=c.maxLength-(c.indent+w+3);for(let M=1;M<=c.linesBefore&&!(m-M<0);M++){const $=t(i.buffer,s[m-M],d[m-M],i.position-(s[m]-s[m-M]),I);y=r.repeat(" ",c.indent)+l((i.line-M+1).toString(),w)+" | "+$.str+`
`+y}const F=t(i.buffer,s[m],d[m],i.position,I);y+=r.repeat(" ",c.indent)+l((i.line+1).toString(),w)+" | "+F.str+`
`,y+=r.repeat("-",c.indent+w+3+F.pos)+`^
`;for(let M=1;M<=c.linesAfter&&!(m+M>=d.length);M++){const $=t(i.buffer,s[m+M],d[m+M],i.position-(s[m]-s[m+M]),I);y+=r.repeat(" ",c.indent)+l((i.line+M+1).toString(),w)+" | "+$.str+`
`}return y.replace(/\n$/,"")}return We=u,We}var Qe,wn;function Y(){if(wn)return Qe;wn=1;const r=be(),t=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],l=["scalar","sequence","mapping"];function u(c){const o={};return c!==null&&Object.keys(c).forEach(function(s){c[s].forEach(function(d){o[String(d)]=s})}),o}function i(c,o){if(o=o||{},Object.keys(o).forEach(function(s){if(t.indexOf(s)===-1)throw new r('Unknown option "'+s+'" is met in definition of "'+c+'" YAML type.')}),this.options=o,this.tag=c,this.kind=o.kind||null,this.resolve=o.resolve||function(){return!0},this.construct=o.construct||function(s){return s},this.instanceOf=o.instanceOf||null,this.predicate=o.predicate||null,this.represent=o.represent||null,this.representName=o.representName||null,this.defaultStyle=o.defaultStyle||null,this.multi=o.multi||!1,this.styleAliases=u(o.styleAliases||null),l.indexOf(this.kind)===-1)throw new r('Unknown kind "'+this.kind+'" is specified for "'+c+'" YAML type.')}return Qe=i,Qe}var ze,Cn;function Jn(){if(Cn)return ze;Cn=1;const r=be(),t=Y();function l(c,o){const s=[];return c[o].forEach(function(d){let f=s.length;s.forEach(function(m,y){m.tag===d.tag&&m.kind===d.kind&&m.multi===d.multi&&(f=y)}),s[f]=d}),s}function u(){const c={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(s){s.multi?(c.multi[s.kind].push(s),c.multi.fallback.push(s)):c[s.kind][s.tag]=c.fallback[s.tag]=s}for(let s=0,d=arguments.length;s<d;s+=1)arguments[s].forEach(o);return c}function i(c){return this.extend(c)}return i.prototype.extend=function(o){let s=[],d=[];if(o instanceof t)d.push(o);else if(Array.isArray(o))d=d.concat(o);else if(o&&(Array.isArray(o.implicit)||Array.isArray(o.explicit)))o.implicit&&(s=s.concat(o.implicit)),o.explicit&&(d=d.concat(o.explicit));else throw new r("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");s.forEach(function(m){if(!(m instanceof t))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(m.loadKind&&m.loadKind!=="scalar")throw new r("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(m.multi)throw new r("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),d.forEach(function(m){if(!(m instanceof t))throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const f=Object.create(i.prototype);return f.implicit=(this.implicit||[]).concat(s),f.explicit=(this.explicit||[]).concat(d),f.compiledImplicit=l(f,"implicit"),f.compiledExplicit=l(f,"explicit"),f.compiledTypeMap=u(f.compiledImplicit,f.compiledExplicit),f},ze=i,ze}var Je,En;function Xn(){if(En)return Je;En=1;const r=Y();return Je=new r("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}}),Je}var Xe,kn;function Zn(){if(kn)return Xe;kn=1;const r=Y();return Xe=new r("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}}),Xe}var Ze,On;function er(){if(On)return Ze;On=1;const r=Y();return Ze=new r("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}}),Ze}var en,Ln;function nr(){if(Ln)return en;Ln=1;const r=Jn();return en=new r({explicit:[Xn(),Zn(),er()]}),en}var nn,In;function rr(){if(In)return nn;In=1;const r=Y();function t(i){if(i===null)return!0;const c=i.length;return c===1&&i==="~"||c===4&&(i==="null"||i==="Null"||i==="NULL")}function l(){return null}function u(i){return i===null}return nn=new r("tag:yaml.org,2002:null",{kind:"scalar",resolve:t,construct:l,predicate:u,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),nn}var rn,Nn;function ir(){if(Nn)return rn;Nn=1;const r=Y();function t(i){if(i===null)return!1;const c=i.length;return c===4&&(i==="true"||i==="True"||i==="TRUE")||c===5&&(i==="false"||i==="False"||i==="FALSE")}function l(i){return i==="true"||i==="True"||i==="TRUE"}function u(i){return Object.prototype.toString.call(i)==="[object Boolean]"}return rn=new r("tag:yaml.org,2002:bool",{kind:"scalar",resolve:t,construct:l,predicate:u,represent:{lowercase:function(i){return i?"true":"false"},uppercase:function(i){return i?"TRUE":"FALSE"},camelcase:function(i){return i?"True":"False"}},defaultStyle:"lowercase"}),rn}var tn,Mn;function tr(){if(Mn)return tn;Mn=1;const r=ve(),t=Y();function l(f){return f>=48&&f<=57||f>=65&&f<=70||f>=97&&f<=102}function u(f){return f>=48&&f<=55}function i(f){return f>=48&&f<=57}function c(f){if(f===null)return!1;const m=f.length;let y=0,w=!1;if(!m)return!1;let I=f[y];if((I==="-"||I==="+")&&(I=f[++y]),I==="0"){if(y+1===m)return!0;if(I=f[++y],I==="b"){for(y++;y<m;y++){if(I=f[y],I!=="0"&&I!=="1")return!1;w=!0}return w&&isFinite(o(f))}if(I==="x"){for(y++;y<m;y++){if(!l(f.charCodeAt(y)))return!1;w=!0}return w&&isFinite(o(f))}if(I==="o"){for(y++;y<m;y++){if(!u(f.charCodeAt(y)))return!1;w=!0}return w&&isFinite(o(f))}}for(;y<m;y++){if(!i(f.charCodeAt(y)))return!1;w=!0}return w?isFinite(o(f)):!1}function o(f){let m=f,y=1,w=m[0];if((w==="-"||w==="+")&&(w==="-"&&(y=-1),m=m.slice(1),w=m[0]),m==="0")return 0;if(w==="0"){if(m[1]==="b")return y*parseInt(m.slice(2),2);if(m[1]==="x")return y*parseInt(m.slice(2),16);if(m[1]==="o")return y*parseInt(m.slice(2),8)}return y*parseInt(m,10)}function s(f){return o(f)}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&f%1===0&&!r.isNegativeZero(f)}return tn=new t("tag:yaml.org,2002:int",{kind:"scalar",resolve:c,construct:s,predicate:d,represent:{binary:function(f){return f>=0?"0b"+f.toString(2):"-0b"+f.toString(2).slice(1)},octal:function(f){return f>=0?"0o"+f.toString(8):"-0o"+f.toString(8).slice(1)},decimal:function(f){return f.toString(10)},hexadecimal:function(f){return f>=0?"0x"+f.toString(16).toUpperCase():"-0x"+f.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),tn}var on,Rn;function or(){if(Rn)return on;Rn=1;const r=ve(),t=Y(),l=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),u=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i(f){return f===null||!l.test(f)?!1:isFinite(parseFloat(f,10))?!0:u.test(f)}function c(f){let m=f.toLowerCase();const y=m[0]==="-"?-1:1;return"+-".indexOf(m[0])>=0&&(m=m.slice(1)),m===".inf"?y===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:m===".nan"?NaN:y*parseFloat(m,10)}const o=/^[-+]?[0-9]+e/;function s(f,m){if(isNaN(f))switch(m){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===f)switch(m){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===f)switch(m){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(r.isNegativeZero(f))return"-0.0";const y=f.toString(10);return o.test(y)?y.replace("e",".e"):y}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&(f%1!==0||r.isNegativeZero(f))}return on=new t("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:c,predicate:d,represent:s,defaultStyle:"lowercase"}),on}var ln,jn;function lr(){return jn||(jn=1,ln=nr().extend({implicit:[rr(),ir(),tr(),or()]})),ln}var cn,Fn;function cr(){return Fn||(Fn=1,cn=lr()),cn}var un,qn;function ur(){if(qn)return un;qn=1;const r=Y(),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),l=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function u(o){return o===null?!1:t.exec(o)!==null||l.exec(o)!==null}function i(o){let s=0,d=null,f=t.exec(o);if(f===null&&(f=l.exec(o)),f===null)throw new Error("Date resolve error");const m=+f[1],y=+f[2]-1,w=+f[3];if(!f[4])return new Date(Date.UTC(m,y,w));const I=+f[4],F=+f[5],M=+f[6];if(f[7]){for(s=f[7].slice(0,3);s.length<3;)s+="0";s=+s}if(f[9]){const K=+f[10],H=+(f[11]||0);d=(K*60+H)*6e4,f[9]==="-"&&(d=-d)}const $=new Date(Date.UTC(m,y,w,I,F,M,s));return d&&$.setTime($.getTime()-d),$}function c(o){return o.toISOString()}return un=new r("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:u,construct:i,instanceOf:Date,represent:c}),un}var sn,$n;function sr(){if($n)return sn;$n=1;const r=Y();function t(l){return l==="<<"||l===null}return sn=new r("tag:yaml.org,2002:merge",{kind:"scalar",resolve:t}),sn}var fn,Pn;function fr(){if(Pn)return fn;Pn=1;const r=Y(),t=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function l(o){if(o===null)return!1;let s=0;const d=o.length,f=t;for(let m=0;m<d;m++){const y=f.indexOf(o.charAt(m));if(!(y>64)){if(y<0)return!1;s+=6}}return s%8===0}function u(o){const s=o.replace(/[\r\n=]/g,""),d=s.length,f=t;let m=0;const y=[];for(let I=0;I<d;I++)I%4===0&&I&&(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)),m=m<<6|f.indexOf(s.charAt(I));const w=d%4*6;return w===0?(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)):w===18?(y.push(m>>10&255),y.push(m>>2&255)):w===12&&y.push(m>>4&255),new Uint8Array(y)}function i(o){let s="",d=0;const f=o.length,m=t;for(let w=0;w<f;w++)w%3===0&&w&&(s+=m[d>>18&63],s+=m[d>>12&63],s+=m[d>>6&63],s+=m[d&63]),d=(d<<8)+o[w];const y=f%3;return y===0?(s+=m[d>>18&63],s+=m[d>>12&63],s+=m[d>>6&63],s+=m[d&63]):y===2?(s+=m[d>>10&63],s+=m[d>>4&63],s+=m[d<<2&63],s+=m[64]):y===1&&(s+=m[d>>2&63],s+=m[d<<4&63],s+=m[64],s+=m[64]),s}function c(o){return Object.prototype.toString.call(o)==="[object Uint8Array]"}return fn=new r("tag:yaml.org,2002:binary",{kind:"scalar",resolve:l,construct:u,predicate:c,represent:i}),fn}var an,Dn;function ar(){if(Dn)return an;Dn=1;const r=Y(),t=Object.prototype.hasOwnProperty,l=Object.prototype.toString;function u(c){if(c===null)return!0;const o=[],s=c;for(let d=0,f=s.length;d<f;d+=1){const m=s[d];let y=!1;if(l.call(m)!=="[object Object]")return!1;let w;for(w in m)if(t.call(m,w))if(!y)y=!0;else return!1;if(!y)return!1;if(o.indexOf(w)===-1)o.push(w);else return!1}return!0}function i(c){return c!==null?c:[]}return an=new r("tag:yaml.org,2002:omap",{kind:"sequence",resolve:u,construct:i}),an}var pn,Yn;function pr(){if(Yn)return pn;Yn=1;const r=Y(),t=Object.prototype.toString;function l(i){if(i===null)return!0;const c=i,o=new Array(c.length);for(let s=0,d=c.length;s<d;s+=1){const f=c[s];if(t.call(f)!=="[object Object]")return!1;const m=Object.keys(f);if(m.length!==1)return!1;o[s]=[m[0],f[m[0]]]}return!0}function u(i){if(i===null)return[];const c=i,o=new Array(c.length);for(let s=0,d=c.length;s<d;s+=1){const f=c[s],m=Object.keys(f);o[s]=[m[0],f[m[0]]]}return o}return pn=new r("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:l,construct:u}),pn}var dn,Hn;function dr(){if(Hn)return dn;Hn=1;const r=Y(),t=Object.prototype.hasOwnProperty;function l(i){if(i===null)return!0;const c=i;for(const o in c)if(t.call(c,o)&&c[o]!==null)return!1;return!0}function u(i){return i!==null?i:{}}return dn=new r("tag:yaml.org,2002:set",{kind:"mapping",resolve:l,construct:u}),dn}var mn,Bn;function _n(){return Bn||(Bn=1,mn=cr().extend({implicit:[ur(),sr()],explicit:[fr(),ar(),pr(),dr()]})),mn}var Un;function ni(){if(Un)return Me;Un=1;const r=ve(),t=be(),l=ei(),u=_n(),i=Object.prototype.hasOwnProperty,c=1,o=2,s=3,d=4,f=1,m=2,y=3,w=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,I=/[\x85\u2028\u2029]/,F=/[,\[\]{}]/,M=/^(?:!|!!|![0-9A-Za-z-]+!)$/,$=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function K(e){return Object.prototype.toString.call(e)}function H(e){return e===10||e===13}function B(e){return e===9||e===32}function P(e){return e===9||e===32||e===10||e===13}function X(e){return e===44||e===91||e===93||e===123||e===125}function $e(e){if(e>=48&&e<=57)return e-48;const a=e|32;return a>=97&&a<=102?a-97+10:-1}function Pe(e){return e===120?2:e===117?4:e===85?8:0}function ye(e){return e>=48&&e<=57?e-48:-1}function fe(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function De(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function ae(e,a,g){a==="__proto__"?Object.defineProperty(e,a,{configurable:!0,enumerable:!0,writable:!0,value:g}):e[a]=g}const Ae=new Array(256),pe=new Array(256);for(let e=0;e<256;e++)Ae[e]=fe(e)?1:0,pe[e]=fe(e);function q(e,a){this.input=e,this.filename=a.filename||null,this.schema=a.schema||u,this.onWarning=a.onWarning||null,this.legacy=a.legacy||!1,this.json=a.json||!1,this.listener=a.listener||null,this.maxDepth=typeof a.maxDepth=="number"?a.maxDepth:100,this.maxTotalMergeKeys=typeof a.maxTotalMergeKeys=="number"?a.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function Te(e,a){const g={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return g.snippet=l(g),new t(a,g)}function k(e,a){throw Te(e,a)}function oe(e,a){e.onWarning&&e.onWarning.call(null,Te(e,a))}function G(e,a,g){const b=e.anchorMapTransactions;if(b.length!==0){const h=b[b.length-1];i.call(h,a)||(h[a]={existed:i.call(e.anchorMap,a),value:e.anchorMap[a]})}e.anchorMap[a]=g}function Ye(e){e.anchorMapTransactions.push(Object.create(null))}function ne(e){const a=e.anchorMapTransactions.pop(),g=e.anchorMapTransactions;if(g.length===0)return;const b=g[g.length-1],h=Object.keys(a);for(let S=0,n=h.length;S<n;S+=1){const p=h[S];i.call(b,p)||(b[p]=a[p])}}function He(e){const a=e.anchorMapTransactions.pop(),g=Object.keys(a);for(let b=g.length-1;b>=0;b-=1){const h=a[g[b]];h.existed?e.anchorMap[g[b]]=h.value:delete e.anchorMap[g[b]]}}function de(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,tag:e.tag,anchor:e.anchor,kind:e.kind,result:e.result}}function le(e,a){e.position=a.position,e.line=a.line,e.lineStart=a.lineStart,e.lineIndent=a.lineIndent,e.firstTabInLine=a.firstTabInLine,e.tag=a.tag,e.anchor=a.anchor,e.kind=a.kind,e.result=a.result}const xe={YAML:function(a,g,b){a.version!==null&&k(a,"duplication of %YAML directive"),b.length!==1&&k(a,"YAML directive accepts exactly one argument");const h=/^([0-9]+)\.([0-9]+)$/.exec(b[0]);h===null&&k(a,"ill-formed argument of the YAML directive");const S=parseInt(h[1],10),n=parseInt(h[2],10);S!==1&&k(a,"unacceptable YAML version of the document"),a.version=b[0],a.checkLineBreaks=n<2,n!==1&&n!==2&&oe(a,"unsupported YAML version of the document")},TAG:function(a,g,b){let h;b.length!==2&&k(a,"TAG directive accepts exactly two arguments");const S=b[0];h=b[1],M.test(S)||k(a,"ill-formed tag handle (first argument) of the TAG directive"),i.call(a.tagMap,S)&&k(a,'there is a previously declared suffix for "'+S+'" tag handle'),$.test(h)||k(a,"ill-formed tag prefix (second argument) of the TAG directive");try{h=decodeURIComponent(h)}catch{k(a,"tag prefix is malformed: "+h)}a.tagMap[S]=h}};function U(e,a,g,b){if(a<g){const h=e.input.slice(a,g);if(b)for(let S=0,n=h.length;S<n;S+=1){const p=h.charCodeAt(S);p===9||p>=32&&p<=1114111||k(e,"expected valid JSON character")}else w.test(h)&&k(e,"the stream contains non-printable characters");e.result+=h}}function Z(e,a,g,b){r.isObject(g)||k(e,"cannot merge mappings; the provided source object is unacceptable");const h=Object.keys(g);for(let S=0,n=h.length;S<n;S+=1){const p=h[S];e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")"),i.call(a,p)||(ae(a,p,g[p]),b[p]=!0)}}function V(e,a,g,b,h,S,n,p,T){if(Array.isArray(h)){h=Array.prototype.slice.call(h);for(let _=0,v=h.length;_<v;_+=1)Array.isArray(h[_])&&k(e,"nested arrays are not supported inside keys"),typeof h=="object"&&K(h[_])==="[object Object]"&&(h[_]="[object Object]")}if(typeof h=="object"&&K(h)==="[object Object]"&&(h="[object Object]"),h=String(h),a===null&&(a={}),b==="tag:yaml.org,2002:merge")if(Array.isArray(S))for(let _=0,v=S.length;_<v;_+=1)Z(e,a,S[_],g);else Z(e,a,S,g);else!e.json&&!i.call(g,h)&&i.call(a,h)&&(e.line=n||e.line,e.lineStart=p||e.lineStart,e.position=T||e.position,k(e,"duplicated mapping key")),ae(a,h,S),delete g[h];return a}function ce(e){const a=e.input.charCodeAt(e.position);a===10?e.position++:a===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):k(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function j(e,a,g){let b=0,h=e.input.charCodeAt(e.position);for(;h!==0;){for(;B(h);)h===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),h=e.input.charCodeAt(++e.position);if(a&&h===35)do h=e.input.charCodeAt(++e.position);while(h!==10&&h!==13&&h!==0);if(H(h))for(ce(e),h=e.input.charCodeAt(e.position),b++,e.lineIndent=0;h===32;)e.lineIndent++,h=e.input.charCodeAt(++e.position);else break}return g!==-1&&b!==0&&e.lineIndent<g&&oe(e,"deficient indentation"),b}function ue(e){let a=e.position,g=e.input.charCodeAt(a);return!!((g===45||g===46)&&g===e.input.charCodeAt(a+1)&&g===e.input.charCodeAt(a+2)&&(a+=3,g=e.input.charCodeAt(a),g===0||P(g)))}function W(e,a){a===1?e.result+=" ":a>1&&(e.result+=r.repeat(`
`,a-1))}function Se(e,a,g){let b,h,S,n,p,T;const _=e.kind,v=e.result;let x=e.input.charCodeAt(e.position);if(P(x)||X(x)||x===35||x===38||x===42||x===33||x===124||x===62||x===39||x===34||x===37||x===64||x===96)return!1;if(x===63||x===45){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))return!1}for(e.kind="scalar",e.result="",b=h=e.position,S=!1;x!==0;){if(x===58){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))break}else if(x===35){const A=e.input.charCodeAt(e.position-1);if(P(A))break}else{if(e.position===e.lineStart&&ue(e)||g&&X(x))break;if(H(x))if(n=e.line,p=e.lineStart,T=e.lineIndent,j(e,!1,-1),e.lineIndent>=a){S=!0,x=e.input.charCodeAt(e.position);continue}else{e.position=h,e.line=n,e.lineStart=p,e.lineIndent=T;break}}S&&(U(e,b,h,!1),W(e,e.line-n),b=h=e.position,S=!1),B(x)||(h=e.position+1),x=e.input.charCodeAt(++e.position)}return U(e,b,h,!1),e.result?!0:(e.kind=_,e.result=v,!1)}function we(e,a){let g,b,h=e.input.charCodeAt(e.position);if(h!==39)return!1;for(e.kind="scalar",e.result="",e.position++,g=b=e.position;(h=e.input.charCodeAt(e.position))!==0;)if(h===39)if(U(e,g,e.position,!0),h=e.input.charCodeAt(++e.position),h===39)g=e.position,e.position++,b=e.position;else return!0;else H(h)?(U(e,g,b,!0),W(e,j(e,!1,a)),g=b=e.position):e.position===e.lineStart&&ue(e)?k(e,"unexpected end of the document within a single quoted scalar"):(e.position++,B(h)||(b=e.position));k(e,"unexpected end of the stream within a single quoted scalar")}function me(e,a){let g,b,h,S=e.input.charCodeAt(e.position);if(S!==34)return!1;for(e.kind="scalar",e.result="",e.position++,g=b=e.position;(S=e.input.charCodeAt(e.position))!==0;){if(S===34)return U(e,g,e.position,!0),e.position++,!0;if(S===92){if(U(e,g,e.position,!0),S=e.input.charCodeAt(++e.position),H(S))j(e,!1,a);else if(S<256&&Ae[S])e.result+=pe[S],e.position++;else if((h=Pe(S))>0){let n=h,p=0;for(;n>0;n--)S=e.input.charCodeAt(++e.position),(h=$e(S))>=0?p=(p<<4)+h:k(e,"expected hexadecimal character");e.result+=De(p),e.position++}else k(e,"unknown escape sequence");g=b=e.position}else H(S)?(U(e,g,b,!0),W(e,j(e,!1,a)),g=b=e.position):e.position===e.lineStart&&ue(e)?k(e,"unexpected end of the document within a double quoted scalar"):(e.position++,B(S)||(b=e.position))}k(e,"unexpected end of the stream within a double quoted scalar")}function Ce(e,a){let g=!0,b,h,S;const n=e.tag;let p;const T=e.anchor;let _,v,x,A;const E=Object.create(null);let C,O,L,N=e.input.charCodeAt(e.position);if(N===91)_=93,A=!1,p=[];else if(N===123)_=125,A=!0,p={};else return!1;for(e.anchor!==null&&G(e,e.anchor,p),N=e.input.charCodeAt(++e.position);N!==0;){if(j(e,!0,a),N=e.input.charCodeAt(e.position),N===_)return e.position++,e.tag=n,e.anchor=T,e.kind=A?"mapping":"sequence",e.result=p,!0;if(g?N===44&&k(e,"expected the node content, but found ','"):k(e,"missed comma between flow collection entries"),O=C=L=null,v=x=!1,N===63){const R=e.input.charCodeAt(e.position+1);P(R)&&(v=x=!0,e.position++,j(e,!0,a))}b=e.line,h=e.lineStart,S=e.position,z(e,a,c,!1,!0),O=e.tag,C=e.result,j(e,!0,a),N=e.input.charCodeAt(e.position),(x||e.line===b)&&N===58&&(v=!0,N=e.input.charCodeAt(++e.position),j(e,!0,a),z(e,a,c,!1,!0),L=e.result),A?V(e,p,E,O,C,L,b,h,S):v?p.push(V(e,null,E,O,C,L,b,h,S)):p.push(C),j(e,!0,a),N=e.input.charCodeAt(e.position),N===44?(g=!0,N=e.input.charCodeAt(++e.position)):g=!1}k(e,"unexpected end of the stream within a flow collection")}function Ee(e,a){let g,b=f,h=!1,S=!1,n=a,p=0,T=!1,_,v=e.input.charCodeAt(e.position);if(v===124)g=!1;else if(v===62)g=!0;else return!1;for(e.kind="scalar",e.result="";v!==0;)if(v=e.input.charCodeAt(++e.position),v===43||v===45)f===b?b=v===43?y:m:k(e,"repeat of a chomping mode identifier");else if((_=ye(v))>=0)_===0?k(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):S?k(e,"repeat of an indentation width identifier"):(n=a+_-1,S=!0);else break;if(B(v)){do v=e.input.charCodeAt(++e.position);while(B(v));if(v===35)do v=e.input.charCodeAt(++e.position);while(!H(v)&&v!==0)}for(;v!==0;){for(ce(e),e.lineIndent=0,v=e.input.charCodeAt(e.position);(!S||e.lineIndent<n)&&v===32;)e.lineIndent++,v=e.input.charCodeAt(++e.position);if(!S&&e.lineIndent>n&&(n=e.lineIndent),H(v)){p++;continue}if(!S&&n===0&&k(e,"missing indentation for block scalar"),e.lineIndent<n){b===y?e.result+=r.repeat(`
`,h?1+p:p):b===f&&h&&(e.result+=`
`);break}g?B(v)?(T=!0,e.result+=r.repeat(`
`,h?1+p:p)):T?(T=!1,e.result+=r.repeat(`
`,p+1)):p===0?h&&(e.result+=" "):e.result+=r.repeat(`
`,p):e.result+=r.repeat(`
`,h?1+p:p),h=!0,S=!0,p=0;const x=e.position;for(;!H(v)&&v!==0;)v=e.input.charCodeAt(++e.position);U(e,x,e.position,!1)}return!0}function Q(e,a){const g=e.tag,b=e.anchor,h=[];let S=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&G(e,e.anchor,h);let n=e.input.charCodeAt(e.position);for(;n!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation")),n===45);){const p=e.input.charCodeAt(e.position+1);if(!P(p))break;if(S=!0,e.position++,j(e,!0,-1)&&e.lineIndent<=a){h.push(null),n=e.input.charCodeAt(e.position);continue}const T=e.line;if(z(e,a,s,!1,!0),h.push(e.result),j(e,!0,-1),n=e.input.charCodeAt(e.position),(e.line===T||e.lineIndent>a)&&n!==0)k(e,"bad indentation of a sequence entry");else if(e.lineIndent<a)break}return S?(e.tag=g,e.anchor=b,e.kind="sequence",e.result=h,!0):!1}function ke(e,a,g){let b,h,S,n;const p=e.tag,T=e.anchor,_={},v=Object.create(null);let x=null,A=null,E=null,C=!1,O=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&G(e,e.anchor,_);let L=e.input.charCodeAt(e.position);for(;L!==0;){!C&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation"));const N=e.input.charCodeAt(e.position+1),R=e.line;if((L===63||L===58)&&P(N))L===63?(C&&(V(e,_,v,x,A,null,h,S,n),x=A=E=null),O=!0,C=!0,b=!0):C?(C=!1,b=!0):k(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,L=N;else{if(h=e.line,S=e.lineStart,n=e.position,!z(e,g,o,!1,!0))break;if(e.line===R){for(L=e.input.charCodeAt(e.position);B(L);)L=e.input.charCodeAt(++e.position);if(L===58)L=e.input.charCodeAt(++e.position),P(L)||k(e,"a whitespace character is expected after the key-value separator within a block mapping"),C&&(V(e,_,v,x,A,null,h,S,n),x=A=E=null),O=!0,C=!1,b=!1,x=e.tag,A=e.result;else if(O)k(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=p,e.anchor=T,!0}else if(O)k(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=p,e.anchor=T,!0}if((e.line===R||e.lineIndent>a)&&(C&&(h=e.line,S=e.lineStart,n=e.position),z(e,a,d,!0,b)&&(C?A=e.result:E=e.result),C||(V(e,_,v,x,A,E,h,S,n),x=A=E=null),j(e,!0,-1),L=e.input.charCodeAt(e.position)),(e.line===R||e.lineIndent>a)&&L!==0)k(e,"bad indentation of a mapping entry");else if(e.lineIndent<a)break}return C&&V(e,_,v,x,A,null,h,S,n),O&&(e.tag=p,e.anchor=T,e.kind="mapping",e.result=_),O}function Be(e){let a=!1,g=!1,b,h,S=e.input.charCodeAt(e.position);if(S!==33)return!1;e.tag!==null&&k(e,"duplication of a tag property"),S=e.input.charCodeAt(++e.position),S===60?(a=!0,S=e.input.charCodeAt(++e.position)):S===33?(g=!0,b="!!",S=e.input.charCodeAt(++e.position)):b="!";let n=e.position;if(a){do S=e.input.charCodeAt(++e.position);while(S!==0&&S!==62);e.position<e.length?(h=e.input.slice(n,e.position),S=e.input.charCodeAt(++e.position)):k(e,"unexpected end of the stream within a verbatim tag")}else{for(;S!==0&&!P(S);)S===33&&(g?k(e,"tag suffix cannot contain exclamation marks"):(b=e.input.slice(n-1,e.position+1),M.test(b)||k(e,"named tag handle cannot contain such characters"),g=!0,n=e.position+1)),S=e.input.charCodeAt(++e.position);h=e.input.slice(n,e.position),F.test(h)&&k(e,"tag suffix cannot contain flow indicator characters")}h&&!$.test(h)&&k(e,"tag name cannot contain such characters: "+h);try{h=decodeURIComponent(h)}catch{k(e,"tag name is malformed: "+h)}return a?e.tag=h:i.call(e.tagMap,b)?e.tag=e.tagMap[b]+h:b==="!"?e.tag="!"+h:b==="!!"?e.tag="tag:yaml.org,2002:"+h:k(e,'undeclared tag handle "'+b+'"'),!0}function Oe(e){let a=e.input.charCodeAt(e.position);if(a!==38)return!1;e.anchor!==null&&k(e,"duplication of an anchor property"),a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);return e.position===g&&k(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(g,e.position),!0}function Le(e){let a=e.input.charCodeAt(e.position);if(a!==42)return!1;a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);e.position===g&&k(e,"name of an alias node must contain at least one character");const b=e.input.slice(g,e.position);return i.call(e.anchorMap,b)||k(e,'unidentified alias "'+b+'"'),e.result=e.anchorMap[b],j(e,!0,-1),!0}function Ue(e,a,g,b){const h=de(e);return Ye(e),le(e,a),e.tag=null,e.anchor=null,e.kind=null,e.result=null,ke(e,g,b)&&e.kind==="mapping"?(ne(e),!0):(He(e),le(e,h),!1)}function z(e,a,g,b,h){let S,n,p=1,T=!1,_=!1,v=null,x,A,E;e.depth>=e.maxDepth&&k(e,"nesting exceeded maxDepth ("+e.maxDepth+")"),e.depth+=1,e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null;const C=S=n=d===g||s===g;if(b&&j(e,!0,-1)&&(T=!0,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)),p===1)for(;;){const O=e.input.charCodeAt(e.position),L=de(e);if(T&&(O===33&&e.tag!==null||O===38&&e.anchor!==null)||!Be(e)&&!Oe(e))break;v===null&&(v=L),j(e,!0,-1)?(T=!0,n=C,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)):n=!1}if(n&&(n=T||h),p===1||d===g)if(c===g||o===g?A=a:A=a+1,E=e.position-e.lineStart,p===1)if(n&&(Q(e,E)||ke(e,E,A))||Ce(e,A))_=!0;else{const O=e.input.charCodeAt(e.position);v!==null&&C&&!n&&O!==124&&O!==62&&Ue(e,v,v.position-v.lineStart,A)||S&&Ee(e,A)||we(e,A)||me(e,A)?_=!0:Le(e)?(_=!0,(e.tag!==null||e.anchor!==null)&&k(e,"alias node should not have any properties")):Se(e,A,c===g)&&(_=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&G(e,e.anchor,e.result)}else p===0&&(_=n&&Q(e,E));if(e.tag===null)e.anchor!==null&&G(e,e.anchor,e.result);else if(e.tag==="?"){e.result!==null&&e.kind!=="scalar"&&k(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"');for(let O=0,L=e.implicitTypes.length;O<L;O+=1)if(x=e.implicitTypes[O],x.resolve(e.result)){e.result=x.construct(e.result),e.tag=x.tag,e.anchor!==null&&G(e,e.anchor,e.result);break}}else if(e.tag!=="!"){if(i.call(e.typeMap[e.kind||"fallback"],e.tag))x=e.typeMap[e.kind||"fallback"][e.tag];else{x=null;const O=e.typeMap.multi[e.kind||"fallback"];for(let L=0,N=O.length;L<N;L+=1)if(e.tag.slice(0,O[L].tag.length)===O[L].tag){x=O[L];break}}x||k(e,"unknown tag !<"+e.tag+">"),e.result!==null&&x.kind!==e.kind&&k(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+x.kind+'", not "'+e.kind+'"'),x.resolve(e.result,e.tag)?(e.result=x.construct(e.result,e.tag),e.anchor!==null&&G(e,e.anchor,e.result)):k(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.depth-=1,e.tag!==null||e.anchor!==null||_}function Ke(e){const a=e.position;let g=!1,b;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(b=e.input.charCodeAt(e.position))!==0&&(j(e,!0,-1),b=e.input.charCodeAt(e.position),!(e.lineIndent>0||b!==37));){g=!0,b=e.input.charCodeAt(++e.position);let h=e.position;for(;b!==0&&!P(b);)b=e.input.charCodeAt(++e.position);const S=e.input.slice(h,e.position),n=[];for(S.length<1&&k(e,"directive name must not be less than one character in length");b!==0;){for(;B(b);)b=e.input.charCodeAt(++e.position);if(b===35){do b=e.input.charCodeAt(++e.position);while(b!==0&&!H(b));break}if(H(b))break;for(h=e.position;b!==0&&!P(b);)b=e.input.charCodeAt(++e.position);n.push(e.input.slice(h,e.position))}b!==0&&ce(e),i.call(xe,S)?xe[S](e,S,n):oe(e,'unknown document directive "'+S+'"')}if(j(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,j(e,!0,-1)):g&&k(e,"directives end mark is expected"),z(e,e.lineIndent-1,d,!1,!0),j(e,!0,-1),e.checkLineBreaks&&I.test(e.input.slice(a,e.position))&&oe(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&ue(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,j(e,!0,-1));return}e.position<e.length-1&&k(e,"end of the stream or a document separator is expected")}function Ie(e,a){e=String(e),a=a||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));const g=new q(e,a),b=e.indexOf("\0");for(b!==-1&&(g.position=b,k(g,"null byte is not allowed in input")),g.input+="\0";g.input.charCodeAt(g.position)===32;)g.lineIndent+=1,g.position+=1;for(;g.position<g.length-1;)Ke(g);return g.documents}function Ne(e,a,g){a!==null&&typeof a=="object"&&typeof g>"u"&&(g=a,a=null);const b=Ie(e,g);if(typeof a!="function")return b;for(let h=0,S=b.length;h<S;h+=1)a(b[h])}function Ge(e,a){const g=Ie(e,a);if(g.length!==0){if(g.length===1)return g[0];throw new t("expected a single document in the stream, but found more")}}return Me.loadAll=Ne,Me.load=Ge,Me}var hn={},Kn;function ri(){if(Kn)return hn;Kn=1;const r=ve(),t=be(),l=_n(),u=Object.prototype.toString,i=Object.prototype.hasOwnProperty,c=65279,o=9,s=10,d=13,f=32,m=33,y=34,w=35,I=37,F=38,M=39,$=42,K=44,H=45,B=58,P=61,X=62,$e=63,Pe=64,ye=91,fe=93,De=96,ae=123,Ae=124,pe=125,q={};q[0]="\\0",q[7]="\\a",q[8]="\\b",q[9]="\\t",q[10]="\\n",q[11]="\\v",q[12]="\\f",q[13]="\\r",q[27]="\\e",q[34]='\\"',q[92]="\\\\",q[133]="\\N",q[160]="\\_",q[8232]="\\L",q[8233]="\\P";const Te=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],k=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function oe(n,p){if(p===null)return{};const T={},_=Object.keys(p);for(let v=0,x=_.length;v<x;v+=1){let A=_[v],E=String(p[A]);A.slice(0,2)==="!!"&&(A="tag:yaml.org,2002:"+A.slice(2));const C=n.compiledTypeMap.fallback[A];C&&i.call(C.styleAliases,E)&&(E=C.styleAliases[E]),T[A]=E}return T}function G(n){let p,T;const _=n.toString(16).toUpperCase();if(n<=255)p="x",T=2;else if(n<=65535)p="u",T=4;else if(n<=4294967295)p="U",T=8;else throw new t("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+p+r.repeat("0",T-_.length)+_}const Ye=1,ne=2;function He(n){this.schema=n.schema||l,this.indent=Math.max(1,n.indent||2),this.noArrayIndent=n.noArrayIndent||!1,this.skipInvalid=n.skipInvalid||!1,this.flowLevel=r.isNothing(n.flowLevel)?-1:n.flowLevel,this.styleMap=oe(this.schema,n.styles||null),this.sortKeys=n.sortKeys||!1,this.lineWidth=n.lineWidth||80,this.noRefs=n.noRefs||!1,this.noCompatMode=n.noCompatMode||!1,this.condenseFlow=n.condenseFlow||!1,this.quotingType=n.quotingType==='"'?ne:Ye,this.forceQuotes=n.forceQuotes||!1,this.replacer=typeof n.replacer=="function"?n.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function de(n,p){const T=r.repeat(" ",p);let _=0,v="";const x=n.length;for(;_<x;){let A;const E=n.indexOf(`
`,_);E===-1?(A=n.slice(_),_=x):(A=n.slice(_,E+1),_=E+1),A.length&&A!==`
`&&(v+=T),v+=A}return v}function le(n,p){return`
`+r.repeat(" ",n.indent*p)}function xe(n,p){for(let T=0,_=n.implicitTypes.length;T<_;T+=1)if(n.implicitTypes[T].resolve(p))return!0;return!1}function U(n){return n===f||n===o}function Z(n){return n>=32&&n<=126||n>=161&&n<=55295&&n!==8232&&n!==8233||n>=57344&&n<=65533&&n!==c||n>=65536&&n<=1114111}function V(n){return Z(n)&&n!==c&&n!==d&&n!==s}function ce(n,p,T){const _=V(n),v=_&&!U(n);return(T?_:_&&n!==K&&n!==ye&&n!==fe&&n!==ae&&n!==pe)&&n!==w&&!(p===B&&!v)||V(p)&&!U(p)&&n===w||p===B&&v}function j(n){return Z(n)&&n!==c&&!U(n)&&n!==H&&n!==$e&&n!==B&&n!==K&&n!==ye&&n!==fe&&n!==ae&&n!==pe&&n!==w&&n!==F&&n!==$&&n!==m&&n!==Ae&&n!==P&&n!==X&&n!==M&&n!==y&&n!==I&&n!==Pe&&n!==De}function ue(n){return!U(n)&&n!==B}function W(n,p){const T=n.charCodeAt(p);let _;return T>=55296&&T<=56319&&p+1<n.length&&(_=n.charCodeAt(p+1),_>=56320&&_<=57343)?(T-55296)*1024+_-56320+65536:T}function Se(n){return/^\n* /.test(n)}const we=1,me=2,Ce=3,Ee=4,Q=5;function ke(n,p,T,_,v,x,A,E){let C,O=0,L=null,N=!1,R=!1;const yn=_!==-1;let he=-1,ge=j(W(n,0))&&ue(W(n,n.length-1));if(p||A)for(C=0;C<n.length;O>=65536?C+=2:C++){if(O=W(n,C),!Z(O))return Q;ge=ge&&ce(O,L,E),L=O}else{for(C=0;C<n.length;O>=65536?C+=2:C++){if(O=W(n,C),O===s)N=!0,yn&&(R=R||C-he-1>_&&n[he+1]!==" ",he=C);else if(!Z(O))return Q;ge=ge&&ce(O,L,E),L=O}R=R||yn&&C-he-1>_&&n[he+1]!==" "}return!N&&!R?ge&&!A&&!v(n)?we:x===ne?Q:me:T>9&&Se(n)?Q:A?x===ne?Q:me:R?Ee:Ce}function Be(n,p,T,_,v){n.dump=(function(){if(p.length===0)return n.quotingType===ne?'""':"''";if(!n.noCompatMode&&(Te.indexOf(p)!==-1||k.test(p)))return n.quotingType===ne?'"'+p+'"':"'"+p+"'";const x=n.indent*Math.max(1,T),A=n.lineWidth===-1?-1:Math.max(Math.min(n.lineWidth,40),n.lineWidth-x),E=_||n.flowLevel>-1&&T>=n.flowLevel;function C(O){return xe(n,O)}switch(ke(p,E,n.indent,A,C,n.quotingType,n.forceQuotes&&!_,v)){case we:return p;case me:return"'"+p.replace(/'/g,"''")+"'";case Ce:return"|"+Oe(p,n.indent)+Le(de(p,x));case Ee:return">"+Oe(p,n.indent)+Le(de(Ue(p,A),x));case Q:return'"'+Ke(p)+'"';default:throw new t("impossible error: invalid scalar style")}})()}function Oe(n,p){const T=Se(n)?String(p):"",_=n[n.length-1]===`
`,x=_&&(n[n.length-2]===`
`||n===`
`)?"+":_?"":"-";return T+x+`
`}function Le(n){return n[n.length-1]===`
`?n.slice(0,-1):n}function Ue(n,p){const T=/(\n+)([^\n]*)/g;let _=(function(){let E=n.indexOf(`
`);return E=E!==-1?E:n.length,T.lastIndex=E,z(n.slice(0,E),p)})(),v=n[0]===`
`||n[0]===" ",x,A;for(;A=T.exec(n);){const E=A[1],C=A[2];x=C[0]===" ",_+=E+(!v&&!x&&C!==""?`
`:"")+z(C,p),v=x}return _}function z(n,p){if(n===""||n[0]===" ")return n;const T=/ [^ ]/g;let _,v=0,x,A=0,E=0,C="";for(;_=T.exec(n);)E=_.index,E-v>p&&(x=A>v?A:E,C+=`
`+n.slice(v,x),v=x+1),A=E;return C+=`
`,n.length-v>p&&A>v?C+=n.slice(v,A)+`
`+n.slice(A+1):C+=n.slice(v),C.slice(1)}function Ke(n){let p="",T=0;for(let _=0;_<n.length;T>=65536?_+=2:_++){T=W(n,_);const v=q[T];!v&&Z(T)?(p+=n[_],T>=65536&&(p+=n[_+1])):p+=v||G(T)}return p}function Ie(n,p,T){let _="";const v=n.tag;for(let x=0,A=T.length;x<A;x+=1){let E=T[x];n.replacer&&(E=n.replacer.call(T,String(x),E)),(g(n,p,E,!1,!1)||typeof E>"u"&&g(n,p,null,!1,!1))&&(_!==""&&(_+=","+(n.condenseFlow?"":" ")),_+=n.dump)}n.tag=v,n.dump="["+_+"]"}function Ne(n,p,T,_){let v="";const x=n.tag;for(let A=0,E=T.length;A<E;A+=1){let C=T[A];n.replacer&&(C=n.replacer.call(T,String(A),C)),(g(n,p+1,C,!0,!0,!1,!0)||typeof C>"u"&&g(n,p+1,null,!0,!0,!1,!0))&&((!_||v!=="")&&(v+=le(n,p)),n.dump&&s===n.dump.charCodeAt(0)?v+="-":v+="- ",v+=n.dump)}n.tag=x,n.dump=v||"[]"}function Ge(n,p,T){let _="";const v=n.tag,x=Object.keys(T);for(let A=0,E=x.length;A<E;A+=1){let C="";_!==""&&(C+=", "),n.condenseFlow&&(C+='"');const O=x[A];let L=T[O];n.replacer&&(L=n.replacer.call(T,O,L)),g(n,p,O,!1,!1)&&(n.dump.length>1024&&(C+="? "),C+=n.dump+(n.condenseFlow?'"':"")+":"+(n.condenseFlow?"":" "),g(n,p,L,!1,!1)&&(C+=n.dump,_+=C))}n.tag=v,n.dump="{"+_+"}"}function e(n,p,T,_){let v="";const x=n.tag,A=Object.keys(T);if(n.sortKeys===!0)A.sort();else if(typeof n.sortKeys=="function")A.sort(n.sortKeys);else if(n.sortKeys)throw new t("sortKeys must be a boolean or a function");for(let E=0,C=A.length;E<C;E+=1){let O="";(!_||v!=="")&&(O+=le(n,p));const L=A[E];let N=T[L];if(n.replacer&&(N=n.replacer.call(T,L,N)),!g(n,p+1,L,!0,!0,!0))continue;const R=n.tag!==null&&n.tag!=="?"||n.dump&&n.dump.length>1024;R&&(n.dump&&s===n.dump.charCodeAt(0)?O+="?":O+="? "),O+=n.dump,R&&(O+=le(n,p)),g(n,p+1,N,!0,R)&&(n.dump&&s===n.dump.charCodeAt(0)?O+=":":O+=": ",O+=n.dump,v+=O)}n.tag=x,n.dump=v||"{}"}function a(n,p,T){const _=T?n.explicitTypes:n.implicitTypes;for(let v=0,x=_.length;v<x;v+=1){const A=_[v];if((A.instanceOf||A.predicate)&&(!A.instanceOf||typeof p=="object"&&p instanceof A.instanceOf)&&(!A.predicate||A.predicate(p))){if(T?A.multi&&A.representName?n.tag=A.representName(p):n.tag=A.tag:n.tag="?",A.represent){const E=n.styleMap[A.tag]||A.defaultStyle;let C;if(u.call(A.represent)==="[object Function]")C=A.represent(p,E);else if(i.call(A.represent,E))C=A.represent[E](p,E);else throw new t("!<"+A.tag+'> tag resolver accepts not "'+E+'" style');n.dump=C}return!0}}return!1}function g(n,p,T,_,v,x,A){n.tag=null,n.dump=T,a(n,T,!1)||a(n,T,!0);const E=u.call(n.dump),C=_;_&&(_=n.flowLevel<0||n.flowLevel>p);const O=E==="[object Object]"||E==="[object Array]";let L,N;if(O&&(L=n.duplicates.indexOf(T),N=L!==-1),(n.tag!==null&&n.tag!=="?"||N||n.indent!==2&&p>0)&&(v=!1),N&&n.usedDuplicates[L])n.dump="*ref_"+L;else{if(O&&N&&!n.usedDuplicates[L]&&(n.usedDuplicates[L]=!0),E==="[object Object]")_&&Object.keys(n.dump).length!==0?(e(n,p,n.dump,v),N&&(n.dump="&ref_"+L+n.dump)):(Ge(n,p,n.dump),N&&(n.dump="&ref_"+L+" "+n.dump));else if(E==="[object Array]")_&&n.dump.length!==0?(n.noArrayIndent&&!A&&p>0?Ne(n,p-1,n.dump,v):Ne(n,p,n.dump,v),N&&(n.dump="&ref_"+L+n.dump)):(Ie(n,p,n.dump),N&&(n.dump="&ref_"+L+" "+n.dump));else if(E==="[object String]")n.tag!=="?"&&Be(n,n.dump,p,x,C);else{if(E==="[object Undefined]")return!1;if(n.skipInvalid)return!1;throw new t("unacceptable kind of an object to dump "+E)}if(n.tag!==null&&n.tag!=="?"){let R=encodeURI(n.tag[0]==="!"?n.tag.slice(1):n.tag).replace(/!/g,"%21");n.tag[0]==="!"?R="!"+R:R.slice(0,18)==="tag:yaml.org,2002:"?R="!!"+R.slice(18):R="!<"+R+">",n.dump=R+" "+n.dump}}return!0}function b(n,p){const T=[],_=[];h(n,T,_);const v=_.length;for(let x=0;x<v;x+=1)p.duplicates.push(T[_[x]]);p.usedDuplicates=new Array(v)}function h(n,p,T){if(n!==null&&typeof n=="object"){const _=p.indexOf(n);if(_!==-1)T.indexOf(_)===-1&&T.push(_);else if(p.push(n),Array.isArray(n))for(let v=0,x=n.length;v<x;v+=1)h(n[v],p,T);else{const v=Object.keys(n);for(let x=0,A=v.length;x<A;x+=1)h(n[v[x]],p,T)}}}function S(n,p){p=p||{};const T=new He(p);T.noRefs||b(n,T);let _=n;return T.replacer&&(_=T.replacer.call({"":_},"",_)),g(T,0,_,!0,!0)?T.dump+`
`:""}return hn.dump=S,hn}var Gn;function ii(){if(Gn)return D;Gn=1;const r=ni(),t=ri();function l(u,i){return function(){throw new Error("Function yaml."+u+" is removed in js-yaml 4. Use yaml."+i+" instead, which is now safe by default.")}}return D.Type=Y(),D.Schema=Jn(),D.FAILSAFE_SCHEMA=nr(),D.JSON_SCHEMA=lr(),D.CORE_SCHEMA=cr(),D.DEFAULT_SCHEMA=_n(),D.load=r.load,D.loadAll=r.loadAll,D.dump=t.dump,D.YAMLException=be(),D.types={binary:fr(),float:or(),map:er(),null:rr(),pairs:pr(),set:dr(),timestamp:ur(),bool:ir(),int:tr(),merge:sr(),omap:ar(),seq:Zn(),str:Xn()},D.safeLoad=l("safeLoad","load"),D.safeLoadAll=l("safeLoadAll","loadAll"),D.safeDump=l("safeDump","dump"),D}var ti=ii();const qe=Zr(ti),{Type:tt,Schema:ot,FAILSAFE_SCHEMA:lt,JSON_SCHEMA:ct,CORE_SCHEMA:ut,DEFAULT_SCHEMA:st,load:ft,loadAll:at,dump:pt,YAMLException:dt,types:mt,safeLoad:ht,safeLoadAll:gt,safeDump:_t}=qe,oi="netlab-internal",_e=`${oi}:_linkname`;function Vn(r){return r!==null&&typeof r=="object"&&!Array.isArray(r)}function J(r,t){const l=new Set(Array.isArray(r._removed_attr)?r._removed_attr:[]),u={...r};for(const[i,c]of Object.entries(t)){if(i==="_removed_attr"){const s=Array.isArray(c)?c:[];u._removed_attr=[...l,...s.filter(d=>!l.has(d))];continue}if(l.has(i))continue;const o=u[i];Vn(o)&&Vn(c)?u[i]=J(o,c):u[i]=li(c)}return u}function li(r){return structuredClone(r)}class ci{constructor(){An(this,"items",[])}error(t){this.items.push({...t,severity:"error"})}warning(t){this.items.push({...t,severity:"warning"})}hasErrors(){return this.items.some(t=>t.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function ui(){return{device:"frr",provider:"clab",addressing:{loopback:{ipv4:"10.0.0.0/24"},router_id:{ipv4:"10.0.0.0/24",prefix:32},lan:{ipv4:"172.16.0.0/16"},p2p:{ipv4:"10.1.0.0/16"},mgmt:{ipv4:"192.168.121.0/24",start:100,mac:"CA-FE-00-00-00-00"},vrf_loopback:{ipv4:"10.2.0.0/24",prefix:32},l2only:{}},ospf:{area:"0.0.0.0"},bgp:{},isis:{type:"level-2"}}}function si(r){const t=qe.load(r);if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Topology must be a YAML/JSON object");return t}function fi(r,t={}){const l=si(r);return mr(l,t)}function mr(r,t={}){const l=J(ui(),t.defaults??{}),u=r.defaults??{};r.defaults=J(l,u),r.provider||(r.provider="clab"),r.name||(r.name=t.name??"topology");const i=r.defaults.addressing??{};return r.addressing=J(i,r.addressing??{}),r}const ai={none:`---
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
`,frr:`---
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
`,bird:`---
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
`},pi=new Set(["none","linux","frr","bird"]);let gn;function hr(){if(gn)return gn;const r={};for(const t of pi){const l=ai[t];if(!l)continue;const u=qe.load(l);r[t]={...u,name:t}}r.bird&&r.linux&&(r.bird=J(r.linux,{...r.bird,daemon:!0,parent:"linux"}));for(const t of Object.values(r)){if(t.clab&&typeof t.clab=="object"){const l=t.clab;l.features&&(t.features=J(t.features??{},l.features))}delete t.libvirt,delete t.virtualbox,delete t.external}return gn=r,r}function vn(r){return hr()[r]??{name:r,interface_name:"eth{ifindex}",role:"router"}}function di(r,t){let l;if(r&&typeof r=="object"&&!Array.isArray(r))l={...r};else{l={};for(const u of r??[])if(typeof u=="string")l[u]={name:u};else if(u&&typeof u=="object"&&!Array.isArray(u)){const i=u;if(!i.name){t==null||t.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(u)}`});continue}l[i.name]=i}}for(const u of Object.keys(l)){let i=l[u];i==null?i={name:u}:typeof i!="object"||Array.isArray(i)?(t==null||t.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${u} must be a dictionary`}),i={name:u,extra:i}):i={...i,name:u},Array.isArray(i.interfaces)||(i.interfaces=[]),l[u]=i}return l}function mi(r){const t=new Set;for(const u of Object.values(r.nodes??{}))typeof u.id=="number"&&t.add(u.id);let l=1;for(const u of Object.values(r.nodes??{}))if(typeof u.id!="number"){for(;t.has(l);)l++;u.id=l,t.add(l),l++}}function hi(r,t){var u;const l=String(((u=r.defaults)==null?void 0:u.device)??"frr");for(const i of Object.values(r.nodes??{})){i.device||(i.device=l);const c=i.device;if(!["none","linux","frr","bird"].includes(c)){t==null||t.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${c}' on node ${i.name} (allowed: none, linux, frr, bird)`,path:`nodes.${i.name}.device`});continue}const o=vn(c);i.role||(i.role=String(o.role??"router")),o.daemon&&(i["netlab-internal:_daemon"]=!0,o.parent&&(i["netlab-internal:_daemon_parent"]=o.parent))}}function gi(r){var o,s;mi(r);const t=((o=r.addressing)==null?void 0:o.mgmt)??{},l=((s=r.addressing)==null?void 0:s.loopback)??{},u=String(t.ipv4??"192.168.121.0/24"),i=Number(t.start??100),c=String(l.ipv4??"10.0.0.0/24");for(const d of Object.values(r.nodes??{})){const f=d.id??1,m=vn(String(d.device??"frr"));if(d.mgmt={ifname:String(m.mgmt_if??"eth0"),ipv4:_i(u,i+f),mac:bi(String(t.mac??"CA-FE-00-00-00-00"),f)},d.role==="router"||d.role==="gateway"||!d.role){const y=gr(String(m.loopback_interface_name??"lo{ifindex}"),0);d.loopback={ifindex:0,ifname:y||"lo",type:"loopback",virtual_interface:!0,ipv4:`${_r(c,f)}/32`}}d.af=d.af??{},d.af.ipv4=!0}}function gr(r,t){return r.includes("if ifindex else")?t?r.replace(/\{ifindex if ifindex else ""\}/g,String(t)):r.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):r.replace(/\{ifindex\}/g,String(t))}function _i(r,t){return _r(r,t)}function _r(r,t){const[l,,]=vi(r),u=(l&4294967295)+t;return[u>>>24&255,u>>>16&255,u>>>8&255,u&255].join(".")}function vi(r){const[t,l]=r.split("/"),u=(t??"0.0.0.0").split(".").map(s=>Number(s)),i=(u[0]<<24>>>0)+(u[1]<<16>>>0)+(u[2]<<8>>>0)+(u[3]>>>0),c=Number(l??32),o=c===0?0:-1<<32-c>>>0;return[i&o,c]}function bi(r,t){const l=t.toString(16).padStart(4,"0");return r.replace(/00-00$/,`${l.slice(0,2)}-${l.slice(2)}`)}const je={};function yi(){for(const r of Object.keys(je))delete je[r]}function Ai(r){yi();const t=r.addressing??{};r.addressing=t,r.pools={...t}}function Ti(r,t){var s;if(t.prefix&&typeof t.prefix=="object")return;const l=t.type==="p2p"?"p2p":"lan",i=(((s=r.addressing)==null?void 0:s[l])??{}).ipv4;if(typeof i!="string"){t.prefix={};return}const c=t.type==="p2p"?30:24,o=Si(i,c,l);t.prefix={ipv4:wi(o.base,o.plen)}}function xi(r,t){const u=(t.prefix??{}).ipv4;if(typeof u!="string")return;const i=vr(u),c=[...t.interfaces??[]].sort((d,f)=>String(d.node).localeCompare(String(f.node)));if(t.type==="p2p"&&c.length===2){c[0].ipv4=`${Re(i,1)}/${i.plen}`,c[1].ipv4=`${Re(i,2)}/${i.plen}`;for(const d of t.interfaces??[]){const f=c.find(m=>m.node===d.node);f&&(d.ipv4=f.ipv4)}return}const o=r.nodes??{};let s=1;for(const d of t.interfaces??[]){if(d.ipv4!==void 0&&d.ipv4!==null)continue;const f=o[d.node],m=f==null?void 0:f.id;typeof m=="number"&&m>0&&m<2**(32-i.plen)-1?d.ipv4=`${Re(i,m)}/${i.plen}`:(d.ipv4=`${Re(i,s)}/${i.plen}`,s++)}}function Si(r,t,l){const u=vr(r),i=2**(32-t),c=je[l]??0;return je[l]=c+1,{base:u.base+c*i>>>0,plen:t}}function vr(r){const[t,l]=r.split("/"),u=(t??"0.0.0.0").split(".").map(Number);return{base:(u[0]<<24>>>0)+(u[1]<<16>>>0)+(u[2]<<8>>>0)+(u[3]>>>0),plen:Number(l??32)}}function Re(r,t){const l=r.base+t>>>0;return[l>>>24&255,l>>>16&255,l>>>8&255,l&255].join(".")}function wi(r,t){return`${[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}/${t}`}function br(r,t){const l=r.nodes??{},u=r.links;if(!u)return[];const i=Array.isArray(u)?u:[],c=[];let o=0;for(const s of i){o++;const d=`links[${o}]`,f=Ci(s,d,l,t);f&&f.disable!==!0&&(f.linkindex=o,f[_e]=d,delete f._linkname,c.push(f))}return r.links=c,c}function Ci(r,t,l,u){if(typeof r=="string"){const i=[];for(const c of r.split("-")){const o=c.trim();l[o]?i.push({node:o}):u==null||u.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${r} in ${t} refers to an unknown node ${o}`})}return{interfaces:i,[_e]:t}}if(Array.isArray(r))return{interfaces:Wn(r,l,u,t),[_e]:t};if(r&&typeof r=="object"){const i={...r};if(Array.isArray(i.interfaces))return i.interfaces=Wn(i.interfaces,l,u,t),i[_e]=t,i;const c={[_e]:t},o=[];for(const[s,d]of Object.entries(i))if(s in l){const f=d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:s}:{node:s};o.push(f)}else c[s]=d;return c.interfaces=o,c}return u==null||u.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof r} for ${t}`}),null}function Wn(r,t,l,u){const i=[];for(const c of r)if(typeof c=="string"){if(!t[c]){l==null||l.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${u} refers to unknown node ${c}`});continue}i.push({node:c})}else if(c&&typeof c=="object"&&!Array.isArray(c)){const o=c;if(!o.node||!t[o.node]){l==null||l.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${u} missing/unknown node`});continue}i.push(o)}return i}function Ei(r){const t=r.nodes??{};for(const l of r.links??[]){const u=l.interfaces??[],i=u.length;l.type||(l.type=i===2?"p2p":"lan"),l.type==="lan"&&!l.bridge&&(l.bridge=`${r.name??"lab"}_${l.linkindex??1}`),Ti(r,l),xi(r,l);for(const c of u){const o=t[c.node];if(!o)continue;const s=vn(String(o.device??"frr")),d=ki(o),f=gr(String(s.interface_name??"eth{ifindex}"),d);c.ifindex=d,c.ifname=f;const m=u.filter(w=>w.node!==c.node).map(w=>{const I={node:w.node??""};return w.ifname!==void 0&&(I.ifname=w.ifname),w.ipv4!==void 0&&(I.ipv4=w.ipv4),w.ipv6!==void 0&&(I.ipv6=w.ipv6),I}),y={ifindex:d,ifname:f,type:l.type??"p2p",neighbors:m};c.ipv4!==void 0&&(y.ipv4=c.ipv4),c.ipv6!==void 0&&(y.ipv6=c.ipv6),l.linkindex!==void 0&&(y.linkindex=l.linkindex),l.ospf&&(y.ospf={...l.ospf}),l.vlan&&(y.vlan={...l.vlan}),l.isis&&(y.isis={...l.isis}),o.interfaces=o.interfaces??[],o.interfaces.push(y)}}}function ki(r){const t=(r.interfaces??[]).map(u=>u.ifindex??0);let l=1;for(;t.includes(l);)l++;return l}function Oi(r){if(r.groups||(r.groups={}),Array.isArray(r.groups)){const t={};for(const l of r.groups)l.name&&(t[String(l.name)]=l);r.groups=t}}function Li(r){const t=r.groups??{},l=r.nodes??{};for(const[,u]of Object.entries(t)){const i=u.members??[];for(const c of i){const o=l[c];if(o){if(u.device&&!o.device&&(o.device=u.device),Array.isArray(u.module)){const s=new Set(o.module??[]);for(const d of u.module)s.add(d);o.module=[...s]}if(u.node_data&&typeof u.node_data=="object"){const s=J(u.node_data,o);Object.assign(o,s)}}}}}function Ii(r){const t=r.components;if(!t||typeof t!="object")return;const l=r.nodes??{},u={},i=[],c=[];for(const[o,s]of Object.entries(l)){const d=s.include;if(typeof d!="string")continue;const f=t[d];if(!f)continue;i.push(o);const m=o,y=f.nodes??{};for(const[I,F]of Object.entries(y)){const M=`${m}_${I}`;u[M]={...F,name:M}}const w=f.links??[];for(const I of w)c.push(Ni(I,m,Object.keys(y)))}for(const o of i)delete l[o];Object.assign(l,u),r.nodes=l,r.links=[...r.links??[],...c],delete r.components,br(r)}function Ni(r,t,l){const u=i=>l.includes(i)?`${t}_${i}`:i;if(Array.isArray(r))return{interfaces:r.map(i=>({node:u(String(i))}))};if(r&&typeof r=="object"){const i={...r};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(s=>({...s,node:u(String(s.node??""))})),i;const c={interfaces:[]},o=[];for(const[s,d]of Object.entries(i))l.includes(s)?o.push(d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:u(s)}:{node:u(s)}):c[s]=d;return c.interfaces=o,c}return{interfaces:[]}}const yr="vlan",Ar=[],Tr=[];function xr(r,t){const l=r.vlans;if(!l||typeof l!="object")return;let u=1;for(const[i,c]of Object.entries(l)){const o=c??{};if(o.id===void 0){for(;Object.values(l).some(s=>(s==null?void 0:s.id)===u);)u++;o.id=u++}l[i]=o}}function Sr(r,t,l){var i;const u=r.vlan;if(u&&typeof u.access=="string"){const c=(i=t.vlans)==null?void 0:i[u.access];c&&u.access_id===void 0&&(u.access_id=c.id)}}const Mi={name:yr,transform_after:Ar,requires:Tr,module_pre_transform:xr,link_pre_transform:Sr},Ri=Object.freeze(Object.defineProperty({__proto__:null,default:Mi,link_pre_transform:Sr,module_pre_transform:xr,name:yr,requires:Tr,transform_after:Ar},Symbol.toStringTag,{value:"Module"})),wr="vrf",Cr=["vlan"],Er=[];function kr(r,t){const l=r.vrfs;if(!l||typeof l!="object")return;let u=1;for(const[i,c]of Object.entries(l)){const o=c??{};o.rd||(o.rd=`1:${u}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),l[i]=o,u++}}function Or(r,t,l){const u=t.vrfs;if(!u)return;const i=new Set((r.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;const c={...r.vrfs??{}};for(const o of i)!c[o]&&u[o]&&(c[o]={...u[o]});r.vrfs=c}const ji={name:wr,transform_after:Cr,requires:Er,module_pre_transform:kr,node_post_transform:Or},Fi=Object.freeze(Object.defineProperty({__proto__:null,default:ji,module_pre_transform:kr,name:wr,node_post_transform:Or,requires:Er,transform_after:Cr},Symbol.toStringTag,{value:"Module"})),Lr="ospf",Ir=["vlan","vrf"],Nr=[];function Mr(r,t){r.ospf||(r.ospf={area:"0.0.0.0"})}function Rr(r,t,l){var o;const u=r.ospf??{},i=t.ospf??{};if(u.area===void 0&&(u.area=i.area??"0.0.0.0"),!u.router_id){const s=r.loopback,d=typeof(s==null?void 0:s.ipv4)=="string"?s.ipv4.split("/")[0]:void 0;u.router_id=d??`10.0.0.${r.id??1}`}const c=(r.interfaces??[]).some(s=>s.ipv4)||!!((o=r.loopback)!=null&&o.ipv4);u.af={ipv4:c,ipv6:!1};for(const s of r.interfaces??[]){const d=s.ospf??{};d.area===void 0&&(d.area=u.area),!d.network_type&&s.type==="p2p"&&(d.network_type="point-to-point"),s.ospf=d}r.ospf=u}const qi={name:Lr,transform_after:Ir,requires:Nr,module_init:Mr,node_post_transform:Rr},$i=Object.freeze(Object.defineProperty({__proto__:null,default:qi,module_init:Mr,name:Lr,node_post_transform:Rr,requires:Nr,transform_after:Ir},Symbol.toStringTag,{value:"Module"})),jr="isis",Fr=["vlan","vrf"],qr=[];function $r(r,t){r.isis||(r.isis={type:"level-2"})}function Pr(r,t,l){const u=r.isis??{},i=t.isis??{};if(u.area||(u.area=i.area??"49.0001"),u.type||(u.type=i.type??"level-2"),!u.net){const c=(r.id??1).toString(16).padStart(4,"0");u.net=`${u.area}.0000.0000.${c}.00`}for(const c of r.interfaces??[]){const o=c.isis??{};!o.network_type&&c.type==="p2p"&&(o.network_type="point-to-point"),c.isis=o}r.isis=u}const Pi={name:jr,transform_after:Fr,requires:qr,module_init:$r,node_post_transform:Pr},Di=Object.freeze(Object.defineProperty({__proto__:null,default:Pi,module_init:$r,name:jr,node_post_transform:Pr,requires:qr,transform_after:Fr},Symbol.toStringTag,{value:"Module"})),Dr="bgp",Yr=["vlan","vrf","ospf","isis"],Hr=[];function Br(r,t){r.bgp||(r.bgp={})}function Ur(r,t,l){const u=r.bgp??{},i=t.bgp??{};u.as===void 0&&i.as!==void 0&&(u.as=i.as),u.as===void 0&&l.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${r.name} is missing bgp.as`,path:`nodes.${r.name}.bgp.as`}),r.bgp=u}function Kr(r,t,l){var c;const u=r.bgp??{};if(!u.router_id){const o=r.loopback;u.router_id=typeof(o==null?void 0:o.ipv4)=="string"?o.ipv4.split("/")[0]:`10.0.0.${r.id??1}`}const i=[];for(const o of r.interfaces??[])for(const s of o.neighbors??[]){const d=(c=t.nodes)==null?void 0:c[s.node];if(!d||!(d.module??[]).includes("bgp"))continue;const f=d.bgp??{},m=Number(u.as),y=Number(f.as),w={name:s.node??"",as:y,type:m===y?"ibgp":"ebgp"};typeof s.ipv4=="string"?w.ipv4=s.ipv4.split("/")[0]:typeof s.ipv4=="boolean"&&(w.ipv4=s.ipv4),i.push(w)}u.neighbor=i,r.bgp=u}const Yi={name:Dr,transform_after:Yr,requires:Hr,module_init:Br,node_pre_transform:Ur,node_post_transform:Kr},Hi=Object.freeze(Object.defineProperty({__proto__:null,default:Yi,module_init:Br,name:Dr,node_post_transform:Kr,node_pre_transform:Ur,requires:Hr,transform_after:Yr},Symbol.toStringTag,{value:"Module"}));const Gr=[Ri,Fi,$i,Di,Hi];function Bi(r){const t=new Map(Gr.map(o=>[o.name,o])),l=[],u=new Set,i=new Set;function c(o){if(i.has(o)||u.has(o))return;u.add(o);const s=t.get(o);for(const d of[...(s==null?void 0:s.requires)??[],...(s==null?void 0:s.transform_after)??[]])r.includes(d)&&c(d);u.delete(o),i.add(o),l.push(o)}for(const o of r)c(o);return l}function bn(r){const t=new Set(r.module??[]);for(const l of Object.values(r.nodes??{}))for(const u of l.module??[])t.add(u);return Bi([...t])}function Ui(r){const t=r.defaults??{};for(const l of bn(r)){const u=t[l]??{},i=r[l]??{};r[l]=J(u,i);for(const c of Object.values(r.nodes??{})){if(!(c.module??[]).includes(l))continue;const o=c[l]??{};c[l]=J(r[l],o)}}}function re(r,t,l){const u=bn(t);for(const i of u){const c=Gr.find(s=>s.name===i);if(!c)continue;const o=c[r];if(typeof o=="function")if(r.startsWith("node_"))for(const s of Object.values(t.nodes??{}))(s.module??[]).includes(i)&&o(s,t,l);else if(r.startsWith("link_"))for(const s of t.links??[])o(s,t,l);else o(t,l)}}function Ki(r){const t={ospf:["area","passive","network_type","cost"],isis:["network_type","metric","passive"]};for(const l of Object.values(r.nodes??{}))for(const[u,i]of Object.entries(t)){if(!(l.module??[]).includes(u))continue;const c=l[u]??{};for(const o of l.interfaces??[]){const s=o[u]??{};for(const d of i)s[d]===void 0&&c[d]!==void 0&&(s[d]=c[d]);o[u]=s}}}function Gi(r,t){r.provider||(r.provider="clab"),r.provider!=="clab"&&t.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${r.provider}' (only clab is supported)`,path:"provider"})}function Vi(r,t){r.provider||(r.provider="clab")}function Wi(r){for(const t of Object.values(r.nodes??{}))t.device==="bird"&&zi(t)}function Qi(r){return`(rt,${r.split(":").join(",")})`}function zi(r){const t=r.vrfs;if(t)for(const l of Object.values(t))for(const u of["import","export"]){const i=l[u];Array.isArray(i)&&(l[`netlab-internal:_bird_${u}`]=i.map(c=>typeof c=="string"?Qi(c):c))}}function Ji(r,t={}){var c,o,s;const l=new ci,u=hr(),i={diagnostics:l,devices:u};if(mr(r),Gi(r,i),r.nodes=di(r.nodes,l),Oi(r),Ii(r),br(r,l),Li(r),hi(r,l),Array.isArray(r.module))for(const d of Object.values(r.nodes)){if(d.role==="host"&&!d["netlab-internal:_daemon"])continue;const f=new Set([...d.module??[],...r.module]);d.module=[...f]}return Ui(r),re("module_init",r,i),Ai(r),(c=t.afterSetup)==null||c.call(t,r,i),re("module_pre_transform",r,i),re("node_pre_transform",r,i),gi(r),re("link_pre_transform",r,i),Ei(r),re("link_post_transform",r,i),re("node_post_transform",r,i),Ki(r),re("module_post_transform",r,i),(o=t.afterAddressed)==null||o.call(t,r,i),Wi(r),Vi(r),r.module=bn(r),(s=t.afterTransformed)==null||s.call(t,r,i),{topology:r,diagnostics:l,ctx:i}}function Xi(r,t={}){const{topology:l,diagnostics:u}=Ji(r);return{topology:l,diagnostics:u,stages:{}}}const Zi=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`,te=document.querySelector("#app");te.innerHTML=`
  <header>
    <h1>netlab.js</h1>
    <p>Load a topology, transform it, inspect JSON and a simple graph.</p>
  </header>
  <main>
    <section class="editor">
      <label for="src">Topology YAML</label>
      <textarea id="src" spellcheck="false" rows="1"></textarea>
      <div class="actions">
        <button id="run" type="button">Transform</button>
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
`;const ie=te.querySelector("#src"),Qn=te.querySelector("#out"),se=te.querySelector("#status"),Fe=te.querySelector("#errors"),Vr=te.querySelector("#graph"),et=te.querySelector("#run");ie.value=Zi;function Wr(){ie.style.height="auto",ie.style.height=`${ie.scrollHeight}px`}function Qr(){Fe.hidden=!0,Fe.innerHTML="",se.classList.remove("is-error")}function zn(r){if(!r.length){Qr();return}se.classList.add("is-error"),Fe.hidden=!1,Fe.innerHTML=`
    <h2>Transform errors</h2>
    <ul>
      ${r.map(t=>`<li>${nt(t)}</li>`).join("")}
    </ul>
  `}function nt(r){return r.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function rt(r){const t=Object.keys(r.nodes??{}),l=r.links??[],u=640,i=360,c=u/2,o=i/2,s=Math.min(u,i)*.32,d=new Map;t.forEach((y,w)=>{const I=2*Math.PI*w/Math.max(t.length,1)-Math.PI/2;d.set(y,{x:c+s*Math.cos(I),y:o+s*Math.sin(I)})});const f=l.flatMap(y=>{const w=y.interfaces??[];if(w.length<2)return[];const I=[];for(let F=0;F<w.length;F++)for(let M=F+1;M<w.length;M++){const $=d.get(String(w[F].node)),K=d.get(String(w[M].node));!$||!K||I.push(`<line x1="${$.x}" y1="${$.y}" x2="${K.x}" y2="${K.y}" class="edge"/>`)}return I}).join(""),m=t.map(y=>{var F,M;const w=d.get(y),I=String(((M=(F=r.nodes)==null?void 0:F[y])==null?void 0:M.device)??"");return`
        <g class="node">
          <circle cx="${w.x}" cy="${w.y}" r="28"/>
          <text x="${w.x}" y="${w.y-2}" text-anchor="middle">${y}</text>
          <text x="${w.x}" y="${w.y+14}" text-anchor="middle" class="sub">${I}</text>
        </g>`}).join("");Vr.innerHTML=`${f}${m}`}function zr(){se.textContent="Running…",Qr();try{const r=qe.load(ie.value);if(!r||typeof r!="object"||Array.isArray(r))throw new Error("Topology must be a YAML object");const t=fi(ie.value),{topology:l,diagnostics:u,stages:i}=Xi(t,{validate:!1});Qn.textContent=JSON.stringify(l,null,2),rt(l);const c=u.list().filter(o=>o.severity==="error");c.length?(se.textContent=`${c.length} error(s); stages: ${JSON.stringify(i)}`,zn(c.map(o=>{const s=o.path?` (${o.path})`:"";return`[${o.module}/${o.code}] ${o.message}${s}`}))):se.textContent=`OK — stages: ${JSON.stringify(i)}`}catch(r){const t=r instanceof Error?r.message:String(r);se.textContent="Transform failed",zn([t]),Qn.textContent="",Vr.innerHTML=""}}ie.addEventListener("input",Wr);et.addEventListener("click",zr);Wr();zr();
