import { Link } from "react-router-dom";
import { toast } from "sonner";

const appToast = {
	success: (title: string, description?: string) => {
		toast.success(() => {
			return (
				<div>
					<strong className="text-black">{title}</strong>
					{description && (
						<p className="text-black">{description}</p>
					)}
				</div>
			);
		});
	},
	error: (title: string, description?: string, link?:string, label?:string) => {
		toast.error(() => {
			return (
				<div>
					<strong className="text-black">{title}</strong>
					{description && (
						<p className="text-black">{description}</p>
					)}
					{link && label && (
						<Link to={link} className="text-black">{label}</Link>
					)}
				</div>
			);
		});
	}
};

export default appToast;