// Replace this with your actual DB fetch logic

import { useEffect, useState } from 'react';

import { getUserBillingInfo } from '../../../pages/api/getUserBillingInfo'; // e.g., Firebase or Supabase/Drizzle


 export default function Billing() {
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBilling() {
      try {
        const data = await getUserBillingInfo(); // Fetch from DB
        setBilling(data);
      } catch (err) {
        console.error('Failed to load billing info:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBilling();
  }, []);

  if (loading) return <p>Loading billing info...</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-700">
      {/* Plan Info */}
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <p className="text-lg font-semibold">Current Plan: {billing?.plan || 'Free'}</p>
          <p className="text-sm text-gray-500">
            Next billing date: {billing?.nextBillingDate || 'N/A'}
            {billing?.status && (
              <span className="ml-3 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                {billing.status}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => alert('Redirecting to Stripe...')}
          className="bg-gradient-to-r from-orange-400 to-rose-400 text-white font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Manage Subscription
        </button>
      </div>

      {/* Transactions */}
      <div className="mt-8">
        <h3 className="text-md font-bold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-500 text-left border-b">
              <tr>
                <th className="py-2 px-2">Date</th>
                <th className="py-2 px-2">Invoice No.</th>
                <th className="py-2 px-2">Amount</th>
                <th className="py-2 px-2">Payment Method</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billing?.transactions?.length > 0 ? (
                billing.transactions.map((tx) => (
                  <tr key={tx.id} className="border-b last:border-0">
                    <td className="py-3 px-2">{tx.date}</td>
                    <td className="py-3 px-2">{tx.invoiceNo}</td>
                    <td className="py-3 px-2">{tx.amount}</td>
                    <td className="py-3 px-2">{tx.method}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          tx.status === 'Paid'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-yellow-50 text-yellow-600'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="text-orange-500 text-sm hover:underline">
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-6">
                    No recent transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}