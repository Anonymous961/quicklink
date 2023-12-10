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
  const [title, setTitle] = useState<string>("");
  const [desp, setDesp] = useState<string>("");
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
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-5">
      {/* {title ? ( */}
      <div className="lg:col-span-2">
        <h2 className="text-3xl text-white bg-slate-600 rounded-md my-2 p-3">
          {title}
        </h2>
        <div className="bg-slate-600 p-3 rounded-md">
          {desp && <p className="text-white">{desp}</p>}
          <h2 className="my-5 text-4xl">Links</h2>
          {links &&
            links.map((link) => {
              return (
                <div
                  key={link.id}
                  className="bg-slate-400 my-3 rounded-md grid grid-cols-1 grid-rows-1 sm:grid-rows-2 sm:grid-col-2 lg:grid-cols-3 lg:grid-rows-1"
                >
                  <h2 className="rounded-md bg-white p-2 lg:col-span-1 m-2">
                    {link.key}
                  </h2>

                  <a
                    href={`http://` + link.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:col-span-2 row-span-1 m-2"
                  >
                    <h2 className="rounded-md bg-white p-2 ">{link.value}</h2>
                  </a>
                </div>
              );
            })}
        </div>
      </div>

      <div className="my-3 lg:col-span-1 bg-slate-100 rounded-md p-5">
        <div className=" p-5 bg-slate-500 rounded-xl">
          {qr && (
            <img
              src={qr}
              className="bg-slate-600 m-5"
              width={"200px"}
              height={"200px"}
            />
          )}
        </div>
        <div className="m-2 bg-slate-500 p-5 rounded-md">
          <p className="break-words text-white">
            {import.meta.env.VITE_FRONT_URL}/display/{id}
          </p>
        </div>
        <CopyToClipboardBtn text={`${import.meta.env.VITE_FRONT_URL}/display/${id}`}/>
      </div>
    </div>
  );
};

export default Display;
