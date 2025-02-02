// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
  serial,
  text,
  pgTableCreator,
  integer,
  index,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `drive_${name}`);

export const files = createTable(
  "files_tables",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    parent: integer("parent").notNull(),
  },
  (t) => ({
    indexes: [index("parent_index").on(t.parent)],
  }),
);

export const folders = createTable(
  "folders_table",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    parent: integer("parent"),
  },
  (t) => ({
    indexes: [index("parent_index").on(t.parent)],
  }),
);
