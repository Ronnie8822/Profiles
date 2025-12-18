import AboutSection from "../AboutSection";

export default function AboutSectionExample() {
  return (
    <div className="bg-card rounded-lg">
      <AboutSection
        content="Hey there! I'm a passionate content creator and tech enthusiast from Mumbai. I love sharing my journey through social media and connecting with amazing people from around the world. When I'm not creating content, you'll find me exploring new cafes or learning about the latest tech trends."
        isEditing={false}
      />
    </div>
  );
}

