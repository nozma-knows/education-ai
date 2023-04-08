import { Course, Maybe } from "@/__generated__/graphql";
import { Grid } from "@mui/material";

type PrereqTopic = {
  title: string;
  description: string;
};

type CoursePrereq = {
  title: string;
  description: string;
  topics: Maybe<Maybe<PrereqTopic>[]> | undefined;
};

type UnitLesson = {
  title: string;
  content: string | null;
};

type CourseUnit = {
  title: string;
  description: string;
  lessons: Maybe<UnitLesson>[];
};

const CourseDetails = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Course Details</div>
      <div className="hidden md:flex gap-4 px-8">
        <div className="text-lg font-semibold">
          <div>Name</div>
          <div>Description</div>
        </div>
        <div className="text-lg">
          <div>{title}</div>
          <div>{description}</div>
        </div>
      </div>
      <div className="flex flex-col md:hidden gap-4 px-8">
        <div className="flex flex-col">
          <div className="text-lg font-semibold">Name</div>
          <div>{title}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold"> Description</div>
          <div>{description}</div>
        </div>
      </div>
    </div>
  );
};

const PrereqTopics = ({ topics }: { topics: PrereqTopic[] }) => {
  // const titles = topics.map((topic) => topic.title);
  // const descriptions = topics.map((topic) => topic.description);
  return (
    <div className="flex gap-4 px-8 text-base">
      <ul>
        {topics.map((topic, index) => {
          const { title } = topic;
          return (
            <li key={index} className="font-semibold">
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CoursePrereqs = ({ prereqs }: { prereqs: Maybe<CoursePrereq>[] }) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Prerequisites</div>
      <div className="flex flex-col gap-4 px-8 w-fit">
        {prereqs.map((prereq, index) => {
          const { title, description, topics } = prereq;
          return (
            <div key={index} className="flex flex-col gap-2 text-lg">
              <div className="flex  flex-col md:flex-row md:gap-4">
                <div className="flex font-semibold">{title}</div>
                <div className="flex flex-1">{description}</div>
              </div>
              <PrereqTopics topics={topics} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const UnitLessons = ({ lessons }: { lessons: Maybe<UnitLesson>[] }) => {
  return (
    <div className="flex gap-4 px-8 text-base">
      <ol>
        {lessons.map((lesson, index) => {
          const { title } = lesson;
          return (
            <div key={index} className="flex flex-col text-base">
              <li className="font-semibold">{title}</li>
            </div>
          );
        })}
      </ol>
    </div>
  );
};

const CourseUnits = ({ units }: { units: Maybe<CourseUnit>[] }) => {
  return (
    <div className="flex flex-col w-full h-full px-4 gap-4">
      <div className="text-4xl font-bold">Units</div>
      <div className="flex flex-col gap-4 px-8 w-fit">
        {units.map((unit, index) => {
          const { title, description, lessons } = unit;
          return (
            <div key={index} className="flex flex-col gap-2 text-lg">
              <div className="flex flex-col md:flex-row md:gap-4">
                <div className="flex font-semibold">{title}</div>
                <div className="flex flex-1">{description}</div>
              </div>
              <UnitLessons lessons={lessons} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const IntendedOutcomes = ({ outcomes }: { outcomes: Maybe<string>[] }) => {
  return (
    <div className="flex flex-col w-full h-full p-4 gap-4">
      <div className="text-4xl font-bold">Intended Outcomes</div>
      <ul>
        {outcomes.map((outcome, index) => (
          <li key={index} className="text-lg">
            {outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function CourseLandingPage({ course }: { course: Course }) {
  const { title, description, prereqs, units, intendedOutcomes } = course;
  return (
    <div className="flex flex-col w-full h-full items-center p-4 overflow-auto">
      <div className="flex justify-center w-full max-w-7xl">
        <div className="flex flex-col gap-4">
          <CourseDetails title={title} description={description} />
          {prereqs && <CoursePrereqs prereqs={prereqs} />}
          {units && <CourseUnits units={units} />}
          {intendedOutcomes && <IntendedOutcomes outcomes={intendedOutcomes} />}
        </div>
      </div>
    </div>
  );
}
