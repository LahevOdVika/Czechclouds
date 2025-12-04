import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["cs", "en", "de"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
    const headersObject: Record<string, string> = {};
    // @ts-expect-error Idk some random error with TypeScript
    for (const [key, value] of request.headers.entries()) {
        headersObject[key] = value;
    }
    const languages = new Negotiator({ headers: headersObject }).languages();
    return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
