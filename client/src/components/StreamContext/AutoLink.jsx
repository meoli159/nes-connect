import { v1 as uuid } from "uuid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLink = () => {
  const id = uuid();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/stream/${id}`);
  }, [id, navigate]);

};

export default AutoLink;
