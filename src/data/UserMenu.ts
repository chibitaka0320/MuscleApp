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
    { label: '低(ほとんど運動しない)', value: '1.2' },
    { label: '中(週2~3回程度の軽い運動)', value: '1.5' },
    { label: '高(週4~6回程度の激しい運動)', value: '1.7' }
  ]
  return activeLevel
}
