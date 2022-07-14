export interface IEDITBOARD {
  id: number,
  name: string,
  members:[
    {
      id: number,
      firstName: string,
      lastName: string,
      email: string
    }
  ],
  isOwner: boolean
}
