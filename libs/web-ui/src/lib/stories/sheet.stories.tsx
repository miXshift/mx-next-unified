import type { Meta, StoryObj } from '@storybook/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '../components/ui/sheet';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Sheet> = {
  component: Sheet,
  title: 'Sheet',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              value="John Doe"
              className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label
              htmlFor="username"
              className="text-right text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              value="@johndoe"
              className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate to different sections of the application.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          <Button variant="ghost" className="justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            Projects
          </Button>
          <Button variant="ghost" className="justify-start">
            Calendar
          </Button>
          <Button variant="ghost" className="justify-start">
            Settings
          </Button>
        </div>
        <SheetFooter className="flex-col items-start">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Top: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-1/3">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>You have 3 unread notifications.</SheetDescription>
        </SheetHeader>
        <div className="my-4 space-y-4">
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">New message from Jane</h4>
            <p className="text-sm text-muted-foreground">
              Hey, can we meet today to discuss the project?
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">Task reminder: Project deadline</h4>
            <p className="text-sm text-muted-foreground">
              Your project is due tomorrow at 5 PM.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h4 className="font-medium">System update available</h4>
            <p className="text-sm text-muted-foreground">
              A new version is available for installation.
            </p>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Mark all as read</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-1/3">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Choose an action to perform.</SheetDescription>
        </SheetHeader>
        <div className="flex justify-center gap-4 py-4">
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
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
                className="h-6 w-6"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
            <span className="text-sm">Edit</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
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
                className="h-6 w-6"
              >
                <path d="M9 3H5a2 2 0 0 0-2 2v4"></path>
                <path d="M9 21H5a2 2 0 0 1-2-2v-4"></path>
                <path d="M19 3h-4"></path>
                <path d="M19 21h-4"></path>
                <path d="M3 9v6"></path>
                <path d="M21 9v6"></path>
                <path d="M9 3v18"></path>
                <path d="M9 3h6v18H9"></path>
              </svg>
            </div>
            <span className="text-sm">Copy</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
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
                className="h-6 w-6"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
            </div>
            <span className="text-sm">Print</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
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
                className="h-6 w-6"
              >
                <path d="m3 6 6 6-6 6"></path>
                <path d="M21 18H11"></path>
                <path d="M21 6h-6"></path>
                <path d="M11 12h4"></path>
              </svg>
            </div>
            <span className="text-sm">Share</span>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
