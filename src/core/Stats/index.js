/**
 * Função para cálcular a média de um array
 * 
 * @see https://pt.wikipedia.org/wiki/M%C3%A9dia
 * 
 * @param {Array} arr Array de números para cálculo da média dos valores 
 * @returns {Number} Valor médio do array
 */
function mean(arr) {
    let s = 0;

    arr.forEach((value) => {
        s += value
    });
    return s / arr.length;
}

/**
 * Função para cálcular a mediana de uma array
 * 
 * @see https://pt.wikipedia.org/wiki/Mediana_(estat%C3%ADstica)
 * 
 * @param {Array} arr Array de números para cálculo da mediana dos valores 
 * @returns {Number} Valor mediano do array
 */
function median(arr) {
    let median;

    if ((arr.length % 2) === 0) {
        median = (arr[arr.length / 2] + arr[(arr.length / 2) - 1]) / 2;
    } else {
        median = arr[Math.floor(arr.length / 2)];
    }
    return median;
}

export {
    mean, median
}
