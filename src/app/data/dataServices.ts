import { Injectable, OnInit } from "@angular/core";
import { LocalServices } from "./services/localServices";
import { SessionServices } from "./services/sessionServices";
import { MemoryServices } from "./services/memoryServices";
import { IUserData } from "./model/objectModel";    
import { StateChangedEvent, StateChangedEventArgs } from "./model/events";

class Users { 
    data : IUserData[]|null = [];

    constructor(private event : StateChangedEvent) {}

    list = () => this.data;

    saveOrUpdate(user: IUserData): void {
        var x = this.data?.find((user) => user.email === user.email);
        if (x) 
            x = user;
        else 
            this.data?.push(user);

        this.event.raise.next(new StateChangedEventArgs('savedOrUpdated', user));
    }

    remove(user: IUserData) {
        var x = this.data?.find((user) => user.email === user.email);
        if (x) {
            const index = this.data?.indexOf(x);
            this.data?.slice(index, 1);

            this.event.raise.next(new StateChangedEventArgs('removed', user));
        }
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
    }
    
    ngOnInit(): void {
        this.users.data = this.localService.get<IUserData[]>(this.usersKey);
        this.event.raise.subscribe((args: StateChangedEventArgs) => {
            this.localService.set(this.usersKey, this.users.data);
            console.log(`Event: ${args.message} - User: ${JSON.stringify(args.data)}`);
        });
    }
}