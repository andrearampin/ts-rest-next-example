import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button.className).toContain('bg-blue-600');
  });

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button.className).toContain('bg-gray-200');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });
});
