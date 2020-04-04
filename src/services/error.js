const report = (error) => {
  // TODO: Log the error to Google Stackdriver, Rollbar etc.
  // eslint-disable-next-line no-console
  console.error(error);
};

export class UnauthorizedError extends Error {
  constructor(message = "Invalid access.", code = 401) {
    super(message);
    this.code = code;
  }
}

export default { report };
