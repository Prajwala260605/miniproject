// SIDEBAR TOGGLE
let sidebarOpen = false;
const sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// SCROLL TO TOP BUTTON
let mybutton = document.getElementById("myBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// DARK MODE TOGGLE
document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");

  if (darkModeToggle) {
    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.innerHTML = '<img src="sun-icon.png" alt="Sun Icon"> Light Mode';
      } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.innerHTML = '<img src="moon-icon.png" alt="Moon Icon"> Dark Mode';
      }
    }

    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
      darkModeToggle.innerHTML = '<img src="sun-icon.png" alt="Sun Icon"> Light Mode';
    }

    darkModeToggle.addEventListener("click", toggleDarkMode);
  }

  // Add loading class to cards and charts for animation
  document.querySelectorAll('.card, .charts-card, .india-card').forEach(element => {
    element.classList.add('loading');
    setTimeout(() => element.classList.remove('loading'), 2000); // Remove after animations
  });
});

// CHARTS (Unchanged)
const barChartOptions = {
  series: [{
    data: [10, 8, 6, 4, 2],
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: false },
  },
  colors: ['#246dec', '#cc3c43', '#367952', '#f5b74f', '#4f35a1'],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: '40%',
    },
  },
  dataLabels: { enabled: false },
  legend: { show: false },
  xaxis: { categories: ['Laptop', 'Phone', 'Monitor', 'Headphones', 'Camera'] },
  yaxis: { title: { text: 'Count' } },
};

const barChart = new ApexCharts(document.querySelector('#bar-chart'), barChartOptions);
barChart.render();

const areaChartOptions = {
  series: [
    { name: 'Purchase Orders', data: [31, 40, 28, 51, 42, 109, 100] },
    { name: 'Sales Orders', data: [11, 32, 45, 32, 34, 52, 41] },
  ],
  chart: {
    height: 350,
    type: 'area',
    toolbar: { show: false },
  },
  colors: ['#4f35a1', '#246dec'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth' },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  markers: { size: 0 },
  yaxis: [
    { title: { text: 'Purchase Orders' } },
    { opposite: true, title: { text: 'Sales Orders' } },
  ],
  tooltip: { shared: true, intersect: false },
};

const areaChart = new ApexCharts(document.querySelector('#area-chart'), areaChartOptions);
areaChart.render();

window.onscroll = function () {
  let btn = document.getElementById("myBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
    btn.classList.add("show");
  } else {
    btn.style.display = "none";
    btn.classList.remove("show");
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const icon = document.getElementById("darkModeIcon");
  const label = document.getElementById("darkModeLabel");

  function setDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);
    localStorage.setItem("darkMode", enabled ? "enabled" : "disabled");
    icon.src = enabled ? "sun-icon.png" : "moon-icon.png";
    icon.alt = enabled ? "Sun Icon" : "Moon Icon";
    label.textContent = enabled ? "Light Mode" : "Dark Mode";
  }

  if (darkModeToggle) {
    setDarkMode(localStorage.getItem("darkMode") === "enabled");

    darkModeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      setDarkMode(!isDark);
    });
  }

  // Card animation (unchanged)
  document.querySelectorAll('.card, .charts-card, .india-card').forEach(element => {
    element.classList.add('loading');
    setTimeout(() => element.classList.remove('loading'), 2000);
  });
});
/*
document.addEventListener('DOMContentLoaded', () => {
  const soundButton = document.querySelector('.sound-button');
  const audio = document.getElementById('background-music');
  const canvas = document.getElementById('audio-visualizer');
  const canvasCtx = canvas.getContext('2d');

  // Web Audio API setup
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // Canvas setup
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const barWidth = (canvas.width / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  function drawVisualizer() {
    requestAnimationFrame(drawVisualizer);
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = '#171513';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    x = 0;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;
      canvasCtx.fillStyle = '#ffffff'; // White bars to match button
      canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }

  // Toggle music and visualizer
  soundButton.addEventListener('click', () => {
    if (audio.paused) {
      audioCtx.resume().then(() => {
        audio.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
        drawVisualizer();
        soundButton.classList.add('active');
      });
    } else {
      audio.pause();
      soundButton.classList.remove('active');
      canvasCtx.fillStyle = '#171513';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    }
  });

  // Start muted
  audio.pause();
  soundButton.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
  const soundButton = document.querySelector('.sound-button');
  const audio = document.getElementById('background-music');

  // Start muted, no animation
  audio.pause();
  soundButton.classList.remove('active');

  // Toggle music and animation on click
  soundButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
      soundButton.classList.add('active');
    } else {
      audio.pause();
      soundButton.classList.remove('active');
    }
  });
});
*/
document.addEventListener('DOMContentLoaded', () => {
  const soundButton = document.querySelector('.sound-button');
  const audio = document.getElementById('background-music');

  // Start muted, no animation
  audio.pause();
  soundButton.classList.remove('active');

  // Toggle music and animation on click
  soundButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(error => {
        console.error('Audio playback failed:', error);
      });
      soundButton.classList.add('active');
    } else {
      audio.pause();
      soundButton.classList.remove('active');
    }
  });
});