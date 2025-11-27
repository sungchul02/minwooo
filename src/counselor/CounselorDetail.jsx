import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "../styles/common.css";
import "./Counselor.css";

function CounselorDetail() {
  const { id } = useParams();

  const [inquiry, setInquiry] = useState(null);
  const [reply, setReply] = useState(null);
  const [followUp, setFollowUp] = useState([]);

  // 상담자 입력폼
  const [form, setForm] = useState({
    evaluation: "",
    analysis: "",
    intervention: "",
    plan: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data: q } = await supabase
      .from("inquiry")
      .select("*")
      .eq("id", id)
      .single();
    setInquiry(q);

    const { data: r } = await supabase
      .from("counselor_reply")
      .select("*")
      .eq("inquiry_id", id)
      .single();
    setReply(r);

    const { data: f } = await supabase
      .from("followup")
      .select("*")
      .eq("inquiry_id", id)
      .order("session");
    setFollowUp(f);

    if (r) {
      setForm({
        evaluation: r.evaluation,
        analysis: r.analysis,
        intervention: r.intervention,
        plan: r.plan,
      });
    }
  };

  const saveSession1 = async () => {
    const { error } = await supabase.from("counselor_reply").upsert({
      inquiry_id: id,
      evaluation: form.evaluation,
      analysis: form.analysis,
      intervention: form.intervention,
      plan: form.plan,
    });

    if (error) return alert("저장 실패");
    alert("1회기 답변 저장 완료");
    load();
  };

  const saveFollowUp = async (f, idx) => {
    const { error } = await supabase
      .from("followup")
      .update({ counselor_answer: f.counselor_answer })
      .eq("id", f.id);

    if (error) return alert("저장 실패");

    alert("추가 회기 답변 저장");
    load();
  };

  if (!inquiry) return <>Loading...</>;

  return (
    <div className="counselor-container">
      <h2 className="page-title">상담자 답변</h2>

      <div className="box">
        <h3>내담자 정보</h3>
        <p>나이: {inquiry.age}</p>
        <p>성별: {inquiry.gender}</p>
        <p>지역: {inquiry.region}</p>
      </div>

      {/* 1회기 */}
      <div className="box">
        <h3>1회기 상담자 분석</h3>

        <label>평가</label>
        <textarea
          value={form.evaluation}
          onChange={(e) => setForm({ ...form, evaluation: e.target.value })}
        />

        <label>해석</label>
        <textarea
          value={form.analysis}
          onChange={(e) => setForm({ ...form, analysis: e.target.value })}
        />

        <label>개입</label>
        <textarea
          value={form.intervention}
          onChange={(e) => setForm({ ...form, intervention: e.target.value })}
        />

        <label>다음 단계</label>
        <textarea
          value={form.plan}
          onChange={(e) => setForm({ ...form, plan: e.target.value })}
        />

        <button className="btn-submit" onClick={saveSession1}>
          1회기 답변 저장
        </button>
      </div>

      {/* 추가 회기 */}
      <div className="box">
        <h3>2·3회기 답변</h3>

        {followUp.map((f, index) => (
          <div key={f.id} className="followup-box">
            <p><strong>질문 #{f.session}</strong></p>
            <p className="content">{f.client_question}</p>

            <label>상담자 답변:</label>
            <textarea
              value={f.counselor_answer || ""}
              onChange={(e) => {
                const updated = [...followUp];
                updated[index].counselor_answer = e.target.value;
                setFollowUp(updated);
              }}
            />

            <button
              className="btn-submit"
              onClick={() => saveFollowUp(f, index)}
            >
              답변 저장
            </button>
          </div>
        ))}

        <Link to="/counselor" className="btn-cancel">
          목록으로
        </Link>
      </div>
    </div>
  );
}

export default CounselorDetail;
