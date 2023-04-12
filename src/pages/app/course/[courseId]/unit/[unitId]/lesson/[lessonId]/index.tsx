import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { CourseQuery } from "@/components/graph";
import Page from "@/components/ui/pages/Page";
import LoadingPage from "@/components/ui/pages/LoadingPage";
import ErrorPage from "@/components/ui/pages/ErrorPage";
import { Course, CourseUnit, UnitLesson } from "@/__generated__/graphql";
import LessonView from "@/components/feature-course/ui/LessonView";

const CourseNavigator = ({
  course,
  unitId,
  lessonId,
}: {
  course: Course;
  unitId: string;
  lessonId: string;
}) => {
  const router = useRouter();
  const { title, units } = course;
  return (
    <div className="flex flex-col bg-black text-white max-w-sm px-2">
      <div className="flex self-center text-2xl font-bold p-2">{title}</div>
      <div className="h-1 w-full bg-white" />
      <div className="flex flex-col p-4 gap-2">
        {units.map((unit, unitIndex) => {
          if (unit) {
            const { id, title, lessons } = unit;
            const isActiveUnit = unitId === id;
            return (
              <div key={id}>
                <div
                  className={`${isActiveUnit ? "font-bold" : "cursor-pointer"}`}
                  onClick={() =>
                    !isActiveUnit &&
                    router.push({
                      pathname:
                        "/app/course/[courseId]/unit/[unitId]/lesson/[lessonId]",
                      query: {
                        courseId: router.query.courseId,
                        unitId: id,
                        lessonId: lessons[0]!.id,
                      },
                    })
                  }
                >
                  {`${unitIndex + 1}. ${title}`}
                </div>
                {isActiveUnit && (
                  <div className="flex flex-col px-4">
                    {unit.lessons.map((lesson, lessonIndex) => {
                      if (lesson) {
                        const { id, title } = lesson;
                        const isActiveLesson = lessonId === id;
                        return (
                          <div
                            key={id}
                            className={`flex gap-2 ${
                              isActiveLesson ? "font-bold" : "cursor-pointer"
                            }`}
                            onClick={() =>
                              router.push({
                                pathname:
                                  "/app/course/[courseId]/unit/[unitId]/lesson/[lessonId]",
                                query: {
                                  courseId: router.query.courseId,
                                  unitId: unitId,
                                  lessonId: lesson.id,
                                },
                              })
                            }
                          >
                            <div>{`${unitIndex + 1}.${lessonIndex + 1}`}</div>
                            <div>{`${title}`}</div>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

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
