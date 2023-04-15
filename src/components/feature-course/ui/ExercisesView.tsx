import { useState, useEffect } from "react";
import {
  CourseUnit,
  Maybe,
  UnitExercise,
  UnitLesson,
} from "@/__generated__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { ExercisesQuery, GenerateExercisesMutation } from "@/components/graph";
import { PulseLoader } from "react-spinners";

export default function ExercisesView({ unit }: { unit: CourseUnit }) {
  console.log("unit: ", unit);

  const [exercises, setExercises] = useState<Maybe<UnitExercise>[]>(
    unit.exercises
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setExercises(unit.exercises);
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

  console.log("exercises: ", exercises);

  return (
    <ol>
      {exercises.map((exercise) => (
        <li key={exercise!.id}>{exercise!.task}</li>
      ))}
    </ol>
  );
}
