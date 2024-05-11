function generateKS() {
  // Obtener el tamaño de la muestra desde el input en el documento HTML
  const sampleSize = parseInt(document.getElementById('sampleSize').value);

  // Cadena de texto que contendrá las filas de la tabla de resultados
  let resultBody = '';
  // Array que contendrá los puntos de datos para la gráfica de dispersión
  let dataPoints = [];

  // Generar la muestra de números aleatorios
  let sample = [];
  for (let i = 0; i < sampleSize; i++) {
    sample.push(Math.random());
  }

  // Ordenar la muestra de forma ascendente
  sample.sort((a, b) => a - b);

  // Inicializar la variable para almacenar la diferencia máxima
  let maxDiff = 0;

  // Calcular la diferencia entre la CDF empírica y teórica para cada punto de la muestra
  for (let i = 0; i < sampleSize; i++) {
    const empiricalCDF = (i + 1) / sampleSize;
    const theoreticalCDF = sample[i];
    const diff = Math.abs(empiricalCDF - theoreticalCDF);

    // Actualizar la diferencia máxima si la diferencia actual es mayor
    if (diff > maxDiff) {
      maxDiff = diff;
    }

    // Construir una fila para la tabla de resultados con información del punto actual
    resultBody += `<tr>
                    <td>${i + 1}</td>
                    <td>${sample[i]}</td>
                    <td>${empiricalCDF.toFixed(4)}</td>
                    <td>${diff.toFixed(4)}</td>
                  </tr>`;

    // Agregar el punto de datos al array para la gráfica de dispersión
    dataPoints.push({ x: sample[i], y: empiricalCDF });
  }

  // Actualizar el cuerpo de la tabla en el documento HTML
  document.getElementById('resultBody').innerHTML = resultBody;

  // Dibujar la gráfica de dispersión con los puntos de datos calculados
  drawScatterChart(dataPoints);

  // Mostrar la diferencia absoluta máxima en el documento HTML
  document.getElementById('maxDiff').innerText = maxDiff.toFixed(4);
}

// Función para dibujar la gráfica de dispersión
function drawScatterChart(dataPoints) {
  const ctx = document.getElementById('scatterChart').getContext('2d');

  // Destruir la gráfica existente si ya existe una
  if (window.myScatterChart) {
    window.myScatterChart.destroy();
  }

  // Crear una nueva instancia de Chart.js para la gráfica de dispersión
  window.myScatterChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Distribución Empírica Acumulativa',
        pointBackgroundColor: 'rgb(75, 192, 192)', // Color de fondo de los puntos
        pointBorderColor: 'rgba(0, 0, 0, 0)', // Sin líneas de borde
        pointRadius: 5, // Tamaño de los puntos
        data: dataPoints, // Los puntos de datos
      }]
    },
    options: {
      responsive: true, // Permitir que la gráfica se adapte al tamaño del contenedor
      maintainAspectRatio: false, // No mantener la proporción de aspecto
      scales: {
        x: {
          type: 'linear', // Escala lineal en el eje x
          position: 'bottom' // Posición del eje x en la parte inferior
        },
        y: {
          type: 'linear', // Escala lineal en el eje y
          position: 'left' // Posición del eje y en el lado izquierdo
        }
      }
    }
  });
}
