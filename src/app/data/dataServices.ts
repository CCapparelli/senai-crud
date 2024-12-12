import { Injectable } from "@angular/core";
import { LocalServices } from "./services/localServices";
import { SessionServices } from "./services/sessionServices";
import { MemoryServices } from "./services/memoryServices";

@Injectable({providedIn: "root"})
export class DataServices {
    constructor(private localService : LocalServices,
                private memoryService : MemoryServices,
                private sessionService : SessionServices) {

    }
}