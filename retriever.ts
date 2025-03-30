import { and, cosineDistance, desc, gt, sql } from "drizzle-orm";
import { generateEmbeddings } from "./embeddings";
import { db } from "./db";
import { factsTable } from "./db/schema/facts-schema";


export async function retrieveData(input: string, options: {limit?: number, minSimilarity?: number, name?: string | null} = {}) {
    const {limit = 10, minSimilarity = .3, name = null} = options
    
    const embeddings = await generateEmbeddings([input]);

    const similarity = sql<number>`1 - (${cosineDistance(factsTable.embedding, embeddings[0])})`;
    
    const documents = await db
    .select({
        name: factsTable.name,
        content: factsTable.content,
        similarity
    })
    .from(factsTable)
    .where(name ? and(gt(similarity, minSimilarity), sql`LOWER($(factsTable.name})) = LOWER${name}`) : gt(similarity, minSimilarity))
    .orderBy((t) => desc(t.similarity))
    .limit(limit);
    
    return documents
}