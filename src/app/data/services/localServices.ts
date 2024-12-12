import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStore } from '../storage/localStore';
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class LocalServices implements IStore {
  constructor(public store : LocalStore) {}

  session   = new BehaviorSubject<any>(null);
  isBrowser = () => typeof window !== "undefined";
  isEmpty   = () => this.store.isEmpty() ? this.store.isEmpty() : true; 
  
  get<T>(key: string) 
  { 
    return this.isBrowser() ? this.store.get<T>(key) : null; 
  }  
  
  set(key: string, data: any) { 
    if (this.isBrowser()) {
      this.store.set(key, data);
    }
  }
  
  clear() {
    if (this.isBrowser()) {
      this.store.clear();
      this.session.next(null);
    }
  }
}
