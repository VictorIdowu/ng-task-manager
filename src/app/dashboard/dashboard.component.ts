import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Task, TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CdkDropList, CdkDrag],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tasks: { [key: string]: Task[] };

  constructor(private taskService: TaskService, private router: Router) {
    this.tasks = this.taskService.tasks;
  }

  onDrop(event: CdkDragDrop<Task[]>) {
    this.taskService.updateTaskStatus(event);
  }

  goToForm() {
    this.router.navigate(['/form']);
  }
}
