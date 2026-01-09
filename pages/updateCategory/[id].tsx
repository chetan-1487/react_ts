'use client'

import { useParams } from 'next/navigation';
import UpdateCategory from '@/components/category/UpdateCategory/UpdateCategory';



const Page = () => {

  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <UpdateCategory  categoryId={id}/>
    </div>
  )
}

export default Page;
