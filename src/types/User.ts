/**
 * ログインユーザーを表す部品用クラス.
 */
export class User {
  constructor(
    // 住所
    public _address: string,
    // メールアドレス
    public _email: string,
    // 名前
    public _name: string,
    // パスワード
    public _password: string,
    // 郵便番号
    public _zipCode: string
  ) {}

  public get address(): string {
    return this._address;
  }

  public set address(address: string) {
    this._address = address;
  }

  public get email(): string {
    return this._email;
  }

  public set email(email: string) {
    this._email = email;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public get zipCode(): string {
    return this._zipCode;
  }

  public set zipCode(zipCode: string) {
    this._zipCode = zipCode;
  }
}
