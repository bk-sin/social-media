import { AxiosError } from "axios";

interface ErrorResponse {
  error?: string;
}

export function handleError(err: unknown): string {
  if (err instanceof AxiosError) {
    const errorResponse = err.response?.data as ErrorResponse;

    if (errorResponse?.error) {
      return errorResponse.error;
    }

    if (err.response) {
      const statusCode = err.response.status;
      if (statusCode >= 400 && statusCode < 500) {
        return `Client error: ${statusCode}`;
      }
      if (statusCode >= 500) {
        return `Server error: ${statusCode}`;
      }
    }

    if (err.message) {
      return `Network error: ${err.message}`;
    }
  } else if (err instanceof Error) {
    return `Error: ${err.message}`;
  }

  return "An unexpected error occurred";
}
