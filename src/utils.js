/**
 * Função para encontrar o valor máximo de um array
 * @param {*} arr 
 */
function maxArray(arr) {
    return Math.max.apply(this, arr);
}

/**
 * Método para recuperar o nome da classe predito pelos classificadores de Libras
 */
function getClassNameFromPredict(predict) {
    const classes = ["Amigo", "Desculpa", "Telefone"];

    return classes[predict.indexOf(maxArray(Array.from(predict)))];
}

export {
    getClassNameFromPredict
}
