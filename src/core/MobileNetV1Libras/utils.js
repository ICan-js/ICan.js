/**
 * Função utilitário para transformar os resultados de predição da classe MobileNetV1 
 * em uma estrutura JSON
 * @param {Array} results Array com as probabilidades das classes preditas pela rede neural
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
