export default class APIProduct{

  constructor(data) {
    this.id = data.id
    this.attr = data.attributes
  }

  get title()   { return this.attr.title  }
  get cost()    { return this.attr.cost   }
  get description() { return this.attr.description }
  get picture() { return this.attr.picture.data.attributes }

  get thumbnailUrl() {
    return this.picture.formats.thumbnail.url;
  }

  json() {
    return {
      title: this.title,
      cost: this.cost,
      picture: this.thumbnailUrl
    }

  }
  
}