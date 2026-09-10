import useInView from '../../hooks/useInView';

/** Görünür alana girince yumuşakça beliren sarmalayıcı. Hareket azaltma tercihine uyar. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
        inView
          ? 'translate-y-0 opacity-100'
          : 'translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
