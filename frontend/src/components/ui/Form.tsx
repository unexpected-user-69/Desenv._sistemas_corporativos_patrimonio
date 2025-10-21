import React from 'react';
import { cn } from '../../lib/utils';

export interface FormProps {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, className }) => {
  return <form className={cn('space-y-6', className)}>{children}</form>;
};

export interface FormFieldProps {
  control?: any;
  name: string;
  render: (props: { field: any }) => React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  render,
  className,
}) => {
  // Para compatibilidade com react-hook-form
  const field = {
    value: '',
    onChange: () => {},
    onBlur: () => {},
    name,
  };

  return <div className={cn('space-y-2', className)}>{render({ field })}</div>;
};

export interface FormItemProps {
  children: React.ReactNode;
  className?: string;
}

export const FormItem: React.FC<FormItemProps> = ({ children, className }) => {
  return <div className={cn('space-y-1', className)}>{children}</div>;
};

export interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  className,
}) => {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
    >
      {children}
    </label>
  );
};

export interface FormDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormDescription: React.FC<FormDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
};

export interface FormControlProps {
  children: React.ReactNode;
  className?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  children,
  className,
}) => {
  return <div className={cn('', className)}>{children}</div>;
};

export interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn('text-sm font-medium text-destructive', className)}>
      {children}
    </p>
  );
};
