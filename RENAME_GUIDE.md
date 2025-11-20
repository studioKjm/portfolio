# 프로젝트 이름 변경 가이드 (portpolio → portfolio)

## 1. GitHub 레포지토리 이름 변경

1. GitHub에서 `https://github.com/studioKjm/portpolio` 저장소로 이동
2. **Settings** → **General** → **Repository name** 섹션으로 이동
3. 저장소 이름을 `portpolio`에서 `portfolio`로 변경
4. **Rename** 버튼 클릭

## 2. 로컬 디렉터리 이름 변경

터미널에서 다음 명령어 실행:

```bash
# 상위 디렉터리로 이동
cd /Users/jimin/2025

# 디렉터리 이름 변경
mv portpolio portfolio

# 변경된 디렉터리로 이동
cd portfolio
```

## 3. Git 원격 저장소 URL 업데이트

```bash
# 원격 저장소 URL 확인
git remote -v

# 원격 저장소 URL 업데이트
git remote set-url origin https://github.com/studioKjm/portfolio.git

# 확인
git remote -v
```

## 4. 변경사항 커밋 및 푸시

```bash
# 변경사항 확인
git status

# 변경사항 추가
git add .

# 커밋
git commit -m "Rename project from portpolio to portfolio"

# 푸시
git push origin main
```

## 5. 배포 확인

변경사항이 푸시되면 GitHub Actions가 자동으로 배포를 시작합니다.
배포 완료 후 다음 URL에서 확인:
- `https://studioKjm.github.io/portfolio/`

## 완료!

모든 설정이 완료되었습니다. 이제 프로젝트 이름이 `portfolio`로 변경되었습니다.

