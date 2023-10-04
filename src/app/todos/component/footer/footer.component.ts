import { Component } from "@angular/core";
import { TodosService } from "../../services/todo.service";
import { Observable, combineLatest, filter, map } from "rxjs";
import { FilterEnum } from "../../types/filter.enums";

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodoClass$: Observable<boolean>
    activeCount$: Observable<number>
    activeCountText$: Observable<string>
    filter$: Observable<FilterEnum>

    filterEnum = FilterEnum

    changeFilter(event: Event, filter: FilterEnum): void {
        event.preventDefault()
        console.log(filter)
        this.todoservice.changeFilter(filter)
    }

    constructor(private todoservice: TodosService) {
        this.noTodoClass$ = this.todoservice.todos$.pipe(
            map((todos) => todos.length === 0)
        )
        this.activeCount$ = this.todoservice.todos$.pipe(
            map((todos) => todos.filter(todo => !todo.isCompleted).length)
        )
        this.activeCountText$ = this.activeCount$.pipe(
            map(todos => `item${(todos > 1 ? 's' : '')} left`)
        )
        this.filter$ = this.todoservice.filter$
    }
}