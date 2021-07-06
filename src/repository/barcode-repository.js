const { FILE_TYPE, readCsv, getCompanyFilePath } = require('../util/file');

module.exports = {
  async getByCompany(companyName) {
    return await readCsv(getCompanyFilePath(companyName, FILE_TYPE.BARCODES));
  },
};