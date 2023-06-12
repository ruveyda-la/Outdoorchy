import React from 'react';
import {Link} from'react-router-dom';

const Main = () => {
  return (
    <div>
        <div className="col-6 offset-3">
            <div className="row">
                <p>Welcome to Outdoorchy!</p>
                <p>Let's dive into new adventures!</p>
            </div>
            <div className="row">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>

    </div>
  )
}

export default Main