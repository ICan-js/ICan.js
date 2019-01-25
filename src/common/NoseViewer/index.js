/**
 * Classe para o controle do mouse 
 */
class NoseViewer {
    constructor(posenet, regressionModel) {
        this.posenet = posenet;
        this.regressionModel = regressionModel;
    }

    /**
     * Método para predição da posição do mouse com base na localização do nariz
     * @param {*} fnc 
     */
    predictMousePoint(fnc) {
        this.posenet.on("poses", fnc);
        this.posenet.trackSingleUser();
    }
}

export {
    NoseViewer
}
