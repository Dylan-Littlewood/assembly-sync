import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
        secondary: 'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
        outline: 'text-foreground',

        complete: 'bg-green-600 hover:bg-green-600/80 border-transparent  text-green-50',
        processing: 'bg-yellow-600 hover:bg-yellow-600/80 border-transparent text-yellow-50',
        picking: 'bg-cyan-600 hover:bg-cyan-600/80 border-transparent text-cyan-50',
        issue: 'bg-red-600 hover:bg-red-600/80 border-transparent text-red-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
