
import type { Meta, StoryObj } from '@storybook/react';
import LoadingState from './LoadingState';


/**
 * The `meta` object configures the story's metadata, including its title,
 * the component it documents, and settings for autodocs.
 */
const meta: Meta<typeof LoadingState> = {
  title: 'Components/Wrapper/LoadingState',
  component: LoadingState,
  tags: ['autodocs'],
  parameters: {
    // Centers the component in the Canvas.
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `LoadingState` component provides visual feedback to the user that an operation is in progress. It displays a spinner and a localized "loading" message.',
      },
    },
  },
  
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ### Default Loading State
 * This is the standard appearance of the `LoadingState` component. It uses
 * the `loading_message` from the localization context.
 */
export const Default: Story = {};



