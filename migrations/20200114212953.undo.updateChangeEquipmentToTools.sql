ALTER TABLE "categorizations"
DROP CONSTRAINT "categorizations_toolId_fkey";

ALTER TABLE "tools"
DROP CONSTRAINT uc_tool_name;

ALTER TABLE "categorizations"
RENAME COLUMN "toolId" TO "equipmentId";

ALTER TABLE "tools"
RENAME TO "equipments";

ALTER INDEX tools_pkey RENAME TO "equipments_pkey";

ALTER SEQUENCE tools_id_seq RENAME TO equipments_id_seq;

ALTER TABLE "equipments"
ADD CONSTRAINT uc_equipment_name UNIQUE("name");

ALTER TABLE "categorizations"
ADD CONSTRAINT "categorizations_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments" (id);
