interface RoleDashboardProps {
  title: string;
  items: string[];
}

export default function RoleDashboard({ title, items }: RoleDashboardProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="feature-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}