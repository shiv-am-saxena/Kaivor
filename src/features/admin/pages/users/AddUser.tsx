import React, { useState } from 'react';
import { UserPlus, Mail, Phone, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import appToast from '../../../../components/toast';
import useAdmin from '../../hooks/useAdmin';

interface AddUserFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    role: 'user' | 'admin' | 'supplier';
    password: string;
    confirmPassword: string;
    isVerified: {
        email: boolean;
        phone: boolean;
    };
}

const AddUser: React.FC = () => {
    const navigate = useNavigate();
    const { addUser } = useAdmin();

    const [formData, setFormData] = useState<AddUserFormData>({
        fullName: '',
        email: '',
        phoneNumber: '',
        role: 'user',
        password: '',
        confirmPassword: '',
        isVerified: {
            email: false,
            phone: false
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            if (name === 'isEmailVerified') {
                setFormData((prev) => ({
                    ...prev,
                    isVerified: { ...prev.isVerified, email: checked }
                }));
            } else if (name === 'isPhoneVerified') {
                setFormData((prev) => ({
                    ...prev,
                    isVerified: { ...prev.isVerified, phone: checked }
                }));
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            appToast.error('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            await addUser({
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                role: formData.role,
                password: formData.password
            });
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                role: 'user',
                password: '',
                confirmPassword: '',
                isVerified: { email: false, phone: false }
            });
            navigate('/admin/users');
        } catch (error) {
            console.error('Failed to add user', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full space-y-6 max-w-7xl 2xl:max-w-384 4k:max-w-[2560px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl 2xl:text-4xl 4k:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Add New User
                    </h1>
                    <p className="text-xs sm:text-sm 2xl:text-base 4k:text-lg text-zinc-500 dark:text-zinc-400">
                        Create a new account and assign user permissions across the platform.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left 2 Columns: User Info */}
                    <div className="lg:col-span-2 space-y-6 bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <UserPlus className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Full Name */}
                            <div className="sm:col-span-2 space-y-2">
                                <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                                <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right 1 Column: Role & Status */}
                    <div className="space-y-6 bg-white dark:bg-zinc-950 p-6 sm:p-8 2xl:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs h-fit">
                        <h2 className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                            Role & Verification
                        </h2>

                        {/* Role Selector */}
                        <div className="space-y-2">
                            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Account Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 text-sm sm:text-base transition-all"
                            >
                                <option value="user">User (Customer)</option>
                                <option value="supplier">Supplier / Seller</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </div>

                        {/* Verifications */}
                        <div className="space-y-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                            <label className="block text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Initial Verification Status
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="isEmailVerified"
                                    checked={formData.isVerified.email}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    Mark Email as Verified
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="isPhoneVerified"
                                    checked={formData.isVerified.phone}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    Mark Phone as Verified
                                </span>
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-4 space-y-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-sm text-sm sm:text-base cursor-pointer"
                            >
                                {isSubmitting ? 'Creating User...' : 'Create User'}
                            </button>

                            <Link
                                to="/admin/users"
                                className="block w-full py-2.5 px-4 text-center rounded-xl border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm sm:text-base"
                            >
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUser;

