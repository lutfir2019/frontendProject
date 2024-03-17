// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/user/TabInfo'
import TabAccount from 'src/views/user/TabAccount'
import TabSecurity from 'src/views/user/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/router'
import useAuth from 'src/@core/hooks/stores/auth'
import useUser from 'src/@core/hooks/stores/user/user'
import useShop from 'src/@core/hooks/stores/shop/shop'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountDetails = () => {
  // ** State
  const [tabValue, setTabValue] = useState('account')
  const authStore = useAuth()

  const userStore = useUser()
  const shopStore = useShop()
  const router = useRouter()
  const { UNM } = router.query
  const [tab_after_add, setTabAfterAdd] = useState(false)
  const [userMatch, setUserMatch] = useState(false)

  useEffect(async () => {
    await shopStore.getData({page: 1, page_size: 999})
    
    if (UNM == '-') return
    await userStore.getDetails({ unm: UNM })
    setTabAfterAdd(true)

    if ( authStore.data[0]?.rlcd === 'ROLE-1'){
      setUserMatch(true)
    }else if(authStore.data[0]?.unm === UNM){
      setUserMatch(true)
    }
  }, [UNM])

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Card>
      <TabContext value={tabValue}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          {tab_after_add && userMatch && (
            <Tab
              value='security'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockOpenOutline />
                  <TabName>Security</TabName>
                </Box>
              }
            />
          )}
          {tab_after_add && (
            <Tab
              value='info'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InformationOutline />
                  <TabName>Info</TabName>
                </Box>
              }
            />
          )}
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount />
        </TabPanel>
        {tab_after_add && (
          <TabPanel sx={{ p: 0 }} value='security'>
            <TabSecurity />
          </TabPanel>
        )}
        {tab_after_add && (
          <TabPanel sx={{ p: 0 }} value='info'>
            <TabInfo />
          </TabPanel>
        )}
      </TabContext>
    </Card>
  )
}

export default AccountDetails
