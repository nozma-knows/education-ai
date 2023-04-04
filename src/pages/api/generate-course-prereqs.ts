import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "langchain/llms";
import { PromptTemplate } from "langchain";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";

type ResponseError = {
  message: string;
};

type ResultObject = {
  prerequisites: {
    title: string;
    description: string;
    topics: {
      topic: string;
      description: string;
    }[];
  }[];
};

type ResponseData = {
  result: ResultObject | null;
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

  const parser = StructuredOutputParser.fromZodSchema(
    z.object({
      prerequisites: z.array(
        z.object({
          title: z.string().describe("Name of the prerequisite"),
          description: z.string().describe("Description of the prerequisite"),
          topics: z
            .array(
              z.object({
                topic: z.string().describe("Name of the topic"),
                description: z.string().describe("Description of the topic"),
              })
            )
            .describe("Topics related to the spicific prerequisite"),
        })
      ),
    })
  );

  const formatInstructions = parser.getFormatInstructions();

  // const prompt = PromptTemplate.fromTemplate(
  //   `Create a JSON string of prerequisites for a course with the following title: {title} and description: {description} in markdown format`
  // );

  const prompt = new PromptTemplate({
    template:
      "Create a list of prerequisites for a course with the following title: {title} and description: {description} and format: {format_instructions}.",
    inputVariables: ["title", "description"],
    partialVariables: { format_instructions: formatInstructions },
  });

  const fullPrompt = await prompt.format({ title, description });

  try {
    // const result = await chain.call({ input: prompt });
    const result = await model.call(fullPrompt);
    const parsedResult = parser.parse(result);
    res.status(200).json({
      result: parsedResult || null,
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
