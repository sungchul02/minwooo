import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function CounselorList() {
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
    <div className="client-con
TAINER">
      <h2 className="page-title">상담자: 상담 목록</h2>

      {list.map((i) => (
        <div key={i.id} className="list-item">
          <Link to={`/counselor/detail/${i.id}`}>
            <strong>#{i.id}</strong> — {i.issue}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CounselorList;
