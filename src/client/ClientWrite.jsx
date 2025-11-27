import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabase";
import "../styles/common.css";
import "./Client.css";

function ClientWrite() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: "",
    gender: "",
    region: "",
    phone: "",
    emergency: "",
    consent: false,
    issue: "",
    currentState: "",
    goal: "",
    detail: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

const handleSubmit = async () => {
  if (!form.consent) return alert("상담 동의가 필요합니다.");
  if (!form.issue.trim()) return alert("주 호소 문제를 입력해주세요.");

  const { data, error } = await supabase.from("inquiry").insert({
    age: form.age,
    gender: form.gender,
    region: form.region,
    phone: form.phone,
    emergency: form.emergency,

    issue: form.issue,
    current_state: form.currentState,
    goal: form.goal,
    detail: form.detail,
    consent: form.consent,
  }).select();

  if (error) {
    console.error("INSERT 오류:", error);
    alert("저장 실패");
    return;          // 🔥 이게 없어서 두 번째 오류 발생했던 것
  }

  alert("상담 요청이 등록되었습니다.");
  navigate(`/client/detail/${data[0].id}`);
};

  return (
    <div className="client-container">
      <h2 className="page-title">상담 요청 작성</h2>

      {/* 1. 인적 사항 */}
      <div className="box">
        <h3>1. 인적 사항</h3>

        <label>나이</label>
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="예: 23"
        />

        <label>성별</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">선택</option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
          <option value="기타">기타</option>
        </select>

        <label>거주 지역</label>
        <input
          name="region"
          value={form.region}
          onChange={handleChange}
          placeholder="예: 천안시 동남구"
        />

        <label>연락처</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="010-0000-0000"
        />

        <label>비상 연락처</label>
        <input
          name="emergency"
          value={form.emergency}
          onChange={handleChange}
          placeholder="가족 또는 보호자 연락처"
        />
      </div>

      {/* 2. 상담 동의 */}
      <div className="box">
        <h3>2. 상담 동의</h3>
        <p className="consent-text">
          온라인 상담은 비밀보장을 원칙으로 하나, 자·타해 위험, 범죄·학대가 의심되는 경우 법적 의무에
          따라 비밀보장이 제한될 수 있습니다. 이에 동의하십니까?
        </p>

        <label className="checkbox-row">
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
          />
          상담 안내 및 비밀보장 한계를 이해하고 동의합니다.
        </label>
      </div>

      {/* 3. 상담 내용 */}
      <div className="box">
        <h3>3. 상담 내용</h3>

        <label>주 호소 문제</label>
        <textarea
          name="issue"
          value={form.issue}
          onChange={handleChange}
          placeholder="현재 가장 고민되는 문제를 적어주세요."
        />

        <label>현재 상태</label>
        <textarea
          name="currentState"
          value={form.currentState}
          onChange={handleChange}
          placeholder="언제부터 시작되었는지, 얼마나 심한지 등을 적어주세요."
        />

        <label>원하는 변화(목표)</label>
        <textarea
          name="goal"
          value={form.goal}
          onChange={handleChange}
          placeholder="상담을 통해 얻고 싶은 변화·희망되는 점을 적어주세요."
        />

        <label>추가 설명(선택)</label>
        <textarea
          name="detail"
          value={form.detail}
          onChange={handleChange}
          placeholder="추가로 전달하고 싶은 내용을 적어주세요."
        />
      </div>

      {/* 버튼 */}
      <div className="btn-area">
        <Link to="/client" className="btn-cancel">
          취소
        </Link>
        <button className="btn-submit" onClick={handleSubmit}>
          상담 요청 등록
        </button>
      </div>
    </div>
  );
}

export default ClientWrite;
