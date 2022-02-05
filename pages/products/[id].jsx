import Head from 'next/head'
import Image from 'next/image'

import { fetchAPI, stripeCheckout } from "../../lib/api"
import APIProduct from "../../lib/api_product"

import Product from "../../components/product"
import SiteWrapper from "../../components/site_wrapper"

function renderProduct(p,i) {
  return <Product key={p.id} product={new APIProduct(p) } />
}

export default function Home({ config, product }) {

  const prd = new APIProduct(product)

  return (
    <SiteWrapper config={config} page="/">
         <div className="p-5 flex flex gap-4">
          <img className="w-48 mb-1" src={prd.thumbnailUrl} />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{prd.title}</h2>
            <p>{prd.description}</p>
            <p className="pb-4">${prd.cost}</p>
            <button onClick={() => stripeCheckout(prd.json())} className="bg-blue-500 w-24 text-white px-2 rounded">Buy</button>
          </div>
        </div>
    </SiteWrapper>
  ) 
}

export async function getStaticPaths() {
  const products = await fetchAPI("/products")

  return {
    paths: products.map((prd) => ({
      params: {
        id: prd.id.toString()
      }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const [ config, product ] = await Promise.all([
    fetchAPI("/site-configuration?populate=*"),
    fetchAPI(`/products/${params.id}?populate=*`)
  ])


  return {
    props: { config, product },
    revalidate: false
  }
}