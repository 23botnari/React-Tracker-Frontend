import React from 'react';

import { Sidebar} from 'primereact/sidebar';
import PrimeReact from 'primereact/api';
import { Ripple } from 'primereact/ripple';
import "./Menu.css"

const Dashboard = () => {
  const [visible, setVisible] = React.useState(true);
 
  return (
    
    <>
    
    <div className="card flex justify-content-center">
            <Sidebar visible={true}  className="w-full sm:w-15rem md:w-15rem lg:w-15rem ">
                <h2>Sidebar</h2>
   
                <a className="card text-primary bg-primary flex select-none justify-content-center align-items-center p-ripple shadow-2">
    Default
    <Ripple />
</a>
            </Sidebar>
        </div>
    </>
  );
};
export default Dashboard;