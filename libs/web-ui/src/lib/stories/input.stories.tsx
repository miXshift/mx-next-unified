import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/ui/input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  ),
};

export const WithTypes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-full max-w-sm">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="text" className="text-sm font-medium">
          Text
        </label>
        <Input type="text" id="text" placeholder="Text" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input type="password" id="password" placeholder="Password" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="number" className="text-sm font-medium">
          Number
        </label>
        <Input type="number" id="number" placeholder="Number" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="url" className="text-sm font-medium">
          URL
        </label>
        <Input type="url" id="url" placeholder="URL" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithPrefix: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-full max-w-sm">
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="with-prefix" className="text-sm font-medium">
          With Prefix
        </label>
        <div className="flex rounded-md overflow-hidden items-center border border-input">
          <span className="bg-muted px-3 py-2 h-10 text-sm flex items-center">
            https://
          </span>
          <Input
            id="with-prefix"
            className="border-0 rounded-none focus-visible:ring-0"
            placeholder="example.com"
          />
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="with-suffix" className="text-sm font-medium">
          With Suffix
        </label>
        <div className="flex rounded-md overflow-hidden items-center border border-input">
          <Input
            id="with-suffix"
            className="border-0 rounded-none focus-visible:ring-0"
            placeholder="Username"
          />
          <span className="bg-muted px-3 py-2 h-10 text-sm flex items-center">
            @gmail.com
          </span>
        </div>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="search" className="text-sm font-medium">
        Search
      </label>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <Input id="search" placeholder="Search..." className="pl-10" />
      </div>
    </div>
  ),
};
