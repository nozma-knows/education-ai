import { useQuery } from "@apollo/client";
import { CoursesQuery } from "../graph";

export default function CoursesView() {
  const {
    loading: loadingNotes,
    error: errorLoadingNotes,
    data: notesData,
    refetch: refetchNotes,
  } = useQuery(CoursesQuery, {
    variables: { authorId },
  });

  return (
    <div>
      <div>Courses</div>
    </div>
  );
}
