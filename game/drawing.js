let c = document.getElementById("hangmanCanvas");
let ctx = c.getContext("2d");

function resetDraw(){
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
}

function drawGallows1(){
    ctx.moveTo(50, 350);
    ctx.lineTo(150, 350);
    ctx.stroke();
}

function drawGallows2(){
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.stroke();
}

function drawGallows3(){
    ctx.lineTo(250, 50);
    ctx.stroke();
}

function drawGallows4(){
    ctx.moveTo(250, 50);
    ctx.lineTo(250, 100);
    ctx.stroke();
}

function drawHead() {
    ctx.beginPath();
    ctx.arc(250, 130, 30, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawBody() {
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(250, 250);
    ctx.stroke();
}

function drawLeftArm(){
    ctx.beginPath();
    ctx.moveTo(250, 170);
    ctx.lineTo(200, 230);
    ctx.stroke();
}

function drawRightArm(){
    ctx.beginPath();
    ctx.moveTo(250, 170);
    ctx.lineTo(300, 230);
    ctx.stroke();
}

function drawLeftLeg(){
    ctx.beginPath();
    ctx.moveTo(250,250);
    ctx.lineTo(220, 320);
    ctx.stroke();
}

function drawRightLeg(){
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(280, 320);
    ctx.stroke();
}
