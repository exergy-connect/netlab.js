var pa=Object.defineProperty;var fa=(e,n,t)=>n in e?pa(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var h=(e,n,t)=>fa(e,typeof n!="symbol"?n+"":n,t);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();function ma(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var G={},Tn={},le={},Wt;function cn(){if(Wt)return le;Wt=1;function e(o){return typeof o>"u"||o===null}function n(o){return typeof o=="object"&&o!==null}function t(o){return Array.isArray(o)?o:e(o)?[]:[o]}function r(o,c){if(c){const l=Object.keys(c);for(let p=0,f=l.length;p<f;p+=1){const m=l[p];o[m]=c[m]}}return o}function i(o,c){let l="";for(let p=0;p<c;p+=1)l+=o;return l}function a(o){return o===0&&Number.NEGATIVE_INFINITY===1/o}return le.isNothing=e,le.isObject=n,le.toArray=t,le.repeat=i,le.isNegativeZero=a,le.extend=r,le}var at,Jt;function ln(){if(Jt)return at;Jt=1;function e(t,r){let i="";const a=t.reason||"(unknown reason)";return t.mark?(t.mark.name&&(i+='in "'+t.mark.name+'" '),i+="("+(t.mark.line+1)+":"+(t.mark.column+1)+")",!r&&t.mark.snippet&&(i+=`

`+t.mark.snippet),a+" "+i):a}function n(t,r){Error.call(this),this.name="YAMLException",this.reason=t,this.mark=r,this.message=e(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}return n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,n.prototype.toString=function(r){return this.name+": "+e(this,r)},at=n,at}var ot,Xt;function da(){if(Xt)return ot;Xt=1;const e=cn();function n(i,a,o,c,l){let p="",f="";const m=Math.floor(l/2)-1;return c-a>m&&(p=" ... ",a=c-m+p.length),o-c>m&&(f=" ...",o=c+m-f.length),{str:p+i.slice(a,o).replace(/\t/g,"→")+f,pos:c-a+p.length}}function t(i,a){return e.repeat(" ",a-i.length)+i}function r(i,a){if(a=Object.create(a||null),!i.buffer)return null;a.maxLength||(a.maxLength=79),typeof a.indent!="number"&&(a.indent=1),typeof a.linesBefore!="number"&&(a.linesBefore=3),typeof a.linesAfter!="number"&&(a.linesAfter=2);const o=/\r?\n|\r|\0/g,c=[0],l=[];let p,f=-1;for(;p=o.exec(i.buffer);)l.push(p.index),c.push(p.index+p[0].length),i.position<=p.index&&f<0&&(f=c.length-2);f<0&&(f=c.length-1);let m="";const d=Math.min(i.line+a.linesAfter,l.length).toString().length,g=a.maxLength-(a.indent+d+3);for(let C=1;C<=a.linesBefore&&!(f-C<0);C++){const L=n(i.buffer,c[f-C],l[f-C],i.position-(c[f]-c[f-C]),g);m=e.repeat(" ",a.indent)+t((i.line-C+1).toString(),d)+" | "+L.str+`
`+m}const N=n(i.buffer,c[f],l[f],i.position,g);m+=e.repeat(" ",a.indent)+t((i.line+1).toString(),d)+" | "+N.str+`
`,m+=e.repeat("-",a.indent+d+3+N.pos)+`^
`;for(let C=1;C<=a.linesAfter&&!(f+C>=l.length);C++){const L=n(i.buffer,c[f+C],l[f+C],i.position-(c[f]-c[f+C]),g);m+=e.repeat(" ",a.indent)+t((i.line+C+1).toString(),d)+" | "+L.str+`
`}return m.replace(/\n$/,"")}return ot=r,ot}var ct,Qt;function H(){if(Qt)return ct;Qt=1;const e=ln(),n=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],t=["scalar","sequence","mapping"];function r(a){const o={};return a!==null&&Object.keys(a).forEach(function(c){a[c].forEach(function(l){o[String(l)]=c})}),o}function i(a,o){if(o=o||{},Object.keys(o).forEach(function(c){if(n.indexOf(c)===-1)throw new e('Unknown option "'+c+'" is met in definition of "'+a+'" YAML type.')}),this.options=o,this.tag=a,this.kind=o.kind||null,this.resolve=o.resolve||function(){return!0},this.construct=o.construct||function(c){return c},this.instanceOf=o.instanceOf||null,this.predicate=o.predicate||null,this.represent=o.represent||null,this.representName=o.representName||null,this.defaultStyle=o.defaultStyle||null,this.multi=o.multi||!1,this.styleAliases=r(o.styleAliases||null),t.indexOf(this.kind)===-1)throw new e('Unknown kind "'+this.kind+'" is specified for "'+a+'" YAML type.')}return ct=i,ct}var lt,Zt;function ti(){if(Zt)return lt;Zt=1;const e=ln(),n=H();function t(a,o){const c=[];return a[o].forEach(function(l){let p=c.length;c.forEach(function(f,m){f.tag===l.tag&&f.kind===l.kind&&f.multi===l.multi&&(p=m)}),c[p]=l}),c}function r(){const a={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function o(c){c.multi?(a.multi[c.kind].push(c),a.multi.fallback.push(c)):a[c.kind][c.tag]=a.fallback[c.tag]=c}for(let c=0,l=arguments.length;c<l;c+=1)arguments[c].forEach(o);return a}function i(a){return this.extend(a)}return i.prototype.extend=function(o){let c=[],l=[];if(o instanceof n)l.push(o);else if(Array.isArray(o))l=l.concat(o);else if(o&&(Array.isArray(o.implicit)||Array.isArray(o.explicit)))o.implicit&&(c=c.concat(o.implicit)),o.explicit&&(l=l.concat(o.explicit));else throw new e("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");c.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(f.loadKind&&f.loadKind!=="scalar")throw new e("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(f.multi)throw new e("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),l.forEach(function(f){if(!(f instanceof n))throw new e("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const p=Object.create(i.prototype);return p.implicit=(this.implicit||[]).concat(c),p.explicit=(this.explicit||[]).concat(l),p.compiledImplicit=t(p,"implicit"),p.compiledExplicit=t(p,"explicit"),p.compiledTypeMap=r(p.compiledImplicit,p.compiledExplicit),p},lt=i,lt}var ut,er;function ri(){if(er)return ut;er=1;const e=H();return ut=new e("tag:yaml.org,2002:str",{kind:"scalar",construct:function(n){return n!==null?n:""}}),ut}var pt,nr;function ii(){if(nr)return pt;nr=1;const e=H();return pt=new e("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(n){return n!==null?n:[]}}),pt}var ft,tr;function si(){if(tr)return ft;tr=1;const e=H();return ft=new e("tag:yaml.org,2002:map",{kind:"mapping",construct:function(n){return n!==null?n:{}}}),ft}var mt,rr;function ai(){if(rr)return mt;rr=1;const e=ti();return mt=new e({explicit:[ri(),ii(),si()]}),mt}var dt,ir;function oi(){if(ir)return dt;ir=1;const e=H();function n(i){if(i===null)return!0;const a=i.length;return a===1&&i==="~"||a===4&&(i==="null"||i==="Null"||i==="NULL")}function t(){return null}function r(i){return i===null}return dt=new e("tag:yaml.org,2002:null",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"}),dt}var ht,sr;function ci(){if(sr)return ht;sr=1;const e=H();function n(i){if(i===null)return!1;const a=i.length;return a===4&&(i==="true"||i==="True"||i==="TRUE")||a===5&&(i==="false"||i==="False"||i==="FALSE")}function t(i){return i==="true"||i==="True"||i==="TRUE"}function r(i){return Object.prototype.toString.call(i)==="[object Boolean]"}return ht=new e("tag:yaml.org,2002:bool",{kind:"scalar",resolve:n,construct:t,predicate:r,represent:{lowercase:function(i){return i?"true":"false"},uppercase:function(i){return i?"TRUE":"FALSE"},camelcase:function(i){return i?"True":"False"}},defaultStyle:"lowercase"}),ht}var _t,ar;function li(){if(ar)return _t;ar=1;const e=cn(),n=H();function t(p){return p>=48&&p<=57||p>=65&&p<=70||p>=97&&p<=102}function r(p){return p>=48&&p<=55}function i(p){return p>=48&&p<=57}function a(p){if(p===null)return!1;const f=p.length;let m=0,d=!1;if(!f)return!1;let g=p[m];if((g==="-"||g==="+")&&(g=p[++m]),g==="0"){if(m+1===f)return!0;if(g=p[++m],g==="b"){for(m++;m<f;m++){if(g=p[m],g!=="0"&&g!=="1")return!1;d=!0}return d&&isFinite(o(p))}if(g==="x"){for(m++;m<f;m++){if(!t(p.charCodeAt(m)))return!1;d=!0}return d&&isFinite(o(p))}if(g==="o"){for(m++;m<f;m++){if(!r(p.charCodeAt(m)))return!1;d=!0}return d&&isFinite(o(p))}}for(;m<f;m++){if(!i(p.charCodeAt(m)))return!1;d=!0}return d?isFinite(o(p)):!1}function o(p){let f=p,m=1,d=f[0];if((d==="-"||d==="+")&&(d==="-"&&(m=-1),f=f.slice(1),d=f[0]),f==="0")return 0;if(d==="0"){if(f[1]==="b")return m*parseInt(f.slice(2),2);if(f[1]==="x")return m*parseInt(f.slice(2),16);if(f[1]==="o")return m*parseInt(f.slice(2),8)}return m*parseInt(f,10)}function c(p){return o(p)}function l(p){return Object.prototype.toString.call(p)==="[object Number]"&&p%1===0&&!e.isNegativeZero(p)}return _t=new n("tag:yaml.org,2002:int",{kind:"scalar",resolve:a,construct:c,predicate:l,represent:{binary:function(p){return p>=0?"0b"+p.toString(2):"-0b"+p.toString(2).slice(1)},octal:function(p){return p>=0?"0o"+p.toString(8):"-0o"+p.toString(8).slice(1)},decimal:function(p){return p.toString(10)},hexadecimal:function(p){return p>=0?"0x"+p.toString(16).toUpperCase():"-0x"+p.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),_t}var yt,or;function ui(){if(or)return yt;or=1;const e=cn(),n=H(),t=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),r=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function i(p){return p===null||!t.test(p)?!1:isFinite(parseFloat(p,10))?!0:r.test(p)}function a(p){let f=p.toLowerCase();const m=f[0]==="-"?-1:1;return"+-".indexOf(f[0])>=0&&(f=f.slice(1)),f===".inf"?m===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:f===".nan"?NaN:m*parseFloat(f,10)}const o=/^[-+]?[0-9]+e/;function c(p,f){if(isNaN(p))switch(f){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===p)switch(f){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===p)switch(f){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(e.isNegativeZero(p))return"-0.0";const m=p.toString(10);return o.test(m)?m.replace("e",".e"):m}function l(p){return Object.prototype.toString.call(p)==="[object Number]"&&(p%1!==0||e.isNegativeZero(p))}return yt=new n("tag:yaml.org,2002:float",{kind:"scalar",resolve:i,construct:a,predicate:l,represent:c,defaultStyle:"lowercase"}),yt}var gt,cr;function pi(){return cr||(cr=1,gt=ai().extend({implicit:[oi(),ci(),li(),ui()]})),gt}var vt,lr;function fi(){return lr||(lr=1,vt=pi()),vt}var bt,ur;function mi(){if(ur)return bt;ur=1;const e=H(),n=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),t=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function r(o){return o===null?!1:n.exec(o)!==null||t.exec(o)!==null}function i(o){let c=0,l=null,p=n.exec(o);if(p===null&&(p=t.exec(o)),p===null)throw new Error("Date resolve error");const f=+p[1],m=+p[2]-1,d=+p[3];if(!p[4])return new Date(Date.UTC(f,m,d));const g=+p[4],N=+p[5],C=+p[6];if(p[7]){for(c=p[7].slice(0,3);c.length<3;)c+="0";c=+c}if(p[9]){const D=+p[10],P=+(p[11]||0);l=(D*60+P)*6e4,p[9]==="-"&&(l=-l)}const L=new Date(Date.UTC(f,m,d,g,N,C,c));return l&&L.setTime(L.getTime()-l),L}function a(o){return o.toISOString()}return bt=new e("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:r,construct:i,instanceOf:Date,represent:a}),bt}var xt,pr;function di(){if(pr)return xt;pr=1;const e=H();function n(t){return t==="<<"||t===null}return xt=new e("tag:yaml.org,2002:merge",{kind:"scalar",resolve:n}),xt}var wt,fr;function hi(){if(fr)return wt;fr=1;const e=H(),n=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function t(o){if(o===null)return!1;let c=0;const l=o.length,p=n;for(let f=0;f<l;f++){const m=p.indexOf(o.charAt(f));if(!(m>64)){if(m<0)return!1;c+=6}}return c%8===0}function r(o){const c=o.replace(/[\r\n=]/g,""),l=c.length,p=n;let f=0;const m=[];for(let g=0;g<l;g++)g%4===0&&g&&(m.push(f>>16&255),m.push(f>>8&255),m.push(f&255)),f=f<<6|p.indexOf(c.charAt(g));const d=l%4*6;return d===0?(m.push(f>>16&255),m.push(f>>8&255),m.push(f&255)):d===18?(m.push(f>>10&255),m.push(f>>2&255)):d===12&&m.push(f>>4&255),new Uint8Array(m)}function i(o){let c="",l=0;const p=o.length,f=n;for(let d=0;d<p;d++)d%3===0&&d&&(c+=f[l>>18&63],c+=f[l>>12&63],c+=f[l>>6&63],c+=f[l&63]),l=(l<<8)+o[d];const m=p%3;return m===0?(c+=f[l>>18&63],c+=f[l>>12&63],c+=f[l>>6&63],c+=f[l&63]):m===2?(c+=f[l>>10&63],c+=f[l>>4&63],c+=f[l<<2&63],c+=f[64]):m===1&&(c+=f[l>>2&63],c+=f[l<<4&63],c+=f[64],c+=f[64]),c}function a(o){return Object.prototype.toString.call(o)==="[object Uint8Array]"}return wt=new e("tag:yaml.org,2002:binary",{kind:"scalar",resolve:t,construct:r,predicate:a,represent:i}),wt}var St,mr;function _i(){if(mr)return St;mr=1;const e=H(),n=Object.prototype.hasOwnProperty,t=Object.prototype.toString;function r(a){if(a===null)return!0;const o=[],c=a;for(let l=0,p=c.length;l<p;l+=1){const f=c[l];let m=!1;if(t.call(f)!=="[object Object]")return!1;let d;for(d in f)if(n.call(f,d))if(!m)m=!0;else return!1;if(!m)return!1;if(o.indexOf(d)===-1)o.push(d);else return!1}return!0}function i(a){return a!==null?a:[]}return St=new e("tag:yaml.org,2002:omap",{kind:"sequence",resolve:r,construct:i}),St}var At,dr;function yi(){if(dr)return At;dr=1;const e=H(),n=Object.prototype.toString;function t(i){if(i===null)return!0;const a=i,o=new Array(a.length);for(let c=0,l=a.length;c<l;c+=1){const p=a[c];if(n.call(p)!=="[object Object]")return!1;const f=Object.keys(p);if(f.length!==1)return!1;o[c]=[f[0],p[f[0]]]}return!0}function r(i){if(i===null)return[];const a=i,o=new Array(a.length);for(let c=0,l=a.length;c<l;c+=1){const p=a[c],f=Object.keys(p);o[c]=[f[0],p[f[0]]]}return o}return At=new e("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:t,construct:r}),At}var Tt,hr;function gi(){if(hr)return Tt;hr=1;const e=H(),n=Object.prototype.hasOwnProperty;function t(i){if(i===null)return!0;const a=i;for(const o in a)if(n.call(a,o)&&a[o]!==null)return!1;return!0}function r(i){return i!==null?i:{}}return Tt=new e("tag:yaml.org,2002:set",{kind:"mapping",resolve:t,construct:r}),Tt}var Et,_r;function Dt(){return _r||(_r=1,Et=fi().extend({implicit:[mi(),di()],explicit:[hi(),_i(),yi(),gi()]})),Et}var yr;function ha(){if(yr)return Tn;yr=1;const e=cn(),n=ln(),t=da(),r=Dt(),i=Object.prototype.hasOwnProperty,a=1,o=2,c=3,l=4,p=1,f=2,m=3,d=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/[\x85\u2028\u2029]/,N=/[,\[\]{}]/,C=/^(?:!|!!|![0-9A-Za-z-]+!)$/,L=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function D(s){return Object.prototype.toString.call(s)}function P(s){return s===10||s===13}function V(s){return s===9||s===32}function q(s){return s===9||s===32||s===10||s===13}function Q(s){return s===44||s===91||s===93||s===123||s===125}function pn(s){if(s>=48&&s<=57)return s-48;const _=s|32;return _>=97&&_<=102?_-97+10:-1}function he(s){return s===120?2:s===117?4:s===85?8:0}function fn(s){return s>=48&&s<=57?s-48:-1}function Ge(s){switch(s){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"";case 95:return" ";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function Zn(s){return s<=65535?String.fromCharCode(s):String.fromCharCode((s-65536>>10)+55296,(s-65536&1023)+56320)}function ze(s,_,b){_==="__proto__"?Object.defineProperty(s,_,{configurable:!0,enumerable:!0,writable:!0,value:b}):s[_]=b}const mn=new Array(256),Ke=new Array(256);for(let s=0;s<256;s++)mn[s]=Ge(s)?1:0,Ke[s]=Ge(s);function B(s,_){this.input=s,this.filename=_.filename||null,this.schema=_.schema||r,this.onWarning=_.onWarning||null,this.legacy=_.legacy||!1,this.json=_.json||!1,this.listener=_.listener||null,this.maxDepth=typeof _.maxDepth=="number"?_.maxDepth:100,this.maxTotalMergeKeys=typeof _.maxTotalMergeKeys=="number"?_.maxTotalMergeKeys:1e4,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=s.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.totalMergeKeys=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function dn(s,_){const b={name:s.filename,buffer:s.input.slice(0,-1),position:s.position,line:s.line,column:s.position-s.lineStart};return b.snippet=t(b),new n(_,b)}function O(s,_){throw dn(s,_)}function Oe(s,_){s.onWarning&&s.onWarning.call(null,dn(s,_))}function ee(s,_,b){const S=s.anchorMapTransactions;if(S.length!==0){const v=S[S.length-1];i.call(v,_)||(v[_]={existed:i.call(s.anchorMap,_),value:s.anchorMap[_]})}s.anchorMap[_]=b}function et(s){s.anchorMapTransactions.push(Object.create(null))}function _e(s){const _=s.anchorMapTransactions.pop(),b=s.anchorMapTransactions;if(b.length===0)return;const S=b[b.length-1],v=Object.keys(_);for(let I=0,u=v.length;I<u;I+=1){const y=v[I];i.call(S,y)||(S[y]=_[y])}}function nt(s){const _=s.anchorMapTransactions.pop(),b=Object.keys(_);for(let S=b.length-1;S>=0;S-=1){const v=_[b[S]];v.existed?s.anchorMap[b[S]]=v.value:delete s.anchorMap[b[S]]}}function He(s){return{position:s.position,line:s.line,lineStart:s.lineStart,lineIndent:s.lineIndent,firstTabInLine:s.firstTabInLine,tag:s.tag,anchor:s.anchor,kind:s.kind,result:s.result}}function Re(s,_){s.position=_.position,s.line=_.line,s.lineStart=_.lineStart,s.lineIndent=_.lineIndent,s.firstTabInLine=_.firstTabInLine,s.tag=_.tag,s.anchor=_.anchor,s.kind=_.kind,s.result=_.result}const hn={YAML:function(_,b,S){_.version!==null&&O(_,"duplication of %YAML directive"),S.length!==1&&O(_,"YAML directive accepts exactly one argument");const v=/^([0-9]+)\.([0-9]+)$/.exec(S[0]);v===null&&O(_,"ill-formed argument of the YAML directive");const I=parseInt(v[1],10),u=parseInt(v[2],10);I!==1&&O(_,"unacceptable YAML version of the document"),_.version=S[0],_.checkLineBreaks=u<2,u!==1&&u!==2&&Oe(_,"unsupported YAML version of the document")},TAG:function(_,b,S){let v;S.length!==2&&O(_,"TAG directive accepts exactly two arguments");const I=S[0];v=S[1],C.test(I)||O(_,"ill-formed tag handle (first argument) of the TAG directive"),i.call(_.tagMap,I)&&O(_,'there is a previously declared suffix for "'+I+'" tag handle'),L.test(v)||O(_,"ill-formed tag prefix (second argument) of the TAG directive");try{v=decodeURIComponent(v)}catch{O(_,"tag prefix is malformed: "+v)}_.tagMap[I]=v}};function W(s,_,b,S){if(_<b){const v=s.input.slice(_,b);if(S)for(let I=0,u=v.length;I<u;I+=1){const y=v.charCodeAt(I);y===9||y>=32&&y<=1114111||O(s,"expected valid JSON character")}else d.test(v)&&O(s,"the stream contains non-printable characters");s.result+=v}}function ce(s,_,b,S){e.isObject(b)||O(s,"cannot merge mappings; the provided source object is unacceptable");const v=Object.keys(b);for(let I=0,u=v.length;I<u;I+=1){const y=v[I];s.maxTotalMergeKeys!==-1&&++s.totalMergeKeys>s.maxTotalMergeKeys&&O(s,"merge keys exceeded maxTotalMergeKeys ("+s.maxTotalMergeKeys+")"),i.call(_,y)||(ze(_,y,b[y]),S[y]=!0)}}function ne(s,_,b,S,v,I,u,y,T){if(Array.isArray(v)){v=Array.prototype.slice.call(v);for(let x=0,w=v.length;x<w;x+=1)Array.isArray(v[x])&&O(s,"nested arrays are not supported inside keys"),typeof v=="object"&&D(v[x])==="[object Object]"&&(v[x]="[object Object]")}if(typeof v=="object"&&D(v)==="[object Object]"&&(v="[object Object]"),v=String(v),_===null&&(_={}),S==="tag:yaml.org,2002:merge")if(Array.isArray(I))for(let x=0,w=I.length;x<w;x+=1)ce(s,_,I[x],b);else ce(s,_,I,b);else!s.json&&!i.call(b,v)&&i.call(_,v)&&(s.line=u||s.line,s.lineStart=y||s.lineStart,s.position=T||s.position,O(s,"duplicated mapping key")),ze(_,v,I),delete b[v];return _}function Me(s){const _=s.input.charCodeAt(s.position);_===10?s.position++:_===13?(s.position++,s.input.charCodeAt(s.position)===10&&s.position++):O(s,"a line break is expected"),s.line+=1,s.lineStart=s.position,s.firstTabInLine=-1}function U(s,_,b){let S=0,v=s.input.charCodeAt(s.position);for(;v!==0;){for(;V(v);)v===9&&s.firstTabInLine===-1&&(s.firstTabInLine=s.position),v=s.input.charCodeAt(++s.position);if(_&&v===35)do v=s.input.charCodeAt(++s.position);while(v!==10&&v!==13&&v!==0);if(P(v))for(Me(s),v=s.input.charCodeAt(s.position),S++,s.lineIndent=0;v===32;)s.lineIndent++,v=s.input.charCodeAt(++s.position);else break}return b!==-1&&S!==0&&s.lineIndent<b&&Oe(s,"deficient indentation"),S}function Le(s){let _=s.position,b=s.input.charCodeAt(_);return!!((b===45||b===46)&&b===s.input.charCodeAt(_+1)&&b===s.input.charCodeAt(_+2)&&(_+=3,b=s.input.charCodeAt(_),b===0||q(b)))}function te(s,_){_===1?s.result+=" ":_>1&&(s.result+=e.repeat(`
`,_-1))}function _n(s,_,b){let S,v,I,u,y,T;const x=s.kind,w=s.result;let E=s.input.charCodeAt(s.position);if(q(E)||Q(E)||E===35||E===38||E===42||E===33||E===124||E===62||E===39||E===34||E===37||E===64||E===96)return!1;if(E===63||E===45){const A=s.input.charCodeAt(s.position+1);if(q(A)||b&&Q(A))return!1}for(s.kind="scalar",s.result="",S=v=s.position,I=!1;E!==0;){if(E===58){const A=s.input.charCodeAt(s.position+1);if(q(A)||b&&Q(A))break}else if(E===35){const A=s.input.charCodeAt(s.position-1);if(q(A))break}else{if(s.position===s.lineStart&&Le(s)||b&&Q(E))break;if(P(E))if(u=s.line,y=s.lineStart,T=s.lineIndent,U(s,!1,-1),s.lineIndent>=_){I=!0,E=s.input.charCodeAt(s.position);continue}else{s.position=v,s.line=u,s.lineStart=y,s.lineIndent=T;break}}I&&(W(s,S,v,!1),te(s,s.line-u),S=v=s.position,I=!1),V(E)||(v=s.position+1),E=s.input.charCodeAt(++s.position)}return W(s,S,v,!1),s.result?!0:(s.kind=x,s.result=w,!1)}function yn(s,_){let b,S,v=s.input.charCodeAt(s.position);if(v!==39)return!1;for(s.kind="scalar",s.result="",s.position++,b=S=s.position;(v=s.input.charCodeAt(s.position))!==0;)if(v===39)if(W(s,b,s.position,!0),v=s.input.charCodeAt(++s.position),v===39)b=s.position,s.position++,S=s.position;else return!0;else P(v)?(W(s,b,S,!0),te(s,U(s,!1,_)),b=S=s.position):s.position===s.lineStart&&Le(s)?O(s,"unexpected end of the document within a single quoted scalar"):(s.position++,V(v)||(S=s.position));O(s,"unexpected end of the stream within a single quoted scalar")}function We(s,_){let b,S,v,I=s.input.charCodeAt(s.position);if(I!==34)return!1;for(s.kind="scalar",s.result="",s.position++,b=S=s.position;(I=s.input.charCodeAt(s.position))!==0;){if(I===34)return W(s,b,s.position,!0),s.position++,!0;if(I===92){if(W(s,b,s.position,!0),I=s.input.charCodeAt(++s.position),P(I))U(s,!1,_);else if(I<256&&mn[I])s.result+=Ke[I],s.position++;else if((v=he(I))>0){let u=v,y=0;for(;u>0;u--)I=s.input.charCodeAt(++s.position),(v=pn(I))>=0?y=(y<<4)+v:O(s,"expected hexadecimal character");s.result+=Zn(y),s.position++}else O(s,"unknown escape sequence");b=S=s.position}else P(I)?(W(s,b,S,!0),te(s,U(s,!1,_)),b=S=s.position):s.position===s.lineStart&&Le(s)?O(s,"unexpected end of the document within a double quoted scalar"):(s.position++,V(I)||(S=s.position))}O(s,"unexpected end of the stream within a double quoted scalar")}function gn(s,_){let b=!0,S,v,I;const u=s.tag;let y;const T=s.anchor;let x,w,E,A;const k=Object.create(null);let $,R,M,j=s.input.charCodeAt(s.position);if(j===91)x=93,A=!1,y=[];else if(j===123)x=125,A=!0,y={};else return!1;for(s.anchor!==null&&ee(s,s.anchor,y),j=s.input.charCodeAt(++s.position);j!==0;){if(U(s,!0,_),j=s.input.charCodeAt(s.position),j===x)return s.position++,s.tag=u,s.anchor=T,s.kind=A?"mapping":"sequence",s.result=y,!0;if(b?j===44&&O(s,"expected the node content, but found ','"):O(s,"missed comma between flow collection entries"),R=$=M=null,w=E=!1,j===63){const F=s.input.charCodeAt(s.position+1);q(F)&&(w=E=!0,s.position++,U(s,!0,_))}S=s.line,v=s.lineStart,I=s.position,ie(s,_,a,!1,!0),R=s.tag,$=s.result,U(s,!0,_),j=s.input.charCodeAt(s.position),(E||s.line===S)&&j===58&&(w=!0,j=s.input.charCodeAt(++s.position),U(s,!0,_),ie(s,_,a,!1,!0),M=s.result),A?ne(s,y,k,R,$,M,S,v,I):w?y.push(ne(s,null,k,R,$,M,S,v,I)):y.push($),U(s,!0,_),j=s.input.charCodeAt(s.position),j===44?(b=!0,j=s.input.charCodeAt(++s.position)):b=!1}O(s,"unexpected end of the stream within a flow collection")}function vn(s,_){let b,S=p,v=!1,I=!1,u=_,y=0,T=!1,x,w=s.input.charCodeAt(s.position);if(w===124)b=!1;else if(w===62)b=!0;else return!1;for(s.kind="scalar",s.result="";w!==0;)if(w=s.input.charCodeAt(++s.position),w===43||w===45)p===S?S=w===43?m:f:O(s,"repeat of a chomping mode identifier");else if((x=fn(w))>=0)x===0?O(s,"bad explicit indentation width of a block scalar; it cannot be less than one"):I?O(s,"repeat of an indentation width identifier"):(u=_+x-1,I=!0);else break;if(V(w)){do w=s.input.charCodeAt(++s.position);while(V(w));if(w===35)do w=s.input.charCodeAt(++s.position);while(!P(w)&&w!==0)}for(;w!==0;){for(Me(s),s.lineIndent=0,w=s.input.charCodeAt(s.position);(!I||s.lineIndent<u)&&w===32;)s.lineIndent++,w=s.input.charCodeAt(++s.position);if(!I&&s.lineIndent>u&&(u=s.lineIndent),P(w)){y++;continue}if(!I&&u===0&&O(s,"missing indentation for block scalar"),s.lineIndent<u){S===m?s.result+=e.repeat(`
`,v?1+y:y):S===p&&v&&(s.result+=`
`);break}b?V(w)?(T=!0,s.result+=e.repeat(`
`,v?1+y:y)):T?(T=!1,s.result+=e.repeat(`
`,y+1)):y===0?v&&(s.result+=" "):s.result+=e.repeat(`
`,y):s.result+=e.repeat(`
`,v?1+y:y),v=!0,I=!0,y=0;const E=s.position;for(;!P(w)&&w!==0;)w=s.input.charCodeAt(++s.position);W(s,E,s.position,!1)}return!0}function re(s,_){const b=s.tag,S=s.anchor,v=[];let I=!1;if(s.firstTabInLine!==-1)return!1;s.anchor!==null&&ee(s,s.anchor,v);let u=s.input.charCodeAt(s.position);for(;u!==0&&(s.firstTabInLine!==-1&&(s.position=s.firstTabInLine,O(s,"tab characters must not be used in indentation")),u===45);){const y=s.input.charCodeAt(s.position+1);if(!q(y))break;if(I=!0,s.position++,U(s,!0,-1)&&s.lineIndent<=_){v.push(null),u=s.input.charCodeAt(s.position);continue}const T=s.line;if(ie(s,_,c,!1,!0),v.push(s.result),U(s,!0,-1),u=s.input.charCodeAt(s.position),(s.line===T||s.lineIndent>_)&&u!==0)O(s,"bad indentation of a sequence entry");else if(s.lineIndent<_)break}return I?(s.tag=b,s.anchor=S,s.kind="sequence",s.result=v,!0):!1}function bn(s,_,b){let S,v,I,u;const y=s.tag,T=s.anchor,x={},w=Object.create(null);let E=null,A=null,k=null,$=!1,R=!1;if(s.firstTabInLine!==-1)return!1;s.anchor!==null&&ee(s,s.anchor,x);let M=s.input.charCodeAt(s.position);for(;M!==0;){!$&&s.firstTabInLine!==-1&&(s.position=s.firstTabInLine,O(s,"tab characters must not be used in indentation"));const j=s.input.charCodeAt(s.position+1),F=s.line;if((M===63||M===58)&&q(j))M===63?($&&(ne(s,x,w,E,A,null,v,I,u),E=A=k=null),R=!0,$=!0,S=!0):$?($=!1,S=!0):O(s,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),s.position+=1,M=j;else{if(v=s.line,I=s.lineStart,u=s.position,!ie(s,b,o,!1,!0))break;if(s.line===F){for(M=s.input.charCodeAt(s.position);V(M);)M=s.input.charCodeAt(++s.position);if(M===58)M=s.input.charCodeAt(++s.position),q(M)||O(s,"a whitespace character is expected after the key-value separator within a block mapping"),$&&(ne(s,x,w,E,A,null,v,I,u),E=A=k=null),R=!0,$=!1,S=!1,E=s.tag,A=s.result;else if(R)O(s,"can not read an implicit mapping pair; a colon is missed");else return s.tag=y,s.anchor=T,!0}else if(R)O(s,"can not read a block mapping entry; a multiline key may not be an implicit key");else return s.tag=y,s.anchor=T,!0}if((s.line===F||s.lineIndent>_)&&($&&(v=s.line,I=s.lineStart,u=s.position),ie(s,_,l,!0,S)&&($?A=s.result:k=s.result),$||(ne(s,x,w,E,A,k,v,I,u),E=A=k=null),U(s,!0,-1),M=s.input.charCodeAt(s.position)),(s.line===F||s.lineIndent>_)&&M!==0)O(s,"bad indentation of a mapping entry");else if(s.lineIndent<_)break}return $&&ne(s,x,w,E,A,null,v,I,u),R&&(s.tag=y,s.anchor=T,s.kind="mapping",s.result=x),R}function tt(s){let _=!1,b=!1,S,v,I=s.input.charCodeAt(s.position);if(I!==33)return!1;s.tag!==null&&O(s,"duplication of a tag property"),I=s.input.charCodeAt(++s.position),I===60?(_=!0,I=s.input.charCodeAt(++s.position)):I===33?(b=!0,S="!!",I=s.input.charCodeAt(++s.position)):S="!";let u=s.position;if(_){do I=s.input.charCodeAt(++s.position);while(I!==0&&I!==62);s.position<s.length?(v=s.input.slice(u,s.position),I=s.input.charCodeAt(++s.position)):O(s,"unexpected end of the stream within a verbatim tag")}else{for(;I!==0&&!q(I);)I===33&&(b?O(s,"tag suffix cannot contain exclamation marks"):(S=s.input.slice(u-1,s.position+1),C.test(S)||O(s,"named tag handle cannot contain such characters"),b=!0,u=s.position+1)),I=s.input.charCodeAt(++s.position);v=s.input.slice(u,s.position),N.test(v)&&O(s,"tag suffix cannot contain flow indicator characters")}v&&!L.test(v)&&O(s,"tag name cannot contain such characters: "+v);try{v=decodeURIComponent(v)}catch{O(s,"tag name is malformed: "+v)}return _?s.tag=v:i.call(s.tagMap,S)?s.tag=s.tagMap[S]+v:S==="!"?s.tag="!"+v:S==="!!"?s.tag="tag:yaml.org,2002:"+v:O(s,'undeclared tag handle "'+S+'"'),!0}function xn(s){let _=s.input.charCodeAt(s.position);if(_!==38)return!1;s.anchor!==null&&O(s,"duplication of an anchor property"),_=s.input.charCodeAt(++s.position);const b=s.position;for(;_!==0&&!q(_)&&!Q(_);)_=s.input.charCodeAt(++s.position);return s.position===b&&O(s,"name of an anchor node must contain at least one character"),s.anchor=s.input.slice(b,s.position),!0}function wn(s){let _=s.input.charCodeAt(s.position);if(_!==42)return!1;_=s.input.charCodeAt(++s.position);const b=s.position;for(;_!==0&&!q(_)&&!Q(_);)_=s.input.charCodeAt(++s.position);s.position===b&&O(s,"name of an alias node must contain at least one character");const S=s.input.slice(b,s.position);return i.call(s.anchorMap,S)||O(s,'unidentified alias "'+S+'"'),s.result=s.anchorMap[S],U(s,!0,-1),!0}function rt(s,_,b,S){const v=He(s);return et(s),Re(s,_),s.tag=null,s.anchor=null,s.kind=null,s.result=null,bn(s,b,S)&&s.kind==="mapping"?(_e(s),!0):(nt(s),Re(s,v),!1)}function ie(s,_,b,S,v){let I,u,y=1,T=!1,x=!1,w=null,E,A,k;s.depth>=s.maxDepth&&O(s,"nesting exceeded maxDepth ("+s.maxDepth+")"),s.depth+=1,s.listener!==null&&s.listener("open",s),s.tag=null,s.anchor=null,s.kind=null,s.result=null;const $=I=u=l===b||c===b;if(S&&U(s,!0,-1)&&(T=!0,s.lineIndent>_?y=1:s.lineIndent===_?y=0:s.lineIndent<_&&(y=-1)),y===1)for(;;){const R=s.input.charCodeAt(s.position),M=He(s);if(T&&(R===33&&s.tag!==null||R===38&&s.anchor!==null)||!tt(s)&&!xn(s))break;w===null&&(w=M),U(s,!0,-1)?(T=!0,u=$,s.lineIndent>_?y=1:s.lineIndent===_?y=0:s.lineIndent<_&&(y=-1)):u=!1}if(u&&(u=T||v),y===1||l===b)if(a===b||o===b?A=_:A=_+1,k=s.position-s.lineStart,y===1)if(u&&(re(s,k)||bn(s,k,A))||gn(s,A))x=!0;else{const R=s.input.charCodeAt(s.position);w!==null&&$&&!u&&R!==124&&R!==62&&rt(s,w,w.position-w.lineStart,A)||I&&vn(s,A)||yn(s,A)||We(s,A)?x=!0:wn(s)?(x=!0,(s.tag!==null||s.anchor!==null)&&O(s,"alias node should not have any properties")):_n(s,A,a===b)&&(x=!0,s.tag===null&&(s.tag="?")),s.anchor!==null&&ee(s,s.anchor,s.result)}else y===0&&(x=u&&re(s,k));if(s.tag===null)s.anchor!==null&&ee(s,s.anchor,s.result);else if(s.tag==="?"){s.result!==null&&s.kind!=="scalar"&&O(s,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+s.kind+'"');for(let R=0,M=s.implicitTypes.length;R<M;R+=1)if(E=s.implicitTypes[R],E.resolve(s.result)){s.result=E.construct(s.result),s.tag=E.tag,s.anchor!==null&&ee(s,s.anchor,s.result);break}}else if(s.tag!=="!"){if(i.call(s.typeMap[s.kind||"fallback"],s.tag))E=s.typeMap[s.kind||"fallback"][s.tag];else{E=null;const R=s.typeMap.multi[s.kind||"fallback"];for(let M=0,j=R.length;M<j;M+=1)if(s.tag.slice(0,R[M].tag.length)===R[M].tag){E=R[M];break}}E||O(s,"unknown tag !<"+s.tag+">"),s.result!==null&&E.kind!==s.kind&&O(s,"unacceptable node kind for !<"+s.tag+'> tag; it should be "'+E.kind+'", not "'+s.kind+'"'),E.resolve(s.result,s.tag)?(s.result=E.construct(s.result,s.tag),s.anchor!==null&&ee(s,s.anchor,s.result)):O(s,"cannot resolve a node with !<"+s.tag+"> explicit tag")}return s.listener!==null&&s.listener("close",s),s.depth-=1,s.tag!==null||s.anchor!==null||x}function it(s){const _=s.position;let b=!1,S;for(s.version=null,s.checkLineBreaks=s.legacy,s.tagMap=Object.create(null),s.anchorMap=Object.create(null);(S=s.input.charCodeAt(s.position))!==0&&(U(s,!0,-1),S=s.input.charCodeAt(s.position),!(s.lineIndent>0||S!==37));){b=!0,S=s.input.charCodeAt(++s.position);let v=s.position;for(;S!==0&&!q(S);)S=s.input.charCodeAt(++s.position);const I=s.input.slice(v,s.position),u=[];for(I.length<1&&O(s,"directive name must not be less than one character in length");S!==0;){for(;V(S);)S=s.input.charCodeAt(++s.position);if(S===35){do S=s.input.charCodeAt(++s.position);while(S!==0&&!P(S));break}if(P(S))break;for(v=s.position;S!==0&&!q(S);)S=s.input.charCodeAt(++s.position);u.push(s.input.slice(v,s.position))}S!==0&&Me(s),i.call(hn,I)?hn[I](s,I,u):Oe(s,'unknown document directive "'+I+'"')}if(U(s,!0,-1),s.lineIndent===0&&s.input.charCodeAt(s.position)===45&&s.input.charCodeAt(s.position+1)===45&&s.input.charCodeAt(s.position+2)===45?(s.position+=3,U(s,!0,-1)):b&&O(s,"directives end mark is expected"),ie(s,s.lineIndent-1,l,!1,!0),U(s,!0,-1),s.checkLineBreaks&&g.test(s.input.slice(_,s.position))&&Oe(s,"non-ASCII line breaks are interpreted as content"),s.documents.push(s.result),s.position===s.lineStart&&Le(s)){s.input.charCodeAt(s.position)===46&&(s.position+=3,U(s,!0,-1));return}s.position<s.length-1&&O(s,"end of the stream or a document separator is expected")}function Sn(s,_){s=String(s),_=_||{},s.length!==0&&(s.charCodeAt(s.length-1)!==10&&s.charCodeAt(s.length-1)!==13&&(s+=`
`),s.charCodeAt(0)===65279&&(s=s.slice(1)));const b=new B(s,_),S=s.indexOf("\0");for(S!==-1&&(b.position=S,O(b,"null byte is not allowed in input")),b.input+="\0";b.input.charCodeAt(b.position)===32;)b.lineIndent+=1,b.position+=1;for(;b.position<b.length-1;)it(b);return b.documents}function An(s,_,b){_!==null&&typeof _=="object"&&typeof b>"u"&&(b=_,_=null);const S=Sn(s,b);if(typeof _!="function")return S;for(let v=0,I=S.length;v<I;v+=1)_(S[v])}function st(s,_){const b=Sn(s,_);if(b.length!==0){if(b.length===1)return b[0];throw new n("expected a single document in the stream, but found more")}}return Tn.loadAll=An,Tn.load=st,Tn}var It={},gr;function _a(){if(gr)return It;gr=1;const e=cn(),n=ln(),t=Dt(),r=Object.prototype.toString,i=Object.prototype.hasOwnProperty,a=65279,o=9,c=10,l=13,p=32,f=33,m=34,d=35,g=37,N=38,C=39,L=42,D=44,P=45,V=58,q=61,Q=62,pn=63,he=64,fn=91,Ge=93,Zn=96,ze=123,mn=124,Ke=125,B={};B[0]="\\0",B[7]="\\a",B[8]="\\b",B[9]="\\t",B[10]="\\n",B[11]="\\v",B[12]="\\f",B[13]="\\r",B[27]="\\e",B[34]='\\"',B[92]="\\\\",B[133]="\\N",B[160]="\\_",B[8232]="\\L",B[8233]="\\P";const dn=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],O=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Oe(u,y){if(y===null)return{};const T={},x=Object.keys(y);for(let w=0,E=x.length;w<E;w+=1){let A=x[w],k=String(y[A]);A.slice(0,2)==="!!"&&(A="tag:yaml.org,2002:"+A.slice(2));const $=u.compiledTypeMap.fallback[A];$&&i.call($.styleAliases,k)&&(k=$.styleAliases[k]),T[A]=k}return T}function ee(u){let y,T;const x=u.toString(16).toUpperCase();if(u<=255)y="x",T=2;else if(u<=65535)y="u",T=4;else if(u<=4294967295)y="U",T=8;else throw new n("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+y+e.repeat("0",T-x.length)+x}const et=1,_e=2;function nt(u){this.schema=u.schema||t,this.indent=Math.max(1,u.indent||2),this.noArrayIndent=u.noArrayIndent||!1,this.skipInvalid=u.skipInvalid||!1,this.flowLevel=e.isNothing(u.flowLevel)?-1:u.flowLevel,this.styleMap=Oe(this.schema,u.styles||null),this.sortKeys=u.sortKeys||!1,this.lineWidth=u.lineWidth||80,this.noRefs=u.noRefs||!1,this.noCompatMode=u.noCompatMode||!1,this.condenseFlow=u.condenseFlow||!1,this.quotingType=u.quotingType==='"'?_e:et,this.forceQuotes=u.forceQuotes||!1,this.replacer=typeof u.replacer=="function"?u.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function He(u,y){const T=e.repeat(" ",y);let x=0,w="";const E=u.length;for(;x<E;){let A;const k=u.indexOf(`
`,x);k===-1?(A=u.slice(x),x=E):(A=u.slice(x,k+1),x=k+1),A.length&&A!==`
`&&(w+=T),w+=A}return w}function Re(u,y){return`
`+e.repeat(" ",u.indent*y)}function hn(u,y){for(let T=0,x=u.implicitTypes.length;T<x;T+=1)if(u.implicitTypes[T].resolve(y))return!0;return!1}function W(u){return u===p||u===o}function ce(u){return u>=32&&u<=126||u>=161&&u<=55295&&u!==8232&&u!==8233||u>=57344&&u<=65533&&u!==a||u>=65536&&u<=1114111}function ne(u){return ce(u)&&u!==a&&u!==l&&u!==c}function Me(u,y,T){const x=ne(u),w=x&&!W(u);return(T?x:x&&u!==D&&u!==fn&&u!==Ge&&u!==ze&&u!==Ke)&&u!==d&&!(y===V&&!w)||ne(y)&&!W(y)&&u===d||y===V&&w}function U(u){return ce(u)&&u!==a&&!W(u)&&u!==P&&u!==pn&&u!==V&&u!==D&&u!==fn&&u!==Ge&&u!==ze&&u!==Ke&&u!==d&&u!==N&&u!==L&&u!==f&&u!==mn&&u!==q&&u!==Q&&u!==C&&u!==m&&u!==g&&u!==he&&u!==Zn}function Le(u){return!W(u)&&u!==V}function te(u,y){const T=u.charCodeAt(y);let x;return T>=55296&&T<=56319&&y+1<u.length&&(x=u.charCodeAt(y+1),x>=56320&&x<=57343)?(T-55296)*1024+x-56320+65536:T}function _n(u){return/^\n* /.test(u)}const yn=1,We=2,gn=3,vn=4,re=5;function bn(u,y,T,x,w,E,A,k){let $,R=0,M=null,j=!1,F=!1;const Ht=x!==-1;let Je=-1,Xe=U(te(u,0))&&Le(te(u,u.length-1));if(y||A)for($=0;$<u.length;R>=65536?$+=2:$++){if(R=te(u,$),!ce(R))return re;Xe=Xe&&Me(R,M,k),M=R}else{for($=0;$<u.length;R>=65536?$+=2:$++){if(R=te(u,$),R===c)j=!0,Ht&&(F=F||$-Je-1>x&&u[Je+1]!==" ",Je=$);else if(!ce(R))return re;Xe=Xe&&Me(R,M,k),M=R}F=F||Ht&&$-Je-1>x&&u[Je+1]!==" "}return!j&&!F?Xe&&!A&&!w(u)?yn:E===_e?re:We:T>9&&_n(u)?re:A?E===_e?re:We:F?vn:gn}function tt(u,y,T,x,w){u.dump=(function(){if(y.length===0)return u.quotingType===_e?'""':"''";if(!u.noCompatMode&&(dn.indexOf(y)!==-1||O.test(y)))return u.quotingType===_e?'"'+y+'"':"'"+y+"'";const E=u.indent*Math.max(1,T),A=u.lineWidth===-1?-1:Math.max(Math.min(u.lineWidth,40),u.lineWidth-E),k=x||u.flowLevel>-1&&T>=u.flowLevel;function $(R){return hn(u,R)}switch(bn(y,k,u.indent,A,$,u.quotingType,u.forceQuotes&&!x,w)){case yn:return y;case We:return"'"+y.replace(/'/g,"''")+"'";case gn:return"|"+xn(y,u.indent)+wn(He(y,E));case vn:return">"+xn(y,u.indent)+wn(He(rt(y,A),E));case re:return'"'+it(y)+'"';default:throw new n("impossible error: invalid scalar style")}})()}function xn(u,y){const T=_n(u)?String(y):"",x=u[u.length-1]===`
`,E=x&&(u[u.length-2]===`
`||u===`
`)?"+":x?"":"-";return T+E+`
`}function wn(u){return u[u.length-1]===`
`?u.slice(0,-1):u}function rt(u,y){const T=/(\n+)([^\n]*)/g;let x=(function(){let k=u.indexOf(`
`);return k=k!==-1?k:u.length,T.lastIndex=k,ie(u.slice(0,k),y)})(),w=u[0]===`
`||u[0]===" ",E,A;for(;A=T.exec(u);){const k=A[1],$=A[2];E=$[0]===" ",x+=k+(!w&&!E&&$!==""?`
`:"")+ie($,y),w=E}return x}function ie(u,y){if(u===""||u[0]===" ")return u;const T=/ [^ ]/g;let x,w=0,E,A=0,k=0,$="";for(;x=T.exec(u);)k=x.index,k-w>y&&(E=A>w?A:k,$+=`
`+u.slice(w,E),w=E+1),A=k;return $+=`
`,u.length-w>y&&A>w?$+=u.slice(w,A)+`
`+u.slice(A+1):$+=u.slice(w),$.slice(1)}function it(u){let y="",T=0;for(let x=0;x<u.length;T>=65536?x+=2:x++){T=te(u,x);const w=B[T];!w&&ce(T)?(y+=u[x],T>=65536&&(y+=u[x+1])):y+=w||ee(T)}return y}function Sn(u,y,T){let x="";const w=u.tag;for(let E=0,A=T.length;E<A;E+=1){let k=T[E];u.replacer&&(k=u.replacer.call(T,String(E),k)),(b(u,y,k,!1,!1)||typeof k>"u"&&b(u,y,null,!1,!1))&&(x!==""&&(x+=","+(u.condenseFlow?"":" ")),x+=u.dump)}u.tag=w,u.dump="["+x+"]"}function An(u,y,T,x){let w="";const E=u.tag;for(let A=0,k=T.length;A<k;A+=1){let $=T[A];u.replacer&&($=u.replacer.call(T,String(A),$)),(b(u,y+1,$,!0,!0,!1,!0)||typeof $>"u"&&b(u,y+1,null,!0,!0,!1,!0))&&((!x||w!=="")&&(w+=Re(u,y)),u.dump&&c===u.dump.charCodeAt(0)?w+="-":w+="- ",w+=u.dump)}u.tag=E,u.dump=w||"[]"}function st(u,y,T){let x="";const w=u.tag,E=Object.keys(T);for(let A=0,k=E.length;A<k;A+=1){let $="";x!==""&&($+=", "),u.condenseFlow&&($+='"');const R=E[A];let M=T[R];u.replacer&&(M=u.replacer.call(T,R,M)),b(u,y,R,!1,!1)&&(u.dump.length>1024&&($+="? "),$+=u.dump+(u.condenseFlow?'"':"")+":"+(u.condenseFlow?"":" "),b(u,y,M,!1,!1)&&($+=u.dump,x+=$))}u.tag=w,u.dump="{"+x+"}"}function s(u,y,T,x){let w="";const E=u.tag,A=Object.keys(T);if(u.sortKeys===!0)A.sort();else if(typeof u.sortKeys=="function")A.sort(u.sortKeys);else if(u.sortKeys)throw new n("sortKeys must be a boolean or a function");for(let k=0,$=A.length;k<$;k+=1){let R="";(!x||w!=="")&&(R+=Re(u,y));const M=A[k];let j=T[M];if(u.replacer&&(j=u.replacer.call(T,M,j)),!b(u,y+1,M,!0,!0,!0))continue;const F=u.tag!==null&&u.tag!=="?"||u.dump&&u.dump.length>1024;F&&(u.dump&&c===u.dump.charCodeAt(0)?R+="?":R+="? "),R+=u.dump,F&&(R+=Re(u,y)),b(u,y+1,j,!0,F)&&(u.dump&&c===u.dump.charCodeAt(0)?R+=":":R+=": ",R+=u.dump,w+=R)}u.tag=E,u.dump=w||"{}"}function _(u,y,T){const x=T?u.explicitTypes:u.implicitTypes;for(let w=0,E=x.length;w<E;w+=1){const A=x[w];if((A.instanceOf||A.predicate)&&(!A.instanceOf||typeof y=="object"&&y instanceof A.instanceOf)&&(!A.predicate||A.predicate(y))){if(T?A.multi&&A.representName?u.tag=A.representName(y):u.tag=A.tag:u.tag="?",A.represent){const k=u.styleMap[A.tag]||A.defaultStyle;let $;if(r.call(A.represent)==="[object Function]")$=A.represent(y,k);else if(i.call(A.represent,k))$=A.represent[k](y,k);else throw new n("!<"+A.tag+'> tag resolver accepts not "'+k+'" style');u.dump=$}return!0}}return!1}function b(u,y,T,x,w,E,A){u.tag=null,u.dump=T,_(u,T,!1)||_(u,T,!0);const k=r.call(u.dump),$=x;x&&(x=u.flowLevel<0||u.flowLevel>y);const R=k==="[object Object]"||k==="[object Array]";let M,j;if(R&&(M=u.duplicates.indexOf(T),j=M!==-1),(u.tag!==null&&u.tag!=="?"||j||u.indent!==2&&y>0)&&(w=!1),j&&u.usedDuplicates[M])u.dump="*ref_"+M;else{if(R&&j&&!u.usedDuplicates[M]&&(u.usedDuplicates[M]=!0),k==="[object Object]")x&&Object.keys(u.dump).length!==0?(s(u,y,u.dump,w),j&&(u.dump="&ref_"+M+u.dump)):(st(u,y,u.dump),j&&(u.dump="&ref_"+M+" "+u.dump));else if(k==="[object Array]")x&&u.dump.length!==0?(u.noArrayIndent&&!A&&y>0?An(u,y-1,u.dump,w):An(u,y,u.dump,w),j&&(u.dump="&ref_"+M+u.dump)):(Sn(u,y,u.dump),j&&(u.dump="&ref_"+M+" "+u.dump));else if(k==="[object String]")u.tag!=="?"&&tt(u,u.dump,y,E,$);else{if(k==="[object Undefined]")return!1;if(u.skipInvalid)return!1;throw new n("unacceptable kind of an object to dump "+k)}if(u.tag!==null&&u.tag!=="?"){let F=encodeURI(u.tag[0]==="!"?u.tag.slice(1):u.tag).replace(/!/g,"%21");u.tag[0]==="!"?F="!"+F:F.slice(0,18)==="tag:yaml.org,2002:"?F="!!"+F.slice(18):F="!<"+F+">",u.dump=F+" "+u.dump}}return!0}function S(u,y){const T=[],x=[];v(u,T,x);const w=x.length;for(let E=0;E<w;E+=1)y.duplicates.push(T[x[E]]);y.usedDuplicates=new Array(w)}function v(u,y,T){if(u!==null&&typeof u=="object"){const x=y.indexOf(u);if(x!==-1)T.indexOf(x)===-1&&T.push(x);else if(y.push(u),Array.isArray(u))for(let w=0,E=u.length;w<E;w+=1)v(u[w],y,T);else{const w=Object.keys(u);for(let E=0,A=w.length;E<A;E+=1)v(u[w[E]],y,T)}}}function I(u,y){y=y||{};const T=new nt(y);T.noRefs||S(u,T);let x=u;return T.replacer&&(x=T.replacer.call({"":x},"",x)),b(T,0,x,!0,!0)?T.dump+`
`:""}return It.dump=I,It}var vr;function ya(){if(vr)return G;vr=1;const e=ha(),n=_a();function t(r,i){return function(){throw new Error("Function yaml."+r+" is removed in js-yaml 4. Use yaml."+i+" instead, which is now safe by default.")}}return G.Type=H(),G.Schema=ti(),G.FAILSAFE_SCHEMA=ai(),G.JSON_SCHEMA=pi(),G.CORE_SCHEMA=fi(),G.DEFAULT_SCHEMA=Dt(),G.load=e.load,G.loadAll=e.loadAll,G.dump=n.dump,G.YAMLException=ln(),G.types={binary:hi(),float:ui(),map:si(),null:oi(),pairs:yi(),set:gi(),timestamp:mi(),bool:ci(),int:li(),merge:di(),omap:_i(),seq:ii(),str:ri()},G.safeLoad=t("safeLoad","load"),G.safeLoadAll=t("safeLoadAll","loadAll"),G.safeDump=t("safeDump","dump"),G}var ga=ya();const Jn=ma(ga),{Type:ou,Schema:cu,FAILSAFE_SCHEMA:lu,JSON_SCHEMA:uu,CORE_SCHEMA:pu,DEFAULT_SCHEMA:fu,load:mu,loadAll:du,dump:hu,YAMLException:_u,types:yu,safeLoad:gu,safeLoadAll:vu,safeDump:bu}=Jn,Ze="netlab-internal",ve=`${Ze}:_linkname`;function br(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Z(e,n){const t=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(const[i,a]of Object.entries(n)){if(i==="_removed_attr"){const c=Array.isArray(a)?a:[];r._removed_attr=[...t,...c.filter(l=>!t.has(l))];continue}if(t.has(i))continue;const o=r[i];br(o)&&br(a)?r[i]=Z(o,a):r[i]=va(a)}return r}function va(e){return structuredClone(e)}function Mn(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function Ln(e){if(Array.isArray(e))return e.map(t=>Ln(t));if(!Mn(e))return e;const n={};for(const[t,r]of Object.entries(e))ba(n,t,Ln(r));return n}function ba(e,n,t){if(!n.includes(".")){xr(e,n,t);return}const r=n.split(".");let i=e;for(let a=0;a<r.length-1;a++){const o=r[a],c=i[o];(c==null||!Mn(c))&&(i[o]={}),i=i[o]}xr(i,r[r.length-1],t)}function xr(e,n,t){const r=e[n];Mn(r)&&Mn(t)?e[n]=Z(r,t):e[n]=t}function xa(e){const n=Ln(e);for(const t of Object.keys(e))delete e[t];Object.assign(e,n)}class wa{constructor(){h(this,"items",[])}error(n){this.items.push({...n,severity:"error"})}warning(n){this.items.push({...n,severity:"warning"})}hasErrors(){return this.items.some(n=>n.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}}function wr(e,n){const t=e.toLowerCase();let r="VALUE",i="VALUE";return t.includes("missing")||t.includes("required")||t.includes("mandatory")?(r="MISSING",i="MISSING"):t.includes("type")||t.includes("pattern")||t.includes("range")?(r="TYPE",i="TYPE"):t.includes("unknown")||t.includes("not allowed")||t.includes("unexpected")?(r="ATTR",i="ATTR"):t.includes("leafref")||t.includes("instance")?(r="VALUE",i="VALUE"):t.includes("depend")&&(r="DEPEND",i="DEPEND"),{code:i,category:r,module:"xyang",message:e,path:n}}function Sa(){return{device:"frr",provider:"clab",addressing:{loopback:{ipv4:"10.0.0.0/24"},router_id:{ipv4:"10.0.0.0/24",prefix:32},lan:{ipv4:"172.16.0.0/16"},p2p:{ipv4:"10.1.0.0/16"},mgmt:{ipv4:"192.168.121.0/24",start:100,mac:"CA-FE-00-00-00-00"},vrf_loopback:{ipv4:"10.2.0.0/24",prefix:32},l2only:{}},ospf:{area:"0.0.0.0"},bgp:{},isis:{type:"level-2"},vxlan:{domain:"global",flooding:"static",start_vni:1e5,use_v6_vtep:!1},evpn:{session:["ibgp"],transport:"vxlan",start_transit_vni:2e5}}}function Aa(e){const n=Jn.load(e);if(!n||typeof n!="object"||Array.isArray(n))throw new Error("Topology must be a YAML/JSON object");return Ln(n)}function Ta(e,n={}){const t=Aa(e);return vi(t,n)}function vi(e,n={}){xa(e);const t=Z(Sa(),n.defaults??{}),r=e.defaults??{};e.defaults=Z(t,r),e.provider||(e.provider="clab"),e.name||(e.name=n.name??"topology");const i=e.defaults.addressing??{};return e.addressing=Z(i,e.addressing??{}),e}function Pt(e){return e.replace(/\\/g,"/")}function De(...e){const n=[],t=e.map(Pt).join("/"),r=t.startsWith("/");for(const i of t.split("/"))!i||i==="."||(i===".."?n.pop():n.push(i));return(r?"/":"")+n.join("/")}function bi(e){const n=Pt(e).replace(/\/$/,""),t=n.lastIndexOf("/");return t<0?".":t===0?"/":n.slice(0,t)}function Ea(...e){return De(e.join("/"))}function Ia(e,n){const t=Pt(e).split("/").pop()??"";return n&&t.endsWith(n)?t.slice(0,-n.length):t}const en={resolve:De,dirname:bi,join:Ea,basename:Ia};function Na(e){const n=String(e);return n.startsWith("file:")?decodeURIComponent(n.replace(/^file:\/\//,"").replace(/^file:\//,"/")):"/packages/core/src/validate/schema.js"}function $a(e,n){if(!e.includes(":"))return{statementName:null,moduleName:null};const[t,r]=e.split(":",2);if(!t||!r)return{statementName:null,moduleName:null};const i=n[t];return i?i.findStatement(r)?{statementName:r,moduleName:t}:{statementName:null,moduleName:null}:{statementName:null,moduleName:null}}var Ca=class extends Error{constructor(e){super(e),this.name="YangError"}},J=class extends SyntaxError{constructor(n,t={}){const{line_num:r,line:i,context_lines:a=[],filename:o}=t,c=[];o&&c.push(`${o}:`),r&&c.push(`${r}:`),c.push(n);let l=c.join(" ");if(a.length>0){l+=`
`;for(const[p,f]of a)l+=`${p===r?">>> ":"    "}${String(p).padStart(4," ")} | ${f}
`;r&&i&&(l+=`     ${" ".repeat(String(r).length+3)}${"^".repeat(Math.max(1,i.trim().length))}`)}super(l);h(this,"messageText");h(this,"line_num");h(this,"line");h(this,"context_lines");h(this,"filename");this.name="YangSyntaxError",this.messageText=n,this.line_num=r,this.line=i,this.context_lines=a,this.filename=o}formatHeadline(){const n=[];return this.filename&&n.push(`${this.filename}:`),this.line_num!==void 0&&n.push(`${this.line_num}:`),n.push(this.messageText),n.join(" ")}toString(){return this.formatHeadline()}},Y=class extends Ca{constructor(e){super(e),this.name="YangSemanticError"}},ka=class extends Y{constructor(n){super(`Refine target path matches no node in the used grouping: '${n}'`);h(this,"target_path");this.name="YangRefineTargetNotFoundError",this.target_path=n}},Oa=class extends Y{constructor(n,t){const r=[...n,t].join(" -> ");super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${r}). Restructure groupings to break the cycle.`);h(this,"prefix_chain");h(this,"repeated");this.name="YangCircularUsesError",this.prefix_chain=[...n],this.repeated=t}},se=class extends Error{constructor(n,t={}){var e=(...Iu)=>(super(...Iu),h(this,"messageText"),h(this,"position"),h(this,"expression"),this);const{position:r,expression:i,context_before:a=10,context_after:o=10}=t;if(i!==void 0&&r!==void 0){const c=Math.max(0,r-a),l=Math.min(i.length,r+o),p=i.slice(c,l),f=r-c,m=[n,`
Expression: ${p}`,`           ${" ".repeat(f)}^`];r<i.length?m.push(`Position: ${r} (character: ${JSON.stringify(i[r])})`):m.push(`Position: ${r} (end of expression)`),e(m.join(`
`))}else e(n);this.name="XPathSyntaxError",this.messageText=n,this.position=r,this.expression=i}toString(){return this.messageText}},Ra=new Set(["{","}",";",":","=","+","/"]);function Ma(e){return e?e.split(`
`).map(n=>n.replace(/\r$/,"")):[]}function La(e){return e==="STRING"?"string":e==="INTEGER"||e==="DOTTED_NUMBER"?"number":Ra.has(e)?"symbol":"identifier"}var Nt=new Set(["{","}",";",":","=","+","/","STRING","IDENTIFIER","INTEGER","DOTTED_NUMBER"]);function ja(e,n,t,r){return{type:e,value:n,line_num:t,char_pos:r,kind:La(e),line:t,column:r+1}}var Da=class{constructor(e,n,t){h(this,"token_list");h(this,"tokens");h(this,"positions");h(this,"filename");h(this,"index");h(this,"source");h(this,"diagnostic_lines");this.token_list=e,this.tokens=e.map(r=>r.value),this.positions=e.map(r=>[r.line_num,r.char_pos]),this.source=n,this.filename=t,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error("Unexpected end of input");const n=this.tokens[this.index];if(e!==void 0&&n!==e)throw this._make_error(`Expected '${e}', got '${n}'`);return this.index+=1,n}consume_if(e){return this.peek()===e?(this.consume(),!0):!1}peek_type(){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");return this.token_list[this.index].type}peek_type_at(e=0){var n;return(n=this.token_list[this.index+e])==null?void 0:n.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];if(typeof e=="string"&&!Nt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)throw this._make_error(`Expected '${e}', got '${n.value}'`)}else if(n.type!==e)throw this._make_error(`Expected ${e}, got ${n.type} ('${n.value}')`);return this.index+=1,n.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;const n=this.token_list[this.index];if(typeof e=="string"&&!Nt.has(e)){if(n.type!=="IDENTIFIER"||n.value!==e)return!1}else if(n.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");const n=this.token_list[this.index];for(const t of e)if(typeof t=="string"){if(Nt.has(t)){if(n.type===t)return this.index+=1,[n.value,t]}else if(n.type==="IDENTIFIER"&&n.value===t)return this.index+=1,[n.value,t]}else if(n.type===t)return this.index+=1,[n.value,t];throw this._make_error(`Expected one of (${e.join(", ")}), got ${n.type} ('${n.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||(this.diagnostic_lines=Ma(this.source)),this.diagnostic_lines}_make_error(e,n=3){const[t]=this.position(),r=this.diagnostic_lines_once(),i=[],a=Math.max(1,t-n),o=Math.min(r.length,t+n);for(let l=a;l<=o;l+=1)l<=r.length&&i.push([l,r[l-1]]);const c=t<=r.length?r[t-1]:"";return new J(e,{line_num:t,line:c,context_lines:i,filename:this.filename})}},Pa=class xi{constructor(n){h(this,"module");h(this,"current_parent");h(this,"source_dir");this.module=n.module,this.current_parent=n.current_parent,this.source_dir=n.source_dir}push_parent(n){return new xi({module:this.module,current_parent:n,source_dir:this.source_dir})}},Ft={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-9223372036854776e3,9223372036854776e3],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,18446744073709552e3]};new Set(Object.keys(Ft));var jn=class{constructor(e={}){h(this,"patterns");h(this,"length");h(this,"range");h(this,"fraction_digits");h(this,"enums");h(this,"bits");h(this,"types");Object.assign(this,e)}};function Fa(e,n){const t=typeof e.error_message=="string"&&e.error_message.trim().length>0?e.error_message:n,r=typeof e.error_app_tag=="string"?e.error_app_tag.trim():"";return r.length>0?`${t} (error-app-tag: ${r})`:t}function Ya(e){const n=(t,r)=>{const i=t.trim().toLowerCase();if(i==="min")return Number.NEGATIVE_INFINITY;if(i==="max")return Number.POSITIVE_INFINITY;const a=Number(i);return Number.isNaN(a)?r==="min"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:a};return e.split("|").map(t=>t.trim()).filter(Boolean).map(t=>{const[r,i]=t.split("..").map(a=>a.trim());if(!i){const a=n(r,"min");return{min:a,max:a}}return{min:n(r,"min"),max:n(i,"max")}})}function nn(e,n){for(const t of Ya(n))if(e>=t.min&&e<=t.max)return!0;return!1}function wi(e){return typeof e=="number"&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e=="string"&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function Ua(e){return typeof e=="number"&&Number.isFinite(e)?e:typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function qa(e,n,t){const r=Ft[e];if(!r)return[!1,`Unsupported integer type '${e}'`];const i=wi(n);if(i===null)return[!1,`Expected ${e}`];if(t)return nn(i,t)?[!0,null]:[!1,`Integer ${i} does not match ${t}`];const[a,o]=r;return i<a?[!1,`Value ${i} is less than minimum ${a}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function Va(e,n){if(typeof e!="string")return[!1,"Expected base64 string"];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!==0)return[!1,"Expected valid base64 string"];try{const t=Buffer.from(e,"base64");if(n&&!nn(t.length,n))return[!1,`Binary length ${t.length} does not match ${n}`]}catch{return[!1,"Expected valid base64 string"]}return[!0,null]}function Ba(e,n){if(typeof e!="string")return[!1,"Bits values must be string tokens"];const t=new Set(n.map(i=>i.name));if(e.trim()==="")return[!0,null];const r=new Set;for(const i of e.trim().split(/\s+/)){if(!t.has(i))return[!1,`Unknown bit token '${i}'`];if(r.has(i))return[!1,`Duplicate bit token '${i}'`];r.add(i)}return[!0,null]}var Ga=class{validate(e,n,t){var a;const r=t??new jn,i=n.trim();if(i==="union"){for(const o of r.types??[]){const c=typeof o.name=="string"?o.name:"string",[l]=this.validate(e,c,new jn(o));if(l)return[!0,null]}return[!1,"Value does not match any union member type"]}if(i==="enumeration")return typeof e!="string"?[!1,"Expected enumeration value (string)"]:r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null];if(i==="string"){if(typeof e!="string")return[!1,"Expected string"];if(r.length&&!nn(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];const o=Array.isArray(r.patterns)?r.patterns:[];if(o.length>0)for(const c of o){if(typeof(c==null?void 0:c.pattern)!="string"||c.pattern.length===0)continue;const l=new RegExp(`^(?:${c.pattern})$`).test(e),p=c.invert_match===!0;if(!p&&!l||p&&l){const f=p?`String matches forbidden pattern ${c.pattern} (invert-match)`:`String does not match pattern ${c.pattern}`;return[!1,Fa(c,f)]}}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i==="boolean")return typeof e=="boolean"?[!0,null]:e==="true"||e==="false"?[!0,null]:[!1,"Expected boolean"];if(i==="empty")return e===null?[!0,null]:[!1,"Expected empty (null)"];if(i in Ft)return qa(i,e,r.range);if(i==="binary")return Va(e,r.length);if(i==="bits")return Ba(e,r.bits??[]);if(i==="decimal64"||i==="number"){const o=Ua(e);if(o===null)return[!1,"Expected number"];if(r.range&&!nn(o,r.range))return[!1,`Number ${o} does not match ${r.range}`];if(typeof r.fraction_digits=="number"){const c=((a=`${o}`.split(".")[1])==null?void 0:a.length)??0;if(c>r.fraction_digits)return[!1,`Too many fraction digits (${c} > ${r.fraction_digits})`]}return[!0,null]}if(i==="int64"||i==="integer"){const o=wi(e);return o===null?[!1,"Expected integer"]:r.range&&!nn(o,r.range)?[!1,`Integer ${o} does not match ${r.range}`]:[!0,null]}return typeof e=="string"?[!0,null]:[!1,`Unsupported type '${i}'`]}};const za={"/yang/modules/netlab-bgp.yang":`module netlab-bgp {
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
  description "Device registry schema (none, linux, frr, bird).";

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
  description "Device registry schema (none, linux, frr, bird).";

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
     this module's data nodes (xYang hybrid encoding).";

  revision 2026-07-16 {
    description "Initial revision.";
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
        leaf virtual_interface {
          type boolean;
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
        leaf vrf {
          type string;
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
      leaf bandwidth {
        type uint64;
      }
      leaf mtu {
        type uint16;
      }
      container prefix {
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf allocation {
          type string;
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
          type uint8;
        }
        leaf start {
          type uint32;
        }
        leaf mac {
          type string;
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
     this module's data nodes (xYang hybrid encoding).";

  revision 2026-07-16 {
    description "Initial revision.";
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
        leaf virtual_interface {
          type boolean;
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
        leaf vrf {
          type string;
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
      leaf bandwidth {
        type uint64;
      }
      leaf mtu {
        type uint16;
      }
      container prefix {
        leaf ipv4 {
          type ntype:ipv4-prefix;
        }
        leaf ipv6 {
          type ntype:ipv6-prefix;
        }
        leaf allocation {
          type string;
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
          type uint8;
        }
        leaf start {
          type uint32;
        }
        leaf mac {
          type string;
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
    description "Initial revision.";
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
}
`,"yang/netlab-types.yang":`module netlab-types {
  yang-version 1.1;
  namespace "urn:exergy-connect:netlab:types";
  prefix ntype;

  organization "Exergy Connect";
  description "Shared typedefs and identities for the Netlab data model.";

  revision 2026-07-16 {
    description "Initial revision.";
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
}
`},ge=new Map(Object.entries(za));function Ot(e){return e.replace(/\\/g,"/").replace(/\/+/g,"/")}function Si(e){const n=Ot(e);if(ge.has(n))return ge.get(n);const t=[n,n.replace(/^\//,""),`/yang/${n.split("/").pop()}`,n.split("/").pop()??""];for(const i of t)if(i&&ge.has(i))return ge.get(i);const r=n.split("/").pop();if(r){for(const[i,a]of ge)if(i.endsWith(`/${r}`)||i===r)return a}}function Ka(e,n){const t=Si(e);if(t===void 0){const r=new Error(`ENOENT: no such file or directory, open '${e}' (yang files: ${[...ge.keys()].join(", ")})`);throw r.code="ENOENT",r}return t}function Ha(e){return Si(e)!==void 0}function Wa(e){const n=Ot(e).replace(/\/$/,""),t=new Set;for(const r of ge.keys()){const i=Ot(r);let a;i.startsWith(n+"/")?a=i.slice(n.length+1):(n==="/yang"||n==="yang")&&i.startsWith("/yang/")&&(a=i.slice(6)),a&&t.add(a.split("/")[0])}return[...t]}function Ja(e){if(!(!e||typeof e!="object"))return new Xa(e)}var Xa=class Ai{constructor(n){h(this,"data");this.data=n}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(t=>new Ai(t))}findStatement(n){return this.statements.find(t=>t.name===n)}},Yt=class{constructor(e,n){h(this,"data");h(this,"source");this.data=e,this.source=n}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){const e=this.data.organization;return typeof e=="string"&&e.length>0?e:void 0}get contact(){const e=this.data.contact;return typeof e=="string"&&e.length>0?e:void 0}get description(){const e=this.data.description;return typeof e=="string"?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){const e=this.data.identities;return!e||typeof e!="object"?{}:e}get statements(){const e=this.data.statements;return Array.isArray(e)?e.map(Ja).filter(n=>!!n):[]}findStatement(e){return this.statements.find(n=>n.name===e)}};function Qa(e,n){const t=Object.keys(e).filter(r=>!n.has(r)).sort();if(t.length>0)throw new TypeError(`unexpected keyword arguments: ${JSON.stringify(t)}`)}function Za(e){Qa(e,new Set(["modules","mode"]));const n=e.mode===void 0?"complete":e.mode,t=new Set;for(let r=0;r<e.modules.length;r+=1){const a=e.modules[r].name;if(!a)throw new TypeError(`modules[${r}] must have a module name`);if(t.has(a))throw new TypeError(`duplicate module name '${a}' in modules`);t.add(a)}return{modules:[...e.modules],mode:n}}var Rt="module",Ti="yang-version",Ei="namespace",Pe="prefix",Ii="organization",Ni="contact",pe="description",$i="revision",Ut="typedef",Ci="identity",Dn="base",Pn="type",eo="enumeration",Sr="path",Ar="require-instance",Tr="enum",xe="status",ki="bit",Er="position",Ir="pattern",Nr="modifier",$r="length",Cr="fraction-digits",kr="range",Oi="grouping",Ve="uses",Ri="refine",Ae="container",Ie="list",Ne="leaf",$e="leaf-list",Ce="anydata",ke="anyxml",Te="choice",Fn="case",Ye="must",fe="when",Mt="presence",Or="key",Rr="min-elements",Mr="max-elements",Lr="ordered-by",Yn="mandatory",tn="config",kn="default",Un="error-message",jr="error-app-tag",K="true",ue="false",Mi="import",Li="include",ji="revision-date",Di="feature",me="if-feature",Pi="augment",Fi="submodule",Dr="belongs-to",we="reference",Pr="argument",Fr="yin-element",no="deviation",Yi="extension",Ui="rpc",to="action",Xn="notification",rn="input",sn="output",ro=["<=",">=","!=","==","//","=","<",">","+","-","*","/"];function io(e){const n=[];let t=0;const r=(i,a,o=t)=>{n.push({kind:i,value:a,position:o})};for(;t<e.length;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==='"'||i==="'"){const c=i,l=t;t+=1;let p="";for(;t<e.length;){const f=e[t];if(f===c&&e[t-1]!=="\\"){t+=1;break}p+=f,t+=1}r("string",p,l);continue}if(/\d/.test(i)||i==="-"&&/\d/.test(e[t+1]??"")){const c=t;let l="";for(e[t]==="-"&&(l+="-",t+=1);t<e.length&&/\d/.test(e[t]);)l+=e[t],t+=1;if(e[t]==="."&&/\d/.test(e[t+1]??""))for(l+=".",t+=1;t<e.length&&/\d/.test(e[t]);)l+=e[t],t+=1;r("number",l,c);continue}if(/[A-Za-z_]/.test(i)){const c=t;let l="";for(;t<e.length&&/[A-Za-z0-9_:\-]/.test(e[t]);)l+=e[t],t+=1;r("identifier",l,c);continue}if(i==="/"){e[t+1]==="/"?(r("operator","//"),t+=2):(r("slash","/"),t+=1);continue}if(i==="."){e[t+1]==="."?(r("dotdot",".."),t+=2):(r("dot","."),t+=1);continue}if(i==="("){r("paren_open","("),t+=1;continue}if(i===")"){r("paren_close",")"),t+=1;continue}if(i==="["){r("bracket_open","["),t+=1;continue}if(i==="]"){r("bracket_close","]"),t+=1;continue}if(i===","){r("comma",","),t+=1;continue}const a=e.slice(t),o=ro.find(c=>a.startsWith(c));if(o){r("operator",o),t+=o.length;continue}t+=1}return r("eof","",t),n}var so=new Set(["=","!=","<",">","<=",">="]),ao=new Set(["+","-"]),qi=class{constructor(e){h(this,"expression");h(this,"tokens");h(this,"position",0);this.expression=e,this.tokens=io(e)}parse(){if(this.current().kind==="eof")throw new se("Empty expression",{expression:this.expression,position:0});const e=this.parseExpression(),n=this.current();if(n.kind!=="eof")throw new se(`Unexpected token: ${n.value||n.kind}`,{expression:this.expression,position:n.position});return e}current(){return this.tokens[this.position]??{kind:"eof",value:"",position:this.expression.length}}consume(e){const n=this.current();if(e&&n.kind!==e)throw new se(`Expected ${e}, got ${n.kind} (${n.value})`,{expression:this.expression,position:n.position});return this.position+=1,n}isKeyword(e){const n=this.current();return n.kind==="identifier"&&n.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword("or");){this.consume();const n=this.parseLogicalAnd();e={kind:"binary",operator:"or",left:e,right:n}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword("and");){this.consume();const n=this.parseComparison();e={kind:"binary",operator:"and",left:e,right:n}}return e}parseComparison(){let e=this.parseAdditive();const n=this.current();if(n.kind==="operator"&&so.has(n.value)){const t=this.consume("operator").value,r=this.parseAdditive();e={kind:"binary",operator:t,left:e,right:r}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){const n=this.current();if(n.kind==="operator"&&ao.has(n.value)){const t=this.consume("operator").value,r=this.parseMultiplicative();e={kind:"binary",operator:t,left:e,right:r}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){const n=this.current();if(n.kind==="slash"){this.consume("slash");const t=this.parsePath(!1);e={kind:"binary",operator:"/",left:e,right:t}}else if(n.kind==="operator"&&n.value==="*"){this.consume("operator");const t=this.parseUnary();e={kind:"binary",operator:"*",left:e,right:t}}else return e}}parseUnary(){const e=this.current();if(e.kind==="operator"&&e.value==="-"){this.consume("operator");const n=this.parseUnary();return{kind:"binary",operator:"-",left:{kind:"literal",value:0},right:n}}if(e.kind==="operator"&&e.value==="+")return this.consume("operator"),this.parseUnary();if(this.isKeyword("not")){this.consume(),this.consume("paren_open");const n=this.parseExpression();return this.consume("paren_close"),{kind:"function",name:"not",args:[n]}}return this.parsePrimary()}parsePrimary(){const e=this.current();if(e.kind==="string")return{kind:"literal",value:this.consume("string").value};if(e.kind==="number"){const n=this.consume("number").value,t=n.includes(".")?Number.parseFloat(n):Number.parseInt(n,10);if(Number.isNaN(t))throw new se(`Invalid number: ${n}`,{expression:this.expression,position:e.position});return{kind:"literal",value:t}}if(e.kind==="identifier"){if(this.isKeyword("true"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!0};if(this.isKeyword("false"))return this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!1};const n=this.tokens[this.position+1];return(n==null?void 0:n.kind)==="paren_open"?this.parseFunctionCall():this.parsePath(!1)}if(e.kind==="dot")return this.consume("dot"),this.current().kind==="paren_open"?(this.consume("paren_open"),this.consume("paren_close"),{kind:"function",name:"current",args:[]}):this.parsePath(!1,".");if(e.kind==="dotdot")return this.parsePath(!1);if(e.kind==="slash")return this.consume("slash"),this.parsePath(!0);if(e.kind==="paren_open"){if(this.consume("paren_open"),this.current().kind==="string"||this.current().kind==="number"){const t=this.parsePrimary();if(t.kind==="literal"&&this.current().kind==="comma"){const r=[t.value];for(;this.current().kind==="comma";){this.consume("comma");const i=this.parsePrimary();if(i.kind!=="literal")throw new se("Value list may only contain literals",{expression:this.expression,position:this.current().position});r.push(i.value)}return this.consume("paren_close"),{kind:"literal",value:r}}if(this.current().kind==="paren_close")return this.consume("paren_close"),t}const n=this.parseExpression();return this.consume("paren_close"),n}throw new se(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){const e=this.consume("identifier").value;this.consume("paren_open");const n=[];if(this.current().kind!=="paren_close")for(n.push(this.parseExpression());this.current().kind==="comma";)this.consume("comma"),n.push(this.parseExpression());return this.consume("paren_close"),{kind:"function",name:e,args:n}}parsePath(e,n,t=!0){const r=[],i=o=>{const c={step:o};for(r.push(c);this.current().kind==="bracket_open";){if(!t)throw new se("Predicates are not allowed in this path context",{expression:this.expression,position:this.current().position});this.consume("bracket_open");const l=this.parseExpression();c.predicate===void 0?c.predicate=l:c.predicate={kind:"binary",operator:"and",left:c.predicate,right:l},this.consume("bracket_close")}return this.current().kind==="slash"?(this.consume("slash"),!0):!1};for(n!==void 0&&i(n);this.current().kind==="dot"||this.current().kind==="dotdot"||this.current().kind==="identifier";){const o=this.consume().value;if(!i(o))break}return{kind:"path",segments:r,isAbsolute:e}}parsePathExpression(e={}){const n=e.allowPredicate??!0;if(this.current().kind==="eof")throw new se("Empty path expression",{expression:this.expression,position:0});let t=!1;this.current().kind==="slash"&&(t=!0,this.consume("slash"));const r=this.parsePath(t,void 0,n),i=this.current();if(i.kind!=="eof")throw new se(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function On(e){return new qi(e).parse()}function Vi(e,n={}){return new qi(e).parsePathExpression(n)}var oo=class{constructor(e=[]){h(this,"statements");this.statements=e}find_statement(e){return this.statements.find(n=>n.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){const e=[];for(const n of this.statements)e.push(...this.collectLeaves(n));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof zi)return[e];if(e instanceof un||e instanceof Gi){const n=[];for(const t of e.statements)n.push(...this.collectLeaves(t));return n}return[]}},Be=class extends oo{constructor(n={}){super(n.statements??[]);h(this,"keyword");h(this,"name");h(this,"description");h(this,"reference");this.keyword=n.keyword??"",this.name=n.name??"",this.description=n.description??"",this.reference=n.reference??""}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(n){return this.name?new Set([this.name]):new Set}childNames(n){return this.child_names(n)}},co=class extends Be{constructor(n={}){super(n);h(this,"must_statements");this.must_statements=n.must_statements??[]}},X=class extends Be{constructor(n={}){super(n);h(this,"when");h(this,"if_features");h(this,"config");this.when=n.when,this.if_features=n.if_features??[],this.config=n.config}get_schema_node(){return this.name||void 0}},Bi=class extends Be{constructor(n={}){super(n);h(this,"type");h(this,"default");this.keyword="typedef",this.type=n.type,this.default=n.default}get_schema_node(){return this.name||void 0}},Yr=class extends Be{constructor(n={}){super(n);h(this,"bases");h(this,"if_features");this.keyword="identity",this.bases=n.bases??[],this.if_features=n.if_features??[]}get_schema_node(){}},lo=class{constructor(e={}){h(this,"name");h(this,"position");this.name=e.name??"",this.position=e.position}},uo=class{constructor(e={}){h(this,"pattern");h(this,"invert_match");h(this,"error_message");h(this,"error_app_tag");this.pattern=e.pattern??"",this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},po=class{constructor(e={}){h(this,"name");h(this,"patterns");h(this,"length");h(this,"range");h(this,"fraction_digits");h(this,"enums");h(this,"bits");h(this,"types");h(this,"path");h(this,"require_instance");h(this,"identityref_bases");this.name=e.name??"",this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},un=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"presence");this.keyword="container",this.must_statements=n.must_statements??[],this.presence=n.presence}},fo=class extends un{constructor(e={}){super(e),this.keyword="notification"}},mo=class extends un{constructor(e={}){super({name:"input",...e}),this.keyword="input"}},ho=class extends un{constructor(e={}){super({name:"output",...e}),this.keyword="output"}},_o=class extends X{constructor(n={}){super(n);h(this,"must_statements");this.keyword="rpc",this.must_statements=n.must_statements??[]}},Gi=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"key");h(this,"min_elements");h(this,"max_elements");this.keyword="list",this.must_statements=n.must_statements??[],this.key=n.key,this.min_elements=n.min_elements,this.max_elements=n.max_elements}},zi=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"type");h(this,"mandatory");h(this,"default");this.keyword="leaf",this.must_statements=n.must_statements??[],this.type=n.type,this.mandatory=n.mandatory??!1,this.default=n.default}},Ki=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"type");h(this,"min_elements");h(this,"max_elements");h(this,"defaults");this.keyword="leaf-list",this.must_statements=n.must_statements??[],this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.defaults=n.defaults??[]}},yo=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"mandatory");this.keyword="anydata",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},go=class extends X{constructor(n={}){super(n);h(this,"must_statements");h(this,"mandatory");this.keyword="anyxml",this.must_statements=n.must_statements??[],this.mandatory=n.mandatory??!1}},Lt=class extends Be{constructor(n={}){super(n);h(this,"argument_name");h(this,"argument_yin_element");h(this,"apply_callback");this.keyword="extension",this.argument_name=n.argument_name??"",this.argument_yin_element=n.argument_yin_element,this.apply_callback=n.apply_callback}apply(n,t){return this.apply_callback?this.apply_callback(n,t.context_module):n}get_schema_node(){}},vo=class extends X{constructor(n){super(n);h(this,"must_statements");h(this,"prefix");h(this,"resolved_module");h(this,"resolved_extension");h(this,"argument");if(this.keyword="extension-invocation",this.must_statements=n.must_statements??[],this.prefix=n.prefix,this.resolved_module=n.resolved_module,this.resolved_extension=n.resolved_extension,this.argument=n.argument,!this.prefix)throw new Error("extension invocation requires a non-empty prefix");if(!this.resolved_module)throw new Error("extension invocation requires resolved_module");if(!this.resolved_extension)throw new Error("extension invocation requires resolved_extension")}get_schema_node(){}},Hi=class{constructor(e){h(this,"expression");h(this,"description");h(this,"ast");this.expression=e.expression,this.description=e.description??"",this.expression&&(this.ast=On(this.expression))}},Ur=class extends Hi{constructor(n){super(n);h(this,"error_message");this.error_message=n.error_message??""}},bo=class extends Hi{constructor(n){super(n);h(this,"evaluate_with_parent_context");this.evaluate_with_parent_context=n.evaluate_with_parent_context??!1}get condition(){return this.expression}},xo=class extends Be{constructor(e={}){super(e),this.keyword="grouping"}},qt=class extends X{constructor(n={}){super(n);h(this,"grouping_name");h(this,"refines");h(this,"augmentations");this.keyword="uses",this.grouping_name=n.grouping_name??"",this.refines=n.refines??[],this.augmentations=n.augmentations??[]}get_schema_node(){}},wo=class extends X{constructor(n={}){super(n);h(this,"augment_path");this.keyword="augment",this.augment_path=n.augment_path??""}get_schema_node(){}},Rn=class extends co{constructor(n={}){super(n);h(this,"target_path");h(this,"type");h(this,"min_elements");h(this,"max_elements");h(this,"refined_defaults");h(this,"refined_mandatory");h(this,"refined_config");h(this,"if_features");this.keyword="refine",this.target_path=n.target_path??"",this.type=n.type,this.min_elements=n.min_elements,this.max_elements=n.max_elements,this.refined_defaults=n.refined_defaults??[],this.refined_mandatory=n.refined_mandatory,this.refined_config=n.refined_config,this.if_features=n.if_features??[]}},En=class extends X{constructor(n={}){super(n);h(this,"mandatory");h(this,"cases");this.keyword="choice",this.mandatory=n.mandatory??!1,this.cases=n.cases??[]}child_names(n){for(const t of this.cases)if(t.statements.some(r=>r.name&&r.name in n))return new Set(t.statements.map(r=>r.name).filter(r=>!!r));return new Set}validate_case_unique_child_names(){const n=new Map;for(const t of this.cases)for(const r of t.statements){const i=r.get_schema_node();if(i){if(n.has(i)){const a=n.get(i);throw new Y(`Choice '${this.name}': schema node '${i}' appears in case '${a}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}n.set(i,t.name)}}}},qr=class extends X{constructor(e={}){super(e),this.keyword="case"}child_names(e){return new Set(this.statements.map(n=>n.name).filter(n=>!!n))}},So=class{constructor(e){h(this,"parsers");this.parsers=e}parse_anydata(e,n){e.consume(Ce);const t=e.consume(),r=new yo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Ao=class{constructor(e){h(this,"parsers");this.parsers=e}parse_anyxml(e,n){e.consume(ke);const t=e.consume(),r=new go({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}};function qn(e,n){const t={...n};return t[pe]??(t[pe]=(r,i)=>{e.parse_description(r,i)}),t[we]??(t[we]=(r,i)=>{e.parse_reference(r,i)}),t[xe]??(t[xe]=(r,i)=>{e.parse_status_ignored(r,i)}),t}function Vn(e,n){const t=qn(e,n);return t[tn]??(t[tn]=(r,i)=>{e.parse_config(r,i)}),t[xe]??(t[xe]=(r,i)=>{e.parse_status_ignored(r,i)}),t}var To=class{constructor(e){h(this,"parsers");h(this,"augmentBodyDispatch");this.parsers=e,this.augmentBodyDispatch=Vn(this.parsers,{[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ve]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ne]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[$e]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ae]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Ie]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[Te]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[Fn]:(n,t)=>{this.parsers.choice_parser.parse_case(n,t)},[Ce]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[ke]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ye]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Xn]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parse_augment(e,n){e.consume(Pi);const t=this.parsers.parse_string_concatenation(e),r=new wo({name:"augment",augment_path:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.substatement_handler(e,this.augmentBodyDispatch);o?o(e,a):e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"?this.parsers.parse_prefixed_extension_statement_public(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,"augment")}e.consume_type("}")}const i=n.current_parent;return i instanceof qt?i.augmentations.push(r):this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Eo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_type_bit(e,n,t){e.consume(ki);const r=e.consume();let i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Er?(e.consume(Er),i=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}t.bits.push(new lo({name:r,position:i})),e.consume_if_type(";")}finalize_bits_type(e){let n=-1;for(const t of e.bits)t.position===void 0&&(t.position=n+1),n=Math.max(n,t.position)}},Io=new Set([Ne,$e,Ae,Ie,Ce,ke,Te]),No=class{constructor(e){h(this,"parsers");h(this,"choiceSubstatementDispatch");h(this,"caseSubstatementDispatch");this.parsers=e,this.choiceSubstatementDispatch=Vn(this.parsers,{[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Fn]:(n,t)=>{this.parse_case(n,t)},[Yn]:(n,t)=>{this.parse_choice_mandatory(n,t)}}),this.caseSubstatementDispatch=Vn(this.parsers,{[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ve]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Ne]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ae]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Ie]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[$e]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ce]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[ke]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[Te]:(n,t)=>{this.parse_choice(n,t)}})}parse_choice(e,n){e.consume(Te);const t=e.consume(),r=new En({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_choice_substatement(e,i,t);e.consume_type("}"),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_choice_substatement(e,n,t){const r=`choice '${t}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,n);return}const a=this.parsers.dispatch_key(e);if(typeof a=="string"&&Io.has(a)){this.parse_choice_implicit_case(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,n){const t=n.current_parent;t instanceof En||e.syntaxError("internal: implicit choice case outside choice body");const r=new qr({name:""}),i=n.push_parent(r),a=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);a||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),a(e,i),r.statements.length===0&&e.syntaxError("Expected a schema node in implicit choice case (RFC 7950 §7.9.2)");const o=r.statements[0],c=o.name||o.get_schema_node();c||e.syntaxError("Implicit choice case requires a named schema node (RFC 7950 §7.9.2)"),r.name=c,t.cases.push(r)}parse_case(e,n){e.consume(Fn);const t=e.consume(),r=new qr({name:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_case_substatement(e,a,t);e.consume_type("}")}const i=n.current_parent;return i instanceof En?i.cases.push(r):this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_case_substatement(e,n,t){const r=`case '${t}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);if(i){i(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,n){e.consume(Yn);const[,t]=e.consume_oneof([K,ue]),r=n.current_parent;r instanceof En&&(r.mandatory=t===K),e.consume_if_type(";")}},$o=class{constructor(e){h(this,"parsers");h(this,"containerSubstatementDispatch");this.parsers=e,this.containerSubstatementDispatch=Vn(this.parsers,{[Mt]:(n,t)=>{this.parsers.parse_presence(n,t)},[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ye]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Ne]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ae]:(n,t)=>{this.parse_container(n,t)},[Ie]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[$e]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ve]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Te]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ce]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[ke]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)},[Xn]:(n,t)=>{this.parsers.notification_parser.parse_notification(n,t)}})}parseContainerSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`container '${t}'`)}parse_container(e,n){e.consume(Ae);const t=e.consume(),r=new un({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseContainerSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Co=class{constructor(e){h(this,"parsers");this.parsers=e}parse_extension_stmt(e,n){e.consume(Yi);const t=e.consume_type("IDENTIFIER"),r=new Lt({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.dispatch_key(e)===Pr?this.parse_extension_argument_stmt(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}return n.module.extensions[t]=r,this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_extension_argument_stmt(e,n){e.consume(Pr);const t=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),r=n.current_parent;if(r instanceof Lt&&(r.argument_name=t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)if(e.peek()===Fr){e.consume(Fr);const[,i]=e.consume_oneof([K,ue]);r.argument_yin_element=i===K,e.consume_if_type(";")}else this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},ko=class{constructor(e){h(this,"parsers");this.parsers=e}parse_feature_stmt(e,n){var i;e.consume(Di);const t=e.consume_type("IDENTIFIER");((i=n.module).features??(i.features=new Set)).add(t);const r={if_features:[]};if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,a);e.consume_type("}")}if(r.if_features.length>0){const a=n.module,o=a.feature_if_features??(a.feature_if_features={});o[t]=[...r.if_features]}e.consume_if_type(";")}parse_if_feature_stmt(e,n){e.consume(me);const t=this.parsers.parse_string_concatenation(e),r=n.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(t),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}},Oo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_grouping(e,n){e.consume(Oi);const t=e.consume(),r=new xo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.groupings[t]=r,e.consume_if_type(";")}},Ro=class{constructor(e){h(this,"parsers");this.parsers=e}parse_identity(e,n){e.consume(Ci);const t=e.consume_type("IDENTIFIER"),r=new Yr({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Dn?this.parse_identity_base(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}n.module.identities[t]=r,e.consume_if_type(";")}parse_identity_base(e,n){e.consume(Dn);const t=this.parsers.consume_qname_from_identifier(e),r=n.current_parent;r instanceof Yr&&r.bases.push(t),e.consume_if_type(";")}},Mo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_leaf(e,n){e.consume(Ne);const t=e.consume(),r=new zi({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Lo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_leaf_list(e,n){e.consume($e);const t=e.consume(),r=new Ki({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},jo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_list(e,n){e.consume(Ie);const t=e.consume(),r=new Gi({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Do=class{constructor(e){h(this,"parsers");this.parsers=e}parse_module(e,n){for(e.consume(Rt),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}parse_yang_version(e,n){e.consume(Ti);const[t]=e.consume_oneof(["IDENTIFIER","DOTTED_NUMBER"]);n.module.yang_version=t,e.consume_if_type(";")}parse_namespace(e,n){e.consume(Ei),n.module.namespace=e.consume_type("STRING"),e.consume_if_type(";")}parse_prefix(e,n){e.consume(Pe);const t=this.parsers.dispatch_key(e);n.module.prefix=t==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}parse_organization(e,n){e.consume(Ii),n.module.organization=e.consume_type("STRING"),e.consume_if_type(";")}parse_contact(e,n){e.consume(Ni),n.module.contact=e.consume_type("STRING"),e.consume_if_type(";")}parse_import_stmt(e,n){e.consume(Mi);const t=e.consume_type("IDENTIFIER");let r,i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const a=this.parsers.dispatch_key(e);if(a===Pe){e.consume(Pe),r=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";");continue}if(a===ji){i=this.parsers.revision_parser.parse_revision_date_statement(e);continue}this.skip_nested_statement(e)}e.consume_type("}")}if(e.consume_if_type(";"),!r||r.trim().length===0)throw new Y(`Import '${t}' is missing required prefix substatement`);this.parsers.register_import(n,t,r,i,e)}parse_include_stmt(e,n){if(e.consume(Li),e.consume_type("IDENTIFIER"),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,n);e.consume_type("}")}e.consume_if_type(";")}parse_prefix_value_stmt(e){e.consume(Pe),e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}skip_nested_statement(e){let n=0;for(;e.has_more();){const t=this.parsers.dispatch_key(e);if(t==="{"){n+=1,e.consume_type("{");continue}if(t==="}"){if(n===0)return;n-=1,e.consume_type("}");continue}if(t===";"&&n===0){e.consume_type(";");return}e.consume()}}},Po=class{constructor(e){h(this,"parsers");this.parsers=e}parse_notification(e,n){e.consume(Xn);const t=e.consume(),r=new fo({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Fo=class{constructor(e){h(this,"parsers");h(this,"ioSubstatementDispatch");h(this,"rpcSubstatementDispatch");this.parsers=e,this.ioSubstatementDispatch=qn(this.parsers,{[Ut]:(n,t)=>{this.parsers.typedef_parser.parse_typedef(n,t)},[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ye]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[Ne]:(n,t)=>{this.parsers.leaf_parser.parse_leaf(n,t)},[Ae]:(n,t)=>{this.parsers.container_parser.parse_container(n,t)},[Ie]:(n,t)=>{this.parsers.list_parser.parse_list(n,t)},[$e]:(n,t)=>{this.parsers.leaf_list_parser.parse_leaf_list(n,t)},[Ve]:(n,t)=>{this.parsers.uses_parser.parse_uses(n,t)},[Te]:(n,t)=>{this.parsers.choice_parser.parse_choice(n,t)},[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)},[Ce]:(n,t)=>{this.parsers.anydata_parser.parse_anydata(n,t)},[ke]:(n,t)=>{this.parsers.anyxml_parser.parse_anyxml(n,t)}}),this.rpcSubstatementDispatch=qn(this.parsers,{[fe]:(n,t)=>{this.parsers.when_parser.parse_when(n,t)},[Ye]:(n,t)=>{this.parsers.must_parser.parse_must(n,t)},[rn]:(n,t)=>{this.parse_input(n,t)},[sn]:(n,t)=>{this.parse_output(n,t)},[me]:(n,t)=>{this.parsers.feature_parser.parse_if_feature_stmt(n,t)}})}parseIoSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`${t} block`)}parseIoBlock(e,n,t,r){if(e.consume(t),e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseIoSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}parse_input(e,n){return this.parseIoBlock(e,n,rn,new mo)}parse_output(e,n){return this.parseIoBlock(e,n,sn,new ho)}parseRpcSubstatement(e,n,t){const r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);if(r){r(e,n);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,n);return}this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${t}'`)}parse_rpc(e,n){e.consume(Ui);const t=e.consume(),r=new _o({name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseRpcSubstatement(e,i,t);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Yo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_must(e,n){e.consume(Ye);const t=this.parsers.parse_string_concatenation(e),r=new Ur({expression:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Un?this.parse_must_error_message(e,a):this.parsers.parseStatement(e,a);e.consume_type("}")}const i=n.current_parent;return Array.isArray(i==null?void 0:i.must_statements)&&i.must_statements.push(r),e.consume_if_type(";"),r}parse_must_error_message(e,n){e.consume(Un);const t=n.current_parent;t instanceof Ur&&(t.error_message=e.consume_type("STRING")),e.consume_if_type(";")}},Uo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_refine(e,n){e.consume(Ri);const t=[e.consume()];for(;e.has_more()&&e.peek_type()==="/";)e.consume_type("/"),t.push(e.consume());const r=t.join("/"),i=new Rn({name:"refine",target_path:r});if(e.consume_if_type("{")){const a=n.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,a);e.consume_type("}")}n.current_parent instanceof qt&&n.current_parent.refines.push(i),e.consume_if_type(";")}},qo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_revision(e,n){var i;e.consume($i);let t="";if(e.peek_type()==="STRING")t=e.consume_type("STRING");else for(;e.has_more()&&!["{",";"].includes(e.peek_type());)t+=e.consume();const r={date:t,description:"",reference:""};if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===pe?(e.consume(pe),r.description=e.consume_type("STRING"),e.consume_if_type(";")):e.peek()===we?(e.consume(we),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(";")):this.parsers.parseStatement(e,n);e.consume_type("}")}((i=n.module).revisions??(i.revisions=[])).push(r),e.consume_if_type(";")}parse_revision_date_statement(e){e.consume(ji);let n="";if(e.peek_type()==="STRING")n=e.consume_type("STRING");else for(;e.has_more()&&e.peek_type()!==";";)n+=e.consume();return e.consume_if_type(";"),n}},Vo=class{constructor(e,n){h(this,"parsers");h(this,"module_parser");this.parsers=e,this.module_parser=n}parse_submodule(e,n){for(e.consume(Fi),n.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Dr?this.parse_belongs_to(e,n):this.parsers.parseStatement(e,n);e.consume_type("}")}parse_belongs_to(e,n){for(e.consume(Dr),n.module.belongs_to_module=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Pe?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,n);e.consume_type("}"),e.consume_if_type(";")}},Bo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_type(e,n){e.consume(Pn);const t=e.peek_type()==="IDENTIFIER"?this.parsers.consume_qname_from_identifier(e):e.consume(),r=new po({name:t});if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.dispatch_key(e);if(o===Ir)this.parse_type_pattern(e,a,r);else if(o===$r)this.parse_type_length(e,a,r);else if(o===kr)this.parse_type_range(e,a,r);else if(o===Cr)this.parse_type_fraction_digits(e,a,r);else if(o===Tr)this.parse_type_enum(e,a,r);else if(o===ki)this.parsers.bits_parser.parse_type_bit(e,a,r);else if(o===Sr)this.parse_type_path(e,a,r);else if(o===Ar)this.parse_type_require_instance(e,a,r);else if(o===Dn)this.parse_type_base(e,a,r);else if(o===Pn){const c=this.parse_type(e,a);r.types.push(c)}else this.parsers.parseStatement(e,a)}e.consume_type("}"),r.name===eo&&r.enums.length===0&&e.syntaxError("enumeration type must contain at least one enum statement")}const i=n.current_parent;return i&&"type"in i&&!i.type&&(i.type=r),e.consume_if_type(";"),r}parse_type_base(e,n,t){e.consume(Dn),t.identityref_bases.push(this.parsers.consume_qname_from_identifier(e)),e.consume_if_type(";")}parse_type_pattern(e,n,t){e.consume(Ir);const r=this.parsers.parse_string_concatenation(e);let i=!1,a,o;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){const c=this.parsers.dispatch_key(e);c===Un?(e.consume(Un),a=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):c===jr?(e.consume(jr),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):c===Nr?(e.consume(Nr),i=e.consume()==="invert-match",e.consume_if_type(";")):this.parsers.parseStatement(e,n)}e.consume_type("}")}t.patterns.push(new uo({pattern:r,invert_match:i,error_message:a,error_app_tag:o})),e.consume_if_type(";")}parse_type_length(e,n,t){e.consume($r),t.length=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_range(e,n,t){e.consume(kr),t.range=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_fraction_digits(e,n,t){e.consume(Cr),t.fraction_digits=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")}parse_type_enum(e,n,t){if(e.consume(Tr),t.enums.push(e.consume()),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";")}parse_type_path(e,n,t){e.consume(Sr);const r=this.parsers.parse_string_argument(e);t.path=Vi(r),e.consume_if_type(";")}parse_type_require_instance(e,n,t){e.consume(Ar);const[,r]=e.consume_oneof([K,ue]);t.require_instance=r===K,e.consume_if_type(";")}},Go=class{constructor(e){h(this,"parsers");h(this,"typedefBodyDispatch");this.parsers=e,this.typedefBodyDispatch=qn(this.parsers,{[Pn]:(n,t)=>{this.parsers.type_parser.parse_type(n,t)},[kn]:(n,t)=>{this.parsers.parse_typedef_default(n,t)}})}parse_typedef(e,n){e.consume(Ut);const t=e.consume_type("IDENTIFIER"),r=new Bi({name:t}),i=`typedef '${t}'`;if(e.consume_if_type("{")){const a=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){const o=this.parsers.substatement_handler(e,this.typedefBodyDispatch);o?o(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type("}")}return n.module.typedefs[t]=r,e.consume_if_type(";"),r}},zo=class{constructor(e){h(this,"parsers");this.parsers=e}parse_uses(e,n){e.consume(Ve);const t=e.peek_type()==="IDENTIFIER"?this.parsers.consume_qname_from_identifier(e):e.consume(),r=new qt({name:"uses",grouping_name:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(n,r),e.consume_if_type(";"),r}},Ko=class{constructor(e){h(this,"parsers");this.parsers=e}parse_when(e,n){e.consume(fe);const t=this.parsers.parse_string_concatenation(e),r=new bo({expression:t});if(e.consume_if_type("{")){const i=n.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}n.current_parent instanceof X&&(n.current_parent.when=r),e.consume_if_type(";")}},Wi=new Set([no,to]);function Ho(e){let n=0;for(;e.has_more();){const t=e.peek_type();if(t==="{")n+=1,e.consume_type("{");else if(t==="}"){if(n-=1,e.consume_type("}"),n===0)return}else e.consume()}}function Wo(e,{context:n}){const t=e.peek_token();if(!t||!Wi.has(t.value))return;const r=t.value,[i,a]=e.position(),o=e.filename??"<string>";for(console.warn(`Ignoring unsupported YANG statement '${r}' (${n}) at ${o}:${i}:${a}`),e.consume();e.has_more();){const c=e.peek_type();if(c==="{"){Ho(e);break}if(c===";"){e.consume_type(";");return}if(c==="}")return;e.consume()}e.consume_if_type(";")}function Jo(e){const n=e.peek_token();return n!==void 0&&Wi.has(n.value)}function Xo(e){e.consume(xe),e.peek_type()==="IDENTIFIER"&&e.consume_type("IDENTIFIER"),e.consume_if_type(";")}function Qo(e){if(typeof e.keyword=="string"&&e.keyword.trim().length>0)return e.keyword;throw new Y("Internal error: cannot serialize AST statement without a keyword")}var Zo=class{constructor(e={}){h(this,"importResolver");h(this,"anydata_parser",new So(this));h(this,"anyxml_parser",new Ao(this));h(this,"augment_parser",new To(this));h(this,"bits_parser",new Eo(this));h(this,"choice_parser",new No(this));h(this,"container_parser",new $o(this));h(this,"extension_parser",new Co(this));h(this,"feature_parser",new ko(this));h(this,"grouping_parser",new Oo(this));h(this,"identity_parser",new Ro(this));h(this,"leaf_parser",new Mo(this));h(this,"leaf_list_parser",new Lo(this));h(this,"list_parser",new jo(this));h(this,"module_parser",new Do(this));h(this,"notification_parser",new Po(this));h(this,"rpc_parser",new Fo(this));h(this,"must_parser",new Yo(this));h(this,"refine_parser",new Uo(this));h(this,"revision_parser",new qo(this));h(this,"submodule_parser",new Vo(this,this.module_parser));h(this,"type_parser",new Bo(this));h(this,"typedef_parser",new Go(this));h(this,"uses_parser",new zo(this));h(this,"when_parser",new Ko(this));h(this,"statementKeywordHandlers",{[Ne]:(e,n)=>this.fromAst(this.leaf_parser.parse_leaf(e,n)),[$e]:(e,n)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,n)),[Ae]:(e,n)=>this.fromAst(this.container_parser.parse_container(e,n)),[Ie]:(e,n)=>this.fromAst(this.list_parser.parse_list(e,n)),[Xn]:(e,n)=>this.fromAst(this.notification_parser.parse_notification(e,n)),[Ui]:(e,n)=>this.fromAst(this.rpc_parser.parse_rpc(e,n)),[Ce]:(e,n)=>this.fromAst(this.anydata_parser.parse_anydata(e,n)),[ke]:(e,n)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,n)),[Te]:(e,n)=>this.fromAst(this.choice_parser.parse_choice(e,n)),[Fn]:()=>{throw new J("'case' is only valid as a substatement of 'choice' (RFC 7950)")},[rn]:()=>{throw new J("'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[sn]:()=>{throw new J("'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[Ut]:(e,n)=>this.fromAst(this.typedef_parser.parse_typedef(e,n)),[Pn]:(e,n)=>this.fromType(this.type_parser.parse_type(e,n)),[Ve]:(e,n)=>this.fromAst(this.uses_parser.parse_uses(e,n)),[Ri]:(e,n)=>(this.refine_parser.parse_refine(e,n),{__class__:"YangStatement",keyword:"refine",statements:[]}),[Ye]:(e,n)=>this.fromMust(this.must_parser.parse_must(e,n)),[fe]:(e,n)=>(this.when_parser.parse_when(e,n),{__class__:"YangStatement",keyword:"when",statements:[]}),[Yi]:(e,n)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,n)),[Di]:(e,n)=>(this.feature_parser.parse_feature_stmt(e,n),{__class__:"YangStatement",keyword:"feature",statements:[]}),[me]:(e,n)=>(this.feature_parser.parse_if_feature_stmt(e,n),{__class__:"YangStatement",keyword:"if-feature",statements:[]}),[Ci]:(e,n)=>(this.identity_parser.parse_identity(e,n),{__class__:"YangStatement",keyword:"identity",statements:[]}),[Oi]:(e,n)=>(this.grouping_parser.parse_grouping(e,n),{__class__:"YangStatement",keyword:"grouping",statements:[]}),[Pi]:(e,n)=>this.fromAst(this.augment_parser.parse_augment(e,n)),[$i]:(e,n)=>(this.revision_parser.parse_revision(e,n),{__class__:"YangStatement",keyword:"revision",statements:[]}),[pe]:(e,n)=>({__class__:"YangStatement",keyword:"description",argument:this.parse_description(e,n),name:"description",statements:[]}),[Yn]:(e,n)=>(this.parse_leaf_mandatory(e,n),{__class__:"YangStatement",keyword:"mandatory",statements:[]}),[kn]:(e,n)=>(this.parse_leaf_default(e,n),{__class__:"YangStatement",keyword:"default",statements:[]}),[Or]:(e,n)=>(this.parse_list_key(e,n),{__class__:"YangStatement",keyword:"key",statements:[]}),[Rr]:(e,n)=>(this.parse_min_elements(e,n),{__class__:"YangStatement",keyword:"min-elements",statements:[]}),[Mr]:(e,n)=>(this.parse_max_elements(e,n),{__class__:"YangStatement",keyword:"max-elements",statements:[]}),[Lr]:(e,n)=>(this.parse_ordered_by(e),{__class__:"YangStatement",keyword:"ordered-by",statements:[]}),[Mt]:(e,n)=>(this.parse_presence(e,n),{__class__:"YangStatement",keyword:"presence",statements:[]}),[we]:(e,n)=>(this.parse_reference(e,n),{__class__:"YangStatement",keyword:"reference",statements:[]}),[tn]:(e,n)=>(this.parse_config(e,n),{__class__:"YangStatement",keyword:"config",statements:[]})});this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()==="IDENTIFIER"?e.peek()??"":e.peek_type()}assertStatementStartAllowed(e,n,t){const r=n instanceof Set?n:new Set(n),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return;const a=t?` ${t}`:"",o=e.peek()??"<end>",c=[...r].map(l=>String(l)).sort().join(", ");throw new J(`Invalid statement starting with '${o}'${a}. Allowed here: ${c}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,n){const t=this.parseStatement(e,n);if(t.keyword!=="module")throw new Y("Expected top-level 'module' statement");return t}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,n,t){t!=null&&t.allowedStatementStarts&&this.assertStatementStartAllowed(e,t.allowedStatementStarts,t.restrictionContext);const r=this.dispatch_key(e);if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return this.parse_prefixed_extension_statement(e,n);const i=this.statementKeywordHandlers[r];return i?i(e,n):this.parse_statement_generic(e,n)}parse_statement_generic(e,n){const t=this.dispatch_key(e);if(t===Rt)return this.parse_top_level_module(e,n);if(t===Fi)return this.submodule_parser.parse_submodule(e,n),{__class__:"YangStatement",keyword:"submodule",statements:[]};if(t===Ti)return this.module_parser.parse_yang_version(e,n),{__class__:"YangStatement",keyword:"yang-version",argument:n.module.yang_version,name:"yang-version",statements:[]};if(t===Ei)return this.module_parser.parse_namespace(e,n),{__class__:"YangStatement",keyword:"namespace",argument:n.module.namespace,name:"namespace",statements:[]};if(t===Pe)return this.module_parser.parse_prefix(e,n),{__class__:"YangStatement",keyword:"prefix",argument:n.module.prefix,name:"prefix",statements:[]};if(t===Ii)return this.module_parser.parse_organization(e,n),{__class__:"YangStatement",keyword:"organization",statements:[]};if(t===Ni)return this.module_parser.parse_contact(e,n),{__class__:"YangStatement",keyword:"contact",statements:[]};if(t===Mi)return this.module_parser.parse_import_stmt(e,n),{__class__:"YangStatement",keyword:"import",statements:[]};if(t===Li)return this.module_parser.parse_include_stmt(e,n),{__class__:"YangStatement",keyword:"include",statements:[]};if(this.skip_unsupported_if_present(e,"generic"))return{__class__:"YangStatement",keyword:"unsupported",statements:[]};const r=e.peek();(r===rn||r===sn)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let a=e.consume();e.peek_type()===":"&&(e.consume_type(":"),a=`${a}:${e.consume_type("IDENTIFIER")}`);const o=this.parse_argument(e),c=[];if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)c.push(this.parseStatement(e,n));e.consume_type("}"),e.consume_if_type(";")}else e.consume_if_type(";");const l={__class__:"YangStatement",keyword:a,name:o,argument:o,statements:c};return a==="type"&&(l.type=this.extract_type_shape(l)),l}parse_argument(e){const n=[];for(;e.has_more();){const t=e.peek_type();if(t===";"||t==="{")break;t==="STRING"?n.push(this.parse_string_concatenation(e)):t==="+"?e.consume_type("+"):n.push(e.consume())}return n.join("").trim()}parse_string_concatenation(e){const n=[e.consume_type("STRING")];for(;e.has_more()&&e.peek_type()==="+";)e.consume_type("+"),n.push(e.consume_type("STRING"));return n.join("")}parse_string_argument(e){return e.peek_type()==="STRING"?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,"")}substatement_handler(e,n){const t=this.dispatch_key(e);if(typeof t=="string")return n[t]}skip_unsupported_or_raise_unknown(e,n){const t=e.peek();if((t===rn||t===sn)&&e.syntaxError(`'${t}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,n))return!0;const r=e.peek()??"<eof>";e.syntaxError(`Invalid or unknown statement '${r}' in ${n}`)}parse_prefixed_extension_statement_public(e,n){this.parse_prefixed_extension_statement(e,n)}consume_qname_from_identifier(e){const n=[e.consume_type("IDENTIFIER")];for(;e.consume_if_type(":");)n.push(e.consume_type("IDENTIFIER"));return n.join(":")}add_to_parent_or_module(e,n){const t=e.current_parent;if(t&&Array.isArray(t.statements)){t.statements.push(n);return}const r=e.module;Array.isArray(r.statements)&&r.statements.push(n)}skip_unsupported_if_present(e,n){return Jo(e)?(Wo(e,{context:n}),!0):!1}parse_top_level_module(e,n){e.consume(Rt);const t=e.consume_type("IDENTIFIER");n.module.name=t,e.consume_type("{");const r=[];for(;e.has_more()&&e.peek_type()!=="}";)r.push(this.parseStatement(e,n));return e.consume_type("}"),{__class__:"YangStatement",keyword:"module",name:t,argument:t,statements:r}}fromAst(e){var p,f;const n=Qo(e),t=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:"YangStatement",keyword:n,name:e.name,argument:e.name,statements:t};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);const i=e.config;if(typeof i=="boolean"&&(r.config=i),n==="leaf-list"){const m=e.defaults;Array.isArray(m)&&m.length>0&&(r.defaults=[...m])}e.key!==void 0&&(r.key=e.key);const a=e.min_elements;typeof a=="number"&&(r.min_elements=a);const o=e.max_elements;typeof o=="number"&&(r.max_elements=o),e.description&&(r.description=e.description);const c=e.reference;if(c&&(r.reference=c),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),n==="extension"&&(typeof e.argument_name=="string"&&(r.argument_name=e.argument_name),typeof e.argument_yin_element=="boolean"&&(r.argument_yin_element=e.argument_yin_element)),n==="augment"&&typeof e.augment_path=="string"&&(r.argument=e.augment_path,r.augment_path=e.augment_path),n==="extension-invocation"&&(r.keyword=e.name??"extension-invocation",r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=(p=e.resolved_module)==null?void 0:p.name,r.resolved_extension_name=(f=e.resolved_extension)==null?void 0:f.name),e.when&&typeof e.when.expression=="string"&&(r.when={expression:e.when.expression,description:e.when.description??"",evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(m=>this.fromMust(m))]),n==="uses"){const m=e;typeof m.grouping_name=="string"&&m.grouping_name.length>0&&(r.grouping_name=m.grouping_name,r.argument=m.grouping_name),Array.isArray(m.refines)&&m.refines.length>0&&(r.refines=m.refines.map(d=>this.serializeRefineStmt(d)))}const l=e.presence;return typeof l=="string"&&l.length>0&&(r.presence=l),r}serializeRefineStmt(e){const n={__class__:"YangStatement",keyword:"refine",name:"refine",argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements=="number"&&(n.min_elements=e.min_elements),typeof e.max_elements=="number"&&(n.max_elements=e.max_elements),typeof e.refined_mandatory=="boolean"&&(n.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(n.refined_defaults=[...e.refined_defaults]),typeof e.refined_config=="boolean"&&(n.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(n.if_features=[...e.if_features]),typeof e.description=="string"&&e.description.length>0&&(n.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(n.statements=e.must_statements.map(t=>this.fromMust(t))),n}serializeAstChildren(e){const n=[];for(const t of e)!t||typeof t!="object"||n.push(this.fromAst(t));return n}fromType(e){return{__class__:"YangStatement",keyword:"type",name:e.name,argument:e.name,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:"YangStatement",keyword:"must",name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){return{name:e.name,patterns:e.patterns.map(n=>({pattern:n.pattern,invert_match:n.invert_match,error_message:n.error_message,error_app_tag:n.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:[...e.identityref_bases],enums:[...e.enums],bits:e.bits.map(n=>({name:n.name,position:n.position??0})),types:e.types.map(n=>this.fromTypeShape(n))}}extract_type_shape(e){const n=e.argument??"string",t={name:n};for(const r of e.statements??[]){if(r.keyword==="pattern"&&r.argument){const i=t.patterns??[];i.push({pattern:r.argument,invert_match:!1}),t.patterns=i}if(r.keyword==="length"&&r.argument&&(t.length=r.argument),r.keyword==="range"&&r.argument&&(t.range=r.argument),r.keyword==="fraction-digits"&&r.argument){const i=Number.parseInt(r.argument,10);Number.isNaN(i)||(t.fraction_digits=i)}if(r.keyword==="enum"&&r.argument&&(t.enums=[...t.enums??[],r.argument]),r.keyword==="bit"&&r.argument){const i=t.bits??[];i.push({name:r.argument,position:i.length===0?0:Math.max(...i.map(a=>a.position))+1}),t.bits=i}n==="union"&&r.keyword==="type"&&(t.types=[...t.types??[],this.extract_type_shape(r)])}return t}parse_description(e,n){e.consume(pe);const t=e.consume_type("STRING");if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";");const r=n.current_parent;return r&&"description"in r&&(r.description=t),t}parse_optional_description(e,n){e.has_more()&&e.peek()===pe&&this.parse_description(e,n)}parse_reference(e,n){e.consume(we);const t=e.consume_type("STRING");e.consume_if_type(";");const r=n.current_parent;r&&typeof r=="object"&&"reference"in r&&(r.reference=t)}parse_reference_string_only(e,n){this.parse_reference(e,n)}parse_status_ignored(e,n){Xo(e)}parse_config(e,n){e.consume(tn);const t=e.consume_oneof([K,ue])[1],r=n.current_parent;r instanceof Rn?r.refined_config=t===K:r&&typeof r=="object"&&"config"in r&&(r.config=t===K),e.consume_if_type(";")}parse_typedef_default(e,n){e.consume(kn);const t=n.current_parent;t instanceof Bi&&(t.default=this.parse_default_value_tokens(e)),e.consume_if_type(";")}register_import(e,n,t,r,i){const a=e.module,o=String(a.prefix??"").replace(/^['"]|['"]$/g,"");if(t===o)throw new Y(`Import prefix '${t}' must differ from this module's prefix`);const c=a.import_prefixes??{};if(a.import_prefixes=c,c[t])throw new Y(`Duplicate import prefix '${t}'`);if(!this.importResolver)throw new Y("Import resolution is not configured for this parser instance");c[t]=this.importResolver(n,t,r,e,i)}parse_ordered_by(e){e.consume(Lr),e.consume(),e.consume_if_type(";")}parse_list_key(e,n){e.consume(Or);const[t]=e.consume_oneof(["STRING","IDENTIFIER"]),r=n.current_parent;r&&"key"in r&&(r.key=t),e.consume_if_type(";")}parse_min_elements(e,n){e.consume(Rr);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"min_elements"in r&&(r.min_elements=t),e.consume_if_type(";")}parse_max_elements(e,n){e.consume(Mr);const t=Number.parseInt(e.consume_type("INTEGER"),10),r=n.current_parent;r&&"max_elements"in r&&(r.max_elements=t),e.consume_if_type(";")}parse_leaf_mandatory(e,n){e.consume(Yn);const[,t]=e.consume_oneof([K,ue]),r=n.current_parent;if(r instanceof Rn){r.refined_mandatory=t===K,e.consume_if_type(";");return}r&&typeof r=="object"&&"mandatory"in r&&(r.mandatory=t===K),e.consume_if_type(";")}parse_leaf_default(e,n){e.consume(kn);const t=this.parse_default_value_tokens(e),r=n.current_parent;r instanceof Rn?r.refined_defaults.push(t):r instanceof Ki?r.defaults.push(t):r&&typeof r=="object"&&"default"in r&&(r.default=t),e.consume_if_type(";")}parse_presence(e,n){e.consume(Mt);const t=n.current_parent,r=e.consume_type("STRING");t&&"presence"in t&&(t.presence=r),e.consume_if_type(";")}parse_default_value_tokens(e){const n=e.peek_type();if(n==="STRING")return e.consume_type("STRING");if(n==="INTEGER")return e.consume_type("INTEGER");if(n==="IDENTIFIER")return e.consume_type("IDENTIFIER");if(n===K)return e.consume(K),"true";if(n===ue)return e.consume(ue),"false";throw new Y(`Expected default value, got ${n}`)}parse_prefixed_extension_statement(e,n){const t=e.consume_type("IDENTIFIER");e.consume_type(":");const r=e.consume_type("IDENTIFIER"),i=this.resolve_prefixed_module(n,t);if(!i)throw new Y(`Unknown extension prefix '${t}' in invocation ${t}:${r}`);const a=this.resolve_extension_definition(i,r);if(!a)throw new Y(`Unknown extension '${r}' in module '${i.name??""}' for invocation ${t}:${r}`);const o=this.consume_optional_extension_argument(e),c=new vo({name:`${t}:${r}`,prefix:t,resolved_module:i,resolved_extension:a,argument:o});if(e.consume_if_type("{")){const l=n.push_parent(c);for(;e.has_more()&&e.peek_type()!=="}";)this.parseStatement(e,l);e.consume_type("}")}return e.consume_if_type(";"),this.add_to_parent_or_module(n,c),this.fromAst(c)}consume_optional_extension_argument(e){if(!e.has_more())return;const n=e.peek_type();if(!(n==="{"||n===";")){if(n==="STRING")return this.parse_string_concatenation(e);if(n==="IDENTIFIER"||n==="INTEGER"||n==="DOTTED_NUMBER"||n===K||n===ue)return e.consume()}}resolve_prefixed_module(e,n){const t=e.module,r=String(t.prefix??"").replace(/^['"]|['"]$/g,"");if(n===r)return t;const i=t.import_prefixes;return i==null?void 0:i[n]}resolve_extension_definition(e,n){var a;const t=(a=e.extensions)==null?void 0:a[n];if(t)return t;const i=(Array.isArray(e.statements)?e.statements:[]).find(o=>o.keyword==="extension"&&o.name===n);if(i)return new Lt({name:n,argument_name:typeof i.argument_name=="string"?i.argument_name:"",argument_yin_element:typeof i.argument_yin_element=="boolean"?i.argument_yin_element:void 0})}};function ec(e,n){if(n!=="'"&&n!=='"')throw new Error(`quote must be "'" or '"', got ${JSON.stringify(n)}`);const t=[];let r=0;const i=e.length;for(;r<i;){const a=e[r];if(a!=="\\"||r+1>=i){t.push(a),r+=1;continue}const o=e[r+1];if(o==="\\"){t.push("\\"),r+=2;continue}if(o==="n"){t.push(`
`),r+=2;continue}if(o==="t"){t.push("	"),r+=2;continue}if(n==='"'&&o==='"'){t.push('"'),r+=2;continue}if(n==="'"&&o==="'"){t.push("'"),r+=2;continue}if(o==="\r"||o===`
`){for(r+=2,o==="\r"&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===" "||e[r]==="	");)r+=1;continue}t.push("\\",o),r+=2}return t.join("")}var nc=/[A-Za-z_]/,tc=/[A-Za-z0-9_.-]/,rc=class{tokenize(e,n){const t=[];let r=0;const i=e.length;let a=1,o=0;const c=()=>{r<i&&e[r]===`
`&&(a+=1,o=r+1),r+=1},l=(p,f,m,d,g)=>{const N=m-g;t.push(ja(p,f,d,N))};for(;r<i;){if(/\s/.test(e[r])){c();continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="*"){for(c(),c();r<i;){if(r+1<i&&e[r]==="*"&&e[r+1]==="/"){c(),c();break}c()}continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="/"){for(c(),c();r<i&&e[r]!==`
`;)c();continue}const p=e[r];if(p==='"'||p==="'"){const f=p,m=r,d=a,g=o;c();const N=r;for(;r<i&&e[r]!==f;)e[r]==="\\"&&r+1<i&&c(),c();l("STRING",ec(e.slice(N,r),f),m,d,g),c();continue}if(p==="-"&&r+1<i&&/\d/.test(e[r+1])){const f=r,m=a,d=o;c();const g=r;for(;r<i&&/\d/.test(e[r]);)c();l("INTEGER",`-${e.slice(g,r)}`,f,m,d);continue}if(/\d/.test(p)){const f=r,m=a,d=o,g=r;for(;r<i&&/\d/.test(e[r]);)c();if(r<i&&e[r]==="."&&r+1<i&&/\d/.test(e[r+1])){for(c();r<i&&/\d/.test(e[r]);)c();l("DOTTED_NUMBER",e.slice(g,r),f,m,d)}else l("INTEGER",e.slice(g,r),f,m,d);continue}if(nc.test(p)){const f=r,m=a,d=o,g=r;for(c();r<i&&tc.test(e[r]);)c();const N=e.slice(g,r);l("IDENTIFIER",N,f,m,d);continue}p==="{"?(l("{",p,r,a,o),c()):p==="}"?(l("}",p,r,a,o),c()):p===";"?(l(";",p,r,a,o),c()):p===":"?(l(":",p,r,a,o),c()):p==="="?(l("=",p,r,a,o),c()):p==="+"?(l("+",p,r,a,o),c()):(p==="/"&&l("/",p,r,a,o),c())}return new Da(t,e,n)}},an="ietf-yang-structure-ext:structure-index";function oe(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function on(e){return Array.isArray(e)?e:[]}function ic(e){return JSON.parse(JSON.stringify(e))}function sc(e,n){if(n.length===0)return;const t=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...n,...t]}function ac(e,n){if(!n||typeof n.expression!="string")return;const t=n.expression,r=oe(e.when)?e.when:void 0,i=typeof(r==null?void 0:r.expression)=="string"?r.expression:void 0;if(i){const a=typeof(r==null?void 0:r.description)=="string"?r.description:"";e.when={expression:`(${t}) and (${i})`,description:a,evaluate_with_parent_context:!0};return}e.when={expression:t,description:typeof n.description=="string"?n.description:"",evaluate_with_parent_context:!0}}function oc(e,n){const t=String(e??"").trim();if(!t.startsWith("/"))throw new Y(`${n} requires an absolute path argument`);const r=t.slice(1).split("/").map(i=>i.trim()).filter(i=>i.length>0);if(r.length===0)throw new Y(`${n} path cannot be empty`);return r.map(i=>{const a=i.indexOf(":");if(a<=0||a===i.length-1)throw new Y(`${n}: invalid path segment '${i}', expected 'prefix:identifier'`);return{prefix:i.slice(0,a),name:i.slice(a+1)}})}function Vr(e,n,t,r){const i=String(e.prefix??"").replace(/^['"]|['"]$/g,"");if(n===i)return e;const a=oe(e.import_prefixes)?e.import_prefixes:void 0,o=a&&oe(a[n])?a[n]:void 0;if(!o)throw new Y(`${r}: unknown prefix '${n}' in path '${t}'`);return o}function cc(e,n){return on(e.statements).find(r=>r.name===n)}function lc(e,n){const t=oe(e.extension_runtime)?e.extension_runtime:void 0,r=t&&oe(t[an])?t[an]:void 0,i=r==null?void 0:r[n];return oe(i)?i:on(e.statements).find(o=>(typeof o.resolved_extension_name=="string"?o.resolved_extension_name:"")==="structure"&&String(o.argument??"").trim()===n)}function uc(e,n){const t=oc(n,"augment-structure"),r=t[0],i=Vr(e,r.prefix,n,"augment-structure");let a=lc(i,r.name);if(!a)throw new Y(`augment-structure: no top-level structure '${r.name}' in path '${n}'`);for(const o of t.slice(1)){Vr(e,o.prefix,n,"augment-structure");const c=cc(a,o.name);if(!c)throw new Y(`augment-structure: no child '${o.name}' in path '${n}'`);a=c}return a}function pc(e,n){const t=String(e.resolved_module_name??""),r=String(e.resolved_extension_name??"");if(t!=="ietf-yang-structure-ext")return e;if(r==="structure"){const i=oe(n.extension_runtime)?n.extension_runtime:n.extension_runtime={},a=oe(i[an])?i[an]:i[an]={},o=String(e.argument??"").trim();return o.length>0&&(a[o]=e,e.name=o),e.data_node_kind="container",e}if(r==="augment-structure"){const i=String(e.argument??""),a=uc(n,i),o=on(e.statements).map(p=>ic(p)),c=Array.isArray(e.if_features)?e.if_features:[],l=oe(e.when)?e.when:void 0;for(const p of o){sc(p,c),ac(p,l);const f=on(a.statements);f.push(p),a.statements=f}return}return e}function Ji(e,n){const t=on(e.statements),r=[];for(const i of t){let a=i;typeof i.resolved_module_name=="string"&&typeof i.resolved_extension_name=="string"&&(a=pc(i,n)),a&&(Ji(a,n),r.push(a))}e.statements=r}function fc(e){Ji(e,e)}var mc=new Set(["container","list","leaf","leaf-list","choice","case","anydata","anyxml","notification","rpc","action","input","output"]);function Xi(e){return JSON.parse(JSON.stringify(e))}function Ue(e){return Array.isArray(e)?e:[]}function dc(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Br(e,n){if(n===dc(e))return e;const t=e.import_prefixes,r=t==null?void 0:t[n];return r&&typeof r=="object"?r:void 0}function Gr(e){const n=e.trim(),t=n.indexOf(":");if(t<=0||t===n.length-1)throw new J(`Invalid augment path segment '${e}': expected 'prefix:identifier'`);return[n.slice(0,t),n.slice(t+1)]}function hc(e){const n=(e||"").trim().replace(/^["']|["']$/g,"");if(!n.startsWith("/"))throw new J(`Augment path must be an absolute schema node identifier, got '${e}'`);const t=n.slice(1).split("/").map(r=>r.trim()).filter(r=>r.length>0);if(t.length===0)throw new J(`Empty augment path: '${e}'`);return t}function Qi(e){const n=typeof e.keyword=="string"?e.keyword:"";return!!e.name&&mc.has(n)}function _c(e,n){for(const t of Ue(e.statements))if(t.name===n&&Qi(t))return t}function yc(e,n){for(const t of Ue(e.statements))if(t.name===n&&Qi(t))return t}function gc(e,n){return vc({ctxModule:e,path:n,kind:"augment",findToplevel:yc})}function vc(e){const{ctxModule:n,path:t,kind:r,findToplevel:i}=e,a=hc(t),[o,c]=Gr(a[0]),l=Br(n,o);if(!l)throw new J(`${r}: unknown prefix '${o}' in path '${t}' (module '${String(n.name??"")}')`);let p=i(l,c);if(!p)throw new J(`${r}: no top-level schema node '${c}' in module '${String(l.name??"")}' (path '${t}')`);for(const f of a.slice(1)){const[m,d]=Gr(f);if(!Br(n,m))throw new J(`${r}: unknown prefix '${m}' in path '${t}'`);const g=_c(p,d);if(!g)throw new J(`${r}: no child '${d}' under node in path '${t}' (after '${String(p.name??"")}')`);p=g}if(!Array.isArray(p.statements)&&p.statements!==void 0)throw new J(`${r}: target node '${String(p.name??"?")}' cannot contain schema substatements (path '${t}')`);return p.statements===void 0&&(p.statements=[]),p}function Zi(e,n){e.defining_module=n;for(const t of Ue(e.statements))Zi(t,n)}function bc(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function xc(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...Xi(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${String(i.expression)}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function wc(e,n,t){const r=Ue(e.statements).map(a=>Xi(a));for(const a of r)Zi(a,t),bc(e,a),xc(e,a);const i=Ue(n.statements);for(const a of r)i.push(a);n.statements=i}function Sc(e){const n=e.data,t=Ue(n.statements),r=t.filter(a=>a.keyword==="augment");if(r.length===0)return e;const i=String(n.name??"");for(const a of r){const o=String(a.augment_path??a.argument??""),c=gc(n,o);wc(a,c,i)}return n.statements=t.filter(a=>a.keyword!=="augment"),e}function qe(e){return JSON.parse(JSON.stringify(e))}function es(e,n){const t=e.if_features;if(!Array.isArray(t)||t.length===0)return;const r=Array.isArray(n.if_features)?n.if_features:[];n.if_features=[...t,...r]}function ns(e,n){const t=e.when;if(!t||typeof t.expression!="string"||t.expression.trim()==="")return;const r={...qe(t),evaluate_with_parent_context:!0},i=n.when;if(!(i!=null&&i.expression)){n.when=r;return}n.when={...i,expression:`(${i.expression}) and (${t.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function ts(e,n){for(const t of e)if(t.name===n)return t;for(const t of e){const r=ts(t.statements??[],n);if(r)return r}}function rs(e,n){if(n.length===0)return;const[t,...r]=n,i=ts(e,t);if(i)return r.length===0?i:rs(i.statements??[],r)}function is(e,n){const t=e.refines;if(!(!Array.isArray(t)||t.length===0))for(const r of t){const i=r.refine_target_path??r.argument??"",a=i.split("/").map(m=>m.trim()).filter(Boolean);if(a.length===0)continue;const o=rs(n,a);if(!o)throw new ka(i);typeof r.min_elements=="number"&&(o.min_elements=r.min_elements),typeof r.max_elements=="number"&&(o.max_elements=r.max_elements),typeof r.refined_mandatory=="boolean"&&(o.mandatory=r.refined_mandatory),typeof r.refined_config=="boolean"&&(o.config=r.refined_config);const c=r.refined_defaults;Array.isArray(c)&&c.length>0&&(o.keyword==="leaf"?o.default=c[0]:o.keyword==="leaf-list"&&(o.defaults=[...c]));const l=r.if_features;if(Array.isArray(l)&&l.length>0){const m=Array.isArray(o.if_features)?o.if_features:[];o.if_features=[...l,...m]}const p=typeof r.description=="string"?r.description.trim():"";p&&(o.description=p);const f=r.statements??[];f.length>0&&(o.statements=[...o.statements??[],...qe(f)])}}function ss(e,n,t){if(t.includes(e))throw new Oa(t,e);const r=n[e];if(!r)throw new Y(`Unknown grouping '${e}'`);const i=[...t,e],a=r.statements??[],o=[];for(const c of a)if(c.keyword==="uses"){const l=String(c.grouping_name??c.argument??"").trim();if(!l)continue;const p=ss(l,n,i);is(c,p);for(const f of p)es(c,f),ns(c,f),o.push(qe(f))}else o.push(qe(c));return o.map(c=>jt(c,n,i))}function jt(e,n,t){var r;return(r=e.statements)!=null&&r.length&&(e.statements=as(e.statements,n,t)),e}function as(e,n,t){const r=[];for(const i of e)if(i.keyword==="uses"){const a=String(i.grouping_name??i.argument??"").trim();if(!a)continue;const o=ss(a,n,t);is(i,o);for(const c of o)es(i,c),ns(i,c),r.push(jt(c,n,t))}else r.push(jt(qe(i),n,t));return r}function Ac(e){const n=e.data,t=n.groupings;if(!t||Object.keys(t).length===0)return e;const r=n.import_prefixes,i=qe(n);r&&typeof r=="object"&&(i.import_prefixes=r),n.features instanceof Set&&(i.features=new Set(n.features)),n.feature_if_features&&typeof n.feature_if_features=="object"&&(i.feature_if_features={...n.feature_if_features});const a=i.groupings,o=i.statements??[];return i.statements=as(o,a,[]),delete i.groupings,new Yt(i,e.source)}function os(e){const n=[];for(const t of e??[])n.push(t),n.push(...os(t.statements));return n}function Tc(e){for(const n of os(e.data.statements)){if(n.keyword!=="list"||typeof n.key!="string"||n.key.trim()==="")continue;const t=new Map((n.statements??[]).filter(r=>r.keyword==="leaf"&&typeof r.name=="string").map(r=>[r.name,r]));for(const r of n.key.split(/\s+/).filter(Boolean)){const i=t.get(r);if(i===void 0)throw new Y(`List '${n.name??""}': key leaf '${r}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let a;if(i.when!==void 0?a="when":Array.isArray(i.if_features)&&i.if_features.length>0&&(a="if-feature"),a!==void 0)throw new Y(`List '${n.name??""}': key leaf '${i.name}' must not have '${a}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function Ec(e){Tc(e)}function Ic(e){const n={};if(!e)return n;for(const[t,r]of Object.entries(e))n[t]={bases:Array.isArray(r.bases)?[...r.bases]:[]};return n}function Nc(e,n){var l,p,f,m;if(e.keyword!=="module")throw new Y("Only 'module' roots are currently supported by TS parser");const t=e.statements??[],r={};for(const d of t)if(d.keyword==="typedef"&&d.argument){const g=(l=d.statements)==null?void 0:l.find(N=>N.keyword==="type");r[d.argument]={name:d.argument,description:typeof d.description=="string"?d.description:"",reference:typeof d.reference=="string"?d.reference:"",default:d.default,type:d.type??(g==null?void 0:g.type),statements:d.statements??[]}}const i=n.features,a=n.feature_if_features,o=t.find(d=>d.keyword==="description"),c=typeof(o==null?void 0:o.argument)=="string"?o.argument:"";return{__class__:"YangModule",name:e.argument,yang_version:((p=t.find(d=>d.keyword==="yang-version"))==null?void 0:p.argument)??"1.1",namespace:((f=t.find(d=>d.keyword==="namespace"))==null?void 0:f.argument)??"",prefix:((m=t.find(d=>d.keyword==="prefix"))==null?void 0:m.argument)??"",organization:String(n.organization??""),contact:String(n.contact??""),description:c,typedefs:r,identities:Ic(n.identities),import_prefixes:n.import_prefixes??{},extensions:n.extensions??{},extension_runtime:n.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:a&&typeof a=="object"?{...a}:{},statements:t}}var cs=class{constructor(e={}){h(this,"expandUses");h(this,"includePath");h(this,"moduleCache",new Map);h(this,"tokenizer",new rc);h(this,"parsers",new Zo({importResolver:(e,n,t,r,i)=>this.resolveImport(e,t,r,i)}));this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(n=>De(n))}resolveImportedModulePath(e,n,t){const r=n==null?void 0:n.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);const a=[t,...this.includePath];for(const o of a){for(const l of i){const p=De(o,l);if(Ha(p))return p}let c=[];try{c=Wa(o).filter(l=>l.startsWith(`${e}@`)&&l.endsWith(".yang"))}catch{c=[]}if(c.length>0)return c.sort(),De(o,c[c.length-1])}throw new Y(`Could not find imported module '${e}' (tried ${i.join(", ")}) under ${a.join(", ")}`)}resolveImport(e,n,t,r){const i=t.module.__source_path;if(!i)throw new Y("import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)");const a=this.resolveImportedModulePath(e,n,bi(i));return this.parseFile(a).data}parseTokenStream(e,n){const t={name:"",yang_version:"1.1",namespace:"",prefix:"",organization:"",contact:"",revisions:[],belongs_to_module:"",typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:n.kind==="file"?n.value:void 0,statements:[]},r=new Pa({module:t,current_parent:{}}),i=this.parsers.parseModule(e,r),a=Nc(i,t),o=t.groupings??{},c={};for(const[p,f]of Object.entries(o)){if(!f||typeof f!="object")continue;const m=f,d=m.name??p;c[p]={__class__:"YangStatement",keyword:"grouping",name:d,argument:d,statements:(m.statements??[]).map(g=>this.parsers.serializeAstStatement(g))}}Object.keys(c).length>0&&(a.groupings=c),fc(a);let l=new Yt(a,n);return this.expandUses&&(l=Ac(l),l=Sc(l),Ec(l)),l}parseString(e,n="<memory>"){const t=this.tokenizer.tokenize(e,n),r={kind:"string",value:e,name:n};return this.parseTokenStream(t,r)}parseFile(e){const n=De(e),t=this.moduleCache.get(n);if(t)return t;const r=Ka(n),i=this.tokenizer.tokenize(r,n),a={kind:"file",value:n,name:n},o=this.parseTokenStream(i,a);return this.moduleCache.set(n,o),o}};new cs;function $c(e){return String(e??"").replace(/^['"]|['"]$/g,"")}function Vt(e){return String(e.name??"")}function ls(e){const n=e.features;return n instanceof Set?new Set(n):Array.isArray(n)?new Set(n):new Set}function Cc(e,n){const t=$c(e.prefix);if(n===t)return e;const r=e.import_prefixes,i=r==null?void 0:r[n];if(i&&typeof i=="object")return i}function kc(e){const n=[],t=new Set,r=i=>{if(t.has(i))return;t.add(i),n.push(i);const a=i.import_prefixes;if(a)for(const o of Object.values(a))o&&typeof o=="object"&&r(o)};return r(e),n}function Oc(e,n,t){let r,i;const a=t.indexOf(":");if(a!==-1){const c=t.slice(0,a);i=t.slice(a+1);const l=Cc(e,c);if(!l)return!1;r=l}else r=e,i=t;if(!ls(r).has(i))return!1;const o=n[Vt(r)];return o?o.has(i):!1}function Rc(e){const n=[];let t=0;const r=e.length;for(;t<r;){const i=e[t];if(/\s/.test(i)){t+=1;continue}if(i==="("||i===")"){n.push(i),t+=1;continue}let a=t;for(;a<r&&!/\s/.test(e[a])&&e[a]!=="("&&e[a]!==")";)a+=1;n.push(e.slice(t,a)),t=a}return n}var Mc=class{constructor(e,n,t){h(this,"toks");h(this,"ctx");h(this,"enabled");h(this,"i",0);this.toks=e,this.ctx=n,this.enabled=t}peek(){return this.toks[this.i]}eat(e){const n=this.peek();if(n===void 0)throw new Error("unexpected end of expression");if(e!==void 0&&n!==e)throw new Error(`expected ${e}, got ${n}`);return this.i+=1,n}parseExpr(){let e=this.parseTerm();for(;this.peek()==="or";){this.eat("or");const n=this.parseExpr();e=e||n}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()==="and";){this.eat("and");const n=this.parseTerm();e=e&&n}return e}parseFactor(){const e=this.peek();if(e==="not")return this.eat("not"),!this.parseFactor();if(e==="("){this.eat("(");const n=this.parseExpr();return this.eat(")"),n}if(e===void 0)throw new Error("unexpected end of expression");return this.eat(),Oc(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function Lc(e,n,t){const r=e.trim();if(!r)return!1;try{const i=new Mc(Rc(r),n,t),a=i.parseExpr();return i.atEnd()?a:!1}catch{return!1}}function Qe(e,n,t){return!e||e.length===0?!0:e.every(r=>Lc(r,n,t))}function jc(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function Dc(e,n){let t=!0;for(;t;){t=!1;const i={};for(const[a,o]of Object.entries(n))i[a]=new Set(o);for(const a of e){const o=Vt(a),c=n[o];if(!c)continue;const l=a.feature_if_features;for(const p of[...c]){const f=l==null?void 0:l[p];f!=null&&f.length&&(Qe(f,a,i)||(c.delete(p),t=!0))}}}const r={};for(const[i,a]of Object.entries(n))r[i]=new Set(a);return r}function zr(e,n){const t=kc(e),r=jc(n),i={};for(const a of t){const o=Vt(a),c=ls(a);r===null||!r.has(o)?i[o]=new Set(c):i[o]=new Set(r.get(o)??[])}return Dc(t,i)}function Pc(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Bn(e){const n=e.identities;return!n||typeof n!="object"?{}:n}function us(e,n){const t=Pc(e);if(n===t)return e;const i=(e.import_prefixes??{})[n];return i&&typeof i=="object"?i:void 0}function Gn(e,n){if(!n.includes(":"))return null;const[t,r]=n.split(":",2),i=us(e.data,t);return!i||!(r in Bn(i))?null:{mod:i,local:r}}function Fc(e,n){if(n.includes(":")){const[t,r]=n.split(":",2),i=us(e,t);return!i||!(r in Bn(i))?null:{mod:i,local:r}}return n in Bn(e)?{mod:e,local:n}:null}function ps(e,n){return e.mod===n.mod&&e.local===n.local}function fs(e,n){return n.some(t=>ps(t,e))}var Kr=new WeakMap,Hr=1;function Yc(e){let n=Kr.get(e);return n===void 0&&(n=Hr,Hr+=1,Kr.set(e,n)),n}function Uc(e){return`${Yc(e.mod)}:${e.local}`}function ms(e,n){const t=[],r=new Set,i=[{mod:e,local:n}];for(;i.length>0;){const a=i.pop(),o=Uc(a);if(r.has(o))continue;r.add(o),t.push(a);const c=Bn(a.mod)[a.local];if(c!=null&&c.bases)for(const l of c.bases){const p=Fc(a.mod,l);p&&i.push(p)}}return t}function qc(e,n,t){const r=Gn(e,n),i=Gn(e,t);if(!r||!i)return!1;const a=ms(r.mod,r.local);return fs(i,a)&&!ps(i,r)}function Vc(e,n,t){const r=Gn(e,n),i=Gn(e,t);if(!r||!i)return!1;const a=ms(r.mod,r.local);return fs(i,a)}function be(e){return!!e&&typeof e=="object"&&"schema"in e&&"parent"in e}function je(e){return Array.isArray(e)&&(e.length===0||be(e[0]))}function ae(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e!=="":e!=null}function Ee(e){return Array.isArray(e)?e.map(n=>be(n)?n.data:n):be(e)?[e.data]:e==null?[]:[e]}function z(e){return Ee(e)[0]}function Bt(e,n){if(typeof e=="boolean"||typeof n=="boolean")return[ae(e),ae(n)];if(typeof e=="number"&&typeof n=="number")return[e,n];const t=Number(e),r=Number(n);return!Number.isNaN(t)&&!Number.isNaN(r)?[t,r]:[String(e??"").trim(),String(n??"").trim()]}function In(e,n){const t=Ee(e),r=Array.isArray(n)&&!je(n)?n:Ee(n);if(t.length===0||r.length===0)return t.length===0&&r.length===0;for(const i of t)for(const a of r){if(i==null&&a==null)return!0;if(i==null||a==null)continue;const[o,c]=Bt(i,a);if(o===c)return!0}return!1}function Wr(e,n){for(const t of Ee(e))for(const r of Ee(n)){const[i,a]=Bt(t,r);if(typeof i=="number"&&typeof a=="number"){if(i<a)return!0;continue}if(`${i}`<`${a}`)return!0}return!1}function Jr(e,n){for(const t of Ee(e))for(const r of Ee(n)){const[i,a]=Bt(t,r);if(typeof i=="number"&&typeof a=="number"){if(i>a)return!0;continue}if(`${i}`>`${a}`)return!0}return!1}function Bc(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function Gc(e,n){for(const t of Bc(e))if((t==null?void 0:t.name)===n)return t;return null}function zc(e){var r,i,a;if(!e||e.keyword!=="leaf")return;const n=(r=e.data)==null?void 0:r.default;if(((a=(i=e.data)==null?void 0:i.type)==null?void 0:a.name)==="boolean"&&typeof n=="string"){const o=n.toLowerCase();if(o==="true")return!0;if(o==="false")return!1}return n}function ds(e,n){const t=e.data,r=e.schema;if(Array.isArray(t)&&((r==null?void 0:r.keyword)==="list"||(r==null?void 0:r.keyword)==="leaf-list")){const o=[];for(const c of t){const l={data:c,schema:r,parent:e};o.push(...ds(l,n))}return o}const i=Gc(r,n);let a;if(t&&typeof t=="object"&&!Array.isArray(t)){const o=t;n in o?(a=o[n],a===null&&(a=!0)):a=zc(i)}return a===void 0?[]:(i==null?void 0:i.keyword)==="list"||(i==null?void 0:i.keyword)==="leaf-list"?Array.isArray(a)?a.map(o=>({data:o,schema:i,parent:e})):[{data:a,schema:i,parent:e}]:[{data:a,schema:i,parent:e}]}var Kc=class{eval(e,n,t){switch(e.kind){case"literal":return e.value;case"path":return this.evalPath(e,n,t);case"binary":return this.evalBinary(e,n,t);case"function":return this.evalFunction(e.name,e.args,n,t);default:return null}}evalPath(e,n,t){let r=[e.isAbsolute?n.root:t];for(const i of e.segments){if(i.step!==".")if(i.step==="..")r=r.map(a=>a.parent).filter(a=>!!a);else{const a=[];for(const o of r)a.push(...ds(o,i.step));r=a}if(i.predicate){const a=[];for(let o=0;o<r.length;o+=1){const c=r[o],l=this.eval(i.predicate,n,c);let p=!1;typeof l=="number"&&Number.isFinite(l)?p=Math.trunc(l)===o+1:p=ae(l),p&&a.push(c)}r=a}}return r}evalBinary(e,n,t){const r=e.operator;if(r==="or"){const o=this.eval(e.left,n,t);return ae(o)?!0:ae(this.eval(e.right,n,t))}if(r==="and"){const o=this.eval(e.left,n,t);return ae(o)?ae(this.eval(e.right,n,t)):!1}if(r==="/"){const o=this.eval(e.left,n,t),c=je(o)?o:be(o)?[o]:[],l=[];for(const p of c){const f=this.eval(e.right,n,p);je(f)?l.push(...f):be(f)&&l.push(f)}return l}const i=this.eval(e.left,n,t),a=this.eval(e.right,n,t);if(r==="=")return In(i,a);if(r==="!=")return!In(i,a);if(r==="<")return Wr(i,a);if(r===">")return Jr(i,a);if(r==="<=")return In(i,a)||Wr(i,a);if(r===">=")return In(i,a)||Jr(i,a);if(r==="+"){const o=Number(z(i))+Number(z(a));return Number.isNaN(o)?Number.NaN:o}if(r==="-"){const o=Number(z(i))-Number(z(a));return Number.isNaN(o)?Number.NaN:o}if(r==="*"){const o=Number(z(i))*Number(z(a));return Number.isNaN(o)?Number.NaN:o}return null}evalFunction(e,n,t,r){var a,o,c;const i=e.toLowerCase();if(i==="current")return t.current;if(i==="not")return n.length!==1?null:!ae(this.eval(n[0],t,r));if(i==="true")return!0;if(i==="false")return!1;if(i==="count"){if(n.length!==1)return 0;const l=this.eval(n[0],t,r);return je(l)?l.length:l==null?0:1}if(i==="string"){if(n.length!==1)return"";const l=z(this.eval(n[0],t,r));return l==null?"":String(l)}if(i==="number"){if(n.length!==1)return Number.NaN;const l=z(this.eval(n[0],t,r)),p=Number(l);return Number.isNaN(p)?Number.NaN:p}if(i==="boolean")return n.length!==1?!1:ae(this.eval(n[0],t,r));if(i==="string-length"){if(n.length!==1)return 0;const l=z(this.eval(n[0],t,r));return l==null?0:String(l).length}if(i==="concat")return n.map(l=>String(z(this.eval(l,t,r))??"")).join("");if(i==="translate"){if(n.length!==3)return"";const l=String(z(this.eval(n[0],t,r))??""),p=String(z(this.eval(n[1],t,r))??""),f=String(z(this.eval(n[2],t,r))??"");if(p.length===0)return l;const m=new Map;for(let g=0;g<p.length;g+=1)m.set(p[g],g<f.length?f[g]:null);let d="";for(const g of l){if(!m.has(g)){d+=g;continue}const N=m.get(g);N!=null&&(d+=N)}return d}if(i==="deref"){if(n.length!==1)return[];const l=t.current??r,p=this.eval(n[0],t,l),f=je(p)?p:be(p)?[p]:[],m=[];for(const d of f){const g=(o=(a=d.schema)==null?void 0:a.data)==null?void 0:o.type;if(!g||g.name!=="leafref")continue;const N=g.path;if(!N||N.kind!=="path")continue;const C=this.evalPath(N,t,d);for(const L of C)L.data===d.data&&m.push(L)}return m}if(i==="derived-from"||i==="derived-from-or-self"){if(n.length!==2)return!1;const l=(c=t.root)==null?void 0:c.schema;if(!(l instanceof Yt))return!1;const p=l,f=t.current??r;let m=this.eval(n[0],t,f);if(je(m)){if(m.length===0)return!1;m=m[0].data}else be(m)?m=m.data:m=z(m);if(typeof m!="string")return!1;const d=this.eval(n[1],t,f),g=z(d);return typeof g!="string"?!1:i==="derived-from"?qc(p,m,g):Vc(p,m,g)}return null}};function zn(e){if(e===null)return"null";const n=typeof e;if(n==="undefined")return"undefined";if(typeof e=="string"){const t=e;return t.length>100?`string(len=${t.length}):${JSON.stringify(t.slice(0,80))}…`:JSON.stringify(t)}if(n==="number"||n==="boolean"||n==="bigint")return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(n==="object")try{const t=JSON.stringify(e);return t.length>160?`${t.slice(0,160)}…`:t}catch{return"[object]"}return String(e)}function Kn(e,n,t){e&&console.debug(`[xYang:type-validation] ${n}`,t)}var $t=class{constructor(e,n={}){h(this,"module");h(this,"system",new Ga);h(this,"typeValidationDebug");this.module=e,this.typeValidationDebug=n.typeValidationDebug===!0}resolveUnderlyingBuiltinName(e){const n=new Set;let t=e;for(;n.size<64;){const r=this.module.typedefs[t];if(!(r!=null&&r.type)||typeof r.type.name!="string"||r.type.name==="union")return t;n.add(t);const i=r.type.name;if(i===t)return t;t=i}return t}validate(e,n,t){var o;let r,i;const a=this.module.typedefs[n];if(a!=null&&a.type&&typeof a.type.name=="string"){const c=new jn(a.type);a.type.name==="union"?(r="typedef-union",i=this.validateUnion(e,c)):(r="typedef",i=this.system.validate(e,a.type.name,c))}else{const c=new jn(t);n==="union"&&(((o=c.types)==null?void 0:o.length)??0)>0?(r="inline-union",i=this.validateUnion(e,c)):(r="direct",i=this.system.validate(e,n,c))}return Kn(this.typeValidationDebug,"TypeChecker.validate",{module:this.module.name??"(anonymous)",typeName:n,via:r,ok:i[0],reason:i[1],value:zn(e)}),i}validateUnion(e,n){var t;Kn(this.typeValidationDebug,"TypeChecker.validateUnion",{module:this.module.name??"(anonymous)",memberCount:((t=n.types)==null?void 0:t.length)??0,value:zn(e)});for(const r of n.types??[]){const i=r,a=typeof i.name=="string"?i.name:"string",[o]=this.validate(e,a,i);if(o)return[!0,null]}return[!1,"Value does not match any union member type"]}},Hc=class{constructor(e,n={}){h(this,"xpath",new Kc);h(this,"xpathCache",new Map);h(this,"rootCtx");h(this,"enabledFeaturesOverride");h(this,"contextStack",[]);h(this,"typeValidationDebug");this.enabledFeaturesOverride=n.enabledFeaturesByModule??null,this.typeValidationDebug=n.typeValidationDebug===!0;const t=n.constraintChecks??!0,r=n.leafTypeMode??(t?"full":"none"),i=e.data;this.rootCtx={module:e,typeChecker:new $t(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:t,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:zr(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new $t(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){const e=this.contextStack[this.contextStack.length-1];if(!e)throw new Error("DocumentValidator: internal error — no active validation context");return e}enableExtension(e,n){if(e!=="anydata_validation")throw new Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=Za(n)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,n){this.contextStack.push(e);try{const t=[],r=[];if(!n||typeof n!="object"||Array.isArray(n))return[!1,["Document must be an object"],r];const i=n,a={data:i,schema:e.module,parent:null};for(const o of e.module.statements){if(!o.name)continue;const c=this.effectiveKeyword(o);["container","list","leaf","leaf-list","anydata","anyxml","choice"].includes(c)&&this.validateStatement(o,i[o.name],o.name,t,a,a)}return[t.length===0,t,r]}finally{this.contextStack.pop()}}validateStatement(e,n,t,r,i,a){const o=this.effectiveKeyword(e),c={data:n,schema:e,parent:i};if(o==="choice"){this.validateChoice(e,i.data,t,r,i,a);return}if(o==="case"){if(!i.data||typeof i.data!="object"||Array.isArray(i.data))return;const f=i.data;for(const m of e.statements)m.name&&this.validateStatement(m,f[m.name],`${t}.${m.name}`,r,i,a);return}const l=e.data.if_features,p=Array.isArray(l)?l:[];if(!Qe(p,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){n!==void 0&&r.push(`${t}: Node '${e.name??"node"}' is present but its 'if-feature' condition is false — this node must not exist`);return}if(!(this.ctx.constraintChecks&&!this.checkWhen(e,n,t,r,c,a,i))){if(o==="container"){if(n===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,t,r,c,a);return}if(!n||typeof n!="object"||Array.isArray(n)){r.push(`${t}: container must be an object`);return}const f=n;this.ctx.constraintChecks&&this.checkMust(e,c,a,t,r);for(const m of e.statements){if(this.effectiveKeyword(m)==="choice"){this.validateChoice(m,f,`${t}.${m.name??"choice"}`,r,c,a);continue}m.name&&this.validateStatement(m,f[m.name],`${t}.${m.name}`,r,c,a)}this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,f,t,r);return}if(o==="list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: list must be an array`);return}const f=typeof e.data.key=="string"?e.data.key.trim():"",m=f.length>0?f.split(/\s+/).map(d=>d.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&m.length>0&&this.checkListKeyUniqueness(n,m,e.name??"list",t,r))return;for(let d=0;d<n.length;d+=1){const g=n[d];if(!g||typeof g!="object"||Array.isArray(g)){r.push(`${t}[${d}]: list item must be an object`);continue}const N={data:g,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,N,a,`${t}[${d}]`,r);const C=g;for(const L of e.statements){if(this.effectiveKeyword(L)==="choice"){this.validateChoice(L,C,`${t}[${d}].${L.name??"choice"}`,r,N,a);continue}L.name&&this.validateStatement(L,C[L.name],`${t}[${d}].${L.name}`,r,N,a)}this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,C,`${t}[${d}]`,r)}return}if(o==="leaf"){const f=!!e.data.mandatory;if(n===void 0){f&&r.push(`${t}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const m=e.data.type??{},d=m.name??"string";if(d==="leafref")this.checkLeafref(n,m,t,r,c,a);else if(d==="instance-identifier")this.checkInstanceIdentifier(n,m,t,r,c,a);else{const[g,N]=this.ctx.typeChecker.validate(n,d,m);Kn(this.ctx.typeValidationDebug,"DocumentValidator.leaf:full",{path:t,typeName:d,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:g,reason:N,value:zn(n)}),g||r.push(`${t}: ${N??`invalid value for type ${d}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,c,a,t,r);return}if(o==="leaf-list"){if(n===void 0)return;if(!Array.isArray(n)){r.push(`${t}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){const f=e.data.type??{},m=f.name??"string";for(let d=0;d<n.length;d+=1){const g={data:n[d],schema:e,parent:i};if(m==="leafref")this.checkLeafref(n[d],f,`${t}[${d}]`,r,g,a);else if(m==="instance-identifier")this.checkInstanceIdentifier(n[d],f,`${t}[${d}]`,r,g,a);else{const[N,C]=this.ctx.typeChecker.validate(n[d],m,f);Kn(this.ctx.typeValidationDebug,"DocumentValidator.leaf-list:full",{path:`${t}[${d}]`,typeName:m,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:N,reason:C,value:zn(n[d])}),N||r.push(`${t}[${d}]: ${C??`invalid value for type ${m}`}`)}this.checkMust(e,g,a,`${t}[${d}]`,r)}}return}if(o==="anydata"||o==="anyxml"){const f=!!e.data.mandatory;if(n===void 0){f&&r.push(`${t}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,c,a,t,r),o==="anydata"&&this.runAnydataSubtreeValidation(e,n,t,r)}}}collectSchemaInstanceKeys(e,n){if(!e)return;const t=this.effectiveKeyword(e);if(t==="choice"){for(const r of e.statements??[])if(r.keyword==="case")for(const i of r.statements??[])this.collectSchemaInstanceKeys(i,n);return}if(t==="list"){e.name&&n.add(e.name);return}if(t==="container"){const r=e.statements??[];!(r.length===1&&this.effectiveKeyword(r[0])==="choice")&&e.name&&n.add(e.name);for(const a of r)this.collectSchemaInstanceKeys(a,n);return}e.name&&n.add(e.name)}rejectUnknownContainerKeys(e,n,t,r){if(e.data.presence||e.name!=="array")return;const i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!=="choice")return;const a=new Set;if(this.collectSchemaInstanceKeys(i[0],a),a.size!==0)for(const o of Object.keys(n))a.has(o)||r.push(`${t}: Unknown field '${o}'`)}rejectUnknownListItemKeys(e,n,t,r){const i=this.collectDirectChildKeys(e);if(i.size!==0)for(const a of Object.keys(n))i.has(a)||r.push(`${t}: Unknown field '${a}'`)}collectDirectChildKeys(e){const n=new Set,t=r=>{const i=this.effectiveKeyword(r);if(i==="choice"||i==="case"){for(const a of r.statements??[])t(a);return}r.name&&n.add(r.name)};for(const r of e.statements??[])t(r);return n}validateChoice(e,n,t,r,i,a){if(!n||typeof n!="object"||Array.isArray(n)){e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}const o=n,c=Array.isArray(e.data.if_features)?e.data.if_features:[],l=Qe(c,this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!l&&this.choiceHasBranchData(e,o)){r.push(`${t}: Choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(!l||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,t,r,i,a,i))return;const p=e.statements.filter(g=>g.keyword==="case"),f=[];let m=!1;for(const g of p){if(!this.caseHasAnyData(g,o))continue;const N=Array.isArray(g.data.if_features)?g.data.if_features:[];if(!Qe(N,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${t}: Case '${g.name??"case"}' of choice '${e.name??"choice"}' has data but its 'if-feature' condition is false — this branch must not exist`);return}if(this.ctx.constraintChecks&&!this.checkWhen(g,!0,`${t}.${g.name??"case"}`,r,i,a,i)){m=!0;continue}f.push(g)}if(f.length>1){const g=f.map(N=>N.name??"<unnamed>").join(", ");r.push(`${t}: choice '${e.name??"choice"}' allows only one case, but multiple are active: ${g}`);return}const d=f[0];if(!d){if(m)return;e.data.mandatory===!0&&r.push(`${t}: mandatory choice has no active case`);return}for(const g of d.statements)g.name&&this.validateStatement(g,o[g.name],`${t}.${g.name}`,r,i,a)}choiceHasBranchData(e,n){return e.statements.filter(r=>r.keyword==="case").some(r=>this.caseHasAnyData(r,n))}caseHasAnyData(e,n){return e.statements.some(t=>this.statementHasMatchingData(t,n))}statementHasMatchingData(e,n){const t=this.effectiveKeyword(e);return["leaf","leaf-list","container","list","anydata","anyxml"].includes(t)?!!(e.name&&n[e.name]!==void 0):t==="choice"?this.choiceHasBranchData(e,n):t==="case"?this.caseHasAnyData(e,n):!1}effectiveKeyword(e){const n=e.keyword??"";if(n.includes(":")){const t=e.data.data_node_kind;if(t==="container"||t==="list")return t}return n}checkListKeyUniqueness(e,n,t,r,i){if(n.length===0)return!1;const a=new Map;for(let o=0;o<e.length;o+=1){const c=e[o];if(!c||typeof c!="object"||Array.isArray(c))continue;const l=c,p=n.map(m=>l[m]),f=JSON.stringify(p);if(a.has(f)){const m=a.get(f),d=n.map(g=>`${g}='${String(l[g])}'`).join(", ");return i.push(`${r}: Duplicate key in list '${t}': ${d} (entries at index ${m} and ${o})`),!0}a.set(f,o)}return!1}leafrefPathAst(e){const n=e.path;if(typeof n=="string"&&n.trim().length>0)try{return Vi(n.trim())}catch{return null}return n&&typeof n=="object"&&!Array.isArray(n)&&n.kind==="path"?n:null}checkLeafref(e,n,t,r,i,a){const o=n.require_instance!==!1,c=this.leafrefPathAst(n);if(!c||c.kind!=="path"){o&&r.push(`${t}: leafref has no path`);return}try{const l={current:i,root:a},p=this.xpath.eval(c,l,i),f=Array.isArray(p)?p:[],m=new Set;for(const g of f){if(!g||typeof g!="object"||!("data"in g))continue;const N=g.data;N!=null&&(typeof N=="string"||typeof N=="number"||typeof N=="boolean")&&m.add(String(N))}if(typeof e!="string"&&typeof e!="number"&&typeof e!="boolean"){r.push(`${t}: leafref value must be a string, number, or boolean`);return}const d=String(e);o&&!m.has(d)&&r.push(`${t}: leafref: value '${d}' does not reference an existing instance (require-instance is true)`)}catch(l){const p=l instanceof Error?l.message:String(l);r.push(`${t}: leafref: error evaluating path (${p})`)}}checkInstanceIdentifier(e,n,t,r,i,a){if(typeof e!="string"){r.push(`${t}: instance-identifier value must be a string, got ${typeof e}`);return}if(!(n.require_instance!==!1))return;const c=e.trim();if(!c){r.push(`${t}: instance-identifier path must not be empty when require-instance is true`);return}let l;try{l=On(c)}catch(f){const m=f instanceof Error?f.message:String(f);r.push(`${t}: instance-identifier: invalid path expression (${m})`);return}if(l.kind!=="path"){r.push(`${t}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!l.isAbsolute){r.push(`${t}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}const p={current:i,root:a};try{this.xpath.evalPath(l,p,a).length===0&&r.push(`${t}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(f){const m=f instanceof Error?f.message:String(f);r.push(`${t}: instance-identifier: invalid path expression (${m})`)}}checkMust(e,n,t,r,i){const a=e.statements.filter(o=>o.keyword==="must"&&typeof o.argument=="string");for(const o of a){const c=o.argument;let l=this.xpathCache.get(c);if(!l)try{l=On(c),this.xpathCache.set(c,l)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`);continue}try{const p={current:n,root:t},f=this.xpath.eval(l,p,n);if(!this.xpathBoolean(f)){const d=typeof o.data.error_message=="string"&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??"node"}'`;i.push(`${r}: ${d}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`)}}}checkWhen(e,n,t,r,i,a,o){const c=e.data.when,l=typeof(c==null?void 0:c.expression)=="string"?c.expression:void 0;if(!l||l.trim().length===0)return!0;let p=this.xpathCache.get(l);if(!p)try{p=On(l),this.xpathCache.set(l,p)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}try{const m=(c==null?void 0:c.evaluate_with_parent_context)===!0?o:i,d={current:m,root:a},g=this.xpath.eval(p,d,m);return this.xpathBoolean(g)?!0:(n!==void 0&&r.push(`${t}: node is not allowed by when condition`),!1)}catch{return r.push(`${t}: Error evaluating when expression on '${e.name??"node"}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e.length>0:e!=null}validateMandatoryChildren(e,n,t,r,i,a){const o=n&&typeof n=="object"&&!Array.isArray(n)?n:void 0;for(const c of e.statements){const l=c.keyword??"";if(!["leaf","anydata","anyxml"].includes(l)||!c.name)continue;const p=Array.isArray(c.data.if_features)?c.data.if_features:[];if(!Qe(p,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!c.data.mandatory)continue;const f=o==null?void 0:o[c.name],m={data:f,schema:c,parent:i};this.ctx.constraintChecks&&!this.checkWhen(c,f,`${t}.${c.name}`,r,m,a,i)||(!o||o[c.name]===void 0)&&r.push(`${t}.${c.name}: mandatory ${l} is missing`)}}anydataModuleMap(e){const n={};for(const t of e){const r=t.name;r&&(n[r]=t)}return n}runAnydataSubtreeValidation(e,n,t,r){if(!this.ctx.anydataValidation||!n||typeof n!="object"||Array.isArray(n))return;const i=this.ctx.anydataValidation.mode,a=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(a),c=n;for(const[l,p]of Object.entries(c)){const{statementName:f,moduleName:m}=$a(l,o);if(!f||!m){r.push(`${t}.${l}: Unknown anydata member '${l}': no matching module:identifier in the provided modules`);continue}const d=o[m],g=d==null?void 0:d.findStatement(f);if(!g){r.push(`${t}.${l}: Unknown anydata member '${l}'`);continue}if(g.keyword==="leaf"){r.push(`${t}.${l}: anydata member '${l}' maps to a leaf; nested subtree validation expects a container or list`);continue}const N={[f]:p},C=d.data,L={module:d,typeChecker:new $t(d,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i==="complete",leafTypeMode:i==="complete"?"full":"none",typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:C,enabledByModule:zr(C,this.enabledFeaturesOverride)},[D,P]=this.validateWithContext(L,N);if(!D)for(const V of P)r.push(`${t}.${l}: ${V}`)}}},Wc=class{constructor(e,n={}){h(this,"module");h(this,"documentValidator");this.module=e,this.documentValidator=new Hc(e,{enabledFeaturesByModule:n.enabledFeaturesByModule??null,typeValidationDebug:n.typeValidationDebug})}setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,n){this.documentValidator.enableExtension(e,n)}enable_extension(e,n){this.enableExtension(e,n)}validate(e){const[n,t,r]=this.documentValidator.validate(e);return{isValid:n,errors:t,warnings:r}}};let Nn,Xr;function hs(){if(!import.meta.url.startsWith("file:"))return"/yang";const e=en.dirname(Na(import.meta.url));return en.resolve(e,"../../../../yang")}function Jc(e=hs()){if(Nn&&Xr===e)return Nn;const n=en.join(e,"netlab-topology.yang"),t=[e,en.join(e,"modules")],r=new cs({include_path:t,expand_uses:!0}),i=r.parseFile(n);for(const a of["netlab-internal.yang","modules/netlab-ospf.yang","modules/netlab-bgp.yang","modules/netlab-vlan.yang","modules/netlab-vrf.yang","modules/netlab-isis.yang","modules/netlab-vxlan.yang","modules/netlab-evpn.yang"])try{r.parseFile(en.join(e,a))}catch{}return Nn=i,Xr=e,Nn}function Xc(e){const n=Jc(e);return new Wc(n)}function Qc(e){const n=e.nodes??{},t=Object.entries(n).map(([p,f])=>{const m={...f,name:f.name??p};return Array.isArray(m.interfaces)&&(m.interfaces=m.interfaces.map(d=>{const g={...d};return Array.isArray(g.neighbors),g})),m.vlans&&typeof m.vlans=="object"&&!Array.isArray(m.vlans)&&(m.vlans=$n(m.vlans)),m.vrfs&&typeof m.vrfs=="object"&&!Array.isArray(m.vrfs)&&(m.vrfs=$n(m.vrfs)),Qr(m),m}),r=(e.links??[]).map((p,f)=>{const m={...p};m.linkindex===void 0&&(m.linkindex=f+1);const d=m[ve];return typeof d=="string"?(m._linkname=d,delete m[ve]):m._linkname,Qr(m),m}),i=e.groups?Object.entries(e.groups).map(([p,f])=>({...f,name:f.name??p})):void 0,a=Zc(e.addressing),o={nodes:t,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),a&&(o.addressing=a),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=$n(e.vlans)),e.vrfs&&(o.vrfs=$n(e.vrfs));const c={topology:o},l=c.topology;return Array.isArray(e[`${Ze}:_Providers`])&&(l[`${Ze}:_Providers`]=e[`${Ze}:_Providers`]),c}function $n(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.entries(e).map(([n,t])=>({...typeof t=="object"&&t&&!Array.isArray(t)?t:{},name:n}))}function Zc(e){return!e||typeof e!="object"||Array.isArray(e)?void 0:{pool:Object.entries(e).map(([t,r])=>({...typeof r=="object"&&r&&!Array.isArray(r)?r:{},name:t}))}}function Qr(e){const n=`${Ze}:`;for(const t of Object.keys(e))if(t.startsWith(n)){const r=t.slice(n.length);e[r]===void 0&&(e[r]=e[t]),delete e[t]}}function el(e,n,t={}){e.stage=n;const r=t.yangDir??hs(),i=Xc(r),a=Qc(e),o=i.validate(a);if(t.diagnostics){for(const c of o.errors)t.diagnostics.error(wr(c));for(const c of o.warnings)t.diagnostics.warning(wr(c))}return{ok:o.isValid,errors:o.errors,warnings:o.warnings}}const nl={none:`---
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
`},tl=new Set(["none","linux","frr","bird"]);let Ct;function _s(){if(Ct)return Ct;const e={};for(const n of tl){const t=nl[n];if(!t)continue;const r=Jn.load(t);e[n]={...r,name:n}}e.bird&&e.linux&&(e.bird=Z(e.linux,{...e.bird,daemon:!0,parent:"linux"}));for(const n of Object.values(e)){if(n.clab&&typeof n.clab=="object"){const t=n.clab;t.features&&(n.features=Z(n.features??{},t.features))}delete n.libvirt,delete n.virtualbox,delete n.external}return Ct=e,e}function Gt(e){return _s()[e]??{name:e,interface_name:"eth{ifindex}",role:"router"}}function rl(e,n){let t;if(e&&typeof e=="object"&&!Array.isArray(e))t={...e};else{t={};for(const r of e??[])if(typeof r=="string")t[r]={name:r};else if(r&&typeof r=="object"&&!Array.isArray(r)){const i=r;if(!i.name){n==null||n.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}t[i.name]=i}}for(const r of Object.keys(t)){let i=t[r];i==null?i={name:r}:typeof i!="object"||Array.isArray(i)?(n==null||n.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${r} must be a dictionary`}),i={name:r,extra:i}):i={...i,name:r},Array.isArray(i.interfaces)||(i.interfaces=[]),t[r]=i}return t}function il(e){const n=new Set;for(const r of Object.values(e.nodes??{}))typeof r.id=="number"&&n.add(r.id);let t=1;for(const r of Object.values(e.nodes??{}))if(typeof r.id!="number"){for(;n.has(t);)t++;r.id=t,n.add(t),t++}}function sl(e,n){var r;const t=String(((r=e.defaults)==null?void 0:r.device)??"frr");for(const i of Object.values(e.nodes??{})){i.device||(i.device=t);const a=i.device;if(!["none","linux","frr","bird"].includes(a)){n==null||n.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${a}' on node ${i.name} (allowed: none, linux, frr, bird)`,path:`nodes.${i.name}.device`});continue}const o=Gt(a);i.role||(i.role=String(o.role??"router")),o.daemon&&(i["netlab-internal:_daemon"]=!0,o.parent&&(i["netlab-internal:_daemon_parent"]=o.parent))}}function al(e){var o,c;il(e);const n=((o=e.addressing)==null?void 0:o.mgmt)??{},t=((c=e.addressing)==null?void 0:c.loopback)??{},r=String(n.ipv4??"192.168.121.0/24"),i=Number(n.start??100),a=String(t.ipv4??"10.0.0.0/24");for(const l of Object.values(e.nodes??{})){const p=l.id??1,f=Gt(String(l.device??"frr"));if(l.mgmt={ifname:String(f.mgmt_if??"eth0"),ipv4:ol(r,i+p),mac:ll(String(n.mac??"CA-FE-00-00-00-00"),p)},l.role==="router"||l.role==="gateway"||!l.role){const m=ys(String(f.loopback_interface_name??"lo{ifindex}"),0);l.loopback={ifindex:0,ifname:m||"lo",type:"loopback",virtual_interface:!0,ipv4:`${gs(a,p)}/32`}}l.af=l.af??{},l.af.ipv4=!0}}function ys(e,n){return e.includes("if ifindex else")?n?e.replace(/\{ifindex if ifindex else ""\}/g,String(n)):e.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):e.replace(/\{ifindex\}/g,String(n))}function ol(e,n){return gs(e,n)}function gs(e,n){const[t,,]=cl(e),r=(t&4294967295)+n;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}function cl(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(c=>Number(c)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),a=Number(t??32),o=a===0?0:-1<<32-a>>>0;return[i&o,a]}function ll(e,n){const t=n.toString(16).padStart(4,"0");return e.replace(/00-00$/,`${t.slice(0,2)}-${t.slice(2)}`)}const Hn={};function ul(){for(const e of Object.keys(Hn))delete Hn[e]}function pl(e){ul();const n=e.addressing??{};e.addressing=n,e.pools={...n}}function fl(e,n){var c;if(n.prefix&&typeof n.prefix=="object")return;const t=n.type==="p2p"?"p2p":"lan",i=(((c=e.addressing)==null?void 0:c[t])??{}).ipv4;if(typeof i!="string"){n.prefix={};return}const a=n.type==="p2p"?30:24,o=dl(i,a,t);n.prefix={ipv4:hl(o.base,o.plen)}}function ml(e,n){const r=(n.prefix??{}).ipv4;if(typeof r!="string")return;const i=vs(r),a=[...n.interfaces??[]].sort((l,p)=>String(l.node).localeCompare(String(p.node)));if(n.type==="p2p"&&a.length===2){a[0].ipv4=`${Cn(i,1)}/${i.plen}`,a[1].ipv4=`${Cn(i,2)}/${i.plen}`;for(const l of n.interfaces??[]){const p=a.find(f=>f.node===l.node);p&&(l.ipv4=p.ipv4)}return}const o=e.nodes??{};let c=1;for(const l of n.interfaces??[]){if(l.ipv4!==void 0&&l.ipv4!==null)continue;const p=o[l.node],f=p==null?void 0:p.id;typeof f=="number"&&f>0&&f<2**(32-i.plen)-1?l.ipv4=`${Cn(i,f)}/${i.plen}`:(l.ipv4=`${Cn(i,c)}/${i.plen}`,c++)}}function dl(e,n,t){const r=vs(e),i=2**(32-n),a=Hn[t]??0;return Hn[t]=a+1,{base:r.base+a*i>>>0,plen:n}}function vs(e){const[n,t]=e.split("/"),r=(n??"0.0.0.0").split(".").map(Number);return{base:(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),plen:Number(t??32)}}function Cn(e,n){const t=e.base+n>>>0;return[t>>>24&255,t>>>16&255,t>>>8&255,t&255].join(".")}function hl(e,n){return`${[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}/${n}`}function bs(e,n){const t=e.nodes??{},r=e.links;if(!r)return[];const i=Array.isArray(r)?r:[],a=[];let o=0;for(const c of i){o++;const l=`links[${o}]`,p=_l(c,l,t,n);p&&p.disable!==!0&&(p.linkindex=o,p[ve]=l,delete p._linkname,a.push(p))}return e.links=a,a}function _l(e,n,t,r){if(typeof e=="string"){const i=[];for(const a of e.split("-")){const o=a.trim();t[o]?i.push({node:o}):r==null||r.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${e} in ${n} refers to an unknown node ${o}`})}return{interfaces:i,[ve]:n}}if(Array.isArray(e))return{interfaces:Zr(e,t,r,n),[ve]:n};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=Zr(i.interfaces,t,r,n),i[ve]=n,i;const a={[ve]:n},o=[];for(const[c,l]of Object.entries(i))if(c in t){const p=l&&typeof l=="object"&&!Array.isArray(l)?{...l,node:c}:{node:c};o.push(p)}else a[c]=l;return a.interfaces=o,a}return r==null||r.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof e} for ${n}`}),null}function Zr(e,n,t,r){const i=[];for(const a of e)if(typeof a=="string"){if(!n[a]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${r} refers to unknown node ${a}`});continue}i.push({node:a})}else if(a&&typeof a=="object"&&!Array.isArray(a)){const o=a;if(!o.node||!n[o.node]){t==null||t.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${r} missing/unknown node`});continue}i.push(o)}return i}function yl(e){const n=e.nodes??{};for(const t of e.links??[]){const r=t.interfaces??[],i=r.length;t.type||(t.type=i===2?"p2p":"lan"),t.type==="lan"&&!t.bridge&&(t.bridge=`${e.name??"lab"}_${t.linkindex??1}`),fl(e,t),ml(e,t);for(const a of r){const o=n[a.node];if(!o)continue;const c=Gt(String(o.device??"frr")),l=gl(o),p=ys(String(c.interface_name??"eth{ifindex}"),l);a.ifindex=l,a.ifname=p;const f=r.filter(d=>d.node!==a.node).map(d=>{const g={node:d.node??""};return d.ifname!==void 0&&(g.ifname=d.ifname),d.ipv4!==void 0&&(g.ipv4=d.ipv4),d.ipv6!==void 0&&(g.ipv6=d.ipv6),g}),m={ifindex:l,ifname:p,type:t.type??"p2p",neighbors:f};a.ipv4!==void 0&&(m.ipv4=a.ipv4),a.ipv6!==void 0&&(m.ipv6=a.ipv6),t.linkindex!==void 0&&(m.linkindex=t.linkindex),t.ospf&&(m.ospf={...t.ospf}),t.vlan&&(m.vlan={...t.vlan}),t.isis&&(m.isis={...t.isis}),o.interfaces=o.interfaces??[],o.interfaces.push(m)}}}function gl(e){const n=(e.interfaces??[]).map(r=>r.ifindex??0);let t=1;for(;n.includes(t);)t++;return t}function kt(e){return e===!0||e==="true"||e==="True"}function vl(e){if(e.groups||(e.groups={}),Array.isArray(e.groups)){const n={};for(const t of e.groups)t.name&&(n[String(t.name)]=t);e.groups=n}}function bl(e){var a;const n=e.groups??{},t=((a=e.defaults)==null?void 0:a.groups)??{},r=kt(n._auto_create)||kt(t._auto_create);(!e.nodes||typeof e.nodes!="object"||Array.isArray(e.nodes))&&(e.nodes={});const i=e.nodes;for(const[o,c]of Object.entries(n)){if(o.startsWith("_")||!c||typeof c!="object"||Array.isArray(c))continue;const l=c,p=l.members;if(!(!Array.isArray(p)||p.length===0||!kt(l._auto_create)&&!r||String(l.type??"node")!=="node"))for(const m of p){const d=String(m);d in n||d in t||d in i||(i[d]={name:d,interfaces:[]})}}}function xl(e){const n=e.groups??{},t=e.nodes??{};for(const[r,i]of Object.entries(n)){if(r.startsWith("_")||!i||typeof i!="object"||Array.isArray(i))continue;const a=i.members??[];for(const o of a){const c=t[o];if(c){if(i.device&&!c.device&&(c.device=i.device),typeof i.provider=="string"&&!c.provider&&(c.provider=i.provider),Array.isArray(i.module)){const l=new Set(c.module??[]);for(const p of i.module)l.add(p);c.module=[...l]}if(i.node_data&&typeof i.node_data=="object"){const l=Z(i.node_data,c);Object.assign(c,l)}}}}}function wl(e){const n=e.components;if(!n||typeof n!="object")return;const t=e.nodes??{},r={},i=[],a=[];for(const[o,c]of Object.entries(t)){const l=c.include;if(typeof l!="string")continue;const p=n[l];if(!p)continue;i.push(o);const f=o,m=p.nodes??{};for(const[g,N]of Object.entries(m)){const C=`${f}_${g}`;r[C]={...N,name:C}}const d=p.links??[];for(const g of d)a.push(Sl(g,f,Object.keys(m)))}for(const o of i)delete t[o];Object.assign(t,r),e.nodes=t,e.links=[...e.links??[],...a],delete e.components,bs(e)}function Sl(e,n,t){const r=i=>t.includes(i)?`${n}_${i}`:i;if(Array.isArray(e))return{interfaces:e.map(i=>({node:r(String(i))}))};if(e&&typeof e=="object"){const i={...e};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(c=>({...c,node:r(String(c.node??""))})),i;const a={interfaces:[]},o=[];for(const[c,l]of Object.entries(i))t.includes(c)?o.push(l&&typeof l=="object"&&!Array.isArray(l)?{...l,node:r(c)}:{node:r(c)}):a[c]=l;return a.interfaces=o,a}return{interfaces:[]}}const xs="vlan",ws=[],Ss=[];function As(e,n){const t=e.vlans;if(!t||typeof t!="object")return;let r=1;for(const[i,a]of Object.entries(t)){const o=a??{};if(o.id===void 0){for(;Object.values(t).some(c=>(c==null?void 0:c.id)===r);)r++;o.id=r++}t[i]=o}}function Ts(e,n,t){var i;const r=e.vlan;if(r&&typeof r.access=="string"){const a=(i=n.vlans)==null?void 0:i[r.access];a&&r.access_id===void 0&&(r.access_id=a.id)}}const Al={name:xs,transform_after:ws,requires:Ss,module_pre_transform:As,link_pre_transform:Ts},Tl=Object.freeze(Object.defineProperty({__proto__:null,default:Al,link_pre_transform:Ts,module_pre_transform:As,name:xs,requires:Ss,transform_after:ws},Symbol.toStringTag,{value:"Module"})),Es="vrf",Is=["vlan"],Ns=[];function $s(e,n){const t=e.vrfs;if(!t||typeof t!="object")return;let r=1;for(const[i,a]of Object.entries(t)){const o=a??{};o.rd||(o.rd=`1:${r}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),t[i]=o,r++}}function Cs(e,n,t){const r=n.vrfs;if(!r)return;const i=new Set((e.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;const a={...e.vrfs??{}};for(const o of i)!a[o]&&r[o]&&(a[o]={...r[o]});e.vrfs=a}const El={name:Es,transform_after:Is,requires:Ns,module_pre_transform:$s,node_post_transform:Cs},Il=Object.freeze(Object.defineProperty({__proto__:null,default:El,module_pre_transform:$s,name:Es,node_post_transform:Cs,requires:Ns,transform_after:Is},Symbol.toStringTag,{value:"Module"})),ks="vxlan",Os=["vlan","vrf"],Rs=["vlan"],Nl=1e5;function zt(e){return e.vlans??{}}function $l(e){var i,a;const n=(i=e.defaults)==null?void 0:i.vxlan,t=Number(n&&typeof n=="object"&&!Array.isArray(n)?n.start_vni:void 0),r=Number((a=e.vxlan)==null?void 0:a.start_vni);return Number.isFinite(r)&&r>0?r:Number.isFinite(t)&&t>0?t:Nl}function Ms(e,n){const t=(n==null?void 0:n.vxlan)??e.vxlan??{};return Array.isArray(t.vlans)&&t.vlans.length?t.vlans.map(String):Object.keys(zt(e))}function Ls(e,n){e.vxlan||(e.vxlan={});const t=e.vxlan;t.domain===void 0&&(t.domain="global"),t.flooding===void 0&&(t.flooding="static"),t.use_v6_vtep===void 0&&(t.use_v6_vtep=!1)}function js(e,n){const t=zt(e);if(!Object.keys(t).length)return;const r=new Set;for(const l of Object.values(t))typeof(l==null?void 0:l.vni)=="number"&&r.add(l.vni);const i=$l(e);let a=i;const o=Ms(e);for(const l of o){const p=t[l];if(!p||p.vni===!1||typeof p.vni=="number")continue;const f=Number(p.id),m=Number.isFinite(f)?i+f:0;if(m>0&&!r.has(m))p.vni=m,r.add(m);else{for(;r.has(a);)a++;p.vni=a,r.add(a),a++}}const c=e.vxlan??{};(!Array.isArray(c.vlans)||!c.vlans.length)&&(c.vlans=o.filter(l=>{var p;return typeof((p=t[l])==null?void 0:p.vni)=="number"})),e.vxlan=c}function Cl(e,n){const t=e.loopback,r=t==null?void 0:t[n];if(typeof r=="string")return r.split("/")[0]}function Ds(e,n){var a,o;const t=e.vxlan??{},r=String(t.flooding??"static"),i=zt(e);for(const c of Object.values(e.nodes??{})){if(!(c.module??[]).includes("vxlan"))continue;const l=c.vxlan??{};l.domain===void 0&&(l.domain=t.domain??"global"),l.flooding=r;const p=Ms(e,c).filter(N=>{var C;return typeof((C=i[N])==null?void 0:C.vni)=="number"});l.vlans=p;const f={...c.vlans??{}};for(const N of p){const C=i[N],L=f[N]??{},D=L.evpn??{},P=C.evpn&&typeof C.evpn=="object"&&!Array.isArray(C.evpn)?C.evpn:{};f[N]={...L,id:C.id,mode:C.mode,vni:C.vni,...Object.keys(P).length||Object.keys(D).length?{evpn:{...P,...D}}:{}}}Object.keys(f).length&&(c.vlans=f);const d=!!(t.use_v6_vtep??l.use_v6_vtep)?"ipv6":"ipv4",g=Cl(c,d);if(g?(l.vtep=g,l.vtep_interface=String(((a=c.loopback)==null?void 0:a.ifname)??"lo"),l.transport=d):n.diagnostics.error({code:"MISSING",category:"MISSING",module:"vxlan",message:`VXLAN module needs an ${d.toUpperCase()} address on loopback of ${c.name}`,path:`nodes.${c.name}.loopback.${d}`}),String(l.flooding)==="static"){const N=Object.values(e.nodes??{}).filter(L=>L!==c&&(L.module??[]).includes("vxlan")),C=new Set;for(const L of p){const D=f[L];if(!D||typeof D.vni!="number")continue;const P=[];for(const V of N){const q=(o=V.vxlan)==null?void 0:o.vtep;if(typeof q!="string"||q===g)continue;const Q=V.vlans??{};Object.values(Q).some(he=>(he==null?void 0:he.vni)===D.vni)&&(P.push(q),C.add(q))}P.length&&(D.vtep_list=P)}C.size&&(l.vtep_list=[...C].sort())}c.vxlan=l}}const kl={name:ks,transform_after:Os,requires:Rs,module_init:Ls,module_pre_transform:js,module_post_transform:Ds},Ol=Object.freeze(Object.defineProperty({__proto__:null,default:kl,module_init:Ls,module_post_transform:Ds,module_pre_transform:js,name:ks,requires:Rs,transform_after:Os},Symbol.toStringTag,{value:"Module"})),Ps="ospf",Fs=["vlan","vrf"],Ys=[];function Us(e,n){e.ospf||(e.ospf={area:"0.0.0.0"})}function qs(e,n,t){var o;const r=e.ospf??{},i=n.ospf??{};if(r.area===void 0&&(r.area=i.area??"0.0.0.0"),!r.router_id){const c=e.loopback,l=typeof(c==null?void 0:c.ipv4)=="string"?c.ipv4.split("/")[0]:void 0;r.router_id=l??`10.0.0.${e.id??1}`}const a=(e.interfaces??[]).some(c=>c.ipv4)||!!((o=e.loopback)!=null&&o.ipv4);r.af={ipv4:a,ipv6:!1};for(const c of e.interfaces??[]){const l=c.ospf??{};l.area===void 0&&(l.area=r.area),!l.network_type&&c.type==="p2p"&&(l.network_type="point-to-point"),c.ospf=l}e.ospf=r}const Rl={name:Ps,transform_after:Fs,requires:Ys,module_init:Us,node_post_transform:qs},Ml=Object.freeze(Object.defineProperty({__proto__:null,default:Rl,module_init:Us,name:Ps,node_post_transform:qs,requires:Ys,transform_after:Fs},Symbol.toStringTag,{value:"Module"})),Vs="isis",Bs=["vlan","vrf"],Gs=[];function zs(e,n){e.isis||(e.isis={type:"level-2"})}function Ks(e,n,t){const r=e.isis??{},i=n.isis??{};if(r.area||(r.area=i.area??"49.0001"),r.type||(r.type=i.type??"level-2"),!r.net){const a=(e.id??1).toString(16).padStart(4,"0");r.net=`${r.area}.0000.0000.${a}.00`}for(const a of e.interfaces??[]){const o=a.isis??{};!o.network_type&&a.type==="p2p"&&(o.network_type="point-to-point"),a.isis=o}e.isis=r}const Ll={name:Vs,transform_after:Bs,requires:Gs,module_init:zs,node_post_transform:Ks},jl=Object.freeze(Object.defineProperty({__proto__:null,default:Ll,module_init:zs,name:Vs,node_post_transform:Ks,requires:Gs,transform_after:Bs},Symbol.toStringTag,{value:"Module"})),Hs="bgp",Ws=["vlan","vrf","ospf","isis"],Js=[];function Xs(e,n){e.bgp||(e.bgp={})}function Qs(e,n,t){const r=e.bgp??{},i=n.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&t.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function Zs(e,n,t){var a;const r=e.bgp??{};if(!r.router_id){const o=e.loopback;r.router_id=typeof(o==null?void 0:o.ipv4)=="string"?o.ipv4.split("/")[0]:`10.0.0.${e.id??1}`}const i=[];for(const o of e.interfaces??[])for(const c of o.neighbors??[]){const l=(a=n.nodes)==null?void 0:a[c.node];if(!l||!(l.module??[]).includes("bgp"))continue;const p=l.bgp??{},f=Number(r.as),m=Number(p.as),d={name:c.node??"",as:m,type:f===m?"ibgp":"ebgp"};typeof c.ipv4=="string"?d.ipv4=c.ipv4.split("/")[0]:typeof c.ipv4=="boolean"&&(d.ipv4=c.ipv4),i.push(d)}r.neighbor=i,e.bgp=r}const Dl={name:Hs,transform_after:Ws,requires:Js,module_init:Xs,node_pre_transform:Qs,node_post_transform:Zs},Pl=Object.freeze(Object.defineProperty({__proto__:null,default:Dl,module_init:Xs,name:Hs,node_post_transform:Zs,node_pre_transform:Qs,requires:Js,transform_after:Ws},Symbol.toStringTag,{value:"Module"})),ea="evpn",na=["vlan","vxlan","vrf"],ta=["bgp"];function ra(e){return e.vlans??{}}function Fl(e,n){var a,o,c;const t=Number((a=n==null?void 0:n.bgp)==null?void 0:a.as);if(Number.isFinite(t)&&t>0)return t;const r=Number((o=e.bgp)==null?void 0:o.as);if(Number.isFinite(r)&&r>0)return r;const i=Number((c=e.evpn)==null?void 0:c.as);if(Number.isFinite(i)&&i>0)return i}function ia(e,n){e.evpn||(e.evpn={});const t=e.evpn;(!Array.isArray(t.session)||!t.session.length)&&(t.session=["ibgp"]),t.transport===void 0&&(t.transport="vxlan"),e.vxlan||(e.vxlan={}),e.vxlan.flooding="evpn"}function sa(e,n){const t=ra(e),r=e.evpn??{},i=Fl(e);let a;Array.isArray(r.vlans)&&r.vlans.length?a=r.vlans.map(String):a=Object.entries(t).filter(([,o])=>typeof(o==null?void 0:o.vni)=="number").map(([o])=>o),r.vlans=a;for(const o of a){const c=t[o];if(!c)continue;const l=c.evpn??{};l.evi===void 0&&(l.evi=c.id??0);const p=l.evi;if(i!==void 0){const f=`${i}:${p}`;l.import||(l.import=[f]),l.export||(l.export=[f])}c.evpn=l}e.evpn=r}function aa(e,n,t){var d,g;if(!(e.module??[]).includes("evpn"))return;const r=n.evpn??{},i=e.evpn??{};i.transport===void 0&&(i.transport=r.transport??"vxlan"),(!Array.isArray(i.session)||!i.session.length)&&(i.session=Array.isArray(r.session)?[...r.session]:["ibgp"]);const a=ra(n),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(a)).filter(N=>{var C;return typeof((C=a[N])==null?void 0:C.vni)=="number"});i.vlans=o;const c=String(((d=e.bgp)==null?void 0:d.router_id)??""),l={...e.vlans??{}};for(const N of o){const C=a[N],L=C.evpn??{},D={...l[N]??{},id:C.id,mode:C.mode,vni:C.vni,evpn:{...L}},P=L.evi;c&&P!==void 0&&D.evpn.rd===void 0&&(D.evpn.rd=`${c}:${P}`),l[N]=D}Object.keys(l).length&&(e.vlans=l);const p=new Set(i.session.map(String)),f=e.bgp??{},m=Array.isArray(f.neighbor)?f.neighbor:[];for(const N of m){const C=String(N.name??""),L=(g=n.nodes)==null?void 0:g[C];if(!L||!(L.module??[]).includes("evpn"))continue;const D=String(N.type??"");p.has(D)&&N.evpn===void 0&&(N.evpn="ipv4")}f.neighbor=m,e.bgp=f,e.evpn=i}const Yl={name:ea,transform_after:na,requires:ta,module_init:ia,module_pre_transform:sa,node_post_transform:aa},Ul=Object.freeze(Object.defineProperty({__proto__:null,default:Yl,module_init:ia,module_pre_transform:sa,name:ea,node_post_transform:aa,requires:ta,transform_after:na},Symbol.toStringTag,{value:"Module"}));const Qn=[Tl,Il,Ol,Ml,jl,Pl,Ul];function ql(e){const n=new Map(Qn.map(o=>[o.name,o])),t=[],r=new Set,i=new Set;function a(o){if(i.has(o)||r.has(o))return;r.add(o);const c=n.get(o);for(const l of[...(c==null?void 0:c.requires)??[],...(c==null?void 0:c.transform_after)??[]])e.includes(l)&&a(l);r.delete(o),i.add(o),t.push(o)}for(const o of e)a(o);return t}function Kt(e){const n=new Set(e.module??[]);for(const t of Object.values(e.nodes??{}))for(const r of t.module??[])n.add(r);return ql([...n])}const Vl={vxlan:["start_vni"],evpn:["start_transit_vni"]};function Bl(e){const n=e.defaults??{},t=new Set(Qn.map(r=>r.name));for(const r of Kt(e)){if(!t.has(r))continue;const i=n[r]??{},a=e[r]??{},o=Z(i,a);for(const c of Vl[r]??[])delete o[c];e[r]=o;for(const c of Object.values(e.nodes??{})){if(!(c.module??[]).includes(r))continue;const l=c[r]??{},p=Z(e[r],l);Object.keys(p).length!==0&&(c[r]=p)}}}function ye(e,n,t){const r=Kt(n);for(const i of r){const a=Qn.find(c=>c.name===i);if(!a)continue;const o=a[e];if(typeof o=="function")if(e.startsWith("node_"))for(const c of Object.values(n.nodes??{}))(c.module??[]).includes(i)&&o(c,n,t);else if(e.startsWith("link_"))for(const c of n.links??[])o(c,n,t);else o(n,t)}}function Gl(e){const n={ospf:["area","passive","network_type","cost"],isis:["network_type","metric","passive"]};for(const t of Object.values(e.nodes??{}))for(const[r,i]of Object.entries(n)){if(!(t.module??[]).includes(r))continue;const a=t[r]??{};for(const o of t.interfaces??[]){const c=o[r]??{};for(const l of i)c[l]===void 0&&a[l]!==void 0&&(c[l]=a[l]);o[r]=c}}}function zl(e,n){const t=new Set(Qn.map(r=>r.name));for(const r of Object.values(e.nodes??{}))for(const i of r.module??[])t.has(i)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${i} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(const r of e.module??[])t.has(r)||n.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${r}`,path:"module"})}function Kl(e,n){e.provider||(e.provider="clab"),e.provider!=="clab"&&n.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:"provider"})}function Hl(e,n){e.provider||(e.provider="clab")}function Wl(e){for(const n of Object.values(e.nodes??{}))n.device==="bird"&&Xl(n)}function Jl(e){return`(rt,${e.split(":").join(",")})`}function Xl(e){const n=e.vrfs;if(n)for(const t of Object.values(n))for(const r of["import","export"]){const i=t[r];Array.isArray(i)&&(t[`netlab-internal:_bird_${r}`]=i.map(a=>typeof a=="string"?Jl(a):a))}}function Ql(e,n={}){var a,o,c;const t=new wa,r=_s(),i={diagnostics:t,devices:r};if(vi(e),Kl(e,i),vl(e),bl(e),e.nodes=rl(e.nodes,t),wl(e),bs(e,t),xl(e),sl(e,t),Array.isArray(e.module))for(const l of Object.values(e.nodes)){if(l.role==="host"&&!l["netlab-internal:_daemon"])continue;const p=new Set([...l.module??[],...e.module]);l.module=[...p]}return Bl(e),zl(e,t),ye("module_init",e,i),pl(e),(a=n.afterSetup)==null||a.call(n,e,i),ye("module_pre_transform",e,i),ye("node_pre_transform",e,i),al(e),ye("link_pre_transform",e,i),yl(e),ye("link_post_transform",e,i),ye("node_post_transform",e,i),Gl(e),ye("module_post_transform",e,i),(o=n.afterAddressed)==null||o.call(n,e,i),Wl(e),Hl(e),e.module=Kt(e),(c=n.afterTransformed)==null||c.call(n,e,i),{topology:e,diagnostics:t,ctx:i}}function Zl(e,n={}){const t={},r=n.validate===!0,i=(c,l,p)=>{var m;if(!r)return;const f=el(c,l,{yangDir:n.yangDir,diagnostics:p});t[l]=f.ok,(m=n.snapshots)==null||m.set(l,structuredClone(c))},{topology:a,diagnostics:o}=Ql(e,{afterSetup:(c,l)=>{const p=l.diagnostics;i(c,"user_input",p),i(c,"normalized",p)},afterAddressed:(c,l)=>{i(c,"addressed",l.diagnostics)},afterTransformed:(c,l)=>{i(c,"transformed",l.diagnostics)}});return{topology:a,diagnostics:o,stages:t}}const eu=`defaults:
  device: frr
provider: clab
name: demo
module: [ospf]
nodes:
  r1:
  r2:
links:
  - [r1, r2]
`;function nu(e){const n=new Date(e);if(Number.isNaN(n.getTime()))return e;const t=r=>String(r).padStart(2,"0");return`${n.getUTCFullYear()}-${t(n.getUTCMonth()+1)}-${t(n.getUTCDate())} ${t(n.getUTCHours())}:${t(n.getUTCMinutes())}:${t(n.getUTCSeconds())} UTC`}const de=document.querySelector("#app");de.innerHTML=`
  <header>
    <p class="build-time" title="Build timestamp">Built ${nu("2026-07-16T19:50:18.988Z")}</p>
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
`;const Se=de.querySelector("#src"),ei=de.querySelector("#out"),Fe=de.querySelector("#status"),Wn=de.querySelector("#errors"),oa=de.querySelector("#graph"),tu=de.querySelector("#run"),ru=de.querySelector("#validate");Se.value=eu;function ca(){Se.style.height="auto",Se.style.height=`${Se.scrollHeight}px`}function la(){Wn.hidden=!0,Wn.innerHTML="",Fe.classList.remove("is-error")}function ni(e){if(!e.length){la();return}Fe.classList.add("is-error"),Wn.hidden=!1,Wn.innerHTML=`
    <h2>Transform errors</h2>
    <ul>
      ${e.map(n=>`<li>${iu(n)}</li>`).join("")}
    </ul>
  `}function iu(e){return e.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}function su(e){const n=Object.keys(e.nodes??{}),t=e.links??[],r=640,i=360,a=r/2,o=i/2,c=Math.min(r,i)*.32,l=new Map;n.forEach((m,d)=>{const g=2*Math.PI*d/Math.max(n.length,1)-Math.PI/2;l.set(m,{x:a+c*Math.cos(g),y:o+c*Math.sin(g)})});const p=t.flatMap(m=>{const d=m.interfaces??[];if(d.length<2)return[];const g=[];for(let N=0;N<d.length;N++)for(let C=N+1;C<d.length;C++){const L=l.get(String(d[N].node)),D=l.get(String(d[C].node));!L||!D||g.push(`<line x1="${L.x}" y1="${L.y}" x2="${D.x}" y2="${D.y}" class="edge"/>`)}return g}).join(""),f=n.map(m=>{var N,C;const d=l.get(m),g=String(((C=(N=e.nodes)==null?void 0:N[m])==null?void 0:C.device)??"");return`
        <g class="node">
          <circle cx="${d.x}" cy="${d.y}" r="28"/>
          <text x="${d.x}" y="${d.y-2}" text-anchor="middle">${m}</text>
          <text x="${d.x}" y="${d.y+14}" text-anchor="middle" class="sub">${g}</text>
        </g>`}).join("");oa.innerHTML=`${p}${f}`}function ua(){Fe.textContent="Running…",la();try{const e=Jn.load(Se.value);if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Topology must be a YAML object");const n=Ta(Se.value),{topology:t,diagnostics:r,stages:i}=Zl(n,{validate:ru.checked,yangDir:"/yang"});ei.textContent=JSON.stringify(t,null,2),su(t);const a=r.list().filter(c=>c.severity==="error"),o=r.list().filter(c=>c.severity==="warning");a.length?(Fe.textContent=`${a.length} error(s); stages: ${JSON.stringify(i)}`,ni(a.map(c=>{const l=c.path?` (${c.path})`:"";return`[${c.module}/${c.code}] ${c.message}${l}`}))):Fe.textContent=o.length?`OK with ${o.length} warning(s) — stages: ${JSON.stringify(i)}`:`OK — stages: ${JSON.stringify(i)}`}catch(e){const n=e instanceof Error?e.message:String(e);Fe.textContent="Transform failed",ni([n]),ei.textContent="",oa.innerHTML=""}}Se.addEventListener("input",ca);tu.addEventListener("click",ua);ca();ua();
