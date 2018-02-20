import { Idea } from './../../models/Idea';
import { IdeasService } from './../../services/ideas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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

  displayedColumns = [
    'content',
    'impact',
    'ease',
    'confidence',
    'avg',
    'done',
    'clear'
  ];

  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private ideasService: IdeasService) {
    // generate numbers array
    this.numbers = new Array(10).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
    this.getIdeas();
  }

  /**
   * Get Ideas
   *
   * @param {number} [page=1]
   * @memberof IdeasComponent
   */
  getIdeas(page = 1): void {
    this.ideasService.getIdeas(page)
      .subscribe((data: Idea.Get[]) => {
        data = this.setEditVisibility(data);

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    });
  }

  /**
   *  Set visivility edit in new ideas from API
   *
   * @param {Idea.Body[]} ideas
   * @returns {Idea.Body[]}
   * @memberof IdeasComponent
   */
  setEditVisibility(ideas: Idea.Body[]): Idea.Body[] {
    for (let index = 0; index < ideas.length; index++) {
      const element = ideas[index];
      element.isEdit = false;
    }

    return ideas;
  }

  /**
   * Create new Idea API
   *
   * @param {Idea.Body} idea
   * @memberof IdeasComponent
   */
  createNewIdea(idea: Idea.Body): void {
    if (!idea.isEdit) {
      this.updateIdea(idea);
    } else {
      this.ideasService.createNewIdea(idea)
        .subscribe(data => {
          console.log(data);
          // this.changeStatus(idea, false);
          this.getIdeas();
        });
    }
  }

  /**
   * Delete single idea API
   *
   * @param {string} id
   * @memberof IdeasComponent
   */
  deleteIdea(id: string): void {
    this.ideasService.deleteIdea(id)
      .subscribe(data => {
        console.log(data);
      });
  }

  /**
   * Update Idea API
   *
   * @param {Idea.Get} idea
   * @memberof IdeasComponent
   */
  updateIdea(idea: Idea.Get): void {
    this.ideasService.updateIdea(idea)
      .subscribe(data => {
        // this.changeStatus(idea, false);
        this.getIdeas();
      });
  }

  /**
   * Push new empty idea to table
   *
   * @memberof IdeasComponent
   */
  addNewIdea(): void {
    const newIdea: Idea.Body = {
      content: '',
      impact: 10,
      ease: 10,
      confidence: 10,
      average_score: 10,
      isEdit: true
    };

    this.dataSource.data.unshift(newIdea);
    this.dataSource.filter = '';
  }

  /**
   *  Clear no API idea
   *
   * @param {string} index
   * @memberof IdeasComponent
   */
  clearIdea(index: string): void {
    this.dataSource.data.splice(index, 1);
    this.dataSource.filter = '';
  }

  /**
   * Change status isEdit in order to show form static or not
   *
   * @param {Idea.Get} row
   * @param {boolean} status
   * @memberof IdeasComponent
   */
  changeStatus(row: Idea.Get, status: boolean): void {
    for (const key in this.dataSource.data) {
      if (this.dataSource.data.hasOwnProperty(key)) {
        const element = this.dataSource.data[key];
        if (element.id === row.id) {
          element.isEdit = status;
        }
      }
    }
  }
}
