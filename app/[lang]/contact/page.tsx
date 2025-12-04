import { getDictionary } from "@/app/[lang]/dictionaries";
import ClientContactPage from "@/app/[lang]/contact/ClientContactPage";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: "en" | "cs" | "de" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ClientContactPage params={{ dict, lang }} />;
}
