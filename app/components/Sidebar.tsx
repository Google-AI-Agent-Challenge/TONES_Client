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
  CheckCircle2,
  Mail,
  Key
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
  
  // 로그인 폼 입력값
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 회원가입 폼 입력값
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");

  // 아이디 찾기 폼 입력값
  const [findEmail, setFindEmail] = useState("");

  // 비밀번호 찾기 폼 입력값
  const [findUsername, setFindUsername] = useState("");
  const [findPwEmail, setFindPwEmail] = useState("");

  // 모달 모드: login | signup | findId | findPw
  const [modalMode, setModalMode] = useState<"login" | "signup" | "findId" | "findPw">("login");
  
  // 알림 메시지 상태
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 가입된 유저 리스트 및 현재 유저 상태
  const [users, setUsers] = useState<{username:string;password:string;email:string;}[]>([]);
  const [currentUser, setCurrentUser] = useState<{username:string;email:string;} | null>(null);

  // 1. 초기 로드 및 세션 복원
  useEffect(() => {
    const storedUsers = localStorage.getItem("tones_users");
    if (!storedUsers) {
      const defaultUsers = [{ username: "admin", password: "1234", email: "admin@tones.ai" }];
      localStorage.setItem("tones_users", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    } else {
      setUsers(JSON.parse(storedUsers));
    }

    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
      const curr = localStorage.getItem("current_user");
      if (curr) {
        setCurrentUser(JSON.parse(curr));
      }
    }
  }, [isLoggedIn]);

  // 입력 폼 초기화 유틸
  const resetForm = () => {
    setUsername("");
    setPassword("");
    setRegUsername("");
    setRegPassword("");
    setRegConfirmPassword("");
    setRegEmail("");
    setFindEmail("");
    setFindUsername("");
    setFindPwEmail("");
    setErrorMsg("");
    setSuccessMsg("");
  };

  // 로그인 제출
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMatch = users.find(u => u.username === username && u.password === password);
    if (userMatch) {
      setSuccessMsg("인증에 성공했습니다!");
      setErrorMsg("");
      setTimeout(() => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("current_user", JSON.stringify(userMatch));
        setShowLoginModal(false);
        resetForm();
      }, 1000);
    } else {
      setErrorMsg("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // 회원가입 제출
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }
    const exists = users.some(u => u.username === regUsername);
    if (exists) {
      setErrorMsg("이미 존재하는 아이디입니다.");
      return;
    }
    const newUser = { username: regUsername, password: regPassword, email: regEmail };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("tones_users", JSON.stringify(updatedUsers));
    
    setSuccessMsg("회원가입이 완료되었습니다!");
    setErrorMsg("");
    setTimeout(() => {
      setModalMode("login");
      resetForm();
      setUsername(regUsername); // 로그인 폼에 아이디 세팅
    }, 1500);
  };

  // 아이디 찾기 제출
  const handleFindIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMatch = users.find(u => u.email === findEmail);
    if (userMatch) {
      setSuccessMsg(`조회 완료: 회원님의 아이디는 [ ${userMatch.username} ] 입니다.`);
      setErrorMsg("");
    } else {
      setErrorMsg("입력하신 이메일로 등록된 계정을 찾을 수 없습니다.");
      setSuccessMsg("");
    }
  };

  // 비밀번호 찾기 제출
  const handleFindPwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userIndex = users.findIndex(u => u.username === findUsername && u.email === findPwEmail);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex].password = "1234"; // 임시 비밀번호로 초기화
      setUsers(updatedUsers);
      localStorage.setItem("tones_users", JSON.stringify(updatedUsers));

      setSuccessMsg("인증 완료: 비밀번호가 [ 1234 ] 로 초기화되었습니다.");
      setErrorMsg("");
    } else {
      setErrorMsg("아이디 또는 이메일 정보가 일치하지 않습니다.");
      setSuccessMsg("");
    }
  };

  // 로그아웃
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("current_user");
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
            src="/logo.png"
            alt="브랜드 로고"
            width={130}
            height={20}
            priority
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
            onClick={() => { setModalMode("login"); setShowLoginModal(true); }}
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
                {currentUser?.username.substring(0, 1).toUpperCase() || "A"}
              </div>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  {currentUser?.username || "관리자"} (Admin)
                </div>
                <div style={{ fontSize: "10.5px", color: "#6b6b7a", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                  {currentUser?.email || "admin@tones.ai"}
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
          onClick={() => { setShowLoginModal(false); resetForm(); }}
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
              onClick={() => { setShowLoginModal(false); resetForm(); }}
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

            {/* Modal Header dynamically changes based on mode */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "rgba(255, 94, 132, 0.1)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "14px",
                  border: "1px solid rgba(255, 94, 132, 0.2)"
                }}
              >
                {modalMode === "login" && <Lock size={20} color="#FF5E84" />}
                {modalMode === "signup" && <LogIn size={20} color="#FF5E84" />}
                {modalMode === "findId" && <User size={20} color="#FF5E84" />}
                {modalMode === "findPw" && <Key size={20} color="#FF5E84" />}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                {modalMode === "login" && "TONES 관리자 로그인"}
                {modalMode === "signup" && "관리자 회원가입"}
                {modalMode === "findId" && "아이디 찾기"}
                {modalMode === "findPw" && "비밀번호 찾기"}
              </h3>
              <p style={{ fontSize: "12.5px", color: "#8a8a93", margin: 0 }}>
                {modalMode === "login" && "시스템 제어 및 데이터 관리를 위한 인증"}
                {modalMode === "signup" && "TONES 서비스 관리를 위한 신규 계정 등록"}
                {modalMode === "findId" && "가입하신 이메일 주소로 아이디를 조회합니다"}
                {modalMode === "findPw" && "가입하신 정보로 임시 비밀번호를 발급합니다"}
              </p>
            </div>

            {/* 1. 로그인 화면 */}
            {modalMode === "login" && (
              <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Username</label>
                  <div style={{ position: "relative" }}>
                    <User style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="text"
                      required
                      placeholder="아이디를 입력하세요"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "13px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="password"
                      required
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "13px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{
                  background: "rgba(255, 255, 255, 0.03)", border: "1px solid #282830", borderRadius: "8px",
                  padding: "8px 12px", fontSize: "11px", color: "#8a8a93", display: "flex", justifyContent: "space-between"
                }}>
                  <span>💡 기본 관리자 계정</span>
                  <span style={{ color: "#FF5E84", fontWeight: 600 }}>admin / 1234</span>
                </div>

                {errorMsg && <div style={{ fontSize: "12px", color: "#FF5E84", textAlign: "center", fontWeight: 500 }}>⚠️ {errorMsg}</div>}
                {successMsg && <div style={{ fontSize: "12px", color: "#60a870", textAlign: "center", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><CheckCircle2 size={12} color="#60a870" /> {successMsg}</div>}

                <button type="submit" style={{
                  background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", border: "none", borderRadius: "8px", padding: "12px",
                  color: "#ffffff", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)", transition: "all 0.2s", marginTop: "4px"
                }}>
                  <span>인증 완료</span>
                </button>

                {/* 하단 아이디/비번 찾기 및 회원가입 바 */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b6b7a", marginTop: "10px", padding: "0 4px" }}>
                  <span onClick={() => { setModalMode("findId"); resetForm(); }} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">아이디 찾기</span>
                  <span>|</span>
                  <span onClick={() => { setModalMode("findPw"); resetForm(); }} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">비밀번호 찾기</span>
                  <span>|</span>
                  <span onClick={() => { setModalMode("signup"); resetForm(); }} style={{ cursor: "pointer", color: "#FF5E84", fontWeight: 600 }} className="hover:text-pink-400 transition-colors">회원가입</span>
                </div>
              </form>
            )}

            {/* 2. 회원가입 화면 */}
            {modalMode === "signup" && (
              <form onSubmit={handleSignupSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Username</label>
                  <div style={{ position: "relative" }}>
                    <User style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="text"
                      required
                      placeholder="신규 아이디 입력"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "12.5px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Email</label>
                  <div style={{ position: "relative" }}>
                    <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="email"
                      required
                      placeholder="email@tones.ai"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "12.5px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="password"
                      required
                      placeholder="비밀번호 설정"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "12.5px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <Lock style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="password"
                      required
                      placeholder="비밀번호 다시 입력"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "12.5px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                {errorMsg && <div style={{ fontSize: "12px", color: "#FF5E84", textAlign: "center", fontWeight: 500 }}>⚠️ {errorMsg}</div>}
                {successMsg && <div style={{ fontSize: "12px", color: "#60a870", textAlign: "center", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><CheckCircle2 size={12} color="#60a870" /> {successMsg}</div>}

                <button type="submit" style={{
                  background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", border: "none", borderRadius: "8px", padding: "12px",
                  color: "#ffffff", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                  boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)", transition: "all 0.2s", marginTop: "6px"
                }}>
                  <span>가입 완료</span>
                </button>

                <div style={{ textAlign: "center", fontSize: "12px", color: "#6b6b7a", marginTop: "8px" }}>
                  <span onClick={() => { setModalMode("login"); resetForm(); }} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">로그인 화면으로 돌아가기</span>
                </div>
              </form>
            )}

            {/* 3. 아이디 찾기 화면 */}
            {modalMode === "findId" && (
              <form onSubmit={handleFindIdSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="email"
                      required
                      placeholder="가입하신 이메일을 입력하세요"
                      value={findEmail}
                      onChange={(e) => setFindEmail(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "13px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{
                  background: "rgba(255, 255, 255, 0.03)", border: "1px solid #282830", borderRadius: "8px",
                  padding: "8px 12px", fontSize: "11px", color: "#8a8a93"
                }}>
                  💡 테스트용 가입 이메일: <span style={{ color: "#FF5E84", fontWeight: 600 }}>admin@tones.ai</span>
                </div>

                {errorMsg && <div style={{ fontSize: "12px", color: "#FF5E84", textAlign: "center", fontWeight: 500 }}>⚠️ {errorMsg}</div>}
                {successMsg && (
                  <div style={{
                    fontSize: "12.5px", color: "#60a870", background: "rgba(96, 168, 112, 0.1)", border: "1px solid rgba(96, 168, 112, 0.2)",
                    borderRadius: "8px", padding: "10px 12px", textAlign: "center", fontWeight: 600
                  }}>
                    🎉 {successMsg}
                  </div>
                )}

                <button type="submit" style={{
                  background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", border: "none", borderRadius: "8px", padding: "12px",
                  color: "#ffffff", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)", transition: "all 0.2s", marginTop: "4px"
                }}>
                  <span>아이디 찾기</span>
                </button>

                <div style={{ textAlign: "center", fontSize: "12px", color: "#6b6b7a", marginTop: "10px" }}>
                  <span onClick={() => { setModalMode("login"); resetForm(); }} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">로그인 화면으로 돌아가기</span>
                </div>
              </form>
            )}

            {/* 4. 비밀번호 찾기 화면 */}
            {modalMode === "findPw" && (
              <form onSubmit={handleFindPwSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Username</label>
                  <div style={{ position: "relative" }}>
                    <User style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="text"
                      required
                      placeholder="아이디를 입력하세요"
                      value={findUsername}
                      onChange={(e) => setFindUsername(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "13px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#6b6b7a", fontWeight: 600, textTransform: "uppercase" }}>Email Address</label>
                  <div style={{ position: "relative" }}>
                    <Mail style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} size={14} color="#6b6b7a" />
                    <input
                      type="email"
                      required
                      placeholder="가입하신 이메일을 입력하세요"
                      value={findPwEmail}
                      onChange={(e) => setFindPwEmail(e.target.value)}
                      style={{
                        width: "100%", background: "#121214", border: "1px solid #282830", borderRadius: "8px",
                        padding: "10px 12px 10px 38px", color: "#ffffff", fontSize: "13px", outline: "none", transition: "all 0.2s"
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = "#FF5E84"}
                      onBlur={(e) => e.currentTarget.style.borderColor = "#282830"}
                    />
                  </div>
                </div>

                {errorMsg && <div style={{ fontSize: "12px", color: "#FF5E84", textAlign: "center", fontWeight: 500 }}>⚠️ {errorMsg}</div>}
                {successMsg && (
                  <div style={{
                    fontSize: "12.5px", color: "#60a870", background: "rgba(96, 168, 112, 0.1)", border: "1px solid rgba(96, 168, 112, 0.2)",
                    borderRadius: "8px", padding: "10px 12px", textAlign: "center", fontWeight: 600
                  }}>
                    🎉 {successMsg}
                  </div>
                )}

                <button type="submit" style={{
                  background: "linear-gradient(135deg, #FF5E84 0%, #d83e63 100%)", border: "none", borderRadius: "8px", padding: "12px",
                  color: "#ffffff", fontSize: "13.5px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(255, 94, 132, 0.25)", transition: "all 0.2s", marginTop: "4px"
                }}>
                  <span>비밀번호 초기화</span>
                </button>

                <div style={{ textAlign: "center", fontSize: "12px", color: "#6b6b7a", marginTop: "10px" }}>
                  <span onClick={() => { setModalMode("login"); resetForm(); }} style={{ cursor: "pointer" }} className="hover:text-white transition-colors">로그인 화면으로 돌아가기</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
