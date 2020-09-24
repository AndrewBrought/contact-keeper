import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
    const alertContext = useContext(AlertContext);

    return (
       //  It's going to look at the alerts in the context in our state, if there is anything
        //  it's going to loop through them and output this jsx
       // Adding to save to git

       alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
           <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle" /> {alert.msg}
           </div>
       ))
    );
}

export default Alerts;