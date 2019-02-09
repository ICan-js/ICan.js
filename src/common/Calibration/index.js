import p5 from "p5";

import { setupVideo } from "../../utils";
import { PoseNet } from "../../core/PoseNet/index";
import { Regression } from "../../core/Regression/index";
import { CalibrationAPI } from "../../core/CalibrationAPI/index";

/**
 * Facade para a API de calibração de modelo de regressão que será utilizado nos métodos de 
 * controle do mouse com o nariz. Aqui básicamente são captados uma quantidade X (Por padrão 15) de pontos 
 * pontos do mouse do usuário e também da posição de seu nariz e então com estes dados criar um modelo de
 * regressão (Definido pelo usuário) que será devolvido através da função de callback.
 * 
 * @param {Regression} regressionModel Modelo de regressão que deverá ser utilizado no projeto
 * @param {Function} fncFinish Função que será utilizada para entragar o modelo de regressão calibrado
 * @param {Function} fncUpdate Função que será utilizada sempre que um ponto for atualizado
 * @param {Object} calibrationOptions Opções que podem mudar os objetos do CANVAS de calibração
 * @param {Number} calibrationOptions.pointSize Tamanho das elipses a serem exibidas na calibração 
 * @param {Number} calibrationOptions.pointsToStorage Quantidade de pontos que devem ser armazenados de cada elipse
 */
function calibrate(regressionModel, fncFinish, fncUpdate, calibrationOptions=null) {
    if (!(regressionModel instanceof Regression)) {
        throw TypeError("The regression model must be a generalization of Regression");
    }

    if (typeof fncFinish !== "function" || typeof fncUpdate !== "function") {
        throw TypeError("The fncFinish|fncUpdate must be represented by a function!");
    }

    if (calibrationOptions === null) {
        calibrationOptions = {
            pointSize: 20,
            pointsToStorage: 15
        }
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

            calibrationAPI = new CalibrationAPI(sketch, 
                                calibrationOptions.pointSize, calibrationOptions.pointsToStorage);
            calibrationAPI.displayEllipses();

            calibrationAPI.on("update", fncUpdate);
            calibrationAPI.on("finish", (pointStorage) => {
                if (regressionModel.modelX === null && regressionModel.modelY === null) {
                    let xDataset = [];
                    let yDataset = [];

                    // Separa os dados de cada dataset
                    Object.keys(pointStorage).forEach((pointName) => {
                        pointStorage[pointName].forEach((data) => {
                            xDataset.push([data.nosePoint.x, data.mousePoint.x]);
                            yDataset.push([data.nosePoint.y, data.mousePoint.y]);
                        });
                    });
                    regressionModel.trainModel(xDataset, yDataset);
                }
                
                // Desativando o canvas
                sketch.mousePressed = null;
                sketch.draw = null;

                // Enviando o modelo de regressão treinado para o callback
                fncFinish(regressionModel);
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
