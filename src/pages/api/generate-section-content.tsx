import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms";
import { PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

type ResponseError = {
  message: string;
};

type ResponseData = {
  result: string | null;
  error: ResponseError | null;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    module: string;
    section: string;
  };
}

// Initalize the wrapper
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Grab prompt from request body
  const module = req.body.module;
  const section = req.body.section;

  // If prompt is missing or empty string, return error
  if (!module || !section) {
    res.status(400).json({
      result: null,
      error: {
        message: "Missing required props.",
      },
    });
  }

  const prompt = new PromptTemplate({
    template:
      "Write a section of a textbook for the following module: {module} and section: {section}. Return text in Markdown format.",
    inputVariables: ["module", "section"],
  });

  const fullPrompt = await prompt.format({ module, section });

  try {
    const result = await model.call(fullPrompt);
    res.status(200).json({
      result: result || null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      result: null,
      error: {
        message: `An error occurred during your request. - ${error}`,
      },
    });
  }
}
