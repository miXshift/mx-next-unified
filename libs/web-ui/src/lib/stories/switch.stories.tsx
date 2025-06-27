import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/ui/switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Switch',
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label
        htmlFor="airplane-mode"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Airplane Mode
      </label>
    </div>
  ),
};

export const WithLabelAndDescription: Story = {
  render: () => (
    <div className="grid gap-6">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" defaultChecked />
        <label
          htmlFor="airplane-mode"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Airplane Mode
        </label>
      </div>
      <div className="items-top flex space-x-2">
        <Switch id="wifi" />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="wifi"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Wi-Fi
          </label>
          <p className="text-sm text-muted-foreground">
            Connect to nearby Wi-Fi networks.
          </p>
        </div>
      </div>
      <div className="items-top flex space-x-2">
        <Switch id="bluetooth" defaultChecked />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="bluetooth"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Bluetooth
          </label>
          <p className="text-sm text-muted-foreground">
            Connect to nearby Bluetooth devices.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity.
              </p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products and features.
              </p>
            </div>
            <Switch id="marketing-emails" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive notifications via text message.
              </p>
            </div>
            <Switch id="sms-notifications" />
          </div>
        </div>
      </div>
    </form>
  ),
};
