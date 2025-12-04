import React from "react";

import { BoltIcon, ChipIcon, GlobeAltIcon } from "@/components/Icons";

const PerformanceFeature: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}> = ({ icon, title, children }) => (
  <div className="text-center">
    <div className="flex items-center justify-center h-16 w-16 backdrop-blur-sm rounded-full border border-default text-green-400 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-default-500">{children}</p>
  </div>
);

export default function Performance(dict: Record<string, any>) {
  dict = dict.dict;

  return (
    <section className="py-20" id="performance">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            {dict.performance.title}
          </h2>
          <p className="text-default-500 mt-2 max-w-2xl mx-auto">
            {dict.performance.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PerformanceFeature
            icon={<BoltIcon className="w-8 h-8" />}
            title={dict.performance.firstTitle}
          >
            {dict.performance.first}
          </PerformanceFeature>

          <PerformanceFeature
            icon={<ChipIcon className="w-8 h-8" />}
            title={dict.performance.secondTitle}
          >
            {dict.performance.second}
          </PerformanceFeature>

          <PerformanceFeature
            icon={<GlobeAltIcon className="w-8 h-8" />}
            title={dict.performance.thirdTitle}
          >
            {dict.performance.third}
          </PerformanceFeature>
        </div>
      </div>
    </section>
  );
}
