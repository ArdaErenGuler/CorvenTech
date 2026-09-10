import Icon from './Icon';

const BASE =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink';

// Camgöbeği zeminde metin koyu arduvaz tutulur (beyaz metin kontrast sınırının altında kalır).
const VARIANTS = {
  primary: 'bg-accent text-ink hover:bg-ink hover:text-white',
  outline: 'border border-line bg-white text-ink hover:border-ink',
  dark: 'bg-ink text-white hover:bg-white hover:text-ink',
};

const SIZES = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[0.95rem]',
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
