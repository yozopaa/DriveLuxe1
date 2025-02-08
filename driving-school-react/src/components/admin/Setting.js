//Setting.js
import React, { useState } from 'react';
import { Button, TextField, Grid, Paper } from '@mui/material';

const AdminSettings = () => {
//   // Initial state for the settings form
//   const [settings, setSettings] = useState({
//     schoolName: 'DriveLuxe School',
//     phone: '0613427395',
//     email: 'DriveLuxe@gmail.com',
//     address: 'Hassania ,ben Msik, Casa blanca',
//     courseFee: 200,
//     logo: null,  // To hold the uploaded logo URL
//     mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d791.1470957079982!2d-7.5799631000000005!3d33.559458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda633f7ff865e5f%3A0x4f052c8a470a509b!2sVocational%20Training%20Center%20Hassania%20In%20Les%20M%C3%A9tiers%20De%20Gestion%20Et%20Du%20Digital!5e1!3m2!1sen!2sma!4v1736194884510!5m2!1sen!2sma"
//   });

//   // Handler to update form field values
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSettings({ ...settings, [name]: value });
//   };

//   // Handler for the logo upload
//   const handleLogoChange = (e) => {
//     const logo = e.target.files[0];
//     if (logo) {
//       setSettings({ ...settings, logo: URL.createObjectURL(logo) });
//     }
//   };

//   // Handle form submission (saving settings)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Save settings to your backend or local state here
//     console.log('Updated Settings:', settings);
//   };

//   return (
//     <div>
//       <h2>Auto-École Settings</h2>

//       <Paper style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="School Name"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.schoolName}
//                 onChange={handleChange}
//                 name="schoolName"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Phone"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.phone}
//                 onChange={handleChange}
//                 name="phone"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Email"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.email}
//                 onChange={handleChange}
//                 name="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.address}
//                 onChange={handleChange}
//                 name="address"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Course Fee"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.courseFee}
//                 onChange={handleChange}
//                 name="courseFee"
//                 type="number"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 style={{ marginTop: '10px' }}
//               />
//               {settings.logo && (
//                 <div>
//                   <h4>Uploaded Logo:</h4>
//                   <img src={settings.logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
//                 </div>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Map URL"
//                 variant="outlined"
//                 fullWidth
//                 value={settings.mapUrl}
//                 onChange={handleChange}
//                 name="mapUrl"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button type="submit" variant="contained" color="primary">
//                 Save Settings
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </div>
//   );
};

export default AdminSettings;
