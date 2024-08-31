import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button } from '../button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag, Button],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tasks: { [key: string]: Task[] };

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks = this.taskService.tasks;
  }

  isEmpty() {
    let empty = true;
    Object.values(this.tasks).forEach((arr) => {
      if (arr.length > 0) empty = false;
    });

    return empty;
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    this.taskService.updateTaskStatus(event);
  }
}
