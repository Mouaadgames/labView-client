import { NextRequest, NextResponse } from 'next/server'
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { prisma } from '@/lib/prisma';

export function randomCode() {
  return `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`
}

export async function getAISummery(id: string) {


  const token = process.env["GITHUB_TOKEN"];
  const endpoint = "https://models.inference.ai.azure.com";
  const modelName = "DeepSeek-V3";

  async function main() {

    if (!token) throw new Error("no ai token found")

    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );
    const oldReportData = (await prisma.medicalReports.findFirst({ where: { report_id: id } }))
    if (!oldReportData) return "no report found"
    if (oldReportData.processed_report_data) return oldReportData.processed_report_data

    const pdfText = await extractTextFromPdfUrl("http://localhost:3000/example.pdf")

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "user", content: 'here is my blood test data\ngenerate a score out of 100 and simple summery using simple english to explain what those number indicate explain only the the values that are not normal like iam a 7 years old, if every think seams ok just say it. keep it short and give specific advice.\n results should  contain first score out of 100 and the explanation and then the advise, give results using html tags instead of md and add break line <br/> \n data:' +
              pdfText
          }
        ],
        max_tokens: 1000,
        model: modelName
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error;
    }
    console.log(response.body);


    console.log(response.body.choices[0].message.content);
    // save in db to reuse it
    await prisma.medicalReports.update({
      where: {
        report_id: id
      }, data: {
        processed_report_data: response.body.choices[0].message.content
      }
    })
    return response.body.choices[0].message.content as string


  }

  const result = await main()

  return result
}

// utils/pdfTextFromUrl.js
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Set local worker path manually (for Node.js use only)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Point to local pdf.worker.js file (inside node_modules)
const workerPath = path.join(
  __dirname,
  '../../node_modules/pdfjs-dist/legacy/build/pdf.worker.js'
);

pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

export const extractTextFromPdfUrl = async (pdfUrl: string) => {
  const loadingTask = pdfjsLib.getDocument(pdfUrl);
  const pdf = await loadingTask.promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    //@ts-ignore
    const pageText = textContent.items.map((item) => item.str).join(' ');
    fullText += `\n\n${pageText}`;
  }

  return fullText;
};
