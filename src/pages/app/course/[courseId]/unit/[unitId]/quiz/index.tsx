import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";
import CourseNavigator from "@/components/feature-course/ui/CourseNavigator";
import { CourseUnit } from "@/__generated__/graphql";
import QuizView from "@/components/feature-course/ui/QuizView";

export default function Quiz() {
  const router = useRouter();
  const { courseId, unitId } = router.query;

  const { loading, error, data } = useQuery(CourseQuery, {
    variables: { courseId },
  });

  if (loading) return <LoadingPage />;

  if (error) {
    return <ErrorPage />;
  }

  if (data && courseId && unitId) {
    const { course } = data;
    console.log("course: ", course);
    const unit = course.units.find((unit: CourseUnit) => unit.id === unitId);
    console.log("unit in quiz/index: ", unit);
    return (
      <Page noPadding>
        <div className="flex w-full">
          <CourseNavigator
            course={course}
            unitId={unitId as string}
            lessonId="quiz"
          />
          <QuizView unit={unit} />
        </div>
      </Page>
    );
  }

  return null;
}
