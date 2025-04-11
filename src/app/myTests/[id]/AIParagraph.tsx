"use client"

import { useState } from "react";

function AIParagraph({
  data
}:{
  data:string
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [AiParagraph, setAiParagraph] = useState('');
  const [AiScore, setAiScore] = useState('');
  const [AiAdvice, setAiAdvice] = useState('');

  return (
    <div>
      <span>Health score : <span style={{ color: "rgb(255,0,0)" }}> {
        isLoading ? (<span>
          ...
        </span>) : (<span>
          {AiScore}
        </span>)
      }
      </span> /100 <span className="relative ml-2 cursor-pointer"> <div className="border rounded-full aspect-square absolute inset-y-0 left-0 -translate-x-1/3 scale-75"></div> ? </span></span>
      <h3>Paragraph Summery</h3>
      {
        isLoading ? (<p>
          ...
        </p>) : (<p>
          {AiParagraph}
        </p>)
      }

      <h3>Some Advice</h3>
      {
        isLoading ? (<p>
          ...
        </p>) : (<p>
          {AiAdvice}
        </p>)
      }
    </div>
  )
}
export default AIParagraph