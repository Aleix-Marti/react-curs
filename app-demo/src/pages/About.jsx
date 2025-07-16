import { Link } from 'react-router-dom'

export default function About () {
  return(
    <>
      <h1>About Page</h1>
      <h2>Subtitle About Page</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex necessitatibus sapiente, molestiae doloremque, doloribus itaque perferendis nobis ea neque modi mollitia! Minus accusantium incidunt odio error vitae necessitatibus sint nihil excepturi quae ullam obcaecati nostrum, id architecto assumenda voluptatibus eveniet dolores velit ut aliquid provident distinctio iusto tempora? Cum, repellendus?</p>
      <img src="https://picsum.photos/200/300" />
      <br/>
      {/* <a href="/">Go to Home</a> */}
      <Link to="/">Home</Link>


    </>
  )
}