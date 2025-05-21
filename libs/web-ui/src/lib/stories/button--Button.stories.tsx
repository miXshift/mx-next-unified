import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/ui/button';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'sm', 'lg', 'icon'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};