// Canonical set of external authority/profile links for the Rautaki entity
// graph. Single source for the JSON-LD sameAs arrays (layout.tsx) and the
// llms.txt / llms-full.txt routes, so the surfaces cannot drift.

export const orgProfiles = {
  linkedIn: "https://www.linkedin.com/in/harry-witzthum-25b814a/",
  uidRegister: "https://www.uid.admin.ch/Detail.aspx?uid_id=CHE-362.050.451",
  wikidata: "https://www.wikidata.org/wiki/Q140457396",
  googleBusiness: "https://share.google/T7mqIG90h8HLrLNrW",
} as const;

export const personProfiles = {
  linkedIn: orgProfiles.linkedIn,
  researchGate: "https://www.researchgate.net/profile/Harry-Witzthum",
} as const;

export const orgSameAs = Object.values(orgProfiles);
export const personSameAs = Object.values(personProfiles);
