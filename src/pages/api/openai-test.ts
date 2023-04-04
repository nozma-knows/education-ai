import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PromptTemplate } from "langchain";

type ResponseError = {
  message: string;
};

type ResponseData = {
  result: string | null;
  error: ResponseError | null;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    title: string;
    description: string;
  };
}

// Initalize the wrapper
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});

// const memory = new BufferMemory();
// const chain = new ConversationChain({ llm: model, memory: memory });

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Grab prompt from request body
  const title = req.body.title;
  const description = req.body.description;

  // If prompt is missing or empty string, return error
  if (!title || !description) {
    res.status(400).json({
      result: null,
      error: {
        message: "Missing required props.",
      },
    });
  }

  // Prompt template to use with openai
  const promptTemplate = PromptTemplate.fromTemplate(
    `Create a course with the following title: {title} and description: {description} in markdown format`
  );

  // Prompt template to use with openai
  const prereqsPromptTemplate = PromptTemplate.fromTemplate(
    `Create a JSON string of prerequisites for a course with the following title: {title} and description: {description} in markdown format`
  );

  const fullPrompt = await prereqsPromptTemplate.format({ title, description });

  try {
    // const result = await chain.call({ input: prompt });
    const result = await model.call(fullPrompt);
    res.status(200).json({
      result: result || null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      result: null,
      error: {
        message: "An error occurred during your request.",
      },
    });
  }
}
