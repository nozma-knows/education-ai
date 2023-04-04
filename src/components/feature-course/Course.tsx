import { useState, useEffect } from "react";
import {
  SyllabusType,
  CourseModuleType,
} from "@/pages/api/generate-course-syllabus";

const CourseNavigator = ({
  title,
  activeModule,
  setActiveModule,
  modules,
}: {
  title: string;
  activeModule: CourseModuleType;
  setActiveModule: (module: CourseModuleType) => void;
  modules: CourseModuleType[];
}) => {
  console.log("activeModule: ", activeModule);
  console.log("modules: ", modules);
  return (
    <div className="flex flex-col w-96 bg-blue-500 px-2">
      <div className="flex self-center text-2xl font-bold p-2">{title}</div>
      <div className="h-1 w-full bg-black" />
      <div className="flex flex-col p-4 gap-4">
        {modules.map((module, index) => {
          const { title } = module;
          return (
            <div
              key={index}
              className={`cursor-pointer p-2 rounded-lg ${
                activeModule.title === title && "bg-red-500 "
              } `}
              onClick={() => setActiveModule(modules[index + 1])}
            >{`Module ${index + 1} - ${title}`}</div>
          );
        })}
      </div>
    </div>
  );
};

const CourseLesson = () => {
  return <div>Lesson</div>;
};

export default function Course({ syllabus }: { syllabus: SyllabusType }) {
  const { title, modules } = syllabus;
  const [activeModule, setActiveModule] = useState(modules[0]);

  useEffect(() => {
    console.log("activeModule useEffect: ", activeModule);
  }, [activeModule]);

  return (
    <div className="flex w-full h-full bg-red-200">
      <CourseNavigator
        title={title}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        modules={modules}
      />
      <CourseLesson />
    </div>
  );
}
