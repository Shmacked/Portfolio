import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import MyRepos from './pages/MyRepos.tsx'
import NavBar from './components/NavBar.tsx'
import LoadingScreen, {type LoadingScreenProps} from './components/LoadingScreen.tsx'
import { useState, useEffect } from 'react';

function App() {
  const [appState, setAppState] = useState('loading');
  const loadingMinMs = 2000;
  const fadingMinMs = 1000;

  useEffect(() => {
      const start = performance.now();

      const startLoading = () => {
          const now = performance.now();
          const elapsed = now - start;
          window.setTimeout(() => {setAppState('fading'); startFading()}, Math.max(0, loadingMinMs - elapsed));
      }

      const startFading = () => {
          const now = performance.now();
          const elapsed = now - (start + loadingMinMs);
          window.setTimeout(() => {setAppState('loaded'); startLoaded()}, Math.max(0, fadingMinMs - elapsed));
      }

      const startLoaded = () => {
          console.log('loaded');
      }

      if (document.readyState === 'complete') startLoading();
      else window.addEventListener('load', startLoading, {once: true});
  }, []);

  return (
    <>
        <LoadingScreen appState={appState} fadingMinMs={fadingMinMs} />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home appState={appState} />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-repos" element={<MyRepos />} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
