import { NavLink, Outlet } from "react-router-dom";
import "./ProfilePage.css"

function ProfilePage() {
    return (
        <main className="profile-page">
            <section className="profile-header">
                <h1>Your Profile</h1>

                <p className="profile-bio">
                    Your bio will go here.
                </p>
            </section>

            <nav className="profile-tabs">
                <NavLink to="/profile" end>
                    Overview
                </NavLink>

                <NavLink to="/profile/albums">
                    Albums
                </NavLink>

                <NavLink to="/profile/reviews">
                    Reviews
                </NavLink>

                <NavLink to="/profile/spins">
                    Spins
                </NavLink>

                <NavLink to="/profile/lists">
                    Lists
                </NavLink>
            </nav>

            <section className="profile-content">
                <Outlet />
            </section>
        </main>
    );
}

export default ProfilePage;