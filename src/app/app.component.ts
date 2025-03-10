import { Component, NO_ERRORS_SCHEMA, OnInit } from "@angular/core";
import { DataService } from "@services/data.service";
import { Task } from "@models/task.model";
import { CommonModule } from "@angular/common";
import { TimelineComponent } from "@components/timeline/timeline.component";
import { WorkerListComponent } from "@components/worker-list/worker-list.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, FormsModule, TimelineComponent, WorkerListComponent],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  tasks;
  selectedTask: Task | null = null;

  constructor(public dataService: DataService) {
    this.tasks = this.dataService.getTasks();
  }

  onSelectTask(task: Task): void {
    this.selectedTask = task;
  }
}
