const matrixChars     = "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ{}<>[]!@#$%^&*()~/\\.,;";
const matrixCharSize  = 24;
const matrixCharColor = '#bf00ff';
var   matrixColomns   = null;
var   matrixCanvas    = null;
var   matrixCtx       = null;
var   matrixDrops     = [];

// Credits: https://codepen.io/yaclive/pen/EayLYO

matrixSetup = () => {
    const canvas = document.createElement('canvas');

    canvas.classList.add('hippo_canvas');
    canvas.id = 'hippo_canvas';
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    const first = body.firstElementChild;
    first.parentNode.insertBefore(canvas, first);

    matrixColomns = window.innerWidth / matrixCharSize;
    for (let i = 0; i < matrixColomns; i++) {
        matrixDrops[i] = 1;
    }

    matrixCanvas = canvas;
    matrixCtx = canvas.getContext('2d');
};

matrixChar = () => {
    return matrixChars[Math.floor(Math.random() * matrixChars.length)];
};

matrixUpdate = () => {
    if (matrixCanvas == null) {
        return;
    }

    if (matrixCtx == null) {
        return;
    }

    let canvas = matrixCanvas;
    let ctx = matrixCtx;

    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < matrixDrops.length; i++) {
        let char = matrixChar();

        ctx.font = '24pt Source Code Pro';
        ctx.fillStyle = matrixCharColor;
        ctx.fillText(char, i * matrixCharSize, matrixDrops[i] * matrixCharSize);

        matrixDrops[i]++;

        if (matrixDrops[i] * matrixCharSize > canvas.height && Math.random() > .95) {
            matrixDrops[i] = 0;
        }
    }
};

matrixResize = () => {
    if (matrixCanvas == null) {
        return;
    }

    let canvas = matrixCanvas;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    matrixColomns = window.innerWidth / matrixCharSize;
    for (let i = 0; i < matrixColomns; i++) {
        matrixDrops[i] = 1;
    }

    matrixCanvas = canvas;
    matrixCtx = canvas.getContext('2d');
};

matrix = () => {
    matrixSetup();
    setInterval(matrixUpdate, 35);
    window.addEventListener('resize', matrixResize);
};

style = () => {
    let elements = document.getElementsByTagName("*");
    
    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        let elementStyle = getComputedStyle(element);

        console.log(elementStyle.background);
    }

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css';
    link.media = 'all';
    head.appendChild(link);
};

(() => {
    matrix();
    style();
})();