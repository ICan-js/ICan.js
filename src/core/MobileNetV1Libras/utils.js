/**
 * Função para transformar os resultados de Libras em uma estrutura JSON
 * @param {} results
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
