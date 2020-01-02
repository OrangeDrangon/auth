export function validateCode(code?: string): boolean {
  switch (code) {
    case "implicit":
      return true;
    default:
      return false;
  }
}
