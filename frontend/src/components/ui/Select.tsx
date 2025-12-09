import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps {
  children: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  children,
  defaultValue,
  value,
  onValueChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  const selectRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : selectedValue;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue);
    }
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            setIsOpen,
            value: currentValue,
            onValueChange: handleValueChange,
            disabled,
          });
        }
        return child;
      })}
    </div>
  );
};

export interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

export interface SelectValueProps {
  placeholder?: string;
  value?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder = 'Selecione...',
  value,
}) => {
  return (
    <span className={cn('block truncate', !value && 'text-muted-foreground')}>
      {value || placeholder}
    </span>
  );
};

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'absolute top-full z-50 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  children,
  value,
  className,
}) => {
  return (
    <button
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground',
        className,
      )}
      onClick={() => {
        // This will be handled by the parent Select component
      }}
    >
      {children}
    </button>
  );
};
