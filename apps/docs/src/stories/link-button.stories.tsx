import type { Meta, StoryObj } from "@storybook/react-vite";
import { LinkButton } from "@decadez/web-dev-ui";

const meta = {
  title: "web-dev-ui/LinkButton",
  component: LinkButton,
  args: {
    href: "/contact",
    children: "Get in touch",
  },
  decorators: [
    (Story) => (
      <div className="min-h-40 bg-bglight p-8 text-bgdark dark:bg-bgdark dark:text-textlight">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Outline: Story = {
  args: {
    outline: true,
    children: "Read more",
  },
};
