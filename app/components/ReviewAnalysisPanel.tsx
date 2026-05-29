"use client";

import { useState } from "react";
import { 
  Star, 
  Download, 
  RotateCw, 
  Search, 
  ChevronDown, 
  TrendingUp,
  Brain,
  CheckCircle2
} from "lucide-react";

// 별점 렌더러
function StarRow({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          color={i < count ? "#FF5E84" : "#3a3a45"}
          fill={i < count ? "#FF5E84" : "none"}
        />
      ))}
    </div>
  );
}

// 리뷰 리스트 데이터
const MOCK_REVIEWS = [
  {
    id: "1",
    product: "시카 진정 패드",
    rating: 5,
    date: "2023.10.24",
    skinType: "Sensitive Skin",
    skinBg: "#2c1a12",
    skinColor: "#e08d60",
    sentiment: "Positive (98%)",
    sentimentColor: "#60a870",
    sentimentBg: "#182620",
    text: "세안 후에 바로 사용하는데 진정 효과가 정말 뛰어나요. 자극도 전혀 없고 패드가 부드러워서 매일 사용하고 있습니다. 특히 붉은기가 심할 때 보습감도 좋아서 아침 저녁으로 필수템이 되었어요. 재구매 의사 200%입니다!",
    tags: ["보습감 긍정", "피부 진정 긍정", "패드 밀착력 긍정"],
    aiSummary: "해당 사용자는 민감성 피부로, 제품의 진정 효과와 보습력에 대해 매우 높은 만족도를 보이고 있습니다. '재구매 의사 200%'라는 표현을 통해 강력한 브랜드 충성도가 확인됩니다.",
    attributes: [
      { label: "수분/보습", score: 95, level: "Very Positive" },
      { label: "자극/진정", score: 98, level: "Very Positive" },
      { label: "패드 재질", score: 92, level: "Positive" }
    ]
  },
  {
    id: "2",
    product: "시카 진정 패드",
    rating: 4,
    date: "2023.10.23",
    skinType: "Combination",
    skinBg: "#1c262c",
    skinColor: "#60b0e0",
    sentiment: "Neutral (62%)",
    sentimentColor: "#c8b060",
    sentimentBg: "#28281e",
    text: "촉촉하고 진정은 잘 되는데 에센스 양이 좀 적은 것 같아요. 중간쯤 쓰니까 위쪽 패드들은 약간 마르는 느낌? 그거 빼고는 성분도 착하고 트러블도 안 나서 만족합니다.",
    tags: ["수분감 긍정", "에센스 양 부정"],
    aiSummary: "사용자는 제품의 성분과 트러블 억제 성능에 대해서는 만족하고 있으나, 패드 용기 내 에센스 휘발 및 양 부족으로 인한 패드 마름 현상을 개선 신호로 제시하고 있습니다.",
    attributes: [
      { label: "수분/보습", score: 70, level: "Neutral" },
      { label: "자극/진정", score: 85, level: "Positive" },
      { label: "패드 재질", score: 55, level: "Neutral" }
    ]
  },
  {
    id: "3",
    product: "시카 진정 패드",
    rating: 2,
    date: "2023.10.21",
    skinType: "Oily Skin",
    skinBg: "#1c2c20",
    skinColor: "#60e080",
    sentiment: "Negative (84%)",
    sentimentColor: "#FF5E84",
    sentimentBg: "#2c1c20",
    text: "제 피부가 지성인데 이 패드는 사용 후에 유분감이 너무 돌고 끈적여요. 가벼운 워터 제형을 기대했는데 흡수가 더뎌서 아쉽습니다. 건성 피부인 분들께 더 맞을 것 같아요.",
    tags: ["지성 피부 부정", "유분감 지적", "끈적임 부정"],
    aiSummary: "지성 피부 타입의 사용자로, 제품의 무거운 마무리감과 과도한 유분감, 느린 흡수 속도에 대해 명확한 불만족 피드백을 제시하고 있습니다.",
    attributes: [
      { label: "수분/보습", score: 40, level: "Negative" },
      { label: "자극/진정", score: 62, level: "Neutral" },
      { label: "패드 재질", score: 50, level: "Neutral" }
    ]
  }
];

