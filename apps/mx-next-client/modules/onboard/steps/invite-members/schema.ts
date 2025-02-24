import { z } from 'zod';
import { MemberRole } from './types';

export const inviteMembersSchema = z.object({
  members: z.array(
    z.object({
      email: z.string().email('Please enter a valid email address'),
      role: z.enum(['Member', 'Admin', 'Manager'], {
        required_error: 'Please select a role',
      }),
    })
  ),
});

export type InviteMembersSchema = z.infer<typeof inviteMembersSchema>;
