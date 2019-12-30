CREATE TABLE IF NOT EXISTS "categorizations"(
  "id"                     SERIAL            PRIMARY KEY  NOT NULL,
  "equipmentId"            INT               NOT NULL REFERENCES "equipments"(id),
  "categoryId"             INT               NOT NULL REFERENCES "categories"(id),
  "createdAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);
