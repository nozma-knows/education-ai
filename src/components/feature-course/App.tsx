import { useState, useEffect } from "react";
import { useMutation, Context } from "@apollo/client";
import { parse } from "cookie";
import { Course as CourseType } from "@/__generated__/graphql";
import { CreateCourseMutation } from "@/components/graph";
import { FieldValues } from "react-hook-form";
import Page from "@/components/ui/pages/Page";
import CreateCourseForm from "@/components/ui/forms/CreateCourseForm";
import CourseLandingPage from "@/components/feature-course/CourseLandingPage";
import Course from "@/components/feature-course/Course";
import { SyllabusType } from "@/pages/api/generate-course-syllabus";
import DecodeToken from "@/components/utils/conversion/DecodeToken";

export default function Index({ token }: { token: string }) {
  const decodedToken = DecodeToken({ token });
  const authorId = decodedToken?.userId;

  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<SyllabusType | null>();
  const [completingCourse, setCompletingCourse] = useState(false);

  // MUTATIONS
  // Create course mutation
  const [createCourse] = useMutation(CreateCourseMutation, {
    onCompleted: (data: { createCourse: CourseType }) => {
      const parsedCourse = JSON.parse(data.createCourse.content);
      console.log("parsedCourse: ", parsedCourse);
      setSyllabus(parsedCourse);
      setLoading(false);
    },
    onError: () => console.log("error!"),
  });

  // Function for calling create note mutation
  const CreateCourse = (
    authorId: string,
    title: string,
    description: string
  ) => {
    const input = {
      authorId,
      title,
      description,
    };
    createCourse({
      variables: {
        input,
      },
    });
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      console.log("AUTHORID: ", authorId);
      CreateCourse(authorId!, data.title, data.description);
    } catch (error) {
      setLoading(false);
      console.error("Error calling openai-test endpoint: ", error);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center">
      {syllabus ? (
        <div className="flex h-full w-full">
          {completingCourse ? (
            <Course syllabus={syllabus} />
          ) : (
            <CourseLandingPage
              syllabus={syllabus}
              setCompletingCourse={setCompletingCourse}
            />
          )}
        </div>
      ) : (
        <CreateCourseForm loading={loading} onSubmit={onSubmit} />
      )}
    </div>
  );
}
