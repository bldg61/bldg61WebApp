ALTER TABLE "categorizations"
DROP CONSTRAINT "categorizations_equipmentId_fkey";

ALTER TABLE "equipments"
DROP CONSTRAINT uc_equipment_name;

ALTER TABLE "equipments"
RENAME TO "tools";

ALTER INDEX equipments_pkey RENAME TO "tools_pkey";

ALTER SEQUENCE equipments_id_seq RENAME TO tools_id_seq;

ALTER TABLE "categorizations"
RENAME "equipmentId" TO "toolId";

ALTER TABLE "tools"
ADD CONSTRAINT uc_tool_name UNIQUE("name");


ALTER TABLE "categorizations"
ADD CONSTRAINT "categorizations_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "tools" (id);
