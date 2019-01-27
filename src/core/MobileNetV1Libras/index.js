import * as tf from "@tensorflow/tfjs";

import { EventEmitter } from "events";
import { transformMobileNetV1LibrasResultsInJson } from "./utils";

const MODEL_URL = new URL("/", "https://ican-api.herokuapp.com/");


/**
 * Classe do modelo Mobilenet treinado para o reconhecimento de Libras
 */
class MobileNetV1Libras extends EventEmitter {
    constructor(webcamStream) {
        super();

        this.model = null;
        this.webcamStream = webcamStream;

        // Informativo temporário
        console.warn("MobileNetV1Libras", "There are updates that need to be done in this class and its resources because over time memory usage becomes excessive");        
    }

    /**
     * Carrega a rede neural na memória
     */
    async buildNet() {
        if (this.model === null) {
            this.model = await tf.loadModel(new URL("/models/mobilenetv1/model.json", MODEL_URL).href);
        }
    }

    /**
     * Método para a classificação frame-a-frame (Não continua)
     * @param {*} image
     * @param {*} imageShape 
     */
    async predictFrame() {
        await this.buildNet();

        if (this.webcamStream.isActivated()) {
            let result = this.model.predict(this.webcamStream.captureImage());
        
            return transformMobileNetV1LibrasResultsInJson(result.dataSync());
        } else {
            console.warn("predictFrame: ", "The camera is disabled, predictions will not be made");
            return {}
        }
    }

    /**
     * Método para a classificação continua de um vídeo (Classificação continua de diversos frames)
     * @param {Webcam} webcamStream 
     */
    async predictVideo() {
        await this.buildNet();

        if (this.model !== null) {
            let gestures = await this.model.predict(this.webcamStream.captureImage());

            this.emit("gestures", transformMobileNetV1LibrasResultsInJson(gestures.dataSync()));
            gestures.dispose();
    
            if (this.webcamStream.isActivated()) {
                return tf.nextFrame().then(() => this.predictVideo());
            } else {
                console.warn("predictVideo: ", "The camera is disabled, predictions will not be made");
                return {}
            }
        }
    }
}

export {
    MobileNetV1Libras
}
