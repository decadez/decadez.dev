import Link from "next/link";

export default function NotFound() {
  return (
    <main className="docs-shell docs-not-found">
      <h1>Page not found</h1>
      <Link href="/">Back to docs</Link>
    </main>
  );
}
