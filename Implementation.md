# 💄 TONES Frontend 대시보드 화면 고도화 구현 계획서

본 구현 계획서는 Frontend 프로젝트의 `asset` 폴더 내에 저장된 4가지 화면 프로토타입 이미지(`AIInsightScreenPrototype.png`, `ReviewAnalysisScreenPrototype.png`, `PadRecipeLineupScreenPrototype.png`, `ControlCenterScreenPrototype.png`)를 정밀 분석하여, 각 탭별 프리미엄 대시보드 화면을 개발하기 위한 단계별 로드맵입니다.

---

## 🎨 디자인 시스템 및 핵심 연동 전략

1. **프리미엄 다크 테마 유지 & 강화:**
   * 기존 TONES의 프리미엄 다크 테마 컬러(#121214)와 화사한 핑크 액센트(#FF5E84 / #f9a2c0), 그리고 글래스모피즘(Glassmorphism) 스타일을 일관되게 적용합니다.
   * 부드러운 호버 효과 및 마이크로 인터랙션을 가미하여 높은 완성도의 반응형 대시보드를 구축합니다.
2. **상태 기반 탭 네비게이션 및 컴포넌트 구조 고도화:**
   * `app/page.tsx`에 `activeTab` 상태(`"대시보드" | "AI 인사이트" | "리뷰 분석" | "패드 레시피 라인업" | "제어 센터"`)를 추가합니다.
   * 기존의 `Sidebar.tsx`가 프로퍼티(`activeTab`, `onTabSelect`)를 받아 동적으로 활성화된 탭을 표시하고 전환할 수 있도록 구조를 리팩토링합니다.
   * 각 탭에 대응하는 신규 컴포넌트(`AIInsightPanel.tsx`, `ReviewAnalysisPanel.tsx`, `PadRecipeLineupPanel.tsx`, `ControlCenterPanel.tsx`)를 `app/components/` 폴더에 독립적인 모듈로 추가하여 유지보수성을 극대화합니다.
3. **가볍고 안정적인 데이터 차트 시각화:**
   * 외부 라이브러리 설치로 인한 호환성 문제를 방지하기 위해, 바 차트(Bar Chart), 프로그레스 바(Progress Bar), 포지셔닝 매트릭스(Scatter Matrix) 등을 정밀한 CSS와 SVG 요소를 활용한 **Vanilla CSS/SVG 커스텀 컴포넌트**로 제작하여 성능과 안정성을 완벽히 조율합니다.

---

## 🛠️ 탭별 상세 구현 계획 및 컴포넌트 명세

### 1단계: Sidebar 리팩토링 및 탭 전환 아키텍처 수립
* **대상 파일:** 
  * `[MODIFY]` [Sidebar.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회%20자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/components/Sidebar.tsx)
  * `[MODIFY]` [page.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회%20자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/page.tsx)
* **작업 내용:**
  * `SidebarProps`를 정의하여 `activeTab: string`과 `onTabSelect: (tab: string) => void`를 주입받도록 변경합니다.
  * `page.tsx`에서 `activeTab` 상태에 따라 메인 영역 뷰를 조건부 렌더링하도록 수정합니다.
    * `대시보드` -> 기존 `ChatPanel` + `AnalyticsPanel` 레이아웃 렌더링
    * `AI 인사이트` -> `<AIInsightPanel />`
    * `리뷰 분석` -> `<ReviewAnalysisPanel />`
    * `패드 레시피 라인업` -> `<PadRecipeLineupPanel />`
    * `제어 센터` -> `<ControlCenterPanel />`

---

### 2단계: 'AI 인사이트' 탭 개발 (`AIInsightPanel.tsx`)
* **대상 파일:**
  * `[NEW]` [AIInsightPanel.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회%20자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/components/AIInsightPanel.tsx)
* **주요 구성 요소:**
  * **헤더 섹션:** `AI 인사이트` 타이틀 및 요약 설명, 30일/전체제품 드롭다운 필터, `새 인사이트 생성` 버튼(스파클 아이콘 포함).
  * **핵심 지표 카드 (4개):** 오늘의 핵심 인사이트(`8건`), 확인 필요 리뷰(`126건`), 긍정 반응 증가(`수분감, 진정`), 부정 신호 증가(`따가움, 좁쌀`).
  * **주요 분석 리스트:** 
    * 각 분석 카드에 트렌드 퍼센티지(예: `+12.8%`), 상태 태그(예: `확인 필요`, `긍정 증가`), 태그 리스트, 핵심 상세 설명, 하단 액션 버튼(`관련 리뷰 보기`, `대시보드 고정`, `상세 분석 보기` 등) 배치.
  * **AI 브리핑 요약 사이드바 (우측 고정):** 최근 리뷰 흐름 요약 요약문, 추천 대응 액션 체크박스 리스트(인터랙티브 토글 지원), `인사이트 저장` 및 `리포트 만들기` 버튼.
  * **트렌드 및 차트 영역 (하단):**
    * **리스크 키워드 트렌드:** 요일별 리스크 지수를 미려하게 나타내는 커스텀 SVG/CSS 바 차트.
    * **Top 5 리스크 키워드:** `따가움(1,248건)`, `좁쌀(842건)` 등을 그라데이션 프로그레스 바와 함께 세련되게 시각화.
  * **인사이트 기록 히스토리 테이블:** 일시, 카테고리(리스크/기회 배지), 인사이트 제목, 관련 제품, 상태(대응 완료, 검토 중) 테이블.

---

### 3단계: '리뷰 분석' 탭 개발 (`ReviewAnalysisPanel.tsx`)
* **대상 파일:**
  * `[NEW]` [ReviewAnalysisPanel.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회%20자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/components/ReviewAnalysisPanel.tsx)
* **주요 구성 요소:**
  * **헤더 섹션:** `리뷰 분석` 타이틀 및 설명, `All Reviews` & `Product Selection` 탭 메뉴(가로 정렬), `CSV 내보내기` 및 `분석 새로고침` 액션 버튼.
  * **상단 필터 컨트롤 박스:** Product, Period, Sentiment(All/Positive/Neutral/Negative) 칩 필터, Attributes(Ingredients, Texture, Moisture) 선택 버튼, 자연어 키워드 검색 인풋창.
  * **핵심 스태츠 카드 (5개):** 분석 리뷰 총계(`18,420`), 긍정(`74.8%`), 부정(`13.7%`), 복합(`11.5%`), AI 분석 신뢰도(`92.4%`).
  * **메인 스플릿 뷰:**
    * **좌측 (Recent Reviews):** 별점 별 평점 렌더러, 제품명/날짜, 피부 타입 배지(Sensitive, Combination 등), 감성 신뢰 배지(Positive 98%, Neutral 62%), 리뷰 본문(트러블 관련 핵심 단어 형광펜 하이라이트 기능), 하단 분석 도출 키워드 태그 리스트.
    * **우측 (AI 분석 상세 사이드 패널):** 분석 요약 인용구 블록(AI 분석 상세 글귀), 수분/보습, 자극/진정, 패드 재질 등 세부 속성 만족도 프로그레스 바 그래프, 추천 대응 행동 리스트.

---

### 4단계: '패드 레시피 라인업' 탭 개발 (`PadRecipeLineupPanel.tsx`)
* **대상 파일:**
  * `[NEW]` [PadRecipeLineupPanel.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회 자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/components/PadRecipeLineupPanel.tsx)
* **주요 구성 요소:**
  * **헤더 섹션:** `패드 레시피 라인업` 타이틀 및 서브 타이틀, `데이터 동기화` 및 `라인업 리포트 생성` 버튼.
  * **상단 스태츠 카드 (5개):** 등록 제품(`5`), 전체 리뷰 수(`42,860`), 평균 긍정 반응(`76.2%`), 집중 개선 필요(`2`), 재구매 의사(`68.5%`).
  * **메인 분할 레이아웃:**
    * **좌측 (제품별 상세 진단):** `최신순` / `인기순` 정렬 버튼, 개별 제품 카드(실제 제품 고화질 이미지 적용, 상태 태그(`확인 필요`, `안정`), 감성 스코어 점수, 핵심 강점/개선 신호/추천 피부타입 3분할 내부 그리드). 하단에는 서브 제품 정보 요약 그리드 카드 배치.
    * **우측 (라인업 비교 위젯):**
      * **라인업 감성 분포 비교:** 각 제품별 긍정 비율 가로형 누적 프로그레스 바 차트.
      * **추천 피부 매트릭스:** X축(SKIN TEXTURE)과 Y축(PROBLEM FOCUS)으로 이루어진 격자 모양의 **커스텀 CSS 포지셔닝 차트(Scatter Plot)**. 데이터에 기초한 닷(Dot) 분포와 "라인업 내 중복 포지셔닝 위험이 감지되지 않습니다." 문구 렌더링.
  * **하단 (AI 라인업 전략 제안):** 핑크 보더가 감도는 2단 카드 형태. `CARROT PAD`와 `PARSLEY PAD` 전용 AI 마케팅/제품 제안 장문 보고서 시각화.

---

### 5단계: '제어 센터' 탭 개발 (`ControlCenterPanel.tsx`)
* **대상 파일:**
  * `[NEW]` [ControlCenterPanel.tsx](file:///d:/대외%20활동%20자료/공모전·경진대회 자료/Google%20AI%20Agent%20Challenge/Project/TONES_Client/app/components/ControlCenterPanel.tsx)
* **주요 구성 요소:**
  * **헤더 섹션:** `제어 센터` 타이틀 및 `시스템 정상 작동 중` 그린 펄스(Pulse) 배지, 날짜 범위/제품 설정 메뉴 링크, `변경 사항 저장` 핑크 버튼.
  * **핵심 제어 카드 (4개):** 데이터 동기화(`정상`), AI 분석 엔진(`활성`), 위젯 레이아웃(`자동 저장 ON`), API 토큰(`유효`).
  * **좌/중앙 컨트롤 섹션:**
    * **데이터 소스 관리:** Olive Young API, 자사몰, Zendesk 연동 항목별 상태 배지(연결됨, 인증필요) 및 로그 보기/재연결 버튼.
    * **AI 분석 설정:** 분석 속성 체크박스 인터랙션(Ingredients, Moisture, Scent, Texture 토글링), 신뢰도 임계값 슬라이더 컨트롤러(CONFIDENCE 85%, 드래그하여 수치 조정 가능 모크 구현).
    * **자연어 명령 설정:** 사전에 수집된 바로 가기 명령 템플릿(예: `"트러블 차트 메인에 고정해줘"`) 리스트 및 `+ 새 템플릿 등록` 카드.
  * **우측 모니터 패널 (System Monitor):**
    * **SYSTEM LOGS:** 블랙 배경의 실시간 터미널 스타일 텍스트 로그창.
    * **RECENT EXECUTIONS:** 데이터 전처리 엔진 및 인플루언서 임팩트 계산 엔진의 실시간 진행률/성공 상태 바.
    * **NL ANALYSIS RESULT:** 자연어 질의응답 결과 미리보기 위젯.

---

## 🧪 검증 계획 (Verification Plan)

### 1. 자동화 빌드 테스트
* 각 컴포넌트 생성 및 탭 아키텍처 연동 완료 후, 로컬 쉘에서 `npm run build`를 구동하여 컴파일 및 린트 오류가 전혀 없는지 완벽히 확인합니다.

### 2. 수동 및 시각 검증
* 웹 브라우저에서 모든 탭을 순차적으로 클릭하여 **렌더링 왜곡, 폰트 깨짐, 색상 조화** 등이 프로토타입 이미지와 일대일로 완벽하게 부합하는지 꼼꼼히 체크합니다.
* 마우스 호버(Hover), 체크박스 클릭, 슬라이더 변경, 더보기 토글 등 모든 **인터랙티브 기능의 스무스한 트랜지션**을 직접 검수합니다.
