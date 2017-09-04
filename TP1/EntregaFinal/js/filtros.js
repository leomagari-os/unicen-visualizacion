var canvas;
var ctx;
previewFiltro();
function Filtro() {
  this.canvas=[];
  this.ctx=[];
  this.ctxOriginal=document.getElementById("canvasOriginal");
  this.getRGB=function(imd,x,y){
      var red,green,blue;
      index=((x+y*imd.width)*4);
      red=imd.data[index+0];
      green=imd.data[index+1];
      blue=imd.data[index+1];
      return colors={"red":red,"green":green,"blue":blue};
  };

  this.cargarCanvas=function (img) {
    //Carga de canvas de thumbnails y sus contextos
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
      canvas[5].getContext("2d")];
    //Redimensionado de la imagen
    ctx[0].drawImage(img,0,0,150,100);

    var imd=[];
    for (var i = 0; i < ctx.length; i++) {
      imd[i]=ctx[0].getImageData(0,0,150,100);
    }
    //aplico los filtros a las thumbnails
    this.blancoYNegro(ctx[0],imd[0]);
    this.negativo(ctx[1],imd[1]);
    this.sepia(ctx[2],imd[2]);
    this.transparencia(ctx[3],imd[3]);
    };
  //FILTROS
  this.blancoYNegro=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var tono=parseInt((colors.red+colors.green+colors.blue)/3);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=tono;
        imd.data[i+1]=tono;
        imd.data[i+2]=tono;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.negativo=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=255-colors.red;
        imd.data[i+1]=255-colors.green;
        imd.data[i+2]=255-colors.blue;
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.sepia=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var colors=this.getRGB(imd,x,y);
        var i=((x+y*imd.width)*4);
        imd.data[i+0]=( colors.red * .393 ) + ( colors.green * .769 ) + ( colors.blue * .189 );
        imd.data[i+1]= ( colors.red * .349 ) + ( colors.green * .686 ) + ( colors.blue * .168 );
        imd.data[i+2]=( colors.red * .272 ) + ( colors.green * .534 ) + ( colors.blue * .131 );
      }
    }
    ctx.putImageData(imd,0,0);
  };
  this.transparencia=function(ctx,imd){
    for (var x = 0; x < imd.width; x++) {
      for (var y = 0; y < imd.height; y++) {
        var i=((x+y*imd.width)*4);
        imd.data[i+3]=100;
      }
    }
    ctx.putImageData(imd,0,0);
  };

}

var canvasOriginal= document.getElementById("canvasOriginal");
var ctxOriginal= document.getElementById('canvasOriginal').getContext("2d");

 function previewFiltro(){
   var herramientaFiltro= new Filtro();
   herramientaFiltro.cargarCanvas(imgOriginal);
}

$(document).ready(function(){

  $("#filtro1").on("click",function(ev){
    ev.preventDefault();
    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
	  var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.blancoYNegro(ctxOriginal,imageData);
  });
  $("#filtro2").on("click",function(ev){
    ev.preventDefault();
    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.negativo(ctxOriginal,imageData);
  });
  $("#filtro3").on("click",function(ev){
    ev.preventDefault();
	  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.sepia(ctxOriginal,imageData);
  });
  $("#filtro4").on("click",function(ev){
    ev.preventDefault();
	  ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro=new Filtro();
    herramientaFiltro.transparencia(ctxOriginal,imageData);
  });
  $("#filtro5").on("click",function(ev){
    ev.preventDefault();

    ctxOriginal.drawImage(imgOriginal,0,0,imgOriginal.width,imgOriginal.height);
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    //aplicarFiltro(imageData,4);
	ctxOriginal.filter="blur(30px)";


  });
  $("#filtro6").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    //aplicarFiltro(imageData,5);
	ctxOriginal.filter="saturate(20)";

  });







});
