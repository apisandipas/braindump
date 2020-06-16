export class BaseResponse {
  constructor(ok, code, message, data) {
    this.ok = ok;
    this.code = code;
    this.message = message;

    if (data) {
      for (const prop in data) {
        this[prop] = data[prop];
      }
    }
  }
}

export class SuccessResponse extends BaseResponse {
  constructor(data) {
    super(true, 200, "Success", data);
  }
}

export class NotFoundResponse extends BaseResponse {
  constructor(message) {
    super(false, 404, message, []);
  }
}

export class BadInputResponse extends BaseResponse {
  constructor(message) {
    super(false, 400, message, []);
  }
}

export class BadRequestResponse extends BaseResponse {
  constructor(message) {
    super(false, 400, message, []);
  }
}
