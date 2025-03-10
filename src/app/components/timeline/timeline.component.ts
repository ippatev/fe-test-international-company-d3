import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
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
  @Input() task!: Task;
  @ViewChild('timelineSvg', { static: true }) timelineSvg!: ElementRef;
  private svg: any;
  private width = 1200;
  private height = 300;
  
  constructor(
    private dataService: DataService,
    private priorityService: PriorityService,
  ) {}

  ngOnInit(): void {
    this.svg = d3.select(this.timelineSvg.nativeElement)
      .attr("width", this.width)
      .attr("height", this.height);
      
    this.drawTimeline();
  }

  drawTimeline() {
    if (!this.task) return;

    this.svg.selectAll("*").remove();
    
    const workers = this.dataService.getWorkers();

    const timeBuffer = 24 * 60 * 60 * 1000; // 1 день
    const startDate = new Date(this.task.startdate);
    const endDate = new Date(this.task.enddate);
    const domainStart = new Date(startDate.getTime() - timeBuffer);
    const domainEnd = new Date(endDate.getTime() + timeBuffer);

    const xScale = d3
        .scaleTime()
        .domain([domainStart, domainEnd])
        .range([50, this.width - 50]);

    const xAxis = d3.axisBottom(xScale);
    this.svg
      .append("g")
      .attr("transform", `translate(0, ${this.height - 30})`)
      .call(xAxis);

    this.svg
      .append("rect")
      .attr("x", xScale(startDate))
      .attr("y", 50)
      .attr("width", xScale(endDate) - xScale(startDate))
      .attr("height", 20)
      .style("fill", "lightblue");

    workers.forEach((worker: Worker, index: number) => {
      const overlap = this.priorityService.getIntervalOverlap(worker, this.task);
      if (overlap > 0) {
        this.svg
          .append("rect")
          .attr("x", xScale(worker.startdate))
          .attr("y", 100 + index * 25)
          .attr("width", xScale(worker.enddate) - xScale(worker.startdate))
          .attr("height", 20)
          .style("fill", "#e0e0e0");
      }
    });
  }
}
