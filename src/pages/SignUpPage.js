import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddRowsComponent from '../components/AddRowsComponent';

export default function SignUpComponent(props) {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("/signin");
    }
    // const [inputValues,setInputValues] = useState({});
    // const handleInputChangfe = (e)=>{
    //     if(e && e.target && e.target.value && e.target.id){
    //         setInputValues({
    //             ...inputValues,
    //             [e.target.id]:e.target.value
    //         });
    //     }
    // }
    const [firstName, setFirstName] = useState("");
    const handleFirstName = (e) => {
        if (e && e.target && e.target.value)
            setFirstName(e.target.value)
    }
    const [lastName, setLastName] = useState("");
    const handleLastName = (e) => {
        if (e && e.target && e.target.value)
            setLastName(e.target.value)
    }
    const [email, setEmail] = useState("");
    const handleEmail = (e) => {
        if (e && e.target && e.target.value)
            setEmail(e.target.value)
    }
    const [dateOfBirth, setDateOfBirth] = useState("");
    const handleDateOfBirth = (e) => {
        if (e && e.target && e.target.value)
            setDateOfBirth(e.target.value)
    }
    const [password, setPassword] = useState("");
    const handlePassword = (e) => {
        if (e && e.target && e.target.value)
            setPassword(e.target.value)
    }
    const [confirmPassword, setConfirmPassword] = useState("");
    const handleConfirmPassword = (e) => {
        if (e && e.target && e.target.value)
            setConfirmPassword(e.target.value)
    }
    const registerUser = function () {

        let allValidFields = true;
        if (password && confirmPassword && password !== confirmPassword) {
            alert("Password and Confirm Password do no match...!!");
            allValidFields = false
        }
        if (allValidFields) {
            var usersList = JSON.parse(localStorage.getItem("usersList"));
            var userObj = { Name: firstName, SName: lastName, 
                Email: email, DoB: dateOfBirth, 
                Password: password, Status: "Active" };
            if (usersList == null) {
                usersList = [];
            }
            usersList.push(userObj);
            localStorage.setItem("usersList", JSON.stringify(usersList));
            alert("Succesfully SignedUp now log in to account ")
            handleSignIn();
        }
    }
    const validateUser = function () {
        var usersList = JSON.parse(localStorage.getItem("usersList"));
        let age = undefined;
        if (dateOfBirth) {
            let birthDate = new Date(dateOfBirth);
            var today = new Date();
            age = Math.abs((today.getTime() - birthDate.getTime()) / (1000 * 3600 * 24 * 365.25));

        }
        if (age && age < 18) {
            alert("You are not a valid User (age must be 18+)");
        } else {
            var em = document.getElementById("mailSignup");
            // var users = JSON.parse(localStorage.getItem("usersList"));
            var isEmailInUse = false;
            if (usersList && usersList.length > 0) {
                for (let i = 0; i < usersList.length; i++) {
                    if (em == usersList[i].Email) {
                        alert("Email already Exists , use another");
                        isEmailInUse = true;
                        break;
                    }
                }
            }
            if (isEmailInUse != true)
                registerUser();
        }
    }
    let rows = [
        {
            rowLabel: "First Name ",
            inputClassname: "txtin",
            inputId: "firstName",
            inputType: "text",
            handleChange: { handleFirstName }
        },
        {
            rowLabel: "Last Name ",
            inputClassname: "txtin",
            inputId: "lastName",
            inputType: "text",
            handleChange: { handleLastName }
        },
        {
            rowLabel: "Email ",
            inputClassname: "txtin",
            inputId: "mailSignup",
            inputType: "Email",
            handleChange: { handleEmail }
        },
        {
            rowLabel: "Date of Birth ",
            inputClassname: "txtin",
            inputId: "dob",
            inputType: "date",
            handleChange: {handleDateOfBirth}
        },
        {
            rowLabel: "Password ",
            inputClassname: "txtin",
            inputId: "passSignup",
            inputType: "password",
            handleChange: {handlePassword}
        },
        {
            rowLabel: "Confirm Password ",
            inputClassname: "txtin",
            inputId: "confirmPass",
            inputType: "password",
            handleChange: {handleConfirmPassword}
        }
    ]
    return (
        <div>
            <div id="top1" className="bg bg-warning"> Sign Up </div>
            <table id="outer">
                <tbody>
                    <tr>
                        <th className="lc"><button className="btn btn-info" onClick={handleSignIn}>Sign In</button></th>
                        <th className="lr">sign in if you already have an account</th>
                    </tr>
                    <tr>
                        <td colspan="2">Fill information to SignUp</td>
                    </tr>
                    <AddRowsComponent rows={rows} />
                    <tr>
                        <td colSpan="2"><button className="btn btn-primary" onClick={validateUser}>SignUp</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
