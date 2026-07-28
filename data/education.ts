export type EducationEntry = {
  degree: string;
  institution: string;
  dates: string;
};

export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Karunya Institute of Technology and Sciences, Coimbatore",
    dates: "2020 – 2024",
  },
  {
    degree: "Higher Secondary",
    institution: "Kanchi Sri Sankara Academy Matric. Hr. Sec. School, Tiruchendur",
    dates: "2018 – 2020",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  verifyHref: string;
  featured?: boolean;
};

export const certifications: Certification[] = [
  {
    name: "IIT-M Pravartak Certified Full-Stack Development with AI",
    issuer: "HCL Guvi",
    date: "Nov 2025",
    verifyHref:
      "https://drive.google.com/file/d/1YRGw0TaCiS-kjaNynWDjUcoM6DdKxIJH/view",
  },
  {
    name: "Grade 5 Theory of Music (with Merit)",
    issuer: "Trinity College London",
    date: "2023",
    verifyHref:
      "https://drive.google.com/file/d/1kmB_G4lbwkgunt9DGSHP2Jgt7k_cpQ_c/view",
    featured: true,
  },
];
