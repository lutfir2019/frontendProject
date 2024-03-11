// MUI Imports
import { styled } from '@mui/material/styles'
import Pagination from '@mui/material/Pagination'

const ContainerDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0px'
}))
const PaginationOutlined = ({ count, page, onChange }) => {
  const handleChange = (event, value) => {
    if (onChange) {
      onChange(value)
    }
  }
  return (
    <ContainerDiv className='flex flex-col gap-4'>
      <Pagination count={count} page={page} onChange={handleChange} variant='outlined' color='primary' />
    </ContainerDiv>
  )
}

export default PaginationOutlined
