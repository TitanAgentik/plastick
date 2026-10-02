import { createMiddleware } from "@tanstack/react-start";

/** Forwards preview bearer; does not require a session. */
export const optionalSession = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { getBearerToken } = await import("@/lib/auth/client");
    return next({ sendContext: { bearerToken: getBearerToken() ?? undefined } });
  })
  .server(async ({ next, context }) => {
    const { getSessionUser } = await import("@/lib/auth/verify.server");
    const user = await getSessionUser(
      (context as { bearerToken?: string }).bearerToken,
    );
    return next({
      context: { member: Boolean(user), userId: user?.id ?? null },
    });
  });
