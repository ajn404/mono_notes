import"./index.e5766f07.js";import{r as t}from"./index.499fac84.js";import{j as c}from"./jsx-runtime.b792ae09.js";import"./_commonjsHelpers.de833af9.js";const u=()=>{let[o]=t.useState(` @grid: 18 / 50vmin / #0a0c27;
      --hue: calc(180 + 1.5 * @x * @y);
      background: hsl(var(--hue), 50%, 70%);
      margin: -.5px;
      transition: @r(.5s) ease;
      clip-path: polygon(@pick(
        '0 0, 100% 0, 100% 100%',
        '0 0, 100% 0, 0 100%',
        '0 0, 100% 100%, 0 100%',
        '100% 0, 100% 100%, 0 100%'
      ));
   `),[s,e]=t.useState(!1);const r=()=>{e(a=>!a)};return t.useEffect(()=>{e(!0)}),s&&c.jsx("css-doodle",{onClick:r,children:o})};export{u as default};
