import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function FloatingThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      className="kincraft-floating-theme-toggle"
      onClick={toggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <span className="material-symbols-outlined theme-icon">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
      <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <FloatingThemeToggle />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
