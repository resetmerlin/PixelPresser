import { UploadFiles } from "@/components/uploadFiles/UploadFiles";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-10 text-white bg-black">
      <div className="relative flex">
        <Image
          src="/pixelPresser.jpg"
          height={180}
          width={180}
          alt="pixel presser"
        ></Image>
      </div>

      <UploadFiles />
    </main>
  );
}
