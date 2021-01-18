export class User {
  public id?: number;
  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public password?: string;
  public token?: string;

  constructor(input?: User){
    Object.assign(this,input);
  }

}
