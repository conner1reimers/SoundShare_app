import React from 'react'

const Blog: React.FC = () => {
  return (
    <div className="blog-page">
      <div className="blog-div">
        <div>
          <p>
            For soundshare, I wanted to create a simple webapp for music creators to share different sounds with each other. Not only can you discover sounds and then download them, I also
            decided to implement social media influenced functions, such as liking sounds, reposting sounds, following users, and more. I also have functions in the works for adding effects to sounds.
          
          </p>
          <br/>
          <p>
            The idea was pretty straightforward, though I had a lot to learn about database design and web design, which I {`didn't`} have much experience in, before coming to this conclusion. After months of hard work I had
            a working prototype to build from!
            
          </p>
          <br/>
          <p>Now that the site is live all kinds of audio creators, be that music producers, audio engineers, game developers, sound designers, and more can upload and download sounds that they would like
            to use in their work for free! 
          </p>
        </div>
        
      </div>

     
    </div>
  )
}

export default Blog
