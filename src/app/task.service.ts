import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'New Task' | 'In Progress' | 'Done';
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}

  tasks: { [key: string]: Task[] } = {
    'New Task': [],
    'In Progress': [],
    Done: [],
  };

  private nextId = 1;

  addTask(task: { title: string; description: string }) {
    const newTask: Task = { id: this.nextId++, ...task, status: 'New Task' };

    this.tasks['New Task'].push(newTask);
  }

  updateTaskStatus(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
