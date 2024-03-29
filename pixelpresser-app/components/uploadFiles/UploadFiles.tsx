"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";

type FileWithPreview = File & { preview: string };

export const UploadFiles = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    onDrop: (acceptedFiles) => {
      const newFilesWithPreview = acceptedFiles.map((file) => ({
        ...file,
        preview: URL.createObjectURL(file),
      })) as FileWithPreview[];

      setFiles([...files, ...newFilesWithPreview]);
    },
  });

  const thumbs = files.map((file: FileWithPreview) => {
    const key = `${file.name}-${file.lastModified}`;

    return (
      <div
        className="rounded-lg w-[10rem] h-[10rem] border-sky-600 text-black border-2 p-1 relative m-1"
        key={key}
      >
        <div className="w-full h-full absolute top-0 left-0  z-10 bg-black/[.3] text-white font-semibold text-sm">
          <p className="overflow-hidden flex flex-nowrap h-[1.2rem]">
            {file.name}
          </p>
        </div>
        <Image
          src={file.preview}
          alt="image__file"
          width={200}
          height={200}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          className="absolute z-0 top-0 left-0"
        />
      </div>
    );
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex-col flex items-center justify-center w-[65rem] bg-white rounded h-[26rem] relative top-2/4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
        {isDragReject && (
          <Alert className="w-[32rem] fixed top-5">
            <Terminal className="h-4 w-4" />
            <AlertTitle> Wrong file format</AlertTitle>
            <AlertDescription>Allowed gif, jpeg, jpg, png</AlertDescription>
          </Alert>
        )}
        <div>
          <Button className="m-3 bg-sky-500">
            <label htmlFor="uploadFile">Upload Files</label>
          </Button>
          <Button className="m-3" variant={"destructive"}>
            Clear All Files
          </Button>
        </div>
        <input
          type="file"
          name="uploadFile"
          id="uploadFile"
          className="hidden"
          {...getInputProps()}
        />
        <div
          {...getRootProps({ className: "dropzone" })}
          className="flex items-center justify-center border-dashed	border-2 border-black w-4/5	rounded h-3/4 text-slate-400 overflow-x-auto"
        >
          {thumbs ? <>{thumbs}</> : <span> Drop Your Files Here</span>}
        </div>

        <Button className="m-3" variant={"default"}>
          Download All
        </Button>
      </div>
    </>
  );
};
