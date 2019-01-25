import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';

import { EventEmitter } from 'events';


/**
 * Rede neural para a identificação dos pontos faciais do usuário
 */
class PoseNet extends EventEmitter {
    constructor(video, imageMultiplier=0.75, imageScaleFactor=0.5, outputStride=16) {
        super();

        this.isOn = true;

        this.video = video;
        
        this.neuralModel = null;
        this.imageMultiplier = imageMultiplier;
        this.imageScaleFactor = imageScaleFactor;
        this.outputStride = outputStride;
    }

    /**
     * Método para criar um singleton da instância do modelo da rede
     */
    async buildNet() {
        if (this.neuralModel === null) {
            this.neuralModel = await posenet.load(this.imageMultiplier);
        }
    }

    /**
     * Método para recuperar pontos faciais do usuário
     */
    async trackSingleUser() {
        await this.buildNet();

        if (this.neuralModel !== null) {
            let poses = await this.neuralModel.estimateSinglePose(
                this.video, this.imageScaleFactor, false, this.outputStride)

            // Enviando evento que pode ser capturado por utilizadores da classe
            this.emit("poses", poses);
    
            if (this.video && this.isOn) {
                return tf.nextFrame().then(() => this.trackSingleUser());
            }
        }
    }

    /**
     * Método para paralizar as predições 
     */
    stop() {
        this.isOn = false;
    }

    /**
     * Método para continuar as predições
     */
    start() {
        this.isOn = true;
    }
}

export {
    PoseNet
}
