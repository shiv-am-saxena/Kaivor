const Dashboard = () => {
    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-sm text-zinc-400 mt-1">Welcome back. Here is an overview of your store.</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { label: 'Total Sales', value: '$45,231.89', change: '+20.1% from last month' },
                    { label: 'Subscriptions', value: '+2,350', change: '+180.1% from last month' },
                    { label: 'Sales', value: '+12,234', change: '+19% from last month' },
                    { label: 'Active Now', value: '+573', change: '+201 since last hour' },
                ].map((stat, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 shadow-sm space-y-2">
                        <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                        <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                        <p className="text-xs text-zinc-500">{stat.change}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;