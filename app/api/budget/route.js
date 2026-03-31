import { getCurrentBudget, updateBudget } from "@/actions/budget";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return Response.json({ success: false, error: "Missing accountId" }, { status: 400 });
    }

    const result = await getCurrentBudget(accountId);
    return Response.json({ success: true, data: result });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount) {
      return Response.json({ success: false, error: "Budget amount is required" }, { status: 400 });
    }

    const result = await updateBudget(amount);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
