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
     * 
     * @param {*} image
     * @param {*} imageShape 
     */
    async predictImage(image) {
        await this.buildNet();
        
        return await this.model.predict(image).dataSync();
    }

    /**
     * Método para a classificação continua de um vídeo
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
            }
        }
    }
}

export {
    MobileNetV1Libras
}
