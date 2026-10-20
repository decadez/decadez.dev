import { useState } from "react";

type Props = { title: string; url: string };

const paths = {
  X: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 15.6 6.4 22H3.2l7.3-8.4L.8 2h6.5l4.5 5.9L18.9 2Zm-1.1 18h1.7L6.4 3.9H4.6L17.8 20Z",
  Facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.3.2 2.3.2v2.5h-1.3c-1.3 0-1.7.8-1.7 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z",
};

function Icon({ name }: { name: "X" | "Facebook" | "Reddit" | "Link" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      {name === "X" || name === "Facebook" ? (
        <path d={paths[name]} />
      ) : name === "Reddit" ? (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <ellipse cx="12" cy="15" rx="9" ry="6" />
          <path d="M12 9l2-6 5 1M4 11a2.5 2.5 0 1 0-2 4m18-4a2.5 2.5 0 1 1 2 4M8 18c2 1.5 6 1.5 8 0" />
          <circle cx="20" cy="4" r="2" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
        </g>
      ) : (
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path
            d="m10 13 4-4m-6 6-2 2a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m4 2 2-2a4 4 0 0 1 6 6l-4 4a4 4 0 0 1-6 0"
            transform="translate(1 1)"
          />
        </g>
      )}
    </svg>
  );
}

export default function SharePost({ title, url }: Props) {
  const [status, setStatus] = useState("");
  const shareUrl = url;
  const platforms = [
    {
      name: "X" as const,
      href: `https://twitter.com/intent/tweet?${new URLSearchParams({ text: title, url: shareUrl })}`,
    },
    {
      name: "Facebook" as const,
      href: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: shareUrl })}`,
    },
    {
      name: "Reddit" as const,
      href: `https://www.reddit.com/submit?${new URLSearchParams({ title, url: shareUrl })}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("链接已复制");
    } catch {
      setStatus("无法自动复制，请复制浏览器地址栏中的链接。");
    }
  }

  return (
    <section className="post-share" aria-label="分享文章">
      <p className="post-share-heading">分享这篇文章</p>
      <div className="post-share-actions">
        {platforms.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`分享到 ${name}（新窗口）`}
          >
            <Icon name={name} />
            <span>{name}</span>
          </a>
        ))}
        <button type="button" onClick={copyLink}>
          <Icon name="Link" />
          <span>{status === "链接已复制" ? "已复制" : "复制链接"}</span>
        </button>
      </div>
      <p className="post-share-status" role="status">
        {status}
      </p>
    </section>
  );
}
