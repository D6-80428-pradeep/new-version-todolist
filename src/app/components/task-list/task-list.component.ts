import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { PointsService } from '../../services/points.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService,private pointsService: PointsService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
  generateNewId(): string {
    if (this.tasks.length > 0) {
      // Find the maximum ID value, parse it as an integer, increment by 1, and convert it back to a string
      const maxId = Math.max(...this.tasks.map(task => parseInt(task.id, 10)));
      return (maxId + 1).toString();
    } else {
      // If no tasks, return '1'
      return '1';
    }
  }
  

  addTask(): void {
    
    const newTask: Task = { id: this.generateNewId() , title: this.newTaskTitle, date: new Date().toISOString().split('T')[0], completed: false };
    this.taskService.addTask(newTask).subscribe(task => this.tasks.push(task));
    this.newTaskTitle = '';
   
    
  }
  markAsCompleted(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task).subscribe();
    this.pointsService.addPoint();
    
  }
  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask).subscribe(task => this.tasks.push(task));
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    
  }

  editTask(id: string) {
     
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => 
      {this.tasks = this.tasks.filter(task => task.id !== id);}
  );
 

  }
}
