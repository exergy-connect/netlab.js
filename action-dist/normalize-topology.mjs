import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);
var qa=Object.create;var ln=Object.defineProperty;var Ka=Object.getOwnPropertyDescriptor;var Wa=Object.getOwnPropertyNames;var za=Object.getPrototypeOf,Ha=Object.prototype.hasOwnProperty;var Xa=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}},te=(e,t)=>{for(var n in t)ln(e,n,{get:t[n],enumerable:!0})},Qa=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Wa(t))!Ha.call(e,i)&&i!==n&&ln(e,i,{get:()=>t[i],enumerable:!(r=Ka(t,i))||r.enumerable});return e};var Zr=(e,t,n)=>(n=e!=null?qa(za(e)):{},Qa(t||!e||!e.__esModule?ln(n,"default",{value:e,enumerable:!0}):n,e));var _r=Xa((Fo,an)=>{(function(e){"use strict";let t="(0?\\d+|0x[a-f0-9]+)",n={fourOctet:new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`,"i"),threeOctet:new RegExp(`^${t}\\.${t}\\.${t}$`,"i"),twoOctet:new RegExp(`^${t}\\.${t}$`,"i"),longValue:new RegExp(`^${t}$`,"i")},r=new RegExp("^0[0-7]+$","i"),i=new RegExp("^0x[a-f0-9]+$","i"),s="%[0-9a-z]{1,}",o="(?:[0-9a-f]+::?)+",a={zoneIndex:new RegExp(s,"i"),native:new RegExp(`^(::)?(${o})?([0-9a-f]+)?(::)?(${s})?$`,"i"),deprecatedTransitional:new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${s})?)$`,"i"),transitional:new RegExp(`^((?:${o})|(?:::)(?:${o})?)${t}\\.${t}\\.${t}\\.${t}(${s})?$`,"i")};function c(u,d){if(u.indexOf("::")!==u.lastIndexOf("::"))return null;let _=0,h=-1,g=(u.match(a.zoneIndex)||[])[0],y,b;for(g&&(g=g.substring(1),u=u.replace(/%.+$/,""));(h=u.indexOf(":",h+1))>=0;)_++;if(u.substr(0,2)==="::"&&_--,u.substr(-2,2)==="::"&&_--,_>d)return null;for(b=d-_,y=":";b--;)y+="0:";return u=u.replace("::",y),u[0]===":"&&(u=u.slice(1)),u[u.length-1]===":"&&(u=u.slice(0,-1)),d=(function(){let v=u.split(":"),k=[];for(let R=0;R<v.length;R++)k.push(parseInt(v[R],16));return k})(),{parts:d,zoneId:g}}function f(u,d,_,h){if(u.length!==d.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");let g=0,y;for(;h>0;){if(y=_-h,y<0&&(y=0),u[g]>>y!==d[g]>>y)return!1;h-=_,g+=1}return!0}function p(u){if(i.test(u))return parseInt(u,16);if(u[0]==="0"&&!isNaN(parseInt(u[1],10))){if(r.test(u))return parseInt(u,8);throw new Error(`ipaddr: cannot parse ${u} as octal`)}return parseInt(u,10)}function l(u,d){for(;u.length<d;)u=`0${u}`;return u}let m={};m.IPv4=(function(){function u(d){if(d.length!==4)throw new Error("ipaddr: ipv4 octet count should be 4");let _,h;for(_=0;_<d.length;_++)if(h=d[_],!(0<=h&&h<=255))throw new Error("ipaddr: ipv4 octet should fit in 8 bits");this.octets=d}return u.prototype.SpecialRanges={unspecified:[[new u([0,0,0,0]),8]],broadcast:[[new u([255,255,255,255]),32]],multicast:[[new u([224,0,0,0]),4]],linkLocal:[[new u([169,254,0,0]),16]],loopback:[[new u([127,0,0,0]),8]],carrierGradeNat:[[new u([100,64,0,0]),10]],private:[[new u([10,0,0,0]),8],[new u([172,16,0,0]),12],[new u([192,168,0,0]),16]],reserved:[[new u([192,0,0,0]),24],[new u([192,0,2,0]),24],[new u([192,88,99,0]),24],[new u([198,18,0,0]),15],[new u([198,51,100,0]),24],[new u([203,0,113,0]),24],[new u([240,0,0,0]),4]],as112:[[new u([192,175,48,0]),24],[new u([192,31,196,0]),24]],amt:[[new u([192,52,193,0]),24]]},u.prototype.kind=function(){return"ipv4"},u.prototype.match=function(d,_){let h;if(_===void 0&&(h=d,d=h[0],_=h[1]),d.kind()!=="ipv4")throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return f(this.octets,d.octets,8,_)},u.prototype.prefixLengthFromSubnetMask=function(){let d=0,_=!1,h={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0},g,y,b;for(g=3;g>=0;g-=1)if(y=this.octets[g],y in h){if(b=h[y],_&&b!==0)return null;b!==8&&(_=!0),d+=b}else return null;return 32-d},u.prototype.range=function(){return m.subnetMatch(this,this.SpecialRanges)},u.prototype.toByteArray=function(){return this.octets.slice(0)},u.prototype.toIPv4MappedAddress=function(){return m.IPv6.parse(`::ffff:${this.toString()}`)},u.prototype.toNormalizedString=function(){return this.toString()},u.prototype.toString=function(){return this.octets.join(".")},u})(),m.IPv4.broadcastAddressFromCIDR=function(u){try{let d=this.parseCIDR(u),_=d[0].toByteArray(),h=this.subnetMaskFromPrefixLength(d[1]).toByteArray(),g=[],y=0;for(;y<4;)g.push(parseInt(_[y],10)|parseInt(h[y],10)^255),y++;return new this(g)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},m.IPv4.isIPv4=function(u){return this.parser(u)!==null},m.IPv4.isValid=function(u){try{return new this(this.parser(u)),!0}catch{return!1}},m.IPv4.isValidCIDR=function(u){try{return this.parseCIDR(u),!0}catch{return!1}},m.IPv4.isValidFourPartDecimal=function(u){return!!(m.IPv4.isValid(u)&&u.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},m.IPv4.isValidCIDRFourPartDecimal=function(u){let d=u.match(/^(.+)\/(\d+)$/);return!m.IPv4.isValidCIDR(u)||!d?!1:m.IPv4.isValidFourPartDecimal(d[1])},m.IPv4.networkAddressFromCIDR=function(u){let d,_,h,g,y;try{for(d=this.parseCIDR(u),h=d[0].toByteArray(),y=this.subnetMaskFromPrefixLength(d[1]).toByteArray(),g=[],_=0;_<4;)g.push(parseInt(h[_],10)&parseInt(y[_],10)),_++;return new this(g)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},m.IPv4.parse=function(u){let d=this.parser(u);if(d===null)throw new Error("ipaddr: string is not formatted like an IPv4 Address");return new this(d)},m.IPv4.parseCIDR=function(u){let d;if(d=u.match(/^(.+)\/(\d+)$/)){let _=parseInt(d[2]);if(_>=0&&_<=32){let h=[this.parse(d[1]),_];return Object.defineProperty(h,"toString",{value:function(){return this.join("/")}}),h}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},m.IPv4.parser=function(u){let d,_,h;if(d=u.match(n.fourOctet))return(function(){let g=d.slice(1,6),y=[];for(let b=0;b<g.length;b++)_=g[b],y.push(p(_));return y})();if(d=u.match(n.longValue)){if(h=p(d[1]),h>4294967295||h<0)throw new Error("ipaddr: address outside defined range");return(function(){let g=[],y;for(y=0;y<=24;y+=8)g.push(h>>y&255);return g})().reverse()}else return(d=u.match(n.twoOctet))?(function(){let g=d.slice(1,4),y=[];if(h=p(g[1]),h>16777215||h<0)throw new Error("ipaddr: address outside defined range");return y.push(p(g[0])),y.push(h>>16&255),y.push(h>>8&255),y.push(h&255),y})():(d=u.match(n.threeOctet))?(function(){let g=d.slice(1,5),y=[];if(h=p(g[2]),h>65535||h<0)throw new Error("ipaddr: address outside defined range");return y.push(p(g[0])),y.push(p(g[1])),y.push(h>>8&255),y.push(h&255),y})():null},m.IPv4.subnetMaskFromPrefixLength=function(u){if(u=parseInt(u),u<0||u>32)throw new Error("ipaddr: invalid IPv4 prefix length");let d=[0,0,0,0],_=0,h=Math.floor(u/8);for(;_<h;)d[_]=255,_++;return h<4&&(d[h]=Math.pow(2,u%8)-1<<8-u%8),new this(d)},m.IPv6=(function(){function u(d,_){let h,g;if(d.length===16)for(this.parts=[],h=0;h<=14;h+=2)this.parts.push(d[h]<<8|d[h+1]);else if(d.length===8)this.parts=d;else throw new Error("ipaddr: ipv6 part count should be 8 or 16");for(h=0;h<this.parts.length;h++)if(g=this.parts[h],!(0<=g&&g<=65535))throw new Error("ipaddr: ipv6 part should fit in 16 bits");_&&(this.zoneId=_)}return u.prototype.SpecialRanges={unspecified:[new u([0,0,0,0,0,0,0,0]),128],linkLocal:[new u([65152,0,0,0,0,0,0,0]),10],multicast:[new u([65280,0,0,0,0,0,0,0]),8],loopback:[new u([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new u([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new u([0,0,0,0,0,65535,0,0]),96],deprecatedSiteLocal:[new u([65216,0,0,0,0,0,0,0]),10],discard:[new u([256,0,0,0,0,0,0,0]),64],rfc6145:[new u([0,0,0,0,65535,0,0,0]),96],rfc6052:[[new u([100,65435,0,0,0,0,0,0]),96],[new u([100,65435,1,0,0,0,0,0]),48]],"6to4":[new u([8194,0,0,0,0,0,0,0]),16],teredo:[new u([8193,0,0,0,0,0,0,0]),32],benchmarking:[new u([8193,2,0,0,0,0,0,0]),48],amt:[new u([8193,3,0,0,0,0,0,0]),32],as112v6:[[new u([8193,4,274,0,0,0,0,0]),48],[new u([9760,79,32768,0,0,0,0,0]),48]],deprecatedOrchid:[new u([8193,16,0,0,0,0,0,0]),28],orchid2:[new u([8193,32,0,0,0,0,0,0]),28],droneRemoteIdProtocolEntityTags:[new u([8193,48,0,0,0,0,0,0]),28],segmentRouting:[new u([24320,0,0,0,0,0,0,0]),16],reserved:[[new u([8193,0,0,0,0,0,0,0]),23],[new u([8193,3512,0,0,0,0,0,0]),32],[new u([16383,0,0,0,0,0,0,0]),20]]},u.prototype.isIPv4MappedAddress=function(){return this.range()==="ipv4Mapped"},u.prototype.kind=function(){return"ipv6"},u.prototype.match=function(d,_){let h;if(_===void 0&&(h=d,d=h[0],_=h[1]),d.kind()!=="ipv6")throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return f(this.parts,d.parts,16,_)},u.prototype.prefixLengthFromSubnetMask=function(){let d=0,_=!1,h={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0},g,y;for(let b=7;b>=0;b-=1)if(g=this.parts[b],g in h){if(y=h[g],_&&y!==0)return null;y!==16&&(_=!0),d+=y}else return null;return 128-d},u.prototype.range=function(){return m.subnetMatch(this,this.SpecialRanges)},u.prototype.toByteArray=function(){let d,_=[],h=this.parts;for(let g=0;g<h.length;g++)d=h[g],_.push(d>>8),_.push(d&255);return _},u.prototype.toFixedLengthString=function(){let d=(function(){let h=[];for(let g=0;g<this.parts.length;g++)h.push(l(this.parts[g].toString(16),4));return h}).call(this).join(":"),_="";return this.zoneId&&(_=`%${this.zoneId}`),d+_},u.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");let d=this.parts.slice(-2),_=d[0],h=d[1];return new m.IPv4([_>>8,_&255,h>>8,h&255])},u.prototype.toNormalizedString=function(){let d=(function(){let h=[];for(let g=0;g<this.parts.length;g++)h.push(this.parts[g].toString(16));return h}).call(this).join(":"),_="";return this.zoneId&&(_=`%${this.zoneId}`),d+_},u.prototype.toRFC5952String=function(){let d=/((^|:)(0(:|$)){2,})/g,_=this.toNormalizedString(),h=0,g=-1,y;for(;y=d.exec(_);)y[0].length>g&&(h=y.index,g=y[0].length);return g<0?_:`${_.substring(0,h)}::${_.substring(h+g)}`},u.prototype.toString=function(){return this.toRFC5952String()},u})(),m.IPv6.broadcastAddressFromCIDR=function(u){try{let d=this.parseCIDR(u),_=d[0].toByteArray(),h=this.subnetMaskFromPrefixLength(d[1]).toByteArray(),g=[],y=0;for(;y<16;)g.push(parseInt(_[y],10)|parseInt(h[y],10)^255),y++;return new this(g)}catch(d){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${d})`)}},m.IPv6.isIPv6=function(u){return this.parser(u)!==null},m.IPv6.isValid=function(u){if(typeof u=="string"&&u.indexOf(":")===-1)return!1;try{let d=this.parser(u);return new this(d.parts,d.zoneId),!0}catch{return!1}},m.IPv6.isValidCIDR=function(u){if(typeof u=="string"&&u.indexOf(":")===-1)return!1;try{return this.parseCIDR(u),!0}catch{return!1}},m.IPv6.networkAddressFromCIDR=function(u){let d,_,h,g,y;try{for(d=this.parseCIDR(u),h=d[0].toByteArray(),y=this.subnetMaskFromPrefixLength(d[1]).toByteArray(),g=[],_=0;_<16;)g.push(parseInt(h[_],10)&parseInt(y[_],10)),_++;return new this(g)}catch(b){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${b})`)}},m.IPv6.parse=function(u){let d=this.parser(u);if(d.parts===null)throw new Error("ipaddr: string is not formatted like an IPv6 Address");return new this(d.parts,d.zoneId)},m.IPv6.parseCIDR=function(u){let d,_,h;if((_=u.match(/^(.+)\/(\d+)$/))&&(d=parseInt(_[2]),d>=0&&d<=128))return h=[this.parse(_[1]),d],Object.defineProperty(h,"toString",{value:function(){return this.join("/")}}),h;throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},m.IPv6.parser=function(u){let d,_,h,g,y,b;if(h=u.match(a.deprecatedTransitional))return this.parser(`::ffff:${h[1]}`);if(a.native.test(u))return c(u,8);if((h=u.match(a.transitional))&&(b=h[6]||"",d=h[1],h[1].endsWith("::")||(d=d.slice(0,-1)),d=c(d+b,6),d.parts)){for(y=[parseInt(h[2]),parseInt(h[3]),parseInt(h[4]),parseInt(h[5])],_=0;_<y.length;_++)if(g=y[_],!(0<=g&&g<=255))return null;return d.parts.push(y[0]<<8|y[1]),d.parts.push(y[2]<<8|y[3]),{parts:d.parts,zoneId:d.zoneId}}return null},m.IPv6.subnetMaskFromPrefixLength=function(u){if(u=parseInt(u),u<0||u>128)throw new Error("ipaddr: invalid IPv6 prefix length");let d=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],_=0,h=Math.floor(u/8);for(;_<h;)d[_]=255,_++;return h<16&&(d[h]=Math.pow(2,u%8)-1<<8-u%8),new this(d)},m.fromByteArray=function(u){let d=u.length;if(d===4)return new m.IPv4(u);if(d===16)return new m.IPv6(u);throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")},m.isValid=function(u){return m.IPv6.isValid(u)||m.IPv4.isValid(u)},m.isValidCIDR=function(u){return m.IPv6.isValidCIDR(u)||m.IPv4.isValidCIDR(u)},m.parse=function(u){if(m.IPv6.isValid(u))return m.IPv6.parse(u);if(m.IPv4.isValid(u))return m.IPv4.parse(u);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},m.parseCIDR=function(u){try{return m.IPv6.parseCIDR(u)}catch{try{return m.IPv4.parseCIDR(u)}catch{throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},m.process=function(u){let d=this.parse(u);return d.kind()==="ipv6"&&d.isIPv4MappedAddress()?d.toIPv4Address():d},m.subnetMatch=function(u,d,_){let h,g,y,b;_==null&&(_="unicast");for(g in d)if(Object.prototype.hasOwnProperty.call(d,g)){for(y=d[g],y[0]&&!(y[0]instanceof Array)&&(y=[y]),h=0;h<y.length;h++)if(b=y[h],u.kind()===b[0].kind()&&u.match.apply(u,b))return g}return _},typeof an<"u"&&an.exports?an.exports=m:e.ipaddr=m})(Fo)});import{appendFileSync as zd,mkdirSync as Hd,writeFileSync as Xd}from"node:fs";import{dirname as Qd,resolve as Ga}from"node:path";import{fileURLToPath as Jd}from"node:url";var ne="netlab-internal",q=`${ne}:_linkname`,et=["none","linux","frr","bird","iosv"];function ei(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function E(e,t){let n=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(let[i,s]of Object.entries(t)){if(i==="_removed_attr"){let a=Array.isArray(s)?s:[];r._removed_attr=[...n,...a.filter(c=>!n.has(c))];continue}if(n.has(i))continue;let o=r[i];ei(o)&&ei(s)?r[i]=E(o,s):r[i]=ti(s)}return r}function ti(e){return structuredClone(e)}function ni(e,t){return E(e,t)}function xt(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function ke(e){if(Array.isArray(e))return e.map(n=>ke(n));if(!xt(e))return e;let t={};for(let[n,r]of Object.entries(e))Ja(t,n,ke(r));return t}function Ja(e,t,n){if(!t.includes(".")){ri(e,t,n);return}let r=t.split("."),i=e;for(let s=0;s<r.length-1;s++){let o=r[s],a=i[o];(a==null||!xt(a))&&(i[o]={}),i=i[o]}ri(i,r[r.length-1],n)}function ri(e,t,n){let r=e[t];xt(r)&&xt(n)?e[t]=E(r,n):e[t]=n}function dn(e){let t=ke(e);for(let n of Object.keys(e))delete e[n];Object.assign(e,t)}var tt=class{items=[];error(t){this.items.push({...t,severity:"error"})}warning(t){this.items.push({...t,severity:"warning"})}hasErrors(){return this.items.some(t=>t.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}};function wt(e,t){let n=e.toLowerCase(),r="VALUE",i="VALUE";return n.includes("missing")||n.includes("required")||n.includes("mandatory")?(r="MISSING",i="MISSING"):n.includes("type")||n.includes("pattern")||n.includes("range")?(r="TYPE",i="TYPE"):n.includes("unknown")||n.includes("not allowed")||n.includes("unexpected")?(r="ATTR",i="ATTR"):n.includes("leafref")||n.includes("instance")?(r="VALUE",i="VALUE"):n.includes("depend")&&(r="DEPEND",i="DEPEND"),{code:i,category:r,module:"xyang",message:e,path:t}}import vu from"node:fs";var S=Symbol("NOT_RESOLVED");function B(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(n=>String(n)),representTagName:t.representTagName??(()=>e)}}function En(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify,represent:t.represent??(r=>r),representTagName:t.representTagName??(()=>e)}}function Et(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify,represent:t.represent??(r=>r),representTagName:t.representTagName??(()=>e)}}var Za=B("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),ec=["","~","null","Null","NULL"],tc=B("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>ec.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),nc=B("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>e==="null"||t&&e===""?null:S,identify:e=>e===null,represent:()=>"null"}),rc=["","~","null","Null","NULL"],ic=B("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>rc.indexOf(e)!==-1?null:S,identify:e=>e===null,represent:()=>"null"}),sc=["true","True","TRUE"],oc=["false","False","FALSE"],ac=B("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>sc.indexOf(e)!==-1?!0:oc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),cc=["true"],fc=["false"],uc=B("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>cc.indexOf(e)!==-1?!0:fc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),pc=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],lc=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],dc=B("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>pc.indexOf(e)!==-1?!0:lc.indexOf(e)!==-1?!1:S,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),mc=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),hc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function _c(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function gc(e,t){if(t){if(!hc.test(e))return S}else if(!mc.test(e))return S;let n=_c(e);return Number.isFinite(n)?n:S}var yi=B("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:gc,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),yc=new RegExp("^-?(?:0|[1-9][0-9]*)$"),vc=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function bc(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function xc(e,t){if(t){if(!vc.test(e))return S}else if(!yc.test(e))return S;let n=bc(e);return Number.isFinite(n)?n:S}var wc=B("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:xc,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Ac=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Sc(e){let t=e.replace(/_/g,""),n=1;if((t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b"))return n*parseInt(t.slice(2),2);if(t.startsWith("0x"))return n*parseInt(t.slice(2),16);if(t.includes(":")){let r=0;for(let i of t.split(":"))r=r*60+Number(i);return n*r}return t!=="0"&&t[0]==="0"?n*parseInt(t,8):n*parseInt(t,10)}function Ic(e){if(!Ac.test(e))return S;let t=Sc(e);return Number.isFinite(t)?t:S}var bn=B("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Ic,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Ec=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Nc=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Tc(e){if(!Ec.test(e))return S;let t=e.toLowerCase(),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||Nc.test(e)?r:S}function kc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var vi=B("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Tc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:kc}),$c=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),Oc=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Cc(e,t){if(t){if(!Oc.test(e))return S;let r=e.toLowerCase(),i=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;let s=i*parseFloat(r);return Number.isFinite(s)?s:S}if(!$c.test(e))return S;let n=Number(e);return Number.isFinite(n)?n:S}function Lc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var Pc=B("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Cc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:Lc}),Rc=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Fc=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Dc(e){if(!Rc.test(e))return S;let t=e.toLowerCase().replace(/_/g,""),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=0;if(t.includes(":")){for(let i of t.split(":"))r=r*60+Number(i);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||Fc.test(e)?r:S}function jc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var xn=B("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Dc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:jc}),Mc=B("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>e==="<<"||t&&e===""?"<<":S,identify:()=>!1}),Bc=/^[A-Za-z0-9+/]*={0,2}$/;function Yc(e){let t=e.replace(/\s/g,"");if(t.length%4!==0||!Bc.test(t))return S;let n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}function Vc(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var Uc=B("tag:yaml.org,2002:binary",{resolve:Yc,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:Vc}),Gc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),qc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function ii(e,t,n,r=0,i=0,s=0,o=0){let a=new Date(Date.UTC(e,t,n,r,i,s,o));return a.setUTCFullYear(e,t,n),a}function Kc(e){let t=Gc.exec(e);if(t===null&&(t=qc.exec(e)),t===null)return S;let n=+t[1],r=+t[2]-1,i=+t[3];if(!t[4]){let p=ii(n,r,i);return p.getUTCFullYear()!==n||p.getUTCMonth()!==r||p.getUTCDate()!==i?S:p}let s=+t[4],o=+t[5],a=+t[6],c=0;if(s>23||o>59||a>59)return S;if(t[7]){let p=t[7].slice(0,3);for(;p.length<3;)p+="0";c=+p}let f=ii(n,r,i,s,o,a,c);if(f.getUTCFullYear()!==n||f.getUTCMonth()!==r||f.getUTCDate()!==i)return S;if(t[9]){let p=+t[10],l=+(t[11]||0);if(p>23||l>59)return S;let m=(p*60+l)*6e4;f.setTime(f.getTime()-(t[9]==="-"?-m:m))}return f}var Wc=B("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:Kc,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),zc=En("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function Nt(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function si(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}var Hc=En("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return"cannot resolve an ordered map item";n=t.keys().next().value}else if(Nt(t)){let r=Object.keys(t);if(r.length!==1)return"cannot resolve an ordered map item";n=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(n)?"duplicate key in ordered map":(e.seen.add(n),e.list.push(t),"")},finalize:e=>e.list,identify:()=>!1}),Xc=En("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size!==1?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if(Object.prototype.toString.call(t)!=="[object Object]")return"cannot resolve a pairs item";let n=t,r=Object.keys(n);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],n[r[0]]]),"")},identify:()=>!1}),Qc=Et("tag:yaml.org,2002:map",{create:()=>({}),identify:Nt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(t!==null&&typeof t=="object")return"object-based map does not support complex keys";let r=String(t);return r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,""},has:(e,t)=>t!==null&&typeof t=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),Jc=Et("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n!==null?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function Zc(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function ef(){return{scalar:[],sequence:[],mapping:[]}}function tf(e){let t=[];for(let n of e){let r=t.length;for(let i=0;i<t.length;i++){let s=t[i];if(s.nodeKind===n.nodeKind&&s.tagName===n.tagName&&s.matchByTagPrefix===n.matchByTagPrefix){r=i;break}}t[r]=n}return t}var Tt=class bi{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(t){let n=tf(t),r=[],i=Zc(),s=ef();for(let p of n){if(p.nodeKind==="scalar"&&p.implicit){if(p.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(p)}switch(p.nodeKind){case"scalar":p.matchByTagPrefix?s.scalar.push(p):i.scalar[p.tagName]=p;break;case"sequence":p.matchByTagPrefix?s.sequence.push(p):i.sequence[p.tagName]=p;break;case"mapping":p.matchByTagPrefix?s.mapping.push(p):i.mapping[p.tagName]=p}}let o=r.filter(p=>p.implicitFirstChars===null),a=new Set;for(let p of r)if(p.implicitFirstChars!==null)for(let l of p.implicitFirstChars)a.add(l);let c=new Map;for(let p of a)c.set(p,r.filter(l=>l.implicitFirstChars===null||l.implicitFirstChars.indexOf(p)!==-1));let f=i.scalar["tag:yaml.org,2002:str"];if(!f)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=n,this.implicitScalarTags=r,this.implicitScalarByFirstChar=c,this.implicitScalarAnyFirstChar=o,this.defaultScalarTag=f,this.defaultSequenceTag=i.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=i.mapping["tag:yaml.org,2002:map"],this.exact=i,this.prefix=s}lookupScalarTag(t){let n=this.exact.scalar[t];if(n)return n;for(let r of this.prefix.scalar)if(t.startsWith(r.tagName))return r}lookupSequenceTag(t){let n=this.exact.sequence[t];if(n)return n;for(let r of this.prefix.sequence)if(t.startsWith(r.tagName))return r}lookupMappingTag(t){let n=this.exact.mapping[t];if(n)return n;for(let r of this.prefix.mapping)if(t.startsWith(r.tagName))return r}resolveImplicitScalarTag(t){let n=this.implicitScalarByFirstChar.get(t.charAt(0))??this.implicitScalarAnyFirstChar;for(let i of n){let s=i.resolve(t,!1,i.tagName);if(s!==S)return{value:s,tag:i}}let r=this.defaultScalarTag;return{value:r.resolve(t,!1,r.tagName),tag:r}}withTags(...t){let n=[];for(let r of t)n=n.concat(r);return new bi([...this.tags,...n])}},Nn=new Tt([Za,zc,Qc]),om=new Tt([...Nn.tags,nc,uc,wc,Pc]),nf=new Tt([...Nn.tags,tc,ac,yi,vi]),rf=new Tt([...Nn.tags,ic,dc,bn,xn,Wc,Mc,Uc,Hc,Xc,Jc]),sf=rf.withTags({...bn,resolve:(e,t,n)=>{let r=bn.resolve(e,t,n);return r===S?yi.resolve(e,t,n):r}},{...xn,resolve:(e,t,n)=>{let r=xn.resolve(e,t,n);return r===S?vi.resolve(e,t,n):r}}),am=Et("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||Nt(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let r of Object.keys(n))t.set(r,n[r]);return t}});function oi(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let n=0;n<t.length;n++){if(Array.isArray(t[n]))return null;typeof t[n]=="object"&&Object.prototype.toString.call(t[n])==="[object Object]"&&(t[n]="[object Object]")}return String(t)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}var cm=Et("tag:yaml.org,2002:map",{create:()=>({}),identify:Nt,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=oi(t);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,"")},has:(e,t)=>{let n=oi(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),of={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function mn(e,t,n,r,i){let s="",o="",a=Math.floor(i/2)-1;return r-t>a&&(s=" ... ",t=r-a+s.length),n-r>a&&(o=" ...",n=r+a-o.length),{str:s+e.slice(t,n).replace(/\t/g,"\u2192")+o,pos:r-t+s.length}}function hn(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function af(e,t){if(!e.buffer)return null;let n={...of,...t},r=/\r?\n|\r|\0/g,i=[0],s=[],o,a=-1;for(;o=r.exec(e.buffer);)s.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&a<0&&(a=i.length-2);a<0&&(a=i.length-1);let c="",f=Math.min(e.line+n.linesAfter,s.length).toString().length,p=n.maxLength-(n.indent+f+3);for(let m=1;m<=n.linesBefore&&!(a-m<0);m++){let u=mn(e.buffer,i[a-m],s[a-m],e.position-(i[a]-i[a-m]),p);c=`${" ".repeat(n.indent)}${hn((e.line-m+1).toString(),f)} | ${u.str}
${c}`}let l=mn(e.buffer,i[a],s[a],e.position,p);c+=`${" ".repeat(n.indent)}${hn((e.line+1).toString(),f)} | ${l.str}
`,c+=`${"-".repeat(n.indent+f+3+l.pos)}^
`;for(let m=1;m<=n.linesAfter&&!(a+m>=s.length);m++){let u=mn(e.buffer,i[a+m],s[a+m],e.position-(i[a]-i[a+m]),p);c+=`${" ".repeat(n.indent)}${hn((e.line+m+1).toString(),f)} | ${u.str}
`}return c.replace(/\n$/,"")}function ai(e,t){let n="";return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`

${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var _e=class xi extends Error{reason;mark;constructor(t,n){super(),this.name="YAMLException",this.reason=t,this.mark=n,this.message=ai(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(t){return`${this.name}: ${ai(this,t)}`}static throwAt(t,n,r,i=""){let s=0,o=0;for(let c=0;c<n;c++){let f=t.charCodeAt(c);f===10?(s++,o=c+1):f===13&&(s++,t.charCodeAt(c+1)===10&&c++,o=c+1)}let a={name:i,buffer:t,position:n,line:s,column:n-o};throw a.snippet=af(a),new xi(r,a)}},$={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},A={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},ue={BLOCK:1,FLOW:2},K={CLIP:1,STRIP:2,KEEP:3},cf=-1;function ci(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var wi=new Array(256),Ai=new Array(256);for(let e=0;e<256;e++)wi[e]=ci(e)?1:0,Ai[e]=ci(e);function ff(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function uf(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function pf(e){return e===120?2:e===117?4:8}function At(e,t,n){let r=0;for(;t<n;){let i=e.charCodeAt(t);if(i===10)r++,t++;else if(i===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(i===32||i===9)t++;else break}return{position:t,breaks:r}}function Tn(e){return e===1?" ":`
`.repeat(e-1)}function lf(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===10||a===13){r+=e.slice(s,o);let c=At(e,i,n);r+=Tn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,o)}function df(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===39)r+=e.slice(s,i)+"'",i+=2,s=o=i;else if(a===10||a===13){r+=e.slice(s,o);let c=At(e,i,n);r+=Tn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,n)}function mf(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===92){r+=e.slice(s,i),i++;let c=e.charCodeAt(i);if(c===10||c===13)i=At(e,i,n).position;else if(c<256&&wi[c])r+=Ai[c],i++;else{let f=pf(c),p=0;for(;f>0;f--){i++;let l=uf(e.charCodeAt(i));p=(p<<4)+l}r+=ff(p),i++}s=o=i}else if(a===10||a===13){r+=e.slice(s,o);let c=At(e,i,n);r+=Tn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,n)}function fi(e,t,n,r,i,s){let o=r<0?0:r,a=e.slice(t,n).replace(/\r\n?/g,`
`),c=a===""?[]:(a.endsWith(`
`)?a.slice(0,-1):a).split(`
`),f="",p=!1,l=0,m=!1;for(let u of c){let d=0;for(;d<o&&u.charCodeAt(d)===32;)d++;if(r<0||d>=u.length){l++;continue}let _=u.slice(o),h=_.charCodeAt(0);s?h===32||h===9?(m=!0,f+=`
`.repeat(p?1+l:l)):m?(m=!1,f+=`
`.repeat(l+1)):l===0?p&&(f+=" "):f+=`
`.repeat(l):f+=`
`.repeat(p?1+l:l),f+=_,p=!0,l=0}return i===K.KEEP?f+=`
`.repeat(p?1+l:l):i!==K.STRIP&&p&&(f+=`
`),f}function hf(e,t){if(t.valueStart===cf)return"";let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case A.SINGLE_QUOTED:return df(e,n,r);case A.DOUBLE_QUOTED:return mf(e,n,r);case A.LITERAL_BLOCK:return fi(e,n,r,t.indent,t.chomping,!1);case A.FOLDED_BLOCK:return fi(e,n,r,t.indent,t.chomping,!0);default:return lf(e,n,r)}}var _f=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"}),gf="-#;/?:@&=+$_.~*'()",fm=gf+"!,[]";function _n(e){let t="",n=0;for(;n<e.length;){if(e.charCodeAt(n)!==37){t+=e[n++];continue}let r=parseInt(e.slice(n+1,n+3),16);if(n+=3,r>=192){let i=r<224?1:r<240?2:3;for(r&=(1<<6-i)-1;i-- >0;)r=r<<6|parseInt(e.slice(n+1,n+3),16)&63,n+=3}r<65536?t+=String.fromCharCode(r):(r-=65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023))}return t}function Si(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return _n(e.slice(2,-1));let n=e.indexOf("!",1),r=n===-1?"!":e.slice(0,n+1);return _n(t?.[r]??_f[r]??r)+_n(e.slice(r.length))}var $e=-1,yf="tag:yaml.org,2002:merge",kn={filename:"",schema:nf,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function vf(e){return"tagStart"in e&&e.tagStart!==$e?e.tagStart:"anchorStart"in e&&e.anchorStart!==$e?e.anchorStart:"valueStart"in e&&e.valueStart!==$e?e.valueStart:"start"in e?e.start:0}function F(e,t){_e.throwAt(e.source,e.position,t,e.filename)}function Ii(e,t,n,r){try{return n.finalize(r)}catch(i){if(i instanceof _e)throw i;_e.throwAt(e.source,t,i instanceof Error?i.message:String(i),e.filename)}}function bf(e,t){let n=hf(e.source,t),r=t.tagStart===$e?"":e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:n,tag:i};let s=Si(r,e.tagHandlers),o=e.schema.lookupScalarTag(s);if(o){let c=o.resolve(n,!0,s);return c===S&&F(e,`cannot resolve a node with !<${s}> explicit tag`),{value:c,tag:o}}let a=e.schema.lookupMappingTag(s)??e.schema.lookupSequenceTag(s);if(a){n!==""&&F(e,`cannot resolve a node with !<${s}> explicit tag`);let c=a.create(s);return{value:a.carrierIsResult?c:Ii(e,e.position,a,c),tag:a}}F(e,`unknown scalar tag !<${s}>`)}return t.style===A.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function ui(e,t,n){let r=t.tagStart===$e?"":e.source.slice(t.tagStart,t.tagEnd);return r===""||r==="!"?n:Si(r,e.tagHandlers)}function Ei(e){return e.nodeKind==="mapping"}function pi(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&F(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function li(e,t,n,r){pi(e);for(let i of r.keys(n)){if(pi(e),t.tag.has(t.value,i))continue;let s=t.tag.addPair(t.value,i,r.get(n,i));s&&F(e,s),t.overridable??=new Set,t.overridable.add(i)}}function xf(e,t,n,r){if(e.position=t.keyPosition,Ei(r))li(e,t,n,r);else if(r.nodeKind==="sequence"&&Array.isArray(n)){n.length>100&&F(e,"abnormal merge sequence size");for(let i of n){let s=e.nodeTags.get(i);s||F(e,"cannot merge mappings; the provided source object is unacceptable"),li(e,t,i,s)}}else F(e,"cannot merge mappings; the provided source object is unacceptable")}function wf(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){xf(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&F(e,"duplicated mapping key");let s=t.tag.addPair(t.value,n,r);s&&F(e,s),t.overridable?.delete(n)}function gn(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=t,r.hasValue=!0;else if(r.kind==="sequence"){Ei(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&F(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,wf(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===yf}function yn(e,t,n,r,i){if(t.anchorStart!==$e){let s={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),s),s}return null}function Af(e,t){let n={...kn,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let r=n.events[n.eventIndex++];switch(n.position=vf(r),r.type){case $.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let i of r.directives)i.kind==="tag"&&(n.tagHandlers[i.handle]=i.prefix);n.frames.push({kind:"document",position:n.position,value:void 0,hasValue:!1});break;case $.SCALAR:{let{value:i,tag:s}=bf(n,r);yn(n,r,i,s,!0),gn(n,i,s);break}case $.SEQUENCE:{let i=ui(n,r,"tag:yaml.org,2002:seq"),s=n.schema.lookupSequenceTag(i);s||F(n,`unknown sequence tag !<${i}>`);let o=s.create(i),a=yn(n,r,o,s,s.carrierIsResult);n.frames.push({kind:"sequence",position:n.position,value:o,tag:s,anchor:a,index:0});break}case $.MAPPING:{let i=ui(n,r,"tag:yaml.org,2002:map"),s=n.schema.lookupMappingTag(i);s||F(n,`unknown mapping tag !<${i}>`);let o=s.create(i),a=yn(n,r,o,s,s.carrierIsResult);n.frames.push({kind:"mapping",position:n.position,value:o,tag:s,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case $.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&F(n,`aliases exceeded maxAliases (${n.maxAliases})`);let i=n.source.slice(r.anchorStart,r.anchorEnd),s=n.anchors.get(i);s||F(n,`unidentified alias "${i}"`),s.isValueFinal||F(n,`recursive alias "${i}" is not supported for tag ${s.tag.tagName} because it uses finalize()`),gn(n,s.value,s.tag);break}case $.POP:{let i=n.frames.pop();if(i.kind==="mapping"&&i.hasKey&&(n.position=i.keyPosition,F(n,"incomplete mapping pair in event stream")),i.kind==="document")n.documents.push(i.value);else{let s=i.tag.carrierIsResult?i.value:Ii(n,i.position,i.tag,i.value);i.anchor&&(i.anchor.value=s,i.anchor.isValueFinal=!0),gn(n,s,i.tag)}break}}}return n.documents}var I=-1,Ni=Object.prototype.hasOwnProperty,Pe=1,Ti=2,ki=3,St=4,Sf=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,If=/[,\[\]{}]/,$i=/^(?:!|!!|![0-9A-Za-z-]+!)$/,wn=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,Oi=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Ef=new RegExp(`^(?:${wn})*$`),Nf=new RegExp(`^(?:${Oi})+$`),Tf=new RegExp(`^(?:!(?:${wn})*|${Oi}(?:${wn})*)$`),$n={filename:"",maxDepth:100};function kf(e,t,n){e.events.push({type:$.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function Ci(e,t,n,r,i,s,o){e.events.push({type:$.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:s,style:o})}function Li(e,t,n,r,i,s,o){e.events.push({type:$.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:s,style:o})}function di(e,t){e.events.splice(t.eventsLength,0,{type:$.MAPPING,start:t.position,anchorStart:I,anchorEnd:I,tagStart:I,tagEnd:I,style:ue.FLOW})}function De(e,t,n,r,i,s,o,a,c=K.CLIP,f=-1,p=!1){e.events.push({type:$.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:s,tagEnd:o,style:a,chomping:c,indent:f,fast:p})}function $f(e,t,n){e.events.push({type:$.ALIAS,anchorStart:t,anchorEnd:n})}function Oe(e){e.events.push({type:$.POP})}function Y(e){De(e,I,I,I,I,I,I,A.PLAIN)}function mi(){return{anchorStart:I,anchorEnd:I,tagStart:I,tagEnd:I}}function Ce(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function Le(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function x(e,t){_e.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function P(e){return e===10||e===13}function je(e){return e===9||e===32}function X(e){return je(e)||P(e)}function se(e){return e===0||X(e)}function ge(e){return e===44||e===91||e===93||e===123||e===125}function Of(e){return e>=48&&e<=57?e-48:-1}function Cf(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function Lf(e){return e===120?2:e===117?4:e===85?8:0}function Pf(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function It(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function M(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||X(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;je(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!P(r)&&r!==0);if(!P(r))break;for(It(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function Re(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let r=e.input.charCodeAt(t+3);return r===0||X(r)}return!1}function Pi(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function On(e){if(e.position!==e.lineStart)return!1;if(Re(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=Ce(e);Pi(e),M(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&Re(e));return Le(e,t),r}function hi(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!P(t);)t=e.input.charCodeAt(++e.position)}function Ri(e,t,n){let r=Sf.exec(e.input.slice(t,n));r!==null&&(e.position=t+r.index+r[0].length-1,x(e,"the stream contains non-printable characters"))}function Rf(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==I&&x(e,"duplication of a tag property");let r=e.position,i=!1,s=!1,o="!",a=e.input.charCodeAt(++e.position);a===60?(i=!0,a=e.input.charCodeAt(++e.position)):a===33&&(s=!0,o="!!",a=e.input.charCodeAt(++e.position));let c=e.position,f;if(i){for(;a!==0&&a!==62;)a=e.input.charCodeAt(++e.position);a!==62&&x(e,"unexpected end of the stream within a verbatim tag"),f=e.input.slice(c,e.position),e.position++}else{for(;a!==0&&!X(a)&&!(n&&ge(a));)a===33&&(s?x(e,"tag suffix cannot contain exclamation marks"):(o=e.input.slice(c-1,e.position+1),$i.test(o)||x(e,"named tag handle cannot contain such characters"),s=!0,c=e.position+1)),a=e.input.charCodeAt(++e.position);f=e.input.slice(c,e.position),If.test(f)&&x(e,"tag suffix cannot contain flow indicator characters")}return f&&!(i?Ef.test(f):Nf.test(f))&&x(e,`tag name cannot contain such characters: ${f}`),!i&&o!=="!"&&o!=="!!"&&!Ni.call(e.tagHandlers,o)&&x(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function Ff(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==I&&x(e,"duplication of an anchor property"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!X(e.input.charCodeAt(e.position))&&!ge(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&x(e,"name of an anchor node must contain at least one character"),t.anchorStart=n,t.anchorEnd=e.position,!0}function Df(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==I||t.tagStart!==I)&&x(e,"alias node should not have any properties"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!X(e.input.charCodeAt(e.position))&&!ge(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&x(e,"name of an alias node must contain at least one character"),$f(e,n,e.position),!0}function An(e,t){M(e,!1),e.lineIndent<t&&x(e,"deficient indentation")}function jf(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let s=e.input.charCodeAt(e.position);if(s===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let o=e.position;return e.position++,De(e,r,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,A.SINGLE_QUOTED,K.CLIP,-1,i),!0}P(s)?(i=!1,An(e,t)):e.position===e.lineStart&&Re(e)?x(e,"unexpected end of the document within a single quoted scalar"):s!==9&&s<32?x(e,"expected valid JSON character"):e.position++}x(e,"unexpected end of the stream within a single quoted scalar")}function Mf(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let s=e.input.charCodeAt(e.position);if(s===34){let o=e.position;return e.position++,De(e,r,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,A.DOUBLE_QUOTED,K.CLIP,-1,i),!0}if(s===92){i=!1;let o=e.input.charCodeAt(++e.position);if(P(o))An(e,t);else if(Pf(o))e.position++;else{let a=Lf(o);for(a===0&&x(e,"unknown escape sequence");a-- >0;)e.position++,Cf(e.input.charCodeAt(e.position))<0&&x(e,"expected hexadecimal character");e.position++}}else P(s)?(i=!1,An(e,t)):e.position===e.lineStart&&Re(e)?x(e,"unexpected end of the document within a double quoted scalar"):s!==9&&s<32?x(e,"expected valid JSON character"):e.position++}x(e,"unexpected end of the stream within a double quoted scalar")}function Bf(e,t,n){let r=e.input.charCodeAt(e.position),i=K.CLIP,s=-1,o=!1;if(r!==124&&r!==62)return!1;let a=r===124?A.LITERAL_BLOCK:A.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let u=e.input.charCodeAt(e.position),d=Of(u);if(u===43||u===45)i!==K.CLIP&&x(e,"repeat of a chomping mode identifier"),i=u===43?K.KEEP:K.STRIP,e.position++;else if(d>=0)d===0&&x(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),o&&x(e,"repeat of an indentation width identifier"),s=t+d-1,o=!0,e.position++;else break}let c=!1;for(;je(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&hi(e),P(e.input.charCodeAt(e.position))?It(e):e.input.charCodeAt(e.position)!==0&&x(e,"a line break is expected");let f=o?s:-1,p=0,l=e.position,m=e.position;for(;e.input.charCodeAt(e.position)!==0;){let u=e.position,d=0;for(;e.input.charCodeAt(u+d)===32;)d++;let _=e.input.charCodeAt(u+d);if(_===0){f>=0?d>f&&(m=u+d):d>0&&(m=u+d);break}if(On(e))break;if(!o&&f===-1&&P(_)&&(p=Math.max(p,d)),!o&&f===-1&&!P(_)&&(_===9&&d<t&&(e.position=u+d,x(e,"tab characters must not be used in indentation")),d>=t&&d<p&&(e.position=u+d,x(e,"bad indentation of a mapping entry"))),f===-1&&_!==0&&!P(_)&&d<t){e.lineIndent=d,e.position=u+d;break}!o&&_!==0&&!P(_)&&f===-1&&(f=d);let h=f===-1?t+1:f;if(_!==0&&!P(_)&&d<h){e.lineIndent=d,e.position=u+d;break}hi(e),m=e.position,P(e.input.charCodeAt(e.position))&&(It(e),m=e.position)}return Ri(e,l,m),De(e,l,m,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,a,i,f),!0}function Yf(e,t){let n=e.input.charCodeAt(e.position),r=t===Pe;if(n===0||X(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||ge(n))return!1;if(n===63||n===45){let i=e.input.charCodeAt(e.position+1);if(se(i)||r&&ge(i))return!1}return!0}function Vf(e,t,n,r){if(!Yf(e,n))return!1;let i=e.position,s=e.position,o=e.input.charCodeAt(e.position),a=n===Pe,c=!1;for(;o!==0&&!On(e);){if(o===58){let f=e.input.charCodeAt(e.position+1);if(se(f)||a&&ge(f))break}else if(o===35){if(X(e.input.charCodeAt(e.position-1)))break}else{if(a&&ge(o))break;if(P(o)){let f=e.position,p=e.line,l=e.lineStart,m=e.lineIndent;if(M(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=f,e.line=p,e.lineStart=l,e.lineIndent=m;break}}je(o)||(s=e.position+1),o=e.input.charCodeAt(++e.position)}return s===i?!1:(Ri(e,i,s),De(e,i,s,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,A.PLAIN,K.CLIP,-1,!c),!0)}function nt(e,t){let n=e.line;M(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&x(e,"deficient indentation")}function Uf(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,s=e.position,o=!0;if(r!==91&&r!==123)return!1;let a=i?125:93;for(i?Li(e,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ue.FLOW):Ci(e,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ue.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){nt(e,t);let c=e.input.charCodeAt(e.position);if(c===a)return e.position++,Oe(e),!0;o?c===44&&x(e,"expected the node content, but found ','"):x(e,"missed comma between flow collection entries");let f=!1,p=!1;c===63&&X(e.input.charCodeAt(e.position+1))&&(f=p=!0,e.position+=1,nt(e,t));let l=e.line,m=Ce(e),u=Fe(e,t,Pe,!1,!0);nt(e,t),c=e.input.charCodeAt(e.position),(i||p||e.line===l)&&c===58?(f=!0,e.position++,nt(e,t),i||di(e,m),u||Y(e),Fe(e,t,Pe,!1,!0)||Y(e),nt(e,t),i||Oe(e)):i&&f?(u||Y(e),Y(e)):i?Y(e):f&&(di(e,m),u||Y(e),Y(e),Oe(e)),c=e.input.charCodeAt(e.position),c===44?(o=!0,e.position++):o=!1}x(e,"unexpected end of the stream within a flow collection")}function _i(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!se(e.input.charCodeAt(e.position+1)))return!1;for(Ci(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,ue.BLOCK);e.input.charCodeAt(e.position)===45&&se(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,x(e,"tab characters must not be used in indentation"));let r=e.line;e.position++;let i=M(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&se(e.input.charCodeAt(e.position+1))&&x(e,"bad indentation of a sequence entry"),i&&e.lineIndent<=t?Y(e):Fe(e,t,ki,!1,!0),M(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&x(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&se(e.input.charCodeAt(e.position+1))&&x(e,"bad indentation of a sequence entry")}return Oe(e),!0}function vn(e,t,n,r){let i=!1,s=!1,o=!1,a=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,x(e,"tab characters must not be used in indentation"));let f=e.input.charCodeAt(e.position+1),p=e.line;if((c===63||c===58)&&se(f))o||(Li(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,ue.BLOCK),o=!0),c===63?(i&&Y(e),s=!0,i=!0):(i||(Y(e),s=!0),i=!1),e.position+=1,a=!0;else{i&&(Y(e),i=!1);let l=Ce(e);if(!Fe(e,n,Ti,!1,!0))break;if(e.line===p){for(c=e.input.charCodeAt(e.position);je(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),se(c)||x(e,"a whitespace character is expected after the key-value separator within a block mapping"),o||(e.events.splice(l.eventsLength,0,{type:$.MAPPING,start:l.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:ue.BLOCK}),o=!0),s=!0,i=!1,a=!1;else if(s)x(e,"expected ':' after a mapping key");else return r.anchorStart!==I||r.tagStart!==I?(Le(e,l),!1):!0}else if(s)x(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==I||r.tagStart!==I?(Le(e,l),!1):!0}if(Fe(e,t,St,!0,a)&&(a=!1),i||a&&(Y(e),a=!1),M(e,!0),c=e.input.charCodeAt(e.position),(e.line===p||e.lineIndent>t)&&c!==0)x(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return s?(i&&Y(e),o&&Oe(e),!0):!1}function Fe(e,t,n,r,i,s=!0){e.depth>=e.maxDepth&&x(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,a=!1,c=!1,f=null,p=mi(),l=n===St||n===ki,m=l,u=l;if(r&&M(e,!0)&&(a=!0,e.lineIndent>t?o=1:e.lineIndent===t?o=0:o=-1),o===1)for(;;){let d=e.input.charCodeAt(e.position),_=Ce(e);if(a&&o!==1&&(d===33||d===38))break;if(a&&u&&(p.tagStart!==I||p.anchorStart!==I)&&(d===33||d===38)){let h=Ce(e),g=t+1;if(vn(e,e.position-e.lineStart,g,p)&&e.events[h.eventsLength]?.type===$.MAPPING)return e.depth--,!0;Le(e,h)}if(a&&(d===33&&p.tagStart!==I||d===38&&p.anchorStart!==I)||!Rf(e,p,n===Pe)&&!Ff(e,p))break;f===null&&(f=_),M(e,!0)?(a=!0,m=u,e.lineIndent>t?o=1:e.lineIndent===t?o=0:o=-1):m=!1}if(m&&(m=a||i),o===1||n===St){let d=n===Pe||n===Ti?t:t+1,_=e.position-e.lineStart;if(o===1)if(m&&(_i(e,_,p)||vn(e,_,d,p))||Uf(e,d,p))c=!0;else{let h=e.input.charCodeAt(e.position);if(f!==null&&s&&u&&!m&&h!==124&&h!==62){let g=Ce(e),y=f.position-f.lineStart;Le(e,f),vn(e,y,d,mi())&&e.events[g.eventsLength]?.type===$.MAPPING?c=!0:Le(e,g)}!c&&(l&&Bf(e,d,p)||jf(e,d,p)||Mf(e,d,p)||Df(e,p)||Vf(e,d,n,p))&&(c=!0)}else o===0&&(c=m&&_i(e,_,p))}return l=l&&!c,!c&&(p.anchorStart!==I||p.tagStart!==I||l)&&(De(e,I,I,p.anchorStart,p.anchorEnd,p.tagStart,p.tagEnd,A.PLAIN),c=!0),e.depth--,c||p.anchorStart!==I||p.tagStart!==I}function Gf(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!X(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&x(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!P(e.input.charCodeAt(e.position));){for(;je(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||P(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let i=e.position;for(;e.input.charCodeAt(e.position)!==0&&!X(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(i,e.position))}if(P(e.input.charCodeAt(e.position))&&It(e),n==="YAML"){e.directives.some(s=>s.kind==="yaml")&&x(e,"duplication of %YAML directive"),r.length!==1&&x(e,"YAML directive accepts exactly one argument");let i=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);i===null&&x(e,"ill-formed argument of the YAML directive"),parseInt(i[1],10)!==1&&x(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(n==="TAG"){r.length!==2&&x(e,"TAG directive accepts exactly two arguments");let[i,s]=r;$i.test(i)||x(e,"ill-formed tag handle (first argument) of the TAG directive"),Ni.call(e.tagHandlers,i)&&x(e,`there is a previously declared suffix for "${i}" tag handle`),Tf.test(s)||x(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[i]=s,e.directives.push({kind:"tag",handle:i,prefix:s})}return!0}function qf(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(M(e,!0);Gf(e);)t=!0,M(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&se(e.input.charCodeAt(e.position+3))){n=!0;let a=e.line;e.position+=3,M(e,!0),i=e.line>a}else t&&x(e,"directives end mark is expected");let s=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&Re(e)){e.position+=3,M(e,!0);return}if(kf(e,n,!1),Fe(e,e.lineIndent-1,St,!1,i,i)||Y(e),M(e,!0),e.position===e.lineStart&&Re(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let a=e.line;e.position+=3,M(e,!0),e.line===a&&e.position<e.length&&x(e,"end of the stream or a document separator is expected")}let o=e.events[s];o?.type===$.DOCUMENT&&(o.explicitEnd=r),Oe(e),!r&&e.position<e.length&&!On(e)&&x(e,"end of the stream or a document separator is expected")}function Kf(e,t){let n=e.length,r={...$n,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf("\0");for(i!==-1&&_e.throwAt(e,i,"null byte is not allowed in input",r.filename);r.position<r.length&&(Pi(r),M(r,!0),!(r.position>=r.length));){let s=r.position;qf(r),r.position===s&&x(r,"can not read a document")}return r.events}var Wf={...$n,...kn};function zf(e,t={}){let n={...Wf,...t},r=String(e),i=Object.keys($n),s=Object.keys(kn);return Af(Kf(r,si(n,i)),{...si(n,s),source:r})}function pe(e,t){let n=zf(e,t);if(n.length===0)throw new _e("expected a document, but the input is empty");if(n.length===1)return n[0];throw new _e("expected a single document in the stream, but found more")}function kt(e,t){return(e&1<<t)!==0}var gi={applyQuoteFlowKeysOption:Hf,doubleQuoteForInvisibles:Xf,doubleQuoteWhitespaceOnly:Qf,applyForceQuotesOption:Jf,tryLongOrMultilineAsBlock:Zf,quoteInvalidPlain:eu,fallbackToDoubleQuoted:tu};function Fi(e){return e.presenterOptions.quoteStyle==="single"&&kt(e.allowedStylesMask,A.SINGLE_QUOTED)?A.SINGLE_QUOTED:A.DOUBLE_QUOTED}function Hf(e){e.presenterOptions.quoteFlowKeys&&(!e.isKey||!e.flowOnly||e.style!==A.PLAIN||(e.style=A.DOUBLE_QUOTED))}function Xf(e){e.style===A.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=A.DOUBLE_QUOTED)}function Qf(e){e.style===A.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=A.DOUBLE_QUOTED)}function Jf(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==A.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?A.DOUBLE_QUOTED:Fi(e)))}function Zf(e){if(e.style!==A.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!kt(e.allowedStylesMask,A.LITERAL_BLOCK)){n&&(e.style=A.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=A.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),s=0,o=!1;for(;s<=t.length;){let a=t.length,c=t.indexOf(`
`,s);c!==-1&&(a=c);let f=t.slice(s,a);if(f.length>i&&f[0]!==" "&&/ [^ \t]/.test(f)&&(o=!0),c===-1)break;s=c+1}o?e.style=A.FOLDED_BLOCK:n&&(e.style=A.LITERAL_BLOCK)}function eu(e){e.style===A.PLAIN&&!kt(e.allowedStylesMask,A.PLAIN)&&(e.style=Fi(e))}function tu(e){kt(e.allowedStylesMask,e.style)||(e.style=A.DOUBLE_QUOTED)}var nu="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",ru="[\\n\\r]",iu="\\uFEFF",Cn="[ \\t]",Di=`(?:(?!(?:${ru}|${iu}))${nu})`,$t=`(?:(?!${Cn})${Di})`,ji="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",Mi="[-?:,\\[\\]{}#&*!|>'\"%@`]",su="[,\\[\\]{}]",Sn=$t,In=`(?:(?!${su})${$t})`,ou=`(?:(?:(?!${Mi})${$t})|[?:-](?=${Sn}))`,au=`(?:(?:(?!${Mi})${$t})|[?:-](?=${In}))`,Bi=`(?:(?:(?![:#])${Sn})|:(?=${Sn}))#*`,Yi=`(?:(?:(?![:#])${In})|:(?=${In}))#*`,Vi=`(?:${Cn}*${Bi})*`,Ui=`(?:${Cn}*${Yi})*`,Gi=`${ou}#*${Vi}`,qi=`${au}#*${Ui}`,cu=Gi,fu=qi,uu=`\\n+${Bi}${Vi}`,pu=`\\n+${Yi}${Ui}`,lu=`${Gi}(?:${uu})*`,du=`${qi}(?:${pu})*`,um=new RegExp(`^(?:${lu})$`,"u"),pm=new RegExp(`^(?:${du})$`,"u"),lm=new RegExp(`^(?:${cu})$`,"u"),dm=new RegExp(`^(?:${fu})$`,"u"),mm=new RegExp(`^(?:${ji})*$`,"u"),hm=new RegExp(`^(?:${ji}|\\n)*$`,"u"),_m=new RegExp(`^(?:${Di}|\\n)*$`,"u");var mu={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(gi).map(e=>Reflect.get(gi,e)),tagBeforeAnchor:!1};var gm={...mu,schema:sf,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};var ym=$.DOCUMENT,vm=$.SEQUENCE,bm=$.MAPPING,xm=$.SCALAR,wm=$.ALIAS,Am=$.POP,Sm=A.PLAIN,Im=A.SINGLE_QUOTED,Em=A.DOUBLE_QUOTED,Nm=A.LITERAL_BLOCK,Tm=A.FOLDED_BLOCK,km=ue.BLOCK,$m=ue.FLOW,Om=K.CLIP,Cm=K.STRIP,Lm=K.KEEP;var Ki={bgp:`# BGP default settings and attributes
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
`,gateway:`transform_after: [ vlan, vrf, ospf, isis ]
config_after: [ vlan, vrf ]
id: -2
protocol: anycast
anycast:
  mac: 0200.cafe.00ff
  unicast: true
vrrp:
  group: 1
no_propagate: [ id, protocol ]
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
`,mpls:`# MPLS label distribution settings
transform_after: [ ospf, isis, bgp ]
config_after: [ ospf, isis, bgp ]
attributes:
  global:
    ldp: bool
  node:
    ldp: bool
  interface:
    ldp: bool
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
`};var Wi=["attributes","extra_attributes","features","hooks","requires","supported_on","no_propagate","config_after","transform_after","warnings","_top"],hu=["vlan","vrf","vxlan","ospf","isis","bgp","evpn","mpls","gateway"],Ln;function Pn(){if(Ln)return Ln;let e={};for(let t of hu){let n=Ki[t];if(!n)continue;let r=pe(n)??{};e[t]=r}return Ln=e,e}function Me(e){return Pn()[e]}function _u(e){if(!e)return[...Wi];let t=e.no_propagate,n=[];Array.isArray(t)?n=t.map(String):t&&typeof t=="object"&&(n=Object.keys(t));for(let r of Object.keys(e))r.includes("no_propagate")&&r!=="no_propagate"&&n.push(r);return[...Wi,...n]}function zi(e){if(!e)return{};let t={...e};for(let n of _u(e))delete t[n];return t}function Rn(e){let n=Me(e)?.requires;return Array.isArray(n)?n.map(String):[]}function Fn(e){let n=Me(e)?.transform_after;return Array.isArray(n)?n.map(String):[]}function Hi(e){let n=Me(e)?.config_after;return Array.isArray(n)?n.map(String):[]}function Xi(e){let t=Me(e)?.attributes,n=t&&typeof t=="object"?t.node_copy:void 0;return Array.isArray(n)?n.map(String):[]}function Qi(){let e=Pn(),t={};for(let[n,r]of Object.entries(e))t[n]={...r};return t}var Dn={addressing:`#
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
  linkid: id
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
  linkid: id

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
  ansible: _v_option
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
  _keytype: { type: device, include_templates: true }

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

_clab_stage:                     # Containerlab stage
  wait-for:
    type: list
    _subtype: { node: node_id, stage: str }
  exec: list
`,const:`# Constants
#
---
routing_protocols: [ bgp, connected, eigrp, isis, ospf, ripv2, static ]
vrf_igp_protocols: [ connected, ospf, isis, ripv2 ]
multi_provider: [ libvirt, clab ]
ifname:
  neighbors: 5
  maxlength: 255
MAX_NODE_ID: 150
doc_url_prefix: https://netlab.tools/
`,hints:`# Error message hints
---
evpn:
  irb_group: >
    All VLANs that are part of a VRF using asymmetric IRB have to be present on all nodes
    using that VRF. The easiest way to achieve that is to create a group with all
    participating nodes and list VLANs in the 'vlans' attribute of that group
  node_attr: |
    evpn.bundle and evpn.transit_vni attributes can be used only in global VRF definition
  asn: >
    You could use the global 'bgp.as' parameter to specify the AS to use in EVPN
    route targets. 'bgp.as' specified on individual nodes or groups will not work. You
    can also specify the global AS used by EVPN in 'vrf.as' parameter if you use
    VRFs, or in 'evpn.as' parameter if you use EVPN in bridging-only scenarios.
  ebgp_vlan: >
    In most scenarios, you don't need EBGP sessions between PE-devices across an
    EVPN-controlled VLAN. See https://netlab.tools/module/evpn/#evpn-rp for details.

report:
  source: >
    A report can be specified in a file with .j2 suffix within 'reports' subdirectory in
    package-, system-, user- or current directory. You can also specify a report in a
    defaults.outputs.report setting.

junos:
  single_lb: >
    Junos devices cannot have more than one loopback interface per routing instance

vlan:
  mixed_fwd_check: >
    You can disable this error with "defaults.vlan.warnings.mixed_fwd_check: False", but then
    you might get the same IP prefix assigned to multiple segments of the routed VLAN.
  trunk_attr: >
    You should not use layer-3 attributes on VLAN trunks. Specify them in global- or node
    'vlans' dictionary. See https://netlab.tools/module/vlan/#vlan-interface-parameters for details.

vrf:
  inactive: >
    A globally-defined VRF is not used on a node unless that node is attached to a VRF link,
    or has the VRF listed in the node 'vrfs' dictionary and uses VRF loopbacks.

cli:
  recreate:
    netlab transforms lab topology into device- and platform data and stores the results in
    a snapshot file that is used by most netlab commands. Changes to source files (including
    lab topology or defaults) are not automatically reflected in the snapshot file.
    Use 'netlab create' or 'netlab up' to create a new snapshot file.
  interrupt:
    Use 'netlab status' command to display the status of your lab and 'netlab
    down --cleanup' command to clean it up. You might have to use the '--force'
    option of the 'netlab down' command.

routing:
  policy:
    match_af:
      A routing policy 'match.prefix' condition can match a single address
      family. Use 'match.af' parameter to specify the address family you want to
      match.
  host_gw:
    Hosts attached to routers need a shared gateway or a gateway of last resort.
    In both cases, at least one adjacent router needs a real (not unnumbered/LLA)
    IP address.

validation:
  nodes:
    A test that uses 'show', 'exec', 'ansible' or 'plugin' action must specify the nodes on
    which that action will be executed.
  valid:
    A test that includes the 'valid' check must generate some output to check. That
    output can be generated with 'show','exec','suzieq', or 'ansible' action.
  show:
    The 'show' action should return structured data that is then validated with the
    'valid' check. If you want to execute a command on the device without checking
    the results, use the 'exec' action.

libvirt:
  capture: |
    Change the link type to Linux bridge with 'type: lan' link attribute or see
    https://netlab.tools/labs/libvirt/#libvirt-capture for other options.

nodes:
  unmanaged_device:
    Netlab uses the node device type for unmanaged nodes to figure out what
    features the node supports. If you're using a device that is not supported
    by netlab, set the device type to 'none'.

support:
  best-effort:
    While a core contributor might still work on the platform, we don't run integration tests
  minimal:
    Don't expect too much (particularly new functionality)
  obsolete:
    These platforms are still part of the netlab package because the storage prices keep falling
`,ports:`#
# Forwarded ports definition
#
ssh: 22
http: 80
https: 443
netconf: 830
# gnmi: 57400         # Not used anywhere
`,warnings:`---
duplicate_address: True
`};function gu(e){let t=Dn[e];if(!t)return{};let n=pe(t);return!n||typeof n!="object"||Array.isArray(n)?{}:n}function yu(){let e={};for(let t of Object.keys(Dn))e[t]=gu(t);return e}function jn(){return{device:"frr",provider:"clab",...yu(),...Qi()}}function Mn(e){let t=pe(e);if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Topology must be a YAML/JSON object");return ke(t)}function Bn(e,t={}){let n=Mn(e);return rt(n,t)}function rt(e,t={}){dn(e);let n=E(jn(),t.defaults??{}),r=e.defaults??{};e.defaults=E(n,r),e.provider||(e.provider="clab"),e.name||(e.name=t.name??"topology");let i=e.defaults.addressing??{};return e.addressing=E(i,e.addressing??{}),e}function Yn(e,t={}){let n=vu.readFileSync(e,"utf8");return Bn(n,t)}function Ct(e){let t=e?.attributes;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Ji(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.keys(e)}function Vn(e){return Array.isArray(e)?e.map(String):[]}function Un(e){let t=Ct(e),n=Ji(t.link),r=Ji(t.link_internal),i=new Set(Vn(t.link_no_propagate)),s=new Set([...n,...r]);for(let o of i)s.delete(o);return s}function Gn(e){return new Set(Vn(Ct(e).link_module_no_propagate))}function qn(e){return new Set(Vn(Ct(e).pool_no_copy))}import dt from"node:path";import{fileURLToPath as Ol}from"node:url";function Zi(e,t){if(!e.includes(":"))return{statementName:null,moduleName:null};let[n,r]=e.split(":",2);if(!n||!r)return{statementName:null,moduleName:null};let i=t[n];return i?i.findStatement(r)?{statementName:r,moduleName:n}:{statementName:null,moduleName:null}:{statementName:null,moduleName:null}}var bu=class extends Error{constructor(e){super(e),this.name="YangError"}},V=class extends SyntaxError{messageText;line_num;line;context_lines;filename;constructor(e,t={}){let{line_num:n,line:r,context_lines:i=[],filename:s}=t,o=[];s&&o.push(`${s}:`),n&&o.push(`${n}:`),o.push(e);let a=o.join(" ");if(i.length>0){a+=`
`;for(let[c,f]of i)a+=`${c===n?">>> ":"    "}${String(c).padStart(4," ")} | ${f}
`;n&&r&&(a+=`     ${" ".repeat(String(n).length+3)}${"^".repeat(Math.max(1,r.trim().length))}`)}super(a),this.name="YangSyntaxError",this.messageText=e,this.line_num=n,this.line=r,this.context_lines=i,this.filename=s}formatHeadline(){let e=[];return this.filename&&e.push(`${this.filename}:`),this.line_num!==void 0&&e.push(`${this.line_num}:`),e.push(this.messageText),e.join(" ")}toString(){return this.formatHeadline()}},T=class extends bu{constructor(e){super(e),this.name="YangSemanticError"}},Wn=class extends T{target_path;constructor(e){super(`Refine target path matches no node in the used grouping: '${e}'`),this.name="YangRefineTargetNotFoundError",this.target_path=e}},zn=class extends T{prefix_chain;repeated;constructor(e,t){let n=[...e,t].join(" -> ");super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${n}). Restructure groupings to break the cycle.`),this.name="YangCircularUsesError",this.prefix_chain=[...e],this.repeated=t}},re=class extends Error{messageText;position;expression;constructor(e,t={}){let{position:n,expression:r,context_before:i=10,context_after:s=10}=t;if(r!==void 0&&n!==void 0){let o=Math.max(0,n-i),a=Math.min(r.length,n+s),c=r.slice(o,a),f=n-o,p=[e,`
Expression: ${c}`,`           ${" ".repeat(f)}^`];n<r.length?p.push(`Position: ${n} (character: ${JSON.stringify(r[n])})`):p.push(`Position: ${n} (end of expression)`),super(p.join(`
`))}else super(e);this.name="XPathSyntaxError",this.messageText=e,this.position=n,this.expression=r}toString(){return this.messageText}},xu=new Set(["{","}",";",":","=","+","/"]);function wu(e){return e?e.split(`
`).map(t=>t.replace(/\r$/,"")):[]}function Au(e){return e==="STRING"?"string":e==="INTEGER"||e==="DOTTED_NUMBER"?"number":xu.has(e)?"symbol":"identifier"}var Kn=new Set(["{","}",";",":","=","+","/","STRING","IDENTIFIER","INTEGER","DOTTED_NUMBER"]);function es(e,t,n,r){return{type:e,value:t,line_num:n,char_pos:r,kind:Au(e),line:n,column:r+1}}var ts=class{token_list;tokens;positions;filename;index;source;diagnostic_lines;constructor(e,t,n){this.token_list=e,this.tokens=e.map(r=>r.value),this.positions=e.map(r=>[r.line_num,r.char_pos]),this.source=t,this.filename=n,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){return this.token_list[this.index+e]?.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error("Unexpected end of input");let t=this.tokens[this.index];if(e!==void 0&&t!==e)throw this._make_error(`Expected '${e}', got '${t}'`);return this.index+=1,t}consume_if(e){return this.peek()===e?(this.consume(),!0):!1}peek_type(){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");return this.token_list[this.index].type}peek_type_at(e=0){return this.token_list[this.index+e]?.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");let t=this.token_list[this.index];if(typeof e=="string"&&!Kn.has(e)){if(t.type!=="IDENTIFIER"||t.value!==e)throw this._make_error(`Expected '${e}', got '${t.value}'`)}else if(t.type!==e)throw this._make_error(`Expected ${e}, got ${t.type} ('${t.value}')`);return this.index+=1,t.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;let t=this.token_list[this.index];if(typeof e=="string"&&!Kn.has(e)){if(t.type!=="IDENTIFIER"||t.value!==e)return!1}else if(t.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");let t=this.token_list[this.index];for(let n of e)if(typeof n=="string"){if(Kn.has(n)){if(t.type===n)return this.index+=1,[t.value,n]}else if(t.type==="IDENTIFIER"&&t.value===n)return this.index+=1,[t.value,n]}else if(t.type===n)return this.index+=1,[t.value,n];throw this._make_error(`Expected one of (${e.join(", ")}), got ${t.type} ('${t.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||(this.diagnostic_lines=wu(this.source)),this.diagnostic_lines}_make_error(e,t=3){let[n]=this.position(),r=this.diagnostic_lines_once(),i=[],s=Math.max(1,n-t),o=Math.min(r.length,n+t);for(let c=s;c<=o;c+=1)c<=r.length&&i.push([c,r[c-1]]);let a=n<=r.length?r[n-1]:"";return new V(e,{line_num:n,line:a,context_lines:i,filename:this.filename})}},ns=class rs{module;current_parent;source_dir;constructor(t){this.module=t.module,this.current_parent=t.current_parent,this.source_dir=t.source_dir}push_parent(t){return new rs({module:this.module,current_parent:t,source_dir:this.source_dir})}},Lt={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-9223372036854776e3,9223372036854776e3],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,18446744073709552e3]},Xm=new Set(Object.keys(Lt));var st=class{patterns;length;range;fraction_digits;enums;bits;types;constructor(e={}){Object.assign(this,e)}};function Su(e,t){let n=typeof e.error_message=="string"&&e.error_message.trim().length>0?e.error_message:t,r=typeof e.error_app_tag=="string"?e.error_app_tag.trim():"";return r.length>0?`${n} (error-app-tag: ${r})`:n}function Iu(e){let t=(n,r)=>{let i=n.trim().toLowerCase();if(i==="min")return Number.NEGATIVE_INFINITY;if(i==="max")return Number.POSITIVE_INFINITY;let s=Number(i);return Number.isNaN(s)?r==="min"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:s};return e.split("|").map(n=>n.trim()).filter(Boolean).map(n=>{let[r,i]=n.split("..").map(s=>s.trim());if(!i){let s=t(r,"min");return{min:s,max:s}}return{min:t(r,"min"),max:t(i,"max")}})}function it(e,t){for(let n of Iu(t))if(e>=n.min&&e<=n.max)return!0;return!1}function is(e){return typeof e=="number"&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e=="string"&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function Eu(e){return typeof e=="number"&&Number.isFinite(e)?e:typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function Nu(e,t,n){let r=Lt[e];if(!r)return[!1,`Unsupported integer type '${e}'`];let i=is(t);if(i===null)return[!1,`Expected ${e}`];if(n)return it(i,n)?[!0,null]:[!1,`Integer ${i} does not match ${n}`];let[s,o]=r;return i<s?[!1,`Value ${i} is less than minimum ${s}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function Tu(e,t){if(typeof e!="string")return[!1,"Expected base64 string"];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!==0)return[!1,"Expected valid base64 string"];try{let n=Buffer.from(e,"base64");if(t&&!it(n.length,t))return[!1,`Binary length ${n.length} does not match ${t}`]}catch{return[!1,"Expected valid base64 string"]}return[!0,null]}function ku(e,t){if(typeof e!="string")return[!1,"Bits values must be string tokens"];let n=new Set(t.map(i=>i.name));if(e.trim()==="")return[!0,null];let r=new Set;for(let i of e.trim().split(/\s+/)){if(!n.has(i))return[!1,`Unknown bit token '${i}'`];if(r.has(i))return[!1,`Duplicate bit token '${i}'`];r.add(i)}return[!0,null]}var ss=class{validate(e,t,n){let r=n??new st,i=t.trim();if(i==="union"){for(let s of r.types??[]){let o=typeof s.name=="string"?s.name:"string",[a]=this.validate(e,o,new st(s));if(a)return[!0,null]}return[!1,"Value does not match any union member type"]}if(i==="enumeration")return typeof e!="string"?[!1,"Expected enumeration value (string)"]:r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null];if(i==="string"){if(typeof e!="string")return[!1,"Expected string"];if(r.length&&!it(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];let s=Array.isArray(r.patterns)?r.patterns:[];if(s.length>0)for(let o of s){if(typeof o?.pattern!="string"||o.pattern.length===0)continue;let a=new RegExp(`^(?:${o.pattern})$`).test(e),c=o.invert_match===!0;if(!c&&!a||c&&a){let f=c?`String matches forbidden pattern ${o.pattern} (invert-match)`:`String does not match pattern ${o.pattern}`;return[!1,Su(o,f)]}}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i==="boolean")return typeof e=="boolean"?[!0,null]:e==="true"||e==="false"?[!0,null]:[!1,"Expected boolean"];if(i==="empty")return e===null?[!0,null]:[!1,"Expected empty (null)"];if(i in Lt)return Nu(i,e,r.range);if(i==="binary")return Tu(e,r.length);if(i==="bits")return ku(e,r.bits??[]);if(i==="decimal64"||i==="number"){let s=Eu(e);if(s===null)return[!1,"Expected number"];if(r.range&&!it(s,r.range))return[!1,`Number ${s} does not match ${r.range}`];if(typeof r.fraction_digits=="number"){let o=`${s}`.split(".")[1]?.length??0;if(o>r.fraction_digits)return[!1,`Too many fraction digits (${o} > ${r.fraction_digits})`]}return[!0,null]}if(i==="int64"||i==="integer"){let s=is(e);return s===null?[!1,"Expected integer"]:r.range&&!it(s,r.range)?[!1,`Integer ${s} does not match ${r.range}`]:[!0,null]}return typeof e=="string"?[!0,null]:[!1,`Unsupported type '${i}'`]}};import{existsSync as Cu,readFileSync as Lu,readdirSync as Pu}from"fs";import{dirname as Ru,resolve as Pt}from"path";function Ue(e){return e.prefix?`${e.prefix}:${e.name}`:e.name}function We(e){let t=e.indexOf(":");return t<=0||t>=e.length-1?{name:e}:{prefix:e.slice(0,t),name:e.slice(t+1)}}function pt(e){let t=e.replace(/^["']|["']$/g,"");if(!t.startsWith("/"))throw new Error(`Schema path must be absolute, got '${e}'`);let n=t.slice(1).split("/").map(r=>r.trim()).filter(r=>r.length>0);if(n.length===0)throw new Error(`Empty schema path: '${e}'`);return n.map(r=>{let i=We(r);if(!i.prefix)throw new Error(`Invalid schema path segment '${r}': expected 'prefix:identifier'`);return i})}function Cs(e){if(typeof e=="string"&&e.length>0)return We(e);if(e&&typeof e=="object"&&!Array.isArray(e)){let t=e;if(typeof t.name=="string"&&t.name.length>0)return typeof t.prefix=="string"&&t.prefix.length>0?{prefix:t.prefix,name:t.name}:{name:t.name}}}function $u(e){if(!(!e||typeof e!="object"))return new Ls(e)}var Ls=class Ps{data;constructor(t){this.data=t}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(n=>new Ps(n))}findStatement(t){return this.statements.find(n=>n.name===t)}},Qt=class{data;source;constructor(e,t){this.data=e,this.source=t}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){let e=this.data.organization;return typeof e=="string"&&e.length>0?e:void 0}get contact(){let e=this.data.contact;return typeof e=="string"&&e.length>0?e:void 0}get description(){let e=this.data.description;return typeof e=="string"?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){let e=this.data.identities;return!e||typeof e!="object"?{}:e}get statements(){let e=this.data.statements;return Array.isArray(e)?e.map($u).filter(t=>!!t):[]}findStatement(e){return this.statements.find(t=>t.name===e)}};function Ou(e,t){let n=Object.keys(e).filter(r=>!t.has(r)).sort();if(n.length>0)throw new TypeError(`unexpected keyword arguments: ${JSON.stringify(n)}`)}function Rs(e){Ou(e,new Set(["modules","mode"]));let t=e.mode===void 0?"complete":e.mode,n=new Set;for(let r=0;r<e.modules.length;r+=1){let s=e.modules[r].name;if(!s)throw new TypeError(`modules[${r}] must have a module name`);if(n.has(s))throw new TypeError(`duplicate module name '${s}' in modules`);n.add(s)}return{modules:[...e.modules],mode:t}}var Xn="module",Fs="yang-version",Ds="namespace",Ye="prefix",js="organization",Ms="contact",Ge="description",Bs="revision",ir="typedef",Ys="identity",Yt="base",Vt="type",Fu="enumeration",os="path",as="require-instance",cs="enum",sr="status",Vs="bit",fs="position",us="pattern",ps="modifier",ls="length",ds="fraction-digits",ms="range",Us="grouping",ze="uses",Gs="refine",be="container",Ae="list",Se="leaf",Ie="leaf-list",Ee="anydata",Ne="anyxml",xe="choice",Ut="case",qe="must",de="when",Qn="presence",hs="key",_s="min-elements",gs="max-elements",ys="ordered-by",Gt="mandatory",Jn="config",jt="default",qt="error-message",vs="error-app-tag",G="true",le="false",qs="import",Ks="include",Ws="revision-date",zs="feature",me="if-feature",Hs="augment",Xs="submodule",bs="belongs-to",ft="reference",xs="argument",ws="yin-element",Du="deviation",Qs="extension",Js="rpc",ju="action",Jt="notification",ot="input",at="output",Mu=["<=",">=","!=","==","//","=","<",">","+","-","*","/"];function Bu(e){let t=[],n=0,r=(i,s,o=n)=>{t.push({kind:i,value:s,position:o})};for(;n<e.length;){let i=e[n];if(/\s/.test(i)){n+=1;continue}if(i==='"'||i==="'"){let a=i,c=n;n+=1;let f="";for(;n<e.length;){let p=e[n];if(p===a&&e[n-1]!=="\\"){n+=1;break}f+=p,n+=1}r("string",f,c);continue}if(/\d/.test(i)||i==="-"&&/\d/.test(e[n+1]??"")){let a=n,c="";for(e[n]==="-"&&(c+="-",n+=1);n<e.length&&/\d/.test(e[n]);)c+=e[n],n+=1;if(e[n]==="."&&/\d/.test(e[n+1]??""))for(c+=".",n+=1;n<e.length&&/\d/.test(e[n]);)c+=e[n],n+=1;r("number",c,a);continue}if(/[A-Za-z_]/.test(i)){let a=n,c="";for(;n<e.length&&/[A-Za-z0-9_:\-]/.test(e[n]);)c+=e[n],n+=1;r("identifier",c,a);continue}if(i==="/"){e[n+1]==="/"?(r("operator","//"),n+=2):(r("slash","/"),n+=1);continue}if(i==="."){e[n+1]==="."?(r("dotdot",".."),n+=2):(r("dot","."),n+=1);continue}if(i==="("){r("paren_open","("),n+=1;continue}if(i===")"){r("paren_close",")"),n+=1;continue}if(i==="["){r("bracket_open","["),n+=1;continue}if(i==="]"){r("bracket_close","]"),n+=1;continue}if(i===","){r("comma",","),n+=1;continue}let s=e.slice(n),o=Mu.find(a=>s.startsWith(a));if(o){r("operator",o),n+=o.length;continue}n+=1}return r("eof","",n),t}var Yu=new Set(["=","!=","<",">","<=",">="]),Vu=new Set(["+","-"]),Zs=class{constructor(e){this.expression=e,this.tokens=Bu(e)}expression;tokens;position=0;parse(){if(this.current().kind==="eof")throw new re("Empty expression",{expression:this.expression,position:0});let e=this.parseExpression(),t=this.current();if(t.kind!=="eof")throw new re(`Unexpected token: ${t.value||t.kind}`,{expression:this.expression,position:t.position});return e}current(){return this.tokens[this.position]??{kind:"eof",value:"",position:this.expression.length}}consume(e){let t=this.current();if(e&&t.kind!==e)throw new re(`Expected ${e}, got ${t.kind} (${t.value})`,{expression:this.expression,position:t.position});return this.position+=1,t}isKeyword(e){let t=this.current();return t.kind==="identifier"&&t.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword("or");){this.consume();let t=this.parseLogicalAnd();e={kind:"binary",operator:"or",left:e,right:t}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword("and");){this.consume();let t=this.parseComparison();e={kind:"binary",operator:"and",left:e,right:t}}return e}parseComparison(){let e=this.parseAdditive(),t=this.current();if(t.kind==="operator"&&Yu.has(t.value)){let n=this.consume("operator").value,r=this.parseAdditive();e={kind:"binary",operator:n,left:e,right:r}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){let t=this.current();if(t.kind==="operator"&&Vu.has(t.value)){let n=this.consume("operator").value,r=this.parseMultiplicative();e={kind:"binary",operator:n,left:e,right:r}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){let t=this.current();if(t.kind==="slash"){this.consume("slash");let n=this.parsePath(!1);e={kind:"binary",operator:"/",left:e,right:n}}else if(t.kind==="operator"&&t.value==="*"){this.consume("operator");let n=this.parseUnary();e={kind:"binary",operator:"*",left:e,right:n}}else return e}}parseUnary(){let e=this.current();if(e.kind==="operator"&&e.value==="-"){this.consume("operator");let t=this.parseUnary();return{kind:"binary",operator:"-",left:{kind:"literal",value:0},right:t}}if(e.kind==="operator"&&e.value==="+")return this.consume("operator"),this.parseUnary();if(this.isKeyword("not")){this.consume(),this.consume("paren_open");let t=this.parseExpression();return this.consume("paren_close"),{kind:"function",name:"not",args:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.current();if(e.kind==="string")return{kind:"literal",value:this.consume("string").value};if(e.kind==="number"){let t=this.consume("number").value,n=t.includes(".")?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(n))throw new re(`Invalid number: ${t}`,{expression:this.expression,position:e.position});return{kind:"literal",value:n}}if(e.kind==="identifier")return this.isKeyword("true")?(this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!0}):this.isKeyword("false")?(this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!1}):this.tokens[this.position+1]?.kind==="paren_open"?this.parseFunctionCall():this.parsePath(!1);if(e.kind==="dot")return this.consume("dot"),this.current().kind==="paren_open"?(this.consume("paren_open"),this.consume("paren_close"),{kind:"function",name:"current",args:[]}):this.parsePath(!1,".");if(e.kind==="dotdot")return this.parsePath(!1);if(e.kind==="slash")return this.consume("slash"),this.parsePath(!0);if(e.kind==="paren_open"){if(this.consume("paren_open"),this.current().kind==="string"||this.current().kind==="number"){let n=this.parsePrimary();if(n.kind==="literal"&&this.current().kind==="comma"){let r=[n.value];for(;this.current().kind==="comma";){this.consume("comma");let i=this.parsePrimary();if(i.kind!=="literal")throw new re("Value list may only contain literals",{expression:this.expression,position:this.current().position});r.push(i.value)}return this.consume("paren_close"),{kind:"literal",value:r}}if(this.current().kind==="paren_close")return this.consume("paren_close"),n}let t=this.parseExpression();return this.consume("paren_close"),t}throw new re(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){let e=this.consume("identifier").value;this.consume("paren_open");let t=[];if(this.current().kind!=="paren_close")for(t.push(this.parseExpression());this.current().kind==="comma";)this.consume("comma"),t.push(this.parseExpression());return this.consume("paren_close"),{kind:"function",name:e,args:t}}parsePath(e,t,n=!0){let r=[],i=o=>{let a={step:o};for(r.push(a);this.current().kind==="bracket_open";){if(!n)throw new re("Predicates are not allowed in this path context",{expression:this.expression,position:this.current().position});this.consume("bracket_open");let c=this.parseExpression();a.predicate===void 0?a.predicate=c:a.predicate={kind:"binary",operator:"and",left:a.predicate,right:c},this.consume("bracket_close")}return this.current().kind==="slash"?(this.consume("slash"),!0):!1};for(t!==void 0&&i(t);this.current().kind==="dot"||this.current().kind==="dotdot"||this.current().kind==="identifier";){let o=this.consume().value;if(!i(o))break}return{kind:"path",segments:r,isAbsolute:e}}parsePathExpression(e={}){let t=e.allowPredicate??!0;if(this.current().kind==="eof")throw new re("Empty path expression",{expression:this.expression,position:0});let n=!1;this.current().kind==="slash"&&(n=!0,this.consume("slash"));let r=this.parsePath(n,void 0,t),i=this.current();if(i.kind!=="eof")throw new re(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function Mt(e){return new Zs(e).parse()}function eo(e,t={}){return new Zs(e).parsePathExpression(t)}var Uu=class{statements;constructor(e=[]){this.statements=e}find_statement(e){return this.statements.find(t=>t.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){let e=[];for(let t of this.statements)e.push(...this.collectLeaves(t));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof ro)return[e];if(e instanceof lt||e instanceof no){let t=[];for(let n of e.statements)t.push(...this.collectLeaves(n));return t}return[]}},He=class extends Uu{keyword;name;description;reference;constructor(e={}){super(e.statements??[]),this.keyword=e.keyword??"",this.name=e.name??"",this.description=e.description??"",this.reference=e.reference??""}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(e){return this.name?new Set([this.name]):new Set}childNames(e){return this.child_names(e)}},Gu=class extends He{must_statements;constructor(e={}){super(e),this.must_statements=e.must_statements??[]}},W=class extends He{when;if_features;config;constructor(e={}){super(e),this.when=e.when,this.if_features=e.if_features??[],this.config=e.config}get_schema_node(){return this.name||void 0}},to=class extends He{type;default;constructor(e={}){super(e),this.keyword="typedef",this.type=e.type,this.default=e.default}get_schema_node(){return this.name||void 0}},As=class extends He{bases;if_features;constructor(e={}){super(e),this.keyword="identity",this.bases=e.bases??[],this.if_features=e.if_features??[]}get_schema_node(){}},qu=class{name;position;constructor(e={}){this.name=e.name??"",this.position=e.position}},Ku=class{pattern;invert_match;error_message;error_app_tag;constructor(e={}){this.pattern=e.pattern??"",this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},Wu=class{name;prefix;patterns;length;range;fraction_digits;enums;bits;types;path;require_instance;identityref_bases;constructor(e={}){this.name=e.name??"",this.prefix=e.prefix,this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},lt=class extends W{must_statements;presence;constructor(e={}){super(e),this.keyword="container",this.must_statements=e.must_statements??[],this.presence=e.presence}},zu=class extends lt{constructor(e={}){super(e),this.keyword="notification"}},Hu=class extends lt{constructor(e={}){super({name:"input",...e}),this.keyword="input"}},Xu=class extends lt{constructor(e={}){super({name:"output",...e}),this.keyword="output"}},Qu=class extends W{must_statements;constructor(e={}){super(e),this.keyword="rpc",this.must_statements=e.must_statements??[]}},no=class extends W{must_statements;key;min_elements;max_elements;constructor(e={}){super(e),this.keyword="list",this.must_statements=e.must_statements??[],this.key=e.key,this.min_elements=e.min_elements,this.max_elements=e.max_elements}},ro=class extends W{must_statements;type;mandatory;default;constructor(e={}){super(e),this.keyword="leaf",this.must_statements=e.must_statements??[],this.type=e.type,this.mandatory=e.mandatory??!1,this.default=e.default}},io=class extends W{must_statements;type;min_elements;max_elements;defaults;constructor(e={}){super(e),this.keyword="leaf-list",this.must_statements=e.must_statements??[],this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.defaults=e.defaults??[]}},Ju=class extends W{must_statements;mandatory;constructor(e={}){super(e),this.keyword="anydata",this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},Zu=class extends W{must_statements;mandatory;constructor(e={}){super(e),this.keyword="anyxml",this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},Zn=class extends He{argument_name;argument_yin_element;apply_callback;constructor(e={}){super(e),this.keyword="extension",this.argument_name=e.argument_name??"",this.argument_yin_element=e.argument_yin_element,this.apply_callback=e.apply_callback}apply(e,t){return this.apply_callback?this.apply_callback(e,t.context_module):e}get_schema_node(){}},ep=class extends W{must_statements;prefix;resolved_module;resolved_extension;argument;constructor(e){if(super(e),this.keyword="extension-invocation",this.must_statements=e.must_statements??[],this.prefix=e.prefix,this.resolved_module=e.resolved_module,this.resolved_extension=e.resolved_extension,this.argument=e.argument,!this.prefix)throw new Error("extension invocation requires a non-empty prefix");if(!this.resolved_module)throw new Error("extension invocation requires resolved_module");if(!this.resolved_extension)throw new Error("extension invocation requires resolved_extension")}get_schema_node(){}},so=class{expression;description;ast;constructor(e){this.expression=e.expression,this.description=e.description??"",this.expression&&(this.ast=Mt(this.expression))}},Ss=class extends so{error_message;constructor(e){super(e),this.error_message=e.error_message??""}},tp=class extends so{evaluate_with_parent_context;constructor(e){super(e),this.evaluate_with_parent_context=e.evaluate_with_parent_context??!1}get condition(){return this.expression}},np=class extends He{constructor(e={}){super(e),this.keyword="grouping"}},or=class extends W{grouping_name;grouping_prefix;refines;augmentations;constructor(e={}){super(e),this.keyword="uses",this.grouping_name=e.grouping_name??"",this.grouping_prefix=e.grouping_prefix,this.refines=e.refines??[],this.augmentations=e.augmentations??[]}grouping_qname(){return this.grouping_prefix?`${this.grouping_prefix}:${this.grouping_name}`:this.grouping_name}get_schema_node(){}},rp=class extends W{augment_path;augment_path_segments;constructor(e={}){super(e),this.keyword="augment",this.augment_path=e.augment_path??"",this.augment_path_segments=e.augment_path_segments??[]}get_schema_node(){}},Bt=class extends Gu{target_path;type;min_elements;max_elements;refined_defaults;refined_mandatory;refined_config;if_features;constructor(e={}){super(e),this.keyword="refine",this.target_path=e.target_path??"",this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.refined_defaults=e.refined_defaults??[],this.refined_mandatory=e.refined_mandatory,this.refined_config=e.refined_config,this.if_features=e.if_features??[]}},Rt=class extends W{mandatory;cases;constructor(e={}){super(e),this.keyword="choice",this.mandatory=e.mandatory??!1,this.cases=e.cases??[]}child_names(e){for(let t of this.cases)if(t.statements.some(n=>n.name&&n.name in e))return new Set(t.statements.map(n=>n.name).filter(n=>!!n));return new Set}validate_case_unique_child_names(){let e=new Map;for(let t of this.cases)for(let n of t.statements){let r=n.get_schema_node();if(r){if(e.has(r)){let i=e.get(r);throw new T(`Choice '${this.name}': schema node '${r}' appears in case '${i}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}e.set(r,t.name)}}}},Is=class extends W{constructor(e={}){super(e),this.keyword="case"}child_names(e){return new Set(this.statements.map(t=>t.name).filter(t=>!!t))}},ip=class{constructor(e){this.parsers=e}parsers;parse_anydata(e,t){e.consume(Ee);let n=e.consume(),r=new Ju({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},sp=class{constructor(e){this.parsers=e}parsers;parse_anyxml(e,t){e.consume(Ne);let n=e.consume(),r=new Zu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}};function Kt(e,t){let n={...t};return n[Ge]??=(r,i)=>{e.parse_description(r,i)},n[ft]??=(r,i)=>{e.parse_reference(r,i)},n[sr]??=(r,i)=>{e.parse_status_ignored(r,i)},n}function Wt(e,t){let n=Kt(e,t);return n[Jn]??=(r,i)=>{e.parse_config(r,i)},n[sr]??=(r,i)=>{e.parse_status_ignored(r,i)},n}var op=class{constructor(e){this.parsers=e,this.augmentBodyDispatch=Wt(this.parsers,{[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[ze]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[Se]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[Ie]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[be]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[Ae]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[xe]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[Ut]:(t,n)=>{this.parsers.choice_parser.parse_case(t,n)},[Ee]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[Ne]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[qe]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[Jt]:(t,n)=>{this.parsers.notification_parser.parse_notification(t,n)}})}parsers;augmentBodyDispatch;parse_augment(e,t){e.consume(Hs);let n=this.parsers.parse_string_concatenation(e),r=[];if(n.replace(/^["']|["']$/g,"").startsWith("/"))try{r=pt(n)}catch(a){throw new V(a instanceof Error?a.message:String(a))}let s=new rp({name:"augment",augment_path:n,augment_path_segments:r});if(e.consume_if_type("{")){let a=t.push_parent(s);for(;e.has_more()&&e.peek_type()!=="}";){let c=this.parsers.substatement_handler(e,this.augmentBodyDispatch);c?c(e,a):e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"?this.parsers.parse_prefixed_extension_statement_public(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,"augment")}e.consume_type("}")}let o=t.current_parent;return o instanceof or?o.augmentations.push(s):this.parsers.add_to_parent_or_module(t,s),e.consume_if_type(";"),s}},ap=class{constructor(e){this.parsers=e}parsers;parse_type_bit(e,t,n){e.consume(Vs);let r=e.consume(),i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===fs?(e.consume(fs),i=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")):this.parsers.parseStatement(e,t);e.consume_type("}")}n.bits.push(new qu({name:r,position:i})),e.consume_if_type(";")}finalize_bits_type(e){let t=-1;for(let n of e.bits)n.position===void 0&&(n.position=t+1),t=Math.max(t,n.position)}},cp=new Set([Se,Ie,be,Ae,Ee,Ne,xe]),fp=class{constructor(e){this.parsers=e,this.choiceSubstatementDispatch=Wt(this.parsers,{[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Ut]:(t,n)=>{this.parse_case(t,n)},[Gt]:(t,n)=>{this.parse_choice_mandatory(t,n)}}),this.caseSubstatementDispatch=Wt(this.parsers,{[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[ze]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[Se]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[be]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[Ae]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[Ie]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[Ee]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[Ne]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[xe]:(t,n)=>{this.parse_choice(t,n)}})}parsers;choiceSubstatementDispatch;caseSubstatementDispatch;parse_choice(e,t){e.consume(xe);let n=e.consume(),r=new Rt({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_choice_substatement(e,i,n);e.consume_type("}"),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_choice_substatement(e,t,n){let r=`choice '${n}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,t);return}let s=this.parsers.dispatch_key(e);if(typeof s=="string"&&cp.has(s)){this.parse_choice_implicit_case(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,t){let n=t.current_parent;n instanceof Rt||e.syntaxError("internal: implicit choice case outside choice body");let r=new Is({name:""}),i=t.push_parent(r),s=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);s||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),s(e,i),r.statements.length===0&&e.syntaxError("Expected a schema node in implicit choice case (RFC 7950 \xA77.9.2)");let o=r.statements[0],a=o.name||o.get_schema_node();a||e.syntaxError("Implicit choice case requires a named schema node (RFC 7950 \xA77.9.2)"),r.name=a,n.cases.push(r)}parse_case(e,t){e.consume(Ut);let n=e.consume(),r=new Is({name:n});if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_case_substatement(e,s,n);e.consume_type("}")}let i=t.current_parent;return i instanceof Rt?i.cases.push(r):this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_case_substatement(e,t,n){let r=`case '${n}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);if(i){i(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,t){e.consume(Gt);let[,n]=e.consume_oneof([G,le]),r=t.current_parent;r instanceof Rt&&(r.mandatory=n===G),e.consume_if_type(";")}},up=class{constructor(e){this.parsers=e,this.containerSubstatementDispatch=Wt(this.parsers,{[Qn]:(t,n)=>{this.parsers.parse_presence(t,n)},[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[qe]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[Se]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[be]:(t,n)=>{this.parse_container(t,n)},[Ae]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[Ie]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[ze]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[xe]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Ee]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[Ne]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[Jt]:(t,n)=>{this.parsers.notification_parser.parse_notification(t,n)}})}parsers;containerSubstatementDispatch;parseContainerSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`container '${n}'`)}parse_container(e,t){e.consume(be);let n=e.consume(),r=new lt({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseContainerSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},pp=class{constructor(e){this.parsers=e}parsers;parse_extension_stmt(e,t){e.consume(Qs);let n=e.consume_type("IDENTIFIER"),r=new Zn({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.dispatch_key(e)===xs?this.parse_extension_argument_stmt(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}return t.module.extensions[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_extension_argument_stmt(e,t){e.consume(xs);let n=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),r=t.current_parent;if(r instanceof Zn&&(r.argument_name=n),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)if(e.peek()===ws){e.consume(ws);let[,i]=e.consume_oneof([G,le]);r.argument_yin_element=i===G,e.consume_if_type(";")}else this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}},lp=class{constructor(e){this.parsers=e}parsers;parse_feature_stmt(e,t){e.consume(zs);let n=e.consume_type("IDENTIFIER");(t.module.features??=new Set).add(n);let r={if_features:[]};if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}if(r.if_features.length>0){let i=t.module,s=i.feature_if_features??={};s[n]=[...r.if_features]}e.consume_if_type(";")}parse_if_feature_stmt(e,t){e.consume(me);let n=this.parsers.parse_string_concatenation(e),r=t.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(n),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}},dp=class{constructor(e){this.parsers=e}parsers;parse_grouping(e,t){e.consume(Us);let n=e.consume(),r=new np({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}t.module.groupings[n]=r,e.consume_if_type(";")}},mp=class{constructor(e){this.parsers=e}parsers;parse_identity(e,t){e.consume(Ys);let n=e.consume_type("IDENTIFIER"),r=new As({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Yt?this.parse_identity_base(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}t.module.identities[n]=r,e.consume_if_type(";")}parse_identity_base(e,t){e.consume(Yt);let n=this.parsers.consume_identifier_ref(e),r=t.current_parent;r instanceof As&&r.bases.push(n),e.consume_if_type(";")}},hp=class{constructor(e){this.parsers=e}parsers;parse_leaf(e,t){e.consume(Se);let n=e.consume(),r=new ro({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},_p=class{constructor(e){this.parsers=e}parsers;parse_leaf_list(e,t){e.consume(Ie);let n=e.consume(),r=new io({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},gp=class{constructor(e){this.parsers=e}parsers;parse_list(e,t){e.consume(Ae);let n=e.consume(),r=new no({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},yp=class{constructor(e){this.parsers=e}parsers;parse_module(e,t){for(e.consume(Xn),t.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}parse_yang_version(e,t){e.consume(Fs);let[n]=e.consume_oneof(["IDENTIFIER","DOTTED_NUMBER"]);t.module.yang_version=n,e.consume_if_type(";")}parse_namespace(e,t){e.consume(Ds),t.module.namespace=e.consume_type("STRING"),e.consume_if_type(";")}parse_prefix(e,t){e.consume(Ye);let n=this.parsers.dispatch_key(e);t.module.prefix=n==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}parse_organization(e,t){e.consume(js),t.module.organization=e.consume_type("STRING"),e.consume_if_type(";")}parse_contact(e,t){e.consume(Ms),t.module.contact=e.consume_type("STRING"),e.consume_if_type(";")}parse_import_stmt(e,t){e.consume(qs);let n=e.consume_type("IDENTIFIER"),r,i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){let s=this.parsers.dispatch_key(e);if(s===Ye){e.consume(Ye),r=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";");continue}if(s===Ws){i=this.parsers.revision_parser.parse_revision_date_statement(e);continue}this.skip_nested_statement(e)}e.consume_type("}")}if(e.consume_if_type(";"),!r||r.trim().length===0)throw new T(`Import '${n}' is missing required prefix substatement`);this.parsers.register_import(t,n,r,i,e)}parse_include_stmt(e,t){if(e.consume(Ks),e.consume_type("IDENTIFIER"),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}parse_prefix_value_stmt(e){e.consume(Ye),e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}skip_nested_statement(e){let t=0;for(;e.has_more();){let n=this.parsers.dispatch_key(e);if(n==="{"){t+=1,e.consume_type("{");continue}if(n==="}"){if(t===0)return;t-=1,e.consume_type("}");continue}if(n===";"&&t===0){e.consume_type(";");return}e.consume()}}},vp=class{constructor(e){this.parsers=e}parsers;parse_notification(e,t){e.consume(Jt);let n=e.consume(),r=new zu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},bp=class{constructor(e){this.parsers=e,this.ioSubstatementDispatch=Kt(this.parsers,{[ir]:(t,n)=>{this.parsers.typedef_parser.parse_typedef(t,n)},[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[qe]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[Se]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[be]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[Ae]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[Ie]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[ze]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[xe]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Ee]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[Ne]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)}}),this.rpcSubstatementDispatch=Kt(this.parsers,{[de]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[qe]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[ot]:(t,n)=>{this.parse_input(t,n)},[at]:(t,n)=>{this.parse_output(t,n)},[me]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)}})}parsers;ioSubstatementDispatch;rpcSubstatementDispatch;parseIoSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`${n} block`)}parseIoBlock(e,t,n,r){if(e.consume(n),e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseIoSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_input(e,t){return this.parseIoBlock(e,t,ot,new Hu)}parse_output(e,t){return this.parseIoBlock(e,t,at,new Xu)}parseRpcSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${n}'`)}parse_rpc(e,t){e.consume(Js);let n=e.consume(),r=new Qu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseRpcSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},xp=class{constructor(e){this.parsers=e}parsers;parse_must(e,t){e.consume(qe);let n=this.parsers.parse_string_concatenation(e),r=new Ss({expression:n});if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===qt?this.parse_must_error_message(e,s):this.parsers.parseStatement(e,s);e.consume_type("}")}let i=t.current_parent;return Array.isArray(i?.must_statements)&&i.must_statements.push(r),e.consume_if_type(";"),r}parse_must_error_message(e,t){e.consume(qt);let n=t.current_parent;n instanceof Ss&&(n.error_message=e.consume_type("STRING")),e.consume_if_type(";")}},wp=class{constructor(e){this.parsers=e}parsers;parse_refine(e,t){e.consume(Gs);let n=[e.consume()];for(;e.has_more()&&e.peek_type()==="/";)e.consume_type("/"),n.push(e.consume());let r=n.join("/"),i=new Bt({name:"refine",target_path:r});if(e.consume_if_type("{")){let s=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}t.current_parent instanceof or&&t.current_parent.refines.push(i),e.consume_if_type(";")}},Ap=class{constructor(e){this.parsers=e}parsers;parse_revision(e,t){e.consume(Bs);let n="";if(e.peek_type()==="STRING")n=e.consume_type("STRING");else for(;e.has_more()&&!["{",";"].includes(e.peek_type());)n+=e.consume();let r={date:n,description:"",reference:""};if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Ge?(e.consume(Ge),r.description=e.consume_type("STRING"),e.consume_if_type(";")):e.peek()===ft?(e.consume(ft),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(";")):this.parsers.parseStatement(e,t);e.consume_type("}")}(t.module.revisions??=[]).push(r),e.consume_if_type(";")}parse_revision_date_statement(e){e.consume(Ws);let t="";if(e.peek_type()==="STRING")t=e.consume_type("STRING");else for(;e.has_more()&&e.peek_type()!==";";)t+=e.consume();return e.consume_if_type(";"),t}},Sp=class{constructor(e,t){this.parsers=e,this.module_parser=t}parsers;module_parser;parse_submodule(e,t){for(e.consume(Xs),t.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===bs?this.parse_belongs_to(e,t):this.parsers.parseStatement(e,t);e.consume_type("}")}parse_belongs_to(e,t){for(e.consume(bs),t.module.belongs_to_module=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Ye?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,t);e.consume_type("}"),e.consume_if_type(";")}},Ip=class{constructor(e){this.parsers=e}parsers;parse_type(e,t){e.consume(Vt);let n,r;if(e.peek_type()==="IDENTIFIER"){let o=this.parsers.consume_identifier_ref(e);n=o.prefix,r=o.name}else r=e.consume().trim();let i=new Wu({name:r,prefix:n});if(e.consume_if_type("{")){let o=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";){let a=this.parsers.dispatch_key(e);if(a===us)this.parse_type_pattern(e,o,i);else if(a===ls)this.parse_type_length(e,o,i);else if(a===ms)this.parse_type_range(e,o,i);else if(a===ds)this.parse_type_fraction_digits(e,o,i);else if(a===cs)this.parse_type_enum(e,o,i);else if(a===Vs)this.parsers.bits_parser.parse_type_bit(e,o,i);else if(a===os)this.parse_type_path(e,o,i);else if(a===as)this.parse_type_require_instance(e,o,i);else if(a===Yt)this.parse_type_base(e,o,i);else if(a===Vt){let c=this.parse_type(e,o);i.types.push(c)}else this.parsers.parseStatement(e,o)}e.consume_type("}"),i.name===Fu&&i.enums.length===0&&e.syntaxError("enumeration type must contain at least one enum statement")}let s=t.current_parent;return s&&"type"in s&&!s.type&&(s.type=i),e.consume_if_type(";"),i}parse_type_base(e,t,n){e.consume(Yt),n.identityref_bases.push(this.parsers.consume_identifier_ref(e)),e.consume_if_type(";")}parse_type_pattern(e,t,n){e.consume(us);let r=this.parsers.parse_string_concatenation(e),i=!1,s,o;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){let a=this.parsers.dispatch_key(e);a===qt?(e.consume(qt),s=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):a===vs?(e.consume(vs),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):a===ps?(e.consume(ps),i=e.consume()==="invert-match",e.consume_if_type(";")):this.parsers.parseStatement(e,t)}e.consume_type("}")}n.patterns.push(new Ku({pattern:r,invert_match:i,error_message:s,error_app_tag:o})),e.consume_if_type(";")}parse_type_length(e,t,n){e.consume(ls),n.length=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_range(e,t,n){e.consume(ms),n.range=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_fraction_digits(e,t,n){e.consume(ds),n.fraction_digits=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")}parse_type_enum(e,t,n){if(e.consume(cs),n.enums.push(e.consume()),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";")}parse_type_path(e,t,n){e.consume(os);let r=this.parsers.parse_string_argument(e);n.path=eo(r),e.consume_if_type(";")}parse_type_require_instance(e,t,n){e.consume(as);let[,r]=e.consume_oneof([G,le]);n.require_instance=r===G,e.consume_if_type(";")}},Ep=class{constructor(e){this.parsers=e,this.typedefBodyDispatch=Kt(this.parsers,{[Vt]:(t,n)=>{this.parsers.type_parser.parse_type(t,n)},[jt]:(t,n)=>{this.parsers.parse_typedef_default(t,n)}})}parsers;typedefBodyDispatch;parse_typedef(e,t){e.consume(ir);let n=e.consume_type("IDENTIFIER"),r=new to({name:n}),i=`typedef '${n}'`;if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){let o=this.parsers.substatement_handler(e,this.typedefBodyDispatch);o?o(e,s):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type("}")}return t.module.typedefs[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Np=class{constructor(e){this.parsers=e}parsers;parse_uses(e,t){e.consume(ze);let n,r;if(e.peek_type()==="IDENTIFIER"){let s=this.parsers.consume_identifier_ref(e);n=s.prefix,r=s.name}else r=e.consume().trim();let i=new or({name:"uses",grouping_name:r,grouping_prefix:n});if(e.consume_if_type("{")){let s=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,i),e.consume_if_type(";"),i}},Tp=class{constructor(e){this.parsers=e}parsers;parse_when(e,t){e.consume(de);let n=this.parsers.parse_string_concatenation(e),r=new tp({expression:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}t.current_parent instanceof W&&(t.current_parent.when=r),e.consume_if_type(";")}},oo=new Set([Du,ju]);function kp(e){let t=0;for(;e.has_more();){let n=e.peek_type();if(n==="{")t+=1,e.consume_type("{");else if(n==="}"){if(t-=1,e.consume_type("}"),t===0)return}else e.consume()}}function $p(e,{context:t}){let n=e.peek_token();if(!n||!oo.has(n.value))return;let r=n.value,[i,s]=e.position(),o=e.filename??"<string>";for(console.warn(`Ignoring unsupported YANG statement '${r}' (${t}) at ${o}:${i}:${s}`),e.consume();e.has_more();){let a=e.peek_type();if(a==="{"){kp(e);break}if(a===";"){e.consume_type(";");return}if(a==="}")return;e.consume()}e.consume_if_type(";")}function Op(e){let t=e.peek_token();return t!==void 0&&oo.has(t.value)}function Cp(e){e.consume(sr),e.peek_type()==="IDENTIFIER"&&e.consume_type("IDENTIFIER"),e.consume_if_type(";")}function Lp(e){if(typeof e.keyword=="string"&&e.keyword.trim().length>0)return e.keyword;throw new T("Internal error: cannot serialize AST statement without a keyword")}var Pp=class{importResolver;anydata_parser=new ip(this);anyxml_parser=new sp(this);augment_parser=new op(this);bits_parser=new ap(this);choice_parser=new fp(this);container_parser=new up(this);extension_parser=new pp(this);feature_parser=new lp(this);grouping_parser=new dp(this);identity_parser=new mp(this);leaf_parser=new hp(this);leaf_list_parser=new _p(this);list_parser=new gp(this);module_parser=new yp(this);notification_parser=new vp(this);rpc_parser=new bp(this);must_parser=new xp(this);refine_parser=new wp(this);revision_parser=new Ap(this);submodule_parser=new Sp(this,this.module_parser);type_parser=new Ip(this);typedef_parser=new Ep(this);uses_parser=new Np(this);when_parser=new Tp(this);statementKeywordHandlers={[Se]:(e,t)=>this.fromAst(this.leaf_parser.parse_leaf(e,t)),[Ie]:(e,t)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,t)),[be]:(e,t)=>this.fromAst(this.container_parser.parse_container(e,t)),[Ae]:(e,t)=>this.fromAst(this.list_parser.parse_list(e,t)),[Jt]:(e,t)=>this.fromAst(this.notification_parser.parse_notification(e,t)),[Js]:(e,t)=>this.fromAst(this.rpc_parser.parse_rpc(e,t)),[Ee]:(e,t)=>this.fromAst(this.anydata_parser.parse_anydata(e,t)),[Ne]:(e,t)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,t)),[xe]:(e,t)=>this.fromAst(this.choice_parser.parse_choice(e,t)),[Ut]:()=>{throw new V("'case' is only valid as a substatement of 'choice' (RFC 7950)")},[ot]:()=>{throw new V("'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[at]:()=>{throw new V("'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[ir]:(e,t)=>this.fromAst(this.typedef_parser.parse_typedef(e,t)),[Vt]:(e,t)=>this.fromType(this.type_parser.parse_type(e,t)),[ze]:(e,t)=>this.fromAst(this.uses_parser.parse_uses(e,t)),[Gs]:(e,t)=>(this.refine_parser.parse_refine(e,t),{__class__:"YangStatement",keyword:"refine",statements:[]}),[qe]:(e,t)=>this.fromMust(this.must_parser.parse_must(e,t)),[de]:(e,t)=>(this.when_parser.parse_when(e,t),{__class__:"YangStatement",keyword:"when",statements:[]}),[Qs]:(e,t)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,t)),[zs]:(e,t)=>(this.feature_parser.parse_feature_stmt(e,t),{__class__:"YangStatement",keyword:"feature",statements:[]}),[me]:(e,t)=>(this.feature_parser.parse_if_feature_stmt(e,t),{__class__:"YangStatement",keyword:"if-feature",statements:[]}),[Ys]:(e,t)=>(this.identity_parser.parse_identity(e,t),{__class__:"YangStatement",keyword:"identity",statements:[]}),[Us]:(e,t)=>(this.grouping_parser.parse_grouping(e,t),{__class__:"YangStatement",keyword:"grouping",statements:[]}),[Hs]:(e,t)=>this.fromAst(this.augment_parser.parse_augment(e,t)),[Bs]:(e,t)=>(this.revision_parser.parse_revision(e,t),{__class__:"YangStatement",keyword:"revision",statements:[]}),[Ge]:(e,t)=>({__class__:"YangStatement",keyword:"description",argument:this.parse_description(e,t),name:"description",statements:[]}),[Gt]:(e,t)=>(this.parse_leaf_mandatory(e,t),{__class__:"YangStatement",keyword:"mandatory",statements:[]}),[jt]:(e,t)=>(this.parse_leaf_default(e,t),{__class__:"YangStatement",keyword:"default",statements:[]}),[hs]:(e,t)=>(this.parse_list_key(e,t),{__class__:"YangStatement",keyword:"key",statements:[]}),[_s]:(e,t)=>(this.parse_min_elements(e,t),{__class__:"YangStatement",keyword:"min-elements",statements:[]}),[gs]:(e,t)=>(this.parse_max_elements(e,t),{__class__:"YangStatement",keyword:"max-elements",statements:[]}),[ys]:(e,t)=>(this.parse_ordered_by(e),{__class__:"YangStatement",keyword:"ordered-by",statements:[]}),[Qn]:(e,t)=>(this.parse_presence(e,t),{__class__:"YangStatement",keyword:"presence",statements:[]}),[ft]:(e,t)=>(this.parse_reference(e,t),{__class__:"YangStatement",keyword:"reference",statements:[]}),[Jn]:(e,t)=>(this.parse_config(e,t),{__class__:"YangStatement",keyword:"config",statements:[]})};constructor(e={}){this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()==="IDENTIFIER"?e.peek()??"":e.peek_type()}assertStatementStartAllowed(e,t,n){let r=t instanceof Set?t:new Set(t),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return;let s=n?` ${n}`:"",o=e.peek()??"<end>",a=[...r].map(c=>String(c)).sort().join(", ");throw new V(`Invalid statement starting with '${o}'${s}. Allowed here: ${a}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,t){let n=this.parseStatement(e,t);if(n.keyword!=="module")throw new T("Expected top-level 'module' statement");return n}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,t,n){n?.allowedStatementStarts&&this.assertStatementStartAllowed(e,n.allowedStatementStarts,n.restrictionContext);let r=this.dispatch_key(e);if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return this.parse_prefixed_extension_statement(e,t);let i=this.statementKeywordHandlers[r];return i?i(e,t):this.parse_statement_generic(e,t)}parse_statement_generic(e,t){let n=this.dispatch_key(e);if(n===Xn)return this.parse_top_level_module(e,t);if(n===Xs)return this.submodule_parser.parse_submodule(e,t),{__class__:"YangStatement",keyword:"submodule",statements:[]};if(n===Fs)return this.module_parser.parse_yang_version(e,t),{__class__:"YangStatement",keyword:"yang-version",argument:t.module.yang_version,name:"yang-version",statements:[]};if(n===Ds)return this.module_parser.parse_namespace(e,t),{__class__:"YangStatement",keyword:"namespace",argument:t.module.namespace,name:"namespace",statements:[]};if(n===Ye)return this.module_parser.parse_prefix(e,t),{__class__:"YangStatement",keyword:"prefix",argument:t.module.prefix,name:"prefix",statements:[]};if(n===js)return this.module_parser.parse_organization(e,t),{__class__:"YangStatement",keyword:"organization",statements:[]};if(n===Ms)return this.module_parser.parse_contact(e,t),{__class__:"YangStatement",keyword:"contact",statements:[]};if(n===qs)return this.module_parser.parse_import_stmt(e,t),{__class__:"YangStatement",keyword:"import",statements:[]};if(n===Ks)return this.module_parser.parse_include_stmt(e,t),{__class__:"YangStatement",keyword:"include",statements:[]};if(this.skip_unsupported_if_present(e,"generic"))return{__class__:"YangStatement",keyword:"unsupported",statements:[]};let r=e.peek();(r===ot||r===at)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let s=e.consume();e.peek_type()===":"&&(e.consume_type(":"),s=`${s}:${e.consume_type("IDENTIFIER")}`);let o=this.parse_argument(e),a=[];if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)a.push(this.parseStatement(e,t));e.consume_type("}"),e.consume_if_type(";")}else e.consume_if_type(";");let c={__class__:"YangStatement",keyword:s,name:o,argument:o,statements:a};return s==="type"&&(c.type=this.extract_type_shape(c)),c}parse_argument(e){let t=[];for(;e.has_more();){let n=e.peek_type();if(n===";"||n==="{")break;n==="STRING"?t.push(this.parse_string_concatenation(e)):n==="+"?e.consume_type("+"):t.push(e.consume())}return t.join("").trim()}parse_string_concatenation(e){let t=[e.consume_type("STRING")];for(;e.has_more()&&e.peek_type()==="+";)e.consume_type("+"),t.push(e.consume_type("STRING"));return t.join("")}parse_string_argument(e){return e.peek_type()==="STRING"?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,"")}substatement_handler(e,t){let n=this.dispatch_key(e);if(typeof n=="string")return t[n]}skip_unsupported_or_raise_unknown(e,t){let n=e.peek();if((n===ot||n===at)&&e.syntaxError(`'${n}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,t))return!0;let r=e.peek()??"<eof>";e.syntaxError(`Invalid or unknown statement '${r}' in ${t}`)}parse_prefixed_extension_statement_public(e,t){this.parse_prefixed_extension_statement(e,t)}consume_identifier_ref(e){let t=e.consume_type("IDENTIFIER").trim();return e.consume_if_type(":")?{prefix:t,name:e.consume_type("IDENTIFIER").trim()}:{name:t}}consume_qname_from_identifier(e){let t=this.consume_identifier_ref(e);return t.prefix?`${t.prefix}:${t.name}`:t.name}add_to_parent_or_module(e,t){let n=e.current_parent;if(n&&Array.isArray(n.statements)){n.statements.push(t);return}let r=e.module;Array.isArray(r.statements)&&r.statements.push(t)}skip_unsupported_if_present(e,t){return Op(e)?($p(e,{context:t}),!0):!1}parse_top_level_module(e,t){e.consume(Xn);let n=e.consume_type("IDENTIFIER");t.module.name=n,e.consume_type("{");let r=[];for(;e.has_more()&&e.peek_type()!=="}";)r.push(this.parseStatement(e,t));return e.consume_type("}"),{__class__:"YangStatement",keyword:"module",name:n,argument:n,statements:r}}fromAst(e){let t=Lp(e),n=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:"YangStatement",keyword:t,name:e.name,argument:e.name,statements:n};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);let i=e.config;if(typeof i=="boolean"&&(r.config=i),t==="leaf-list"){let f=e.defaults;Array.isArray(f)&&f.length>0&&(r.defaults=[...f])}e.key!==void 0&&(r.key=e.key);let s=e.min_elements;typeof s=="number"&&(r.min_elements=s);let o=e.max_elements;typeof o=="number"&&(r.max_elements=o),e.description&&(r.description=e.description);let a=e.reference;if(a&&(r.reference=a),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),t==="extension"&&(typeof e.argument_name=="string"&&(r.argument_name=e.argument_name),typeof e.argument_yin_element=="boolean"&&(r.argument_yin_element=e.argument_yin_element)),t==="augment"&&typeof e.augment_path=="string"){r.argument=e.augment_path,r.augment_path=e.augment_path;let f=e.augment_path_segments;Array.isArray(f)&&f.length>0&&(r.augment_path_segments=f.map(p=>p.prefix?{prefix:p.prefix,name:p.name}:{name:p.name}))}if(t==="extension-invocation"&&(r.keyword=e.name??"extension-invocation",r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=e.resolved_module?.name,r.resolved_extension_name=e.resolved_extension?.name),e.when&&typeof e.when.expression=="string"&&(r.when={expression:e.when.expression,description:e.when.description??"",evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(f=>this.fromMust(f))]),t==="uses"){let f=e;typeof f.grouping_name=="string"&&f.grouping_name.length>0&&(r.grouping_name=f.grouping_name,typeof f.grouping_prefix=="string"&&f.grouping_prefix.length>0&&(r.grouping_prefix=f.grouping_prefix),r.argument=f.grouping_qname()),Array.isArray(f.refines)&&f.refines.length>0&&(r.refines=f.refines.map(p=>this.serializeRefineStmt(p)))}let c=e.presence;return typeof c=="string"&&c.length>0&&(r.presence=c),r}serializeRefineStmt(e){let t={__class__:"YangStatement",keyword:"refine",name:"refine",argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements=="number"&&(t.min_elements=e.min_elements),typeof e.max_elements=="number"&&(t.max_elements=e.max_elements),typeof e.refined_mandatory=="boolean"&&(t.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(t.refined_defaults=[...e.refined_defaults]),typeof e.refined_config=="boolean"&&(t.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(t.if_features=[...e.if_features]),typeof e.description=="string"&&e.description.length>0&&(t.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(t.statements=e.must_statements.map(n=>this.fromMust(n))),t}serializeAstChildren(e){let t=[];for(let n of e)!n||typeof n!="object"||t.push(this.fromAst(n));return t}fromType(e){let t=Ue({name:e.name,prefix:e.prefix});return{__class__:"YangStatement",keyword:"type",name:e.name,argument:t,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:"YangStatement",keyword:"must",name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){let t={name:e.name,patterns:e.patterns.map(n=>({pattern:n.pattern,invert_match:n.invert_match,error_message:n.error_message,error_app_tag:n.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:e.identityref_bases.map(n=>n.prefix?{prefix:n.prefix,name:n.name}:{name:n.name}),enums:[...e.enums],bits:e.bits.map(n=>({name:n.name,position:n.position??0})),types:e.types.map(n=>this.fromTypeShape(n))};return e.prefix&&(t.prefix=e.prefix),t}extract_type_shape(e){let t=e.argument??"string",n={name:t};for(let r of e.statements??[]){if(r.keyword==="pattern"&&r.argument){let i=n.patterns??[];i.push({pattern:r.argument,invert_match:!1}),n.patterns=i}if(r.keyword==="length"&&r.argument&&(n.length=r.argument),r.keyword==="range"&&r.argument&&(n.range=r.argument),r.keyword==="fraction-digits"&&r.argument){let i=Number.parseInt(r.argument,10);Number.isNaN(i)||(n.fraction_digits=i)}if(r.keyword==="enum"&&r.argument&&(n.enums=[...n.enums??[],r.argument]),r.keyword==="bit"&&r.argument){let i=n.bits??[];i.push({name:r.argument,position:i.length===0?0:Math.max(...i.map(s=>s.position))+1}),n.bits=i}t==="union"&&r.keyword==="type"&&(n.types=[...n.types??[],this.extract_type_shape(r)])}return n}parse_description(e,t){e.consume(Ge);let n=e.consume_type("STRING");if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";");let r=t.current_parent;return r&&"description"in r&&(r.description=n),n}parse_optional_description(e,t){e.has_more()&&e.peek()===Ge&&this.parse_description(e,t)}parse_reference(e,t){e.consume(ft);let n=e.consume_type("STRING");e.consume_if_type(";");let r=t.current_parent;r&&typeof r=="object"&&"reference"in r&&(r.reference=n)}parse_reference_string_only(e,t){this.parse_reference(e,t)}parse_status_ignored(e,t){Cp(e)}parse_config(e,t){e.consume(Jn);let n=e.consume_oneof([G,le])[1],r=t.current_parent;r instanceof Bt?r.refined_config=n===G:r&&typeof r=="object"&&"config"in r&&(r.config=n===G),e.consume_if_type(";")}parse_typedef_default(e,t){e.consume(jt);let n=t.current_parent;n instanceof to&&(n.default=this.parse_default_value_tokens(e)),e.consume_if_type(";")}register_import(e,t,n,r,i){let s=e.module,o=String(s.prefix??"").replace(/^['"]|['"]$/g,"");if(n===o)throw new T(`Import prefix '${n}' must differ from this module's prefix`);let a=s.import_prefixes??{};if(s.import_prefixes=a,a[n])throw new T(`Duplicate import prefix '${n}'`);if(!this.importResolver)throw new T("Import resolution is not configured for this parser instance");a[n]=this.importResolver(t,n,r,e,i)}parse_ordered_by(e){e.consume(ys),e.consume(),e.consume_if_type(";")}parse_list_key(e,t){e.consume(hs);let[n]=e.consume_oneof(["STRING","IDENTIFIER"]),r=t.current_parent;r&&"key"in r&&(r.key=n),e.consume_if_type(";")}parse_min_elements(e,t){e.consume(_s);let n=Number.parseInt(e.consume_type("INTEGER"),10),r=t.current_parent;r&&"min_elements"in r&&(r.min_elements=n),e.consume_if_type(";")}parse_max_elements(e,t){e.consume(gs);let n=Number.parseInt(e.consume_type("INTEGER"),10),r=t.current_parent;r&&"max_elements"in r&&(r.max_elements=n),e.consume_if_type(";")}parse_leaf_mandatory(e,t){e.consume(Gt);let[,n]=e.consume_oneof([G,le]),r=t.current_parent;if(r instanceof Bt){r.refined_mandatory=n===G,e.consume_if_type(";");return}r&&typeof r=="object"&&"mandatory"in r&&(r.mandatory=n===G),e.consume_if_type(";")}parse_leaf_default(e,t){e.consume(jt);let n=this.parse_default_value_tokens(e),r=t.current_parent;r instanceof Bt?r.refined_defaults.push(n):r instanceof io?r.defaults.push(n):r&&typeof r=="object"&&"default"in r&&(r.default=n),e.consume_if_type(";")}parse_presence(e,t){e.consume(Qn);let n=t.current_parent,r=e.consume_type("STRING");n&&"presence"in n&&(n.presence=r),e.consume_if_type(";")}parse_default_value_tokens(e){let t=e.peek_type();if(t==="STRING")return e.consume_type("STRING");if(t==="INTEGER")return e.consume_type("INTEGER");if(t==="IDENTIFIER")return e.consume_type("IDENTIFIER");if(t===G)return e.consume(G),"true";if(t===le)return e.consume(le),"false";throw new T(`Expected default value, got ${t}`)}parse_prefixed_extension_statement(e,t){let n=e.consume_type("IDENTIFIER");e.consume_type(":");let r=e.consume_type("IDENTIFIER"),i=this.resolve_prefixed_module(t,n);if(!i)throw new T(`Unknown extension prefix '${n}' in invocation ${n}:${r}`);let s=this.resolve_extension_definition(i,r);if(!s)throw new T(`Unknown extension '${r}' in module '${i.name??""}' for invocation ${n}:${r}`);let o=this.consume_optional_extension_argument(e),a=new ep({name:`${n}:${r}`,prefix:n,resolved_module:i,resolved_extension:s,argument:o});if(e.consume_if_type("{")){let c=t.push_parent(a);for(;e.has_more()&&e.peek_type()!=="}";)this.parseStatement(e,c);e.consume_type("}")}return e.consume_if_type(";"),this.add_to_parent_or_module(t,a),this.fromAst(a)}consume_optional_extension_argument(e){if(!e.has_more())return;let t=e.peek_type();if(!(t==="{"||t===";")){if(t==="STRING")return this.parse_string_concatenation(e);if(t==="IDENTIFIER"||t==="INTEGER"||t==="DOTTED_NUMBER"||t===G||t===le)return e.consume()}}resolve_prefixed_module(e,t){let n=e.module,r=String(n.prefix??"").replace(/^['"]|['"]$/g,"");return t===r?n:n.import_prefixes?.[t]}resolve_extension_definition(e,t){let n=e.extensions?.[t];if(n)return n;let i=(Array.isArray(e.statements)?e.statements:[]).find(s=>s.keyword==="extension"&&s.name===t);if(i)return new Zn({name:t,argument_name:typeof i.argument_name=="string"?i.argument_name:"",argument_yin_element:typeof i.argument_yin_element=="boolean"?i.argument_yin_element:void 0})}};function Rp(e,t){if(t!=="'"&&t!=='"')throw new Error(`quote must be "'" or '"', got ${JSON.stringify(t)}`);let n=[],r=0,i=e.length;for(;r<i;){let s=e[r];if(s!=="\\"||r+1>=i){n.push(s),r+=1;continue}let o=e[r+1];if(o==="\\"){n.push("\\"),r+=2;continue}if(o==="n"){n.push(`
`),r+=2;continue}if(o==="t"){n.push("	"),r+=2;continue}if(t==='"'&&o==='"'){n.push('"'),r+=2;continue}if(t==="'"&&o==="'"){n.push("'"),r+=2;continue}if(o==="\r"||o===`
`){for(r+=2,o==="\r"&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===" "||e[r]==="	");)r+=1;continue}n.push("\\",o),r+=2}return n.join("")}var Fp=/[A-Za-z_]/,Dp=/[A-Za-z0-9_.-]/,jp=class{tokenize(e,t){let n=[],r=0,i=e.length,s=1,o=0,a=()=>{r<i&&e[r]===`
`&&(s+=1,o=r+1),r+=1},c=(f,p,l,m,u)=>{let d=l-u;n.push(es(f,p,m,d))};for(;r<i;){if(/\s/.test(e[r])){a();continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="*"){for(a(),a();r<i;){if(r+1<i&&e[r]==="*"&&e[r+1]==="/"){a(),a();break}a()}continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="/"){for(a(),a();r<i&&e[r]!==`
`;)a();continue}let f=e[r];if(f==='"'||f==="'"){let p=f,l=r,m=s,u=o;a();let d=r;for(;r<i&&e[r]!==p;)e[r]==="\\"&&r+1<i&&a(),a();c("STRING",Rp(e.slice(d,r),p),l,m,u),a();continue}if(f==="-"&&r+1<i&&/\d/.test(e[r+1])){let p=r,l=s,m=o;a();let u=r;for(;r<i&&/\d/.test(e[r]);)a();c("INTEGER",`-${e.slice(u,r)}`,p,l,m);continue}if(/\d/.test(f)){let p=r,l=s,m=o,u=r;for(;r<i&&/\d/.test(e[r]);)a();if(r<i&&e[r]==="."&&r+1<i&&/\d/.test(e[r+1])){for(a();r<i&&/\d/.test(e[r]);)a();c("DOTTED_NUMBER",e.slice(u,r),p,l,m)}else c("INTEGER",e.slice(u,r),p,l,m);continue}if(Fp.test(f)){let p=r,l=s,m=o,u=r;for(a();r<i&&Dp.test(e[r]);)a();let d=e.slice(u,r);c("IDENTIFIER",d,p,l,m);continue}f==="{"?(c("{",f,r,s,o),a()):f==="}"?(c("}",f,r,s,o),a()):f===";"?(c(";",f,r,s,o),a()):f===":"?(c(":",f,r,s,o),a()):f==="="?(c("=",f,r,s,o),a()):f==="+"?(c("+",f,r,s,o),a()):(f==="/"&&c("/",f,r,s,o),a())}return new ts(n,e,t)}},ct="ietf-yang-structure-ext:structure-index";function ae(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ut(e){return Array.isArray(e)?e:[]}function Mp(e){return JSON.parse(JSON.stringify(e))}function Bp(e,t){if(t.length===0)return;let n=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...t,...n]}function Yp(e,t){if(!t||typeof t.expression!="string")return;let n=t.expression,r=ae(e.when)?e.when:void 0,i=typeof r?.expression=="string"?r.expression:void 0;if(i){let s=typeof r?.description=="string"?r.description:"";e.when={expression:`(${n}) and (${i})`,description:s,evaluate_with_parent_context:!0};return}e.when={expression:n,description:typeof t.description=="string"?t.description:"",evaluate_with_parent_context:!0}}function Vp(e,t){try{return pt(e)}catch(n){let r=n instanceof Error?n.message:String(n);throw new T(`${t}: ${r}`)}}function Es(e,t,n,r){let i=String(e.prefix??"").replace(/^['"]|['"]$/g,"");if(t===i)return e;let s=ae(e.import_prefixes)?e.import_prefixes:void 0,o=s&&ae(s[t])?s[t]:void 0;if(!o)throw new T(`${r}: unknown prefix '${t}' in path '${n}'`);return o}function Up(e,t){return ut(e.statements).find(r=>r.name===t)}function Gp(e,t){let n=ae(e.extension_runtime)?e.extension_runtime:void 0,i=(n&&ae(n[ct])?n[ct]:void 0)?.[t];return ae(i)?i:ut(e.statements).find(o=>(typeof o.resolved_extension_name=="string"?o.resolved_extension_name:"")==="structure"&&String(o.argument??"").trim()===t)}function qp(e,t){let n=Vp(t,"augment-structure"),r=n[0],i=r.prefix,s=Es(e,i,t,"augment-structure"),o=Gp(s,r.name);if(!o)throw new T(`augment-structure: no top-level structure '${r.name}' in path '${t}'`);for(let a of n.slice(1)){Es(e,a.prefix,t,"augment-structure");let c=Up(o,a.name);if(!c)throw new T(`augment-structure: no child '${a.name}' in path '${t}'`);o=c}return o}function Kp(e,t){let n=String(e.resolved_module_name??""),r=String(e.resolved_extension_name??"");if(n!=="ietf-yang-structure-ext")return e;if(r==="structure"){let i=ae(t.extension_runtime)?t.extension_runtime:t.extension_runtime={},s=ae(i[ct])?i[ct]:i[ct]={},o=String(e.argument??"").trim();return o.length>0&&(s[o]=e,e.name=o),e.data_node_kind="container",e}if(r==="augment-structure"){let i=String(e.argument??""),s=qp(t,i),o=ut(e.statements).map(f=>Mp(f)),a=Array.isArray(e.if_features)?e.if_features:[],c=ae(e.when)?e.when:void 0;for(let f of o){Bp(f,a),Yp(f,c);let p=ut(s.statements);p.push(f),s.statements=p}return}return e}function ao(e,t){let n=ut(e.statements),r=[];for(let i of n){let s=i;typeof i.resolved_module_name=="string"&&typeof i.resolved_extension_name=="string"&&(s=Kp(i,t)),s&&(ao(s,t),r.push(s))}e.statements=r}function Wp(e){ao(e,e)}var zp=new Set(["container","list","leaf","leaf-list","choice","case","anydata","anyxml","notification","rpc","action","input","output"]);function co(e){return JSON.parse(JSON.stringify(e))}function Ke(e){return Array.isArray(e)?e:[]}function Hp(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Ns(e,t){if(t===Hp(e))return e;let r=e.import_prefixes?.[t];return r&&typeof r=="object"?r:void 0}function Xp(e,t){let n=e.augment_path_segments;if(Array.isArray(n)&&n.length>0)return n;try{return pt(t)}catch(r){throw new V(r instanceof Error?r.message:String(r))}}function fo(e){let t=typeof e.keyword=="string"?e.keyword:"";return!!e.name&&zp.has(t)}function Qp(e,t){for(let n of Ke(e.statements))if(n.name===t&&fo(n))return n}function Jp(e,t){for(let n of Ke(e.statements))if(n.name===t&&fo(n))return n}function Zp(e,t,n){return el({ctxModule:e,path:t,segments:n?Xp(n,t):void 0,kind:"augment",findToplevel:Jp})}function el(e){let{ctxModule:t,path:n,kind:r,findToplevel:i}=e,s=e.segments;if(!s||s.length===0)try{s=pt(n)}catch(l){throw new V(l instanceof Error?l.message:String(l))}let o=s[0],a=o.prefix,c=o.name,f=Ns(t,a);if(!f)throw new V(`${r}: unknown prefix '${a}' in path '${n}' (module '${String(t.name??"")}')`);let p=i(f,c);if(!p)throw new V(`${r}: no top-level schema node '${c}' in module '${String(f.name??"")}' (path '${n}')`);for(let l of s.slice(1)){let m=l.prefix,u=l.name;if(!Ns(t,m))throw new V(`${r}: unknown prefix '${m}' in path '${n}'`);let d=Qp(p,u);if(!d)throw new V(`${r}: no child '${u}' under node in path '${n}' (after '${String(p.name??"")}')`);p=d}if(!Array.isArray(p.statements)&&p.statements!==void 0)throw new V(`${r}: target node '${String(p.name??"?")}' cannot contain schema substatements (path '${n}')`);return p.statements===void 0&&(p.statements=[]),p}function uo(e,t){e.defining_module=t;for(let n of Ke(e.statements))uo(n,t)}function tl(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function nl(e,t){let n=e.when;if(!n||typeof n.expression!="string"||n.expression.trim()==="")return;let r={...co(n),evaluate_with_parent_context:!0},i=t.when;if(!i?.expression){t.when=r;return}t.when={...i,expression:`(${String(i.expression)}) and (${n.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function rl(e,t,n){let r=Ke(e.statements).map(s=>co(s));for(let s of r)uo(s,n),tl(e,s),nl(e,s);let i=Ke(t.statements);for(let s of r)i.push(s);t.statements=i}function il(e){let t=e.data,n=Ke(t.statements),r=n.filter(s=>s.keyword==="augment");if(r.length===0)return e;let i=String(t.name??"");for(let s of r){let o=String(s.augment_path??s.argument??""),a=Zp(t,o,s);rl(s,a,i)}return t.statements=n.filter(s=>s.keyword!=="augment"),e}function ve(e){return JSON.parse(JSON.stringify(e))}function po(e){return!e||typeof e!="object"?{}:e}function lo(e){return!e||typeof e!="object"?{}:e}function mo(e){if(typeof e.grouping_name!="string"||!e.grouping_name)return;let t=e.grouping_name,n=typeof e.grouping_prefix=="string"&&e.grouping_prefix?e.grouping_prefix:void 0;return n?{prefix:n,name:t}:{name:t}}function sl(e,t){let n=Ue(e);if(!e.name)throw new T("Empty grouping name in uses");if(e.prefix){let i=t.import_prefixes[e.prefix];if(!i)throw new T(`Unknown import prefix '${e.prefix}' in uses '${n}'`);let s=po(i.groupings),o=s[e.name];if(!o)throw new T(`Unknown grouping '${n}'`);return{key:n,grouping:o,nestedScope:{groupings:s,import_prefixes:lo(i.import_prefixes)}}}let r=t.groupings[e.name];if(!r)throw new T(`Unknown grouping '${n}'`);return{key:n,grouping:r,nestedScope:t}}function ho(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function _o(e,t){let n=e.when;if(!n||typeof n.expression!="string"||n.expression.trim()==="")return;let r={...ve(n),evaluate_with_parent_context:!0},i=t.when;if(!i?.expression){t.when=r;return}t.when={...i,expression:`(${i.expression}) and (${n.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function go(e,t){for(let n of e)if(n.name===t)return n;for(let n of e){let r=go(n.statements??[],t);if(r)return r}}function yo(e,t){if(t.length===0)return;let[n,...r]=t,i=go(e,n);if(i)return r.length===0?i:yo(i.statements??[],r)}function vo(e,t){let n=e.refines;if(!(!Array.isArray(n)||n.length===0))for(let r of n){let i=r.refine_target_path??r.argument??"",s=i.split("/").map(l=>l.trim()).filter(Boolean);if(s.length===0)continue;let o=yo(t,s);if(!o)throw new Wn(i);typeof r.min_elements=="number"&&(o.min_elements=r.min_elements),typeof r.max_elements=="number"&&(o.max_elements=r.max_elements),typeof r.refined_mandatory=="boolean"&&(o.mandatory=r.refined_mandatory),typeof r.refined_config=="boolean"&&(o.config=r.refined_config);let a=r.refined_defaults;Array.isArray(a)&&a.length>0&&(o.keyword==="leaf"?o.default=a[0]:o.keyword==="leaf-list"&&(o.defaults=[...a]));let c=r.if_features;if(Array.isArray(c)&&c.length>0){let l=Array.isArray(o.if_features)?o.if_features:[];o.if_features=[...c,...l]}let f=typeof r.description=="string"?r.description.trim():"";f&&(o.description=f);let p=r.statements??[];p.length>0&&(o.statements=[...o.statements??[],...ve(p)])}}function ol(e,t){let n=typeof t.argument=="string"&&t.argument||typeof t.name=="string"&&t.name||"";if(!n||n in e)return;let r=t.statements?.find(i=>i.keyword==="type");e[n]={name:n,description:typeof t.description=="string"?t.description:"",reference:typeof t.reference=="string"?t.reference:"",default:t.default,type:t.type??r?.type,statements:t.statements??[]}}function al(e,t){let n=[];for(let r of t){if(r.keyword==="typedef"){ol(e,r);continue}n.push(r)}return n}function bo(e,t,n,r){let i=sl(e,t);if(n.includes(i.key))throw new zn(n,i.key);let s=[...n,i.key],o=i.grouping.statements??[],a=[];for(let f of o)if(f.keyword==="uses"){let p=mo(f);if(!p)continue;let l=bo(p,i.nestedScope,s,r);vo(f,l);for(let m of l)ho(f,m),_o(f,m),a.push(ve(m))}else f.keyword,a.push(ve(f));return al(r,a).map(f=>er(f,i.nestedScope,s,r))}function er(e,t,n,r){return e.statements?.length&&(e.statements=tr(e.statements,t,n,r)),e}function tr(e,t,n,r){let i=[];for(let s of e)if(s.keyword==="uses"){let o=mo(s);if(!o)continue;let a=bo(o,t,n,r);vo(s,a);for(let c of a)ho(s,c),_o(s,c),i.push(er(c,t,n,r))}else i.push(er(ve(s),t,n,r));return i}function cl(e){let t=e.data,n=t.import_prefixes,r=ve(t);n&&typeof n=="object"&&(r.import_prefixes=n),t.features instanceof Set&&(r.features=new Set(t.features)),t.feature_if_features&&typeof t.feature_if_features=="object"&&(r.feature_if_features={...t.feature_if_features});let i={groupings:po(r.groupings),import_prefixes:lo(r.import_prefixes)},s=r.typedefs&&typeof r.typedefs=="object"?r.typedefs:{};r.typedefs=s;let o=r.statements??[];r.statements=tr(o,i,[],s);for(let a of Object.values(i.groupings))a.statements?.length&&(a.statements=tr(a.statements,i,[],s));return new Qt(r,e.source)}function xo(e){let t=[];for(let n of e??[])t.push(n),t.push(...xo(n.statements));return t}function fl(e){for(let t of xo(e.data.statements)){if(t.keyword!=="list"||typeof t.key!="string"||t.key.trim()==="")continue;let n=new Map((t.statements??[]).filter(r=>r.keyword==="leaf"&&typeof r.name=="string").map(r=>[r.name,r]));for(let r of t.key.split(/\s+/).filter(Boolean)){let i=n.get(r);if(i===void 0)throw new T(`List '${t.name??""}': key leaf '${r}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let s;if(i.when!==void 0?s="when":Array.isArray(i.if_features)&&i.if_features.length>0&&(s="if-feature"),s!==void 0)throw new T(`List '${t.name??""}': key leaf '${i.name}' must not have '${s}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function ul(e){fl(e)}function pl(e){let t={};if(!e)return t;for(let[n,r]of Object.entries(e)){let i=Array.isArray(r.bases)?r.bases.map(s=>Cs(s)).filter(s=>!!s):[];t[n]={bases:i}}return t}function ll(e,t){if(e.keyword!=="module")throw new T("Only 'module' roots are currently supported by TS parser");let n=e.statements??[],r={};for(let c of n)if(c.keyword==="typedef"&&c.argument){let f=c.statements?.find(p=>p.keyword==="type");r[c.argument]={name:c.argument,description:typeof c.description=="string"?c.description:"",reference:typeof c.reference=="string"?c.reference:"",default:c.default,type:c.type??f?.type,statements:c.statements??[]}}let i=t.features,s=t.feature_if_features,o=n.find(c=>c.keyword==="description"),a=typeof o?.argument=="string"?o.argument:"";return{__class__:"YangModule",name:e.argument,yang_version:n.find(c=>c.keyword==="yang-version")?.argument??"1.1",namespace:n.find(c=>c.keyword==="namespace")?.argument??"",prefix:n.find(c=>c.keyword==="prefix")?.argument??"",organization:String(t.organization??""),contact:String(t.contact??""),description:a,typedefs:r,identities:pl(t.identities),import_prefixes:t.import_prefixes??{},extensions:t.extensions??{},extension_runtime:t.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:s&&typeof s=="object"?{...s}:{},statements:n}}var Zt=class{expandUses;includePath;moduleCache=new Map;tokenizer=new jp;parsers=new Pp({importResolver:(e,t,n,r,i)=>this.resolveImport(e,n,r,i)});constructor(e={}){this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(t=>Pt(t))}resolveImportedModulePath(e,t,n){let r=t?.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);let s=[n,...this.includePath];for(let o of s){for(let c of i){let f=Pt(o,c);if(Cu(f))return f}let a=[];try{a=Pu(o).filter(c=>c.startsWith(`${e}@`)&&c.endsWith(".yang"))}catch{a=[]}if(a.length>0)return a.sort(),Pt(o,a[a.length-1])}throw new T(`Could not find imported module '${e}' (tried ${i.join(", ")}) under ${s.join(", ")}`)}resolveImport(e,t,n,r){let i=n.module.__source_path;if(!i)throw new T("import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)");let s=this.resolveImportedModulePath(e,t,Ru(i));return this.parseFile(s).data}parseTokenStream(e,t){let n={name:"",yang_version:"1.1",namespace:"",prefix:"",organization:"",contact:"",revisions:[],belongs_to_module:"",typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:t.kind==="file"?t.value:void 0,statements:[]},r=new ns({module:n,current_parent:{}}),i=this.parsers.parseModule(e,r),s=ll(i,n),o=n.groupings??{},a={};for(let[f,p]of Object.entries(o)){if(!p||typeof p!="object")continue;let l=p,m=l.name??f;a[f]={__class__:"YangStatement",keyword:"grouping",name:m,argument:m,statements:(l.statements??[]).map(u=>this.parsers.serializeAstStatement(u))}}Object.keys(a).length>0&&(s.groupings=a),Wp(s);let c=new Qt(s,t);return this.expandUses&&(c=cl(c),c=il(c),ul(c)),c}parseString(e,t="<memory>"){let n=this.tokenizer.tokenize(e,t),r={kind:"string",value:e,name:t};return this.parseTokenStream(n,r)}parseFile(e){let t=Pt(e),n=this.moduleCache.get(t);if(n)return n;let r=Lu(t,"utf-8"),i=this.tokenizer.tokenize(r,t),s={kind:"file",value:t,name:t},o=this.parseTokenStream(i,s);return this.moduleCache.set(t,o),o}},dh=new Zt;function dl(e){return String(e??"").replace(/^['"]|['"]$/g,"")}function ar(e){return String(e.name??"")}function wo(e){let t=e.features;return t instanceof Set?new Set(t):Array.isArray(t)?new Set(t):new Set}function Ao(e,t){let n=dl(e.prefix);if(t===n)return e;let i=e.import_prefixes?.[t];if(i&&typeof i=="object")return i}function So(e){let t=[],n=new Set,r=i=>{if(n.has(i))return;n.add(i),t.push(i);let s=i.import_prefixes;if(s)for(let o of Object.values(s))o&&typeof o=="object"&&r(o)};return r(e),t}function ml(e,t,n){let r=typeof n=="string"?We(n):n,i;if(r.prefix){let a=Ao(e,r.prefix);if(!a)return!1;i=a}else i=e;let s=r.name;if(!wo(i).has(s))return!1;let o=t[ar(i)];return o?o.has(s):!1}function hl(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e[n];if(/\s/.test(i)){n+=1;continue}if(i==="("||i===")"){t.push(i),n+=1;continue}let s=n;for(;s<r&&!/\s/.test(e[s])&&e[s]!=="("&&e[s]!==")";)s+=1;t.push(e.slice(n,s)),n=s}return t}var _l=class{constructor(e,t,n){this.toks=e,this.ctx=t,this.enabled=n}toks;ctx;enabled;i=0;peek(){return this.toks[this.i]}eat(e){let t=this.peek();if(t===void 0)throw new Error("unexpected end of expression");if(e!==void 0&&t!==e)throw new Error(`expected ${e}, got ${t}`);return this.i+=1,t}parseExpr(){let e=this.parseTerm();for(;this.peek()==="or";){this.eat("or");let t=this.parseExpr();e=e||t}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()==="and";){this.eat("and");let t=this.parseTerm();e=e&&t}return e}parseFactor(){let e=this.peek();if(e==="not")return this.eat("not"),!this.parseFactor();if(e==="("){this.eat("(");let t=this.parseExpr();return this.eat(")"),t}if(e===void 0)throw new Error("unexpected end of expression");return this.eat(),ml(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function Io(e,t,n){let r=e.trim();if(!r)return!1;try{let i=new _l(hl(r),t,n),s=i.parseExpr();return i.atEnd()?s:!1}catch{return!1}}function Ve(e,t,n){return!e||e.length===0?!0:e.every(r=>Io(r,t,n))}function gl(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function yl(e,t){let n=!0;for(;n;){n=!1;let i={};for(let[s,o]of Object.entries(t))i[s]=new Set(o);for(let s of e){let o=ar(s),a=t[o];if(!a)continue;let c=s.feature_if_features;for(let f of[...a]){let p=c?.[f];p?.length&&(Ve(p,s,i)||(a.delete(f),n=!0))}}}let r={};for(let[i,s]of Object.entries(t))r[i]=new Set(s);return r}function nr(e,t){let n=So(e),r=gl(t),i={};for(let s of n){let o=ar(s),a=wo(s);r===null||!r.has(o)?i[o]=new Set(a):i[o]=new Set(r.get(o)??[])}return yl(n,i)}function vl(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function rr(e){let t=e.identities;return!t||typeof t!="object"?{}:t}function bl(e){return typeof e=="string"?We(e):e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}}function xl(e,t){let n=vl(e);if(t===n)return e;let i=(e.import_prefixes??{})[t];return i&&typeof i=="object"?i:void 0}function zt(e,t){let n=We(t);return n.prefix?Eo(e.data,n):null}function Eo(e,t){let n=bl(t);if(n.prefix){let r=xl(e,n.prefix);return!r||!(n.name in rr(r))?null:{mod:r,local:n.name}}return n.name in rr(e)?{mod:e,local:n.name}:null}function cr(e,t){return e.mod===t.mod&&e.local===t.local}function No(e,t){return t.some(n=>cr(n,e))}var Ts=new WeakMap,ks=1;function wl(e){let t=Ts.get(e);return t===void 0&&(t=ks,ks+=1,Ts.set(e,t)),t}function Al(e){return`${wl(e.mod)}:${e.local}`}function To(e,t){let n={mod:e,local:t},r=[],i=new Set,s=[n];for(;s.length>0;){let o=s.pop(),a=Al(o);if(i.has(a))continue;i.add(a),r.push(o);let c=rr(o.mod)[o.local];if(c?.bases)for(let f of c.bases){let p=Eo(o.mod,f);p&&s.push(p)}}return r}function Sl(e,t,n){let r=zt(e,t),i=zt(e,n);if(!r||!i)return!1;let s=To(r.mod,r.local).filter(o=>!cr(o,r));return No(i,s)}function Il(e,t,n){let r=zt(e,t),i=zt(e,n);return!r||!i?!1:cr(r,i)?!0:No(i,To(r.mod,r.local))}function ye(e){return!!e&&typeof e=="object"&&"schema"in e&&"parent"in e}function Be(e){return Array.isArray(e)&&(e.length===0||ye(e[0]))}function oe(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e!=="":e!=null}function we(e){return Array.isArray(e)?e.map(t=>ye(t)?t.data:t):ye(e)?[e.data]:e==null?[]:[e]}function U(e){return we(e)[0]}function fr(e,t){if(typeof e=="boolean"||typeof t=="boolean")return[oe(e),oe(t)];if(typeof e=="number"&&typeof t=="number")return[e,t];let n=Number(e),r=Number(t);return!Number.isNaN(n)&&!Number.isNaN(r)?[n,r]:[String(e??"").trim(),String(t??"").trim()]}function Ft(e,t){let n=we(e),r=Array.isArray(t)&&!Be(t)?t:we(t);if(n.length===0||r.length===0)return n.length===0&&r.length===0;for(let i of n)for(let s of r){if(i==null&&s==null)return!0;if(i==null||s==null)continue;let[o,a]=fr(i,s);if(o===a)return!0}return!1}function $s(e,t){for(let n of we(e))for(let r of we(t)){let[i,s]=fr(n,r);if(typeof i=="number"&&typeof s=="number"){if(i<s)return!0;continue}if(`${i}`<`${s}`)return!0}return!1}function Os(e,t){for(let n of we(e))for(let r of we(t)){let[i,s]=fr(n,r);if(typeof i=="number"&&typeof s=="number"){if(i>s)return!0;continue}if(`${i}`>`${s}`)return!0}return!1}function El(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function Nl(e,t){for(let n of El(e))if(n?.name===t)return n;return null}function Tl(e){if(!e||e.keyword!=="leaf")return;let t=e.data?.default;if(e.data?.type?.name==="boolean"&&typeof t=="string"){let r=t.toLowerCase();if(r==="true")return!0;if(r==="false")return!1}return t}function ko(e,t){let n=e.data,r=e.schema;if(Array.isArray(n)&&(r?.keyword==="list"||r?.keyword==="leaf-list")){let o=[];for(let a of n){let c={data:a,schema:r,parent:e};o.push(...ko(c,t))}return o}let i=Nl(r,t),s;if(n&&typeof n=="object"&&!Array.isArray(n)){let o=n;t in o?(s=o[t],s===null&&(s=!0)):s=Tl(i)}return s===void 0?[]:i?.keyword==="list"||i?.keyword==="leaf-list"?Array.isArray(s)?s.map(o=>({data:o,schema:i,parent:e})):[{data:s,schema:i,parent:e}]:[{data:s,schema:i,parent:e}]}var kl=class{eval(e,t,n){switch(e.kind){case"literal":return e.value;case"path":return this.evalPath(e,t,n);case"binary":return this.evalBinary(e,t,n);case"function":return this.evalFunction(e.name,e.args,t,n);default:return null}}evalPath(e,t,n){let r=[e.isAbsolute?t.root:n];for(let i of e.segments){if(i.step!==".")if(i.step==="..")r=r.map(s=>s.parent).filter(s=>!!s);else{let s=[];for(let o of r)s.push(...ko(o,i.step));r=s}if(i.predicate){let s=[];for(let o=0;o<r.length;o+=1){let a=r[o],c=this.eval(i.predicate,t,a),f=!1;typeof c=="number"&&Number.isFinite(c)?f=Math.trunc(c)===o+1:f=oe(c),f&&s.push(a)}r=s}}return r}evalBinary(e,t,n){let r=e.operator;if(r==="or"){let o=this.eval(e.left,t,n);return oe(o)?!0:oe(this.eval(e.right,t,n))}if(r==="and"){let o=this.eval(e.left,t,n);return oe(o)?oe(this.eval(e.right,t,n)):!1}if(r==="/"){let o=this.eval(e.left,t,n),a=Be(o)?o:ye(o)?[o]:[],c=[];for(let f of a){let p=this.eval(e.right,t,f);Be(p)?c.push(...p):ye(p)&&c.push(p)}return c}let i=this.eval(e.left,t,n),s=this.eval(e.right,t,n);if(r==="=")return Ft(i,s);if(r==="!=")return!Ft(i,s);if(r==="<")return $s(i,s);if(r===">")return Os(i,s);if(r==="<=")return Ft(i,s)||$s(i,s);if(r===">=")return Ft(i,s)||Os(i,s);if(r==="+"){let o=Number(U(i))+Number(U(s));return Number.isNaN(o)?Number.NaN:o}if(r==="-"){let o=Number(U(i))-Number(U(s));return Number.isNaN(o)?Number.NaN:o}if(r==="*"){let o=Number(U(i))*Number(U(s));return Number.isNaN(o)?Number.NaN:o}return null}evalFunction(e,t,n,r){let i=e.toLowerCase();if(i==="current")return n.current;if(i==="not")return t.length!==1?null:!oe(this.eval(t[0],n,r));if(i==="true")return!0;if(i==="false")return!1;if(i==="count"){if(t.length!==1)return 0;let s=this.eval(t[0],n,r);return Be(s)?s.length:s==null?0:1}if(i==="string"){if(t.length!==1)return"";let s=U(this.eval(t[0],n,r));return s==null?"":String(s)}if(i==="number"){if(t.length!==1)return Number.NaN;let s=U(this.eval(t[0],n,r)),o=Number(s);return Number.isNaN(o)?Number.NaN:o}if(i==="boolean")return t.length!==1?!1:oe(this.eval(t[0],n,r));if(i==="string-length"){if(t.length!==1)return 0;let s=U(this.eval(t[0],n,r));return s==null?0:String(s).length}if(i==="concat")return t.map(s=>String(U(this.eval(s,n,r))??"")).join("");if(i==="translate"){if(t.length!==3)return"";let s=String(U(this.eval(t[0],n,r))??""),o=String(U(this.eval(t[1],n,r))??""),a=String(U(this.eval(t[2],n,r))??"");if(o.length===0)return s;let c=new Map;for(let p=0;p<o.length;p+=1)c.set(o[p],p<a.length?a[p]:null);let f="";for(let p of s){if(!c.has(p)){f+=p;continue}let l=c.get(p);l!=null&&(f+=l)}return f}if(i==="deref"){if(t.length!==1)return[];let s=n.current??r,o=this.eval(t[0],n,s),a=Be(o)?o:ye(o)?[o]:[],c=[];for(let f of a){let p=f.schema?.data?.type;if(!p||p.name!=="leafref")continue;let l=p.path;if(!l||l.kind!=="path")continue;let m=this.evalPath(l,n,f);for(let u of m)u.data===f.data&&c.push(u)}return c}if(i==="derived-from"||i==="derived-from-or-self"){if(t.length!==2)return!1;let s=n.root?.schema;if(!(s instanceof Qt))return!1;let o=s,a=n.current??r,c=this.eval(t[0],n,a);if(Be(c)){if(c.length===0)return!1;c=c[0].data}else ye(c)?c=c.data:c=U(c);if(typeof c!="string")return!1;let f=this.eval(t[1],n,a),p=U(f);return typeof p!="string"?!1:i==="derived-from"?Sl(o,c,p):Il(o,c,p)}return null}};function Ht(e){if(e===null)return"null";let t=typeof e;if(t==="undefined")return"undefined";if(typeof e=="string"){let n=e;return n.length>100?`string(len=${n.length}):${JSON.stringify(n.slice(0,80))}\u2026`:JSON.stringify(n)}if(t==="number"||t==="boolean"||t==="bigint")return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(t==="object")try{let n=JSON.stringify(e);return n.length>160?`${n.slice(0,160)}\u2026`:n}catch{return"[object]"}return String(e)}function Xt(e,t,n){e&&console.debug(`[xYang:type-validation] ${t}`,n)}function Dt(e,t){let n=t&&typeof t.prefix=="string"&&t.prefix?t.prefix:void 0;return n?{prefix:n,name:e}:{name:e}}var Hn=class{constructor(e,t={}){this.module=e,this.typeValidationDebug=t.typeValidationDebug===!0}module;system=new ss;typeValidationDebug;lookupTypedef(e){if(e.prefix){let n=Ao(this.module.data,e.prefix);if(!n)return;let r=n.typedefs?.[e.name];return r?.type&&typeof r.type.name=="string"?r:void 0}let t=this.module.typedefs[e.name];if(t?.type&&typeof t.type.name=="string")return t}resolveUnderlyingBuiltinName(e,t){let n=new Set,r=Dt(e,t);for(;n.size<64;){let i=this.lookupTypedef(r);if(!i?.type||typeof i.type.name!="string")return r.name;if(i.type.name==="union")return Ue(r);let s=Ue(r);n.add(s);let o=Dt(i.type.name,i.type);if(Ue(o)===s)return r.name;r=o}return r.name}validate(e,t,n){let r,i,s=Dt(t,n),o=this.lookupTypedef(s);if(o?.type&&typeof o.type.name=="string"){let a=new st(o.type);o.type.name==="union"?(r="typedef-union",i=this.validateUnion(e,a)):this.lookupTypedef(Dt(o.type.name,o.type))?(r="typedef",i=this.validate(e,o.type.name,o.type)):(r="typedef",i=this.system.validate(e,o.type.name,a))}else{let a=new st(n);t==="union"&&(a.types?.length??0)>0?(r="inline-union",i=this.validateUnion(e,a)):(r="direct",i=this.system.validate(e,t,a))}return Xt(this.typeValidationDebug,"TypeChecker.validate",{module:this.module.name??"(anonymous)",typeName:t,via:r,ok:i[0],reason:i[1],value:Ht(e)}),i}validateUnion(e,t){Xt(this.typeValidationDebug,"TypeChecker.validateUnion",{module:this.module.name??"(anonymous)",memberCount:t.types?.length??0,value:Ht(e)});for(let n of t.types??[]){let r=n,i=typeof r.name=="string"?r.name:"string",[s]=this.validate(e,i,r);if(s)return[!0,null]}return[!1,"Value does not match any union member type"]}},$l=class{xpath=new kl;xpathCache=new Map;rootCtx;enabledFeaturesOverride;contextStack=[];typeValidationDebug;constructor(e,t={}){this.enabledFeaturesOverride=t.enabledFeaturesByModule??null,this.typeValidationDebug=t.typeValidationDebug===!0;let n=t.constraintChecks??!0,r=t.leafTypeMode??(n?"full":"none"),i=e.data;this.rootCtx={module:e,typeChecker:new Hn(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:n,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:nr(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new Hn(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){let e=this.contextStack[this.contextStack.length-1];if(!e)throw new Error("DocumentValidator: internal error \u2014 no active validation context");return e}enableExtension(e,t){if(e!=="anydata_validation")throw new Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=Rs(t)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,t){this.contextStack.push(e);try{let n=[],r=[];if(!t||typeof t!="object"||Array.isArray(t))return[!1,["Document must be an object"],r];let i=t,s={data:i,schema:e.module,parent:null};for(let o of e.module.statements){if(!o.name)continue;let a=this.effectiveKeyword(o);["container","list","leaf","leaf-list","anydata","anyxml","choice"].includes(a)&&this.validateStatement(o,i[o.name],o.name,n,s,s)}return[n.length===0,n,r]}finally{this.contextStack.pop()}}validateStatement(e,t,n,r,i,s){let o=this.effectiveKeyword(e),a={data:t,schema:e,parent:i};if(o==="choice"){this.validateChoice(e,i.data,n,r,i,s);return}if(o==="case"){if(!i.data||typeof i.data!="object"||Array.isArray(i.data))return;let p=i.data;for(let l of e.statements)l.name&&this.validateStatement(l,p[l.name],`${n}.${l.name}`,r,i,s);return}let c=e.data.if_features,f=Array.isArray(c)?c:[];if(!Ve(f,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){t!==void 0&&r.push(`${n}: Node '${e.name??"node"}' is present but its 'if-feature' condition is false \u2014 this node must not exist`);return}if(!(this.ctx.constraintChecks&&!this.checkWhen(e,t,n,r,a,s,i))){if(o==="container"){if(t===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,n,r,a,s);return}if(!t||typeof t!="object"||Array.isArray(t)){r.push(`${n}: container must be an object`);return}let p=t;this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r);for(let l of e.statements){if(this.effectiveKeyword(l)==="choice"){this.validateChoice(l,p,`${n}.${l.name??"choice"}`,r,a,s);continue}l.name&&this.validateStatement(l,p[l.name],`${n}.${l.name}`,r,a,s)}this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,p,n,r);return}if(o==="list"){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: list must be an array`);return}let p=typeof e.data.key=="string"?e.data.key.trim():"",l=p.length>0?p.split(/\s+/).map(m=>m.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&l.length>0&&this.checkListKeyUniqueness(t,l,e.name??"list",n,r))return;for(let m=0;m<t.length;m+=1){let u=t[m];if(!u||typeof u!="object"||Array.isArray(u)){r.push(`${n}[${m}]: list item must be an object`);continue}let d={data:u,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,d,s,`${n}[${m}]`,r);let _=u;for(let h of e.statements){if(this.effectiveKeyword(h)==="choice"){this.validateChoice(h,_,`${n}[${m}].${h.name??"choice"}`,r,d,s);continue}h.name&&this.validateStatement(h,_[h.name],`${n}[${m}].${h.name}`,r,d,s)}this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,_,`${n}[${m}]`,r)}return}if(o==="leaf"){let p=!!e.data.mandatory;if(t===void 0){p&&r.push(`${n}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){let l=e.data.type??{},m=l.name??"string";if(m==="leafref")this.checkLeafref(t,l,n,r,a,s);else if(m==="instance-identifier")this.checkInstanceIdentifier(t,l,n,r,a,s);else{let[u,d]=this.ctx.typeChecker.validate(t,m,l);Xt(this.ctx.typeValidationDebug,"DocumentValidator.leaf:full",{path:n,typeName:m,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:u,reason:d,value:Ht(t)}),u||r.push(`${n}: ${d??`invalid value for type ${m}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r);return}if(o==="leaf-list"){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){let p=e.data.type??{},l=p.name??"string";for(let m=0;m<t.length;m+=1){let u={data:t[m],schema:e,parent:i};if(l==="leafref")this.checkLeafref(t[m],p,`${n}[${m}]`,r,u,s);else if(l==="instance-identifier")this.checkInstanceIdentifier(t[m],p,`${n}[${m}]`,r,u,s);else{let[d,_]=this.ctx.typeChecker.validate(t[m],l,p);Xt(this.ctx.typeValidationDebug,"DocumentValidator.leaf-list:full",{path:`${n}[${m}]`,typeName:l,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:d,reason:_,value:Ht(t[m])}),d||r.push(`${n}[${m}]: ${_??`invalid value for type ${l}`}`)}this.checkMust(e,u,s,`${n}[${m}]`,r)}}return}if(o==="anydata"||o==="anyxml"){let p=!!e.data.mandatory;if(t===void 0){p&&r.push(`${n}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r),o==="anydata"&&this.runAnydataSubtreeValidation(e,t,n,r)}}}collectSchemaInstanceKeys(e,t){if(!e)return;let n=this.effectiveKeyword(e);if(n==="choice"){for(let r of e.statements??[])if(r.keyword==="case")for(let i of r.statements??[])this.collectSchemaInstanceKeys(i,t);return}if(n==="list"){e.name&&t.add(e.name);return}if(n==="container"){let r=e.statements??[];!(r.length===1&&this.effectiveKeyword(r[0])==="choice")&&e.name&&t.add(e.name);for(let s of r)this.collectSchemaInstanceKeys(s,t);return}e.name&&t.add(e.name)}rejectUnknownContainerKeys(e,t,n,r){if(e.data.presence||e.name!=="array")return;let i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!=="choice")return;let s=new Set;if(this.collectSchemaInstanceKeys(i[0],s),s.size!==0)for(let o of Object.keys(t))s.has(o)||r.push(`${n}: Unknown field '${o}'`)}rejectUnknownListItemKeys(e,t,n,r){let i=this.collectDirectChildKeys(e);if(i.size!==0)for(let s of Object.keys(t))i.has(s)||r.push(`${n}: Unknown field '${s}'`)}collectDirectChildKeys(e){let t=new Set,n=r=>{let i=this.effectiveKeyword(r);if(i==="choice"||i==="case"){for(let s of r.statements??[])n(s);return}r.name&&t.add(r.name)};for(let r of e.statements??[])n(r);return t}validateChoice(e,t,n,r,i,s){if(!t||typeof t!="object"||Array.isArray(t)){e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`);return}let o=t,a=Array.isArray(e.data.if_features)?e.data.if_features:[],c=Ve(a,this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!c&&this.choiceHasBranchData(e,o)){r.push(`${n}: Choice '${e.name??"choice"}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}if(!c||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,n,r,i,s,i))return;let f=e.statements.filter(u=>u.keyword==="case"),p=[],l=!1;for(let u of f){if(!this.caseHasAnyData(u,o))continue;let d=Array.isArray(u.data.if_features)?u.data.if_features:[];if(!Ve(d,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${n}: Case '${u.name??"case"}' of choice '${e.name??"choice"}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}if(this.ctx.constraintChecks&&!this.checkWhen(u,!0,`${n}.${u.name??"case"}`,r,i,s,i)){l=!0;continue}p.push(u)}if(p.length>1){let u=p.map(d=>d.name??"<unnamed>").join(", ");r.push(`${n}: choice '${e.name??"choice"}' allows only one case, but multiple are active: ${u}`);return}let m=p[0];if(!m){if(l)return;e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`);return}for(let u of m.statements)u.name&&this.validateStatement(u,o[u.name],`${n}.${u.name}`,r,i,s)}choiceHasBranchData(e,t){return e.statements.filter(r=>r.keyword==="case").some(r=>this.caseHasAnyData(r,t))}caseHasAnyData(e,t){return e.statements.some(n=>this.statementHasMatchingData(n,t))}statementHasMatchingData(e,t){let n=this.effectiveKeyword(e);return["leaf","leaf-list","container","list","anydata","anyxml"].includes(n)?!!(e.name&&t[e.name]!==void 0):n==="choice"?this.choiceHasBranchData(e,t):n==="case"?this.caseHasAnyData(e,t):!1}effectiveKeyword(e){let t=e.keyword??"";if(t.includes(":")){let n=e.data.data_node_kind;if(n==="container"||n==="list")return n}return t}checkListKeyUniqueness(e,t,n,r,i){if(t.length===0)return!1;let s=new Map;for(let o=0;o<e.length;o+=1){let a=e[o];if(!a||typeof a!="object"||Array.isArray(a))continue;let c=a,f=t.map(l=>c[l]),p=JSON.stringify(f);if(s.has(p)){let l=s.get(p),m=t.map(u=>`${u}='${String(c[u])}'`).join(", ");return i.push(`${r}: Duplicate key in list '${n}': ${m} (entries at index ${l} and ${o})`),!0}s.set(p,o)}return!1}leafrefPathAst(e){let t=e.path;if(typeof t=="string"&&t.trim().length>0)try{return eo(t.trim())}catch{return null}return t&&typeof t=="object"&&!Array.isArray(t)&&t.kind==="path"?t:null}checkLeafref(e,t,n,r,i,s){let o=t.require_instance!==!1,a=this.leafrefPathAst(t);if(!a||a.kind!=="path"){o&&r.push(`${n}: leafref has no path`);return}try{let c={current:i,root:s},f=this.xpath.eval(a,c,i),p=Array.isArray(f)?f:[],l=new Set;for(let u of p){if(!u||typeof u!="object"||!("data"in u))continue;let d=u.data;d!=null&&(typeof d=="string"||typeof d=="number"||typeof d=="boolean")&&l.add(String(d))}if(typeof e!="string"&&typeof e!="number"&&typeof e!="boolean"){r.push(`${n}: leafref value must be a string, number, or boolean`);return}let m=String(e);o&&!l.has(m)&&r.push(`${n}: leafref: value '${m}' does not reference an existing instance (require-instance is true)`)}catch(c){let f=c instanceof Error?c.message:String(c);r.push(`${n}: leafref: error evaluating path (${f})`)}}checkInstanceIdentifier(e,t,n,r,i,s){if(typeof e!="string"){r.push(`${n}: instance-identifier value must be a string, got ${typeof e}`);return}if(!(t.require_instance!==!1))return;let a=e.trim();if(!a){r.push(`${n}: instance-identifier path must not be empty when require-instance is true`);return}let c;try{c=Mt(a)}catch(p){let l=p instanceof Error?p.message:String(p);r.push(`${n}: instance-identifier: invalid path expression (${l})`);return}if(c.kind!=="path"){r.push(`${n}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!c.isAbsolute){r.push(`${n}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}let f={current:i,root:s};try{this.xpath.evalPath(c,f,s).length===0&&r.push(`${n}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(p){let l=p instanceof Error?p.message:String(p);r.push(`${n}: instance-identifier: invalid path expression (${l})`)}}checkMust(e,t,n,r,i){let s=e.statements.filter(o=>o.keyword==="must"&&typeof o.argument=="string");for(let o of s){let a=o.argument,c=this.xpathCache.get(a);if(!c)try{c=Mt(a),this.xpathCache.set(a,c)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`);continue}try{let f={current:t,root:n},p=this.xpath.eval(c,f,t);if(!this.xpathBoolean(p)){let m=typeof o.data.error_message=="string"&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??"node"}'`;i.push(`${r}: ${m}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`)}}}checkWhen(e,t,n,r,i,s,o){let a=e.data.when,c=typeof a?.expression=="string"?a.expression:void 0;if(!c||c.trim().length===0)return!0;let f=this.xpathCache.get(c);if(!f)try{f=Mt(c),this.xpathCache.set(c,f)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??"node"}'`),!1}try{let l=a?.evaluate_with_parent_context===!0?o:i,m={current:l,root:s},u=this.xpath.eval(f,m,l);return this.xpathBoolean(u)?!0:(t!==void 0&&r.push(`${n}: node is not allowed by when condition`),!1)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??"node"}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e.length>0:e!=null}validateMandatoryChildren(e,t,n,r,i,s){let o=t&&typeof t=="object"&&!Array.isArray(t)?t:void 0;for(let a of e.statements){let c=a.keyword??"";if(!["leaf","anydata","anyxml"].includes(c)||!a.name)continue;let f=Array.isArray(a.data.if_features)?a.data.if_features:[];if(!Ve(f,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!a.data.mandatory)continue;let p=o?.[a.name],l={data:p,schema:a,parent:i};this.ctx.constraintChecks&&!this.checkWhen(a,p,`${n}.${a.name}`,r,l,s,i)||(!o||o[a.name]===void 0)&&r.push(`${n}.${a.name}: mandatory ${c} is missing`)}}anydataModuleMap(e){let t={};for(let n of e){let r=n.name;r&&(t[r]=n)}return t}runAnydataSubtreeValidation(e,t,n,r){if(!this.ctx.anydataValidation||!t||typeof t!="object"||Array.isArray(t))return;let i=this.ctx.anydataValidation.mode,s=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(s),a=t;for(let[c,f]of Object.entries(a)){let{statementName:p,moduleName:l}=Zi(c,o);if(!p||!l){r.push(`${n}.${c}: Unknown anydata member '${c}': no matching module:identifier in the provided modules`);continue}let m=o[l],u=m?.findStatement(p);if(!u){r.push(`${n}.${c}: Unknown anydata member '${c}'`);continue}if(u.keyword==="leaf"){r.push(`${n}.${c}: anydata member '${c}' maps to a leaf; nested subtree validation expects a container or list`);continue}let d={[p]:f},_=m.data,h={module:m,typeChecker:new Hn(m,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i==="complete",leafTypeMode:i==="complete"?"full":"none",typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:_,enabledByModule:nr(_,this.enabledFeaturesOverride)},[g,y]=this.validateWithContext(h,d);if(!g)for(let b of y)r.push(`${n}.${c}: ${b}`)}}},ur=class{constructor(e,t={}){this.module=e,this.documentValidator=new $l(e,{enabledFeaturesByModule:t.enabledFeaturesByModule??null,typeValidationDebug:t.typeValidationDebug})}module;documentValidator;setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,t){this.documentValidator.enableExtension(e,t)}enable_extension(e,t){this.enableExtension(e,t)}validate(e){let[t,n,r]=this.documentValidator.validate(e);return{isValid:t,errors:n,warnings:r}}};var en,$o;function tn(){if(!import.meta.url.startsWith("file:"))return"/yang";let e=dt.dirname(Ol(import.meta.url));return dt.resolve(e,"../../../../yang")}function Oo(e=tn()){if(en&&$o===e)return en;let t=dt.join(e,"netlab-topology.yang"),n=[e,dt.join(e,"modules")],r=new Zt({include_path:n,expand_uses:!0}),i=r.parseFile(t);for(let s of["netlab-internal.yang","modules/netlab-ospf.yang","modules/netlab-bgp.yang","modules/netlab-vlan.yang","modules/netlab-vrf.yang","modules/netlab-isis.yang","modules/netlab-vxlan.yang","modules/netlab-evpn.yang","modules/netlab-mpls.yang"]){let o=dt.join(e,s);try{r.parseFile(o)}catch(a){if(a?.code!=="ENOENT")throw a}}return en=i,$o=e,en}function pr(e){let t=Oo(e);return new ur(t)}function lr(e){let t=e.nodes??{},n=Object.entries(t).map(([f,p])=>{let l={...p,name:p.name??f};return l.loopback===!1&&delete l.loopback,Array.isArray(l.interfaces)&&(l.interfaces=l.interfaces.map(m=>{let u={...m};return Array.isArray(u.neighbors),u})),l.vlans&&typeof l.vlans=="object"&&!Array.isArray(l.vlans)&&(l.vlans=nn(l.vlans)),l.vrfs&&typeof l.vrfs=="object"&&!Array.isArray(l.vrfs)&&(l.vrfs=nn(l.vrfs)),Co(l),l}),r=(e.links??[]).map((f,p)=>{let l={...f};(l.ospf===!1||l.ospf===!0)&&delete l.ospf,l.linkindex===void 0&&(l.linkindex=p+1);let m=l[q];return typeof m=="string"?(l._linkname=m,delete l[q]):l._linkname,Co(l),l}),i=e.groups?Object.entries(e.groups).map(([f,p])=>({...p,name:p.name??f})):void 0,s=Cl(e.addressing),o={nodes:n,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),s&&(o.addressing=s),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.routing&&(o.routing=e.routing),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=nn(e.vlans)),e.vrfs&&(o.vrfs=nn(e.vrfs));let a={topology:o},c=a.topology;return Array.isArray(e[`${ne}:_Providers`])&&(c[`${ne}:_Providers`]=e[`${ne}:_Providers`]),a}function nn(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.entries(e).map(([t,n])=>({...typeof n=="object"&&n&&!Array.isArray(n)?n:{},name:t}))}function Cl(e){return!e||typeof e!="object"||Array.isArray(e)?void 0:{pool:Object.entries(e).map(([n,r])=>({...typeof r=="object"&&r&&!Array.isArray(r)?r:{},name:n}))}}function Co(e){let t=`${ne}:`;for(let n of Object.keys(e))if(n.startsWith(t)){let r=n.slice(t.length);e[r]===void 0&&(e[r]=e[n]),delete e[n]}}function dr(e,t,n={}){e.stage=t;let r=n.yangDir??tn(),i=pr(r),s=lr(e),o=i.validate(s);if(n.diagnostics){for(let a of o.errors)n.diagnostics.error(wt(a));for(let a of o.warnings)n.diagnostics.warning(wt(a))}return{ok:o.isValid,errors:o.errors,warnings:o.warnings}}function sn(e){delete e.pools,delete e.Plugin,delete e.stage,delete e[`${ne}:_Providers`];for(let t of Object.values(e.nodes??{})){rn(t);for(let r of t.interfaces??[])rn(r);let n=t.vrfs;if(n)for(let r of Object.values(n))rn(r)}for(let t of e.links??[])rn(t);return e}function rn(e){for(let t of Object.keys(e))t.startsWith(`${ne}:`)&&delete e[t]}function mr(e){let t=structuredClone(e);return sn(t)}var Lo={frr:`---
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
`},Po={bird:`---
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
`};var Q_=new Set(et),hr;function Ro(e){let t={};for(let[n,r]of Object.entries(e)){let i=pe(r)??{};t[n]={...i,name:n}}return t}function Ll(e,t){for(let[n,r]of Object.entries(t)){if(e[n])throw new Error(`duplicate name ${n} for a device and a daemon`);let i={...r,name:n,daemon:!0};i.parent||(i.parent="linux"),e[n]=i}}function Pl(e){let t={},n=new Set;function r(i){if(t[i])return t[i];if(n.has(i))return e[i]??{name:i};n.add(i);let s=e[i]??{name:i},o=typeof s.parent=="string"?s.parent:void 0,a={...s,name:i};if(o&&e[o]){let c=r(o);a=E(c,{...s,name:i}),s.daemon!==void 0&&(a.daemon=s.daemon),a.parent=o}return n.delete(i),t[i]=a,a}for(let i of Object.keys(e))r(i);return t}function on(){if(hr)return hr;let e=Ro(Lo);Ll(e,Ro(Po));let t=Pl(e);for(let n of Object.values(t)){if(n.clab&&typeof n.clab=="object"){let r=n.clab;r.features&&(n.features=E(n.features??{},r.features))}delete n.libvirt,delete n.virtualbox,delete n.external}return hr=t,t}function D(e){return on()[e]??{name:e,interface_name:"eth{ifindex}",role:"router"}}var ce=Zr(_r(),1);var mt={};function Do(){for(let e of Object.keys(mt))delete mt[e]}function jo(e,t={}){let n={lan:{ipv4:typeof t.lan=="string"?t.lan:"10.0.0.0/16",prefix:typeof t.lan_subnet=="number"?t.lan_subnet:24},loopback:{ipv4:"10.0.0.0/24",prefix:32},p2p:{ipv4:typeof t.p2p=="string"?t.p2p:"10.2.0.0/16",prefix:typeof t.p2p_subnet=="number"?t.p2p_subnet:30}},r=E(n,e),i={};for(let[s,o]of Object.entries(r)){if(o==null){i[s]={};continue}if(typeof o!="object"||Array.isArray(o)){i[s]={ipv4:o};continue}let a={...o};typeof a.ipv4=="string"&&typeof a.prefix!="number"&&(a.prefix=s.includes("loopback")?32:24),s==="mgmt"&&typeof a.prefix!="number"&&(a.prefix=24),i[s]=a}return i}function Mo(e,t={}){let n=qn(t),r={};for(let[i,s]of Object.entries(e)){let o={};for(let[a,c]of Object.entries(s))n.has(a)||(o[a]=c);r[i]=o}return r}function gr(e){Do();let t=e.defaults??{},n=jo(e.addressing??{},t);e.addressing=n,e.pools=Mo(n,t);for(let[r,i]of Object.entries(n)){let s={},o=typeof i.prefix=="number"?i.prefix:24,a=typeof i.prefix6=="number"?i.prefix6:64;typeof i.ipv4=="string"&&(s.skipFirst4=o===32||r==="loopback"||r.includes("loopback"),s.ipv4=s.skipFirst4?1:0,s.cache4=[]),typeof i.ipv6=="string"&&(s.skipFirst6=a>=127||r==="loopback"||r.includes("loopback"),s.ipv6=s.skipFirst6?1:0,s.cache6=[]),mt[r]=s}}function cn(e){let t=(e.interfaces??[]).length;return t>2?"lan":t===2?"p2p":"stub"}function ht(e,t){let n=t.prefix??{};if(typeof n.ipv4=="string"||typeof n.ipv6=="string")return;if(t.prefix===!1){t.prefix={};return}let r=cn(t),i=[];typeof t.pool=="string"&&i.push(String(t.pool)),typeof t.role=="string"&&i.push(t.role),i.push(r),i.includes("lan")||i.push("lan");let s=Vo(e,i);t.prefix=Object.keys(s).length?s:{}}function Bo(e,t,n){return Vo(e,[t],n)}function Yo(e,t){let n=t.prefix??{},r=[...t.interfaces??[]].sort((o,a)=>String(o.node).localeCompare(String(a.node))),i=e.nodes??{},s=t.type==="p2p"&&r.length===2;for(let o of["ipv4","ipv6"]){let a=n[o];if(typeof a!="string")continue;if(s){r[0][o]=Xe(a,1),r[1][o]=Xe(a,2);for(let f of t.interfaces??[]){let p=r.find(l=>l.node===f.node);p&&(f[o]=p[o])}continue}let c=1;for(let f of t.interfaces??[]){if(f[o]!==void 0&&f[o]!==null)continue;let l=i[f.node]?.id,u=typeof l=="number"&&l>0&&Ml(a,l)?l:c++;f[o]=Xe(a,u)}}}function Vo(e,t,n){let r=e.addressing??{},i=t.find(c=>r[c]&&typeof r[c]=="object");if(!i)return{};let s=r[i],o=mt[i]??(mt[i]={}),a={};if(typeof s.ipv4=="string"){let c=typeof s.prefix=="number"?s.prefix:24;a.ipv4=n!==void 0?Fl(s.ipv4,c,n,o):Rl(s.ipv4,c,o)}if(typeof s.ipv6=="string"){let c=typeof s.prefix6=="number"?s.prefix6:64;a.ipv6=n!==void 0?jl(s.ipv6,c,n,o):Dl(s.ipv6,c,o)}return a}function Rl(e,t,n){let r=n.ipv4??0;return n.ipv4=r+1,Uo(e,t,r)}function Fl(e,t,n,r){for(r.cache4=r.cache4??[];r.cache4.length<n;){let s=r.cache4.length+(r.skipFirst4?1:0);r.cache4.push(Uo(e,t,s))}let i=(r.skipFirst4?1:0)+r.cache4.length;return(r.ipv4??0)<i&&(r.ipv4=i),r.cache4[n-1]}function Dl(e,t,n){let r=n.ipv6??0;return n.ipv6=r+1,Go(e,t,r)}function jl(e,t,n,r){for(r.cache6=r.cache6??[];r.cache6.length<n;){let s=r.cache6.length+(r.skipFirst6?1:0);r.cache6.push(Go(e,t,s))}let i=(r.skipFirst6?1:0)+r.cache6.length;return(r.ipv6??0)<i&&(r.ipv6=i),r.cache6[n-1]}function Uo(e,t,n){let[r,i]=yr(e),s=2**(32-t),o=r+n*s>>>0;return`${vr(o)}/${t}`}function Go(e,t,n){let[r,i]=ce.default.parseCIDR(e);if(r.kind()!=="ipv6")throw new Error(`Expected IPv6 pool, got ${e}`);let s=br(r.toByteArray()),o=128n-BigInt(t),a=(s>>o)+BigInt(n)<<o,c=xr(a,16);return`${ce.default.fromByteArray(Array.from(c)).toString()}/${t}`}function Xe(e,t){let[n,r]=ce.default.parseCIDR(e);if(n.kind()==="ipv4"){let[c]=yr(e);return`${vr(c+t>>>0)}/${r}`}let s=br(n.toByteArray())+BigInt(t),o=xr(s,16);return`${ce.default.fromByteArray(Array.from(o)).toString()}/${r}`}function qo(e){try{let[t,n]=ce.default.parseCIDR(e);if(t.kind()==="ipv4"){let[c]=yr(e),f=n===0?0:-1<<32-n>>>0;return`${vr((c&f)>>>0)}/${n}`}let r=t.toByteArray(),i=br(r),s=128n-BigInt(n),o=i>>s<<s;return`${ce.default.fromByteArray(Array.from(xr(o,16))).toString()}/${n}`}catch{return e}}function Ml(e,t){try{let[,n]=ce.default.parseCIDR(e);if(ce.default.parseCIDR(e)[0].kind()==="ipv4"){let i=2**(32-n)-2;return t>0&&t<=i}return t>0}catch{return!1}}function yr(e){let[t,n]=e.split("/"),r=(t??"0.0.0.0").split(".").map(Number);return[(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),Number(n??32)]}function vr(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function br(e){let t=0n;for(let n of e)t=(t<<8n)+BigInt(n);return t}function xr(e,t){let n=new Array(t).fill(0),r=e;for(let i=t-1;i>=0;i--)n[i]=Number(r&0xffn),r>>=8n;return n}function _t(e,t){let n;if(e&&typeof e=="object"&&!Array.isArray(e))n={...e};else{n={};for(let r of e??[])if(typeof r=="string")n[r]={name:r};else if(r&&typeof r=="object"&&!Array.isArray(r)){let i=r;if(!i.name){t?.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}n[i.name]=i}}for(let r of Object.keys(n)){let i=n[r];i==null?i={name:r}:typeof i!="object"||Array.isArray(i)?(t?.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${r} must be a dictionary`}),i={name:r,extra:i}):i={...i,name:r},Array.isArray(i.interfaces)||(i.interfaces=[]),n[r]=i}return n}function Bl(e){let t=new Set;for(let r of Object.values(e.nodes??{}))typeof r.id=="number"&&t.add(r.id);let n=1;for(let r of Object.values(e.nodes??{}))if(typeof r.id!="number"){for(;t.has(n);)n++;r.id=n,t.add(n),n++}}function Ko(e,t){let n=String(e.defaults?.device??"frr"),r=et;for(let i of Object.values(e.nodes??{})){i.device||(i.device=n);let s=String(i.device);r.includes(s)||(t?.warning({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${s}' on node ${i.name}; using frr (allowed: ${r.join(", ")})`,path:`nodes.${i.name}.device`}),s="frr",i.device=s);let o=D(s);i.role||(i.role=String(o.role??"router")),o.daemon&&(i["netlab-internal:_daemon"]=!0,o.parent&&(i["netlab-internal:_daemon_parent"]=o.parent))}}function wr(e){Bl(e);let t=e.addressing?.mgmt??{},n=String(t.ipv4??"192.168.121.0/24"),r=Number(t.start??100);for(let i of Object.values(e.nodes??{})){let s=i.id??1,o=D(String(i.device??"frr")),a=Number(o.ifindex_offset??1),c=o.mgmt_if!==void 0?String(o.mgmt_if):Qe(String(o.interface_name??"eth{ifindex}"),a-1),f=i.mgmt??{};if(i.mgmt={ifname:c||"eth0",ipv4:Yl(n,r+s),mac:Gl(String(t.mac??"CA-FE-00-00-00-00"),s),...f},typeof i.mgmt.mac=="string"&&f.mac!==void 0&&(i.mgmt.mac=Wo(i.mgmt.mac)),i.loopback!==!1&&(i.role==="router"||i.role==="gateway"||!i.role)){let p=Qe(String(o.loopback_interface_name??"lo{ifindex}"),0),l=Bo(e,"loopback",s),m={ifindex:0,ifname:p||"lo",type:"loopback",virtual_interface:!0,neighbors:[]};typeof l.ipv4=="string"&&(m.ipv4=l.ipv4.endsWith("/32")?l.ipv4:Xe(l.ipv4,1)),typeof l.ipv6=="string"&&(m.ipv6=l.ipv6.endsWith("/128")?l.ipv6:Xe(l.ipv6,1)),i.loopback={...m,...i.loopback??{}}}i.af=i.af??{},(i.loopback?.ipv4||(i.interfaces??[]).some(p=>p.ipv4))&&(i.af.ipv4=!0),(i.loopback?.ipv6||(i.interfaces??[]).some(p=>p.ipv6))&&(i.af.ipv6=!0)}}function Qe(e,t){return e.includes("if ifindex else")?t?e.replace(/\{ifindex if ifindex else ""\}/g,String(t)):e.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):e.replace(/\{ifindex\}/g,String(t))}function Ar(e,t){let n=e;for(let[r,i]of Object.entries(t))i!==void 0&&(n=n.replaceAll(`{${r}}`,String(i)));return n}function Yl(e,t){return Vl(e,t)}function Vl(e,t){let[n,,]=Ul(e),r=(n&4294967295)+t;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}function Ul(e){let[t,n]=e.split("/"),r=(t??"0.0.0.0").split(".").map(a=>Number(a)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),s=Number(n??32),o=s===0?0:-1<<32-s>>>0;return[i&o,s]}function Wo(e){let t=e.replace(/[:-]/g,"").toLowerCase();return/^[0-9a-f]{12}$/.test(t)?t.match(/../g).join(":"):e}function Gl(e,t){let n=e.replace(/[:-]/g,"");if(!/^[0-9a-fA-F]{12}$/.test(n))return e;let r=BigInt(`0x${n}`)+BigInt(t)*(t<256?65536n:1n);return Wo(r.toString(16).padStart(12,"0"))}function gt(e,t){let n=e.nodes??{},r=e.links;if(!r)return[];let i=Array.isArray(r)?r:[],s=[],o=0;for(let a of i){o++;let c=`links[${o}]`,f=yt(a,c,n,t);f&&f.disable!==!0&&(f.linkindex=o,f[q]=c,delete f._linkname,s.push(f))}return e.links=s,s}function yt(e,t,n,r){if(typeof e=="string"){let i=[];for(let s of e.split("-")){let o=s.trim();n[o]?i.push({node:o}):r?.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${e} in ${t} refers to an unknown node ${o}`})}return{interfaces:i,[q]:t}}if(Array.isArray(e))return{interfaces:zo(e,n,r,t),[q]:t};if(e&&typeof e=="object"){let i={...e};if(Array.isArray(i.interfaces))return i.interfaces=zo(i.interfaces,n,r,t),i[q]=t,i;let s={[q]:t},o=[];for(let[a,c]of Object.entries(i))if(a in n){let f=c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:a}:{node:a};o.push(f)}else s[a]=c;return s.interfaces=o,s}return r?.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof e} for ${t}`}),null}function zo(e,t,n,r){let i=[];for(let s of e)if(typeof s=="string"){if(!t[s]){n?.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${r} refers to unknown node ${s}`});continue}i.push({node:s})}else if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s;if(!o.node||!t[o.node]){n?.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${r} missing/unknown node`});continue}i.push(o)}return i}function vt(e){let t=0;for(let n of e.links??[]){let r=Number(n.linkindex??0);r>t&&(t=r)}return t+1}function Xo(e,t){let n=(e.interfaces??[]).map(i=>i.ifindex??0),r=t;for(;n.includes(r);)r++;return r}function Sr(e){let t=e.nodes??{},n=e.defaults??{},r=Un(n),i=Gn(n);for(let s of e.links??[]){ql(s,t);let o=s.interfaces??[];if(s.node_count=o.length,(s.type==="lan"||s.type==="stub")&&!s.bridge){let c=String(e.name??"lab").slice(0,10);s.bridge=`${c}_${s.linkindex??1}`}ht(e,s),Yo(e,s);let a=[];for(let c of o){let f=c.node,p=t[f];if(!p)continue;let l=new Set(r);for(let v of p.module??[])l.add(v);for(let v of i)l.delete(v);let m={};for(let[v,k]of Object.entries(s))l.has(v)&&(m[v]=structuredClone(k));let{node:u,...d}=c,_=ni(structuredClone(d),m),h=D(String(p.device??"frr")),g=s.type==="loopback",y,b;if(s.type==="vlan_member")y=Ho(p),b=`vlan-member${y}`,_.virtual_interface=!0;else if(g){y=Kl(p,"loopback");let v=y-1e4,k=String(h.loopback_interface_name??h.interface_name??"Loopback{ifindex}");b=Qe(k,v),_.virtual_interface=!0}else y=Ho(p),b=Qe(String(h.interface_name??"eth{ifindex}"),y);_.ifindex=y,_.ifname=b,_.type||(_.type=s.type??cn(s)),_.neighbors=[],c.ifindex=y,c.ifname=b,g&&(c.virtual_interface=!0),p.interfaces=p.interfaces??[],p.interfaces.push(_),a.push({node:f,data:_})}for(let c of a){c.data.neighbors=[];for(let f of a){if(f===c)continue;let p={node:f.node};f.data.ifname!==void 0&&(p.ifname=f.data.ifname),f.data.ipv4!==void 0&&(p.ipv4=f.data.ipv4),f.data.ipv6!==void 0&&(p.ipv6=f.data.ipv6),c.data.neighbors.push(p)}}}for(let s of Object.values(t))s.af=s.af??{},(s.loopback?.ipv4||(s.interfaces??[]).some(o=>typeof o.ipv4=="string"))&&(s.af.ipv4=!0),(s.loopback?.ipv6||(s.interfaces??[]).some(o=>typeof o.ipv6=="string"))&&(s.af.ipv6=!0)}function ql(e,t){let n=e.interfaces??[],r=n.length,i=0;for(let s of n){let o=t[s.node];o&&o.role!=="host"&&i++}!("role"in e)&&i<=1&&e.type!=="loopback"&&!e.vlan_name&&(e.role="stub"),e.type||(e.type=cn(e))}function Ho(e){let t=(e.interfaces??[]).map(r=>r.ifindex??0),n=1;for(;t.includes(n);)n++;return n}function Kl(e,t){let n=(e.interfaces??[]).map(i=>i.ifindex??0),r=10001;for(;n.includes(r);)r++;return r}function Ir(e){return e===!0||e==="true"||e==="True"}function Er(e){if(e.groups||(e.groups={}),Array.isArray(e.groups)){let t={};for(let n of e.groups)n.name&&(t[String(n.name)]=n);e.groups=t}}function Nr(e){let t=e.groups??{},n=e.defaults?.groups??{},r=Ir(t._auto_create)||Ir(n._auto_create);!e.nodes||typeof e.nodes!="object"?e.nodes={}:Array.isArray(e.nodes)&&(e.nodes=_t(e.nodes));let i=e.nodes;for(let[s,o]of Object.entries(t)){if(s.startsWith("_")||!o||typeof o!="object"||Array.isArray(o))continue;let a=o,c=a.members;if(!(!Array.isArray(c)||c.length===0||!Ir(a._auto_create)&&!r||String(a.type??"node")!=="node"))for(let p of c){let l=String(p);l in t||l in n||l in i||(i[l]={name:l,interfaces:[]})}}}function Tr(e){let t=e.groups??{},n=e.nodes??{};for(let[r,i]of Object.entries(t)){if(r.startsWith("_")||!i||typeof i!="object"||Array.isArray(i))continue;let s=i.members??[];for(let o of s){let a=n[o];if(!a)continue;if(i.device&&!a.device&&(a.device=i.device),typeof i.provider=="string"&&!a.provider&&(a.provider=i.provider),Array.isArray(i.module)){let f=new Set(a.module??[]);for(let p of i.module)f.add(p);a.module=[...f]}let c=new Set([...e.module??[],...i.module??[],...a.module??[]]);for(let f of c){let p=i[f];if(!p||typeof p!="object"||Array.isArray(p))continue;let l=a[f];l===void 0?a[f]=structuredClone(p):l&&typeof l=="object"&&!Array.isArray(l)&&(a[f]=E(p,l))}if(i.node_data&&typeof i.node_data=="object"){let f=E(i.node_data,a);Object.assign(a,f)}}}}function kr(e){e.groups||(e.groups={});let t=e.groups,n=Number(e.bgp?.as);for(let[r,i]of Object.entries(e.nodes??{})){if(!(i.module??[]).includes("bgp"))continue;let s=Number(i.bgp?.as??n);if(!Number.isFinite(s)||s<=0)continue;let o=`as${s}`;t[o]||(t[o]={members:[]});let a=t[o];Array.isArray(a.members)||(a.members=[]),a.members.includes(r)||a.members.push(r)}}function $r(e){let t=e.components;if(!t||typeof t!="object")return;let n=e.nodes??{},r={},i=[],s=[];for(let[o,a]of Object.entries(n)){let c=a.include;if(typeof c!="string")continue;let f=t[c];if(!f)continue;i.push(o);let p=o,l=f.nodes??{};for(let[u,d]of Object.entries(l)){let _=`${p}_${u}`;r[_]={...d,name:_}}let m=f.links??[];for(let u of m)s.push(Wl(u,p,Object.keys(l)))}for(let o of i)delete n[o];Object.assign(n,r),e.nodes=n,e.links=[...e.links??[],...s],delete e.components,gt(e)}function Wl(e,t,n){let r=i=>n.includes(i)?`${t}_${i}`:i;if(Array.isArray(e))return{interfaces:e.map(i=>({node:r(String(i))}))};if(e&&typeof e=="object"){let i={...e};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(a=>({...a,node:r(String(a.node??""))})),i;let s={interfaces:[]},o=[];for(let[a,c]of Object.entries(i))n.includes(a)?o.push(c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:r(a)}:{node:r(a)}):s[a]=c;return s.interfaces=o,s}return{interfaces:[]}}var Cr={};te(Cr,{link_pre_transform:()=>Hl,module_post_link_transform:()=>Xl,name:()=>Je,node_post_transform:()=>Ql});var Or=Zr(_r(),1);var Je="gateway";function z(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function zl(e,t){let[n,r]=Or.default.parseCIDR(e),i=n.kind()==="ipv4"?32:128,s=0n;for(let p of n.toByteArray())s=s<<8n|BigInt(p);let o=BigInt(i-r),c=(s>>o<<o)+(t<0?(1n<<o)+BigInt(t):BigInt(t)),f=new Array(i/8);for(let p=f.length-1;p>=0;p--)f[p]=Number(c&255n),c>>=8n;return`${Or.default.fromByteArray(f).toString()}/${r}`}function Hl(e,t,n){let r=e.interfaces??[];if(e.gateway===void 0&&r.some(o=>o.gateway!==void 0&&o.gateway!==!1)){e.gateway=!0;for(let o of r)o.gateway===void 0&&(o.gateway=!1)}if(e.gateway===void 0||e.gateway===!1)return;let i=z(z(t.defaults).gateway),s=E(E(i,z(t.gateway)),z(e.gateway));for(let o of["attributes","features","no_propagate","transform_after","config_after"])delete s[o];s.protocol!=="anycast"&&s.protocol!=="vrrp"&&n.diagnostics.error({module:Je,code:"VALUE",category:"VALUE",message:`Unknown gateway protocol ${s.protocol}`}),(typeof s.id!="number"||!Number.isInteger(s.id)||s.id===-1)&&n.diagnostics.error({module:Je,code:"VALUE",category:"VALUE",message:"Gateway ID must be an integer other than -1"}),e.gateway=s}function Xl(e){for(let t of e.links??[]){if(!t.gateway||typeof t.gateway!="object")continue;let n=structuredClone(t.gateway),r=z(t.prefix);for(let i of["ipv4","ipv6"])n[i]===void 0&&typeof r[i]=="string"&&typeof n.id=="number"&&(n[i]=zl(r[i],n.id));t.gateway=n;for(let i of t.interfaces??[]){let s=e.nodes?.[String(i.node)];if(!s||i.gateway===!1)continue;let o=z(t.vlan).access,a=o&&s.module?.includes("vlan")?s.interfaces?.find(c=>c.type==="svi"&&c.vlan?.name===o):s.interfaces?.find(c=>c.linkindex===t.linkindex);if(a)if(s.module?.includes(Je))a.gateway=E(n,z(i.gateway)),n.protocol==="anycast"&&z(n.anycast).unicast===!1&&delete a.ipv4;else{let c={};for(let f of["ipv4","ipv6"])typeof n[f]=="string"&&(c[f]=n[f].split("/")[0]);a.gateway=c}}}}function Ql(e,t,n){let r=z(z(D(String(e.device??"none")).features).gateway).protocol,i=new Set;for(let s of e.interfaces??[]){if(!s.gateway||typeof s.gateway!="object")continue;let o=s.gateway,a=String(o.protocol??"");i.has(a)||(i.add(a),(!Array.isArray(r)||!r.includes(a))&&n.diagnostics.error({module:Je,code:"VALUE",category:"VALUE",message:`Node ${e.name} (${e.device}) does not support gateway protocol ${a}`}));for(let m of["anycast","vrrp"])m!==a&&delete o[m];if(a!=="vrrp")continue;let c=E(z(z(e.gateway).vrrp),z(o.vrrp)),f=c.group;if(typeof f!="number"||!Number.isInteger(f)||f<1||f>255){n.diagnostics.error({module:Je,code:"VALUE",category:"VALUE",message:`VRRP group on ${e.name} must be an integer from 1 to 255`});continue}let p=f.toString(16).padStart(2,"0"),l={};o.ipv4!==void 0&&(l.ipv4=`00:00:5e:00:01:${p}`),o.ipv6!==void 0&&(l.ipv6=`00:00:5e:00:02:${p}`,c.lla=`fe80::200:5eff:fe00:02${p}`),c.mac=l,o.vrrp=c}}var Lr={};te(Lr,{createVlanAccessLinks:()=>ea,default:()=>hd,link_pre_transform:()=>na,module_post_link_transform:()=>sa,module_pre_transform:()=>ta,name:()=>Qo});var Qo="vlan",Jl=4e4,Zl=["id","vni","mode","prefix","evpn","stp","lag","links"],ed=["bridge","ifindex","parentindex","ifname","linkindex","type","vlan","mtu","bandwidth","_selfloop_ifindex","stp","virtual_interface","lag","evpn"];function Jo(e){let t=e.defaults?.vlan;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function fn(e,t){let n=Jo(e).attributes?.[t];return n&&typeof n=="object"&&!Array.isArray(n)?Object.keys(n):t==="vlan_no_propagate"?[...Zl]:t==="phy_ifattr"?[...ed]:t==="copy_vlan_to_intf"?["ipv4","ipv6","gateway"]:[]}function Q(e){return e.vlans??{}}function td(e){let t=Number(e.vlan?.start_vlan_id);if(Number.isFinite(t)&&t>0)return t;let n=Number(Jo(e).start_vlan_id);return Number.isFinite(n)&&n>0?n:1e3}function nd(e,t,n){t.prefix!==void 0&&(n.prefix=structuredClone(t.prefix)),n.type===void 0&&(n.type=t.type??"lan"),n.vlan_name=e}function rd(e,t,n){let r=e.vlan?.access??e.vlan?.native;if(!r)return"irb";let i=t.vlans??{};return e._vlan_mode||e.vlan?.mode||i[String(r)]?.mode||t.vlan?.mode||Q(n)[String(r)]?.mode||n.vlan?.mode||"irb"}function id(e,t){for(let n of e.interfaces??[]){if(!n.vlan)continue;let r=t.nodes?.[String(n.node)];r&&(n._vlan_mode=rd(n,r,t))}}function Zo(e){return e._vlan_mode}function ea(e,t){let n=Q(e);if(Object.keys(n).length){e.links||(e.links=[]);for(let[r,i]of Object.entries(n))if(!(!i||typeof i!="object")&&Array.isArray(i.links)){for(let s=0;s<i.links.length;s++){let o=yt(i.links[s],`vlans.${r}.links[${s+1}]`,e.nodes??{},t?.diagnostics);if(!o)continue;let a=o.vlan??{};a.access=r,o.vlan=a,o.linkindex=vt(e),o[q]=`vlans.${r}.links[${s+1}]`,e.links.push(o)}delete i.links}}}function sd(e){let t=Q(e);if(!Object.keys(t).length)return;let n=new Set;for(let i of Object.values(t))typeof i?.id=="number"&&n.add(i.id);for(let i of Object.values(e.nodes??{})){let s=i.vlans;if(s)for(let o of Object.values(s))typeof o?.id=="number"&&n.add(o.id)}let r=td(e);for(let[i,s]of Object.entries(t)){let o=s??{};if(o.id===void 0){for(;n.has(r);)r++;o.id=r,n.add(r),r++}t[i]=o}e.vlans=t}function ta(e,t){e.vlans&&!e.links&&(e.links=[]),sd(e),ea(e,t),od(e),ad(e)}function od(e){for(let t of e.links??[]){let n=t.vlan?.access;if(typeof n!="string")continue;let r=Q(e)[n];if(!r||(t.pool===void 0&&(t.pool="lan"),r.mode==="route"||r.prefix!==void 0))continue;let i={type:"lan",pool:"lan",interfaces:[]};ht(e,i),i.prefix&&(r.prefix={...i.prefix,allocation:"id_based"})}}function ad(e){let t=e.links??[];for(let n of[...t]){let r=n.vlan,i=n.interfaces??[],s=a=>{let c=a?.trunk;return Array.isArray(c)?c.filter(f=>typeof f=="string"):c&&typeof c=="object"?Object.keys(c):[]},o=new Set([...s(r),...i.flatMap(a=>s(a.vlan))]);if(o.size){n.prefix===void 0&&(n.prefix=!1);for(let a of[...o].sort()){if(r?.native===a)continue;let c=i.filter(u=>{let d=e.nodes?.[String(u.node)],_=u.vlan,h=_?.trunk===void 0?s(r):s(_),g=d?.vlans?.[a]??Q(e)[a];return d?.module?.includes("vlan")&&h.includes(a)&&!!g});if(!c.length)continue;let f=Q(e)[a]??e.nodes?.[String(c[0].node)]?.vlans?.[a],p=f?.id;if(typeof p!="number")continue;let l=String(f?.mode??"irb"),m={linkindex:vt(e),type:"vlan_member",parentindex:n.linkindex??0,vlan_name:a,...l==="bridge"?{prefix:!1}:f?.prefix&&typeof f.prefix=="object"&&!Array.isArray(f.prefix)?{prefix:structuredClone(f.prefix)}:{},interfaces:c.map(u=>({node:String(u.node),vlan:{access:a,access_id:p,mode:l},_vlan_mode:l}))};t.push(m)}}}}function cd(e,t){for(let n of Object.values(e.nodes??{}))for(let r of n.interfaces??[]){if(r.type!=="vlan_member")continue;let i=n.interfaces?.find(p=>p.linkindex===r.parentindex&&p.type!=="vlan_member"),s=D(String(n.device??"none")).features?.vlan;if(!i||typeof s?.subif_name!="string"){t.diagnostics.error({code:"VALUE",category:"VALUE",module:"vlan",message:`Cannot create routed VLAN subinterface on ${n.name}: missing parent or device support`});continue}let o=r.vlan?.access_id,a=Number(i._vlan_subif_index??0)+1;if(i._vlan_subif_index=a,r.ifname=Ar(s.subif_name,{ifname:i.ifname,subif_index:a,"vlan.access_id":typeof o=="number"?o:void 0}),i.ifindex!==void 0&&(r.parent_ifindex=i.ifindex),i.ifname!==void 0&&(r.parent_ifname=i.ifname),r.virtual_interface=!0,r.vlan?.mode==="bridge"&&delete r.vlan.mode,r.vlan?.mode==="route"&&r.vlan.access!==void 0){let{access:p,...l}=r.vlan;r.vlan={...l,name:p,routed_link:!0}}let f=e.links?.find(p=>p.linkindex===r.linkindex)?.interfaces?.find(p=>p.node===n.name);f&&(f.ifname=r.ifname)}for(let n of Object.values(e.nodes??{}))for(let r of n.interfaces??[]){if(delete r._vlan_subif_index,r.type!=="vlan_member")continue;let i=r._vlan_saved_neighbors;for(let s of[r.neighbors,i])for(let o of s??[]){let a=e.nodes?.[String(o.node)]?.interfaces?.find(c=>c.linkindex===r.linkindex);a?.ifname&&(o.ifname=a.ifname)}}}function na(e,t,n){if(e.type==="vlan_member")return;let r=e.vlan;if(!r)return;for(let s of e.interfaces??[]){let o=t.nodes?.[String(s.node)];o&&(o.module??[]).includes("vlan")&&(s.vlan=E(structuredClone(r),s.vlan??{}))}let i=typeof r.access=="string"?r.access:typeof r.native=="string"?r.native:void 0;if(i){let s=Q(t)[i];s&&r.access_id===void 0&&typeof s.id=="number"&&(r.access_id=s.id);for(let o of e.interfaces??[]){let a=o.vlan;a&&a.access_id===void 0&&r.access_id!==void 0&&(a.access_id=r.access_id)}if(id(e,t),s){let o=new Set(fn(t,"vlan_no_propagate")),a={};for(let[c,f]of Object.entries(s))o.has(c)||(a[c]=structuredClone(f));for(let[c,f]of Object.entries(a))e[c]===void 0?e[c]=f:e[c]&&typeof e[c]=="object"&&!Array.isArray(e[c])&&f&&typeof f=="object"&&!Array.isArray(f)&&(e[c]=E(f,e[c]));nd(i,s,e)}for(let o of e.interfaces??[]){let a=t.nodes?.[String(o.node)];a&&(a.module??[]).includes("vlan")&&Zo(o)==="bridge"&&(o.ipv4=!1,o.ipv6=!1)}}}function ra(e,t,n){t.vlans||(t.vlans={});let r=t.vlans;if(r[e]?._global_merge)return r[e];let i=r[e]??{},s=Q(n)[e]??{};i.mode=i.mode||t.vlan?.mode||s.mode||n.vlan?.mode||"irb",i._global_merge=!0;let o=E(structuredClone(s),i);for(let a of Object.keys(o))!(t.module??[]).includes(a)&&(n.module??[]).includes(a)&&delete o[a];return r[e]=o,o}function fd(e,t,n){e.vlans||(e.vlans={});let r=e.vlans;if(!(t in r)&&!Q(n)[t])return;t in r||(r[t]={});let i=ra(t,e,n);if(i.bridge_group===void 0){let s=e.vlan??{},o=Number(s.max_bridge_group??0)+1;s.max_bridge_group=o,e.vlan=s,i.bridge_group=o}return i}function ia(e,t,n,r){let i=Q(n)[e];if(i)return i;let s=t.vlans?.[e];if(s)return s;if(r?.neighbors)for(let o of r.neighbors){if(!o.node)continue;let c=n.nodes?.[o.node]?.vlans?.[e];if(c)return c}}function ud(e,t,n,r,i){let s=ia(e,r,i,t);if(!s)return;Array.isArray(s.neighbors)||(s.neighbors=[]);let o=s.neighbors,a=new Set(o.map(m=>m.node));for(let m of t.neighbors??[])a.has(m.node)||o.push({...m});let c=new Set([...r.module??[],"ipv4","ipv6"]),f=String(r.name??""),p={node:f};n.ifname!==void 0&&(p.ifname=n.ifname);for(let m of c){let u=n[m];u!==void 0&&(p[m]=u)}let l=o.filter(m=>m.node!==f);l.push(p),s.neighbors=l}function pd(e,t,n){let r=new Set([...fn(t,"phy_ifattr"),...Object.keys(t.defaults?.providers??{})]),i=new Set([...fn(t,"vlan_no_propagate").filter(c=>c!=="mode"),...fn(t,"vlan_svi_no_propagate")]),s={},o=e.interfaces??[],a=o.length;for(let c=0;c<a;c++){let f=o[c];if(f.type==="vlan_member"&&f.vlan?.mode==="route")continue;let p=f.vlan;if(!p)continue;let l=p.access??p.native;if(!l||(Zo(f)??"irb")==="route")continue;let u=fd(e,l,t);if(!u)continue;let _=(D(String(e.device??"none")).features??{}).vlan?.svi_interface_name;if(!_||typeof _!="string"){n.diagnostics.error({code:"VALUE",category:"VALUE",module:"vlan",message:`Device ${e.device} used by ${e.name} does not support VLAN interfaces (access vlan ${l})`,path:`nodes.${e.name}`});return}let h=s[l];if(!h){let g=p.mode||u.mode||"",y=["vlan_name","gateway"];g!=="bridge"&&y.push("ipv4","ipv6");let b={};for(let v of y)f[v]!==void 0&&(b[v]=structuredClone(f[v]));h=b,g?h.vlan={mode:g,name:l}:h.vlan={name:l},h.type="svi",h.ifindex=Xo(e,Jl),h.ifname=Ar(_,{vlan:Number(u.id),bvi:Number(u.bridge_group??u.id),ifname:f.ifname}),h.name=`VLAN ${l} (${u.id})`,h.virtual_interface=!0,h.neighbors=[];for(let[v,k]of Object.entries(u))i.has(v)||y.includes(v)||k===!0&&h[v]!==void 0||h[v]===void 0&&(h[v]=structuredClone(k));e.interfaces=e.interfaces??[],e.interfaces.push(h),s[l]=h}ud(l,f,h,e,t),f.neighbors!==void 0&&(f._vlan_saved_neighbors=f.neighbors);for(let g of Object.keys(f))g.includes("_vlan_saved")||f.type==="vlan_member"&&g==="linkindex"||r.has(g)||delete f[g];f.vlan={...f.vlan,access_id:u.id,access:l}}}function ld(e,t){for(let n of e.interfaces??[]){if(n.vlan_name===void 0)continue;let r=ia(String(n.vlan_name),e,t,n);!r||!Array.isArray(r.neighbors)||(n.neighbors=r.neighbors.filter(i=>i.node!==e.name))}}function dd(e){for(let t of e.links??[]){delete t.vlan_name;for(let n of t.interfaces??[])n._vlan_mode!==void 0&&(n.vlan={...n.vlan??{},mode:n._vlan_mode},delete n._vlan_mode)}for(let t of Object.values(e.nodes??{})){for(let r of t.interfaces??[])delete r.vlan_name,delete r._global_merge,r._vlan_mode!==void 0&&(r.vlan={...r.vlan??{},mode:r._vlan_mode},delete r._vlan_mode),r._vlan_saved_neighbors!==void 0&&(r.neighbors=r._vlan_saved_neighbors,delete r._vlan_saved_neighbors);let n=t.vlans;if(n)for(let r of Object.values(n))delete r._global_merge,delete r.neighbors}for(let t of Object.values(Q(e)))delete t.neighbors}function sa(e,t){for(let n of Object.values(e.nodes??{})){if(!(n.module??[]).includes("vlan"))continue;let r=n.vlans;if(r)for(let i of Object.keys(r))ra(i,n,e);pd(n,e,t)}cd(e,t);for(let n of Object.values(e.nodes??{}))(n.module??[]).includes("vlan")&&ld(n,e);dd(e)}var md={name:Qo,module_pre_transform:ta,link_pre_transform:na,module_post_link_transform:sa},hd=md;var Rr={};te(Rr,{default:()=>gd,expandVrfLinks:()=>Pr,module_pre_transform:()=>aa,name:()=>oa,node_post_transform:()=>ca});var oa="vrf";function Pr(e,t){for(let[n,r]of Object.entries(e.vrfs??{}))!r||typeof r!="object"||Array.isArray(r)||!Array.isArray(r.links)||(e.links??=[],r.links.forEach((i,s)=>{let o=`vrfs.${n}.links[${s+1}]`,a=yt(i,o,e.nodes??{},t.diagnostics);a&&(a.vrf=n,a.linkindex=vt(e),a[q]=o,e.links.push(a))}),delete r.links)}function aa(e,t){let n=e.vrfs;if(!n||typeof n!="object")return;let r=1;for(let[i,s]of Object.entries(n)){let o=s??{};o.rd||(o.rd=`1:${r}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),n[i]=o,r++}}function ca(e,t,n){let r=t.vrfs;if(!r)return;let i=new Set((e.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;let s={...e.vrfs??{}};for(let o of i)r[o]&&(s[o]=E(r[o],s[o]??{}));e.vrfs=s}var _d={name:oa,module_pre_transform:aa,node_post_transform:ca},gd=_d;var Dr={};te(Dr,{default:()=>xd,module_init:()=>la,module_post_transform:()=>ma,module_pre_transform:()=>da,name:()=>fa});var fa="vxlan";function Fr(e){return e.vlans??{}}function ua(e){let t=e.defaults?.vxlan;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function yd(e){let t=Number(e.vxlan?.start_vni);if(Number.isFinite(t)&&t>0)return t;let n=Number(ua(e).start_vni);return Number.isFinite(n)&&n>0?n:1e5}function pa(e,t){let n=t?.vxlan??e.vxlan??{};return Array.isArray(n.vlans)&&n.vlans.length?n.vlans.map(String):Object.keys(Fr(e))}function la(e,t){e.vxlan||(e.vxlan={})}function da(e,t){let n=Fr(e);if(!Object.keys(n).length)return;let r=new Set;for(let c of Object.values(n))typeof c?.vni=="number"&&r.add(c.vni);let i=yd(e),s=i,o=pa(e);for(let c of o){let f=n[c];if(!f||f.vni===!1||typeof f.vni=="number")continue;let p=Number(f.id),l=Number.isFinite(p)?i+p:0;if(l>0&&!r.has(l))f.vni=l,r.add(l);else{for(;r.has(s);)s++;f.vni=s,r.add(s),s++}}let a=e.vxlan??{};(!Array.isArray(a.vlans)||!a.vlans.length)&&(a.vlans=o.filter(c=>typeof n[c]?.vni=="number")),e.vxlan=a}function vd(e,t){let r=e.loopback?.[t];if(typeof r=="string")return r.split("/")[0]}function ma(e,t){let n=e.vxlan??{},r=String(n.flooding??"static"),i=Fr(e);for(let s of Object.values(e.nodes??{})){if(!(s.module??[]).includes("vxlan"))continue;let o=s.vxlan??{};o.domain===void 0&&(o.domain=n.domain??"global"),o.flooding=r;let a=pa(e,s).filter(m=>typeof i[m]?.vni=="number");o.vlans=a;let c={...s.vlans??{}};for(let m of a){let u=i[m],d=c[m]??{},_=d.evpn??{},h=u.evpn&&typeof u.evpn=="object"&&!Array.isArray(u.evpn)?u.evpn:{};c[m]={...d,id:u.id,mode:u.mode,vni:u.vni,...Object.keys(h).length||Object.keys(_).length?{evpn:{...h,..._}}:{}}}Object.keys(c).length&&(s.vlans=c);let p=!!(n.use_v6_vtep??o.use_v6_vtep??ua(e).use_v6_vtep)?"ipv6":"ipv4",l=vd(s,p);if(l?(o.vtep=l,o.vtep_interface=String(s.loopback?.ifname??"lo"),o.transport=p):t.diagnostics.error({code:"MISSING",category:"MISSING",module:"vxlan",message:`VXLAN module needs an ${p.toUpperCase()} address on loopback of ${s.name}`,path:`nodes.${s.name}.loopback.${p}`}),String(o.flooding)==="static"){let m=Object.values(e.nodes??{}).filter(d=>d!==s&&(d.module??[]).includes("vxlan")),u=new Set;for(let d of a){let _=c[d];if(!_||typeof _.vni!="number")continue;let h=[];for(let g of m){let y=g.vxlan?.vtep;if(typeof y!="string"||y===l)continue;let b=g.vlans??{};Object.values(b).some(k=>k?.vni===_.vni)&&(h.push(y),u.add(y))}h.length&&(_.vtep_list=h)}u.size&&(o.vtep_list=[...u].sort())}s.vxlan=o}}var bd={name:fa,module_init:la,module_pre_transform:da,module_post_transform:ma},xd=bd;var jr={};te(jr,{default:()=>Ad,module_init:()=>_a,name:()=>ha,node_post_transform:()=>ga});var ha="ospf";function Ze(e){let t=e.ospf;if(!t||typeof t!="object"||Array.isArray(t))return;let n=t.area;typeof n!="number"||!Number.isInteger(n)||n<0||n>4294967295||(t.area=[24,16,8,0].map(r=>n>>>r&255).join("."))}function _a(e,t){e.ospf||(e.ospf={}),Ze(e);for(let n of Object.values(e.nodes??{})){Ze(n);for(let r of n.interfaces??[])Ze(r)}for(let n of e.links??[]){Ze(n);for(let r of n.interfaces??[])Ze(r)}}function ga(e,t,n){let r=e.ospf??{},i=t.ospf??{};if(r.area===void 0&&(r.area=i.area??"0.0.0.0"),!r.router_id){let a=e.loopback,c=typeof a?.ipv4=="string"?a.ipv4.split("/")[0]:void 0;r.router_id=c??`10.0.0.${e.id??1}`}let s=(e.interfaces??[]).some(a=>typeof a.ipv4=="string")||typeof e.loopback?.ipv4=="string",o=(e.interfaces??[]).some(a=>typeof a.ipv6=="string")||typeof e.loopback?.ipv6=="string";r.af={ipv4:s,ipv6:o};for(let a of e.interfaces??[]){if(Ze(a),a.role==="external"||a.ospf===!1){delete a.ospf;continue}let c=a.ospf??{};c.area===void 0&&(c.area=r.area),!c.network_type&&a.type==="p2p"&&(c.network_type="point-to-point"),a.role==="stub"||a.type==="stub"?c.passive===void 0&&(c.passive=!0):c.passive===void 0&&(c.passive=!1),a.ospf=c}if(e.loopback){let a=e.loopback,c=a.ospf??{};c.area===void 0&&(c.area=r.area),c.passive===void 0&&(c.passive=!1),a.ospf=c}e.ospf=r}var wd={name:ha,module_init:_a,node_post_transform:ga},Ad=wd;var Mr={};te(Mr,{default:()=>Id,module_init:()=>va,name:()=>ya,node_post_transform:()=>ba});var ya="isis";function va(e,t){e.isis||(e.isis={})}function ba(e,t,n){let r=e.isis??{},i=t.isis??{};if(r.area||(r.area=i.area??"49.0001"),r.type||(r.type=i.type??"level-2"),!r.net){let s=(e.id??1).toString(16).padStart(4,"0");r.net=`${r.area}.0000.0000.${s}.00`}for(let s of e.interfaces??[]){let o=s.isis??{};!o.network_type&&s.type==="p2p"&&(o.network_type="point-to-point"),s.isis=o}e.isis=r}var Sd={name:ya,module_init:va,node_post_transform:ba},Id=Sd;var Vr={};te(Vr,{default:()=>jd,link_pre_transform:()=>Ia,module_init:()=>Aa,module_post_transform:()=>Ea,name:()=>wa,node_post_transform:()=>Na,node_pre_transform:()=>Sa,processBgpAsList:()=>Br,processBgpVrfImports:()=>Yr});var wa="bgp",xa={ipv4:["ibgp","ebgp","localas_ibgp","confed_ebgp"],ipv6:["ibgp","ebgp","localas_ibgp","confed_ebgp"]},Ed={localas_ibgp:"ibgp"};function Br(e,t){let n=e.bgp?.as_list;if(!n||typeof n!="object"||Array.isArray(n))return;let r=new Map,i=s=>t.diagnostics.error({module:"bgp",code:"VALUE",category:"VALUE",message:s});for(let[s,o]of Object.entries(n)){let a=Number(s);if(!Number.isInteger(a)||a<1||a>4294967295||!o||typeof o!="object"||Array.isArray(o)||!Array.isArray(o.members)){i(`Invalid BGP AS list entry ${s}`);continue}let c=l=>{let m=new Set;for(let u of l){if(typeof u!="string"){i(`Invalid BGP AS ${s} member`);continue}let d=u.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,"."),_=Object.keys(e.nodes??{}).filter(h=>new RegExp(`^${d}$`).test(h));_.length||i(`Unknown BGP AS ${s} member ${u}`);for(let h of _)m.add(h)}return[...m]},f=c(o.members);o.members=f;let p=Array.isArray(o.rr)?c(o.rr):[];Array.isArray(o.rr)&&(o.rr=p);for(let l of f){let m=e.nodes[l],u=m.bgp??{};if(r.has(l)&&r.get(l)!==a||u.as!==void 0&&Number(u.as)!==a){i(`Node ${l} has conflicting BGP AS membership for ${a}`);continue}r.set(l,a),u.as=a,m.bgp=u}for(let l of p){if(!f.includes(l)){i(`Route reflector ${l} is not a member of AS ${a}`);continue}e.nodes[l].bgp.rr=!0}}}function Nd(e,t){let n=e.bgp?.confederation;if(!n||typeof n!="object"||Array.isArray(n))return;let r=new Map,i=s=>t.diagnostics.error({module:"bgp",code:"VALUE",category:"VALUE",message:s});for(let[s,o]of Object.entries(n)){let a=Number(s);if(!Number.isInteger(a)||a<1||a>4294967295||!o||typeof o!="object"||Array.isArray(o)||!Array.isArray(o.members)||!o.members.length){i(`Invalid BGP confederation ${s}`);continue}for(let c of o.members){if(typeof c!="number"||!Number.isInteger(c)||c<1||c>4294967295){i(`Invalid BGP confederation member ${String(c)}`);continue}if(r.has(c)||String(c)in n){i(`Conflicting BGP confederation member ${c}`);continue}r.set(c,a)}}for(let s of Object.values(e.nodes??{})){if(!(s.module??[]).includes("bgp"))continue;let o=s.bgp,a=Number(o?.as);String(a)in n&&i(`Node ${s.name} uses confederation AS ${a} as its BGP AS`);let c=r.get(a);if(c===void 0||!o)continue;if(!D(String(s.device)).features?.bgp?.confederation){i(`Device ${s.device} on node ${s.name} does not support BGP confederations`);continue}let p=n[String(c)];o.confederation={as:c,peers:p.members.filter(l=>l!==a)}}}function Aa(e,t){e.bgp||(e.bgp={})}function Sa(e,t,n){let r=e.bgp??{},i=t.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&n.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function Ia(e,t,n){let r=t.defaults?.bgp,i=String(t.bgp?.ebgp_role??r?.ebgp_role??"external");if(!i||e.vlan_name)return;let s=new Set;for(let o of e.interfaces??[]){let a=t.nodes?.[o.node];if(!a)continue;let c=Number(a.bgp?.as);Number.isFinite(c)&&c>0&&s.add(c);let f=Number(o.bgp?.local_as??a.bgp?.local_as??c);Number.isFinite(f)&&f>0&&s.add(f)}s.size>1&&!e.role&&(e.role=i)}function Ea(e,t){for(let n of Object.values(e.nodes??{})){if(!(n.module??[]).includes("bgp"))continue;let r=n.bgp??{};if(!r.router_id){let i=n.loopback;r.router_id=typeof i?.ipv4=="string"?i.ipv4.split("/")[0]:`10.0.0.${n.id??1}`}n.bgp=r}Td(e),Nd(e,t)}function Na(e,t,n){let r=e.bgp??{};if(!r.as){e.bgp=r;return}kd(e,t),Cd(e,t),Fd(e,t,n),$a(e,n),Pd(e),Rd(e),e.bgp=r}function Td(e){let t=new Set;for(let n of Object.values(e.nodes??{})){let r=Number(n.bgp?.as);Number.isFinite(r)&&t.add(r)}for(let n of t){let r=Ta(n,e);if(!r.length)continue;let i=r.filter(o=>o.bgp.rr_cluster_id===void 0).map(o=>String(o.bgp.router_id??"")),s=i.length?i.sort()[0]:void 0;for(let o of r){let a=o.bgp;a.rr_cluster_id===void 0&&(a.rr_cluster_id=s||a.router_id)}}}function Ta(e,t){return Object.values(t.nodes??{}).filter(n=>{let r=n.bgp;return r&&Number(r.as)===e&&r.rr})}function kd(e,t){let n=e.bgp,r=n.sessions??xa,i=[];n.neighbors=i,$d(e,r,t,i),Od(e,r,t,i);for(let o of["ipv4","ipv6"])i.some(a=>a[o]!==void 0)&&(n[o]=!0);let s=n.activate??xa;for(let o of i){let a={};for(let c of["ipv4","ipv6"])o[c]!==void 0&&n[c]&&(s[c]??[]).includes(String(o.type))&&(a[c]=!0);Object.keys(a).length&&(o.activate=a)}}function $d(e,t,n,r){let i=e.bgp,s=Number(i.as),o=!!i.rr,a=i.next_hop_self,c=i.rr_mesh!==!1,f=o?[]:Ta(s,n),p;o||f.length===0?(p=Object.values(n.nodes??{}).filter(l=>l.name===e.name?!1:Number(l.bgp?.as)===s),o&&!c&&(p=p.filter(l=>!l.bgp.rr||l.bgp.rr_mesh!==!1))):p=f;for(let l of p){let m=l.loopback??{},u={};l.bgp?.rr&&(u.rr=l.bgp.rr);let d=ka(l,m,"ibgp",t,u);d&&(e.loopback&&(d._source_intf=structuredClone(e.loopback)),a&&(d.next_hop_self="ebgp"),o&&!d.rr&&(d.rr_client=!0),r.push(d))}}function Od(e,t,n,r){let i=e.bgp,s=Number(i.as);for(let o of e.interfaces??[])if(!(o.bgp===!1||!(typeof o.ipv4=="string"||typeof o.ipv6=="string")))for(let c of o.neighbors??[]){let f=n.nodes?.[c.node];if(!f)continue;let p=f.bgp,l=Number(p?.as);if(!Number.isFinite(l)||l<=0)continue;let m=f.interfaces?.find(J=>o.linkindex!=null&&J.linkindex===o.linkindex&&(c.ifname==null||J.ifname===c.ifname)),u=o.bgp?.local_as??i.local_as,d=m?.bgp?.local_as??p?.local_as,_=Number(u??s),h=i.confederation,g=p?.confederation,y=h?.as!==void 0&&h.as===g?.as,b=Number(d??(g&&!y?g.as:l));if(!Number.isFinite(_)||!Number.isFinite(b)||b<=0||_===b)continue;let v={};typeof c.ipv4=="string"&&(v.ipv4=c.ipv4),typeof c.ipv6=="string"&&(v.ipv6=c.ipv6);let k={ifindex:o.ifindex??0},R=y?"confed_ebgp":"ebgp",N=ka(f,v,R,t,k);N&&(N.as=b,R==="confed_ebgp"&&i.next_hop_self&&(N.next_hop_self="all"),u!==void 0&&(N.local_as=_),r.push(N))}}function ka(e,t,n,r,i={}){let s={...i,name:e.name??"",as:e.bgp?.as,type:n},o=0;for(let a of["ipv4","ipv6"]){if(!(r[a]??[]).includes(n)||!(a in t))continue;o++;let c=t[a];typeof c=="boolean"?s[a]=c:typeof c=="string"&&(s[a]=c.split("/")[0])}return o>0?s:null}function Cd(e,t){let r=t.defaults?.bgp?.advertise_roles??["stub"],i=e.bgp,s=[...e.interfaces??[],...e.loopback?[e.loopback]:[]];for(let o of s){if(o.bgp===!1)continue;let a=o.bgp??{};if("advertise"in a){o.bgp=a;continue}let c=o.role,f=o.type;if(f&&r.includes(f)||c&&r.includes(c)){c!=="stub"?a.advertise=!0:a.advertise=Ld(o,t),o.bgp=a;continue}f==="loopback"&&i.advertise_loopback&&(a.advertise=!0,o.bgp=a)}}function Ld(e,t){for(let n of e.neighbors??[]){let r=t.nodes?.[n.node];if(r&&r.role!=="host")return!1}return!0}function Pd(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise.filter(i=>i&&typeof i=="object"):[];Array.isArray(t.advertise)||(t.advertise=n);let r=[...e.loopback?[e.loopback]:[],...e.interfaces??[]];for(let i of r){if(!i.bgp?.advertise)continue;let s={};for(let o of["ipv4","ipv6"])typeof i[o]=="string"&&(s[o]=qo(String(i[o])));Object.keys(s).length&&n.push(s)}n.length?t.advertise=n:delete t.advertise}function $a(e,t,n){let i=D(String(e.device)).features?.bgp?.import,s=(l,m)=>t.diagnostics.error({module:"bgp",code:"VALUE",category:"VALUE",message:l,path:m});function o(l,m){let u=l.import;if(u===void 0)return;let d;if(Array.isArray(u))d=u.map(h=>[String(h),!0]);else if(u&&typeof u=="object")d=Object.entries(u);else{s(`Invalid BGP route imports on node ${e.name}`,m);return}let _={};for(let[h,g]of d)if(g!==!1){if(!i||Array.isArray(i)&&!i.includes(h)){s(`Device ${e.device} cannot import ${h} routes into BGP on node ${e.name}`,m);continue}if(h==="bgp"||!(e.module??[]).includes(h)&&!["connected","static"].includes(h)){s(`Cannot import ${h} routes into BGP on node ${e.name}`,m);continue}if(g!==!0&&g!==null&&(typeof g!="object"||Array.isArray(g))){s(`Invalid BGP import of ${h} on node ${e.name}`,m);continue}_[h==="ripv2"?"rip":h]=g===!0||g===null?{}:g}l.import=_}if(!n){e.bgp&&typeof e.bgp=="object"&&o(e.bgp,`nodes.${e.name}.bgp.import`);return}if(!(e.module??[]).includes("bgp")||!e.bgp?.as)return;let a=e.vrfs,c=i===!0||Array.isArray(i)&&i.includes("vrf"),f=n.defaults?.const,p=Array.isArray(f?.vrf_igp_protocols)?f.vrf_igp_protocols:["connected"];for(let[l,m]of Object.entries(a??{})){if(m.bgp===!1)continue;(!m.bgp||typeof m.bgp!="object"||Array.isArray(m.bgp))&&(m.bgp={});let u=m.bgp,d=`nodes.${e.name}.vrfs.${l}.bgp.import`;if(u.import!==void 0){c?o(u,d):s(`Device ${e.device} cannot import routes into BGP in VRF ${l} on node ${e.name}`,d);continue}if(!c)continue;let _={};for(let h of p)typeof h=="string"&&(h!=="connected"&&!(h in m)||(_[h==="ripv2"?"rip":h]={auto:!0}));Object.keys(_).length&&(u.import=_)}}function Yr(e,t){for(let n of Object.values(e.nodes??{}))$a(n,t,e)}function Rd(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise:[];for(let r of["ipv4","ipv6"])t[r]||n.some(i=>r in i)&&(t[r]=!0)}function Fd(e,t,n){let r=e.bgp,i=r.community;if(!i||typeof i!="object")return;let s=Object.fromEntries(Object.entries(i).map(([f,p])=>[f,Array.isArray(p)?[...p]:p]));for(let[f,p]of Object.entries(Ed))!(f in s)&&p in s&&(s[f]=[...s[p]??[]]);t.bgp?.confederation&&!s.confed_ebgp&&s.ibgp&&(s.confed_ebgp=[...s.ibgp]);let a=D(String(e.device)).features?.bgp,c=a?.community&&typeof a.community=="object"?a.community:{standard:"standard",extended:"extended"};for(let[f,p]of Object.entries(s)){if(!Array.isArray(p))continue;let l=[];for(let m of p){let u=c[m];if(u===void 0){n.diagnostics.error({code:"VALUE",category:"VALUE",module:"bgp",message:`Invalid ${f} BGP community propagation keyword '${m}' for device ${e.device}/node ${e.name}`,path:`nodes.${e.name}.bgp.community.${f}`});continue}for(let d of Array.isArray(u)?u:[u])typeof d=="string"&&!l.includes(d)&&l.push(d)}s[f]=l}r.community=s}var Dd={name:wa,module_init:Aa,node_pre_transform:Sa,link_pre_transform:Ia,module_post_transform:Ea,node_post_transform:Na},jd=Dd;var Ur={};te(Ur,{name:()=>Md,node_post_transform:()=>Bd});var Md="mpls";function Bd(e,t,n){let r=e.mpls;if(!r||!r.ldp)return;(e.module??[]).some(o=>["ospf","isis","eigrp"].includes(o))||n.diagnostics.error({code:"VALUE",category:"VALUE",module:"mpls",message:`You cannot enable LDP on node ${e.name} without an IGP`,path:`nodes.${e.name}.mpls.ldp`});let i=typeof r.ldp=="object"?{...r.ldp}:{},s=e.loopback?.ipv4;typeof s=="string"&&(i.router_id??=s.split("/")[0]);for(let o of e.interfaces??[]){if(typeof o.ipv4!="string"||o.role==="external"||o.vrf)continue;let a=o.mpls;a?.ldp!==!1&&(o.ldp={...typeof a?.ldp=="object"?a.ldp:{},passive:o.type==="stub"||o.role==="stub"},i.af={ipv4:!0})}delete r.ldp,e.ldp=i}var qr={};te(qr,{default:()=>Ud,module_init:()=>La,module_pre_transform:()=>Pa,name:()=>Oa,node_post_transform:()=>Ra});var Oa="evpn";function Ca(e){return e.vlans??{}}function Gr(e){let t=e.defaults?.evpn;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Yd(e,t){let n=Number(t?.bgp?.as);if(Number.isFinite(n)&&n>0)return n;let r=Number(e.bgp?.as);if(Number.isFinite(r)&&r>0)return r;let i=Number(e.evpn?.as??Gr(e).as);if(Number.isFinite(i)&&i>0)return i}function La(e,t){e.evpn||(e.evpn={}),e.evpn.transport!=="mpls"&&e.evpn.transport!=="sr"&&(e.vxlan||(e.vxlan={}),e.vxlan.flooding="evpn")}function Pa(e,t){let n=Ca(e),r=e.evpn??{},i=Yd(e),s;Array.isArray(r.vlans)&&r.vlans.length?s=r.vlans.map(String):s=Object.entries(n).filter(([,o])=>typeof o?.vni=="number").map(([o])=>o),r.vlans=s;for(let o of s){let a=n[o];if(!a)continue;let c=a.evpn??{};c.evi===void 0&&(c.evi=a.id??0);let f=c.evi;if(i!==void 0){let p=`${i}:${f}`;c.import||(c.import=[p]),c.export||(c.export=[p])}a.evpn=c}e.evpn=r}function Ra(e,t,n){if(!(e.module??[]).includes("evpn"))return;let r=t.evpn??{},i=e.evpn??{};if(i.transport===void 0&&(i.transport=r.transport??Gr(t).transport??"vxlan"),!Array.isArray(i.session)||!i.session.length){let m=Gr(t).session;i.session=Array.isArray(r.session)?[...r.session]:Array.isArray(m)?[...m]:["ibgp"]}let s=Ca(t),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(s)).filter(m=>s[m]&&(i.transport!=="vxlan"||typeof s[m]?.vni=="number"));i.vlans=o;let a=String(e.bgp?.router_id??""),c={...e.vlans??{}};for(let m of o){let u=s[m],d=u.evpn??{},_={...c[m]??{},id:u.id,mode:u.mode,vni:u.vni,evpn:{...d}},h=d.evi;a&&h!==void 0&&_.evpn.rd===void 0&&(_.evpn.rd=`${a}:${h}`),c[m]=_}Object.keys(c).length&&(e.vlans=c);let f=new Set(i.session.map(String)),p=e.bgp??{},l=Array.isArray(p.neighbors)?p.neighbors:Array.isArray(p.neighbor)?p.neighbor:[];for(let m of l){let u=String(m.name??""),d=t.nodes?.[u];if(!d||!(d.module??[]).includes("evpn"))continue;let _=String(m.type??"");f.has(_)&&m.evpn===void 0&&(m.evpn="ipv4")}p.neighbors=l,delete p.neighbor,e.bgp=p,e.evpn=i}var Vd={name:Oa,module_init:La,module_pre_transform:Pa,node_post_transform:Ra},Ud=Vd;var Wr={};te(Wr,{name:()=>Gd,node_post_transform:()=>qd,processRoutingPolicies:()=>Kr});var Gd="routing";function w(e){return e&&typeof e=="object"&&!Array.isArray(e)?e:void 0}function O(e,t,n){e.diagnostics.error({module:"routing",code:"VALUE",category:"VALUE",path:`nodes.${t.name}.routing`,message:n})}function qd(e,t,n){let r=w(e.routing);if(!r)return;if(Array.isArray(r.static)){let s=w(w(t.routing)?.static),o=(a,c)=>a.flatMap(f=>{let p=w(f);if(!p||typeof p.include!="string")return[f];let l=p.include;if(c.includes(l))return O(n,e,`Recursive static route include ${l}`),[];let m=s?.[l];return m?o(Array.isArray(m)?m:[m],[...c,l]).map(d=>{let _=w(d);return _?{..._,...p.nexthop!==void 0?{nexthop:structuredClone(p.nexthop)}:{}}:d}):(O(n,e,`Unknown static route list ${l}`),[])});r.static=o(r.static,[]);for(let a of r.static){let c=w(a);if(!c){O(n,e,"Static route must be an object");continue}let f=w(c.nexthop);if(!f||typeof f.node!="string")continue;let p=f.node,l=(e.interfaces??[]).flatMap(u=>(u.neighbors??[]).filter(d=>d.node===p).map(d=>({intf:u,neighbor:d})));if(l.length===0){O(n,e,`Cannot resolve next-hop node ${p} on ${e.name}`);continue}let m=l.map(({intf:u,neighbor:d})=>{let _={};for(let h of["ipv4","ipv6"])typeof d[h]=="string"&&(_[h]=d[h].split("/")[0]);return u.ifname&&(_.intf=u.ifname),f.vrf&&(_.vrf=f.vrf),_}).filter(u=>u.ipv4||u.ipv6);if(!m.length){O(n,e,`No address for next-hop node ${p} on ${e.name}`);continue}f.nhlist=m;for(let u of["ipv4","ipv6"])m[0][u]!==void 0&&(f[u]=m[0][u])}}let i=w(r.prefix);if(i)for(let[s,o]of Object.entries(i)){let a=Array.isArray(o)?o:[o];i[s]=a.map((c,f)=>{let p=w(c);if(!p)return O(n,e,`Invalid prefix filter ${s}`),c;let l={sequence:(f+1)*10,action:"permit",...p};for(let m of["ipv4","ipv6"])typeof l[m]=="string"&&(l[m]=[l[m]]);if(typeof p.prefix=="string"){let m=w(t.prefix)?.[p.prefix],u=w(m);if(!u)O(n,e,`Unknown named prefix ${p.prefix}`);else{for(let d of["ipv4","ipv6"])u[d]!==void 0&&(l[d]=[u[d]]);delete l.prefix}}return l})}}function Kr(e,t){let n=w(e.routing)??{};for(let r of Object.values(e.nodes??{})){let i=[],s=l=>{let m=w(l?.import);for(let u of Object.values(m??{})){let d=w(u)?.policy;typeof d=="string"&&!i.includes(d)&&i.push(d)}};s(w(r.bgp));for(let l of Object.values(w(r.vrfs)??{}))s(w(w(l)?.bgp));if(i.length&&!(r.module??[]).includes("routing")){O(t,r,`Node ${r.name} requires the routing module for BGP import policies`);continue}let o=w(r.routing);if(!o&&i.length&&(r.routing=o={}),!o)continue;let a=w(o.policy);if(!a&&i.length&&(o.policy=a={}),!a)continue;let c=w(n.policy)??{};for(let l of i)if(!(a[l]!==void 0&&a[l]!==null)){if(c[l]===void 0||c[l]===null){O(t,r,`Global routing policy ${l} referenced on node ${r.name} does not exist`);continue}a[l]=structuredClone(c[l])}let f=w(w(D(String(r.device)).features)?.routing),p=w(f?.policy);for(let[l,m]of Object.entries(a)){m===null&&c[l]!==void 0&&(a[l]=structuredClone(c[l]));let u=a[l],d=Array.isArray(u)?u:[u],_=c[l];if(_&&u!==_){let g=Array.isArray(_)?_:[_],y=new Set(d.map((b,v)=>w(b)?.sequence??(v+1)*10));d=[...d,...g.map((b,v)=>{let k=w(b);return k?{sequence:(v+1)*10,...k}:b}).filter(b=>!y.has(w(b)?.sequence??-1))]}let h=[];for(let[g,y]of d.entries()){let b=w(y);if(!b){O(t,r,`Invalid routing policy ${l} on node ${r.name}`);continue}let v=structuredClone(b);for(let[L,H]of[["set",["locpref","med","weight","prepend"]],["match",["prefix","nexthop","aspath"]]])for(let j of H)if(j in v){let he=w(v[L])??{};he[j]=v[j],delete v[j],v[L]=he}let k=w(v.match);typeof k?.community=="string"&&(k.community={standard:k.community});let R=w(v.set);(typeof R?.prepend=="string"||typeof R?.prepend=="number")&&(R.prepend={path:String(R.prepend)});let N=w(R?.community);if(N?.delete||N?.delete_list){v.delete!==void 0&&O(t,r,`Routing policy ${l} mixes legacy community deletion and delete`);let L=w(v.delete)??{};if(N.delete_list)L.community={list:{standard:N.delete_list}};else{let H={...N};delete H.delete,L.community=H}v.delete=L,delete R.community}R&&Object.keys(R).length===0&&delete v.set;let J=w(w(v.delete)?.community);typeof J?.list=="string"&&(J.list={standard:J.list}),v.sequence??=(g+1)*10,v.action??="permit",(!Number.isInteger(v.sequence)||Number(v.sequence)<1||Number(v.sequence)>32767||!["permit","deny"].includes(String(v.action)))&&O(t,r,`Invalid action or sequence in routing policy ${l}`),v.action==="deny"&&(v.set!==void 0||v.delete!==void 0)&&O(t,r,`Deny rule in routing policy ${l} cannot set or delete attributes`);for(let[L,H]of[["locpref",4294967295],["med",32767],["weight",65535]]){let j=w(v.set)?.[L];j!==void 0&&(typeof j!="number"||!Number.isInteger(j)||j<0||j>H)&&O(t,r,`Invalid set.${L} in routing policy ${l}`)}let C=w(w(v.set)?.prepend);C&&(C.path!==void 0&&typeof C.path!="string"||C.count!==void 0&&(typeof C.count!="number"||!Number.isInteger(C.count)||C.count<1||C.count>32))&&O(t,r,`Invalid set.prepend in routing policy ${l}`);for(let L of["set","match","delete"]){let H=w(v[L]);if(v[L]!==void 0&&!H){O(t,r,`Invalid ${L} in routing policy ${l}`);continue}for(let[j,he]of Object.entries(H??{})){let ee=w(p?.[L])?.[j];if(!p||!ee){O(t,r,`Device ${r.device} does not support routing policy ${L}.${j} on node ${r.name}`);continue}let Te=w(ee),Qr=w(he);if(Te&&Qr)for(let Jr of Object.keys(Qr))Te[Jr]||O(t,r,`Device ${r.device} does not support routing policy ${L}.${j}.${Jr} on node ${r.name}`)}}h.push(v)}h.sort((g,y)=>Number(g.sequence)-Number(y.sequence)),new Set(h.map(g=>g.sequence)).size!==h.length&&O(t,r,`Duplicate sequence in routing policy ${l}`),a[l]=h;for(let g of h){let y=w(g.match),b=[["prefix",y?.prefix],["prefix",y?.nexthop],["aspath",y?.aspath],["community",y?.community],["community",w(w(g.delete)?.community)?.list]];for(let[v,k]of b){let R=typeof k=="string"?[k]:Object.values(w(k)??{}).filter(N=>typeof N=="string");for(let N of R){let J=w(n[v]),C=w(o[v]);if(C||(o[v]=C={}),C[N]===void 0||C[N]===null){if(J?.[N]===void 0||J[N]===null){O(t,r,`Routing ${v} ${N} referenced by policy ${l} does not exist`);continue}C[N]=structuredClone(J[N])}if(v==="prefix"&&C[N]!==null){let L=Array.isArray(C[N])?C[N]:[C[N]];C[N]=L.map((H,j)=>{let he=w(H);if(!he)return O(t,r,`Invalid prefix filter ${N}`),H;let Z={sequence:(j+1)*10,action:"permit",...he};if(typeof Z.prefix=="string"){let ee=w(w(e.prefix)?.[Z.prefix]);if(!ee)O(t,r,`Unknown named prefix ${Z.prefix}`);else{for(let Te of["ipv4","ipv6"])ee[Te]!==void 0&&(Z[Te]=[ee[Te]]);delete Z.prefix}}for(let ee of["ipv4","ipv6"])typeof Z[ee]=="string"&&(Z[ee]=[Z[ee]]);return Z})}}}}}}}function ie(e){let t=e.name;return{...e,requires:Rn(t),transform_after:Fn(t)}}var un=[ie(Lr),ie(Cr),ie(Rr),ie(Dr),ie(jr),ie(Mr),ie(Vr),ie(Ur),ie(qr),ie(Wr)];function pn(e,t="transform_after"){let n=new Map(un.map(c=>[c.name,c])),r=[],i=new Set,s=new Set;function o(c){return t==="config_after"?Hi(c):n.get(c)?.transform_after??Fn(c)}function a(c){if(s.has(c)||i.has(c))return;i.add(c);let f=n.get(c)?.requires??Rn(c);for(let p of[...f,...o(c)])e.includes(p)&&a(p);i.delete(c),s.add(c),r.push(c)}for(let c of e)a(c);return r}function bt(e,t="transform_after"){let n=new Set(e.module??[]);for(let r of Object.values(e.nodes??{}))for(let i of r.module??[])n.add(i);return pn([...n],t)}function Fa(e){let t=e.defaults??{},n=new Set(un.map(r=>r.name));for(let r of bt(e)){if(!n.has(r))continue;let i=t[r]??Me(r)??{},s=e[r]??{},o=E(zi(i),s);e[r]=o;for(let a of Object.values(e.nodes??{})){if(!(a.module??[]).includes(r))continue;let c=a[r]??{},f={...e[r]};if(r==="routing")for(let l of["static","policy","prefix","aspath","community","acl"])delete f[l];if(r==="bgp")for(let l of["as_list","confederation","rr_list","ebgp_role","advertise_roles"])delete f[l];let p=E(f,c);Object.keys(p).length!==0&&(a[r]=p)}}}function fe(e,t,n){let r=bt(t);for(let i of r){let s=un.find(a=>a.name===i);if(!s)continue;let o=s[e];if(typeof o=="function")if(e.startsWith("node_"))for(let a of Object.values(t.nodes??{}))(a.module??[]).includes(i)&&o(a,t,n);else if(e.startsWith("link_"))for(let a of t.links??[])o(a,t,n);else o(t,n)}}function Da(e){for(let t of Object.values(e.nodes??{}))for(let n of t.module??[]){let r=Xi(n);if(!r.length)continue;let i=t[n]??{};for(let s of t.interfaces??[]){if(s[n]===!1)continue;let o=s[n]??{};for(let a of r)o[a]===void 0&&i[a]!==void 0&&(o[a]=i[a]);(Object.keys(o).length>0||s[n]!==void 0)&&(s[n]=o)}}}function ja(e,t){let n=new Set(un.map(r=>r.name));for(let r of Object.values(e.nodes??{}))for(let i of r.module??[])n.has(i)||t.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${i} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(let r of e.module??[])n.has(r)||t.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${r}`,path:"module"})}function Ma(e,t){e.provider||(e.provider="clab"),e.provider!=="clab"&&t.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:"provider"})}function Ba(e,t){e.provider||(e.provider="clab")}function Ya(e){for(let t of Object.values(e.nodes??{}))t.device==="bird"&&Wd(t)}function Kd(e){return`(rt,${e.split(":").join(",")})`}function Wd(e){let t=e.vrfs;if(t)for(let n of Object.values(t))for(let r of["import","export"]){let i=n[r];Array.isArray(i)&&(n[`netlab-internal:_bird_${r}`]=i.map(s=>typeof s=="string"?Kd(s):s))}}function Va(e,t={}){let n=new tt,r=on(),i={diagnostics:n,devices:r};rt(e),Ma(e,i),Er(e),e.nodes=_t(e.nodes,n),Nr(e),$r(e),gt(e,n),Tr(e),Ko(e,n),Pr(e,i);for(let s of Object.values(e.nodes))s.loopback===!0&&(s.loopback={});for(let s of e.links??[]){if(typeof s.prefix!="string")continue;let o=s.prefix,a=e.prefix,c=a&&typeof a=="object"&&!Array.isArray(a)?a[o]:void 0;c&&typeof c=="object"&&!Array.isArray(c)?s.prefix=structuredClone(c):n.error({module:"links",code:"VALUE",category:"VALUE",message:`Unknown named prefix ${o}`})}if(Array.isArray(e.module)&&e.module.length>0)for(let s of Object.values(e.nodes))"module"in s||s.role==="host"&&!s["netlab-internal:_daemon"]||(s.module=[...e.module]);Br(e,i),Fa(e),kr(e),ja(e,n),fe("module_init",e,i),gr(e),t.afterSetup?.(e,i),fe("module_pre_transform",e,i),fe("node_pre_transform",e,i),wr(e),fe("link_pre_transform",e,i),Sr(e),fe("module_post_link_transform",e,i),fe("link_post_transform",e,i),fe("module_post_transform",e,i),Da(e),fe("node_post_transform",e,i),Yr(e,i),Kr(e,i),t.afterAddressed?.(e,i),Ya(e),Ba(e,i),e.module=bt(e,"config_after");for(let s of Object.values(e.nodes??{}))Array.isArray(s.module)&&s.module.length>0&&(s.module=pn(s.module,"config_after"));return t.afterTransformed?.(e,i),{topology:e,diagnostics:n,ctx:i}}function Ua(e,t={}){let n={},r=t.validate!==!1,i=(a,c,f)=>{if(!r)return;let p=dr(a,c,{yangDir:t.yangDir,diagnostics:f});n[c]=p.ok,t.snapshots?.set(c,structuredClone(a))},{topology:s,diagnostics:o}=Va(e,{afterSetup:(a,c)=>{let f=c.diagnostics;i(a,"user_input",f)}});return{topology:s,diagnostics:o,stages:n}}function zr(e,t={}){let n=Ua(e,{...t,cleanup:!1});return sn(n.topology),n}function Hr(e){return Array.isArray(e)?e.map(Hr):e&&typeof e=="object"?Object.fromEntries(Object.keys(e).sort().map(t=>[t,Hr(e[t])])):e}function Xr(e){let t=mr(e);delete t.defaults;let n=Object.entries(t.nodes??{}).map(([i,s])=>({...s,name:i})),r={...t,nodes:n,links:t.links??[]};return{topology:Hr(r)}}try{let e=process.env.GITHUB_WORKSPACE||process.cwd(),t=process.env.NETLAB_INPUT,n=process.env.NETLAB_OUTPUT||"topology.json";if(!t)throw new Error("The input topology path is required");let r=Ga(e,t),i=Ga(e,n);if(/[\r\n]/.test(i))throw new Error("Output path cannot contain a newline");if(r===i)throw new Error("Input and output paths must be different");let s=Jd(new URL("../yang/",import.meta.url)),o=zr(Yn(r),{validate:!0,yangDir:s});for(let c of o.diagnostics.list())console.error(`${c.severity}: ${c.message}`);if(o.diagnostics.hasErrors()||o.stages.user_input!==!0)throw new Error("Topology validation or transformation failed");let a=JSON.stringify(Xr(o.topology),null,2);Hd(Qd(i),{recursive:!0}),Xd(i,`${a}
`),process.env.GITHUB_OUTPUT&&zd(process.env.GITHUB_OUTPUT,`path=${i}
`),console.log(`Wrote ${i}`)}catch(e){console.error(`Error: ${e instanceof Error?e.message:String(e)}`),process.exitCode=1}
/*! For license information please see normalize-topology.mjs.LEGAL.txt */
