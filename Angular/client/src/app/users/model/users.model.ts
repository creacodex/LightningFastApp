

export interface Users {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    emailConfirmed: boolean;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
}
