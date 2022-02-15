/**
 * Bookの部品用クラス.
 */
export class Book {
  constructor(
    // ISBNコード
    public _isbn: number,
    // 著者
    public _author: string,
    // 著者カナ
    public _authorKana: string,
    // 商品説明文
    public _itemCaption: string,
    // 価格
    public _itemPrice: number,
    // 商品URL
    public _itemUrl: string,
    // 商品画像(大)
    public _largeImageUrl: string,
    // 商品画像(中)
    public _mediumImageUrl: string,
    // 出版社
    public _publisherName: string,
    // 発売日
    public _salesDate: string,
    // サイズ
    public _size: string,
    // 商品画像(小)
    public _smallImageUrl: string,
    // サブタイトル
    public _subTitle: string,
    // サブタイトルカナ
    public _subTitleKana: string,
    // タイトル
    public _title: string,
    // タイトルカナ
    public _titleKana: string
  ) {}

  public get isbn(): number {
    return this._isbn;
  }

  public set isbn(isbn: number) {
    this._isbn = isbn;
  }

  public get author(): string {
    return this._author;
  }

  public set author(author: string) {
    this._author = author;
  }

  public get authorKana(): string {
    return this._authorKana;
  }

  public set authorKana(authorKana: string) {
    this._authorKana = authorKana;
  }

  public get itemCaption(): string {
    return this._itemCaption;
  }

  public set itemCaption(itemCaption: string) {
    this._itemCaption = itemCaption;
  }

  public get itemPrice(): number {
    return this._itemPrice;
  }

  public set itemPrice(itemPrice: number) {
    this._itemPrice = itemPrice;
  }

  public get itemUrl(): string {
    return this._itemUrl;
  }

  public set itemUrl(itemUrl: string) {
    this._itemUrl = itemUrl;
  }

  public get largeImageUrl(): string {
    return this._largeImageUrl;
  }

  public set largeImageUrl(largeImageUrl: string) {
    this._largeImageUrl = largeImageUrl;
  }

  public get mediumImageUrl(): string {
    return this._mediumImageUrl;
  }

  public set mediumImageUrl(mediumImageUrl: string) {
    this._mediumImageUrl = mediumImageUrl;
  }

  public get publisherName(): string {
    return this._publisherName;
  }

  public set publisherName(publisherName: string) {
    this._publisherName = publisherName;
  }

  public get salesDate(): string {
    return this._salesDate;
  }

  public set salesDate(salesDate: string) {
    this._salesDate = salesDate;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get smallImageUrl(): string {
    return this._smallImageUrl;
  }

  public set smallImageUrl(smallImageUrl: string) {
    this._smallImageUrl = smallImageUrl;
  }

  public get subTitle(): string {
    return this._subTitle;
  }

  public set subTitle(subTitle: string) {
    this._subTitle = subTitle;
  }

  public get subTitleKana(): string {
    return this._subTitleKana;
  }

  public set subTitleKana(subTitleKana: string) {
    this._subTitleKana = subTitleKana;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get titleKana(): string {
    return this._titleKana;
  }

  public set titleKana(titleKana: string) {
    this._titleKana = titleKana;
  }
}
