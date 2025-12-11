import React from 'react';
import { cn } from '../../lib/utils';

export interface CalendarProps {
  mode?: 'single' | 'multiple' | 'range';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  className?: string;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      className,
      mode = 'single',
      selected,
      onSelect,
      disabled,
      initialFocus,
      ...props
    },
    ref,
  ) => {
    const [currentDate, setCurrentDate] = React.useState(
      selected || new Date(),
    );

    const handleDateClick = (date: Date) => {
      if (disabled && disabled(date)) return;
      setCurrentDate(date);
      onSelect?.(date);
    };

    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }

      return days;
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
      <div ref={ref} className={cn('p-3', className)} {...props}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}

            {days.map((day, index) => (
              <div key={index} className="text-center">
                {day ? (
                  <button
                    onClick={() => handleDateClick(day)}
                    disabled={disabled ? disabled(day) : false}
                    className={cn(
                      'w-8 h-8 text-sm rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                      selected &&
                        day.getTime() === selected.getTime() &&
                        'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                    )}
                  >
                    {day.getDate()}
                  </button>
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';

export { Calendar };
