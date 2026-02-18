let nombreNube="drvvgz0np";
let presetSubida="preset_practica";
let urlCloudinary="https://api.cloudinary.com/v1_1/" + nombreNube + "/image/upload";
let botonSubir=document.getElementById("botonSubir");
let inputArchivo=document.getElementById("inputArchivo");
let textoEstado=document.getElementById("textoEstado");
let imagenResultado=document.getElementById("imagenResultado");
let urlResultado   =document.getElementById("urlResultado");

function subirImagen(){
  let archivo = inputArchivo.files[0];

  if (!archivo){
    textoEstado.textContent = "Por favor, selecciona una imagen";
    return;
  }
  if (!archivo.type.startsWith("image/")){
    textoEstado.textContent = "El archivo debe ser una imagen";
    return;
  }

  botonSubir.disabled = true;
  textoEstado.textContent="Subiendo imagen...";

  let formulario = new FormData();
  formulario.append("file", archivo);
  formulario.append("upload_preset", presetSubida);

  fetch(urlCloudinary,{
    method: "POST",
    body: formulario
  })
  .then(function(respuesta) {
    if (!respuesta.ok){
      throw new Error("Error al subir la imagen: " + respuesta.status);
    }
    return respuesta.json();
  })
  .then(function(datos){
    let urlImagen = datos.secure_url;
    imagenResultado.src = urlImagen;
    imagenResultado.style.display = "block";
    urlResultado.textContent = "URL: " + urlImagen;

    textoEstado.textContent = "Imagen subida con exito";
  })
  .catch(function(error){

    textoEstado.textContent = "Ocurrio un error: " + error.message;
  })
  .finally(function(){
    botonSubir.disabled = false;
  });

}
botonSubir.addEventListener("click", subirImagen);