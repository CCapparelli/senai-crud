import { Injectable } from "@angular/core";
import { IStore } from "../model/objectModel";
import { MemoryStore } from "../storage/memoryStore";

@Injectable({providedIn: "root"})
export class MemoryServices implements IStore {
  constructor(public store : MemoryStore) {}

  isEmpty   = () => this.store.isEmpty() ? this.store.isEmpty() : true; 
  
  get<T>(key: string) 
  { 
    return this.store.get<T>(key); 
  }  
  
  set(key: string, data: any) { 
    this.store.set(key, data);
}
  
  clear() {
    this.store.clear();
  }
}
