function ProfileCard({ name, role, initials, accent }) {
  return (
    <article className="profile-card" style={{ '--card-accent': accent }}>
      <div className="profile-avatar" aria-hidden="true">{initials}</div>
      <div>
        <h2>{name}</h2>
        <p>{role}</p>
      </div>
      <span className="profile-status">Active</span>
    </article>
  )
}

export default ProfileCard