type AnswerItemProps = {
  answer: AnswerType;
  setResponse: (response: AnswerType) => void;
};

const AnswerItem = ({ answer, setResponse }: AnswerItemProps) => {
  return (
    <li className="text-lg my-4">
      <button
        className="w-full flex items-center gap-x-4 p-4 text-white font-bold bg-primary-500 hover:bg-primary-700 rounded-xl"
        onClick={() => setResponse(answer)}
      >
        {answer.answer}
      </button>
    </li>
  );
};

export default AnswerItem;
