var CsvReader=function(e){var t={};function s(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,s),r.l=!0,r.exports}return s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},s.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=2)}([function(e,t){(function(){var t,s,i;i=[],t={},e.exports=s=function(e,s,r){var n,o,a,h,l,c,u,d;if(null==r&&(r=!0),"string"==typeof s){if(2!==s.length)throw{name:"ArgumentException",message:"The format for string options is '<thousands><decimal>' (exactly two characters)"};d=s[0],n=s[1]}else if(Array.isArray(s)){if(2!==s.length)throw{name:"ArgumentException",message:"The format for array options is ['<thousands>','[<decimal>'] (exactly two elements)"};d=s[0],n=s[1]}else d=(null!=s?s.thousands:void 0)||(null!=s?s.group:void 0)||t.thousands,n=(null!=s?s.decimal:void 0)||t.decimal;return null==(l=i[c=""+d+n+r])&&(a=r?3:1,l=i[c]=new RegExp("^\\s*([+-]?(?:(?:\\d{1,3}(?:\\"+d+"\\d{"+a+",3})+)|\\d*))(?:\\"+n+"(\\d*))?\\s*$")),null==(u=e.match(l))||3!==u.length?NaN:(h=u[1].replace(new RegExp("\\"+d,"g"),""),o=u[2],parseFloat(h+"."+o))},e.exports.setOptions=function(e){var s,i;for(s in e)i=e[s],t[s]=i},e.exports.factoryReset=function(){t={thousands:",",decimal:"."}},e.exports.withOptions=function(e,t){return null==t&&(t=!0),function(i){return s(i,e,t)}},e.exports.factoryReset()}).call(this)},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(0),r={},n="https://docs.google.com/spreadsheets/";t.getReaderObject=(()=>({MISSED_INDICATOR_NAME:"indicator",_name:"csv",init(e){if(this._lastModified=e.lastModified||"",this._basepath=e.path,this.delimiter=e.delimiter,this.keySize=e.keySize||1,this.hasNameColumn=e.hasNameColumn||!1,this.nameColumnIndex=e.nameColumnIndex||0,this.assetsPath=e.assetsPath||"",this.additionalTextReader=e.additionalTextReader,this.additionalJsonReader=e.additionalJsonReader,this.isTimeInColumns=e.timeInColumns||!1,this.timeKey="time",this._basepath.includes(n)&&!this._basepath.includes("tqx=out:csv")){const e=this._basepath.split(n)[1].split("/"),t=e[e.indexOf("d")+1];this._basepath=n+"d/"+t+"/gviz/tq?tqx=out:csv"}this._parseStrategies=[...[",.",".,"].map(e=>this._createParseStrategy(e)),e=>e],Object.assign(this.ERRORS||{},{WRONG_TIME_COLUMN_OR_UNITS:"reader/error/wrongTimeUnitsOrColumn",NOT_ENOUGH_ROWS_IN_FILE:"reader/error/notEnoughRows",UNDEFINED_DELIMITER:"reader/error/undefinedDelimiter",EMPTY_HEADERS:"reader/error/emptyHeaders",DIFFERENT_SEPARATORS:"reader/error/differentSeparators",FILE_NOT_FOUND:"reader/error/fileNotFoundOrPermissionsOrEmpty",REPEATED_KEYS:"reader/error/repeatedKeys"})},ensureDataIsCorrect({columns:e,rows:t},s){const i=e[this.keySize],[r]=t,n=s[i],o=r[i].trim();if(n&&!n(o))throw this.error(this.ERRORS.WRONG_TIME_COLUMN_OR_UNITS,void 0,o);if(!e.filter(Boolean).length)throw this.error(this.ERRORS.EMPTY_HEADERS)},getDatasetInfo(){return{name:this._basepath.split("/").pop()}},getCached:()=>r,async load(e){const t=this._name+this._basepath+this._lastModified,s=r[t];return s||(r[t]=new Promise((t,s)=>{let i=Vizabi.utils.d3text;this.additionalTextReader&&(i=this.additionalTextReader),i(this._basepath,(i,r)=>{if(i)return i.name=this.ERRORS.FILE_NOT_FOUND,i.message=`No permissions, missing or empty file: ${this._basepath}`,i.endpoint=this._basepath,s(i);try{const{delimiter:i=this._guessDelimiter(r)}=this,n=d3.dsvFormat(i).parse(r,e=>Object.keys(e).every(t=>!e[t])?null:e),{columns:o}=n;this.hasNameColumn&&o.splice(this.keySize+1,0,o.splice(this.nameColumnIndex,1)[0]);const a=(this.isTimeInColumns?this.timeInColumns.bind(this):e=>e)({columns:o,rows:n},e);t(a)}catch(e){return s(e)}})}))},timeInColumns({columns:e,rows:t},s){const i=this.keySize;let r=null;this.hasNameColumn&&(r=e.splice(i+1,1)[0]||"name");const n=s&&s[this.timeKey]&&!!s[this.timeKey](e[i]);n&&Vizabi.utils.warn("Indicator column is missed.");const o=n?this.MISSED_INDICATOR_NAME:e[i],a=e.slice(0,i).concat(this.timeKey).concat(r||[]).concat(n?Vizabi.utils.capitalize(this.MISSED_INDICATOR_NAME):t.reduce((e,t)=>{const s=t[o];return!e.includes(s)&&s&&e.push(s),e},[])),h=a.slice(i+1+(r?1:0)),[l]=a;return{columns:a,rows:t.reduce((e,t)=>{const s=t[l],i=e.filter(e=>e[l]===s);if(i.length){if(null!==i[0][t[o]])throw this.error(this.ERRORS.REPEATED_KEYS,null,{indicator:t[o],key:t[l]});i.forEach(e=>{e[t[o]]=t[e[this.timeKey]]})}else Object.keys(t).forEach(s=>{if(![l,o,r].includes(s)){const i={[l]:t[l],[this.timeKey]:s},a=r?{[r]:t[r]}:{},c=h.reduce((e,i)=>(e[i]=n||t[o]===i?t[s]:null,e),{});e.push(Object.assign(i,a,c))}});return e},[])}},async getAsset(e,t={}){const s=this.assetsPath+e;let i=Vizabi.utils.d3json;return this.additionalJsonReader&&(i=this.additionalJsonReader),new Promise((e,t)=>{i(s,(i,r)=>{if(i)return i.name=this.ERRORS.FILE_NOT_FOUND,i.message=`No permissions, missing or empty file: ${s}`,i.endpoint=s,t(i);e(r)})})},_guessDelimiter(e){const t=this._getRows(e.replace(/"[^\r]*?"/g,""),2);if(2!==t.length)throw this.error(this.ERRORS.NOT_ENOUGH_ROWS_IN_FILE);const[s,i]=t,[r,n]=[",",";"],o=this._countCharsInLine(s,r),a=this._countCharsInLine(s,n),h=this._countCharsInLine(i,r),l=this._countCharsInLine(i,n);if(this._checkDelimiters(o,h,a,l))return r;if(this._checkDelimiters(a,l,o,h))return n;throw this.error(this.ERRORS.UNDEFINED_DELIMITER)},_checkDelimiters:(e,t,s,i)=>e===t&&e>1&&(s!==i||!s&&!i||e>s&&t>i),_getRows(e,t=0){const s=/([^\r\n]+)/g,i=[];let r,n=0;do{(r=s.exec(e))&&r.length>1&&(++n,i.push(r[1]))}while(r&&n!==t);return i},_countCharsInLine(e,t){const s=new RegExp(t,"g"),i=e.match(s);return i?i.length:0},_createParseStrategy(e){return t=>{if(!new RegExp(`[^-\\d${e}]`).test(t)&&t){const s=i(t,e);return isFinite(s)&&!isNaN(s)||(this._isParseSuccessful=!1),s}return t}},_mapRows(e,t,s){const i=this._getRowMapper(t,s);this._failedParseStrategies=0;for(const t of this._parseStrategies){this._parse=t,this._isParseSuccessful=!0;const s=[];for(const t of e){const e=i(t);if(!this._isParseSuccessful){this._failedParseStrategies++;break}s.push(e)}if(this._isParseSuccessful){if(this._failedParseStrategies===this._parseStrategies.length-1)throw this.error(this.ERRORS.DIFFERENT_SEPARATORS);return s}}},_onLoadError(e){delete r[this._basepath+this._lastModified],this._super(e)}}))},function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=s(1);t.csvReaderObject=i.getReaderObject()}]);
//# sourceMappingURL=vizabi-csv-reader.js.map