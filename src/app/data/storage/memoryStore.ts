import { Injectable } from '@angular/core';
import { IKeyValues } from '../model/objectModel';
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class MemoryStore implements IStore {
  private storage : IKeyValues[] = [];

  isEmpty = () => this.storage.length === 0;
  clear   = () => this.storage = [];
    
  get<T>(key: string) {
    const value = this.storage[key];
    if (value) {
      const data: T = JSON.parse(value);
      return data;
    }
    return null;
  }
  
  set(key: string, values: any[]) {
    const value = JSON.stringify(values);
    let result  = this.storage.filter(x => x.key === key)[0];
    if (result)
      this.storage[key] = value;
    else
      this.storage.push({key: key, values: value});
  }
}
