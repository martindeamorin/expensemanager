class SuccessfulResponse {
    constructor(code, message, data) {
      this.code = code;
      this.message = message;
  
      if (data) {
        this.data = data;
      }
    }
    code
    message
    data
  }
  
module.exports = SuccessfulResponse;