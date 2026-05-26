# 사업자 일괄조회 플랫폼

국세청 Open API를 활용한 사업자등록번호 일괄조회 도구입니다.

## 파일 구조

```
biz-lookup/
├── api/
│   └── lookup.js       ← Vercel 서버리스 함수 (API 키 숨김)
├── public/
│   └── index.html      ← 프론트엔드
├── vercel.json         ← Vercel 라우팅 설정
└── README.md
```

## Vercel 배포 방법

### 1단계: GitHub에 올리기
1. GitHub에서 새 repository 생성
2. 이 폴더 전체를 push

### 2단계: Vercel 연동
1. https://vercel.com 접속 후 GitHub 로그인
2. "Add New Project" → GitHub repo 선택
3. 별도 설정 없이 Deploy 클릭

### 3단계: 환경변수 설정 (핵심)
1. Vercel 프로젝트 대시보드 → Settings → Environment Variables
2. 아래 값 추가:
   - Name: `NTS_API_KEY`
   - Value: 공공데이터포털 Decoding 인증키 붙여넣기
   - Environment: Production, Preview, Development 모두 체크
3. Save 클릭 후 Redeploy

### 4단계: 접속
`https://[프로젝트명].vercel.app` 으로 접속

## API 키 확인 위치
공공데이터포털(data.go.kr) → 마이페이지 → 오픈API → 개발계정
→ 서비스 선택 → 서비스정보 영역의 **일반 인증키(Decoding)** 복사
