
import Link from 'next/link'

export default function Product({product}) {
  return <div>
           <div>
            <Link href={`/products/${product.id}`}>
              <a>
                <img src={product.thumbnailUrl} />
                <h2>{product.title}</h2>
              </a>
            </Link>
            <div>
              <p>${product.cost}</p>
              <button>Buy</button>
            </div>
          </div>
        </div>
  
}