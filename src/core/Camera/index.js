import * as tf from "@tensorflow/tfjs";

/**
 * Classe para a representação da webcam. Criada com base na documentação do Google 
 * 
 * @see https://github.com/tensorflow/tfjs-examples/blob/master/webcam-transfer-learning/webcam.js
 * 
 * Esta classe abstrai operações de captura de frames da câmera do usuário e verificação do stream da câmera
 * do usuário
 */
class Webcam {
    /**
     * @param {HTMLMediaElement} videoElement Elemento de vídeo HTML capturado pelo Javascript 
     */
    constructor(videoElement) {
        this.videoElement = videoElement;
    }

    /**
     * Método para capturar a imagem atual na webcam
     * @returns {tf.Tensor} Imagem capturada da câmera do usuário, transformada em um tensor
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
     * 
     * @returns {Boolean} Flag se a stream está ou não ativa
     */
    isActivated() {
        return (this.videoElement.currentTime > 0 && !this.videoElement.paused && !this.videoElement.ended);
    }
}

export {
    Webcam
}
