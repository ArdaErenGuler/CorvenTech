import Icon from './Icon';

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-60';

// Camgöbeği zeminde metin koyu tutulur; beyaz metin kontrast sınırının altında kalır.
const VARIANTS = {
  primary: 'bg-accent text-ink hover:bg-accent-light',
  secondary: 'border border-line-strong bg-surface-2 text-heading hover:border-line-accent hover:bg-surface-hover',
  ghost: 'border border-line text-body hover:border-line-strong hover:text-heading',
};

const SIZES = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.95rem]',
};

/** `href` verilirse <a>, verilmezse <button> olarak render edilir. */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  const content = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
