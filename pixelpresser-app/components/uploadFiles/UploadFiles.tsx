"use client";

import React from "react";
import { Button } from "../ui/button";
import { useDropzone } from "react-dropzone";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import Image from "next/image";

export const UploadFiles = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".png", ".jpg", ".gif"],
      },
    });

  const files = acceptedFiles.map((file: File) => {
    console.log("originalFile instanceof Blob", file instanceof Blob); // true
    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

    return (
      <li key={file.path}>
        <Image
          src={`/${file.path}`}
          alt="image__file"
          width={300}
          height={300}
        />
        {file.size} bytes
      </li>
    );
  });

  console.log(isDragReject);

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="flex-col flex items-center justify-center w-[65rem] bg-white rounded h-[26rem] relative top-2/4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
      >
        <input
          type="file"
          name="uploadFile"
          id="uploadFile"
          className="hidden"
          {...getInputProps()}
        />
        {isDragReject && (
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        )}
        <div>
          <Button className="m-3 bg-sky-500">Upload Files</Button>
          <Button className="m-3" variant={"destructive"}>
            Clear All Files
          </Button>
        </div>

        <div className="flex items-center justify-center border-dashed	border-2 border-black w-4/5		 rounded h-3/4 text-slate-400 ">
          {files ? <p>{files}</p> : <span> Drop Your Files Here</span>}

          <div className="rounded-lg w-[10rem] h-[10rem] border-sky-600 text-black border-2">
            test
          </div>
        </div>

        <Button className="m-3" variant={"default"}>
          Download All
        </Button>
      </div>
    </>
  );
};
