import React from 'react';

const SalesTable = ({ sales, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (sales.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No sales records found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Final Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sales.map((sale, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{new Date(sale.Date).toLocaleDateString()}</td>
              <td className="px-4 py-3 text-sm">
                <div>{sale['Customer Name']}</div>
                <div className="text-xs text-gray-500">{sale['Phone Number']}</div>
              </td>
              <td className="px-4 py-3 text-sm">
                <div>{sale['Product Name']}</div>
                <div className="text-xs text-gray-500">{sale.Brand}</div>
              </td>
              <td className="px-4 py-3 text-sm">{sale['Product Category']}</td>
              <td className="px-4 py-3 text-sm">{sale.Quantity}</td>
              <td className="px-4 py-3 text-sm font-medium">${sale['Final Amount'].toFixed(2)}</td>
              <td className="px-4 py-3 text-sm">{sale['Payment Method']}</td>
              <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  sale['Order Status'] === 'Delivered' ? 'bg-green-100 text-green-800' :
                  sale['Order Status'] === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {sale['Order Status']}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
