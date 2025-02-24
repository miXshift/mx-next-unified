export type MemberRole = 'Admin' | 'Manager' | 'Member' | 'Viewer';

export interface TeamMember {
  email: string;
  role: MemberRole;
}

export interface InviteMembersData {
  members: TeamMember[];
}

export type RoleDescriptions = Record<MemberRole, string>;
