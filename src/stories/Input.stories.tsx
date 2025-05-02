import {Meta, StoryObj} from "@storybook/react";
import { Input } from '@/components/common/Input';
import { Lock, Mail } from 'lucide-react';
import '../app/globals.css'

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: '입력하세요',
  },
}

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: '이메일',
  },
};

export const WithIcon: Story = {
  args: {
    label: '이메일',
    icon: <Mail className="w-4 h-4" />,
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    icon: <Lock className="w-4 h-4" />,
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    error: '이메일 형식이 올바르지 않습니다.',
  },
};

export const Disabled: Story = {
  args: {
    label: '이메일',
    value: 'abc@xxx.com',
    disabled: true,
  },
};
