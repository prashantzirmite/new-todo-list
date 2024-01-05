import { render, screen } from "@testing-library/react";
import SignInPage from "./SignInPage";

test('Sign In Test ', () => {
    render(<SignInPage />)
    let logIn = screen.getByText(/Log in/)
    expect(logIn).toBeInTheDocument() 
})