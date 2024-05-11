var resultados = []; // Almacena los resultados de las pruebas

function generarNumeros() {
    var numeros = [];
    for (var i = 0; i < 50; i++) {
        var numero = Math.floor(Math.random() * 90) + 10; // Números de 10 a 99
        numeros.push("0." + numero);
    }
    mostrarTabla(numeros);
}

function mostrarTabla(numeros) {
    var table = document.getElementById("randomNumbersTable");
    table.innerHTML = "";
    var row;
    for (var i = 0; i < numeros.length; i++) {
        if (i % 10 === 0) {
            row = table.insertRow();
        }
        var cell = row.insertCell();
        cell.textContent = numeros[i];
    }
    asignarUnosYCeros(numeros);
}

function asignarUnosYCeros(numeros) {
    var procedimientoDiv = document.getElementById("procedimiento");
    procedimientoDiv.innerHTML = "<h2>Procedimiento:</h2>";

    var secuencia = "";
    for (var i = 0; i < numeros.length - 1; i++) {
        if (parseFloat(numeros[i]) < parseFloat(numeros[i + 1])) {
            secuencia += "1";
        } else {
            secuencia += "0";
        }
    }
    procedimientoDiv.innerHTML += "<p>S = " + secuencia + "</p>";

    var corridas = calcularCorridas(secuencia);
    var valorEsperado = calcularValorEsperado();
    var varianzaCorridas = calcularVarianzaCorridas();
    var z = calcularZ(corridas);

    procedimientoDiv.innerHTML += "<p>Corridas Observadas (R): " + corridas + "</p>";
    procedimientoDiv.innerHTML += "<p>Valor Esperado (E[R]): " + valorEsperado + "</p>";
    procedimientoDiv.innerHTML += "<p>Varianza del Número de Corridas (Var[R]): " + varianzaCorridas + "</p>";
    procedimientoDiv.innerHTML += "<p>Estadístico Z: " + z.toFixed(2) + "</p>";
    procedimientoDiv.innerHTML += "<p>95% de Aceptación: " + calcularAceptacion(z) + "</p>";

    // Almacenar el resultado de la prueba
    resultados.push(corridas);

    // Graficar todos los resultados
    graficarResultados();
}

function calcularCorridas(secuencia) {
    var corridas = 1;
    for (var i = 0; i < secuencia.length - 1; i++) {
        if (secuencia[i] !== secuencia[i + 1]) {
            corridas++;
        }
    }
    return corridas;
}

function calcularValorEsperado() {
    var n = 50; // Número total de observaciones
    return (2 * n - 1) / 3;
}

function calcularVarianzaCorridas() {
    var n = 50; // Número total de observaciones
    return (16 * n - 29) / 90;
}

function calcularZ(corridas) {
    var valorEsperado = calcularValorEsperado();
    var varianzaCorridas = calcularVarianzaCorridas();
    var desviacionEstandar = Math.sqrt(varianzaCorridas);
    return (corridas - valorEsperado) / desviacionEstandar;
}

function calcularAceptacion(z) {
    // Usamos una tabla Z para obtener el valor crítico para un nivel de significancia de 0.05
    // Para este nivel de significancia, el valor crítico es aproximadamente 1.96
    // Si z está dentro de ±1.96, entonces la prueba es aceptada con un 95% de confianza
    return (z >= -1.96 && z <= 1.96) ? "Aceptado" : "Rechazado";
}

function graficarResultados() {
    var ctx = document.getElementById('corridasChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: resultados.length }, (_, i) => i + 1), // Números de prueba
            datasets: [{
                label: 'Corridas Observadas',
                data: resultados,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 5
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });
}