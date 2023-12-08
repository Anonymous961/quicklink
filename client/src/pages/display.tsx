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
  // console.log(props)
  const [links, setLinks] = useState<Link[]>([]);
  const [qr, setQR] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const retrieveData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/qrgen/getLinks/${id}`
      );
      // console.log(res.data)
      setLinks(res.data.data.links);
      console.log(links);
      setQR(res.data.qr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <div>
      <h2>Display Page</h2>
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
