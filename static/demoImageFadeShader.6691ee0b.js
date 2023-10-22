import{E as Ge,c as g,d as Y,f as U,Q as je,P as Q,O as $,g as Se,V as y,R as qe,h as Qe,S as $e,U as Je,B as et,i as tt,a as L,u as _e,_ as ot,e as nt,C as at,M as it}from"./react-three-fiber.esm.07616458.js";import{r as z}from"./index.499fac84.js";import{j as H}from"./jsx-runtime.b792ae09.js";import{s as st}from"./shaderMaterial.479532a7.js";import{u as rt}from"./useTexture.ba2e18f8.js";import"./_commonjsHelpers.de833af9.js";var ct=Object.defineProperty,lt=(h,p,v)=>p in h?ct(h,p,{enumerable:!0,configurable:!0,writable:!0,value:v}):h[p]=v,n=(h,p,v)=>(lt(h,typeof p!="symbol"?p+"":p,v),v);const ut=parseInt(tt.replace(/\D+/g,"")),re={uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new g},up:{value:new g(0,1,0)}},vertexShader:`
      uniform vec3 sunPosition;
      uniform float rayleigh;
      uniform float turbidity;
      uniform float mieCoefficient;
      uniform vec3 up;

      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      // constants for atmospheric scattering
      const float e = 2.71828182845904523536028747135266249775724709369995957;
      const float pi = 3.141592653589793238462643383279502884197169;

      // wavelength of used primaries, according to preetham
      const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
      // this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
      // (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
      const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

      // mie stuff
      // K coefficient for the primaries
      const float v = 4.0;
      const vec3 K = vec3( 0.686, 0.678, 0.666 );
      // MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
      const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

      // earth shadow hack
      // cutoffAngle = pi / 1.95;
      const float cutoffAngle = 1.6110731556870734;
      const float steepness = 1.5;
      const float EE = 1000.0;

      float sunIntensity( float zenithAngleCos ) {
        zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
        return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
      }

      vec3 totalMie( float T ) {
        float c = ( 0.2 * T ) * 10E-18;
        return 0.434 * c * MieConst;
      }

      void main() {

        vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
        vWorldPosition = worldPosition.xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        gl_Position.z = gl_Position.w; // set z to camera.far

        vSunDirection = normalize( sunPosition );

        vSunE = sunIntensity( dot( vSunDirection, up ) );

        vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

        float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

      // extinction (absorbtion + out scattering)
      // rayleigh coefficients
        vBetaR = totalRayleigh * rayleighCoefficient;

      // mie coefficients
        vBetaM = totalMie( turbidity ) * mieCoefficient;

      }
    `,fragmentShader:`
      varying vec3 vWorldPosition;
      varying vec3 vSunDirection;
      varying float vSunfade;
      varying vec3 vBetaR;
      varying vec3 vBetaM;
      varying float vSunE;

      uniform float mieDirectionalG;
      uniform vec3 up;

      const vec3 cameraPos = vec3( 0.0, 0.0, 0.0 );

      // constants for atmospheric scattering
      const float pi = 3.141592653589793238462643383279502884197169;

      const float n = 1.0003; // refractive index of air
      const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

      // optical length at zenith for molecules
      const float rayleighZenithLength = 8.4E3;
      const float mieZenithLength = 1.25E3;
      // 66 arc seconds -> degrees, and the cosine of that
      const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

      // 3.0 / ( 16.0 * pi )
      const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
      // 1.0 / ( 4.0 * pi )
      const float ONE_OVER_FOURPI = 0.07957747154594767;

      float rayleighPhase( float cosTheta ) {
        return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
      }

      float hgPhase( float cosTheta, float g ) {
        float g2 = pow( g, 2.0 );
        float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
        return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
      }

      void main() {

        vec3 direction = normalize( vWorldPosition - cameraPos );

      // optical length
      // cutoff angle at 90 to avoid singularity in next formula.
        float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
        float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
        float sR = rayleighZenithLength * inverse;
        float sM = mieZenithLength * inverse;

      // combined extinction factor
        vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

      // in scattering
        float cosTheta = dot( direction, vSunDirection );

        float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
        vec3 betaRTheta = vBetaR * rPhase;

        float mPhase = hgPhase( cosTheta, mieDirectionalG );
        vec3 betaMTheta = vBetaM * mPhase;

        vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
        Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

      // nightsky
        float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
        float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
        vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
        vec3 L0 = vec3( 0.1 ) * Fex;

      // composition + solar disc
        float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
        L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

        vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

        vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

        gl_FragColor = vec4( retColor, 1.0 );

      #include <tonemapping_fragment>
      #include <${ut>=154?"colorspace_fragment":"encodings_fragment"}>

      }
    `};re.fragmentShader,re.vertexShader,re.uniforms,et;const J=new qe,De=new Qe,ft=Math.cos(70*(Math.PI/180)),Re=(h,p)=>(h%p+p)%p;let pt=class extends Ge{constructor(p,v){super(),n(this,"object"),n(this,"domElement"),n(this,"enabled",!0),n(this,"target",new g),n(this,"minDistance",0),n(this,"maxDistance",1/0),n(this,"minZoom",0),n(this,"maxZoom",1/0),n(this,"minPolarAngle",0),n(this,"maxPolarAngle",Math.PI),n(this,"minAzimuthAngle",-1/0),n(this,"maxAzimuthAngle",1/0),n(this,"enableDamping",!1),n(this,"dampingFactor",.05),n(this,"enableZoom",!0),n(this,"zoomSpeed",1),n(this,"enableRotate",!0),n(this,"rotateSpeed",1),n(this,"enablePan",!0),n(this,"panSpeed",1),n(this,"screenSpacePanning",!0),n(this,"keyPanSpeed",7),n(this,"zoomToCursor",!1),n(this,"autoRotate",!1),n(this,"autoRotateSpeed",2),n(this,"reverseOrbit",!1),n(this,"reverseHorizontalOrbit",!1),n(this,"reverseVerticalOrbit",!1),n(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),n(this,"mouseButtons",{LEFT:Y.ROTATE,MIDDLE:Y.DOLLY,RIGHT:Y.PAN}),n(this,"touches",{ONE:U.ROTATE,TWO:U.DOLLY_PAN}),n(this,"target0"),n(this,"position0"),n(this,"zoom0"),n(this,"_domElementKeyEvents",null),n(this,"getPolarAngle"),n(this,"getAzimuthalAngle"),n(this,"setPolarAngle"),n(this,"setAzimuthalAngle"),n(this,"getDistance"),n(this,"listenToKeyEvents"),n(this,"stopListenToKeyEvents"),n(this,"saveState"),n(this,"reset"),n(this,"update"),n(this,"connect"),n(this,"dispose"),this.object=p,this.domElement=v,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=t=>{let o=Re(t,2*Math.PI),a=u.phi;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let i=Math.abs(o-a);2*Math.PI-i<i&&(o<a?o+=2*Math.PI:a+=2*Math.PI),m.phi=o-a,e.update()},this.setAzimuthalAngle=t=>{let o=Re(t,2*Math.PI),a=u.theta;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let i=Math.abs(o-a);2*Math.PI-i<i&&(o<a?o+=2*Math.PI:a+=2*Math.PI),m.theta=o-a,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ie),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(F),e.update(),c=s.NONE},this.update=(()=>{const t=new g,o=new g(0,1,0),a=new je().setFromUnitVectors(p.up,o),i=a.clone().invert(),d=new g,R=new je,N=2*Math.PI;return function(){const Ae=e.object.position;a.setFromUnitVectors(p.up,o),i.copy(a).invert(),t.copy(Ae).sub(e.target),t.applyQuaternion(a),u.setFromVector3(t),e.autoRotate&&c===s.NONE&&ee(Ce()),e.enableDamping?(u.theta+=m.theta*e.dampingFactor,u.phi+=m.phi*e.dampingFactor):(u.theta+=m.theta,u.phi+=m.phi);let _=e.minAzimuthAngle,C=e.maxAzimuthAngle;isFinite(_)&&isFinite(C)&&(_<-Math.PI?_+=N:_>Math.PI&&(_-=N),C<-Math.PI?C+=N:C>Math.PI&&(C-=N),_<=C?u.theta=Math.max(_,Math.min(C,u.theta)):u.theta=u.theta>(_+C)/2?Math.max(_,u.theta):Math.min(C,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(I,e.dampingFactor):e.target.add(I),e.zoomToCursor&&x||e.object.isOrthographicCamera?u.radius=oe(u.radius):u.radius=oe(u.radius*M),t.setFromSpherical(u),t.applyQuaternion(i),Ae.copy(e.target).add(t),e.object.lookAt(e.target),e.enableDamping===!0?(m.theta*=1-e.dampingFactor,m.phi*=1-e.dampingFactor,I.multiplyScalar(1-e.dampingFactor)):(m.set(0,0,0),I.set(0,0,0));let G=!1;if(e.zoomToCursor&&x){let B=null;if(e.object instanceof Q&&e.object.isPerspectiveCamera){const V=t.length();B=oe(V*M);const q=V-B;e.object.position.addScaledVector(Z,q),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const V=new g(E.x,E.y,0);V.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/M)),e.object.updateProjectionMatrix(),G=!0;const q=new g(E.x,E.y,0);q.unproject(e.object),e.object.position.sub(q).add(V),e.object.updateMatrixWorld(),B=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;B!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(B).add(e.object.position):(J.origin.copy(e.object.position),J.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(J.direction))<ft?p.lookAt(e.target):(De.setFromNormalAndCoplanarPoint(e.object.up,e.target),J.intersectPlane(De,e.target))))}else e.object instanceof $&&e.object.isOrthographicCamera&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/M)),e.object.updateProjectionMatrix(),G=!0);return M=1,x=!1,G||d.distanceToSquared(e.object.position)>K||8*(1-R.dot(e.object.quaternion))>K?(e.dispatchEvent(F),d.copy(e.object.position),R.copy(e.object.quaternion),G=!1,!0):!1}})(),this.connect=t=>{t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Me),e.domElement.addEventListener("pointerdown",Pe),e.domElement.addEventListener("pointercancel",xe),e.domElement.addEventListener("wheel",Te)},this.dispose=()=>{var t,o,a,i,d,R;(t=e.domElement)==null||t.removeEventListener("contextmenu",Me),(o=e.domElement)==null||o.removeEventListener("pointerdown",Pe),(a=e.domElement)==null||a.removeEventListener("pointercancel",xe),(i=e.domElement)==null||i.removeEventListener("wheel",Te),(d=e.domElement)==null||d.removeEventListener("pointermove",ne),(R=e.domElement)==null||R.removeEventListener("pointerup",ae),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ie)};const e=this,F={type:"change"},b={type:"start"},T={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let c=s.NONE;const K=1e-6,u=new Se,m=new Se;let M=1;const I=new g,O=new y,w=new y,A=new y,j=new y,S=new y,D=new y,P=new y,f=new y,l=new y,Z=new g,E=new y;let x=!1;const r=[],X={};function Ce(){return 2*Math.PI/60/60*e.autoRotateSpeed}function W(){return Math.pow(.95,e.zoomSpeed)}function ee(t){e.reverseOrbit||e.reverseHorizontalOrbit?m.theta+=t:m.theta-=t}function ce(t){e.reverseOrbit||e.reverseVerticalOrbit?m.phi+=t:m.phi-=t}const le=(()=>{const t=new g;return function(a,i){t.setFromMatrixColumn(i,0),t.multiplyScalar(-a),I.add(t)}})(),ue=(()=>{const t=new g;return function(a,i){e.screenSpacePanning===!0?t.setFromMatrixColumn(i,1):(t.setFromMatrixColumn(i,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),I.add(t)}})(),k=(()=>{const t=new g;return function(a,i){const d=e.domElement;if(d&&e.object instanceof Q&&e.object.isPerspectiveCamera){const R=e.object.position;t.copy(R).sub(e.target);let N=t.length();N*=Math.tan(e.object.fov/2*Math.PI/180),le(2*a*N/d.clientHeight,e.object.matrix),ue(2*i*N/d.clientHeight,e.object.matrix)}else d&&e.object instanceof $&&e.object.isOrthographicCamera?(le(a*(e.object.right-e.object.left)/e.object.zoom/d.clientWidth,e.object.matrix),ue(i*(e.object.top-e.object.bottom)/e.object.zoom/d.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function te(t){e.object instanceof Q&&e.object.isPerspectiveCamera||e.object instanceof $&&e.object.isOrthographicCamera?M/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function fe(t){e.object instanceof Q&&e.object.isPerspectiveCamera||e.object instanceof $&&e.object.isOrthographicCamera?M*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function pe(t){if(!e.zoomToCursor||!e.domElement)return;x=!0;const o=e.domElement.getBoundingClientRect(),a=t.clientX-o.left,i=t.clientY-o.top,d=o.width,R=o.height;E.x=a/d*2-1,E.y=-(i/R)*2+1,Z.set(E.x,E.y,1).unproject(e.object).sub(e.object.position).normalize()}function oe(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function de(t){O.set(t.clientX,t.clientY)}function Le(t){pe(t),P.set(t.clientX,t.clientY)}function me(t){j.set(t.clientX,t.clientY)}function Ie(t){w.set(t.clientX,t.clientY),A.subVectors(w,O).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*A.x/o.clientHeight),ce(2*Math.PI*A.y/o.clientHeight)),O.copy(w),e.update()}function Ne(t){f.set(t.clientX,t.clientY),l.subVectors(f,P),l.y>0?te(W()):l.y<0&&fe(W()),P.copy(f),e.update()}function ze(t){S.set(t.clientX,t.clientY),D.subVectors(S,j).multiplyScalar(e.panSpeed),k(D.x,D.y),j.copy(S),e.update()}function Fe(t){pe(t),t.deltaY<0?fe(W()):t.deltaY>0&&te(W()),e.update()}function ke(t){let o=!1;switch(t.code){case e.keys.UP:k(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:k(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:k(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:k(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function he(){if(r.length==1)O.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);O.set(t,o)}}function ve(){if(r.length==1)j.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);j.set(t,o)}}function ge(){const t=r[0].pageX-r[1].pageX,o=r[0].pageY-r[1].pageY,a=Math.sqrt(t*t+o*o);P.set(0,a)}function Ye(){e.enableZoom&&ge(),e.enablePan&&ve()}function Ue(){e.enableZoom&&ge(),e.enableRotate&&he()}function be(t){if(r.length==1)w.set(t.pageX,t.pageY);else{const a=se(t),i=.5*(t.pageX+a.x),d=.5*(t.pageY+a.y);w.set(i,d)}A.subVectors(w,O).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*A.x/o.clientHeight),ce(2*Math.PI*A.y/o.clientHeight)),O.copy(w)}function Ee(t){if(r.length==1)S.set(t.pageX,t.pageY);else{const o=se(t),a=.5*(t.pageX+o.x),i=.5*(t.pageY+o.y);S.set(a,i)}D.subVectors(S,j).multiplyScalar(e.panSpeed),k(D.x,D.y),j.copy(S)}function ye(t){const o=se(t),a=t.pageX-o.x,i=t.pageY-o.y,d=Math.sqrt(a*a+i*i);f.set(0,d),l.set(0,Math.pow(f.y/P.y,e.zoomSpeed)),te(l.y),P.copy(f)}function He(t){e.enableZoom&&ye(t),e.enablePan&&Ee(t)}function Ze(t){e.enableZoom&&ye(t),e.enableRotate&&be(t)}function Pe(t){var o,a,i;e.enabled!==!1&&(r.length===0&&((o=e.domElement)==null||o.setPointerCapture(t.pointerId),(a=e.domElement)==null||a.addEventListener("pointermove",ne),(i=e.domElement)==null||i.addEventListener("pointerup",ae)),We(t),t.pointerType==="touch"?Ke(t):Be(t))}function ne(t){e.enabled!==!1&&(t.pointerType==="touch"?Xe(t):Ve(t))}function ae(t){var o,a,i;Oe(t),r.length===0&&((o=e.domElement)==null||o.releasePointerCapture(t.pointerId),(a=e.domElement)==null||a.removeEventListener("pointermove",ne),(i=e.domElement)==null||i.removeEventListener("pointerup",ae)),e.dispatchEvent(T),c=s.NONE}function xe(t){Oe(t)}function Be(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case Y.DOLLY:if(e.enableZoom===!1)return;Le(t),c=s.DOLLY;break;case Y.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;me(t),c=s.PAN}else{if(e.enableRotate===!1)return;de(t),c=s.ROTATE}break;case Y.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;de(t),c=s.ROTATE}else{if(e.enablePan===!1)return;me(t),c=s.PAN}break;default:c=s.NONE}c!==s.NONE&&e.dispatchEvent(b)}function Ve(t){if(e.enabled!==!1)switch(c){case s.ROTATE:if(e.enableRotate===!1)return;Ie(t);break;case s.DOLLY:if(e.enableZoom===!1)return;Ne(t);break;case s.PAN:if(e.enablePan===!1)return;ze(t);break}}function Te(t){e.enabled===!1||e.enableZoom===!1||c!==s.NONE&&c!==s.ROTATE||(t.preventDefault(),e.dispatchEvent(b),Fe(t),e.dispatchEvent(T))}function ie(t){e.enabled===!1||e.enablePan===!1||ke(t)}function Ke(t){switch(we(t),r.length){case 1:switch(e.touches.ONE){case U.ROTATE:if(e.enableRotate===!1)return;he(),c=s.TOUCH_ROTATE;break;case U.PAN:if(e.enablePan===!1)return;ve(),c=s.TOUCH_PAN;break;default:c=s.NONE}break;case 2:switch(e.touches.TWO){case U.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(),c=s.TOUCH_DOLLY_PAN;break;case U.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ue(),c=s.TOUCH_DOLLY_ROTATE;break;default:c=s.NONE}break;default:c=s.NONE}c!==s.NONE&&e.dispatchEvent(b)}function Xe(t){switch(we(t),c){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;be(t),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;Ee(t),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;He(t),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ze(t),e.update();break;default:c=s.NONE}}function Me(t){e.enabled!==!1&&t.preventDefault()}function We(t){r.push(t)}function Oe(t){delete X[t.pointerId];for(let o=0;o<r.length;o++)if(r[o].pointerId==t.pointerId){r.splice(o,1);return}}function we(t){let o=X[t.pointerId];o===void 0&&(o=new y,X[t.pointerId]=o),o.set(t.pageX,t.pageY)}function se(t){const o=t.pointerId===r[0].pointerId?r[1]:r[0];return X[o.pointerId]}v!==void 0&&this.connect(v),this.update()}};const dt=z.forwardRef(({makeDefault:h,camera:p,regress:v,domElement:e,enableDamping:F=!0,keyEvents:b=!1,onChange:T,onStart:s,onEnd:c,...K},u)=>{const m=L(l=>l.invalidate),M=L(l=>l.camera),I=L(l=>l.gl),O=L(l=>l.events),w=L(l=>l.setEvents),A=L(l=>l.set),j=L(l=>l.get),S=L(l=>l.performance),D=p||M,P=e||O.connected||I.domElement,f=z.useMemo(()=>new pt(D),[D]);return _e(()=>{f.enabled&&f.update()},-1),z.useEffect(()=>(b&&f.connect(b===!0?P:b),f.connect(P),()=>void f.dispose()),[b,P,v,f,m]),z.useEffect(()=>{const l=x=>{m(),v&&S.regress(),T&&T(x)},Z=x=>{s&&s(x)},E=x=>{c&&c(x)};return f.addEventListener("change",l),f.addEventListener("start",Z),f.addEventListener("end",E),()=>{f.removeEventListener("start",Z),f.removeEventListener("end",E),f.removeEventListener("change",l)}},[T,s,c,f,m,w]),z.useEffect(()=>{if(h){const l=j().controls;return A({controls:f}),()=>A({controls:l})}},[h,f]),z.createElement("primitive",ot({ref:u,object:f,enableDamping:F},K))}),mt=st({effectFactor:1.2,dispFactor:0,tex:void 0,tex2:void 0,disp:void 0},` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`);nt({ImageFadeMaterial:mt});function ht(){const h=z.useRef(),[p,v,e]=rt(["/mono_notes/assets/xiaoGong.jpg","/mono_notes/assets/xiaoGong.jpg","/mono_notes/assets/xiaoGong.jpg"]),[F,b]=z.useState(!1);_e(()=>{h.current.dispFactor=it.lerp(h.current.dispFactor,F?1:0,.05)});const{viewport:T}=L();return H.jsxs("mesh",{scale:[T.width,T.height,1],onPointerOver:()=>b(!0),onClick:()=>{b(!F)},onPointerOut:()=>b(!1),children:[H.jsx("planeGeometry",{}),H.jsx("imageFadeMaterial",{ref:h,tex:p,tex2:v,disp:e,toneMapped:!1}),H.jsx(dt,{enablePan:!0,zoomSpeed:.5})]})}function Mt(){return H.jsx(at,{className:"max-w-full",style:{width:"250px",height:"208px",margin:"auto"},camera:{position:[0,0,2],fov:50},children:H.jsx(ht,{})})}export{Mt as default};
