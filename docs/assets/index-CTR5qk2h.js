var ei=Object.defineProperty;var ni=(n,i,o)=>i in n?ei(n,i,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[i]=o;var xn=(n,i,o)=>ni(n,typeof i!="symbol"?i+"":i,o);(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();function ri(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var D={},Me={},ee={},Sn;function be(){if(Sn)return ee;Sn=1;function n(l){return typeof l>"u"||l===null}function i(l){return typeof l=="object"&&l!==null}function o(l){return Array.isArray(l)?l:n(l)?[]:[l]}function c(l,u){if(u){const d=Object.keys(u);for(let f=0,m=d.length;f<m;f+=1){const y=d[f];l[y]=u[y]}}return l}function t(l,u){let d="";for(let f=0;f<u;f+=1)d+=l;return d}function s(l){return l===0&&Number.NEGATIVE_INFINITY===1/l}return ee.isNothing=n,ee.isObject=i,ee.toArray=o,ee.repeat=t,ee.isNegativeZero=s,ee.extend=c,ee}var Qe,wn;function ve(){if(wn)return Qe;wn=1;function n(o,c){let t="";const s=o.reason||"(unknown reason)";return o.mark?(o.mark.name&&(t+='in "'+o.mark.name+'" '),t+="("+(o.mark.line+1)+":"+(o.mark.column+1)+")",!c&&o.mark.snippet&&(t+=`

`+o.mark.snippet),s+" "+t):s}function i(o,c){Error.call(this),this.name="YAMLException",this.reason=o,this.mark=c,this.message=n(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,i.prototype.toString=function(c){return this.name+": "+n(this,c)},Qe=i,Qe}var ze,Cn;function ii(){if(Cn)return ze;Cn=1;const n=be();function i(t,s,l,u,d){let f="",m="";const y=Math.floor(d/2)-1;return u-s>y&&(f=" ... ",s=u-y+f.length),l-u>y&&(m=" ...",l=u+y-m.length),{str:f+t.slice(s,l).replace(/\t/g,"→")+m,pos:u-s+f.length}}function o(t,s){return n.repeat(" ",s-t.length)+t}function c(t,s){if(s=Object.create(s||null),!t.buffer)return null;s.maxLength||(s.maxLength=79),typeof s.indent!="number"&&(s.indent=1),typeof s.linesBefore!="number"&&(s.linesBefore=3),typeof s.linesAfter!="number"&&(s.linesAfter=2);const l=/\r?\n|\r|\0/g,u=[0],d=[];let f,m=-1;for(;f=l.exec(t.buffer);)d.push(f.index),u.push(f.index+f[0].length),t.position<=f.index&&m<0&&(m=u.length-2);m<0&&(m=u.length-1);let y="";const w=Math.min(t.line+s.linesAfter,d.length).toString().length,I=s.maxLength-(s.indent+w+3);for(let M=1;M<=s.linesBefore&&!(m-M<0);M++){const q=i(t.buffer,u[m-M],d[m-M],t.position-(u[m]-u[m-M]),I);y=n.repeat(" ",s.indent)+o((t.line-M+1).toString(),w)+" | "+q.str+`
`+y}const $=i(t.buffer,u[m],d[m],t.position,I);y+=n.repeat(" ",s.indent)+o((t.line+1).toString(),w)+" | "+$.str+`
`,y+=n.repeat("-",s.indent+w+3+$.pos)+`^
`;for(let M=1;M<=s.linesAfter&&!(m+M>=d.length);M++){const q=i(t.buffer,u[m+M],d[m+M],t.position-(u[m]-u[m+M]),I);y+=n.repeat(" ",s.indent)+o((t.line+M+1).toString(),w)+" | "+q.str+`
`}return y.replace(/\n$/,"")}return ze=c,ze}var Je,En;function Y(){if(En)return Je;En=1;const n=ve(),i=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],o=["scalar","sequence","mapping"];function c(s){const l={};return s!==null&&Object.keys(s).forEach(function(u){s[u].forEach(function(d){l[String(d)]=u})}),l}function t(s,l){if(l=l||{},Object.keys(l).forEach(function(u){if(i.indexOf(u)===-1)throw new n('Unknown option "'+u+'" is met in definition of "'+s+'" YAML type.')}),this.options=l,this.tag=s,this.kind=l.kind||null,this.resolve=l.resolve||function(){return!0},this.construct=l.construct||function(u){return u},this.instanceOf=l.instanceOf||null,this.predicate=l.predicate||null,this.represent=l.represent||null,this.representName=l.representName||null,this.defaultStyle=l.defaultStyle||null,this.multi=l.multi||!1,this.styleAliases=c(l.styleAliases||null),o.indexOf(this.kind)===-1)throw new n('Unknown kind "'+this.kind+'" is specified for "'+s+'" YAML type.')}return Je=t,Je}var Xe,kn;function er(){if(kn)return Xe;kn=1;const n=ve(),i=Y();function o(s,l){const u=[];return s[l].forEach(function(d){let f=u.length;u.forEach(function(m,y){m.tag===d.tag&&m.kind===d.kind&&m.multi===d.multi&&(f=y)}),u[f]=d}),u}function c(){const s={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function l(u){u.multi?(s.multi[u.kind].push(u),s.multi.fallback.push(u)):s[u.kind][u.tag]=s.fallback[u.tag]=u}for(let u=0,d=arguments.length;u<d;u+=1)arguments[u].forEach(l);return s}function t(s){return this.extend(s)}return t.prototype.extend=function(l){let u=[],d=[];if(l instanceof i)d.push(l);else if(Array.isArray(l))d=d.concat(l);else if(l&&(Array.isArray(l.implicit)||Array.isArray(l.explicit)))l.implicit&&(u=u.concat(l.implicit)),l.explicit&&(d=d.concat(l.explicit));else throw new n("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");u.forEach(function(m){if(!(m instanceof i))throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(m.loadKind&&m.loadKind!=="scalar")throw new n("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(m.multi)throw new n("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),d.forEach(function(m){if(!(m instanceof i))throw new n("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const f=Object.create(t.prototype);return f.implicit=(this.implicit||[]).concat(u),f.explicit=(this.explicit||[]).concat(d),f.compiledImplicit=o(f,"implicit"),f.compiledExplicit=o(f,"explicit"),f.compiledTypeMap=c(f.compiledImplicit,f.compiledExplicit),f},Xe=t,Xe}var Ze,On;function nr(){if(On)return Ze;On=1;const n=Y();return Ze=new n("tag:yaml.org,2002:str",{kind:"scalar",construct:function(i){return i!==null?i:""}}),Ze}var en,Ln;function rr(){if(Ln)return en;Ln=1;const n=Y();return en=new n("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(i){return i!==null?i:[]}}),en}var nn,In;function ir(){if(In)return nn;In=1;const n=Y();return nn=new n("tag:yaml.org,2002:map",{kind:"mapping",construct:function(i){return i!==null?i:{}}}),nn}var rn,Nn;function tr(){if(Nn)return rn;Nn=1;const n=er();return rn=new n({explicit:[nr(),rr(),ir()]}),rn}var tn,Mn;function or(){if(Mn)return tn;Mn=1;const n=Y();function i(t){if(t===null)return!0;const s=t.length;return s===1&&t==="~"||s===4&&(t==="null"||t==="Null"||t==="NULL")}function o(){return null}function c(t){return t===null}return tn=new n("tag:yaml.org,2002:null",{kind:"scalar",resolve:i,construct:o,predicate:c,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),tn}var on,jn;function lr(){if(jn)return on;jn=1;const n=Y();function i(t){if(t===null)return!1;const s=t.length;return s===4&&(t==="true"||t==="True"||t==="TRUE")||s===5&&(t==="false"||t==="False"||t==="FALSE")}function o(t){return t==="true"||t==="True"||t==="TRUE"}function c(t){return Object.prototype.toString.call(t)==="[object Boolean]"}return on=new n("tag:yaml.org,2002:bool",{kind:"scalar",resolve:i,construct:o,predicate:c,represent:{lowercase:function(t){return t?"true":"false"},uppercase:function(t){return t?"TRUE":"FALSE"},camelcase:function(t){return t?"True":"False"}},defaultStyle:"lowercase"}),on}var ln,Rn;function cr(){if(Rn)return ln;Rn=1;const n=be(),i=Y();function o(f){return f>=48&&f<=57||f>=65&&f<=70||f>=97&&f<=102}function c(f){return f>=48&&f<=55}function t(f){return f>=48&&f<=57}function s(f){if(f===null)return!1;const m=f.length;let y=0,w=!1;if(!m)return!1;let I=f[y];if((I==="-"||I==="+")&&(I=f[++y]),I==="0"){if(y+1===m)return!0;if(I=f[++y],I==="b"){for(y++;y<m;y++){if(I=f[y],I!=="0"&&I!=="1")return!1;w=!0}return w&&isFinite(l(f))}if(I==="x"){for(y++;y<m;y++){if(!o(f.charCodeAt(y)))return!1;w=!0}return w&&isFinite(l(f))}if(I==="o"){for(y++;y<m;y++){if(!c(f.charCodeAt(y)))return!1;w=!0}return w&&isFinite(l(f))}}for(;y<m;y++){if(!t(f.charCodeAt(y)))return!1;w=!0}return w?isFinite(l(f)):!1}function l(f){let m=f,y=1,w=m[0];if((w==="-"||w==="+")&&(w==="-"&&(y=-1),m=m.slice(1),w=m[0]),m==="0")return 0;if(w==="0"){if(m[1]==="b")return y*parseInt(m.slice(2),2);if(m[1]==="x")return y*parseInt(m.slice(2),16);if(m[1]==="o")return y*parseInt(m.slice(2),8)}return y*parseInt(m,10)}function u(f){return l(f)}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&f%1===0&&!n.isNegativeZero(f)}return ln=new i("tag:yaml.org,2002:int",{kind:"scalar",resolve:s,construct:u,predicate:d,represent:{binary:function(f){return f>=0?"0b"+f.toString(2):"-0b"+f.toString(2).slice(1)},octal:function(f){return f>=0?"0o"+f.toString(8):"-0o"+f.toString(8).slice(1)},decimal:function(f){return f.toString(10)},hexadecimal:function(f){return f>=0?"0x"+f.toString(16).toUpperCase():"-0x"+f.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),ln}var cn,$n;function sr(){if($n)return cn;$n=1;const n=be(),i=Y(),o=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),c=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function t(f){return f===null||!o.test(f)?!1:isFinite(parseFloat(f,10))?!0:c.test(f)}function s(f){let m=f.toLowerCase();const y=m[0]==="-"?-1:1;return"+-".indexOf(m[0])>=0&&(m=m.slice(1)),m===".inf"?y===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:m===".nan"?NaN:y*parseFloat(m,10)}const l=/^[-+]?[0-9]+e/;function u(f,m){if(isNaN(f))switch(m){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===f)switch(m){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===f)switch(m){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(n.isNegativeZero(f))return"-0.0";const y=f.toString(10);return l.test(y)?y.replace("e",".e"):y}function d(f){return Object.prototype.toString.call(f)==="[object Number]"&&(f%1!==0||n.isNegativeZero(f))}return cn=new i("tag:yaml.org,2002:float",{kind:"scalar",resolve:t,construct:s,predicate:d,represent:u,defaultStyle:"lowercase"}),cn}var sn,Fn;function ur(){return Fn||(Fn=1,sn=tr().extend({implicit:[or(),lr(),cr(),sr()]})),sn}var un,qn;function fr(){return qn||(qn=1,un=ur()),un}var fn,Pn;function ar(){if(Pn)return fn;Pn=1;const n=Y(),i=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),o=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function c(l){return l===null?!1:i.exec(l)!==null||o.exec(l)!==null}function t(l){let u=0,d=null,f=i.exec(l);if(f===null&&(f=o.exec(l)),f===null)throw new Error("Date resolve error");const m=+f[1],y=+f[2]-1,w=+f[3];if(!f[4])return new Date(Date.UTC(m,y,w));const I=+f[4],$=+f[5],M=+f[6];if(f[7]){for(u=f[7].slice(0,3);u.length<3;)u+="0";u=+u}if(f[9]){const K=+f[10],U=+(f[11]||0);d=(K*60+U)*6e4,f[9]==="-"&&(d=-d)}const q=new Date(Date.UTC(m,y,w,I,$,M,u));return d&&q.setTime(q.getTime()-d),q}function s(l){return l.toISOString()}return fn=new n("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:c,construct:t,instanceOf:Date,represent:s}),fn}var an,Dn;function pr(){if(Dn)return an;Dn=1;const n=Y();function i(o){return o==="<<"||o===null}return an=new n("tag:yaml.org,2002:merge",{kind:"scalar",resolve:i}),an}var pn,Yn;function dr(){if(Yn)return pn;Yn=1;const n=Y(),i=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function o(l){if(l===null)return!1;let u=0;const d=l.length,f=i;for(let m=0;m<d;m++){const y=f.indexOf(l.charAt(m));if(!(y>64)){if(y<0)return!1;u+=6}}return u%8===0}function c(l){const u=l.replace(/[\r\n=]/g,""),d=u.length,f=i;let m=0;const y=[];for(let I=0;I<d;I++)I%4===0&&I&&(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)),m=m<<6|f.indexOf(u.charAt(I));const w=d%4*6;return w===0?(y.push(m>>16&255),y.push(m>>8&255),y.push(m&255)):w===18?(y.push(m>>10&255),y.push(m>>2&255)):w===12&&y.push(m>>4&255),new Uint8Array(y)}function t(l){let u="",d=0;const f=l.length,m=i;for(let w=0;w<f;w++)w%3===0&&w&&(u+=m[d>>18&63],u+=m[d>>12&63],u+=m[d>>6&63],u+=m[d&63]),d=(d<<8)+l[w];const y=f%3;return y===0?(u+=m[d>>18&63],u+=m[d>>12&63],u+=m[d>>6&63],u+=m[d&63]):y===2?(u+=m[d>>10&63],u+=m[d>>4&63],u+=m[d<<2&63],u+=m[64]):y===1&&(u+=m[d>>2&63],u+=m[d<<4&63],u+=m[64],u+=m[64]),u}function s(l){return Object.prototype.toString.call(l)==="[object Uint8Array]"}return pn=new n("tag:yaml.org,2002:binary",{kind:"scalar",resolve:o,construct:c,predicate:s,represent:t}),pn}var dn,Un;function mr(){if(Un)return dn;Un=1;const n=Y(),i=Object.prototype.hasOwnProperty,o=Object.prototype.toString;function c(s){if(s===null)return!0;const l=[],u=s;for(let d=0,f=u.length;d<f;d+=1){const m=u[d];let y=!1;if(o.call(m)!=="[object Object]")return!1;let w;for(w in m)if(i.call(m,w))if(!y)y=!0;else return!1;if(!y)return!1;if(l.indexOf(w)===-1)l.push(w);else return!1}return!0}function t(s){return s!==null?s:[]}return dn=new n("tag:yaml.org,2002:omap",{kind:"sequence",resolve:c,construct:t}),dn}var mn,Hn;function hr(){if(Hn)return mn;Hn=1;const n=Y(),i=Object.prototype.toString;function o(t){if(t===null)return!0;const s=t,l=new Array(s.length);for(let u=0,d=s.length;u<d;u+=1){const f=s[u];if(i.call(f)!=="[object Object]")return!1;const m=Object.keys(f);if(m.length!==1)return!1;l[u]=[m[0],f[m[0]]]}return!0}function c(t){if(t===null)return[];const s=t,l=new Array(s.length);for(let u=0,d=s.length;u<d;u+=1){const f=s[u],m=Object.keys(f);l[u]=[m[0],f[m[0]]]}return l}return mn=new n("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:o,construct:c}),mn}var hn,Bn;function gr(){if(Bn)return hn;Bn=1;const n=Y(),i=Object.prototype.hasOwnProperty;function o(t){if(t===null)return!0;const s=t;for(const l in s)if(i.call(s,l)&&s[l]!==null)return!1;return!0}function c(t){return t!==null?t:{}}return hn=new n("tag:yaml.org,2002:set",{kind:"mapping",resolve:o,construct:c}),hn}var gn,Kn;function vn(){return Kn||(Kn=1,gn=fr().extend({implicit:[ar(),pr()],explicit:[dr(),mr(),hr(),gr()]})),gn}var Gn;function ti(){if(Gn)return Me;Gn=1;const n=be(),i=ve(),o=ii(),c=vn(),t=Object.prototype.hasOwnProperty,s=1,l=2,u=3,d=4,f=1,m=2,y=3,w=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,I=/[\x85\u2028\u2029]/,$=/[,\[\]{}]/,M=/^(?:!|!!|![0-9A-Za-z-]+!)$/,q=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function K(e){return Object.prototype.toString.call(e)}function U(e){return e===10||e===13}function H(e){return e===9||e===32}function P(e){return e===9||e===32||e===10||e===13}function X(e){return e===44||e===91||e===93||e===123||e===125}function De(e){if(e>=48&&e<=57)return e-48;const a=e|32;return a>=97&&a<=102?a-97+10:-1}function Ye(e){return e===120?2:e===117?4:e===85?8:0}function ye(e){return e>=48&&e<=57?e-48:-1}function fe(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function Ue(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function ae(e,a,g){a==="__proto__"?Object.defineProperty(e,a,{configurable:!0,enumerable:!0,writable:!0,value:g}):e[a]=g}const Ae=new Array(256),pe=new Array(256);for(let e=0;e<256;e++)Ae[e]=fe(e)?1:0,pe[e]=fe(e);function F(e,a){this.input=e,this.filename=a.filename||null,this.schema=a.schema||c,this.onWarning=a.onWarning||null,this.legacy=a.legacy||!1,this.json=a.json||!1,this.listener=a.listener||null,this.maxDepth=typeof a.maxDepth=="number"?a.maxDepth:100,this.maxTotalMergeKeys=typeof a.maxTotalMergeKeys=="number"?a.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function Te(e,a){const g={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return g.snippet=o(g),new i(a,g)}function k(e,a){throw Te(e,a)}function oe(e,a){e.onWarning&&e.onWarning.call(null,Te(e,a))}function V(e,a,g){const v=e.anchorMapTransactions;if(v.length!==0){const h=v[v.length-1];t.call(h,a)||(h[a]={existed:t.call(e.anchorMap,a),value:e.anchorMap[a]})}e.anchorMap[a]=g}function He(e){e.anchorMapTransactions.push(Object.create(null))}function ne(e){const a=e.anchorMapTransactions.pop(),g=e.anchorMapTransactions;if(g.length===0)return;const v=g[g.length-1],h=Object.keys(a);for(let S=0,r=h.length;S<r;S+=1){const p=h[S];t.call(v,p)||(v[p]=a[p])}}function Be(e){const a=e.anchorMapTransactions.pop(),g=Object.keys(a);for(let v=g.length-1;v>=0;v-=1){const h=a[g[v]];h.existed?e.anchorMap[g[v]]=h.value:delete e.anchorMap[g[v]]}}function de(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,tag:e.tag,anchor:e.anchor,kind:e.kind,result:e.result}}function le(e,a){e.position=a.position,e.line=a.line,e.lineStart=a.lineStart,e.lineIndent=a.lineIndent,e.firstTabInLine=a.firstTabInLine,e.tag=a.tag,e.anchor=a.anchor,e.kind=a.kind,e.result=a.result}const xe={YAML:function(a,g,v){a.version!==null&&k(a,"duplication of %YAML directive"),v.length!==1&&k(a,"YAML directive accepts exactly one argument");const h=/^([0-9]+)\.([0-9]+)$/.exec(v[0]);h===null&&k(a,"ill-formed argument of the YAML directive");const S=parseInt(h[1],10),r=parseInt(h[2],10);S!==1&&k(a,"unacceptable YAML version of the document"),a.version=v[0],a.checkLineBreaks=r<2,r!==1&&r!==2&&oe(a,"unsupported YAML version of the document")},TAG:function(a,g,v){let h;v.length!==2&&k(a,"TAG directive accepts exactly two arguments");const S=v[0];h=v[1],M.test(S)||k(a,"ill-formed tag handle (first argument) of the TAG directive"),t.call(a.tagMap,S)&&k(a,'there is a previously declared suffix for "'+S+'" tag handle'),q.test(h)||k(a,"ill-formed tag prefix (second argument) of the TAG directive");try{h=decodeURIComponent(h)}catch{k(a,"tag prefix is malformed: "+h)}a.tagMap[S]=h}};function B(e,a,g,v){if(a<g){const h=e.input.slice(a,g);if(v)for(let S=0,r=h.length;S<r;S+=1){const p=h.charCodeAt(S);p===9||p>=32&&p<=1114111||k(e,"expected valid JSON character")}else w.test(h)&&k(e,"the stream contains non-printable characters");e.result+=h}}function Z(e,a,g,v){n.isObject(g)||k(e,"cannot merge mappings; the provided source object is unacceptable");const h=Object.keys(g);for(let S=0,r=h.length;S<r;S+=1){const p=h[S];e.maxTotalMergeKeys!==-1&&++e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,"merge keys exceeded maxTotalMergeKeys ("+e.maxTotalMergeKeys+")"),t.call(a,p)||(ae(a,p,g[p]),v[p]=!0)}}function W(e,a,g,v,h,S,r,p,T){if(Array.isArray(h)){h=Array.prototype.slice.call(h);for(let _=0,b=h.length;_<b;_+=1)Array.isArray(h[_])&&k(e,"nested arrays are not supported inside keys"),typeof h=="object"&&K(h[_])==="[object Object]"&&(h[_]="[object Object]")}if(typeof h=="object"&&K(h)==="[object Object]"&&(h="[object Object]"),h=String(h),a===null&&(a={}),v==="tag:yaml.org,2002:merge")if(Array.isArray(S))for(let _=0,b=S.length;_<b;_+=1)Z(e,a,S[_],g);else Z(e,a,S,g);else!e.json&&!t.call(g,h)&&t.call(a,h)&&(e.line=r||e.line,e.lineStart=p||e.lineStart,e.position=T||e.position,k(e,"duplicated mapping key")),ae(a,h,S),delete g[h];return a}function ce(e){const a=e.input.charCodeAt(e.position);a===10?e.position++:a===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):k(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function R(e,a,g){let v=0,h=e.input.charCodeAt(e.position);for(;h!==0;){for(;H(h);)h===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),h=e.input.charCodeAt(++e.position);if(a&&h===35)do h=e.input.charCodeAt(++e.position);while(h!==10&&h!==13&&h!==0);if(U(h))for(ce(e),h=e.input.charCodeAt(e.position),v++,e.lineIndent=0;h===32;)e.lineIndent++,h=e.input.charCodeAt(++e.position);else break}return g!==-1&&v!==0&&e.lineIndent<g&&oe(e,"deficient indentation"),v}function se(e){let a=e.position,g=e.input.charCodeAt(a);return!!((g===45||g===46)&&g===e.input.charCodeAt(a+1)&&g===e.input.charCodeAt(a+2)&&(a+=3,g=e.input.charCodeAt(a),g===0||P(g)))}function Q(e,a){a===1?e.result+=" ":a>1&&(e.result+=n.repeat(`
`,a-1))}function Se(e,a,g){let v,h,S,r,p,T;const _=e.kind,b=e.result;let x=e.input.charCodeAt(e.position);if(P(x)||X(x)||x===35||x===38||x===42||x===33||x===124||x===62||x===39||x===34||x===37||x===64||x===96)return!1;if(x===63||x===45){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))return!1}for(e.kind="scalar",e.result="",v=h=e.position,S=!1;x!==0;){if(x===58){const A=e.input.charCodeAt(e.position+1);if(P(A)||g&&X(A))break}else if(x===35){const A=e.input.charCodeAt(e.position-1);if(P(A))break}else{if(e.position===e.lineStart&&se(e)||g&&X(x))break;if(U(x))if(r=e.line,p=e.lineStart,T=e.lineIndent,R(e,!1,-1),e.lineIndent>=a){S=!0,x=e.input.charCodeAt(e.position);continue}else{e.position=h,e.line=r,e.lineStart=p,e.lineIndent=T;break}}S&&(B(e,v,h,!1),Q(e,e.line-r),v=h=e.position,S=!1),H(x)||(h=e.position+1),x=e.input.charCodeAt(++e.position)}return B(e,v,h,!1),e.result?!0:(e.kind=_,e.result=b,!1)}function we(e,a){let g,v,h=e.input.charCodeAt(e.position);if(h!==39)return!1;for(e.kind="scalar",e.result="",e.position++,g=v=e.position;(h=e.input.charCodeAt(e.position))!==0;)if(h===39)if(B(e,g,e.position,!0),h=e.input.charCodeAt(++e.position),h===39)g=e.position,e.position++,v=e.position;else return!0;else U(h)?(B(e,g,v,!0),Q(e,R(e,!1,a)),g=v=e.position):e.position===e.lineStart&&se(e)?k(e,"unexpected end of the document within a single quoted scalar"):(e.position++,H(h)||(v=e.position));k(e,"unexpected end of the stream within a single quoted scalar")}function me(e,a){let g,v,h,S=e.input.charCodeAt(e.position);if(S!==34)return!1;for(e.kind="scalar",e.result="",e.position++,g=v=e.position;(S=e.input.charCodeAt(e.position))!==0;){if(S===34)return B(e,g,e.position,!0),e.position++,!0;if(S===92){if(B(e,g,e.position,!0),S=e.input.charCodeAt(++e.position),U(S))R(e,!1,a);else if(S<256&&Ae[S])e.result+=pe[S],e.position++;else if((h=Ye(S))>0){let r=h,p=0;for(;r>0;r--)S=e.input.charCodeAt(++e.position),(h=De(S))>=0?p=(p<<4)+h:k(e,"expected hexadecimal character");e.result+=Ue(p),e.position++}else k(e,"unknown escape sequence");g=v=e.position}else U(S)?(B(e,g,v,!0),Q(e,R(e,!1,a)),g=v=e.position):e.position===e.lineStart&&se(e)?k(e,"unexpected end of the document within a double quoted scalar"):(e.position++,H(S)||(v=e.position))}k(e,"unexpected end of the stream within a double quoted scalar")}function Ce(e,a){let g=!0,v,h,S;const r=e.tag;let p;const T=e.anchor;let _,b,x,A;const E=Object.create(null);let C,O,L,N=e.input.charCodeAt(e.position);if(N===91)_=93,A=!1,p=[];else if(N===123)_=125,A=!0,p={};else return!1;for(e.anchor!==null&&V(e,e.anchor,p),N=e.input.charCodeAt(++e.position);N!==0;){if(R(e,!0,a),N=e.input.charCodeAt(e.position),N===_)return e.position++,e.tag=r,e.anchor=T,e.kind=A?"mapping":"sequence",e.result=p,!0;if(g?N===44&&k(e,"expected the node content, but found ','"):k(e,"missed comma between flow collection entries"),O=C=L=null,b=x=!1,N===63){const j=e.input.charCodeAt(e.position+1);P(j)&&(b=x=!0,e.position++,R(e,!0,a))}v=e.line,h=e.lineStart,S=e.position,J(e,a,s,!1,!0),O=e.tag,C=e.result,R(e,!0,a),N=e.input.charCodeAt(e.position),(x||e.line===v)&&N===58&&(b=!0,N=e.input.charCodeAt(++e.position),R(e,!0,a),J(e,a,s,!1,!0),L=e.result),A?W(e,p,E,O,C,L,v,h,S):b?p.push(W(e,null,E,O,C,L,v,h,S)):p.push(C),R(e,!0,a),N=e.input.charCodeAt(e.position),N===44?(g=!0,N=e.input.charCodeAt(++e.position)):g=!1}k(e,"unexpected end of the stream within a flow collection")}function Ee(e,a){let g,v=f,h=!1,S=!1,r=a,p=0,T=!1,_,b=e.input.charCodeAt(e.position);if(b===124)g=!1;else if(b===62)g=!0;else return!1;for(e.kind="scalar",e.result="";b!==0;)if(b=e.input.charCodeAt(++e.position),b===43||b===45)f===v?v=b===43?y:m:k(e,"repeat of a chomping mode identifier");else if((_=ye(b))>=0)_===0?k(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):S?k(e,"repeat of an indentation width identifier"):(r=a+_-1,S=!0);else break;if(H(b)){do b=e.input.charCodeAt(++e.position);while(H(b));if(b===35)do b=e.input.charCodeAt(++e.position);while(!U(b)&&b!==0)}for(;b!==0;){for(ce(e),e.lineIndent=0,b=e.input.charCodeAt(e.position);(!S||e.lineIndent<r)&&b===32;)e.lineIndent++,b=e.input.charCodeAt(++e.position);if(!S&&e.lineIndent>r&&(r=e.lineIndent),U(b)){p++;continue}if(!S&&r===0&&k(e,"missing indentation for block scalar"),e.lineIndent<r){v===y?e.result+=n.repeat(`
`,h?1+p:p):v===f&&h&&(e.result+=`
`);break}g?H(b)?(T=!0,e.result+=n.repeat(`
`,h?1+p:p)):T?(T=!1,e.result+=n.repeat(`
`,p+1)):p===0?h&&(e.result+=" "):e.result+=n.repeat(`
`,p):e.result+=n.repeat(`
`,h?1+p:p),h=!0,S=!0,p=0;const x=e.position;for(;!U(b)&&b!==0;)b=e.input.charCodeAt(++e.position);B(e,x,e.position,!1)}return!0}function z(e,a){const g=e.tag,v=e.anchor,h=[];let S=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&V(e,e.anchor,h);let r=e.input.charCodeAt(e.position);for(;r!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation")),r===45);){const p=e.input.charCodeAt(e.position+1);if(!P(p))break;if(S=!0,e.position++,R(e,!0,-1)&&e.lineIndent<=a){h.push(null),r=e.input.charCodeAt(e.position);continue}const T=e.line;if(J(e,a,u,!1,!0),h.push(e.result),R(e,!0,-1),r=e.input.charCodeAt(e.position),(e.line===T||e.lineIndent>a)&&r!==0)k(e,"bad indentation of a sequence entry");else if(e.lineIndent<a)break}return S?(e.tag=g,e.anchor=v,e.kind="sequence",e.result=h,!0):!1}function ke(e,a,g){let v,h,S,r;const p=e.tag,T=e.anchor,_={},b=Object.create(null);let x=null,A=null,E=null,C=!1,O=!1;if(e.firstTabInLine!==-1)return!1;e.anchor!==null&&V(e,e.anchor,_);let L=e.input.charCodeAt(e.position);for(;L!==0;){!C&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,k(e,"tab characters must not be used in indentation"));const N=e.input.charCodeAt(e.position+1),j=e.line;if((L===63||L===58)&&P(N))L===63?(C&&(W(e,_,b,x,A,null,h,S,r),x=A=E=null),O=!0,C=!0,v=!0):C?(C=!1,v=!0):k(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,L=N;else{if(h=e.line,S=e.lineStart,r=e.position,!J(e,g,l,!1,!0))break;if(e.line===j){for(L=e.input.charCodeAt(e.position);H(L);)L=e.input.charCodeAt(++e.position);if(L===58)L=e.input.charCodeAt(++e.position),P(L)||k(e,"a whitespace character is expected after the key-value separator within a block mapping"),C&&(W(e,_,b,x,A,null,h,S,r),x=A=E=null),O=!0,C=!1,v=!1,x=e.tag,A=e.result;else if(O)k(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=p,e.anchor=T,!0}else if(O)k(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=p,e.anchor=T,!0}if((e.line===j||e.lineIndent>a)&&(C&&(h=e.line,S=e.lineStart,r=e.position),J(e,a,d,!0,v)&&(C?A=e.result:E=e.result),C||(W(e,_,b,x,A,E,h,S,r),x=A=E=null),R(e,!0,-1),L=e.input.charCodeAt(e.position)),(e.line===j||e.lineIndent>a)&&L!==0)k(e,"bad indentation of a mapping entry");else if(e.lineIndent<a)break}return C&&W(e,_,b,x,A,null,h,S,r),O&&(e.tag=p,e.anchor=T,e.kind="mapping",e.result=_),O}function Ke(e){let a=!1,g=!1,v,h,S=e.input.charCodeAt(e.position);if(S!==33)return!1;e.tag!==null&&k(e,"duplication of a tag property"),S=e.input.charCodeAt(++e.position),S===60?(a=!0,S=e.input.charCodeAt(++e.position)):S===33?(g=!0,v="!!",S=e.input.charCodeAt(++e.position)):v="!";let r=e.position;if(a){do S=e.input.charCodeAt(++e.position);while(S!==0&&S!==62);e.position<e.length?(h=e.input.slice(r,e.position),S=e.input.charCodeAt(++e.position)):k(e,"unexpected end of the stream within a verbatim tag")}else{for(;S!==0&&!P(S);)S===33&&(g?k(e,"tag suffix cannot contain exclamation marks"):(v=e.input.slice(r-1,e.position+1),M.test(v)||k(e,"named tag handle cannot contain such characters"),g=!0,r=e.position+1)),S=e.input.charCodeAt(++e.position);h=e.input.slice(r,e.position),$.test(h)&&k(e,"tag suffix cannot contain flow indicator characters")}h&&!q.test(h)&&k(e,"tag name cannot contain such characters: "+h);try{h=decodeURIComponent(h)}catch{k(e,"tag name is malformed: "+h)}return a?e.tag=h:t.call(e.tagMap,v)?e.tag=e.tagMap[v]+h:v==="!"?e.tag="!"+h:v==="!!"?e.tag="tag:yaml.org,2002:"+h:k(e,'undeclared tag handle "'+v+'"'),!0}function Oe(e){let a=e.input.charCodeAt(e.position);if(a!==38)return!1;e.anchor!==null&&k(e,"duplication of an anchor property"),a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);return e.position===g&&k(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(g,e.position),!0}function Le(e){let a=e.input.charCodeAt(e.position);if(a!==42)return!1;a=e.input.charCodeAt(++e.position);const g=e.position;for(;a!==0&&!P(a)&&!X(a);)a=e.input.charCodeAt(++e.position);e.position===g&&k(e,"name of an alias node must contain at least one character");const v=e.input.slice(g,e.position);return t.call(e.anchorMap,v)||k(e,'unidentified alias "'+v+'"'),e.result=e.anchorMap[v],R(e,!0,-1),!0}function Ge(e,a,g,v){const h=de(e);return He(e),le(e,a),e.tag=null,e.anchor=null,e.kind=null,e.result=null,ke(e,g,v)&&e.kind==="mapping"?(ne(e),!0):(Be(e),le(e,h),!1)}function J(e,a,g,v,h){let S,r,p=1,T=!1,_=!1,b=null,x,A,E;e.depth>=e.maxDepth&&k(e,"nesting exceeded maxDepth ("+e.maxDepth+")"),e.depth+=1,e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null;const C=S=r=d===g||u===g;if(v&&R(e,!0,-1)&&(T=!0,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)),p===1)for(;;){const O=e.input.charCodeAt(e.position),L=de(e);if(T&&(O===33&&e.tag!==null||O===38&&e.anchor!==null)||!Ke(e)&&!Oe(e))break;b===null&&(b=L),R(e,!0,-1)?(T=!0,r=C,e.lineIndent>a?p=1:e.lineIndent===a?p=0:e.lineIndent<a&&(p=-1)):r=!1}if(r&&(r=T||h),p===1||d===g)if(s===g||l===g?A=a:A=a+1,E=e.position-e.lineStart,p===1)if(r&&(z(e,E)||ke(e,E,A))||Ce(e,A))_=!0;else{const O=e.input.charCodeAt(e.position);b!==null&&C&&!r&&O!==124&&O!==62&&Ge(e,b,b.position-b.lineStart,A)||S&&Ee(e,A)||we(e,A)||me(e,A)?_=!0:Le(e)?(_=!0,(e.tag!==null||e.anchor!==null)&&k(e,"alias node should not have any properties")):Se(e,A,s===g)&&(_=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&V(e,e.anchor,e.result)}else p===0&&(_=r&&z(e,E));if(e.tag===null)e.anchor!==null&&V(e,e.anchor,e.result);else if(e.tag==="?"){e.result!==null&&e.kind!=="scalar"&&k(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"');for(let O=0,L=e.implicitTypes.length;O<L;O+=1)if(x=e.implicitTypes[O],x.resolve(e.result)){e.result=x.construct(e.result),e.tag=x.tag,e.anchor!==null&&V(e,e.anchor,e.result);break}}else if(e.tag!=="!"){if(t.call(e.typeMap[e.kind||"fallback"],e.tag))x=e.typeMap[e.kind||"fallback"][e.tag];else{x=null;const O=e.typeMap.multi[e.kind||"fallback"];for(let L=0,N=O.length;L<N;L+=1)if(e.tag.slice(0,O[L].tag.length)===O[L].tag){x=O[L];break}}x||k(e,"unknown tag !<"+e.tag+">"),e.result!==null&&x.kind!==e.kind&&k(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+x.kind+'", not "'+e.kind+'"'),x.resolve(e.result,e.tag)?(e.result=x.construct(e.result,e.tag),e.anchor!==null&&V(e,e.anchor,e.result)):k(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.depth-=1,e.tag!==null||e.anchor!==null||_}function Ve(e){const a=e.position;let g=!1,v;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(v=e.input.charCodeAt(e.position))!==0&&(R(e,!0,-1),v=e.input.charCodeAt(e.position),!(e.lineIndent>0||v!==37));){g=!0,v=e.input.charCodeAt(++e.position);let h=e.position;for(;v!==0&&!P(v);)v=e.input.charCodeAt(++e.position);const S=e.input.slice(h,e.position),r=[];for(S.length<1&&k(e,"directive name must not be less than one character in length");v!==0;){for(;H(v);)v=e.input.charCodeAt(++e.position);if(v===35){do v=e.input.charCodeAt(++e.position);while(v!==0&&!U(v));break}if(U(v))break;for(h=e.position;v!==0&&!P(v);)v=e.input.charCodeAt(++e.position);r.push(e.input.slice(h,e.position))}v!==0&&ce(e),t.call(xe,S)?xe[S](e,S,r):oe(e,'unknown document directive "'+S+'"')}if(R(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,R(e,!0,-1)):g&&k(e,"directives end mark is expected"),J(e,e.lineIndent-1,d,!1,!0),R(e,!0,-1),e.checkLineBreaks&&I.test(e.input.slice(a,e.position))&&oe(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&se(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,R(e,!0,-1));return}e.position<e.length-1&&k(e,"end of the stream or a document separator is expected")}function Ie(e,a){e=String(e),a=a||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));const g=new F(e,a),v=e.indexOf("\0");for(v!==-1&&(g.position=v,k(g,"null byte is not allowed in input")),g.input+="\0";g.input.charCodeAt(g.position)===32;)g.lineIndent+=1,g.position+=1;for(;g.position<g.length-1;)Ve(g);return g.documents}function Ne(e,a,g){a!==null&&typeof a=="object"&&typeof g>"u"&&(g=a,a=null);const v=Ie(e,g);if(typeof a!="function")return v;for(let h=0,S=v.length;h<S;h+=1)a(v[h])}function We(e,a){const g=Ie(e,a);if(g.length!==0){if(g.length===1)return g[0];throw new i("expected a single document in the stream, but found more")}}return Me.loadAll=Ne,Me.load=We,Me}var _n={},Vn;function oi(){if(Vn)return _n;Vn=1;const n=be(),i=ve(),o=vn(),c=Object.prototype.toString,t=Object.prototype.hasOwnProperty,s=65279,l=9,u=10,d=13,f=32,m=33,y=34,w=35,I=37,$=38,M=39,q=42,K=44,U=45,H=58,P=61,X=62,De=63,Ye=64,ye=91,fe=93,Ue=96,ae=123,Ae=124,pe=125,F={};F[0]="\\0",F[7]="\\a",F[8]="\\b",F[9]="\\t",F[10]="\\n",F[11]="\\v",F[12]="\\f",F[13]="\\r",F[27]="\\e",F[34]='\\"',F[92]="\\\\",F[133]="\\N",F[160]="\\_",F[8232]="\\L",F[8233]="\\P";const Te=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],k=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function oe(r,p){if(p===null)return{};const T={},_=Object.keys(p);for(let b=0,x=_.length;b<x;b+=1){let A=_[b],E=String(p[A]);A.slice(0,2)==="!!"&&(A="tag:yaml.org,2002:"+A.slice(2));const C=r.compiledTypeMap.fallback[A];C&&t.call(C.styleAliases,E)&&(E=C.styleAliases[E]),T[A]=E}return T}function V(r){let p,T;const _=r.toString(16).toUpperCase();if(r<=255)p="x",T=2;else if(r<=65535)p="u",T=4;else if(r<=4294967295)p="U",T=8;else throw new i("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+p+n.repeat("0",T-_.length)+_}const He=1,ne=2;function Be(r){this.schema=r.schema||o,this.indent=Math.max(1,r.indent||2),this.noArrayIndent=r.noArrayIndent||!1,this.skipInvalid=r.skipInvalid||!1,this.flowLevel=n.isNothing(r.flowLevel)?-1:r.flowLevel,this.styleMap=oe(this.schema,r.styles||null),this.sortKeys=r.sortKeys||!1,this.lineWidth=r.lineWidth||80,this.noRefs=r.noRefs||!1,this.noCompatMode=r.noCompatMode||!1,this.condenseFlow=r.condenseFlow||!1,this.quotingType=r.quotingType==='"'?ne:He,this.forceQuotes=r.forceQuotes||!1,this.replacer=typeof r.replacer=="function"?r.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function de(r,p){const T=n.repeat(" ",p);let _=0,b="";const x=r.length;for(;_<x;){let A;const E=r.indexOf(`
`,_);E===-1?(A=r.slice(_),_=x):(A=r.slice(_,E+1),_=E+1),A.length&&A!==`
`&&(b+=T),b+=A}return b}function le(r,p){return`
`+n.repeat(" ",r.indent*p)}function xe(r,p){for(let T=0,_=r.implicitTypes.length;T<_;T+=1)if(r.implicitTypes[T].resolve(p))return!0;return!1}function B(r){return r===f||r===l}function Z(r){return r>=32&&r<=126||r>=161&&r<=55295&&r!==8232&&r!==8233||r>=57344&&r<=65533&&r!==s||r>=65536&&r<=1114111}function W(r){return Z(r)&&r!==s&&r!==d&&r!==u}function ce(r,p,T){const _=W(r),b=_&&!B(r);return(T?_:_&&r!==K&&r!==ye&&r!==fe&&r!==ae&&r!==pe)&&r!==w&&!(p===H&&!b)||W(p)&&!B(p)&&r===w||p===H&&b}function R(r){return Z(r)&&r!==s&&!B(r)&&r!==U&&r!==De&&r!==H&&r!==K&&r!==ye&&r!==fe&&r!==ae&&r!==pe&&r!==w&&r!==$&&r!==q&&r!==m&&r!==Ae&&r!==P&&r!==X&&r!==M&&r!==y&&r!==I&&r!==Ye&&r!==Ue}function se(r){return!B(r)&&r!==H}function Q(r,p){const T=r.charCodeAt(p);let _;return T>=55296&&T<=56319&&p+1<r.length&&(_=r.charCodeAt(p+1),_>=56320&&_<=57343)?(T-55296)*1024+_-56320+65536:T}function Se(r){return/^\n* /.test(r)}const we=1,me=2,Ce=3,Ee=4,z=5;function ke(r,p,T,_,b,x,A,E){let C,O=0,L=null,N=!1,j=!1;const Tn=_!==-1;let he=-1,ge=R(Q(r,0))&&se(Q(r,r.length-1));if(p||A)for(C=0;C<r.length;O>=65536?C+=2:C++){if(O=Q(r,C),!Z(O))return z;ge=ge&&ce(O,L,E),L=O}else{for(C=0;C<r.length;O>=65536?C+=2:C++){if(O=Q(r,C),O===u)N=!0,Tn&&(j=j||C-he-1>_&&r[he+1]!==" ",he=C);else if(!Z(O))return z;ge=ge&&ce(O,L,E),L=O}j=j||Tn&&C-he-1>_&&r[he+1]!==" "}return!N&&!j?ge&&!A&&!b(r)?we:x===ne?z:me:T>9&&Se(r)?z:A?x===ne?z:me:j?Ee:Ce}function Ke(r,p,T,_,b){r.dump=(function(){if(p.length===0)return r.quotingType===ne?'""':"''";if(!r.noCompatMode&&(Te.indexOf(p)!==-1||k.test(p)))return r.quotingType===ne?'"'+p+'"':"'"+p+"'";const x=r.indent*Math.max(1,T),A=r.lineWidth===-1?-1:Math.max(Math.min(r.lineWidth,40),r.lineWidth-x),E=_||r.flowLevel>-1&&T>=r.flowLevel;function C(O){return xe(r,O)}switch(ke(p,E,r.indent,A,C,r.quotingType,r.forceQuotes&&!_,b)){case we:return p;case me:return"'"+p.replace(/'/g,"''")+"'";case Ce:return"|"+Oe(p,r.indent)+Le(de(p,x));case Ee:return">"+Oe(p,r.indent)+Le(de(Ge(p,A),x));case z:return'"'+Ve(p)+'"';default:throw new i("impossible error: invalid scalar style")}})()}function Oe(r,p){const T=Se(r)?String(p):"",_=r[r.length-1]===`
`,x=_&&(r[r.length-2]===`
`||r===`
`)?"+":_?"":"-";return T+x+`
`}function Le(r){return r[r.length-1]===`
`?r.slice(0,-1):r}function Ge(r,p){const T=/(\n+)([^\n]*)/g;let _=(function(){let E=r.indexOf(`
`);return E=E!==-1?E:r.length,T.lastIndex=E,J(r.slice(0,E),p)})(),b=r[0]===`
`||r[0]===" ",x,A;for(;A=T.exec(r);){const E=A[1],C=A[2];x=C[0]===" ",_+=E+(!b&&!x&&C!==""?`
`:"")+J(C,p),b=x}return _}function J(r,p){if(r===""||r[0]===" ")return r;const T=/ [^ ]/g;let _,b=0,x,A=0,E=0,C="";for(;_=T.exec(r);)E=_.index,E-b>p&&(x=A>b?A:E,C+=`
`+r.slice(b,x),b=x+1),A=E;return C+=`
`,r.length-b>p&&A>b?C+=r.slice(b,A)+`
`+r.slice(A+1):C+=r.slice(b),C.slice(1)}function Ve(r){let p="",T=0;for(let _=0;_<r.length;T>=65536?_+=2:_++){T=Q(r,_);const b=F[T];!b&&Z(T)?(p+=r[_],T>=65536&&(p+=r[_+1])):p+=b||V(T)}return p}function Ie(r,p,T){let _="";const b=r.tag;for(let x=0,A=T.length;x<A;x+=1){let E=T[x];r.replacer&&(E=r.replacer.call(T,String(x),E)),(g(r,p,E,!1,!1)||typeof E>"u"&&g(r,p,null,!1,!1))&&(_!==""&&(_+=","+(r.condenseFlow?"":" ")),_+=r.dump)}r.tag=b,r.dump="["+_+"]"}function Ne(r,p,T,_){let b="";const x=r.tag;for(let A=0,E=T.length;A<E;A+=1){let C=T[A];r.replacer&&(C=r.replacer.call(T,String(A),C)),(g(r,p+1,C,!0,!0,!1,!0)||typeof C>"u"&&g(r,p+1,null,!0,!0,!1,!0))&&((!_||b!=="")&&(b+=le(r,p)),r.dump&&u===r.dump.charCodeAt(0)?b+="-":b+="- ",b+=r.dump)}r.tag=x,r.dump=b||"[]"}function We(r,p,T){let _="";const b=r.tag,x=Object.keys(T);for(let A=0,E=x.length;A<E;A+=1){let C="";_!==""&&(C+=", "),r.condenseFlow&&(C+='"');const O=x[A];let L=T[O];r.replacer&&(L=r.replacer.call(T,O,L)),g(r,p,O,!1,!1)&&(r.dump.length>1024&&(C+="? "),C+=r.dump+(r.condenseFlow?'"':"")+":"+(r.condenseFlow?"":" "),g(r,p,L,!1,!1)&&(C+=r.dump,_+=C))}r.tag=b,r.dump="{"+_+"}"}function e(r,p,T,_){let b="";const x=r.tag,A=Object.keys(T);if(r.sortKeys===!0)A.sort();else if(typeof r.sortKeys=="function")A.sort(r.sortKeys);else if(r.sortKeys)throw new i("sortKeys must be a boolean or a function");for(let E=0,C=A.length;E<C;E+=1){let O="";(!_||b!=="")&&(O+=le(r,p));const L=A[E];let N=T[L];if(r.replacer&&(N=r.replacer.call(T,L,N)),!g(r,p+1,L,!0,!0,!0))continue;const j=r.tag!==null&&r.tag!=="?"||r.dump&&r.dump.length>1024;j&&(r.dump&&u===r.dump.charCodeAt(0)?O+="?":O+="? "),O+=r.dump,j&&(O+=le(r,p)),g(r,p+1,N,!0,j)&&(r.dump&&u===r.dump.charCodeAt(0)?O+=":":O+=": ",O+=r.dump,b+=O)}r.tag=x,r.dump=b||"{}"}function a(r,p,T){const _=T?r.explicitTypes:r.implicitTypes;for(let b=0,x=_.length;b<x;b+=1){const A=_[b];if((A.instanceOf||A.predicate)&&(!A.instanceOf||typeof p=="object"&&p instanceof A.instanceOf)&&(!A.predicate||A.predicate(p))){if(T?A.multi&&A.representName?r.tag=A.representName(p):r.tag=A.tag:r.tag="?",A.represent){const E=r.styleMap[A.tag]||A.defaultStyle;let C;if(c.call(A.represent)==="[object Function]")C=A.represent(p,E);else if(t.call(A.represent,E))C=A.represent[E](p,E);else throw new i("!<"+A.tag+'> tag resolver accepts not "'+E+'" style');r.dump=C}return!0}}return!1}function g(r,p,T,_,b,x,A){r.tag=null,r.dump=T,a(r,T,!1)||a(r,T,!0);const E=c.call(r.dump),C=_;_&&(_=r.flowLevel<0||r.flowLevel>p);const O=E==="[object Object]"||E==="[object Array]";let L,N;if(O&&(L=r.duplicates.indexOf(T),N=L!==-1),(r.tag!==null&&r.tag!=="?"||N||r.indent!==2&&p>0)&&(b=!1),N&&r.usedDuplicates[L])r.dump="*ref_"+L;else{if(O&&N&&!r.usedDuplicates[L]&&(r.usedDuplicates[L]=!0),E==="[object Object]")_&&Object.keys(r.dump).length!==0?(e(r,p,r.dump,b),N&&(r.dump="&ref_"+L+r.dump)):(We(r,p,r.dump),N&&(r.dump="&ref_"+L+" "+r.dump));else if(E==="[object Array]")_&&r.dump.length!==0?(r.noArrayIndent&&!A&&p>0?Ne(r,p-1,r.dump,b):Ne(r,p,r.dump,b),N&&(r.dump="&ref_"+L+r.dump)):(Ie(r,p,r.dump),N&&(r.dump="&ref_"+L+" "+r.dump));else if(E==="[object String]")r.tag!=="?"&&Ke(r,r.dump,p,x,C);else{if(E==="[object Undefined]")return!1;if(r.skipInvalid)return!1;throw new i("unacceptable kind of an object to dump "+E)}if(r.tag!==null&&r.tag!=="?"){let j=encodeURI(r.tag[0]==="!"?r.tag.slice(1):r.tag).replace(/!/g,"%21");r.tag[0]==="!"?j="!"+j:j.slice(0,18)==="tag:yaml.org,2002:"?j="!!"+j.slice(18):j="!<"+j+">",r.dump=j+" "+r.dump}}return!0}function v(r,p){const T=[],_=[];h(r,T,_);const b=_.length;for(let x=0;x<b;x+=1)p.duplicates.push(T[_[x]]);p.usedDuplicates=new Array(b)}function h(r,p,T){if(r!==null&&typeof r=="object"){const _=p.indexOf(r);if(_!==-1)T.indexOf(_)===-1&&T.push(_);else if(p.push(r),Array.isArray(r))for(let b=0,x=r.length;b<x;b+=1)h(r[b],p,T);else{const b=Object.keys(r);for(let x=0,A=b.length;x<A;x+=1)h(r[b[x]],p,T)}}}function S(r,p){p=p||{};const T=new Be(p);T.noRefs||v(r,T);let _=r;return T.replacer&&(_=T.replacer.call({"":_},"",_)),g(T,0,_,!0,!0)?T.dump+`
`:""}return _n.dump=S,_n}var Wn;function li(){if(Wn)return D;Wn=1;const n=ti(),i=oi();function o(c,t){return function(){throw new Error("Function yaml."+c+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}return D.Type=Y(),D.Schema=er(),D.FAILSAFE_SCHEMA=tr(),D.JSON_SCHEMA=ur(),D.CORE_SCHEMA=fr(),D.DEFAULT_SCHEMA=vn(),D.load=n.load,D.loadAll=n.loadAll,D.dump=i.dump,D.YAMLException=ve(),D.types={binary:dr(),float:sr(),map:ir(),null:or(),pairs:hr(),set:gr(),timestamp:ar(),bool:lr(),int:cr(),merge:pr(),omap:mr(),seq:rr(),str:nr()},D.safeLoad=o("safeLoad","load"),D.safeLoadAll=o("safeLoadAll","loadAll"),D.safeDump=o("safeDump","dump"),D}var ci=li();const Pe=ri(ci),{Type:ft,Schema:at,FAILSAFE_SCHEMA:pt,JSON_SCHEMA:dt,CORE_SCHEMA:mt,DEFAULT_SCHEMA:ht,load:gt,loadAll:_t,dump:bt,YAMLException:vt,types:yt,safeLoad:At,safeLoadAll:Tt,safeDump:xt}=Pe,si="netlab-internal",_e=`${si}:_linkname`;function Qn(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)}function G(n,i){const o=new Set(Array.isArray(n._removed_attr)?n._removed_attr:[]),c={...n};for(const[t,s]of Object.entries(i)){if(t==="_removed_attr"){const u=Array.isArray(s)?s:[];c._removed_attr=[...o,...u.filter(d=>!o.has(d))];continue}if(o.has(t))continue;const l=c[t];Qn(l)&&Qn(s)?c[t]=G(l,s):c[t]=ui(s)}return c}function ui(n){return structuredClone(n)}function Re(n){return n!==null&&typeof n=="object"&&!Array.isArray(n)}function $e(n){if(Array.isArray(n))return n.map(o=>$e(o));if(!Re(n))return n;const i={};for(const[o,c]of Object.entries(n))fi(i,o,$e(c));return i}function fi(n,i,o){if(!i.includes(".")){zn(n,i,o);return}const c=i.split(".");let t=n;for(let s=0;s<c.length-1;s++){const l=c[s],u=t[l];(u==null||!Re(u))&&(t[l]={}),t=t[l]}zn(t,c[c.length-1],o)}function zn(n,i,o){const c=n[i];Re(c)&&Re(o)?n[i]=G(c,o):n[i]=o}function ai(n){const i=$e(n);for(const o of Object.keys(n))delete n[o];Object.assign(n,i)}class pi{constructor(){xn(this,"items",[])}error(i){this.items.push({...i,severity:"error"})}warning(i){this.items.push({...i,severity:"warning"})}hasErrors(){return this.items.some(i=>i.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function di(){return{device:"frr",provider:"clab",addressing:{loopback:{ipv4:"10.0.0.0/24"},router_id:{ipv4:"10.0.0.0/24",prefix:32},lan:{ipv4:"172.16.0.0/16"},p2p:{ipv4:"10.1.0.0/16"},mgmt:{ipv4:"192.168.121.0/24",start:100,mac:"CA-FE-00-00-00-00"},vrf_loopback:{ipv4:"10.2.0.0/24",prefix:32},l2only:{}},ospf:{area:"0.0.0.0"},bgp:{},isis:{type:"level-2"}}}function mi(n){const i=Pe.load(n);if(!i||typeof i!="object"||Array.isArray(i))throw new Error("Topology must be a YAML/JSON object");return $e(i)}function hi(n,i={}){const o=mi(n);return _r(o,i)}function _r(n,i={}){ai(n);const o=G(di(),i.defaults??{}),c=n.defaults??{};n.defaults=G(o,c),n.provider||(n.provider="clab"),n.name||(n.name=i.name??"topology");const t=n.defaults.addressing??{};return n.addressing=G(t,n.addressing??{}),n}const gi={none:`---
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
`},_i=new Set(["none","linux","frr","bird"]);let bn;function br(){if(bn)return bn;const n={};for(const i of _i){const o=gi[i];if(!o)continue;const c=Pe.load(o);n[i]={...c,name:i}}n.bird&&n.linux&&(n.bird=G(n.linux,{...n.bird,daemon:!0,parent:"linux"}));for(const i of Object.values(n)){if(i.clab&&typeof i.clab=="object"){const o=i.clab;o.features&&(i.features=G(i.features??{},o.features))}delete i.libvirt,delete i.virtualbox,delete i.external}return bn=n,n}function yn(n){return br()[n]??{name:n,interface_name:"eth{ifindex}",role:"router"}}function bi(n,i){let o;if(n&&typeof n=="object"&&!Array.isArray(n))o={...n};else{o={};for(const c of n??[])if(typeof c=="string")o[c]={name:c};else if(c&&typeof c=="object"&&!Array.isArray(c)){const t=c;if(!t.name){i==null||i.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(c)}`});continue}o[t.name]=t}}for(const c of Object.keys(o)){let t=o[c];t==null?t={name:c}:typeof t!="object"||Array.isArray(t)?(i==null||i.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${c} must be a dictionary`}),t={name:c,extra:t}):t={...t,name:c},Array.isArray(t.interfaces)||(t.interfaces=[]),o[c]=t}return o}function vi(n){const i=new Set;for(const c of Object.values(n.nodes??{}))typeof c.id=="number"&&i.add(c.id);let o=1;for(const c of Object.values(n.nodes??{}))if(typeof c.id!="number"){for(;i.has(o);)o++;c.id=o,i.add(o),o++}}function yi(n,i){var c;const o=String(((c=n.defaults)==null?void 0:c.device)??"frr");for(const t of Object.values(n.nodes??{})){t.device||(t.device=o);const s=t.device;if(!["none","linux","frr","bird"].includes(s)){i==null||i.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${s}' on node ${t.name} (allowed: none, linux, frr, bird)`,path:`nodes.${t.name}.device`});continue}const l=yn(s);t.role||(t.role=String(l.role??"router")),l.daemon&&(t["netlab-internal:_daemon"]=!0,l.parent&&(t["netlab-internal:_daemon_parent"]=l.parent))}}function Ai(n){var l,u;vi(n);const i=((l=n.addressing)==null?void 0:l.mgmt)??{},o=((u=n.addressing)==null?void 0:u.loopback)??{},c=String(i.ipv4??"192.168.121.0/24"),t=Number(i.start??100),s=String(o.ipv4??"10.0.0.0/24");for(const d of Object.values(n.nodes??{})){const f=d.id??1,m=yn(String(d.device??"frr"));if(d.mgmt={ifname:String(m.mgmt_if??"eth0"),ipv4:Ti(c,t+f),mac:Si(String(i.mac??"CA-FE-00-00-00-00"),f)},d.role==="router"||d.role==="gateway"||!d.role){const y=vr(String(m.loopback_interface_name??"lo{ifindex}"),0);d.loopback={ifindex:0,ifname:y||"lo",type:"loopback",virtual_interface:!0,ipv4:`${yr(s,f)}/32`}}d.af=d.af??{},d.af.ipv4=!0}}function vr(n,i){return n.includes("if ifindex else")?i?n.replace(/\{ifindex if ifindex else ""\}/g,String(i)):n.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):n.replace(/\{ifindex\}/g,String(i))}function Ti(n,i){return yr(n,i)}function yr(n,i){const[o,,]=xi(n),c=(o&4294967295)+i;return[c>>>24&255,c>>>16&255,c>>>8&255,c&255].join(".")}function xi(n){const[i,o]=n.split("/"),c=(i??"0.0.0.0").split(".").map(u=>Number(u)),t=(c[0]<<24>>>0)+(c[1]<<16>>>0)+(c[2]<<8>>>0)+(c[3]>>>0),s=Number(o??32),l=s===0?0:-1<<32-s>>>0;return[t&l,s]}function Si(n,i){const o=i.toString(16).padStart(4,"0");return n.replace(/00-00$/,`${o.slice(0,2)}-${o.slice(2)}`)}const Fe={};function wi(){for(const n of Object.keys(Fe))delete Fe[n]}function Ci(n){wi();const i=n.addressing??{};n.addressing=i,n.pools={...i}}function Ei(n,i){var u;if(i.prefix&&typeof i.prefix=="object")return;const o=i.type==="p2p"?"p2p":"lan",t=(((u=n.addressing)==null?void 0:u[o])??{}).ipv4;if(typeof t!="string"){i.prefix={};return}const s=i.type==="p2p"?30:24,l=Oi(t,s,o);i.prefix={ipv4:Li(l.base,l.plen)}}function ki(n,i){const c=(i.prefix??{}).ipv4;if(typeof c!="string")return;const t=Ar(c),s=[...i.interfaces??[]].sort((d,f)=>String(d.node).localeCompare(String(f.node)));if(i.type==="p2p"&&s.length===2){s[0].ipv4=`${je(t,1)}/${t.plen}`,s[1].ipv4=`${je(t,2)}/${t.plen}`;for(const d of i.interfaces??[]){const f=s.find(m=>m.node===d.node);f&&(d.ipv4=f.ipv4)}return}const l=n.nodes??{};let u=1;for(const d of i.interfaces??[]){if(d.ipv4!==void 0&&d.ipv4!==null)continue;const f=l[d.node],m=f==null?void 0:f.id;typeof m=="number"&&m>0&&m<2**(32-t.plen)-1?d.ipv4=`${je(t,m)}/${t.plen}`:(d.ipv4=`${je(t,u)}/${t.plen}`,u++)}}function Oi(n,i,o){const c=Ar(n),t=2**(32-i),s=Fe[o]??0;return Fe[o]=s+1,{base:c.base+s*t>>>0,plen:i}}function Ar(n){const[i,o]=n.split("/"),c=(i??"0.0.0.0").split(".").map(Number);return{base:(c[0]<<24>>>0)+(c[1]<<16>>>0)+(c[2]<<8>>>0)+(c[3]>>>0),plen:Number(o??32)}}function je(n,i){const o=n.base+i>>>0;return[o>>>24&255,o>>>16&255,o>>>8&255,o&255].join(".")}function Li(n,i){return`${[n>>>24&255,n>>>16&255,n>>>8&255,n&255].join(".")}/${i}`}function Tr(n,i){const o=n.nodes??{},c=n.links;if(!c)return[];const t=Array.isArray(c)?c:[],s=[];let l=0;for(const u of t){l++;const d=`links[${l}]`,f=Ii(u,d,o,i);f&&f.disable!==!0&&(f.linkindex=l,f[_e]=d,delete f._linkname,s.push(f))}return n.links=s,s}function Ii(n,i,o,c){if(typeof n=="string"){const t=[];for(const s of n.split("-")){const l=s.trim();o[l]?t.push({node:l}):c==null||c.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${n} in ${i} refers to an unknown node ${l}`})}return{interfaces:t,[_e]:i}}if(Array.isArray(n))return{interfaces:Jn(n,o,c,i),[_e]:i};if(n&&typeof n=="object"){const t={...n};if(Array.isArray(t.interfaces))return t.interfaces=Jn(t.interfaces,o,c,i),t[_e]=i,t;const s={[_e]:i},l=[];for(const[u,d]of Object.entries(t))if(u in o){const f=d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:u}:{node:u};l.push(f)}else s[u]=d;return s.interfaces=l,s}return c==null||c.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof n} for ${i}`}),null}function Jn(n,i,o,c){const t=[];for(const s of n)if(typeof s=="string"){if(!i[s]){o==null||o.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${c} refers to unknown node ${s}`});continue}t.push({node:s})}else if(s&&typeof s=="object"&&!Array.isArray(s)){const l=s;if(!l.node||!i[l.node]){o==null||o.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${c} missing/unknown node`});continue}t.push(l)}return t}function Ni(n){const i=n.nodes??{};for(const o of n.links??[]){const c=o.interfaces??[],t=c.length;o.type||(o.type=t===2?"p2p":"lan"),o.type==="lan"&&!o.bridge&&(o.bridge=`${n.name??"lab"}_${o.linkindex??1}`),Ei(n,o),ki(n,o);for(const s of c){const l=i[s.node];if(!l)continue;const u=yn(String(l.device??"frr")),d=Mi(l),f=vr(String(u.interface_name??"eth{ifindex}"),d);s.ifindex=d,s.ifname=f;const m=c.filter(w=>w.node!==s.node).map(w=>{const I={node:w.node??""};return w.ifname!==void 0&&(I.ifname=w.ifname),w.ipv4!==void 0&&(I.ipv4=w.ipv4),w.ipv6!==void 0&&(I.ipv6=w.ipv6),I}),y={ifindex:d,ifname:f,type:o.type??"p2p",neighbors:m};s.ipv4!==void 0&&(y.ipv4=s.ipv4),s.ipv6!==void 0&&(y.ipv6=s.ipv6),o.linkindex!==void 0&&(y.linkindex=o.linkindex),o.ospf&&(y.ospf={...o.ospf}),o.vlan&&(y.vlan={...o.vlan}),o.isis&&(y.isis={...o.isis}),l.interfaces=l.interfaces??[],l.interfaces.push(y)}}}function Mi(n){const i=(n.interfaces??[]).map(c=>c.ifindex??0);let o=1;for(;i.includes(o);)o++;return o}function ji(n){if(n.groups||(n.groups={}),Array.isArray(n.groups)){const i={};for(const o of n.groups)o.name&&(i[String(o.name)]=o);n.groups=i}}function Ri(n){const i=n.groups??{},o=n.nodes??{};for(const[,c]of Object.entries(i)){const t=c.members??[];for(const s of t){const l=o[s];if(l){if(c.device&&!l.device&&(l.device=c.device),Array.isArray(c.module)){const u=new Set(l.module??[]);for(const d of c.module)u.add(d);l.module=[...u]}if(c.node_data&&typeof c.node_data=="object"){const u=G(c.node_data,l);Object.assign(l,u)}}}}}function $i(n){const i=n.components;if(!i||typeof i!="object")return;const o=n.nodes??{},c={},t=[],s=[];for(const[l,u]of Object.entries(o)){const d=u.include;if(typeof d!="string")continue;const f=i[d];if(!f)continue;t.push(l);const m=l,y=f.nodes??{};for(const[I,$]of Object.entries(y)){const M=`${m}_${I}`;c[M]={...$,name:M}}const w=f.links??[];for(const I of w)s.push(Fi(I,m,Object.keys(y)))}for(const l of t)delete o[l];Object.assign(o,c),n.nodes=o,n.links=[...n.links??[],...s],delete n.components,Tr(n)}function Fi(n,i,o){const c=t=>o.includes(t)?`${i}_${t}`:t;if(Array.isArray(n))return{interfaces:n.map(t=>({node:c(String(t))}))};if(n&&typeof n=="object"){const t={...n};if(Array.isArray(t.interfaces))return t.interfaces=t.interfaces.map(u=>({...u,node:c(String(u.node??""))})),t;const s={interfaces:[]},l=[];for(const[u,d]of Object.entries(t))o.includes(u)?l.push(d&&typeof d=="object"&&!Array.isArray(d)?{...d,node:c(u)}:{node:c(u)}):s[u]=d;return s.interfaces=l,s}return{interfaces:[]}}const xr="vlan",Sr=[],wr=[];function Cr(n,i){const o=n.vlans;if(!o||typeof o!="object")return;let c=1;for(const[t,s]of Object.entries(o)){const l=s??{};if(l.id===void 0){for(;Object.values(o).some(u=>(u==null?void 0:u.id)===c);)c++;l.id=c++}o[t]=l}}function Er(n,i,o){var t;const c=n.vlan;if(c&&typeof c.access=="string"){const s=(t=i.vlans)==null?void 0:t[c.access];s&&c.access_id===void 0&&(c.access_id=s.id)}}const qi={name:xr,transform_after:Sr,requires:wr,module_pre_transform:Cr,link_pre_transform:Er},Pi=Object.freeze(Object.defineProperty({__proto__:null,default:qi,link_pre_transform:Er,module_pre_transform:Cr,name:xr,requires:wr,transform_after:Sr},Symbol.toStringTag,{value:"Module"})),kr="vrf",Or=["vlan"],Lr=[];function Ir(n,i){const o=n.vrfs;if(!o||typeof o!="object")return;let c=1;for(const[t,s]of Object.entries(o)){const l=s??{};l.rd||(l.rd=`1:${c}`),l.import||(l.import=[String(l.rd)]),l.export||(l.export=[String(l.rd)]),o[t]=l,c++}}function Nr(n,i,o){const c=i.vrfs;if(!c)return;const t=new Set((n.interfaces??[]).map(l=>l.vrf).filter(l=>typeof l=="string"));if(!t.size)return;const s={...n.vrfs??{}};for(const l of t)!s[l]&&c[l]&&(s[l]={...c[l]});n.vrfs=s}const Di={name:kr,transform_after:Or,requires:Lr,module_pre_transform:Ir,node_post_transform:Nr},Yi=Object.freeze(Object.defineProperty({__proto__:null,default:Di,module_pre_transform:Ir,name:kr,node_post_transform:Nr,requires:Lr,transform_after:Or},Symbol.toStringTag,{value:"Module"})),Mr="ospf",jr=["vlan","vrf"],Rr=[];function $r(n,i){n.ospf||(n.ospf={area:"0.0.0.0"})}function Fr(n,i,o){var l;const c=n.ospf??{},t=i.ospf??{};if(c.area===void 0&&(c.area=t.area??"0.0.0.0"),!c.router_id){const u=n.loopback,d=typeof(u==null?void 0:u.ipv4)=="string"?u.ipv4.split("/")[0]:void 0;c.router_id=d??`10.0.0.${n.id??1}`}const s=(n.interfaces??[]).some(u=>u.ipv4)||!!((l=n.loopback)!=null&&l.ipv4);c.af={ipv4:s,ipv6:!1};for(const u of n.interfaces??[]){const d=u.ospf??{};d.area===void 0&&(d.area=c.area),!d.network_type&&u.type==="p2p"&&(d.network_type="point-to-point"),u.ospf=d}n.ospf=c}const Ui={name:Mr,transform_after:jr,requires:Rr,module_init:$r,node_post_transform:Fr},Hi=Object.freeze(Object.defineProperty({__proto__:null,default:Ui,module_init:$r,name:Mr,node_post_transform:Fr,requires:Rr,transform_after:jr},Symbol.toStringTag,{value:"Module"})),qr="isis",Pr=["vlan","vrf"],Dr=[];function Yr(n,i){n.isis||(n.isis={type:"level-2"})}function Ur(n,i,o){const c=n.isis??{},t=i.isis??{};if(c.area||(c.area=t.area??"49.0001"),c.type||(c.type=t.type??"level-2"),!c.net){const s=(n.id??1).toString(16).padStart(4,"0");c.net=`${c.area}.0000.0000.${s}.00`}for(const s of n.interfaces??[]){const l=s.isis??{};!l.network_type&&s.type==="p2p"&&(l.network_type="point-to-point"),s.isis=l}n.isis=c}const Bi={name:qr,transform_after:Pr,requires:Dr,module_init:Yr,node_post_transform:Ur},Ki=Object.freeze(Object.defineProperty({__proto__:null,default:Bi,module_init:Yr,name:qr,node_post_transform:Ur,requires:Dr,transform_after:Pr},Symbol.toStringTag,{value:"Module"})),Hr="bgp",Br=["vlan","vrf","ospf","isis"],Kr=[];function Gr(n,i){n.bgp||(n.bgp={})}function Vr(n,i,o){const c=n.bgp??{},t=i.bgp??{};c.as===void 0&&t.as!==void 0&&(c.as=t.as),c.as===void 0&&o.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${n.name} is missing bgp.as`,path:`nodes.${n.name}.bgp.as`}),n.bgp=c}function Wr(n,i,o){var s;const c=n.bgp??{};if(!c.router_id){const l=n.loopback;c.router_id=typeof(l==null?void 0:l.ipv4)=="string"?l.ipv4.split("/")[0]:`10.0.0.${n.id??1}`}const t=[];for(const l of n.interfaces??[])for(const u of l.neighbors??[]){const d=(s=i.nodes)==null?void 0:s[u.node];if(!d||!(d.module??[]).includes("bgp"))continue;const f=d.bgp??{},m=Number(c.as),y=Number(f.as),w={name:u.node??"",as:y,type:m===y?"ibgp":"ebgp"};typeof u.ipv4=="string"?w.ipv4=u.ipv4.split("/")[0]:typeof u.ipv4=="boolean"&&(w.ipv4=u.ipv4),t.push(w)}c.neighbor=t,n.bgp=c}const Gi={name:Hr,transform_after:Br,requires:Kr,module_init:Gr,node_pre_transform:Vr,node_post_transform:Wr},Vi=Object.freeze(Object.defineProperty({__proto__:null,default:Gi,module_init:Gr,name:Hr,node_post_transform:Wr,node_pre_transform:Vr,requires:Kr,transform_after:Br},Symbol.toStringTag,{value:"Module"}));const Qr=[Pi,Yi,Hi,Ki,Vi];function Wi(n){const i=new Map(Qr.map(l=>[l.name,l])),o=[],c=new Set,t=new Set;function s(l){if(t.has(l)||c.has(l))return;c.add(l);const u=i.get(l);for(const d of[...(u==null?void 0:u.requires)??[],...(u==null?void 0:u.transform_after)??[]])n.includes(d)&&s(d);c.delete(l),t.add(l),o.push(l)}for(const l of n)s(l);return o}function An(n){const i=new Set(n.module??[]);for(const o of Object.values(n.nodes??{}))for(const c of o.module??[])i.add(c);return Wi([...i])}function Qi(n){const i=n.defaults??{};for(const o of An(n)){const c=i[o]??{},t=n[o]??{};n[o]=G(c,t);for(const s of Object.values(n.nodes??{})){if(!(s.module??[]).includes(o))continue;const l=s[o]??{};s[o]=G(n[o],l)}}}function re(n,i,o){const c=An(i);for(const t of c){const s=Qr.find(u=>u.name===t);if(!s)continue;const l=s[n];if(typeof l=="function")if(n.startsWith("node_"))for(const u of Object.values(i.nodes??{}))(u.module??[]).includes(t)&&l(u,i,o);else if(n.startsWith("link_"))for(const u of i.links??[])l(u,i,o);else l(i,o)}}function zi(n){const i={ospf:["area","passive","network_type","cost"],isis:["network_type","metric","passive"]};for(const o of Object.values(n.nodes??{}))for(const[c,t]of Object.entries(i)){if(!(o.module??[]).includes(c))continue;const s=o[c]??{};for(const l of o.interfaces??[]){const u=l[c]??{};for(const d of t)u[d]===void 0&&s[d]!==void 0&&(u[d]=s[d]);l[c]=u}}}function Ji(n,i){n.provider||(n.provider="clab"),n.provider!=="clab"&&i.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${n.provider}' (only clab is supported)`,path:"provider"})}function Xi(n,i){n.provider||(n.provider="clab")}function Zi(n){for(const i of Object.values(n.nodes??{}))i.device==="bird"&&nt(i)}function et(n){return`(rt,${n.split(":").join(",")})`}function nt(n){const i=n.vrfs;if(i)for(const o of Object.values(i))for(const c of["import","export"]){const t=o[c];Array.isArray(t)&&(o[`netlab-internal:_bird_${c}`]=t.map(s=>typeof s=="string"?et(s):s))}}function rt(n,i={}){var s,l,u;const o=new pi,c=br(),t={diagnostics:o,devices:c};if(_r(n),Ji(n,t),n.nodes=bi(n.nodes,o),ji(n),$i(n),Tr(n,o),Ri(n),yi(n,o),Array.isArray(n.module))for(const d of Object.values(n.nodes)){if(d.role==="host"&&!d["netlab-internal:_daemon"])continue;const f=new Set([...d.module??[],...n.module]);d.module=[...f]}return Qi(n),re("module_init",n,t),Ci(n),(s=i.afterSetup)==null||s.call(i,n,t),re("module_pre_transform",n,t),re("node_pre_transform",n,t),Ai(n),re("link_pre_transform",n,t),Ni(n),re("link_post_transform",n,t),re("node_post_transform",n,t),zi(n),re("module_post_transform",n,t),(l=i.afterAddressed)==null||l.call(i,n,t),Zi(n),Xi(n),n.module=An(n),(u=i.afterTransformed)==null||u.call(i,n,t),{topology:n,diagnostics:o,ctx:t}}function it(n,i={}){const{topology:o,diagnostics:c}=rt(n);return{topology:o,diagnostics:c,stages:{}}}const tt=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;function ot(n){const i=new Date(n);if(Number.isNaN(i.getTime()))return n;const o=c=>String(c).padStart(2,"0");return`${i.getUTCFullYear()}-${o(i.getUTCMonth()+1)}-${o(i.getUTCDate())} ${o(i.getUTCHours())}:${o(i.getUTCMinutes())}:${o(i.getUTCSeconds())} UTC`}const te=document.querySelector("#app");te.innerHTML=`
  <header>
    <p class="build-time" title="Build timestamp">Built ${ot("2026-07-16T19:18:18.701Z")}</p>
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
`;const ie=te.querySelector("#src"),Xn=te.querySelector("#out"),ue=te.querySelector("#status"),qe=te.querySelector("#errors"),zr=te.querySelector("#graph"),lt=te.querySelector("#run");ie.value=tt;function Jr(){ie.style.height="auto",ie.style.height=`${ie.scrollHeight}px`}function Xr(){qe.hidden=!0,qe.innerHTML="",ue.classList.remove("is-error")}function Zn(n){if(!n.length){Xr();return}ue.classList.add("is-error"),qe.hidden=!1,qe.innerHTML=`
    <h2>Transform errors</h2>
    <ul>
      ${n.map(i=>`<li>${ct(i)}</li>`).join("")}
    </ul>
  `}function ct(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function st(n){const i=Object.keys(n.nodes??{}),o=n.links??[],c=640,t=360,s=c/2,l=t/2,u=Math.min(c,t)*.32,d=new Map;i.forEach((y,w)=>{const I=2*Math.PI*w/Math.max(i.length,1)-Math.PI/2;d.set(y,{x:s+u*Math.cos(I),y:l+u*Math.sin(I)})});const f=o.flatMap(y=>{const w=y.interfaces??[];if(w.length<2)return[];const I=[];for(let $=0;$<w.length;$++)for(let M=$+1;M<w.length;M++){const q=d.get(String(w[$].node)),K=d.get(String(w[M].node));!q||!K||I.push(`<line x1="${q.x}" y1="${q.y}" x2="${K.x}" y2="${K.y}" class="edge"/>`)}return I}).join(""),m=i.map(y=>{var $,M;const w=d.get(y),I=String(((M=($=n.nodes)==null?void 0:$[y])==null?void 0:M.device)??"");return`
        <g class="node">
          <circle cx="${w.x}" cy="${w.y}" r="28"/>
          <text x="${w.x}" y="${w.y-2}" text-anchor="middle">${y}</text>
          <text x="${w.x}" y="${w.y+14}" text-anchor="middle" class="sub">${I}</text>
        </g>`}).join("");zr.innerHTML=`${f}${m}`}function Zr(){ue.textContent="Running…",Xr();try{const n=Pe.load(ie.value);if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Topology must be a YAML object");const i=hi(ie.value),{topology:o,diagnostics:c,stages:t}=it(i,{validate:!1});Xn.textContent=JSON.stringify(o,null,2),st(o);const s=c.list().filter(l=>l.severity==="error");s.length?(ue.textContent=`${s.length} error(s); stages: ${JSON.stringify(t)}`,Zn(s.map(l=>{const u=l.path?` (${l.path})`:"";return`[${l.module}/${l.code}] ${l.message}${u}`}))):ue.textContent=`OK — stages: ${JSON.stringify(t)}`}catch(n){const i=n instanceof Error?n.message:String(n);ue.textContent="Transform failed",Zn([i]),Xn.textContent="",zr.innerHTML=""}}ie.addEventListener("input",Jr);lt.addEventListener("click",Zr);Jr();Zr();
