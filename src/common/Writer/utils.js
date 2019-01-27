import p5 from "p5";

/**
 * Função para recuperar o gesto com valores médios mais significativos
 * Isto permite a classificação de gestos em um dado instante de tempo T até um instante T + 1
 * 
 * A ideia foi retirada da seguinte dissertação de mestrado: Magalh, G. I. (2018). RECONHECIMENTO DE 
 * GESTOS DA LÍNGUA BRASILEIRA DE SINAIS ATRAVÉS DE REDES NEURAIS.
 * @param {*} gestures 
 */
function getMeanGesture(gestures) {
    
    if (gestures instanceof Array) {
        if (gestures.length > 0) {
            if (Object.keys(gestures[0]) <= 0) {
                throw Error("The gesture results object within the list must contain each of the predicted classes");
            }
        }
    }

    // Fixado em três gestos
    let gestureNames = [
        "Amigo", "Desculpa", "Telefone"
    ] 
    let gestureMeans = [];
    let gestureSums = [0, 0, 0];

    gestures.forEach((gestureObj) => {
        let index = 0;
        Object.keys(gestureObj).forEach((gesture) => {
            gestureSums[index] += gestureObj[gesture];
            index += 1;
        });
    });

    gestureSums.forEach((valueSum) => {
        gestureMeans.push(valueSum / gestureNames.length);
    });

    // Retorna o nome do gesto identificado na média
    return gestureNames[gestureMeans.indexOf(p5.prototype.max(gestureMeans))];
}

export {
    getMeanGesture
}
