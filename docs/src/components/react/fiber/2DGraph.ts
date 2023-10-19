import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

const basicVertex = ` 
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
}`

const circleFragment = `
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
`


const CircleMaterial = shaderMaterial(
    {
        resolution: new THREE.Vector2(),
    },
    basicVertex,
    circleFragment
)

extend({ CircleMaterial })

export { CircleMaterial }
