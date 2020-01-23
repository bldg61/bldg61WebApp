CREATE TABLE IF NOT EXISTS "checkouts"(
  "id"                     SERIAL            PRIMARY KEY  NOT NULL,
  "patronName"             VARCHAR(100)      NOT NULL,
  "patronContact"          VARCHAR(100)      NOT NULL,
  "dueDate"                DATE              NOT NULL,
  "toolId"                 INT               NOT NULL REFERENCES "tools"(id),
  "createdAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);
