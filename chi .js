function generarYProcedimiento() {
    var numeros = [];
    for (var i = 0; i < 500; i++) {
        var num = Math.random().toFixed(5); // Genera números entre 0 y 1 con 5 decimales
        numeros.push(num);
    }
    mostrarNumeros(numeros);
    calcularChiCuadrada(numeros);
  }
  
  function mostrarNumeros(numeros) {
    var numerosBody = document.getElementById("numerosBody");
    numerosBody.innerHTML = ""; // Limpiar tabla
    for (var i = 0; i < numeros.length; i++) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.textContent = numeros[i];
        row.appendChild(cell);
        numerosBody.appendChild(row);
    }
  }
  
  function calcularChiCuadrada(numeros) {
    var resultadosBody = document.getElementById("resultadosBody");
    resultadosBody.innerHTML = ""; // Limpiar tabla
  
    var intervalos = [[0, 0.2], [0.2, 0.4], [0.4, 0.6], [0.6, 0.8], [0.8, 1]];
    var observadas = [0, 0, 0, 0, 0];
    var esperadas = [100, 100, 100, 100, 100];
    var chiCuadrada = 0;
  
    for (var i = 0; i < numeros.length; i++) {
        var num = parseFloat(numeros[i]);
        for (var j = 0; j < intervalos.length; j++) {
            if (num >= intervalos[j][0] && num < intervalos[j][1]) {
                observadas[j]++;
                break;
            }
        }
    }
  
    for (var i = 0; i < intervalos.length; i++) {
        var observada = observadas[i];
        var esperada = esperadas[i];
        var chi = Math.pow((observada - esperada), 2) / esperada;
        chiCuadrada += chi;
  
        var row = document.createElement("tr");
        var intervaloCell = document.createElement("td");
        intervaloCell.textContent = intervalos[i].join(" - ");
        var observadaCell = document.createElement("td");
        observadaCell.textContent = observada;
        var esperadaCell = document.createElement("td");
        esperadaCell.textContent = esperada;
        var chiCell = document.createElement("td");
        chiCell.textContent = chi.toFixed(2);
  
        row.appendChild(intervaloCell);
        row.appendChild(observadaCell);
        row.appendChild(esperadaCell);
        row.appendChild(chiCell);
  
        resultadosBody.appendChild(row);
    }
  
    var rowTotal = document.createElement("tr");
    var totalLabelCell = document.createElement("td");
    totalLabelCell.textContent = "Total";
    totalLabelCell.colSpan = 3;
    var chiTotalCell = document.createElement("td");
    chiTotalCell.textContent = chiCuadrada.toFixed(2);
  
    rowTotal.appendChild(totalLabelCell);
    rowTotal.appendChild(chiTotalCell);
  
    resultadosBody.appendChild(rowTotal);
  
    // Crear gráfico de dispersión
    var frecuenciasObservadas = observadas;
    var frecuenciasEsperadas = esperadas;
    var intervalosLabels = ["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"];
  
    var data = [
        {
            x: intervalosLabels,
            y: frecuenciasObservadas,
            mode: 'markers',
            name: 'Frecuencia Observada'
        },
        {
            x: intervalosLabels,
            y: frecuenciasEsperadas,
            mode: 'markers',
            name: 'Frecuencia Esperada'
        }
    ];
  
    var layout = {title: 'Comparación de Frecuencias Observadas y Esperadas', xaxis: {title: 'Intervalo'}, yaxis: {title: 'Frecuencia'}};
    Plotly.newPlot('grafica', data, layout);
  }