import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

enum Colors {
  GREY = "#E0E0E0",
  PINK = "#d8a8ff"
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})

export class RatingComponent  implements OnInit {

  @Input() control: FormControl;
  @Input() label: string;
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  rate(index:number){
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  getColor(index: number){
    if(this.isAboveRating(index)){
      return Colors.GREY;
    }
    switch (this.rating) {
      case 1:
      case 2:
        return Colors.PINK;
      case 3:
        return Colors.PINK;
      case 4:
      case 5:
        return Colors.PINK;
      default:
        return Colors.GREY;
    }
  }

}
