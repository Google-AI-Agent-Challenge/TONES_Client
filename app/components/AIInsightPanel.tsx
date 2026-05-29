"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Lightbulb, 
  AlertOctagon, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  ChevronDown, 
  Filter, 
  CheckSquare, 
  Square,
  Lock,
  ArrowRight,
  Bookmark,
  FileText
} from "lucide-react";

export default function AIInsightPanel() {
  const [period, setPeriod] = useState("30일");
  const [product, setProduct] = useState("전체 제품");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  
  // 체크박스 상태
  const [checkedActions, setCheckedActions] = useState({
    action1: true,
    action2: true,
    action3: true,
  });

  const toggleAction = (key: "action1" | "action2" | "action3") => {
    setCheckedActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div 
      className="flex-1 flex overflow-hidden"
      style={{
        background: "#0c0c0e",
        fontFamily: "'Inter', 'Outfit', 'Noto Sans KR', sans-serif",
      }}
    >
      {/* 왼쪽 메인 컨텐츠 영역 */}
      <div 
        className="flex-1 flex flex-col h-full overflow-y-auto"
        style={{
          padding: "24px 32px",
          borderRight: "1px solid #1e1e24"
        }}
      >
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
              AI 인사이트
            </h1>
            <p style={{ fontSize: "13.5px", color: "#8a8a93", margin: 0 }}>
              AI가 리뷰 변화와 제품 리스크 신호를 자동으로 요약했어요.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* 기간 필터 */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowPeriodDropdown(!showPeriodDropdown);
                  setShowProductDropdown(false);
                }}
                style={{
                  background: "#16161a",
                  border: "1px solid #282830",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  color: "#e4e4e7",
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#444450"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#282830"}
              >
                <Calendar size={14} color="#FF5E84" />
                <span>{period}</span>
                <ChevronDown size={14} color="#8a8a93" />
              </button>
              {showPeriodDropdown && (
                <div style={{
                  position: "absolute", top: "42px", right: 0, background: "#16161a", border: "1px solid #282830",
                  borderRadius: "8px", width: "120px", zIndex: 100, overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                  {["7일", "30일", "90일"].map(p => (
                    <button key={p} 
                      onClick={() => { setPeriod(p); setShowPeriodDropdown(false); }}
                      style={{
                        width: "100%", padding: "10px 14px", textAlign: "left", background: "none", border: "none",
                        color: period === p ? "#FF5E84" : "#c4c4c7", fontSize: "13px", cursor: "pointer", display: "block"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#202026"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 제품 필터 */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowProductDropdown(!showProductDropdown);
                  setShowPeriodDropdown(false);
                }}
                style={{
                  background: "#16161a",
                  border: "1px solid #282830",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  color: "#e4e4e7",
                  fontSize: "13px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#444450"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#282830"}
              >
                <Filter size={14} color="#f9a2c0" />
                <span>{product}</span>
                <ChevronDown size={14} color="#8a8a93" />
              </button>
              {showProductDropdown && (
                <div style={{
                  position: "absolute", top: "42px", right: 0, background: "#16161a", border: "1px solid #282830",
                  borderRadius: "8px", width: "160px", zIndex: 100, overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                  {["전체 제품", "당근 패드", "미나리 패드", "블루 캐모마일 패드"].map(prod => (
                    <button key={prod} 
                      onClick={() => { setProduct(prod); setShowProductDropdown(false); }}
                      style={{
                        width: "100%", padding: "10px 14px", textAlign: "left", background: "none", border: "none",
                        color: product === prod ? "#FF5E84" : "#c4c4c7", fontSize: "13px", cursor: "pointer", display: "block"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#202026"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      {prod}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 새 인사이트 생성 버튼 */}
            <button
              style={{
                background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(255, 94, 132, 0.3)",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 94, 132, 0.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 94, 132, 0.3)";
              }}
            >
              <Sparkles size={14} />
              <span>새 인사이트 생성</span>
            </button>
          </div>
        </div>

        {/* 4개 핵심 지표 카드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {/* 카드 1 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 500 }}>오늘의 핵심 인사이트</span>
              <div style={{ background: "#251b22", padding: "6px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Lightbulb size={16} color="#FF5E84" />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>8건</div>
            <div style={{ fontSize: "11px", color: "#FF5E84", fontWeight: 600 }}>+3건 증가</div>
          </div>

          {/* 카드 2 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 500 }}>확인 필요 리뷰</span>
              <div style={{ background: "#2c1c20", padding: "6px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <AlertOctagon size={16} color="#ff8270" />
              </div>
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>126건</div>
            <div style={{ fontSize: "11px", color: "#ff8270", fontWeight: 500 }}>트러블 관련 리뷰 중심</div>
          </div>

          {/* 카드 3 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 500 }}>긍정 반응 증가</span>
              <div style={{ background: "#182620", padding: "6px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TrendingUp size={16} color="#60a870" />
              </div>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>수분감, 진정</div>
            <div style={{ fontSize: "11px", color: "#60a870", fontWeight: 600 }}>+18.4%</div>
          </div>

          {/* 카드 4 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 500 }}>부정 신호 증가</span>
              <div style={{ background: "#262224", padding: "6px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <TrendingDown size={16} color="#9999aa" />
              </div>
            </div>
            <div style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>따가움, 좁쌀</div>
            <div style={{ fontSize: "11px", color: "#9999aa", fontWeight: 600 }}>+12.8%</div>
          </div>
        </div>

        {/* 주요 분석 리스트 */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h2 style={{ fontSize: "16px", fontWeight: 600, color: "#ffffff", margin: 0 }}>주요 분석 리스트</h2>
            <button style={{
              background: "none", border: "1px solid #282830", color: "#8a8a93", borderRadius: "6px", padding: "5px 10px",
              fontSize: "11px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer"
            }}>
              <Filter size={11} />
              필터링
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* 분석 카드 1 */}
            <div style={{
              background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    &apos;당근 패드&apos; 트러블 언급 증가
                  </h3>
                  <span style={{ fontSize: "12px", color: "#ff8270", fontWeight: 600 }}>+12.8%</span>
                </div>
                <span style={{ background: "#2c1c20", border: "1px solid #FF5E8440", color: "#FF5E84", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
                  확인 필요
                </span>
              </div>

              {/* 태그 영역 */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
                {["#따가움", "#좁쌀", "#민감성피부"].map(tag => (
                  <span key={tag} style={{ background: "#24242e", color: "#9999aa", fontSize: "11px", padding: "2px 8px", borderRadius: "4px" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                지난 3일간 민감성 피부 타입을 가진 사용자들 사이에서 &apos;따가움&apos;과 &apos;좁쌀&apos; 키워드 언급이 급증했습니다. 주로 환절기 외부 환경 변화와 관련된 피드백으로 분석됩니다.
              </p>

              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{
                  background: "#FF5E84", border: "none", color: "#ffffff", fontSize: "12.5px", fontWeight: 600,
                  padding: "8px 16px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#e64d71"}
                onMouseLeave={e => e.currentTarget.style.background = "#FF5E84"}
                >
                  관련 리뷰 보기
                </button>
                <button style={{
                  background: "none", border: "1px solid #282830", color: "#c4c4c7", fontSize: "12.5px", fontWeight: 500,
                  padding: "8px 16px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#444450"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#282830"}
                >
                  📌 대시보드 고정
                </button>
              </div>
            </div>

            {/* 분석 카드 2 */}
            <div style={{
              background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    &apos;미나리 패드&apos; 진정 효과 만족도 상승
                  </h3>
                  <span style={{ fontSize: "12px", color: "#60a870", fontWeight: 600 }}>+21.6%</span>
                </div>
                <span style={{ background: "#182620", border: "1px solid #60a87040", color: "#60a870", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
                  긍정 증가
                </span>
              </div>

              <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                붉은기 진정 및 쿨링 효과에 대한 구체적인 칭찬 리뷰가 다수 포착되었습니다. 인플루언서 마케팅 캠페인 시점과 맞물려 긍정 바이럴이 형성되고 있습니다.
              </p>

              <div style={{ display: "flex" }}>
                <button style={{
                  background: "none", border: "1px solid #FF5E84", color: "#FF5E84", fontSize: "12.5px", fontWeight: 600,
                  padding: "8px 16px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#FF5E8420";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "none";
                }}
                >
                  상세 분석 보기
                </button>
              </div>
            </div>

            {/* 분석 카드 3 */}
            <div style={{
              background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
                    &apos;블루 캐모마일 패드&apos; 보습 만족 vs 끈적임 지적
                  </h3>
                </div>
                <span style={{ background: "#24242e", border: "1px solid #444450", color: "#9999aa", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "6px" }}>
                  복합 감성
                </span>
              </div>

              <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                보습력에 대한 만족도는 최상위권을 유지하고 있으나, 흡수 후 잔여감(끈적임)에 대한 아쉬움이 공존합니다. 제형 개선 혹은 사용 가이드 업데이트가 필요할 수 있습니다.
              </p>

              <div style={{ display: "flex" }}>
                <button style={{
                  background: "none", border: "1px solid #444450", color: "#c4c4c7", fontSize: "12.5px", fontWeight: 500,
                  padding: "8px 16px", borderRadius: "8px", cursor: "pointer", transition: "all 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#666675"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#444450"}
                >
                  리뷰 맥락 보기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 & 키워드 영역 (하단) */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", marginBottom: "32px" }}>
          {/* 리스크 키워드 트렌드 (차트) */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: 0 }}>리스크 키워드 트렌드</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF5E84", display: "inline-block" }}></span>
                <span style={{ fontSize: "11px", color: "#8a8a93" }}>부정 지수</span>
              </div>
            </div>

            {/* SVG 커스텀 바 차트 */}
            <div style={{ height: "180px", display: "flex", alignItems: "end", justifyContent: "space-between", padding: "0 10px" }}>
              {[
                { label: "월", val: 18 },
                { label: "화", val: 24 },
                { label: "수", val: 32 },
                { label: "목", val: 68 },
                { label: "금", val: 78 },
                { label: "토", val: 94 },
                { label: "일", val: 70 }
              ].map(d => {
                const isHighlight = d.label === "토";
                return (
                  <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, gap: "10px" }}>
                    <div style={{
                      width: "32px",
                      height: `${d.val * 1.3}px`,
                      background: isHighlight 
                        ? "linear-gradient(to top, #FF5E84 0%, #f9a2c0 100%)" 
                        : "rgba(255, 94, 132, 0.15)",
                      borderRadius: "6px 6px 0 0",
                      transition: "all 0.3s ease",
                      position: "relative"
                    }}
                    title={`${d.val} index`}
                    onMouseEnter={e => {
                      if (!isHighlight) e.currentTarget.style.background = "rgba(255, 94, 132, 0.3)";
                    }}
                    onMouseLeave={e => {
                      if (!isHighlight) e.currentTarget.style.background = "rgba(255, 94, 132, 0.15)";
                    }}
                    >
                      {isHighlight && (
                        <div style={{
                          position: "absolute", top: "-26px", left: "50%", transform: "translateX(-50%)",
                          background: "#FF5E84", color: "#fff", fontSize: "10px", fontWeight: "bold",
                          padding: "2px 5px", borderRadius: "4px", whiteSpace: "nowrap"
                        }}>
                          {d.val}%
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: "11px", color: isHighlight ? "#FF5E84" : "#6b6b7a", fontWeight: isHighlight ? "bold" : "normal" }}>
                      {d.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 5 리스크 키워드 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: "0 0 16px 0" }}>
              Top 5 리스크 키워드 (급상승)
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { rank: "01", name: "따가움", count: 1248, pct: 90 },
                { rank: "02", name: "좁쌀", count: 842, pct: 65 },
                { rank: "03", name: "건조함", count: 621, pct: 50 },
                { rank: "04", name: "가려움", count: 412, pct: 35 },
                { rank: "05", name: "배송 파손", count: 198, pct: 18 }
              ].map(k => (
                <div key={k.rank} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "12px", color: "#FF5E84", fontWeight: 700, fontStyle: "italic" }}>
                        {k.rank}
                      </span>
                      <span style={{ fontSize: "12.5px", color: "#e4e4e7", fontWeight: 500 }}>
                        {k.name}
                      </span>
                    </div>
                    <span style={{ fontSize: "11.5px", color: "#8a8a93" }}>
                      {k.count.toLocaleString()}건
                    </span>
                  </div>
                  {/* 프로그레스 바 */}
                  <div style={{ height: "6px", background: "#242428", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{
                      width: `${k.pct}%`,
                      height: "100%",
                      background: "linear-gradient(to right, #d83e63 0%, #FF5E84 100%)",
                      borderRadius: "3px"
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 인사이트 기록 히스토리 */}
        <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #24242c" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: 0 }}>인사이트 기록 히스토리</h3>
            <button style={{ background: "none", border: "none", color: "#6b6b7a", cursor: "pointer" }}>•••</button>
          </div>
          
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #24242c" }}>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#6b6b7a", fontWeight: 500, fontSize: "12px" }}>일시</th>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#6b6b7a", fontWeight: 500, fontSize: "12px" }}>카테고리</th>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#6b6b7a", fontWeight: 500, fontSize: "12px" }}>인사이트 제목</th>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#6b6b7a", fontWeight: 500, fontSize: "12px" }}>관련 제품</th>
                <th style={{ padding: "12px 20px", textAlign: "left", color: "#6b6b7a", fontWeight: 500, fontSize: "12px" }}>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #202026" }}>
                <td style={{ padding: "14px 20px", color: "#8a8a93" }}>2023.10.27 14:20</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ background: "#2c1c20", color: "#FF5E84", border: "1px solid #FF5E8430", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 500 }}>
                    리스크
                  </span>
                </td>
                <td style={{ padding: "14px 20px", color: "#ffffff", fontWeight: 500 }}>당근 패드 민감성 트러블 경고</td>
                <td style={{ padding: "14px 20px", color: "#c4c4c7" }}>당근 패드</td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5E84" }}></span>
                    <span style={{ color: "#FF5E84", fontWeight: 500 }}>대응 완료</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "14px 20px", color: "#8a8a93" }}>2023.10.26 09:15</td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ background: "#1c1e2c", color: "#7fb2f0", border: "1px solid #7fb2f030", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 500 }}>
                    기회
                  </span>
                </td>
                <td style={{ padding: "14px 20px", color: "#ffffff", fontWeight: 500 }}>미나리 패드 쿨링 효과 바이럴 포착</td>
                <td style={{ padding: "14px 20px", color: "#c4c4c7" }}>미나리 패드</td>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8a8a93" }}></span>
                    <span style={{ color: "#8a8a93" }}>검토 중</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 우측 AI 브리핑 요약 사이드바 */}
      <div 
        style={{
          width: "360px",
          minWidth: "360px",
          background: "#121214",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          overflowY: "auto",
          height: "100%"
        }}
      >
        <div>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }}>
            <Sparkles size={16} color="#FF5E84" />
            AI 브리핑 요약
          </h2>
          
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "16px" }}>
            <h4 style={{ fontSize: "12px", color: "#FF5E84", fontWeight: 600, margin: "0 0 8px 0" }}>최근 리뷰 흐름</h4>
            <p style={{ fontSize: "13px", color: "#c4c4c7", lineHeight: "1.6", margin: 0 }}>
              전체적으로 피부 진정 라인의 수요가 급증하고 있으나, 특정 배치의 당근 패드에서 민감도 이슈가 감지됩니다. 소비자들은 &apos;즉각적인 효과&apos;를 가장 중시하는 경향을 보입니다.
            </p>
          </div>
        </div>

        {/* 추천 대응 액션 */}
        <div>
          <h3 style={{ fontSize: "13.5px", fontWeight: 600, color: "#ffffff", marginBottom: "12px" }}>추천 대응 액션</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* 액션 1 */}
            <div 
              onClick={() => toggleAction("action1")}
              style={{
                background: "#16161a", border: `1px solid ${checkedActions.action1 ? "#FF5E8440" : "#282830"}`,
                borderRadius: "8px", padding: "12px 14px", display: "flex", gap: "10px", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              {checkedActions.action1 ? <CheckSquare size={16} color="#FF5E84" /> : <Square size={16} color="#8a8a93" />}
              <span style={{ fontSize: "12px", color: checkedActions.action1 ? "#ffffff" : "#8a8a93", lineHeight: "1.4", transition: "all 0.15s" }}>
                민감성 피부를 위한 진정 가이드 공식 채널 추가
              </span>
            </div>

            {/* 액션 2 */}
            <div 
              onClick={() => toggleAction("action2")}
              style={{
                background: "#16161a", border: `1px solid ${checkedActions.action2 ? "#FF5E8440" : "#282830"}`,
                borderRadius: "8px", padding: "12px 14px", display: "flex", gap: "10px", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              {checkedActions.action2 ? <CheckSquare size={16} color="#FF5E84" /> : <Square size={16} color="#8a8a93" />}
              <span style={{ fontSize: "12px", color: checkedActions.action2 ? "#ffffff" : "#8a8a93", lineHeight: "1.4", transition: "all 0.15s" }}>
                상세페이지 하단 &apos;패치 테스트&apos; 권장 문구 강화
              </span>
            </div>

            {/* 액션 3 */}
            <div 
              onClick={() => toggleAction("action3")}
              style={{
                background: "#16161a", border: `1px solid ${checkedActions.action3 ? "#FF5E8440" : "#282830"}`,
                borderRadius: "8px", padding: "12px 14px", display: "flex", gap: "10px", cursor: "pointer", transition: "all 0.15s"
              }}
            >
              {checkedActions.action3 ? <CheckSquare size={16} color="#FF5E84" /> : <Square size={16} color="#8a8a93" />}
              <span style={{ fontSize: "12px", color: checkedActions.action3 ? "#ffffff" : "#8a8a93", lineHeight: "1.4", transition: "all 0.15s" }}>
                특이사항 리뷰 원문 리스트 CS팀 실시간 공유
              </span>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <button style={{
            background: "#FF5E84", border: "none", color: "#ffffff", padding: "12px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "6px", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#e64d71"}
          onMouseLeave={e => e.currentTarget.style.background = "#FF5E84"}
          >
            <Bookmark size={14} />
            인사이트 저장
          </button>
          
          <button style={{
            background: "none", border: "1px solid #282830", color: "#c4c4c7", padding: "12px", borderRadius: "8px",
            fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: "6px", transition: "all 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#444450"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "#282830"}
          >
            <FileText size={14} />
            리포트 만들기
          </button>
        </div>
      </div>
    </div>
  );
}
