import Orders from '@/components/dashboard/customerComponents/Orders'
import customerService from '@/service/customer.service'
import React from 'react'

export default async function page() {
  const {data} = await  customerService.getOrder()
  console.log(data.data)

  return (
    <div>
      <Orders data={data.data} />
    </div>
  )
}
