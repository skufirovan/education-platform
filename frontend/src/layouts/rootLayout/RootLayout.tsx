import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header/Header'

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
