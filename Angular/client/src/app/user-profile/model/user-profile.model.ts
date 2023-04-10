

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
}
