import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import { groceryTable } from "./schema";

export const listgroceryTable = async () => {
  const rows = await db.select().from(groceryTable).orderBy(desc(groceryTable.updatedAt));

  return rows;
};

export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const rows = await db
    .insert(groceryTable)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
      updatedAt: Date.now(),
    })
    .returning();

  return rows[0];
};

export const setGroceryItemPurchased = async (id: string, purchased: boolean) => {
  const rows = await db
    .update(groceryTable)
    .set({ purchased, updatedAt: Date.now() })
    .where(eq(groceryTable.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

export const updateGroceryItemQuantity = async (id: string, quantity: number) => {
  const rows = await db
    .update(groceryTable)
    .set({ quantity: Math.max(1, Math.floor(quantity)), updatedAt: Date.now() })
    .where(eq(groceryTable.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

export const deleteGroceryItem = async (id: string) => {
  await db.delete(groceryTable).where(eq(groceryTable.id, id));
};

export const clearPurchasedItems = async () => {
  await db.delete(groceryTable).where(eq(groceryTable.purchased, true));
};