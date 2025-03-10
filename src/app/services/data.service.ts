import { Injectable } from "@angular/core";
import { Task } from "@models/task.model";
import { Worker } from "@models/worker.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private tasks: Task[] = [];
  private workers: Worker[] = [];

  constructor() {
    this.loadMockData();
  }

  loadMockData() {
    const mockTasks = [
      {
        id: 1,
        name: "Frontend Development",
        startdate: new Date("2024-01-01").getTime(),
        enddate: new Date("2024-02-15").getTime(),
        primarySkill: "ReactJS",
        secondarySkill: "TypeScript",
      },
      {
        id: 2,
        name: "Backend API",
        startdate: new Date("2024-01-10").getTime(),
        enddate: new Date("2024-03-10").getTime(),
        primarySkill: "NodeJS",
        secondarySkill: "Python",
      },
      {
        id: 3,
        name: "Database Migration",
        startdate: new Date("2024-02-01").getTime(),
        enddate: new Date("2024-03-15").getTime(),
        primarySkill: "SQL",
        secondarySkill: "MongoDB",
      },
      {
        id: 4,
        name: "Mobile App Development",
        startdate: new Date("2024-02-15").getTime(),
        enddate: new Date("2024-04-20").getTime(),
        primarySkill: "React Native",
        secondarySkill: "iOS",
      },
      {
        id: 5,
        name: "DevOps Pipeline Setup",
        startdate: new Date("2024-03-01").getTime(),
        enddate: new Date("2024-03-30").getTime(),
        primarySkill: "Docker",
        secondarySkill: "Kubernetes",
      }
    ];

    const mockWorkers = [
      {
        id: 1,
        name_surname: "John Smith",
        startdate: new Date("2024-01-05").getTime(),
        enddate: new Date("2024-04-15").getTime(),
        primarySkill: "ReactJS",
        secondarySkill: "TypeScript",
      },
      {
        id: 2,
        name_surname: "Alice Johnson",
        startdate: new Date("2024-01-10").getTime(),
        enddate: new Date("2024-02-28").getTime(),
        primarySkill: "NodeJS",
        secondarySkill: "Python",
      },
      {
        id: 3,
        name_surname: "Mike Wilson",
        startdate: new Date("2024-02-01").getTime(),
        enddate: new Date("2024-04-30").getTime(),
        primarySkill: "SQL",
        secondarySkill: "MongoDB",
      },
      {
        id: 4,
        name_surname: "Sarah Davis",
        startdate: new Date("2024-02-15").getTime(),
        enddate: new Date("2024-05-25").getTime(),
        primarySkill: "React Native",
        secondarySkill: "Docker",
      },
      {
        id: 5,
        name_surname: "David Brown",
        startdate: new Date("2024-03-01").getTime(),
        enddate: new Date("2024-03-30").getTime(),
        primarySkill: "Docker",
        secondarySkill: "Kubernetes",
      }
    ];

    this.tasks = mockTasks;
    this.workers = mockWorkers.map((w) => ({ ...w, priorityScore: 0 }));
  }

  getTasks() {
    return this.tasks;
  }
  getWorkers() {
    return this.workers;
  }
}
