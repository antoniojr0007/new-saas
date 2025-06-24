export function StatsSection() {
  const stats = [
    { value: "12+", label: "Anos de atuação" },
    { value: "5.000+", label: "Famílias beneficiadas" },
    { value: "28", label: "Projetos concluídos" },
    { value: "15", label: "Cidades atendidas" },
  ];

  return (
    <section className="bg-emerald-700 py-16 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <p className="text-4xl font-bold">{stat.value}</p>
              <p className="text-sm text-emerald-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
