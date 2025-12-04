import { Link } from "@heroui/link";

export default function Footer(params: {
  params: { dist: Record<string, any>; lang: string };
}) {
  const lang = params.params.lang;
  const dict = params.params.dist;

  return (
    <footer className="w-full flex items-center justify-center py-6 border-t">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-default-500">
          © {new Date().getFullYear()} {dict.legal.notice}
        </p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link color="foreground" href={`/${lang}/privacy`} size="sm">
            {dict.legal.privacy}
          </Link>
          <Link color="foreground" href={`/${lang}/terms`} size="sm">
            {dict.legal.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
