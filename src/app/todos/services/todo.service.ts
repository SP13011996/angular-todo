import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TodoInterface } from "../types/todos.interface";
import { FilterEnum } from "../types/filter.enums";

@Injectable()
export class TodosService {
    todos$ = new BehaviorSubject<TodoInterface[]>([])
    filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

    addTodo(text: string): void {
        const newTodo: TodoInterface = {
            id: Math.random().toString(16),
            text: text,
            isCompleted: false,
        }
        const updatedTodo = [...this.todos$.getValue(), newTodo]
        this.todos$.next(updatedTodo)
    }

    toggleAllTodos(isCompleted: boolean): void {
        const updatedTodo = this.todos$.getValue().map(
            (todo) => {
                return {
                    ...todo,
                    isCompleted: isCompleted
                }
            }
        )
        this.todos$.next(updatedTodo)
    }

    changeFilter(filter: FilterEnum): void {
        this.filter$.next(filter)
    }

    changeTodo(id: string, text: string) {
        const updatedTodo = this.todos$.getValue().map(
            (todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        text: text
                    }
                }
                return {
                    ...todo,

                }
            }
        )
        this.todos$.next(updatedTodo)
    }
    toggleTodo(id: string) {
        const updatedTodo = this.todos$.getValue().map(
            (todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isCompleted: !todo.isCompleted
                    }
                }
                return {
                    ...todo,

                }
            }
        )
        this.todos$.next(updatedTodo)
    }

    removeTodo(id: string) {
        const updatedTodo = this.todos$.getValue().filter(todo => todo.id != id)
        this.todos$.next(updatedTodo)
    }
}