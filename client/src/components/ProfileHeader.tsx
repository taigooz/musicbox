type ProfileHeaderProps = {
    username: string;
    bio: string;
};

function ProfileHeader({ username, bio }: ProfileHeaderProps) {
    return (
        <header className="profile-header">
            <h1>{username}</h1>

            <p className="profile-bio">
                {bio}
            </p>
        </header>
    );
}

export default ProfileHeader;