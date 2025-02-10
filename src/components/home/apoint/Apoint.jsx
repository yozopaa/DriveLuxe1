import React, { useState } from 'react';
import './apoint.css';

const Apoint = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        courseType: '',
        carType: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // Example of sending data to a server or logging it
        alert('Submitted Data:', formData);

        // Optionally, reset the form
        setFormData({
            name: '',
            email: '',
            courseType: '',
            carType: '',
            message: '',
        });
    };

    return (
        <>
            <form 
                className='apoint' 
                style={{ borderRadius: '10px', boxShadow: '0px 5px 15px black ' }}
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
            >
                <h2>Prendre un rendez-vous</h2>
                <div className="one">
                    <input
                        type="text"
                        name="name"
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Votre email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                    />
                </div>
                <div className="two">
                    <input
                        type="text"
                        name="courseType"
                        placeholder="Type de cours"
                        value={formData.courseType}
                        onChange={handleChange}
                        style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                    />
                    <input
                        type="text"
                        name="carType"
                        placeholder="Type de voiture"
                        value={formData.carType}
                        onChange={handleChange}
                        style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Message"
                    cols="30"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                ></textarea>
                <input
                    type="submit"
                    value="Soumettre"
                    style={{ borderRadius: '50px' , border:"none", height : "50px",marginTop:"10px",backgroundColor:"#133c66ef", cursor:"pointer", color:"white", fontSize:"18px" }}
                />
            </form>
        </>
    );
};

export default Apoint;
