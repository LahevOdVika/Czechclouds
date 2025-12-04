import React from "react";
import Image from "next/image";

import { CloudIcon } from "@/components/Icons";

export default function AboutNextcloud(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 font-semibold px-3 py-1 rounded-full text-sm mb-4">
              <CloudIcon className="w-5 h-5" />
              {dict.about.pill}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              {dict.about.title}
            </h2>
            <p className="text-default-500 mt-4 text-lg">{dict.about.firstP}</p>
            <p className="text-default-500 mt-4">{dict.about.secondP}</p>
          </div>
          <div>
            <Image
              alt="Nextcloud interface screenshot"
              className="rounded-lg shadow-2xl mx-auto z-10"
              height={400}
              src={"/nextcloud.webp"}
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
