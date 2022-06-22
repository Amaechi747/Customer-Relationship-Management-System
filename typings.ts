interface IdataSchema {
    id: number,
    fullname: string,
    email: string, // no duplicates allowed.
    gender: string,
    phone: string,
    address: string,
    notes?: string //optional, it can be left empty
  }


  interface InewCustomer {
    fullname: string,
    email: string, // no duplicates allowed.
    gender: string,
    phone: string,
    address: string,
    notes?: string //optional, it can be left empty
  }


  interface IupdateCustomer {
    id: number,
    fullname?: string,
    email?: string, // no duplicates allowed.
    gender?: string,
    phone?: string,
    address?: string,
    notes?: string //optional, it can be left empty
  }


  interface Iuser{
    id: string,
    fullname: string,
    email: string,
    password: string
  }

  declare namespace Express {
    interface Request {
      user?: Iuser;
    }
  }