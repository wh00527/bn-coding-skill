const util = require('../src/util/file'),
      catalogRepository = require('../src/repository/catalog-repository'),
      barcodeRepository = require('../src/repository/barcode-repository'),
      chai  = require("chai"),
      expect = chai.expect;



describe('util', () => {
    describe('FILE_TYPE', () => {
        it('FILE_TYPE - should return 3 types', () => {
            expect(util.FILE_TYPE.BARCODES).to.equal('barcodes');
            expect(util.FILE_TYPE.CATALOG).to.equal('catalog');
            expect(util.FILE_TYPE.SUPPLIERS).to.equal('suppliers');
        });
    });

    describe('getMergedCatalogFilePath', () => {
        it('getMergedCatalogFilePath - should generate a proper csv path', () => {
            let fileName = util.getMergedCatalogFilePath(new Date());
            expect(fileName).that.contains("csv");
        });
    });

    describe('read csv function', () => {
        it('readCsv(csvPath) - should return proper csv content', () => {
            util.readCsv('../../input/catalogA.csv').then((data)=>{
                expect(data).that.contains("SKU");
            });
        });
    });
});    

describe('catalogRepo', () => {
    describe('getByCompany', () => {
        it('getByCompany - should return a proper catalog name', () => {
            catalogRepository.getByCompany('A').then((data)=>{
                expect(data).that.contains('Twitterbridge');
            })
        });
    });
});    