export interface IUser {
    email:string;
}

export interface IUserData extends IUser {
    name: string;
    mobile: string|null;
    address: Address|null;
}

export interface IUserAuth extends IUser {
    pass:string;
    token:string;
}

export class Address {
    address: string;
    city: string;
    state: string;

    constructor(address: string, city: string,  state: string) {
        this.address = address;
        this.city = city;
        this.state = state;
    }
}

export interface IKeyValues {
    key: string;
    values: string;
}

export interface IStore {
    isEmpty() : void;
    clear() : void;
    set(key: string, data: any) : void;
    get<T>(key: string) : T|null;
}
