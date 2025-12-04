import { getDictionary } from "@/app/[lang]/dictionaries";
import ClientHomePage from "@/app/[lang]/(home)/ClientHomePage";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: "en" | "cs" | "de" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <ClientHomePage params={{ dict, lang }} />;
}
