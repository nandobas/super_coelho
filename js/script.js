const bunny = document.querySelector(".bunny");
const arbusto = document.querySelector(".arbusto");
const clouds = document.querySelector(".clouds");
const userscore = document.querySelector(".label-score");
var gameRun = false;

class classDataset{
    classLevel = {arbusto:'animate-arbusto-level-1'};
    level = 1;
    score = 0;
}
var datasetUser = new classDataset()

const loop = setInterval(()=>{
    const cloudsPosition = arbusto.offsetLeft;
    const arbustoPosition = arbusto.offsetLeft;
    const bunnyBottom = +window.getComputedStyle(bunny).bottom.replace('px', '');

    if(arbustoPosition <= 180 && arbustoPosition >0){
        if(bunnyBottom < 80){
            stopAnimation(arbustoPosition, bunnyBottom, cloudsPosition);
        }
    }
    if(gameRun)
    switch (datasetUser.level) {
        case 1:     
            if(arbustoPosition >=0 && arbustoPosition <=20){
                incrementScore();
            }
            break;
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

function incrementScore(){
    datasetUser.score ++;
    userscore.innerHTML = datasetUser.score; 
    if(datasetUser.score == 100){
        incrementLevel()
    }
}

function incrementLevel(){
    arbusto.classList.remove( datasetUser.classLevel.arbusto );
    datasetUser.level++;
    datasetUser.classLevel.arbusto = 'animate-arbusto-level-'+datasetUser.level;
    arbusto.classList.add( datasetUser.classLevel.arbusto );
}

function startAnimation(){
    gameRun = true;
    datasetUser.score = 0;
    datasetUser.level = 1;
    datasetUser.classLevel.arbusto = `animate-arbusto-level-1`;

    bunny.style.bottom = `-30px`;
    bunny.src = './images/bunny_walking.gif';
    arbusto.removeAttribute("style");
    clouds.removeAttribute("style");
    arbusto.classList.add( datasetUser.classLevel.arbusto );
    clouds.classList.add('animate-clouds');
}

function stopAnimation(arbustoPosition, bunnyBottom, cloudsPosition) {
    console.log(datasetUser);
    gameRun = false;
    arbusto.classList.remove( datasetUser.classLevel.arbusto );
    arbusto.style.left = `${arbustoPosition}px`;

    bunny.style.bottom = `${bunnyBottom}px`;
    bunny.src = './images/death_bunny.png';

    clouds.classList.remove('animate-clouds');
    clouds.style.left = `${cloudsPosition}px`;
}


startAnimation();
//event listeners
document.addEventListener('keydown', (e)=>{move(e)});
