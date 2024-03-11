// ** MUI Imports
import { Grid } from '@mui/material'
import PaginationOutlined from 'src/views/pagination/paginationOutlined'
import { useEffect, useState } from 'react'
import TableProduct from 'src/views/product/TableProduct'
import useProduct from 'src/@core/hooks/stores/product/product'

const Product = () => {
  const productStore = useProduct()
  const [count, setCount] = useState(1)
  
  useEffect(() => {
    productStore.getData()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TableProduct />
        <PaginationOutlined count={10} page={count} onChange={e => setCount(e)} />
      </Grid>
    </Grid>
  )
}

export default Product
