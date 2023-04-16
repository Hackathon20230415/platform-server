// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const KEY = process.env.OPENAIKEY;
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
const template = "请帮我根据这段代码查询一些文章、开源库或者其他链接: {code} 如果未找到就告诉我，这段代码很棒，是有效和实用的！";
const codeReviewTemplate = new PromptTemplate({
  template: template,
  inputVariables: ["code"],
});
export default async function handler(req, res) {
  const {code} = req.body
  const model = new OpenAI({ openAIApiKey: KEY, temperature: 0.9,maxTokens: -1, });
  const prompts = await codeReviewTemplate.format({ code });
  const response = await model.call(prompts);
  res.status(200).json({ code: 0, data:response })
}