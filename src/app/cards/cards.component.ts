import { Component, OnInit } from '@angular/core';
import { CardComment } from '../model/card-comment.model';
import { CardList } from '../model/card-list.model';
import { Card } from '../model/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: CardList = new CardList();
  selectedCardId: number = -1;

  comments: CardComment[] = [];

  params = {
    page: 1,
    pageSize: 5
  }

  constructor(private service: CardsService) { }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(): void {
    this.service.getCards(this.params).subscribe({
      next: (cards: CardList) => {
        this.cards = cards
      },
      error: (err) => console.log(err)
    })
  }

  onPageChanged(newPage: number): void {
    this.params.page = newPage;
    this.getCards()
  }

  onPageSizeChanged(newPageSize: number): void {
    this.params.pageSize = newPageSize;
    this.params.page = 1;
    this.getCards()
  }

  onGradeChanged(newGrade: number, card: Card): void {
    card.grade = newGrade
    this.service.updateCard(card).subscribe({
      next: (card: Card) => {
        this.updateCardView(card)
      },
      error: (err) => console.log(err)
    })
  }

  updateCardView(card: Card): void {
    for (let i = 0; i < this.cards.results.length; i++) {
      if (this.cards.results[i]._id ==  card._id) {
        this.cards.results[i] = card
        return;
      }
    }
  }

  getComments(): void {
    this.service.getComments(this.selectedCardId).subscribe({
      next: (comments: CardComment[]) => {
        this.comments = comments;
      },
      error: (err) => console.log(err)
    })
  }

  onCardClicked(cardId: number): void {
    this.selectedCardId = cardId;
    this.getComments();
  }

  postComment(comment: CardComment): void {
    comment.cards = this.selectedCardId;
    this.service.postComment(this.selectedCardId, comment).subscribe({
      next: (comment: CardComment) => {
        this.comments.push(comment)
      },
      error: (err) => console.log(err)
    })
  }

}
