import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { Noveny } from "src/app/model/noveny";
import { BaseService } from "src/app/services/base.service";

@Component({
    selector: "app-novenyek",
    templateUrl: "./novenyek.component.html",
    styleUrls: ["./novenyek.component.css"]
})
export class NovenyekComponent implements OnInit {
    public currentList: Noveny[] = [];
    public plantListRef: Noveny[] = [];
    public searchText: string = "";

    constructor(private bs: BaseService) {}

    ngOnInit(): void {
        this.getList();
    }

    private getList(): void {
        this.bs
            .getNovenyekList()
            .snapshotChanges()
            .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
            .subscribe({
                next: data => {
                    this.plantListRef = data;
                    this.currentList = this.plantListRef;
                },
                error: error => console.log(error.message)
            });
    }

    public filterList(): void {
        if (this.searchText !== "") {
            this.currentList = this.plantListRef.filter(result =>
                result.megnevezes.toLowerCase().includes(this.searchText.toLowerCase())
            );
        } else this.currentList = this.plantListRef;
    }

    public clear(): void {
        this.searchText = "";
        this.currentList = this.plantListRef;
    }
}
