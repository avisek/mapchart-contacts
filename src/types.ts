export enum Statuses {
  Active = 'active',
  Inactive = 'inactive',
}

export type Contact = {
  id?: number
  firstName: string
  lastName: string
  status: Statuses
}

// export type AppState = {
//   contacts: Contact[]
// }

export interface IExtraDispatchArguments {
  
}
