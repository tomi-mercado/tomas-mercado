import Image from "next/image";

import { Lato } from "@next/font/google";

const lato = Lato({
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <div
      className={`grid grid-cols-2 h-screen bg-[#e0d6cc] text-stone-800 ${lato.className}`}
    >
      <div>
        <div className="py-4 px-6 flex items-center justify-between w-full">
          <div className="flex space-x-2 w-fit items-center">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
            <p className="text-lg">Tomás Mercado</p>
          </div>

          <div className="flex space-x-3">
            <p className="text-lg">Home</p>
            <p className="text-lg">Projects</p>
            <p className="text-lg">About</p>
            <p className="text-lg">Contact</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col space-y-4 text-center">
            <h1 className="text-7xl font-bold">Tomás Mercado</h1>
            <div className="flex flex-col text-center justify-center items-center space-y-6">
              <h2 className="text-3xl">Web Developer</h2>
              <h4 className="text-lg text-gray-500 italic">
                Success is a journey, not a destination
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Image
          src="/hero-side-image.png"
          alt="Illustration a man"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
