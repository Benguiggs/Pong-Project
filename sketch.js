const RESOLUTION = {x: 800, y: 600}
var keyboardStatus = {
    player1up: false,
    player1down: false,
    player2up: false,
    player2down: false
}
var scorePlayer1 = 0
var scorePlayer2 = 0
var posBall = {x: RESOLUTION.x / 2, y: RESOLUTION.y / 2}
var movBall = {x: 0, y: 0}
var posPlayer1 = {x: 20, y: RESOLUTION.y / 2}
var posPlayer2 = {x: RESOLUTION.x - 30, y: RESOLUTION.y / 2}

function setup() {
    createCanvas(RESOLUTION.x, RESOLUTION.y)
    background(42)
    frameRate(45)
    angleMode(DEGREES)
    initBall()
}

function initBall() {
    posBall = {x: RESOLUTION.x / 2, y: RESOLUTION.y / 2}
    var r = 0
    if (Math.random() > 0.5) { //on part à droite
        r = (Math.random() * 90) - 45
    } else {//on part à gauche
        r = (Math.random() * 90) + 135
    }
    movBall.x = (cos(r) * 10)
    movBall.y = (sin(r) * 10)

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        keyboardStatus.player2up = true
    } else if (keyCode === DOWN_ARROW) {
        keyboardStatus.player2down = true
    }

    if (keyCode === 65) {
        keyboardStatus.player1up = true
    } else if (keyCode === 81) {
        keyboardStatus.player1down = true
    }
    
}

function keyReleased() {
    if (keyCode === UP_ARROW) {
        keyboardStatus.player2up = false
    } else if (keyCode === DOWN_ARROW) {
        keyboardStatus.player2down = false
    }

    if (keyCode === 65) {
        keyboardStatus.player1up = false
    } else if (keyCode === 81) {
        keyboardStatus.player1down = false
    }
}

function updateGame() {
    if (keyboardStatus.player1up) {
        if (posPlayer1.y >= 0) {
            posPlayer1.y -= 10
        }
    }
    if (keyboardStatus.player1down) {
        if (posPlayer1.y <= 480) {
            posPlayer1.y += 10
        }
        
    }
    if (keyboardStatus.player2up) {
        if (posPlayer2.y >= 0) {
            posPlayer2.y -= 10
        }

    }
     if (keyboardStatus.player2down) {
        if (posPlayer2.y <= 480) {
            posPlayer2.y += 10
        }
    }
    if (posBall.x <= 0) {
        scorePlayer2++
        initBall()
    }
    if (posBall.x >= 800) {
        scorePlayer1++
        initBall()
    }
    


    if (posBall.y - 10 <= 0 || posBall.y + 10 >= 600) {
        // collision avec haut ou bas
        movBall.y = 0 - movBall.y
        console.log('collision y')
    } 
    
    if ((posBall.x - 10 <= 30 && posBall.y > posPlayer1.y && posBall.y < (posPlayer1.y + 120)) //collision à gauche
        || (posBall.x + 10 >= 770 && posBall.y > posPlayer2.y && posBall.y < (posPlayer2.y + 120)) //collision à droite
        ) {
        movBall.x = 0 - movBall.x
        console.log('collision x')
    }
    console.log(movBall)
    console.log(posBall)
        

    posBall.x = posBall.x + movBall.x
    posBall.y = posBall.y + movBall.y

    
}

function draw() {
    updateGame()
    background(42)
    stroke('white')
    fill('white')
    circle (posBall.x, posBall.y, 10)
    rect (posPlayer1.x, posPlayer1.y, 10, 120)
    rect (posPlayer2.x, posPlayer2.y, 10, 120)
    textSize(32);
    strokeWeight(1);
    textAlign(CENTER, TOP);
    text(scorePlayer1, 300, 12);
    text(scorePlayer2, 500, 12);
}
