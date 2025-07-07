// src/components/__tests__/QuantitySelector.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelector from '../QuantitySelector';

describe('QuantitySelector', () => {
  const setQuantity = jest.fn();

  test('renders quantity and buttons', () => {
    render(<QuantitySelector quantity={1} setQuantity={setQuantity} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
  });

  test('increments quantity', () => {
    render(<QuantitySelector quantity={1} setQuantity={setQuantity} />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(setQuantity).toHaveBeenCalledWith(2);
  });

  test('does not decrement below 1', () => {
    render(<QuantitySelector quantity={1} setQuantity={setQuantity} />);
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(setQuantity).not.toHaveBeenCalled();
  });

  test('decrements quantity above 1', () => {
    render(<QuantitySelector quantity={2} setQuantity={setQuantity} />);
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(setQuantity).toHaveBeenCalledWith(1);
  });
});