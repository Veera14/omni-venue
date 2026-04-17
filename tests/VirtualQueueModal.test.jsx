import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VirtualQueueModal } from '../src/components/VirtualQueueModal';

describe('VirtualQueueModal Component', () => {
   it('renders the initial virtual queue state correctly', () => {
      const mockOnClose = vi.fn();
      render(<VirtualQueueModal onClose={mockOnClose} />);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Smashburger Express')).toBeInTheDocument();
      expect(screen.getByText('Join Queue Now')).toBeInTheDocument();
   });

   it('toggles joining the queue and firing the status callback', () => {
      const mockOnJoin = vi.fn();
      render(<VirtualQueueModal onClose={vi.fn()} onJoinStatusChange={mockOnJoin} />);
      
      fireEvent.click(screen.getByText('Join Queue Now'));
      expect(mockOnJoin).toHaveBeenCalledWith(true);
      expect(screen.getByText('You are in line!')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
   });

   it('manages the edge case of user dropping out of an active queue', () => {
      const mockOnJoin = vi.fn();
      render(<VirtualQueueModal onClose={vi.fn()} onJoinStatusChange={mockOnJoin} />);
      
      fireEvent.click(screen.getByText('Join Queue Now'));
      fireEvent.click(screen.getByText('Drop Out'));

      expect(mockOnJoin).toHaveBeenCalledWith(false);
      expect(screen.queryByText('Drop Out')).not.toBeInTheDocument();
      expect(screen.getByText('Virtual Queue')).toBeInTheDocument();
   });
});
