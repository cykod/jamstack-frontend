
import Link from 'next/link'

export default function Product({product}) {
  return <div  className="basis-full sm:basis-1/3 p-2">
           <div className="border-gray border-2 rounded-xl drop-shadow-md p-4 h-full flex flex-col justify-between">
            <Link href={`/products/${product.id}`}>
              <a>
                <img className="w-full" src={product.thumbnailUrl} />
                <h2 className="text-xl font-bold pb-4">{product.title}</h2>
              </a>
            </Link>
            <div className="flex justify-between">
              <p>${product.cost}</p>
              <button className="bg-sky-800 text-white px-4 rounded ">Buy</button> 
            </div>
          </div>
        </div>
  
}