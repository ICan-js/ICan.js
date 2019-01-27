import * as tf from "@tensorflow/tfjs";

const MODEL_URL = new URL("/", "https://ican-api.herokuapp.com/");


/**
 * Classe do modelo Mobilenet treinado para o reconhecimento de Libras
 */
class MobileNetV1Libras {
    constructor() {
        this.model = null;
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
    async predict(image) {
        await this.buildNet();
        
        return await this.model.predict(image).dataSync();
    }
}

export {
    MobileNetV1Libras
}
