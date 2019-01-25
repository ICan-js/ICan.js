import p5 from "p5";

import { setupVideo } from "../../utils";
import { PoseNet } from "../../core/PoseNet/index";
import { Regression } from "../../core/Regression/index";
import { CalibrationAPI } from "../../core/CalibrationAPI/index";

/**
 * Função para calibrar modelo de regressão que será utilizado nos métodos de 
 * controle do mouse com o nariz
 */
function calibrate(regressionModel, fnc) {
    if (!(regressionModel instanceof Regression)) {
        throw TypeError("The regression model must be a generalization of Regression");
    }

    if (typeof fnc !== "function") {
        throw TypeError("The return must be represented by a function!");
    }
    
    // p5 in instance mode
    new p5(function(sketch) {
        
        let poses = null;
        let posenet = null;
        let videoCapture;
        let calibrationAPI;
        
        sketch.setup = function() {
            sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);

            videoCapture = setupVideo();

            calibrationAPI = new CalibrationAPI(sketch);
            calibrationAPI.displayEllipses();

            calibrationAPI.on("finish", (pointStorage) => {
                let xDataset = [];
                let yDataset = [];

                // Separa os dados de cada dataset
                Object.keys(pointStorage).forEach((pointName) => {
                    pointStorage[pointName].forEach((data) => {
                        xDataset.push([data.nosePoint.x, data.mousePoint.x]);
                        yDataset.push([data.nosePoint.y, data.mousePoint.y]);
                    });
                });
                
                // Treina o modelo
                regressionModel.trainModel(xDataset, yDataset);
                
                // Envinado o modelo de regressão treinado para o callback
                fnc(regressionModel);
            });

            posenet = new PoseNet(videoCapture);
            posenet.trackSingleUser();

            posenet.on("poses", (result) => {
                poses = result;
            });
        }

        sketch.draw = function() {
            sketch.strokeWeight(3);
            sketch.stroke(51);
        }
        
        sketch.mousePressed = function() {
            if (poses !== null) {
                let noseObj = {
                    x: poses.keypoints[0].position.x,
                    y: poses.keypoints[0].position.y
                }
                
                let mouseObj = {
                    x: sketch.mouseX,
                    y: sketch.mouseY
                }
                calibrationAPI.isInEllipse(mouseObj, noseObj);
            } 
        }
    });
}

export {
    calibrate
}
