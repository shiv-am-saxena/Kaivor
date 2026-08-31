import React from 'react';

export const ProductHeader: React.FC = () => {
	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
			<div className="space-y-1.5">
				<h1 className="text-2xl sm:text-3xl 2xl:text-4xl 4k:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Edit & Review Product
				</h1>
				<p className="text-xs sm:text-sm 2xl:text-base 4k:text-lg text-zinc-500 dark:text-zinc-400">
					Review product specifications, manage variants, and update pricing & stock settings.
				</p>
			</div>
		</div>
	);
};

