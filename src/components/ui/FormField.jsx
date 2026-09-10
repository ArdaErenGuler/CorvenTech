const FIELD =
  'w-full rounded-lg border border-line-strong bg-ink-soft px-4 py-3 text-sm text-heading placeholder:text-dim transition-[border-color,box-shadow] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

export function Field({ id, label, required = false, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-body">
        {label}
        {required && (
          <span className="text-accent" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export function Input(props) {
  return <input className={FIELD} {...props} />;
}

export function Select({ children, ...props }) {
  return (
    <select className={`${FIELD} appearance-none`} {...props}>
      {children}
    </select>
  );
}

export function Textarea(props) {
  return <textarea rows={5} className={`${FIELD} resize-y`} {...props} />;
}
