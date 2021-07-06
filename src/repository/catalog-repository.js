const createCsvWriter = require('csv-writer').createObjectCsvWriter
const { FILE_TYPE, readCsv, getCompanyFilePath, getMergedCatalogFilePath } = require('../util/file');

module.exports = {
  async getByCompany(companyName) {
    return await readCsv(getCompanyFilePath(companyName, FILE_TYPE.CATALOG));
  },

  async writeMergedCatalog(catalogs) {
    const csvWriter = createCsvWriter({
      path: getMergedCatalogFilePath(new Date()),
      header: [
        { id: 'SKU', title: 'SKU' },
        { id: 'Description', title: 'Description' },
        { id: 'Source', title: 'Source' },
      ],
    });
    await csvWriter.writeRecords(catalogs);
  },
};