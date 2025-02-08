import React, { useState } from 'react';
import Back from '../common/Back';
import Heading from '../common/Heading';
import { MessageCircle, Send } from 'lucide-react';

const Contact = () => {
    const [messages, setMessages] = useState([
        { text: "Bonjour! Comment puis-je vous aider aujourd'hui?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d791.1470957079982!2d-7.5799631000000005!3d33.559458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda633f7ff865e5f%3A0x4f052c8a470a509b!2sVocational%20Training%20Center%20Hassania%20In%20Les%20M%C3%A9tiers%20De%20Gestion%20Et%20Du%20Digital!5e1!3m2!1sen!2sma!4v1736194884510!5m2!1sen!2sma";

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { text: input, isBot: false }]);
        setInput('');
        setTimeout(() => {
            const response = getBotResponse(input.toLowerCase());
            setMessages(prev => [...prev, { text: response, isBot: true }]);
        }, 1000);
    };

    const getBotResponse = (message) => {
        if (message.includes('prix') || message.includes('tarif')) {
            return 'Pour obtenir un devis personnalisé, veuillez nous indiquer vos besoins spécifiques.';
        }
        if (message.includes('horaire') || message.includes('ouvert')) {
            return 'Nous sommes ouverts du lundi au vendredi de 9h à 18h.';
        }
        if (message.includes('adresse') || message.includes('où')) {
            return 'Nous sommes situés au Centre de Formation Professionnelle HASSANIA.';
        }
        return 'Pour toute question spécifique, notre équipe est disponible au 0123456789 ou par email à contact@example.com';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <>
            <Back title='Contactez-nous' />
            <div className="contact" style={{paddingBottom:"100px"}}> 
                <div className="container grid2 flexsm" style={{ gap: '2rem' }}>
                    <div className="left" style={{ height: '70vh' }}>
                        <iframe 
                            src={map} 
                            title='map' 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                border: 'none',
                                borderRadius: '15px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              
                            }}
                        ></iframe>
                    </div>
                    <div className="right">
                        <Heading 
                            title='CONTACTEZ-NOUS' 
                            subtitle='Si vous avez des questions, veuillez nous contacter'
                        />
                      
                        <div className="chat-container" style={{ 
                            border: '1px solid #e5e7eb',
                            borderRadius: '15px',
                            height: '400px',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}>
                            <div className="chat-messages" style={{
                                flex: 1,
                                overflowY: 'auto',
                                padding: '1rem'
                            }}>
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`message ${message.isBot ? 'bot' : 'user'}`}
                                        style={{
                                            display: 'flex',
                                            justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                                            marginBottom: '1rem'
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '80%',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '1rem',
                                            backgroundColor: message.isBot ? '#f3f4f6' : '#3b82f6',
                                            color: message.isBot ? 'black' : 'white'
                                        }}>
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{
                                borderTop: '1px solid #e5e7eb',
                                padding: '1rem',
                                display: 'flex',
                                gap: '0.5rem'
                            }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Écrivez votre message..."
                                    style={{
                                        flex: 1,
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.5rem',
                                        border: '1px solid #e5e7eb',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        padding: '0.5rem',
                                        borderRadius: '0.5rem',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Contact;