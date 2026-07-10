import type { Meta, StoryObj } from "@storybook/react-vite";
import { SiteHeader } from "@decadez/web-dev-ui";

import spriteUrl from "../decade-rider-kick-spaced.png";

const navLinks = [
  { url: "#whoami", text: "Who am i?" },
  { url: "#projects", text: "Projects" },
  { url: "#blog", text: "Blog" },
  { url: "#contact", text: "Contact" },
];

const meta = {
  title: "web-dev-ui/SiteHeader",
  component: SiteHeader,
  args: {
    brandHref: "#",
    brandLabel: "decadez",
    brandAccent: ".dev",
    spriteSrc: spriteUrl,
    navLinks,
    apiStatus: "ok",
  },
  decorators: [
    (Story) => (
      <div className="min-h-56 bg-bglight text-bgdark dark:bg-bgdark dark:text-textlight">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActiveBlog: Story = {
  args: {
    currentSection: "blog",
  },
};
