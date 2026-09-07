export type Branch = {
  name: string;
  type: string;
  address: string;
  phones: string[];
  email: string;
  mapQuery: string;
};

export const branches: Branch[] = [
  {
    name: "Thoothukudi — Registered Office",
    type: "Corporate & statutory",
    address:
      "111L/2, State Bank Colony, Polenaickenpettai, Thoothukudi – 628 002, Tamil Nadu, India",
    phones: ["+91 96004 49144"],
    email: "revengineers.tuty@gmail.com",
    mapQuery: "VECTREV Engineering Solutions, State Bank Colony, Polenaickenpettai, Thoothukudi 628002",
  },
  {
    name: "Thoothukudi — Operating Office",
    type: "Head operations & testing base",
    address: "61E/2D, TMC Colony, Polepettai, Thoothukudi – 628 002, Tamil Nadu, India",
    phones: ["+91 63796 08428", "+91 96004 49144"],
    email: "info@vectrev.in",
    mapQuery: "VECTREV Engineering Solutions, 61E/2D, Polepettai, Thoothukudi 628002, Tamil Nadu",
  },
  {
    name: "Chennai — Project Coordination",
    type: "North Tamil Nadu project desk",
    address: "Project coordination desk serving Chennai, Kancheepuram and Sriperumbudur corridors",
    phones: ["+91 63796 08428"],
    email: "info@vectrev.in",
    mapQuery: "Chennai, Tamil Nadu",
  },
  {
    name: "Pan-India Deployment",
    type: "Mobile commissioning teams",
    address:
      "Teams deployed to Karnataka, Maharashtra, Chhattisgarh, Gujarat and Andhra Pradesh project sites",
    phones: ["+91 96004 49144"],
    email: "info@vectrev.in",
    mapQuery: "India",
  },
  {
    name: "Overseas — Central & West Africa",
    type: "International T&C assignments",
    address: "Executed 225 kV switching station and substation projects in Cameroon; exports to Gabon",
    phones: ["+91 96004 49144"],
    email: "info@vectrev.in",
    mapQuery: "Yaounde, Cameroon",
  },
];
