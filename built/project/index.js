//     jquery-prefixed-data
//     (c) simonfan
//     jquery-prefixed-data is licensed under the MIT terms.

define(["require","exports","module","jquery","lodash"],function(e,t,n){function s(e){return new RegExp("^"+e+"([A-Z$_].*$)")}function o(e){return e.charAt(0).toLowerCase()+e.slice(1)}function u(e){return e.charAt(0).toUpperCase()+e.slice(1)}function a(e,t){var n=s(t);return i.transform(e,function(e,t,r){var i=r.match(n);if(i){var s=o(i[1]);e[s]=t}})}var r=e("jquery"),i=e("lodash");/^prefix([A-Z$_].*$|$)/;var f=n.exports=function(t,n){var r=t.data();if(i.isArray(n)){var s={};return i.each(n,function(e){var t=a(r,n);i.size(t)>0&&(s[namespace]=t)}),s}return n&&i.isString(n)?a(r,n):r};r.prototype.prefixedData=function(t){return f(this,t)}});