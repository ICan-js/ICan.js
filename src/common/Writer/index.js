import { setupVideo } from "../../utils";
import { getMeanGesture } from "./utils";
import { Webcam } from "../../core/Camera/index";
import { MobileNetV1Libras } from "../../core/MobileNetV1Libras/index";


/**
 * Função para escrita de textos com gestos de Libras na câmera. Para a utilização desta
 * função será necessário definir o delay em que cada frame é capturado e também a
 * quantidade de frames que deverão ser utilizados para definir o texto escrito pelo usuário. Isto por que esta função captura uma quantidade N de imagens, em X delay e então cria uma média de resultados de predição, assim a palavra com a maior média é utilizada como verdade ao o que o usuário estava dizendo nos gestos.
 * 
 * @param {HTMLMediaElement} videoCapture Stream da webcam do usuário
 * @param {Number} delay Tempo de espera entre cada gesto em segundos
 * @param {Number} nFrames Quantidade de frames a serem captados para o cálculo da média
 * @param {Function} fnc Função que será utilizada para devolver os resultados calculados
 */
function librasWriter(videoCapture, delay, nFrames, fnc) {

    if (videoCapture.height !== 224 || videoCapture.width !== 224) {
        throw new Error("The video must contain 224X224");
    }
    if (delay === undefined || delay === null) {
        throw new Error("The delay needs to be specified");
    }
    if (typeof fnc !== "function") {
        throw new Error("Callback must be a function");
    }

    let gestures = [];
    let timeout = null;
    const webcam = new Webcam(videoCapture);
    const mobilenetGestures = new MobileNetV1Libras(webcam);

    // Definindo função recursiva com a captura dos frames
    // Desta forma a função tende a se chamar diversas vezes
    async function recursiveInterval() {
        try {
            gestures.push(await mobilenetGestures.predictFrame());
 
            if (gestures.length >= nFrames) {
                // Tira a média de valores classificados
                fnc(getMeanGesture(gestures));
                gestures = [];
            }
    
            timeout = window.setTimeout(() => {
                recursiveInterval();
            }, delay * 1000);       
        } catch(err) {
            if (timeout !== null) {
                window.clearTimeout(timeout);
            }

            console.error("librasWriter", err);
        }
    }

    recursiveInterval();
}

export {
    librasWriter
}
