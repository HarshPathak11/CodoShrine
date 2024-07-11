import React from "react";
import './landing.css';
import SignInForm from "./signin";
function Landing(){
    const[signin,setsignin]=React.useState(true);
    return(
        <div>
            <section>
      <div class="content h-[70vh] flex-col">   
       <SignInForm/>
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

export default Landing;