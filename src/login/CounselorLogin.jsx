import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function CounselorLogin() {
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (pw === "0000") {
      localStorage.setItem("role", "counselor");
      alert("상담자 로그인 성공");
      navigate("/counselor");
    } else {
      alert("비밀번호 오류");
    }
  };

  return (
    <div className="login-container">
      <h2>상담자 로그인</h2>
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <button className="btn-login" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}

export default CounselorLogin;
