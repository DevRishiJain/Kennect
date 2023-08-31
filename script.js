
const chartCanvas = document.getElementById('chart');
const ctx = chartCanvas.getContext('2d');
let chart;
let bars = [];

const generateBars = (count) => {
  const bars = [];
  for (let i = 0; i < count; i++) {
    bars.push(Math.floor(Math.random() * 100) + 1); // Random values between 1 and 100
  }
  return bars;
};

const renderChart = (data) => {
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map((_, index) => index),
      datasets: [
        {
          label: 'Values',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
  });
};

const generateAndRenderBars = () => {
  const barCount = parseInt(document.getElementById('barCount').value);
  bars = generateBars(barCount);
  renderChart(bars);
};

const randomizeArray = () => {
  bars = bars.sort(() => Math.random() - 0.5);
  renderChart(bars);
};

// Insertion Sort
const insertionSort = async () => {
  for (let i = 1; i < bars.length; i++) {
    let j = i;
    while (j > 0 && bars[j] < bars[j - 1]) {
      const temp = bars[j];
      bars[j] = bars[j - 1];
      bars[j - 1] = temp;
      renderChart(bars);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
      j--;
    }
  }
};

// Selection Sort
const selectionSort = async () => {
  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j;
      }
    }
    const temp = bars[i];
    bars[i] = bars[minIndex];
    bars[minIndex] = temp;
    renderChart(bars);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
  }
};

// Bubble Sort
const bubbleSort = async () => {
  const n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        const temp = bars[j];
        bars[j] = bars[j + 1];
        bars[j + 1] = temp;
        renderChart(bars);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
      }
    }
  }
};

// Quick Sort
const quickSort = async (low, high) => {
  if (low < high) {
    const partitionIndex = await partition(low, high);
    await quickSort(low, partitionIndex - 1);
    await quickSort(partitionIndex + 1, high);
  }
};

const partition = async (low, high) => {
  const pivot = bars[high];
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    if (bars[j] < pivot) {
      i++;
      const temp = bars[i];
      bars[i] = bars[j];
      bars[j] = temp;
      renderChart(bars);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
    }
  }
  const temp = bars[i + 1];
  bars[i + 1] = bars[high];
  bars[high] = temp;
  renderChart(bars);
  await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
  return i + 1;
};

// Merge Sort
const mergeSort = async (left, right) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
  }
};

const merge = async (left, mid, right) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) L[i] = bars[left + i];
  for (let j = 0; j < n2; j++) R[j] = bars[mid + 1 + j];

  let i = 0, j = 0, k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      bars[k] = L[i];
      i++;
    } else {
      bars[k] = R[j];
      j++;
    }
    renderChart(bars);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
    k++;
  }

  while (i < n1) {
    bars[k] = L[i];
    i++;
    k++;
    renderChart(bars);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
  }

  while (j < n2) {
    bars[k] = R[j];
    j++;
    k++;
    renderChart(bars);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
  }
};

// Shell Sort
const shellSort = async () => {
  const n = bars.length;
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = bars[i];
      let j;
      for (j = i; j >= gap && bars[j - gap] > temp; j -= gap) {
        bars[j] = bars[j - gap];
        renderChart(bars);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
      }
      bars[j] = temp;
      renderChart(bars);
      await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
    }
  }
};

// ... (previous code)
// Change Size
const changeSize = () => {
    bars = bars.map(value => value * 0.5); // Shrink bar sizes
    renderChart(bars);
  };

// Attach event listeners for buttons
document.getElementById('generateBars').addEventListener('click', generateAndRenderBars);
document.getElementById('randomize').addEventListener('click', randomizeArray);
document.getElementById('insertionSort').addEventListener('click', insertionSort);
document.getElementById('selectionSort').addEventListener('click', selectionSort);
document.getElementById('bubbleSort').addEventListener('click', bubbleSort);
document.getElementById('quickSort').addEventListener('click', () => quickSort(0, bars.length - 1));
document.getElementById('mergeSort').addEventListener('click', () => mergeSort(0, bars.length - 1));
document.getElementById('shellSort').addEventListener('click', shellSort);
document.getElementById('changeSize').addEventListener('click', changeSize);

generateAndRenderBars(); // Initial generation of bars
