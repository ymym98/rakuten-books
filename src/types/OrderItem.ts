import { Book } from "./Book";

export class OrderItem {
  constructor(
    // 商品のISBNコード
    public _isbn: number,
    // 注文ID
    public _orderId: number,
    // 数量
    public _quantity: number,
    // 商品
    public _book: Book
  ) {}

  public get isbn(): number {
    return this._isbn;
  }

  public set isbn(isbn: number) {
    this._isbn = isbn;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get book(): Book {
    return this._book;
  }

  public set book(book: Book) {
    this._book = book;
  }
}
