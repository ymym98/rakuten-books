import { OrderItem } from "./OrderItem";

export class Order {
  constructor(
    // 注文日
    public _orderDate: Date,
    // 送付先の住所
    public _orderAddress: string,
    // 送付先のメールアドレス
    public _orderEmail: string,
    // 宛先
    public _orderName: string,
    // 支払い方法
    public _orderPaymentMethod: string,
    // 支払い合計金額
    public _orderTotalPrice: number,
    // 送付先の郵便番号
    public _orderZipCode: string,
    // 注文商品の詳細
    public _orderItem: OrderItem
  ) {}

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get orderAddress(): string {
    return this._orderAddress;
  }

  public set orderAddress(orderAddress: string) {
    this._orderAddress = orderAddress;
  }

  public get orderEmail(): string {
    return this._orderEmail;
  }

  public set orderEmail(orderEmail: string) {
    this._orderEmail = orderEmail;
  }

  public get orderName(): string {
    return this._orderName;
  }

  public set orderName(orderName: string) {
    this._orderName = orderName;
  }

  public get orderPaymentMethod(): string {
    return this._orderPaymentMethod;
  }

  public set orderPaymentMethod(orderPaymentMethod: string) {
    this._orderPaymentMethod = orderPaymentMethod;
  }

  public get orderTotalPrice(): number {
    return this._orderTotalPrice;
  }

  public set orderTotalPrice(orderTotalPrice: number) {
    this._orderTotalPrice = orderTotalPrice;
  }

  public get orderZipCode(): string {
    return this._orderZipCode;
  }

  public set orderZipCode(orderZipCode: string) {
    this._orderZipCode = orderZipCode;
  }

  public get orderItem(): OrderItem {
    return this._orderItem;
  }

  public set orderItem(orderItem: OrderItem) {
    this._orderItem = orderItem;
  }
}
