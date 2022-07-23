const bunny = document.querySelector(".bunny");
const arbusto = document.querySelector(".arbusto");
const clouds = document.querySelector(".clouds");
const userscore = document.querySelector(".label-score");
var gameRun = false;

class classDataset{
    classLevel = {arbusto:'animate-arbusto-level-1'};
    level = 1;
    startDateTime = new Date('01/01/2022 00:00:01');
    endDateTime = new Date('01/01/2022 23:59:59');
    dif = 0;
}
var datasetUser = new classDataset()
class DateTimeDiference{
    constructor(startDate, endDate) {
        this.diference = endDate - startDate;
        var _segundo = 1000;
        var _minuto = _segundo * 60;
        var _hora = _minuto * 60;
        var _dia = _hora * 24;

        this.dias = Math.floor(this.diference / _dia);
        this.horas = Math.floor((this.diference % _dia) / _hora);
        this.minutos = Math.floor((this.diference % _hora) / _minuto);
        this.segundos = Math.floor((this.diference % _minuto) / _segundo);
        this.milisegundos = Math.floor(this.diference % _segundo );
    }
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const loop = setInterval(()=>{
    const cloudsPosition = arbusto.offsetLeft;
    const arbustoPosition = arbusto.offsetLeft;
    const bunnyBottom = +window.getComputedStyle(bunny).bottom.replace('px', '');

    if(gameRun){
        if(arbustoPosition <= 180 && arbustoPosition >0){
            if(bunnyBottom < 80){
                stopAnimation(arbustoPosition, bunnyBottom, cloudsPosition);
            }
        }    
        datasetUser.endDateTime = new Date();
        dif = new DateTimeDiference(datasetUser.startDateTime, datasetUser.endDateTime);
        dateTimeScore = pad(dif.minutos, 2) + ':' +  pad(dif.segundos, 2) + ':' + dif.milisegundos.toString().substring(2,0);
        userscore.innerHTML = dateTimeScore;        
    }

}, 10);

const checkLevel = setInterval(()=>{    
    datasetUser.endDateTime = new Date();
    diference = new DateTimeDiference(datasetUser.startDateTime, datasetUser.endDateTime);        

    if(gameRun && diference.segundos==30){
        incrementLevel();
    }

}, 1000);

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

function incrementLevel(){
    arbusto.classList.remove( datasetUser.classLevel.arbusto );
    arbusto.removeAttribute("style");
    datasetUser.level++;
    datasetUser.classLevel.arbusto = `animate-arbusto-level-${datasetUser.level}`;
    arbusto.classList.add( datasetUser.classLevel.arbusto );
}

function startAnimation(){
    gameRun = true;
    datasetUser.startDateTime = new Date();
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
