import type { Meta, StoryObj } from '@storybook/react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Popover',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width" className="text-sm font-medium">
                Width
              </label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height" className="text-sm font-medium">
                Height
              </label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const FormPopover: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Update Profile</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Profile</h4>
            <p className="text-sm text-muted-foreground">
              Update your personal details.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                defaultValue="John Doe"
                className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
              />
            </div>
          </div>
          <Button className="w-full">Update</Button>
        </form>
      </PopoverContent>
    </Popover>
  ),
};

export const ColorPicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[220px] justify-start text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary"></div>
            <span>Pick a color</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Colors</h4>
            <p className="text-sm text-muted-foreground">
              Select a color for your profile.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              'bg-red-500',
              'bg-yellow-500',
              'bg-green-500',
              'bg-blue-500',
              'bg-purple-500',
              'bg-pink-500',
              'bg-indigo-500',
              'bg-emerald-500',
              'bg-amber-500',
              'bg-cyan-500',
            ].map((color, index) => (
              <div
                key={index}
                className={`h-8 w-8 cursor-pointer rounded-full ${color}`}
                role="button"
                tabIndex={0}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-sm">Primary</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DatePicker: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
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
            className="mr-2 h-4 w-4"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
          </svg>
          Select date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="rounded-md border shadow">
          <div className="p-2">
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-xs text-muted-foreground">
                Su
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Mo
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Tu
              </div>
              <div className="text-center text-xs text-muted-foreground">
                We
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Th
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Fr
              </div>
              <div className="text-center text-xs text-muted-foreground">
                Sa
              </div>
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`grid h-8 w-8 place-content-center rounded text-sm ${
                    i === 14
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  role="button"
                  tabIndex={0}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t p-2">
            <Button variant="outline" className="w-full justify-center text-sm">
              Today
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
