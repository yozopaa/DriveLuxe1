// TruckCourse.js
import React, { useState } from 'react';
import Heading from '../common/Heading';
import './courses.css';

const TruckCourse = () => {
    const [activeSection, setActiveSection] = useState('programme');
    const faqs = [
        { q: "Prérequis permis B?", a: "2 ans minimum requis." },
        { q: "Durée formation?", a: "4 semaines intensives." },
        { q: "FIMO incluse?", a: "Formation complémentaire séparée." },
        { q: "Types de camions?", a: "Flotte Euro 6 récente." },
        { q: "Formation continue?", a: "FCO disponible après permis." },
        { q: "Prise en charge OPCO?", a: "Possible selon critères." },
        { q: "Visite médicale?", a: "Obligatoire, non incluse." },
        { q: "Tests psychotechniques?", a: "Inclus dans le forfait." },
        { q: "Formation mécanique?", a: "Module spécifique inclus." },
        { q: "Formation ADR?", a: "En option après permis." },
        { q: "Stage entreprise?", a: "Partenariats possibles." },
        { q: "Taille des groupes?", a: "Maximum 4 personnes." },
        { q: "Horaires formation?", a: "8h-17h en semaine." },
        { q: "Permis remorque?", a: "Module complémentaire." },
        { q: "Aide placement?", a: "Réseau d'entreprises partenaires." },
        { q: "Financement Pôle Emploi?", a: "Agrément formation disponible." },
        { q: "Cours de nuit?", a: "Inclus formation complète." },
        { q: "Formation éco-conduite?", a: "Module obligatoire inclus." },
        { q: "Formation arrimage?", a: "Module spécifique inclus." },
        { q: "Délai inscription?", a: "2 mois minimum." },
        { q: "Taux de réussite?", a: "85% première présentation." },
        { q: "Validité permis?", a: "5 ans, renouvellement requis." },
        { q: "Formation continue?", a: "Obligatoire tous les 5 ans." },
        { q: "Stage récupération?", a: "Proposé séparément." },
        { q: "Volume théorique?", a: "70h obligatoires." },
        { q: "Volume pratique?", a: "50h minimum requises." },
        { q: "Examens blancs?", a: "2 passages inclus." },
        { q: "Profil des élèves?", a: "Tout public, mixte." },
        { q: "Équipement fourni?", a: "Gilet et gants de sécurité." },
        { q: "Échec examen?", a: "Forfait rattrapage disponible." }
    ];

    return (
        <div className="course-detail" style={{margin:"5%"}}>
            <Heading title='FORMATION CAMION' subtitle='Devenez conducteur professionnel'/>
            
            <div className="container course-content">
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

                {activeSection === 'programme' && (
                    <div className="content-section">
                        <h3>Programme du cours</h3>
                        <div className="programme-grid">
                            <div className="programme-item">
                                <h4>Formation Théorique (70h)</h4>
                                <ul>
                                    <li>Réglementation transport</li>
                                    <li>Code spécifique poids lourd</li>
                                    <li>Documents obligatoires</li>
                                    <li>Sécurité et prévention</li>
                                    <li>Temps de conduite et repos</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Formation Pratique (50h)</h4>
                                <ul>
                                    <li>Manœuvres complexes</li>
                                    <li>Conduite économique</li>
                                    <li>Chargement/déchargement</li>
                                    <li>Arrimage sécurisé</li>
                                    <li>Situations d'urgence</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Spécialisation</h4>
                                <ul>
                                    <li>Maintenance préventive</li>
                                    <li>Gestion numérique</li>
                                    <li>Chronotachygraphe</li>
                                    <li>Transport international</li>
                                    <li>Préparation examen</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'faq' && (
                    <div className="content-section">
                        <h3>Questions Fréquentes</h3>
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
    );
};

export default TruckCourse;