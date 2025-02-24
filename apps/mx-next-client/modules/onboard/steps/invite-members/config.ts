import { RoleDescriptions } from './types';

export const roleDescriptions: RoleDescriptions = {
  Admin:
    "Complete access to all system features including user management, security settings, and system configuration. Can manage other users' roles and permissions.",
  Manager:
    'Manage team operations, view analytics, and handle merchant relationships. Has access to most features but cannot modify system settings.',
  Member:
    'Standard operational access with ability to perform day-to-day tasks and operations.',
  Viewer:
    'Read-only access to permitted areas. Can view data and reports but cannot make any changes to the system.',
};
