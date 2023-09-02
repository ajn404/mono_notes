// //  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>

// import { useEffect } from "react";

// // <input type="file" id="fileInput" accept="image/*">
// //  <canvas id="canvas"></canvas>


// const App = () => {

//     useEffect(() => {
//         import("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs").then((res) => {

//             const canvas = document.getElementById('canvas') as HTMLCanvasElement;
//             const ctx = (canvas as HTMLCanvasElement)?.getContext('2d');

//             const fileInput = document.getElementById('fileInput');
//             if (canvas && fileInput)
//                 fileInput.addEventListener('change', (e) => {

//                     const files = ((e as Event).target as HTMLInputElement).files;
//                     let file;
//                     if (files && files.length > 0) {
//                         file = files[0];
//                     }
//                     if (file && ctx) {
//                         const reader = new FileReader();
//                         reader.onload = (e) => {
//                             const img = new Image();
//                             img.onload = async () => {
//                                 const maxSize = 500;
//                                 const scale = Math.min(maxSize / img.width, maxSize / img.height);
//                                 const newWidth = img.width * scale;
//                                 const newHeight = img.height * scale;
//                                 canvas.width = newWidth;
//                                 canvas.height = newHeight;
//                                 ctx.scale(scale, scale);
//                                 ctx.drawImage(img, 0, 0);

//                                 // 使用TensorFlow.js识别图片中的人
//                                 //@ts-ignore
//                                 const model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model-zoo/mobilenet_v2_035_person_segmentation/1');
//                                 //@ts-ignore
//                                 const imgData = tf.util.tensorFromImage(img, { channels: 'rgba', dtype: 'float32' });
//                                 const segMap = model.predict(imgData);
//                                 const personSegmentation = segMap.argMax(3).dataSync();

//                                 // 将识别结果绘制到canvas上
//                                 ctx.clearRect(0, 0, newWidth, newHeight);
//                                 for (let i = 0; i < newWidth; i++) {
//                                     for (let j = 0; j < newHeight; j++) {
//                                         const idx = (i + j * newWidth) * 4;
//                                         if (personSegmentation[idx] === 1) {
//                                             ctx.fillStyle = 'red';
//                                             ctx.fillRect(i, j, 1, 1);
//                                         }
//                                     }
//                                 }
//                             };
//                             img.src = e.target.result;
//                         };
//                         reader.readAsDataURL(file);
//                     }
//                 });
//         })
//         return () => {

//         }
//     })
//     return <div>
//         <input type="file" id="fileInput" accept="image/*" />
//         <canvas id="canvas"></canvas>
//     </div>
// }


// export default App;