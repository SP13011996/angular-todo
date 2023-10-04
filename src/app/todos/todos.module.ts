import { NgModule } from "@angular/core";
import { TodosComponent } from "./component/todos/todos.component";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./component/header/header.component";
import { TodosService } from "./services/todo.service";
import { MainComponent } from "./component/main/main.component";
import { CommonModule } from "@angular/common";
import { TodoComponent } from "./component/todo/todo.component";
import { FooterComponent } from "./component/footer/footer.component";

const routes: Routes = [
    {
        path: '',
        component: TodosComponent
    }
]

@NgModule({
    declarations: [TodosComponent, HeaderComponent, MainComponent, TodoComponent, FooterComponent],
    providers: [TodosService],
    imports: [RouterModule.forChild(routes), CommonModule]
})
export class TodoModule {

}