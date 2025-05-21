import type { Meta, StoryObj } from '@storybook/react';
import { H1, H2, H3, H4, P, Lead, Large, Small, Muted } from '../components/typography';

const meta: Meta = {
  title: 'Typography',
  tags: ['autodocs'],
};

export default meta;

export const Heading1: StoryObj<typeof H1> = {
  render: () => <H1>Heading 1</H1>,
};

export const Heading2: StoryObj<typeof H2> = {
  render: () => <H2>Heading 2</H2>,
};

export const Heading3: StoryObj<typeof H3> = {
  render: () => <H3>Heading 3</H3>,
};

export const Heading4: StoryObj<typeof H4> = {
  render: () => <H4>Heading 4</H4>,
};

export const Paragraph: StoryObj<typeof P> = {
  render: () => (
    <P>
      This is a paragraph of text. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat.
    </P>
  ),
};

export const LeadParagraph: StoryObj<typeof Lead> = {
  render: () => (
    <Lead>
      This is a lead paragraph, used for introductions or important information.
    </Lead>
  ),
};

export const LargeText: StoryObj<typeof Large> = {
  render: () => <Large>This is large text</Large>,
};

export const SmallText: StoryObj<typeof Small> = {
  render: () => <Small>This is small text</Small>,
};

export const MutedText: StoryObj<typeof Muted> = {
  render: () => <Muted>This is muted text, less prominent</Muted>,
};

export const TypographySystem: StoryObj = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <Lead>This is a lead paragraph with important information.</Lead>
      <P>
        This is a regular paragraph. It contains text that forms the main content
        of your document or application.
      </P>
      <Large>This is large text, used for emphasis</Large>
      <Small>This is small text, used for captions or notes</Small>
      <Muted>This is muted text, used for secondary information</Muted>
    </div>
  ),
}; 