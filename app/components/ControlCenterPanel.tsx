"use client";

import { useState } from "react";
import { 
  RotateCw, 
  Brain, 
  Save, 
  Key, 
  Plus, 
  CheckSquare, 
  Square,
  ArrowRight,
  Terminal,
  Play,
  Cpu,
  SaveAll
} from "lucide-react";

export default function ControlCenterPanel() {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [attributes, setAttributes] = useState({
    ingredients: true,
    moisture: true,
    texture: false,
    scent: true,
  });
  const [confidence, setConfidence] = useState(85);

  const toggleAttribute = (key: keyof typeof attributes) => {
    setAttributes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div 
      className="flex-1 flex overflow-hidden"
      style={{
        background: "#0c0c0e",
        fontFamily: "'Inter', 'Outfit', 'Noto Sans KR', sans-serif"
      }}
    >
      {/* 왼쪽 메인 컨텐츠 */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>
                제어 센터
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(96, 168, 112, 0.1)", border: "1px solid rgba(96, 168, 112, 0.2)", borderRadius: "20px", padding: "2px 10px" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span style={{ fontSize: "10.5px", color: "#60a870", fontWeight: 600 }}>시스템 정상 작동 중</span>
              </div>
            </div>
            <p style={{ fontSize: "13.5px", color: "#8a8a93", margin: 0 }}>
              AI 분석 조건과 대시보드 동작 방식을 관리합니다.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", gap: "14px", fontSize: "12.5px" }}>
              <span style={{ color: "#6b6b7a", cursor: "pointer" }} className="hover:text-white transition-colors">Date Range</span>
              <span style={{ color: "#6b6b7a", cursor: "pointer" }} className="hover:text-white transition-colors">Product Selection</span>
            </div>
            
            <button 
              onClick={handleSave}
              style={{
                background: saveSuccess ? "#60a870" : "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", 
                border: "none", color: "#ffffff", padding: "8px 20px", borderRadius: "8px",
                fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px", cursor: "pointer",
                boxShadow: saveSuccess ? "0 4px 15px rgba(96, 168, 112, 0.25)" : "0 4px 15px rgba(255, 94, 132, 0.25)",
                transition: "all 0.2s"
              }}
            >
              <SaveAll size={14} />
              <span>{saveSuccess ? "변경사항 저장완료!" : "변경 사항 저장"}</span>
            </button>
          </div>
        </div>

        {/* 4개 핵심 제어 메트릭 카드 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {/* 카드 1 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ background: "rgba(255, 94, 132, 0.1)", padding: "10px", borderRadius: "10px" }}>
              <RotateCw size={18} color="#FF5E84" />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500, display: "block" }}>데이터 동기화</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>정상 (5분 전)</span>
            </div>
          </div>

          {/* 카드 2 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ background: "rgba(255, 94, 132, 0.1)", padding: "10px", borderRadius: "10px" }}>
              <Brain size={18} color="#FF5E84" />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500, display: "block" }}>AI 분석 엔진</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>활성 (Active)</span>
            </div>
          </div>

          {/* 카드 3 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ background: "rgba(255, 94, 132, 0.1)", padding: "10px", borderRadius: "10px" }}>
              <Save size={18} color="#FF5E84" />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500, display: "block" }}>위젯 레이아웃</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>자동 저장 ON</span>
            </div>
          </div>

          {/* 카드 4 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ background: "rgba(255, 94, 132, 0.1)", padding: "10px", borderRadius: "10px" }}>
              <Key size={18} color="#FF5E84" />
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#8a8a93", fontWeight: 500, display: "block" }}>API 토큰</span>
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>유효 (Valid)</span>
            </div>
          </div>
        </div>

        {/* 데이터 소스 관리 */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, color: "#ffffff", margin: 0 }}>데이터 소스 관리</h2>
            <button style={{ background: "none", border: "none", color: "#FF5E84", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
              <Plus size={12} />
              소스 추가
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* 소스 1 */}
            <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "#24242e", width: "36px", height: "36px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>🌿</div>
                <div>
                  <h4 style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>Olive Young API</h4>
                  <span style={{ fontSize: "11px", color: "#8a8a93" }}>실시간 제품 리뷰 연동</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", color: "#60a870", fontWeight: 600 }}>연결됨</span>
                <button style={{ background: "#202026", border: "1px solid #282830", color: "#c4c4c7", fontSize: "11.5px", fontWeight: 500, padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>로그 보기</button>
              </div>
            </div>

            {/* 소스 2 */}
            <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "#24242e", width: "36px", height: "36px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>💻</div>
                <div>
                  <h4 style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>In-house Mall (자사몰)</h4>
                  <span style={{ fontSize: "11px", color: "#8a8a93" }}>구매 데이터 및 성향 분석</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", color: "#60a870", fontWeight: 600 }}>연결됨</span>
                <button style={{ background: "#202026", border: "1px solid #282830", color: "#c4c4c7", fontSize: "11.5px", fontWeight: 500, padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>로그 보기</button>
              </div>
            </div>

            {/* 소스 3 (인증 필요) */}
            <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ background: "#2c1c20", width: "36px", height: "36px", borderRadius: "8px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "14px" }}>📞</div>
                <div>
                  <h4 style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", margin: "0 0 2px 0" }}>CS Data (Zendesk)</h4>
                  <span style={{ fontSize: "11px", color: "#8a8a93" }}>고객 문의 및 클레임 텍스트</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ fontSize: "12px", color: "#FF5E84", fontWeight: 600 }}>인증 필요</span>
                <button style={{ background: "#FF5E84", border: "none", color: "#ffffff", fontSize: "11.5px", fontWeight: 600, padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}>재연결</button>
              </div>
            </div>
          </div>
        </div>

        {/* AI 분석 설정 & 자연어 명령 설정 */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "20px" }}>
          {/* AI 분석 설정 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: "0 0 16px 0" }}>AI 분석 설정</h3>
            
            <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 600, display: "block", marginBottom: "8px" }}>주요 분석 속성 (Attributes)</span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {/* 속성 토글 1 */}
              <div 
                onClick={() => toggleAttribute("ingredients")}
                style={{
                  background: "#121214", border: "1px solid #202026", borderRadius: "8px", padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"
                }}
              >
                {attributes.ingredients ? <CheckSquare size={15} color="#FF5E84" /> : <Square size={15} color="#6b6b7a" />}
                <span style={{ fontSize: "12.5px", color: attributes.ingredients ? "#ffffff" : "#8a8a93" }}>Ingredients</span>
              </div>

              {/* 속성 토글 2 */}
              <div 
                onClick={() => toggleAttribute("moisture")}
                style={{
                  background: "#121214", border: "1px solid #202026", borderRadius: "8px", padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"
                }}
              >
                {attributes.moisture ? <CheckSquare size={15} color="#FF5E84" /> : <Square size={15} color="#6b6b7a" />}
                <span style={{ fontSize: "12.5px", color: attributes.moisture ? "#ffffff" : "#8a8a93" }}>Moisture</span>
              </div>

              {/* 속성 토글 3 */}
              <div 
                onClick={() => toggleAttribute("texture")}
                style={{
                  background: "#121214", border: "1px solid #202026", borderRadius: "8px", padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"
                }}
              >
                {attributes.texture ? <CheckSquare size={15} color="#FF5E84" /> : <Square size={15} color="#6b6b7a" />}
                <span style={{ fontSize: "12.5px", color: attributes.texture ? "#ffffff" : "#8a8a93" }}>Texture</span>
              </div>

              {/* 속성 토글 4 */}
              <div 
                onClick={() => toggleAttribute("scent")}
                style={{
                  background: "#121214", border: "1px solid #202026", borderRadius: "8px", padding: "10px 12px",
                  display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"
                }}
              >
                {attributes.scent ? <CheckSquare size={15} color="#FF5E84" /> : <Square size={15} color="#6b6b7a" />}
                <span style={{ fontSize: "12.5px", color: attributes.scent ? "#ffffff" : "#8a8a93" }}>Scent</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", color: "#8a8a93", fontWeight: 600 }}>신뢰도 임계값 (Confidence)</span>
              <span style={{ fontSize: "13px", color: "#FF5E84", fontWeight: 700 }}>{confidence}%</span>
            </div>
            {/* 임계값 레인지 슬라이더 */}
            <input 
              type="range" 
              min="50" 
              max="100" 
              value={confidence} 
              onChange={e => setConfidence(parseInt(e.target.value))}
              style={{
                width: "100%", accentColor: "#FF5E84", background: "#242428", height: "6px", borderRadius: "3px", outline: "none", marginBottom: "12px"
              }}
            />
            <p style={{ fontSize: "11px", color: "#6b6b7a", margin: 0 }}>
              정확도가 이 수치 이상인 인사이트만 대시보드에 노출됩니다.
            </p>
          </div>

          {/* 자연어 명령 설정 */}
          <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff", margin: "0 0 16px 0" }}>자연어 명령 설정</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              {[
                "“트러블 차트 메인에 고정해줘”",
                "“부정 트렌드 위주로 요약 보고서”",
                "“성분별 선호도 점수 산출”"
              ].map(cmd => (
                <div key={cmd} style={{
                  background: "#121214", border: "1px solid #202026", borderRadius: "8px", padding: "10px 14px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"
                }}
                className="hover:border-pink-500/30 transition-colors"
                >
                  <span style={{ fontSize: "12.5px", color: "#c4c4c7", fontWeight: 500 }}>{cmd}</span>
                  <ArrowRight size={13} color="#6b6b7a" />
                </div>
              ))}

              <div style={{
                border: "1px dashed #282830", borderRadius: "8px", padding: "10px", textAlign: "center",
                color: "#6b6b7a", fontSize: "12.5px", cursor: "pointer", transition: "all 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#444450"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#282830"}
              >
                + 새 템플릿 등록
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 System Monitor 사이드바 */}
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
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 16px 0" }}>
            <Terminal size={16} color="#FF5E84" />
            System Monitor
          </h2>

          {/* SYSTEM LOGS (터미널) */}
          <div style={{ marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "8px", textTransform: "uppercase" }}>System Logs</span>
            <div style={{
              background: "#08080a", border: "1px solid #1e1e24", borderRadius: "8px", padding: "14px",
              fontFamily: "'Courier New', Courier, monospace", fontSize: "11px", display: "flex", flexDirection: "column", gap: "6px",
              lineHeight: "1.4"
            }}>
              <div>
                <span style={{ color: "#6b6b7a" }}>14:52:10</span>{" "}
                <span style={{ color: "#60a870", fontWeight: "bold" }}>[OK]</span>{" "}
                <span style={{ color: "#c4c4c7" }}>Olive Young Review Sync Complete.</span>
              </div>
              <div>
                <span style={{ color: "#6b6b7a" }}>14:50:05</span>{" "}
                <span style={{ color: "#7fb2f0", fontWeight: "bold" }}>[INFO]</span>{" "}
                <span style={{ color: "#c4c4c7" }}>AI Engine re-calibrated for &apos;Scent&apos;.</span>
              </div>
              <div>
                <span style={{ color: "#6b6b7a" }}>14:45:00</span>{" "}
                <span style={{ color: "#60a870", fontWeight: "bold" }}>[OK]</span>{" "}
                <span style={{ color: "#c4c4c7" }}>Auto-save: Dashboard Layout #42.</span>
              </div>
              <div>
                <span style={{ color: "#6b6b7a" }}>14:38:12</span>{" "}
                <span style={{ color: "#FF5E84", fontWeight: "bold" }}>[ERR]</span>{" "}
                <span style={{ color: "#FF5E84" }}>Zendesk API Token Expired.</span>
              </div>
            </div>
          </div>

          {/* RECENT EXECUTIONS */}
          <div style={{ marginBottom: "14px" }}>
            <span style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "12px", textTransform: "uppercase" }}>Recent Executions</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", background: "#16161a", border: "1px solid #282830", borderRadius: "10px", padding: "14px 16px" }}>
              {/* 태스크 1 */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                  <span style={{ color: "#c4c4c7", fontWeight: 600 }}>데이터 전처리 엔진</span>
                  <span style={{ color: "#8a8a93" }}>3분 전</span>
                </div>
                <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden", marginBottom: "4px" }}>
                  <div style={{ width: "100%", height: "100%", background: "#60a870" }}></div>
                </div>
                <span style={{ fontSize: "10.5px", color: "#60a870" }}>✓ Success (Processed 2,490 records)</span>
              </div>

              {/* 태스크 2 (로딩바) */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px" }}>
                  <span style={{ color: "#c4c4c7", fontWeight: 600 }}>인플루언서 임팩트 계산</span>
                  <span style={{ color: "#8a8a93" }}>12분 전</span>
                </div>
                <div style={{ height: "4px", background: "#242428", borderRadius: "2px", overflow: "hidden", marginBottom: "4px" }}>
                  <div style={{ width: "65%", height: "100%", background: "#FF5E84" }} className="animate-pulse"></div>
                </div>
                <span style={{ fontSize: "10.5px", color: "#FF5E84", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className="animate-spin inline-block">🔄</span> Running (In progress...)
                </span>
              </div>
            </div>
          </div>

          {/* NL ANALYSIS RESULT */}
          <div>
            <span style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, display: "block", marginBottom: "8px", textTransform: "uppercase" }}>NL Analysis Result</span>
            <div style={{ background: "#16161a", border: "1px solid #282830", borderRadius: "8px", padding: "14px" }}>
              <div style={{ fontSize: "12px", color: "#FF5E84", fontWeight: 600, marginBottom: "6px", display: "flex", gap: "6px" }}>
                <span>🤖</span>
                <span>Query: &quot;최근 7일 트러블 급증 이유 요약&quot;</span>
              </div>
              <p style={{ fontSize: "11.5px", color: "#9999aa", lineHeight: "1.5", margin: 0 }}>
                A: [성분] 티트리 오일 함량 변화에 따른 민감성 피부군의 복합 자극 증세가 감지되며, 당근 패드 교차 사용 시 완화...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
