"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').load();
const better_console_1 = __importDefault(require("better-console"));
const xero_1 = __importDefault(require("./xero"));
const bottleneck_1 = __importDefault(require("bottleneck"));
const invoiceReferences = require('./invoiceReferences.json');
const limiter = new bottleneck_1.default({
    maxConcurrent: 1,
    minTime: 1100
});
const xero = xero_1.default('uk', process.env.NODE_ENV === 'production');
(() => __awaiter(this, void 0, void 0, function* () {
    try {
        for (let reference of invoiceReferences) {
            better_console_1.default.info(`Looking for reference ${reference}`);
            const InvoiceResult = yield limiter.schedule(() => xero.invoices.get({
                where: `Reference=="${reference}"`
            }));
            const Invoices = InvoiceResult.Invoices;
            const counts = CountInvoiceStatuses(Invoices);
            if (Invoices.length === 2 && counts.AUTHORISED === 1 && counts.PAID === 1) {
                const Invoice = Invoices.find(Invoice => Invoice.Status === 'AUTHORISED');
                if (Invoice) {
                    better_console_1.default.warn(`Voiding duplicate invoice ${Invoice.Reference} (${Invoice.InvoiceNumber})`);
                    try {
                        yield limiter.schedule(() => xero.invoices.update({
                            InvoiceID: Invoice.InvoiceID,
                            Status: 'VOIDED'
                        }));
                        better_console_1.default.log(`Invoice voided ✅`);
                    }
                    catch (err) {
                        better_console_1.default.error(`Could not delete Invoice ❌`);
                        better_console_1.default.error(err.message);
                    }
                }
            }
            else {
                better_console_1.default.log(`Not voiding invoices associated with ${reference}`);
            }
        }
    }
    catch (err) {
        better_console_1.default.error(err);
    }
}))();
function CountInvoiceStatuses(Invoices) {
    const counts = {};
    return Invoices.reduce((counts, Invoice) => {
        const status = Invoice.Status;
        if (status) {
            let count = counts[status] || 0;
            counts[status] = count + 1;
        }
        return counts;
    }, counts);
}
