// MUI Imports
import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

const CircularProgressDeterminate = styled(CircularProgress)(({ theme }) => ({
  color: 'var(--mui-palette-customColors-trackBg)',
  left: 0,
  position: 'absolute',
  animationDuration: '550ms',
}))

const CircularProgressIndeterminate = styled(CircularProgress)(({ theme }) => ({
  left: 0,
  position: 'absolute',
  animationDuration: '550ms',
  color: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'
}))

const Loading = props => {
  return (
    <div className='relative'>
      <CircularProgressDeterminate variant='determinate' {...props} />
      <CircularProgressIndeterminate variant='indeterminate' disableShrink {...props} />
    </div>
  )
}

export default Loading