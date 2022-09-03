import { HttpException, HttpStatus } from "@nestjs/common";

export class Forbidden extends HttpException {
  constructor(message: string, data: any) {
    super({
      code: HttpStatus.FORBIDDEN,
      message,
      data
    }, HttpStatus.FORBIDDEN);
  }
}