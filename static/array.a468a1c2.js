import{r as u}from"./index.499fac84.js";import{j as d}from"./jsx-runtime.b792ae09.js";import"./_commonjsHelpers.de833af9.js";const g=(n,t)=>{console.log(n);let e=new Array(t+1).fill(0),l=new Array(t).fill(0);for(let r=1;r<=t;r++){let s=-1/0;for(let o=0;o<r;o++)s<n[o]+e[r-o]&&(s=n[o]+e[r-o],l[r]=o);e[r]=s,console.log(`r[${r}]=`,e[r])}return console.log("s",l),console.log("r",e),e[t-1]};function p(n){const t=[...n];for(let e=t.length-1;e>0;e--){const l=Math.floor(Math.random()*(e+1));[t[e],t[l]]=[t[l],t[e]]}return t}const y=({array:n,type:t=!1})=>{const[e,l]=u.useState(structuredClone(n));t||(l(p(e)),u.useEffect(()=>{let i=0,a,f=!1;const m=()=>{let c=performance.now();a||(a=c),!f&&c-a>1500&&(a=c,f=!0,l(p(e))),f=!1,i=requestAnimationFrame(m)};return i=requestAnimationFrame(m),()=>{cancelAnimationFrame(i)}}));let r={p:[1,5,8,9,10,17,17,20,24,30],n:5};const{p:s,n:o}=r;let x=g(s,o);return console.log(x),d.jsx("div",{className:"array flex w-full",children:e.map((i,a)=>d.jsx("div",{className:"flex-item flex-1 text-center  border-2 border-indigo-600",children:i},a))})};export{y as default};
