import p5 from "p5";

/**
 * Método para recuperar o nome da classe predito pelos classificadores de Libras
 */
function getGestureNameFromPredict(predict) {
    const classes = ["Amigo", "Desculpa", "Telefone"];

    return classes[predict.indexOf(p5.prototype.max(Array.from(predict)))];
}

/**
 * Função para configurar o elemento de vídeo utilizado nas classificações
 * @param {*} videoElementName 
 */
function setupVideo() {
    let videoCapture = document.getElementById("videoElementICJS");
    
    if (videoCapture === null) {
        throw Error("You need to add an element with videoElementICJS id in your HTML code");
    }

    videoCapture.height = 180;
    videoCapture.width = 180;
    videoCapture.hidden = true;

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
    getGestureNameFromPredict, setupVideo
}
