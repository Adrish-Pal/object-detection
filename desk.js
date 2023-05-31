Status = "";
objects = [];

function preload(){
    desk_img = loadImage("desk.jpg");
}

function setup(){
    canvas = createCanvas(640,400);
    canvas.center();
    canvas.position(370, 340);
    
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(desk_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(desk_img,0,0,640,400);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#0000FF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x , objects[i].y -855, objects[i].width, objects[i].height);
        }
    }
}