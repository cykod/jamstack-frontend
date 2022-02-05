import Head from 'next/head'
import Image from 'next/image'

import { fetchAPI } from "../lib/api"
import APIProduct from "../lib/api_product"

import Product from "../components/product"
import SiteWrapper from "../components/site_wrapper"

function renderProduct(p,i) {
  return <Product key={p.id} product={new APIProduct(p) } />
}

export default function Home({ config, products }) {
  return (
    <SiteWrapper config={config} page="/">
      <div className="flex flex-wrap items-stretch">
        { products.map(renderProduct) }
      </div>
    </SiteWrapper>
  ) 
}

export async function getStaticProps({ params }) {
  const [ config, products ] = await Promise.all([
    fetchAPI("/site-configuration?populate=*"),
    fetchAPI("/products?populate=*")
  ])

  return {
    props: { config, products },
    revalidate: false
  }
}