require('dotenv').load()
import console from 'better-console'
import Xero from './xero'
import {Invoice} from 'xero-node/lib/AccountingAPI-models'
import Bottleneck from 'bottleneck'
const invoiceReferences: Array<string> = require('./invoiceReferences.json')

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1100
})

const xero = Xero('uk', process.env.NODE_ENV === 'production')

;(async () => {
  try {
    for (let reference of invoiceReferences) {
      console.info(`Looking for reference ${reference}`)
      const InvoiceResult = await limiter.schedule(() => xero.invoices.get({
          where: `Reference=="${reference}"`
        })
      )
      const Invoices = InvoiceResult.Invoices
      const counts = CountInvoiceStatuses(Invoices)
      if (Invoices.length ===  2 && counts.AUTHORISED === 1 && counts.PAID === 1) {
        const Invoice = Invoices.find(Invoice => Invoice.Status === 'AUTHORISED')
        if (Invoice) {
          console.warn(`Voiding duplicate invoice ${Invoice.Reference} (${Invoice.InvoiceNumber})`)
          try {
            await limiter.schedule(() => xero.invoices.update({
              InvoiceID: Invoice.InvoiceID,
              Status: 'VOIDED'
            }))
            console.log(`Invoice voided ✅`)
          } catch (err) {
            console.error(`Could not delete Invoice ❌`)
            console.error(err.message)
          }
        }
      } else {
        console.log(`Not voiding invoices associated with ${reference}`)
      }
    }
  } catch (err) {
    console.error(err)
  }
})()

type InvoiceStatusCount = {[P in InvoiceStatus]?: number }
function CountInvoiceStatuses (Invoices: Array<Invoice>) : InvoiceStatusCount {
  const counts: InvoiceStatusCount = {}
  return Invoices.reduce((counts: InvoiceStatusCount, Invoice: Invoice) => {
    const status: InvoiceStatus = Invoice.Status! as InvoiceStatus
    if (status) {
      let count: number = counts[status] || 0
      counts[status] = count + 1
    }
    return counts
  }, counts)
}
