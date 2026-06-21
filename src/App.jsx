import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Landing from './pages/Landing';
import Documentation from './pages/Documentation';
import Header from './components/Header';

// Create a custom MUI theme that aligns with our dark mode
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#38bdf8',
    },
    secondary: {
      main: '#2dd4bf',
    },
    background: {
      default: '#00041a',
      paper: '#000836',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="glow-bg"></div>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/docs/*" element={<Documentation />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
