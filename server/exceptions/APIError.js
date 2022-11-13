class APIError extends Error {
  status;
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static Unuathorized(message) {
    return new APIError(403, message);
  }

  static BadRequest(message) {
    return new APIError(400, message);
  }
}

module.exports = APIError;

// throw APIError.BadRequest("sadasdasd");
// throw new APIError(400, "sadasdasd");
