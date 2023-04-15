import { useRouter } from "next/router";
import { Course, CourseUnit, Maybe } from "@/__generated__/graphql";

interface CourseNavigatorProps {
  course: Course;
  unitId: string;
  lessonId: string;
}

export default function CourseNavigator({
  course,
  unitId,
  lessonId,
}: CourseNavigatorProps) {
  const router = useRouter();
  const { title, units } = course;
  return (
    <div className="flex flex-col bg-black text-white max-w-sm px-2 rounded-tr-lg">
      <div className="flex self-center text-2xl font-bold p-2">{title}</div>
      <div className="h-1 w-full bg-white" />
      <div className="flex flex-col p-4 gap-2">
        {units.map((unit: Maybe<CourseUnit>, unitIndex: number) => {
          if (unit) {
            const { id, title, lessons } = unit;
            const isActiveUnit = unitId === id;
            const isExercises = lessonId === "exercises";
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
                    <div
                      key={id}
                      className={`flex gap-2 ${
                        isExercises ? "font-bold" : "cursor-pointer"
                      }`}
                      onClick={() =>
                        router.push({
                          pathname:
                            "/app/course/[courseId]/unit/[unitId]/exercises",
                          query: {
                            courseId: router.query.courseId,
                            unitId: unitId,
                          },
                        })
                      }
                    >
                      <div>{`Exercises`}</div>
                    </div>
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
}
