import { useState } from 'react'
import { database } from '../Firebase/config'
import { child, get, ref } from 'firebase/database'

const GetBlogData = () => {

    const dbRef = ref(database)
    const [blogData, setBlogData] = useState([])

    const fetchBlogData = (id) => {
        get(child(dbRef, `preblogs/${id}`))
            .then((snapshot) => {
                if(snapshot.exists()){
                    setBlogData(snapshot.val());
                }else{
                    console.log("No se encontraron datos del blog")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

  return {
    fetchBlogData,
    blogData,
  }
  
}

export default GetBlogData