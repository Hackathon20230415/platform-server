// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const KEY = process.env.OPENAIKEY;
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { CallbackManager } from "langchain/callbacks";

const template = "请帮我给这段代码的合适位置添加注释: {code} ,如果已经很好了，你务必将代码原样返回给我。";
const codeReviewTemplate = new PromptTemplate({
  template: template,
  inputVariables: ["code"],
});
export default async function handler(req, res) {
  const {code} = req.body
  const callbackManager = CallbackManager.fromHandlers({
    handleLLMStart: async (llm, prompts) => {
      console.log(JSON.stringify(llm, null, 2));
      console.log(JSON.stringify(prompts, null, 2));
    },
    handleLLMEnd: async (output) => {
      console.log(JSON.stringify(output, null, 2));
    },
    handleLLMError: async (err) => {
      console.error(err);
    },
  });
  const model = new OpenAI({ openAIApiKey: KEY, temperature: 0.9, maxTokens: -1, verbose: true,
    callbackManager });
  const prompts = await codeReviewTemplate.format({ code });
  const response = await model.call(prompts);
  console.log(response,typeof response, response.length)
  res.status(200).json({ code: 0, data:response })
}