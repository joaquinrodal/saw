const beers = [
  {country:"Mexico",name:"corona",alcohol:"34"},
  {country:"ARGENTINA",name:"pacifico",alcohol:"3,4"},
  ]

const beersGroup = Object.groupBy(beers , beers => beers.country)

console.log(beeersGroup)
