function clearActive() {
  $("a").removeClass("active");
}
function cargarContenido(url){
  $.ajax({
      type:"GET",
      url: "js/templates/"+url,
      success:function (data){
        
          $("#action-box").html(data);
      }
    });
};
var imgOriginal = new Image();


  var canvasOriginal= document.getElementById("canvasOriginal");
  var ctxOriginal= canvasOriginal.getContext("2d");
  imgOriginal.onload=function(){
    var height=imgOriginal.height;
    var width=imgOriginal.width;
    canvasOriginal.height=height;
    canvasOriginal.width=width;
    ctxOriginal.height=height;
    ctxOriginal.drawImage(this,0,0);

  };

function leerArchivo(ev){
  var archivos = ev.target.files;
  var archivo = archivos[0];
  var reader=new FileReader();
  reader.onloadend=function(ev){
    if (ev.target.readyState == FileReader.DONE){
      imgOriginal.src=ev.target.result;
    }
  };
  reader.readAsDataURL(archivo);
}



$(document).ready(function(){
  $("#subirFoto").on("click",function(ev) {
    ev.preventDefault();
    clearActive();
    $("#subirFoto").addClass("active");
    cargarContenido("subirFoto.html");
  });
  $("#filtros").on("click",function(ev) {
    ev.preventDefault();
    if(imgOriginal.src===""){
         alert("no cargaste una imagen.");
    }else {
    clearActive();
    $("#filtros").addClass("active");
    cargarContenido("filtros.html");
    }
  });
  $("#exportarImagen").on("click",function(ev) {
    ev.preventDefault();
    clearActive();
    $("#exportarImagen").addClass("active");
    cargarContenido("exportar.html");
  });
  $("#archivo").on("change",function(ev){
    ev.preventDefault();
    leerArchivo(ev);

  });
  $("#guardar").on("click",function(ev){
    ev.preventDefault();
    alert("hola");
    var dato = canvas.toDataURL("image/png");
    dato = dato.replace(/^data:image\/png/,'data:application/octet-stream');
    document.location.href = dato;
    console.log(dato);

  });

});
