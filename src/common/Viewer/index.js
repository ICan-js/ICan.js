import { PoseNet } from "../../core";
import { mean, median } from "../../core/Stats/index";

/**
 * Classe para o controle do mouse 
 */
class ScreenScroller {
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

/**
 * Facade para criar uma instância de ScreenScroller
 * @param {*} regressionModel 
 */
function screenScroller(htmlElements, regressionModel, filter=null) {

    // Aplicando filtro na função de regressão
    if (filter !== null) {
        let filterFunction;

        if (filter.name === "mean") {
            filterFunction = mean;
        } else if (filter.name === "median") {
            filterFunction = median;
        } else {
            throw Error("The filter function specified is not valid, use medium or medium");
        }

        regressionModel.setFilter({
            delay: filter.delay,
            apply: filterFunction
        });
    }

    const posenet = new PoseNet(htmlElements.videoElement);
    const screenScrollerObject = new ScreenScroller(posenet, regressionModel);

    screenScrollerObject.predictMousePoint((poses) => {
        // htmlElements.divElement;
        console.log(poses);
    });
}

export {
    screenScroller
}
