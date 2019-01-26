import p5 from "p5";

import { PoseNet, Regression } from "../../core";
import { createDiv, setupVideo, changeDivPosition} from "../../utils";
import { mean, median } from "../../core/Stats/index";


/**
 * Função para aplicar estilo padrão a uma div
 * @param {*} div 
 */
function applyDivScrollerStyle(div) {
    div.style.display = "block";
    div.style.borderRadius = "20px";
    div.style.transformOrigin = "10px 10px";
    div.style.height = "20px";
    div.style.width = "20px";
    div.style.backgroundColor = "blue";   
    
    return div;
}

/**
 * Facade para a utilização do PoseNet em Screen Scrollers
 * @param {*} posenet 
 * @param {*} regressionModel 
 * @param {*} filter 
 */
function screenScroller(regressionModel, filter=null) {
    
    if (!(regressionModel instanceof Regression)) {
        throw new Error("regressionModel must be a generalization of Regression");
    }

    if (regressionModel.modelX === null || regressionModel.modelY === null) {
        throw new Error("regressionModel must be trained before starting this process");
    }

    let filterFunction = null;
    if (filter !== null) {
        if (filter.name === "mean") {
            filterFunction = mean;
        } else if (filter.name === "median") {
            filterFunction = median;
        } else {
            throw new Error("The filter function specified is not valid, use medium or medium");
        }

        // Aplicando filtro
        regressionModel.setFilter({
            delay: filter.delay,
            apply: filterFunction
        });
    }

    new p5(function(sketch) {

        let poses = null;
        let pointer = null;
        let posenet = null;
        let videoCapture = null;

        sketch.setup = function() {
            videoCapture = setupVideo();
            pointer = createDiv("pointer");
            pointer = applyDivScrollerStyle(pointer);
            
            posenet = new PoseNet(videoCapture);
            posenet.trackSingleUser();

            posenet.on("poses", (result) => {
                poses = result;
            });
        };

        sketch.draw = function() {
            if (poses !== null) {
                let nose = poses.keypoints[0];

                let posObj = regressionModel.inferMousePosition(nose);
                changeDivPosition(pointer, posObj.x, posObj.y);

                // Lógica para a criação do Scrolling
                // Obrigado ao OzRamos :smile:
                if (posObj.y < 0) {
                    window.scrollTo(0, window.scrollY + posObj.y * 0.05);
                } else if (posObj.y > window.innerHeight) {
                    window.scrollTo(0, window.scrollY + (posObj.y - window.innerHeight) * 0.05);
                }
            }
        };
    });
}

export {
    screenScroller
}
