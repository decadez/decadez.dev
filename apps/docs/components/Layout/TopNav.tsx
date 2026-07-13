import Link from "next/link";
import { useRouter } from "next/router";
import { SiteHeader } from "@decadez/web-dev-ui";
import { docsBasePath } from "@/utils/base-path";

const spriteSrc = `${docsBasePath}/decade-rider-kick-spaced.png`;
const navLinks = [
  { url: "/installation", text: "Docs" },
  { url: "/components", text: "Components" },
  { url: "/patterns/publishing", text: "Package" },
];

export function TopNav({
  theme,
  onThemeToggle,
}: {
  theme: "light" | "dark";
  onThemeToggle: () => void;
}) {
  const router = useRouter();
  const currentPath = router.asPath.split("#")[0];
  const currentSection = currentPath.startsWith("/components")
    ? "components"
    : currentPath.startsWith("/patterns")
      ? "package"
      : "docs";

  return (
    <SiteHeader
      LinkComponent={Link}
      brandHref="/"
      brandLabel="web.dev"
      brandAccent=".ui"
      spriteSrc={spriteSrc}
      navLinks={navLinks}
      currentSection={currentSection}
      theme={theme}
      onThemeToggle={onThemeToggle}
    />
  );
}
