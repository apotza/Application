class CustomError extends Error {
  statusCode: number;
  message: string;
  details: any;
  constructor(statusCode: number, message: string, details: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
    };
  }
}

export default CustomError;
