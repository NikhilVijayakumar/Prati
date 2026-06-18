import baseLayout from './base-layout.hbs?raw';
import otpEmail from './otp-email.hbs?raw';
import alertT from './alert.hbs?raw';
import taskSummary from './task-summary.hbs?raw';

export const bundledTemplates: Record<string, string> = {
  'base-layout': baseLayout,
  'otp-email': otpEmail,
  alert: alertT,
  'task-summary': taskSummary,
};

export default bundledTemplates;
