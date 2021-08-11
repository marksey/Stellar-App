//This is where the trucks are stored for the tables. This may end up a JSON 
//file during production. We will pull from the DB tables into this trucks
//array so the front end can grab the data.

const trucks = [
    {
        id: '1',
        age: '12',
        carrier: 'Acme Carrier Inc',
        truckNum: '81233',
        owner: 'Mike Rodonski',
        make: "Volvo",
        plateNum: 'LK9121',
        state: 'CA',
        vinNum: 'KL1234824',
        year: '2005',
        location: 'Stockton, CA'
    },
    {
        id: '2',
        age: '6',
        carrier: 'Beta Carrier Inc',
        truckNum: '13412',
        owner: 'Francis Chan',
        make: "Freightliner",
        plateNum: 'LK91231',
        state: 'CA',
        vinNum: 'KL7312312',
        year: '2015',
        location: 'Sacramento, CA'

    },
    {
        id: '3',
        age: '5',
        carrier: 'Theta Carrier Inc',
        truckNum: '91234',
        owner: 'Francis Chan',
        make: "Kenworth",
        plateNum: 'LK24214',
        state: 'CA',
        vinNum: 'LJ9343434',
        year: '2016',
        location: 'Baton Rouge, LA'

    },
    {
        id: '4',
        age: '10',
        carrier: 'Gamma Carrier Inc',
        truckNum: '13412',
        owner: 'Michael Todd',
        make: "Volvo",
        plateNum: 'LK9121',
        state: 'TX',
        vinNum: 'LK912942',
        year: '2001',
        location: 'Stockton, CA'

    },
    {
        id: '5',
        age: '6',
        carrier: 'Beta Carrier Inc',
        truckNum: '24214',
        owner: 'Dutch Sheets',
        make: "Western Star",
        plateNum: 'LI912342',
        state: 'GA',
        vinNum: 'KL823231',
        year: '2015',
        location: 'Phoenix, AZ'

    },
    {
        id: '6',
        age: '3',
        carrier: 'Theta Trucking Inc',
        truckNum: '98342',
        owner: 'John G Lake',
        make: "Volvo",
        plateNum: 'LK23813',
        state: 'OR',
        vinNum: 'LI572631',
        year: '2018',
        location: 'Riverside, CA'

    },
    {
        id: '7',
        age: '8',
        carrier: 'Benny Carrier Inc',
        truckNum: '28323',
        owner: 'Benny Hinn',
        make: "International Trucks",
        plateNum: 'KI92323',
        state: 'CA',
        vinNum: 'LK1433412',
        year: '2013',
        location: 'Dallas, TX'

    },
]

export { trucks }