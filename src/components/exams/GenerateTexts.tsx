// src/components/GenerateText.tsx
import React, { useState } from 'react';

const GenerateText: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleGenerateText = async () => {
    setResponse('');
    const response = await fetch('/api/openia/generatetexts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';

      const processText = ({ done, value }: ReadableStreamReadResult<Uint8Array>): Promise<void> => {
        if (done) {
          console.log('Stream complete');
          return Promise.resolve();
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.substring(6));
            if (data.choices[0].delta?.content) {
              result += data.choices[0].delta.content;
              setResponse(result);
            }
          }
        }

        return reader.read().then(processText);
      };

      reader.read().then(processText);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
      />
      <button onClick={handleGenerateText}>Generate Text</button>
      <pre>{response}</pre>
    </div>
  );
};

export default GenerateText;
