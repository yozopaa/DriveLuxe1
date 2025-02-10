import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Heading from '../common/Heading';
import Back from '../common/Back';
import './appointment.css';

const Appointment = () => {
   const [success, setSuccess] = useState(false);
   const [lessonData, setLessonData] = useState({
       name: '',
       email: '',
       courseType: '',
       carType: '',
       message: '',
   });

   const handleInputChange = (event) => {
       const { name, value } = event.target;
       setLessonData(prev => ({ ...prev, [name]: value }));
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       
       try {
           await emailjs.send(
               'service_vgqch7m',
               'template_iz91aqs',
               {
                   from_name: lessonData.name,
                   reply_to: lessonData.email,
                   course_type: lessonData.courseType,
                   car_type: lessonData.carType,
                   message: lessonData.message,
               },
               'NImykX8tsswoC_mY1'
           );

           setSuccess(true);
           setLessonData({
               name: '',
               email: '',
               courseType: '',
               carType: '',
               message: '',
           });

           setTimeout(() => setSuccess(false), 5000);
       } catch (error) {
           console.error('Error sending email:', error);
           alert('Erreur lors de l\'envoi du message.');
       }
   };

   return (
       <>
           <Back title="Appointment" />
           <div className="appointment">
               <div className="container grid2 flexsm">
                   <div className="left">
                       <div className="img">
                           <img src="./img/about-2.jpg" alt="" />
                           <img src="./img/about-1.jpg" alt="" />
                       </div>
                   </div>
                   <div className="right">
                       {success && (
                           <div style={{
                               padding: '15px',
                               backgroundColor: '#4CAF50',
                               color: 'white',
                               borderRadius: '5px',
                               marginBottom: '20px',
                               textAlign: 'center'
                           }}>
                               Message envoyé avec succès!
                           </div>
                       )}
                       <Heading 
                           title="INSCRIVEZ-VOUS À NOS COURS" 
                           subtitle="Inscrivez-vous dès aujourd'hui pour nos leçons et préparez-vous à réussir votre permis" 
                       />
                       <form className="appoint-in" onSubmit={handleSubmit}>
                           <div className="one">
                               <input
                                   type="text"
                                   name="name"
                                   placeholder="Votre nom"
                                   style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                                   value={lessonData.name}
                                   onChange={handleInputChange}
                                   required
                               />
                               <input
                                   type="email"
                                   name="email"
                                   placeholder="Votre email"
                                   style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                                   value={lessonData.email}
                                   onChange={handleInputChange}
                                   required
                               />
                           </div>
                           <div className="two">
                               <input
                                   type="text"
                                   name="courseType"
                                   placeholder="Type de cours"
                                   style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                                   value={lessonData.courseType}
                                   onChange={handleInputChange}
                                   required
                               />
                               <input
                                   type="text"
                                   name="carType"
                                   placeholder="Type de voiture"
                                   style={{ borderRadius: '15px', boxShadow: '0px 1px 5px black' }}
                                   value={lessonData.carType}
                                   onChange={handleInputChange}
                                   required
                               />
                           </div>
                           <textarea
                               name="message"
                               placeholder="Message"
                               cols="30"
                               rows="5"
                               style={{ boxShadow: '0px 1px 5px black' }}
                               value={lessonData.message}
                               onChange={handleInputChange}
                               required
                           ></textarea>
                           <input
                               type="submit"
                               value="Envoyer"
                               style={{ 
                                   borderRadius: '50px', 
                                   border: "none", 
                                   height: "50px",
                                   marginTop: "10px",
                                   backgroundColor: "#f3be00de",
                                   boxShadow: '0px 1px 5px black', 
                                   fontSize: '18px',
                                   cursor: 'pointer'
                               }}
                           />
                       </form>
                   </div>
               </div>
           </div>
       </>
   );
};

export default Appointment;