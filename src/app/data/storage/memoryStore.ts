import { Injectable } from '@angular/core';
import { IKeyValue } from '../model/objectModel';
import { IStore } from "../model/objectModel";

@Injectable({providedIn: "root"})
export class MemoryStore implements IStore {
  private storage : IKeyValue[] = [];

  isEmpty = () => this.storage.length === 0;
  clear   = () => this.storage = [];
    
  get<T>(key: string) {
    let result  = this.storage.filter(x => x.key === key)[0];
    if (result) {
      const data: T = JSON.parse(result.value);
      return data;
    }
    return null;
  }
  
  set(key: string, values: any[]) {
    const value = JSON.stringify(values);
    let result  = this.storage.filter(x => x.key === key)[0];
    if (result)
      result.value = value;
    else
      this.storage.push({key: key, value: value});
  }
}
