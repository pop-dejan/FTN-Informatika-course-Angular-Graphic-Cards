import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardComment } from 'src/app/model/card-comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  comments: CardComment[] = [];

  commentForm = new FormGroup({
    author: new FormControl(""),
    text: new FormControl("")
  })

  @Output()
  newComment: EventEmitter<CardComment> = new EventEmitter();

  constructor() { } 

  ngOnInit(): void {
  }

  onSubmit(): void {
    let comment = new CardComment(this.commentForm.value)
    comment.date = new Date();
    this.newComment.emit(comment);
    this.commentForm.reset();
  }

}
