interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="mb-2 flex items-center space-x-3">
          <div className="rounded-lg bg-white/20 backdrop-blur-sm">
            {/* Ícone do dashboard */}
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3v18h18"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-lg text-blue-100">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
