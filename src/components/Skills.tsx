import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import skillsData from '../data/skills.json'

type Skill = {
  name: string
  level: number
  levelLabel: string
  icon: string
}

type SkillsCategory = {
  [key: string]: Skill[]
}

const Skills = () => {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const skills = skillsData as SkillsCategory

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  const getLevelColor = (level: number) => {
    if (level === 4) return 'bg-green-500'
    if (level === 3) return 'bg-blue-500'
    if (level === 2) return 'bg-yellow-500'
    return 'bg-gray-400'
  }

  const getLevelLabelColor = (level: number) => {
    if (level === 4) return 'text-green-600'
    if (level === 3) return 'text-blue-600'
    if (level === 2) return 'text-yellow-600'
    return 'text-gray-600'
  }

  // 기술 스택 이름을 Simple Icons 형식으로 변환
  const getTechIconName = (name: string): string => {
    const iconMap: { [key: string]: string } = {
      Python: 'python',
      Django: 'django',
      DRF: 'django', // DRF 로고를 Django 로고로 변경
      Redis: 'redis', // Redis 로고 (Simple Icons의 redis 아이콘 사용)
      PostgreSQL: 'postgresql',
      'Next.js': 'nextdotjs',
      React: 'react',
      Tailwind: 'tailwindcss',
      Docker: 'docker',
      'AWS EC2/Nginx': 'amazonaws', // AWS 로고 (Simple Icons의 amazonaws 아이콘 사용)
      GitHub: 'github', // GitHub Actions를 GitHub으로 변경
      Figma: 'figma',
      Streamlit: 'streamlit',
    }
    return iconMap[name] || name.toLowerCase().replace(/\s+/g, '')
  }

  const renderGauge = (level: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded ${
              i <= level ? getLevelColor(level) : 'bg-gray-200 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    )
  }

  const categoryLabels: { [key: string]: string } = {
    backend: 'Backend',
    frontend: 'Frontend',
    devops: 'DevOps / Infra',
    tools: 'Tools',
  }

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          {t('skills.title')}
        </motion.h2>

        <div className="space-y-12">
          {Object.entries(skills).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              {...fadeInUp}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                {t(`skills.${category}` as any) || categoryLabels[category] || category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* 기술 스택 로고 이미지 */}
                        <img
                          src={`https://cdn.simpleicons.org/${getTechIconName(skill.name)}/${theme === 'dark' ? 'ffffff' : '000000'}`}
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            // 로고 로드 실패 시 이모지 아이콘 표시
                            const img = e.target as HTMLImageElement
                            img.style.display = 'none'
                            const fallback = document.createElement('span')
                            fallback.className = 'text-2xl'
                            fallback.textContent = skill.icon
                            img.parentElement?.insertBefore(fallback, img)
                          }}
                        />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span
                        className={`text-sm font-medium ${getLevelLabelColor(
                          skill.level
                        )}`}
                      >
                        {skill.levelLabel}
                      </span>
                    </div>
                    {renderGauge(skill.level)}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills

