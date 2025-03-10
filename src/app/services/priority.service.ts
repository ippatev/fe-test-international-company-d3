import { Injectable } from "@angular/core";
import { Worker } from "@models/worker.model";
import { Task } from "@models/task.model";

@Injectable({
  providedIn: "root",
})
export class PriorityService {
  calculatePriority(worker: Worker, task: Task): number {
    let score = 0;

    // Первичный навык
    if (worker.primarySkill === task.primarySkill) score += 2;

    // Время
    const overlap = this.getIntervalOverlap(worker, task);
    if (overlap > 0) score += 1.5;

    // Вторичный навык
    if (worker.secondarySkill === task.primarySkill) score += 1;
    else if (worker.secondarySkill === task.secondarySkill) score += 0.5;

    return score;
  }

  getIntervalOverlap(worker: Worker, task: Task): number {
    const start: Date = new Date(Math.max(worker.startdate, task.startdate));
    const end: Date = new Date(Math.min(worker.enddate, task.enddate));
    return end > start ? end.getTime() - start.getTime() : 0;
  }
}
