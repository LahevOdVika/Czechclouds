"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Switch,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

import NetworkBackground from "@/components/NetworkBackground";
import Security from "@/components/home/Security";
import AboutNextcloud from "@/components/home/AboutNextcloud";
import Performance from "@/components/home/Performance";
import Features from "@/components/home/Features";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function ClientHomePage(params: {
  params: { dict: Record<string, any>; lang: string };
}) {
  const [isYearly, setIsYearly] = useState(false);

  const dict = params.params.dict;
  const lang = params.params.lang;

  return (
    <>
      <NetworkBackground />
      {/* Hero Section */}
      <div className="relative text-center py-32 md:py-48 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            {dict.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-default-500">
            {dict.hero.subtitle}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              as={Link}
              color="success"
              href={`/${lang}/order`}
              size="lg"
              variant="shadow"
            >
              {dict.hero.plans}
            </Button>
            <Button
              as={Link}
              href={`/${lang}/order`}
              size="lg"
              variant="bordered"
            >
              {dict.hero.sales}
            </Button>
          </div>
        </div>
      </div>

      {/* Plan Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{dict.plan.title}</h2>
            <p className="text-default-500 mt-2">{dict.plan.subtitle}</p>
            <div className="flex justify-center items-center gap-4 mt-6">
              <span>{dict.plan.monthly}</span>
              <Switch
                color="success"
                isSelected={isYearly}
                onValueChange={setIsYearly}
              />
              <span>
                {dict.plan.yearly}{" "}
                <span className="text-success">{dict.plan.save}</span>
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {dict.plans.map((plan: Record<string, any>) => (
              <Card
                key={plan.id}
                className={`p-4 ${
                  plan.isPopular ? "border-2 border-success" : ""
                }`}
              >
                <CardHeader className="flex flex-col items-start">
                  <p
                    className={`text-tiny uppercase font-bold ${
                      plan.isPopular ? "text-success" : ""
                    }`}
                  >
                    {plan.title}
                  </p>
                  <h4 className="font-bold text-large">{plan.name}</h4>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-4xl font-bold">
                    €{isYearly ? plan.priceYearly : plan.priceMonthly}
                    <span className="text-default-500 text-sm">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature: string) => (
                      <li key={feature}>✅ {feature}</li>
                    ))}
                    {plan.nonFeatures.map((feature: string) => (
                      <li key={feature}>❌ {feature}</li>
                    ))}
                  </ul>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Button
                    fullWidth
                    as={Link}
                    color="success"
                    href={`/order?plan=${plan.id}${
                      isYearly ? "&yearly=true" : ""
                    }`}
                    variant="shadow"
                  >
                    Order Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
            <div>
              <p className={"text-default-500 text-large"}>
                {dict.plan.moreTitle}
              </p>
              <a
                className={"text-2xl font-bold text-success underline"}
                href={`/${lang}/contact`}
              >
                {dict.plan.moreText}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Security dict={dict} />
      <AboutNextcloud dict={dict} />
      <Performance dict={dict} />
      <Features dict={dict} />
      {/*<Testimonials />*/}
      <FAQ dict={dict} />
      <CTA dict={dict} />
    </>
  );
}
