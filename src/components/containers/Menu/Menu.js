import React from 'react';

import { Sidebar} from 'primereact/sidebar';
import "./Menu.css"

const Dashboard = () => {
  const [visible, setVisible] = React.useState(true);
 
  return (
    
    <>
    
    <div className="card flex justify-content-center">
            <Sidebar visible={true}  className="w-full md:w-20rem lg:w-30rem ">
                <h2>Sidebar</h2>

            </Sidebar>
        </div>
    </>
  );
};
export default Dashboard;