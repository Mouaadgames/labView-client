"use client"

import { useEffect, useState } from "react";
import axios from 'axios'
function AIParagraph({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [AiParagraph, setAiParagraph] = useState('');
  useEffect(() => {
    async function main() {
      const aiRes = (await axios.post("/api", {
        id
      })).data.text
      console.log(aiRes);

      setAiParagraph(aiRes)

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
          <div dangerouslySetInnerHTML={{ __html: AiParagraph }}/>
        )
      }
    </>
  )
}
export default AIParagraph