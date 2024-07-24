import { Component, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todoValue : string = '';
  

  todoList: Todo[] = [
    { content: "tâche 1", id: 1, value: false },
    { content: "Tâche 2", id: 2, value: false },
    { content: "Tâche 3", id: 3, value: false }
  ];

  finishedList: Todo[] = [];
  constructor(private modalService: NgbModal) { }

  changeTodo(i: number) {
    const item = this.todoList.splice(i, 1);
    console.log(item)
    this.finishedList.push(item[0]);
    
  }
 
  addTodo() {
    if (this.todoValue !== '') {
      this.todoList.push({
        content: this.todoValue,
        id: this.todoList.length + 1,
        value: false
      });
      this.todoValue = '';
    }
  }

  changeFinished(i: number) {
    const item = this.finishedList.splice(i, 1);
    this.todoList.push(item[0]);
  }

  openModal(content: TemplateRef<Element>, i: number, type: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        if (result) {
          if (type === 'todoList') {
            this.todoList.splice(i, 1);
          } else {
            this.finishedList.splice(i, 1);
          }
        }
      
    })
  }
}


