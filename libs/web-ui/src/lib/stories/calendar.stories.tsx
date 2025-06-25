import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '../components/ui/calendar';
import { useState } from 'react';
import { addDays } from 'date-fns';

const meta: Meta<typeof Calendar> = {
  component: Calendar,
  title: 'Calendar',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const Multiple: Story = {
  render: function Render() {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(),
      addDays(new Date(), 2),
      addDays(new Date(), 5),
    ]);
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};

export const Range: Story = {
  render: function Render() {
    const [range, setRange] = useState<{
      from: Date;
      to?: Date;
    }>({
      from: new Date(),
      to: addDays(new Date(), 7),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-md border"
      />
    );
  },
};

export const DatePicker: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label htmlFor="date" className="text-sm font-medium">
            Select date
          </label>
          <input
            id="date"
            type="text"
            readOnly
            value={date?.toLocaleDateString() || ""}
            className="h-10 rounded-md border border-input px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          initialFocus
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const today = new Date();
    const disabledDays = [
      { from: new Date(today.getFullYear(), today.getMonth(), 1), 
        to: new Date(today.getFullYear(), today.getMonth(), 5) },
      { from: new Date(today.getFullYear(), today.getMonth(), 15), 
        to: new Date(today.getFullYear(), today.getMonth(), 18) },
      new Date(today.getFullYear(), today.getMonth(), 25),
    ];

    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={disabledDays}
        className="rounded-md border"
      />
    );
  },
};

export const CustomStyles: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow-xl"
        classNames={{
          day_selected: "bg-blue-500 text-white hover:bg-blue-600",
          day_today: "bg-amber-100 text-amber-700",
        }}
      />
    );
  },
};

export const WeekStartsOnMonday: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        weekStartsOn={1}
      />
    );
  },
}; 