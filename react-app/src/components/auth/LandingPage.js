import { Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import LogoutButton from './LogoutButton';
import './login.css'




export default function LandingPage() {
    return (
        <>
            <div className='landing-container'>
                <div className='landing-container-left'>
                    <div id='landing-container-left-text'>
                    Plan, manage, and organize your work in one place. It's work, any way you want it.
                    </div>
                    </div>
                <div className='landing-container-right'>
                    <Route path='/login' exact={true}>
                        <LoginForm />
                    </Route>
                    <Route path='/sign-up' exact={true}>
                        <SignUpForm />
                    </Route>
                </div>
            </div>
        </>
    )
}
