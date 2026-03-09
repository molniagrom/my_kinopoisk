export function isErrorWithMessage(error: unknown): error is { message: string } {
  if (
    typeof error !== 'object' ||
    error === null ||
    !('message' in error)
  ) {
    return false;
  }

  type ErrorWithMessage = { message?: unknown };
  const maybeMessage = (error as ErrorWithMessage).message;
  return typeof maybeMessage === 'string';
}
