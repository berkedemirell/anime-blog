import React from 'react'
import { Link } from 'react-router-dom'




export const Footer = () => {


  const handleScrollToTop = () => {
    window.scrollTo({top:0, behavior:'smooth'});
  }

  return (
    <div className='footer'>
      <div className='logo'>
        <Link onClick={handleScrollToTop}><img alt='logo' src='https://images6.alphacoders.com/556/thumbbig-556463.webp'/></Link>
      </div>
      <div className='links'>

        <div className='link'>
          <span>Useful Links</span>
          <div className='line'></div>
          <Link to='/contact'>Contact</Link>
          <Link to='/about'>About</Link>
          <Link to='/donate'>Donate</Link>
          <Link to='/donate'>Work with us</Link>
        </div>
        <div className='social-media'>
          <span>Social Media</span>
          <div className='line'></div>
          <Link><ion-icon name="logo-instagram"></ion-icon></Link>
          <Link><ion-icon name="logo-facebook"></ion-icon></Link>
          <Link to={`https://twitter.com/brkdmrl07`} target='_blank'><ion-icon name="logo-twitter"></ion-icon></Link>
        </div>

        <div className='contact'>
          <p className='brand'>AnimeBlog</p>
          <div className='address'>
            <h4>Address:</h4>
            <p className='address-par'>Bayindir District, 335th Street Antalya/Turkey</p>
          </div>
          <span className='copy'>Copyright &copy; Berke Demirel</span>
        </div>
      </div>
    </div>
  )
}
