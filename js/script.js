const bunny = document.querySelector(".bunny");
const arbusto = document.querySelector(".arbusto");
const clouds = document.querySelector(".clouds");

startAnimation();

var loop = null;
function resetGame(){
    if(loop!=null){
        clearInterval(loop);
    }
    startAnimation();
}


const move = (event) =>{
    const keyName = event.key;

    if (keyName == 'ArrowUp'){
        jump();
    }
}

document.addEventListener('keydown', (e)=>{move(e)});

function jump() {
    bunny.classList.add('jump');
    setTimeout(() => {
        bunny.classList.remove('jump');
    }, 500);
}

function startAnimation(){
    bunny.style.bottom = `-30px`;
    bunny.src = './images/bunny_walking.gif';
    arbusto.removeAttribute("style");
    clouds.removeAttribute("style");
    arbusto.classList.add('animate-arbusto');
    clouds.classList.add('animate-clouds');

    loop = setInterval(()=>{
        const cloudsPosition = arbusto.offsetLeft;
        const arbustoPosition = arbusto.offsetLeft;
        const bunnyPosition = +window.getComputedStyle(bunny).bottom.replace('px', '');

        if(arbustoPosition <= 120 && arbustoPosition >0 && bunnyPosition < 80){
            stopAnimation(arbustoPosition, bunnyPosition, cloudsPosition);        
        }
    }, 10);
}

function stopAnimation(arbustoPosition, bunnyPosition, cloudsPosition) {
    arbusto.classList.remove('animate-arbusto');
    arbusto.style.left = `${arbustoPosition}px`;

    bunny.style.bottom = `${bunnyPosition}px`;
    bunny.src = './images/death_bunny.png';

    clouds.classList.remove('animate-clouds');
    clouds.style.left = `${cloudsPosition}px`;
}
