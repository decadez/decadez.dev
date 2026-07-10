import type { Meta, StoryObj } from "@storybook/react-vite";
import { RiderKickLogo } from "@decadez/web-dev-ui";

import spriteUrl from "../decade-rider-kick-spaced.png";

const meta = {
  title: "web-dev-ui/RiderKickLogo",
  component: RiderKickLogo,
  args: {
    spriteSrc: spriteUrl,
  },
  decorators: [
    (Story) => (
      <div className="min-h-40 bg-bglight p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RiderKickLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
