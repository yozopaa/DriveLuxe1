import * as React from 'react';
import '@fontsource/fira-sans';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountCircle as AccountIcon,
  EventNote as CalendarIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CalendarComponent from './calender';
import Payments from './Payements';
import Dashcontent from './dashContent';
import Students from './Students';
import Employers from './EmployeComponent';
import Setting from './Setting';

// Menu Items Array
const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: DashboardIcon },
  { id: 'calendar', label: 'Calendrier', icon: CalendarIcon },
  { id: 'payments', label: 'Paiements', icon: AccountIcon },
  { id: 'students', label: 'Étudiants', icon: PeopleIcon },
  { id: 'employers', label: 'Personnel', icon: WorkIcon },

];

function Dashboard() {

// In the render method:
  const [darkMode, setDarkMode] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState('dashboard');
  const [session, setSession] = React.useState({
    user: {
      name: '',
      email: '',
    },
  });
  const { email } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
};

{selectedMenu === 'dashboard' && <Dashcontent handleMenuClick={handleMenuClick} />}

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/auth/users/${email}`);
        const data = await response.json();
        
        setSession({
          user: {
            name: data.fullName,
            email: data.email,
          },
        });
      } catch (err) {
        setError('Échec du chargement des données utilisateur');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    history.push('/login');
  };

 
  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const checkSession = () => {
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        if (!token || !user || user.role !== 'admin') {
            history.push('/login');
        }
    };

    checkSession();
}, [history]);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#ffffff',
      },
      background: {
        default: darkMode ? '#333' : '#f3f3f3',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
    },
    typography: {
      fontFamily: 'Fira Sans, sans-serif',
    },
  });

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashcontent />;
      case 'calendar':
        return <CalendarComponent />;
      case 'payments':
        return <Payments />;
      case 'students':
        return <Students />;
      case 'employers':
        return <Employers role={selectedMenu === 'employers' ? 'trainer' : null} />;
     
      default:
        return <Typography variant="h6">Bienvenue sur votre tableau de bord</Typography>;
    }
  };

  if (loading) {
    return <Box p={3}>Chargement...</Box>;
  }
  
  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              bgcolor: darkMode ? '#424242' : '#ffffff',
              color: darkMode ? 'gray.500' : 'gray.500',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 24 24" style={{ paddingRight: '5px' }}>
                <path d="M23.5 7c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202zm-1.441 3.506c.639 1.186.946 2.252.946 3.666 0 1.37-.397 2.533-1.005 3.981v1.847c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1h-13v1c0 .552-.448 1-1 1h-1.5c-.552 0-1-.448-1-1v-1.847c-.608-1.448-1.005-2.611-1.005-3.981 0-1.414.307-2.48.946-3.666.829-1.537 1.851-3.453 2.93-5.252.828-1.382 1.262-1.707 2.278-1.889 1.532-.275 2.918-.365 4.851-.365s3.319.09 4.851.365c1.016.182 1.45.507 2.278 1.889 1.079 1.799 2.101 3.715 2.93 5.252zm-16.059 2.994c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm10 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm2.941-5.527s-.74-1.826-1.631-3.142c-.202-.298-.515-.502-.869-.566-1.511-.272-2.835-.359-4.441-.359s-2.93.087-4.441.359c-.354.063-.667.267-.869.566-.891 1.315-1.631 3.142-1.631 3.142 1.64.313 4.309.497 6.941.497s5.301-.184 6.941-.497zm2.059 4.527c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-18.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2z" fill="#f3be00b2" />
              </svg>
              <span style={{ fontSize: '30px', color: '#f3be00b2', fontWeight: 'bold' }}>DriveLuxe</span>
            </Box>

            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  sx={{
                    mr: 3,
                    width: 220,
                    height: 60,
                    backgroundColor: selectedMenu === item.id ? '#f3be00b2' : 'transparent',
                    color: selectedMenu === item.id ? 'white' : 'gray.500',
                    borderBottomRightRadius: selectedMenu === item.id ? '60px' : '0',
                    borderTopRightRadius: selectedMenu === item.id ? '60px' : '0',
                  }}
                >
                  <ListItemIcon>
                    <item.icon sx={{ color: selectedMenu === item.id ? 'black' : 'gray.500' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      fontFamily: "'Fira Sans', sans-serif",
                      fontWeight: 'bold',
                      color: selectedMenu === item.id ? 'black' : 'gray',
                      '& .MuiTypography-root': {
                        fontSize: '1.1rem'
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
          <AppBar position="sticky" sx={{ bgcolor: 'primary.main', color: 'text.primary' }}>
            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ ml: 1 }}>{session.user.name}</Typography>
                <Avatar
                  alt={session.user.name}
                  src={session.user.image}
                  sx={{ ml: 2, cursor: 'pointer' }}
                  onClick={handleAvatarClick}
                />

                <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
               
                  <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>

          <Box sx={{ p: 4, minHeight: '100vh' }}>
            {error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              renderContent()
            )}
          </Box>
        </Box>
      </Box>
     

    </ThemeProvider>
  );
}

export default Dashboard;