import { useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import GitHubGraph from './components/GitHubGraph'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // 스크롤 시 부드러운 애니메이션을 위한 설정
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Hero />
        <Projects />
        <Skills />
        <GitHubGraph />
        <Timeline />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

