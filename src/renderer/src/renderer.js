/* 
Buscar manera para poner el archivo sin hash en el out assets, 
porque en el out no me los importa a no ser que haga import o los utilice en el html


Soluciones probadas 
  * Usar el plugin de vite-plugin-static-copy
  * Poner un script para copiar los archivos de assets del src al out assets mediante un script en el package.json "    "build:win": "npm run build && electron-builder --win && && npx cpy \"src/renderer/assets/** / *\" \"out/renderer/assets\" --parents"," 
Solucion actual
 * importar las imagenes por modulos
*/
import img1 from "../assets/usagi-chiikawa-1.gif";
import img2 from "../assets/usagi-chiikawa-2.gif";
import img3 from "../assets/usagi-chiikawa-3.gif";
import img4 from "../assets/usagi-chiikawa-4.gif";
import img5 from "../assets/usagi-chiikawa-5.gif";
import img6 from "../assets/usagi-chiikawa-6.gif";
import img7 from "../assets/usagi-chiikawa-7.gif";
import img8 from "../assets/usagi-chiikawa-8.gif";
import img9 from "../assets/usagi-chiikawa-9.gif";
import img10 from "../assets/usagi-chiikawa-10.gif";
import img11 from "../assets/usagi-chiikawa-11.gif";

function init() {
  window.addEventListener('DOMContentLoaded', () => {

    const imagenes = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11,]

    setInterval(() => {

      let random = Math.floor(Math.random() * imagenes.length)
      document.getElementById("usagi-img").src = imagenes[random];

    }, 30000);

  })
}



init()
