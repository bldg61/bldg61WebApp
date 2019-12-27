CREATE TABLE IF NOT EXISTS "categories"(
  "id"                     SERIAL            PRIMARY KEY  NOT NULL,
  "name"                   VARCHAR(100)      NOT NULL,
  "createdAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "categories"
ADD CONSTRAINT uc_category_name UNIQUE("name");
