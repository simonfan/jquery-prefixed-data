//     jquery-prefixed-data
//     (c) simonfan
//     jquery-prefixed-data is licensed under the MIT terms.

define("jquery-prefixed-data",["require","exports","module","jquery","lodash"],function(r,e,n){function t(r){return new RegExp("^"+r+"([A-Z$_].*$)")}function a(r){return r.charAt(0).toLowerCase()+r.slice(1)}function i(r,e){var n=t(e);return o.transform(r,function(r,e,t){var i=t.match(n);if(i){var u=a(i[1]);r[u]=e}})}var u=r("jquery"),o=r("lodash"),f=n.exports=function(r,e){var n=r.data();if(o.isArray(e)){var t={};return o.each(e,function(){var r=i(n,e);o.size(r)>0&&(t[namespace]=r)}),t}return e&&o.isString(e)?i(n,e):n};u.prototype.prefixedData=function(r){return f(this,r)}});