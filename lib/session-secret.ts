export function getAuthSecret(): string {
  return (
    process.env.AUTH_SECRET ??
    "dev-insecure-session-secret-change-me-for-production"
  );
}
