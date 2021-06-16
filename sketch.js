//Create variables here
var dog,happyDog,database,foodS,foodStock,milkBottle;
var addFoodB,feedFoodB;
var fedTime,lastFed;
var foodObj;
var readState, gameStateS
var bedroomI, washroomI, gardenI,livingroomI
var gameState=0
function preload()
{
	dog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
  milkBottle=loadImage("milk.png");
  bedroomI=loadImage("Bed Room.png")
  gardenI=loadImage("Garden.png");
  washroomI=loadImage("Wash Room.png")
  livingroomI=loadImage("Living Room.png")
}



function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  
  dog1=createSprite(800,200,150,150)
  


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  foodObj=new Food();
  //Buttons:
  //(i)
  feedFoodB=createButton("feed Dog");
     feedFoodB.position(700,100);
    feedFoodB.mousePressed(feedDog);
  //(ii)
  addFoodB=createButton("Add food")
  addFoodB.position(800,100);
  addFoodB.mousePressed(addFood);
  
  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val();
  })

  
   
}


function draw() {  

   background(46,139,87);
      
   
   
     fedTime=database.ref('feedTime');
     fedTime.on("value",function(data){
       lastFed=data.val();
     })
       

     fill(255,255,254);
     textSize(15);
     if(lastFed>=12){
       text("last Fed:"+lastFed%12+"PM",250,30);
     }
     else if(lastFed==0){
       text("Last Fed: 12 AM",350,30 );
     }

     else{
       text("Last Feed:"+lastFed+"AM",350,30);
     }


     
     
     
     var hungry=createButton("I need Food!")
     hungry.position(400,125)
     if(hungry.mousePressed(function(){
       gameState=1
       
       database.ref('/').update({'gameState':gameState})
     }))

     var Bath=createButton("I want to take Bath!")
     Bath.position(580,125)
     if(Bath.mousePressed(function(){
       gameState=3
       
       database.ref('/').update({'gameState':gameState})
     }))

     

     var sleep=createButton("I want to have rest")
     sleep.position(710,125)
     if(sleep.mousePressed(function(){
       gameState=4
       database.ref('/').update({'gameState':gameState})
     }))
     


     var play=createButton("Let's Play!")
     play.position(500,160)
     if(play.mousePressed(function(){
       gameState=5
       database.ref('/').update({'gameState':gameState})
     }))
     

     var playOut=createButton("let's Play Outside!")
     playOut.position(585,160)
     if(playOut.mousePressed(function(){
       gameState=6
       database.ref('/').update({'gameState':gameState})
     }))

     
      
     

     
     

     

     
     
     
     
     
      
     
     
       if(gameState===3){
        dog1.addImage(washroomI)
        dog1.scale=0.6
      milkBottle.visible=false
      feedFoodB.hide();
       addFoodB.hide();
      }
      if(gameState===4){
        dog1.addImage(bedroomI)
        dog1.scale=0.6
        feedFoodB.hide();
        addFoodB.hide();
      foodObj.visible=false
      }
      if(gameState===5){
        dog1.addImage(livingroomI)
        dog1.scale=0.6
        feedFoodB.hide();
        addFoodB.hide();
      foodObj.visible=false
      } 
      if(gameState===6){
        dog1.addImage(gardenI)
        dog1.scale=0.6
        feedFoodB.hide();
        addFoodB.hide();
      foodObj.visible=false
      }
      if(gameState===1){
        dog1.addImage(dog) 
        dog1.scale=0.4
       foodObj.visible=true
       feedFoodB.show();
        addFoodB.show();
        
        if(foodStock<=0){
          foodStock=0
        }
        if(foodStock>=1){
         foodStock=1
       }
       
       }
     
      
     
     
     
    
    

      

       
   foodObj.display();
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog1.addImage(happyDog)
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:second()
  })
  
}

function addFood(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}
