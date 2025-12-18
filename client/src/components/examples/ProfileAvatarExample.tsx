import ProfileAvatar from "../ProfileAvatar";

export default function ProfileAvatarExample() {
  return (
    <div className="pt-16 bg-card rounded-lg">
      <ProfileAvatar
        name="Rahul Kumar"
        isEditing={true}
      />
    </div>
  );
}
