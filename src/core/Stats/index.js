/**
 * Função para cálcular a média de um array
 * @param {*} arr 
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
 * @param {} arr 
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
