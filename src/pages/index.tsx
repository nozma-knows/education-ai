import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import Page from "@/components/ui/pages/Page";
import CreateCourseForm from "@/components/ui/forms/CreateCourseForm";
import CourseLandingPage from "@/components/feature-course/CourseLandingPage";
import Course from "@/components/feature-course/Course";
import { SyllabusType } from "./api/generate-course-syllabus";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [syllabus, setSyllabus] = useState<SyllabusType | null>();
  const [completingCourse, setCompletingCourse] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      const response = await fetch(`../api/generate-course-syllabus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
        }),
      });
      const responseData = await response.json();
      setSyllabus(responseData.result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error calling openai-test endpoint: ", error);
    }
  };

  return (
    <Page>
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
    </Page>
  );
}
