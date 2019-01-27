import { setupVideo } from "../../utils";
import { getMeanGesture } from "./utils";
import { Webcam } from "../../core/Camera/index";
import { MobileNetV1Libras } from "../../core/MobileNetV1Libras/index";

/**
 * Função para escrita de textos com gestos na camera
 * @param {} delay Tempo de espera entre cada gesto em segundos
 * @param {} fnc Função de callback que será executada a cada identificação de gestos
 */
function librasWriter(delay, fnc) {
    
    let gestures = [];
    const mobilenetGestures = new MobileNetV1Libras();
    const webcam = new Webcam(setupVideo(224, 224, true));

    // Função que é executada a cada intervalo do tempo T
    // Inicia o callback e zera a lista de gestos
    window.setInterval(() => {
        if (gestures.length !== 0) {
            fnc(getMeanGesture(gestures));

            gestures = [];
        }
    }, delay * 1000);

    mobilenetGestures.on("gestures", (results) => {
        gestures.push(results);
    });
    mobilenetGestures.predictVideo(webcam);
}

export {
    librasWriter
}
