import{r as n}from"./index.499fac84.js";import{V as a,e as c,C as l,a as p,u as m}from"./react-three-fiber.esm.07616458.js";import{s as d}from"./shaderMaterial.479532a7.js";import{j as e}from"./jsx-runtime.b792ae09.js";import"./_commonjsHelpers.de833af9.js";const u=` 
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
}`,v=`
      uniform vec2 resolution;
      float sdCircle(in vec2 p,in float r){
        return length(p)-r;
      }

      void main() {
        vec2 p = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
        
	    float d = sdCircle(p,0.5);
        vec3 col = (d>0.0) ? vec3(0.1,0.6,0.9) : vec3(0.2,0.9,1.0);
        col *= 1.0 - exp(-6.0*abs(d));
	    col *= 0.8 + 0.2*cos(150.0*d);
	    col = mix( col, vec3(1.), 1.-smoothstep(0.0,0.01,abs(d)));
	    gl_FragColor = vec4(col,1.0);
      }
`,r=d({resolution:new a},u,v);c({CircleMaterial:r});function x(){const i=n.useRef(),{viewport:o,size:t}=p();return m((h,s)=>{i.current.time+=s}),e.jsxs("mesh",{scale:[o.width,o.height,1],children:[e.jsx("planeGeometry",{}),e.jsx("circleMaterial",{ref:i,resolution:[t.width*o.dpr,t.height*o.dpr]},r.key)]})}function C(){return e.jsx(l,{style:{height:"300px",margin:"auto"},children:e.jsx(x,{})})}export{C as default};
