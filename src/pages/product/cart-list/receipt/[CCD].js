import { Card, CardHeader, Divider } from '@mui/material'
import ReceiptView from 'src/views/product/ReceiptView'

const Receipt = () => {
  return (
    <Card>
      <CardHeader title='Terimakasih Sudah Membeli' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <ReceiptView />
    </Card>
  )
}

export default Receipt
