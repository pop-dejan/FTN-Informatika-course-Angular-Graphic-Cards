import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css']
})
export class ShowMoreComponent implements OnInit {

  @Input()
  text: string = ""

  @Input()
  textLength: number = 0

  displayText: string = ""
  showFull = false;

  constructor() { }

  ngOnInit(): void {
    this.displayText = this.text.substring(0, this.textLength) + "..."
  }

  onToggle(): void {
    this.showFull = !this.showFull
    if (this.showFull) {
      this.displayText = this.text
    } else {
      this.displayText = this.text.substring(0, this.textLength) + "..."
    }
  }

}
