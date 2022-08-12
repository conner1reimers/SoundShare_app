import React, { useEffect } from 'react'
import NewPassForm from './NewPassForm'

const NewPassword: React.FC = () => {

    
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.body.style.backgroundImage = "linear-gradient(45deg, #1b1f1f, #1b1f1f, #1b1f1f)";
        document.title = "Soundshare - Reset Password"
      
          return () => {
              document.body.style.overflowY = 'visible';
              document.body.style.overflowX = 'hidden';
              document.body.style.height = '100%';
          }
      }, []);

      


    return (
        <div className="new-password-page">
            <div className="new-password">

                <div className="auth-grid--head auth-grid--head--login">
                    <h1 className="headings">Login.</h1>
                    <p>Please create a new password and confirm it, after you will be logged in and your password will be changed.</p>
                </div>

                <NewPassForm/>

            </div>
        </div>  
    )
}

export default NewPassword
