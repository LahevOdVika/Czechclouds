"use server";

import { Database } from "@/lib/db";
import { Question } from "@/lib/Question";

/**
 * Submit a contact form to the database
 * @param formData - Data submitted from the client component.
 */
export async function submitContactFormAction(formData: FormData) {
  const data = Object.fromEntries(formData) as Record<string, string>;

  const question: Question = {
    fullname: data.name,
    email: data.email,
    order: data.order,
    isclient: data.isClient === "1",
    reason: data.reason as Question["reason"],
    message: data.message,
  };

  try {
    const db = Database.getInstance();

    await db.addQuestion(question);

    return { success: true, message: "Dotaz byl úspěšně odeslán." };
  } catch (error: any) {
    return {
      success: false,
      message: "Došlo k chybě při zpracování databáze." + error.message,
    };
  }
}
