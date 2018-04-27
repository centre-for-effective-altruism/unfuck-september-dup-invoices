"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').load();
const xero_node_1 = require("xero-node");
const { XERO_DEMO_CONSUMER_KEY, XERO_DEMO_CONSUMER_SECRET, XERO_DEMO_RSA_PRIVATE_KEY, XERO_CEA_US_CONSUMER_KEY, XERO_CEA_US_CONSUMER_SECRET, XERO_CEA_US_RSA_PRIVATE_KEY, XERO_CEA_UK_CONSUMER_KEY, XERO_CEA_UK_CONSUMER_SECRET, XERO_CEA_UK_RSA_PRIVATE_KEY, } = process.env;
// strings could be undefined!
if (!XERO_DEMO_CONSUMER_KEY ||
    !XERO_DEMO_CONSUMER_SECRET ||
    !XERO_DEMO_RSA_PRIVATE_KEY ||
    !XERO_CEA_US_CONSUMER_KEY ||
    !XERO_CEA_US_CONSUMER_SECRET ||
    !XERO_CEA_US_RSA_PRIVATE_KEY ||
    !XERO_CEA_UK_CONSUMER_KEY ||
    !XERO_CEA_UK_CONSUMER_SECRET ||
    !XERO_CEA_UK_RSA_PRIVATE_KEY)
    throw new Error('Environment variables are not set');
const demoConfig = {
    appType: 'private',
    consumerKey: XERO_DEMO_CONSUMER_KEY,
    consumerSecret: XERO_DEMO_CONSUMER_SECRET,
    privateKeyString: XERO_DEMO_RSA_PRIVATE_KEY
};
const usConfig = {
    appType: 'private',
    consumerKey: XERO_CEA_US_CONSUMER_KEY,
    consumerSecret: XERO_CEA_US_CONSUMER_SECRET,
    privateKeyString: XERO_CEA_US_RSA_PRIVATE_KEY
};
const ukConfig = {
    appType: 'private',
    consumerKey: XERO_CEA_UK_CONSUMER_KEY,
    consumerSecret: XERO_CEA_UK_CONSUMER_SECRET,
    privateKeyString: XERO_CEA_UK_RSA_PRIVATE_KEY
};
exports.default = (org, liveMode = false) => {
    let config = demoConfig;
    // unless we explicitly allow live mode, use the demo org
    if (!liveMode) {
        switch (org) {
            case 'us':
                config = usConfig;
                break;
            case 'uk':
                config = ukConfig;
                break;
            default:
                throw new Error(`Unknown org ${org}`);
        }
    }
    return new xero_node_1.AccountingAPIClient(config);
};
