import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Task } from "@models/task.model";
import { Worker } from "@models/worker.model";
import { PriorityService } from "@services/priority.service";

@Component({
  selector: "app-worker-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./worker-list.component.html",
  styleUrls: ["./worker-list.component.css"],
})
export class WorkerListComponent implements OnInit {
  @Input() workers: Worker[] = [];
  @Input() task!: Task;

  constructor(
    private priorityService: PriorityService,
  ) {}

  ngOnInit(): void {
    this.workers = this.workers
      .map((worker) => ({
        ...worker,
        priorityScore: this.priorityService.calculatePriority(
          worker,
          this.task,
        ),
      }))
      .sort((a, b) => b.priorityScore - a.priorityScore);
  }

  getPriorityColor(score: number): string {
    if (score >= 8) return '#ffebee'; // высокий приоритет
    if (score >= 5) return '#fff3e0'; // средний приоритет
    return '#f1f8e9'; // низкий приоритет
  }

  getPriorityText(score: number): string {
    if (score >= 8) return 'Высокий';
    if (score >= 5) return 'Средний';
    return 'Низкий';
  }
}
