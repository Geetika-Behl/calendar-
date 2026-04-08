// ─── Calendar Constants ───────────────────────────────────────────────────────
// Single source of truth for all static data used across the calendar.
// Nothing dynamic lives here — pure lookup tables only.

export const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export const DAYS_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80", // Jan - snow
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // Feb - foggy forest
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80", // Mar - spring
  "https://images.unsplash.com/photo-1490750967868-88df5691cc34?w=800&q=80", // Apr - blossoms
  "https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=800&q=80", // May - green
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", // Jun - beach
  "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80", // Jul - summer
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", // Aug - golden
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // Sep - autumn
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80", // Oct - fall
  "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80", // Nov - misty
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80", // Dec - snow
];

export const MONTH_PALETTES = [
  { accent: "#1E9FD8", bg: "#E8F6FD", dark: "#0D5F85" }, // Jan - ice blue
  { accent: "#E8607A", bg: "#FDE8ED", dark: "#8F2D40" }, // Feb - rose
  { accent: "#4CAF6E", bg: "#E8F5EC", dark: "#2A6B3F" }, // Mar - spring green
  { accent: "#E88B3A", bg: "#FDF1E8", dark: "#8F4A1A" }, // Apr - peach
  { accent: "#5CB85C", bg: "#EBF5EB", dark: "#2E6B2E" }, // May - green
  { accent: "#1E9FD8", bg: "#E8F6FD", dark: "#0D5F85" }, // Jun - sky
  { accent: "#F4C430", bg: "#FDF7E3", dark: "#8A6E0A" }, // Jul - gold
  { accent: "#E8607A", bg: "#FDE8ED", dark: "#8F2D40" }, // Aug - warm
  { accent: "#D46B2A", bg: "#FBF0E8", dark: "#8A3A10" }, // Sep - amber
  { accent: "#C0392B", bg: "#FDECEA", dark: "#7B1A12" }, // Oct - crimson
  { accent: "#7D6EAB", bg: "#EEE8F5", dark: "#3E3060" }, // Nov - purple
  { accent: "#1E9FD8", bg: "#E8F6FD", dark: "#0D5F85" }, // Dec - winter blue
];

// Key format: "month-day" (1-indexed month, no zero-padding)
export const HOLIDAYS = {
  "1-1":   "New Year's Day",
  "1-26":  "Republic Day",
  "3-8":   "Holi",
  "8-15":  "Independence Day",
  "10-2":  "Gandhi Jayanti",
  "10-20": "Dussehra",
  "11-1":  "Diwali",
  "12-25": "Christmas",
};
