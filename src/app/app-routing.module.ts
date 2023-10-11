import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RolunkComponent } from "./part/rolunk/rolunk.component";
import { NovenyekComponent } from "./part/novenyek/novenyek.component";
import { RendelesComponent } from "./part/rendeles/rendeles.component";

const routes: Routes = [
    { path: "rolunk", component: RolunkComponent },
    { path: "novenyek", component: NovenyekComponent },
    { path: "rendeles", component: RendelesComponent },
    { path: "", redirectTo: "/rolunk", pathMatch: "full" },
    { path: "**", redirectTo: "/rolunk", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
