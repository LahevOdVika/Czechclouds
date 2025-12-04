import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";

const testimonials = [
  {
    name: "Tomáš Novák",
    role: "Freelance IT Consultant",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    content:
      "Perfektní služba pro každého, kdo chce mít svá data pod kontrolou. Migrace z mého starého řešení byla naprosto bezproblémová a výkon je nesrovnatelně lepší. Podpora reaguje okamžitě.",
  },
  {
    name: "Eva Dvořáková",
    role: "Marketing Manager, Creative Agency",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    content:
      "Nextcloud od této firmy nám změnil způsob, jakým spolupracujeme v týmu. Sdílení souborů a online úpravy dokumentů nám šetří hodiny času. Vřele doporučuji!",
  },
  {
    name: "Petr Svoboda",
    role: "Owner, Small E-commerce Business",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    content:
      "Hledal jsem bezpečné a spolehlivé úložiště pro firemní data a našel jsem ho zde. Oceňuji hlavně datovou suverenitu a fakt, že jsou servery v EU. Klidný spánek k nezaplacení.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-default-50/50" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Co říkají naši zákazníci
          </h2>
          <p className="text-default-500 mt-2 max-w-2xl mx-auto">
            Jsme hrdí na to, že můžeme našim klientům poskytovat špičkové
            služby.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 text-left">
              <CardBody>
                <p className="text-default-600 mb-6">
                  &#34;{testimonial.content}&#34;
                </p>
                <div className="flex items-center">
                  <Avatar src={testimonial.avatar} />
                  <div className="ml-4">
                    <p className="font-semibold text-default-800">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-default-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
