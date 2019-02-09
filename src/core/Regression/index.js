/**
 * Pesos de regressão treinados  
 */
class TrainedRegression {
    /**
     * 
     * @param {Regression} weights Pesos do modelo treinados
     */
    constructor(weights) {
        this.weights = weights;
    }
}

/**
 * Classe abstrata para os modelos de regressão
 */
class Regression {
    /**
     * 
     * @param {TrainedRegression} modelX Modelo de regressão já treinado
     * @param {TrainedRegression} modelY Modelo de regressão já treinado
     */
    constructor(modelX=null, modelY=null) {
        if (new.target == Regression) {
            throw new TypeError("This class can not be instantiated");
        }

        this.stack = {
            x: [],
            y: []
        };
        this.filter = null;
        this.modelX = null;
        this.modelY = null;

        if (modelX !== null && modelY !== null) {
            this.modelX = modelX.weights;
            this.modelY = modelY.weights;
        }
    }

    /**
     * Método para inferir a posição do mouse dado a localização do nariz do usuário
     * @param {*} nose 
     */
    inferMousePosition(nose) {
        throw new Error("This methods needs to be overwritten");
    }

    /**
     * Método para realizar a regressão
     * @param {*} data 
     */
    doRegression(data) {
        throw new Error("This methods needs to be overwritten");
    }

    /**
     * Método para treinar o modelo de regressão
     * @param {*} xDataset 
     * @param {*} yDataset 
     */
    trainModel(xDataset, yDataset) {
        throw new Error("This methods needs to be overwritten");
    }

    /**
     * Método para adição de filtro na inferência da posição do mouse
     * @param {*} filter 
     * @param {*} delay 
     */
    setFilter(filter) {
        this.filter = filter;
    }
}

/**
 * Modelo de regressão linear, que pode ser utilizado para a inferência da posição do usuário na tela
 * Aqui o método empregado regressão linear é simples, porém, realizado duas vezes, sendo a predição para a 
 * posição X e Y
 */
class LinearRegression extends Regression {

    /**
     * Método para inferir a posição do mouse dado a localização do nariz do usuário
     * @param {*} nose 
     */
    inferMousePosition(nose) {
        if (this.modelX === null || this.modelY === null) {
            throw Error("It is necessary to train the model before using this method");
        }

        let xPredict = (nose.position.x * this.modelX.gradient) + this.modelX.intercept;
        let yPredict = (nose.position.y * this.modelY.gradient) + this.modelY.intercept;

        // Aplicação de filtro para possível suavização da movimentação do mouse
        if (this.filter !== null) {
            if (this.stack.x.length === this.filter.delay) {
                xPredict = this.filter.apply(this.stack.x);
                yPredict = this.filter.apply(this.stack.y);

                this.stack = {
                    x: [],
                    y: []
                };
            } else {
                this.stack.x.push(xPredict);
                this.stack.y.push(yPredict);
            }
        }

        return {
            x: xPredict,
            y: yPredict
        }
    }

    /**
     * Método para geração dos pesos do modelo de regressão 
     * 
     * @see https://github.com/brownhci/WebGazer/blob/master/src/regression.js
     * 
     * @param {Array} data 
     */
    doRegression(data) {
        let n = 0;
        let sum = [0, 0, 0, 0, 0];
        
        for (; n < data.length; n++) {
            if (data[n][1] !== null) {
                sum[0] += data[n][0];
                sum[1] += data[n][1];
                sum[2] += data[n][0] * data[n][0];
                sum[3] += data[n][0] * data[n][1];
                sum[4] += data[n][1] * data[n][1];
            }
        }

        // Cálculo do intercepto e do gradiente da reta
        let gradient = (n * sum[3] - sum[0] * sum[1]) / (n * sum[2] - sum[0] * sum[0]);
        let intercept = (sum[1] / n) - (gradient * sum[0]) / n;

        return {
            gradient: gradient,
            intercept: intercept
        }
    }

    /**
     * Método para treinar o modelo de regressão
     * @param {Array} xDataset 
     * @param {Array} yDataset 
     */
    trainModel(xDataset, yDataset) {
        if (this.modelX !== null || this.modelY !== null) {
            throw new Error("The weights have already been defined, it is not possible to train the model")
        }

        // Realiza as regressões para cada um dos datasets
        this.modelX = this.doRegression(xDataset);
        this.modelY = this.doRegression(yDataset);
    }

    /**
     * Método para exportar os pesos dos modelos de regressão
     */
    exportRegressionWeights() {
        if (this.modelX === null || this.modelY === null) {
            throw new Error("The weights is not defined");
        }

        return {
            weightsX: new TrainedRegression(this.modelX),
            weightsY: new TrainedRegression(this.modelY)
        }
    }
}

export {
    Regression,
    LinearRegression
}
