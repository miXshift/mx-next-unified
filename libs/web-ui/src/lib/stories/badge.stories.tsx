import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge>
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
          className="mr-1 h-3 w-3"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        Completed
      </Badge>
      <Badge variant="secondary">
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
          className="mr-1 h-3 w-3"
        >
          <path d="M12 2v10"></path>
          <path d="M12 16h.01"></path>
        </svg>
        Warning
      </Badge>
      <Badge variant="destructive">
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
          className="mr-1 h-3 w-3"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
          <path d="M12 9v4"></path>
          <path d="M12 17h.01"></path>
        </svg>
        Error
      </Badge>
    </div>
  ),
};

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Status Indicators</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Active</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="outline">Draft</Badge>
          <Badge variant="destructive">Cancelled</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Feature Labels</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            New
          </Badge>
          <Badge
            variant="default"
            className="bg-purple-500 hover:bg-purple-600"
          >
            Pro
          </Badge>
          <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
            Updated
          </Badge>
          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
            Beta
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notification Counts</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative">
            <button className="p-2 rounded-full bg-muted">
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
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <Badge className="absolute -top-1 -right-1 px-1.5">5</Badge>
          </div>

          <div className="relative">
            <button className="p-2 rounded-full bg-muted">
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
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </button>
            <Badge className="absolute -top-1 -right-1 px-1.5">3</Badge>
          </div>

          <div className="relative">
            <button className="p-2 rounded-full bg-muted">
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
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <Badge className="absolute -top-1 -right-1 px-1.5">9+</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
};
