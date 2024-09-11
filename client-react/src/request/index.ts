export const httpRequest = {
  async request(url = new URL(""), options = {}) {
    const urlString = url.toString();
    const response = await fetch(urlString, options);
    const data: unknown = await response.json();

    if (response.status === 401) {
      throw new UnauthorizedError(data, response);
    }

    if (response.status === 400) {
      throw new BadRequestError(data, response);
    }

    return { data, response };
  },

  async get(url = new URL(""), options = {}): Promise<unknown> {
    const { data } = await this.request(url, {
      credentials: "include",
      method: "GET",
      ...options,
    });
  
    return data;
  },
  
  async post(url = new URL(""), options = {}): Promise<unknown> {
    const { data } = await this.request(url, {
      credentials: "include",
      method: "POST",
      ...options,
    });
    return data;
  },
};

class CustomError extends Error {
  name = "CustomError";

  constructor(message: string | undefined) {
    super(message);
  }
}

export class FetchError extends CustomError {
  name = "FetchError";
  statusCode: unknown;

  constructor(public data: unknown, public response = {status: null}, message = "") {
    super(`Bad request ${message}`.trim());

    this.response = response;
    this.data = data;
    this.statusCode = response?.status;
  }
}

export class UnauthorizedError extends CustomError {
  name = "UnauthorizedError";
  statusCode = 401;
  response: object;
  data: unknown;

  constructor(data: unknown, response = {}, message = "") {
    super(`Unauthorized ${message}`.trim());

    this.response = response;
    this.data = data;
  }
}

export class BadRequestError extends CustomError {
  name = "BadRequestError";
  statusCode = 400;
  response: unknown;
  data: unknown;

  constructor(data: unknown, response = {}, message = "") {
    super(`Bad request ${message}`);

    this.response = response;
    this.data = data;
  }
}

// handle uncaught failed fetch through
window.addEventListener("unhandledrejection", (event) => {
  if (event.reason instanceof CustomError) {
    console.error("unhandledrejection", event.reason);
  }
});
