require('dotenv').load()
import {AccountingAPIClient as XeroClient} from'xero-node'
import {XeroClientConfiguration} from 'xero-node/lib/internals/BaseAPIClient'

const {
  XERO_DEMO_CONSUMER_KEY,
  XERO_DEMO_CONSUMER_SECRET,
  XERO_DEMO_RSA_PRIVATE_KEY,
  XERO_CEA_US_CONSUMER_KEY,
  XERO_CEA_US_CONSUMER_SECRET,
  XERO_CEA_US_RSA_PRIVATE_KEY,
  XERO_CEA_UK_CONSUMER_KEY,
  XERO_CEA_UK_CONSUMER_SECRET,
  XERO_CEA_UK_RSA_PRIVATE_KEY,
} = process.env

// strings could be undefined!
if (
  !XERO_DEMO_CONSUMER_KEY ||
  !XERO_DEMO_CONSUMER_SECRET ||
  !XERO_DEMO_RSA_PRIVATE_KEY ||
  !XERO_CEA_US_CONSUMER_KEY ||
  !XERO_CEA_US_CONSUMER_SECRET ||
  !XERO_CEA_US_RSA_PRIVATE_KEY ||
  !XERO_CEA_UK_CONSUMER_KEY ||
  !XERO_CEA_UK_CONSUMER_SECRET ||
  !XERO_CEA_UK_RSA_PRIVATE_KEY
) throw new Error('Environment variables are not set')

const demoConfig: XeroClientConfiguration = {
  appType: 'private',
  consumerKey: XERO_DEMO_CONSUMER_KEY,
  consumerSecret: XERO_DEMO_CONSUMER_SECRET,
  privateKeyString: XERO_DEMO_RSA_PRIVATE_KEY
}

const usConfig: XeroClientConfiguration = {
  appType: 'private',
  consumerKey: XERO_CEA_US_CONSUMER_KEY,
  consumerSecret: XERO_CEA_US_CONSUMER_SECRET,
  privateKeyString: XERO_CEA_US_RSA_PRIVATE_KEY
}

const ukConfig: XeroClientConfiguration = {
  appType: 'private',
  consumerKey: XERO_CEA_UK_CONSUMER_KEY,
  consumerSecret: XERO_CEA_UK_CONSUMER_SECRET,
  privateKeyString: XERO_CEA_UK_RSA_PRIVATE_KEY
}


export default (org: string, liveMode: boolean = false) => {
  let config: XeroClientConfiguration = demoConfig
  // unless we explicitly allow live mode, use the demo org
  if (!liveMode) {
    switch (org) {
      case 'us':
        config = usConfig
        break
      case 'uk':
        config = ukConfig
        break
      default:
        throw new Error(`Unknown org ${org}`)
    }
  }
  return new XeroClient(config)
}
