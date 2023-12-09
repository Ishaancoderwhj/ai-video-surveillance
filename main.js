video="";
status="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function draw(){
    image(video,0,0,480,380);

    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Objects Detected";
            document.getElementById("objects").innerHTML="No. of objects detected are: "+objects.length;
            
            fill("#9c0303");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#9c0303");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        objects=results;
    }
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
    
}