"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  BrainCircuit,
  MessageSquareText,
  AlignJustify,
  SlidersHorizontal,
  LogIn,
  LogOut,
  User,
  Lock,
  X,
  CheckCircle2
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "대시보드", active: true },
  { icon: BrainCircuit, label: "AI 인사이트", active: false },
  { icon: MessageSquareText, label: "리뷰 분석", active: false },
  { icon: AlignJustify, label: "패드 레시피 라인업", active: false },
  { icon: SlidersHorizontal, label: "제어 센터", active: false },
];

interface SidebarProps {
  activeTab: string;
  onTabSelect: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabSelect }: SidebarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 클라이언트 사이드 로그인 상태 복원
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setSuccessMsg("인증에 성공했습니다!");
      setErrorMsg("");
      setTimeout(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        setShowLoginModal(false);
        setSuccessMsg("");
        setUsername("");
        setPassword("");
      }, 1000);
    } else {
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <aside
      className="flex flex-col h-full"
      style={{
        width: "220px",
        minWidth: "220px",
        background: "#1a1a1f",
        borderRight: "1px solid #2a2a2e",
        padding: "28px 0 24px 0",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 20px 28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo.png" // public 폴더 기준 경로
            alt="브랜드 로고"
            width={130}
            height={20}
            priority // 화면에 가장 먼저 렌더링되도록 우선순위 부여
          />
        </div>
      </div>

      {/* Nav Items */}
      <nav
        className="flex flex-col gap-1"
        style={{ padding: "0 12px", flex: 1 }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onTabSelect(item.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 12px",
                borderRadius: "8px",
                border: "1px solid transparent",
                background: isActive ? "#f9a2c0" : "transparent",
                color: isActive ? "#1a1a1f" : "#9999aa",
                fontSize: "13.5px",
                fontWeight: isActive ? 700 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s ease",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#e8e8ec";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#2a2a2e";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#9999aa";
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Auth Section */}
      <div style={{ padding: "0 12px", marginTop: "auto" }}>
        {!isLoggedIn ? (
          <button
            onClick={() => setShowLoginModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 94, 132, 0.25)",
              background: "rgba(255, 94, 132, 0.08)",
              color: "#FF5E84",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
              boxShadow: "0 4px 12px rgba(255, 94, 132, 0.05)"
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#FF5E84";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(255, 94, 132, 0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 94, 132, 0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "#FF5E84";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(255, 94, 132, 0.05)";
            }}
          >
            <LogIn size={15} />
            <span>관리자 로그인</span>
          </button>
        ) : (
          <div
            style={{
              background: "#121214",
              border: "1px solid #282830",
              borderRadius: "10px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Profile Avatar with dynamic gradient */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF5E84 0%, #7fb2f0 100%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "13px",
                  flexShrink: 0
                }}
              >
                A
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  관리자 (Admin)
                </div>
                <div style={{ fontSize: "10.5px", color: "#6b6b7a", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  admin@tones.ai
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "8px",
                borderRadius: "6px",
                background: "rgba(255, 94, 132, 0.1)",
                border: "1px solid rgba(255, 94, 132, 0.2)",
                color: "#FF5E84",
                fontSize: "11.5px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 94, 132, 0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 94, 132, 0.1)";
              }}
            >
              <LogOut size={13} />
              <span>로그아웃</span>
            </button>
          </div>
        )}
      </div>

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            animation: "fadeIn 0.2s ease-out"
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              width: "clamp(320px, 90%, 400px)",
              background: "#16161a",
              border: "1px solid rgba(255, 94, 132, 0.25)",
              borderRadius: "16px",
              padding: "32px 24px",
              position: "relative",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 94, 132, 0.05)",
              animation: "slideUp 0.2s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Styles for animations */}
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes slideUp {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
            `}</style>

            {/* Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#6b6b7a",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.15s ease"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                (e.currentTarget as HTMLButtonElement).style.background = "#202026";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#6b6b7a";
                (e.currentTarget as HTMLButtonElement).style.background = "none";
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "28px" }}>
              <div
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "50%",
                  background: "rgba(255, 94, 132, 0.1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "16px",
                  border: "1px solid rgba(255, 94, 132, 0.2)"
                }}
              >
                <Lock size={22} color="#FF5E84" />
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                TONES 관리자 로그인
              </h3>
              <p style={{ fontSize: "12.5px", color: "#8a8a93", margin: 0 }}>
                시스템 제어 및 데이터 관리를 위한 인증
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Username Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>
                  Username
                </label>
                <div style={{ position: "relative" }}>
                  <User style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                  <input
                    type="text"
                    required
                    placeholder="아이디를 입력하세요"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#121214",
                      border: "1px solid #282830",
                      borderRadius: "8px",
                      padding: "10px 12px 10px 38px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                      transition: "all 0.2s ease"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                  <input
                    type="password"
                    required
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      background: "#121214",
                      border: "1px solid #282830",
                      borderRadius: "8px",
                      padding: "10px 12px 10px 38px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                      transition: "all 0.2s ease"
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                    onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                  />
                </div>
              </div>

              {/* Account Helper Card */}
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid #282830",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "11.5px",
                  color: "#8a8a93",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span>💡 테스트 계정 정보</span>
                <span style={{ color: "#FF5E84", fontWeight: 600 }}>admin / 1234</span>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div style={{ fontSize: "12px", color: "#FF5E84", textAlign: "center", fontWeight: 500 }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {/* Success Message */}
              {successMsg && (
                <div style={{ fontSize: "12px", color: "#60a870", textAlign: "center", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                  <CheckCircle2 size={12} color="#60a870" /> {successMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)",
                  transition: "all 0.2s ease",
                  marginTop: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 94, 132, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 94, 132, 0.25)";
                }}
              >
                <span>인증 완료</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
