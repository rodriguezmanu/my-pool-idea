import { Idea } from './../../models/Idea';
import { IdeasService } from './../../services/ideas.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  numbers: number[];
  ideas: Idea.Get[] = [];
  pages: number;
  impact = 10;
  ease = 10;
  confidence = 10;
  average: number;
  newIdeaView = false;

  constructor(private ideasService: IdeasService) {
    // generate numbers array
    this.numbers = new Array(10).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
    this.getIdeas();
  }

  getIdeas(page = 1) {
    this.ideasService.getIdeas(1)
      .subscribe((data: Idea.Get[]) => {
        this.ideas = data;
      });
  }

  createNewIdea(idea) {
    this.ideasService.createNewIdea(idea)
      .subscribe(data => {
        console.log(data);
      });
  }

  deleteIdea(id) {
    this.ideasService.deleteIdea(id)
      .subscribe(data => {
        console.log(data);
      });
  }

  updateIdea(idea) {
    this.ideasService.updateIdea(idea)
      .subscribe(data => {
        console.log(data);
      });
  }

  addNewIdea() {
    this.newIdeaView = true;
  }

}
