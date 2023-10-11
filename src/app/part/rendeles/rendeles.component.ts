import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Article } from "src/app/model/article";
import { Megrendeles } from "src/app/model/megrendeles";
import { BaseService } from "src/app/services/base.service";
import { KosarService } from "src/app/services/kosar.service";

@Component({
    selector: "app-rendeles",
    templateUrl: "./rendeles.component.html",
    styleUrls: ["./rendeles.component.css"]
})
export class RendelesComponent {
    public cartList = [];
    public customerName: string = "";
    public customerAddress: string = "";
    public error: boolean = false;
    private currentDate = new Date().toLocaleDateString();

    constructor(private cart: KosarService, private bs: BaseService, private router: Router) {}

    ngOnInit(): void {
        this.cart.cartListRef.subscribe(data => (this.cartList = data));
    }

    public price(id: string): number {
        const article: Article[] = this.cartList.filter(item => item.id === id);
        return article[0].price * article[0].quantity;
    }

    public totalPrice(): number {
        let price: number = 0;
        this.cartList.forEach(item => {
            price += item.price * item.quantity;
        });
        return price;
    }

    public removeFromCart(id: string): void {
        this.cart.removeFromCart(id);
    }

    public placeOrder(): void {
        const order: Megrendeles = {
            status: false,
            megrendeloNeve: this.customerName,
            megrendeloCime: this.customerAddress,
            lista: this.cartList,
            datum: this.currentDate
        };

        if (this.customerName !== "" && this.customerAddress !== "") {
            this.bs.addOrder(order);
            this.cart.clearCart();
            this.router.navigate(["/rolunk"]);
            this.error = false;
        } else {
            this.error = false;
        }
    }
}
