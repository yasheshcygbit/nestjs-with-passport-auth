import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomResponseService {
  customResponse(code: number, message: string, data: any) {
    return { code, message, data }
  }
}