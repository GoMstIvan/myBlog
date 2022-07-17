// 目前canvas設定大小 400x400
// 格子設定20格、每個大小20
var BLOCK_SIZE = 20
var BLOCK_COUNT = 20

var gameInterval  // 刷新速度
var snack    // 貪吃蛇
var apple   //  要吃的蘋果
var score

function gameStart(){
    // 直接宣告蛇這個物件，不用透過class
    snack = {
     body: [
      {x:BLOCK_COUNT / 2, y: BLOCK_COUNT/2}  // 蛇的初始位置在圖中間
     ],
     size: 5,
     direction: {x:0, y:-1}   // 代表預設向下移動
    }
    putApple()
    updateScore(0)
    gameInterval = setInterval(gameRoutine, 100)
    
}

function updateScore(newScore){
    score = newScore
    document.getElementById('score_id').innerHTML = score
}

function putApple(){
    // 基本上就是隨機決定蘋果座標
    apple = {
        x: Math.floor(Math.random()*BLOCK_COUNT),
        y: Math.floor(Math.random()*BLOCK_COUNT) 
    }
    // 檢查蘋果有沒有落在蛇身上
    for(var i=0; i<snack.body.length; i++){
        if (snack.body[i].x === apple.x && snack.body[i].y === apple.y){
            putApple()
            break
        }  
    }

}

function moveSnack(){
    var newBlock = {
        x: snack.body[0].x + snack.direction.x,
        y: snack.body[0].y + snack.direction.y
    }
    
    snack.body.unshift(newBlock)

    while (snack.body.length > snack.size){
        snack.body.pop()
    }
    // 邏輯: 紀錄蛇身體每個座標的變數長度，大於size的時候，丟掉最後一個位置

}

function snackIsDead(){
    // hit wall
    if (snack.body[0].x < 0){
        return true
    }
    else if (snack.body[0].x >= BLOCK_COUNT){
        return true
    }
    else if(snack.body[0].y < 0){
        return true
    }
    else if(snack.body[0].y >= BLOCK_COUNT){
        return true
    }
    
    // hit body   
    for (var i=1; i<snack.body.length; i++){  
        if (snack.body[0].x === snack.body[i].x && snack.body[0].y === snack.body[i].y){
            return true
        }
    }
    return false

}

function ggler(){
    clearInterval(gameInterval)
}

function gameRoutine(){
    moveSnack()

    // test
    // var score = document.getElementById('score_id')
    // score.textContent = snackIsDead()

    // 判斷蛇是否撞到牆
    if (snackIsDead()){
        ggler()
        return
    }
    
    // 檢查蛇有沒有碰到apple
    if (snack.body[0].x === apple.x && snack.body[0].y === apple.y){
        eatApple()
    }

    updateCanvas()
}

function eatApple(){
    snack.size += 1
    putApple()
    updateScore(score + 1)
}

function updateCanvas(){

    // test
    //var score = document.getElementById('score_id')
    //score.textContent = snack.body[0]

    var canvas = document.getElementById('canvas_id')
    var context = canvas.getContext('2d')

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = 'lime'

    for (var i=0; i < snack.body.length; i++){
        context.fillRect(
            // 這邊的單位是pixel，所以要乘上 BLOCK_SIZE
            snack.body[i].x * BLOCK_SIZE + 1,
            snack.body[i].y * BLOCK_SIZE + 1,
            BLOCK_SIZE - 1,
            BLOCK_SIZE - 1
        )
    }

    // 設定蘋果顏色
    context.fillStyle = 'red'
    context.fillRect(
        apple.x * BLOCK_SIZE + 1,
        apple.y * BLOCK_SIZE + 1,
        BLOCK_SIZE -1,
        BLOCK_SIZE -1
    )

}

/*
蛇有三個參數
Body[]   紀錄蛇身體的每個點
Size  記錄身體長度
Direction  紀錄要移動的方向
*/
