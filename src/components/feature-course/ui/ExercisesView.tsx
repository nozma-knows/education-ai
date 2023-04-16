import { useState, useEffect } from "react";
import { CourseUnit, Maybe, UnitExercise } from "@/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { GenerateExercisesMutation } from "@/components/graph";
import { PulseLoader } from "react-spinners";

export default function ExercisesView({ unit }: { unit: CourseUnit }) {
  const [exercises, setExercises] = useState<Maybe<UnitExercise>[]>(
    unit.exercises ? unit.exercises : []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setExercises(unit.exercises ? unit.exercises : []);
  }, [unit.exercises, unit.id]);

  // MUTATIONS
  // Generate exercises mutation
  const [generateExercises] = useMutation(GenerateExercisesMutation, {
    onCompleted: (data: { generateExercises: UnitExercise[] }) => {
      console.log("generateExercises: ", data.generateExercises);
      setExercises(data.generateExercises);
      setLoading(false);
    },
  });

  // Function for calling create note mutation
  const GenerateExercises = (unitId: string) => {
    generateExercises({
      variables: {
        id: unitId,
      },
    });
  };

  if (!exercises || !exercises.length) {
    if (!loading) {
      setLoading(true);
      console.log("Set Loading to TRUE");
      GenerateExercises(unit.id);
    }

    return (
      <div className="flex flex-1 w-full justify-center items-center">
        <PulseLoader color="#000" size={20} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full overflow-auto p-4">
      <div className="flex self-center text-4xl pb-4 font-bold">{`Exercises: ${unit.title}`}</div>
      <ol className="flex flex-col self-center max-w-2xl gap-4 p-4">
        {exercises.map((exercise) => (
          <li key={exercise!.id} className="text-lg">
            {exercise!.task}
          </li>
        ))}
      </ol>
    </div>
  );
}
