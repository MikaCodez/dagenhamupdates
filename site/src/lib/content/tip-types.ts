// Mirrors design/canvas/Tip.dc.html's type/hint/subject-placeholder data exactly.

export interface TipType {
  name: string;
  hint: string;
  subjectPlaceholder: string;
}

export const tipTypes: TipType[] = [
  {
    name: "News tip",
    hint: "Something happening now, or about to. Roadworks, closures, incidents, council decisions.",
    subjectPlaceholder: "e.g. Road closed on Rainham Road South",
  },
  {
    name: "Event listing",
    hint: "Markets, fetes, fundraisers, club nights, school and charity events.",
    subjectPlaceholder: "e.g. Autumn community market, Saturday",
  },
  {
    name: "Community notice",
    hint: "Group meetings, volunteering, lost and found, local appeals.",
    subjectPlaceholder: "e.g. Volunteers wanted for park clean-up",
  },
  {
    name: "Business update",
    hint: "Openings, closures, moves and changes to opening hours.",
    subjectPlaceholder: "e.g. New unit opening on the parade",
  },
  {
    name: "Correction",
    hint: "Tell us what we got wrong and where. We will amend and note the change.",
    subjectPlaceholder: "e.g. Wrong date on the market listing",
  },
];
