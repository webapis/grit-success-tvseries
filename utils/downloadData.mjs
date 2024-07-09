
import 'dotenv/config'

 import{ downloadCollection } from'./uploadCollection.mjs'

   const genders = [

    { gender: 'tvseries', gender1: 'temp-tvseries'  }
  ]

    for (let g of genders) {
        const { gender, gender1 } = g
        await downloadCollection(gender,gender1)
    }
 

