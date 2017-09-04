var canvas;
var ctx;
previewFiltro();
var matrices={
  "blur":[[1,2,1],
          [2,4,2],
          [1,2,1]],
  "deteccionDeBordes":[[0,1,0],
                      [1,-4,1],
                      [0,1,0]]
}
function Filtro() {
  //matrices de convolucion para los filtros que la necesitan
  this.matrizBlur=[[1,2,1],
          [2,4,2],
          [1,2,1]];
  this.matrizDeteccionDeBordes=[[0,1,0],
                                [1,-4,1],
                                [0,1,0]];
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
  //para los filtros en los que hace falta utilizar matrices de convolucion
  this.convolucion= function(matriz,offset,ctx,imd) {
    var m = [].concat(matriz[0], matriz[1], matriz[2]); //convierte la matriz en un arreglo de una dimension
    var divisor = m.reduce(function(a, b) {
      return a + b;
    }) || 1; // sum
    var imdOriginalData=imd.data;
    var imdNuevo=ctx.createImageData(imd);
    var imdNuevoData= imdNuevo.data;
    var length= imdNuevoData.length;
    var res = 0;

    for (var i = 0; i < length; i++) {

      if ((i + 1) % 4 === 0) {
        imdNuevoData[i] = imdOriginalData[i];
        continue;//cada vez que llega al canal alpha saltea un ciclo
      }
      res = 0;
      var matImagen = [//matriz imagen
        imdOriginalData[i-imd.width*4-4] || imdOriginalData[i],
        imdOriginalData[i-imd.width*4] || imdOriginalData[i],
        imdOriginalData[i-imd.width*4+4] || imdOriginalData[i],
        imdOriginalData[i-4] || imdOriginalData[i],
        imdOriginalData[i],
        imdOriginalData[i+4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4-4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4] || imdOriginalData[i],
        imdOriginalData[i+imd.width*4+4] || imdOriginalData[i]
      ];
      for (var j = 0; j < 9; j++) {
        res+=matImagen[j]*m[j];//matriz de convolucion mult matriz imagen
      }
      res/=divisor;
      if(offset) {
        res+=offset;
      }

      imdNuevoData[i] = res;//reemplaza al pixel por el resultado de la ecuacion

    }

    ctx.putImageData(imdNuevo, 0, 0);
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

    this.blur(this.matrizBlur,ctx[4],imd[4]);
    this.deteccionDeBordes(this.matrizDeteccionDeBordes,ctx[5],imd[5]);
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
  this.blur=function(matriz,ctx,imd){

    this.convolucion(matriz,0,ctx,imd);

  };
  this.deteccionDeBordes=function(matriz,ctx,imd){
    this.convolucion(matriz,0,ctx,imd);
  }

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
    var herramientaFiltro= new Filtro();
    herramientaFiltro.blur(matrices.blur,ctxOriginal,imageData);



  });
  $("#filtro6").on("click",function(ev){
    ev.preventDefault();
    var imageData=ctxOriginal.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var herramientaFiltro= new Filtro();
    herramientaFiltro.deteccionDeBordes(matrices.deteccionDeBordes,ctxOriginal,imageData);

  });







});
