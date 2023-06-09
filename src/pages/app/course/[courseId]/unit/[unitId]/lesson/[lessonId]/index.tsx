import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";
import { CourseUnit, UnitLesson } from "@/__generated__/graphql";
import LessonView from "@/components/feature-course/ui/LessonView";
import CourseNavigator from "@/components/feature-course/ui/CourseNavigator";

export default function Lesson() {
  const router = useRouter();
  const { courseId, unitId, lessonId } = router.query;

  const { loading, error, data } = useQuery(CourseQuery, {
    variables: { courseId },
  });

  if (loading) return <LoadingPage />;

  if (error) {
    return <ErrorPage />;
  }

  if (data && courseId && unitId) {
    const { course } = data;
    const unit = course.units.find((unit: CourseUnit) => unit.id === unitId);
    const lesson = unit.lessons.find(
      (lesson: UnitLesson) => lesson.id === lessonId
    );
    return (
      <Page noPadding>
        <div className="flex w-full">
          <CourseNavigator
            course={course}
            unitId={unitId as string}
            lessonId={lessonId as string}
          />
          <LessonView course={course} lesson={lesson} />
        </div>
      </Page>
    );
  }

  return null;
}
