import { FormEvent, useState } from "react";
import axios from "axios";
import { v4 as uuid4 } from "uuid";
import { Link } from "react-router-dom";

const Home = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [links, setLinks] = useState([
    { key: "github", value: "www.github.com/anonymous961", id: "1" },
  ]);
  const [qr, setQr] = useState("");
  const [dataId,setDataid]=useState("");


  // console.log(import.meta.env.VITE_FRONT_URL);
  const handleRoute = async (id: string) => {
    try {
      const res = await axios.get("http://localhost:4000/qrgen/getLinks/" + id);
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
        "http://localhost:4000/qrgen/gen",
        { links },
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
      <h1>Fill The Details</h1>
      {links.map((link) => (
        <div className="flex" key={link.id}>
          <p className="m-2 border-2 rounded-md p-1">{link.key}</p>
          <p className="m-2 border-2 rounded-md p-1">{link.value}</p>
          <button
            onClick={() => {
              setLinks(() => {
                return links.filter((l) => l.id !== link.id);
              });
            }}
          >
            delete
          </button>
        </div>
      ))}
      <form onSubmit={handleLinks}>
        <input
          type="text"
          className="m-2"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
        <input
          type="text"
          className="m-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          type="submit"
          className="border-2 p-1 rounded-md px-2"
          value="+"
        />
      </form>
      <button onClick={handleSubmit}>Generate</button>
      {qr && (
        <div>
          <img src={qr} width="100px" height="100px" />
          <p className="bg-white m-2 rounded-md text-black p-2">{import.meta.env.VITE_FRONT_URL}/display/{dataId}</p>
          <Link to={`/display/${dataId}`}>Check</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
