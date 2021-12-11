const jwt=require("jsonwebtoken")
const db=require('./db')
database = {
    1000: { acno: 1000, uname: "vishnu", password: "1000", balance: 5000, transaction: [] },
    1001: { acno: 1001, uname: "sadik", password: "1001", balance: 5000, transaction: [] },
    1002: { acno: 1002, uname: "sona", password: "1002", balance: 5000, transaction: [] }
}

const register = (acno, uname, password) => {

    db.User.findOne({})

    // let database = this.data
    if (acno in database) {

        return {
            status: false,
            statusCode: 401,
            message: "USER ALREADY EXIST !!!"
        }
    }
    else {
        database[acno] = {
            uname,
            acno,
            password,
            balance: 0,
            transaction: []
        }

        //   this.saveDetails()
        return {
            status: true,
            statusCode: 200,
            message: "ACCOUNT SUCCESSFULLY CREATED"
        }
    }
}

const login = (acno, pwd) => {
    // let database = this.data
    if (acno in database) {

        if (pwd == database[acno]["password"]) {

            currentUsername = database[acno]["uname"]
            
//token generation
const token=jwt.sign({
    currentAcno:acno
},'supersecretkey123456')
            //this.saveDetails()
            return {
                status: true,
                statusCode: 200,
                message: "LOGIN SUCCESSFULL",
                currentUsername: currentUsername,
                currentAcno: acno,
                token
            }
        }
        else {
            // alert("INVALID PASSWORD ")
            return {
                status: false,
                statusCode: 401,
                message: "INVALID PASSWORD !!!"
            }
        }
    }
    else {
        //   alert("USER DOESNOT EXIST ")
        return {
            status: false,
            statusCode: 401,
            message: "INVALID ACCOUNT NUMBER !!!"
        }
    }
}


const deposit = (acno, pwd, amt) => {

    var amount = parseInt(amt)                      // passed with int (to avoid concatenation)
    // let database = this.data


    if (acno in database) {

        if (pwd == database[acno]["password"]) {

            database[acno]["balance"] = database[acno]["balance"] + amount
            database[acno]["transaction"].push({
                amount: amount,
                type: "CREDIT"
            })
            console.log(database[acno]["transaction"]);

            // this.saveDetails()
            return {
                // database[acno]["balance"]
                status: true,
                statusCode: 200,
                message: amount + " credited! New balance is:" + database[acno]["balance"]
            }
        }
        else {
            // alert("INVALID PASSWORD ")
            return {
                status: false,
                statusCode: 401,
                message: "INVALID PASSWORD !!!"
            }
        }


    }
    else {
        //   alert("USER NOT FOUND ")
        return {
            status: false,
            statusCode: 401,
            message: "USER NOT FOUND !!!"
        }
    }

}


const withdraw = (acno, pwd, amt) => {

    var amount = parseInt(amt)
    // let database = this.data


    if (acno in database) {

        if (pwd == database[acno]["password"]) {

            if (database[acno]["balance"] > amount) {

                database[acno]["balance"] = database[acno]["balance"] - amount
                database[acno]["transaction"].push({
                    amount: amount,
                    type: "DEBIT"
                })
                console.log(database[acno]["transaction"]);

                // this.saveDetails()
                return {
                    // database[acno]["balance"]

                    status: true,
                    statusCode: 200,
                    message: amount + " debited! New balance is:" + database[acno]["balance"]
                }
            }
            else {
                // alert("INSUFFICIENT BALANCE ")
                return {
                    status: false,
                    statusCode: 401,
                    message: "INSUFFICIENT BALANCE !!!"

                }
            }
        }
        else {
            // alert("INVALID PASSWORD ")
            return {
                status: false,
                statusCode: 401,
                message: "INVALID PASSWORD !!!"

            }
        }


    }
    else {
        //   alert("USER NOT FOUND ")
        return {
            status: false,
            statusCode: 401,
            message: "USER NOT FOUND !!!"
        }
    }

}

const getTransaction = (acno) => {
    if (acno in database) {
        return {
            status: true,
            statusCode: 200,
            transaction: database[acno]["transaction"]                    //this.data[acno]["transaction"]
        }

    }
    else {
        return {
            status: false,
            statusCode: 401,
            message: "USER NOT FOUND !!!"
        }
    }

}



//we should export bcoz to use its properties in another file
module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction

}