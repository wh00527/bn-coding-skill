const util = require('util');
const fs = require('fs');
const neatCsv = require('neat-csv');

const readFile = util.promisify(fs.readFile);

module.exports = {
  FILE_TYPE: {
    BARCODES: 'barcodes',
    CATALOG: 'catalog',
    SUPPLIERS: 'suppliers',
  },

  getCompanyFilePath(companyName, fileType) {
    return `${__dirname}/../../input/${fileType}${companyName}.csv`;
  },

  getMergedCatalogFilePath(dateTime) {
    return `${__dirname}/../../output/catalog_merged_${dateTime.toISOString()}.csv`;
  },

  async readCsv(csvPath) {
    const fileContent = await readFile(csvPath, 'utf8');
    return await neatCsv(fileContent);
  },
};
