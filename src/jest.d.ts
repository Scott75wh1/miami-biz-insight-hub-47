
import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveValue(value: any): R;
      toHaveClass(className: string): R;
      toHaveFocus(): R;
      toHaveFormValues(values: { [key: string]: any }): R;
      toHaveStyle(style: { [key: string]: any }): R;
    }
  }
}
