export interface UserModel{
    id: number;
    name: string;
    username: string;
    address: Address;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}
export interface UserArrayModel {
    allUsers: UserModel[];
}
