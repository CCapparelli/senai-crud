import { Injectable, OnInit } from "@angular/core";
import { LocalServices } from "./services/localServices";
import { SessionServices } from "./services/sessionServices";
import { MemoryServices } from "./services/memoryServices";
import { Address, IContext, IUserData } from "./model/objectModel";    
import { StateChangedEvent, StateChangedEventArgs } from "./model/events";

class Users { 
    list : IUserData[] = [];

    constructor(public stateChangedEvent : StateChangedEvent) {}
    
    empty = {email: '', name: '', mobile: '', addressInfo: new Address('','','','')};

    saveOrUpdate(user: IUserData): void {
        var i = this.list.findIndex((x) => x.email === user.email);
        if (i >= 0) 
            this.list[i] = user;
        else 
            this.list.push(user);

        this.stateChangedEvent.raise.next(new StateChangedEventArgs('savedOrUpdated', user));
    }

    remove(data: IUserData) {
        var i = this.list.findIndex((x) => x.email === data.email);
        this.list.splice(i, 1);

        this.stateChangedEvent.raise.next(new StateChangedEventArgs('removed', data));
    }

    wipe = () => this.list = [];
}


@Injectable({providedIn: "root"})
export class UserLocalContext implements OnInit, IContext<IUserData> {
    private usersKey : string = "users";
    public  users    : Users;
    public  list: IUserData[];
    public  emptyItem: IUserData;

    constructor(private localService : LocalServices,
                public stateChangedEvent : StateChangedEvent) {
        this.users = new Users(this.stateChangedEvent);
        this.list = this.users.list;
        this.emptyItem = this.users.empty;
        this.seedUsers();
    }

    saveOrUptade(item: IUserData): void {
        this.users.saveOrUpdate(item);
    }
    remove(item: IUserData): void {
        this.users.remove(item);
    }
    wipe(): void {
        throw new Error("Method not implemented. Users shouldn't be wiped");
    }
    
    ngOnInit(): void {
        var data = this.localService.get<IUserData[]>(this.usersKey);
        if (data)
            this.users.list = data;

        this.users.stateChangedEvent.raise.subscribe(this.OnStateChanged);
    }

    OnStateChanged(args: StateChangedEventArgs) {
        this.localService.set(this.usersKey, this.users.list);
        console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
    }

    seedUsers() {
        this.users.list?.push({email: 'user-1@acme.com', name: 'User One', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.users.list?.push({email: 'user-2@acme.com', name: 'User Two', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.users.list?.push({email: 'user-3@acme.com', name: 'User Three', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
    }
}