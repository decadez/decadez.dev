import Link from "next/link";

type Props = {
  tag: string;
  size?: "sm" | "lg";
  count?: number;
};

const Tag: React.FC<Props> = ({ tag, size = "sm", count }) => {
  return (
    <Link
      href={`/blog/tags/${tag}`}
      key={tag}
      passHref
      className={`blog-tag blog-outline group whitespace-nowrap fill-blogink dark:fill-blogice hover:bg-blogperiwinkle hover:text-blogink hover:fill-blogink dark:hover:bg-bloglavender dark:hover:text-blogdark dark:hover:fill-blogdark ${
        size === "lg"
          ? "py-2 px-3 text-base mr-4 my-2"
          : "py-1 px-2 text-xs mr-2 my-1"
      } bg-blogmist dark:bg-blogcarddark rounded inline-block shadow hover:shadow-md cursor-pointer`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        className={`inline-block ${
          size === "lg" ? "scale-100" : "scale-75"
        } mr-1`}
      >
        <path d="M13.707 3.293A.996.996 0 0 0 13 3H4a1 1 0 0 0-1 1v9c0 .266.105.52.293.707l8 8a.997.997 0 0 0 1.414 0l9-9a.999.999 0 0 0 0-1.414l-8-8zM12 19.586l-7-7V5h7.586l7 7L12 19.586z"></path>
        <circle cx="8.496" cy="8.495" r="1.505"></circle>
      </svg>
      {tag}
      {count && (
        <span
          aria-label={`: ${count} article${count > 1 ? "s" : ""}`}
          className="ml-2 inline-block bg-blogperiwinkle dark:bg-bloglavender group-hover:bg-blogviolet group-hover:text-white dark:group-hover:bg-blogperiwinkle dark:text-blogdark text-sm p-1 min-w-[1.75rem] text-center rounded-full"
        >
          {count}
        </span>
      )}
    </Link>
  );
};

export default Tag;
