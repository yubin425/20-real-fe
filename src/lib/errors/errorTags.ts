export const ErrorTags = {
  AUTH: { feature: 'auth' },
  API: { feature: 'api' },
} as const;

export type ErrorTag = (typeof ErrorTags)[keyof typeof ErrorTags];

export function mergeTags(...tags: ErrorTag[]): Record<string, string> {
  return Object.assign({}, ...tags);
}
