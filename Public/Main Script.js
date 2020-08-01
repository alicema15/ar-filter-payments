// -----JS CODE-----
// @input SceneObject qrCode
// @input float speedN {"label":"Speed", "min":0.0, "max":2.0, "step":0.01}
// @input bool advance
// @input SceneObject face {"showIf":"advance"} 
// @input SceneObject faceHidden {"showIf":"advance"} 
// @input SceneObject hand {"showIf":"advance"} 
// @input Component.Camera Camera {"showIf":"advance"} 
// @input Asset.Texture deviceCameraTexture { "showIf":"advance"} 

//@input SceneObject curtains


if( isSnapCamera( script.deviceCameraTexture ) )
{   
    var snapCam = true
    print( "Lens running on Snap Camera" );
}
else
{
    snapCam = false
    print( "Lens running on Snapchat" );
}


function isSnapCamera( cameraTexture )
{
    if( cameraTexture )
    {
        var width = cameraTexture.getWidth();
        var height = cameraTexture.getHeight();
        if( width > height )
        {
            return true;
        }
    }
    return false;
}

var speed = script.speedN
var handInRange = false
var qrEnabled = false
var collide1 = false
var rightBottomQR = false
var rightTopQR = false
var leftBottomQR = false
var leftTopQR = false

var maxXY = script.Camera.getOrthographicSize();
var cameraSizeEvent = script.createEvent("DelayedCallbackEvent");
cameraSizeEvent.bind(function (eventData)
{
    maxXY = script.Camera.getOrthographicSize(); 
    
}); 
cameraSizeEvent.reset(0.5);


var moved = false
var started = false
script.qrCode.enabled = false
var tapCount = 0

function onTapped(eventData)
{   
    if(!started){
      script.curtains.enabled= false
      start();
    }
    if(tapCount%2 == 1){
        script.qrCode.enabled = true;
        }
        else{
            
            script.qrCode.enabled = false;
        }
        tapCount++
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);


var transform = script.getTransform();
var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{ 
    
    //Face Co-ordinates
    maxXY = script.Camera.getOrthographicSize()
    var faceTrans = script.face.getTransform().getWorldPosition()
    var xF = faceTrans.x;
    var yF = faceTrans.y;
    var zF = faceTrans.z;
    
    var facehTrans = script.faceHidden.getTransform().getWorldPosition()
    var xFh = facehTrans.x;
    var yFh = facehTrans.y;
    var zFh = facehTrans.z;
    
    faceTrans.x = xFh;
    faceTrans.y = yFh;
    script.face.getTransform().setWorldPosition(faceTrans);    
    
    //QrCode Coordinates
    var qrTrans = script.qrCode.getTransform().getWorldPosition()
        var xQ = qrTrans.x;
        var yQ = qrTrans.y;
        var zQ = qrTrans.z;
    
    //Hand Coordinates
     var handTrans  = script.hand.getTransform().getWorldPosition()
         var xH = handTrans.x;
        var yH = handTrans.y;
        var zH = handTrans.z;
        handTrans.z = -40
    
   

//    if(handTrans.x < -5 && handTrans.y > 2.5){
//    if(!handInRange && !qrEnabled){
//                qrEnabled = true;
//                handInRange = true;
//           
//                script.qrCode.enabled = true;
//                print('in range')
//            }
//         if (!handInRange && qrEnabled){
//                qrEnabled = false;
//            handInRange = true;
//            script.qrCode.enabled = false;
//            }
//        if(!started){
//        start();      
//    }
//    }
//    else{
//        handInRange = false
//    }

    distanceCheck(xF,yF,xQ,yQ,xH,yH);
    if(started){
        if(collide1){
            if(rightBottomQR){
            rightTop();
                handTrans.x = 0;
                handTrans.y = 0;
                handTrans.z = 0;
                 script.hand.getTransform().setWorldPosition(handTrans);
            
            }
           else if(rightTopQR){
            leftTop();
                handTrans.x = 0;
                handTrans.y = 0;
                handTrans.z = 0;
                 script.hand.getTransform().setWorldPosition(handTrans);
           
            }
           else  if (leftTopQR){
            leftBottom();
                
                handTrans.x = 0;
                handTrans.y = 0;
                handTrans.z = 0;
                script.hand.getTransform().setWorldPosition(handTrans);
          
            }
            else if(leftBottomQR){
               
            rightBottom();
                handTrans.x = 0;
                handTrans.y = 0;
                handTrans.z = 0;
                 script.hand.getTransform().setWorldPosition(handTrans);
            
            }
            else{
                rightBottom();
                
                 collide1 = false;
                 rightBottomQR = false
                 rightTopQR = false
                 leftTopQR = false
                 leftBottomQR = false
            }
        }
    }

});



