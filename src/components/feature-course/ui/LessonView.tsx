import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { PulseLoader } from "react-spinners";
import { GenerateLessonMutation } from "@/components/graph";
import { Course, UnitLesson } from "@/__generated__/graphql";

export default function LessonView({
  course,
  lesson,
}: {
  course: Course;
  lesson: UnitLesson;
}) {
  const { title: courseTitle, description: courseDescription } = course;
  const { id: lessonId, title: lessonTitle, topics } = lesson;
  const [content, setContent] = useState(lesson.content);
  const [loading, setLoading] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    console.log("highlightedText: ", highlightedText);
  }, [highlightedText]);

  useEffect(() => {
    setContent(lesson.content);
  }, [lesson.content, lesson.id]);

  // MUTATIONS
  // Create course mutation
  const [generateLesson] = useMutation(GenerateLessonMutation, {
    onCompleted: (data: { generateLesson: UnitLesson }) => {
      setContent(data.generateLesson.content);
      setLoading(false);
    },
  });

  // Function for calling create note mutation
  const GenerateLesson = (
    courseTitle: string,
    courseDescription: string,
    lessonId: string,
    lessonTitle: string,
    topics: string
  ) => {
    const input = {
      courseTitle,
      courseDescription,
      lessonId,
      lessonTitle,
      topics,
      pastTopics: "",
    };
    generateLesson({
      variables: {
        input,
      },
    });
  };

  if (content === "") {
    if (!loading) {
      setLoading(true);
      GenerateLesson(
        courseTitle,
        courseDescription,
        lessonId,
        lessonTitle,
        topics
      );
    }

    return (
      <div className="flex flex-1 w-full justify-center items-center">
        <PulseLoader color="#000" size={20} />
      </div>
    );
  }

  const handleMouseUp = () => {
    setHighlightedText(window.getSelection()!.toString());
  };

  return (
    <div
      className="flex flex-col flex-1 gap-4 px-4 pb-4 overflow-auto"
      onMouseUp={handleMouseUp}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
