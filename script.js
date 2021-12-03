/* Variables */
var ctx; /* CanvasRenderingContext2D */
var canvas;
var palabra;
var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
var colorTecla = "#585858";
var colorMargen = "black";
var inicioX = 230;
var inicioY = 300;
var lon = 35;
var margen = 20;
var pistaText = "";

/* Arreglos */
var teclas_array = new Array();
var letras_array = new Array();
var palabras_array = new Array();

/* Variables de control */
var aciertos = 0;
var errores = 0;

/* Palabras */
palabras_array.push("COCINA");
palabras_array.push("BAÑO");
palabras_array.push("MESA");
palabras_array.push("SILLA");
palabras_array.push("LAVADERO");
palabras_array.push("SALA");
palabras_array.push("COMEDOR");
palabras_array.push("ESTUFA");
palabras_array.push("ESCRITORIO");
palabras_array.push("COMPUTADOR");
palabras_array.push("ARMARIO");
palabras_array.push("REMATE");
palabras_array.push("GARANTIA");
palabras_array.push("BENEFICIO");
palabras_array.push("OFERTA");

/* Objetos  creados usando funcion constructora: crear objetos de los que se puedan sacar instancias*/
function Tecla(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.letra = letra;
    this.dibuja = dibujaCajaLetra;
    this.dibujaLetra = dibujaLetraLetra;
}

/* Funciones */

/* Dibujar Teclas*/
function dibujaTecla() {
    ctx.fillStyle = colorTecla;
    ctx.strokeStyle = colorMargen;
    ctx.fillRect(this.x, this.y, this.ancho, this.alto); /* rectangulo relleno */
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto); /* contorno rectangulo */

    ctx.fillStyle = "white";
    ctx.font = "bold 20px helvetica";
    ctx.fillText(this.letra, this.x + this.ancho / 2 - 5, this.y + this.alto / 2 + 5);
}

/* Dibua la letra y su caja */
function dibujaLetraLetra() {
    var w = this.ancho;
    var h = this.alto;
    ctx.fillStyle = "black";
    ctx.font = "bold 40px helvetica";
    ctx.fillText(this.letra, this.x + w / 2 - 12, this.y + h / 2 + 14);
}

function dibujaCajaLetra() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}


/// Funcion para dar una pista ////
function pistaFunction(palabra) {
    let pista = "";
    switch (palabra) {
        case 'COCINA':
            pista = "Donde se prepara comida";
            break;
        case 'BAÑO':
            pista = "";
            break;
        case 'MESA':
            pista = "Donde se dejan cosas";
            break;
        case 'SILLA':
            pista = "Sirve para descansar";
            break;
        case 'LAVADERO':
            pista = "Donde se limpia la ropa";
            break;
        case 'SALA':
            pista = "Donde se ve tv";
            break;
        case 'COMEDOR':
            pista = "Donde se sirve la comida";
            break;
        case 'ESTUFA':
            pista = " Un electrodomestico";
            break;
        case 'ESCRITORIO':
            pista = "Donde se puede trabajar";
            break;
        case 'COMPUTADOR':
            pista = "Donde se crean miles de cosas";
            break;
        case 'ARMARIO':
            pista = "Donde se guarda la ropa";
            break;
        case 'REMATE':
            pista = "Donde hay ofertas";
            break;
        case 'GARANTIA':
            pista = "La tranquilidad de la compra";
            break;
        case 'BENEFICIO':
            pista = "Lo que convence al cliente";
            break;
        case 'OFERTA':
            pista = "Lo que más le gusta al cliente";
            break;
    }



    // Pintamos la pista en el canvas //
    ctx.fillStyle = "black"; // color de la letra
    ctx.font = "bold 20px helvetica"; // tipo y tamaño de la letra
    ctx.fillText(pista, 10, 50); //   variable pista , seguido de la posx y posy
}


