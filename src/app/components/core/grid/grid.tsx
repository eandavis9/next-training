import { VariantProps, cva } from 'class-variance-authority';
import { ReactNode } from 'react';

const gridVariants = cva('grid', {
  variants: {
    intent: {
      col1: 'grid-cols-1',
      col2: 'grid-cols-2',
      col3: 'grid-cols-3',
    },
  },
  defaultVariants: {
    intent: 'col1',
  },
});

interface GridProps extends VariantProps<typeof gridVariants> {
  children: ReactNode;
}

const Grid: React.FC<GridProps> = ({ intent, ...props }) => {
  return (
    <>
      <div className={gridVariants({ intent })}>{props.children}</div>
    </>
  );
};

export default Grid;
