interface questionProps {
    question: string;
    options: string[];
    onAnswer: (answer: string) => void;
}

export default function Question({ question, options, onAnswer }: questionProps) {
  return (
    <div>
      <h2>{question}</h2>
      {options.map(function (option: string) {
        return (
          <button
            key={option}
            onClick={function () {
              onAnswer(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}