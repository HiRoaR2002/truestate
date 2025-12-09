const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let salesData = [];

const loadData = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, '../../data/sales_data.csv');

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Convert numeric fields
        data['Customer ID'] = parseInt(data['Customer ID']);
        data.Age = parseInt(data.Age);
        data['Product ID'] = parseInt(data['Product ID']);
        data.Quantity = parseInt(data.Quantity);
        data['Price per Unit'] = parseFloat(data['Price per Unit']);
        data['Discount Percentage'] = parseFloat(data['Discount Percentage']);
        data['Total Amount'] = parseFloat(data['Total Amount']);
        data['Final Amount'] = parseFloat(data['Final Amount']);
        data['Store ID'] = parseInt(data['Store ID']);
        data['Salesperson ID'] = parseInt(data['Salesperson ID']);
        data.TagsList = data.Tags ? data.Tags.split(',').map(t => t.trim()) : [];

        results.push(data);
      })
      .on('end', () => {
        salesData = results;
        console.log(`Loaded ${salesData.length} sales records`);
        resolve(salesData);
      })
      .on('error', reject);
  });
};

module.exports = {
  loadData,
  getSalesData: () => salesData
};
