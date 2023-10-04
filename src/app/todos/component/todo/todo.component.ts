import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from "@angular/core";
import { TodoInterface } from "../../types/todos.interface";
import { TodosService } from "../../services/todo.service";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit, OnChanges {
    @Input('todo') todoProps: TodoInterface | undefined
    @Input('isEditing') isEditingProps: boolean = false
    @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter()
    text: string = ""
    @ViewChild('textInput') textInput: ElementRef | undefined

    constructor(private todoservice: TodosService) {

    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes["isEditingProps"].currentValue) {
            setTimeout(() => { this.textInput!.nativeElement.focus() }, 0)

        }
    }

    removeTodo(): void {
        this.todoservice.removeTodo(this.todoProps!.id)
    }

    toggleTodo(): void {
        this.todoservice.toggleTodo(this.todoProps!.id)
    }

    changeText(event: Event): void {
        const value = (event.target as HTMLInputElement).value
        this.text = value
    }

    changeTodo(): void {
        this.todoservice.changeTodo(this.todoProps!.id, this.text)
        this.setEditingIdEvent.emit(null)
    }

    ngOnInit(): void {
        this.text = this.todoProps!.text
    }

    setTodoInEditMode(): void {
        this.setEditingIdEvent.emit(this.todoProps?.id)
    }

}