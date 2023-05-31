Status = "";
objects = [];

function preload(){
    books_bottles_img = loadImage("books and bottles.jpg");
}

function setup(){
    canvas = createCanvas(640,410);
    canvas.center();
    canvas.position(370, 330);
    
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(books_bottles_img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(books_bottles_img,0,0,640,410);

    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 1650, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}