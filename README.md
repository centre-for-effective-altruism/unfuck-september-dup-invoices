Utility written to delete some duplicate transactions.

Probably a pretty good base to do any kind of one-off scripting for Xero. 

Written in TypeScript

## Installation

Clone the repo and run `yarn install`

Requires a `.env` file with the following keys:

```
NODE_ENV=development
XERO_DEMO_CONSUMER_KEY=<secret stuff>
XERO_DEMO_CONSUMER_SECRET=<secret stuff>
XERO_DEMO_RSA_PRIVATE_KEY=<secret stuff>
XERO_CEA_US_CONSUMER_KEY=<secret stuff>
XERO_CEA_US_CONSUMER_SECRET=<secret stuff>
XERO_CEA_US_RSA_PRIVATE_KEY=<secret stuff>
XERO_CEA_UK_CONSUMER_KEY=<secret stuff>
XERO_CEA_UK_CONSUMER_SECRET=<secret stuff>
XERO_CEA_UK_RSA_PRIVATE_KEY=<secret stuff>
```

## Development

Compile with `yarn run build`

Live-compile the Typescript by running `yarn run build:live` in its own shell. Changes to `.tsc` or `.json` files will re-run the compliation.

Run the compiled script with `yarn start`
