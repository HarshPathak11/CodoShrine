import React from "react";
import './landing.css';

import SignUpForm from "./signup";
function Register(){
    const[signin,setsignin]=React.useState(true);
    return(
        <div>
            <section>
      <div class="content h-[80vh] flex-col">   
       <SignUpForm/>
      </div>

      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </section>
        </div>
    )
}

export default Register;