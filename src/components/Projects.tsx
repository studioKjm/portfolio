import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react'
import projectsData from '../data/projects.json'

// GIF 이미지 import (개발 환경에서 정상 작동하도록)
import coincogiGif from '/coincogi.gif'

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollability)
      window.addEventListener('resize', checkScrollability)
      return () => {
        container.removeEventListener('scroll', checkScrollability)
        window.removeEventListener('resize', checkScrollability)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      })
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Featured Projects
        </motion.h2>

        <div className="relative">
          {/* 좌측 화살표 */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg dark:shadow-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden md:block"
              aria-label="이전 프로젝트"
            >
              <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* 캐러셀 컨테이너 */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
            onScroll={checkScrollability}
          >
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-full md:w-[620px] lg:w-[700px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-shadow"
              >
                {/* GIF/이미지 영역 */}
                <div className="relative w-full h-72 md:h-80 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      project.name === 'CoinCogi'
                        ? coincogiGif
                        : project.gifUrl.startsWith('/')
                        ? project.gifUrl
                        : `/${project.gifUrl}`
                    }
                    alt={`${project.name} demo`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // 이미지 로드 실패 시 디버깅 정보 출력
                      const img = e.target as HTMLImageElement
                      console.error('이미지 로드 실패:', project.gifUrl)
                      console.error('시도한 경로:', img.src)
                      console.error('프로젝트 이름:', project.name)
                      // 플레이스홀더 표시
                      img.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="300"%3E%3Crect fill="%23e5e7eb" width="500" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="20"%3EDemo Image%3C/text%3E%3C/svg%3E'
                    }}
                    onLoad={() => {
                      console.log('이미지 로드 성공:', project.name, project.gifUrl)
                    }}
                  />
                </div>

                {/* 프로젝트 정보 */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  {/* 기술 스택 아이콘 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 링크 버튼 */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 우측 화살표 */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg dark:shadow-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors hidden md:block"
              aria-label="다음 프로젝트"
            >
              <ChevronRight size={24} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Projects

