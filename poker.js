document.getElementById("generarNumeros").addEventListener("click", function () {
    generarNumeros();
});

function generarNumeros() {
    var numeros = [];
    var categorias = ["TD", "1P", "2P", "TP", "T", "P", "Q"];
    // Generar 50 números aleatorios entre 0 y 1 con 5 decimales y asignarles categorías
    for (var i = 0; i < 50; i++) {
        var numero = (Math.random()).toFixed(5);
        var categoria = categorias[Math.floor(Math.random() * categorias.length)];
        numeros.push({ numero: numero, categoria: categoria });
    }
    mostrarEnTabla(numeros);
    calcularCategorias(numeros);
}

function mostrarEnTabla(numeros) {
    var tabla = document.getElementById("tablaNumeros");
    tabla.innerHTML = ""; // Limpiar la tabla antes de agregar nuevos números

    // Crear las filas y celdas de la tabla
    for (var i = 0; i < 5; i++) {
        var fila = tabla.insertRow();
        for (var j = 0; j < 10; j++) {
            var celda = fila.insertCell();
            var indice = i * 10 + j;
            if (indice < numeros.length) {
                celda.textContent = "0." + numeros[indice].numero.substr(2) + " (" + numeros[indice].categoria + ")"; // Mostrar el número y la categoría
            } else {
                break; // No hay más números que mostrar
            }
        }
    }
}

function calcularCategorias(numeros) {
    var totales = {
        TD: 0,
        "1P": 0,
        "2P": 0,
        TP: 0,
        T: 0,
        P: 0,
        Q: 0
    };

    // Calcular la cantidad de números en cada categoría
    for (var i = 0; i < numeros.length; i++) {
        var categoria = numeros[i].categoria;
        totales[categoria]++;
    }

    // Actualizar los totales en la tabla de categorías
    for (var categoria in totales) {
        document.getElementById("total" + categoria).textContent = totales[categoria];
    }

    // Calcular y mostrar la operación y su resultado en la tabla de categorías
    document.getElementById("operacionTD").textContent = "(0.3024)(50)";
    document.getElementById("resultadoTD").textContent = (0.3024 * 50).toFixed(2);
    document.getElementById("operacion1P").textContent = "(0.5040)(50)";
    document.getElementById("resultado1P").textContent = (0.5040 * 50).toFixed(2);
    document.getElementById("operacion2P").textContent = "(0.1080)(50)";
    document.getElementById("resultado2P").textContent = (0.1080 * 50).toFixed(2);
    document.getElementById("operacionTP").textContent = "(0.0090)(50)";
    document.getElementById("resultadoTP").textContent = (0.0090 * 50).toFixed(2);
    document.getElementById("operacionT").textContent = "(0.0720)(50)";
    document.getElementById("resultadoT").textContent = (0.0720 * 50).toFixed(2);
    document.getElementById("operacionP").textContent = "(0.0045)(50)";
    document.getElementById("resultadoP").textContent = (0.0045 * 50).toFixed(2);
    document.getElementById("operacionQ").textContent = "(0.0001)(50)";
    document.getElementById("resultadoQ").textContent = (0.0001 * 50).toFixed(2);

    // Calcular y mostrar el resultado final y el nivel de aceptación en la tabla de categorías
    var nivelAceptacion = 3.84; // Valor crítico de la distribución de Poisson para 95% de confianza y 1 grado de libertad
    for (var categoria in totales) {
        var ei = parseFloat(document.getElementById("operacion" + categoria).textContent.replace("n", ""));
        var numerosTotales = totales[categoria];
        var resultado;
        if (ei !== 0) {
            resultado = Math.pow((numerosTotales - ei), 2) / ei;
        } else {
            resultado = 0;
        }
        var aceptacion = resultado <= nivelAceptacion ? "Sí" : "No";
        document.getElementById("resultadoFinal" + categoria).textContent = resultado.toFixed(2);
        document.getElementById("aceptacion" + categoria).textContent = aceptacion;
    }
}