import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Eye, FileText, Server, UserCheck, AlertCircle, ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
	const currentDate = new Date();
	const formattedEffectiveDate = currentDate.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const formattedMonthYear = currentDate.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric",
	});

	return (
		<div className="min-h-screen bg-[#fdf8f8] text-[#1c1b1b] font-sans pt-24 pb-20 px-5 md:px-[64px] selection:bg-[#000000] selection:text-[#ffffff]">
			<div className="max-w-[1000px] mx-auto">
				{/* Back Button */}
				<Link
					to="/"
					className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#444748] hover:text-[#000000] transition-colors mb-8"
				>
					<ArrowLeft className="h-4 w-4" /> Back to Storefront
				</Link>

				{/* Page Header */}
				<div className="border-b border-[#c4c7c7]/20 pb-8 mb-10">
					<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1edec] text-[#444748] text-xs font-semibold uppercase tracking-widest mb-4">
						<ShieldCheck className="h-3.5 w-3.5 text-black" />
						Legal & Compliance
					</div>
					<h1 className="text-3xl md:text-5xl font-medium tracking-tight text-[#000000]">
						Privacy Policy
					</h1>
					<p className="text-sm md:text-base text-[#444748] mt-3">
						Effective Date: {formattedEffectiveDate} | Last Updated: {formattedMonthYear}
					</p>
					<p className="text-xs md:text-sm text-[#444748] mt-1 italic">
						Compliant with the Digital Personal Data Protection (DPDP) Act 2023, Information Technology (IT) Act 2000, and Consumer Protection (E-Commerce) Rules 2020 of India.
					</p>
				</div>

				{/* Quick Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="bg-[#f7f3f2] p-6 rounded-[16px] border border-[#c4c7c7]/10">
						<Lock className="h-6 w-6 text-black mb-3" />
						<h3 className="font-semibold text-base mb-1">Data Encryption</h3>
						<p className="text-xs text-[#444748]">
							All personal information, payment tokens, and addresses are secured via 256-bit SSL encryption.
						</p>
					</div>
					<div className="bg-[#f7f3f2] p-6 rounded-[16px] border border-[#c4c7c7]/10">
						<Eye className="h-6 w-6 text-black mb-3" />
						<h3 className="font-semibold text-base mb-1">No Data Selling</h3>
						<p className="text-xs text-[#444748]">
							Kaivor does not monetize, sell, or rent your personal data to third-party data brokers.
						</p>
					</div>
					<div className="bg-[#f7f3f2] p-6 rounded-[16px] border border-[#c4c7c7]/10">
						<UserCheck className="h-6 w-6 text-black mb-3" />
						<h3 className="font-semibold text-base mb-1">User Control & Consent</h3>
						<p className="text-xs text-[#444748]">
							Under Indian DPDP law, you maintain full right to request access, correction, or erasure of your personal data.
						</p>
					</div>
				</div>

				{/* Detailed Content */}
				<div className="space-y-10 text-sm md:text-base leading-relaxed text-[#1c1b1b]">
					{/* Section 1 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000] flex items-center gap-2">
							<FileText className="h-5 w-5" /> 1. Overview & Scope
						</h2>
						<p className="text-[#444748]">
							Kaivor Apparel Company ("Kaivor", "We", "Us", or "Our") is committed to safeguarding your privacy when you visit our website, mobile interface, or make purchases on our platform. This Privacy Policy governs the collection, processing, storage, and transfer of personal data collected from users ("You" or "Customer") residing in India and internationally.
						</p>
						<p className="text-[#444748]">
							By using Kaivor, you explicitly consent to the data practices described in this Privacy Policy in compliance with Section 43A of the Information Technology Act, 2000, Rule 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and the Digital Personal Data Protection Act, 2023.
						</p>
					</section>

					{/* Section 2 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000]">
							2. Information We Collect
						</h2>
						<p className="text-[#444748]">
							To fulfill e-commerce transactions and enhance customer experience, we collect the following categories of personal information:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-[#444748]">
							<li>
								<strong className="text-[#000000]">Identity & Contact Data:</strong> Full name, shipping address, billing address, phone number, and email address.
							</li>
							<li>
								<strong className="text-[#000000]">Transaction & Financial Tokens:</strong> Payment mode details, transaction references, order history, invoice records, and GST details (where applicable for B2B transactions). <em>(Note: Sensitive card details & UPI credentials are processed securely through RBI-registered payment aggregators and are never stored on Kaivor servers.)</em>
							</li>
							<li>
								<strong className="text-[#000000]">Technical & Browsing Data:</strong> IP address, device type, browser specifications, operating system, time zone, and cookie identifiers.
							</li>
							<li>
								<strong className="text-[#000000]">Customer Support Interactions:</strong> Communication logs, feedback, support tickets, and chat records.
							</li>
						</ul>
					</section>

					{/* Section 3 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000]">
							3. Purpose & Legal Basis for Data Processing
						</h2>
						<p className="text-[#444748]">
							We process your data strictly for legitimate business purposes under legal obligations:
						</p>
						<div className="bg-[#f1edec] p-6 rounded-[16px] space-y-3 text-xs md:text-sm text-[#444748]">
							<p>• <strong>Order Processing & Logistics:</strong> Verifying payment, dispatching shipments via courier partners, sending order status updates via SMS/WhatsApp/Email.</p>
							<p>• <strong>Legal & Tax Compliance:</strong> Issuing tax-compliant invoices in adherence to Indian Goods and Services Tax (GST) laws and Consumer Protection (E-Commerce) Rules, 2020.</p>
							<p>• <strong>Fraud Prevention & Security:</strong> Preventing unauthorized transactions, cyber incidents, or fraudulent returns.</p>
							<p>• <strong>Consensual Marketing:</strong> Sending promotional drops, seasonal collections, or newsletters only when explicit consent is provided.</p>
						</div>
					</section>

					{/* Section 4 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000]">
							4. Data Sharing & Third-Party Partners
						</h2>
						<p className="text-[#444748]">
							We only share essential customer data with trusted third-party service providers bound by strict data protection agreements:
						</p>
						<ul className="list-disc pl-6 space-y-2 text-[#444748]">
							<li>
								<strong className="text-[#000000]">Logistics & Delivery Logistics:</strong> Courier partners (e.g., Delhivery, BlueDart, Xpressbees) to ensure doorstep order fulfillment.
							</li>
							<li>
								<strong className="text-[#000000]">Payment Aggregators:</strong> RBI-compliant payment gateways (e.g., Razorpay, Cashfree, PhonePe) for secure online payment processing.
							</li>
							<li>
								<strong className="text-[#000000]">Legal & Regulatory Authorities:</strong> Government bodies or law enforcement authorities upon receiving mandatory legal notices under Indian jurisdiction.
							</li>
						</ul>
					</section>

					{/* Section 5 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000] flex items-center gap-2">
							<Server className="h-5 w-5" /> 5. Data Retention & Storage
						</h2>
						<p className="text-[#444748]">
							Your personal data is stored securely within ISO 27001 compliant cloud servers located in Indian data centers. We retain personal information only for as long as required to fulfill order warranties, resolve disputes, and satisfy statutory tax retention obligations mandated under Indian law (typically up to 7 years for financial records).
						</p>
					</section>

					{/* Section 6 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000]">
							6. Your Rights Under DPDP Act 2023
						</h2>
						<p className="text-[#444748]">
							As a Data Principal under the Digital Personal Data Protection (DPDP) Act 2023, you hold the following statutory rights:
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 rounded-[12px] bg-white border border-[#c4c7c7]/20">
								<h4 className="font-semibold text-black">Right to Access & Summary</h4>
								<p className="text-xs text-[#444748] mt-1">Request a summary of personal data being processed by Kaivor.</p>
							</div>
							<div className="p-4 rounded-[12px] bg-white border border-[#c4c7c7]/20">
								<h4 className="font-semibold text-black">Right to Correction & Erasure</h4>
								<p className="text-xs text-[#444748] mt-1">Request correction of inaccurate data or deletion of unrequired data.</p>
							</div>
							<div className="p-4 rounded-[12px] bg-white border border-[#c4c7c7]/20">
								<h4 className="font-semibold text-black">Right of Grievance Redressal</h4>
								<p className="text-xs text-[#444748] mt-1">Access readily available grievance mechanism for privacy complaints.</p>
							</div>
							<div className="p-4 rounded-[12px] bg-white border border-[#c4c7c7]/20">
								<h4 className="font-semibold text-black">Right to Withdraw Consent</h4>
								<p className="text-xs text-[#444748] mt-1">Withdraw consent for marketing communications at any time.</p>
							</div>
						</div>
					</section>

					{/* Section 7 */}
					<section className="space-y-3">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000] flex items-center gap-2">
							<AlertCircle className="h-5 w-5" /> 7. Grievance Officer Contact Details
						</h2>
						<p className="text-[#444748]">
							In accordance with the Information Technology Act 2000 and Rule 5(9) of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the contact details of our Nodal Grievance Officer are provided below:
						</p>
						<div className="bg-[#f7f3f2] p-6 rounded-[16px] border border-[#c4c7c7]/20 space-y-2 text-sm text-[#1c1b1b]">
							<p><strong>Grievance Officer:</strong> Legal & Compliance Officer</p>
							<p><strong>Entity Name:</strong> Kaivor Apparel Company India Pvt. Ltd.</p>
							<p><strong>Email Address:</strong> <a href="mailto:privacy@kaivor.com" className="underline font-medium text-black">privacy@kaivor.com</a></p>
							<p><strong>Response Turnaround Time:</strong> Acknowledged within 24 hours and resolved within 15 working days as per Indian statutory norms.</p>
						</div>
					</section>

					{/* Section 8 */}
					<section className="space-y-3 border-t border-[#c4c7c7]/20 pt-8">
						<h2 className="text-xl md:text-2xl font-medium text-[#000000]">
							8. Updates to This Policy
						</h2>
						<p className="text-[#444748]">
							Kaivor reserves the right to amend or update this Privacy Policy periodically to reflect changes in legal mandates or e-commerce operations. Any modifications will be posted on this page with an updated "Last Updated" timestamp.
						</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default PrivacyPolicy;