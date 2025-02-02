"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

import type { FileDB, FolderDB } from "~/server/db/schema";
import { FileRow, FolderRow } from "./file-row";
import { ChevronRight, Upload } from "lucide-react";

export default function DriveContents(props: {
  files: FileDB[];
  folders: FolderDB[];
}) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  const handleFolderClick = (folderId: number) => setCurrentFolder(folderId);

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== 1) {
      const folder = props.folders.find(
        (folder: FolderDB) => folder.id === currentId,
      );
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? 1;
      } else {
        break;
      }
    }

    return breadcrumbs;
  };

  const handleUpload = () => {
    alert("Upload functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={() => setCurrentFolder(1)}
              variant="ghost"
              className="mr-2 text-gray-300 hover:text-black"
            >
              My Drive
            </Button>
            {getBreadcrumbs().map((folder) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Button
                  onClick={() => handleFolderClick(folder.id)}
                  variant="ghost"
                  className="text-gray-300 hover:text-black"
                >
                  {folder.name}
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={handleUpload}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Upload className="mr-2" size={20} />
            Upload
          </Button>
        </div>
        <div className="rounded-lg bg-gray-800 shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-3">Size</div>
            </div>
          </div>
          <ul>
            {props.folders.map((folder) => (
              <FolderRow
                key={folder.id}
                folder={folder}
                onFolderClick={() => handleFolderClick(folder.id)}
              />
            ))}

            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
