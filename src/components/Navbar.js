import React, {useState} from 'react'
import {Avatar} from '@material-ui/core'
import { GoogleLogout } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../features/userSlice'
import '../styling/navbar.css'

const Navbar = () => {
    const isSignedIn = useSelector(selectSignedIn)
    const [inputValue, setInputValue] = useState('tech')
    const userData = useSelector(selectUserData)
    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue));
      };
    return (
        <div className='navbar'>
            <h1 className="navbar__header">
                Blogmania 💬 </h1>
                {isSignedIn && (<div className="blog__search">
                    <div className='blog__search'>
                        <input 
                        className="search"
                        placeholder="Search for a blog"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <button className="submit" onClick={handleClick}>
                        Search
                    </button>
                </div>)}
            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar className="user" src={userData?.imageUrl} alt={userData?.name} />
                    <h1 className="signedIn">{userData?.givenName}</h1>
                    <GoogleLogout
                    clientId="614024400633-ipen4ch4v3iqbjcbhei4dpasav2dhkms.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <button
                        className=""
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="logout__button">
                            Logout :)
                        </button>
                    )}
                    onLogoutSuccess={logout}
                    />
                </div>
            ) : <h1 className='notSignedIn'>User not available </h1>}
        </div>
    )
}

export default Navbar
