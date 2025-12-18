# Design Guidelines: Customizable Profile Platform

## Design Approach
**Hybrid Approach**: Discord-inspired aesthetic + Modern profile platform (Linktree/Carrd) patterns
- Discord's bold gradient backgrounds and clean card-based layouts
- Linktree's social link organization and mobile-first thinking
- Focus on customization controls and live preview functionality

## Core Design Elements

### Typography
**Font Stack**: Inter or DM Sans via Google Fonts
- Headers: 600-700 weight, sizes 2xl to 4xl
- Body text: 400-500 weight, base to lg sizes
- Social links: 500 weight, lg size
- Form labels: 500 weight, sm size

### Layout System
**Spacing**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, py-8)
- Profile cards: p-6 to p-8
- Section spacing: space-y-6 to space-y-8
- Input fields: p-4
- Container max-width: max-w-4xl for profiles, max-w-6xl for dashboard

### Profile Page Structure

**Banner Section**:
- Full-width gradient background (h-48 to h-64)
- Support for animated GIF overlays
- Smooth gradient transitions between top and bottom colors

**Profile Header**:
- Profile picture (w-24 h-24 to w-32 h-32) overlapping banner by 50%
- Rounded-full with border (border-4)
- Username display (text-2xl font-bold)
- Bio/tagline (text-lg, muted)

**About Me Section**:
- Large text area with max-w-2xl
- Generous vertical padding (py-8)
- Support for line breaks and paragraphs
- Readable line height (leading-relaxed)

**Social Links Grid**:
- Stacked vertical layout (space-y-3)
- Each link as full-width card with icon + label
- Consistent height (h-14 to h-16)
- Hover state with subtle elevation
- Platform-specific icons using Heroicons or Font Awesome

### Dashboard/Editor Interface

**Two-Panel Layout**:
- Left: Live Preview (w-full lg:w-1/2, sticky positioning)
- Right: Editor Controls (w-full lg:w-1/2, scrollable)

**Control Sections**:
1. **Banner & Colors**: Gradient picker with top/bottom color inputs, GIF upload area
2. **Profile Info**: Image upload, name input, tagline input
3. **About Section**: Large textarea (min-h-48)
4. **Social Links**: Add/remove/reorder interface with drag handles
5. **Theme Settings**: Color palette selector, layout options

**Editor Components**:
- Form inputs with labels above (space-y-1)
- Color pickers with preview squares
- File upload with drag-drop zones (border-dashed, hover states)
- Save/Cancel buttons always visible (sticky bottom or top)

### Component Library

**Cards**: Rounded-lg to rounded-xl, subtle shadow or border, p-6
**Buttons**: 
- Primary: Full rounded (rounded-full), px-6 py-3
- Secondary: Similar but lighter treatment
- Icon buttons: Square with rounded-lg, p-3
**Inputs**: Rounded-lg, border, px-4 py-3, focus:ring treatment
**Color Pickers**: Square preview (w-12 h-12) + hex input combo
**Upload Zones**: Dashed border, min-h-32, centered content

### Gradient System
**Discord-Style Gradients**:
- Use CSS linear-gradient from top to bottom
- Default palettes: Purple-to-blue, Pink-to-orange, Green-to-teal
- User-defined: Two color pickers for full control
- Smooth transitions (60-70% color stop for blend)

### Responsive Behavior
- Mobile (base): Single column, full-width social links, stacked editor
- Tablet (md): Improved spacing, larger profile elements
- Desktop (lg): Side-by-side editor + preview

### Images
**Profile Avatar**: User-uploaded, circular crop, supports JPG/PNG
**Banner**: User-uploaded, supports GIF/JPG/PNG, 16:9 aspect ratio recommended
**Platform Icons**: Use Font Awesome for social media logos (fa-instagram, fa-youtube, etc.)

### Animations
**Minimal & Purposeful**:
- Smooth gradient transitions on theme change (transition-all duration-300)
- Gentle hover states on social links (transform scale-105)
- Color picker changes with fade (transition-colors)
- No scroll-triggered or complex animations

### Social Link Specifications
**Supported Platforms**: Instagram, YouTube, Facebook, X, Telegram, WhatsApp, Discord, Spotify, GitHub, Website/Custom
**Layout**: Icon (left) + Platform name + Arrow/Chevron (right)
**Interaction**: Full card clickable, external link icon indicator

This profile platform prioritizes customization control, clean visual hierarchy, and Discord's vibrant aesthetic while maintaining usability for profile creation and editing.