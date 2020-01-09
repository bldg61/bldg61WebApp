CREATE TABLE IF NOT EXISTS "equipments"(
  "id"                     SERIAL            PRIMARY KEY  NOT NULL,
  "name"                   VARCHAR(100)      NOT NULL,
  "totalForCheckout"       INT               NOT NULL,
  "createdAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"              TIMESTAMP         NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "equipments"
ADD CONSTRAINT uc_equipment_name UNIQUE("name");
