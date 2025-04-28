import {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {Menu} from "lucide-react";
import "@/app/globals.css"
import IconButton from '@/components/IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Common/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    children: "아이콘버튼",
    onClick: fn(),
  }
}

export default meta;
type Story = StoryObj<typeof meta>

export const WithText: Story = {
  args: {
    icon: Menu,
    label: "메뉴",
  }
}

export const Solid: Story = {
  args: {
    icon: Menu,
    variant: "solid",
  }
}

export const Outline: Story = {
  args: {
    icon: Menu,
    variant: "outline",
  }
}

export const Rounded: Story = {
  args: {
    icon: Menu,
    variant: 'solid',
    shape: "rounded",
  }
}

export const Small: Story = {
  args: {
    icon: Menu,
    size: "sm",
  }
}

export const Medium: Story = {
  args: {
    icon: Menu,
    size: "md",
  }
}

export const Large: Story = {
  args: {
    icon: Menu,
    size: "lg",
  }
}
