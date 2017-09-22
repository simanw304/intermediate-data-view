!function(t,e){
	"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("d3-selection"),require("d3-transition"),require("d3-zoom"),require("d3-interpolate"),require("viz.js")):"function"==typeof define&&define.amd?define(["exports","d3-selection","d3-transition","d3-zoom","d3-interpolate","viz.js"],e):e(t.d3=t.d3||{},t.d3,t.d3,t.d3,t.d3,t.Viz)}(this,function(t,e,n,i,r,o){"use strict";function a(){var t=this._selection,n=e.select(t.node().querySelector("svg"));if(0==n.size())return this;this._zoomSelection=n;var r=[.1,10],o=i.zoom().scaleExtent(r).on("zoom",function(){a.attr("transform",e.event.transform)});this._zoomBehavior=o;var a=e.select(n.node().querySelector("g"));return n.call(o),this._active||h.call(this,a),this}function s(t){var e=t.node().transform;if(e&&0!=e.baseVal.length){var n=e.baseVal.consolidate().matrix;return{x:n.e,y:n.f}}return{x:0,y:0}}function l(t){var e=this._translation,n=t.datum().translation,r=n.x-e.x,o=n.y-e.y;return i.zoomTransform(this._zoomSelection.node()).translate(r,o)}function h(t){this._zoomBehavior.transform(this._zoomSelection,l.call(this,t)),this._translation=t.datum().translation}function u(t){var e={},n=t.node().nodeName;e.tag=n,e.attributes={};var i=t.node().attributes;if(i)for(var r=0;r<i.length;r++){var o=i[r],a=o.name,l=o.value;e.attributes[a]=l}if(t.node().transform){var h=s(t);0==h.x&&0==h.y||(e.translation=h)}if("polygon"==n&&e.attributes.points){var u=t.attr("points").split(" "),c=u.map(function(t){return t.split(",")[0]}),d=u.map(function(t){return t.split(",")[1]}),f=Math.min.apply(null,c),v=Math.max.apply(null,c),p=Math.min.apply(null,d),m={x:f,y:p,width:v-f,height:Math.max.apply(null,d)-p};e.bbox=m}return"#text"==n?e.text=t.text():"#comment"==n&&(e.comment=t.text()),e}function c(t){return"#text"==t.tag?document.createTextNode(""):"#comment"==t.tag?document.createComment(t.comment):document.createElementNS("http://www.w3.org/2000/svg",t.tag)}function d(t){var n=c(t),i=e.select(n),r=t.attributes;if(r)for(var o of Object.keys(r)){var a=r[o];i.attr(o,a)}return n}function f(t,n){var i=e.select(t.node().parentNode),r=d(n),o=i.insert(function(){return r},function(){return t.node()});return t.remove(),o}function v(t){return Object.assign({},t)}function p(t,e){return function(){var n=t.map(function(t){return r.interpolate([t[0][0],t[0][1]],[t[1][0],t[1][1]])});return function(t){return t<1?"M"+n.map(function(e){return e(t)}).join("L"):e}}}function m(t,e,n){var i=t,r=i.cloneNode();if(t.getTotalLength)var o=i.getTotalLength(),a=(r.setAttribute("d",e),r).getTotalLength();else var o=100,a=50;for(var s=[0],l=0,h=n/Math.max(o,a);(l+=h)<1;)s.push(l);return s.push(1),s.map(function(e){if(t.getPointAtLength)var n=i.getPointAtLength(e*o),s=r.getPointAtLength(e*a);else var n={x:e*o,y:e*o},s={x:e*a,y:e*a};return[[n.x,n.y],[s.x,s.y]]})}function y(t,e){if("polygon"==t.tag){(N=v(t)).tag="path";u=v(h=t.attributes);if(null!=h.points){var n=h.points;if("polygon"==e.tag){(m=t.bbox).cx=m.x+m.width/2,m.cy=m.y+m.height/2;for(var i=h.points.split(" "),r=i.map(function(t){var e=t.split(",");return[e[0]-m.cx,e[1]-m.cy]}),o=r[r.length-1][0],a=r[r.length-1][1],s=0;s<r.length;s++,o=k,a=P){x=(k=r[s][0])-o;if(0!=(b=(P=r[s][1])-a)&&(0<=(S=o-a*x/b)&&S<1/0&&(o<=S&&S<=k||k<=S&&S<=o)))break}var l=[[m.cx+S,m.cy+0].join(",")];n=(l=(l=l.concat(i.slice(s))).concat(i.slice(0,s))).join(" ")}u.d="M"+n+"z",delete u.points}N.attributes=u}else if("ellipse"==t.tag){(N=v(t)).tag="path";var h=t.attributes,u=v(h);if(null!=h.cx){var c=h.cx,d=h.cy,f=h.rx,p=h.ry,m=e.bbox;m.cx=m.x+m.width/2,m.cy=m.y+m.height/2;var y=e.attributes.points.split(" ")[0].split(","),g=y[0],_=y[1],x=g-m.cx,b=_-m.cy,w=Math.sqrt(Math.pow(x,2)+Math.pow(b,2)),z=x/w,M=-b/w,k=f*z,P=-p*M,S=f*-z,x=S-k,b=-p*-M-P;u.d="M "+c+" "+d+" m "+k+","+P+" a "+f+","+p+" 0 1,0 "+x+","+b+" a "+f+","+p+" 0 1,0 "+-x+","+-b+"z",delete u.cx,delete u.cy,delete u.rx,delete u.ry}N.attributes=u}else var N=t;return N}function g(t){this._selection=t,this._active=!1,this._jobs=[],this._keyModes=new Set(["title","id","tag-index","index"]),this._engine="dot",this._totalMemory=void 0,this._keyMode="title",this._fade=!0,this._tweenPaths=!0,this._tweenShapes=!0,this._convertEqualSidedPolygons=!0,this._tweenPrecision=1,this._translation={x:0,y:0},this._zoom=!0}function _(t){return new g(t)}g.prototype=_.prototype={constructor:g,engine:function(t){if(t!=this._engine&&null!=this._data)throw Error("Too late to change engine");return this._engine=t,this},totalMemory:function(t){return this._totalMemory=t,this},keyMode:function(t){if(!this._keyModes.has(t))throw Error("Illegal keyMode: "+t);if(t!=this._keyMode&&null!=this._data)throw Error("Too late to change keyMode");return this._keyMode=t,this},fade:function(t){return this._fade=t,this},tweenPaths:function(t){return this._tweenPaths=t,this},tweenShapes:function(t){return this._tweenShapes=t,t&&(this._tweenPaths=!0),this},convertEqualSidedPolygons:function(t){return this._convertEqualSidedPolygons=t,this},tweenPrecision:function(t){return this._tweenPrecision=t,this},zoom:function(t){return this._zoom=t,this._zoom&&!this._zoomBehavior&&a.call(this),this},render:function(){function t(a){var m=a.selectAll(function(){return a.node().childNodes}),y=(m=m.data(function(t){return t.children},function(t){return t.key})).enter().append(function(t){var e=c(t);return"#text"==t.tag&&i&&(e.nodeValue=t.text),e});i&&y.filter(function(t){return"#"==t.tag[0]?null:this}).each(function(t){var n=e.select(this);for(var i of Object.keys(t.attributes)){var r=t.attributes[i];n.attr(i,r)}}).style("opacity",0);var g=m.exit();d&&g.each(d),n&&(g=g.transition(n),i&&g.filter(function(t){return"#"==t.tag[0]?null:this}).style("opacity",0)),g=g.remove(),m=y.merge(m),d&&m.each(d),m.each(function(a){var c=e.select(this),d=a.tag,m=a.attributes,y=!1;if(o&&n&&a.alternativeOld){if("polygon"==this.nodeName||"ellipse"==this.nodeName){y=!0;var g=u(c);if("polygon"==this.nodeName&&"polygon"==d){var _=g.attributes.points;if(null==_)y=!1;else if(!s){var x=_.split(" ").length;(N=a.attributes.points).split(" ").length==x&&(y=!1)}}else"ellipse"==this.nodeName&&"ellipse"==d&&(y=!1)}if(y){var b=a.alternativeOld,w=f(c,b);w.data([a],function(){return a.key});var z=a.alternativeNew;c=w,d="path",m=z.attributes}}var M=c;n&&(M=M.transition(n),i&&M.filter(function(t){return"#"==t.tag[0]?null:this}).style("opacity",1));var k=r&&n&&"path"==d&&null!=c.attr("d");for(var P of Object.keys(m)){var S=m[P];if(k&&"d"==P){var N=(a.alternativeOld||a).points;N&&M.attrTween("d",p(N,S))}else"transform"==P&&a.translation&&M.on("start",function(){v._zoomBehavior&&M.attr(P,l.call(v,c).toString())}).on("end",function(){v._zoomBehavior&&h.call(v,c)}),M.attr(P,S)}y&&M.on("end",function(t,n,i){this.nodeName!=t.tag&&f(w=e.select(this),t).data([t],function(){return t.key})}),a.text&&M.text(a.text),t(c)})}var n=this._transition,i=this._fade&&null!=n,r=this._tweenPaths,o=this._tweenShapes,s=this._convertEqualSidedPolygons,d=(this._tweenPrecision,this._attributer),v=this,m=this._selection;if(null!=n){var y=this._jobs;if(v._active)return y.push(null),this;m.transition(n).transition().duration(0).on("end",function(){v._active=!1,0!=y.length&&(y.shift(),v.render())}),this._active=!0}var g=this._data;return m.datum({children:[g]}),t(m),this._zoom&&!this._zoomBehavior&&a.call(this),this},dot:function(t){function n(t,i=0,r){var o=u(t);o.parent=r,o.children=[];var v=o.tag;"#text"==v?o.text=t.text():"#comment"==v&&(o.comment=t.text());var p=e.selectAll(t.node().childNodes);"index"==a?o.key=i:"#"!=v[0]&&("id"==a?o.key=t.attr("id"):"title"==a&&(t.select("title"),t.select("title").empty()||(o.key=t.select("title").text()))),null==o.key&&(l&&("ellipse"!=v&&"polygon"!=v||(v="path")),o.key=v+"-"+i);var g=(r?r.id+".":"")+o.key;o.id=g,c[g]=o;var _=f[g];if(l&&g in f&&("polygon"!=_.tag&&"ellipse"!=_.tag||_.tag==o.tag&&"polygon"!=o.tag||(o.alternativeOld=y(_,o),o.alternativeNew=y(o,_))),s&&_&&("path"==_.tag||o.alternativeOld&&"path"==o.alternativeOld.tag)){var x=(o.alternativeNew||o).attributes.d;if(o.alternativeOld)b=d(o.alternativeOld);else var b=d(_);(o.alternativeOld||(o.alternativeOld={})).points=m(b,x,h)}var w={};return p.each(function(){if(null!==this){var t=this.nodeName;"ellipse"!=t&&"polygon"!=t||(t="path"),null==w[t]&&(w[t]=0);var i=w[t]++,r=n(e.select(this),i,o);r&&o.children.push(r)}}),o}var i=this._engine,r=this._totalMemory,a=this._keyMode,s=this._tweenPaths,l=this._tweenShapes,h=this._tweenPrecision,c={},f=this._dictionary||{},v=o(t,{format:"svg",engine:i,totalMemory:r}),p=e.select(document.createDocumentFragment()).append("div");p.html(v);var g=n(p.select("svg"));return this._data=g,this._dictionary=c,this},renderDot:function(t){return this.dot(t).render(),this},transition:function(t){return this._transition=n.transition(t),this},attributer:function(t){return this._attributer=t,this}},e.selection.prototype.graphviz=function(){return new g(this)},t.graphviz=_,Object.defineProperty(t,"__esModule",{value:!0})});