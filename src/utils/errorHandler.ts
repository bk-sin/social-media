import { AxiosError } from "axios";

interface ErrorResponse {
  error?: string;
}

export function handleError(err: unknown): string {
  if (err instanceof AxiosError) {
    // Handle Axios errors
    const errorResponse = err.response?.data as ErrorResponse;

    if (errorResponse?.error) {
      return errorResponse.error;
    }

    // Handle HTTP errors
    if (err.response) {
      const statusCode = err.response.status;
      if (statusCode >= 400 && statusCode < 500) {
        return `Client error: ${statusCode}`;
      }
      if (statusCode >= 500) {
        return `Server error: ${statusCode}`;
      }
    }

    // Handle network or request errors
    if (err.message) {
      return `Network error: ${err.message}`;
    }
  } else if (err instanceof Error) {
    // Handle general errors
    return `Error: ${err.message}`;
  }

  // Handle unknown errors
  return "An unexpected error occurred";
}
