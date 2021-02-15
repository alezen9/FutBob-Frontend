export const allItem = `{
   _id,
   type,
   name,
   measurements {
      width,
      height
   },
   state,
   price,
   location {
      coordinates
   }
}`

export const allList = `{
   result ${allItem},
   totalCount
}`
