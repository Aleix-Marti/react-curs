import { Link } from 'react-router-dom'

function Home () {
  return(
    <>
      <h1>Home Page</h1>
      <h2>Subtitle Home Page</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex necessitatibus sapiente, molestiae doloremque, doloribus itaque perferendis nobis ea neque modi mollitia! Minus accusantium incidunt odio error vitae necessitatibus sint nihil excepturi quae ullam obcaecati nostrum, id architecto assumenda voluptatibus eveniet dolores velit ut aliquid provident distinctio iusto tempora? Cum, repellendus?</p>
      {/* <a href="/about">Go to About</a> */}
      <Link to="/about">About</Link>

    </>
  )
}

export default Home