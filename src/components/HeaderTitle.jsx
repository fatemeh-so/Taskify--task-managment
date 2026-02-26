import { ArrowLeft } from 'phosphor-react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

function HeaderTitle() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  let path
  if (pathname === '/dashboard') {
    path = t('dashboard')
  }
  if (pathname === '/schedule') {
    path = t('schedule') // ترجمه برای 'schedule'
  }
  if (pathname === '/calender') {
    path = t('calender') // ترجمه برای 'calender'
  }
  if (pathname === '/timer') {
    path = t('timer') // ترجمه برای 'timer'
  }

  if (pathname === '/profile') {
    return (
      <p
        onClick={() => navigate('/')}
        className='lg:text-[2rem] flex items-center gap-2 lg:pl-[6rem] pl- pt-2 md:text-[2rem] text-[1rem] font-bold'
      >
        <ArrowLeft size={20} /> {t('myProfile')}
      </p>
    )
  }

  return (
    <>
      <h1 className='lg:text-[2rem] lg:pl-[6rem] pl- pt-2 md:text-[2rem] text-[1rem] font-bold'>
        {path}
      </h1>
    </>
  )
}

export default HeaderTitle
