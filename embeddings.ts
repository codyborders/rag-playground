import { openai } from "./api-client-config";

export async function generateEmbeddings(texts: string[]) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      dimensions: 256,
      input: texts
    });
  
    console.log(response.data);
    console.log(response.data.length);
  
    return response.data.map((item) => item.embedding);
  }
  