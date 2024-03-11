import Link from 'next/link'

const { CardContent, Grid, Button } = require('@mui/material')

const ReceiptView = () => {
  return (
    <CardContent>
      <Grid container>
        <Grid item>
          <h1>Hello</h1>
        </Grid>
        <Grid item>
          <Link href={'/product'}>
            <Button>Kembali</Button>
          </Link>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default ReceiptView
