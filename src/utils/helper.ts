import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function dateSortDesc(a: Date, b: Date): number {
  if (a > b) return -1;
  if (a < b) return 1;

  return 0;
}

export const getSrcName = (src: string): string => {
  const srcName = src.split("/")[src.split("/").length - 1].split(".")[0];

  return srcName;
};

// ref: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
