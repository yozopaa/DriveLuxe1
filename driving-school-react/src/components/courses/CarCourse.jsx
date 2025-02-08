// CarCourse.js
import React, { useState } from 'react';
import Heading from '../common/Heading';
import './courses.css';

const CarCourse = () => {
    const [activeSection, setActiveSection] = useState('programme');
    const faqs = [
        { q: "Combien d'heures de conduite?", a: "20 heures minimum légal." },
        { q: "Le code est-il inclus?", a: "Oui, accès illimité à la plateforme." },
        { q: "Type de voiture utilisé?", a: "Véhicules récents double commande." },
        { q: "Commencer sans code?", a: "Oui, formations parallèles possibles." },
        { q: "Cours de code en salle?", a: "Oui, sessions quotidiennes." },
        { q: "Durée moyenne formation?", a: "3 mois en moyenne." },
        { q: "Tarif passage permis?", a: "Inclus dans le forfait." },
        { q: "Élèves par moniteur?", a: "Formation individuelle en conduite." },
        { q: "Boîte automatique?", a: "Oui, flotte dédiée disponible." },
        { q: "Simulateur disponible?", a: "Oui, en complément." },
        { q: "Cours le dimanche?", a: "Non, samedi uniquement." },
        { q: "Délai pour l'examen?", a: "2-3 mois après inscription." },
        { q: "Accompagnement examen?", a: "Inclus dans le forfait." },
        { q: "Location voiture examen?", a: "Comprise dans le forfait." },
        { q: "Cours perfectionnement?", a: "Disponibles après le permis." },
        { q: "Formation accélérée?", a: "Oui, en 1 mois intensif." },
        { q: "Facilités paiement?", a: "Jusqu'à 4 fois sans frais." },
        { q: "Langues disponibles?", a: "Français uniquement." },
        { q: "Choix moniteur?", a: "Possible selon disponibilités." },
        { q: "Réductions disponibles?", a: "Système de parrainage actif." },
        { q: "Formation mécanique?", a: "Notions de base incluses." },
        { q: "Suivi pédagogique?", a: "Livret détaillé fourni." },
        { q: "Conduite autoroute?", a: "Incluse dans la formation." },
        { q: "Rétractation possible?", a: "14 jours légaux." },
        { q: "Aménagements handicap?", a: "Véhicules adaptés disponibles." },
        { q: "Formation en ligne?", a: "Mixte présentiel/distanciel." },
        { q: "Moniteur attitré?", a: "Oui, sauf exception." },
        { q: "Garantie réussite?", a: "Accompagnement jusqu'au succès." },
        { q: "Récupération points?", a: "Stages proposés séparément." },
        { q: "Conduite supervisée?", a: "Option disponible après formation." }
    ];

    return (
        <div className="course-detail" style={{margin:"5%"}}>
            <Heading title='FORMATION VOITURE' subtitle='Apprenez à conduire en toute confiance'/>
            
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
                                <h4>Formation Théorique</h4>
                                <ul>
                                    <li>Code de la route</li>
                                    <li>Signalisation</li>
                                    <li>Règles de priorité</li>
                                    <li>Sécurité routière</li>
                                    <li>Éco-conduite</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Formation Pratique</h4>
                                <ul>
                                    <li>Maîtrise du véhicule</li>
                                    <li>Manœuvres</li>
                                    <li>Conduite en ville</li>
                                    <li>Situations d'urgence</li>
                                    <li>Stationnement</li>
                                </ul>
                            </div>
                            <div className="programme-item">
                                <h4>Perfectionnement</h4>
                                <ul>
                                    <li>Conduite sur autoroute</li>
                                    <li>Conduite de nuit</li>
                                    <li>Conditions difficiles</li>
                                    <li>Évaluation finale</li>
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

export default CarCourse;