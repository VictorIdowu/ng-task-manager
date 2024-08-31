import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSemanticModule } from 'ngx-semantic';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSemanticModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  taskForm: FormGroup;

  maxWordsValidator(maxWords: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';
      const wordCount = this.getLength(value);

      return wordCount > maxWords
        ? { maxWords: { maxWords, actualWords: wordCount } }
        : null;
    };
  }

  getLength(val: string) {
    return val.trim().split(/\s+/).length;
  }

  notTooLong() {
    return this.getLength(this.taskForm.controls['description'].value) > 15;
  }

  inputError(val: string) {
    return (
      this.taskForm.controls[val].invalid && this.taskForm.controls[val].touched
    );
  }

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, this.maxWordsValidator(15)]],
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.goToDashboard();
    }
  }
}
