# Portfolio - Backend Based Fullstack Developer

백엔드 중심의 풀스택 개발자 포트폴리오 웹사이트입니다.

## 🚀 기술 스택

- **React 18** + **TypeScript**
- **Vite** - 빠른 빌드 도구
- **Tailwind CSS** - 유틸리티 기반 CSS
- **Framer Motion** - 애니메이션 라이브러리
- **Lucide React** - 아이콘 라이브러리

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Hero.tsx        # 히어로 섹션
│   ├── Projects.tsx     # 프로젝트 캐러셀
│   ├── Skills.tsx       # 기술 스택 게이지
│   ├── GitHubGraph.tsx # GitHub 활동 그래프
│   ├── Timeline.tsx    # 연도별 타임라인
│   ├── Contact.tsx     # 연락처 섹션
│   └── Footer.tsx      # 푸터
├── data/               # JSON 데이터 파일
│   ├── projects.json   # 프로젝트 정보
│   ├── skills.json     # 기술 스택 정보
│   ├── timeline.json   # 타임라인 데이터
│   └── contact.json    # 연락처 정보
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 진입점
└── index.css           # 글로벌 스타일
```

## 🎨 주요 기능

- ✅ Hero 섹션 (프로필, 타이틀, CTA 버튼)
- ✅ 프로젝트 캐러셀 (드래그/스와이프 지원)
- ✅ 기술 스택 게이지 UI (숙련도 시각화)
- ✅ GitHub 활동 그래프
- ✅ 연도별 타임라인
- ✅ 연락처 섹션
- ✅ Footer (소셜 링크)
- ✅ 반응형 디자인
- ✅ Scroll Reveal 애니메이션

## 📝 데이터 수정

각 섹션의 데이터는 `src/data/` 폴더의 JSON 파일에서 수정할 수 있습니다:

- `projects.json` - 프로젝트 정보 추가/수정
- `skills.json` - 기술 스택 및 숙련도 수정
- `timeline.json` - 타임라인 활동 수정
- `contact.json` - 연락처 정보 수정

## 🚢 GitHub Pages 배포

1. `vite.config.ts`의 `base` 경로를 GitHub 저장소 이름에 맞게 수정
2. 빌드: `npm run build`
3. `dist` 폴더를 GitHub Pages에 배포

또는 GitHub Actions를 사용하여 자동 배포 설정 가능합니다.

## 📄 라이선스

MIT

