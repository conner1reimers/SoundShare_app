import { useRouter } from 'next/router'


const Test = () => {
    const router = useRouter();
    const { pid, dog } = router.query
    


    return (
        <div>
            TESTING {pid} {dog}
        </div>
    )
}

export default Test
