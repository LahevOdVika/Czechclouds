"use server";

import { Order } from "@/lib/Order";
import { Database } from "@/lib/db";

/**
 * Submit an order to the database
 * @param data Order data
 * @returns 1 if successful, 0 if failed
 */
export async function submitOrder(data: Record<string, any>): Promise<number> {
  const order: Order = {
    fullname: data.fullname,
    email: data.email,
    plan: data.plan,
    yearly: data.yearly,
    additionalsize: data.storage,
    domainoption: data.domainOption,
    domainname: data.domainName,
    users: data.users,
    price: data.total,
  };

  try {
    const db: Database = Database.getInstance();

    await db.addOrder(order);

    return 1;
  } catch (_) {
    return 0;
  }
}
