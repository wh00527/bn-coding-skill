const _ = require('lodash');
const catalogRepository = require('../repository/catalog-repository');
const barcodeRepository = require('../repository/barcode-repository');

const getCatalogProductsBySkusWithSource = (skus, catalog, source) => {
  const skuCatalogMap = _.keyBy(catalog, 'SKU');
  return _.chain(skus)
    .filter(sku => !!skuCatalogMap[sku])
    .map(sku => ({ ...skuCatalogMap[sku], 'Source': source }))
    .value();
};

module.exports = {
  async mergeCatalog(companyNameA, companyNameB) {
    const aBarcodes = await barcodeRepository.getByCompany(companyNameA);
    const bBarcodes = await barcodeRepository.getByCompany(companyNameB);
    const aCatalogs = await catalogRepository.getByCompany(companyNameA);
    const bCatalogs = await catalogRepository.getByCompany(companyNameB);

    const commonBarcodes = _.intersectionBy(aBarcodes, bBarcodes, 'Barcode');
    const commonSkus = _.chain(commonBarcodes).map(barcode => barcode.SKU).uniq().value();
    const aOnlySkus = _.chain(aBarcodes)
      .differenceBy(commonBarcodes, 'Barcode')
      .map(barcode => barcode.SKU)
      .uniq()
      .value();
    const bOnlySkus = _.chain(bBarcodes)
      .differenceBy(commonBarcodes, 'Barcode')
      .map(barcode => barcode.SKU)
      .uniq()
      .value();

    const aCatalogProducts = getCatalogProductsBySkusWithSource(
      _.union(aOnlySkus, commonSkus), aCatalogs, companyNameA
    );
    const bCatalogProducts = getCatalogProductsBySkusWithSource(
      bOnlySkus, bCatalogs, companyNameB
    );

    await catalogRepository.writeMergedCatalog(
      _.concat(aCatalogProducts, bCatalogProducts)
    );
  },
};