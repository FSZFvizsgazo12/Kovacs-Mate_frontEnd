import { Injectable } from "@angular/core";
import { Article } from "../model/article";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class KosarService {
    public cartListRef: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

    constructor() {}

    public addToCart(item: Article): void {
        const currentCart = this.cartListRef.getValue();
        const existingItem = currentCart.find(article => article.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            currentCart.push(item);
        }
        this.cartListRef.next(currentCart);
    }

    public removeFromCart(key: string): void {
        const currentCart = this.cartListRef.getValue();
        const updatedCart = currentCart.filter(item => item.id !== key);
        this.cartListRef.next(updatedCart);
    }

    public clearCart(): void {
        this.cartListRef.next([]);
    }
}
