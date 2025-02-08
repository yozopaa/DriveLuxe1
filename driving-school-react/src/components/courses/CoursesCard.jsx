import React from 'react'
import Heading from '../common/Heading'
import './courses.css'
import truck from '../../assests/truck.png'
import moto from '../../assests/motocycle.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const CoursesCard = () => {
    return (
        <>
            <div className="courses">
                <Heading title='COURS TENDANCES' subtitle='Nos cours vous perfectionnent avec une formation de conduite'/>
                <div className="container grid3 flexsm">
                      {/* Motorcycle Driving Lessons */}
                      <div className="box">
                        <div className="light" style={{borderTopLeftRadius:"100px"}}>
                            <span className='money' style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", }}>2500DH</span>
                            <p className='title'>Leçons de conduite de moto</p>
                            <p className='para'>Prenez le contrôle de votre moto en toute confiance grâce à nos cours spécialisés pour motards.</p>
                            <div className="box-in">
                                <div className="begin">
                                    <i className='fa fa-signal'></i>
                                    <span>Débutant</span>
                                </div>
                                <div className="week">
                                    <span>/</span>
                                    <i className='fa fa-calendar-alt'></i>
                                    <span>2 Semaines</span>
                                </div>
                            </div>
                        </div>
                        <div className="img-in" >
                            <div className="over"></div>
                            <Link to='/courses/motorcycle'>
                            <button>Lire la suite</button></Link>
                            <img src={moto} alt="Motorcycle Lesson" style={{borderBottomLeftRadius:"100px"}}  height={"330px"}  />
                        </div>
                    </div>
                    {/* Car Driving Lessons */}
                    <div className="box">
                        <div className="light" style={{borderTopLeftRadius:"10px", borderTopRightRadius:"10px"}}>
                            <span className='money' style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", }}>3000DH</span>
                            <p className='title'>Leçons de conduite automobile</p>
                            <p className='para'>Apprenez à maîtriser la conduite automobile avec des cours adaptés à tous les niveaux et en toute sécurité.</p>
                            <div className="box-in">
                                <div className="begin">
                                    <i className='fa fa-signal'></i>
                                    <span>Débutant</span>
                                </div>
                                <div className="week">
                                    <span>/</span>
                                    <i className='fa fa-calendar-alt'></i>
                                    <span>3 Semaines</span>
                                </div>
                            </div>
                        </div>
                        <div className="img-in">
                            <div className="over"></div>
                            <Link to='/courses/car'>
                            <button>Lire la suite</button></Link>
                            <img src="./img/courses-2.jpg" alt="Car Driving Lesson"/>
                        </div>
                    </div>

                  

                    {/* Truck Driving Lessons */}
                    <div className="box">
                        <div className="light" style={{borderTopRightRadius:"100px"}}>
                            <span className='money' style={{borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px", }}>3500DH</span>
                            <p className='title'>Leçons de conduite de camion</p>
                            <p className='para'>Préparez-vous à une carrière professionnelle ou apprenez à conduire un camion en toute sécurité.</p>
                            <div className="box-in">
                                <div className="begin">
                                    <i className='fa fa-signal'></i>
                                    <span>Intermédiaire</span>
                                </div>
                                <div className="week">
                                    <span>/</span>
                                    <i className='fa fa-calendar-alt'></i>
                                    <span>4 Semaines</span>
                                </div>
                            </div>
                        </div>
                        <div className="img-in">
                            <div className="over"></div>
                            <Link to='/courses/Truck' >
                            <button>Lire la suite</button></Link>
                            <img src={truck} alt="Truck Driving Lesson" height={"320px"} style={{borderBottomRightRadius:"100px"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoursesCard
