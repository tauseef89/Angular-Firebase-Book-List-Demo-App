import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Observable<Book[]>;

  bookDoc: AngularFirestoreDocument<Book>;

  booksCollection: AngularFirestoreCollection<Book>;

  constructor(public afs: AngularFirestore) {

    this.booksCollection = afs.collection<Book>('books');

    //this.books = this.afs.collection('books').valueChanges();

    // get the data and the id use the map operator.
    this.books = this.booksCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Book;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  getBooks(){
    return this.books;
  }

  addBook(book: Book){
    this.booksCollection.add(book);
  }

  deleteBook(book: Book){
    this.bookDoc = this.afs.doc(`books/${book.id}`);
    this.bookDoc.delete();
  }

  updateBook(book: Book){
    this.bookDoc = this.afs.doc(`books/${book.id}`);
    this.bookDoc.update(book);
  }

}
