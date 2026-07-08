export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isEmpty(value: unknown) {
  if (isNil(value)) {
    return true;
  }

  if (typeof value === "string" || Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}
