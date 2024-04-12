import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { TrashCanOutline } from 'mdi-material-ui'
import { ButtonBase } from '@mui/material'
import { styled } from '@mui/material/styles'

const DeleteButton = styled(ButtonBase)(({ theme }) => ({
  borderRadius: '50%',
  padding: '10px',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  '&:hover': {
    backgroundColor: theme.palette.error.dark
  },
  transition: 'ease-in-out 0.2s'
}))

const ConfirmDeleteTrash = ({ handleValue }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = () => {
    handleValue(true) // Memanggil fungsi handleValue dari props dengan parameter true
    handleClose()
  }

  const handleCancel = () => {
    handleValue(false) // Memanggil fungsi handleValue dari props dengan parameter false
    handleClose()
  }

  return (
    <>
      <DeleteButton onClick={handleClickOpen}>
        <TrashCanOutline />
      </DeleteButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Peringatan</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Apakah anda yakin ingin menghapus data ini ? tindakan ini tidak dapat dibatalkan.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleCancel} variant='outlined'>
            Batal
          </Button>
          <Button onClick={handleConfirm} variant='contained' color='error'>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDeleteTrash
