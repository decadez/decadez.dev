import Link from "next/link";
import { useRouter } from "next/router";
import { SiteHeader } from "@decadez/web-dev-ui";

const navLinks = [
  { url: "/", text: "Quick Start" },
  { url: "/components/button", text: "Components" },
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
      : "quick start";

  return (
    <SiteHeader
      LinkComponent={Link}
      brandHref="/"
      brandLabel="web.dev"
      brandAccent=".ui"
      navLinks={navLinks}
      currentSection={currentSection}
      theme={theme}
      onThemeToggle={onThemeToggle}
    />
  );
}
