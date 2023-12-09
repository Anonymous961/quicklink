import { FormEvent, useState } from "react";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { Link } from "react-router-dom";
import CopyToClipboardBtn from "../components/copytoclip";
import ShowList from "../components/showlist";
import LinkForm from "../components/linkForm";
import AddDesp from "../components/addDesp";

const Home = () => {
  const [key, setKey] = useState("");
  const [title,setTitle]=useState("Add a title");
  const [description,setDesp]=useState("")
  const [value, setValue] = useState("");
  const [qr, setQr] = useState("");
  const [dataId, setDataid] = useState("");
  const [toggle,setToggle]=useState(false);
  const [links, setLinks] = useState([
    { key: "github", value: "www.github.com/anonymous961", id: "1" },
  ]);

  const handleRoute = async (id: string) => {
    try {
      const res = await axios.get(import.meta.env.VITE_BACK_URL+"/qrgen/getLinks/" + id);
      console.log(res.data);
      setQr(res.data.qr);
      setDataid(res.data.id);
    } catch (err: unknown) {
      console.log("here is problem");
      console.log(err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACK_URL+"/qrgen/gen",
        { title,links,description },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      handleRoute(res.data.id);
    } catch (err: unknown) {
      console.log(err);
    }
  };

  const handleLinks = (e: FormEvent) => {
    e.preventDefault();
    const id = uuid4();
    setLinks([...links, { key, value, id }]);
    setKey("");
    setValue("");
    console.log(links);
  };

  return (
    <div className="flex flex-col justify-center">
      <AddDesp setTitle={setTitle} title={title} toggle={toggle} setToggle={setToggle} description={description} setDesp={setDesp}/>
      <ShowList links={links} setLinks={setLinks}/>
      <LinkForm
        handleLinks={handleLinks}
        linkKey={key}
        value={value}
        setKey={setKey}
        setValue={setValue}/>
      <button onClick={handleSubmit}>Generate</button>
      {qr && (
        <div>
          <img src={qr} width="100px" height="100px" />
          <div className="bg-white m-2 rounded-md text-black p-2">
            {import.meta.env.VITE_FRONT_URL}/display/{dataId}
          </div>
            <CopyToClipboardBtn text={`${import.meta.env.VITE_FRONT_URL}/display/${dataId}`}/>
          <Link to={`/display/${dataId}`}>Check</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
