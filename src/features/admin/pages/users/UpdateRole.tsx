import React, { useState } from 'react';
import { UserCheck, Mail, Shield, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import appToast from '../../../../components/toast';
import useAdmin from '../../hooks/useAdmin';

interface UpdateRoleFormData {
	email: string;
	role: 'user' | 'supplier' | 'admin';
}

const UpdateRole: React.FC = () => {
	const navigate = useNavigate();
	const { updateUserRole } = useAdmin();

	const [formData, setFormData] = useState<UpdateRoleFormData>({
		email: '',
		role: 'user'
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.email.trim()) {
			appToast.error('Please enter a valid user email');
			return;
		}

		setIsSubmitting(true);
		try {
			await updateUserRole({
				email: formData.email.trim(),
				role: formData.role
			});
			setFormData({ email: '', role: 'user' });
			navigate('/admin/users');
		} catch (error) {
			console.error('Failed to update role', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full space-y-6 max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
				<div className="space-y-3">
					<h1 className="text-2xl sm:text-3xl 2xl:text-4xl 4k:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						Update User Roles
					</h1>
					<p className="text-xs sm:text-sm 2xl:text-base 4k:text-lg text-zinc-500 dark:text-zinc-400">
						Modify access permissions and system roles for existing users by email.
					</p>
				</div>
			</div>

			{/* Form Container */}
			<form onSubmit={handleSubmit} className="max-w-2xl mx-auto pt-2">
				<div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-6">
					<div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
						<div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
							<UserCheck className="w-6 h-6" />
						</div>
						<div>
							<h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
								Role Assignment
							</h2>
							<p className="text-xs text-zinc-500 dark:text-zinc-400">
								Enter user email and select new account permission role.
							</p>
						</div>
					</div>

					{/* Email Input */}
					<div className="space-y-2">
						<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
							User Email Address
						</label>
						<div className="relative">
							<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
							<input
								type="email"
								name="email"
								required
								value={formData.email}
								onChange={handleChange}
								placeholder="user@example.com"
								className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
							/>
						</div>
					</div>

					{/* Role Selection */}
					<div className="space-y-2">
						<label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
							Select New Role
						</label>
						<div className="relative">
							<Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
							<select
								name="role"
								value={formData.role}
								onChange={handleChange}
								className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
							>
								<option value="user">User (Customer)</option>
								<option value="supplier">Supplier / Seller</option>
								<option value="admin">Administrator</option>
							</select>
						</div>
					</div>

					{/* Important Note */}
					<div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 flex items-start gap-3">
						<AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
						<p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300">
							Changing user permissions updates API access boundaries immediately. Ensure email accuracy before confirming.
						</p>
					</div>

					{/* Actions */}
					<div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm text-sm sm:text-base cursor-pointer"
						>
							{isSubmitting ? 'Updating Role...' : 'Update Role'}
						</button>

						<Link
							to="/admin/users"
							className="w-full sm:w-auto py-3 px-6 text-center rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm sm:text-base"
						>
							Cancel
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateRole;

