// React Imports

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import CircularProgress from '@mui/material/CircularProgress'
import useAlert from '@/stores/alert'

const LoadingFull = () => {
  const alertStore = useAlert()

  return (
    <Dialog
      open={alertStore.is_Loading}
      disableEscapeKeyDown
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ maxWidth: '50%', justifySelf: 'center' }}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose()
        }
      }}
    >
      <DialogContent sx={{ padding: 10 }}>
        <DialogContentText id='alert-dialog-description'>
          <CircularProgress thickness={5} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default LoadingFull
