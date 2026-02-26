import { useState, useEffect } from 'react'
import { Button, Input, Avatar, Card, CardBody } from '@nextui-org/react'
import Spinner from './Spinner'
import useGetUser from '../features/auth/useGetUser'
import { useUpdateUser } from '../features/auth/useUpadateUser'
import uploadAvatar from '../services/uploadAvatar'
import { useTranslation } from 'react-i18next'
import { User, Lock, Camera, FloppyDisk } from 'phosphor-react'

const MyProfile = () => {
  const { t, i18n } = useTranslation()
  const { data: user, isLoading: isUserLoading } = useGetUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [avatar, setAvatar] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  const { mutate: editProf, isLoading: isUpdating } = useUpdateUser()

  useEffect(() => {
    if (user) {
      setUsername(user.user_metadata?.username || '')
      setAvatarUrl(user.user_metadata?.avatar || '')
    }
  }, [user])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  // const handleAvatarChange = async (e) => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onloadend = () => {
  //       setAvatarUrl(reader.result)
  //       setAvatar(file)
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }

  const handleSave = async () => {
    let avatarUrlToSave = avatarUrl

    if (avatar) {
      avatarUrlToSave = await uploadAvatar(avatar)
      editProf({
        username,
        password,
        avatar: avatarUrlToSave,
      })
    }
    if (!avatar) {
      editProf({
        username,
        password,
      })
    }
  }

  if (isUserLoading || isUpdating) return <Spinner />

  const isEnglish = i18n.language === 'en'

  return (
    <div
      dir={isEnglish ? 'rtl' : 'rtl'}
      className='w-full min-h-screen lg:pl-28 bg-[#f8f9fa] p-4 lg:p-8 flex flex-col items-center'
    >
      <div dir={isEnglish ? 'ltr' : 'rtl'} className='w-full max-w-2xl'>
        <Card className='border-none shadow-sm bg-white overflow-visible'>
          <CardBody className='p-0'>
            {/* Profile Header/Cover Area */}
            <div className='h-32 bg-gradient-to-r from-primary/10 to-primary/20 rounded-t-xl group relative'>
              {/* Future: Add cover photo upload here */}
            </div>

            <div className='px-6 lg:px-10 pb-10'>
              {/* Avatar Section */}
              <div className='relative -mt-12 mb-8 flex flex-col items-center md:items-start'>
                <div className='relative group'>
                  <Avatar
                    src={avatarUrl}
                    className='w-32 h-32 border-4 border-white shadow-lg text-large bg-gray-100'
                  />
                  {/* <label
                    htmlFor='avatarInput'
                    className='absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-md cursor-pointer hover:bg-primary-600 transition-colors'
                  >
                    <Camera size={20} weight='bold' />
                  </label> */}
                  <input
                    id='avatarInput'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    // onChange={handleAvatarChange}
                  />
                </div>
                <div className='mt-4 text-center md:text-left'>
                  <h2
                    className={`text-2xl font-bold text-gray-800   ${isEnglish ? 'text-left' : 'text-right'} pb-2`}
                  >
                    {t('myProfile')}
                  </h2>
                  <p className='text-gray-500 text-md'>
                    {t('manageYourProfileAndSettings')}
                  </p>
                </div>
              </div>

              {/* Form Section */}
              <div className='space-y-10'>
                <Input
                  fullWidth
                  size='lg'
                  label={t('username')}
                  labelPlacement='outside'
                  placeholder={t('enterYourUserName')}
                  value={username}
                  onChange={handleUsernameChange}
                  variant='flat'
                  startContent={<User size={20} className='text-gray-400' />}
                  classNames={{
                    label: `font-semibold text-gray-700 ${isEnglish ? 'text-left' : 'text-right'}`,
                    input: 'text-md',
                    inputWrapper: 'bg-gray-50 hover:bg-gray-100 h-14',
                  }}
                />

                <Input
                  fullWidth
                  size='lg'
                  type='password'
                  label={t('Password')}
                  labelPlacement='outside'
                  placeholder={t('enterYourPassword')}
                  value={password}
                  onChange={handlePasswordChange}
                  variant='flat'
                  startContent={<Lock size={20} className='text-gray-400' />}
                  classNames={{
                    label: `font-semibold text-gray-700 ${isEnglish ? 'text-left' : 'text-right'}`,
                    input: 'text-md',
                    inputWrapper: 'bg-gray-50 hover:bg-gray-100 h-14 py-4',
                  }}
                />

                <div className='pt-6 flex justify-center md:justify-end'>
                  <Button
                    className='min-w-[160px] h-12 text-md shadow-md'
                    onClick={handleSave}
                    color='primary'
                    radius='lg'
                    startContent={<FloppyDisk size={22} weight='bold' />}
                  >
                    {t('saveChanges')}
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile
