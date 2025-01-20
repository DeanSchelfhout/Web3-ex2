General:

    Check de package.json voor de scripts (welke commands er zijn. BV voor de app te starten)
    Men kan ook andere commands gebruiken ipv die in de package.json scripts
    zoals: npx prisma db seed     --------------------------> De command voor de DB op te vullen met data (zie Commands)
    maar dan moet men eerst deze line adden aan package.json voor de seeding: 
        "prisma":
        {
            "seed": "node prisma/seed.js"
        }


Commands:

    Install nodemon:
        npm install -g nodemon                 --------------------------> Install nodemon, dit is nodig voor de commands te kunnen uitvoeren

    Install mysql2:
        npminstallmysql2                       --------------------------> Install mysql2, dit is nodig voor de mysql DB te kunnen gebruiken

    Install prisma
        npm install prisma -D                  --------------------------> Install prisma, prisma is de communicatie tussen de App en de mysql DB

    Install prisma client
        npm install @prisma/client             --------------------------> Install prisma client, dit zorgt er voor dat we querries kunnen uitvoeren op onze DB vanuit onze App

    Leg migrations: 
        npx prisma migrate dev --name init     --------------------------> Migratie is soms standaard al gelegd door de opdracht gever

    Gebruik seed voor DB:
        npx prisma db seed                     --------------------------> De ingebouwde command voor de database te seeden, maar vergeet dan eerst niet package.json aan te passen (zie General)
        npm run seed                           --------------------------> De command gebruikt voor de DB te seeden die de opdracht gever heeft aangemaakt in package.json "scripts" (zie General)

    Start de API:
        npm run start                          --------------------------> De command gebruikt voor de App (API) te starten, die de opdracht gever heeft aangemaakt in package.json "scripts" (zie General)


.env:
    Vaste waarden staan in de .env file, zoals BV:
        De link van de front-end voor deze in de cors te gebruiken
        De connectionstring van de DB
        De JWT_SECRET