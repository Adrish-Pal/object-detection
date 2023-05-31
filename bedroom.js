Status = "";
objects = [];

function preload(){
    bedroom_img = loadImage("bedroom.jpg");
}

function setup(){
    canvas = createCanvas(700,440);
    canvas.center();
    canvas.position(360, 300);
    
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bedroom_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(bedroom_img,0,0,700,440);

    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x +15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
