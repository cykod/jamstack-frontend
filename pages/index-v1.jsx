import Head from 'next/head'

import { fetchAPI } from "../lib/api"


export default function Home({ config, products }) {
  return (
    <div className="p-10">
    <h1>{config.attributes.site_title}</h1>
      <div className="flex flex-wrap items-stretch">
        { products.map((p,i) => <div key={i} className="p-5 w-1/2">
            <img width="80" src={p.attributes.picture.data.attributes.formats.thumbnail.url} />
            <h2>{p.attributes.title}</h2>
            <p>${p.attributes.cost}</p>
          </div>) }
      </div>
    </div>
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