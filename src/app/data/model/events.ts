import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
  
export class StateChangedEventArgs {
    message: string;
    data: any;

    constructor (message: string, data: any) {  
        this.message = message;
        this.data = data;
    }
}
  
@Injectable({providedIn: 'root'})
export class StateChangedEvent {
    raise: Subject<StateChangedEventArgs> = new Subject();
  }