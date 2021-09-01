//This is where the trucks are stored for the tables. This may end up a JSON 
//file during production. We will pull from the DB tables into this trucks
//array so the front end can grab the data.

const trucks = [
    {
        id: '1',
        age: '12',
        carrier: 'Acme Carrier Inc',
        truckNum: '812',
        owner: 'Mike Rodonski',
        make: "Volvo",
        plateNum: 'LK9121',
        state: 'CA',
        vinNum: 'KL1234892324',
        year: '2005',
        location: 'Stockton, CA',
        notes: ""
    },
    {
        id: '2',
        age: '6',
        carrier: 'Beta Carrier Inc',
        truckNum: '134',
        owner: 'Francis Chan',
        make: "Freightliner",
        plateNum: 'LK91231',
        state: 'CA',
        vinNum: 'KL73123921912',
        year: '2015',
        location: 'Sacramento, CA',
        notes: "On vacation for a while. Be back 09/01/21"
    },
    {
        id: '3',
        age: '5',
        carrier: 'Theta Carrier Inc',
        truckNum: '912',
        owner: 'Francis Chan',
        make: "Kenworth",
        plateNum: 'LK24214',
        state: 'CA',
        vinNum: 'LJ934398123434',
        year: '2016',
        location: 'Baton Rouge, LA',
        notes: ""
    },
    {
        id: '4',
        age: '10',
        carrier: 'Gamma Carrier Inc',
        truckNum: '134',
        owner: 'Michael Todd',
        make: "Volvo",
        plateNum: 'LK9121',
        state: 'TX',
        vinNum: 'LK9129918239442',
        year: '2001',
        location: 'Stockton, CA',
        notes: ""
    },
    {
        id: '5',
        age: '6',
        carrier: 'Beta Carrier Inc',
        truckNum: '242',
        owner: 'Dutch Sheets',
        make: "Western Star",
        plateNum: 'LI912342',
        state: 'GA',
        vinNum: 'KL8232391234321',
        year: '2015',
        location: 'Phoenix, AZ',
        notes: ""
    },
    {
        id: '6',
        age: '3',
        carrier: 'Theta Trucking Inc',
        truckNum: '983',
        owner: 'John G Lake',
        make: "Volvo",
        plateNum: 'LK23813',
        state: 'OR',
        vinNum: 'LI57263232323231',
        year: '2018',
        location: 'Riverside, CA',
        notes: "On vacation for a while. Be back 09/01/21"
    },
    {
        id: '7',
        age: '8',
        carrier: 'Alex Trucking Inc',
        truckNum: '283',
        owner: 'Vasya Kishchenko',
        make: "International",
        plateNum: 'KI92323',
        state: 'CA',
        vinNum: 'LK14334123232322',
        year: '2013',
        location: 'Dallas, TX',
        notes: "On vacation for a while. Be back 09/01/21"
    },
]

export { trucks }