import React from "react";
import Image from "next/image";
import { Loader } from "@public";

export default function loading() {
  return (
    <section className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/80">
      <div className="w-52 h-52">
        <Image src={Loader} width={100} height={100} alt="Loading..." />
      </div>
    </section>
  );
}
