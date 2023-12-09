import { Dispatch, SetStateAction } from "react";

interface Link {
  key: string;
  value: string;
  id: string;
}

interface ShowListProps {
  links: Link[];
  setLinks: Dispatch<SetStateAction<Link[]>>;
}
const ShowList: React.FC<ShowListProps> = ({ links, setLinks }) => {
  return (
    <>
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
    </>
  );
};

export default ShowList;
