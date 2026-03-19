import type { ZodType } from 'zod';

export const parseWithSchema = <T>(schema: ZodType<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const issue = result.error.issues[0];
    const path = issue?.path?.length ? issue.path.join('.') : 'data';
    const message = issue ? `${path}: ${issue.message}` : 'Invalid response shape.';
    throw new Error(message);
  }

  return result.data;
};
