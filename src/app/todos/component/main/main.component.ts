import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { TodosService } from "../../services/todo.service";
import { Observable, combineLatest, filter, map } from "rxjs";
import { TodoInterface } from "../../types/todos.interface";
import { FilterEnum } from "../../types/filter.enums";

@Component({
    selector: 'app-todos-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit, OnChanges {
    visibletodos$: Observable<TodoInterface[]>
    noTodoClass$: Observable<boolean>
    isAllTodosSelected$: Observable<boolean>
    editingId: string | null = null

    setEditingId(editingId: string | null) {
        this.editingId = editingId
    }

    ngOnInit() {
        console.log("ngOnInit()")
    }



    toggleAllTodos(event: Event): void {
        var target = event.target as HTMLInputElement
        this.todoservice.toggleAllTodos(target.checked)
    }

    constructor(private todoservice: TodosService) {
        this.isAllTodosSelected$ = this.todoservice.todos$.pipe(
            map((todos) => todos.every(todo => todo.isCompleted))
        )
        this.noTodoClass$ = this.todoservice.todos$.pipe(
            map((todos) => todos.length === 0)
        )
        this.visibletodos$ = combineLatest(this.todoservice.todos$, this.todoservice.filter$).
            pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
                if (filter == FilterEnum.active) {

                    return todos.filter((val) => {
                        return !val.isCompleted
                    })
                }
                else if (filter == FilterEnum.completed) {
                    return todos.filter((val) => {
                        return val.isCompleted
                    })
                }

                return todos
            }))
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log("ngOnChanges()")
    }


}