interface Props {
  label: string
}

export const partsMenu = (): Props[] => {
  const parts = [
    { label: '胸' },
    { label: '背中' },
    { label: '肩' },
    { label: '腕' },
    { label: '腹筋' },
    { label: '足' },
    { label: 'その他' }
  ]
  return parts
}

export const eventMenu = (partsValue: string): Props[] => {
  let event: Props[] = []
  if (partsValue === '胸') {
    event = [
      { label: 'ベンチプレス' },
      { label: 'インクラインベンチプレス' },
      { label: 'ダンベルプレス' },
      { label: 'インクラインダンベルプレス' },
      { label: 'ダンベルフライ' },
      { label: 'インクラインダンベルフライ' },
      { label: 'ディップス' },
      { label: 'ケーブルクロスオーバー' },
      { label: 'チェストプレスマシン' },
      { label: 'スミスマシンベンチプレス' },
      { label: 'スミスマシンインクラインベンチプレス' }
    ]
  } else if (partsValue === '背中') {
    event = [
      { label: 'プルアップ' },
      { label: 'チンアップ' },
      { label: 'バーベルベントオーバーロウ' },
      { label: 'ダンベルロウ' },
      { label: 'ワンハンドロウ' },
      { label: 'シーデットロウマシン' },
      { label: 'シーデットケーブルロウ' },
      { label: 'ラットプルダウン' },
      { label: 'Tバーロウマシン' },
      { label: 'ストレートアームプルダウン' },
      { label: 'デッドリフト' }
    ]
  } else if (partsValue === '肩') {
    event = [
      { label: 'オーバーヘッドプレス' },
      { label: 'ダンベルショルダープレス' },
      { label: 'アーノルドプレス' },
      { label: 'ショルダープレスマシン' },
      { label: 'ダンベルフロントレイズ' },
      { label: 'ダンベルサイドレイズ' },
      { label: 'ベントオーバーサイドレイズ' },
      { label: 'フェイスプル' },
      { label: 'リアデルトフライマシン' },
      { label: 'サイドレイズマシン' },
      { label: 'ケーブルワンハンドサイドレイズ' }
    ]
  } else if (partsValue === '腕') {
    event = [
      { label: 'バーベルカール' },
      { label: 'EZバーカール' },
      { label: 'ダンベルカール' },
      { label: 'ダンベルハンマーカール' },
      { label: 'ケーブルカール' },
      { label: 'ダンベルフレンチプレス' },
      { label: 'ケーブルトライセプスエクステンション' },
      { label: 'ダンベルキックバック' },
      { label: 'ケーブルプレスダウン' }
    ]
  } else if (partsValue === '腹筋') {
    event = [
      { label: 'アブローラー' },
      { label: 'シフトアップ' },
      { label: 'クランチ' },
      { label: 'ハンギングレッグレイズ' },
      { label: 'プランク' },
      { label: 'アブドミナルクランチマシン' },
      { label: 'ジャックナイフ' },
      { label: 'ダンベルサイドベント' }
    ]
  } else if (partsValue === '足') {
    event = [
      { label: 'Vスクワット' },
      { label: 'ヒップアブダクションマシン' },
      { label: 'ポーズバックスクワット' },
      { label: 'スミスマシンスクワット' },
      { label: 'ランジ' },
      { label: 'サイドランジ' },
      { label: 'シングルレッグエクステンション' },
      { label: 'シングルレッグプレス' },
      { label: 'ケーブルドンキーキック' }
    ]
  }
  return event
}
