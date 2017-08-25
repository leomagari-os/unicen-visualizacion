function clearActive() {
  $("a").removeClass("active");
}
function cargarContenido(url){
  $.ajax({
      type:"GET",
      dataType:"HTML",
      url: "js/templates/"+url,
      success:function (data){
          $("#action-box").html(data);

      }
    });
};

$(document).ready(function(){
  $("#subirFoto").on("click",function(ev) {
    ev.preventDefault();
    clearActive();
    $("#subirFoto").addClass("active");
    cargarContenido("subirFoto.html");
  });
  $("#filtros").on("click",function(ev) {
    ev.preventDefault();
    clearActive();
    $("#filtros").addClass("active");
    cargarContenido("filtros.html");
  });
  $("#exportarImagen").on("click",function(ev) {
    ev.preventDefault();
    clearActive();
    $("#exportarImagen").addClass("active");
    cargarContenido("exportar.html");
  });
  $("subirFoto").click();
});
