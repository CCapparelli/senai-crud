import { Injectable } from "@angular/core";
import { LocalStore } from "./localStore";
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class SessionStore extends LocalStore implements IStore {

    isEmpty = () => sessionStorage.length === 0;
    clear   = () => sessionStorage.clear();
    
    get<T>(key: string) {
      const value = sessionStorage.getItem(key);
      if (value) {
        const data: T = JSON.parse(value);
        return data;
      }
      return null;
    }
    set(key: string, data: any) {
      const value = JSON.stringify(data);
      sessionStorage.setItem(key, value);
    }
  }