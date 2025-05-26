class ApiError extends Error {
  constructor(
    data = null,
    message = "Something went wrong",
    success = false,
    errors = [],
    stack = ""
  ) {
    super(message);
    data = this.data;
    message = this.message;
    success = this.success;
    errors = this.errors;
    if (stack) {
      stack = this.stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