function start(){
    collide1 = false
    
        started = true;
        maxXY = script.Camera.getOrthographicSize();
       
    
    if(!moved){
     
//         var qrTrans = script.qrCode.getTransform().getWorldPosition();
//        qrTrans.x = ((maxXY.x)-6.5)
//                    qrTrans.y = -((maxXY.y)-6.5)
//         script.qrCode.getTransform().setWorldPosition(qrTrans);        
//        rightBottomQR = true
//        leftBottomQR = false
        }
        
}

 function distanceCheck(xF,yF,xQ,yQ,xH,yH)
 {
//       var point1 = new vec2(xF, yF);
//        var point2 = new vec2(xH, yH);
//    
//        var point3 = new vec2(xQ, yQ);
//         var distance1 = point1.distance(point3);
//         var distance2 = point2.distance(point3);
//        
//    if(distance1<11){            
//             collide1 = true;
//             print("Collided with face"); 
//         }        
//    
//    var handDist 
//    if(snapCam){
//        handDist = 22
//    }
//    else{
//        handDist = 13
//    }
//    
//     if(distance2<22){            
            
//         }  
} 

 

function moveUp (point, unit) {
  var x = point[0];
  var y = point[1];
  y += unit*Math.cos(0);
    print('moving up')
  return [x, y];
}

function moveDown (point, unit) {
  var x = point[0];
  var y = point[1];
  y -= unit*Math.cos(0);
    print('moving down')
  return [x, y];
}

function moveLeft (point, unit) {
  var x = point[0];
  var y = point[1];
  x -= unit*Math.cos(0);
    print('moving left')
  return [x, y];
}

function moveRight (point, unit) {
  var x = point[0];
  var y = point[1];
  x += unit*Math.cos(0);
    print('moving Right')
  return [x, y];
}

function rightBottom(){
    moved = true
    
    
    var qrTrans = script.qrCode.getTransform().getWorldPosition();
    var xQ = qrTrans.x
    var yQ = qrTrans.y
    
         var m = moveRight([xQ, yQ], speed);
                qrTrans.x = m[0];
                
    if( qrTrans.x > ((maxXY.x)-6)){
                   qrTrans.x = ((maxXY.x)-6.5)
                   qrTrans.y = -((maxXY.y)-6.5)
                    rightBottomQR = true
                    leftBottomQR = false
                    collide1 = false
                }
    script.qrCode.getTransform().setWorldPosition(qrTrans);
}

function rightTop(){
    moved = true
    
    var qrTrans = script.qrCode.getTransform().getWorldPosition();
    var xQ = qrTrans.x
    var yQ = qrTrans.y
    qrTrans.x = ((maxXY.x)-6.5)
                    qrTrans.y = -((maxXY.y)-6.5)
    var m = moveUp([xQ, yQ], speed);

                qrTrans.y = m[1];
    if(qrTrans.y > ((maxXY.y)-6)){
                    qrTrans.x = ((maxXY.x)-6.5)
                     qrTrans.y = ((maxXY.y)-6.5)
                    rightTopQR = true
                    rightBottomQR = false
          
        
                    collide1 = false
                }
    script.qrCode.getTransform().setWorldPosition(qrTrans);
}

function leftBottom(){
    moved = true
    
    var qrTrans = script.qrCode.getTransform().getWorldPosition();
    var xQ = qrTrans.x
    var yQ = qrTrans.y
        var m = moveDown([xQ, yQ], speed);
                
                qrTrans.y = m[1];
    if(qrTrans.y < -((maxXY.y)-6)){
                    qrTrans.x = -((maxXY.x)-6.5)
                    qrTrans.y = -((maxXY.y)-6.5)
            
                    leftTopQR = false
                    leftBottomQR = true
                    collide1 = false
                }
    script.qrCode.getTransform().setWorldPosition(qrTrans);
}

function leftTop(){
    moved = true
    
    var qrTrans = script.qrCode.getTransform().getWorldPosition();
    
    var xQ = qrTrans.x
    var yQ = qrTrans.y
    var m = moveLeft([xQ, yQ], speed);
                qrTrans.x = m[0];
              
    if(qrTrans.x < -((maxXY.x)-6)){
                    qrTrans.x = -((maxXY.x)-6.5)
                     qrTrans.y = ((maxXY.y)-6.5)
                    
                    rightTopQR = false
                     leftTopQR = true
                    collide1 = false
                }
    script.qrCode.getTransform().setWorldPosition(qrTrans);
}