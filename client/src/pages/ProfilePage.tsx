import { useState } from "react";
import "./ProfilePage.css";

type ProfileTab =
    | "overview"
    | "albums"
    | "spins"
    | "lists"
    | "reviews";

function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

    return (
        <main className="profile-page">
            <section className="profile-header">
                <h1>Your Profile</h1>

                <p className="profile-bio">
                    Your bio will go here.
                </p>
            </section>

            <nav className="profile-tabs">
                <button
                    className={activeTab === "overview" ? "active" : ""}
                    onClick={() => setActiveTab("overview")}
                >
                    Overview
                </button>

                <button
                    className={activeTab === "albums" ? "active" : ""}
                    onClick={() => setActiveTab("albums")}
                >
                    Albums
                </button>

                <button
                    className={activeTab === "spins" ? "active" : ""}
                    onClick={() => setActiveTab("spins")}
                >
                    Spins
                </button>

                <button
                    className={activeTab === "lists" ? "active" : ""}
                    onClick={() => setActiveTab("lists")}
                >
                    Lists
                </button>

                <button
                    className={activeTab === "reviews" ? "active" : ""}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews
                </button>
            </nav>

            <section className="profile-content">
                {activeTab === "overview" && (
                    <div>
                        <h2>Overview</h2>
                    </div>
                )}

                {activeTab === "albums" && (
                    <div>
                        <h2>Albums</h2>
                    </div>
                )}

                {activeTab === "spins" && (
                    <div>
                        <h2>Spins</h2>
                    </div>
                )}

                {activeTab === "lists" && (
                    <div>
                        <h2>Lists</h2>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div>
                        <h2>Reviews</h2>
                    </div>
                )}
            </section>
        </main>
    );
}

export default ProfilePage;