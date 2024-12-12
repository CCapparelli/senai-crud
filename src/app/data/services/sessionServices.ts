import { Injectable } from "@angular/core";
import { LocalServices } from './localServices';
import { SessionStore } from "../storage/sessionStore";
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class SessionServices extends LocalServices implements IStore {
  constructor(public store : SessionStore) 
  {
    super(store);
  }
}