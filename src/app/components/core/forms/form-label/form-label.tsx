import { VariantProps, cva } from 'class-variance-authority';

const formLabelVariants = cva('block text-sm mb-2', {
  variants: {
    intent: {
      primary: 'text-primary',
      secondary: 'text-secondary-300',
    },
    fontbold: {
      true: 'font-bold',
    },
  },
  defaultVariants: {
    intent: 'primary',
    fontbold: false,
  },
});

interface FormLabelProps extends VariantProps<typeof formLabelVariants> {
  for: string;
  children: string;
}

const FormLabel: React.FC<FormLabelProps> = ({
  intent,
  fontbold,
  ...props
}) => {
  return (
    <>
      <label
        className={formLabelVariants({ intent, fontbold })}
        htmlFor={props.for}
      >
        {props.children}
      </label>
    </>
  );
};

export default FormLabel;
