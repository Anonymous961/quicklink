import { SetStateAction } from "react";

interface despProps {
  setTitle: React.Dispatch<SetStateAction<string>>;
  title: string;
  toggle: boolean;
  setToggle: React.Dispatch<SetStateAction<boolean>>;
  description: string;
  setDesp: React.Dispatch<SetStateAction<string>>;
}

const AddDesp: React.FC<despProps> = ({
  setTitle,
  title,
  toggle,
  setToggle,
  description,
  setDesp,
}) => {
  return (
    <div className="flex flex-col m-5 p-3 rounded-md bg-slate-600 text-black">
      <input
        className="text-3xl text-center text-white bg-slate-600  m-5"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        placeholder="Add a Title"
      />
      <label className="relative inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          value=""
          onChange={() => setToggle(!toggle)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Add a description
        </span>
      </label>
      {toggle && (
        <input
          className="m-2 p-2 rounded-md"
          type="text"
          onChange={(e) => setDesp(e.target.value)}
          value={description}
          placeholder="Add a description"
        />
      )}
    </div>
  );
};

export default AddDesp;
