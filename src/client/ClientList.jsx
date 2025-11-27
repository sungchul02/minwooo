import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function ClientList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data, error } = await supabase
      .from("inquiry")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error(error);
    else setList(data);
  };

  return (
    <div className="client-container">
      <h2 className="page-title">내 상담 목록</h2>

      <div className="btn-area">
        <Link to="/client/write" className="btn-submit">
          새 상담 요청
        </Link>
      </div>

      {list.map((i) => (
        <div key={i.id} className="list-item">
          <Link to={`/client/detail/${i.id}`}>
            <strong>상담 #{i.id}</strong> — {i.issue}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ClientList;
