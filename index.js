const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const de4 = {
  "datA_CAT_CD": "GCMS",
  "datA_SRC_CD": "First Presentment 1240-200",
  "datA_SRC_FLD_NAM": "",
  "dE_PDS_NUM": "DE 4",
  "sbeleM_SBFLD_NUM": "",
  "busN_DESC": "Amount, Transaction",
  "datA_DESC": "DE 4 (Amount, Transaction) is the amount of funds the cardholder requested in the currency appearing on the transaction information document (TID), which may be the acquirer's local currency or a currency acceptable to the cardholder and card acceptor that the acquirer supports, exclusive of PDS 0146 (Amounts, Transaction Fee). If no currency is identified on the TID, the transaction is deemed to have taken place in the currency that is legal tender at the point of interaction.",
  "srC_DATA_TYPE_TXT": "n-12",
  "hieR_TBL_DESC": "",
  "hieR_LVL_DESC": "",
  "tecH_RULE_DESC": "",
  "crtE_TXT": "",
  "coL_LVL_NAM": "TXN_AMT_TXN_CUR",
  "tbL_LVL_NAM": "CLEARD01_DETAIL"
};
const de48 = {
  "datA_CAT_CD": "Auth",
  "datA_SRC_CD": "0100/0110;0120/0130;04xx",
  "datA_SRC_FLD_NAM": "",
  "dE_PDS_NUM": "DE 48",
  "sbeleM_SBFLD_NUM": "SE 42",
  "busN_DESC": "Electronic Commerce Security Level Indicator and UCAF Collection Indicator",
  "datA_DESC": "DE 48, SE 42 SF 1 (Electronic Commerce Security Level Indicator and UCAF Collection Indicator) indicates the electronic commerce security level and UCAF collection in positions 1, 2, and 3.",
  "srC_DATA_TYPE_TXT": "",
  "hieR_TBL_DESC": "",
  "hieR_LVL_DESC": "",
  "tecH_RULE_DESC": "This field contains the Tag (2 bytes), Length (2 bytes) and Value (3 bytes) with a total length of 7 bytes:\nTag = '01'; Length='03'; Value = 'xxx'.  The value contains the position 1, 2 and 3 as described in the CIS manual",
  "crtE_TXT": "",
  "coL_LVL_NAM": "ECOM_SEC_LVLS_DE048S42",
  "tbL_LVL_NAM": "AUTHOP01_DETAIL"
};
const se79 = {
  "datA_CAT_CD": "Auth",
  "datA_SRC_CD": "0100/0110;0120/0130;04xx",
  "datA_SRC_FLD_NAM": "",
  "dE_PDS_NUM": "DE 48",
  "sbeleM_SBFLD_NUM": "SE 79",
  "busN_DESC": "SE 79 (Chip CVR/TVR Bit Error Results) provides the Terminal\nVerification Results (TVR) and Card Verification Results (CVR) bitmask, and\nexpected values registered by the issuer. This serves as notification of bit\nvalidation errors detected in the CVR/TVR within the Issuer Application data\nduring M/Chip Cryptogram Validation processing.",
  "datA_DESC": "SF 2 Identifies the byte number of the associated bit reported in error; Values 01 - 99.",
  "srC_DATA_TYPE_TXT": "",
  "hieR_TBL_DESC": "",
  "hieR_LVL_DESC": "",
  "tecH_RULE_DESC": "",
  "crtE_TXT": "",
  "coL_LVL_NAM": "CVR_TVR_BYTE_ID1_DE048S79SF 2",
  "tbL_LVL_NAM": "AUTH_CHIP_DAILY"
};
const db = {
  "Auth": {
    "DE 48": [de48, se79],
    "DE 49": [de4],
    "DE 50": [de4]
  },
  "GCMS": {
    "DE 4": [de4],
    "First Presentment 1240-200": [de4]
  },
  "AMS": { "DE 48": [de48, se79] },
  "Auth": { "DE 48": [de48, se79] },
  "Auth:CEM": { "DE 48": [de48, se79] },
  "CUT-C": { "DE 48": [de48, se79] },
  "EMS": { "DE 48": [de48, se79] },
  "Fraud": { "DE 48": [de48, se79] },
  "GCMS": { "DE 48": [de48, se79] },
  "INCTRL": { "DE 48": [de48, se79] },
  "MASTERPASS": { "DE 48": [de48, se79] },
  "MCBS": { "DE 48": [de48, se79] },
  "MDES": { "DE 48": [de48, se79] }
};
/*
{
  "dataCategory": "Auth",
  "dataElement": "DE 48",
  "dataSubElement": "SE 42"
}
OR
{
  "dataCategory": "GCMS",
  "dataSource": "First Presentment 1240-200",
  "dataBusiness": "transaction,amount"
}
*/
express()
  .use(bodyParser.json())
  .get('/', (req, res) => res.render('pages/index'))
  // get account by id
  .post('/GetDataItem', (req, res) => {
    let {
      dataCategory, dataElement, dataSubElement, dataSource, dataBusiness
    } = req.body;
    dataCategory = dataCategory || 'Auth';
    if (dataElement) {
      const el = db[dataCategory][dataElement];
      if (!el) {
        return res.status(404).json({
          message: 'Not found'
        });
      }
      return res.json(el);
    } else if (dataSource) {
      const el = db[dataCategory][dataSource];
      if (!el) {
        return res.status(404).json({
          message: 'Not found'
        });
      }
      return res.json(el);
    }
    return res.status(400).json({
      error: 'Missing dataElement or dataSource'
    });
  })
  .post('/GetDataItemResults', (req, res) => {
    let {
      dataCategory, dataElement, dataSubElement, dataSource, dataBusiness
    } = req.body;
    dataCategory = dataCategory || 'Auth';
    if (dataElement) {
      const el = db[dataCategory][dataElement];
      if (!el) {
        return res.status(404).json({
          message: 'Not found'
        });
      }
      return res.json({ results : el });
    } else if (dataSource) {
      const el = db[dataCategory][dataSource];
      if (!el) {
        return res.status(404).json({
          message: 'Not found'
        });
      }
      return res.json({ results : el });
    }
    return res.status(400).json({
      error: 'Missing dataElement or dataSource'
    });
  })
  .post('/GetColumnInfo', (req, res) => {
    return res.json([
      "AMS", "Auth", "Auth:CEM", "CUT-C", "EMS", "Fraud", "GCMS", "INCTRL", "MASTERPASS", "MCBS", "MDES", "MDS", "MDS:CEM", "MERCHANT", "ROSS", "RPPS", "TOKEN_TYPE"
    ]);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
