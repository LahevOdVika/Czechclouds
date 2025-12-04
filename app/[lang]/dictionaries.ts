"use server";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  cs: () => import("@/dictionaries/cs.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en" | "cs" | "de") => {
  if (!['en', 'cs', 'de'].includes(locale)) {
    return dictionaries.en();
  }

  const dictionaryLoader = dictionaries[locale];

  if (typeof dictionaryLoader !== "function") {
    throw new Error(`No dictionary loader for locale ${locale}`);
  }

  return dictionaryLoader()
}
