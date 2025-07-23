'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {

    const pathname = usePathname()
    
    return (
        <nav className="navbar navbar-expand-lg py-5 px-4" style={{zIndex: 2}}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" href="/">OLIVIA OOMEN</Link>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end align-middle" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link 
                            className={"nav-link active fw-bold " + ( (pathname === '/work') ? "text-decoration-line-through" : '')}
                            href="/work"
                        >WORK</Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={"nav-link active fw-bold " + (pathname === '/honors-portfolio' ? "text-decoration-line-through" : '')}
                            href="/honors-portfolio"
                        >HONORS PORTFOLIO</Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={"nav-link active fw-bold " + (pathname === '/about' ? "text-decoration-line-through" : '')}
                            href="/about"
                        >ABOUT</Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}