interface Props {
  label: string
}

export const partsMenu = (): Props[] => {
  const parts = [
    { label: '胸' },
    { label: '背中' },
    { label: '肩' },
    { label: '腕' }
  ]
  return parts
}

export const eventMenu = (partsValue: string): Props[] => {
  let event: Props[] = []
  if (partsValue === '胸') {
    event = [
      { label: 'ベンチプレス' }
    ]
  } else if (partsValue === '背中') {
    event = [
      { label: 'デッドリフト' }
    ]
  } else if (partsValue === '肩') {
    event = [
      { label: 'ショルダープレス' }
    ]
  } else if (partsValue === '腕') {
    event = [
      { label: 'アームカール' }
    ]
  }
  return event
}
