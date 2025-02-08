import React from 'react'
import './team.css'
import Heading from '../common/Heading'

const TeamCard = () => {
    return (
        <>
            <div className="team container">
                <Heading title='RENCONTREZ L’ÉQUIPE' subtitle='Nous avons une grande expérience de la conduite' />
                <div className="grid4">
                    <div className="box">
                        <div className="img">
                            <img src="./img/team-1.jpg" alt="Team Member 1" />
                            <div className="icon">
                                <i className='fab fa-facebook-f'></i>
                                <i className='fab fa-twitter'></i>
                                <i className='fab fa-instagram'></i>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Mahmoud Bymassen</h3>
                            <p>Formateur</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img">
                            <img src="./img/team-2.jpg" alt="Team Member 2" />
                            <div className="icon">
                                <i className='fab fa-facebook-f'></i>
                                <i className='fab fa-twitter'></i>
                                <i className='fab fa-instagram'></i>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Yasmine Said</h3>
                            <p>Formateur</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img">
                            <img src="./img/team-3.jpg" alt="Team Member 3" />
                            <div className="icon">
                                <i className='fab fa-facebook-f'></i>
                                <i className='fab fa-twitter'></i>
                                <i className='fab fa-instagram'></i>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Reda Rafki</h3>
                            <p>Formateur</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="img">
                            <img src="./img/team-4.jpg" alt="Team Member 4" />
                            <div className="icon">
                                <i className='fab fa-facebook-f'></i>
                                <i className='fab fa-twitter'></i>
                                <i className='fab fa-instagram'></i>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Oussama Mouatamid</h3>
                            <p>Formateur</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamCard
