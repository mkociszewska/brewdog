export class Beer {
  constructor(
    public id: number,
    public name: string,
    public tagline: string,
    public description: string,
    public imageUrl: string,
    public abv: number,
    public ibu: number,
    public favourite: boolean
  ) {

    // @ts-ignore
    super(id)
  }

  static fromData(data: any): Beer {
    if (data === null || typeof data === 'string') {
      return data
    }

    return new Beer(
      data.id,
      data.name,
      data.tagline,
      data.description,
      data.image_url,
      data.abv,
      data.ibu,
      false
    )
  }
}
