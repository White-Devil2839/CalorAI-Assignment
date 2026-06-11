import SectionCard from './SectionCard';
import CheckRow from './CheckRow';

/** "💪 Lifestyle & Goals" — green-check rows derived from the taste profile. */
export default function LifestyleCard({ items }: { items: string[] }) {
  return (
    <SectionCard
      title="💪 Lifestyle & Goals"
      subtitle="We'll use this to tailor our advice & meal plan"
      style={{ marginTop: 16 }}
    >
      {items.map((it, i) => (
        <CheckRow key={`${it}-${i}`} label={it} badge="check-green" isLast={i === items.length - 1} />
      ))}
    </SectionCard>
  );
}
