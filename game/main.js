//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width=400;
canvas.height=700;

document.body.appendChild(canvas)

//우주선 좌표
let spaceImgX = canvas.width/2 - 24;
let spaceImgY = canvas.height - 48;

let bgImg, spaceImg, bulletImg, enemyImg, gameOverImg
let gameOver=false;
let score=0;

let bulletList = [];

function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init=function(){
        this.x = spaceImgX+12;
        this.y = spaceImgY;
        this.alive=true;
    }
    bulletList.push(this);
    this.update = function () {
        this.y -= 7;
    }

    this.checkHit = function(){

        for(let i=0; i < enemyList.length; i++){
            if(this.y <= enemyList[i].y+24 && this.x>enemyList[i].x && this.x<=enemyList[i].x+48){
                score++;
                this.alive = false;
                enemyList.splice(i,1)
            }
        }
        
    }
}

function generateRandomValue(min, max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum
}

let enemyList = [];

function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function() {
        this.y = 0;
        this.x =generateRandomValue(0, canvas.width - 48);
        enemyList.push(this);
    };
    this.update = function(){
        this.y += 5; //달떨어지는 속도

        if (this.y >= canvas.height - 46){
            gameOver = true;
            console.log("gameOver")
        }
    }
}

function loadImg(){
    bgImg = new Image();
    bgImg.src="img/bg.jpg"
    spaceImg = new Image();
    spaceImg.src="img/spaceship.png"
    bulletImg = new Image();
    bulletImg.src="img/bullet.png"
    enemyImg = new Image();
    enemyImg.src="img/moon.png"
    gameOverImg = new Image();
    gameOverImg.src="img/gameover.png"
}

let keysDown = {}

function setUpKeyboard() {
    document.addEventListener("keydown",function(event){
        keysDown[event.key]=true
        console.log("키다운:",keysDown)
    });
    document.addEventListener("keyup",function(){
        delete keysDown[event.key]
        console.log("키다운:",keysDown)
        if (event.key == " "){
            createBullet()
        }
    })
}

function createBullet(){
    let b = new Bullet;
    b.init();
}

function createEnemy() {
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    } , 1000)
}

function update(){
    if('ArrowRight' in keysDown && spaceImgX < canvas.width - 53){
        spaceImgX += 5;
    }
    if('ArrowLeft' in keysDown && spaceImgX > 5){
        spaceImgX -= 5;
    }

    for (let i=0; i<bulletList.length;i++){
        if(bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
        }
    }

    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
    }



}

function render(){
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceImg, spaceImgX, spaceImgY-20);
    ctx.fillText('SCORE:'+score ,20, 40);
    ctx.fillStyle='white';
    ctx.font="25px notosans";
    for (let i=0; i<bulletList.length;i++){
        if (bulletList[i].alive){
        ctx.drawImage(bulletImg,bulletList[i].x,bulletList[i].y);
        }
    }
    
    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImg,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
    if(!gameOver){
    update(); //좌표값 업데이트
    render(); //그려주기
    requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameOverImg,10,100,380,380);
    }

}

loadImg();
createEnemy();
setUpKeyboard();
main();

