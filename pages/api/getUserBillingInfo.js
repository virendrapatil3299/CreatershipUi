// lib/api.ts (example)
export async function getUserBillingInfo() {
    return {
      plan: 'Free',
      nextBillingDate: 'July 20, 2025',
      status: 'Active',
      transactions: [
        {
          id: 'txn1',
          date: 'May 20, 2025',
          invoiceNo: 'INV-0001',
          amount: '$0.00',
          method: 'N/A',
          status: 'Paid',
        },
      ],
    };
  }
  