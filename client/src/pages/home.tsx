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
  const [title, setTitle] = useState("Add a title");
  const [description, setDesp] = useState("");
  const [value, setValue] = useState("");
  const [qr, setQr] = useState("");
  const [dataId, setDataid] = useState("");
  const [toggle, setToggle] = useState(false);
  const [links, setLinks] = useState([
    { key: "github", value: "www.github.com/anonymous961", id: "1" },
  ]);

  const handleRoute = async (id: string) => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACK_URL + "/qrgen/getLinks/" + id
      );
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
        import.meta.env.VITE_BACK_URL + "/qrgen/gen",
        { title, links, description },
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
    <div className="bg-slate-500 min-h-screen p-2">
      <AddDesp
        setTitle={setTitle}
        title={title}
        toggle={toggle}
        setToggle={setToggle}
        description={description}
        setDesp={setDesp}
      />
      <ShowList links={links} setLinks={setLinks} />
      {/* {links && } */}
      <LinkForm
        handleLinks={handleLinks}
        linkKey={key}
        value={value}
        setKey={setKey}
        setValue={setValue}
      />
      <div className="flex justify-center">
        <button
          className=" shadow-xl p-2 bg-indigo-600 rounded-md hover:bg-indigo-500 text-white hover:font-medium m-5"
          onClick={handleSubmit}
        >
          Generate
        </button>
      </div>
      {qr && (
        <div className="grid sm:grid-cols-1 ">
          <div className="row-span-1 bg-white mx-w-sm m-2 rounded-md text-black p-2 break-normal overflow-x-hidden">
            <div className="row-span-1 flex justify-center">
              <img src={qr} width="200px" height="200px" />
            </div>
            <p className="break-words max-w-sm">
              {import.meta.env.VITE_FRONT_URL}/display/{dataId}
            </p>
            <br />
            <CopyToClipboardBtn
              text={`${import.meta.env.VITE_FRONT_URL}/display/${dataId}`}
            />
            <Link
              to={`/display/${dataId}`}
              className="p-2 m-1  bg-blue-500 rounded-md shadow-xl text-white"
            >
              Check
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
