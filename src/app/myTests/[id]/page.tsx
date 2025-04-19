import { extractTextFromPdfUrl } from "@/lib/utils"
import AIParagraph from "./AIParagraph"
import ShareQr from "./ShareQr"

async function page({ params }: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const extractPdfText = await extractTextFromPdfUrl("http://localhost:3000/example.pdf")

  return (
    <div className="flex flex-col lg:flex-row-reverse mx-auto w-full max-w-5xl px-2 mb-6">
      <div className="flex-1">
        <h2 className="text-center text-3xl my-6">PDF Report :</h2>
        <iframe className="mx-auto w-full h-[80vh] max-w-3xl" src="/example.pdf"></iframe>
      </div>

      <div className="flex-1">
        <h2 className="my-6 text-3xl text-center">AI analytics</h2>
        <div>
          <AIParagraph data={extractPdfText}/>
        </div>
        <ShareQr id="" />
      </div>
    </div>
  )
}
export default page