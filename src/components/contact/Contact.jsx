import React, { useState } from 'react';
import Back from '../common/Back';
import Heading from '../common/Heading';
import { MessageCircle, Send } from 'lucide-react';

const Contact = () => {
    const [messages, setMessages] = useState([
        { text: "Bonjour! Comment puis-je vous aider aujourd'hui?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const map = "https://www.google.com/maps/embed?...";

    const handleSend = () => {
        if (!input.trim()) return;
        const userMessage = { text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const response = getBotResponse(input.toLowerCase());
            setMessages(prev => [...prev, { text: response, isBot: true }]);
            setIsTyping(false);
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
        if (message.includes('contact')) {
            return 'Vous pouvez nous appeler au 0123456789 ou envoyer un email à contact@example.com';
        }
        return 'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question?';
    };

    return (
        <>
            <Back title='Contactez-nous' />
            <div className="contact" style={{ paddingBottom: "100px" }}>
                <div className="container grid2 flexsm" style={{ gap: '2rem' }}>
                    <div className="left" style={{ height: '70vh' }}>
                        <iframe 
                            src={map} 
                            title='map' 
                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '15px' }}
                        ></iframe>
                    </div>
                    <div className="right">
                        <Heading title='CONTACTEZ-NOUS' subtitle='Si vous avez des questions, veuillez nous contacter' />
                        <div className="chat-container" style={{ border: '1px solid #e5e7eb', borderRadius: '15px', height: '400px', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
                            <div className="chat-messages" style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
                                {messages.map((message, index) => (
                                    <div key={index} className={message.isBot ? 'bot' : 'user'} style={{ display: 'flex', justifyContent: message.isBot ? 'flex-start' : 'flex-end', marginBottom: '1rem' }}>
                                        <div style={{ maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: '1rem', backgroundColor: message.isBot ? '#f3f4f6' : '#3b82f6', color: message.isBot ? 'black' : 'white' }}>
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && <div style={{ color: '#888', fontSize: '14px', marginLeft: '10px' }}>Le bot écrit...</div>}
                            </div>
                            <div style={{ borderTop: '1px solid #e5e7eb', padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    style={{ flex: 1, padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', outline: 'none' }}
                                />
                                <button onClick={handleSend} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
