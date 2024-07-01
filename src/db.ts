import { DataSource } from "typeorm";

const db = new DataSource({
  type: "sqlite",
  database: "checkpoint_backend.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});

export async function clearDB() {
  const entities = db.entityMetadatas;
  const tableNames = entities
    .map((entity) => `"${entity.tableName}"`)
    .join(", ");
  await db.query(`TRUNCATE ${tableNames} RESTART IDENTITY CASCADE;`);
}

export default db;
