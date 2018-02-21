import { ToastsService } from './../../services/toastr.service';
import { Idea } from './../../models/Idea';
import { IdeasService } from './../../services/ideas.service';
import { Component, OnInit } from '@angular/core';
import {
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { DeleteDialogComponent } from '../../dialogs/deleteIdea/delete.dialog.component';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {
  numbers: number[];
  ideas: Idea.Get[] = [];
  newIdeaView = false;
  dataSource;
  temp = [];
  busy: Subscription;
  displayedColumns = [
    'content',
    'impact',
    'ease',
    'confidence',
    'avg',
    'done',
    'clear'
  ];

  constructor(
    private ideasService: IdeasService,
    private dialog: MatDialog,
    private toastsService: ToastsService
  ) {
    // generate numbers ease, impact and confidence selects
    this.numbers = new Array(10).fill(0).map((x, i) => i + 1);
  }

  ngOnInit() {
    this.getAllIdeas();
  }

  /**
   * Get all pages ideas
   *
   * @memberof IdeasComponent
   */
  getAllIdeas() {
    this.busy = this.ideasService.getAllIdeas().subscribe(
      response => {
        if (response.data) {
          this.temp.push.apply(this.temp, response.data);
        }
      },
      () => {
        this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
      },
      () => {
        const data = this.setEditVisibility(this.temp);
        const sorted = _.sortBy(data, 'average_score');

        this.dataSource = new MatTableDataSource(sorted);
        this.temp = [];
      }
    );
  }

  /**
   * Get Ideas from API
   *
   * @param {number} [page=1]
   * @memberof IdeasComponent
   */
  getIdeas(page = 1): void {
    this.ideasService.getIdeas(page).subscribe(
      (data: Idea.Get[]) => {
        data = this.setEditVisibility(data);

        this.dataSource = new MatTableDataSource(data);
      },
      () => {
        this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
      }
    );
  }

  /**
   *  Set visivility edit in new ideas from API
   *
   * @param {Idea.Body[]} ideas
   * @returns {Idea.Body[]}
   * @memberof IdeasComponent
   */
  setEditVisibility(ideas: Idea.Get[]): Idea.Get[] {
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
  createNewIdea(idea: Idea.Get): void {
    if (!idea.isEdit) {
      this.updateIdea(idea);
    } else {
      this.ideasService.createNewIdea(idea)
        .subscribe(
          data => {
            this.toastsService.success('ALERTS.SUCCESS', 'ALERTS.CREATED');
            this.getAllIdeas();
          },
          () => {
            this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
          }
        );
    }
  }

  /**
   * Delete single idea API
   *
   * @param {string} id
   * @memberof IdeasComponent
   */
  deleteIdea(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.ideasService.deleteIdea(id).subscribe(
          data => {
            this.toastsService.success('ALERTS.SUCCESS', 'ALERTS.DELETED');
            this.clearIdea(id, {});
          },
          () => {
            this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
          }
        );
      }
    });
  }

  /**
   * Update Idea API
   *
   * @param {Idea.Get} idea
   * @memberof IdeasComponent
   */
  updateIdea(idea: Idea.Get): void {
    this.ideasService.updateIdea(idea).subscribe(
      data => {
        this.toastsService.success('ALERTS.SUCCESS', 'ALERTS.UPDATED');
        // this.changeStatus(idea, false);
        this.getIdeas();
      },
      () => {
        this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
      }
    );
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
   *  Clear no API idea or change the status if needed
   *
   * @param {string} index
   * @param {string} id
   * @memberof IdeasComponent
   */
  clearIdea(index: string, row): void {
    // Change status, cancel update row
    if (row.id) {
      this.changeStatus(row, false);
    } else {
      // clear on the fly row
      this.dataSource.data.splice(index, 1);
      this.dataSource.filter = '';
    }
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
