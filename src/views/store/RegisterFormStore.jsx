import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterFormStore = () => {
  // const EMAIL_REGEX = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
  // const PWD_REGEX = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/";
  const REGISTER_STORE_URL="https://backend-proyecto-final-production-0311.up.railway.app/register";

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName]= useState("");

  const navigate = useNavigate();

  const [store_name, setStoreName]= useState("");
  const [rut, setRut]= useState("");
  const [email, setEmail]= useState("");
  const [store_email, setStoreEmail]= useState("");
  const [industry, setIndustry]= useState("");
  const [address, setAddress]= useState("");
  const [password, setPassword]= useState("");
  const [auxPassword, setAuxPassword]= useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleChangeIndustry = (e) => {
    const selectedValue = e.target.value;
    setIndustry(selectedValue);
  };

  const handleSubmit = async (e) => {

    e.preventDefault(); 


    // check if passwords match
    if (password !== auxPassword) {
      setErrMsg("Passwords do not match");
      return;
    }
    // const validateEmailFormat = EMAIL_REGEX.test(email);
    // const validatePasswordFormat = PWD_REGEX.test(password);
    
    try {
      console.log("axios");
      // send axios request to backend
      const response = await axios.post(REGISTER_STORE_URL, {
        first_name,
        last_name,
        store_name,
        store_email,
        rut,
        email,
        industry,
        address,
        password,
      });
      // if response is ok, redirect to login
      if (response.status === 200) {
        navigate("/")
      }
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 409) {
        setErrMsg("Email already registered");
      } else {
        setErrMsg("Registration Failed");
      }
    }

  };

  return (
      
  <div  class="d-flex align-items-center justify-content-center bg-image">
    <div class="card text-center m-5"  style={{maxWidth: '750px'}}>
      <div class="card-body m-5 px-5">
        <h5 class="card-title text-uppercase text-center mb-5">CREATE USER ACCOUNT</h5>
        <div class="row g-2">
          <div class="col-md mb-3">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingInputGridFirstname" placeholder="First name" onChange={(e)=> setFirstName(e.target.value)} />
              <label for="floatingInputGridFirstname">First name</label>
            </div>
          </div>
          <div class="col-md mb-3">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingInputGridLastName" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)}/>
              <label for="floatingInputGridLastName">Last Name</label>
            </div>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=> setEmail(e.target.value)}/>
          <label for="floatingInput">Email address</label>
        </div>
        <small id="emailHelp" class="form-text text-muted fs-6 ">
                {" "}
                <strong>
                  contraseña debe ser alfanumerica y contener al menos una
                  mayuscula
                </strong>{" "}
              </small>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
          <label for="floatingPassword">Password</label>
      
        </div>
        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Repeat your password" onChange={(e)=> setAuxPassword(e.target.value)}/>
          <label for="floatingPassword">Repeat your password</label>
        </div>

          <h5 class="card-title text-uppercase text-center my-5">CREATE STORE ACCOUNT </h5>
        <div class="row g-2">
          <div class="col-md mb-3">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingInputGridStoreName" placeholder="Store Name" onChange={(e)=> setStoreName(e.target.value)} />
              <label for="floatingInputGridStoreName">Store Name</label>
            </div>
            </div>
              <div class="col-md mb-3">
                <div class="form-floating">
                  <input type="text" class="form-control" id="floatingInputGridRut" placeholder="RUT" onChange={(e)=> setRut(e.target.value)}/>
                  <label for="floatingInputGridRut">RUT</label>
                </div>
              </div>
            </div>
            <div class="form-floating mb-3">

              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=> setStoreEmail(e.target.value)}/>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="text" class="form-control" id="floatingInputGridRut" placeholder="RUT" onChange={(e)=> setAddress(e.target.value)}/>
              <label for="floatingInputGridAddress">Address</label>
            </div>

            <select class="form-select  mb-3" aria-label="SelectIndustry" value={industry} onChange={handleChangeIndustry}>
              {/* set industry  */}

              <option selected>Select your industry</option>
              <option>Commerce</option>
              <option>Food;Drink</option>
              <option>Other</option>
            </select>

            <div class="d-grid gap-2">
              <button type="button" class="fw-bold btn btn-primary btn-lg mb-3" onClick={handleSubmit}>Register</button>
            </div>
            {errMsg && <div className="alert alert-danger">{errMsg}</div>}
            <p class="card-text">Have already an account?  <a href="/" class="card-link text-reset fw-bold">Login here</a></p>
        </div>
    </div>
  </div>

  );
};

export default RegisterFormStore;