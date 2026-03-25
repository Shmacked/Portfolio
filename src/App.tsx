import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import MyRepos from './pages/MyRepos.tsx'
import NavBar from './components/NavBar.tsx'

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-repos" element={<MyRepos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
