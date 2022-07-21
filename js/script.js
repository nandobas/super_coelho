const bunny = document.querySelector(".bunny");
const arbusto = document.querySelector(".arbusto");
const clouds = document.querySelector(".clouds");

const jump = () =>{
    console.log(bunny);
    bunny.classList.add('jump');

    setTimeout(()=>{
        bunny.classList.remove('jump');
    }, 500 );
}

const loop = setInterval(()=>{
    const cloudsPosition = arbusto.offsetLeft;
    const arbustoPosition = arbusto.offsetLeft;
    const bunnyPosition = +window.getComputedStyle(bunny).bottom.replace('px', '');

    if(arbustoPosition <= 120 && arbustoPosition >0 && bunnyPosition < 80){
        stopAnimation(arbustoPosition, bunnyPosition, cloudsPosition);        
    }
}, 10);

document.addEventListener('keydown', jump);

function stopAnimation(arbustoPosition, bunnyPosition, cloudsPosition) {
    arbusto.style.animation = 'none';
    arbusto.style.left = `${arbustoPosition}px`;

    bunny.style.animation = 'none';
    bunny.style.bottom = `${bunnyPosition}px`;
    bunny.src = './images/death_bunny.png';

    clouds.style.animation = 'none';
    clouds.style.left = `${cloudsPosition}px`;
}
