import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Language = 'ko' | 'en'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 번역 데이터
const translations = {
  ko: {
    // Hero
    'hero.subtitle': 'Backend Based',
    'hero.title': 'Fullstack Developer',
    'hero.strength1': '백엔드 아키텍처 설계 및 최적화',
    'hero.strength2': '실시간 데이터 처리 및 분석 시스템 구축',
    'hero.strength3': '프론트엔드 개발 및 사용자 경험 개선',
    'hero.projects': 'Projects',
    'hero.resume': 'Resume',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.demo': 'Demo',
    'projects.detail': 'Detail',
    'projects.modal.tech': '사용 기술',
    'projects.modal.noDetail': '상세 정보가 없습니다.',
    
    // Skills
    'skills.title': 'Tech Stack',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.devops': 'DevOps / Infra',
    'skills.tools': 'Tools',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2026.1': '소프트웨어학과 졸업 예정',
    'timeline.2025.1': 'CoinCogi 정식 배포',
    'timeline.2025.2': '외주: 가상화폐 거래대금 알림 서비스 개발',
    'timeline.2025.3': '졸업작품 CapitalFlow 개발 → 장려상',
    'timeline.2025.4': 'Fitzy(MBTI 기반 코디 추천 서비스) 개발',
    'timeline.2024.1': 'Python, Django 기반 백엔드 개발 본격 시작',
    'timeline.2024.2': 'CoinCogi 서비스 개발 시작',
    'timeline.2023.1': '군 대체 복무',
    'timeline.2022.1': '데이터‧게임 분야 프로젝트 경험',
    'timeline.2022.2': '게임프로그래밍(unity) 프로젝트 \'장려상\' 수상',
    'timeline.2021.1': '개발 기초 심화 (CS 기초, 객체지향, 알고리즘 기반 강화)',
    'timeline.2020.1': '대구대학교 컴퓨터SW학과 입학',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.description': '프로젝트나 협업에 관심이 있으시다면 언제든지 연락주세요.',
    'contact.emailCopy': '이메일 복사',
    
    // Footer
    'footer.crafted': 'Crafted by Jimin Kim, 2025',
    'footer.lightMode': '라이트 모드로 전환',
    'footer.darkMode': '다크 모드로 전환',
    'footer.language': '언어',
    'footer.korean': '한국어',
    'footer.english': 'English',
  },
  en: {
    // Hero
    'hero.subtitle': 'Backend Based',
    'hero.title': 'Fullstack Developer',
    'hero.strength1': 'Backend architecture design and optimization',
    'hero.strength2': 'Real-time data processing and analysis system construction',
    'hero.strength3': 'Frontend development and user experience improvement',
    'hero.projects': 'Projects',
    'hero.resume': 'Resume',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.demo': 'Demo',
    'projects.detail': 'Detail',
    'projects.modal.tech': 'Technologies Used',
    'projects.modal.noDetail': 'No detailed information available.',
    
    // Skills
    'skills.title': 'Tech Stack',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.devops': 'DevOps / Infra',
    'skills.tools': 'Tools',
    
    // Timeline
    'timeline.title': 'Timeline',
    'timeline.2026.1': 'Expected graduation from Software Engineering',
    'timeline.2025.1': 'CoinCogi official release',
    'timeline.2025.2': 'Freelance: Cryptocurrency transaction amount notification service development',
    'timeline.2025.3': 'Graduation project CapitalFlow development → Encouragement Award',
    'timeline.2025.4': 'Fitzy (MBTI-based outfit recommendation service) development',
    'timeline.2024.1': 'Started full-scale backend development with Python and Django',
    'timeline.2024.2': 'Started CoinCogi service development',
    'timeline.2023.1': 'Alternative military service',
    'timeline.2022.1': 'Project experience in data and game fields',
    'timeline.2022.2': 'Game programming (Unity) project \'Encouragement Award\'',
    'timeline.2021.1': 'Deepened development fundamentals (CS basics, object-oriented, algorithm-based enhancement)',
    'timeline.2020.1': 'Enrolled in Computer Software Engineering at Daegu University',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.description': 'Feel free to reach out if you are interested in projects or collaboration.',
    'contact.emailCopy': 'Copy Email',
    
    // Footer
    'footer.crafted': 'Crafted by Jimin Kim, 2025',
    'footer.lightMode': 'Switch to light mode',
    'footer.darkMode': 'Switch to dark mode',
    'footer.language': 'Language',
    'footer.korean': '한국어',
    'footer.english': 'English',
  },
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // localStorage에서 언어 설정 가져오기, 없으면 한국어(기본)
    const savedLanguage = localStorage.getItem('language') as Language
    return savedLanguage || 'ko'
  })

  useEffect(() => {
    // localStorage에 저장
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'ko' ? 'en' : 'ko'))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ko] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
