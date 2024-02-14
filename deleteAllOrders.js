


// deletes all orders from the selected dataset in sanity
// returns the number of orders deleted

// import { createClient } from "next-sanity"


// import client from 'part:@sanity/base/client'

const {createClient} = require('@sanity/client')

async function deleteAllOrders(dataset = "production") {
  
  const sanityClient = createClient({
    dataset,
    projectId: "qhszuxx1",
    useCdn: false,
    apiVersion: '2021-03-25',
    token: "skmblYvwaVcuTiH7lHahIO6kIaBU2Pl511GN15ljGLbPIPmu5kVRfI7ay8TMJBvlvBzvrUnAEv72wCaSYmznivzCt0HOvm8ptseQPszW4RiNQ0wV2bSyUIGjp296Dnc5LKXVJj0CJCXg96u48B6mNC0qXRayMWu7jWMl6TdwUJApcABl8DA2"
  })
  // const dataset = dataset
  const orders = await sanityClient.fetch('*[_type == "orders"]._id');

  console.log({orders})
  
  // Delete all orders
  for (const _id of orders) {
    await sanityClient.delete(_id);
    console.log(`Deleted order ${_id}`);
  }
}

deleteAllOrders();