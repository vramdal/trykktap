(this.webpackJsonptrykktap=this.webpackJsonptrykktap||[]).push([[0],{1:function(e,a,t){e.exports={app:"App_app__2ziFi",horizontal:"App_horizontal__3Hnzd",radiolabel:"App_radiolabel__38C3M",valueWithUnit:"App_valueWithUnit__3iKP7",radioGroup:"App_radioGroup__3sXMK",smallText:"App_smallText__2bVas",labelledField:"App_labelledField__1TUYg"}},152:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(49),i=t.n(r),s=(t(58),t(52)),m=t(1),c=t.n(m),o=(t(59),t(60),t(50)),u=t.n(o),d=t(51),p=[[250,.25,void 0],[500,1,.1],[1e3,4,.5],[1500,void 0,1],[2e3,void 0,2]],v=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:c.a.labelledField},n.a.createElement("label",{htmlFor:e.id},e.label),n.a.createElement("br",null),e.children))},E=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:c.a.labelledField},n.a.createElement("dt",null,e.label),n.a.createElement("dd",null,e.children)))},b=function(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:e.className},n.a.createElement("label",{htmlFor:e.id},e.label),n.a.createElement("br",null),e.children))};function g(e){return n.a.createElement(n.a.Fragment,null,n.a.createElement("input",u()(e,"displayValue","unit")),n.a.createElement(k,{value:e.displayValue,unit:e.unit,stringifier:function(e){return e}}))}var k=function(e){var a=e.unit,t=e.className,l=void 0===t?"":t,r=e.value,i=e.stringifier,s=void 0===i?function(e){return e.toFixed(0)}:i;return n.a.createElement("div",{className:c.a.valueWithUnit+" "+l},isNaN(r)||void 0===r||null===r?"Ikke definert":n.a.createElement(n.a.Fragment,null,n.a.createElement("span",{className:c.a.valueWithUnit+"__value"},s(r)),n.a.createElement("span",{className:c.a.valueWithUnit+"__unit"},a)))},f=function(){var e,a=Object(d.a)({destinasjonTrykk:5,avstand:1,hoydeforskjell:0,diameter:"4",vannmengde:"250",pumpetype:"10 bar"}),t=Object(s.a)(a,2),l=t[0],r=t[1],i=r.select,m=r.range,o=void 0,u=p.find((function(e){return e[0]+""===l.values.vannmengde}));u&&(o="2.5"===l.values.diameter?u[1]:u[2]),e=o?o*parseFloat(l.values.avstand)/100:void 0;var f=Math.ceil(l.values.avstand/25),h=l.values.hoydeforskjell/10,y=parseFloat(l.values.destinasjonTrykk)+e+h;return n.a.createElement("div",{className:c.a.app},n.a.createElement("main",null,n.a.createElement("article",null,n.a.createElement(n.a.Fragment,null,n.a.createElement("h1",null,"Destinasjon"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement(v,{label:"\xd8nsket vannmengde",id:"vannmengde"},n.a.createElement("span",{className:c.a.smallText},"Vannvegg: 800 l/min, str\xe5ler\xf8r: 500 l/min"),n.a.createElement("select",Object.assign({},i("vannmengde"),{id:"vannmengde"}),n.a.createElement("option",{value:250},"250 l/min"),n.a.createElement("option",{value:500},"500 l/min"),n.a.createElement("option",{value:1e3},"1000 l/min"),n.a.createElement("option",{value:1500},"1500 l/min"),n.a.createElement("option",{value:2e3},"2000 l/min"))),n.a.createElement(v,{label:"\xd8nsket trykk",id:"destinasjonTrykk"},n.a.createElement(g,Object.assign({},m("destinasjonTrykk"),{max:10,min:1,step:1,unit:"bar",displayValue:l.values.destinasjonTrykk,id:"destinasjonTrykk"}))))),n.a.createElement("h1",null,"Utlegg"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement(v,{label:"Avstand i m",id:"avstand"},n.a.createElement(g,Object.assign({},m("avstand"),{unit:"m",displayValue:l.values.avstand,min:0,max:1e3,step:100,id:"avstand"}))),n.a.createElement(v,{label:"H\xf8ydeforskjell i meter",id:"hoydeforskjell"},n.a.createElement(g,Object.assign({},m("hoydeforskjell"),{unit:"m",displayValue:l.values.hoydeforskjell,min:-100,max:200,step:1,id:"hoydeforskjell"}))),n.a.createElement(b,{className:"radioGroup",label:"Slange",id:"diameter"},n.a.createElement("select",Object.assign({},i("diameter"),{id:"diameter"}),n.a.createElement("option",{value:"2.5"},'2\xbd"'),n.a.createElement("option",{value:"4"},'4"')))),n.a.createElement("h1",null,"Resultat"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement(E,{label:"Str\xf8mmingstap"},n.a.createElement(k,{value:e,unit:"bar",stringifier:function(e){return e}})),n.a.createElement(E,{label:"H\xf8ydetap"},n.a.createElement("span",{className:c.a.radiolabel},h," bar"))),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement(E,{label:"N\xf8dvendig utgangstrykk"},n.a.createElement(k,{value:y,unit:"bar",stringifier:function(e){return e.toFixed(2)}})),n.a.createElement(E,{label:"Antall slanger"},n.a.createElement("span",{className:c.a.radiolabel},f))))))},h=function(){return n.a.createElement(f,null)};console.log("index.tsx","Global"),i.a.render(n.a.createElement(h,null),document.getElementById("root"))},53:function(e,a,t){e.exports=t(152)},58:function(e,a,t){},59:function(e,a,t){},60:function(e,a,t){}},[[53,1,2]]]);
//# sourceMappingURL=main.884aed5a.chunk.js.map