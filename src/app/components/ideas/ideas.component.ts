import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  numbers;
  impact = 10;
  ease = 10;
  confidence = 10;
  average: number;

  constructor() {
    // generate numbers array
    this.numbers = new Array(11).fill(0).map((x, i) => i);
  }

  ngOnInit() {}
}
