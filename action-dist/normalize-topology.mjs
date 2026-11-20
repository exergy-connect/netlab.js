import { createRequire as __createRequire } from "node:module"; const require = __createRequire(import.meta.url);
var ga=Object.create;var Xt=Object.defineProperty;var ya=Object.getOwnPropertyDescriptor;var va=Object.getOwnPropertyNames;var ba=Object.getPrototypeOf,xa=Object.prototype.hasOwnProperty;var wa=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}},te=(e,t)=>{for(var n in t)Xt(e,n,{get:t[n],enumerable:!0})},Sa=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of va(t))!xa.call(e,i)&&i!==n&&Xt(e,i,{get:()=>t[i],enumerable:!(r=ya(t,i))||r.enumerable});return e};var Aa=(e,t,n)=>(n=e!=null?ga(ba(e)):{},Sa(t||!e||!e.__esModule?Xt(n,"default",{value:e,enumerable:!0}):n,e));var fo=wa((co,Vt)=>{(function(e){"use strict";let t="(0?\\d+|0x[a-f0-9]+)",n={fourOctet:new RegExp(`^${t}\\.${t}\\.${t}\\.${t}$`,"i"),threeOctet:new RegExp(`^${t}\\.${t}\\.${t}$`,"i"),twoOctet:new RegExp(`^${t}\\.${t}$`,"i"),longValue:new RegExp(`^${t}$`,"i")},r=new RegExp("^0[0-7]+$","i"),i=new RegExp("^0x[a-f0-9]+$","i"),s="%[0-9a-z]{1,}",o="(?:[0-9a-f]+::?)+",a={zoneIndex:new RegExp(s,"i"),native:new RegExp(`^(::)?(${o})?([0-9a-f]+)?(::)?(${s})?$`,"i"),deprecatedTransitional:new RegExp(`^(?:::)(${t}\\.${t}\\.${t}\\.${t}(${s})?)$`,"i"),transitional:new RegExp(`^((?:${o})|(?:::)(?:${o})?)${t}\\.${t}\\.${t}\\.${t}(${s})?$`,"i")};function c(f,l){if(f.indexOf("::")!==f.lastIndexOf("::"))return null;let _=0,h=-1,g=(f.match(a.zoneIndex)||[])[0],y,b;for(g&&(g=g.substring(1),f=f.replace(/%.+$/,""));(h=f.indexOf(":",h+1))>=0;)_++;if(f.substr(0,2)==="::"&&_--,f.substr(-2,2)==="::"&&_--,_>l)return null;for(b=l-_,y=":";b--;)y+="0:";return f=f.replace("::",y),f[0]===":"&&(f=f.slice(1)),f[f.length-1]===":"&&(f=f.slice(0,-1)),l=(function(){let T=f.split(":"),j=[];for(let Ht=0;Ht<T.length;Ht++)j.push(parseInt(T[Ht],16));return j})(),{parts:l,zoneId:g}}function u(f,l,_,h){if(f.length!==l.length)throw new Error("ipaddr: cannot match CIDR for objects with different lengths");let g=0,y;for(;h>0;){if(y=_-h,y<0&&(y=0),f[g]>>y!==l[g]>>y)return!1;h-=_,g+=1}return!0}function p(f){if(i.test(f))return parseInt(f,16);if(f[0]==="0"&&!isNaN(parseInt(f[1],10))){if(r.test(f))return parseInt(f,8);throw new Error(`ipaddr: cannot parse ${f} as octal`)}return parseInt(f,10)}function d(f,l){for(;f.length<l;)f=`0${f}`;return f}let m={};m.IPv4=(function(){function f(l){if(l.length!==4)throw new Error("ipaddr: ipv4 octet count should be 4");let _,h;for(_=0;_<l.length;_++)if(h=l[_],!(0<=h&&h<=255))throw new Error("ipaddr: ipv4 octet should fit in 8 bits");this.octets=l}return f.prototype.SpecialRanges={unspecified:[[new f([0,0,0,0]),8]],broadcast:[[new f([255,255,255,255]),32]],multicast:[[new f([224,0,0,0]),4]],linkLocal:[[new f([169,254,0,0]),16]],loopback:[[new f([127,0,0,0]),8]],carrierGradeNat:[[new f([100,64,0,0]),10]],private:[[new f([10,0,0,0]),8],[new f([172,16,0,0]),12],[new f([192,168,0,0]),16]],reserved:[[new f([192,0,0,0]),24],[new f([192,0,2,0]),24],[new f([192,88,99,0]),24],[new f([198,18,0,0]),15],[new f([198,51,100,0]),24],[new f([203,0,113,0]),24],[new f([240,0,0,0]),4]],as112:[[new f([192,175,48,0]),24],[new f([192,31,196,0]),24]],amt:[[new f([192,52,193,0]),24]]},f.prototype.kind=function(){return"ipv4"},f.prototype.match=function(l,_){let h;if(_===void 0&&(h=l,l=h[0],_=h[1]),l.kind()!=="ipv4")throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");return u(this.octets,l.octets,8,_)},f.prototype.prefixLengthFromSubnetMask=function(){let l=0,_=!1,h={0:8,128:7,192:6,224:5,240:4,248:3,252:2,254:1,255:0},g,y,b;for(g=3;g>=0;g-=1)if(y=this.octets[g],y in h){if(b=h[y],_&&b!==0)return null;b!==8&&(_=!0),l+=b}else return null;return 32-l},f.prototype.range=function(){return m.subnetMatch(this,this.SpecialRanges)},f.prototype.toByteArray=function(){return this.octets.slice(0)},f.prototype.toIPv4MappedAddress=function(){return m.IPv6.parse(`::ffff:${this.toString()}`)},f.prototype.toNormalizedString=function(){return this.toString()},f.prototype.toString=function(){return this.octets.join(".")},f})(),m.IPv4.broadcastAddressFromCIDR=function(f){try{let l=this.parseCIDR(f),_=l[0].toByteArray(),h=this.subnetMaskFromPrefixLength(l[1]).toByteArray(),g=[],y=0;for(;y<4;)g.push(parseInt(_[y],10)|parseInt(h[y],10)^255),y++;return new this(g)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},m.IPv4.isIPv4=function(f){return this.parser(f)!==null},m.IPv4.isValid=function(f){try{return new this(this.parser(f)),!0}catch{return!1}},m.IPv4.isValidCIDR=function(f){try{return this.parseCIDR(f),!0}catch{return!1}},m.IPv4.isValidFourPartDecimal=function(f){return!!(m.IPv4.isValid(f)&&f.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/))},m.IPv4.isValidCIDRFourPartDecimal=function(f){let l=f.match(/^(.+)\/(\d+)$/);return!m.IPv4.isValidCIDR(f)||!l?!1:m.IPv4.isValidFourPartDecimal(l[1])},m.IPv4.networkAddressFromCIDR=function(f){let l,_,h,g,y;try{for(l=this.parseCIDR(f),h=l[0].toByteArray(),y=this.subnetMaskFromPrefixLength(l[1]).toByteArray(),g=[],_=0;_<4;)g.push(parseInt(h[_],10)&parseInt(y[_],10)),_++;return new this(g)}catch{throw new Error("ipaddr: the address does not have IPv4 CIDR format")}},m.IPv4.parse=function(f){let l=this.parser(f);if(l===null)throw new Error("ipaddr: string is not formatted like an IPv4 Address");return new this(l)},m.IPv4.parseCIDR=function(f){let l;if(l=f.match(/^(.+)\/(\d+)$/)){let _=parseInt(l[2]);if(_>=0&&_<=32){let h=[this.parse(l[1]),_];return Object.defineProperty(h,"toString",{value:function(){return this.join("/")}}),h}}throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range")},m.IPv4.parser=function(f){let l,_,h;if(l=f.match(n.fourOctet))return(function(){let g=l.slice(1,6),y=[];for(let b=0;b<g.length;b++)_=g[b],y.push(p(_));return y})();if(l=f.match(n.longValue)){if(h=p(l[1]),h>4294967295||h<0)throw new Error("ipaddr: address outside defined range");return(function(){let g=[],y;for(y=0;y<=24;y+=8)g.push(h>>y&255);return g})().reverse()}else return(l=f.match(n.twoOctet))?(function(){let g=l.slice(1,4),y=[];if(h=p(g[1]),h>16777215||h<0)throw new Error("ipaddr: address outside defined range");return y.push(p(g[0])),y.push(h>>16&255),y.push(h>>8&255),y.push(h&255),y})():(l=f.match(n.threeOctet))?(function(){let g=l.slice(1,5),y=[];if(h=p(g[2]),h>65535||h<0)throw new Error("ipaddr: address outside defined range");return y.push(p(g[0])),y.push(p(g[1])),y.push(h>>8&255),y.push(h&255),y})():null},m.IPv4.subnetMaskFromPrefixLength=function(f){if(f=parseInt(f),f<0||f>32)throw new Error("ipaddr: invalid IPv4 prefix length");let l=[0,0,0,0],_=0,h=Math.floor(f/8);for(;_<h;)l[_]=255,_++;return h<4&&(l[h]=Math.pow(2,f%8)-1<<8-f%8),new this(l)},m.IPv6=(function(){function f(l,_){let h,g;if(l.length===16)for(this.parts=[],h=0;h<=14;h+=2)this.parts.push(l[h]<<8|l[h+1]);else if(l.length===8)this.parts=l;else throw new Error("ipaddr: ipv6 part count should be 8 or 16");for(h=0;h<this.parts.length;h++)if(g=this.parts[h],!(0<=g&&g<=65535))throw new Error("ipaddr: ipv6 part should fit in 16 bits");_&&(this.zoneId=_)}return f.prototype.SpecialRanges={unspecified:[new f([0,0,0,0,0,0,0,0]),128],linkLocal:[new f([65152,0,0,0,0,0,0,0]),10],multicast:[new f([65280,0,0,0,0,0,0,0]),8],loopback:[new f([0,0,0,0,0,0,0,1]),128],uniqueLocal:[new f([64512,0,0,0,0,0,0,0]),7],ipv4Mapped:[new f([0,0,0,0,0,65535,0,0]),96],deprecatedSiteLocal:[new f([65216,0,0,0,0,0,0,0]),10],discard:[new f([256,0,0,0,0,0,0,0]),64],rfc6145:[new f([0,0,0,0,65535,0,0,0]),96],rfc6052:[[new f([100,65435,0,0,0,0,0,0]),96],[new f([100,65435,1,0,0,0,0,0]),48]],"6to4":[new f([8194,0,0,0,0,0,0,0]),16],teredo:[new f([8193,0,0,0,0,0,0,0]),32],benchmarking:[new f([8193,2,0,0,0,0,0,0]),48],amt:[new f([8193,3,0,0,0,0,0,0]),32],as112v6:[[new f([8193,4,274,0,0,0,0,0]),48],[new f([9760,79,32768,0,0,0,0,0]),48]],deprecatedOrchid:[new f([8193,16,0,0,0,0,0,0]),28],orchid2:[new f([8193,32,0,0,0,0,0,0]),28],droneRemoteIdProtocolEntityTags:[new f([8193,48,0,0,0,0,0,0]),28],segmentRouting:[new f([24320,0,0,0,0,0,0,0]),16],reserved:[[new f([8193,0,0,0,0,0,0,0]),23],[new f([8193,3512,0,0,0,0,0,0]),32],[new f([16383,0,0,0,0,0,0,0]),20]]},f.prototype.isIPv4MappedAddress=function(){return this.range()==="ipv4Mapped"},f.prototype.kind=function(){return"ipv6"},f.prototype.match=function(l,_){let h;if(_===void 0&&(h=l,l=h[0],_=h[1]),l.kind()!=="ipv6")throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");return u(this.parts,l.parts,16,_)},f.prototype.prefixLengthFromSubnetMask=function(){let l=0,_=!1,h={0:16,32768:15,49152:14,57344:13,61440:12,63488:11,64512:10,65024:9,65280:8,65408:7,65472:6,65504:5,65520:4,65528:3,65532:2,65534:1,65535:0},g,y;for(let b=7;b>=0;b-=1)if(g=this.parts[b],g in h){if(y=h[g],_&&y!==0)return null;y!==16&&(_=!0),l+=y}else return null;return 128-l},f.prototype.range=function(){return m.subnetMatch(this,this.SpecialRanges)},f.prototype.toByteArray=function(){let l,_=[],h=this.parts;for(let g=0;g<h.length;g++)l=h[g],_.push(l>>8),_.push(l&255);return _},f.prototype.toFixedLengthString=function(){let l=(function(){let h=[];for(let g=0;g<this.parts.length;g++)h.push(d(this.parts[g].toString(16),4));return h}).call(this).join(":"),_="";return this.zoneId&&(_=`%${this.zoneId}`),l+_},f.prototype.toIPv4Address=function(){if(!this.isIPv4MappedAddress())throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");let l=this.parts.slice(-2),_=l[0],h=l[1];return new m.IPv4([_>>8,_&255,h>>8,h&255])},f.prototype.toNormalizedString=function(){let l=(function(){let h=[];for(let g=0;g<this.parts.length;g++)h.push(this.parts[g].toString(16));return h}).call(this).join(":"),_="";return this.zoneId&&(_=`%${this.zoneId}`),l+_},f.prototype.toRFC5952String=function(){let l=/((^|:)(0(:|$)){2,})/g,_=this.toNormalizedString(),h=0,g=-1,y;for(;y=l.exec(_);)y[0].length>g&&(h=y.index,g=y[0].length);return g<0?_:`${_.substring(0,h)}::${_.substring(h+g)}`},f.prototype.toString=function(){return this.toRFC5952String()},f})(),m.IPv6.broadcastAddressFromCIDR=function(f){try{let l=this.parseCIDR(f),_=l[0].toByteArray(),h=this.subnetMaskFromPrefixLength(l[1]).toByteArray(),g=[],y=0;for(;y<16;)g.push(parseInt(_[y],10)|parseInt(h[y],10)^255),y++;return new this(g)}catch(l){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${l})`)}},m.IPv6.isIPv6=function(f){return this.parser(f)!==null},m.IPv6.isValid=function(f){if(typeof f=="string"&&f.indexOf(":")===-1)return!1;try{let l=this.parser(f);return new this(l.parts,l.zoneId),!0}catch{return!1}},m.IPv6.isValidCIDR=function(f){if(typeof f=="string"&&f.indexOf(":")===-1)return!1;try{return this.parseCIDR(f),!0}catch{return!1}},m.IPv6.networkAddressFromCIDR=function(f){let l,_,h,g,y;try{for(l=this.parseCIDR(f),h=l[0].toByteArray(),y=this.subnetMaskFromPrefixLength(l[1]).toByteArray(),g=[],_=0;_<16;)g.push(parseInt(h[_],10)&parseInt(y[_],10)),_++;return new this(g)}catch(b){throw new Error(`ipaddr: the address does not have IPv6 CIDR format (${b})`)}},m.IPv6.parse=function(f){let l=this.parser(f);if(l.parts===null)throw new Error("ipaddr: string is not formatted like an IPv6 Address");return new this(l.parts,l.zoneId)},m.IPv6.parseCIDR=function(f){let l,_,h;if((_=f.match(/^(.+)\/(\d+)$/))&&(l=parseInt(_[2]),l>=0&&l<=128))return h=[this.parse(_[1]),l],Object.defineProperty(h,"toString",{value:function(){return this.join("/")}}),h;throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range")},m.IPv6.parser=function(f){let l,_,h,g,y,b;if(h=f.match(a.deprecatedTransitional))return this.parser(`::ffff:${h[1]}`);if(a.native.test(f))return c(f,8);if((h=f.match(a.transitional))&&(b=h[6]||"",l=h[1],h[1].endsWith("::")||(l=l.slice(0,-1)),l=c(l+b,6),l.parts)){for(y=[parseInt(h[2]),parseInt(h[3]),parseInt(h[4]),parseInt(h[5])],_=0;_<y.length;_++)if(g=y[_],!(0<=g&&g<=255))return null;return l.parts.push(y[0]<<8|y[1]),l.parts.push(y[2]<<8|y[3]),{parts:l.parts,zoneId:l.zoneId}}return null},m.IPv6.subnetMaskFromPrefixLength=function(f){if(f=parseInt(f),f<0||f>128)throw new Error("ipaddr: invalid IPv6 prefix length");let l=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],_=0,h=Math.floor(f/8);for(;_<h;)l[_]=255,_++;return h<16&&(l[h]=Math.pow(2,f%8)-1<<8-f%8),new this(l)},m.fromByteArray=function(f){let l=f.length;if(l===4)return new m.IPv4(f);if(l===16)return new m.IPv6(f);throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address")},m.isValid=function(f){return m.IPv6.isValid(f)||m.IPv4.isValid(f)},m.isValidCIDR=function(f){return m.IPv6.isValidCIDR(f)||m.IPv4.isValidCIDR(f)},m.parse=function(f){if(m.IPv6.isValid(f))return m.IPv6.parse(f);if(m.IPv4.isValid(f))return m.IPv4.parse(f);throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format")},m.parseCIDR=function(f){try{return m.IPv6.parseCIDR(f)}catch{try{return m.IPv4.parseCIDR(f)}catch{throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format")}}},m.process=function(f){let l=this.parse(f);return l.kind()==="ipv6"&&l.isIPv4MappedAddress()?l.toIPv4Address():l},m.subnetMatch=function(f,l,_){let h,g,y,b;_==null&&(_="unicast");for(g in l)if(Object.prototype.hasOwnProperty.call(l,g)){for(y=l[g],y[0]&&!(y[0]instanceof Array)&&(y=[y]),h=0;h<y.length;h++)if(b=y[h],f.kind()===b[0].kind()&&f.match.apply(f,b))return g}return _},typeof Vt<"u"&&Vt.exports?Vt.exports=m:e.ipaddr=m})(co)});import{appendFileSync as ud,mkdirSync as pd,writeFileSync as ld}from"node:fs";import{dirname as dd,resolve as _a}from"node:path";import{fileURLToPath as md}from"node:url";var Y="netlab-internal",F=`${Y}:_linkname`,je=["none","linux","frr","bird","iosv"];function Tr(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function I(e,t){let n=new Set(Array.isArray(e._removed_attr)?e._removed_attr:[]),r={...e};for(let[i,s]of Object.entries(t)){if(i==="_removed_attr"){let a=Array.isArray(s)?s:[];r._removed_attr=[...n,...a.filter(c=>!n.has(c))];continue}if(n.has(i))continue;let o=r[i];Tr(o)&&Tr(s)?r[i]=I(o,s):r[i]=Nr(s)}return r}function Nr(e){return structuredClone(e)}function kr(e,t){return I(e,t)}function it(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function he(e){if(Array.isArray(e))return e.map(n=>he(n));if(!it(e))return e;let t={};for(let[n,r]of Object.entries(e))Ia(t,n,he(r));return t}function Ia(e,t,n){if(!t.includes(".")){Or(e,t,n);return}let r=t.split("."),i=e;for(let s=0;s<r.length-1;s++){let o=r[s],a=i[o];(a==null||!it(a))&&(i[o]={}),i=i[o]}Or(i,r[r.length-1],n)}function Or(e,t,n){let r=e[t];it(r)&&it(n)?e[t]=I(r,n):e[t]=n}function Qt(e){let t=he(e);for(let n of Object.keys(e))delete e[n];Object.assign(e,t)}var Be=class{items=[];error(t){this.items.push({...t,severity:"error"})}warning(t){this.items.push({...t,severity:"warning"})}hasErrors(){return this.items.some(t=>t.severity==="error")}list(){return[...this.items]}clear(){this.items=[]}};function st(e,t){let n=e.toLowerCase(),r="VALUE",i="VALUE";return n.includes("missing")||n.includes("required")||n.includes("mandatory")?(r="MISSING",i="MISSING"):n.includes("type")||n.includes("pattern")||n.includes("range")?(r="TYPE",i="TYPE"):n.includes("unknown")||n.includes("not allowed")||n.includes("unexpected")?(r="ATTR",i="ATTR"):n.includes("leafref")||n.includes("instance")?(r="VALUE",i="VALUE"):n.includes("depend")&&(r="DEPEND",i="DEPEND"),{code:i,category:r,module:"xyang",message:e,path:t}}import qf from"node:fs";var w=Symbol("NOT_RESOLVED");function C(e,t){return{tagName:e,nodeKind:"scalar",implicit:t.implicit??!1,matchByTagPrefix:t.matchByTagPrefix??!1,implicitFirstChars:t.implicitFirstChars??null,resolve:t.resolve,identify:t.identify,represent:t.represent??(n=>String(n)),representTagName:t.representTagName??(()=>e)}}function pn(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"sequence",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addItem:t.addItem,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify,represent:t.represent??(r=>r),representTagName:t.representTagName??(()=>e)}}function ft(e,t){let n=t.finalize===void 0;return{tagName:e,nodeKind:"mapping",implicit:!1,matchByTagPrefix:t.matchByTagPrefix??!1,create:t.create,addPair:t.addPair,has:t.has,keys:t.keys,get:t.get,finalize:t.finalize??(r=>r),carrierIsResult:n,identify:t.identify,represent:t.represent??(r=>r),representTagName:t.representTagName??(()=>e)}}var Ea=C("tag:yaml.org,2002:str",{resolve:e=>e,identify:e=>typeof e=="string"}),Ta=["","~","null","Null","NULL"],Na=C("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>Ta.indexOf(e)!==-1?null:w,identify:e=>e===null,represent:()=>"null"}),ka=C("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(e,t)=>e==="null"||t&&e===""?null:w,identify:e=>e===null,represent:()=>"null"}),Oa=["","~","null","Null","NULL"],Ca=C("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:e=>Oa.indexOf(e)!==-1?null:w,identify:e=>e===null,represent:()=>"null"}),$a=["true","True","TRUE"],La=["false","False","FALSE"],Pa=C("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:e=>$a.indexOf(e)!==-1?!0:La.indexOf(e)!==-1?!1:w,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Ra=["true"],Fa=["false"],Da=C("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:e=>Ra.indexOf(e)!==-1?!0:Fa.indexOf(e)!==-1?!1:w,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Ma=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],ja=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],Ba=C("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:e=>Ma.indexOf(e)!==-1?!0:ja.indexOf(e)!==-1?!1:w,identify:e=>Object.prototype.toString.call(e)==="[object Boolean]",represent:e=>e?"true":"false"}),Ya=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),Ua=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Va(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function Ga(e,t){if(t){if(!Ua.test(e))return w}else if(!Ya.test(e))return w;let n=Va(e);return Number.isFinite(n)?n:w}var Kr=C("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Ga,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Ka=new RegExp("^-?(?:0|[1-9][0-9]*)$"),qa=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function Wa(e){let t=e,n=1;return(t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b")?n*parseInt(t.slice(2),2):t.startsWith("0o")?n*parseInt(t.slice(2),8):t.startsWith("0x")?n*parseInt(t.slice(2),16):n*parseInt(t,10)}function za(e,t){if(t){if(!qa.test(e))return w}else if(!Ka.test(e))return w;let n=Wa(e);return Number.isFinite(n)?n:w}var Ha=C("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:za,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Xa=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function Qa(e){let t=e.replace(/_/g,""),n=1;if((t[0]==="-"||t[0]==="+")&&(t[0]==="-"&&(n=-1),t=t.slice(1)),t.startsWith("0b"))return n*parseInt(t.slice(2),2);if(t.startsWith("0x"))return n*parseInt(t.slice(2),16);if(t.includes(":")){let r=0;for(let i of t.split(":"))r=r*60+Number(i);return n*r}return t!=="0"&&t[0]==="0"?n*parseInt(t,8):n*parseInt(t,10)}function Ja(e){if(!Xa.test(e))return w;let t=Qa(e);return Number.isFinite(t)?t:w}var sn=C("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:Ja,identify:e=>Number.isInteger(e)&&!Object.is(e,-0)&&e.toString(10).indexOf("e")<0,represent:e=>e.toString(10)}),Za=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),ec=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function tc(e){if(!Za.test(e))return w;let t=e.toLowerCase(),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=n*parseFloat(t);return Number.isFinite(r)||ec.test(e)?r:w}function nc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var qr=C("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:tc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:nc}),rc=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),ic=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function sc(e,t){if(t){if(!ic.test(e))return w;let r=e.toLowerCase(),i=r[0]==="-"?-1:1;if("+-".includes(r[0])&&(r=r.slice(1)),r===".inf")return i===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(r===".nan")return NaN;let s=i*parseFloat(r);return Number.isFinite(s)?s:w}if(!rc.test(e))return w;let n=Number(e);return Number.isFinite(n)?n:w}function oc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var ac=C("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:sc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:oc}),cc=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),fc=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function uc(e){if(!cc.test(e))return w;let t=e.toLowerCase().replace(/_/g,""),n=t[0]==="-"?-1:1;if("+-".includes(t[0])&&(t=t.slice(1)),t===".inf")return n===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(t===".nan")return NaN;let r=0;if(t.includes(":")){for(let i of t.split(":"))r=r*60+Number(i);r*=n}else r=n*parseFloat(t);return Number.isFinite(r)||fc.test(e)?r:w}function pc(e){if(isNaN(e))return".nan";if(e===Number.POSITIVE_INFINITY)return".inf";if(e===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(e,-0))return"-0.0";let t=e.toString(10);return/^[-+]?[0-9]+e/.test(t)?t.replace("e",".e"):t}var on=C("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:uc,identify:e=>typeof e=="number"&&(!Number.isInteger(e)||Object.is(e,-0)||e.toString(10).indexOf("e")>=0),represent:pc}),lc=C("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(e,t)=>e==="<<"||t&&e===""?"<<":w,identify:()=>!1}),dc=/^[A-Za-z0-9+/]*={0,2}$/;function mc(e){let t=e.replace(/\s/g,"");if(t.length%4!==0||!dc.test(t))return w;let n=atob(t),r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}function hc(e){let t="";for(let n=0;n<e.length;n++)t+=String.fromCharCode(e[n]);return btoa(t)}var _c=C("tag:yaml.org,2002:binary",{resolve:mc,identify:e=>Object.prototype.toString.call(e)==="[object Uint8Array]",represent:hc}),gc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),yc=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Cr(e,t,n,r=0,i=0,s=0,o=0){let a=new Date(Date.UTC(e,t,n,r,i,s,o));return a.setUTCFullYear(e,t,n),a}function vc(e){let t=gc.exec(e);if(t===null&&(t=yc.exec(e)),t===null)return w;let n=+t[1],r=+t[2]-1,i=+t[3];if(!t[4]){let p=Cr(n,r,i);return p.getUTCFullYear()!==n||p.getUTCMonth()!==r||p.getUTCDate()!==i?w:p}let s=+t[4],o=+t[5],a=+t[6],c=0;if(s>23||o>59||a>59)return w;if(t[7]){let p=t[7].slice(0,3);for(;p.length<3;)p+="0";c=+p}let u=Cr(n,r,i,s,o,a,c);if(u.getUTCFullYear()!==n||u.getUTCMonth()!==r||u.getUTCDate()!==i)return w;if(t[9]){let p=+t[10],d=+(t[11]||0);if(p>23||d>59)return w;let m=(p*60+d)*6e4;u.setTime(u.getTime()-(t[9]==="-"?-m:m))}return u}var bc=C("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:vc,identify:e=>e instanceof Date,represent:e=>e.toISOString()}),xc=pn("tag:yaml.org,2002:seq",{create:()=>[],addItem:(e,t)=>{e.push(t)},identify:Array.isArray});function ut(e){if(e===null||typeof e!="object"||Array.isArray(e))return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function $r(e,t){let n={};for(let r of t)e[r]!==void 0&&(n[r]=e[r]);return n}var wc=pn("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(e,t)=>{let n;if(t instanceof Map){if(t.size!==1)return"cannot resolve an ordered map item";n=t.keys().next().value}else if(ut(t)){let r=Object.keys(t);if(r.length!==1)return"cannot resolve an ordered map item";n=r[0]}else return"cannot resolve an ordered map item";return e.seen.has(n)?"duplicate key in ordered map":(e.seen.add(n),e.list.push(t),"")},finalize:e=>e.list,identify:()=>!1}),Sc=pn("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(e,t)=>{if(t instanceof Map)return t.size!==1?"cannot resolve a pairs item":(e.push(t.entries().next().value),"");if(Object.prototype.toString.call(t)!=="[object Object]")return"cannot resolve a pairs item";let n=t,r=Object.keys(n);return r.length!==1?"cannot resolve a pairs item":(e.push([r[0],n[r[0]]]),"")},identify:()=>!1}),Ac=ft("tag:yaml.org,2002:map",{create:()=>({}),identify:ut,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{if(t!==null&&typeof t=="object")return"object-based map does not support complex keys";let r=String(t);return r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,""},has:(e,t)=>t!==null&&typeof t=="object"?!1:Object.prototype.hasOwnProperty.call(e,String(t)),keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),Ic=ft("tag:yaml.org,2002:set",{create:()=>new Set,identify:e=>e instanceof Set,represent:e=>{let t=new Map;for(let n of e)t.set(n,null);return t},addPair:(e,t,n)=>n!==null?"cannot resolve a set item":(e.add(t),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:()=>null});function Ec(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Tc(){return{scalar:[],sequence:[],mapping:[]}}function Nc(e){let t=[];for(let n of e){let r=t.length;for(let i=0;i<t.length;i++){let s=t[i];if(s.nodeKind===n.nodeKind&&s.tagName===n.tagName&&s.matchByTagPrefix===n.matchByTagPrefix){r=i;break}}t[r]=n}return t}var pt=class Wr{tags;implicitScalarTags;implicitScalarByFirstChar;implicitScalarAnyFirstChar;defaultScalarTag;defaultSequenceTag;defaultMappingTag;exact;prefix;constructor(t){let n=Nc(t),r=[],i=Ec(),s=Tc();for(let p of n){if(p.nodeKind==="scalar"&&p.implicit){if(p.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");r.push(p)}switch(p.nodeKind){case"scalar":p.matchByTagPrefix?s.scalar.push(p):i.scalar[p.tagName]=p;break;case"sequence":p.matchByTagPrefix?s.sequence.push(p):i.sequence[p.tagName]=p;break;case"mapping":p.matchByTagPrefix?s.mapping.push(p):i.mapping[p.tagName]=p}}let o=r.filter(p=>p.implicitFirstChars===null),a=new Set;for(let p of r)if(p.implicitFirstChars!==null)for(let d of p.implicitFirstChars)a.add(d);let c=new Map;for(let p of a)c.set(p,r.filter(d=>d.implicitFirstChars===null||d.implicitFirstChars.indexOf(p)!==-1));let u=i.scalar["tag:yaml.org,2002:str"];if(!u)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=n,this.implicitScalarTags=r,this.implicitScalarByFirstChar=c,this.implicitScalarAnyFirstChar=o,this.defaultScalarTag=u,this.defaultSequenceTag=i.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=i.mapping["tag:yaml.org,2002:map"],this.exact=i,this.prefix=s}lookupScalarTag(t){let n=this.exact.scalar[t];if(n)return n;for(let r of this.prefix.scalar)if(t.startsWith(r.tagName))return r}lookupSequenceTag(t){let n=this.exact.sequence[t];if(n)return n;for(let r of this.prefix.sequence)if(t.startsWith(r.tagName))return r}lookupMappingTag(t){let n=this.exact.mapping[t];if(n)return n;for(let r of this.prefix.mapping)if(t.startsWith(r.tagName))return r}resolveImplicitScalarTag(t){let n=this.implicitScalarByFirstChar.get(t.charAt(0))??this.implicitScalarAnyFirstChar;for(let i of n){let s=i.resolve(t,!1,i.tagName);if(s!==w)return{value:s,tag:i}}let r=this.defaultScalarTag;return{value:r.resolve(t,!1,r.tagName),tag:r}}withTags(...t){let n=[];for(let r of t)n=n.concat(r);return new Wr([...this.tags,...n])}},ln=new pt([Ea,xc,Ac]),wd=new pt([...ln.tags,ka,Da,Ha,ac]),kc=new pt([...ln.tags,Na,Pa,Kr,qr]),Oc=new pt([...ln.tags,Ca,Ba,sn,on,bc,lc,_c,wc,Sc,Ic]),Cc=Oc.withTags({...sn,resolve:(e,t,n)=>{let r=sn.resolve(e,t,n);return r===w?Kr.resolve(e,t,n):r}},{...on,resolve:(e,t,n)=>{let r=on.resolve(e,t,n);return r===w?qr.resolve(e,t,n):r}}),Sd=ft("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(e,t,n)=>(e.set(t,n),""),has:(e,t)=>e.has(t),keys:e=>e.keys(),get:(e,t)=>e.get(t),identify:e=>e instanceof Map||ut(e),represent:e=>{if(e instanceof Map)return e;let t=new Map,n=e;for(let r of Object.keys(n))t.set(r,n[r]);return t}});function Lr(e){if(Array.isArray(e)){let t=Array.prototype.slice.call(e);for(let n=0;n<t.length;n++){if(Array.isArray(t[n]))return null;typeof t[n]=="object"&&Object.prototype.toString.call(t[n])==="[object Object]"&&(t[n]="[object Object]")}return String(t)}return typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"?"[object Object]":String(e)}var Ad=ft("tag:yaml.org,2002:map",{create:()=>({}),identify:ut,represent:e=>{let t=new Map;for(let n of Object.keys(e))t.set(n,e[n]);return t},addPair:(e,t,n)=>{let r=Lr(t);return r===null?"nested arrays are not supported inside keys":(r==="__proto__"?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,"")},has:(e,t)=>{let n=Lr(t);return n!==null&&Object.prototype.hasOwnProperty.call(e,n)},keys:e=>Object.keys(e),get:(e,t)=>{let n=String(t);return Object.prototype.hasOwnProperty.call(e,n)?e[n]:null}}),$c={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function Jt(e,t,n,r,i){let s="",o="",a=Math.floor(i/2)-1;return r-t>a&&(s=" ... ",t=r-a+s.length),n-r>a&&(o=" ...",n=r+a-o.length),{str:s+e.slice(t,n).replace(/\t/g,"\u2192")+o,pos:r-t+s.length}}function Zt(e,t){return" ".repeat(Math.max(t-e.length,0))+e}function Lc(e,t){if(!e.buffer)return null;let n={...$c,...t},r=/\r?\n|\r|\0/g,i=[0],s=[],o,a=-1;for(;o=r.exec(e.buffer);)s.push(o.index),i.push(o.index+o[0].length),e.position<=o.index&&a<0&&(a=i.length-2);a<0&&(a=i.length-1);let c="",u=Math.min(e.line+n.linesAfter,s.length).toString().length,p=n.maxLength-(n.indent+u+3);for(let m=1;m<=n.linesBefore&&!(a-m<0);m++){let f=Jt(e.buffer,i[a-m],s[a-m],e.position-(i[a]-i[a-m]),p);c=`${" ".repeat(n.indent)}${Zt((e.line-m+1).toString(),u)} | ${f.str}
${c}`}let d=Jt(e.buffer,i[a],s[a],e.position,p);c+=`${" ".repeat(n.indent)}${Zt((e.line+1).toString(),u)} | ${d.str}
`,c+=`${"-".repeat(n.indent+u+3+d.pos)}^
`;for(let m=1;m<=n.linesAfter&&!(a+m>=s.length);m++){let f=Jt(e.buffer,i[a+m],s[a+m],e.position-(i[a]-i[a+m]),p);c+=`${" ".repeat(n.indent)}${Zt((e.line+m+1).toString(),u)} | ${f.str}
`}return c.replace(/\n$/,"")}function Pr(e,t){let n="";return e.mark?(e.mark.name&&(n+=`in "${e.mark.name}" `),n+=`(${e.mark.line+1}:${e.mark.column+1})`,!t&&e.mark.snippet&&(n+=`

${e.mark.snippet}`),`${e.reason} ${n}`):e.reason}var ne=class zr extends Error{reason;mark;constructor(t,n){super(),this.name="YAMLException",this.reason=t,this.mark=n,this.message=Pr(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(t){return`${this.name}: ${Pr(this,t)}`}static throwAt(t,n,r,i=""){let s=0,o=0;for(let c=0;c<n;c++){let u=t.charCodeAt(c);u===10?(s++,o=c+1):u===13&&(s++,t.charCodeAt(c+1)===10&&c++,o=c+1)}let a={name:i,buffer:t,position:n,line:s,column:n-o};throw a.snippet=Lc(a),new zr(r,a)}},E={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},x={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},z={BLOCK:1,FLOW:2},D={CLIP:1,STRIP:2,KEEP:3},Pc=-1;function Rr(e){switch(e){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Hr=new Array(256),Xr=new Array(256);for(let e=0;e<256;e++)Hr[e]=Rr(e)?1:0,Xr[e]=Rr(e);function Rc(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}function Fc(e){return e>=48&&e<=57?e-48:(e|32)-97+10}function Dc(e){return e===120?2:e===117?4:8}function ot(e,t,n){let r=0;for(;t<n;){let i=e.charCodeAt(t);if(i===10)r++,t++;else if(i===13)r++,t++,e.charCodeAt(t)===10&&t++;else if(i===32||i===9)t++;else break}return{position:t,breaks:r}}function dn(e){return e===1?" ":`
`.repeat(e-1)}function Mc(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===10||a===13){r+=e.slice(s,o);let c=ot(e,i,n);r+=dn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,o)}function jc(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===39)r+=e.slice(s,i)+"'",i+=2,s=o=i;else if(a===10||a===13){r+=e.slice(s,o);let c=ot(e,i,n);r+=dn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,n)}function Bc(e,t,n){let r="",i=t,s=t,o=t;for(;i<n;){let a=e.charCodeAt(i);if(a===92){r+=e.slice(s,i),i++;let c=e.charCodeAt(i);if(c===10||c===13)i=ot(e,i,n).position;else if(c<256&&Hr[c])r+=Xr[c],i++;else{let u=Dc(c),p=0;for(;u>0;u--){i++;let d=Fc(e.charCodeAt(i));p=(p<<4)+d}r+=Rc(p),i++}s=o=i}else if(a===10||a===13){r+=e.slice(s,o);let c=ot(e,i,n);r+=dn(c.breaks),i=s=o=c.position}else i++,a!==32&&a!==9&&(o=i)}return r+e.slice(s,n)}function Fr(e,t,n,r,i,s){let o=r<0?0:r,a=e.slice(t,n).replace(/\r\n?/g,`
`),c=a===""?[]:(a.endsWith(`
`)?a.slice(0,-1):a).split(`
`),u="",p=!1,d=0,m=!1;for(let f of c){let l=0;for(;l<o&&f.charCodeAt(l)===32;)l++;if(r<0||l>=f.length){d++;continue}let _=f.slice(o),h=_.charCodeAt(0);s?h===32||h===9?(m=!0,u+=`
`.repeat(p?1+d:d)):m?(m=!1,u+=`
`.repeat(d+1)):d===0?p&&(u+=" "):u+=`
`.repeat(d):u+=`
`.repeat(p?1+d:d),u+=_,p=!0,d=0}return i===D.KEEP?u+=`
`.repeat(p?1+d:d):i!==D.STRIP&&p&&(u+=`
`),u}function Yc(e,t){if(t.valueStart===Pc)return"";let{valueStart:n,valueEnd:r}=t;if(t.fast)return e.slice(n,r);switch(t.style){case x.SINGLE_QUOTED:return jc(e,n,r);case x.DOUBLE_QUOTED:return Bc(e,n,r);case x.LITERAL_BLOCK:return Fr(e,n,r,t.indent,t.chomping,!1);case x.FOLDED_BLOCK:return Fr(e,n,r,t.indent,t.chomping,!0);default:return Mc(e,n,r)}}var Uc=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"}),Vc="-#;/?:@&=+$_.~*'()",Id=Vc+"!,[]";function en(e){let t="",n=0;for(;n<e.length;){if(e.charCodeAt(n)!==37){t+=e[n++];continue}let r=parseInt(e.slice(n+1,n+3),16);if(n+=3,r>=192){let i=r<224?1:r<240?2:3;for(r&=(1<<6-i)-1;i-- >0;)r=r<<6|parseInt(e.slice(n+1,n+3),16)&63,n+=3}r<65536?t+=String.fromCharCode(r):(r-=65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023))}return t}function Qr(e,t){if(e.startsWith("!<")&&e.endsWith(">"))return en(e.slice(2,-1));let n=e.indexOf("!",1),r=n===-1?"!":e.slice(0,n+1);return en(t?.[r]??Uc[r]??r)+en(e.slice(r.length))}var _e=-1,Gc="tag:yaml.org,2002:merge",mn={filename:"",schema:kc,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function Kc(e){return"tagStart"in e&&e.tagStart!==_e?e.tagStart:"anchorStart"in e&&e.anchorStart!==_e?e.anchorStart:"valueStart"in e&&e.valueStart!==_e?e.valueStart:"start"in e?e.start:0}function k(e,t){ne.throwAt(e.source,e.position,t,e.filename)}function Jr(e,t,n,r){try{return n.finalize(r)}catch(i){if(i instanceof ne)throw i;ne.throwAt(e.source,t,i instanceof Error?i.message:String(i),e.filename)}}function qc(e,t){let n=Yc(e.source,t),r=t.tagStart===_e?"":e.source.slice(t.tagStart,t.tagEnd),i=e.schema.defaultScalarTag;if(r!==""){if(r==="!")return{value:n,tag:i};let s=Qr(r,e.tagHandlers),o=e.schema.lookupScalarTag(s);if(o){let c=o.resolve(n,!0,s);return c===w&&k(e,`cannot resolve a node with !<${s}> explicit tag`),{value:c,tag:o}}let a=e.schema.lookupMappingTag(s)??e.schema.lookupSequenceTag(s);if(a){n!==""&&k(e,`cannot resolve a node with !<${s}> explicit tag`);let c=a.create(s);return{value:a.carrierIsResult?c:Jr(e,e.position,a,c),tag:a}}k(e,`unknown scalar tag !<${s}>`)}return t.style===x.PLAIN?e.schema.resolveImplicitScalarTag(n):{value:i.resolve(n,!1,i.tagName),tag:i}}function Dr(e,t,n){let r=t.tagStart===_e?"":e.source.slice(t.tagStart,t.tagEnd);return r===""||r==="!"?n:Qr(r,e.tagHandlers)}function Zr(e){return e.nodeKind==="mapping"}function Mr(e){e.totalMergeKeys++,e.maxTotalMergeKeys!==-1&&e.totalMergeKeys>e.maxTotalMergeKeys&&k(e,`merge keys exceeded maxTotalMergeKeys (${e.maxTotalMergeKeys})`)}function jr(e,t,n,r){Mr(e);for(let i of r.keys(n)){if(Mr(e),t.tag.has(t.value,i))continue;let s=t.tag.addPair(t.value,i,r.get(n,i));s&&k(e,s),t.overridable??=new Set,t.overridable.add(i)}}function Wc(e,t,n,r){if(e.position=t.keyPosition,Zr(r))jr(e,t,n,r);else if(r.nodeKind==="sequence"&&Array.isArray(n)){n.length>100&&k(e,"abnormal merge sequence size");for(let i of n){let s=e.nodeTags.get(i);s||k(e,"cannot merge mappings; the provided source object is unacceptable"),jr(e,t,i,s)}}else k(e,"cannot merge mappings; the provided source object is unacceptable")}function zc(e,t,n,r,i){if(e.position=t.keyPosition,t.keyIsMerge){Wc(e,t,r,i);return}!e.json&&t.tag.has(t.value,n)&&!t.overridable?.has(n)&&k(e,"duplicated mapping key");let s=t.tag.addPair(t.value,n,r);s&&k(e,s),t.overridable?.delete(n)}function tn(e,t,n){let r=e.frames[e.frames.length-1];if(r.kind==="document")r.value=t,r.hasValue=!0;else if(r.kind==="sequence"){Zr(n)&&e.nodeTags.set(t,n);let i=r.tag.addItem(r.value,t,r.index++);i&&k(e,i)}else if(r.hasKey){let i=r.key;r.key=void 0,r.hasKey=!1,zc(e,r,i,t,n)}else r.key=t,r.keyPosition=e.position,r.hasKey=!0,r.keyIsMerge=n.tagName===Gc}function nn(e,t,n,r,i){if(t.anchorStart!==_e){let s={value:n,tag:r,isValueFinal:i};return e.anchors.set(e.source.slice(t.anchorStart,t.anchorEnd),s),s}return null}function Hc(e,t){let n={...mn,...t,events:e,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;n.eventIndex<n.events.length;){let r=n.events[n.eventIndex++];switch(n.position=Kc(r),r.type){case E.DOCUMENT:n.anchors=new Map,n.nodeTags=new Map,n.aliasCount=0,n.tagHandlers=Object.create(null);for(let i of r.directives)i.kind==="tag"&&(n.tagHandlers[i.handle]=i.prefix);n.frames.push({kind:"document",position:n.position,value:void 0,hasValue:!1});break;case E.SCALAR:{let{value:i,tag:s}=qc(n,r);nn(n,r,i,s,!0),tn(n,i,s);break}case E.SEQUENCE:{let i=Dr(n,r,"tag:yaml.org,2002:seq"),s=n.schema.lookupSequenceTag(i);s||k(n,`unknown sequence tag !<${i}>`);let o=s.create(i),a=nn(n,r,o,s,s.carrierIsResult);n.frames.push({kind:"sequence",position:n.position,value:o,tag:s,anchor:a,index:0});break}case E.MAPPING:{let i=Dr(n,r,"tag:yaml.org,2002:map"),s=n.schema.lookupMappingTag(i);s||k(n,`unknown mapping tag !<${i}>`);let o=s.create(i),a=nn(n,r,o,s,s.carrierIsResult);n.frames.push({kind:"mapping",position:n.position,value:o,tag:s,anchor:a,key:void 0,keyPosition:n.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case E.ALIAS:{n.maxAliases!==-1&&++n.aliasCount>n.maxAliases&&k(n,`aliases exceeded maxAliases (${n.maxAliases})`);let i=n.source.slice(r.anchorStart,r.anchorEnd),s=n.anchors.get(i);s||k(n,`unidentified alias "${i}"`),s.isValueFinal||k(n,`recursive alias "${i}" is not supported for tag ${s.tag.tagName} because it uses finalize()`),tn(n,s.value,s.tag);break}case E.POP:{let i=n.frames.pop();if(i.kind==="mapping"&&i.hasKey&&(n.position=i.keyPosition,k(n,"incomplete mapping pair in event stream")),i.kind==="document")n.documents.push(i.value);else{let s=i.tag.carrierIsResult?i.value:Jr(n,i.position,i.tag,i.value);i.anchor&&(i.anchor.value=s,i.anchor.isValueFinal=!0),tn(n,s,i.tag)}break}}}return n.documents}var S=-1,ei=Object.prototype.hasOwnProperty,be=1,ti=2,ni=3,at=4,Xc=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,Qc=/[,\[\]{}]/,ri=/^(?:!|!!|![0-9A-Za-z-]+!)$/,an=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,ii=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,Jc=new RegExp(`^(?:${an})*$`),Zc=new RegExp(`^(?:${ii})+$`),ef=new RegExp(`^(?:!(?:${an})*|${ii}(?:${an})*)$`),hn={filename:"",maxDepth:100};function tf(e,t,n){e.events.push({type:E.DOCUMENT,explicitStart:t,explicitEnd:n,directives:e.directives})}function si(e,t,n,r,i,s,o){e.events.push({type:E.SEQUENCE,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:s,style:o})}function oi(e,t,n,r,i,s,o){e.events.push({type:E.MAPPING,start:t,anchorStart:n,anchorEnd:r,tagStart:i,tagEnd:s,style:o})}function Br(e,t){e.events.splice(t.eventsLength,0,{type:E.MAPPING,start:t.position,anchorStart:S,anchorEnd:S,tagStart:S,tagEnd:S,style:z.FLOW})}function Se(e,t,n,r,i,s,o,a,c=D.CLIP,u=-1,p=!1){e.events.push({type:E.SCALAR,valueStart:t,valueEnd:n,anchorStart:r,anchorEnd:i,tagStart:s,tagEnd:o,style:a,chomping:c,indent:u,fast:p})}function nf(e,t,n){e.events.push({type:E.ALIAS,anchorStart:t,anchorEnd:n})}function ge(e){e.events.push({type:E.POP})}function $(e){Se(e,S,S,S,S,S,S,x.PLAIN)}function Yr(){return{anchorStart:S,anchorEnd:S,tagStart:S,tagEnd:S}}function ye(e){return{position:e.position,line:e.line,lineStart:e.lineStart,lineIndent:e.lineIndent,firstTabInLine:e.firstTabInLine,eventsLength:e.events.length}}function ve(e,t){e.position=t.position,e.line=t.line,e.lineStart=t.lineStart,e.lineIndent=t.lineIndent,e.firstTabInLine=t.firstTabInLine,e.events.length=t.eventsLength}function v(e,t){ne.throwAt(e.input.slice(0,e.length),e.position,t,e.filename)}function N(e){return e===10||e===13}function Ae(e){return e===9||e===32}function B(e){return Ae(e)||N(e)}function V(e){return e===0||B(e)}function re(e){return e===44||e===91||e===93||e===123||e===125}function rf(e){return e>=48&&e<=57?e-48:-1}function sf(e){if(e>=48&&e<=57)return e-48;let t=e|32;return t>=97&&t<=102?t-97+10:-1}function of(e){return e===120?2:e===117?4:e===85?8:0}function af(e){return e===48||e===97||e===98||e===116||e===9||e===110||e===118||e===102||e===114||e===101||e===32||e===34||e===47||e===92||e===78||e===95||e===76||e===80}function ct(e){e.input.charCodeAt(e.position)===10?e.position++:(e.position++,e.input.charCodeAt(e.position)===10&&e.position++),e.line++,e.lineStart=e.position,e.lineIndent=0,e.firstTabInLine=-1}function O(e,t){let n=0,r=e.input.charCodeAt(e.position),i=e.position===e.lineStart||B(e.input.charCodeAt(e.position-1));for(;r!==0;){for(;Ae(r);)i=!0,r===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),r=e.input.charCodeAt(++e.position);if(t&&i&&r===35)do r=e.input.charCodeAt(++e.position);while(!N(r)&&r!==0);if(!N(r))break;for(ct(e),n++,i=!0,r=e.input.charCodeAt(e.position);r===32;)e.lineIndent++,r=e.input.charCodeAt(++e.position)}return n}function xe(e,t=e.position){let n=e.input.charCodeAt(t);if((n===45||n===46)&&n===e.input.charCodeAt(t+1)&&n===e.input.charCodeAt(t+2)){let r=e.input.charCodeAt(t+3);return r===0||B(r)}return!1}function ai(e){e.position===e.lineStart&&e.input.charCodeAt(e.position)===65279&&(e.position++,e.lineStart=e.position)}function _n(e){if(e.position!==e.lineStart)return!1;if(xe(e))return!0;if(e.input.charCodeAt(e.position)!==65279)return!1;let t=ye(e);ai(e),O(e,!0);let n=e.input.charCodeAt(e.position),r=e.position===e.lineStart&&(n===37||n===45&&xe(e));return ve(e,t),r}function Ur(e){let t=e.input.charCodeAt(e.position);for(;t!==0&&!N(t);)t=e.input.charCodeAt(++e.position)}function ci(e,t,n){let r=Xc.exec(e.input.slice(t,n));r!==null&&(e.position=t+r.index+r[0].length-1,v(e,"the stream contains non-printable characters"))}function cf(e,t,n){if(e.input.charCodeAt(e.position)!==33)return!1;t.tagStart!==S&&v(e,"duplication of a tag property");let r=e.position,i=!1,s=!1,o="!",a=e.input.charCodeAt(++e.position);a===60?(i=!0,a=e.input.charCodeAt(++e.position)):a===33&&(s=!0,o="!!",a=e.input.charCodeAt(++e.position));let c=e.position,u;if(i){for(;a!==0&&a!==62;)a=e.input.charCodeAt(++e.position);a!==62&&v(e,"unexpected end of the stream within a verbatim tag"),u=e.input.slice(c,e.position),e.position++}else{for(;a!==0&&!B(a)&&!(n&&re(a));)a===33&&(s?v(e,"tag suffix cannot contain exclamation marks"):(o=e.input.slice(c-1,e.position+1),ri.test(o)||v(e,"named tag handle cannot contain such characters"),s=!0,c=e.position+1)),a=e.input.charCodeAt(++e.position);u=e.input.slice(c,e.position),Qc.test(u)&&v(e,"tag suffix cannot contain flow indicator characters")}return u&&!(i?Jc.test(u):Zc.test(u))&&v(e,`tag name cannot contain such characters: ${u}`),!i&&o!=="!"&&o!=="!!"&&!ei.call(e.tagHandlers,o)&&v(e,`undeclared tag handle "${o}"`),t.tagStart=r,t.tagEnd=e.position,!0}function ff(e,t){if(e.input.charCodeAt(e.position)!==38)return!1;t.anchorStart!==S&&v(e,"duplication of an anchor property"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!B(e.input.charCodeAt(e.position))&&!re(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&v(e,"name of an anchor node must contain at least one character"),t.anchorStart=n,t.anchorEnd=e.position,!0}function uf(e,t){if(e.input.charCodeAt(e.position)!==42)return!1;(t.anchorStart!==S||t.tagStart!==S)&&v(e,"alias node should not have any properties"),e.position++;let n=e.position;for(;e.input.charCodeAt(e.position)!==0&&!B(e.input.charCodeAt(e.position))&&!re(e.input.charCodeAt(e.position));)e.position++;return e.position===n&&v(e,"name of an alias node must contain at least one character"),nf(e,n,e.position),!0}function cn(e,t){O(e,!1),e.lineIndent<t&&v(e,"deficient indentation")}function pf(e,t,n){if(e.input.charCodeAt(e.position)!==39)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let s=e.input.charCodeAt(e.position);if(s===39){if(e.input.charCodeAt(e.position+1)===39){i=!1,e.position+=2;continue}let o=e.position;return e.position++,Se(e,r,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,x.SINGLE_QUOTED,D.CLIP,-1,i),!0}N(s)?(i=!1,cn(e,t)):e.position===e.lineStart&&xe(e)?v(e,"unexpected end of the document within a single quoted scalar"):s!==9&&s<32?v(e,"expected valid JSON character"):e.position++}v(e,"unexpected end of the stream within a single quoted scalar")}function lf(e,t,n){if(e.input.charCodeAt(e.position)!==34)return!1;e.position++;let r=e.position,i=!0;for(;e.input.charCodeAt(e.position)!==0;){let s=e.input.charCodeAt(e.position);if(s===34){let o=e.position;return e.position++,Se(e,r,o,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,x.DOUBLE_QUOTED,D.CLIP,-1,i),!0}if(s===92){i=!1;let o=e.input.charCodeAt(++e.position);if(N(o))cn(e,t);else if(af(o))e.position++;else{let a=of(o);for(a===0&&v(e,"unknown escape sequence");a-- >0;)e.position++,sf(e.input.charCodeAt(e.position))<0&&v(e,"expected hexadecimal character");e.position++}}else N(s)?(i=!1,cn(e,t)):e.position===e.lineStart&&xe(e)?v(e,"unexpected end of the document within a double quoted scalar"):s!==9&&s<32?v(e,"expected valid JSON character"):e.position++}v(e,"unexpected end of the stream within a double quoted scalar")}function df(e,t,n){let r=e.input.charCodeAt(e.position),i=D.CLIP,s=-1,o=!1;if(r!==124&&r!==62)return!1;let a=r===124?x.LITERAL_BLOCK:x.FOLDED_BLOCK;for(e.position++;e.input.charCodeAt(e.position)!==0;){let f=e.input.charCodeAt(e.position),l=rf(f);if(f===43||f===45)i!==D.CLIP&&v(e,"repeat of a chomping mode identifier"),i=f===43?D.KEEP:D.STRIP,e.position++;else if(l>=0)l===0&&v(e,"bad explicit indentation width of a block scalar; it cannot be less than one"),o&&v(e,"repeat of an indentation width identifier"),s=t+l-1,o=!0,e.position++;else break}let c=!1;for(;Ae(e.input.charCodeAt(e.position));)c=!0,e.position++;c&&e.input.charCodeAt(e.position)===35&&Ur(e),N(e.input.charCodeAt(e.position))?ct(e):e.input.charCodeAt(e.position)!==0&&v(e,"a line break is expected");let u=o?s:-1,p=0,d=e.position,m=e.position;for(;e.input.charCodeAt(e.position)!==0;){let f=e.position,l=0;for(;e.input.charCodeAt(f+l)===32;)l++;let _=e.input.charCodeAt(f+l);if(_===0){u>=0?l>u&&(m=f+l):l>0&&(m=f+l);break}if(_n(e))break;if(!o&&u===-1&&N(_)&&(p=Math.max(p,l)),!o&&u===-1&&!N(_)&&(_===9&&l<t&&(e.position=f+l,v(e,"tab characters must not be used in indentation")),l>=t&&l<p&&(e.position=f+l,v(e,"bad indentation of a mapping entry"))),u===-1&&_!==0&&!N(_)&&l<t){e.lineIndent=l,e.position=f+l;break}!o&&_!==0&&!N(_)&&u===-1&&(u=l);let h=u===-1?t+1:u;if(_!==0&&!N(_)&&l<h){e.lineIndent=l,e.position=f+l;break}Ur(e),m=e.position,N(e.input.charCodeAt(e.position))&&(ct(e),m=e.position)}return ci(e,d,m),Se(e,d,m,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,a,i,u),!0}function mf(e,t){let n=e.input.charCodeAt(e.position),r=t===be;if(n===0||B(n)||n===35||n===38||n===42||n===33||n===124||n===62||n===39||n===34||n===37||n===64||n===96||re(n))return!1;if(n===63||n===45){let i=e.input.charCodeAt(e.position+1);if(V(i)||r&&re(i))return!1}return!0}function hf(e,t,n,r){if(!mf(e,n))return!1;let i=e.position,s=e.position,o=e.input.charCodeAt(e.position),a=n===be,c=!1;for(;o!==0&&!_n(e);){if(o===58){let u=e.input.charCodeAt(e.position+1);if(V(u)||a&&re(u))break}else if(o===35){if(B(e.input.charCodeAt(e.position-1)))break}else{if(a&&re(o))break;if(N(o)){let u=e.position,p=e.line,d=e.lineStart,m=e.lineIndent;if(O(e,!1),e.lineIndent>=t){c=!0,o=e.input.charCodeAt(e.position);continue}e.position=u,e.line=p,e.lineStart=d,e.lineIndent=m;break}}Ae(o)||(s=e.position+1),o=e.input.charCodeAt(++e.position)}return s===i?!1:(ci(e,i,s),Se(e,i,s,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,x.PLAIN,D.CLIP,-1,!c),!0)}function Ye(e,t){let n=e.line;O(e,!0),(e.line>n&&e.lineIndent<t||e.firstTabInLine!==-1&&e.lineIndent<t)&&v(e,"deficient indentation")}function _f(e,t,n){let r=e.input.charCodeAt(e.position),i=r===123,s=e.position,o=!0;if(r!==91&&r!==123)return!1;let a=i?125:93;for(i?oi(e,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,z.FLOW):si(e,s,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,z.FLOW),e.position++;e.input.charCodeAt(e.position)!==0;){Ye(e,t);let c=e.input.charCodeAt(e.position);if(c===a)return e.position++,ge(e),!0;o?c===44&&v(e,"expected the node content, but found ','"):v(e,"missed comma between flow collection entries");let u=!1,p=!1;c===63&&B(e.input.charCodeAt(e.position+1))&&(u=p=!0,e.position+=1,Ye(e,t));let d=e.line,m=ye(e),f=we(e,t,be,!1,!0);Ye(e,t),c=e.input.charCodeAt(e.position),(i||p||e.line===d)&&c===58?(u=!0,e.position++,Ye(e,t),i||Br(e,m),f||$(e),we(e,t,be,!1,!0)||$(e),Ye(e,t),i||ge(e)):i&&u?(f||$(e),$(e)):i?$(e):u&&(Br(e,m),f||$(e),$(e),ge(e)),c=e.input.charCodeAt(e.position),c===44?(o=!0,e.position++):o=!1}v(e,"unexpected end of the stream within a flow collection")}function Vr(e,t,n){if(e.firstTabInLine!==-1||e.input.charCodeAt(e.position)!==45||!V(e.input.charCodeAt(e.position+1)))return!1;for(si(e,e.position,n.anchorStart,n.anchorEnd,n.tagStart,n.tagEnd,z.BLOCK);e.input.charCodeAt(e.position)===45&&V(e.input.charCodeAt(e.position+1));){e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,v(e,"tab characters must not be used in indentation"));let r=e.line;e.position++;let i=O(e,!0)>0;if(e.firstTabInLine!==-1&&e.input.charCodeAt(e.position)===45&&V(e.input.charCodeAt(e.position+1))&&v(e,"bad indentation of a sequence entry"),i&&e.lineIndent<=t?$(e):we(e,t,ni,!1,!0),O(e,!0),e.lineIndent<t||e.position>=e.length)break;e.lineIndent>t&&v(e,"bad indentation of a sequence entry"),e.line===r&&e.input.charCodeAt(e.position)===45&&V(e.input.charCodeAt(e.position+1))&&v(e,"bad indentation of a sequence entry")}return ge(e),!0}function rn(e,t,n,r){let i=!1,s=!1,o=!1,a=!1;if(e.firstTabInLine!==-1)return!1;let c=e.input.charCodeAt(e.position);for(;c!==0;){!i&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,v(e,"tab characters must not be used in indentation"));let u=e.input.charCodeAt(e.position+1),p=e.line;if((c===63||c===58)&&V(u))o||(oi(e,e.position,r.anchorStart,r.anchorEnd,r.tagStart,r.tagEnd,z.BLOCK),o=!0),c===63?(i&&$(e),s=!0,i=!0):(i||($(e),s=!0),i=!1),e.position+=1,a=!0;else{i&&($(e),i=!1);let d=ye(e);if(!we(e,n,ti,!1,!0))break;if(e.line===p){for(c=e.input.charCodeAt(e.position);Ae(c);)c=e.input.charCodeAt(++e.position);if(c===58)c=e.input.charCodeAt(++e.position),V(c)||v(e,"a whitespace character is expected after the key-value separator within a block mapping"),o||(e.events.splice(d.eventsLength,0,{type:E.MAPPING,start:d.position,anchorStart:r.anchorStart,anchorEnd:r.anchorEnd,tagStart:r.tagStart,tagEnd:r.tagEnd,style:z.BLOCK}),o=!0),s=!0,i=!1,a=!1;else if(s)v(e,"expected ':' after a mapping key");else return r.anchorStart!==S||r.tagStart!==S?(ve(e,d),!1):!0}else if(s)v(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return r.anchorStart!==S||r.tagStart!==S?(ve(e,d),!1):!0}if(we(e,t,at,!0,a)&&(a=!1),i||a&&($(e),a=!1),O(e,!0),c=e.input.charCodeAt(e.position),(e.line===p||e.lineIndent>t)&&c!==0)v(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return s?(i&&$(e),o&&ge(e),!0):!1}function we(e,t,n,r,i,s=!0){e.depth>=e.maxDepth&&v(e,`nesting exceeded maxDepth (${e.maxDepth})`),e.depth++;let o=1,a=!1,c=!1,u=null,p=Yr(),d=n===at||n===ni,m=d,f=d;if(r&&O(e,!0)&&(a=!0,e.lineIndent>t?o=1:e.lineIndent===t?o=0:o=-1),o===1)for(;;){let l=e.input.charCodeAt(e.position),_=ye(e);if(a&&o!==1&&(l===33||l===38))break;if(a&&f&&(p.tagStart!==S||p.anchorStart!==S)&&(l===33||l===38)){let h=ye(e),g=t+1;if(rn(e,e.position-e.lineStart,g,p)&&e.events[h.eventsLength]?.type===E.MAPPING)return e.depth--,!0;ve(e,h)}if(a&&(l===33&&p.tagStart!==S||l===38&&p.anchorStart!==S)||!cf(e,p,n===be)&&!ff(e,p))break;u===null&&(u=_),O(e,!0)?(a=!0,m=f,e.lineIndent>t?o=1:e.lineIndent===t?o=0:o=-1):m=!1}if(m&&(m=a||i),o===1||n===at){let l=n===be||n===ti?t:t+1,_=e.position-e.lineStart;if(o===1)if(m&&(Vr(e,_,p)||rn(e,_,l,p))||_f(e,l,p))c=!0;else{let h=e.input.charCodeAt(e.position);if(u!==null&&s&&f&&!m&&h!==124&&h!==62){let g=ye(e),y=u.position-u.lineStart;ve(e,u),rn(e,y,l,Yr())&&e.events[g.eventsLength]?.type===E.MAPPING?c=!0:ve(e,g)}!c&&(d&&df(e,l,p)||pf(e,l,p)||lf(e,l,p)||uf(e,p)||hf(e,l,n,p))&&(c=!0)}else o===0&&(c=m&&Vr(e,_,p))}return d=d&&!c,!c&&(p.anchorStart!==S||p.tagStart!==S||d)&&(Se(e,S,S,p.anchorStart,p.anchorEnd,p.tagStart,p.tagEnd,x.PLAIN),c=!0),e.depth--,c||p.anchorStart!==S||p.tagStart!==S}function gf(e){if(e.lineIndent>0||e.input.charCodeAt(e.position)!==37)return!1;e.position++;let t=e.position;for(;e.input.charCodeAt(e.position)!==0&&!B(e.input.charCodeAt(e.position));)e.position++;let n=e.input.slice(t,e.position),r=[];for(n.length===0&&v(e,"directive name must not be less than one character in length");e.input.charCodeAt(e.position)!==0&&!N(e.input.charCodeAt(e.position));){for(;Ae(e.input.charCodeAt(e.position));)e.position++;if(e.input.charCodeAt(e.position)===35||N(e.input.charCodeAt(e.position))||e.input.charCodeAt(e.position)===0)break;let i=e.position;for(;e.input.charCodeAt(e.position)!==0&&!B(e.input.charCodeAt(e.position));)e.position++;r.push(e.input.slice(i,e.position))}if(N(e.input.charCodeAt(e.position))&&ct(e),n==="YAML"){e.directives.some(s=>s.kind==="yaml")&&v(e,"duplication of %YAML directive"),r.length!==1&&v(e,"YAML directive accepts exactly one argument");let i=/^([0-9]+)\.([0-9]+)$/.exec(r[0]);i===null&&v(e,"ill-formed argument of the YAML directive"),parseInt(i[1],10)!==1&&v(e,"unacceptable YAML version of the document"),e.directives.push({kind:"yaml",version:r[0]})}else if(n==="TAG"){r.length!==2&&v(e,"TAG directive accepts exactly two arguments");let[i,s]=r;ri.test(i)||v(e,"ill-formed tag handle (first argument) of the TAG directive"),ei.call(e.tagHandlers,i)&&v(e,`there is a previously declared suffix for "${i}" tag handle`),ef.test(s)||v(e,"ill-formed tag prefix (second argument) of the TAG directive"),e.tagHandlers[i]=s,e.directives.push({kind:"tag",handle:i,prefix:s})}return!0}function yf(e){e.directives=[],e.tagHandlers=Object.create(null);let t=!1;for(O(e,!0);gf(e);)t=!0,O(e,!0);let n=!1,r=!1,i=!0;if(e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45&&V(e.input.charCodeAt(e.position+3))){n=!0;let a=e.line;e.position+=3,O(e,!0),i=e.line>a}else t&&v(e,"directives end mark is expected");let s=e.events.length;if(!n&&e.position===e.lineStart&&e.input.charCodeAt(e.position)===46&&xe(e)){e.position+=3,O(e,!0);return}if(tf(e,n,!1),we(e,e.lineIndent-1,at,!1,i,i)||$(e),O(e,!0),e.position===e.lineStart&&xe(e)&&(r=e.input.charCodeAt(e.position)===46,r)){let a=e.line;e.position+=3,O(e,!0),e.line===a&&e.position<e.length&&v(e,"end of the stream or a document separator is expected")}let o=e.events[s];o?.type===E.DOCUMENT&&(o.explicitEnd=r),ge(e),!r&&e.position<e.length&&!_n(e)&&v(e,"end of the stream or a document separator is expected")}function vf(e,t){let n=e.length,r={...hn,...t,input:`${e}\0`,length:n,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},i=e.indexOf("\0");for(i!==-1&&ne.throwAt(e,i,"null byte is not allowed in input",r.filename);r.position<r.length&&(ai(r),O(r,!0),!(r.position>=r.length));){let s=r.position;yf(r),r.position===s&&v(r,"can not read a document")}return r.events}var bf={...hn,...mn};function xf(e,t={}){let n={...bf,...t},r=String(e),i=Object.keys(hn),s=Object.keys(mn);return Hc(vf(r,$r(n,i)),{...$r(n,s),source:r})}function H(e,t){let n=xf(e,t);if(n.length===0)throw new ne("expected a document, but the input is empty");if(n.length===1)return n[0];throw new ne("expected a single document in the stream, but found more")}function lt(e,t){return(e&1<<t)!==0}var Gr={applyQuoteFlowKeysOption:wf,doubleQuoteForInvisibles:Sf,doubleQuoteWhitespaceOnly:Af,applyForceQuotesOption:If,tryLongOrMultilineAsBlock:Ef,quoteInvalidPlain:Tf,fallbackToDoubleQuoted:Nf};function fi(e){return e.presenterOptions.quoteStyle==="single"&&lt(e.allowedStylesMask,x.SINGLE_QUOTED)?x.SINGLE_QUOTED:x.DOUBLE_QUOTED}function wf(e){e.presenterOptions.quoteFlowKeys&&(!e.isKey||!e.flowOnly||e.style!==x.PLAIN||(e.style=x.DOUBLE_QUOTED))}function Sf(e){e.style===x.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(e.node.value)&&(e.style=x.DOUBLE_QUOTED)}function Af(e){e.style===x.PLAIN&&/^\s+$/.test(e.node.value)&&(e.style=x.DOUBLE_QUOTED)}function If(e){e.presenterOptions.forceQuotes&&(e.isKey||e.style!==x.PLAIN||e.node.tag===e.presenterOptions.schema.defaultScalarTag.tagName&&(e.style=e.node.value.includes(`
`)?x.DOUBLE_QUOTED:fi(e)))}function Ef(e){if(e.style!==x.PLAIN||e.isKey)return;let t=e.node.value,n=t.indexOf(`
`)!==-1;if(!lt(e.allowedStylesMask,x.LITERAL_BLOCK)){n&&(e.style=x.DOUBLE_QUOTED);return}let r=e.presenterOptions.lineWidth;if(r===-1){n&&(e.style=x.LITERAL_BLOCK);return}let i=Math.max(Math.min(r,40),r-e.shiftOfContent),s=0,o=!1;for(;s<=t.length;){let a=t.length,c=t.indexOf(`
`,s);c!==-1&&(a=c);let u=t.slice(s,a);if(u.length>i&&u[0]!==" "&&/ [^ \t]/.test(u)&&(o=!0),c===-1)break;s=c+1}o?e.style=x.FOLDED_BLOCK:n&&(e.style=x.LITERAL_BLOCK)}function Tf(e){e.style===x.PLAIN&&!lt(e.allowedStylesMask,x.PLAIN)&&(e.style=fi(e))}function Nf(e){lt(e.allowedStylesMask,e.style)||(e.style=x.DOUBLE_QUOTED)}var kf="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",Of="[\\n\\r]",Cf="\\uFEFF",gn="[ \\t]",ui=`(?:(?!(?:${Of}|${Cf}))${kf})`,dt=`(?:(?!${gn})${ui})`,pi="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",li="[-?:,\\[\\]{}#&*!|>'\"%@`]",$f="[,\\[\\]{}]",fn=dt,un=`(?:(?!${$f})${dt})`,Lf=`(?:(?:(?!${li})${dt})|[?:-](?=${fn}))`,Pf=`(?:(?:(?!${li})${dt})|[?:-](?=${un}))`,di=`(?:(?:(?![:#])${fn})|:(?=${fn}))#*`,mi=`(?:(?:(?![:#])${un})|:(?=${un}))#*`,hi=`(?:${gn}*${di})*`,_i=`(?:${gn}*${mi})*`,gi=`${Lf}#*${hi}`,yi=`${Pf}#*${_i}`,Rf=gi,Ff=yi,Df=`\\n+${di}${hi}`,Mf=`\\n+${mi}${_i}`,jf=`${gi}(?:${Df})*`,Bf=`${yi}(?:${Mf})*`,Ed=new RegExp(`^(?:${jf})$`,"u"),Td=new RegExp(`^(?:${Bf})$`,"u"),Nd=new RegExp(`^(?:${Rf})$`,"u"),kd=new RegExp(`^(?:${Ff})$`,"u"),Od=new RegExp(`^(?:${pi})*$`,"u"),Cd=new RegExp(`^(?:${pi}|\\n)*$`,"u"),$d=new RegExp(`^(?:${ui}|\\n)*$`,"u");var Yf={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(Gr).map(e=>Reflect.get(Gr,e)),tagBeforeAnchor:!1};var Ld={...Yf,schema:Cc,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};var Pd=E.DOCUMENT,Rd=E.SEQUENCE,Fd=E.MAPPING,Dd=E.SCALAR,Md=E.ALIAS,jd=E.POP,Bd=x.PLAIN,Yd=x.SINGLE_QUOTED,Ud=x.DOUBLE_QUOTED,Vd=x.LITERAL_BLOCK,Gd=x.FOLDED_BLOCK,Kd=z.BLOCK,qd=z.FLOW,Wd=D.CLIP,zd=D.STRIP,Hd=D.KEEP;var vi={bgp:`# BGP default settings and attributes
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
`};var bi=["attributes","extra_attributes","features","hooks","requires","supported_on","no_propagate","config_after","transform_after","warnings","_top"],Uf=["vlan","vrf","vxlan","ospf","isis","bgp","evpn"],yn;function vn(){if(yn)return yn;let e={};for(let t of Uf){let n=vi[t];if(!n)continue;let r=H(n)??{};e[t]=r}return yn=e,e}function Ie(e){return vn()[e]}function Vf(e){if(!e)return[...bi];let t=e.no_propagate,n=[];Array.isArray(t)?n=t.map(String):t&&typeof t=="object"&&(n=Object.keys(t));for(let r of Object.keys(e))r.includes("no_propagate")&&r!=="no_propagate"&&n.push(r);return[...bi,...n]}function xi(e){if(!e)return{};let t={...e};for(let n of Vf(e))delete t[n];return t}function bn(e){let n=Ie(e)?.requires;return Array.isArray(n)?n.map(String):[]}function xn(e){let n=Ie(e)?.transform_after;return Array.isArray(n)?n.map(String):[]}function wi(e){let n=Ie(e)?.config_after;return Array.isArray(n)?n.map(String):[]}function Si(e){let t=Ie(e)?.attributes,n=t&&typeof t=="object"?t.node_copy:void 0;return Array.isArray(n)?n.map(String):[]}function Ai(){let e=vn(),t={};for(let[n,r]of Object.entries(e))t[n]={...r};return t}var wn={addressing:`#
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
`};function Gf(e){let t=wn[e];if(!t)return{};let n=H(t);return!n||typeof n!="object"||Array.isArray(n)?{}:n}function Kf(){let e={};for(let t of Object.keys(wn))e[t]=Gf(t);return e}function Sn(){return{device:"frr",provider:"clab",...Kf(),...Ai()}}function An(e){let t=H(e);if(!t||typeof t!="object"||Array.isArray(t))throw new Error("Topology must be a YAML/JSON object");return he(t)}function In(e,t={}){let n=An(e);return Ue(n,t)}function Ue(e,t={}){Qt(e);let n=I(Sn(),t.defaults??{}),r=e.defaults??{};e.defaults=I(n,r),e.provider||(e.provider="clab"),e.name||(e.name=t.name??"topology");let i=e.defaults.addressing??{};return e.addressing=I(i,e.addressing??{}),e}function En(e,t={}){let n=qf.readFileSync(e,"utf8");return In(n,t)}function ht(e){let t=e?.attributes;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Ii(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.keys(e)}function Tn(e){return Array.isArray(e)?e.map(String):[]}function Nn(e){let t=ht(e),n=Ii(t.link),r=Ii(t.link_internal),i=new Set(Tn(t.link_no_propagate)),s=new Set([...n,...r]);for(let o of i)s.delete(o);return s}function kn(e){return new Set(Tn(ht(e).link_module_no_propagate))}function On(e){return new Set(Tn(ht(e).pool_no_copy))}import Je from"node:path";import{fileURLToPath as il}from"node:url";function Ei(e,t){if(!e.includes(":"))return{statementName:null,moduleName:null};let[n,r]=e.split(":",2);if(!n||!r)return{statementName:null,moduleName:null};let i=t[n];return i?i.findStatement(r)?{statementName:r,moduleName:n}:{statementName:null,moduleName:null}:{statementName:null,moduleName:null}}var Wf=class extends Error{constructor(e){super(e),this.name="YangError"}},L=class extends SyntaxError{messageText;line_num;line;context_lines;filename;constructor(e,t={}){let{line_num:n,line:r,context_lines:i=[],filename:s}=t,o=[];s&&o.push(`${s}:`),n&&o.push(`${n}:`),o.push(e);let a=o.join(" ");if(i.length>0){a+=`
`;for(let[c,u]of i)a+=`${c===n?">>> ":"    "}${String(c).padStart(4," ")} | ${u}
`;n&&r&&(a+=`     ${" ".repeat(String(n).length+3)}${"^".repeat(Math.max(1,r.trim().length))}`)}super(a),this.name="YangSyntaxError",this.messageText=e,this.line_num=n,this.line=r,this.context_lines=i,this.filename=s}formatHeadline(){let e=[];return this.filename&&e.push(`${this.filename}:`),this.line_num!==void 0&&e.push(`${this.line_num}:`),e.push(this.messageText),e.join(" ")}toString(){return this.formatHeadline()}},A=class extends Wf{constructor(e){super(e),this.name="YangSemanticError"}},$n=class extends A{target_path;constructor(e){super(`Refine target path matches no node in the used grouping: '${e}'`),this.name="YangRefineTargetNotFoundError",this.target_path=e}},Ln=class extends A{prefix_chain;repeated;constructor(e,t){let n=[...e,t].join(" -> ");super(`Circular uses chain: groupings are expanded at compile-time and this cycle would not terminate (${n}). Restructure groupings to break the cycle.`),this.name="YangCircularUsesError",this.prefix_chain=[...e],this.repeated=t}},U=class extends Error{messageText;position;expression;constructor(e,t={}){let{position:n,expression:r,context_before:i=10,context_after:s=10}=t;if(r!==void 0&&n!==void 0){let o=Math.max(0,n-i),a=Math.min(r.length,n+s),c=r.slice(o,a),u=n-o,p=[e,`
Expression: ${c}`,`           ${" ".repeat(u)}^`];n<r.length?p.push(`Position: ${n} (character: ${JSON.stringify(r[n])})`):p.push(`Position: ${n} (end of expression)`),super(p.join(`
`))}else super(e);this.name="XPathSyntaxError",this.messageText=e,this.position=n,this.expression=r}toString(){return this.messageText}},zf=new Set(["{","}",";",":","=","+","/"]);function Hf(e){return e?e.split(`
`).map(t=>t.replace(/\r$/,"")):[]}function Xf(e){return e==="STRING"?"string":e==="INTEGER"||e==="DOTTED_NUMBER"?"number":zf.has(e)?"symbol":"identifier"}var Cn=new Set(["{","}",";",":","=","+","/","STRING","IDENTIFIER","INTEGER","DOTTED_NUMBER"]);function Ti(e,t,n,r){return{type:e,value:t,line_num:n,char_pos:r,kind:Xf(e),line:n,column:r+1}}var Ni=class{token_list;tokens;positions;filename;index;source;diagnostic_lines;constructor(e,t,n){this.token_list=e,this.tokens=e.map(r=>r.value),this.positions=e.map(r=>[r.line_num,r.char_pos]),this.source=t,this.filename=n,this.index=0}peek_token(){return this.token_list[this.index]}peek(e=0){return this.token_list[this.index+e]?.value}consume(e){if(this.index>=this.tokens.length)throw this._make_error("Unexpected end of input");let t=this.tokens[this.index];if(e!==void 0&&t!==e)throw this._make_error(`Expected '${e}', got '${t}'`);return this.index+=1,t}consume_if(e){return this.peek()===e?(this.consume(),!0):!1}peek_type(){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");return this.token_list[this.index].type}peek_type_at(e=0){return this.token_list[this.index+e]?.type}consume_type(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");let t=this.token_list[this.index];if(typeof e=="string"&&!Cn.has(e)){if(t.type!=="IDENTIFIER"||t.value!==e)throw this._make_error(`Expected '${e}', got '${t.value}'`)}else if(t.type!==e)throw this._make_error(`Expected ${e}, got ${t.type} ('${t.value}')`);return this.index+=1,t.value}consume_if_type(e){if(this.index>=this.token_list.length)return!1;let t=this.token_list[this.index];if(typeof e=="string"&&!Cn.has(e)){if(t.type!=="IDENTIFIER"||t.value!==e)return!1}else if(t.type!==e)return!1;return this.consume_type(e),!0}consume_oneof(e){if(this.index>=this.token_list.length)throw this._make_error("Unexpected end of input");let t=this.token_list[this.index];for(let n of e)if(typeof n=="string"){if(Cn.has(n)){if(t.type===n)return this.index+=1,[t.value,n]}else if(t.type==="IDENTIFIER"&&t.value===n)return this.index+=1,[t.value,n]}else if(t.type===n)return this.index+=1,[t.value,n];throw this._make_error(`Expected one of (${e.join(", ")}), got ${t.type} ('${t.value}')`)}has_more(){return this.index<this.tokens.length}hasMore(){return this.has_more()}syntaxError(e){throw this._make_error(e)}position(){return this.index<this.positions.length?this.positions[this.index]:this.positions.length>0?this.positions[this.positions.length-1]:[1,0]}diagnostic_lines_once(){return this.diagnostic_lines||(this.diagnostic_lines=Hf(this.source)),this.diagnostic_lines}_make_error(e,t=3){let[n]=this.position(),r=this.diagnostic_lines_once(),i=[],s=Math.max(1,n-t),o=Math.min(r.length,n+t);for(let c=s;c<=o;c+=1)c<=r.length&&i.push([c,r[c-1]]);let a=n<=r.length?r[n-1]:"";return new L(e,{line_num:n,line:a,context_lines:i,filename:this.filename})}},ki=class Oi{module;current_parent;source_dir;constructor(t){this.module=t.module,this.current_parent=t.current_parent,this.source_dir=t.source_dir}push_parent(t){return new Oi({module:this.module,current_parent:t,source_dir:this.source_dir})}},_t={int8:[-128,127],int16:[-32768,32767],int32:[-2147483648,2147483647],int64:[-9223372036854776e3,9223372036854776e3],uint8:[0,255],uint16:[0,65535],uint32:[0,4294967295],uint64:[0,18446744073709552e3]},lm=new Set(Object.keys(_t));var Ge=class{patterns;length;range;fraction_digits;enums;bits;types;constructor(e={}){Object.assign(this,e)}};function Qf(e,t){let n=typeof e.error_message=="string"&&e.error_message.trim().length>0?e.error_message:t,r=typeof e.error_app_tag=="string"?e.error_app_tag.trim():"";return r.length>0?`${n} (error-app-tag: ${r})`:n}function Jf(e){let t=(n,r)=>{let i=n.trim().toLowerCase();if(i==="min")return Number.NEGATIVE_INFINITY;if(i==="max")return Number.POSITIVE_INFINITY;let s=Number(i);return Number.isNaN(s)?r==="min"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY:s};return e.split("|").map(n=>n.trim()).filter(Boolean).map(n=>{let[r,i]=n.split("..").map(s=>s.trim());if(!i){let s=t(r,"min");return{min:s,max:s}}return{min:t(r,"min"),max:t(i,"max")}})}function Ve(e,t){for(let n of Jf(t))if(e>=n.min&&e<=n.max)return!0;return!1}function Ci(e){return typeof e=="number"&&Number.isFinite(e)&&Number.isInteger(e)?e:typeof e=="string"&&/^-?\d+$/.test(e)?Number.parseInt(e,10):null}function Zf(e){return typeof e=="number"&&Number.isFinite(e)?e:typeof e=="string"&&/^-?\d+(\.\d+)?$/.test(e)?Number(e):null}function eu(e,t,n){let r=_t[e];if(!r)return[!1,`Unsupported integer type '${e}'`];let i=Ci(t);if(i===null)return[!1,`Expected ${e}`];if(n)return Ve(i,n)?[!0,null]:[!1,`Integer ${i} does not match ${n}`];let[s,o]=r;return i<s?[!1,`Value ${i} is less than minimum ${s}`]:i>o?[!1,`Value ${i} exceeds maximum ${o}`]:[!0,null]}function tu(e,t){if(typeof e!="string")return[!1,"Expected base64 string"];if(!/^[A-Za-z0-9+/]*={0,2}$/.test(e)||e.length%4!==0)return[!1,"Expected valid base64 string"];try{let n=Buffer.from(e,"base64");if(t&&!Ve(n.length,t))return[!1,`Binary length ${n.length} does not match ${t}`]}catch{return[!1,"Expected valid base64 string"]}return[!0,null]}function nu(e,t){if(typeof e!="string")return[!1,"Bits values must be string tokens"];let n=new Set(t.map(i=>i.name));if(e.trim()==="")return[!0,null];let r=new Set;for(let i of e.trim().split(/\s+/)){if(!n.has(i))return[!1,`Unknown bit token '${i}'`];if(r.has(i))return[!1,`Duplicate bit token '${i}'`];r.add(i)}return[!0,null]}var $i=class{validate(e,t,n){let r=n??new Ge,i=t.trim();if(i==="union"){for(let s of r.types??[]){let o=typeof s.name=="string"?s.name:"string",[a]=this.validate(e,o,new Ge(s));if(a)return[!0,null]}return[!1,"Value does not match any union member type"]}if(i==="enumeration")return typeof e!="string"?[!1,"Expected enumeration value (string)"]:r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null];if(i==="string"){if(typeof e!="string")return[!1,"Expected string"];if(r.length&&!Ve(e.length,r.length))return[!1,`String length ${e.length} does not match ${r.length}`];let s=Array.isArray(r.patterns)?r.patterns:[];if(s.length>0)for(let o of s){if(typeof o?.pattern!="string"||o.pattern.length===0)continue;let a=new RegExp(`^(?:${o.pattern})$`).test(e),c=o.invert_match===!0;if(!c&&!a||c&&a){let u=c?`String matches forbidden pattern ${o.pattern} (invert-match)`:`String does not match pattern ${o.pattern}`;return[!1,Qf(o,u)]}}return r.enums&&r.enums.length>0&&!r.enums.includes(e)?[!1,`Value '${e}' is not in enum`]:[!0,null]}if(i==="boolean")return typeof e=="boolean"?[!0,null]:e==="true"||e==="false"?[!0,null]:[!1,"Expected boolean"];if(i==="empty")return e===null?[!0,null]:[!1,"Expected empty (null)"];if(i in _t)return eu(i,e,r.range);if(i==="binary")return tu(e,r.length);if(i==="bits")return nu(e,r.bits??[]);if(i==="decimal64"||i==="number"){let s=Zf(e);if(s===null)return[!1,"Expected number"];if(r.range&&!Ve(s,r.range))return[!1,`Number ${s} does not match ${r.range}`];if(typeof r.fraction_digits=="number"){let o=`${s}`.split(".")[1]?.length??0;if(o>r.fraction_digits)return[!1,`Too many fraction digits (${o} > ${r.fraction_digits})`]}return[!0,null]}if(i==="int64"||i==="integer"){let s=Ci(e);return s===null?[!1,"Expected integer"]:r.range&&!Ve(s,r.range)?[!1,`Integer ${s} does not match ${r.range}`]:[!0,null]}return typeof e=="string"?[!0,null]:[!1,`Unsupported type '${i}'`]}};import{existsSync as su,readFileSync as ou,readdirSync as au}from"fs";import{dirname as cu,resolve as gt}from"path";function ke(e){return e.prefix?`${e.prefix}:${e.name}`:e.name}function Le(e){let t=e.indexOf(":");return t<=0||t>=e.length-1?{name:e}:{prefix:e.slice(0,t),name:e.slice(t+1)}}function Xe(e){let t=e.replace(/^["']|["']$/g,"");if(!t.startsWith("/"))throw new Error(`Schema path must be absolute, got '${e}'`);let n=t.slice(1).split("/").map(r=>r.trim()).filter(r=>r.length>0);if(n.length===0)throw new Error(`Empty schema path: '${e}'`);return n.map(r=>{let i=Le(r);if(!i.prefix)throw new Error(`Invalid schema path segment '${r}': expected 'prefix:identifier'`);return i})}function ss(e){if(typeof e=="string"&&e.length>0)return Le(e);if(e&&typeof e=="object"&&!Array.isArray(e)){let t=e;if(typeof t.name=="string"&&t.name.length>0)return typeof t.prefix=="string"&&t.prefix.length>0?{prefix:t.prefix,name:t.name}:{name:t.name}}}function ru(e){if(!(!e||typeof e!="object"))return new os(e)}var os=class as{data;constructor(t){this.data=t}get name(){return this.data.name}get keyword(){return this.data.keyword}get argument(){return this.data.argument}get statements(){return(Array.isArray(this.data.statements)?this.data.statements:[]).map(n=>new as(n))}findStatement(t){return this.statements.find(n=>n.name===t)}},Pt=class{data;source;constructor(e,t){this.data=e,this.source=t}get name(){return this.data.name}get yangVersion(){return this.data.yang_version}get namespace(){return this.data.namespace}get prefix(){return this.data.prefix}get organization(){let e=this.data.organization;return typeof e=="string"&&e.length>0?e:void 0}get contact(){let e=this.data.contact;return typeof e=="string"&&e.length>0?e:void 0}get description(){let e=this.data.description;return typeof e=="string"?e:void 0}get typedefs(){return this.data.typedefs??{}}get identities(){let e=this.data.identities;return!e||typeof e!="object"?{}:e}get statements(){let e=this.data.statements;return Array.isArray(e)?e.map(ru).filter(t=>!!t):[]}findStatement(e){return this.statements.find(t=>t.name===e)}};function iu(e,t){let n=Object.keys(e).filter(r=>!t.has(r)).sort();if(n.length>0)throw new TypeError(`unexpected keyword arguments: ${JSON.stringify(n)}`)}function cs(e){iu(e,new Set(["modules","mode"]));let t=e.mode===void 0?"complete":e.mode,n=new Set;for(let r=0;r<e.modules.length;r+=1){let s=e.modules[r].name;if(!s)throw new TypeError(`modules[${r}] must have a module name`);if(n.has(s))throw new TypeError(`duplicate module name '${s}' in modules`);n.add(s)}return{modules:[...e.modules],mode:t}}var Rn="module",fs="yang-version",us="namespace",Te="prefix",ps="organization",ls="contact",Oe="description",ds="revision",Vn="typedef",ms="identity",At="base",It="type",fu="enumeration",Li="path",Pi="require-instance",Ri="enum",Gn="status",hs="bit",Fi="position",Di="pattern",Mi="modifier",ji="length",Bi="fraction-digits",Yi="range",_s="grouping",Pe="uses",gs="refine",oe="container",fe="list",ue="leaf",pe="leaf-list",le="anydata",de="anyxml",ae="choice",Et="case",Ce="must",Q="when",Fn="presence",Ui="key",Vi="min-elements",Gi="max-elements",Ki="ordered-by",Tt="mandatory",Dn="config",xt="default",Nt="error-message",qi="error-app-tag",R="true",X="false",ys="import",vs="include",bs="revision-date",xs="feature",J="if-feature",ws="augment",Ss="submodule",Wi="belongs-to",ze="reference",zi="argument",Hi="yin-element",uu="deviation",As="extension",Is="rpc",pu="action",Rt="notification",Ke="input",qe="output",lu=["<=",">=","!=","==","//","=","<",">","+","-","*","/"];function du(e){let t=[],n=0,r=(i,s,o=n)=>{t.push({kind:i,value:s,position:o})};for(;n<e.length;){let i=e[n];if(/\s/.test(i)){n+=1;continue}if(i==='"'||i==="'"){let a=i,c=n;n+=1;let u="";for(;n<e.length;){let p=e[n];if(p===a&&e[n-1]!=="\\"){n+=1;break}u+=p,n+=1}r("string",u,c);continue}if(/\d/.test(i)||i==="-"&&/\d/.test(e[n+1]??"")){let a=n,c="";for(e[n]==="-"&&(c+="-",n+=1);n<e.length&&/\d/.test(e[n]);)c+=e[n],n+=1;if(e[n]==="."&&/\d/.test(e[n+1]??""))for(c+=".",n+=1;n<e.length&&/\d/.test(e[n]);)c+=e[n],n+=1;r("number",c,a);continue}if(/[A-Za-z_]/.test(i)){let a=n,c="";for(;n<e.length&&/[A-Za-z0-9_:\-]/.test(e[n]);)c+=e[n],n+=1;r("identifier",c,a);continue}if(i==="/"){e[n+1]==="/"?(r("operator","//"),n+=2):(r("slash","/"),n+=1);continue}if(i==="."){e[n+1]==="."?(r("dotdot",".."),n+=2):(r("dot","."),n+=1);continue}if(i==="("){r("paren_open","("),n+=1;continue}if(i===")"){r("paren_close",")"),n+=1;continue}if(i==="["){r("bracket_open","["),n+=1;continue}if(i==="]"){r("bracket_close","]"),n+=1;continue}if(i===","){r("comma",","),n+=1;continue}let s=e.slice(n),o=lu.find(a=>s.startsWith(a));if(o){r("operator",o),n+=o.length;continue}n+=1}return r("eof","",n),t}var mu=new Set(["=","!=","<",">","<=",">="]),hu=new Set(["+","-"]),Es=class{constructor(e){this.expression=e,this.tokens=du(e)}expression;tokens;position=0;parse(){if(this.current().kind==="eof")throw new U("Empty expression",{expression:this.expression,position:0});let e=this.parseExpression(),t=this.current();if(t.kind!=="eof")throw new U(`Unexpected token: ${t.value||t.kind}`,{expression:this.expression,position:t.position});return e}current(){return this.tokens[this.position]??{kind:"eof",value:"",position:this.expression.length}}consume(e){let t=this.current();if(e&&t.kind!==e)throw new U(`Expected ${e}, got ${t.kind} (${t.value})`,{expression:this.expression,position:t.position});return this.position+=1,t}isKeyword(e){let t=this.current();return t.kind==="identifier"&&t.value.toLowerCase()===e.toLowerCase()}parseExpression(){return this.parseLogicalOr()}parseLogicalOr(){let e=this.parseLogicalAnd();for(;this.isKeyword("or");){this.consume();let t=this.parseLogicalAnd();e={kind:"binary",operator:"or",left:e,right:t}}return e}parseLogicalAnd(){let e=this.parseComparison();for(;this.isKeyword("and");){this.consume();let t=this.parseComparison();e={kind:"binary",operator:"and",left:e,right:t}}return e}parseComparison(){let e=this.parseAdditive(),t=this.current();if(t.kind==="operator"&&mu.has(t.value)){let n=this.consume("operator").value,r=this.parseAdditive();e={kind:"binary",operator:n,left:e,right:r}}return e}parseAdditive(){let e=this.parseMultiplicative();for(;;){let t=this.current();if(t.kind==="operator"&&hu.has(t.value)){let n=this.consume("operator").value,r=this.parseMultiplicative();e={kind:"binary",operator:n,left:e,right:r}}else return e}}parseMultiplicative(){let e=this.parseUnary();for(;;){let t=this.current();if(t.kind==="slash"){this.consume("slash");let n=this.parsePath(!1);e={kind:"binary",operator:"/",left:e,right:n}}else if(t.kind==="operator"&&t.value==="*"){this.consume("operator");let n=this.parseUnary();e={kind:"binary",operator:"*",left:e,right:n}}else return e}}parseUnary(){let e=this.current();if(e.kind==="operator"&&e.value==="-"){this.consume("operator");let t=this.parseUnary();return{kind:"binary",operator:"-",left:{kind:"literal",value:0},right:t}}if(e.kind==="operator"&&e.value==="+")return this.consume("operator"),this.parseUnary();if(this.isKeyword("not")){this.consume(),this.consume("paren_open");let t=this.parseExpression();return this.consume("paren_close"),{kind:"function",name:"not",args:[t]}}return this.parsePrimary()}parsePrimary(){let e=this.current();if(e.kind==="string")return{kind:"literal",value:this.consume("string").value};if(e.kind==="number"){let t=this.consume("number").value,n=t.includes(".")?Number.parseFloat(t):Number.parseInt(t,10);if(Number.isNaN(n))throw new U(`Invalid number: ${t}`,{expression:this.expression,position:e.position});return{kind:"literal",value:n}}if(e.kind==="identifier")return this.isKeyword("true")?(this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!0}):this.isKeyword("false")?(this.consume(),this.current().kind==="paren_open"&&(this.consume("paren_open"),this.consume("paren_close")),{kind:"literal",value:!1}):this.tokens[this.position+1]?.kind==="paren_open"?this.parseFunctionCall():this.parsePath(!1);if(e.kind==="dot")return this.consume("dot"),this.current().kind==="paren_open"?(this.consume("paren_open"),this.consume("paren_close"),{kind:"function",name:"current",args:[]}):this.parsePath(!1,".");if(e.kind==="dotdot")return this.parsePath(!1);if(e.kind==="slash")return this.consume("slash"),this.parsePath(!0);if(e.kind==="paren_open"){if(this.consume("paren_open"),this.current().kind==="string"||this.current().kind==="number"){let n=this.parsePrimary();if(n.kind==="literal"&&this.current().kind==="comma"){let r=[n.value];for(;this.current().kind==="comma";){this.consume("comma");let i=this.parsePrimary();if(i.kind!=="literal")throw new U("Value list may only contain literals",{expression:this.expression,position:this.current().position});r.push(i.value)}return this.consume("paren_close"),{kind:"literal",value:r}}if(this.current().kind==="paren_close")return this.consume("paren_close"),n}let t=this.parseExpression();return this.consume("paren_close"),t}throw new U(`Unexpected token: ${e.value||e.kind}`,{expression:this.expression,position:e.position})}parseFunctionCall(){let e=this.consume("identifier").value;this.consume("paren_open");let t=[];if(this.current().kind!=="paren_close")for(t.push(this.parseExpression());this.current().kind==="comma";)this.consume("comma"),t.push(this.parseExpression());return this.consume("paren_close"),{kind:"function",name:e,args:t}}parsePath(e,t,n=!0){let r=[],i=o=>{let a={step:o};for(r.push(a);this.current().kind==="bracket_open";){if(!n)throw new U("Predicates are not allowed in this path context",{expression:this.expression,position:this.current().position});this.consume("bracket_open");let c=this.parseExpression();a.predicate===void 0?a.predicate=c:a.predicate={kind:"binary",operator:"and",left:a.predicate,right:c},this.consume("bracket_close")}return this.current().kind==="slash"?(this.consume("slash"),!0):!1};for(t!==void 0&&i(t);this.current().kind==="dot"||this.current().kind==="dotdot"||this.current().kind==="identifier";){let o=this.consume().value;if(!i(o))break}return{kind:"path",segments:r,isAbsolute:e}}parsePathExpression(e={}){let t=e.allowPredicate??!0;if(this.current().kind==="eof")throw new U("Empty path expression",{expression:this.expression,position:0});let n=!1;this.current().kind==="slash"&&(n=!0,this.consume("slash"));let r=this.parsePath(n,void 0,t),i=this.current();if(i.kind!=="eof")throw new U(`Unexpected token: ${i.value||i.kind}`,{expression:this.expression,position:i.position});return r}};function wt(e){return new Es(e).parse()}function Ts(e,t={}){return new Es(e).parsePathExpression(t)}var _u=class{statements;constructor(e=[]){this.statements=e}find_statement(e){return this.statements.find(t=>t.name===e)}findStatement(e){return this.find_statement(e)}get_all_leaves(){let e=[];for(let t of this.statements)e.push(...this.collectLeaves(t));return e}getAllLeaves(){return this.get_all_leaves()}collectLeaves(e){if(e instanceof Os)return[e];if(e instanceof Qe||e instanceof ks){let t=[];for(let n of e.statements)t.push(...this.collectLeaves(n));return t}return[]}},Re=class extends _u{keyword;name;description;reference;constructor(e={}){super(e.statements??[]),this.keyword=e.keyword??"",this.name=e.name??"",this.description=e.description??"",this.reference=e.reference??""}get_schema_node(){}getSchemaNode(){return this.get_schema_node()}child_names(e){return this.name?new Set([this.name]):new Set}childNames(e){return this.child_names(e)}},gu=class extends Re{must_statements;constructor(e={}){super(e),this.must_statements=e.must_statements??[]}},M=class extends Re{when;if_features;config;constructor(e={}){super(e),this.when=e.when,this.if_features=e.if_features??[],this.config=e.config}get_schema_node(){return this.name||void 0}},Ns=class extends Re{type;default;constructor(e={}){super(e),this.keyword="typedef",this.type=e.type,this.default=e.default}get_schema_node(){return this.name||void 0}},Xi=class extends Re{bases;if_features;constructor(e={}){super(e),this.keyword="identity",this.bases=e.bases??[],this.if_features=e.if_features??[]}get_schema_node(){}},yu=class{name;position;constructor(e={}){this.name=e.name??"",this.position=e.position}},vu=class{pattern;invert_match;error_message;error_app_tag;constructor(e={}){this.pattern=e.pattern??"",this.invert_match=e.invert_match??!1,this.error_message=e.error_message,this.error_app_tag=e.error_app_tag}},bu=class{name;prefix;patterns;length;range;fraction_digits;enums;bits;types;path;require_instance;identityref_bases;constructor(e={}){this.name=e.name??"",this.prefix=e.prefix,this.patterns=e.patterns??[],this.length=e.length,this.range=e.range,this.fraction_digits=e.fraction_digits,this.enums=e.enums??[],this.bits=e.bits??[],this.types=e.types??[],this.path=e.path,this.require_instance=e.require_instance??!0,this.identityref_bases=e.identityref_bases??[]}},Qe=class extends M{must_statements;presence;constructor(e={}){super(e),this.keyword="container",this.must_statements=e.must_statements??[],this.presence=e.presence}},xu=class extends Qe{constructor(e={}){super(e),this.keyword="notification"}},wu=class extends Qe{constructor(e={}){super({name:"input",...e}),this.keyword="input"}},Su=class extends Qe{constructor(e={}){super({name:"output",...e}),this.keyword="output"}},Au=class extends M{must_statements;constructor(e={}){super(e),this.keyword="rpc",this.must_statements=e.must_statements??[]}},ks=class extends M{must_statements;key;min_elements;max_elements;constructor(e={}){super(e),this.keyword="list",this.must_statements=e.must_statements??[],this.key=e.key,this.min_elements=e.min_elements,this.max_elements=e.max_elements}},Os=class extends M{must_statements;type;mandatory;default;constructor(e={}){super(e),this.keyword="leaf",this.must_statements=e.must_statements??[],this.type=e.type,this.mandatory=e.mandatory??!1,this.default=e.default}},Cs=class extends M{must_statements;type;min_elements;max_elements;defaults;constructor(e={}){super(e),this.keyword="leaf-list",this.must_statements=e.must_statements??[],this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.defaults=e.defaults??[]}},Iu=class extends M{must_statements;mandatory;constructor(e={}){super(e),this.keyword="anydata",this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},Eu=class extends M{must_statements;mandatory;constructor(e={}){super(e),this.keyword="anyxml",this.must_statements=e.must_statements??[],this.mandatory=e.mandatory??!1}},Mn=class extends Re{argument_name;argument_yin_element;apply_callback;constructor(e={}){super(e),this.keyword="extension",this.argument_name=e.argument_name??"",this.argument_yin_element=e.argument_yin_element,this.apply_callback=e.apply_callback}apply(e,t){return this.apply_callback?this.apply_callback(e,t.context_module):e}get_schema_node(){}},Tu=class extends M{must_statements;prefix;resolved_module;resolved_extension;argument;constructor(e){if(super(e),this.keyword="extension-invocation",this.must_statements=e.must_statements??[],this.prefix=e.prefix,this.resolved_module=e.resolved_module,this.resolved_extension=e.resolved_extension,this.argument=e.argument,!this.prefix)throw new Error("extension invocation requires a non-empty prefix");if(!this.resolved_module)throw new Error("extension invocation requires resolved_module");if(!this.resolved_extension)throw new Error("extension invocation requires resolved_extension")}get_schema_node(){}},$s=class{expression;description;ast;constructor(e){this.expression=e.expression,this.description=e.description??"",this.expression&&(this.ast=wt(this.expression))}},Qi=class extends $s{error_message;constructor(e){super(e),this.error_message=e.error_message??""}},Nu=class extends $s{evaluate_with_parent_context;constructor(e){super(e),this.evaluate_with_parent_context=e.evaluate_with_parent_context??!1}get condition(){return this.expression}},ku=class extends Re{constructor(e={}){super(e),this.keyword="grouping"}},Kn=class extends M{grouping_name;grouping_prefix;refines;augmentations;constructor(e={}){super(e),this.keyword="uses",this.grouping_name=e.grouping_name??"",this.grouping_prefix=e.grouping_prefix,this.refines=e.refines??[],this.augmentations=e.augmentations??[]}grouping_qname(){return this.grouping_prefix?`${this.grouping_prefix}:${this.grouping_name}`:this.grouping_name}get_schema_node(){}},Ou=class extends M{augment_path;augment_path_segments;constructor(e={}){super(e),this.keyword="augment",this.augment_path=e.augment_path??"",this.augment_path_segments=e.augment_path_segments??[]}get_schema_node(){}},St=class extends gu{target_path;type;min_elements;max_elements;refined_defaults;refined_mandatory;refined_config;if_features;constructor(e={}){super(e),this.keyword="refine",this.target_path=e.target_path??"",this.type=e.type,this.min_elements=e.min_elements,this.max_elements=e.max_elements,this.refined_defaults=e.refined_defaults??[],this.refined_mandatory=e.refined_mandatory,this.refined_config=e.refined_config,this.if_features=e.if_features??[]}},yt=class extends M{mandatory;cases;constructor(e={}){super(e),this.keyword="choice",this.mandatory=e.mandatory??!1,this.cases=e.cases??[]}child_names(e){for(let t of this.cases)if(t.statements.some(n=>n.name&&n.name in e))return new Set(t.statements.map(n=>n.name).filter(n=>!!n));return new Set}validate_case_unique_child_names(){let e=new Map;for(let t of this.cases)for(let n of t.statements){let r=n.get_schema_node();if(r){if(e.has(r)){let i=e.get(r);throw new A(`Choice '${this.name}': schema node '${r}' appears in case '${i}' and again in case '${t.name}' (RFC 7950: names of nodes in the cases of a choice must be unique).`)}e.set(r,t.name)}}}},Ji=class extends M{constructor(e={}){super(e),this.keyword="case"}child_names(e){return new Set(this.statements.map(t=>t.name).filter(t=>!!t))}},Cu=class{constructor(e){this.parsers=e}parsers;parse_anydata(e,t){e.consume(le);let n=e.consume(),r=new Iu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},$u=class{constructor(e){this.parsers=e}parsers;parse_anyxml(e,t){e.consume(de);let n=e.consume(),r=new Eu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}};function kt(e,t){let n={...t};return n[Oe]??=(r,i)=>{e.parse_description(r,i)},n[ze]??=(r,i)=>{e.parse_reference(r,i)},n[Gn]??=(r,i)=>{e.parse_status_ignored(r,i)},n}function Ot(e,t){let n=kt(e,t);return n[Dn]??=(r,i)=>{e.parse_config(r,i)},n[Gn]??=(r,i)=>{e.parse_status_ignored(r,i)},n}var Lu=class{constructor(e){this.parsers=e,this.augmentBodyDispatch=Ot(this.parsers,{[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Pe]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[ue]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[pe]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[oe]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[fe]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[ae]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[Et]:(t,n)=>{this.parsers.choice_parser.parse_case(t,n)},[le]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[de]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[Ce]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[Rt]:(t,n)=>{this.parsers.notification_parser.parse_notification(t,n)}})}parsers;augmentBodyDispatch;parse_augment(e,t){e.consume(ws);let n=this.parsers.parse_string_concatenation(e),r=[];if(n.replace(/^["']|["']$/g,"").startsWith("/"))try{r=Xe(n)}catch(a){throw new L(a instanceof Error?a.message:String(a))}let s=new Ou({name:"augment",augment_path:n,augment_path_segments:r});if(e.consume_if_type("{")){let a=t.push_parent(s);for(;e.has_more()&&e.peek_type()!=="}";){let c=this.parsers.substatement_handler(e,this.augmentBodyDispatch);c?c(e,a):e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"?this.parsers.parse_prefixed_extension_statement_public(e,a):this.parsers.skip_unsupported_or_raise_unknown(e,"augment")}e.consume_type("}")}let o=t.current_parent;return o instanceof Kn?o.augmentations.push(s):this.parsers.add_to_parent_or_module(t,s),e.consume_if_type(";"),s}},Pu=class{constructor(e){this.parsers=e}parsers;parse_type_bit(e,t,n){e.consume(hs);let r=e.consume(),i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Fi?(e.consume(Fi),i=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")):this.parsers.parseStatement(e,t);e.consume_type("}")}n.bits.push(new yu({name:r,position:i})),e.consume_if_type(";")}finalize_bits_type(e){let t=-1;for(let n of e.bits)n.position===void 0&&(n.position=t+1),t=Math.max(t,n.position)}},Ru=new Set([ue,pe,oe,fe,le,de,ae]),Fu=class{constructor(e){this.parsers=e,this.choiceSubstatementDispatch=Ot(this.parsers,{[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Et]:(t,n)=>{this.parse_case(t,n)},[Tt]:(t,n)=>{this.parse_choice_mandatory(t,n)}}),this.caseSubstatementDispatch=Ot(this.parsers,{[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[Pe]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[ue]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[oe]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[fe]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[pe]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[le]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[de]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[ae]:(t,n)=>{this.parse_choice(t,n)}})}parsers;choiceSubstatementDispatch;caseSubstatementDispatch;parse_choice(e,t){e.consume(ae);let n=e.consume(),r=new yt({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_choice_substatement(e,i,n);e.consume_type("}"),r.validate_case_unique_child_names()}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_choice_substatement(e,t,n){let r=`choice '${n}'`,i=this.parsers.substatement_handler(e,this.choiceSubstatementDispatch);if(i){i(e,t);return}let s=this.parsers.dispatch_key(e);if(typeof s=="string"&&Ru.has(s)){this.parse_choice_implicit_case(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_implicit_case(e,t){let n=t.current_parent;n instanceof yt||e.syntaxError("internal: implicit choice case outside choice body");let r=new Ji({name:""}),i=t.push_parent(r),s=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);s||e.syntaxError(`internal: unsupported implicit choice schema '${String(e.peek())}'`),s(e,i),r.statements.length===0&&e.syntaxError("Expected a schema node in implicit choice case (RFC 7950 \xA77.9.2)");let o=r.statements[0],a=o.name||o.get_schema_node();a||e.syntaxError("Implicit choice case requires a named schema node (RFC 7950 \xA77.9.2)"),r.name=a,n.cases.push(r)}parse_case(e,t){e.consume(Et);let n=e.consume(),r=new Ji({name:n});if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parse_case_substatement(e,s,n);e.consume_type("}")}let i=t.current_parent;return i instanceof yt?i.cases.push(r):this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_case_substatement(e,t,n){let r=`case '${n}'`,i=this.parsers.substatement_handler(e,this.caseSubstatementDispatch);if(i){i(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_if_present(e,r)||this.parsers.skip_unsupported_or_raise_unknown(e,r)}parse_choice_mandatory(e,t){e.consume(Tt);let[,n]=e.consume_oneof([R,X]),r=t.current_parent;r instanceof yt&&(r.mandatory=n===R),e.consume_if_type(";")}},Du=class{constructor(e){this.parsers=e,this.containerSubstatementDispatch=Ot(this.parsers,{[Fn]:(t,n)=>{this.parsers.parse_presence(t,n)},[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[Ce]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[ue]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[oe]:(t,n)=>{this.parse_container(t,n)},[fe]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[pe]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[Pe]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[ae]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[le]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[de]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)},[Rt]:(t,n)=>{this.parsers.notification_parser.parse_notification(t,n)}})}parsers;containerSubstatementDispatch;parseContainerSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.containerSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`container '${n}'`)}parse_container(e,t){e.consume(oe);let n=e.consume(),r=new Qe({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseContainerSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Mu=class{constructor(e){this.parsers=e}parsers;parse_extension_stmt(e,t){e.consume(As);let n=e.consume_type("IDENTIFIER"),r=new Mn({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.dispatch_key(e)===zi?this.parse_extension_argument_stmt(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}return t.module.extensions[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_extension_argument_stmt(e,t){e.consume(zi);let n=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),r=t.current_parent;if(r instanceof Mn&&(r.argument_name=n),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)if(e.peek()===Hi){e.consume(Hi);let[,i]=e.consume_oneof([R,X]);r.argument_yin_element=i===R,e.consume_if_type(";")}else this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}},ju=class{constructor(e){this.parsers=e}parsers;parse_feature_stmt(e,t){e.consume(xs);let n=e.consume_type("IDENTIFIER");(t.module.features??=new Set).add(n);let r={if_features:[]};if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}if(r.if_features.length>0){let i=t.module,s=i.feature_if_features??={};s[n]=[...r.if_features]}e.consume_if_type(";")}parse_if_feature_stmt(e,t){e.consume(J);let n=this.parsers.parse_string_concatenation(e),r=t.current_parent;if(r&&Array.isArray(r.if_features)&&r.if_features.push(n),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}},Bu=class{constructor(e){this.parsers=e}parsers;parse_grouping(e,t){e.consume(_s);let n=e.consume(),r=new ku({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}t.module.groupings[n]=r,e.consume_if_type(";")}},Yu=class{constructor(e){this.parsers=e}parsers;parse_identity(e,t){e.consume(ms);let n=e.consume_type("IDENTIFIER"),r=new Xi({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===At?this.parse_identity_base(e,i):this.parsers.parseStatement(e,i);e.consume_type("}")}t.module.identities[n]=r,e.consume_if_type(";")}parse_identity_base(e,t){e.consume(At);let n=this.parsers.consume_identifier_ref(e),r=t.current_parent;r instanceof Xi&&r.bases.push(n),e.consume_if_type(";")}},Uu=class{constructor(e){this.parsers=e}parsers;parse_leaf(e,t){e.consume(ue);let n=e.consume(),r=new Os({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Vu=class{constructor(e){this.parsers=e}parsers;parse_leaf_list(e,t){e.consume(pe);let n=e.consume(),r=new Cs({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Gu=class{constructor(e){this.parsers=e}parsers;parse_list(e,t){e.consume(fe);let n=e.consume(),r=new ks({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Ku=class{constructor(e){this.parsers=e}parsers;parse_module(e,t){for(e.consume(Rn),t.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}parse_yang_version(e,t){e.consume(fs);let[n]=e.consume_oneof(["IDENTIFIER","DOTTED_NUMBER"]);t.module.yang_version=n,e.consume_if_type(";")}parse_namespace(e,t){e.consume(us),t.module.namespace=e.consume_type("STRING"),e.consume_if_type(";")}parse_prefix(e,t){e.consume(Te);let n=this.parsers.dispatch_key(e);t.module.prefix=n==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}parse_organization(e,t){e.consume(ps),t.module.organization=e.consume_type("STRING"),e.consume_if_type(";")}parse_contact(e,t){e.consume(ls),t.module.contact=e.consume_type("STRING"),e.consume_if_type(";")}parse_import_stmt(e,t){e.consume(ys);let n=e.consume_type("IDENTIFIER"),r,i;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){let s=this.parsers.dispatch_key(e);if(s===Te){e.consume(Te),r=e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";");continue}if(s===bs){i=this.parsers.revision_parser.parse_revision_date_statement(e);continue}this.skip_nested_statement(e)}e.consume_type("}")}if(e.consume_if_type(";"),!r||r.trim().length===0)throw new A(`Import '${n}' is missing required prefix substatement`);this.parsers.register_import(t,n,r,i,e)}parse_include_stmt(e,t){if(e.consume(vs),e.consume_type("IDENTIFIER"),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,t);e.consume_type("}")}e.consume_if_type(";")}parse_prefix_value_stmt(e){e.consume(Te),e.peek_type()==="STRING"?e.consume_type("STRING"):e.consume_type("IDENTIFIER"),e.consume_if_type(";")}skip_nested_statement(e){let t=0;for(;e.has_more();){let n=this.parsers.dispatch_key(e);if(n==="{"){t+=1,e.consume_type("{");continue}if(n==="}"){if(t===0)return;t-=1,e.consume_type("}");continue}if(n===";"&&t===0){e.consume_type(";");return}e.consume()}}},qu=class{constructor(e){this.parsers=e}parsers;parse_notification(e,t){e.consume(Rt);let n=e.consume(),r=new xu({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},Wu=class{constructor(e){this.parsers=e,this.ioSubstatementDispatch=kt(this.parsers,{[Vn]:(t,n)=>{this.parsers.typedef_parser.parse_typedef(t,n)},[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[Ce]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[ue]:(t,n)=>{this.parsers.leaf_parser.parse_leaf(t,n)},[oe]:(t,n)=>{this.parsers.container_parser.parse_container(t,n)},[fe]:(t,n)=>{this.parsers.list_parser.parse_list(t,n)},[pe]:(t,n)=>{this.parsers.leaf_list_parser.parse_leaf_list(t,n)},[Pe]:(t,n)=>{this.parsers.uses_parser.parse_uses(t,n)},[ae]:(t,n)=>{this.parsers.choice_parser.parse_choice(t,n)},[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)},[le]:(t,n)=>{this.parsers.anydata_parser.parse_anydata(t,n)},[de]:(t,n)=>{this.parsers.anyxml_parser.parse_anyxml(t,n)}}),this.rpcSubstatementDispatch=kt(this.parsers,{[Q]:(t,n)=>{this.parsers.when_parser.parse_when(t,n)},[Ce]:(t,n)=>{this.parsers.must_parser.parse_must(t,n)},[Ke]:(t,n)=>{this.parse_input(t,n)},[qe]:(t,n)=>{this.parse_output(t,n)},[J]:(t,n)=>{this.parsers.feature_parser.parse_if_feature_stmt(t,n)}})}parsers;ioSubstatementDispatch;rpcSubstatementDispatch;parseIoSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.ioSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`${n} block`)}parseIoBlock(e,t,n,r){if(e.consume(n),e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseIoSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}parse_input(e,t){return this.parseIoBlock(e,t,Ke,new wu)}parse_output(e,t){return this.parseIoBlock(e,t,qe,new Su)}parseRpcSubstatement(e,t,n){let r=this.parsers.substatement_handler(e,this.rpcSubstatementDispatch);if(r){r(e,t);return}if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":"){this.parsers.parse_prefixed_extension_statement_public(e,t);return}this.parsers.skip_unsupported_or_raise_unknown(e,`rpc '${n}'`)}parse_rpc(e,t){e.consume(Is);let n=e.consume(),r=new Au({name:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parseRpcSubstatement(e,i,n);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},zu=class{constructor(e){this.parsers=e}parsers;parse_must(e,t){e.consume(Ce);let n=this.parsers.parse_string_concatenation(e),r=new Qi({expression:n});if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Nt?this.parse_must_error_message(e,s):this.parsers.parseStatement(e,s);e.consume_type("}")}let i=t.current_parent;return Array.isArray(i?.must_statements)&&i.must_statements.push(r),e.consume_if_type(";"),r}parse_must_error_message(e,t){e.consume(Nt);let n=t.current_parent;n instanceof Qi&&(n.error_message=e.consume_type("STRING")),e.consume_if_type(";")}},Hu=class{constructor(e){this.parsers=e}parsers;parse_refine(e,t){e.consume(gs);let n=[e.consume()];for(;e.has_more()&&e.peek_type()==="/";)e.consume_type("/"),n.push(e.consume());let r=n.join("/"),i=new St({name:"refine",target_path:r});if(e.consume_if_type("{")){let s=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}t.current_parent instanceof Kn&&t.current_parent.refines.push(i),e.consume_if_type(";")}},Xu=class{constructor(e){this.parsers=e}parsers;parse_revision(e,t){e.consume(ds);let n="";if(e.peek_type()==="STRING")n=e.consume_type("STRING");else for(;e.has_more()&&!["{",";"].includes(e.peek_type());)n+=e.consume();let r={date:n,description:"",reference:""};if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.peek()===Oe?(e.consume(Oe),r.description=e.consume_type("STRING"),e.consume_if_type(";")):e.peek()===ze?(e.consume(ze),r.reference=this.parsers.parse_string_argument(e),e.consume_if_type(";")):this.parsers.parseStatement(e,t);e.consume_type("}")}(t.module.revisions??=[]).push(r),e.consume_if_type(";")}parse_revision_date_statement(e){e.consume(bs);let t="";if(e.peek_type()==="STRING")t=e.consume_type("STRING");else for(;e.has_more()&&e.peek_type()!==";";)t+=e.consume();return e.consume_if_type(";"),t}},Qu=class{constructor(e,t){this.parsers=e,this.module_parser=t}parsers;module_parser;parse_submodule(e,t){for(e.consume(Ss),t.module.name=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Wi?this.parse_belongs_to(e,t):this.parsers.parseStatement(e,t);e.consume_type("}")}parse_belongs_to(e,t){for(e.consume(Wi),t.module.belongs_to_module=e.consume_type("IDENTIFIER"),e.consume_type("{");e.has_more()&&e.peek_type()!=="}";)e.peek()===Te?this.module_parser.parse_prefix_value_stmt(e):this.parsers.parseStatement(e,t);e.consume_type("}"),e.consume_if_type(";")}},Ju=class{constructor(e){this.parsers=e}parsers;parse_type(e,t){e.consume(It);let n,r;if(e.peek_type()==="IDENTIFIER"){let o=this.parsers.consume_identifier_ref(e);n=o.prefix,r=o.name}else r=e.consume().trim();let i=new bu({name:r,prefix:n});if(e.consume_if_type("{")){let o=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";){let a=this.parsers.dispatch_key(e);if(a===Di)this.parse_type_pattern(e,o,i);else if(a===ji)this.parse_type_length(e,o,i);else if(a===Yi)this.parse_type_range(e,o,i);else if(a===Bi)this.parse_type_fraction_digits(e,o,i);else if(a===Ri)this.parse_type_enum(e,o,i);else if(a===hs)this.parsers.bits_parser.parse_type_bit(e,o,i);else if(a===Li)this.parse_type_path(e,o,i);else if(a===Pi)this.parse_type_require_instance(e,o,i);else if(a===At)this.parse_type_base(e,o,i);else if(a===It){let c=this.parse_type(e,o);i.types.push(c)}else this.parsers.parseStatement(e,o)}e.consume_type("}"),i.name===fu&&i.enums.length===0&&e.syntaxError("enumeration type must contain at least one enum statement")}let s=t.current_parent;return s&&"type"in s&&!s.type&&(s.type=i),e.consume_if_type(";"),i}parse_type_base(e,t,n){e.consume(At),n.identityref_bases.push(this.parsers.consume_identifier_ref(e)),e.consume_if_type(";")}parse_type_pattern(e,t,n){e.consume(Di);let r=this.parsers.parse_string_concatenation(e),i=!1,s,o;if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";){let a=this.parsers.dispatch_key(e);a===Nt?(e.consume(Nt),s=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):a===qi?(e.consume(qi),o=this.parsers.parse_string_concatenation(e),e.consume_if_type(";")):a===Mi?(e.consume(Mi),i=e.consume()==="invert-match",e.consume_if_type(";")):this.parsers.parseStatement(e,t)}e.consume_type("}")}n.patterns.push(new vu({pattern:r,invert_match:i,error_message:s,error_app_tag:o})),e.consume_if_type(";")}parse_type_length(e,t,n){e.consume(ji),n.length=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_range(e,t,n){e.consume(Yi),n.range=this.parsers.parse_string_argument(e),e.consume_if_type(";")}parse_type_fraction_digits(e,t,n){e.consume(Bi),n.fraction_digits=Number.parseInt(e.consume_type("INTEGER"),10),e.consume_if_type(";")}parse_type_enum(e,t,n){if(e.consume(Ri),n.enums.push(e.consume()),e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";")}parse_type_path(e,t,n){e.consume(Li);let r=this.parsers.parse_string_argument(e);n.path=Ts(r),e.consume_if_type(";")}parse_type_require_instance(e,t,n){e.consume(Pi);let[,r]=e.consume_oneof([R,X]);n.require_instance=r===R,e.consume_if_type(";")}},Zu=class{constructor(e){this.parsers=e,this.typedefBodyDispatch=kt(this.parsers,{[It]:(t,n)=>{this.parsers.type_parser.parse_type(t,n)},[xt]:(t,n)=>{this.parsers.parse_typedef_default(t,n)}})}parsers;typedefBodyDispatch;parse_typedef(e,t){e.consume(Vn);let n=e.consume_type("IDENTIFIER"),r=new Ns({name:n}),i=`typedef '${n}'`;if(e.consume_if_type("{")){let s=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";){let o=this.parsers.substatement_handler(e,this.typedefBodyDispatch);o?o(e,s):this.parsers.skip_unsupported_or_raise_unknown(e,i)}e.consume_type("}")}return t.module.typedefs[n]=r,this.parsers.add_to_parent_or_module(t,r),e.consume_if_type(";"),r}},ep=class{constructor(e){this.parsers=e}parsers;parse_uses(e,t){e.consume(Pe);let n,r;if(e.peek_type()==="IDENTIFIER"){let s=this.parsers.consume_identifier_ref(e);n=s.prefix,r=s.name}else r=e.consume().trim();let i=new Kn({name:"uses",grouping_name:r,grouping_prefix:n});if(e.consume_if_type("{")){let s=t.push_parent(i);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,s);e.consume_type("}")}return this.parsers.add_to_parent_or_module(t,i),e.consume_if_type(";"),i}},tp=class{constructor(e){this.parsers=e}parsers;parse_when(e,t){e.consume(Q);let n=this.parsers.parse_string_concatenation(e),r=new Nu({expression:n});if(e.consume_if_type("{")){let i=t.push_parent(r);for(;e.has_more()&&e.peek_type()!=="}";)this.parsers.parseStatement(e,i);e.consume_type("}")}t.current_parent instanceof M&&(t.current_parent.when=r),e.consume_if_type(";")}},Ls=new Set([uu,pu]);function np(e){let t=0;for(;e.has_more();){let n=e.peek_type();if(n==="{")t+=1,e.consume_type("{");else if(n==="}"){if(t-=1,e.consume_type("}"),t===0)return}else e.consume()}}function rp(e,{context:t}){let n=e.peek_token();if(!n||!Ls.has(n.value))return;let r=n.value,[i,s]=e.position(),o=e.filename??"<string>";for(console.warn(`Ignoring unsupported YANG statement '${r}' (${t}) at ${o}:${i}:${s}`),e.consume();e.has_more();){let a=e.peek_type();if(a==="{"){np(e);break}if(a===";"){e.consume_type(";");return}if(a==="}")return;e.consume()}e.consume_if_type(";")}function ip(e){let t=e.peek_token();return t!==void 0&&Ls.has(t.value)}function sp(e){e.consume(Gn),e.peek_type()==="IDENTIFIER"&&e.consume_type("IDENTIFIER"),e.consume_if_type(";")}function op(e){if(typeof e.keyword=="string"&&e.keyword.trim().length>0)return e.keyword;throw new A("Internal error: cannot serialize AST statement without a keyword")}var ap=class{importResolver;anydata_parser=new Cu(this);anyxml_parser=new $u(this);augment_parser=new Lu(this);bits_parser=new Pu(this);choice_parser=new Fu(this);container_parser=new Du(this);extension_parser=new Mu(this);feature_parser=new ju(this);grouping_parser=new Bu(this);identity_parser=new Yu(this);leaf_parser=new Uu(this);leaf_list_parser=new Vu(this);list_parser=new Gu(this);module_parser=new Ku(this);notification_parser=new qu(this);rpc_parser=new Wu(this);must_parser=new zu(this);refine_parser=new Hu(this);revision_parser=new Xu(this);submodule_parser=new Qu(this,this.module_parser);type_parser=new Ju(this);typedef_parser=new Zu(this);uses_parser=new ep(this);when_parser=new tp(this);statementKeywordHandlers={[ue]:(e,t)=>this.fromAst(this.leaf_parser.parse_leaf(e,t)),[pe]:(e,t)=>this.fromAst(this.leaf_list_parser.parse_leaf_list(e,t)),[oe]:(e,t)=>this.fromAst(this.container_parser.parse_container(e,t)),[fe]:(e,t)=>this.fromAst(this.list_parser.parse_list(e,t)),[Rt]:(e,t)=>this.fromAst(this.notification_parser.parse_notification(e,t)),[Is]:(e,t)=>this.fromAst(this.rpc_parser.parse_rpc(e,t)),[le]:(e,t)=>this.fromAst(this.anydata_parser.parse_anydata(e,t)),[de]:(e,t)=>this.fromAst(this.anyxml_parser.parse_anyxml(e,t)),[ae]:(e,t)=>this.fromAst(this.choice_parser.parse_choice(e,t)),[Et]:()=>{throw new L("'case' is only valid as a substatement of 'choice' (RFC 7950)")},[Ke]:()=>{throw new L("'input' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[qe]:()=>{throw new L("'output' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)")},[Vn]:(e,t)=>this.fromAst(this.typedef_parser.parse_typedef(e,t)),[It]:(e,t)=>this.fromType(this.type_parser.parse_type(e,t)),[Pe]:(e,t)=>this.fromAst(this.uses_parser.parse_uses(e,t)),[gs]:(e,t)=>(this.refine_parser.parse_refine(e,t),{__class__:"YangStatement",keyword:"refine",statements:[]}),[Ce]:(e,t)=>this.fromMust(this.must_parser.parse_must(e,t)),[Q]:(e,t)=>(this.when_parser.parse_when(e,t),{__class__:"YangStatement",keyword:"when",statements:[]}),[As]:(e,t)=>this.fromAst(this.extension_parser.parse_extension_stmt(e,t)),[xs]:(e,t)=>(this.feature_parser.parse_feature_stmt(e,t),{__class__:"YangStatement",keyword:"feature",statements:[]}),[J]:(e,t)=>(this.feature_parser.parse_if_feature_stmt(e,t),{__class__:"YangStatement",keyword:"if-feature",statements:[]}),[ms]:(e,t)=>(this.identity_parser.parse_identity(e,t),{__class__:"YangStatement",keyword:"identity",statements:[]}),[_s]:(e,t)=>(this.grouping_parser.parse_grouping(e,t),{__class__:"YangStatement",keyword:"grouping",statements:[]}),[ws]:(e,t)=>this.fromAst(this.augment_parser.parse_augment(e,t)),[ds]:(e,t)=>(this.revision_parser.parse_revision(e,t),{__class__:"YangStatement",keyword:"revision",statements:[]}),[Oe]:(e,t)=>({__class__:"YangStatement",keyword:"description",argument:this.parse_description(e,t),name:"description",statements:[]}),[Tt]:(e,t)=>(this.parse_leaf_mandatory(e,t),{__class__:"YangStatement",keyword:"mandatory",statements:[]}),[xt]:(e,t)=>(this.parse_leaf_default(e,t),{__class__:"YangStatement",keyword:"default",statements:[]}),[Ui]:(e,t)=>(this.parse_list_key(e,t),{__class__:"YangStatement",keyword:"key",statements:[]}),[Vi]:(e,t)=>(this.parse_min_elements(e,t),{__class__:"YangStatement",keyword:"min-elements",statements:[]}),[Gi]:(e,t)=>(this.parse_max_elements(e,t),{__class__:"YangStatement",keyword:"max-elements",statements:[]}),[Ki]:(e,t)=>(this.parse_ordered_by(e),{__class__:"YangStatement",keyword:"ordered-by",statements:[]}),[Fn]:(e,t)=>(this.parse_presence(e,t),{__class__:"YangStatement",keyword:"presence",statements:[]}),[ze]:(e,t)=>(this.parse_reference(e,t),{__class__:"YangStatement",keyword:"reference",statements:[]}),[Dn]:(e,t)=>(this.parse_config(e,t),{__class__:"YangStatement",keyword:"config",statements:[]})};constructor(e={}){this.importResolver=e.importResolver}dispatch_key(e){return e.peek_type()==="IDENTIFIER"?e.peek()??"":e.peek_type()}assertStatementStartAllowed(e,t,n){let r=t instanceof Set?t:new Set(t),i=this.dispatch_key(e);if(r.has(i)||e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return;let s=n?` ${n}`:"",o=e.peek()??"<end>",a=[...r].map(c=>String(c)).sort().join(", ");throw new L(`Invalid statement starting with '${o}'${s}. Allowed here: ${a}; prefixed extension statements (identifier:keyword) are also allowed.`)}parseModule(e,t){let n=this.parseStatement(e,t);if(n.keyword!=="module")throw new A("Expected top-level 'module' statement");return n}serializeAstStatement(e){return this.fromAst(e)}parseStatement(e,t,n){n?.allowedStatementStarts&&this.assertStatementStartAllowed(e,n.allowedStatementStarts,n.restrictionContext);let r=this.dispatch_key(e);if(e.peek_type()==="IDENTIFIER"&&e.peek_type_at(1)===":")return this.parse_prefixed_extension_statement(e,t);let i=this.statementKeywordHandlers[r];return i?i(e,t):this.parse_statement_generic(e,t)}parse_statement_generic(e,t){let n=this.dispatch_key(e);if(n===Rn)return this.parse_top_level_module(e,t);if(n===Ss)return this.submodule_parser.parse_submodule(e,t),{__class__:"YangStatement",keyword:"submodule",statements:[]};if(n===fs)return this.module_parser.parse_yang_version(e,t),{__class__:"YangStatement",keyword:"yang-version",argument:t.module.yang_version,name:"yang-version",statements:[]};if(n===us)return this.module_parser.parse_namespace(e,t),{__class__:"YangStatement",keyword:"namespace",argument:t.module.namespace,name:"namespace",statements:[]};if(n===Te)return this.module_parser.parse_prefix(e,t),{__class__:"YangStatement",keyword:"prefix",argument:t.module.prefix,name:"prefix",statements:[]};if(n===ps)return this.module_parser.parse_organization(e,t),{__class__:"YangStatement",keyword:"organization",statements:[]};if(n===ls)return this.module_parser.parse_contact(e,t),{__class__:"YangStatement",keyword:"contact",statements:[]};if(n===ys)return this.module_parser.parse_import_stmt(e,t),{__class__:"YangStatement",keyword:"import",statements:[]};if(n===vs)return this.module_parser.parse_include_stmt(e,t),{__class__:"YangStatement",keyword:"include",statements:[]};if(this.skip_unsupported_if_present(e,"generic"))return{__class__:"YangStatement",keyword:"unsupported",statements:[]};let r=e.peek();(r===Ke||r===qe)&&e.syntaxError(`'${r}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`);let s=e.consume();e.peek_type()===":"&&(e.consume_type(":"),s=`${s}:${e.consume_type("IDENTIFIER")}`);let o=this.parse_argument(e),a=[];if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)a.push(this.parseStatement(e,t));e.consume_type("}"),e.consume_if_type(";")}else e.consume_if_type(";");let c={__class__:"YangStatement",keyword:s,name:o,argument:o,statements:a};return s==="type"&&(c.type=this.extract_type_shape(c)),c}parse_argument(e){let t=[];for(;e.has_more();){let n=e.peek_type();if(n===";"||n==="{")break;n==="STRING"?t.push(this.parse_string_concatenation(e)):n==="+"?e.consume_type("+"):t.push(e.consume())}return t.join("").trim()}parse_string_concatenation(e){let t=[e.consume_type("STRING")];for(;e.has_more()&&e.peek_type()==="+";)e.consume_type("+"),t.push(e.consume_type("STRING"));return t.join("")}parse_string_argument(e){return e.peek_type()==="STRING"?this.parse_string_concatenation(e):e.consume().replace(/^['"]|['"]$/g,"")}substatement_handler(e,t){let n=this.dispatch_key(e);if(typeof n=="string")return t[n]}skip_unsupported_or_raise_unknown(e,t){let n=e.peek();if((n===Ke||n===qe)&&e.syntaxError(`'${n}' is only valid as a substatement of 'rpc' or 'action' (RFC 7950)`),this.skip_unsupported_if_present(e,t))return!0;let r=e.peek()??"<eof>";e.syntaxError(`Invalid or unknown statement '${r}' in ${t}`)}parse_prefixed_extension_statement_public(e,t){this.parse_prefixed_extension_statement(e,t)}consume_identifier_ref(e){let t=e.consume_type("IDENTIFIER").trim();return e.consume_if_type(":")?{prefix:t,name:e.consume_type("IDENTIFIER").trim()}:{name:t}}consume_qname_from_identifier(e){let t=this.consume_identifier_ref(e);return t.prefix?`${t.prefix}:${t.name}`:t.name}add_to_parent_or_module(e,t){let n=e.current_parent;if(n&&Array.isArray(n.statements)){n.statements.push(t);return}let r=e.module;Array.isArray(r.statements)&&r.statements.push(t)}skip_unsupported_if_present(e,t){return ip(e)?(rp(e,{context:t}),!0):!1}parse_top_level_module(e,t){e.consume(Rn);let n=e.consume_type("IDENTIFIER");t.module.name=n,e.consume_type("{");let r=[];for(;e.has_more()&&e.peek_type()!=="}";)r.push(this.parseStatement(e,t));return e.consume_type("}"),{__class__:"YangStatement",keyword:"module",name:n,argument:n,statements:r}}fromAst(e){let t=op(e),n=[...this.serializeAstChildren(e.statements??[]),...this.serializeAstChildren(e.cases??[])],r={__class__:"YangStatement",keyword:t,name:e.name,argument:e.name,statements:n};e.type&&(r.type=this.fromTypeShape(e.type)),e.mandatory!==void 0&&(r.mandatory=e.mandatory),e.default!==void 0&&(r.default=e.default);let i=e.config;if(typeof i=="boolean"&&(r.config=i),t==="leaf-list"){let u=e.defaults;Array.isArray(u)&&u.length>0&&(r.defaults=[...u])}e.key!==void 0&&(r.key=e.key);let s=e.min_elements;typeof s=="number"&&(r.min_elements=s);let o=e.max_elements;typeof o=="number"&&(r.max_elements=o),e.description&&(r.description=e.description);let a=e.reference;if(a&&(r.reference=a),Array.isArray(e.if_features)&&e.if_features.length>0&&(r.if_features=[...e.if_features]),t==="extension"&&(typeof e.argument_name=="string"&&(r.argument_name=e.argument_name),typeof e.argument_yin_element=="boolean"&&(r.argument_yin_element=e.argument_yin_element)),t==="augment"&&typeof e.augment_path=="string"){r.argument=e.augment_path,r.augment_path=e.augment_path;let u=e.augment_path_segments;Array.isArray(u)&&u.length>0&&(r.augment_path_segments=u.map(p=>p.prefix?{prefix:p.prefix,name:p.name}:{name:p.name}))}if(t==="extension-invocation"&&(r.keyword=e.name??"extension-invocation",r.argument=e.argument,r.prefix=e.prefix,r.resolved_module_name=e.resolved_module?.name,r.resolved_extension_name=e.resolved_extension?.name),e.when&&typeof e.when.expression=="string"&&(r.when={expression:e.when.expression,description:e.when.description??"",evaluate_with_parent_context:e.when.evaluate_with_parent_context??!1}),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(r.statements=[...r.statements??[],...e.must_statements.map(u=>this.fromMust(u))]),t==="uses"){let u=e;typeof u.grouping_name=="string"&&u.grouping_name.length>0&&(r.grouping_name=u.grouping_name,typeof u.grouping_prefix=="string"&&u.grouping_prefix.length>0&&(r.grouping_prefix=u.grouping_prefix),r.argument=u.grouping_qname()),Array.isArray(u.refines)&&u.refines.length>0&&(r.refines=u.refines.map(p=>this.serializeRefineStmt(p)))}let c=e.presence;return typeof c=="string"&&c.length>0&&(r.presence=c),r}serializeRefineStmt(e){let t={__class__:"YangStatement",keyword:"refine",name:"refine",argument:e.target_path,refine_target_path:e.target_path,statements:[]};return typeof e.min_elements=="number"&&(t.min_elements=e.min_elements),typeof e.max_elements=="number"&&(t.max_elements=e.max_elements),typeof e.refined_mandatory=="boolean"&&(t.refined_mandatory=e.refined_mandatory),Array.isArray(e.refined_defaults)&&e.refined_defaults.length>0&&(t.refined_defaults=[...e.refined_defaults]),typeof e.refined_config=="boolean"&&(t.refined_config=e.refined_config),Array.isArray(e.if_features)&&e.if_features.length>0&&(t.if_features=[...e.if_features]),typeof e.description=="string"&&e.description.length>0&&(t.description=e.description),Array.isArray(e.must_statements)&&e.must_statements.length>0&&(t.statements=e.must_statements.map(n=>this.fromMust(n))),t}serializeAstChildren(e){let t=[];for(let n of e)!n||typeof n!="object"||t.push(this.fromAst(n));return t}fromType(e){let t=ke({name:e.name,prefix:e.prefix});return{__class__:"YangStatement",keyword:"type",name:e.name,argument:t,type:this.fromTypeShape(e),statements:[]}}fromMust(e){return{__class__:"YangStatement",keyword:"must",name:e.expression,argument:e.expression,error_message:e.error_message,description:e.description,statements:[]}}fromTypeShape(e){let t={name:e.name,patterns:e.patterns.map(n=>({pattern:n.pattern,invert_match:n.invert_match,error_message:n.error_message,error_app_tag:n.error_app_tag})),length:e.length,range:e.range,fraction_digits:e.fraction_digits,path:e.path,require_instance:e.require_instance,identityref_bases:e.identityref_bases.map(n=>n.prefix?{prefix:n.prefix,name:n.name}:{name:n.name}),enums:[...e.enums],bits:e.bits.map(n=>({name:n.name,position:n.position??0})),types:e.types.map(n=>this.fromTypeShape(n))};return e.prefix&&(t.prefix=e.prefix),t}extract_type_shape(e){let t=e.argument??"string",n={name:t};for(let r of e.statements??[]){if(r.keyword==="pattern"&&r.argument){let i=n.patterns??[];i.push({pattern:r.argument,invert_match:!1}),n.patterns=i}if(r.keyword==="length"&&r.argument&&(n.length=r.argument),r.keyword==="range"&&r.argument&&(n.range=r.argument),r.keyword==="fraction-digits"&&r.argument){let i=Number.parseInt(r.argument,10);Number.isNaN(i)||(n.fraction_digits=i)}if(r.keyword==="enum"&&r.argument&&(n.enums=[...n.enums??[],r.argument]),r.keyword==="bit"&&r.argument){let i=n.bits??[];i.push({name:r.argument,position:i.length===0?0:Math.max(...i.map(s=>s.position))+1}),n.bits=i}t==="union"&&r.keyword==="type"&&(n.types=[...n.types??[],this.extract_type_shape(r)])}return n}parse_description(e,t){e.consume(Oe);let n=e.consume_type("STRING");if(e.consume_if_type("{")){for(;e.has_more()&&e.peek_type()!=="}";)e.consume();e.consume_type("}")}e.consume_if_type(";");let r=t.current_parent;return r&&"description"in r&&(r.description=n),n}parse_optional_description(e,t){e.has_more()&&e.peek()===Oe&&this.parse_description(e,t)}parse_reference(e,t){e.consume(ze);let n=e.consume_type("STRING");e.consume_if_type(";");let r=t.current_parent;r&&typeof r=="object"&&"reference"in r&&(r.reference=n)}parse_reference_string_only(e,t){this.parse_reference(e,t)}parse_status_ignored(e,t){sp(e)}parse_config(e,t){e.consume(Dn);let n=e.consume_oneof([R,X])[1],r=t.current_parent;r instanceof St?r.refined_config=n===R:r&&typeof r=="object"&&"config"in r&&(r.config=n===R),e.consume_if_type(";")}parse_typedef_default(e,t){e.consume(xt);let n=t.current_parent;n instanceof Ns&&(n.default=this.parse_default_value_tokens(e)),e.consume_if_type(";")}register_import(e,t,n,r,i){let s=e.module,o=String(s.prefix??"").replace(/^['"]|['"]$/g,"");if(n===o)throw new A(`Import prefix '${n}' must differ from this module's prefix`);let a=s.import_prefixes??{};if(s.import_prefixes=a,a[n])throw new A(`Duplicate import prefix '${n}'`);if(!this.importResolver)throw new A("Import resolution is not configured for this parser instance");a[n]=this.importResolver(t,n,r,e,i)}parse_ordered_by(e){e.consume(Ki),e.consume(),e.consume_if_type(";")}parse_list_key(e,t){e.consume(Ui);let[n]=e.consume_oneof(["STRING","IDENTIFIER"]),r=t.current_parent;r&&"key"in r&&(r.key=n),e.consume_if_type(";")}parse_min_elements(e,t){e.consume(Vi);let n=Number.parseInt(e.consume_type("INTEGER"),10),r=t.current_parent;r&&"min_elements"in r&&(r.min_elements=n),e.consume_if_type(";")}parse_max_elements(e,t){e.consume(Gi);let n=Number.parseInt(e.consume_type("INTEGER"),10),r=t.current_parent;r&&"max_elements"in r&&(r.max_elements=n),e.consume_if_type(";")}parse_leaf_mandatory(e,t){e.consume(Tt);let[,n]=e.consume_oneof([R,X]),r=t.current_parent;if(r instanceof St){r.refined_mandatory=n===R,e.consume_if_type(";");return}r&&typeof r=="object"&&"mandatory"in r&&(r.mandatory=n===R),e.consume_if_type(";")}parse_leaf_default(e,t){e.consume(xt);let n=this.parse_default_value_tokens(e),r=t.current_parent;r instanceof St?r.refined_defaults.push(n):r instanceof Cs?r.defaults.push(n):r&&typeof r=="object"&&"default"in r&&(r.default=n),e.consume_if_type(";")}parse_presence(e,t){e.consume(Fn);let n=t.current_parent,r=e.consume_type("STRING");n&&"presence"in n&&(n.presence=r),e.consume_if_type(";")}parse_default_value_tokens(e){let t=e.peek_type();if(t==="STRING")return e.consume_type("STRING");if(t==="INTEGER")return e.consume_type("INTEGER");if(t==="IDENTIFIER")return e.consume_type("IDENTIFIER");if(t===R)return e.consume(R),"true";if(t===X)return e.consume(X),"false";throw new A(`Expected default value, got ${t}`)}parse_prefixed_extension_statement(e,t){let n=e.consume_type("IDENTIFIER");e.consume_type(":");let r=e.consume_type("IDENTIFIER"),i=this.resolve_prefixed_module(t,n);if(!i)throw new A(`Unknown extension prefix '${n}' in invocation ${n}:${r}`);let s=this.resolve_extension_definition(i,r);if(!s)throw new A(`Unknown extension '${r}' in module '${i.name??""}' for invocation ${n}:${r}`);let o=this.consume_optional_extension_argument(e),a=new Tu({name:`${n}:${r}`,prefix:n,resolved_module:i,resolved_extension:s,argument:o});if(e.consume_if_type("{")){let c=t.push_parent(a);for(;e.has_more()&&e.peek_type()!=="}";)this.parseStatement(e,c);e.consume_type("}")}return e.consume_if_type(";"),this.add_to_parent_or_module(t,a),this.fromAst(a)}consume_optional_extension_argument(e){if(!e.has_more())return;let t=e.peek_type();if(!(t==="{"||t===";")){if(t==="STRING")return this.parse_string_concatenation(e);if(t==="IDENTIFIER"||t==="INTEGER"||t==="DOTTED_NUMBER"||t===R||t===X)return e.consume()}}resolve_prefixed_module(e,t){let n=e.module,r=String(n.prefix??"").replace(/^['"]|['"]$/g,"");return t===r?n:n.import_prefixes?.[t]}resolve_extension_definition(e,t){let n=e.extensions?.[t];if(n)return n;let i=(Array.isArray(e.statements)?e.statements:[]).find(s=>s.keyword==="extension"&&s.name===t);if(i)return new Mn({name:t,argument_name:typeof i.argument_name=="string"?i.argument_name:"",argument_yin_element:typeof i.argument_yin_element=="boolean"?i.argument_yin_element:void 0})}};function cp(e,t){if(t!=="'"&&t!=='"')throw new Error(`quote must be "'" or '"', got ${JSON.stringify(t)}`);let n=[],r=0,i=e.length;for(;r<i;){let s=e[r];if(s!=="\\"||r+1>=i){n.push(s),r+=1;continue}let o=e[r+1];if(o==="\\"){n.push("\\"),r+=2;continue}if(o==="n"){n.push(`
`),r+=2;continue}if(o==="t"){n.push("	"),r+=2;continue}if(t==='"'&&o==='"'){n.push('"'),r+=2;continue}if(t==="'"&&o==="'"){n.push("'"),r+=2;continue}if(o==="\r"||o===`
`){for(r+=2,o==="\r"&&r<i&&e[r]===`
`&&(r+=1);r<i&&(e[r]===" "||e[r]==="	");)r+=1;continue}n.push("\\",o),r+=2}return n.join("")}var fp=/[A-Za-z_]/,up=/[A-Za-z0-9_.-]/,pp=class{tokenize(e,t){let n=[],r=0,i=e.length,s=1,o=0,a=()=>{r<i&&e[r]===`
`&&(s+=1,o=r+1),r+=1},c=(u,p,d,m,f)=>{let l=d-f;n.push(Ti(u,p,m,l))};for(;r<i;){if(/\s/.test(e[r])){a();continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="*"){for(a(),a();r<i;){if(r+1<i&&e[r]==="*"&&e[r+1]==="/"){a(),a();break}a()}continue}if(e[r]==="/"&&r+1<i&&e[r+1]==="/"){for(a(),a();r<i&&e[r]!==`
`;)a();continue}let u=e[r];if(u==='"'||u==="'"){let p=u,d=r,m=s,f=o;a();let l=r;for(;r<i&&e[r]!==p;)e[r]==="\\"&&r+1<i&&a(),a();c("STRING",cp(e.slice(l,r),p),d,m,f),a();continue}if(u==="-"&&r+1<i&&/\d/.test(e[r+1])){let p=r,d=s,m=o;a();let f=r;for(;r<i&&/\d/.test(e[r]);)a();c("INTEGER",`-${e.slice(f,r)}`,p,d,m);continue}if(/\d/.test(u)){let p=r,d=s,m=o,f=r;for(;r<i&&/\d/.test(e[r]);)a();if(r<i&&e[r]==="."&&r+1<i&&/\d/.test(e[r+1])){for(a();r<i&&/\d/.test(e[r]);)a();c("DOTTED_NUMBER",e.slice(f,r),p,d,m)}else c("INTEGER",e.slice(f,r),p,d,m);continue}if(fp.test(u)){let p=r,d=s,m=o,f=r;for(a();r<i&&up.test(e[r]);)a();let l=e.slice(f,r);c("IDENTIFIER",l,p,d,m);continue}u==="{"?(c("{",u,r,s,o),a()):u==="}"?(c("}",u,r,s,o),a()):u===";"?(c(";",u,r,s,o),a()):u===":"?(c(":",u,r,s,o),a()):u==="="?(c("=",u,r,s,o),a()):u==="+"?(c("+",u,r,s,o),a()):(u==="/"&&c("/",u,r,s,o),a())}return new Ni(n,e,t)}},We="ietf-yang-structure-ext:structure-index";function K(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function He(e){return Array.isArray(e)?e:[]}function lp(e){return JSON.parse(JSON.stringify(e))}function dp(e,t){if(t.length===0)return;let n=Array.isArray(e.if_features)?e.if_features:[];e.if_features=[...t,...n]}function mp(e,t){if(!t||typeof t.expression!="string")return;let n=t.expression,r=K(e.when)?e.when:void 0,i=typeof r?.expression=="string"?r.expression:void 0;if(i){let s=typeof r?.description=="string"?r.description:"";e.when={expression:`(${n}) and (${i})`,description:s,evaluate_with_parent_context:!0};return}e.when={expression:n,description:typeof t.description=="string"?t.description:"",evaluate_with_parent_context:!0}}function hp(e,t){try{return Xe(e)}catch(n){let r=n instanceof Error?n.message:String(n);throw new A(`${t}: ${r}`)}}function Zi(e,t,n,r){let i=String(e.prefix??"").replace(/^['"]|['"]$/g,"");if(t===i)return e;let s=K(e.import_prefixes)?e.import_prefixes:void 0,o=s&&K(s[t])?s[t]:void 0;if(!o)throw new A(`${r}: unknown prefix '${t}' in path '${n}'`);return o}function _p(e,t){return He(e.statements).find(r=>r.name===t)}function gp(e,t){let n=K(e.extension_runtime)?e.extension_runtime:void 0,i=(n&&K(n[We])?n[We]:void 0)?.[t];return K(i)?i:He(e.statements).find(o=>(typeof o.resolved_extension_name=="string"?o.resolved_extension_name:"")==="structure"&&String(o.argument??"").trim()===t)}function yp(e,t){let n=hp(t,"augment-structure"),r=n[0],i=r.prefix,s=Zi(e,i,t,"augment-structure"),o=gp(s,r.name);if(!o)throw new A(`augment-structure: no top-level structure '${r.name}' in path '${t}'`);for(let a of n.slice(1)){Zi(e,a.prefix,t,"augment-structure");let c=_p(o,a.name);if(!c)throw new A(`augment-structure: no child '${a.name}' in path '${t}'`);o=c}return o}function vp(e,t){let n=String(e.resolved_module_name??""),r=String(e.resolved_extension_name??"");if(n!=="ietf-yang-structure-ext")return e;if(r==="structure"){let i=K(t.extension_runtime)?t.extension_runtime:t.extension_runtime={},s=K(i[We])?i[We]:i[We]={},o=String(e.argument??"").trim();return o.length>0&&(s[o]=e,e.name=o),e.data_node_kind="container",e}if(r==="augment-structure"){let i=String(e.argument??""),s=yp(t,i),o=He(e.statements).map(u=>lp(u)),a=Array.isArray(e.if_features)?e.if_features:[],c=K(e.when)?e.when:void 0;for(let u of o){dp(u,a),mp(u,c);let p=He(s.statements);p.push(u),s.statements=p}return}return e}function Ps(e,t){let n=He(e.statements),r=[];for(let i of n){let s=i;typeof i.resolved_module_name=="string"&&typeof i.resolved_extension_name=="string"&&(s=vp(i,t)),s&&(Ps(s,t),r.push(s))}e.statements=r}function bp(e){Ps(e,e)}var xp=new Set(["container","list","leaf","leaf-list","choice","case","anydata","anyxml","notification","rpc","action","input","output"]);function Rs(e){return JSON.parse(JSON.stringify(e))}function $e(e){return Array.isArray(e)?e:[]}function wp(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function es(e,t){if(t===wp(e))return e;let r=e.import_prefixes?.[t];return r&&typeof r=="object"?r:void 0}function Sp(e,t){let n=e.augment_path_segments;if(Array.isArray(n)&&n.length>0)return n;try{return Xe(t)}catch(r){throw new L(r instanceof Error?r.message:String(r))}}function Fs(e){let t=typeof e.keyword=="string"?e.keyword:"";return!!e.name&&xp.has(t)}function Ap(e,t){for(let n of $e(e.statements))if(n.name===t&&Fs(n))return n}function Ip(e,t){for(let n of $e(e.statements))if(n.name===t&&Fs(n))return n}function Ep(e,t,n){return Tp({ctxModule:e,path:t,segments:n?Sp(n,t):void 0,kind:"augment",findToplevel:Ip})}function Tp(e){let{ctxModule:t,path:n,kind:r,findToplevel:i}=e,s=e.segments;if(!s||s.length===0)try{s=Xe(n)}catch(d){throw new L(d instanceof Error?d.message:String(d))}let o=s[0],a=o.prefix,c=o.name,u=es(t,a);if(!u)throw new L(`${r}: unknown prefix '${a}' in path '${n}' (module '${String(t.name??"")}')`);let p=i(u,c);if(!p)throw new L(`${r}: no top-level schema node '${c}' in module '${String(u.name??"")}' (path '${n}')`);for(let d of s.slice(1)){let m=d.prefix,f=d.name;if(!es(t,m))throw new L(`${r}: unknown prefix '${m}' in path '${n}'`);let l=Ap(p,f);if(!l)throw new L(`${r}: no child '${f}' under node in path '${n}' (after '${String(p.name??"")}')`);p=l}if(!Array.isArray(p.statements)&&p.statements!==void 0)throw new L(`${r}: target node '${String(p.name??"?")}' cannot contain schema substatements (path '${n}')`);return p.statements===void 0&&(p.statements=[]),p}function Ds(e,t){e.defining_module=t;for(let n of $e(e.statements))Ds(n,t)}function Np(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function kp(e,t){let n=e.when;if(!n||typeof n.expression!="string"||n.expression.trim()==="")return;let r={...Rs(n),evaluate_with_parent_context:!0},i=t.when;if(!i?.expression){t.when=r;return}t.when={...i,expression:`(${String(i.expression)}) and (${n.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function Op(e,t,n){let r=$e(e.statements).map(s=>Rs(s));for(let s of r)Ds(s,n),Np(e,s),kp(e,s);let i=$e(t.statements);for(let s of r)i.push(s);t.statements=i}function Cp(e){let t=e.data,n=$e(t.statements),r=n.filter(s=>s.keyword==="augment");if(r.length===0)return e;let i=String(t.name??"");for(let s of r){let o=String(s.augment_path??s.argument??""),a=Ep(t,o,s);Op(s,a,i)}return t.statements=n.filter(s=>s.keyword!=="augment"),e}function se(e){return JSON.parse(JSON.stringify(e))}function Ms(e){return!e||typeof e!="object"?{}:e}function js(e){return!e||typeof e!="object"?{}:e}function Bs(e){if(typeof e.grouping_name!="string"||!e.grouping_name)return;let t=e.grouping_name,n=typeof e.grouping_prefix=="string"&&e.grouping_prefix?e.grouping_prefix:void 0;return n?{prefix:n,name:t}:{name:t}}function $p(e,t){let n=ke(e);if(!e.name)throw new A("Empty grouping name in uses");if(e.prefix){let i=t.import_prefixes[e.prefix];if(!i)throw new A(`Unknown import prefix '${e.prefix}' in uses '${n}'`);let s=Ms(i.groupings),o=s[e.name];if(!o)throw new A(`Unknown grouping '${n}'`);return{key:n,grouping:o,nestedScope:{groupings:s,import_prefixes:js(i.import_prefixes)}}}let r=t.groupings[e.name];if(!r)throw new A(`Unknown grouping '${n}'`);return{key:n,grouping:r,nestedScope:t}}function Ys(e,t){let n=e.if_features;if(!Array.isArray(n)||n.length===0)return;let r=Array.isArray(t.if_features)?t.if_features:[];t.if_features=[...n,...r]}function Us(e,t){let n=e.when;if(!n||typeof n.expression!="string"||n.expression.trim()==="")return;let r={...se(n),evaluate_with_parent_context:!0},i=t.when;if(!i?.expression){t.when=r;return}t.when={...i,expression:`(${i.expression}) and (${n.expression})`,description:String(i.description??""),evaluate_with_parent_context:!0}}function Vs(e,t){for(let n of e)if(n.name===t)return n;for(let n of e){let r=Vs(n.statements??[],t);if(r)return r}}function Gs(e,t){if(t.length===0)return;let[n,...r]=t,i=Vs(e,n);if(i)return r.length===0?i:Gs(i.statements??[],r)}function Ks(e,t){let n=e.refines;if(!(!Array.isArray(n)||n.length===0))for(let r of n){let i=r.refine_target_path??r.argument??"",s=i.split("/").map(d=>d.trim()).filter(Boolean);if(s.length===0)continue;let o=Gs(t,s);if(!o)throw new $n(i);typeof r.min_elements=="number"&&(o.min_elements=r.min_elements),typeof r.max_elements=="number"&&(o.max_elements=r.max_elements),typeof r.refined_mandatory=="boolean"&&(o.mandatory=r.refined_mandatory),typeof r.refined_config=="boolean"&&(o.config=r.refined_config);let a=r.refined_defaults;Array.isArray(a)&&a.length>0&&(o.keyword==="leaf"?o.default=a[0]:o.keyword==="leaf-list"&&(o.defaults=[...a]));let c=r.if_features;if(Array.isArray(c)&&c.length>0){let d=Array.isArray(o.if_features)?o.if_features:[];o.if_features=[...c,...d]}let u=typeof r.description=="string"?r.description.trim():"";u&&(o.description=u);let p=r.statements??[];p.length>0&&(o.statements=[...o.statements??[],...se(p)])}}function Lp(e,t){let n=typeof t.argument=="string"&&t.argument||typeof t.name=="string"&&t.name||"";if(!n||n in e)return;let r=t.statements?.find(i=>i.keyword==="type");e[n]={name:n,description:typeof t.description=="string"?t.description:"",reference:typeof t.reference=="string"?t.reference:"",default:t.default,type:t.type??r?.type,statements:t.statements??[]}}function Pp(e,t){let n=[];for(let r of t){if(r.keyword==="typedef"){Lp(e,r);continue}n.push(r)}return n}function qs(e,t,n,r){let i=$p(e,t);if(n.includes(i.key))throw new Ln(n,i.key);let s=[...n,i.key],o=i.grouping.statements??[],a=[];for(let u of o)if(u.keyword==="uses"){let p=Bs(u);if(!p)continue;let d=qs(p,i.nestedScope,s,r);Ks(u,d);for(let m of d)Ys(u,m),Us(u,m),a.push(se(m))}else u.keyword,a.push(se(u));return Pp(r,a).map(u=>jn(u,i.nestedScope,s,r))}function jn(e,t,n,r){return e.statements?.length&&(e.statements=Bn(e.statements,t,n,r)),e}function Bn(e,t,n,r){let i=[];for(let s of e)if(s.keyword==="uses"){let o=Bs(s);if(!o)continue;let a=qs(o,t,n,r);Ks(s,a);for(let c of a)Ys(s,c),Us(s,c),i.push(jn(c,t,n,r))}else i.push(jn(se(s),t,n,r));return i}function Rp(e){let t=e.data,n=t.import_prefixes,r=se(t);n&&typeof n=="object"&&(r.import_prefixes=n),t.features instanceof Set&&(r.features=new Set(t.features)),t.feature_if_features&&typeof t.feature_if_features=="object"&&(r.feature_if_features={...t.feature_if_features});let i={groupings:Ms(r.groupings),import_prefixes:js(r.import_prefixes)},s=r.typedefs&&typeof r.typedefs=="object"?r.typedefs:{};r.typedefs=s;let o=r.statements??[];r.statements=Bn(o,i,[],s);for(let a of Object.values(i.groupings))a.statements?.length&&(a.statements=Bn(a.statements,i,[],s));return new Pt(r,e.source)}function Ws(e){let t=[];for(let n of e??[])t.push(n),t.push(...Ws(n.statements));return t}function Fp(e){for(let t of Ws(e.data.statements)){if(t.keyword!=="list"||typeof t.key!="string"||t.key.trim()==="")continue;let n=new Map((t.statements??[]).filter(r=>r.keyword==="leaf"&&typeof r.name=="string").map(r=>[r.name,r]));for(let r of t.key.split(/\s+/).filter(Boolean)){let i=n.get(r);if(i===void 0)throw new A(`List '${t.name??""}': key leaf '${r}' does not exist (RFC 7950: each list key name must refer to a child leaf).`);let s;if(i.when!==void 0?s="when":Array.isArray(i.if_features)&&i.if_features.length>0&&(s="if-feature"),s!==void 0)throw new A(`List '${t.name??""}': key leaf '${i.name}' must not have '${s}' (RFC 7950: 'when' and 'if-feature' are illegal on list keys).`)}}}function Dp(e){Fp(e)}function Mp(e){let t={};if(!e)return t;for(let[n,r]of Object.entries(e)){let i=Array.isArray(r.bases)?r.bases.map(s=>ss(s)).filter(s=>!!s):[];t[n]={bases:i}}return t}function jp(e,t){if(e.keyword!=="module")throw new A("Only 'module' roots are currently supported by TS parser");let n=e.statements??[],r={};for(let c of n)if(c.keyword==="typedef"&&c.argument){let u=c.statements?.find(p=>p.keyword==="type");r[c.argument]={name:c.argument,description:typeof c.description=="string"?c.description:"",reference:typeof c.reference=="string"?c.reference:"",default:c.default,type:c.type??u?.type,statements:c.statements??[]}}let i=t.features,s=t.feature_if_features,o=n.find(c=>c.keyword==="description"),a=typeof o?.argument=="string"?o.argument:"";return{__class__:"YangModule",name:e.argument,yang_version:n.find(c=>c.keyword==="yang-version")?.argument??"1.1",namespace:n.find(c=>c.keyword==="namespace")?.argument??"",prefix:n.find(c=>c.keyword==="prefix")?.argument??"",organization:String(t.organization??""),contact:String(t.contact??""),description:a,typedefs:r,identities:Mp(t.identities),import_prefixes:t.import_prefixes??{},extensions:t.extensions??{},extension_runtime:t.extension_runtime??{},features:i instanceof Set?new Set(i):new Set,feature_if_features:s&&typeof s=="object"?{...s}:{},statements:n}}var Ft=class{expandUses;includePath;moduleCache=new Map;tokenizer=new pp;parsers=new ap({importResolver:(e,t,n,r,i)=>this.resolveImport(e,n,r,i)});constructor(e={}){this.expandUses=e.expand_uses??!0,this.includePath=(e.include_path??[]).map(t=>gt(t))}resolveImportedModulePath(e,t,n){let r=t?.trim(),i=[];r&&i.push(`${e}@${r}.yang`),i.push(`${e}.yang`);let s=[n,...this.includePath];for(let o of s){for(let c of i){let u=gt(o,c);if(su(u))return u}let a=[];try{a=au(o).filter(c=>c.startsWith(`${e}@`)&&c.endsWith(".yang"))}catch{a=[]}if(a.length>0)return a.sort(),gt(o,a[a.length-1])}throw new A(`Could not find imported module '${e}' (tried ${i.join(", ")}) under ${s.join(", ")}`)}resolveImport(e,t,n,r){let i=n.module.__source_path;if(!i)throw new A("import requires a filesystem location: use parseYangFile(), or parseYangString(... from a file-backed source)");let s=this.resolveImportedModulePath(e,t,cu(i));return this.parseFile(s).data}parseTokenStream(e,t){let n={name:"",yang_version:"1.1",namespace:"",prefix:"",organization:"",contact:"",revisions:[],belongs_to_module:"",typedefs:{},identities:{},groupings:{},features:new Set,feature_if_features:{},import_prefixes:{},extensions:{},extension_runtime:{},__source_path:t.kind==="file"?t.value:void 0,statements:[]},r=new ki({module:n,current_parent:{}}),i=this.parsers.parseModule(e,r),s=jp(i,n),o=n.groupings??{},a={};for(let[u,p]of Object.entries(o)){if(!p||typeof p!="object")continue;let d=p,m=d.name??u;a[u]={__class__:"YangStatement",keyword:"grouping",name:m,argument:m,statements:(d.statements??[]).map(f=>this.parsers.serializeAstStatement(f))}}Object.keys(a).length>0&&(s.groupings=a),bp(s);let c=new Pt(s,t);return this.expandUses&&(c=Rp(c),c=Cp(c),Dp(c)),c}parseString(e,t="<memory>"){let n=this.tokenizer.tokenize(e,t),r={kind:"string",value:e,name:t};return this.parseTokenStream(n,r)}parseFile(e){let t=gt(e),n=this.moduleCache.get(t);if(n)return n;let r=ou(t,"utf-8"),i=this.tokenizer.tokenize(r,t),s={kind:"file",value:t,name:t},o=this.parseTokenStream(i,s);return this.moduleCache.set(t,o),o}},km=new Ft;function Bp(e){return String(e??"").replace(/^['"]|['"]$/g,"")}function qn(e){return String(e.name??"")}function zs(e){let t=e.features;return t instanceof Set?new Set(t):Array.isArray(t)?new Set(t):new Set}function Hs(e,t){let n=Bp(e.prefix);if(t===n)return e;let i=e.import_prefixes?.[t];if(i&&typeof i=="object")return i}function Xs(e){let t=[],n=new Set,r=i=>{if(n.has(i))return;n.add(i),t.push(i);let s=i.import_prefixes;if(s)for(let o of Object.values(s))o&&typeof o=="object"&&r(o)};return r(e),t}function Yp(e,t,n){let r=typeof n=="string"?Le(n):n,i;if(r.prefix){let a=Hs(e,r.prefix);if(!a)return!1;i=a}else i=e;let s=r.name;if(!zs(i).has(s))return!1;let o=t[qn(i)];return o?o.has(s):!1}function Up(e){let t=[],n=0,r=e.length;for(;n<r;){let i=e[n];if(/\s/.test(i)){n+=1;continue}if(i==="("||i===")"){t.push(i),n+=1;continue}let s=n;for(;s<r&&!/\s/.test(e[s])&&e[s]!=="("&&e[s]!==")";)s+=1;t.push(e.slice(n,s)),n=s}return t}var Vp=class{constructor(e,t,n){this.toks=e,this.ctx=t,this.enabled=n}toks;ctx;enabled;i=0;peek(){return this.toks[this.i]}eat(e){let t=this.peek();if(t===void 0)throw new Error("unexpected end of expression");if(e!==void 0&&t!==e)throw new Error(`expected ${e}, got ${t}`);return this.i+=1,t}parseExpr(){let e=this.parseTerm();for(;this.peek()==="or";){this.eat("or");let t=this.parseExpr();e=e||t}return e}parseTerm(){let e=this.parseFactor();for(;this.peek()==="and";){this.eat("and");let t=this.parseTerm();e=e&&t}return e}parseFactor(){let e=this.peek();if(e==="not")return this.eat("not"),!this.parseFactor();if(e==="("){this.eat("(");let t=this.parseExpr();return this.eat(")"),t}if(e===void 0)throw new Error("unexpected end of expression");return this.eat(),Yp(this.ctx,this.enabled,e)}atEnd(){return this.i>=this.toks.length}};function Qs(e,t,n){let r=e.trim();if(!r)return!1;try{let i=new Vp(Up(r),t,n),s=i.parseExpr();return i.atEnd()?s:!1}catch{return!1}}function Ne(e,t,n){return!e||e.length===0?!0:e.every(r=>Qs(r,t,n))}function Gp(e){return e==null?null:e instanceof Map?new Map(e):new Map(Object.entries(e))}function Kp(e,t){let n=!0;for(;n;){n=!1;let i={};for(let[s,o]of Object.entries(t))i[s]=new Set(o);for(let s of e){let o=qn(s),a=t[o];if(!a)continue;let c=s.feature_if_features;for(let u of[...a]){let p=c?.[u];p?.length&&(Ne(p,s,i)||(a.delete(u),n=!0))}}}let r={};for(let[i,s]of Object.entries(t))r[i]=new Set(s);return r}function Yn(e,t){let n=Xs(e),r=Gp(t),i={};for(let s of n){let o=qn(s),a=zs(s);r===null||!r.has(o)?i[o]=new Set(a):i[o]=new Set(r.get(o)??[])}return Kp(n,i)}function qp(e){return String(e.prefix??"").replace(/^['"]|['"]$/g,"")}function Un(e){let t=e.identities;return!t||typeof t!="object"?{}:t}function Wp(e){return typeof e=="string"?Le(e):e.prefix?{prefix:e.prefix,name:e.name}:{name:e.name}}function zp(e,t){let n=qp(e);if(t===n)return e;let i=(e.import_prefixes??{})[t];return i&&typeof i=="object"?i:void 0}function Ct(e,t){let n=Le(t);return n.prefix?Js(e.data,n):null}function Js(e,t){let n=Wp(t);if(n.prefix){let r=zp(e,n.prefix);return!r||!(n.name in Un(r))?null:{mod:r,local:n.name}}return n.name in Un(e)?{mod:e,local:n.name}:null}function Wn(e,t){return e.mod===t.mod&&e.local===t.local}function Zs(e,t){return t.some(n=>Wn(n,e))}var ts=new WeakMap,ns=1;function Hp(e){let t=ts.get(e);return t===void 0&&(t=ns,ns+=1,ts.set(e,t)),t}function Xp(e){return`${Hp(e.mod)}:${e.local}`}function eo(e,t){let n={mod:e,local:t},r=[],i=new Set,s=[n];for(;s.length>0;){let o=s.pop(),a=Xp(o);if(i.has(a))continue;i.add(a),r.push(o);let c=Un(o.mod)[o.local];if(c?.bases)for(let u of c.bases){let p=Js(o.mod,u);p&&s.push(p)}}return r}function Qp(e,t,n){let r=Ct(e,t),i=Ct(e,n);if(!r||!i)return!1;let s=eo(r.mod,r.local).filter(o=>!Wn(o,r));return Zs(i,s)}function Jp(e,t,n){let r=Ct(e,t),i=Ct(e,n);return!r||!i?!1:Wn(r,i)?!0:Zs(i,eo(r.mod,r.local))}function ie(e){return!!e&&typeof e=="object"&&"schema"in e&&"parent"in e}function Ee(e){return Array.isArray(e)&&(e.length===0||ie(e[0]))}function G(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e!=="":e!=null}function ce(e){return Array.isArray(e)?e.map(t=>ie(t)?t.data:t):ie(e)?[e.data]:e==null?[]:[e]}function P(e){return ce(e)[0]}function zn(e,t){if(typeof e=="boolean"||typeof t=="boolean")return[G(e),G(t)];if(typeof e=="number"&&typeof t=="number")return[e,t];let n=Number(e),r=Number(t);return!Number.isNaN(n)&&!Number.isNaN(r)?[n,r]:[String(e??"").trim(),String(t??"").trim()]}function vt(e,t){let n=ce(e),r=Array.isArray(t)&&!Ee(t)?t:ce(t);if(n.length===0||r.length===0)return n.length===0&&r.length===0;for(let i of n)for(let s of r){if(i==null&&s==null)return!0;if(i==null||s==null)continue;let[o,a]=zn(i,s);if(o===a)return!0}return!1}function rs(e,t){for(let n of ce(e))for(let r of ce(t)){let[i,s]=zn(n,r);if(typeof i=="number"&&typeof s=="number"){if(i<s)return!0;continue}if(`${i}`<`${s}`)return!0}return!1}function is(e,t){for(let n of ce(e))for(let r of ce(t)){let[i,s]=zn(n,r);if(typeof i=="number"&&typeof s=="number"){if(i>s)return!0;continue}if(`${i}`>`${s}`)return!0}return!1}function Zp(e){return!e||!Array.isArray(e.statements)?[]:e.statements}function el(e,t){for(let n of Zp(e))if(n?.name===t)return n;return null}function tl(e){if(!e||e.keyword!=="leaf")return;let t=e.data?.default;if(e.data?.type?.name==="boolean"&&typeof t=="string"){let r=t.toLowerCase();if(r==="true")return!0;if(r==="false")return!1}return t}function to(e,t){let n=e.data,r=e.schema;if(Array.isArray(n)&&(r?.keyword==="list"||r?.keyword==="leaf-list")){let o=[];for(let a of n){let c={data:a,schema:r,parent:e};o.push(...to(c,t))}return o}let i=el(r,t),s;if(n&&typeof n=="object"&&!Array.isArray(n)){let o=n;t in o?(s=o[t],s===null&&(s=!0)):s=tl(i)}return s===void 0?[]:i?.keyword==="list"||i?.keyword==="leaf-list"?Array.isArray(s)?s.map(o=>({data:o,schema:i,parent:e})):[{data:s,schema:i,parent:e}]:[{data:s,schema:i,parent:e}]}var nl=class{eval(e,t,n){switch(e.kind){case"literal":return e.value;case"path":return this.evalPath(e,t,n);case"binary":return this.evalBinary(e,t,n);case"function":return this.evalFunction(e.name,e.args,t,n);default:return null}}evalPath(e,t,n){let r=[e.isAbsolute?t.root:n];for(let i of e.segments){if(i.step!==".")if(i.step==="..")r=r.map(s=>s.parent).filter(s=>!!s);else{let s=[];for(let o of r)s.push(...to(o,i.step));r=s}if(i.predicate){let s=[];for(let o=0;o<r.length;o+=1){let a=r[o],c=this.eval(i.predicate,t,a),u=!1;typeof c=="number"&&Number.isFinite(c)?u=Math.trunc(c)===o+1:u=G(c),u&&s.push(a)}r=s}}return r}evalBinary(e,t,n){let r=e.operator;if(r==="or"){let o=this.eval(e.left,t,n);return G(o)?!0:G(this.eval(e.right,t,n))}if(r==="and"){let o=this.eval(e.left,t,n);return G(o)?G(this.eval(e.right,t,n)):!1}if(r==="/"){let o=this.eval(e.left,t,n),a=Ee(o)?o:ie(o)?[o]:[],c=[];for(let u of a){let p=this.eval(e.right,t,u);Ee(p)?c.push(...p):ie(p)&&c.push(p)}return c}let i=this.eval(e.left,t,n),s=this.eval(e.right,t,n);if(r==="=")return vt(i,s);if(r==="!=")return!vt(i,s);if(r==="<")return rs(i,s);if(r===">")return is(i,s);if(r==="<=")return vt(i,s)||rs(i,s);if(r===">=")return vt(i,s)||is(i,s);if(r==="+"){let o=Number(P(i))+Number(P(s));return Number.isNaN(o)?Number.NaN:o}if(r==="-"){let o=Number(P(i))-Number(P(s));return Number.isNaN(o)?Number.NaN:o}if(r==="*"){let o=Number(P(i))*Number(P(s));return Number.isNaN(o)?Number.NaN:o}return null}evalFunction(e,t,n,r){let i=e.toLowerCase();if(i==="current")return n.current;if(i==="not")return t.length!==1?null:!G(this.eval(t[0],n,r));if(i==="true")return!0;if(i==="false")return!1;if(i==="count"){if(t.length!==1)return 0;let s=this.eval(t[0],n,r);return Ee(s)?s.length:s==null?0:1}if(i==="string"){if(t.length!==1)return"";let s=P(this.eval(t[0],n,r));return s==null?"":String(s)}if(i==="number"){if(t.length!==1)return Number.NaN;let s=P(this.eval(t[0],n,r)),o=Number(s);return Number.isNaN(o)?Number.NaN:o}if(i==="boolean")return t.length!==1?!1:G(this.eval(t[0],n,r));if(i==="string-length"){if(t.length!==1)return 0;let s=P(this.eval(t[0],n,r));return s==null?0:String(s).length}if(i==="concat")return t.map(s=>String(P(this.eval(s,n,r))??"")).join("");if(i==="translate"){if(t.length!==3)return"";let s=String(P(this.eval(t[0],n,r))??""),o=String(P(this.eval(t[1],n,r))??""),a=String(P(this.eval(t[2],n,r))??"");if(o.length===0)return s;let c=new Map;for(let p=0;p<o.length;p+=1)c.set(o[p],p<a.length?a[p]:null);let u="";for(let p of s){if(!c.has(p)){u+=p;continue}let d=c.get(p);d!=null&&(u+=d)}return u}if(i==="deref"){if(t.length!==1)return[];let s=n.current??r,o=this.eval(t[0],n,s),a=Ee(o)?o:ie(o)?[o]:[],c=[];for(let u of a){let p=u.schema?.data?.type;if(!p||p.name!=="leafref")continue;let d=p.path;if(!d||d.kind!=="path")continue;let m=this.evalPath(d,n,u);for(let f of m)f.data===u.data&&c.push(f)}return c}if(i==="derived-from"||i==="derived-from-or-self"){if(t.length!==2)return!1;let s=n.root?.schema;if(!(s instanceof Pt))return!1;let o=s,a=n.current??r,c=this.eval(t[0],n,a);if(Ee(c)){if(c.length===0)return!1;c=c[0].data}else ie(c)?c=c.data:c=P(c);if(typeof c!="string")return!1;let u=this.eval(t[1],n,a),p=P(u);return typeof p!="string"?!1:i==="derived-from"?Qp(o,c,p):Jp(o,c,p)}return null}};function $t(e){if(e===null)return"null";let t=typeof e;if(t==="undefined")return"undefined";if(typeof e=="string"){let n=e;return n.length>100?`string(len=${n.length}):${JSON.stringify(n.slice(0,80))}\u2026`:JSON.stringify(n)}if(t==="number"||t==="boolean"||t==="bigint")return String(e);if(Array.isArray(e))return`Array(${e.length})`;if(t==="object")try{let n=JSON.stringify(e);return n.length>160?`${n.slice(0,160)}\u2026`:n}catch{return"[object]"}return String(e)}function Lt(e,t,n){e&&console.debug(`[xYang:type-validation] ${t}`,n)}function bt(e,t){let n=t&&typeof t.prefix=="string"&&t.prefix?t.prefix:void 0;return n?{prefix:n,name:e}:{name:e}}var Pn=class{constructor(e,t={}){this.module=e,this.typeValidationDebug=t.typeValidationDebug===!0}module;system=new $i;typeValidationDebug;lookupTypedef(e){if(e.prefix){let n=Hs(this.module.data,e.prefix);if(!n)return;let r=n.typedefs?.[e.name];return r?.type&&typeof r.type.name=="string"?r:void 0}let t=this.module.typedefs[e.name];if(t?.type&&typeof t.type.name=="string")return t}resolveUnderlyingBuiltinName(e,t){let n=new Set,r=bt(e,t);for(;n.size<64;){let i=this.lookupTypedef(r);if(!i?.type||typeof i.type.name!="string")return r.name;if(i.type.name==="union")return ke(r);let s=ke(r);n.add(s);let o=bt(i.type.name,i.type);if(ke(o)===s)return r.name;r=o}return r.name}validate(e,t,n){let r,i,s=bt(t,n),o=this.lookupTypedef(s);if(o?.type&&typeof o.type.name=="string"){let a=new Ge(o.type);o.type.name==="union"?(r="typedef-union",i=this.validateUnion(e,a)):this.lookupTypedef(bt(o.type.name,o.type))?(r="typedef",i=this.validate(e,o.type.name,o.type)):(r="typedef",i=this.system.validate(e,o.type.name,a))}else{let a=new Ge(n);t==="union"&&(a.types?.length??0)>0?(r="inline-union",i=this.validateUnion(e,a)):(r="direct",i=this.system.validate(e,t,a))}return Lt(this.typeValidationDebug,"TypeChecker.validate",{module:this.module.name??"(anonymous)",typeName:t,via:r,ok:i[0],reason:i[1],value:$t(e)}),i}validateUnion(e,t){Lt(this.typeValidationDebug,"TypeChecker.validateUnion",{module:this.module.name??"(anonymous)",memberCount:t.types?.length??0,value:$t(e)});for(let n of t.types??[]){let r=n,i=typeof r.name=="string"?r.name:"string",[s]=this.validate(e,i,r);if(s)return[!0,null]}return[!1,"Value does not match any union member type"]}},rl=class{xpath=new nl;xpathCache=new Map;rootCtx;enabledFeaturesOverride;contextStack=[];typeValidationDebug;constructor(e,t={}){this.enabledFeaturesOverride=t.enabledFeaturesByModule??null,this.typeValidationDebug=t.typeValidationDebug===!0;let n=t.constraintChecks??!0,r=t.leafTypeMode??(n?"full":"none"),i=e.data;this.rootCtx={module:e,typeChecker:new Pn(e,{typeValidationDebug:this.typeValidationDebug}),constraintChecks:n,leafTypeMode:r,typeValidationDebug:this.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:i,enabledByModule:Yn(i,this.enabledFeaturesOverride)}}setTypeValidationDebug(e){this.typeValidationDebug=e,this.rootCtx.typeValidationDebug=e,this.rootCtx.typeChecker=new Pn(this.rootCtx.module,{typeValidationDebug:this.typeValidationDebug})}get ctx(){let e=this.contextStack[this.contextStack.length-1];if(!e)throw new Error("DocumentValidator: internal error \u2014 no active validation context");return e}enableExtension(e,t){if(e!=="anydata_validation")throw new Error(`unknown validator extension: ${String(e)}`);this.rootCtx.anydataValidation=cs(t)}validate(e){return this.validateWithContext(this.rootCtx,e)}validateWithContext(e,t){this.contextStack.push(e);try{let n=[],r=[];if(!t||typeof t!="object"||Array.isArray(t))return[!1,["Document must be an object"],r];let i=t,s={data:i,schema:e.module,parent:null};for(let o of e.module.statements){if(!o.name)continue;let a=this.effectiveKeyword(o);["container","list","leaf","leaf-list","anydata","anyxml","choice"].includes(a)&&this.validateStatement(o,i[o.name],o.name,n,s,s)}return[n.length===0,n,r]}finally{this.contextStack.pop()}}validateStatement(e,t,n,r,i,s){let o=this.effectiveKeyword(e),a={data:t,schema:e,parent:i};if(o==="choice"){this.validateChoice(e,i.data,n,r,i,s);return}if(o==="case"){if(!i.data||typeof i.data!="object"||Array.isArray(i.data))return;let p=i.data;for(let d of e.statements)d.name&&this.validateStatement(d,p[d.name],`${n}.${d.name}`,r,i,s);return}let c=e.data.if_features,u=Array.isArray(c)?c:[];if(!Ne(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){t!==void 0&&r.push(`${n}: Node '${e.name??"node"}' is present but its 'if-feature' condition is false \u2014 this node must not exist`);return}if(!(this.ctx.constraintChecks&&!this.checkWhen(e,t,n,r,a,s,i))){if(o==="container"){if(t===void 0){e.data.presence||this.validateMandatoryChildren(e,void 0,n,r,a,s);return}if(!t||typeof t!="object"||Array.isArray(t)){r.push(`${n}: container must be an object`);return}let p=t;this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r);for(let d of e.statements){if(this.effectiveKeyword(d)==="choice"){this.validateChoice(d,p,`${n}.${d.name??"choice"}`,r,a,s);continue}d.name&&this.validateStatement(d,p[d.name],`${n}.${d.name}`,r,a,s)}this.ctx.constraintChecks&&this.rejectUnknownContainerKeys(e,p,n,r);return}if(o==="list"){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: list must be an array`);return}let p=typeof e.data.key=="string"?e.data.key.trim():"",d=p.length>0?p.split(/\s+/).map(m=>m.trim()).filter(Boolean):[];if(this.ctx.constraintChecks&&d.length>0&&this.checkListKeyUniqueness(t,d,e.name??"list",n,r))return;for(let m=0;m<t.length;m+=1){let f=t[m];if(!f||typeof f!="object"||Array.isArray(f)){r.push(`${n}[${m}]: list item must be an object`);continue}let l={data:f,schema:e,parent:i};this.ctx.constraintChecks&&this.checkMust(e,l,s,`${n}[${m}]`,r);let _=f;for(let h of e.statements){if(this.effectiveKeyword(h)==="choice"){this.validateChoice(h,_,`${n}[${m}].${h.name??"choice"}`,r,l,s);continue}h.name&&this.validateStatement(h,_[h.name],`${n}[${m}].${h.name}`,r,l,s)}this.ctx.constraintChecks&&this.rejectUnknownListItemKeys(e,_,`${n}[${m}]`,r)}return}if(o==="leaf"){let p=!!e.data.mandatory;if(t===void 0){p&&r.push(`${n}: mandatory leaf is missing`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){let d=e.data.type??{},m=d.name??"string";if(m==="leafref")this.checkLeafref(t,d,n,r,a,s);else if(m==="instance-identifier")this.checkInstanceIdentifier(t,d,n,r,a,s);else{let[f,l]=this.ctx.typeChecker.validate(t,m,d);Lt(this.ctx.typeValidationDebug,"DocumentValidator.leaf:full",{path:n,typeName:m,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:f,reason:l,value:$t(t)}),f||r.push(`${n}: ${l??`invalid value for type ${m}`}`)}}this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r);return}if(o==="leaf-list"){if(t===void 0)return;if(!Array.isArray(t)){r.push(`${n}: leaf-list must be an array`);return}if(this.ctx.leafTypeMode==="full"&&this.ctx.constraintChecks){let p=e.data.type??{},d=p.name??"string";for(let m=0;m<t.length;m+=1){let f={data:t[m],schema:e,parent:i};if(d==="leafref")this.checkLeafref(t[m],p,`${n}[${m}]`,r,f,s);else if(d==="instance-identifier")this.checkInstanceIdentifier(t[m],p,`${n}[${m}]`,r,f,s);else{let[l,_]=this.ctx.typeChecker.validate(t[m],d,p);Lt(this.ctx.typeValidationDebug,"DocumentValidator.leaf-list:full",{path:`${n}[${m}]`,typeName:d,leafTypeMode:this.ctx.leafTypeMode,constraintChecks:this.ctx.constraintChecks,ok:l,reason:_,value:$t(t[m])}),l||r.push(`${n}[${m}]: ${_??`invalid value for type ${d}`}`)}this.checkMust(e,f,s,`${n}[${m}]`,r)}}return}if(o==="anydata"||o==="anyxml"){let p=!!e.data.mandatory;if(t===void 0){p&&r.push(`${n}: mandatory ${o} is missing`);return}this.ctx.constraintChecks&&this.checkMust(e,a,s,n,r),o==="anydata"&&this.runAnydataSubtreeValidation(e,t,n,r)}}}collectSchemaInstanceKeys(e,t){if(!e)return;let n=this.effectiveKeyword(e);if(n==="choice"){for(let r of e.statements??[])if(r.keyword==="case")for(let i of r.statements??[])this.collectSchemaInstanceKeys(i,t);return}if(n==="list"){e.name&&t.add(e.name);return}if(n==="container"){let r=e.statements??[];!(r.length===1&&this.effectiveKeyword(r[0])==="choice")&&e.name&&t.add(e.name);for(let s of r)this.collectSchemaInstanceKeys(s,t);return}e.name&&t.add(e.name)}rejectUnknownContainerKeys(e,t,n,r){if(e.data.presence||e.name!=="array")return;let i=e.statements??[];if(i.length!==1||this.effectiveKeyword(i[0])!=="choice")return;let s=new Set;if(this.collectSchemaInstanceKeys(i[0],s),s.size!==0)for(let o of Object.keys(t))s.has(o)||r.push(`${n}: Unknown field '${o}'`)}rejectUnknownListItemKeys(e,t,n,r){let i=this.collectDirectChildKeys(e);if(i.size!==0)for(let s of Object.keys(t))i.has(s)||r.push(`${n}: Unknown field '${s}'`)}collectDirectChildKeys(e){let t=new Set,n=r=>{let i=this.effectiveKeyword(r);if(i==="choice"||i==="case"){for(let s of r.statements??[])n(s);return}r.name&&t.add(r.name)};for(let r of e.statements??[])n(r);return t}validateChoice(e,t,n,r,i,s){if(!t||typeof t!="object"||Array.isArray(t)){e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`);return}let o=t,a=Array.isArray(e.data.if_features)?e.data.if_features:[],c=Ne(a,this.ctx.ifFeatureCtx,this.ctx.enabledByModule);if(!c&&this.choiceHasBranchData(e,o)){r.push(`${n}: Choice '${e.name??"choice"}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}if(!c||this.ctx.constraintChecks&&!this.checkWhen(e,this.choiceHasBranchData(e,o)?!0:void 0,n,r,i,s,i))return;let u=e.statements.filter(f=>f.keyword==="case"),p=[],d=!1;for(let f of u){if(!this.caseHasAnyData(f,o))continue;let l=Array.isArray(f.data.if_features)?f.data.if_features:[];if(!Ne(l,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)){r.push(`${n}: Case '${f.name??"case"}' of choice '${e.name??"choice"}' has data but its 'if-feature' condition is false \u2014 this branch must not exist`);return}if(this.ctx.constraintChecks&&!this.checkWhen(f,!0,`${n}.${f.name??"case"}`,r,i,s,i)){d=!0;continue}p.push(f)}if(p.length>1){let f=p.map(l=>l.name??"<unnamed>").join(", ");r.push(`${n}: choice '${e.name??"choice"}' allows only one case, but multiple are active: ${f}`);return}let m=p[0];if(!m){if(d)return;e.data.mandatory===!0&&r.push(`${n}: mandatory choice has no active case`);return}for(let f of m.statements)f.name&&this.validateStatement(f,o[f.name],`${n}.${f.name}`,r,i,s)}choiceHasBranchData(e,t){return e.statements.filter(r=>r.keyword==="case").some(r=>this.caseHasAnyData(r,t))}caseHasAnyData(e,t){return e.statements.some(n=>this.statementHasMatchingData(n,t))}statementHasMatchingData(e,t){let n=this.effectiveKeyword(e);return["leaf","leaf-list","container","list","anydata","anyxml"].includes(n)?!!(e.name&&t[e.name]!==void 0):n==="choice"?this.choiceHasBranchData(e,t):n==="case"?this.caseHasAnyData(e,t):!1}effectiveKeyword(e){let t=e.keyword??"";if(t.includes(":")){let n=e.data.data_node_kind;if(n==="container"||n==="list")return n}return t}checkListKeyUniqueness(e,t,n,r,i){if(t.length===0)return!1;let s=new Map;for(let o=0;o<e.length;o+=1){let a=e[o];if(!a||typeof a!="object"||Array.isArray(a))continue;let c=a,u=t.map(d=>c[d]),p=JSON.stringify(u);if(s.has(p)){let d=s.get(p),m=t.map(f=>`${f}='${String(c[f])}'`).join(", ");return i.push(`${r}: Duplicate key in list '${n}': ${m} (entries at index ${d} and ${o})`),!0}s.set(p,o)}return!1}leafrefPathAst(e){let t=e.path;if(typeof t=="string"&&t.trim().length>0)try{return Ts(t.trim())}catch{return null}return t&&typeof t=="object"&&!Array.isArray(t)&&t.kind==="path"?t:null}checkLeafref(e,t,n,r,i,s){let o=t.require_instance!==!1,a=this.leafrefPathAst(t);if(!a||a.kind!=="path"){o&&r.push(`${n}: leafref has no path`);return}try{let c={current:i,root:s},u=this.xpath.eval(a,c,i),p=Array.isArray(u)?u:[],d=new Set;for(let f of p){if(!f||typeof f!="object"||!("data"in f))continue;let l=f.data;l!=null&&(typeof l=="string"||typeof l=="number"||typeof l=="boolean")&&d.add(String(l))}if(typeof e!="string"&&typeof e!="number"&&typeof e!="boolean"){r.push(`${n}: leafref value must be a string, number, or boolean`);return}let m=String(e);o&&!d.has(m)&&r.push(`${n}: leafref: value '${m}' does not reference an existing instance (require-instance is true)`)}catch(c){let u=c instanceof Error?c.message:String(c);r.push(`${n}: leafref: error evaluating path (${u})`)}}checkInstanceIdentifier(e,t,n,r,i,s){if(typeof e!="string"){r.push(`${n}: instance-identifier value must be a string, got ${typeof e}`);return}if(!(t.require_instance!==!1))return;let a=e.trim();if(!a){r.push(`${n}: instance-identifier path must not be empty when require-instance is true`);return}let c;try{c=wt(a)}catch(p){let d=p instanceof Error?p.message:String(p);r.push(`${n}: instance-identifier: invalid path expression (${d})`);return}if(c.kind!=="path"){r.push(`${n}: instance-identifier: value must be a path expression (e.g. /top/leaf)`);return}if(!c.isAbsolute){r.push(`${n}: instance-identifier: only absolute paths are supported (path must start with '/')`);return}let u={current:i,root:s};try{this.xpath.evalPath(c,u,s).length===0&&r.push(`${n}: instance-identifier: no instance at path ${JSON.stringify(e)} (require-instance is true)`)}catch(p){let d=p instanceof Error?p.message:String(p);r.push(`${n}: instance-identifier: invalid path expression (${d})`)}}checkMust(e,t,n,r,i){let s=e.statements.filter(o=>o.keyword==="must"&&typeof o.argument=="string");for(let o of s){let a=o.argument,c=this.xpathCache.get(a);if(!c)try{c=wt(a),this.xpathCache.set(a,c)}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`);continue}try{let u={current:t,root:n},p=this.xpath.eval(c,u,t);if(!this.xpathBoolean(p)){let m=typeof o.data.error_message=="string"&&o.data.error_message.trim().length>0?o.data.error_message:`must constraint not satisfied on '${e.name??"node"}'`;i.push(`${r}: ${m}`)}}catch{i.push(`${r}: Error evaluating must expression on '${e.name??"node"}'`)}}}checkWhen(e,t,n,r,i,s,o){let a=e.data.when,c=typeof a?.expression=="string"?a.expression:void 0;if(!c||c.trim().length===0)return!0;let u=this.xpathCache.get(c);if(!u)try{u=wt(c),this.xpathCache.set(c,u)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??"node"}'`),!1}try{let d=a?.evaluate_with_parent_context===!0?o:i,m={current:d,root:s},f=this.xpath.eval(u,m,d);return this.xpathBoolean(f)?!0:(t!==void 0&&r.push(`${n}: node is not allowed by when condition`),!1)}catch{return r.push(`${n}: Error evaluating when expression on '${e.name??"node"}'`),!1}}xpathBoolean(e){return Array.isArray(e)?e.length>0:typeof e=="boolean"?e:typeof e=="number"?e!==0&&!Number.isNaN(e):typeof e=="string"?e.length>0:e!=null}validateMandatoryChildren(e,t,n,r,i,s){let o=t&&typeof t=="object"&&!Array.isArray(t)?t:void 0;for(let a of e.statements){let c=a.keyword??"";if(!["leaf","anydata","anyxml"].includes(c)||!a.name)continue;let u=Array.isArray(a.data.if_features)?a.data.if_features:[];if(!Ne(u,this.ctx.ifFeatureCtx,this.ctx.enabledByModule)||!a.data.mandatory)continue;let p=o?.[a.name],d={data:p,schema:a,parent:i};this.ctx.constraintChecks&&!this.checkWhen(a,p,`${n}.${a.name}`,r,d,s,i)||(!o||o[a.name]===void 0)&&r.push(`${n}.${a.name}: mandatory ${c} is missing`)}}anydataModuleMap(e){let t={};for(let n of e){let r=n.name;r&&(t[r]=n)}return t}runAnydataSubtreeValidation(e,t,n,r){if(!this.ctx.anydataValidation||!t||typeof t!="object"||Array.isArray(t))return;let i=this.ctx.anydataValidation.mode,s=this.ctx.anydataValidation.modules,o=this.anydataModuleMap(s),a=t;for(let[c,u]of Object.entries(a)){let{statementName:p,moduleName:d}=Ei(c,o);if(!p||!d){r.push(`${n}.${c}: Unknown anydata member '${c}': no matching module:identifier in the provided modules`);continue}let m=o[d],f=m?.findStatement(p);if(!f){r.push(`${n}.${c}: Unknown anydata member '${c}'`);continue}if(f.keyword==="leaf"){r.push(`${n}.${c}: anydata member '${c}' maps to a leaf; nested subtree validation expects a container or list`);continue}let l={[p]:u},_=m.data,h={module:m,typeChecker:new Pn(m,{typeValidationDebug:this.rootCtx.typeValidationDebug}),constraintChecks:i==="complete",leafTypeMode:i==="complete"?"full":"none",typeValidationDebug:this.rootCtx.typeValidationDebug,anydataValidation:void 0,ifFeatureCtx:_,enabledByModule:Yn(_,this.enabledFeaturesOverride)},[g,y]=this.validateWithContext(h,l);if(!g)for(let b of y)r.push(`${n}.${c}: ${b}`)}}},Hn=class{constructor(e,t={}){this.module=e,this.documentValidator=new rl(e,{enabledFeaturesByModule:t.enabledFeaturesByModule??null,typeValidationDebug:t.typeValidationDebug})}module;documentValidator;setTypeValidationDebug(e){return this.documentValidator.setTypeValidationDebug(e),this}enableExtension(e,t){this.documentValidator.enableExtension(e,t)}enable_extension(e,t){this.enableExtension(e,t)}validate(e){let[t,n,r]=this.documentValidator.validate(e);return{isValid:t,errors:n,warnings:r}}};var Dt,no;function Mt(){if(!import.meta.url.startsWith("file:"))return"/yang";let e=Je.dirname(il(import.meta.url));return Je.resolve(e,"../../../../yang")}function ro(e=Mt()){if(Dt&&no===e)return Dt;let t=Je.join(e,"netlab-topology.yang"),n=[e,Je.join(e,"modules")],r=new Ft({include_path:n,expand_uses:!0}),i=r.parseFile(t);for(let s of["netlab-internal.yang","modules/netlab-ospf.yang","modules/netlab-bgp.yang","modules/netlab-vlan.yang","modules/netlab-vrf.yang","modules/netlab-isis.yang","modules/netlab-vxlan.yang","modules/netlab-evpn.yang"]){let o=Je.join(e,s);try{r.parseFile(o)}catch(a){if(a?.code!=="ENOENT")throw a}}return Dt=i,no=e,Dt}function Xn(e){let t=ro(e);return new Hn(t)}function Qn(e){let t=e.nodes??{},n=Object.entries(t).map(([u,p])=>{let d={...p,name:p.name??u};return d.loopback===!1&&delete d.loopback,Array.isArray(d.interfaces)&&(d.interfaces=d.interfaces.map(m=>{let f={...m};return Array.isArray(f.neighbors),f})),d.vlans&&typeof d.vlans=="object"&&!Array.isArray(d.vlans)&&(d.vlans=jt(d.vlans)),d.vrfs&&typeof d.vrfs=="object"&&!Array.isArray(d.vrfs)&&(d.vrfs=jt(d.vrfs)),io(d),d}),r=(e.links??[]).map((u,p)=>{let d={...u};(d.ospf===!1||d.ospf===!0)&&delete d.ospf,d.linkindex===void 0&&(d.linkindex=p+1);let m=d[F];return typeof m=="string"?(d._linkname=m,delete d[F]):d._linkname,io(d),d}),i=e.groups?Object.entries(e.groups).map(([u,p])=>({...p,name:p.name??u})):void 0,s=sl(e.addressing),o={nodes:n,links:r};e.stage!==void 0&&(o.stage=e.stage),e.name!==void 0&&(o.name=e.name),e.provider!==void 0&&(o.provider=e.provider),e.module!==void 0&&(o.module=e.module),e.defaults!==void 0&&(o.defaults=e.defaults),i&&(o.groups=i),s&&(o.addressing=s),e.ospf&&(o.ospf=e.ospf),e.bgp&&(o.bgp=e.bgp),e.isis&&(o.isis=e.isis),e.vxlan&&(o.vxlan=e.vxlan),e.evpn&&(o.evpn=e.evpn),e.vlans&&(o.vlans=jt(e.vlans)),e.vrfs&&(o.vrfs=jt(e.vrfs));let a={topology:o},c=a.topology;return Array.isArray(e[`${Y}:_Providers`])&&(c[`${Y}:_Providers`]=e[`${Y}:_Providers`]),a}function jt(e){return!e||typeof e!="object"||Array.isArray(e)?[]:Object.entries(e).map(([t,n])=>({...typeof n=="object"&&n&&!Array.isArray(n)?n:{},name:t}))}function sl(e){return!e||typeof e!="object"||Array.isArray(e)?void 0:{pool:Object.entries(e).map(([n,r])=>({...typeof r=="object"&&r&&!Array.isArray(r)?r:{},name:n}))}}function io(e){let t=`${Y}:`;for(let n of Object.keys(e))if(n.startsWith(t)){let r=n.slice(t.length);e[r]===void 0&&(e[r]=e[n]),delete e[n]}}function Jn(e,t,n={}){e.stage=t;let r=n.yangDir??Mt(),i=Xn(r),s=Qn(e),o=i.validate(s);if(n.diagnostics){for(let a of o.errors)n.diagnostics.error(st(a));for(let a of o.warnings)n.diagnostics.warning(st(a))}return{ok:o.isValid,errors:o.errors,warnings:o.warnings}}function Yt(e){delete e.pools,delete e.Plugin,delete e.stage,delete e[`${Y}:_Providers`];for(let t of Object.values(e.nodes??{})){Bt(t);for(let r of t.interfaces??[])Bt(r);let n=t.vrfs;if(n)for(let r of Object.values(n))Bt(r)}for(let t of e.links??[])Bt(t);return e}function Bt(e){for(let t of Object.keys(e))t.startsWith(`${Y}:`)&&delete e[t]}function Zn(e){let t=structuredClone(e);return Yt(t)}var so={frr:`---
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
`},oo={bird:`---
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
`};var d_=new Set(je),er;function ao(e){let t={};for(let[n,r]of Object.entries(e)){let i=H(r)??{};t[n]={...i,name:n}}return t}function ol(e,t){for(let[n,r]of Object.entries(t)){if(e[n])throw new Error(`duplicate name ${n} for a device and a daemon`);let i={...r,name:n,daemon:!0};i.parent||(i.parent="linux"),e[n]=i}}function al(e){let t={},n=new Set;function r(i){if(t[i])return t[i];if(n.has(i))return e[i]??{name:i};n.add(i);let s=e[i]??{name:i},o=typeof s.parent=="string"?s.parent:void 0,a={...s,name:i};if(o&&e[o]){let c=r(o);a=I(c,{...s,name:i}),s.daemon!==void 0&&(a.daemon=s.daemon),a.parent=o}return n.delete(i),t[i]=a,a}for(let i of Object.keys(e))r(i);return t}function Ut(){if(er)return er;let e=ao(so);ol(e,ao(oo));let t=al(e);for(let n of Object.values(t)){if(n.clab&&typeof n.clab=="object"){let r=n.clab;r.features&&(n.features=I(n.features??{},r.features))}delete n.libvirt,delete n.virtualbox,delete n.external}return er=t,t}function Z(e){return Ut()[e]??{name:e,interface_name:"eth{ifindex}",role:"router"}}var q=Aa(fo(),1);var Ze={};function uo(){for(let e of Object.keys(Ze))delete Ze[e]}function po(e,t={}){let n={lan:{ipv4:typeof t.lan=="string"?t.lan:"10.0.0.0/16",prefix:typeof t.lan_subnet=="number"?t.lan_subnet:24},loopback:{ipv4:"10.0.0.0/24",prefix:32},p2p:{ipv4:typeof t.p2p=="string"?t.p2p:"10.2.0.0/16",prefix:typeof t.p2p_subnet=="number"?t.p2p_subnet:30}},r=I(n,e),i={};for(let[s,o]of Object.entries(r)){if(o==null){i[s]={};continue}if(typeof o!="object"||Array.isArray(o)){i[s]={ipv4:o};continue}let a={...o};typeof a.ipv4=="string"&&typeof a.prefix!="number"&&(a.prefix=s.includes("loopback")?32:24),s==="mgmt"&&typeof a.prefix!="number"&&(a.prefix=24),i[s]=a}return i}function lo(e,t={}){let n=On(t),r={};for(let[i,s]of Object.entries(e)){let o={};for(let[a,c]of Object.entries(s))n.has(a)||(o[a]=c);r[i]=o}return r}function tr(e){uo();let t=e.defaults??{},n=po(e.addressing??{},t);e.addressing=n,e.pools=lo(n,t);for(let[r,i]of Object.entries(n)){let s={},o=typeof i.prefix=="number"?i.prefix:24,a=typeof i.prefix6=="number"?i.prefix6:64;typeof i.ipv4=="string"&&(s.skipFirst4=o===32||r==="loopback"||r.includes("loopback"),s.ipv4=s.skipFirst4?1:0,s.cache4=[]),typeof i.ipv6=="string"&&(s.skipFirst6=a>=127||r==="loopback"||r.includes("loopback"),s.ipv6=s.skipFirst6?1:0,s.cache6=[]),Ze[r]=s}}function Gt(e){let t=(e.interfaces??[]).length;return t>2?"lan":t===2?"p2p":"stub"}function nr(e,t){let n=t.prefix??{};if(typeof n.ipv4=="string"||typeof n.ipv6=="string")return;if(t.prefix===!1){t.prefix={};return}let r=Gt(t),i=[];typeof t.pool=="string"&&i.push(String(t.pool)),typeof t.role=="string"&&i.push(t.role),i.push(r),i.includes("lan")||i.push("lan");let s=_o(e,i);t.prefix=Object.keys(s).length?s:{}}function mo(e,t,n){return _o(e,[t],n)}function ho(e,t){let n=t.prefix??{},r=[...t.interfaces??[]].sort((o,a)=>String(o.node).localeCompare(String(a.node))),i=e.nodes??{},s=t.type==="p2p"&&r.length===2;for(let o of["ipv4","ipv6"]){let a=n[o];if(typeof a!="string")continue;if(s){r[0][o]=Fe(a,1),r[1][o]=Fe(a,2);for(let u of t.interfaces??[]){let p=r.find(d=>d.node===u.node);p&&(u[o]=p[o])}continue}let c=1;for(let u of t.interfaces??[]){if(u[o]!==void 0&&u[o]!==null)continue;let d=i[u.node]?.id,f=typeof d=="number"&&d>0&&ll(a,d)?d:c++;u[o]=Fe(a,f)}}}function _o(e,t,n){let r=e.addressing??{},i=t.find(c=>r[c]&&typeof r[c]=="object");if(!i)return{};let s=r[i],o=Ze[i]??(Ze[i]={}),a={};if(typeof s.ipv4=="string"){let c=typeof s.prefix=="number"?s.prefix:24;a.ipv4=n!==void 0?fl(s.ipv4,c,n,o):cl(s.ipv4,c,o)}if(typeof s.ipv6=="string"){let c=typeof s.prefix6=="number"?s.prefix6:64;a.ipv6=n!==void 0?pl(s.ipv6,c,n,o):ul(s.ipv6,c,o)}return a}function cl(e,t,n){let r=n.ipv4??0;return n.ipv4=r+1,go(e,t,r)}function fl(e,t,n,r){for(r.cache4=r.cache4??[];r.cache4.length<n;){let s=r.cache4.length+(r.skipFirst4?1:0);r.cache4.push(go(e,t,s))}let i=(r.skipFirst4?1:0)+r.cache4.length;return(r.ipv4??0)<i&&(r.ipv4=i),r.cache4[n-1]}function ul(e,t,n){let r=n.ipv6??0;return n.ipv6=r+1,yo(e,t,r)}function pl(e,t,n,r){for(r.cache6=r.cache6??[];r.cache6.length<n;){let s=r.cache6.length+(r.skipFirst6?1:0);r.cache6.push(yo(e,t,s))}let i=(r.skipFirst6?1:0)+r.cache6.length;return(r.ipv6??0)<i&&(r.ipv6=i),r.cache6[n-1]}function go(e,t,n){let[r,i]=rr(e),s=2**(32-t),o=r+n*s>>>0;return`${ir(o)}/${t}`}function yo(e,t,n){let[r,i]=q.default.parseCIDR(e);if(r.kind()!=="ipv6")throw new Error(`Expected IPv6 pool, got ${e}`);let s=sr(r.toByteArray()),o=128n-BigInt(t),a=(s>>o)+BigInt(n)<<o,c=or(a,16);return`${q.default.fromByteArray(Array.from(c)).toString()}/${t}`}function Fe(e,t){let[n,r]=q.default.parseCIDR(e);if(n.kind()==="ipv4"){let[c]=rr(e);return`${ir(c+t>>>0)}/${r}`}let s=sr(n.toByteArray())+BigInt(t),o=or(s,16);return`${q.default.fromByteArray(Array.from(o)).toString()}/${r}`}function vo(e){try{let[t,n]=q.default.parseCIDR(e);if(t.kind()==="ipv4"){let[c]=rr(e),u=n===0?0:-1<<32-n>>>0;return`${ir((c&u)>>>0)}/${n}`}let r=t.toByteArray(),i=sr(r),s=128n-BigInt(n),o=i>>s<<s;return`${q.default.fromByteArray(Array.from(or(o,16))).toString()}/${n}`}catch{return e}}function ll(e,t){try{let[,n]=q.default.parseCIDR(e);if(q.default.parseCIDR(e)[0].kind()==="ipv4"){let i=2**(32-n)-2;return t>0&&t<=i}return t>0}catch{return!1}}function rr(e){let[t,n]=e.split("/"),r=(t??"0.0.0.0").split(".").map(Number);return[(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),Number(n??32)]}function ir(e){return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function sr(e){let t=0n;for(let n of e)t=(t<<8n)+BigInt(n);return t}function or(e,t){let n=new Array(t).fill(0),r=e;for(let i=t-1;i>=0;i--)n[i]=Number(r&0xffn),r>>=8n;return n}function et(e,t){let n;if(e&&typeof e=="object"&&!Array.isArray(e))n={...e};else{n={};for(let r of e??[])if(typeof r=="string")n[r]={name:r};else if(r&&typeof r=="object"&&!Array.isArray(r)){let i=r;if(!i.name){t?.error({code:"VALUE",category:"VALUE",module:"nodes",message:`Node is missing a "name" attribute: ${JSON.stringify(r)}`});continue}n[i.name]=i}}for(let r of Object.keys(n)){let i=n[r];i==null?i={name:r}:typeof i!="object"||Array.isArray(i)?(t?.error({code:"TYPE",category:"TYPE",module:"nodes",message:`Node data for node ${r} must be a dictionary`}),i={name:r,extra:i}):i={...i,name:r},Array.isArray(i.interfaces)||(i.interfaces=[]),n[r]=i}return n}function dl(e){let t=new Set;for(let r of Object.values(e.nodes??{}))typeof r.id=="number"&&t.add(r.id);let n=1;for(let r of Object.values(e.nodes??{}))if(typeof r.id!="number"){for(;t.has(n);)n++;r.id=n,t.add(n),n++}}function bo(e,t){let n=String(e.defaults?.device??"frr"),r=je;for(let i of Object.values(e.nodes??{})){i.device||(i.device=n);let s=String(i.device);r.includes(s)||(t?.warning({code:"VALUE",category:"VALUE",module:"nodes",message:`Unsupported device '${s}' on node ${i.name}; using frr (allowed: ${r.join(", ")})`,path:`nodes.${i.name}.device`}),s="frr",i.device=s);let o=Z(s);i.role||(i.role=String(o.role??"router")),o.daemon&&(i["netlab-internal:_daemon"]=!0,o.parent&&(i["netlab-internal:_daemon_parent"]=o.parent))}}function ar(e){dl(e);let t=e.addressing?.mgmt??{},n=String(t.ipv4??"192.168.121.0/24"),r=Number(t.start??100);for(let i of Object.values(e.nodes??{})){let s=i.id??1,o=Z(String(i.device??"frr")),a=Number(o.ifindex_offset??1),c=o.mgmt_if!==void 0?String(o.mgmt_if):De(String(o.interface_name??"eth{ifindex}"),a-1);if(i.mgmt={ifname:c||"eth0",ipv4:ml(n,r+s),mac:gl(String(t.mac??"CA-FE-00-00-00-00"),s)},i.loopback!==!1&&(i.role==="router"||i.role==="gateway"||!i.role)){let u=De(String(o.loopback_interface_name??"lo{ifindex}"),0),p=mo(e,"loopback",s),d={ifindex:0,ifname:u||"lo",type:"loopback",virtual_interface:!0,neighbors:[]};typeof p.ipv4=="string"&&(d.ipv4=p.ipv4.endsWith("/32")?p.ipv4:Fe(p.ipv4,1)),typeof p.ipv6=="string"&&(d.ipv6=p.ipv6.endsWith("/128")?p.ipv6:Fe(p.ipv6,1)),i.loopback={...d,...i.loopback??{}}}i.af=i.af??{},(i.loopback?.ipv4||(i.interfaces??[]).some(u=>u.ipv4))&&(i.af.ipv4=!0),(i.loopback?.ipv6||(i.interfaces??[]).some(u=>u.ipv6))&&(i.af.ipv6=!0)}}function De(e,t){return e.includes("if ifindex else")?t?e.replace(/\{ifindex if ifindex else ""\}/g,String(t)):e.replace(/lo\{ifindex if ifindex else ""\}/g,"lo").replace(/\{ifindex if ifindex else ""\}/g,""):e.replace(/\{ifindex\}/g,String(t))}function xo(e,t){let n=e;for(let[r,i]of Object.entries(t))i!==void 0&&(n=n.replaceAll(`{${r}}`,String(i)));return n}function ml(e,t){return hl(e,t)}function hl(e,t){let[n,,]=_l(e),r=(n&4294967295)+t;return[r>>>24&255,r>>>16&255,r>>>8&255,r&255].join(".")}function _l(e){let[t,n]=e.split("/"),r=(t??"0.0.0.0").split(".").map(a=>Number(a)),i=(r[0]<<24>>>0)+(r[1]<<16>>>0)+(r[2]<<8>>>0)+(r[3]>>>0),s=Number(n??32),o=s===0?0:-1<<32-s>>>0;return[i&o,s]}function gl(e,t){let n=t.toString(16).padStart(4,"0");return e.replace(/00-00$/,`${n.slice(0,2)}-${n.slice(2)}`)}function tt(e,t){let n=e.nodes??{},r=e.links;if(!r)return[];let i=Array.isArray(r)?r:[],s=[],o=0;for(let a of i){o++;let c=`links[${o}]`,u=nt(a,c,n,t);u&&u.disable!==!0&&(u.linkindex=o,u[F]=c,delete u._linkname,s.push(u))}return e.links=s,s}function nt(e,t,n,r){if(typeof e=="string"){let i=[];for(let s of e.split("-")){let o=s.trim();n[o]?i.push({node:o}):r?.error({code:"VALUE",category:"VALUE",module:"links",message:`Link string ${e} in ${t} refers to an unknown node ${o}`})}return{interfaces:i,[F]:t}}if(Array.isArray(e))return{interfaces:wo(e,n,r,t),[F]:t};if(e&&typeof e=="object"){let i={...e};if(Array.isArray(i.interfaces))return i.interfaces=wo(i.interfaces,n,r,t),i[F]=t,i;let s={[F]:t},o=[];for(let[a,c]of Object.entries(i))if(a in n){let u=c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:a}:{node:a};o.push(u)}else s[a]=c;return s.interfaces=o,s}return r?.error({code:"TYPE",category:"TYPE",module:"links",message:`Invalid type ${typeof e} for ${t}`}),null}function wo(e,t,n,r){let i=[];for(let s of e)if(typeof s=="string"){if(!t[s]){n?.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface in ${r} refers to unknown node ${s}`});continue}i.push({node:s})}else if(s&&typeof s=="object"&&!Array.isArray(s)){let o=s;if(!o.node||!t[o.node]){n?.error({code:"VALUE",category:"VALUE",module:"links",message:`Interface data in ${r} missing/unknown node`});continue}i.push(o)}return i}function Kt(e){let t=0;for(let n of e.links??[]){let r=Number(n.linkindex??0);r>t&&(t=r)}return t+1}function So(e,t){let n=(e.interfaces??[]).map(i=>i.ifindex??0),r=t;for(;n.includes(r);)r++;return r}function cr(e){let t=e.nodes??{},n=e.defaults??{},r=Nn(n),i=kn(n);for(let s of e.links??[]){yl(s,t);let o=s.interfaces??[];if(s.node_count=o.length,(s.type==="lan"||s.type==="stub")&&!s.bridge){let c=String(e.name??"lab").slice(0,10);s.bridge=`${c}_${s.linkindex??1}`}nr(e,s),ho(e,s);let a=[];for(let c of o){let u=c.node,p=t[u];if(!p)continue;let d=new Set(r);for(let T of p.module??[])d.add(T);for(let T of i)d.delete(T);let m={};for(let[T,j]of Object.entries(s))d.has(T)&&(m[T]=structuredClone(j));let{node:f,...l}=c,_=kr(structuredClone(l),m),h=Z(String(p.device??"frr")),g=s.type==="loopback",y,b;if(g){y=bl(p,"loopback");let T=y-1e4,j=String(h.loopback_interface_name??h.interface_name??"Loopback{ifindex}");b=De(j,T),_.virtual_interface=!0}else y=vl(p),b=De(String(h.interface_name??"eth{ifindex}"),y);_.ifindex=y,_.ifname=b,_.type||(_.type=s.type??Gt(s)),_.neighbors=[],c.ifindex=y,c.ifname=b,g&&(c.virtual_interface=!0),p.interfaces=p.interfaces??[],p.interfaces.push(_),a.push({node:u,data:_})}for(let c of a){c.data.neighbors=[];for(let u of a){if(u===c)continue;let p={node:u.node};u.data.ifname!==void 0&&(p.ifname=u.data.ifname),u.data.ipv4!==void 0&&(p.ipv4=u.data.ipv4),u.data.ipv6!==void 0&&(p.ipv6=u.data.ipv6),c.data.neighbors.push(p)}}}for(let s of Object.values(t))s.af=s.af??{},(s.loopback?.ipv4||(s.interfaces??[]).some(o=>typeof o.ipv4=="string"))&&(s.af.ipv4=!0),(s.loopback?.ipv6||(s.interfaces??[]).some(o=>typeof o.ipv6=="string"))&&(s.af.ipv6=!0)}function yl(e,t){let n=e.interfaces??[],r=n.length,i=0;for(let s of n){let o=t[s.node];o&&o.role!=="host"&&i++}!("role"in e)&&i<=1&&e.type!=="loopback"&&!e.vlan_name&&(e.role="stub"),e.type||(e.type=Gt(e))}function vl(e){let t=(e.interfaces??[]).map(r=>r.ifindex??0),n=1;for(;t.includes(n);)n++;return n}function bl(e,t){let n=(e.interfaces??[]).map(i=>i.ifindex??0),r=10001;for(;n.includes(r);)r++;return r}function fr(e){return e===!0||e==="true"||e==="True"}function ur(e){if(e.groups||(e.groups={}),Array.isArray(e.groups)){let t={};for(let n of e.groups)n.name&&(t[String(n.name)]=n);e.groups=t}}function pr(e){let t=e.groups??{},n=e.defaults?.groups??{},r=fr(t._auto_create)||fr(n._auto_create);!e.nodes||typeof e.nodes!="object"?e.nodes={}:Array.isArray(e.nodes)&&(e.nodes=et(e.nodes));let i=e.nodes;for(let[s,o]of Object.entries(t)){if(s.startsWith("_")||!o||typeof o!="object"||Array.isArray(o))continue;let a=o,c=a.members;if(!(!Array.isArray(c)||c.length===0||!fr(a._auto_create)&&!r||String(a.type??"node")!=="node"))for(let p of c){let d=String(p);d in t||d in n||d in i||(i[d]={name:d,interfaces:[]})}}}function lr(e){let t=e.groups??{},n=e.nodes??{};for(let[r,i]of Object.entries(t)){if(r.startsWith("_")||!i||typeof i!="object"||Array.isArray(i))continue;let s=i.members??[];for(let o of s){let a=n[o];if(!a)continue;if(i.device&&!a.device&&(a.device=i.device),typeof i.provider=="string"&&!a.provider&&(a.provider=i.provider),Array.isArray(i.module)){let u=new Set(a.module??[]);for(let p of i.module)u.add(p);a.module=[...u]}let c=new Set([...e.module??[],...i.module??[],...a.module??[]]);for(let u of c){let p=i[u];if(!p||typeof p!="object"||Array.isArray(p))continue;let d=a[u];d===void 0?a[u]=structuredClone(p):d&&typeof d=="object"&&!Array.isArray(d)&&(a[u]=I(p,d))}if(i.node_data&&typeof i.node_data=="object"){let u=I(i.node_data,a);Object.assign(a,u)}}}}function dr(e){e.groups||(e.groups={});let t=e.groups,n=Number(e.bgp?.as);for(let[r,i]of Object.entries(e.nodes??{})){if(!(i.module??[]).includes("bgp"))continue;let s=Number(i.bgp?.as??n);if(!Number.isFinite(s)||s<=0)continue;let o=`as${s}`;t[o]||(t[o]={members:[]});let a=t[o];Array.isArray(a.members)||(a.members=[]),a.members.includes(r)||a.members.push(r)}}function mr(e){let t=e.components;if(!t||typeof t!="object")return;let n=e.nodes??{},r={},i=[],s=[];for(let[o,a]of Object.entries(n)){let c=a.include;if(typeof c!="string")continue;let u=t[c];if(!u)continue;i.push(o);let p=o,d=u.nodes??{};for(let[f,l]of Object.entries(d)){let _=`${p}_${f}`;r[_]={...l,name:_}}let m=u.links??[];for(let f of m)s.push(xl(f,p,Object.keys(d)))}for(let o of i)delete n[o];Object.assign(n,r),e.nodes=n,e.links=[...e.links??[],...s],delete e.components,tt(e)}function xl(e,t,n){let r=i=>n.includes(i)?`${t}_${i}`:i;if(Array.isArray(e))return{interfaces:e.map(i=>({node:r(String(i))}))};if(e&&typeof e=="object"){let i={...e};if(Array.isArray(i.interfaces))return i.interfaces=i.interfaces.map(a=>({...a,node:r(String(a.node??""))})),i;let s={interfaces:[]},o=[];for(let[a,c]of Object.entries(i))n.includes(a)?o.push(c&&typeof c=="object"&&!Array.isArray(c)?{...c,node:r(a)}:{node:r(a)}):s[a]=c;return s.interfaces=o,s}return{interfaces:[]}}var hr={};te(hr,{createVlanAccessLinks:()=>To,default:()=>Fl,link_pre_transform:()=>ko,module_post_link_transform:()=>$o,module_pre_transform:()=>No,name:()=>Ao});var Ao="vlan",wl=4e4,Sl=["id","vni","mode","prefix","evpn","stp","lag","links"],Al=["bridge","ifindex","parentindex","ifname","linkindex","type","vlan","mtu","bandwidth","_selfloop_ifindex","stp","virtual_interface","lag","evpn"];function Io(e){let t=e.defaults?.vlan;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function qt(e,t){let n=Io(e).attributes?.[t];return n&&typeof n=="object"&&!Array.isArray(n)?Object.keys(n):t==="vlan_no_propagate"?[...Sl]:t==="phy_ifattr"?[...Al]:t==="copy_vlan_to_intf"?["ipv4","ipv6","gateway"]:[]}function ee(e){return e.vlans??{}}function Il(e){let t=Number(e.vlan?.start_vlan_id);if(Number.isFinite(t)&&t>0)return t;let n=Number(Io(e).start_vlan_id);return Number.isFinite(n)&&n>0?n:1e3}function El(e,t,n){t.prefix!==void 0&&(n.prefix=structuredClone(t.prefix)),n.type===void 0&&(n.type=t.type??"lan"),n.vlan_name=e}function Tl(e,t,n){let r=e.vlan?.access??e.vlan?.native;if(!r)return"irb";let i=t.vlans??{};return e._vlan_mode||e.vlan?.mode||i[String(r)]?.mode||t.vlan?.mode||ee(n)[String(r)]?.mode||n.vlan?.mode||"irb"}function Nl(e,t){for(let n of e.interfaces??[]){if(!n.vlan)continue;let r=t.nodes?.[String(n.node)];r&&(n._vlan_mode=Tl(n,r,t))}}function Eo(e){return e._vlan_mode}function To(e,t){let n=ee(e);if(Object.keys(n).length){e.links||(e.links=[]);for(let[r,i]of Object.entries(n))if(!(!i||typeof i!="object")&&Array.isArray(i.links)){for(let s=0;s<i.links.length;s++){let o=nt(i.links[s],`vlans.${r}.links[${s+1}]`,e.nodes??{},t?.diagnostics);if(!o)continue;let a=o.vlan??{};a.access=r,o.vlan=a,o.linkindex=Kt(e),o[F]=`vlans.${r}.links[${s+1}]`,e.links.push(o)}delete i.links}}}function kl(e){let t=ee(e);if(!Object.keys(t).length)return;let n=new Set;for(let i of Object.values(t))typeof i?.id=="number"&&n.add(i.id);for(let i of Object.values(e.nodes??{})){let s=i.vlans;if(s)for(let o of Object.values(s))typeof o?.id=="number"&&n.add(o.id)}let r=Il(e);for(let[i,s]of Object.entries(t)){let o=s??{};if(o.id===void 0){for(;n.has(r);)r++;o.id=r,n.add(r),r++}t[i]=o}e.vlans=t}function No(e,t){e.vlans&&!e.links&&(e.links=[]),kl(e),To(e,t)}function ko(e,t,n){if(e.type==="vlan_member")return;let r=e.vlan;if(!r)return;for(let s of e.interfaces??[]){let o=t.nodes?.[String(s.node)];o&&(o.module??[]).includes("vlan")&&(s.vlan=I(structuredClone(r),s.vlan??{}))}let i=typeof r.access=="string"?r.access:typeof r.native=="string"?r.native:void 0;if(i){let s=ee(t)[i];s&&r.access_id===void 0&&typeof s.id=="number"&&(r.access_id=s.id);for(let o of e.interfaces??[]){let a=o.vlan;a&&a.access_id===void 0&&r.access_id!==void 0&&(a.access_id=r.access_id)}if(Nl(e,t),s){let o=new Set(qt(t,"vlan_no_propagate")),a={};for(let[c,u]of Object.entries(s))o.has(c)||(a[c]=structuredClone(u));for(let[c,u]of Object.entries(a))e[c]===void 0?e[c]=u:e[c]&&typeof e[c]=="object"&&!Array.isArray(e[c])&&u&&typeof u=="object"&&!Array.isArray(u)&&(e[c]=I(u,e[c]));El(i,s,e)}for(let o of e.interfaces??[]){let a=t.nodes?.[String(o.node)];a&&(a.module??[]).includes("vlan")&&Eo(o)==="bridge"&&(o.ipv4=!1,o.ipv6=!1)}}}function Oo(e,t,n){t.vlans||(t.vlans={});let r=t.vlans;if(r[e]?._global_merge)return r[e];let i=r[e]??{},s=ee(n)[e]??{};i.mode=i.mode||t.vlan?.mode||s.mode||n.vlan?.mode||"irb",i._global_merge=!0;let o=I(structuredClone(s),i);for(let a of Object.keys(o))!(t.module??[]).includes(a)&&(n.module??[]).includes(a)&&delete o[a];return r[e]=o,o}function Ol(e,t,n){e.vlans||(e.vlans={});let r=e.vlans;if(!(t in r)&&!ee(n)[t])return;t in r||(r[t]={});let i=Oo(t,e,n);if(i.bridge_group===void 0){let s=e.vlan??{},o=Number(s.max_bridge_group??0)+1;s.max_bridge_group=o,e.vlan=s,i.bridge_group=o}return i}function Co(e,t,n,r){let i=ee(n)[e];if(i)return i;let s=t.vlans?.[e];if(s)return s;if(r?.neighbors)for(let o of r.neighbors){if(!o.node)continue;let c=n.nodes?.[o.node]?.vlans?.[e];if(c)return c}}function Cl(e,t,n,r,i){let s=Co(e,r,i,t);if(!s)return;Array.isArray(s.neighbors)||(s.neighbors=[]);let o=s.neighbors,a=new Set(o.map(m=>m.node));for(let m of t.neighbors??[])a.has(m.node)||o.push({...m});let c=new Set([...r.module??[],"ipv4","ipv6"]),u=String(r.name??""),p={node:u};n.ifname!==void 0&&(p.ifname=n.ifname);for(let m of c){let f=n[m];f!==void 0&&(p[m]=f)}let d=o.filter(m=>m.node!==u);d.push(p),s.neighbors=d}function $l(e,t,n){let r=new Set([...qt(t,"phy_ifattr"),...Object.keys(t.defaults?.providers??{})]),i=new Set([...qt(t,"vlan_no_propagate").filter(c=>c!=="mode"),...qt(t,"vlan_svi_no_propagate")]),s={},o=e.interfaces??[],a=o.length;for(let c=0;c<a;c++){let u=o[c],p=u.vlan;if(!p)continue;let d=p.access??p.native;if(!d||(Eo(u)??"irb")==="route")continue;let f=Ol(e,d,t);if(!f)continue;let _=(Z(String(e.device??"none")).features??{}).vlan?.svi_interface_name;if(!_||typeof _!="string"){n.diagnostics.error({code:"VALUE",category:"VALUE",module:"vlan",message:`Device ${e.device} used by ${e.name} does not support VLAN interfaces (access vlan ${d})`,path:`nodes.${e.name}`});return}let h=s[d];if(!h){let g=p.mode||f.mode||"",y=["vlan_name","gateway"];g!=="bridge"&&y.push("ipv4","ipv6");let b={};for(let T of y)u[T]!==void 0&&(b[T]=structuredClone(u[T]));h=b,g?h.vlan={mode:g,name:d}:h.vlan={name:d},h.type="svi",h.ifindex=So(e,wl),h.ifname=xo(_,{vlan:Number(f.id),bvi:Number(f.bridge_group??f.id),ifname:u.ifname}),h.name=`VLAN ${d} (${f.id})`,h.virtual_interface=!0,h.neighbors=[];for(let[T,j]of Object.entries(f))i.has(T)||y.includes(T)||j===!0&&h[T]!==void 0||h[T]===void 0&&(h[T]=structuredClone(j));e.interfaces=e.interfaces??[],e.interfaces.push(h),s[d]=h}Cl(d,u,h,e,t),u.neighbors!==void 0&&(u._vlan_saved_neighbors=u.neighbors);for(let g of Object.keys(u))g.includes("_vlan_saved")||r.has(g)||delete u[g];u.vlan={...u.vlan,access_id:f.id,access:d}}}function Ll(e,t){for(let n of e.interfaces??[]){if(n.vlan_name===void 0)continue;let r=Co(String(n.vlan_name),e,t,n);!r||!Array.isArray(r.neighbors)||(n.neighbors=r.neighbors.filter(i=>i.node!==e.name))}}function Pl(e){for(let t of e.links??[]){delete t.vlan_name;for(let n of t.interfaces??[])n._vlan_mode!==void 0&&(n.vlan={...n.vlan??{},mode:n._vlan_mode},delete n._vlan_mode)}for(let t of Object.values(e.nodes??{})){for(let r of t.interfaces??[])delete r.vlan_name,delete r._global_merge,r._vlan_mode!==void 0&&(r.vlan={...r.vlan??{},mode:r._vlan_mode},delete r._vlan_mode),r._vlan_saved_neighbors!==void 0&&(r.neighbors=r._vlan_saved_neighbors,delete r._vlan_saved_neighbors);let n=t.vlans;if(n)for(let r of Object.values(n))delete r._global_merge,delete r.neighbors}for(let t of Object.values(ee(e)))delete t.neighbors}function $o(e,t){for(let n of Object.values(e.nodes??{})){if(!(n.module??[]).includes("vlan"))continue;let r=n.vlans;if(r)for(let i of Object.keys(r))Oo(i,n,e);$l(n,e,t)}for(let n of Object.values(e.nodes??{}))(n.module??[]).includes("vlan")&&Ll(n,e);Pl(e)}var Rl={name:Ao,module_pre_transform:No,link_pre_transform:ko,module_post_link_transform:$o},Fl=Rl;var gr={};te(gr,{default:()=>Ml,expandVrfLinks:()=>_r,module_pre_transform:()=>Po,name:()=>Lo,node_post_transform:()=>Ro});var Lo="vrf";function _r(e,t){for(let[n,r]of Object.entries(e.vrfs??{}))!r||typeof r!="object"||Array.isArray(r)||!Array.isArray(r.links)||(e.links??=[],r.links.forEach((i,s)=>{let o=`vrfs.${n}.links[${s+1}]`,a=nt(i,o,e.nodes??{},t.diagnostics);a&&(a.vrf=n,a.linkindex=Kt(e),a[F]=o,e.links.push(a))}),delete r.links)}function Po(e,t){let n=e.vrfs;if(!n||typeof n!="object")return;let r=1;for(let[i,s]of Object.entries(n)){let o=s??{};o.rd||(o.rd=`1:${r}`),o.import||(o.import=[String(o.rd)]),o.export||(o.export=[String(o.rd)]),n[i]=o,r++}}function Ro(e,t,n){let r=t.vrfs;if(!r)return;let i=new Set((e.interfaces??[]).map(o=>o.vrf).filter(o=>typeof o=="string"));if(!i.size)return;let s={...e.vrfs??{}};for(let o of i)!s[o]&&r[o]&&(s[o]={...r[o]});e.vrfs=s}var Dl={name:Lo,module_pre_transform:Po,node_post_transform:Ro},Ml=Dl;var vr={};te(vr,{default:()=>Ul,module_init:()=>jo,module_post_transform:()=>Yo,module_pre_transform:()=>Bo,name:()=>Fo});var Fo="vxlan";function yr(e){return e.vlans??{}}function Do(e){let t=e.defaults?.vxlan;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function jl(e){let t=Number(e.vxlan?.start_vni);if(Number.isFinite(t)&&t>0)return t;let n=Number(Do(e).start_vni);return Number.isFinite(n)&&n>0?n:1e5}function Mo(e,t){let n=t?.vxlan??e.vxlan??{};return Array.isArray(n.vlans)&&n.vlans.length?n.vlans.map(String):Object.keys(yr(e))}function jo(e,t){e.vxlan||(e.vxlan={})}function Bo(e,t){let n=yr(e);if(!Object.keys(n).length)return;let r=new Set;for(let c of Object.values(n))typeof c?.vni=="number"&&r.add(c.vni);let i=jl(e),s=i,o=Mo(e);for(let c of o){let u=n[c];if(!u||u.vni===!1||typeof u.vni=="number")continue;let p=Number(u.id),d=Number.isFinite(p)?i+p:0;if(d>0&&!r.has(d))u.vni=d,r.add(d);else{for(;r.has(s);)s++;u.vni=s,r.add(s),s++}}let a=e.vxlan??{};(!Array.isArray(a.vlans)||!a.vlans.length)&&(a.vlans=o.filter(c=>typeof n[c]?.vni=="number")),e.vxlan=a}function Bl(e,t){let r=e.loopback?.[t];if(typeof r=="string")return r.split("/")[0]}function Yo(e,t){let n=e.vxlan??{},r=String(n.flooding??"static"),i=yr(e);for(let s of Object.values(e.nodes??{})){if(!(s.module??[]).includes("vxlan"))continue;let o=s.vxlan??{};o.domain===void 0&&(o.domain=n.domain??"global"),o.flooding=r;let a=Mo(e,s).filter(m=>typeof i[m]?.vni=="number");o.vlans=a;let c={...s.vlans??{}};for(let m of a){let f=i[m],l=c[m]??{},_=l.evpn??{},h=f.evpn&&typeof f.evpn=="object"&&!Array.isArray(f.evpn)?f.evpn:{};c[m]={...l,id:f.id,mode:f.mode,vni:f.vni,...Object.keys(h).length||Object.keys(_).length?{evpn:{...h,..._}}:{}}}Object.keys(c).length&&(s.vlans=c);let p=!!(n.use_v6_vtep??o.use_v6_vtep??Do(e).use_v6_vtep)?"ipv6":"ipv4",d=Bl(s,p);if(d?(o.vtep=d,o.vtep_interface=String(s.loopback?.ifname??"lo"),o.transport=p):t.diagnostics.error({code:"MISSING",category:"MISSING",module:"vxlan",message:`VXLAN module needs an ${p.toUpperCase()} address on loopback of ${s.name}`,path:`nodes.${s.name}.loopback.${p}`}),String(o.flooding)==="static"){let m=Object.values(e.nodes??{}).filter(l=>l!==s&&(l.module??[]).includes("vxlan")),f=new Set;for(let l of a){let _=c[l];if(!_||typeof _.vni!="number")continue;let h=[];for(let g of m){let y=g.vxlan?.vtep;if(typeof y!="string"||y===d)continue;let b=g.vlans??{};Object.values(b).some(j=>j?.vni===_.vni)&&(h.push(y),f.add(y))}h.length&&(_.vtep_list=h)}f.size&&(o.vtep_list=[...f].sort())}s.vxlan=o}}var Yl={name:Fo,module_init:jo,module_pre_transform:Bo,module_post_transform:Yo},Ul=Yl;var br={};te(br,{default:()=>Gl,module_init:()=>Vo,name:()=>Uo,node_post_transform:()=>Go});var Uo="ospf";function Me(e){let t=e.ospf;if(!t||typeof t!="object"||Array.isArray(t))return;let n=t.area;typeof n!="number"||!Number.isInteger(n)||n<0||n>4294967295||(t.area=[24,16,8,0].map(r=>n>>>r&255).join("."))}function Vo(e,t){e.ospf||(e.ospf={}),Me(e);for(let n of Object.values(e.nodes??{})){Me(n);for(let r of n.interfaces??[])Me(r)}for(let n of e.links??[]){Me(n);for(let r of n.interfaces??[])Me(r)}}function Go(e,t,n){let r=e.ospf??{},i=t.ospf??{};if(r.area===void 0&&(r.area=i.area??"0.0.0.0"),!r.router_id){let a=e.loopback,c=typeof a?.ipv4=="string"?a.ipv4.split("/")[0]:void 0;r.router_id=c??`10.0.0.${e.id??1}`}let s=(e.interfaces??[]).some(a=>typeof a.ipv4=="string")||typeof e.loopback?.ipv4=="string",o=(e.interfaces??[]).some(a=>typeof a.ipv6=="string")||typeof e.loopback?.ipv6=="string";r.af={ipv4:s,ipv6:o};for(let a of e.interfaces??[]){if(Me(a),a.role==="external"||a.ospf===!1){delete a.ospf;continue}let c=a.ospf??{};c.area===void 0&&(c.area=r.area),!c.network_type&&a.type==="p2p"&&(c.network_type="point-to-point"),a.role==="stub"||a.type==="stub"?c.passive===void 0&&(c.passive=!0):c.passive===void 0&&(c.passive=!1),a.ospf=c}if(e.loopback){let a=e.loopback,c=a.ospf??{};c.area===void 0&&(c.area=r.area),c.passive===void 0&&(c.passive=!1),a.ospf=c}e.ospf=r}var Vl={name:Uo,module_init:Vo,node_post_transform:Go},Gl=Vl;var xr={};te(xr,{default:()=>ql,module_init:()=>qo,name:()=>Ko,node_post_transform:()=>Wo});var Ko="isis";function qo(e,t){e.isis||(e.isis={})}function Wo(e,t,n){let r=e.isis??{},i=t.isis??{};if(r.area||(r.area=i.area??"49.0001"),r.type||(r.type=i.type??"level-2"),!r.net){let s=(e.id??1).toString(16).padStart(4,"0");r.net=`${r.area}.0000.0000.${s}.00`}for(let s of e.interfaces??[]){let o=s.isis??{};!o.network_type&&s.type==="p2p"&&(o.network_type="point-to-point"),s.isis=o}e.isis=r}var Kl={name:Ko,module_init:qo,node_post_transform:Wo},ql=Kl;var wr={};te(wr,{default:()=>id,link_pre_transform:()=>Jo,module_init:()=>Xo,module_post_transform:()=>Zo,name:()=>Ho,node_post_transform:()=>ea,node_pre_transform:()=>Qo});var Ho="bgp",zo={ipv4:["ibgp","ebgp","localas_ibgp"],ipv6:["ibgp","ebgp","localas_ibgp"]},Wl={localas_ibgp:"ibgp"};function Xo(e,t){e.bgp||(e.bgp={})}function Qo(e,t,n){let r=e.bgp??{},i=t.bgp??{};r.as===void 0&&i.as!==void 0&&(r.as=i.as),r.as===void 0&&n.diagnostics.error({code:"MISSING",category:"MISSING",module:"bgp",message:`Node ${e.name} is missing bgp.as`,path:`nodes.${e.name}.bgp.as`}),e.bgp=r}function Jo(e,t,n){let r=t.defaults?.bgp,i=String(t.bgp?.ebgp_role??r?.ebgp_role??"external");if(!i||e.vlan_name)return;let s=new Set;for(let o of e.interfaces??[]){let a=t.nodes?.[o.node];if(!a)continue;let c=Number(a.bgp?.as);Number.isFinite(c)&&c>0&&s.add(c);let u=Number(o.bgp?.local_as??a.bgp?.local_as??c);Number.isFinite(u)&&u>0&&s.add(u)}s.size>1&&!e.role&&(e.role=i)}function Zo(e,t){for(let n of Object.values(e.nodes??{})){if(!(n.module??[]).includes("bgp"))continue;let r=n.bgp??{};if(!r.router_id){let i=n.loopback;r.router_id=typeof i?.ipv4=="string"?i.ipv4.split("/")[0]:`10.0.0.${n.id??1}`}n.bgp=r}zl(e)}function ea(e,t,n){let r=e.bgp??{};if(!r.as){e.bgp=r;return}Hl(e,t),Jl(e,t),nd(e),ed(e),td(e),e.bgp=r}function zl(e){let t=new Set;for(let n of Object.values(e.nodes??{})){let r=Number(n.bgp?.as);Number.isFinite(r)&&t.add(r)}for(let n of t){let r=ta(n,e);if(!r.length)continue;let i=r.filter(o=>o.bgp.rr_cluster_id===void 0).map(o=>String(o.bgp.router_id??"")),s=i.length?i.sort()[0]:void 0;for(let o of r){let a=o.bgp;a.rr_cluster_id===void 0&&(a.rr_cluster_id=s||a.router_id)}}}function ta(e,t){return Object.values(t.nodes??{}).filter(n=>{let r=n.bgp;return r&&Number(r.as)===e&&r.rr})}function Hl(e,t){let n=e.bgp,r=n.sessions??zo,i=[];n.neighbors=i,Xl(e,r,t,i),Ql(e,r,t,i);for(let o of["ipv4","ipv6"])i.some(a=>a[o]!==void 0)&&(n[o]=!0);let s=n.activate??zo;for(let o of i){let a={};for(let c of["ipv4","ipv6"])o[c]!==void 0&&n[c]&&(s[c]??[]).includes(String(o.type))&&(a[c]=!0);Object.keys(a).length&&(o.activate=a)}}function Xl(e,t,n,r){let i=e.bgp,s=Number(i.as),o=!!i.rr,a=i.next_hop_self,c=i.rr_mesh!==!1,u=o?[]:ta(s,n),p;o||u.length===0?(p=Object.values(n.nodes??{}).filter(d=>d.name===e.name?!1:Number(d.bgp?.as)===s),o&&!c&&(p=p.filter(d=>!d.bgp.rr||d.bgp.rr_mesh!==!1))):p=u;for(let d of p){let m=d.loopback??{},f={};d.bgp?.rr&&(f.rr=d.bgp.rr);let l=na(d,m,"ibgp",t,f);l&&(e.loopback&&(l._source_intf=structuredClone(e.loopback)),a&&(l.next_hop_self="ebgp"),o&&!l.rr&&(l.rr_client=!0),r.push(l))}}function Ql(e,t,n,r){let i=e.bgp,s=Number(i.as);for(let o of e.interfaces??[])if(!(o.bgp===!1||!(typeof o.ipv4=="string"||typeof o.ipv6=="string")))for(let c of o.neighbors??[]){let u=n.nodes?.[c.node];if(!u)continue;let p=Number(u.bgp?.as);if(!Number.isFinite(p)||p<=0||p===s)continue;let d={};typeof c.ipv4=="string"&&(d.ipv4=c.ipv4),typeof c.ipv6=="string"&&(d.ipv6=c.ipv6);let m={ifindex:o.ifindex??0},f=na(u,d,"ebgp",t,m);f&&(f.as=p,r.push(f))}}function na(e,t,n,r,i={}){let s={...i,name:e.name??"",as:e.bgp?.as,type:n},o=0;for(let a of["ipv4","ipv6"]){if(!(r[a]??[]).includes(n)||!(a in t))continue;o++;let c=t[a];typeof c=="boolean"?s[a]=c:typeof c=="string"&&(s[a]=c.split("/")[0])}return o>0?s:null}function Jl(e,t){let r=t.defaults?.bgp?.advertise_roles??["stub"],i=e.bgp,s=[...e.interfaces??[],...e.loopback?[e.loopback]:[]];for(let o of s){if(o.bgp===!1)continue;let a=o.bgp??{};if("advertise"in a){o.bgp=a;continue}let c=o.role,u=o.type;if(u&&r.includes(u)||c&&r.includes(c)){c!=="stub"?a.advertise=!0:a.advertise=Zl(o,t),o.bgp=a;continue}u==="loopback"&&i.advertise_loopback&&(a.advertise=!0,o.bgp=a)}}function Zl(e,t){for(let n of e.neighbors??[]){let r=t.nodes?.[n.node];if(r&&r.role!=="host")return!1}return!0}function ed(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise.filter(i=>i&&typeof i=="object"):[];Array.isArray(t.advertise)||(t.advertise=n);let r=[...e.loopback?[e.loopback]:[],...e.interfaces??[]];for(let i of r){if(!i.bgp?.advertise)continue;let s={};for(let o of["ipv4","ipv6"])typeof i[o]=="string"&&(s[o]=vo(String(i[o])));Object.keys(s).length&&n.push(s)}n.length?t.advertise=n:delete t.advertise}function td(e){let t=e.bgp,n=Array.isArray(t.advertise)?t.advertise:[];for(let r of["ipv4","ipv6"])t[r]||n.some(i=>r in i)&&(t[r]=!0)}function nd(e){let t=e.bgp,n=t.community;if(!n||typeof n!="object")return;let r=Object.fromEntries(Object.entries(n).map(([i,s])=>[i,Array.isArray(s)?[...s]:s]));for(let[i,s]of Object.entries(Wl))!(i in r)&&s in r&&(r[i]=[...r[s]??[]]);t.community=r}var rd={name:Ho,module_init:Xo,node_pre_transform:Qo,link_pre_transform:Jo,module_post_transform:Zo,node_post_transform:ea},id=rd;var Ar={};te(Ar,{default:()=>ad,module_init:()=>sa,module_pre_transform:()=>oa,name:()=>ra,node_post_transform:()=>aa});var ra="evpn";function ia(e){return e.vlans??{}}function Sr(e){let t=e.defaults?.evpn;return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function sd(e,t){let n=Number(t?.bgp?.as);if(Number.isFinite(n)&&n>0)return n;let r=Number(e.bgp?.as);if(Number.isFinite(r)&&r>0)return r;let i=Number(e.evpn?.as??Sr(e).as);if(Number.isFinite(i)&&i>0)return i}function sa(e,t){e.evpn||(e.evpn={}),e.vxlan||(e.vxlan={}),e.vxlan.flooding="evpn"}function oa(e,t){let n=ia(e),r=e.evpn??{},i=sd(e),s;Array.isArray(r.vlans)&&r.vlans.length?s=r.vlans.map(String):s=Object.entries(n).filter(([,o])=>typeof o?.vni=="number").map(([o])=>o),r.vlans=s;for(let o of s){let a=n[o];if(!a)continue;let c=a.evpn??{};c.evi===void 0&&(c.evi=a.id??0);let u=c.evi;if(i!==void 0){let p=`${i}:${u}`;c.import||(c.import=[p]),c.export||(c.export=[p])}a.evpn=c}e.evpn=r}function aa(e,t,n){if(!(e.module??[]).includes("evpn"))return;let r=t.evpn??{},i=e.evpn??{};if(i.transport===void 0&&(i.transport=r.transport??Sr(t).transport??"vxlan"),!Array.isArray(i.session)||!i.session.length){let m=Sr(t).session;i.session=Array.isArray(r.session)?[...r.session]:Array.isArray(m)?[...m]:["ibgp"]}let s=ia(t),o=(Array.isArray(i.vlans)&&i.vlans.length?i.vlans.map(String):Array.isArray(r.vlans)?r.vlans.map(String):Object.keys(s)).filter(m=>typeof s[m]?.vni=="number");i.vlans=o;let a=String(e.bgp?.router_id??""),c={...e.vlans??{}};for(let m of o){let f=s[m],l=f.evpn??{},_={...c[m]??{},id:f.id,mode:f.mode,vni:f.vni,evpn:{...l}},h=l.evi;a&&h!==void 0&&_.evpn.rd===void 0&&(_.evpn.rd=`${a}:${h}`),c[m]=_}Object.keys(c).length&&(e.vlans=c);let u=new Set(i.session.map(String)),p=e.bgp??{},d=Array.isArray(p.neighbors)?p.neighbors:Array.isArray(p.neighbor)?p.neighbor:[];for(let m of d){let f=String(m.name??""),l=t.nodes?.[f];if(!l||!(l.module??[]).includes("evpn"))continue;let _=String(m.type??"");u.has(_)&&m.evpn===void 0&&(m.evpn="ipv4")}p.neighbors=d,delete p.neighbor,e.bgp=p,e.evpn=i}var od={name:ra,module_init:sa,module_pre_transform:oa,node_post_transform:aa},ad=od;function me(e){let t=e.name;return{...e,requires:bn(t),transform_after:xn(t)}}var Wt=[me(hr),me(gr),me(vr),me(br),me(xr),me(wr),me(Ar)];function zt(e,t="transform_after"){let n=new Map(Wt.map(c=>[c.name,c])),r=[],i=new Set,s=new Set;function o(c){return t==="config_after"?wi(c):n.get(c)?.transform_after??xn(c)}function a(c){if(s.has(c)||i.has(c))return;i.add(c);let u=n.get(c)?.requires??bn(c);for(let p of[...u,...o(c)])e.includes(p)&&a(p);i.delete(c),s.add(c),r.push(c)}for(let c of e)a(c);return r}function rt(e,t="transform_after"){let n=new Set(e.module??[]);for(let r of Object.values(e.nodes??{}))for(let i of r.module??[])n.add(i);return zt([...n],t)}function ca(e){let t=e.defaults??{},n=new Set(Wt.map(r=>r.name));for(let r of rt(e)){if(!n.has(r))continue;let i=t[r]??Ie(r)??{},s=e[r]??{},o=I(xi(i),s);e[r]=o;for(let a of Object.values(e.nodes??{})){if(!(a.module??[]).includes(r))continue;let c=a[r]??{},u=I(e[r],c);Object.keys(u).length!==0&&(a[r]=u)}}}function W(e,t,n){let r=rt(t);for(let i of r){let s=Wt.find(a=>a.name===i);if(!s)continue;let o=s[e];if(typeof o=="function")if(e.startsWith("node_"))for(let a of Object.values(t.nodes??{}))(a.module??[]).includes(i)&&o(a,t,n);else if(e.startsWith("link_"))for(let a of t.links??[])o(a,t,n);else o(t,n)}}function fa(e){for(let t of Object.values(e.nodes??{}))for(let n of t.module??[]){let r=Si(n);if(!r.length)continue;let i=t[n]??{};for(let s of t.interfaces??[]){if(s[n]===!1)continue;let o=s[n]??{};for(let a of r)o[a]===void 0&&i[a]!==void 0&&(o[a]=i[a]);s[n]=o}}}function ua(e,t){let n=new Set(Wt.map(r=>r.name));for(let r of Object.values(e.nodes??{}))for(let i of r.module??[])n.has(i)||t.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${i} used by node ${r.name}`,path:`nodes.${r.name}.module`});for(let r of e.module??[])n.has(r)||t.error({code:"VALUE",category:"VALUE",module:"modules",message:`Unknown module ${r}`,path:"module"})}function pa(e,t){e.provider||(e.provider="clab"),e.provider!=="clab"&&t.diagnostics.error({code:"VALUE",category:"VALUE",module:"provider",message:`Unsupported provider '${e.provider}' (only clab is supported)`,path:"provider"})}function la(e,t){e.provider||(e.provider="clab")}function da(e){for(let t of Object.values(e.nodes??{}))t.device==="bird"&&fd(t)}function cd(e){return`(rt,${e.split(":").join(",")})`}function fd(e){let t=e.vrfs;if(t)for(let n of Object.values(t))for(let r of["import","export"]){let i=n[r];Array.isArray(i)&&(n[`netlab-internal:_bird_${r}`]=i.map(s=>typeof s=="string"?cd(s):s))}}function ma(e,t={}){let n=new Be,r=Ut(),i={diagnostics:n,devices:r};Ue(e),pa(e,i),ur(e),e.nodes=et(e.nodes,n),pr(e),mr(e),tt(e,n),lr(e),bo(e,n),_r(e,i);for(let s of Object.values(e.nodes))s.loopback===!0&&(s.loopback={});for(let s of e.links??[]){if(typeof s.prefix!="string")continue;let o=s.prefix,a=e.prefix,c=a&&typeof a=="object"&&!Array.isArray(a)?a[o]:void 0;c&&typeof c=="object"&&!Array.isArray(c)?s.prefix=structuredClone(c):n.error({module:"links",code:"VALUE",category:"VALUE",message:`Unknown named prefix ${o}`})}if(Array.isArray(e.module)&&e.module.length>0)for(let s of Object.values(e.nodes))"module"in s||s.role==="host"&&!s["netlab-internal:_daemon"]||(s.module=[...e.module]);ca(e),dr(e),ua(e,n),W("module_init",e,i),tr(e),t.afterSetup?.(e,i),W("module_pre_transform",e,i),W("node_pre_transform",e,i),ar(e),W("link_pre_transform",e,i),cr(e),W("module_post_link_transform",e,i),W("link_post_transform",e,i),W("module_post_transform",e,i),fa(e),W("node_post_transform",e,i),t.afterAddressed?.(e,i),da(e),la(e,i),e.module=rt(e,"config_after");for(let s of Object.values(e.nodes??{}))Array.isArray(s.module)&&s.module.length>0&&(s.module=zt(s.module,"config_after"));return t.afterTransformed?.(e,i),{topology:e,diagnostics:n,ctx:i}}function ha(e,t={}){let n={},r=t.validate!==!1,i=(a,c,u)=>{if(!r)return;let p=Jn(a,c,{yangDir:t.yangDir,diagnostics:u});n[c]=p.ok,t.snapshots?.set(c,structuredClone(a))},{topology:s,diagnostics:o}=ma(e,{afterSetup:(a,c)=>{let u=c.diagnostics;i(a,"user_input",u)}});return{topology:s,diagnostics:o,stages:n}}function Ir(e,t={}){let n=ha(e,{...t,cleanup:!1});return Yt(n.topology),n}function Er(e){let t=Zn(e),n=Object.entries(t.nodes??{}).map(([i,s])=>({...s,name:i}));return{topology:{...t,nodes:n,links:t.links??[]}}}try{let e=process.env.GITHUB_WORKSPACE||process.cwd(),t=process.env.NETLAB_INPUT,n=process.env.NETLAB_OUTPUT||"topology.json";if(!t)throw new Error("The input topology path is required");let r=_a(e,t),i=_a(e,n);if(/[\r\n]/.test(i))throw new Error("Output path cannot contain a newline");if(r===i)throw new Error("Input and output paths must be different");let s=md(new URL("../yang/",import.meta.url)),o=Ir(En(r),{validate:!0,yangDir:s});for(let c of o.diagnostics.list())console.error(`${c.severity}: ${c.message}`);if(o.diagnostics.hasErrors()||o.stages.user_input!==!0)throw new Error("Topology validation or transformation failed");let a=JSON.stringify(Er(o.topology),null,2);pd(dd(i),{recursive:!0}),ld(i,`${a}
`),process.env.GITHUB_OUTPUT&&ud(process.env.GITHUB_OUTPUT,`path=${i}
`),console.log(`Wrote ${i}`)}catch(e){console.error(`Error: ${e instanceof Error?e.message:String(e)}`),process.exitCode=1}
/*! For license information please see normalize-topology.mjs.LEGAL.txt */
