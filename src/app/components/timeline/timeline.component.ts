import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as d3 from "d3";
import { Task } from "@models/task.model";
import { Worker } from "@models/worker.model";
import { DataService } from "@services/data.service";
import { PriorityService } from "@services/priority.service";

@Component({
  selector: "app-timeline",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.css"],
})
export class TimelineComponent implements OnInit {
  @ViewChild('timelineSvg', { static: true }) timelineSvg!: ElementRef;
  private svg: any;
  private width = 1200;
  private height = 600;
  
  tasks: Task[] = [];

  constructor(
    private dataService: DataService,
    private priorityService: PriorityService,
  ) {}

  ngOnInit(): void {
    this.tasks = this.dataService.getTasks();
    
    this.svg = d3.select(this.timelineSvg.nativeElement)
      .attr("width", this.width)
      .attr("height", this.height);
      
    this.drawTimeline();
  }

  drawTimeline() {
    // Очищаем существующий SVG перед новой отрисовкой
    this.svg.selectAll("*").remove();
    
    const workers = this.dataService.getWorkers();

    // Преобразуем строки в объекты Date и находим минимальную и максимальную даты
    const minDate = d3.min(this.tasks, d => new Date(d.startdate));
    const maxDate = d3.max(this.tasks, d => new Date(d.enddate));

    // Добавим проверку на существование дат
    if (!minDate || !maxDate) {
        console.error('Invalid date range');
        return;
    }

    // Добавим небольшой отступ к диапазону дат (например, 1 день)
    const timeBuffer = 24 * 60 * 60 * 1000; // 1 день в миллисекундах
    const domainStart = new Date(minDate.getTime() - timeBuffer);
    const domainEnd = new Date(maxDate.getTime() + timeBuffer);

    const xScale = d3
        .scaleTime()
        .domain([domainStart, domainEnd])
        .range([50, this.width - 50]);

    const xAxis = d3.axisBottom(xScale);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height - 30})`)
      .call(xAxis);

    // Отрисовка всех задач
    this.tasks.forEach((task: Task, index: number) => {
      this.svg
        .append("rect")
        .attr("x", xScale(task.startdate))
        .attr("y", 50 + index * 30)
        .attr("width", xScale(task.enddate) - xScale(task.startdate))
        .attr("height", 20)
        .style("fill", "lightblue");

      // Отрисовка работников для каждой задачи
      workers.forEach((worker: Worker, workerIndex: number) => {
        const overlap = this.priorityService.getIntervalOverlap(worker, task);
        if (overlap > 0) {
          this.svg
            .append("rect")
            .attr("x", xScale(worker.startdate))
            .attr("y", 100 + index * 30 + workerIndex * 25)
            .attr("width", xScale(worker.enddate) - xScale(worker.startdate))
            .attr("height", 20)
            .style("fill", "#e0e0e0");
        }
      });
    });
  }
}
