/**
 * Funções para auxiliar o funcionamento do sistema. Veja que, mesmo utilizando o p5.js
 * as alterações no DOM estou fazendo manualmente, isto porque, mesmo a lib do p5.dom.js
 * sendo muito legal, estou fazendo manualmente para aprender mais sobre a manipulação de DOM
 */

/**
 * Função para alterar a posição de uma div
 * @param {HTMLElement} div div que será movida para a nova posição 
 */
function changeDivPosition(div, x, y) {
    div.style.position = "absolute";

    div.style.left = x + "px";
    div.style.top = y + "px";
}

/**
 * Função para adicionar uma div na página
 * @param {String} className Nome da classe que a nova div terá 
 */
function createDiv(className) {    
    let div = document.createElement("div");
    div.className = className;

    // Inserindo elemento na página
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(div);

    return div;
}

/**
 * Função para configurar o elemento de vídeo utilizado nas classificações. Para utilizar esta função
 * é necessário ter um elemento de vídeo com o ID igual a "videoElementICJS"
 * @param {Number} videoHeight Altura da janela de vídeo que será criada
 * @param {Number} videoWidth Largura da janela de vídeo que será criada
 * @param {Number} isHidden Flag para indicar se o elemento de vídeo criado deve ou não ser oculto
 */
function setupVideo(videoHeight=180, videoWidth=180, isHidden=true) {
    let videoCapture = document.getElementById("videoElementICJS");
    
    if (videoCapture === null) {
        throw Error("You need to add an element with videoElementICJS id in your HTML code");
    }

    videoCapture.height = videoHeight;
    videoCapture.width = videoWidth;
    videoCapture.hidden = isHidden;

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            videoCapture.srcObject = stream;
        }).catch((error) => {
            alert(error);
        });
    }

    return videoCapture;
}

export {
    getGestureNameFromPredict, setupVideo, createDiv, changeDivPosition
}
