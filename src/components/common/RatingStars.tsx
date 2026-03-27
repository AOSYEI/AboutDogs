export const RatingStars = ({ value }: { value: number }) => {
  const roundedValue = Math.max(0, Math.min(5, Math.round(value)));
  const stars = Array.from({ length: 5 }, (_, index) => index < roundedValue);

  return (
    <div className="flex items-center gap-1" aria-label={`评分 ${value.toFixed(1)} / 5`}>
      {stars.map((filled, index) => (
        <span
          key={index}
          className={filled ? 'text-brand-500' : 'text-slate-300'}
          aria-hidden="true"
        >
          {filled ? '\u2605' : '\u2606'}
        </span>
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">{value.toFixed(1)}</span>
    </div>
  );
};
