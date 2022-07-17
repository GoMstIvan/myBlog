
window.onload = onPageLodded




// 建立一個EventListener，如果keydown觸發就會執行以下動作
function onPageLodded(){
    document.addEventListener('keydown', handleKeyDown)
}

function handleKeyDown(event){
    var originX = snack.direction.x
    var originY = snack.direction.y
   
    if (event.keyCode === 37){
    // left arrow
    snack.direction.x = originY
    snack.direction.y = -originX
   }
   else if(event.keyCode === 39){
    // right arrow
    snack.direction.x = -originY
    snack.direction.y = originX
   }
   // right: y = x，x = -y
   // left: x = y， y = -x
}