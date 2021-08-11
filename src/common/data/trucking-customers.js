//This is where the customers are stored for the tables. This may end up a JSON 
//file during production. We will pull from the DB tables into this customers
//array so the front end can grab the data.

const truckingCustomers = [
    {
        id: "1",
        name: "Acme Customer Inc",
        contactName: "Freddy Johnson",
        mcNum: "188231",
        city: "Sacramento, CA",
        localPhone: "916-771-9231",
        dispatchFax: "916-888-2312",
        creditLimit: "$50,500",
    },
    {
        id: "2",
        name: "Beta Customer Inc",
        contactName: "John G. Lake",
        mcNum: "931242",
        city: "Stockton, CA",
        localPhone: "916-771-9231",
        dispatchFax: "916-777-9343",
        creditLimit: "$35,000",
    },
    {
        id: "3",
        name: "Caro Customer Inc",
        contactName: "Mario Murillo",
        mcNum: "842342",
        city: "Portland, OR",
        localPhone: "916-442-2312",
        dispatchFax: "916-122-1223",
        creditLimit: "$75,000",
    },
    {
        id: "4",
        name: "Delta Customer Inc",
        contactName: "Billy Graham",
        mcNum: "423424",
        city: "Spokane, WA",
        localPhone: "916-923-1723",
        dispatchFax: "916-324-2312",
        creditLimit: "$40,000",
    },
    {
        id: "5",
        name: "Echo Customer Inc",
        contactName: "Todd White",
        mcNum: "6234212",
        city: "Provo, UT",
        localPhone: "916-673-2313",
        dispatchFax: "916-444-8232",
        creditLimit: "$90,000",
    },
    {
        id: "6",
        name: "Frank Customer Inc",
        contactName: "Cyrus Bill",
        mcNum: "223421",
        city: "Citrus Heights, CA",
        localPhone: "916-823-9132",
        dispatchFax: "916-555-1723",
        creditLimit: "$15,000",
    },
    {
        id: "7",
        name: "Gear Customer Inc",
        contactName: "James Henry",
        mcNum: "329934",
        city: "Rancho Cordova, CA",
        localPhone: "916-723-0123",
        dispatchFax: "916-666-9231",
        creditLimit: "$7,500",
    },

  ]

  export { truckingCustomers }