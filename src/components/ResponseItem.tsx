type ResponseItemProps = {
  answer: AnswerType;
  response: AnswerType;
};

const ResponseItem = ({ answer, response }: ResponseItemProps) => {
  if (answer.id === response.id && !response.isCorrect) {
    return (
      <li className="text-lg my-4">
        <div className="w-full flex items-center gap-x-4 p-4 text-white font-bold bg-red-500 rounded-xl">
          {answer.answer}
        </div>
      </li>
    );
  }

  if (answer.isCorrect) {
    return (
      <li className="text-lg my-4">
        <div className="w-full flex items-center gap-x-4 p-4 text-white font-bold bg-green-500 rounded-xl">
          {answer.answer}
        </div>
      </li>
    );
  }

  return (
    <li className="text-lg my-4">
      <div className="w-full flex items-center gap-x-4 p-4 text-white font-bold bg-primary-500 rounded-xl">
        {answer.answer}
      </div>
    </li>
  );
};

export default ResponseItem;
