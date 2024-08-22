import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
    const [form,setForm] = useState<{username:string,email:string,
        password:string, confirmPassword:string}>({
        username: '',
        email: '',
        password:'',
        confirmPassword:'',
    });

    const toastoptins = {
        positon :"bottom-right",
        autoClose: 8000,
        // closeOnClick: true,
        pauseOnHover: true,
        // draggable: false,
        // progress: undefined,  
        theme:"dark"
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = handleValidation();
        if (isValid) {
          toast.success("Form submitted successfully!", {
            position: "top-right",
            autoClose: 3000,
    
          });
          // Perform API call or any other backend operations here, e.g.:
          const api = await axios.post('http://localhost:4000/api/register', form)
             .then(response => {
                 console.log(response);
             })
             .catch(error => {
                 console.error(error);
             });

          // Clear form inputs after successful submission
          setForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
          // Reset form after successful submission
          setForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }

    }

    const handleInput = (event : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // console.log(`Changing ${name} to ${value}`);
        setForm({...form, [name]: value });
    } 

    const handleValidation = () => {
        const { username,email,password, confirmPassword } = form;
            
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", toastoptins);
          return false; // Return false if validation fails
        }
        else if (username.length < 3){
            toast.error("username should be greater than 3 characters long!", toastoptins);
            return false;
        }
        else if (password.length < 8){
            toast.error("Password should be at least 8 characters long!", toastoptins);
            return false;
        }
        return true; // Return true if validation passes
  };

    return (
        <div className="container">
            <div className="form-container mx-auto mt-5 p-4" style={{ maxWidth: '400px', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
                <ToastContainer/>
                <h2 className="text-center">SNAPPY</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name='username'
                            placeholder="Enter username"
                            value={form.username}
                            onChange={(e)=> handleInput(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name='email'
                            placeholder="Enter email"
                            value={form.email}
                            onChange={(e)=> handleInput(e)}
                            required                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name='password'
                            placeholder="Enter password"
                            value={form.password}
                            onChange={(e)=> handleInput(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name='confirmPassword'
                            placeholder="Confirm password"
                            value={form.confirmPassword}
                            onChange={(e)=> handleInput(e)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">CREATE USER</button>
                </form>
                <p className="text-center mt-3">ALREADY HAVE AN ACCOUNT? <a href="#" className="text-primary">LOGIN</a></p>
            </div>
        </div>
    );
};

export default SignUpForm;