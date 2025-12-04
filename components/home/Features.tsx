import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

import {
  CloudIcon,
  ShieldCheckIcon,
  BoltIcon,
  ServerIcon,
} from "@/components/Icons";

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <Card className="p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <CardHeader>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-green-500/20 text-green-400">
          {icon}
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </CardHeader>
    <CardBody>
      <p className="text-default-600 text-sm">{children}</p>
    </CardBody>
  </Card>
);

export default function Features(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {dict.features.title}
          </h2>
          <p className="text-default-500 mt-2 max-w-2xl mx-auto">
            {dict.features.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureItem
            icon={<CloudIcon className="w-6 h-6" />}
            title={dict.features.firstTitle}
          >
            {dict.features.first}
          </FeatureItem>

          <FeatureItem
            icon={<BoltIcon className="w-6 h-6" />}
            title={dict.features.secondTitle}
          >
            {dict.features.second}
          </FeatureItem>

          <FeatureItem
            icon={<ServerIcon className="w-6 h-6" />}
            title={dict.features.thirdTitle}
          >
            {dict.features.third}
          </FeatureItem>

          <FeatureItem
            icon={<ShieldCheckIcon className="w-6 h-6" />}
            title={dict.features.fourthTitle}
          >
            {dict.features.fourth}
          </FeatureItem>
        </div>
        <p className={"mt-4 text-3xl text-center text-default-500"}>
          {dict.features.more}
        </p>
      </div>
    </section>
  );
}
