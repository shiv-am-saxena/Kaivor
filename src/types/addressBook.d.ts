export interface IUserAddressBook {
	_id: string; // Unique identifier for the address book entry
	name: string; // Name associated with the address book entry
	phoneNumber: string; // Phone number associated with the address book entry
	address: {
		type: "home" | "work" | "other"; // Type of address (e.g., home, work)
		location?: {
			longitude: number; // Longitude coordinate of the address
			latitude: number; // Latitude coordinate of the address
		};
		street: string; // Street address
		city: string; // City of the address
		state: string; // State of the address
		postalCode: string; // Postal code of the address
		country: string; // Country of the address
	};
}
