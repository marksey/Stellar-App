//This is where the drivers are stored for the tables. This may end up a JSON 
//file during production. We will pull from the DB tables into this drivers
//array so the front end can grab the data.

const drivers = [
  {
    id: 1,
    name: "Vasya Kishchenko",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "7823",
    cellNum: "916-892-3922",
    trailerNum: "L9823",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 2,
    name: "Oleg Sivorsky",
    img: "avatar1",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "5478",
    cellNum: "916-232-1234",
    trailerNum: "L1322",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 3,
    name: "Justin Moser",
    img: "avatar2",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "8932",
    cellNum: "650-823-8432",
    trailerNum: "L1234",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 4,
    name: "Michael Todd",
    img: "avatar3",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "3374",
    cellNum: "916-932-5923",
    trailerNum: "L7732",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 5,
    name: "Jamal Burnett",
    img: "avatar4",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "9932",
    cellNum: "916-720-1682",
    trailerNum: "L6321",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 6,
    name: "Alex Moskov",
    img: "avatar5",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "6732",
    cellNum: "916-912-7823",
    trailerNum: "L7312",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 7,
    name: "Andrey Shapoval",
    img: "avatar5",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "9823",
    cellNum: "916-231-3232",
    trailerNum: "L7312",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 8,
    name: "Samuel Mikhalchuk",
    img: "avatar6",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "9312",
    cellNum: "916-428-9824",
    trailerNum: "L8873",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 9,
    name: "Steve Madden",
    img: "avatar7",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "6241",
    cellNum: "916-889-7621",
    trailerNum: "L5589",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 10,
    name: "Michael Scott",
    img: "avatar8",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "4214",
    cellNum: "916-554-2313",
    trailerNum: "L1232",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
  {
    id: 11,
    name: "Steven Furtick",
    img: "avatar1",
    designation: "Owner/Op",
    color: "primary",
    truckNum: "2133",
    cellNum: "916-442-6689",
    trailerNum: "L2892",
    pullNotice: "This is the pull notice",
    projects: "125",
    tags: ["Photoshop", "illustrator"],
  },
]

const userProfile = {
  id: 1,
  name: "Cynthia Price",
  designation: "UI/UX Designer",
  img: "avatar1",
  projectCount: 125,
  revenue: 1245,
  personalDetail:
    "Hi I'm Cynthia Price,has been the industry's standard dummy text To an English person, it will seem like simplified English, as a skeptical Cambridge.",
  phone: "(123) 123 1234",
  email: "cynthiaskote@gmail.com",
  location: "California, United States",
  experiences: [
    {
      id: 1,
      iconClass: "bx-server",
      link: "#",
      designation: "Back end Developer",
      timeDuration: "2016 - 19",
    },
    {
      id: 2,
      iconClass: "bx-code",
      link: "#",
      designation: "Front end Developer",
      timeDuration: "2013 - 16",
    },
    {
      id: 3,
      iconClass: "bx-edit",
      link: "#",
      designation: "UI /UX Designer",
      timeDuration: "2011 - 13",
    },
  ],
  projects: [
    {
      id: 1,
      name: "Skote admin UI",
      startDate: "2 Sep, 2019",
      deadline: "20 Oct, 2019",
      budget: "$506",
    },
    {
      id: 2,
      name: "Skote admin Logo",
      startDate: "1 Sep, 2019",
      deadline: "2 Sep, 2019",
      budget: "$94",
    },
    {
      id: 3,
      name: "Redesign - Landing page",
      startDate: "21 Sep, 2019",
      deadline: "29 Sep, 2019",
      budget: "$156",
    },
    {
      id: 4,
      name: "App Landing UI",
      startDate: "29 Sep, 2019",
      deadline: "04 Oct, 2019",
      budget: "$122",
    },
    {
      id: 5,
      name: "Blog Template",
      startDate: "05 Oct, 2019",
      deadline: "16 Oct, 2019",
      budget: "$164",
    },
    {
      id: 6,
      name: "Redesign - Multipurpose Landing",
      startDate: "17 Oct, 2019",
      deadline: "05 Nov, 2019",
      budget: "$192",
    },
    {
      id: 7,
      name: "Logo Branding",
      startDate: "04 Nov, 2019",
      deadline: "05 Nov, 2019",
      budget: "$94",
    },
  ],
}

export { drivers, userProfile }
