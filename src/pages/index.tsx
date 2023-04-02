import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Page from "@/components/ui/pages/Page";
import CreateCourseForm from "@/components/ui/forms/CreateCourseForm";

const onSubmit = async (data: FieldValues) => {
  try {
    const response = await fetch(`../api/openai-test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: data.title }),
    });
    const responseData = await response.json();
    console.log("responseData: ", responseData);
  } catch (error) {
    console.error("Error calling openai-test endpoint: ", error);
  }
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  return (
    <Page>
      <div className="flex w-full h-full justify-center items-center">
        <CreateCourseForm loading={loading} onSubmit={onSubmit} />
      </div>
    </Page>
  );
}
