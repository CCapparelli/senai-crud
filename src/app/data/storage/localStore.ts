import { Injectable } from "@angular/core";
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class LocalStore implements IStore {

  isEmpty = () => localStorage.length === 0;
  clear   = () => localStorage.clear();
    
  get<T>(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
      const data: T = JSON.parse(value);
      return data;
    }
    return null;
  }
  
  set(key: string, data: any) {
    const value = JSON.stringify(data);
    localStorage.setItem(key, value);
  }
}