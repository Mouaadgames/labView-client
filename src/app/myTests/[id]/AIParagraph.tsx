"use client"

import { useEffect, useState } from "react";
import axios from 'axios'
import pdfjs from 'pdfjs-dist'
function AIParagraph({ data }: { data: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [AiParagraph, setAiParagraph] = useState('');
  useEffect(() => {
    async function main() {
      setAiParagraph((await axios.post("/api", {
        data
      })).data.text)
      setIsLoading(false)
    }
    main()
  }, []);


  return (
    <>
      {
        isLoading ? (
          <div className="loader mx-auto"></div>
        ) : (
          <p>
            {AiParagraph}
          </p>
        )
      }
    </>
  )
}
export default AIParagraph