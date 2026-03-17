export default function Loader({ taille = "md", className = "" }) {
  const tailles = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${tailles[taille]} border-4 border-primary/20 border-t-primary rounded-full animate-spin`} />
    </div>
  );
}