'use client';

import * as React from 'react';
import {
  GalleryVerticalEnd,
  Users,
  FileChartColumnIncreasing,
} from 'lucide-react';
import Logo from '@components/logo';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@ui/sidebar';
import { ModeToggle } from './theme-switcher';
import { NavOrgs } from './nav-org';
import { cn } from '@/lib/utils/styling';

// This is sample data.
const data = {
  user: {
    name: 'timurtek',
    email: 'timurtek.bizel@mixshift.io',
    avatar: '/shadcn.jpg',
  },
  teams: [
    {
      name: 'AtlasAmzn',
      logo: GalleryVerticalEnd,
      plan: 'Premium+',
      imageUrl: '/images/organization.jpg',
    },
  ],
  merchants: [
    {
      name: 'Merchant #1',
    },
    {
      name: 'Merchant #2',
    },
  ],
  navMain: [
    {
      title: 'Report Center',
      url: '/report-center',
      icon: FileChartColumnIncreasing,
      isActive: true,
      items: [
        {
          title: 'Reports',
          url: '/report-center',
        },
        {
          title: 'Merchants',
          url: '#',
        },
        {
          title: 'Brands',
          url: '#',
        },
      ],
    },
  ],
  organization: [
    {
      name: 'Members',
      url: '/members',
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={cn('flex', { 'px-4 pt-5 pb-4': open })}>
        <Logo />
      </SidebarHeader>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavOrgs org={data.organization} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
