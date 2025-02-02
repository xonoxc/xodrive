import {
  files as FilesSchema,
  folders as FolderSchema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "./drive-contents";

export default async function Drive() {
  const files = await db.select().from(FilesSchema);
  const folders = await db.select().from(FolderSchema);

  return <DriveContents files={files} folders={folders} />;
}
