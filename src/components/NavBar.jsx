import React from 'react'

export default function NavBar() {
    return (
        <nav className='navBar'>
            <div className='nav' >
                <div className='title'>
                    <span><i className="bi bi-alipay"></i></span>
                    <span className="heading">EV</span>
                </div>
                <div className='menu'>
                    <ul>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">AboutsUs</a></li>
                        <li><a href="#">EV'S</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
