import React from 'react'
import Heading from '../common/Heading'
import './about.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const AboutCard = () => {
    return (
        <>
           <div className="about">
    <div className="container grid2 flexsm">
        <div className="left">
            <div className="img">
                <img src="./img/about-2.jpg" alt="" />
                <img src="./img/about-1.jpg" alt="" />
            </div>
        </div>
        <div className="right">
            <Heading title='À PROPOS DE NOUS' subtitle="Nous aidons les étudiants à réussir l'examen et obtenir leur permis du premier coup"/>
            <div className="about-info">
                <p>Chez <strong>DriveLuxe</strong>, notre mission est d'accompagner chaque élève dans son apprentissage de la conduite en toute sécurité et avec confiance. Nous offrons des cours adaptés à tous les niveaux, conçus pour vous préparer efficacement à l'examen de conduite."</p>
                <p>Grâce à une équipe de formateurs expérimentés et à une approche pédagogique moderne, nous vous aidons à maîtriser les techniques de conduite tout en respectant les règles de sécurité routière. Notre objectif est de garantir votre réussite et de faire de vous un conducteur responsable.</p>
                <div className="check">
                    <div className="one-check">
                        <div className="fully">
                            <i className='fa fa-check'></i>
                            <span>Entièrement licencié</span>
                        </div>
                        <div className="online">
                            <i className='fa fa-check'></i>
                            <span>Suivi en ligne</span>
                        </div>
                    </div>
                    <div className="two-check">
                        <div className="afordable">
                            <i className='fa fa-check'></i>
                            <span>Frais abordables</span>
                        </div>
                        <div className="best">
                            <i className='fa fa-check'></i>
                            <span>Meilleurs formateurs</span>
                        </div>
                    </div>
                </div>
                <div className="button flex">
             
                    <a 
                                href="https://wa.me/212612345678" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none' }}
                            >
                    <div className="button2" style={{borderRadius:"50px"}}> 
                        <i className='fa fa-phone' style={{borderRadius:"50px"}}></i>
                        <span>+212 613-427395</span>
                    </div></a>
                </div>
            </div>
        </div>
    </div>
</div>

        </>
    )
}

export default AboutCard
