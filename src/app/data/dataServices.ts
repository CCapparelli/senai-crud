import { Injectable, OnInit } from "@angular/core";
import { LocalServices } from "./services/localServices";
import { SessionServices } from "./services/sessionServices";
import { MemoryServices } from "./services/memoryServices";
import { Address, IUserData } from "./model/objectModel";    
import { StateChangedEvent, StateChangedEventArgs } from "./model/events";

class Users { 
    data : IUserData[]|null = [];

    constructor(private event : StateChangedEvent) {}
    
    empty = {email: '', name: '', mobile: '', addressInfo: new Address('','','','')};
    list  = () => this.data;

    saveOrUpdate(user: IUserData): void {
        if (!this.data) return;

        var i = this.data.findIndex((x) => x.email === user.email);
        if (i >= 0) 
            this.data[i] = user;
        else 
            this.data.push(user);

        this.event.raise.next(new StateChangedEventArgs('savedOrUpdated', user));
    }

    remove(data: IUserData) {
        if (!this.data) return;
        var i = this.data.findIndex((x) => x.email === data.email);
        this.data.splice(i, 1);
        this.event.raise.next(new StateChangedEventArgs('removed', data));
    }
}


@Injectable({providedIn: "root"})
export class DataServices implements OnInit {
    private usersKey : string = "users";
    public  users    : Users;
    
    constructor(private localService : LocalServices,
                private memoryService : MemoryServices,
                private sessionService : SessionServices,
                private event : StateChangedEvent) {
        this.users = new Users(this.event);
        this.seedUsers();
    }
    
    ngOnInit(): void {
        this.users.data = this.localService.get<IUserData[]>(this.usersKey);
        this.event.raise.subscribe((args: StateChangedEventArgs) => {
            this.localService.set(this.usersKey, this.users.data);
            console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
        });
    }

    seedUsers() {
        this.users.data?.push({email: 'user-1@acme.com', name: 'User One', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.users.data?.push({email: 'user-2@acme.com', name: 'User Two', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
        this.users.data?.push({email: 'user-3@acme.com', name: 'User Three', mobile: '61 99999 9999', addressInfo: new Address('Rua Direita, 1','São Paulo','SP','70000-000')})
    }
}