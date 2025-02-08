import React from 'react';
import './hero.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Hero = () => {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="overlay"></div>
                    <div className="text">
                        <h1>Apprenez à conduire en toute confiance</h1>
                        <div className="button">
                            <Link to='/about'>
                                <button className='one' style={{borderRadius:"50px", width:"240px"}}>En savoir plus</button>
                            </Link>
                            <Link to='/courses'>
                                <button className='two' style={{borderRadius:"50px", width:"230px"}}>Nos cours</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="box" style={{borderBottomLeftRadius:"50px"}}>
                        <i className='fa fa-car' style={{borderRadius:"10px"}}></i>
                        <div className="info">
                            <h2>Apprentissage facile de la conduite</h2>
                            <p>Nos méthodes modernes et adaptées vous permettent de maîtriser la conduite en un temps record tout en restant à l'aise et confiant.</p>
                        </div>
                    </div>
                    <div className="box">
                        <i className='fa fa-users' style={{borderRadius:"10px"}}></i>
                        <div className="info">
                            <h2>Instructeurs Nationaux</h2>
                            <p>Nos instructeurs certifiés et expérimentés vous accompagnent à chaque étape pour vous garantir une formation de qualité.</p>
                        </div>
                    </div>
                    <div className="box" style={{borderBottomRightRadius:"50px"}}>
                        <i className='fa fa-file-alt' style={{borderRadius:"10px"}}></i>
                        <div className="info">
                            <h2>Obtenez votre permis</h2>
                            <p>Préparez-vous efficacement à l'examen du permis de conduire grâce à notre approche personnalisée et nos cours interactifs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;
