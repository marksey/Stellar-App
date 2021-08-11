
//This is where the shippers are stored for the tables. This may end up a JSON 
//file during production. We will pull from the DB tables into this shippers
//array so the front end can grab the data.

const shippers = [
    {
        id: "1",
        name: "Acme Shipping Inc",
        contactName: "Edward Valensky",
        city: "Sacramento, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "2",
        name: "A Shipping Inc",
        contactName: "Tom Erick",
        city: "Denver, CO",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "3",
        name: "B Shipping Inc",
        contactName: "Bill Johnson",
        city: "Sacramento, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "4",
        name: "C Shipping Inc",
        contactName: "Harry Cruise",
        city: "Stockton, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "5",
        name: "D Shipping Inc",
        contactName: "Michael Todd",
        city: "Rancho Cordova, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "6",
        name: "E Shipping Inc",
        contactName: "Jim Baker",
        city: "Folsom, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "7",
        name: "F Shipping Inc",
        contactName: "Francis Chan",
        city: "Roseville, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "8",
        name: "G Shipping Inc",
        contactName: "Mikhail Govursky",
        city: "Carmichael, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "9",
        name: "H Shipping Inc",
        contactName: "Cyrus O'neal",
        city: "Citrus Heights, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },
    {
        id: "10",
        name: "H Shipping Inc",
        contactName: "Edwin Gretzky",
        city: "Los Angeles, CA",
        phone: "916-823-0231",
        fax: "916-555-9823",
    },

  ]

  export { shippers }