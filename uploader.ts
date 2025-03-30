import { MOCK_DATA } from "./dataset";
import { db } from "./db";
import { generateEmbeddings } from "./embeddings";
import { factsTable } from "./db/schema/facts-schema";

export async function uploadData(data: { content: string, name: string}[]) {
    const embeddings = await generateEmbeddings(data.map((item) => item.content));

await db.insert(factsTable).values(
    embeddings.map((embedding, index) => {
        return {
            embedding,
            name: data[index].name,
            content: data[index].content
        };
    })
);
}
