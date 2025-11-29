import Logo from '@/assets/images/logo.svg?react'
import s from './header.module.css'

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.logoContainer}>
        <Logo />
        <p className={s.logoTitle}>ПСБ Образование</p>
      </div>
      <div className={s.profileContainer}>
        <p className={s.role}>Преподаватель</p>
        <p className={s.profile}>ИП</p>
      </div>
    </header>
  )
}
