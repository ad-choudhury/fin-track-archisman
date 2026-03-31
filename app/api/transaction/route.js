import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
  getTransaction,
} from "@/actions/transaction";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // If `id` provided, fetch specific transaction
    if (id) {
      const result = await getTransaction(id);
      return Response.json({ success: true, data: result });
    }

    // Else, get all transactions for user
    const query = Object.fromEntries(searchParams);
    const result = await getUserTransactions(query);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createTransaction(body);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return Response.json({ success: false, error: "Transaction ID is required" }, { status: 400 });
    }

    const result = await updateTransaction(id, data);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
