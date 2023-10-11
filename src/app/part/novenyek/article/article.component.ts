import { Component, Input } from "@angular/core";
import { Article } from "src/app/model/article";
import { Noveny } from "src/app/model/noveny";
import { BaseService } from "src/app/services/base.service";
import { KosarService } from "src/app/services/kosar.service";

@Component({
    selector: "app-article",
    templateUrl: "./article.component.html",
    styleUrls: ["./article.component.css"]
})
export class ArticleComponent {
    @Input() item: Noveny;
    public quantity: number = 1;

    constructor(private bs: BaseService, private cart: KosarService) {}

    public price(): number {
        const currentPrice = this.item.ar * this.quantity;
        return currentPrice;
    }

    addToCart(): void {
        const article: Article = {
            id: this.item.key,
            name: this.item.megnevezes,
            price: this.item.ar,
            quantity: this.quantity
        };
        this.cart.addToCart(article);
        this.quantity = 1;
    }
}
