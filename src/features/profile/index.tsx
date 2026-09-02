import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Shield, CheckCircle2, XCircle, LogOut, RefreshCw, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../context/hooks';
import useAuth from '../auth/hook/useAuth';
import appToast from '../../components/toast';

const Profile: React.FC = () => {
	const { user, isLoading } = useAppSelector((state) => state.auth);
	const { handleFetchUser, handleLogout, handleDeleteUser } = useAuth();
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		handleFetchUser();
	}, [handleFetchUser]);

	const onRefresh = async () => {
		setIsRefreshing(true);
		try {
			await handleFetchUser();
			appToast.success('Profile refreshed successfully');
		} finally {
			setIsRefreshing(false);
		}
	};

	const onDeleteAccount = async () => {
		if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			await handleDeleteUser();
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center text-neutral-600 dark:text-neutral-400">
				<RefreshCw className="w-6 h-6 animate-spin mr-2" />
				Loading profile details...
			</div>
		);
	}

	return (
		<div className="w-full min-h-screen text-neutral-900 dark:text-white px-4 py-8 sm:px-6 md:px-10 lg:px-12 2xl:px-20">
			<div className="max-w-4xl 2xl:max-w-6xl mx-auto space-y-8">
				{/* Profile Header */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white text-2xl sm:text-3xl font-bold border border-neutral-300 dark:border-neutral-700 shadow-sm dark:shadow-md">
							{user?.fullName?.[0]?.toUpperCase() || 'U'}
						</div>
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
								{user?.fullName || 'User Profile'}
							</h1>
							<p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 capitalize">
								Role: <span className="font-medium text-neutral-900 dark:text-white">{user?.role || 'Customer'}</span>
							</p>
						</div>
					</div>

					<button
						onClick={onRefresh}
						disabled={isRefreshing}
						className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-800 text-neutral-700 hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
					>
						<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
						<span>Refresh</span>
					</button>
				</div>

				{/* Info Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Account Information */}
					<div className="bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6 shadow-sm dark:shadow-none">
						<h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
							<User className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
							Personal Information
						</h2>

						<div className="space-y-4 text-sm">
							<div>
								<span className="text-neutral-500 dark:text-neutral-400 block text-xs mb-1">Full Name</span>
								<p className="font-medium text-neutral-900 dark:text-white text-base">{user?.fullName || 'N/A'}</p>
							</div>

							<div>
								<span className="text-neutral-500 dark:text-neutral-400 block text-xs mb-1">Email Address</span>
								<div className="flex items-center justify-between">
									<span className="font-medium text-neutral-900 dark:text-white text-base flex items-center gap-2">
										<Mail className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
										{user?.email || 'N/A'}
									</span>
								</div>
							</div>

							<div>
								<span className="text-neutral-500 dark:text-neutral-400 block text-xs mb-1">Phone Number</span>
								<p className="font-medium text-neutral-900 dark:text-white text-base flex items-center gap-2">
									<Phone className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
									{user?.phoneNumber || 'Not provided'}
								</p>
							</div>

							<div>
								<span className="text-neutral-500 dark:text-neutral-400 block text-xs mb-1">System Role</span>
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
									<Shield className="w-3.5 h-3.5" />
									{user?.role || 'user'}
								</span>
							</div>
						</div>
					</div>

					{/* Verification & Security */}
					<div className="bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 space-y-6 flex flex-col justify-between shadow-sm dark:shadow-none">
						<div className="space-y-6">
							<h2 className="text-lg font-semibold text-neutral-900 dark:text-white flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
								<Shield className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
								Verification Status
							</h2>

							<div className="space-y-4">
								<div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
									<span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Verification</span>
									{user?.isVerified?.email ? (
										<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
											<CheckCircle2 className="w-4 h-4" />
											Verified
										</span>
									) : (
										<div className="flex items-center gap-3">
											<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
												<XCircle className="w-4 h-4" />
												Unverified
											</span>
										</div>
									)}
								</div>

								<div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
									<span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone Verification</span>
									{user?.isVerified?.phone ? (
										<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
											<CheckCircle2 className="w-4 h-4" />
											Verified
										</span>
									) : (
										<span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 dark:text-neutral-500">
											<XCircle className="w-4 h-4" />
											Unverified
										</span>
									)}
								</div>
							</div>
						</div>

						{/* Danger Zone Actions */}
						<div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
							<button
								onClick={handleLogout}
								className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white hover:bg-neutral-100 dark:bg-transparent dark:hover:bg-neutral-900 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white font-medium text-sm transition-colors cursor-pointer"
							>
								<LogOut className="w-4 h-4" />
								Sign Out
							</button>

							<button
								onClick={onDeleteAccount}
								className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-red-200 dark:border-red-500/40 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-medium text-sm transition-colors cursor-pointer"
							>
								<Trash2 className="w-4 h-4" />
								Delete Account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
