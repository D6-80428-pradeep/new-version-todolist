import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-task',
  standalone: true,
  imports: [CommonModule,DatePipe],
  templateUrl: './upcoming-task.component.html',
  styleUrl: './upcoming-task.component.css'
})
export class UpcomingTaskComponent implements OnInit {
  upcomingTasks: { title: string, dueDate: Date }[] = [
    { title: 'Task 1', dueDate: new Date('2024-07-18T09:00:00') },
    { title: 'Task 2', dueDate: new Date('2024-07-19T14:30:00') },
    { title: 'Task 3', dueDate: new Date('2024-07-20T10:00:00') },
    { title: 'Task 4', dueDate: new Date('2024-07-21T16:00:00') },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
