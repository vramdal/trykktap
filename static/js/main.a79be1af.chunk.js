(this.webpackJsonptrykktap=this.webpackJsonptrykktap||[]).push([[0],[,function(e,a,l){e.exports={app:"App_app__2ziFi",horizontal:"App_horizontal__3Hnzd",radiolabel:"App_radiolabel__38C3M",radioGroup:"App_radioGroup__3sXMK",smallText:"App_smallText__2bVas"}},,,,,function(e,a,l){e.exports=l(12)},,,,,function(e,a,l){},function(e,a,l){"use strict";l.r(a);var t=l(0),n=l.n(t),r=l(3),s=l.n(r),m=(l(11),l(5)),o=l(1),c=l.n(o),i=l(4),u=[[250,.25,void 0],[500,1,.1],[1e3,4,.5],[1500,void 0,1],[2e3,void 0,2]];console.log("App.tsx","Global");var p=function(){console.log("App.tsx","App");var e,a=Object(i.a)({destinasjonTrykk:1,avstand:1,hoydeforskjell:0,diameter:"4",vannmengde:"250",pumpetype:"10 bar"}),l=Object(m.a)(a,2),t=l[0],r=l[1],s=r.select,o=r.range,p=void 0,E=u.find((function(e){return e[0]+""===t.values.vannmengde}));E&&(p="2.5"===t.values.diameter?E[1]:E[2]),p&&(e=p*parseFloat(t.values.avstand)/100);var d=Math.ceil(t.values.avstand/25),b=t.values.hoydeforskjell/10,v=parseFloat(t.values.destinasjonTrykk)+e+b;return n.a.createElement("div",{className:c.a.app},n.a.createElement("main",null,n.a.createElement("article",null,n.a.createElement("h1",null,"Destinasjon"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement("label",null,"\xd8nsket vannmengde",n.a.createElement("br",null),n.a.createElement("span",{className:c.a.smallText},"Vannvegg: 800 l/min, str\xe5ler\xf8r: 500 l/min"),n.a.createElement("select",s("vannmengde"),n.a.createElement("option",{value:250},"250 l/min"),n.a.createElement("option",{value:500},"500 l/min"),n.a.createElement("option",{value:1e3},"1000 l/min"),n.a.createElement("option",{value:1500},"1500 l/min"),n.a.createElement("option",{value:2e3},"2000 l/min"))),n.a.createElement("label",null,"\xd8nsket trykk",n.a.createElement("br",null),n.a.createElement("input",Object.assign({},o("destinasjonTrykk"),{max:10,min:1})),t.values.destinasjonTrykk," bar")),n.a.createElement("h1",null,"Utlegg"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement("label",null,"Avstand i m",n.a.createElement("br",null),n.a.createElement("input",Object.assign({},o("avstand"),{min:0,max:1e3,step:100})),t.values.avstand," m"),n.a.createElement("label",null,"H\xf8ydeforskjell i meter",n.a.createElement("br",null),n.a.createElement("input",Object.assign({},o("hoydeforskjell"),{min:-100,max:200,step:1})),t.values.hoydeforskjell," m"),n.a.createElement("div",{className:"radioGroup"},"Slange",n.a.createElement("br",null),n.a.createElement("select",s("diameter"),n.a.createElement("option",{value:"2.5"},'2\xbd"'),n.a.createElement("option",{value:"4"},'4"')))),n.a.createElement("h1",null,"Resultat"),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement("label",null,"Str\xf8mmingstap:",n.a.createElement("br",null),n.a.createElement("span",{className:c.a.radiolabel},e," bar")),n.a.createElement("label",null,"H\xf8ydetap:",n.a.createElement("br",null),n.a.createElement("span",{className:c.a.radiolabel},b," bar"))),n.a.createElement("section",{className:c.a.horizontal},n.a.createElement("label",null,"N\xf8dvendig utgangstrykk",n.a.createElement("br",null),n.a.createElement("span",{className:c.a.radiolabel},v.toFixed(1)," bar")),n.a.createElement("label",null,"Antall slanger:",n.a.createElement("br",null),n.a.createElement("span",{className:c.a.radiolabel},d))))))},E=function(){return n.a.createElement(p,null)};console.log("index.tsx","Global"),s.a.render(n.a.createElement(E,null),document.getElementById("root"))}],[[6,1,2]]]);
//# sourceMappingURL=main.a79be1af.chunk.js.map