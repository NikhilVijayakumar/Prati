
import type { Meta, StoryObj } from '@storybook/react';
import ErrorState from './ErrorState';


/**
 * The `meta` object configures the story's metadata, including its title in the
 * Storybook sidebar, the component it documents, and settings for autodocs.
 */
const meta: Meta<typeof ErrorState> = {
  title: 'Components/Wrapper/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  parameters: {
    // Centers the component in the Canvas.
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `ErrorState` component is used to inform the user that an operation has failed or an error has occurred. It can display a custom message or a default, localized message.',
      },
    },
  },
 
  argTypes: {
    message: {
      control: 'text',
      description: 'The specific error message to display.',
      type: { name: 'string', required: false },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ### Default Error
 * This story demonstrates the `ErrorState` component in its default state,
 * without a `message` prop. It automatically falls back to the `unknown_message`
 * literal provided by the `LanguageProvider`.
 */
export const Default: Story = {
  args: {
    // message is intentionally left undefined to show the fallback behavior.
  },
};

/**
 * ### With Custom Message
 * This story shows the component displaying a specific error message passed
 * via the `message` prop. This is useful for providing context-specific feedback
* to the user, such as API error responses.
 */
export const WithCustomMessage: Story = {
  args: {
    message: 'Failed to fetch user data. Please check your connection.',
  },
};

/**
 * ### With a Very Long Message
 * This story tests how the component handles a very long error message.
 * The `Alert` component from MUI should handle text wrapping gracefully,
 * ensuring the layout remains intact even with extensive content.
 */
export const WithLongMessage: Story = {
  args: {
    message: 'An unexpected and critical error occurred while processing your request. The system administrator has been notified. Please try again later or contact support with error code: SYS-500-L-ERR.',
  },
};
