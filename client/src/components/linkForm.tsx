interface LinkFormProps {
  handleLinks: (e: React.FormEvent<HTMLFormElement>) => void;
  linkKey: string;
  value: string;
  setKey: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const LinkForm: React.FC<LinkFormProps> = ({
  handleLinks,
  linkKey,
  value,
  setKey,
  setValue,
}) => {
  return (
    <div className="m-5 bg-slate-700 rounded-md p-2">
      <form onSubmit={handleLinks}>
        <input
          type="text"
          className="m-2 rounded-md  p-1 w-1/6"
          value={linkKey}
          placeholder="Enter title"
          onChange={(e) => setKey(e.target.value)}
          required
        />
        <input
          type="text"
          className="m-2 rounded-md p-1 w-3/6 "
          value={value}
          placeholder="Enter link"
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <input
          type="submit"
          className="bg-cyan-600 shadow-lg float-right m-2 hover:shadow-blue-500/50 hover:text-white p-1 rounded-md px-2"
          value="+"
        />
      </form>
    </div>
  );
};

export default LinkForm;
