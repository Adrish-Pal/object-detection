Status = "";
objects = [];

function preload(){
    guitar_chair_img = loadImage("chair and guitar.jpg");
}

function setup(){
    canvas = createCanvas(600,460);
    canvas.center();
    canvas.position(370, 290);
    
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(guitar_chair_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(guitar_chair_img,0,0,600,460);

    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill(" #00FF00");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x -310, objects[i].y - 190);
            noFill();
            stroke(" #00FF00");
            rect(objects[i].x -500, objects[i].y -210, objects[i].width, objects[i].height);
        }
    }
}