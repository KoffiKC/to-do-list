CREATE TABLE "toDo" (
  "id" serial PRIMARY KEY,
  "task" varchar(255) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

INSERT INTO "toDo" ("task")
VALUES ('Do laundry'),
('Back cake'),
('Have a good time');