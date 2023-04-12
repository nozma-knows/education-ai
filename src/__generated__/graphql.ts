/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Course = {
  __typename?: 'Course';
  author: User;
  authorId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  intendedOutcomes: Array<Maybe<Scalars['String']>>;
  prereqs: Array<Maybe<CoursePrereq>>;
  status?: Maybe<Status>;
  title: Scalars['String'];
  units: Array<Maybe<CourseUnit>>;
  updatedAt: Scalars['String'];
};

export type CoursePrereq = {
  __typename?: 'CoursePrereq';
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  topics: Array<Maybe<PrereqTopic>>;
  updatedAt: Scalars['String'];
};

export type CourseUnit = {
  __typename?: 'CourseUnit';
  course: Course;
  courseId: Scalars['String'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  lessons: Array<Maybe<UnitLesson>>;
  status: Status;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CreateCourseInput = {
  authorId: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type CreateLoginInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type GenerateLessonInput = {
  courseDescription: Scalars['String'];
  courseTitle: Scalars['String'];
  lessonId: Scalars['String'];
  lessonTitle: Scalars['String'];
  pastTopics: Scalars['String'];
  topics: Scalars['String'];
};

export type Login = {
  __typename?: 'Login';
  email: Scalars['String'];
  id: Scalars['ID'];
  user: User;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: Course;
  createLogin: Login;
  deleteCourse: Course;
  generateLesson: UnitLesson;
  login: Session;
  logout: Session;
};


export type MutationCreateCourseArgs = {
  input: CreateCourseInput;
};


export type MutationCreateLoginArgs = {
  input: CreateLoginInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['String'];
};


export type MutationGenerateLessonArgs = {
  input: GenerateLessonInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};

export type PrereqTopic = {
  __typename?: 'PrereqTopic';
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
  prereq: CoursePrereq;
  prereqId: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
  session?: Maybe<Session>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryCourseArgs = {
  id: Scalars['String'];
};


export type QueryCoursesArgs = {
  authorId: Scalars['String'];
};


export type QuerySessionArgs = {
  id: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['ID'];
  token: Scalars['String'];
};

export enum Status {
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type UnitLesson = {
  __typename?: 'UnitLesson';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  status: Status;
  title: Scalars['String'];
  topics: Scalars['String'];
  unit: CourseUnit;
  unitId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};
