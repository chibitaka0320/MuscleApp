import { type FirebaseTraining, type Parts } from '../app/types/Training'

export const FormData = (data: FirebaseTraining[]): Parts[] => {
  const organizedArray: Parts[] = []
  data.forEach(item => {
    const existingPartIndex = organizedArray.findIndex(element => element.parts === item.parts)
    if (existingPartIndex === -1) {
      organizedArray.push({
        parts: item.parts,
        events: [{
          eventName: item.events,
          sets: [{
            set: item.set,
            weight: item.weight,
            createDate: item.createDate,
            id: item.id
          }]
        }]
      })
    } else {
      const existingEventIndex = organizedArray[existingPartIndex].events.findIndex(event => event.eventName === item.events)
      if (existingEventIndex === -1) {
        organizedArray[existingPartIndex].events.push({
          eventName: item.events,
          sets: [{
            set: item.set,
            weight: item.weight,
            createDate: item.createDate,
            id: item.id
          }]
        })
      } else {
        organizedArray[existingPartIndex].events[existingEventIndex].sets.push({
          set: item.set,
          weight: item.weight,
          createDate: item.createDate,
          id: item.id
        })
      }
    }
  })
  return organizedArray
}
