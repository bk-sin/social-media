import AuthHOC from "@/components/AuthHOC";
import { publicRoutes } from "@/config/public-routes";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { memo } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  const WrappedComponent = isPublicRoute
    ? AuthHOC(memo(Component), { isPrivate: false })
    : AuthHOC(memo(Component), { isPrivate: true });
  return (
    <SessionProvider session={session}>
      <WrappedComponent {...pageProps} />
    </SessionProvider>
  );
}