/* Distribuir teclado con sus letras respectivas al acomodo de nuestro arreglo*/
function teclado() {
    var ren = 0;
    var col = 0;
    var letra = "";
    var miLetra;
    var x = inicioX;
    var y = inicioY;
    for (var i = 0; i < letras.length; i++) {
        letra = letras.substr(i, 1);
        miLetra = new Tecla(x, y, lon, lon, letra);
        miLetra.dibuja();
        teclas_array.push(miLetra);
        x += lon + margen;
        col++;
        if (col == 9) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 230;
            } else {
                x = inicioX;
            }
        }
        y = inicioY + ren * 50;
    }
}


/* Obtener palabra aleatoriamente y dividirlo en letras */
function pintaPalabra() {
    var p = Math.floor(Math.random() * palabras_array.length);
    palabra = palabras_array[p];

    pistaFunction(palabra);

    var w = canvas.width;
    var len = palabra.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon + margen) * len) / 2;
    for (var i = 0; i < palabra.length; i++) {
        letra = palabra.substr(i, 1);
        miLetra = new Letra(x, y, lon, lon, letra);
        miLetra.dibuja();
        letras_array.push(miLetra);
        x += lon + margen;
    }
}

/* mostrar partes del muñeco dependiendo de los fallos */
function horca(errores) {
    var imagen = new Image();
    imagen.src = "imagenes/ahorcado" + errores + ".png";
    imagen.onload = function() {
        ctx.drawImage(imagen, 355, 0, 230, 230);
    }
}

/* ajustar coordenadas */
function ajusta(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect(); /*  devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización  */
    var x = xx - posCanvas.left;
    var y = yy - posCanvas.top;
    return { x: x, y: y }
}

/* Detecta tecla a la que el usuario le dio clic y la compara con las de la palabra ya elegida al azar */
function selecciona(e) {
    var pos = ajusta(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var tecla;
    var bandera = false;
    for (var i = 0; i < teclas_array.length; i++) {
        tecla = teclas_array[i];
        if (tecla.x > 0) {
            if ((x > tecla.x) && (x < tecla.x + tecla.ancho) && (y > tecla.y) && (y < tecla.y + tecla.alto)) {
                break;
            }
        }
    }
    if (i < teclas_array.length) {
        for (var i = 0; i < palabra.length; i++) {
            letra = palabra.substr(i, 1);
            if (letra == tecla.letra) { /* ver si la letra coincide*/
                caja = letras_array[i];
                caja.dibujaLetra();
                aciertos++;
                bandera = true;
            }
        }
        if (bandera == false) { /*si falla, aumenta el contador de errores hasta completar los 6 intentos, cdonde se termina el juego */
            errores++;
            horca(errores);
            if (errores == 6) gameOver(errores);
        }
        /* Borra la tecla que se a presionado */
        ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2); /* Borra un área rectangular, dejándola totalmente transparente */
        tecla.x - 1;
        /* Ver si ha ganado y enviar funcion gameover */
        if (aciertos == palabra.length) gameOver(errores);
    }
}

/* Borramos las teclas y la palabra con sus cajas y mostramos mensaje dependiendo si gana o pierde*/
function gameOver(errores) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    ctx.font = "bold 50px helvetica";
    if (errores < 6) {
        ctx.fillText("Felicitaciones, descubriste la palabra: ", 30, 280);
    } else {
        ctx.fillText("Perdiste, la palabra era: ", 200, 280);
    }

    ctx.font = "bold 80px helvetica";
    lon = (canvas.width - (palabra.length * 48)) / 2;
    ctx.fillText(palabra, lon, 380);
    horca(errores);
}


/* Detectar si se ha cargado  el canvas, iniciamos las funciones necesarias para jugar o mostrar mensaje de error según sea el caso */
window.onload = function() {
    canvas = document.getElementById("pantalla");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            teclado();
            pintaPalabra();
            horca(errores);
            canvas.addEventListener("click", selecciona, false);
        } else {
            alert("Error al cargar el contexto!");
        }
    }
}