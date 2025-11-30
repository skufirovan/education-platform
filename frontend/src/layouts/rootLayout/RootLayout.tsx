import { Outlet } from 'react-router-dom'
import { Header } from '@/components/header/Header'

export const RootLayout = () => {
  return (
    <>
      <Header />
      <main style={{ backgroundColor: '#f8f9fa', minWidth: '1280px' }}>
        <Outlet />
      </main>
    </>
  )
}
