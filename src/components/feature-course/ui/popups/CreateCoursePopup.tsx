import { useState, useContext, SetStateAction } from "react";
import CourseContext from "../../context/CourseContext";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CreateCourseMutation } from "@/components/graph";
import { Course } from "@/__generated__/graphql";
import { FieldValues } from "react-hook-form";
import useWindowSize from "@/components/utils/hooks/useWindowSize";
import Popup from "@/components/ui/popups/Popup";
import CreateCourseForm from "@/components/ui/forms/CreateCourseForm";

interface CreateCoursPopupProps {
  onClose: any;
}

export default function CreateCoursePopup({ onClose }: CreateCoursPopupProps) {
  const router = useRouter();
  const screenSize = useWindowSize();
  const [loading, setLoading] = useState(false);

  const { authorId, refetchCourses } = useContext(CourseContext);

  // MUTATIONS
  // Create course mutation
  const [createCourse] = useMutation(CreateCourseMutation, {
    onCompleted: (data: { createCourse: Course }) => {
      refetchCourses();
      onClose();
      setLoading(false);
    },
    onError: () => console.log("error!"),
  });

  // Function for calling create note mutation
  const CreateCourse = (title: string, description: string) => {
    console.log("CreateCourse - authorId: ", authorId);
    const input = {
      authorId,
      title,
      description,
    };
    console.log("Input: ", input);
    createCourse({
      variables: {
        input,
      },
    });
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true);
      CreateCourse(data.title, data.description);
    } catch (error) {
      setLoading(false);
      console.error("Error calling openai-test endpoint: ", error);
    }
  };

  return (
    <Popup
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "12px",
        padding: "1rem",
        width: screenSize.width > 1024 ? "65%" : "90%",
      }}
      onClose={onClose}
    >
      <div className="flex flex-col w-full h-full items-center justify-between p-0 sm:p-2 gap-1 sm:gap-4">
        <h1 className="text-main-dark">What would you like to learn next?</h1>
        <CreateCourseForm loading={loading} onSubmit={onSubmit} />
      </div>
    </Popup>
  );
}
