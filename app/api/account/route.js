import { getAccountWithTransactions, bulkDeleteTransactions, updateDefaultAccount } from "@/actions/account";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return Response.json({ success: false, error: "Missing accountId" }, { status: 400 });
  }

  try {
    const result = await getAccountWithTransactions(accountId);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { transactionIds } = body;

    if (!transactionIds || transactionIds.length === 0) {
      return Response.json({ success: false, error: "No transaction IDs provided" }, { status: 400 });
    }

    const result = await bulkDeleteTransactions(transactionIds);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { accountId } = body;

    if (!accountId) {
      return Response.json({ success: false, error: "Account ID is required" }, { status: 400 });
    }

    const result = await updateDefaultAccount(accountId);
    return Response.json(result);
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
