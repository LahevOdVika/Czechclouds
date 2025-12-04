"use client";

import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function CTA(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="relative py-12 px-8 rounded-2xl bg-green-500/10 overflow-hidden">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">{dict.cta.title}</h2>
            <p className="text-green-300/80 mt-2 max-w-2xl mx-auto">
              {dict.cta.subtitle}
            </p>
            <Button
              as={Link}
              className="mt-8"
              color="success"
              href="/order"
              size="lg"
              variant="shadow"
            >
              {dict.cta.button}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
