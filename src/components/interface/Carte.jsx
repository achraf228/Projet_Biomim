export default function Carte({ children, className = "", ...props }) {
  return (
    <div className={`bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`} {...props}>
      {children}
    </div>
  );
}