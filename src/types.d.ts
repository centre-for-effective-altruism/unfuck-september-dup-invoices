declare module 'better-console' {
  function log(message?: any, ...optionalParams: any[]): void;
  function info(message?: any, ...optionalParams: any[]): void;
  function warn(message?: any, ...optionalParams: any[]): void;
  function error(message?: any, ...optionalParams: any[]): void;
  function debug(message?: any, ...optionalParams: any[]): void;
  function dir(obj: any, options?: NodeJS.InspectOptions): void;
  function clear (): void;
  function trace(message?: any, ...optionalParams: any[]): void;
  function assert(assertion: any): void;
  function count (toCount?: any): void;
  function time (...optionalParams: any[]): void;
  function timeEnd (...optionalParams: any[]): void;
  function table (...optionalParams: any[]): void;
}


declare type InvoiceStatus =
  "DRAFT" |
  "SUBMITTED" |
  "AUTHORISED" |
  "PAID" |
  "VOIDED" |
  "DELETED"
