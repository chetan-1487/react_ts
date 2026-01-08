'use client'

import { useParams } from 'next/navigation';
import { data } from '@/components/constants/productData';
import UpdateProduct from '@/components/UpdateProduct/UpdateProduct';
import { Product } from '@/components/constants/productData';



const Page = () => {

  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <UpdateProduct  productData = {data} productId={id}/>
    </div>
  )
}

export default Page;
