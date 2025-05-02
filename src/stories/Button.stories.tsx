import {Meta, StoryObj} from "@storybook/react";
import "@/app/globals.css"
import {fn} from "@storybook/test";
import Button from '@/components/common/Button';
import { Loader2, Menu } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        // 추가
        component: `type올 조절해 submit 버튼으로 활용도 가능하나 useForm을 사용한다면 SubmitButton이 따로 존재합니다.`,
      },
    },
  },
  args: {
    children: "버튼",
    onClick: fn(),
  }
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    children: 'Delete',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    children: 'Link Button',
  },
};

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
  },
  render: (args) => (
    <Button {...args}>
      <Menu className="w-4 h-4" />
    </Button>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Menu className="w-4 h-4" /> 메뉴
    </Button>
  ),
};

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" /> 로딩 중
    </Button>
  )
}
