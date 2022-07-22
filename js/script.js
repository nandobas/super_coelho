const bunny = document.querySelector(".bunny");
const arbusto = document.querySelector(".arbusto");
const clouds = document.querySelector(".clouds");

const loop = setInterval(()=>{
    const cloudsPosition = arbusto.offsetLeft;
    const arbustoPosition = arbusto.offsetLeft;
    const bunnyBottom = +window.getComputedStyle(bunny).bottom.replace('px', '');

    if(arbustoPosition <= 180 && arbustoPosition >0 && bunnyBottom < 80){
        stopAnimation(arbustoPosition, bunnyBottom, cloudsPosition);        
    }
}, 10);

const move = (event) =>{
    const keyName = event.key;
    if (keyName == 'ArrowUp'){
        bunnyJump();
    }
}

function bunnyJump() {
    bunny.classList.add('bunny-jump');
    setTimeout(() => {
        bunny.classList.remove('bunny-jump');
    }, 500);
}

function startAnimation(){
    bunny.style.bottom = `-30px`;
    bunny.src = './images/bunny_walking.gif';
    arbusto.removeAttribute("style");
    clouds.removeAttribute("style");
    arbusto.classList.add('animate-arbusto');
    clouds.classList.add('animate-clouds');
}

function stopAnimation(arbustoPosition, bunnyBottom, cloudsPosition) {
    arbusto.classList.remove('animate-arbusto');
    arbusto.style.left = `${arbustoPosition}px`;

    bunny.style.bottom = `${bunnyBottom}px`;
    bunny.src = './images/death_bunny.png';

    clouds.classList.remove('animate-clouds');
    clouds.style.left = `${cloudsPosition}px`;
}


startAnimation();
//event listeners
document.addEventListener('keydown', (e)=>{move(e)});
