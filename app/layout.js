export const metadata = {
  title: '種まきカレンダー - あなたの地域で今、種をまける野菜を見つけよう',
  description: '郵便番号を入れるだけで、今種まきできる野菜がわかる。月齢・天気予報・リマインダー機能付き。自然農・パーマカルチャー実践者向け。',
  keywords: '種まき,家庭菜園,自然農,パーマカルチャー,有機栽培,固定種,月齢カレンダー',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
