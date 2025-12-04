"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

export default function FAQ(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Frequently asked questions
          </h2>
          <p className="text-default-500 mt-2 max-w-2xl mx-auto">
            We have found answers to the most frequently asked questions for
            you.
          </p>
        </div>
        <Accordion variant="splitted">
          {dict.faq.map((faq: Record<string, string>, index: number) => (
            <AccordionItem key={index} aria-label={faq.title} title={faq.title}>
              {faq.content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
