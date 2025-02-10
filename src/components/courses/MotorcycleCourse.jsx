// TruckCourse.js
import React, { useState } from 'react';
import Heading from '../common/Heading';
import './courses.css';

const MotorcycleCourse = () => {
    const [activeSection, setActiveSection] = useState('programme');
    const faqs = [
        { q: "Quels sont les prérequis?", a: "Être âgé d'au moins 16 ans et avoir un certificat médical valide." },
        { q: "Quelle est la durée de la formation?", a: "La formation dure 2 semaines avec des cours théoriques et pratiques." },
        { q: "Quel type de moto est utilisé pour la formation?", a: "Des motos récentes de 125cc pour les débutants." },
        { q: "Les équipements sont-ils fournis?", a: "Casque et gants fournis, autres équipements à prévoir." },
        { q: "Y a-t-il des cours le weekend?", a: "Oui, nous proposons des sessions le samedi." },
        { q: "Que faire en cas d'absence?", a: "Prévenir 24h à l'avance pour reprogrammer sans frais." },
        { q: "La formation inclut-elle le code?", a: "Oui, accès à la plateforme de code spécial moto." },
        { q: "Combien d'élèves par session?", a: "Maximum 4 élèves par moniteur." },
        { q: "Peut-on payer en plusieurs fois?", a: "Oui, paiement en 3 fois sans frais possible." },
        { q: "Y a-t-il des cours de perfectionnement?", a: "Oui, modules avancés disponibles." },
        { q: "Quelle est la durée de validité du forfait?", a: "6 mois à partir de l'inscription." },
        { q: "Faut-il savoir faire du vélo?", a: "Recommandé mais pas obligatoire." },
        { q: "Y a-t-il un examen blanc?", a: "Oui, inclus dans la formation." },
        { q: "Les cours sont-ils en groupe?", a: "Théorie en groupe, pratique individuelle." },
        { q: "Peut-on utiliser sa propre moto?", a: "Non, formation sur nos motos uniquement." },
        { q: "Y a-t-il des cours en soirée?", a: "Oui, jusqu'à 19h en semaine." },
        { q: "Faut-il une assurance spéciale?", a: "Non, l'école fournit l'assurance." },
        { q: "Que faire si je rate l'examen?", a: "Accompagnement jusqu'à la réussite." },
        { q: "Y a-t-il des cours de mécanique?", a: "Notions de base incluses." },
        { q: "La formation est-elle intensive?", a: "Options standard ou intensive disponibles." },
        { q: "Peut-on faire une pause dans la formation?", a: "Oui, avec justificatif médical." },
        { q: "Y a-t-il des cours de nuit?", a: "Inclus dans la formation avancée." },
        { q: "Faut-il un acompte?", a: "30% à l'inscription." },
        { q: "Les cours sont-ils en français uniquement?", a: "Oui, niveau basique requis." },
        { q: "Y a-t-il un âge maximum?", a: "Non, aptitude médicale requise." },
        { q: "Peut-on changer de moniteur?", a: "Oui, sur demande justifiée." },
        { q: "Y a-t-il des cours sur route mouillée?", a: "Oui, conditions variées." },
        { q: "La formation est-elle mixte?", a: "Oui, groupes mixtes." },
        { q: "Peut-on filmer les cours?", a: "Non, pour des raisons pédagogiques." },
        { q: "Y a-t-il un suivi post-permis?", a: "Oui, première année gratuite." }
    ];
    return (
        <div className="course-detail" style={{margin:"5%"}}>
            <Heading title='FORMATION MOTO' subtitle='Maîtrisez la conduite de votre moto en toute sécurité'/>
            
            <div className="container course-content">
                {/* Navigation */}
                <div className="course-nav">
                    <button 
                        className={activeSection === 'programme' ? 'active' : ''}
                        onClick={() => setActiveSection('programme')}
                    >
                        Programme
                    </button>
                    <button 
                        className={activeSection === 'faq' ? 'active' : ''}
                        onClick={() => setActiveSection('faq')}
                    >
                        FAQ
                    </button>
                </div>

                {/* Content */}
                {activeSection === 'programme' && (
                    <div className="content-section">
                        <h3>Programme du cours</h3>
                        <div className="programme-grid">
                            <div className="programme-item">
                                <h4>Théorie (20h)</h4>
                                <ul>
                                    <li>Code de la route spécifique moto</li>
                                    <li>Sécurité et équipements</li>
                                    <li>Mécanique de base</li>
                                    <li>Météo et conditions de route</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Pratique plateau (16h)</h4>
                                <ul>
                                    <li>Maîtrise à basse vitesse</li>
                                    <li>Techniques de freinage</li>
                                    <li>Équilibre et manœuvres</li>
                                    <li>Parcours d'examen</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Circulation (14h)</h4>
                                <ul>
                                    <li>Conduite en ville</li>
                                    <li>Routes départementales</li>
                                    <li>Situations d'urgence</li>
                                    <li>Éco-conduite</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'faq' && (
                    <div className="content-section">
                        <h3>Questions fréquentes</h3>
                        <div className="faq-grid">
                            {faqs.map((faq, index) => (
                                <div key={index} className="faq-item">
                                    <h4>{faq.q}</h4>
                                    <p>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );}
export default MotorcycleCourse;