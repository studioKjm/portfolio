import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import timelineData from '../data/timeline.json'

type TimelineItem = {
  year: number
  activities: string[]
}

const Timeline = () => {
  const { t, language } = useLanguage()
  const timeline = timelineData as TimelineItem[]

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.6 },
  }

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          {t('timeline.title')}
        </motion.h2>

        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative flex items-start gap-8"
              >
                {/* 연도 표시 (모바일: 왼쪽, 데스크톱: 중앙) */}
                <div className="flex-shrink-0 w-16 md:w-24 text-right md:text-center">
                  <div className="inline-block relative">
                    <div className="absolute left-8 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10" />
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* 활동 내용 */}
                <div className="flex-1 pt-2 md:pt-0 md:ml-8">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow">
                    <ul className="space-y-2">
                      {item.activities.map((activity, activityIndex) => {
                        const translatedActivity = language === 'ko' 
                          ? activity 
                          : t(`timeline.${item.year}.${activityIndex + 1}` as any) || activity
                        return (
                          <li
                            key={activityIndex}
                            className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                          >
                            <span className="text-primary-600 dark:text-primary-400 flex-shrink-0">•</span>
                            <span className="leading-relaxed">{translatedActivity}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline

