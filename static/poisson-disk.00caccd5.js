import{s as $}from"./transform.be1fedcc.js";import{r as d}from"./index.499fac84.js";import{j as e}from"./jsx-runtime.b792ae09.js";import"./_commonjsHelpers.de833af9.js";const J=h=>+h,V=()=>{const h=d.useRef(null);let[q,A]=d.useState();const[f,D]=d.useState(900),[M,z]=d.useState(150);function*B(n,t,a){const y=a*a,Q=3*y,u=a*Math.SQRT1_2,g=Math.ceil(n/u),C=Math.ceil(t/u),E=new Array(g*C),c=[];yield F(n/2+Math.random()*a,t/2+Math.random()*a,null);t:for(;c.length;){const s=Math.random()*c.length|0,l=c[s];for(let o=0;o<30;++o){const m=2*Math.PI*Math.random(),b=Math.sqrt(Math.random()*Q+y),p=l[0]+b*Math.cos(m),x=l[1]+b*Math.sin(m);if(0<=p&&p<n&&0<=x&&x<t&&T(p,x)){yield F(p,x,l);continue t}}const i=c.pop();s<c.length&&(c[s]=i)}function T(s,l){const i=s/u|0,o=l/u|0,m=Math.max(i-2,0),b=Math.max(o-2,0),p=Math.min(i+3,g),x=Math.min(o+3,C);for(let k=b;k<x;++k){const G=k*g;for(let w=m;w<p;++w){const S=E[G+w];if(S){const H=S[0]-s,W=S[1]-l;if(H*H+W*W<y)return!1}}}return!0}function F(s,l,i){const o=E[g*(l/u|0)+(s/u|0)]=[s,l];return o.parent=i,o.depth=i?i.depth+1:0,c.push(o),o}}const N=()=>{const n=Math.floor(Math.random()*360),t=Math.floor(Math.random()*30)+70,a=Math.floor(Math.random()*70);return`hsl(${n}, ${t}%, ${a}%)`},I=function*(){let t=$(h.current);A($(h.current)),console.log(t),t.attr("viewBox",[0,0,f,M]).attr("stroke","currentColor"),yield t.node();let a=0;for(const r of B(f,M,8))r.parent&&(t.append("line").attr("x1",r.parent[0]).attr("y1",r.parent[1]).attr("x2",r.parent[0]).attr("y2",r.parent[1]).attr("stroke",N()).transition().ease(J).delay(r.depth*150).duration(150).attr("x2",r[0]).attr("y2",r[1]).attr("stroke",N()),++a%50===0&&(yield t.node()))};let v;const[R,P]=d.useState(!1),_=function(){for(;!v.next().done;)v?.next();P(!0)},j=function(){q.selectAll("line").remove(),_()};return d.useEffect(()=>(v=I(),()=>{})),e.jsxs(e.Fragment,{children:[e.jsx("svg",{className:" absolute inset-x-0 opacity-50 inset-y-0 w-full h-min-full pointer-events-none",ref:h}),e.jsx("button",{type:"button",onClick:_,className:"inline-block rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0",children:"start"}),e.jsx("button",{type:"button",onClick:j,className:"inline-block rounded bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0",children:"restart"}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"customRange1",className:"mb-2 inline-block text-neutral-700 dark:text-neutral-200",children:"Width"}),e.jsx("input",{type:"range",value:f.toString(),onChange:n=>{D(Number(n.target.value)),R?j():_()},min:"0",max:"2000",className:"bg-[#95f595] h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent",id:"customRange1"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"customRange1",className:"mb-2 inline-block text-neutral-700 dark:text-neutral-200",children:"Height"}),e.jsx("input",{type:"range",value:M.toString(),onChange:n=>{z(Number(n.target.value)),R?j():_()},min:"0",max:"2000",className:"bg-[#95f595] h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent",id:"customRange1"})]})]})};export{V as default};
