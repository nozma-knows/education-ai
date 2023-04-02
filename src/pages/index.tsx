import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Page from "@/components/ui/pages/Page";
import CreateCourseForm from "@/components/ui/forms/CreateCourseForm";

const onSubmit = (data: FieldValues) => {
  console.log("Submitted Create Course Form - ", data);
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
