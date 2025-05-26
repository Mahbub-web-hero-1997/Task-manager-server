class ApiResponse {
  constructor(statusCode, data, message, success = true) {
    statusCode = this.statusCode;
    data = this.data;
    message = this.message;
    success = this.success;
  }
}

export default ApiResponse;
