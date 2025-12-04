import { Suspense } from "react";

import { getDictionary } from "@/app/[lang]/dictionaries";
import OrderForm from "@/app/[lang]/order/OrderForm";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ lang: "en" | "cs" | "de" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderForm params={{ dict, lang }} />
    </Suspense>
  );
}
