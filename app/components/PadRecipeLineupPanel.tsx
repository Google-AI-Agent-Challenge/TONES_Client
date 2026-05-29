"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  RotateCw, 
  FileText, 
  Plus, 
  Sparkles, 
  AlertTriangle
} from "lucide-react";

export default function PadRecipeLineupPanel() {
  const [filterMode, setFilterMode] = useState("최신순");
  const [syncing, setSyncing] = useState(false);

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1200);
  };

  return (
    <div className="lineup-container">
      <style>{`
        .lineup-container {
          display: flex;
          flex-direction: row;
          flex: 1;
          overflow: hidden;
          background: #0c0c0e;
          font-family: 'Inter', 'Outfit', 'Noto Sans KR', sans-serif;
        }
        .lineup-main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: auto;
          padding: 24px 32px;
          border-right: 1px solid #1e1e24;
        }
        .lineup-sidebar-panel {
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
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          margin-bottom: 28px;
        }
        .diag-card {
          background: #16161a;
          border: 1px solid #282830;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          gap: 20px;
          align-items: center;
        }
        .diag-details {
          flex: 1;
          width: 100%;
        }
        .sub-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 10px;
          margin-top: 14px;
        }
        .secondary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 4px;
        }
        .strategy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .lineup-container {
            flex-direction: column;
            overflow-y: auto;
          }
          .lineup-main-content {
            height: auto;
            overflow-y: visible;
            border-right: none;
            border-bottom: 1px solid #1e1e24;
            padding: 20px 16px;
          }
          .lineup-sidebar-panel {
            width: 100%;
            min-width: 100%;
            height: auto;
            overflow-y: visible;
            padding: 20px 16px;
          }
        }
        @media (max-width: 768px) {
          .diag-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .diag-image-container {
            align-self: center;
          }
        }
      `}</style>

      {/* 왼쪽 메인 컨텐츠 */}
      <div className="lineup-main-content">
        {/* 헤더 섹션 */}
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 style={{ fontSize: "clamp(20px, 2.5vw, 24px)", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
              패드 레시피 라인업
            </h1>
            <p style={{ fontSize: "clamp(12px, 1.5vw, 13.5px)", color: "#8a8a93", margin: 0 }}>
              제품별 리뷰 반응과 개선 신호를 비교해보세요.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button 
              onClick={triggerSync}
              style={{
                background: "#16161a", border: "1px solid #282830", color: "#c4c4c7", padding: "8px 16px", borderRadius: "8px",
                fontSize: "13px", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer"
              }}
            >
              <RotateCw size={14} className={syncing ? "animate-spin" : ""} />
              <span>데이터 동기화</span>
            </button>
            
            <button style={{
              background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", border: "none", color: "#ffffff", padding: "8px 16px", borderRadius: "8px",
              fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
              boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)"
            }}>
              <FileText size={14} />
              라인업 리포트 생성
            </button>
          </div>
        </div>

        {/* 5개 핵심 스태츠 카드 */}
        <div className="stats-grid">
          {/* 카드 1 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>등록 제품</span>
            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>5개</div>
            <div style={{ fontSize: "10.5px", color: "#60a870", fontWeight: 500 }}>✓ Active lineup</div>
          </div>

          {/* 카드 2 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>전체 리뷰 수</span>
            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>42,860건</div>
            <div style={{ fontSize: "10.5px", color: "#8a8a93" }}>최근 30일 누적</div>
          </div>

          {/* 카드 3 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>평균 긍정 반응</span>
            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#60a870", marginBottom: "8px" }}>76.2%</div>
            <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ width: "76.2%", height: "100%", background: "#60a870" }}></div>
            </div>
          </div>

          {/* 카드 4 (레드 보더) */}
          <div style={{ background: "#16161a", border: "1px solid #FF5E8480", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#FF5E84", fontWeight: 600, display: "block", marginBottom: "8px" }}>집중 개선 필요</span>
            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#FF5E84", marginBottom: "4px" }}>2개</div>
            <div style={{ fontSize: "10px", color: "#FF5E84", fontWeight: 600, textTransform: "uppercase" }}>Urgent Signal</div>
          </div>

          {/* 카드 5 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
            <span style={{ fontSize: "11.5px", color: "#8a8a93", fontWeight: 500, display: "block", marginBottom: "8px" }}>재구매 의사</span>
            <div style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#7fb2f0", marginBottom: "4px" }}>68.5%</div>
            <div style={{ fontSize: "10.5px", color: "#7fb2f0", fontWeight: 500 }}>Retention score</div>
          </div>
        </div>

        {/* 제품별 상세 진단 영역 */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", margin: 0 }}>제품별 상세 진단</h2>
            <div style={{ display: "flex", gap: "6px" }}>
              {["최신순", "인기순"].map(mode => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  style={{
                    background: filterMode === mode ? "#1e1e24" : "none",
                    border: "1px solid #282830",
                    borderRadius: "6px",
                    padding: "5px 12px",
                    color: filterMode === mode ? "#ffffff" : "#6b6b7a",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* 진단 카드 1 (당근 패드) */}
            <div className="diag-card">
              {/* 이미지 */}
              <div className="diag-image-container" style={{ 
                width: "90px", height: "90px", borderRadius: "10px", background: "#1a1a1f", 
                display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0, overflow: "hidden"
              }}>
                <Image src="/images/carrot.png" alt="당근 패드" width={80} height={80} style={{ objectFit: "contain" }} />
              </div>

              {/* 디테일 */}
              <div className="diag-details">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ background: "#2c1c20", border: "1px solid #FF5E8430", color: "#FF5E84", fontSize: "11px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px" }}>
                        확인 필요
                      </span>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                        캐롯 카로틴 카밍 워터 패드 (당근 패드)
                      </h3>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["Soothing", "Moisture"].map(t => (
                        <span key={t} style={{ fontSize: "11px", color: "#9999aa", background: "#24242e", padding: "1px 6px", borderRadius: "4px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10.5px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Sentiment Score</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#FF5E84" }}>82.1</div>
                  </div>
                </div>

                {/* 3분할 세부 정보 그리드 */}
                <div className="sub-info-grid">
                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>핵심 강점 (Strengths)</span>
                    <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <Plus size={12} color="#60a870" />
                      촉촉함 (42%)
                    </span>
                  </div>

                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>개선 신호 (Risks)</span>
                    <span style={{ fontSize: "13px", color: "#FF5E84", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <AlertTriangle size={12} color="#FF5E84" />
                      따가움 (12%)
                    </span>
                  </div>

                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>추천 피부 타입</span>
                    <span style={{ fontSize: "13px", color: "#c4c4c7", fontWeight: 600 }}>
                      Sensitive, Dry
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 진단 카드 2 (미나리 패드) */}
            <div className="diag-card">
              {/* 이미지 */}
              <div className="diag-image-container" style={{ 
                width: "90px", height: "90px", borderRadius: "10px", background: "#1a1a1f", 
                display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0, overflow: "hidden"
              }}>
                <Image src="/images/parsley.png" alt="미나리 패드" width={80} height={80} style={{ objectFit: "contain" }} />
              </div>

              {/* 디테일 */}
              <div className="diag-details">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{ background: "#182620", border: "1px solid #60a87030", color: "#60a870", fontSize: "11px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px" }}>
                        안정
                      </span>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                        판토테닉 워터 파슬리 (미나리 패드)
                      </h3>
                    </div>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {["Oil-control", "Soothing"].map(t => (
                        <span key={t} style={{ fontSize: "11px", color: "#9999aa", background: "#24242e", padding: "1px 6px", borderRadius: "4px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "10.5px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Sentiment Score</div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#60a870" }}>74.5</div>
                  </div>
                </div>

                {/* 3분할 세부 정보 그리드 */}
                <div className="sub-info-grid">
                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>핵심 강점 (Strengths)</span>
                    <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                      <Plus size={12} color="#60a870" />
                      진정 효과 (38%)
                    </span>
                  </div>

                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>개선 신호 (Risks)</span>
                    <span style={{ fontSize: "13px", color: "#c4c4c7", fontWeight: 600 }}>
                      향 호불호 (5%)
                    </span>
                  </div>

                  <div style={{ background: "#1a1a20", padding: "10px 14px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500 }}>추천 피부 타입</span>
                    <span style={{ fontSize: "13px", color: "#c4c4c7", fontWeight: 600 }}>
                      Oily, Trouble
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 보완 서브 제품 그리드 */}
            <div className="secondary-grid">
              <div style={{
                background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "14px 16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", background: "#2c1c20", color: "#FF5E84", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>주의 깊게 보기</span>
                  <span style={{ color: "#6b6b7a", cursor: "pointer" }}>•••</span>
                </div>
                <h4 style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>블루 캐모마일 패드</h4>
                <p style={{ fontSize: "11px", color: "#9999aa", margin: "0 0 10px 0" }}>Cooling, Moisture</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#e4e4e7" }}>
                  <span>긍정 반응</span>
                  <span style={{ color: "#FF5E84", fontWeight: 600 }}>68.2%</span>
                </div>
              </div>

              <div style={{
                background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "14px 16px"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", background: "#24242e", color: "#9999aa", padding: "2px 6px", borderRadius: "4px", fontWeight: 600 }}>정상</span>
                  <span style={{ color: "#6b6b7a", cursor: "pointer" }}>•••</span>
                </div>
                <h4 style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px 0" }}>도토리 포어 펩타이드</h4>
                <p style={{ fontSize: "11px", color: "#9999aa", margin: "0 0 10px 0" }}>Pore care, Elasticity</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#e4e4e7" }}>
                  <span>긍정 반응</span>
                  <span style={{ color: "#60a870", fontWeight: 600 }}>71.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI 라인업 전략 제안 (최하단) */}
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#ffffff", display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
            <Sparkles size={15} color="#FF5E84" />
            AI 라인업 전략 제안
          </h2>

          <div className="strategy-grid">
            <div style={{
              background: "#16161a", border: "1px solid #FF5E8440", borderRadius: "12px", padding: "20px",
              boxShadow: "0 4px 20px rgba(255, 94, 132, 0.05)"
            }}>
              <span style={{ background: "#2c1c20", color: "#FF5E84", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", display: "inline-block", marginBottom: "10px" }}>
                CARROT PAD
              </span>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px 0" }}>민감도 완화 커뮤니케이션 강화</h4>
              <p style={{ fontSize: "12.5px", color: "#a1a1aa", lineHeight: "1.6", margin: 0 }}>
                리뷰 데이터 내 &apos;따가움&apos; 키워드 발현 빈도가 전월 대비 4.2% 상승했습니다. 특정 원료 조합 혹은 패드 시트의 물리적 자극 가능성을 시사합니다. 상세 페이지 내 <span style={{ color: "#FF5E84", fontWeight: 600 }}>&apos;저자극 테스트 완료&apos;</span> 섹션을 상단 배치하고, &apos;두드려서 흡수시키기&apos; 등 올바른 사용 가이드를 강화할 것을 제안합니다.
              </p>
            </div>

            <div style={{
              background: "#16161a", border: "1px solid #FF5E8440", borderRadius: "12px", padding: "20px",
              boxShadow: "0 4px 20px rgba(255, 94, 132, 0.05)"
            }}>
              <span style={{ background: "#2c1c20", color: "#FF5E84", fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", display: "inline-block", marginBottom: "10px" }}>
                PARSLEY PAD
              </span>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px 0" }}>계절성 트러블 케어 마케팅 확장</h4>
              <p style={{ fontSize: "12.5px", color: "#a1a1aa", lineHeight: "1.6", margin: 0 }}>
                환절기 유분 컨트롤 성능에 대한 긍정 리뷰가 지성 피부군에서 집중적으로 발생하고 있습니다. <span style={{ color: "#FF5E84", fontWeight: 600 }}>&apos;미나리+판토텐산&apos;</span>의 피지 조절 시너지를 강조한 &apos;피지 대청소&apos; 캠페인을 전개하여 도토리 패드(모공 탄력)와의 차별적 포지셔닝을 공고히 하십시오.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 라인업 비교 패널 */}
      <div className="lineup-sidebar-panel">
        {/* 라인업 감성 분포 비교 */}
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 16px 0" }}>
            라인업 감성 분포 비교
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "16px" }}>
            {[
              { name: "당근 패드", val: 82 },
              { name: "미나리 패드", val: 74 },
              { name: "블루 캐모마일", val: 68 },
              { name: "도토리 패드", val: 71 }
            ].map(p => (
              <div key={p.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12.5px" }}>
                  <span style={{ color: "#c4c4c7", fontWeight: 500 }}>{p.name}</span>
                  <span style={{ color: "#ffffff", fontWeight: 600 }}>{p.val}%</span>
                </div>
                {/* 긍정(핑크) vs 부정/중립(회색) 가로 누적 바 */}
                <div style={{ height: "6px", background: "#242428", borderRadius: "3px", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${p.val}%`, height: "100%", background: "#FF5E84", borderRadius: "3px 0 0 3px" }}></div>
                  <div style={{ flex: 1, height: "100%", background: "#444450" }}></div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: "14px", fontSize: "11px", color: "#8a8a93", marginTop: "6px", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5E84" }}></span>
                <span>긍정적</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#444450" }}></span>
                <span>부정적/중립</span>
              </div>
            </div>
          </div>
        </div>

        {/* 추천 피부 매트릭스 (포지셔닝 맵) */}
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 16px 0" }}>
            추천 피부 매트릭스
          </h2>

          <div style={{ 
            background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "16px",
            display: "flex", flexDirection: "column", gap: "12px", alignItems: "center"
          }}>
            {/* 커스텀 CSS 2D 포지셔닝 차트 */}
            <div style={{ 
              width: "220px", height: "220px", border: "1px solid #282830", position: "relative",
              background: "radial-gradient(circle, rgba(255,94,132,0.03) 0%, transparent 80%)"
            }}>
              {/* x축선 */}
              <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: "1px", background: "rgba(68, 68, 80, 0.4)" }} />
              {/* y축선 */}
              <div style={{ position: "absolute", top: 0, bottom: 0, left: "50%", width: "1px", background: "rgba(68, 68, 80, 0.4)" }} />

              {/* 축 라벨 */}
              <div style={{ position: "absolute", bottom: "-18px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", color: "#6b6b7a", fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap" }}>Skin Texture</div>
              <div style={{ position: "absolute", left: "-32px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: "9px", color: "#6b6b7a", fontWeight: "bold", textTransform: "uppercase", whiteSpace: "nowrap" }}>Problem Focus</div>

              {/* 매핑 점 1 (당근 패드: 민감/건성 - 우상향) */}
              <div 
                style={{ 
                  position: "absolute", right: "40px", top: "50px", width: "12px", height: "12px", 
                  borderRadius: "50%", background: "#FF5E84", border: "2px solid #ffffff",
                  boxShadow: "0 0 10px #FF5E84", cursor: "pointer", transition: "transform 0.2s"
                }}
                title="당근 패드 (Sensitive, Dry)"
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />

              {/* 매핑 점 2 (미나리 패드: 지성/트러블 - 좌하향) */}
              <div 
                style={{ 
                  position: "absolute", left: "50px", top: "120px", width: "12px", height: "12px", 
                  borderRadius: "50%", background: "#FF5E84", border: "2px solid #ffffff",
                  boxShadow: "0 0 10px #FF5E84", cursor: "pointer", transition: "transform 0.2s"
                }}
                title="미나리 패드 (Oily, Trouble)"
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />

              {/* 매핑 점 3 (블루 캐모마일: 쿨링/수분 - 중앙상향) */}
              <div 
                style={{ 
                  position: "absolute", left: "95px", top: "35px", width: "12px", height: "12px", 
                  borderRadius: "50%", background: "#7fb2f0", border: "2px solid #ffffff",
                  cursor: "pointer", transition: "transform 0.2s"
                }}
                title="블루 캐모마일 패드 (Cooling, Moisture)"
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />

              {/* 매핑 점 4 (도토리 패드: 모공/탄력 - 우하향) */}
              <div 
                style={{ 
                  position: "absolute", right: "30px", top: "150px", width: "12px", height: "12px", 
                  borderRadius: "50%", background: "#444450", border: "2px solid #ffffff",
                  cursor: "pointer", transition: "transform 0.2s"
                }}
                title="도토리 패드 (Pore, Elasticity)"
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.3)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>

            <p style={{ fontSize: "11px", color: "#6b6b7a", fontStyle: "italic", marginTop: "18px", textAlign: "center" }}>
              &ldquo;라인업 내 중복 포지셔닝 위험이 감지되지 않습니다.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

