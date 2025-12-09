const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  try {
    const {
      search,
      customerRegion,
      gender,
      minAge,
      maxAge,
      productCategory,
      tags,
      paymentMethod,
      startDate,
      endDate,
      sortBy,
      sortOrder,
      page,
      limit
    } = req.query;

    const filters = {
      search,
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      minAge: minAge ? parseInt(minAge) : undefined,
      maxAge: maxAge ? parseInt(maxAge) : undefined,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      startDate,
      endDate
    };

    const result = await salesService.getSales(
      filters,
      sortBy || 'date',
      sortOrder || 'desc',
      parseInt(page) || 1,
      parseInt(limit) || 10
    );

    res.json(result);
  } catch (error) {
    console.error('Error in getSales:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFilterOptions = async (req, res) => {
  try {
    const options = await salesService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getSales,
  getFilterOptions
};
