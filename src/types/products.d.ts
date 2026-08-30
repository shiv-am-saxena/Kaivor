export default interface IProductAdmin {
	_id?: string;
	status: boolean;
	title: string;
	description: string;
	inStock: boolean;
	amount: number;
	discount: number;
	supplierId: string;
	supplierEmail: string;
	assetLink: string;
	supplierCost: number;
	fabric: string;
	baseImage: string;
	tag: string[];
	variants: IVariant[];
	size: [string];
	createdAt: Date;
	updatedAt: Date;
}

export interface IVariant {
	_id?: string;
	hexCode: string;
	color: string;
	frontFace: string;
	backFace: string;
	frontFull: string;
	backFull: string;
}

export interface IProductUser {
	_id: string;
	status: boolean;
	title: string;
	description: string;
	inStock: boolean;
	amount: number;
	discount: number;
	baseImage: string;
	tag: string[];
	variants: IVariant[];
	size: [string];
}

export interface IProductSupplier {
	_id: string;
	status: boolean;
	title: string;
	inStock: boolean;
	supplierId: string;
	supplierEmail: string;
	assetLink: string;
	supplierCost: number;
	fabric: string;
	baseImage: string;
	variants: IVariant[];
	size: [string];
}
