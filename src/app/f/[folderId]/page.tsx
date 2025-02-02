import {
  files as FilesSchema,
  folders as FolderSchema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";

export default async function Drive(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const paresedFolderId = parseInt(params.folderId);
  if (isNaN(paresedFolderId)) {
    return <div> Invalid folderId </div>;
  }

  const files = await db
    .select()
    .from(FilesSchema)
    .where(eq(FilesSchema.parent, paresedFolderId));
  const folders = await db
    .select()
    .from(FolderSchema)
    .where(eq(FolderSchema.parent, paresedFolderId));

  return <DriveContents files={files} folders={folders} />;
}
