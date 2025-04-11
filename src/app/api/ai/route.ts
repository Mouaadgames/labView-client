import { NextResponse } from 'next/server'
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";


export async function GET() {

  const token = process.env["GITHUB_TOKEN"];
  const endpoint = "https://models.inference.ai.azure.com";
  const modelName = "DeepSeek-V3";

  async function main() {

    if (!token) throw new Error("no ai token found")
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "user", content: 'here is my blood test data\ngenerate a score out of 100 and simple summery using simple english to explain what those number indicate explain only the the values that are not normal if every think seams ok just say it. keep it short and give specific advice.\n results should be in this JSON format {"score":, "summary":} and dont use \`\`\`json ... \`\`\` \n data:' +
              `Hemoglobin Colorimetric 14.5 g/dL 13.0 - 16.5
          RBC Count Electrical impedance 4.79 million/cmm 4.5 - 5.5
          Hematocrit Calculated 43.3 % 40 - 49
          MCV Derived 90.3 fL 83 - 101
          MCH Calculated 30.2 pg 27.1 - 32.5
          MCHC Calculated 33.4 g/dL 32.5 - 36.7
          RDW CV Calculated 13.60 % 11.6 - 14
          Total WBC and Differential Count
          WBC Count SF Cube cell analysisH 10570 /cmm 4000 - 10000
          Neutrophils Microscopic 73 % 40 - 80
          Lymphocytes Microscopic 19 % 20 - 40
          Eosinophils Microscopic 02 % 1 - 6
          Monocytes Microscopic 06 % 2 - 10
          Basophils Microscopic 00 % 0 - 2
          7716 /cmm 2000 - 6700
          2008 /cmm 1100 - 3300
          211 /cmm 00 - 400
          634 /cmm 200 - 700
          0 /cmm 0 - 100
          Platelet Count Electrical impedance 150000 /cmm 150000 - 410000
          MPV Calculated H 14.00 fL 7.5 - 10.3
          Peripheral Smear Examination
          RBC Morphology Normochromic Normocytic
          WBC Morphology WBCs Series Shows Normal Morphology
          Platelets Morphology Platelets are adequate with normal morphology.
          Parasites Malarial parasite is not detected.
          Erythrocyte Sedimentation Rate
          ESR Capillary photometry 7 mm/1hr 0 - 14
          Complete Blood Count
          Test Result Unit Biological Ref. Interval
          Differential Count Absolute Count
          DR.TEJASWINI DHOTE Dr. Sanjeev Shah Dr.Yash Shah
          M.D. Pathology MD Path MD Path
          This is an Electronically Authenticated Report. # Referred Test
          Sex/Age Male / 41 Y 01-Feb-1982
          Approved on : 20-Feb-2023 11:09 Status : Final
          :
          Ref. Id :
          Printed On : 28-Feb-2023 10:26
          Ref. By : : 1. NRL SAWPL Gujarat Ahmedabad Paldi
          Location :
          MC-2202
          Scan QR code to check
          report authenticity
          Passport No : LABORATORY TEST REPORT
          Patient Information Sample Information Client/Location Information
          Name : Lyubochka Svetka Lab Id : 02232160XXXX Client Name : Sterling Accuris Buddy
          Registration on : 20-Feb-2023 09:10
          Collected at : non SAWPL
          Collected on : 20-Feb-2023 08:53
          Sample Type : EDTA Blood
          Process At
          Page 1 of 19
          0ABO Type "A"
          Rh (D) Type Positive
          Blood Group
          Test Result Unit Biological Ref. Interval
          DR.TEJASWINI DHOTE Dr. Sanjeev Shah Dr.Yash Shah
          M.D. Pathology MD Path MD Path
          This is an Electronically Authenticated Report. # Referred Test
          Sex/Age Male / 41 Y 01-Feb-1982 Collected at : non SAWPL
          Approved on : 20-Feb-2023 13:33 Status : Final
          :
          Ref. Id : : 20-Feb-2023 08:53
          Printed On : 28-Feb-2023 10:26
          Ref. By : : 1. NRL SAWPL Gujarat Ahmedabad Paldi
          Collected on
          Process At
          :
          Scan QR code to check
          report authenticity
          Passport No : LABORATORY TEST REPORT
          Sample Information Client/Location Information
          Location
          Patient Information
          EDTA Blood,
          Serum
          Sample Type :
          Name : Lyubochka Svetka Lab Id : 02232160XXXX Client Name : Sterling Accuris Buddy
          Registration on : 20-Feb-2023 09:10
          Page 2 of 19
          0` }
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
    return response.body.choices[0].message.content as string

    // save in db to reuse it
  }

  const result = await main()

  const res = NextResponse.json(JSON.parse(result))
  return res
}