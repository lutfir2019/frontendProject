// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const PasswordField = ({ onChange, name, label, error }) => {
  // ** States
  const [values, setValues] = useState({
    [name]: '',
    showCurrentPassword: false
  })

  // Handle Current Password
  const handleCurrentPasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    onChange({ target: { name: name, value: event.target.value } })
  }

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  }

  const handleMouseDownCurrentPassword = event => {
    event.preventDefault()
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={`settings-current-${label}`}>{label}</InputLabel>
      <OutlinedInput
        error={error}
        label={label ?? ''}
        value={values[name]}
        id={`settings-current-${label}`}
        type={values.showCurrentPassword ? 'text' : 'password'}
        onChange={handleCurrentPasswordChange(name)}
        required
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              aria-label='toggle password visibility'
              onClick={handleClickShowCurrentPassword}
              onMouseDown={handleMouseDownCurrentPassword}
            >
              {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default PasswordField
