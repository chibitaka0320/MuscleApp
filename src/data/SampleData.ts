import { type Training } from '../app/types/Training'

export const SampleData = (): Training[] => {
  const data = [
    {
      parts: '胸',
      events: [{ eventName: 'ベンチプレス', sets: [{ set: 2, weight: 100 }, { set: 10, weight: 80 }] },
        { eventName: 'ダンベルプレス', sets: [{ set: 10, weight: 30 }, { set: 1, weight: 20 }] }]
    },
    {
      parts: '背中',
      events: [{ eventName: 'デッドリフト', sets: [{ set: 2, weight: 100 }, { set: 10, weight: 80 }] },
        { eventName: 'ベントオーバーロウ', sets: [{ set: 10, weight: 30 }, { set: 1, weight: 20 }] }]
    }
  ]
  return data
}
