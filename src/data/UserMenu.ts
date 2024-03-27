interface Props {
  label: string
  value: string
}

export const GenderMenu = (): Props[] => {
  const gender = [
    { label: '女性', value: '1' },
    { label: '男性', value: '2' },
    { label: 'その他', value: '3' }
  ]
  return gender
}

export const ActiveMenu = (): Props[] => {
  const activeLevel = [
    { label: 'ほとんど運動しない', value: '1.2' },
    { label: '軽い運動', value: '1.375' },
    { label: '中程度の運動', value: '1.55' },
    { label: '激しい運動', value: '1.725' },
    { label: '非常に激しい運動', value: '1.9' }
  ]
  return activeLevel
}

export const PFCMenu = (): Props[] => {
  const pfcMenu = [
    { label: 'クリーン', value: '1' },
    { label: 'ロカボ', value: '2' },
    { label: 'バルク', value: '3' }
  ]
  return pfcMenu
}
