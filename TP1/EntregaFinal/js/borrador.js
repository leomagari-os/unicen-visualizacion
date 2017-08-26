function cargarCanvas() {
  var canvas=[document.getElementById("filtro1"),
    document.getElementById("filtro2"),
    document.getElementById("filtro3"),
    document.getElementById("filtro4"),
    document.getElementById("filtro5"),
    document.getElementById("filtro6")];
  var ctx=[canvas[0].getContext("2d"),
    canvas[1].getContext("2d"),
    canvas[2].getContext("2d"),
    canvas[3].getContext("2d"),
    canvas[4].getContext("2d"),
    canvas[5].getContext("2d")]

}
//var canvas = document.getElementById("vistaConFiltro");
//var ctx=document.getElementById('vistaConFiltro').getContext("2d");
var imgOriginal = new Image();
var imgRedimensionada=new Image();
var canvasOriginal= document.getElementById("canvasOriginal");
var ctxOriginal= document.getElementById('canvasOriginal').getContext("2d");
imgOriginal.onload=function(){
  //dibujar(this);
  var height=imgOriginal.height;
  var width=imgOriginal.width;
  canvasOriginal.height=height;
  canvasOriginal.width=width;
  ctxOriginal.height=height;

  ctxOriginal.drawImage(this,0,0);

};
function dibujar(img){
  ctx.drawImage(img,0,0);
};
function aplicarFiltro(imageData,indice){
  if (indice===1) {
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
    ctx.putImageData(imageData,0,0);
  }
  if(indice===2){
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
    ctx.putImageData(imageData,0,0);
  }
  if (indice===3){
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var red=getRed(imageData,x,y);
        var green=getGreen(imageData,x,y);
        var blue=getBlue(imageData,x,y);
        red=255-red;
        green=255-green;
        blue=255-blue;
        var i=((x+y*imageData.width)*4);

        imageData.data[i+0]=( red * .393 ) + ( green * .769 ) + ( blue * .189 );
        imageData.data[i+1]= ( red * .349 ) + ( green * .686 ) + ( blue * .168 );
        imageData.data[i+2]=( red * .272 ) + ( green * .534 ) + ( blue * .131 );
      }
    }
    ctx.putImageData(imageData,0,0);

  }
  if (indice===4) {
    for (var x = 0; x < imageData.width; x++) {
      for (var y = 0; y < imageData.height; y++) {
        var i=((x+y*imageData.width)*4);
        imageData.data[i+3]=100;
      }
    }
    ctx.putImageData(imageData,0,0);
  }
  if (indice===5) {

    ctx.filter="blur(30px)";

  }if (indice===6) {
    ctx.filter="saturate(20)";
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

  $("#archivo").on("change",function(ev){
    ev.preventDefault();
    var archivos = ev.target.files;
    var archivo = archivos[0];
    var reader=new FileReader();
    reader.onloadend=function(ev){
      if (ev.target.readyState == FileReader.DONE){
        imgOriginal.src=ev.target.result;
      }
    };
    reader.readAsDataURL(archivo);
  });
  $("#filtro1").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);
    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,1);
  });
  $("#filtro2").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);
    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,2);
  });
  $("#filtro3").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);
    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,3);
  });
  $("#filtro4").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);

    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,4);
  });
  $("#filtro5").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);

    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,5);
  });
  $("#filtro6").on("click",function(ev){
    ev.preventDefault();
    dibujar(imgOriginal);
    var imageData=ctx.getImageData(0,0,imgOriginal.width,imgOriginal.height);
    aplicarFiltro(imageData,6);
  });
  $("#guardar").on("click",function(ev){
    ev.preventDefault();
    var dato = canvas.toDataURL("image/png");
    dato = dato.replace(/^data:image\/png/,'data:application/octet-stream');
    document.location.href = dato;
    console.log(dato);

  });

});

var filter=[[1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0]]
