class MapUtil {
  static getInitialMapProperties() {
    return {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'Position',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [],
        },
      ],
    };
  }

  static getInitialOptions() {
    return {
      animation: { duration: 0 },
      hover: { animationDuration: 0 },
      responsiveAnimationDuration: 0,
      elements: { line: { tension: 0 } },
      scales: {
        xAxes: [{ ticks: { min: 0.00, max: 0.00 } }],
        yAxes: [{ ticks: { min: 0.00, max: 0.00 } }],
      },
      legend: { display: false },
      tooltips: { enabled: false },
      showLines: true,
    };
  }
}

export default MapUtil;
