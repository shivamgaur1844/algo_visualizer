# Algorithm Visualizer

A beautiful, interactive algorithm visualization website built with React, TypeScript, and Framer Motion. Watch algorithms come to life with smooth animations and step-by-step explanations.

## 🚀 Features

- **7 Different Algorithms**: Bubble Sort, Quick Sort, Merge Sort, Insertion Sort, Selection Sort, Binary Search, and Linear Search
- **Fully Animated**: Smooth animations using Framer Motion for all algorithm steps
- **Interactive Controls**: Play, pause, step forward/backward, and speed control
- **Real-time Visualization**: Watch arrays transform as algorithms execute
- **Responsive Design**: Beautiful UI that works on all devices
- **Educational**: Detailed explanations and complexity information for each algorithm

## 🎨 Visual Features

- **Color-coded Elements**: Different colors for comparing, swapping, sorted, and pivot elements
- **Smooth Transitions**: Spring animations for element movements
- **Step-by-step Progress**: Detailed descriptions of each algorithm step
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd algo_visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 Available Algorithms

### Sorting Algorithms
- **Bubble Sort** - O(n²) time complexity, simple comparison-based sorting
- **Quick Sort** - O(n log n) average time, divide-and-conquer strategy
- **Merge Sort** - O(n log n) time, stable sorting algorithm
- **Insertion Sort** - O(n²) time, builds sorted array incrementally
- **Selection Sort** - O(n²) time, finds minimum element repeatedly

### Search Algorithms
- **Binary Search** - O(log n) time, requires sorted array
- **Linear Search** - O(n) time, checks each element sequentially

## 🎮 How to Use

1. **Select an Algorithm**: Choose from the algorithm tabs at the top
2. **Generate Array**: Click "Generate New Array" to create a random array
3. **Control Playback**: Use the control buttons to:
   - Play/Pause the animation
   - Step forward/backward through the algorithm
   - Reset to the beginning
   - Adjust animation speed (0.25x to 4x)
4. **Watch and Learn**: Observe how the algorithm works with color-coded elements and step descriptions

## 🎨 Color Legend

- **Blue** - Default state
- **Yellow** - Elements being compared
- **Red** - Elements being swapped
- **Green** - Sorted elements
- **Purple** - Pivot element (for Quick Sort)

## 📱 Responsive Design

The website is fully responsive and works beautifully on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Build for Production

```bash
npm run build
```

This creates a production-ready build in the `dist` folder.

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub. 