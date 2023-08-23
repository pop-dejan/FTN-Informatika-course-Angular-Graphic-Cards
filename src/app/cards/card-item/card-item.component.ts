import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/model/card.model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {

  @Input()
  card: Card = new Card();

  @Output()
  gradeChange: EventEmitter<number> = new EventEmitter();

  @Output()
  cardClick: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onGradeChange(newGrade: number): void {
    this.gradeChange.emit(newGrade)
  }

  onCardClicked(cardId: number): void {
    this.cardClick.emit(cardId);
  }

}
