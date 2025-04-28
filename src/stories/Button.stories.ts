import {Meta, StoryObj} from "@storybook/react";
import "@/app/globals.css"
import {fn} from "@storybook/test";
import Button from '@/components/Button';

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

export const Primary: Story = {
  args: {
    variant: 'primary',
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline'
  }
}

export const Warning: Story = {
  args: {
    variant: 'warning'
  }
}

export const Error: Story = {
  args: {
    variant: 'error'
  }
}

export const Ghost: Story = {
  args: {
    variant: 'ghost'
  }
}

export const FullRound: Story = {
  args: {
    rounded: "full",
    className: "w-32"
  }
}

export const XSmall: Story = {
  args: {
    size: 'xs'
  }
}

export const XLarge: Story = {
  args: {
    size: 'xl'
  }
}

export const FullWidth: Story = {
  args: {
    fullWidth: true
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}
