
import Link from 'next/link'

import { stripeCheckout } from "../lib/api"

export default function Product({product}) {
  return <div className="basis-full sm:basis-1/3 p-2 ">
           <div className="p-5 border-2 drop-shadow-md bg-white border-gray rounded-xl h-full flex flex-col justify-between">
            <Link href={`/products/${product.id}`}>
              <a>
                <img className="w-full mb-1" src={product.thumbnailUrl} />
                <h2 className="text-xl">{product.title}</h2>
              </a>
            </Link>
            <div className="flex justify-between">
              <p>${product.cost}</p>
              <button onClick={() => stripeCheckout(product.json())} className="bg-blue-500 text-white px-2 rounded">Buy</button>
            </div>
          </div>
        </div>
  
}