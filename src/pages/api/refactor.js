// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const KEY = process.env.OPENAIKEY;
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
const template = "请帮我重写这段代码，让它更有效率: {code} 如果已经很好了，则可以直接告诉我，这段代码很棒，请继续加油！";
const codeReviewTemplate = new PromptTemplate({
  template: template,
  inputVariables: ["code"],
});
export default async function handler(req, res) {
  const {code} = req.body
  const model = new OpenAI({ openAIApiKey: KEY, temperature: 0.9 });
  const prompts = await codeReviewTemplate.format({ code });
  const response = await model.call(prompts);
  res.status(200).json({ code: 0, data:response })
}