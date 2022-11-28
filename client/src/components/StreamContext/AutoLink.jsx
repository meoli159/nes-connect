import { v1 as uuid } from "uuid";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AutoLink = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const id = uuid();
    navigate(`/stream/${id}`);
  }, [navigate]);

};

export default AutoLink;
