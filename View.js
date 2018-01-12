"use strict";
function View(){

    this.init = function(){

        var canvas = document.getElementById("myCanvas"),
            ctx = canvas.getContext("2d"),
            width = canvas.width = window.innerWidth,
            height = canvas.height = window.innerHeight;

        var ballXcoord = width * 0.50,
            ballYcoord = height * 0.50,
            newXcoord = 2,
            newYcoord = -2,
            r = width * 0.04;

        var paddleX = width  * 0.40,
            paddleY = height * 0.85,
            paddleWidth = width * 0.20,
            paddleHeight = height * 0.02;


        if(window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(event) {
                var tilt = event.gamma * 0.5;
                    if((paddleX + tilt)>0 && (paddleX + tilt + paddleWidth) < width){
                        paddleX += tilt;
                    }
            });
        }

        this.drawBall = function() {
            ctx.beginPath();
            ctx.arc(ballXcoord, ballYcoord, r, 0, Math.PI*2);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
        };

        this.drawPaddle = function() {
            ctx.beginPath();
            ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.closePath();
        };


        this.draw = function() {
            ctx.clearRect(0, 0, width, height);
            drawBall();
            drawPaddle();
            ballXcoord += newXcoord;
            ballYcoord += newYcoord;

            paddleCollision();
            wallCollision();

        };
        
        setInterval(draw, 10);

        this.paddleCollision = function(){
            if(ballYcoord + r > paddleY){
                if((ballXcoord - r < paddleX + paddleWidth) && (ballXcoord + r > (paddleX))){        
                    newYcoord = -newYcoord;
                } 
            }
        };

        this.wallCollision = function(){
            if(ballXcoord + newXcoord > width-r || ballXcoord + newXcoord < r){
                newXcoord = -newXcoord;
            }
            if(ballYcoord + newYcoord > height-r || ballYcoord + newYcoord < r) {
                newYcoord = -newYcoord;
            }      
        };
    };
}