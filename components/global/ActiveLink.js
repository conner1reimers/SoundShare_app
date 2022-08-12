import { useRouter } from 'next/router'

const ActiveLink = ({ children, href }) => {
    const router = useRouter();

    const style = {
      marginRight: 10,
      color: router.asPath === href ? 'red' : 'black',
    }
  
    const handleClick = (e) => {
      e.preventDefault()
      router.push({
          pathname: '/test/[pid]',
          query: {
              pid: 'a',
              dog: 33
          }
      })
    }
  
    return (
      <a href={href} onClick={handleClick} style={style}>
        {children}
      </a>
    )
}


export default ActiveLink
