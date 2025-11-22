import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Github, X, Info } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import projectsData from '../data/projects.json'

// GIF 이미지 import (개발 환경에서 정상 작동하도록)
import coincogiGif from '/coincogi.gif'
import capitalflowGif from '/capitalflow.gif'
import fitzyGif from '/fitzy.gif'

type Project = {
  id: number
  name: string
  description: string
  demoUrl: string | null
  githubUrl: string | null
  gifUrl: string
  technologies: string[]
  isMain: boolean
  detail?: string
}

const Projects = () => {
  const { t, language } = useLanguage()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

  // 모든 프로젝트 이미지 미리 로드
  useEffect(() => {
    const preloadImages = [
      coincogiGif,
      capitalflowGif,
      fitzyGif,
    ]
    preloadImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  // ESC 키로 팝업 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedProject])

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
          {t('projects.title')}
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
                        : project.name === 'CapitalFlow'
                        ? capitalflowGif
                        : project.name === 'Fitzy'
                        ? fitzyGif
                        : project.gifUrl.startsWith('/')
                        ? project.gifUrl
                        : `/${project.gifUrl}`
                    }
                    alt={`${project.name} demo`}
                    className="w-full h-full object-cover"
                    loading={index <= 1 ? 'eager' : 'lazy'}
                    fetchPriority={index <= 1 ? 'high' : 'auto'}
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
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                    {(project as any).projectType && (
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                        {language === 'ko' 
                          ? (project as any).projectType 
                          : (project as any).projectTypeEn || (project as any).projectType}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {language === 'ko' ? project.description : (project as any).descriptionEn || project.description}
                  </p>

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
                        {t('projects.demo')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Github size={16} />
                        GitHub
                      </a>
                    )}
                    <button
                      onClick={() => setSelectedProject(project as Project)}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Info size={16} />
                      {t('projects.detail')}
                    </button>
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

      {/* 프로젝트 상세 정보 팝업 */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          >
            {/* 팝업 모달 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.name}
                  </h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="닫기"
                  >
                    <X size={24} className="text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* 내용 */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed text-base md:text-lg">
                      {language === 'ko' 
                        ? selectedProject.detail || t('projects.modal.noDetail')
                        : (selectedProject as any).detailEn || selectedProject.detail || t('projects.modal.noDetail')}
                    </p>
                  </div>

                  {/* 기술 스택 */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      {t('projects.modal.tech')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 푸터 */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                  {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink size={16} />
                        {t('projects.demo')}
                      </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                </div>
              </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects

