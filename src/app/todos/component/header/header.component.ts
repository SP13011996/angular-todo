import { Component } from "@angular/core";
import { TodosService } from "../../services/todo.service";

@Component({
    selector: 'app-todos-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(private todoservice: TodosService) {
    }

    text: string = ""
    changeText(event: Event) {
        const target = event.target as HTMLInputElement
        this.text = target.value
    }

    addTodo(): void {
        this.todoservice.addTodo(this.text)
        this.text = ""
    }
}