import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CopyToClipboardBtn from "../components/copytoclip";

interface Link {
  key: string;
  value: string;
  id: string;
}

const Display = () => {
  const [title,setTitle]=useState<string>("");
  const [desp,setDesp]=useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);
  const [qr, setQR] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const retrieveData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/qrgen/getLinks/${id}`
      );
      setLinks(res.data.data.links);
      setTitle(res.data.data.title);
      setDesp(res.data.data.description);
      setQR(res.data.qr);
      console.log(links);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div>
      {title? <h2>{title}</h2>:
      <h2>Display Page</h2>}
      {desp && <h2>{desp}</h2>}
      {qr && <img src={qr} width={"200px"} height={"200px"} />}
      {links &&
        links.map((link) => {
          return (
            <div key={link.id}>
              <h2>{link.key}</h2>
              <h2>{link.value}</h2>
              <CopyToClipboardBtn text={link.value}/>
            </div>
          );
        })}
    </div>
  );
};

export default Display;
