import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const SignIn: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to sign in.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Your email"
              className="rounded-md border border-input px-3 py-2"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              className="rounded-md border border-input px-3 py-2"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Sign In</Button>
      </CardFooter>
    </Card>
  ),
};

export const Pricing: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Basic Plan</CardTitle>
          <CardDescription>
            For individuals just getting started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-4xl font-bold">$9</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              1 User
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              5 Projects
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              5GB Storage
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Started</Button>
        </CardFooter>
      </Card>

      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Pro Plan</CardTitle>
          <CardDescription>For professional use and teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-4xl font-bold">$29</p>
            <p className="text-sm text-muted-foreground">per month</p>
          </div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              10 Users
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Unlimited Projects
            </li>
            <li className="flex items-center">
              <svg
                className="mr-2 h-4 w-4 text-primary"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              50GB Storage
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};
