import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

const components = [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
];

@NgModule({
    declarations: [components],
    imports: [CommonModule, RouterModule],
    exports: [components]
})
export class SharedModule {

}