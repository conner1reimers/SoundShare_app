import React from 'react'
import { useRouter } from 'next/router'

const Test = () => {
    const router = useRouter();
    const { pid, dog } = router.query
    
    console.log(router)

    return (
        <div>
            sgd
        </div>
    )
}
export default Test;