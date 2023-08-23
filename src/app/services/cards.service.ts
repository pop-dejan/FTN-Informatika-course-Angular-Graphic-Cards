import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CardComment } from '../model/card-comment.model';
import { CardList } from '../model/card-list.model';
import { Card } from '../model/card.model';

const baseUrl = "http://localhost:3000/api/cards"

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  getCards(params?:any): Observable<CardList> {

    let options = {}

    if (params) {
      options = {
        params: new HttpParams()
          .set("page", params.page || "")
          .set("pageSize", params.pageSize || "")
      }
    }

    return this.http.get(baseUrl, options).pipe(map((data: any) => {
      return new CardList(data);
    }))
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put(`${baseUrl}/${card._id}`, card).pipe(map((data: any) => {
      return new Card(data);
    }))
  }

  getComments(cardId: number): Observable<CardComment[]> {
    return this.http.get(`${baseUrl}/${cardId}/comments`).pipe(map((data: any) => {
      return data && data.results && data.results.map((elem: any) => new CardComment(elem))
    }))
  }

  postComment(cardId: number, comment: CardComment): Observable<CardComment> {
    return this.http.post(`${baseUrl}/${cardId}/comments`, comment).pipe(map((data: any) => {
      return new CardComment(data);
    }))
  }
}
