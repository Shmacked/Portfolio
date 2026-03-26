import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import MyRepos from './pages/MyRepos.tsx'
import NavBar from './components/NavBar.tsx'
import LoadingScreen from './components/LoadingScreen.tsx'
import { useState, useEffect } from 'react';

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
      const minMs = 1200;
      const start = performance.now();

      const finish = () => {
          const elapsed = performance.now() - start;
          window.setTimeout(() => setAppReady(true), Math.max(0, minMs - elapsed));
      }

      if (document.readyState === 'complete') finish();
      else window.addEventListener('load', finish, {once: true});
  }, []);

  return (
    <>
      {!appReady? (
        <LoadingScreen />
      ): (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-repos" element={<MyRepos />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
