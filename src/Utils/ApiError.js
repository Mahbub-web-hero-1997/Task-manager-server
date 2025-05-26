class ApiError extends Error {
  constructor(
    data = null,
    message = "Something went wrong",
    success = false,
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    }
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
