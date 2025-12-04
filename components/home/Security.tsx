import React from "react";
import { Card, CardBody } from "@heroui/react";

import {
  ShieldCheckIcon,
  LockClosedIcon,
  ServerIcon,
} from "@/components/Icons";

const SecurityFeature: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <Card className="p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <CardBody>
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500/20 text-green-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold  mb-2">{title}</h3>
      <p>{children}</p>
    </CardBody>
  </Card>
);

export default function Security(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20" id="security">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {dict.security.title}
          </h2>
          <p className="text-default-500 mt-2 max-w-2xl mx-auto">
            {dict.security.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SecurityFeature
            icon={<LockClosedIcon className="w-6 h-6" />}
            title={dict.security.firstTitle}
          >
            {dict.security.first}
          </SecurityFeature>

          <SecurityFeature
            icon={<ShieldCheckIcon className="w-6 h-6" />}
            title={dict.security.secondTitle}
          >
            {dict.security.second}
          </SecurityFeature>

          <SecurityFeature
            icon={<ServerIcon className="w-6 h-6" />}
            title={dict.security.thirdTitle}
          >
            {dict.security.third}
          </SecurityFeature>
        </div>
      </div>
    </section>
  );
}
