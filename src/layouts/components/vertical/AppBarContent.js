'use client'
// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { useRouter } from 'next/router'
import CartCount from '../CartCount'
import { useEffect, useState } from 'react'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const router = useRouter()
  const [filter_value, setFilter] = useState({
    s: ''
  })

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const handleSearch = e => {
    const { name, value } = e.target
    setFilter(prev => ({ ...prev, [name]: value }))
  }
  const submitSearch = event => {
    event.preventDefault()
    const queryParams = { ...router.query, ...filter_value }

    // Menggunakan setTimeout untuk menunggu sebelum melakukan navigasi
    clearTimeout(timer)
    const timer = setTimeout(() => {
      router.push({ pathname: router.pathname, query: queryParams })
    }, 1000)
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <form onSubmit={submitSearch}>
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
            name='s'
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
        </form>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <CartCount />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
