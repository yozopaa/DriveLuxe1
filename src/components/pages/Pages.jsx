// Pages.js
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Home from "../home/Home";
import About from "../about/About";
import Courses from "../courses/Courses";
import Features from "../features/Features";
import Appointement from '../appointment/Appointment';
import Team from "../team/Team";
import Testimonial from "../testimonial/Testimonial";
import Error from "../404_page/Error";
import Contact from "../contact/Contact";
import Login from '../login/Login';
import Signup from '../signup/Signup';
import MotorcycleCourse from '../courses/MotorcycleCourse';
import CarCourse from '../courses/CarCourse';
import TruckCourse from '../courses/TruckCourse';
// Import role-specific components
import CandidateProfile from '../candidates/CandidateProfile';
import CandidateProgress from '../candidates/CandidateProgress';
import MonitorProfile from '../monitors/MonitorProfile';
import MonitorDashboard from '../monitors/MonitorDashboard';
import AssistantProfile from '../assistants/AssistantProfile';
import AssistantDashboard from '../assistants/AssistantDashboard';
import AdminDashboard from '../admin/dashboard';
import ManageTrainers from '../admin/ManageTrainers';
import ManageAssistants from '../admin/ManageAssistants';
import AdminStudent from '../admin/Students'
import ForgotPassword from "../login/Forgotpassword";
// Layout Components
const PublicLayout = ({ children }) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

const CandidateLayout = ({ children }) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

const DashboardLayout = ({ children }) => (
    <>
        {children}
    </>
);

// Protected Route Component
const ProtectedRoute = ({ component: Component, layout: Layout = DashboardLayout, role, ...rest }) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <Route
            {...rest}
            render={props => {
                if (!user) {
                    return <Redirect to="/login" />;
                }
                if (role && user.role !== role) {
                    return <Redirect to="/error" />;
                }
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                );
            }}
        />
    );
};

const Pages = () => {
    return (
        <Router>
            <Switch>
                {/* Candidate Routes (with Header & Footer) */}
                <ProtectedRoute
                    path="/candidate/profile/:email"
                    component={CandidateProfile}
                    layout={CandidateLayout}
                    role="candidate"
                />
                <ProtectedRoute
                    path="/candidate/progress/:email"
                    component={CandidateProgress}
                    layout={CandidateLayout}
                    role="candidate"
                />

                {/* Admin Routes */}
                <ProtectedRoute
                    path="/admin/dashboard/:email"
                    component={AdminDashboard}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/trainers"
                    component={ManageTrainers}
                    role="admin"
                />
                <ProtectedRoute
                    path="/admin/assistants"
                    component={ManageAssistants}
                    role="admin"
                />

                {/* Monitor Routes */}
                <ProtectedRoute
                    path="/monitor/profile/:email"
                    component={MonitorProfile}
                    role="trainer"
                />
                <ProtectedRoute
                    path="/monitor/dashboard/:email"
                    component={MonitorDashboard}
                    role="trainer"
                />

                {/* Assistant Routes */}
                <ProtectedRoute
                    path="/assistant/profile/:email"
                    component={AssistantProfile}
                    role="assistant"
                />
                <ProtectedRoute
                    path="/assistant/dashboard/:email"
                    component={AssistantDashboard}
                    role="assistant"
                />

                {/* Public routes */}
                <Route exact path='/'>
                    <PublicLayout>
                        <Home />
                    </PublicLayout>
                </Route>

                <Route exact path='/about'>
                    <PublicLayout>
                        <About />
                    </PublicLayout>
                </Route>
                <Route exact path='/courses'>
                    <PublicLayout>
                        <Courses />
                    </PublicLayout>
                </Route>
                <Route exact path='/features'>
                    <PublicLayout>
                        <Features />
                    </PublicLayout>
                </Route>
                <Route exact path='/our-team'>
                    <PublicLayout>
                        <Team />
                    </PublicLayout>
                </Route>
                <Route exact path='/Appointment'>
                    <PublicLayout>
                        <Appointement />
                    </PublicLayout>
                </Route>
                <Route exact path='/testimonial'>
                    <PublicLayout>
                        <Testimonial />
                    </PublicLayout>
                </Route>
                <Route exact path='/contact'>
                    <PublicLayout>
                        <Contact />
                    </PublicLayout>
                </Route>
                <Route exact path='/login'>
                    <PublicLayout>
                        <Login />
                    </PublicLayout>
                </Route>
                <Route exact path='/signup'>
                    <PublicLayout>
                        <Signup />
                    </PublicLayout>
                </Route>
                <Route exact path='/forgot-password'>
  <PublicLayout>
    <ForgotPassword />
  </PublicLayout>
</Route>
                <Route exact path='/courses/motorcycle'>
    <PublicLayout>
        <MotorcycleCourse />
    </PublicLayout>
</Route>
<Route exact path='/courses/car'>
    <PublicLayout>
        <CarCourse />
    </PublicLayout>
</Route>
<Route exact path='/courses/truck'>
    <PublicLayout>
        <TruckCourse />
    </PublicLayout>
</Route>
                <Route exact path='/error'>
                    <PublicLayout>
                        <Error />
                    </PublicLayout>
                </Route>
            </Switch>
        </Router>
    );
}

export default Pages;