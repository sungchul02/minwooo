import { Link } from "react-router-dom";
import "../styles/common.css";
import "./Guide.css";

function Guide() {
  return (
    <div className="guide-container">
      <h2 className="page-title">온라인 단기 상담 안내</h2>

      <div className="box">
        <h3>1. 상담 목적</h3>
        <p>
          본 온라인 상담은 단기 텍스트 기반 상담으로, 개인의 심리적 어려움을
          듣고 조언 및 방향 설정을 돕기 위한 목적을 가지고 있습니다.
          (치료·진단 목적 아님)
        </p>
      </div>

      <div className="box">
        <h3>2. 비밀보장 및 한계</h3>
        <ul className="guide-list">
          <li>내담자의 개인정보는 외부로 유출되지 않습니다.</li>
          <li>다만 아래 상황에서는 법적 의무에 따라 비밀보장이 제한됩니다.</li>
          <li>① 자·타해 위험이 높은 경우</li>
          <li>② 아동·노인·장애인 학대 의심 시</li>
          <li>③ 범죄 관련 급박한 상황 시</li>
        </ul>
      </div>

      <div className="box">
        <h3>3. 상담 방식 안내</h3>
        <ul className="guide-list">
          <li>텍스트 기반 비동기(게시판) 방식</li>
          <li>상담자는 ○○시간 이내에 답변</li>
          <li>내담자는 추가 질문 가능</li>
          <li>단기 상담으로 보통 1~3회기 진행</li>
        </ul>
      </div>

      <div className="box">
        <h3>4. 긴급 상황 안내</h3>
        <p>아래 상황은 온라인 상담으로 처리할 수 없습니다.</p>
        <ul className="guide-list">
          <li>현재 자·타해 위험이 있거나 위기 상황일 때</li>
          <li>폭력·학대·범죄 피해가 즉각적인 경우</li>
        </ul>
        <p>※ 즉시 112, 119, 정신건강센터(1577-0199)에 연락하세요.</p>
      </div>

      <div className="box">
        <h3>5. 이용 규칙</h3>
        <ul className="guide-list">
          <li>상담 내용은 제3자에게 공유·유포 금지</li>
          <li>상담자를 존중하는 언어 사용</li>
          <li>한 상담글 당 한 명의 내담자만 참여</li>
        </ul>
      </div>

      <div className="btn-area">
        <Link to="/client/write" className="btn-submit">
          상담 시작하기
        </Link>
      </div>
    </div>
  );
}

export default Guide;
