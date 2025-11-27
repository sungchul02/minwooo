import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import "../styles/common.css";
import "./Client.css";

function ClientDetail() {
  const { id } = useParams();

  const [inquiry, setInquiry] = useState(null);
  const [reply, setReply] = useState(null);
  const [followUp, setFollowUp] = useState([]);
  const [question, setQuestion] = useState("");

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
  };

  const addQuestion = async () => {
    if (!question.trim()) return alert("질문을 입력해주세요.");

    await supabase.from("followup").insert([
      {
        inquiry_id: id,
        session: followUp.length + 2,
        client_question: question,
      },
    ]);

    setQuestion("");
    load();
  };

  if (!inquiry) return <>Loading...</>;

  return (
    <div className="client-container">
      <h2 className="page-title">상담 상세</h2>

      {/* 인적 사항 */}
      <div className="box">
        <strong>나이:</strong> {inquiry.age}세<br />
        <strong>성별:</strong> {inquiry.gender}<br />
        <strong>지역:</strong> {inquiry.region}<br />
      </div>

      {/* 상담 내용 */}
      <div className="box">
        <h3>1. 상담 신청 내용</h3>
        <p className="content">{inquiry.issue}</p>
        <p className="content">{inquiry.current_state}</p>
        <p className="content">{inquiry.goal}</p>
        {inquiry.detail && <p className="content">{inquiry.detail}</p>}
      </div>

      {/* 1회기 상담자 답변 */}
      <div className="box">
        <h3>2. 상담자 1회기 답변</h3>

        {reply ? (
          <>
            <p className="content">{reply.evaluation}</p>
            <p className="content">{reply.analysis}</p>
            <p className="content">{reply.intervention}</p>
            <p className="content">{reply.plan}</p>
          </>
        ) : (
          <p className="no-answer">답변 대기 중…</p>
        )}
      </div>

      {/* 추가 회기 */}
      <div className="box">
        <h3>3. 추가 질문</h3>

        {followUp.map((f) => (
          <div key={f.id} className="followup-box">
            <strong>내 질문</strong>
            <p className="content">{f.client_question}</p>

            {f.counselor_answer ? (
              <>
                <strong>상담자 답변</strong>
                <p className="content">{f.counselor_answer}</p>
              </>
            ) : (
              <p className="no-answer">답변 대기 중…</p>
            )}
          </div>
        ))}

        <textarea
          placeholder="추가 질문 입력"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button className="btn-submit" onClick={addQuestion}>
          추가 질문 등록
        </button>
      </div>

      <Link to="/client" className="btn-cancel">
        목록으로
      </Link>
    </div>
  );
}

export default ClientDetail;
