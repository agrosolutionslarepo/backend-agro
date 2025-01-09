import { Request } from "express"
export interface CustRequest extends Request {
  user?: any // or any other type
}