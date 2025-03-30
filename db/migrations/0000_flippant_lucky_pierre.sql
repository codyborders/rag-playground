CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE "facts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"embedding" vector(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX "embedding_index" ON "facts" USING hnsw ("embedding" vector_cosine_ops);