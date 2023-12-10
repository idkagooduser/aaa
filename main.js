music="";
music2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
status1="";
status2="";

function song(){

}

function preload(){
music=loadSound("music.mp3");
music2=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(500,350);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
   
    
}

function draw(){
    image(video, 0,0,500,350);
    status1=music.isPlaying();
    status2=music2.isPlaying();

    fill("#b53626");
    stroke("#b53626");

    if(scoreLeftWrist>0.2){
       
        circle(leftWristX, leftWristY, 20);
        music2.stop();
        if(status1.isPlaying==false){
        music.play();
        document.getElementById("songname").innerHTML="Playing Peter Pan Theme.";
        }
    }



    if(scoreRightWrist>0.2){
       
        circle(rightWristX, rightWristY, 20);
        music.stop();
        if(status2.isPlaying==false){
        music2.play();
        document.getElementById("songname").innerHTML="Playing Harry Potter Theme.";
        }
    }

}

function modelLoaded(){
console.log('model is ready');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log('left wrist X is', leftWristX, 'and left wrist Y is', leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('right wrist X is', rightWristX, 'and right wrist Y is', rightWristY);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
    }
}