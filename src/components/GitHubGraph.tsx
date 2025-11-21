import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

const GitHubGraph = () => {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  // GitHub 사용자명
  const githubUsername = 'studioKjm'
  // 다크모드일 때 더 어두운 테마 사용
  const statsTheme = theme === 'dark' ? 'dark' : 'default'

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-white">
            {t('github.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t('github.description')}
          </p>

          {/* GitHub Contribution Graph (잔디표) */}
          <div className="flex flex-col items-center gap-6 mb-6">
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity w-full flex justify-center"
            >
              <img
                src={`https://ghchart.rshah.org/${githubUsername}`}
                alt="GitHub Contribution Graph"
                className="w-full max-w-4xl"
                loading="lazy"
                onError={(e) => {
                  // 대체 이미지 사용
                  ;(e.target as HTMLImageElement).src = `https://github-readme-streak-stats.vercel.app/?user=${githubUsername}&theme=default`
                }}
              />
            </a>
          </div>

          {/* GitHub Stats */}
          <div className="flex flex-wrap justify-center items-start gap-4 mb-6">
            <div className="dark:bg-gray-800 dark:rounded-lg dark:p-2 transition-colors duration-300">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=${statsTheme}&hide_border=true`}
                alt="GitHub Stats"
                className="max-w-full h-auto"
                style={{ minWidth: '300px', maxWidth: '400px' }}
                loading="lazy"
              />
            </div>
            <div className="dark:bg-gray-800 dark:rounded-lg dark:p-2 transition-colors duration-300">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=${statsTheme}&hide_border=true`}
                alt="Top Languages"
                className="max-w-full h-auto"
                style={{ minWidth: '300px', maxWidth: '400px' }}
                loading="lazy"
              />
            </div>
          </div>

          {/* GitHub Profile Link */}
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
          >
            <ExternalLink size={18} />
            {t('github.viewProfile')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default GitHubGraph

