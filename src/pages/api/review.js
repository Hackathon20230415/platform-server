// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const KEY = process.env.OPENAIKEY;
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
const template = "请帮我检查这段代码有什么问题: {code}? 如果没有问题，则可以直接告诉我，这段代码很棒，请继续加油！";
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