import React, { useState } from 'react';
import './pageStyles.css';
import TableRowComponent from '../components/TableRowComponent';
import _ from 'lodash'

function SignInPage(props) {
    const navigate = props.navigate;
    const handleSignUp = () => {
        navigate("/signup");
    }

    const logInToAcc = () => {
        var usersList = JSON.parse(localStorage.getItem("usersList"));
        var currentUser;
        var isUserExists = false;

        if (userName && userName === "admin@gmail.com") {
            if (password && password === "admin") {
                alert("Admin Login")
                props.setIsloggedIn(true);
                navigate("/");
                props.setIsLodding(false);
            } else
                alert("Wrong Password");
        }
        else if (usersList && usersList.length > 0) {
            let index = -1;
            index = _.findIndex(usersList, ['Email', userName]);
            if (index > -1) {
                currentUser = usersList[index];
                isUserExists = true;
            }
            // 		for (let i = 0; i < usersList.length; i++) {
            // 			if (usersList[i].Email === uname) {
            // 				flag = true;
            // 				p = usersList[i].Password;
            // 				userC = usersList[i];
            // 				break;
            // 			}
        }
        if (isUserExists && currentUser) {
            if (currentUser.Password && currentUser.Password === password) {
                if (currentUser.Status === "Deactive") {
                    alert("User is deactivated by admin");
                }
                else {
                    localStorage.setItem("CurrentUser", JSON.stringify(currentUser));
                    props.setIsloggedIn(true);
                    navigate("/");
                    props.setIsLodding(false);
                }
            }
            else {
                alert("Incorrect Password... Enter valid Password");
            }
        }
        else {
            if(userName!=="")
            alert("Username is not present SignUp now..!");
        }
    }
    //     fetch('https://dummyjson.com/auth/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({

    //             username: 'kminchelle',
    //             password: '0lelplR',
    //             // expiresInMins: 60, // optional
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(response=>{
    //         debugger
    //        if(response.message){
    //            alert(response.message)
    //        }else if(response.token){
    //         setIssloggedIn(true);
    //         setIsLodding(false)
    //        }
    //     });

    // // })
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleEmail = (e) => {
        if (e && e.target && e.target.value)
            setUserName(e.target.value)
    }
    const handlePassword = (e) => {
        if (e && e.target && e.target.value)
            setPassword(e.target.value)
    }
    return (
        <React.Fragment>
            <div id="top1" > Log in</div>
            {/* <form id="infosin" action="" target="_self" method="post"> */}
                <table>
                    <tbody>
                        <TableRowComponent
                            rowLabel="Email "
                            inputClassname="txtin"
                            inputId="mail"
                            inputType="Email"
                            required={true}
                            handleChange={handleEmail} />
                        <TableRowComponent
                            rowLabel="Password "
                            inputId="pass"
                            inputType="Password"
                            required={true}
                            handleChange={handlePassword} />
                        <tr>
                            <td colSpan="2"><button type="button" className="btn btn-primary" onClick={logInToAcc}>Sign In</button></td></tr>
                        <tr>
                            <th className="">Sign up if you don't have an account</th>
                            <th className=""><button type="button" className="btn btn-success" onClick={handleSignUp}>Sign Up</button></th>
                        </tr>
                    </tbody>
                </table>
            {/* </form> */}
        </React.Fragment >
    )
}

export default SignInPage