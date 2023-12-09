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
    <>
      <form onSubmit={handleLinks}>
        <input
          type="text"
          className="m-2"
          value={linkKey}
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
    </>
  );
};

export default LinkForm;
