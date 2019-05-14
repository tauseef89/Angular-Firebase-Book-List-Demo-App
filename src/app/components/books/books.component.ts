import { Component, OnInit } from '@angular/core';

import { BookService } from '../../services/book.service';

import { Book } from '../../models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  editState: boolean = false;
  bookToEdit: Book;

  constructor(public bookService: BookService ) { }

  ngOnInit() {
    
    this.bookService.getBooks().subscribe(books => {

      this.books = books;
      
    });

  }

  deleteBook(event, book: Book){

    this.bookService.deleteBook(book);

  }

  editBook(event, book: Book){
    this.editState = true;
    this.bookToEdit = book;
  }

  updateBook(book: Book){
    this.bookService.updateBook(book);
  }

}
