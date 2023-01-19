import React from 'react'
import '../Footer/footer.css'

const Footer = () => {
    return (
      <>
        <footer>
  <ul className="social_icon">
    <li><a href=""><i className="bi bi-facebook"></i></a></li>
    <li><a href=""><i className="bi bi-twitter"></i></a></li>
    <li><a href=""><i className="bi bi-tiktok"></i></a></li>
    <li><a href=""><i className="bi bi-instagram"></i></a></li>
  </ul>
  <ul className="menu">
<li><a href="/home">Home</a></li>
<li><a href="">Gallery</a></li>
<li><a href="">Favorites</a></li>
<li><a href="">Contact Us</a></li>
  </ul>
  <p>@2022 MASTER FOOD | All Right Reserved. Copyright by Muhammad Fijar Pratama </p>
</footer>
</>
        )
}

export default Footer