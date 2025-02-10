import React from 'react'
import './footer.css'

const Footer = () => {
    return (
        <>
        <footer>
    <div className="last">
        <div className="container grid4">
            <div className="touch">
                <h2>Contactez-Nous</h2>
                <div className="logo">
                    <i className='fa fa-car'></i>
                    <span>DriveLuxe</span>
                </div>
                <div className="call">
                    <i className='fa fa-location-dot'></i>
                    <span>188 rue 142N, Casa Blanca, Morocco</span>
                </div>
                <div className="call">
                    <i className='fa fa-phone'></i>
                    <span>+212 613-427395</span>
                </div>
                <div className="call">
                    <i className='fa fa-envelope'></i>
                    <span>DriveLuxe@gmail.com</span>
                </div>
            </div>
            <div className="links">
                <h2>Liens Rapides</h2>
                <ul>
                    <li><a href="">À propos de nous</a></li>
                    <li><a href="">Contactez-nous</a></li>
                    <li><a href="">Nos services</a></li>
                    <li><a href="">Termes & Conditions</a></li>
                    <li><a href="">Support</a></li>
                </ul>
            </div>
            <div className="links">
                <h2>Liens Populaires</h2>
                <ul>
                    <li><a href="">À propos de nous</a></li>
                    <li><a href="">Contactez-nous</a></li>
                    <li><a href="">Nos services</a></li>
                    <li><a href="">Termes & Conditions</a></li>
                    <li><a href="">Support</a></li>
                </ul>
            </div>
            <div className="subscribe">
                <h2>Newsletter</h2>
                <div className="input">
                    <input type="email" placeholder='Votre adresse e-mail' style={{borderTopLeftRadius:"50px",borderBottomLeftRadius:"50px",width:"200px"}} />
                    <button style={{borderTopRightRadius:"50px",borderBottomRightRadius:"50px" }}>S'inscrire</button>
                </div>
                <h3>Suivez-nous</h3>
                <ul className='social'>
                    <li>
                        <a href=""><i className='fab fa-twitter'></i></a>
                    </li>
                    <li>
                        <a href=""><i className='fab fa-facebook-f'></i></a>
                    </li>
                    <li>
                        <a href=""><i className='fab fa-youtube'></i></a>
                    </li>
                    <li>
                        <a href=""><i className='fab fa-linkedin-in'></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <hr />

</footer>

        </>
    )
}

export default Footer
