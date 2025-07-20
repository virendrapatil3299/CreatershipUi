CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"uid" varchar(255) NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" text
);
