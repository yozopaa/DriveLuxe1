import React from 'react'
import './features.css'
import Heading from '../common/Heading'

const FeaturesCard = () => {
    return (
        <>
            <div className="features">
                <div className="container grid2 flexsm">
                    <div className="left">
                        <Heading title='POURQUOI NOUS CHOISIR !' subtitle='La meilleure agence de formation à la conduite de votre ville'/>
                        <div className="features-info">
                            <p>Choisir notre agence, c'est opter pour une formation de qualité, assurée par des professionnels expérimentés, avec des tarifs accessibles et un accompagnement personnalisé.</p>
                            <div className="check">
                                <div className="one-check">
                                    <div className="fully">
                                        <i className='fa fa-check' style={{borderRadius:"10px"}}></i>
                                        <span>Entièrement licencié</span>
                                        <p>Nos formateurs possèdent toutes les certifications nécessaires pour garantir une formation conforme aux normes.</p>
                                    </div>
                                    <div className="afordable">
                                        <i className='fa fa-check' style={{borderRadius:"10px"}}></i>
                                        <span>Frais abordables</span>
                                        <p>Nous proposons des tarifs compétitifs sans compromettre la qualité de nos services.</p>
                                    </div>
                                </div>
                                <div className="two-check">
                                    <div className="online">
                                        <i className='fa fa-check' style={{borderRadius:"10px"}}></i>
                                        <span>Suivi en ligne</span>
                                        <p>Bénéficiez d'un suivi en ligne pratique pour optimiser votre apprentissage à tout moment.</p>
                                    </div>
                                    <div className="best">
                                        <i className='fa fa-check' style={{borderRadius:"10px"}}></i>
                                        <span>Meilleurs formateurs</span>
                                        <p>Nos formateurs sont hautement qualifiés, avec une longue expérience dans l'enseignement de la conduite.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="img">
                            <img src="./img/about-2.jpg" alt="" />
                            <img src="./img/about-1.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeaturesCard
