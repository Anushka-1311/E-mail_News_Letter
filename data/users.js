import bcrypt from 'bcryptjs'

export const users = [
    {
        name:"Akshat Mishra",
        email:"akshat.mishra319@gmail.com",
        password:bcrypt.hashSync("123456",10),
        number:"7389074391",
        isAdmin:true
    },
    {
        name:"Aditya Uday Ubale",
        email:"adityaubale63@gmail.com",
        password:bcrypt.hashSync("123456",10),
        number:"8770471714",
    },
    {
        name:"Anushka Sharma",
        email:"sharmanushka4@gmail.com",
        password:bcrypt.hashSync("123456",10),
        number:"7024034459",
    },
    {
        name:"Trapti Mishra",
        email:"trapti.mishra@medicaps.ac.in",
        password:bcrypt.hashSync("123456",10),
        number:"8770781690",
        isAdmin:true
    },
    {
        name:"Aditya Singh",
        email:"19bcs002@ietdavv.edu.in",
        password:bcrypt.hashSync("123456",10),
        number:"7489479074"
    },
]