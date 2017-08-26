var canvas;
var ctx;
previewFiltro();
function cargarCanvas() {
  canvas=[document.getElementById("filtro1"),
    document.getElementById("filtro2"),
    document.getElementById("filtro3"),
    document.getElementById("filtro4"),
    document.getElementById("filtro5"),
    document.getElementById("filtro6")];

  ctx=[canvas[0].getContext("2d"),
    canvas[1].getContext("2d"),
    canvas[2].getContext("2d"),
    canvas[3].getContext("2d"),
    canvas[4].getContext("2d"),
    canvas[5].getContext("2d")]

}
function redimensionarImagen(img){
    var height=img.height;
    var width=img.width;
    while (height>100) {
      height=height-5;
      width=width-5;
    }
    return dimensions={ancho:width,alto:height};

}


var imgRedimensionada=new Image();
var canvasOriginal= document.getElementById("canvasOriginal");
var ctxOriginal= document.getElementById('canvasOriginal').getContext("2d");

function dibujar(img){
  ctx.drawImage(img,0,0);
};
function previewFiltro(){
  console.log(imgOriginal.src);
  if(imgOriginal.src===""){
    alert("no cargaste una imagen.");
  }else {
    var dimensions=redimensionarImagen(imgOriginal);

    cargarCanvas();
    var imd=[];
    for (var i = 0; i < ctx.length; i++) {
      imd[i]=ctxOriginal.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    }
    console.log(imd);
    for (var i = 0; i < ctx.length; i++) {
      aplicarFiltro(imd[i],i);
      ctx[i].putImageData(imd[i],0,0);
    }

  }


}
function aplicarFiltro(imageData,indice){
  if (indice===0) {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var red=getRed(imageData,x,y);
        var green=getGreen(imageData,x,y);
        var blue=getBlue(imageData,x,y);
        var tono=parseInt((red+green+blue)/3);
        var i=((x+y*imageData.width)*4);
        imageData.data[i+0]=tono;
        imageData.data[i+1]=tono;
        imageData.data[i+2]=tono;
      }
    }

  }
  if(indice===1){
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var red=getRed(imageData,x,y);
        var green=getGreen(imageData,x,y);
        var blue=getBlue(imageData,x,y);
        var i=((x+y*imageData.width)*4);
        imageData.data[i+0]=255-red;
        imageData.data[i+1]=255-green;
        imageData.data[i+2]=255-blue;
      }
    }

  }
  if (indice===2){
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var red=getRed(imageData,x,y);
        var green=getGreen(imageData,x,y);
        var blue=getBlue(imageData,x,y);

        var i=((x+y*imageData.width)*4);
        imageData.data[i+0]=( red * .393 ) + ( green * .769 ) + ( blue * .189 );
        imageData.data[i+1]= ( red * .349 ) + ( green * .686 ) + ( blue * .168 );
        imageData.data[i+2]=( red * .272 ) + ( green * .534 ) + ( blue * .131 );
      }
    }


  }
  if (indice===3) {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var i=((x+y*imageData.width)*4);
        imageData.data[i+3]=100;
      }
    }

  }
  if (indice===4) {

    ctx[indice].filter="blur(30px)";

  }if (indice===5) {
    ctx[indice].filter="saturate(20)";
  }


};
function getRed(imageData,x,y){
  index=((x+y*imageData.width)*4);
  return imageData.data[index+0];
};
function getGreen(imageData,x,y){
  index=((x+y*imageData.width)*4);
  return imageData.data[index+1];
};
function getBlue(imageData,x,y){
  index=((x+y*imageData.width)*4);
  return imageData.data[index+2];
};
$(document).ready(function(){

  $("#filtro1").on("click",function(ev){
    ev.preventDefault();
    console.log(canvasOriginal);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,0);
    ctxOriginal.putImageData(imageData,0,0);
  });
  $("#filtro2").on("click",function(ev){
    ev.preventDefault();
    console.log(imgOriginal);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,1);
    ctxOriginal.putImageData(imageData,0,0);
  });
  $("#filtro3").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,2);
    ctxOriginal.putImageData(imageData,0,0);
  });
  $("#filtro4").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,3);
    ctxOriginal.putImageData(imageData,0,0);
  });
  $("#filtro5").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,4);
    ctxOriginal.putImageData(imageData,0,0);
  });
  $("#filtro6").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    aplicarFiltro(imageData,5);
    ctxOriginal.putImageData(imageData,0,0);
  });
  






});
