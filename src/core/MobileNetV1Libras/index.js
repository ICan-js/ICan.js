import * as tf from "@tensorflow/tfjs";

import { EventEmitter } from "events";
import { transformMobileNetV1LibrasResultsInJson } from "./utils";
import { Webcam } from "../Camera";

const MODEL_URL = new URL("/", "https://ican-api.herokuapp.com/");


/**
 * Classe do modelo Mobilenet treinado para o reconhecimento de Libras
 */
class MobileNetV1Libras extends EventEmitter {
    /**
     * @param {Webcam} webcamStream Instância da classe WebCam 
     */
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
     * Método para a classificação frame-a-frame (Não continua).
     * 
     * Este método recupera apenas o frame atual e faz sua classificação
     * 
     * @returns {Object} Retorna objeto com as probabilidades de cada uma das classes preditas. E.g {a: 0.4, b: 0.6}
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
     * @emits Emite um objeto com as probabilidades preditas pela rede neural de cada um dos frames. E.g {a: 0.4, b: 0.6}
     * 
     * @returns {Object} Objeto de classificação de vídeo
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
