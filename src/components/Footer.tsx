import { Github, Youtube, Linkedin, Moon, Sun, Languages } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

// X(구 트위터) 로고 SVG 컴포넌트
const XLogo = ({ size = 28, className = '' }: { size?: number; className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const Footer = () => {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/studioKjm',
      icon: Github,
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/gimjimi35646202?s=21',
      icon: XLogo,
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@김지민-p6d',
      icon: Youtube,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/지민-김-566941391',
      icon: Linkedin,
    },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 px-6 border-t border-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* 왼쪽: 문구 */}
          <div className="text-gray-300 dark:text-gray-400 text-base md:text-lg font-medium">
            <p>{t('footer.crafted')}</p>
          </div>

          {/* 중앙: 다크모드 토글 버튼 및 언어 전환 버튼 */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 group"
              aria-label={theme === 'dark' ? t('footer.lightMode') : t('footer.darkMode')}
              title={theme === 'dark' ? t('footer.lightMode') : t('footer.darkMode')}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon size={20} className="text-blue-300 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
            
            {/* 언어 전환 버튼 */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 group"
              aria-label={t('footer.language')}
              title={`${t('footer.language')}: ${language === 'ko' ? t('footer.korean') : t('footer.english')}`}
            >
              <Languages size={20} />
            </button>
          </div>

          {/* 오른쪽: 소셜 링크 */}
          <div className="flex gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 transition-colors hover:scale-125 transform duration-200 flex items-center justify-center"
                  aria-label={link.name}
                >
                  <Icon size={28} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

