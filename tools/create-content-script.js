
function getRandomInt(from, to) { 
    return from + Math.floor(Math.random() * (to - from));    
}

function getRandomLowerCaseLetter() {
    return String.fromCharCode(97 + getRandomInt(0,26))
}

function getRandomUpperCaseLetter() {
    return String.fromCharCode(65 + getRandomInt(0,26))
}


function getAWord(length) {
    let w = "";

    for (let i = 0; i < length; i++) {
        w += getRandomLowerCaseLetter();
    }

    return w;
}

function getCapitalWord(length) {
    let w = getRandomUpperCaseLetter();

    for (let i = 0; i < length - 1; i++) {
        w += getRandomLowerCaseLetter();
    }

    return w;
}

function getASentence(length) {
    let sen = getCapitalWord(getRandomInt(1, 6));

    for(let i = 0; i < length; i++){
        sen += " " + getAWord(getRandomInt(1,6));
    }

    sen += ".";

    return sen;
}

function getAParagraph(length) {
    let par = getASentence(getRandomInt(5, 13)); 

    for(let i = 0; i < length - 1; i++){
        par += " " + getASentence(getRandomInt(5, 13));
    }

    return par;
}
