import { motion } from 'framer-motion'
import { Github, FileText, ExternalLink } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
// 프로필 이미지는 public 폴더에 위치해야 합니다
// 또는 src/assets에 위치한 경우 import를 사용하세요
import profileImage from '/profile.jpeg'

const Hero = () => {
  const { t } = useLanguage()
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        {/* 프로필 이미지 */}
        <motion.div
          {...fadeInUp}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <img
              src={profileImage}
              alt="Jimin Kim"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
        </motion.div>

        {/* 이름 */}
        <motion.h2
          {...fadeInUp}
          transition={{ delay: 0.05 }}
          className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300"
        >
          Jimin Kim
        </motion.h2>

        {/* 메인 타이틀 */}
        <motion.h1
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
        >
          {t('hero.subtitle')}
          <br />
          <span className="text-primary-600 dark:text-primary-400">{t('hero.title')}</span>
        </motion.h1>

        {/* 핵심 강점 */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="mb-12 space-y-2 text-lg md:text-xl text-gray-600 dark:text-gray-300"
        >
          <p>• {t('hero.strength1')}</p>
          <p>• {t('hero.strength2')}</p>
          <p>• {t('hero.strength3')}</p>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <ExternalLink size={18} />
            {t('hero.projects')}
          </a>
          <a
            href="https://github.com/studioKjm"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://www.notion.so/261d0b7d30af8040a291dba3e3469ec1?source=copy_link"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:border-gray-400 dark:hover:border-gray-500 transition-colors flex items-center gap-2"
          >
            <FileText size={18} />
            {t('hero.resume')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

