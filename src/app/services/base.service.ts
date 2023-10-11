import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Noveny } from "../model/noveny";
import { Megrendeles } from "../model/megrendeles";

@Injectable({
    providedIn: "root"
})
export class BaseService {
    private novenyekRef: AngularFireList<Noveny>;
    private rendelesekRef: AngularFireList<Megrendeles>;

    constructor(private afDb: AngularFireDatabase) {
        this.novenyekRef = this.afDb.list("novenyek/");
        this.rendelesekRef = this.afDb.list("rendelesek/");
    }

    public getNovenyekList(): AngularFireList<Noveny> {
        this.novenyekRef = this.afDb.list("novenyek/");
        return this.novenyekRef;
    }

    public addOrder(item: Megrendeles): void {
        this.rendelesekRef.push(item);
    }
}
