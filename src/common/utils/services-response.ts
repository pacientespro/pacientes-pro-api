import { HttpStatus } from "@nestjs/common";

export class ServiceResponse {
    isSucceded = true;
    code: HttpStatus;
    message: string;
    content: any;

    constructor(statusCode: HttpStatus, message: string, content: any,) {
        this.isSucceded = (statusCode !== 200 && statusCode !== 201) ? false : true;
        this.code = statusCode;
        this.content = content;
        this.message = message;
    }
}
