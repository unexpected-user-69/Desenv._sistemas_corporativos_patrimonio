import React from 'react';
import { cn } from '../../lib/utils';

export interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ className, open, onOpenChange, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(open || false);

    const handleOpenChange = (newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
    };

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              isOpen,
              onOpenChange: handleOpenChange,
            } as any);
          }
          return child;
        })}
      </div>
    );
  },
);

Popover.displayName = 'Popover';

export interface PopoverTriggerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PopoverTrigger = React.forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ className, asChild, isOpen, onOpenChange, children, ...props }, ref) => {
    const handleClick = () => {
      onOpenChange?.(!isOpen);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        onClick: handleClick,
        ref,
        ...props,
      } as any);
    }

    return (
      <div
        ref={ref}
        className={cn('', className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PopoverTrigger.displayName = 'PopoverTrigger';

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: 'start' | 'center' | 'end';
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  (
    { className, isOpen, onOpenChange, align = 'center', children, ...props },
    ref,
  ) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

PopoverContent.displayName = 'PopoverContent';

export { Popover, PopoverTrigger, PopoverContent };
