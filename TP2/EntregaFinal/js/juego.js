//var globales
var canvas= document.getElementById("canvas");
var ctx= canvas.getContext("2d");
var fondoImg=new Image();
var fondoCanvas=new Fondo(fondoImg);
var c1=new Cuadrado(0,0,"#33f");
var c2=new Cuadrado(400,0,"rgba(100,100,255,0.8)",false);
var c3=new Cuadrado(0,400,"#f33");
var c4=new Cuadrado(400,400,"rgba(255,100,100,0.8)",false);
c1.vincularObjetivo(c2);
c3.vincularObjetivo(c4);
var figuras=[c2,c4,c1,c3];
var tiempoJuego=null;
var puntaje=0;

var dragging=false;
var figSelected=null;
var tiempoSeg=0;
fondoImg.src="images/pattern-a.jpg";
fondoImg.onload=function() { //la imagen debe cargarse
    fondoCanvas.dibujar();
    for (var i = 0; i < figuras.length; i++) {
      figuras[i].dibujar();
      if(figuras[i].isDrageable()==false){
        figuras[i].recuadro();
      }
    }

}
//funciones
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x:Math.floor(evt.clientX - rect.left),
      y: Math.floor(evt.clientY - rect.top)
    };
}
function redibujar() {
  fondoCanvas.dibujar();
  mostrarTiempoSeg();
  for (var i = 0; i < figuras.length; i++) {
    figuras[i].dibujar();
    if(figuras[i].isDrageable()==false){
      figuras[i].recuadro();
    }
  }
}
function quedanFigs(){
for (var i = 0; i < figuras.length; i++) {
  if (figuras[i].isDrageable()) {
    return true;
  }
}
  return false;
};
function detectarSeleccion(m){
  for (var i = 0; i < figuras.length; i++) {
    var isSelected=figuras[i].detectarSeleccion(m);
    if(isSelected && figuras[i].isDrageable()){
      dragging=true;
      return figuras[i];
    }
  }
  return null;
};

function mostrarTiempoSeg(){
  ctx.fillStyle="#fff";
  ctx.fillRect(600, 20,200,80);
  ctx.font = "20px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Tiempo: "+tiempoSeg,650,50);
};
function juegoTerminado(){
  ctx.fillStyle="#fff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("JUEGO TERMINADO!",(canvas.width/2)-200,(canvas.height/2));
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  puntaje=puntaje-tiempoSeg;
  ctx.fillText("Puntaje: "+puntaje,(canvas.width/2)-100,(canvas.height/2)+35);
};
//OBJETOS
function Fondo(img){
  this.img=img;
  this.dibujar=function(){
    var relleno=ctx.createPattern(fondoImg,"repeat"); //método createPattern
    ctx.fillStyle=relleno; //imagen como relleno
    ctx.fillRect(0, 0,canvas.width,canvas.height);
    ctx.fillStyle="#fff";
    ctx.fillRect(600, 0,200,canvas.height);
  }
};
function Cuadrado(posx,posy,color="#55f",drageable=true){
    this.drageable=drageable;
    this.figVinculada=null;
    this.color=color;
    this.posx=posx;
    this.posy=posy;
    this.dibujar=function(){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.posx, this.posy,200,200);
    };
    this.recuadro=function(){
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.setLineDash([7]);
      ctx.strokeRect(this.posx,this.posy, 200, 200);
    };
    this.mover=function(m){
      this.posx=m.x;
      this.posy=m.y;
    };
    this.getPos=function(){
      return {x:this.posx,y:this.posy};
    };
    this.getFigVinculada=function(){
      return this.figVinculada;
    };
    this.isDrageable=function(){
      return this.drageable;
    };
    this.isVinculada=function(){
      return (vinculada!=null);
    };
    this.swtDrag=function(){
      this.drageable= !this.drageable;
    };
    this.vincularObjetivo=function(fig){
      if ((fig.isDrageable()==false) && (this.figVinculada==null)) {
        this.figVinculada=fig;
        console.log("vinculada");
      }
    };
    this.detectarSeleccion=function(m){
      var pos=this.getPos();
      if ((m.x+100 >= pos.x)&&(m.x<=pos.x+200)&&(m.y>=pos.y)&&(m.y<=pos.y+200)) {
        return true;
      }
      return false;
    };
    this.detectarDrageo =function(m){
      var pos=this.getPos();
      if((m.x>=pos.x)&&(m.x<=pos.x+200)&&(m.y>=pos.y)&&(m.y<=pos.y+200)){

        return true;
      }

      return false;
    };
    this.acoplar=function(pos){
      this.posx=pos.x;
      this.posy=pos.y;

    }

};
//main
tiempoJuego= setInterval(function(){
  tiempoSeg=tiempoSeg+1;
  mostrarTiempoSeg();
}, 1000);
//events
canvas.addEventListener("mousedown",function(ev){
  var m=getMousePos(canvas,ev);
  figSelected=detectarSeleccion(m);
  console.log("dragging:",dragging);


});
document.addEventListener("mouseup",function(ev){
  var m=getMousePos(canvas,ev);
  if(dragging==true){
    figSelected.mover(m);
    if(figSelected.getFigVinculada().detectarDrageo(m)){
      puntaje=puntaje+100;
      figSelected.acoplar(figSelected.getFigVinculada().getPos());
        figSelected.swtDrag();
        if(!quedanFigs()){
          dragging=false;
          figSelected=null;
          clearInterval(tiempoJuego);
          return juegoTerminado();
        }

    }
    redibujar();
  }
  dragging=false;
  figSelected=null;
  console.log("dragging:",dragging);

});
document.addEventListener("mousemove",function(ev){
  if (dragging==true) {
    figSelected.mover(getMousePos(canvas,ev));
    redibujar();
  }
});
canvas.addEventListener("mouseout",function(ev){
  dragging=false;
  figSelected=null;
  console.log("dragging:",dragging);
});
