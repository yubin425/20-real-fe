import { Menu } from 'lucide-react';

import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Button from '@/components/common/Button';

import '@/app/globals.css';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {
    children: '버튼',
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
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
    children: 'Destructive',
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

const LoadingButtonDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // 2초 후 loading 해제
  };

  return (
    <Button loading={loading} onClick={handleClick}>
      서버로 전송하기
    </Button>
  );
};

export const LoadingState: Story = {
  render: () => <LoadingButtonDemo />,
};
