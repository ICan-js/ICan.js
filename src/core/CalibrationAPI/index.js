import { EventEmitter } from 'events';

/**
 * API para calibração dos modelos de regressão disponiveis no ICan.js
 * Esta API captura a posição do mouse do usuário assim como a posição do nariz, para que seja
 * possível para os modelos de regressão mapear a relação entre as duas variáveis.
 * 
 * @emits Emite um sinal com a lista de pontos do mouse e do nariz do usuário
 */
class CalibrationAPI extends EventEmitter {

    /**
     * 
     * @param {P5} sketch Instância de objeto P5
     * @param {Number} pointSize Tamanho do ponto a ser exibido na tela do usuário para captação da posição do mouse
     * @param {Number} pointsToStorage Quantidade de cada ponto exibida para finalização da calibração
     */
    constructor(sketch, pointSize, pointsToStorage) {
        super();

        this.sketch = sketch;
        this.pointSize = pointSize;

        this.pointStorage = {
            Q1: [], Q2: [], Q3: [],
            Q4: [], Q5: [], Q6: [],
            Q7: [], Q8: [], Q9: []    
        }

        this.ellipsesPositions = [
            {
                name: 'Q1',
                x: 60, 
                y: 70
            }, {
                name: 'Q2',
                x: this.sketch.width / 2,
                y: 70
            }, {
                name: 'Q3',
                x: this.sketch.width - 60,
                y: 70
            }, {
                name: 'Q4',
                x: 60,
                y: this.sketch.height / 2
            }, {
                name: 'Q5',
                x: this.sketch.width / 2,
                y: this.sketch.height / 2
            }, {
                name: 'Q6',
                x: this.sketch.width - 60,
                y: this.sketch.height / 2
            }, {
                name: 'Q7',
                x: 60,
                y: this.sketch.height - 70
            }, {
                name: 'Q8',
                x: this.sketch.width / 2,
                y: this.sketch.height - 70
            }, {
                name: 'Q9',
                x: this.sketch.width - 60,
                y: this.sketch.height - 70
            }
        ];

        this.pointsToStorage = pointsToStorage;
    }

    /**
     * Desenha as elipses na tela do usuário
     */
    displayEllipses() {
        this.ellipsesPositions.forEach((e) => {
            this.sketch.ellipse(e.x, e.y, this.pointSize, this.pointSize);
        });
    }

    /**
     * Método para verificar se o mouse está dentro de alguma ellipse
     * @param {Array} mousePoint Lista com posição cartesiana do mouse do usuário
     * @param {Array} nosePoint List com posição cartesiana do nariz do usuário
     */
    isInEllipse(mousePoint, nosePoint) {
        this.ellipsesPositions.forEach((e) => {
            if (this.sketch.dist(mousePoint.x, mousePoint.y, e.x, e.y) < this.pointSize) {

                // Verificação para evitar overfitting
                if (this.pointStorage[e.name].length <= this.pointsToStorage) {
                    this.pointStorage[e.name].push({
                        mousePoint: mousePoint,
                        nosePoint: nosePoint
                    });
                }
            }
        });

        this.verifyPointStorage();
    }

    /**
     * Método para informar ao usuário da API que a quantidade de pontos necessários
     * no modelo foi atingido 
     * 
     * @returns {null}
     */
    verifyPointStorage() {            
        let isComplete = true;
        // Verifica os elements que já possuem a quantidade de pontos necessários
        Object.keys(this.pointStorage).forEach((e) => {
            if (this.pointStorage[e].length < this.pointsToStorage) {
                isComplete = false;        
            }
        });
        if (isComplete) {
            this.emit("finish", this.pointStorage);
        }
    }
}

export {
    CalibrationAPI
}
