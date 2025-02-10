import React from 'react';
import { useHistory } from 'react-router-dom';
import Back from '../common/Back';
import './error.css';

const Error = () => {
    const history = useHistory();

    const handleReturnHome = () => {
        history.push('/');
    };

    return (
        <>
            <Back title='404 Error' />
            <div className="container">
                <div className="error" role="alert">
                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                    <h2>404</h2>
                    <h1>Page Non Trouvée</h1>
                    <p>
                        Nous sommes désolés, la page que vous recherchez n'existe pas sur notre site ! 
                        Peut-être allez-vous sur notre page d'accueil ou essayez-vous d'utiliser une recherche ?
                    </p>
                    <button 
                        onClick={handleReturnHome}
                        aria-label="Retourner à la page d'accueil"
                    >
                        Retourner à l'Accueil
                    </button>
                </div>
            </div>
        </>
    );
};

export default Error;