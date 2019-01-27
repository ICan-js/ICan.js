import * as tf from "@tensorflow/tfjs";

/**
 * Classe para a representação da webcam. Criada com base na documentação
 * do Google (https://github.com/tensorflow/tfjs-examples/blob/master/webcam-transfer-learning/webcam.js)
 */
class Webcam {
    constructor(videoElement) {
        this.videoElement = videoElement;
    }

    /**
     * Método para capturar a imagem atual na webcam
     */
    captureImage() {
        return tf.tidy(() => {
            const webcamImage = tf.fromPixels(this.videoElement);

            const batchedImage = webcamImage.expandDims(0);
            
            // Foi necessário normalizar a imagem capturada para a classificação ocorrer 
            // sem problemas
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        });
    }

    /**
     * Método para verificar se o Stream da webcam ainda está ativo
     */
    isActivated() {
        return (this.videoElement.currentTime > 0 && !this.videoElement.paused && !this.videoElement.ended);
    }
}

export {
    Webcam
}
