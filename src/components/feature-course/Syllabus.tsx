import {
  SyllabusType,
  PrerequisiteType,
  CourseModuleType,
} from "@/pages/api/generate-course-syllabus";

const CourseDetails = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full px-4">
      <div className="text-2xl font-bold">Course Details</div>
      <div className="flex p-2">
        <div className="flex flex-col gap-2 px-2">
          <div className="font-semibold">Name</div>
          <div className="font-semibold">Description</div>
        </div>
        <div className="flex flex-col gap-2 px-2">
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

const CoursePrereqs = ({ prereqs }: { prereqs: PrerequisiteType[] }) => {
  return (
    <div className="flex flex-col w-full px-4">
      <div className="text-2xl font-bold">Prerequisites</div>
      <div className="flex p-2">
        <div className="flex flex-col p-2 gap-4">
          {prereqs.map((prereq, index) => {
            const { title, description, topics } = prereq;
            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <span className="font-semibold">{title}</span>
                  <span>-</span>
                  <span>{description}</span>
                </div>
                <div className="px-8">
                  {topics.map((topic, index) => {
                    const { title, description } = topic;
                    return (
                      <div key={index} className="flex gap-2">
                        <span className="">{title}</span>
                        <span>-</span>
                        <span>{description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CourseModules = ({ modules }: { modules: CourseModuleType[] }) => {
  return (
    <div className="flex flex-col w-full px-4">
      <div className="text-2xl font-bold">Modules</div>
      <ol className="flex flex-col p-2 gap-2">
        {modules.map((modules, index) => {
          const { title, lessons } = modules;
          return (
            <div key={index}>
              <li>{title}</li>
              <ol style={{ listStyleType: "lower-alpha" }}>
                {lessons.map((lesson, index) => {
                  return <li key={index}>{lesson.title}</li>;
                })}
              </ol>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

const CourseIntendedOutcomes = ({
  intendedOutcomes,
}: {
  intendedOutcomes: string[];
}) => {
  return (
    <div className="flex flex-col w-full px-4">
      <div className="text-2xl font-bold">Intended Outcomes</div>
      <ul className="flex flex-col p-2 gap-2">
        {intendedOutcomes.map((outcome, index) => {
          return <li key={index}>{outcome}</li>;
        })}
      </ul>
    </div>
  );
};

export default function Syllabus({ syllabus }: { syllabus: SyllabusType }) {
  const { title, description, prereqs, units, intendedOutcomes } = syllabus;
  return (
    <div className="flex flex-col max-w-2xl md:max-w-4xl h-full gap-2">
      <CourseDetails title={title} description={description} />
      <CoursePrereqs prereqs={prereqs} />
      <CourseModules modules={units} />
      <CourseIntendedOutcomes intendedOutcomes={intendedOutcomes} />
    </div>
  );
}