export default function ReviewAnalysisPanel() {
  const [subTab, setSubTab] = useState("All Reviews");
  const [selectedReviewId, setSelectedReviewId] = useState("1");
  const [sentimentFilter, setSentimentFilter] = useState("All");
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>(["Ingredients", "Texture"]);
  const [searchQuery, setSearchQuery] = useState("");

  const activeReview = MOCK_REVIEWS.find(r => r.id === selectedReviewId) || MOCK_REVIEWS[0];

  const handleAttributeToggle = (attr: string) => {
    if (selectedAttributes.includes(attr)) {
      setSelectedAttributes(selectedAttributes.filter(a => a !== attr));
    } else {
      setSelectedAttributes([...selectedAttributes, attr]);
    }
  };

  // 키워드 하이라이트
  const HIGHLIGHT_WORDS = ["진정 효과", "보습감", "성분", "에센스 양", "유분감", "끈적임"];
  
  const HighlightedText = ({ text }: { text: string }) => {
    const regex = new RegExp(`(${HIGHLIGHT_WORDS.join("|")})`, "g");
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          HIGHLIGHT_WORDS.includes(part) ? (
            <span
              key={i}
              style={{
                color: "#FF5E84",
                fontWeight: 600,
                background: "rgba(255, 94, 132, 0.15)",
                padding: "2px 4px",
                borderRadius: "4px"
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="review-analysis-container">
      <style>{`
        .review-analysis-container {
          display: flex;
          flex-direction: row;
          flex: 1;
          overflow: hidden;
          background: #0c0c0e;
          font-family: 'Inter', 'Outfit', 'Noto Sans KR', sans-serif;
        }
        .review-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
          padding: 24px 32px;
          border-right: 1px solid #1e1e24;
        }
        .review-sidebar-panel {
          width: 360px;
          min-width: 360px;
          background: #121214;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
          height: 100%;
        }
        .filter-box {
          background: #121214;
          border: 1px solid #1e1e24;
          borderRadius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }
        .filter-bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 16px;
          align-items: center;
          border-top: 1px solid #1e1e24;
          padding-top: 14px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 28px;
        }
        @media (max-width: 1024px) {
          .review-analysis-container {
            flex-direction: column;
            overflow-y: auto;
          }
          .review-main-content {
            height: auto;
            overflow-y: visible;
            border-right: none;
            border-bottom: 1px solid #1e1e24;
            padding: 20px 16px;
          }
          .review-sidebar-panel {
            width: 100%;
            min-width: 100%;
            height: auto;
            overflow-y: visible;
            padding: 20px 16px;
          }
        }
      `}</style>

      {/* 왼쪽 메인 컨텐츠 */}
      <div className="review-main-content">
        {/* 헤더 섹션 */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
              리뷰 분석
            </h1>
            <p style={{ fontSize: "clamp(12px, 1.5vw, 13.5px)", color: "#8a8a93", margin: 0 }}>
              리뷰 원문과 AI 분석 태그를 함께 확인해보세요.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={{
              background: "#FF5E84", border: "none", color: "#ffffff", padding: "8px 16px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)"
            }}>
              <Download size={14} />
              CSV 내보내기
            </button>
            <button style={{
              background: "#16161a", border: "1px solid #282830", color: "#c4c4c7", padding: "8px 16px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer"
            }}>
              <RotateCw size={14} />
              분석 새로고침
            </button>
          </div>
        </div>

        {/* All Reviews & Product Selection 탭 */}
        <div style={{ display: "flex", borderBottom: "1px solid #1e1e24", marginBottom: "20px", overflowX: "auto" }}>
          {["All Reviews", "Product Selection"].map(tab => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: subTab === tab ? "2px solid #FF5E84" : "2px solid transparent",
                color: subTab === tab ? "#ffffff" : "#6b6b7a",
                fontSize: "14px",
                fontWeight: subTab === tab ? 700 : 500,
                padding: "10px 24px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                whiteSpace: "nowrap"
              }}
            >
              {tab === "All Reviews" ? "전체 리뷰 피드" : "제품별 분석"}
            </button>
          ))}
        </div>

        {/* 상단 필터 컨트롤 박스 */}
        <div className="filter-box">
          <div className="filter-grid">
            {/* 제품 선택 셀렉터 */}
            <div>
              <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "6px", textTransform: "uppercase" }}>Product</label>
              <div style={{
                background: "#16161a", border: "1px solid #282830", borderRadius: "8px", padding: "8px 12px",
                color: "#ffffff", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span>시카 진정 패드 (전체)</span>
                <ChevronDown size={14} color="#8a8a93" />
              </div>
            </div>

            {/* 기간 선택 셀렉터 */}
            <div>
              <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "6px", textTransform: "uppercase" }}>Period</label>
              <div style={{
                background: "#16161a", border: "1px solid #282830", borderRadius: "8px", padding: "8px 12px",
                color: "#ffffff", fontSize: "13px", display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span>최근 30일</span>
                <ChevronDown size={14} color="#8a8a93" />
              </div>
            </div>

            {/* 감성 필터 칩 */}
            <div>
              <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "6px", textTransform: "uppercase" }}>Sentiment</label>
              <div style={{ display: "flex", gap: "6px" }}>
                {["All", "Positive", "Neutral", "Negative"].map(s => {
                  const isActive = sentimentFilter === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSentimentFilter(s)}
                      style={{
                        flex: 1, padding: "8px 0", fontSize: "12px", fontWeight: 600,
                        background: isActive ? "#FF5E84" : "#16161a",
                        border: `1px solid ${isActive ? "#FF5E84" : "#282830"}`,
                        color: isActive ? "#ffffff" : "#8a8a93",
                        borderRadius: "8px", cursor: "pointer", transition: "all 0.15s"
                      }}
                    >
                      {s === "All" ? "전체" : s === "Positive" ? "긍정" : s === "Neutral" ? "중립" : "부정"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="filter-bottom-grid">
            {/* 속성 칩 필터 */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "12px", color: "#6b6b7a", fontWeight: 600 }}>주요 속성:</span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["Ingredients", "Texture", "Moisture"].map(attr => {
                  const isActive = selectedAttributes.includes(attr);
                  return (
                    <button
                      key={attr}
                      onClick={() => handleAttributeToggle(attr)}
                      style={{
                        padding: "6px 12px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 600,
                        background: isActive ? "rgba(255, 94, 132, 0.1)" : "#16161a",
                        border: `1px solid ${isActive ? "#FF5E84" : "#282830"}`,
                        color: isActive ? "#FF5E84" : "#8a8a93",
                        cursor: "pointer", transition: "all 0.15s"
                      }}
                    >
                      {attr === "Ingredients" ? "성분/효과" : attr === "Texture" ? "제형/감촉" : "보습/수분"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 키워드 검색 인풋창 */}
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
              <input
                type="text"
                placeholder="리뷰 키워드 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", background: "#16161a", border: "1px solid #282830", borderRadius: "8px",
                  padding: "8px 12px 8px 34px", color: "#ffffff", fontSize: "12.5px", outline: "none", transition: "all 0.2s"
                }}
                onFocus={e => e.currentTarget.style.borderColor = "#FF5E84"}
                onBlur={e => e.currentTarget.style.borderColor = "#282830"}
              />
            </div>
          </div>
        </div>

        {/* 5개 핵심 스태츠 카드 */}
        <div className="stats-grid">
          {/* 스태츠 1 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>분석 리뷰 총계</span>
            <div style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>18,420건</div>
            <div style={{ fontSize: "10.5px", color: "#FF5E84", display: "flex", alignItems: "center", gap: "2px" }}>
              <TrendingUp size={10} />
              12% 증가 (전월비)
            </div>
          </div>

          {/* 스태츠 2 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>긍정 비율</span>
            <div style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#60a870", marginBottom: "8px" }}>74.8%</div>
            <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "74.8%", height: "100%", background: "#60a870" }}></div>
            </div>
          </div>

          {/* 스태츠 3 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>부정 비율</span>
            <div style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#FF5E84", marginBottom: "8px" }}>13.7%</div>
            <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "13.7%", height: "100%", background: "#FF5E84" }}></div>
            </div>
          </div>

          {/* 스태츠 4 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>혼합 비율</span>
            <div style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#7fb2f0", marginBottom: "8px" }}>11.5%</div>
            <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "11.5%", height: "100%", background: "#7fb2f0" }}></div>
            </div>
          </div>

          {/* 스태츠 5 (그라데이션 강조) */}
          <div style={{ 
            background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", 
            borderRadius: "10px", padding: "14px 16px"
          }}>
            <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.7)", fontWeight: 500, display: "block", marginBottom: "8px" }}>AI 분석 신뢰도</span>
            <div style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>92.4%</div>
            <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>TONES LLM 4.0</span>
          </div>
        </div>

        {/* 리뷰 피드 리스트 (최신순 등) */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: 0 }}>Recent Reviews</h3>
            <span style={{ fontSize: "12px", color: "#6b6b7a" }}>최신순 정렬</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {MOCK_REVIEWS.map(r => {
              const isSelected = selectedReviewId === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedReviewId(r.id)}
                  style={{
                    background: "#16161a",
                    border: `1px solid ${isSelected ? "#FF5E84" : "#282830"}`,
                    borderRadius: "12px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.borderColor = "#444450";
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.borderColor = "#282830";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <StarRow count={r.rating} />
                      <span style={{ fontSize: "11px", color: "#8a8a93" }}>{r.product}</span>
                      <span style={{ fontSize: "11px", color: "#444450" }}>•</span>
                      <span style={{ fontSize: "11px", color: "#6b6b7a" }}>{r.date}</span>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{
                        background: r.skinBg, color: r.skinColor, fontSize: "10.5px", fontWeight: 600,
                        padding: "2px 6px", borderRadius: "4px"
                      }}>
                        {r.skinType}
                      </span>
                      <span style={{
                        background: r.sentimentBg, color: r.sentimentColor, fontSize: "10.5px", fontWeight: 600,
                        padding: "2px 6px", borderRadius: "4px", border: `1px solid ${r.sentimentColor}20`
                      }}>
                        {r.sentiment}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "#c4c4c7", lineHeight: "1.6", margin: "0 0 12px 0" }}>
                    <HighlightedText text={r.text} />
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {r.tags.map(tag => (
                      <span 
                        key={tag} 
                        style={{ 
                          fontSize: "11px", color: "#8a8a93", background: "#202026", 
                          padding: "2px 8px", borderRadius: "4px" 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 우측 AI 분석 상세 패널 */}
      <div className="review-sidebar-panel">
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }}>
            <Brain size={16} color="#FF5E84" />
            AI 분석 상세
          </h2>

          <div style={{
            background: "#16161a",
            border: "1px solid #282830",
            borderRadius: "10px",
            padding: "18px 16px",
            position: "relative",
            lineHeight: "1.6"
          }}>
            <span style={{ fontSize: "28px", color: "#FF5E84", position: "absolute", top: "10px", left: "10px", opacity: 0.15, fontFamily: "serif" }}>“</span>
            <p style={{ fontSize: "13px", color: "#e4e4e7", fontStyle: "italic", margin: 0, paddingLeft: "10px" }}>
              {activeReview.aiSummary}
            </p>
          </div>
        </div>

        {/* 속성 평점 브레이크다운 */}
        <div>
          <h3 style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Attribute Breakdown
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {activeReview.attributes.map(attr => (
              <div key={attr.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12.5px", color: "#c4c4c7", fontWeight: 500 }}>
                    {attr.label}
                  </span>
                  <span style={{ fontSize: "12px", color: attr.level.includes("Positive") ? "#60a870" : attr.level === "Neutral" ? "#c8b060" : "#FF5E84", fontWeight: 600 }}>
                    {attr.level === "Very Positive" ? "매우 긍정" : attr.level === "Positive" ? "긍정" : attr.level === "Neutral" ? "중립" : "부정"}
                  </span>
                </div>
                
                {/* 커스텀 프로그레스 바 */}
                <div style={{ height: "6px", background: "#242428", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{
                    width: `${attr.score}%`,
                    height: "100%",
                    background: attr.level.includes("Positive") 
                      ? "linear-gradient(to right, #488055 0%, #60a870 100%)" 
                      : attr.level === "Neutral" 
                        ? "#c8b060" 
                        : "#FF5E84",
                    borderRadius: "3px",
                    transition: "width 0.4s ease-in-out"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추천 대응 조치 */}
        <div style={{ marginTop: "auto" }}>
          <h3 style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Recommended Actions
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "8px", padding: "12px 14px", display: "flex", gap: "10px", alignItems: "start" }}>
              <CheckCircle2 size={15} color="#FF5E84" style={{ marginTop: "1px", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#ffffff", lineHeight: "1.4" }}>
                {activeReview.rating <= 2 
                  ? "유분감 테스트 정보 상세 기술 및 사용법 공식 공지" 
                  : activeReview.rating === 4 
                    ? "용기 밀폐 메커니즘 테스트 및 CS 대응 가이드 보강" 
                    : "우수 리뷰 마케팅 바이럴 활용 제안"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

