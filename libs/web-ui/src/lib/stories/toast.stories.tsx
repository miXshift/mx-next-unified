import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../components/ui/toast';
import { Button } from '../components/ui/button';

const meta: Meta = {
  title: 'Toast',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

const DefaultComponent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-10">
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
          setTimeout(() => setOpen(false), 5000);
        }}
      >
        Show Toast
      </Button>
      <ToastProvider duration={5000}>
        <Toast open={open} onOpenChange={setOpen}>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>
            Your message has been sent successfully.
          </ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

const WithActionComponent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-10">
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
          setTimeout(() => setOpen(false), 5000);
        }}
      >
        Show Toast with Action
      </Button>
      <ToastProvider duration={5000}>
        <Toast open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Undo Changes</ToastTitle>
            <ToastDescription>
              Your changes have been saved. You can undo them within 5
              seconds.
            </ToastDescription>
          </div>
          <ToastAction altText="Undo" onClick={() => console.log('Undo clicked')}>
            Undo
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const WithAction: Story = {
  render: () => <WithActionComponent />,
};

const DestructiveComponent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="p-10">
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
          setTimeout(() => setOpen(false), 5000);
        }}
      >
        Show Destructive Toast
      </Button>
      <ToastProvider duration={5000}>
        <Toast variant="destructive" open={open} onOpenChange={setOpen}>
          <div className="grid gap-1">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              There was a problem with your request. Please try again.
            </ToastDescription>
          </div>
          <ToastAction
            altText="Try again"
            onClick={() => console.log('Try again clicked')}
          >
            Try again
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const Destructive: Story = {
  render: () => <DestructiveComponent />,
};

const MultiplePrioritiesComponent = () => {
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [destructiveOpen, setDestructiveOpen] = React.useState(false);

  const showDefault = () => {
    setDefaultOpen(true);
    setTimeout(() => setDefaultOpen(false), 5000);
  };

  const showDestructive = () => {
    setDestructiveOpen(true);
    setTimeout(() => setDestructiveOpen(false), 5000);
  };

  const showBoth = () => {
    showDefault();
    setTimeout(showDestructive, 1000);
  };

  return (
    <div className="p-10 space-x-4">
      <Button variant="outline" onClick={showDefault}>
        Regular Toast
      </Button>
      <Button variant="destructive" onClick={showDestructive}>
        Error Toast
      </Button>
      <Button onClick={showBoth}>Show Both</Button>
      <ToastProvider duration={5000}>
        <Toast open={defaultOpen} onOpenChange={setDefaultOpen}>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your changes have been saved.</ToastDescription>
        </Toast>
        <Toast
          variant="destructive"
          open={destructiveOpen}
          onOpenChange={setDestructiveOpen}
        >
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>
            There was a problem with your request.
          </ToastDescription>
          <ToastAction
            altText="Try again"
            onClick={() => console.log('Try again clicked')}
          >
            Try again
          </ToastAction>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export const MultiplePriorities: Story = {
  render: () => <MultiplePrioritiesComponent />,
};
