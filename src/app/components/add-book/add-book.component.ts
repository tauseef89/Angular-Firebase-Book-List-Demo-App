import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service';

import { Book } from '../../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Book = {
    title: '',
    description: ''
  }

  constructor(public bookService: BookService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.book.title != '' && this.book.description != ''){
      this.bookService.addBook(this.book);
      this.book.title ='';
      this.book.description = '';

    }
  }

}
