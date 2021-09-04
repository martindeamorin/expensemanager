class CustomError extends Error {
    constructor(code, error,  data) {
      super(String(code));
      this.code = code;
      this.error = error;
  
      if (data) {
        this.data = data;
      }
    }
    error
    code
    data
  }
  
module.exports = CustomError;