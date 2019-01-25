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

            // ToDo: Verificar a influência deste passo na classificação
            const batchedImage = webcamImage.expandDims(0);

            // Antes de retornar é feito uma normalização
            // Verifica a influência desta normalização dos dados
            return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
        });
    }
}

export {
    Webcam
}
