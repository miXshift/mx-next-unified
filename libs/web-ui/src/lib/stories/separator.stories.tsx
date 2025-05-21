import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components/ui/separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Separator',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Horizontal Separator</h4>
        <p className="text-sm text-muted-foreground">
          A horizontal separator line to divide content sections.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Home</div>
        <Separator orientation="vertical" />
        <div>Dashboard</div>
        <Separator orientation="vertical" />
        <div>Settings</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-40 items-center">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Products</h4>
        <p className="text-sm text-muted-foreground">
          All of our products are crafted with love.
        </p>
      </div>
      <Separator orientation="vertical" className="mx-8 h-full" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Services</h4>
        <p className="text-sm text-muted-foreground">
          We offer a wide range of services for your business.
        </p>
      </div>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-1">
        <h4 className="text-lg font-medium leading-none">Account Settings</h4>
        <p className="text-sm text-muted-foreground">
          Update your account information.
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            Profile Information
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input 
            id="name" 
            className="rounded-md border border-input px-3 py-2 text-sm"
            defaultValue="John Doe"
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input 
            id="email" 
            type="email"
            className="rounded-md border border-input px-3 py-2 text-sm"
            defaultValue="john.doe@example.com"
          />
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs text-muted-foreground">
            Security
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input 
            id="password" 
            type="password"
            className="rounded-md border border-input px-3 py-2 text-sm"
            defaultValue="********"
          />
        </div>
      </div>
    </div>
  ),
}; 