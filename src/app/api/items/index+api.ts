import { createGroceryItem, listgroceryTable } from "@/lib/server/db/db-actions";

export async function GET(){
    try {
        const items = await listgroceryTable();
        return new Response(JSON.stringify(items), { status: 200 })
    } catch {
        return new Response("Failed to fetch items", { status: 500 })
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, quantity, priority } = body;

    if (!name || !category || !priority) {
      return Response.json({ error: "Please provide all required fields." }, { status: 400 });
    }

    const item = await createGroceryItem({ name, category, quantity, priority });

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create item";
    return Response.json({ error: message }, { status: 500 });
  }
}