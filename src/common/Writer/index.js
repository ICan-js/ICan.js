import { setupVideo } from "../../utils";
import { getMeanGesture } from "./utils";
import { Webcam } from "../../core/Camera/index";
import { MobileNetV1Libras } from "../../core/MobileNetV1Libras/index";

/**
 * Função para escrita de textos com gestos na camera
 * @param {} delay Tempo de espera entre cada gesto em segundos
 * @param {} fnc Função de callback que será executada a cada identificação de gestos
 */
function librasWriter(delay, nFrames, fnc) {
    
    if (delay === undefined || delay === null) {
        throw new Error("The delay needs to be specified");
    }
    if (typeof fnc !== "function") {
        throw new Error("Callback must be a function");
    }

    let gestures = [];
    let timeout = null;
    const webcam = new Webcam(setupVideo(224, 224, true));
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
