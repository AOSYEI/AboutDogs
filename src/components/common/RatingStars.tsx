export const RatingStars = ({ value }: { value: number }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(value));
  return (
    <div className="flex items-center gap-1 text-brand-500">
      {stars.map((filled, index) => (
        <span key={index}>{filled ? '?' : '?'}</span>
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
};
