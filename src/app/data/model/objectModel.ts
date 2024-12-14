export interface IUser {
    email:string;
}

export interface IUserData extends IUser {
    name: string;
    mobile: string|null;
    addressInfo: Address;
}

export interface IUserAuth extends IUser {
    pass:string;
    token:string;
}

export interface IContext<T> {
    list: T[];
    emptyItem: T;

    saveOrUptade(item : T) : void;
    remove(item : T) : void;
    wipe() : void;
}

export interface ITable<T> {
    list: T[];
    tableContainer:HTMLElement;
    
    edit(item : T) : void;
    remove(item : T) : void;
}

export interface IModal<T> {
    current : T;
    modalContainer:HTMLElement;
    saveOrUptade(item : T) : void;
}


export class Address {
    address: string;
    city: string;
    state: string;
    postalCode:string;

    constructor(address: string, city: string,  state: string, postalCode: string) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

    toString() {
        return `${this.address}
        ${this.postalCode} - ${this.city}/${this.state}`;
    }
}

// usado por MemoryStore, para emular o comportamento do LocalStorage/SessionStorage
export interface IKeyValue {
    key: string;
    value: string;
}

export interface IStore {
    isEmpty() : void;
    clear() : void;
    set(key: string, data: any) : void;
    get<T>(key: string) : T|null;
}
