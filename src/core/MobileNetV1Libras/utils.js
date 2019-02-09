/**
 * Função utilitário para transformar os resultados de predição da classe MobileNetV1 
 * em uma estrutura JSON
 * @param {Array} results Array com as probabilidades das classes preditas pela rede neural
 * 
 * @returns {Object} Objeto com os resultados de cada classe identificada pela Mobilenet
 */
function transformMobileNetV1LibrasResultsInJson(results) {
    return {
        amigo: results[0],
        desculpa: results[1],
        telefone: results[2]
    }
}

export {
    transformMobileNetV1LibrasResultsInJson
}
