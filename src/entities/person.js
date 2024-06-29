export class Person {
  constructor (
    city,
    created_at,
    id,
    img,
    name,
    position,
    _orbits_last_message = {
      message: "",
      message_head: ""
    }
  ) {
    this.city = city,
    this.created_at = created_at,
    this.id = id,
    this.img = img,
    this.name = name,
    this.position = position,
    this._orbits_last_message =_orbits_last_message
  }
}