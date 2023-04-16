import { useState, useEffect } from "react";
import {
  CourseUnit,
  Maybe,
  QuizQuestion,
  UnitQuiz,
} from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { GenerateQuizMutation } from "@/components/graph";
import { PulseLoader } from "react-spinners";

export default function QuizView({ unit }: { unit: CourseUnit }) {
  console.log("unit: ", unit);
  const [quiz, setQuiz] = useState<Maybe<UnitQuiz>>(
    unit.quizzes ? unit.quizzes[0] : null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuiz(unit.quizzes ? unit.quizzes[0] : null);
  }, [unit.quizzes, unit.id]);

  // MUTATIONS
  // Generate exercises mutation
  const [generateQuiz] = useMutation(GenerateQuizMutation, {
    onCompleted: (data: { generateQuiz: UnitQuiz }) => {
      setQuiz(data.generateQuiz);
      setLoading(false);
    },
  });

  // Function for calling create note mutation
  const GenerateQuiz = (unitId: string) => {
    generateQuiz({
      variables: {
        id: unitId,
      },
    });
  };

  if (!quiz) {
    if (!loading) {
      setLoading(true);
      GenerateQuiz(unit.id);
    }

    return (
      <div className="flex flex-1 w-full justify-center items-center">
        <PulseLoader color="#000" size={20} />
      </div>
    );
  }

  console.log("quiz: ", quiz);

  if (quiz) {
    return (
      <div className="flex flex-col w-full overflow-auto p-4">
        <div className="flex self-center text-4xl pb-4 font-bold">{`Quiz: ${unit.title}`}</div>
        <div className="flex flex-col self-center max-w-2xl">
          {quiz.questions.map((q: Maybe<QuizQuestion>, index) => {
            if (q) {
              return (
                <div key={q.id} className="flex flex-col p-4 gap-4">
                  <div className="text-2xl font-semibold">{`Question ${
                    index + 1
                  }`}</div>
                  <div className="text-lg px-4">{q.question}</div>
                  <div className="flex flex-col gap-2 px-8">
                    {q.choices.map((choice, index) => {
                      return (
                        <div key={index}>
                          <label className="flex gap-2 font-semibold">
                            <input type="checkbox" />
                            <div className="cursor-pointer hover:font-bold">
                              {choice}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full bg-black h-1 mt-4" />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-1 w-full justify-center items-center">
      <PulseLoader color="#000" size={20} />
    </div>
  );
}
