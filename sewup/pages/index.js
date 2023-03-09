
import Layout from '@/components/Layout'
import { Card,Button,CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import Data from '../utils/Data'
import NextLink from 'next/link'
export default function Home() {
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {Data.products.map((product) => (<Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <div><Typography>{product.name}</Typography></div>
                      
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <div>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary">
                    Add to cart
                  </Button>
                  </div>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}