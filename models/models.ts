import {fetchData, writeData, writeUpdatedData} from '../utils/utils'
// import{newClient} from '../Controllers/controller';


export const findAllData = async function (){
    const allData = await fetchData();
    return allData
}


export const findById = async function(id: number){
    const data = await fetchData().find((info:IdataSchema) => info.id === id );
    return data          
}

// let customerID = 0;
export const createData = async function(details: InewCustomer){
    // const newCustomer = await newClient(details);
    // return newCustomer; 
    const allData = await fetchData();
    let lastIndex = allData.length;
    if (lastIndex == 0){
        lastIndex = 1
    }else if((lastIndex !== 0)){
        lastIndex =  allData[lastIndex - 1].id + 1
    }
    // const uniqueId = (allData[lastIndex].id !== undefined) && (lastIndex == allData[lastIndex].id) ? lastIndex + 1 : (lastIndex === -1) ? lastIndex + 2 : lastIndex;
    // console.log(`Bug:${uniqueId}found`);
    const {fullname, email, gender, phone, address, notes} = await details;
    const customerID = lastIndex;
    const customer: IdataSchema = {
        "id": customerID,
        "fullname": fullname,
        "email": email,
        "gender": gender,
        "phone": phone,
        "address": address,
        "notes": notes || ' '
    }
    // console.log(customerID)
    // Add new customer to database
    
    writeData(customer, allData);

    return customer;

}

export const updateData = async function(update: IupdateCustomer){
    const allData = await fetchData();
    const {id, fullname, email, gender, phone, address, notes} = await update;
    const index = allData.findIndex((data) => data.id == id)
    for (let data of allData){
        if (data.id == id){
           data['fullname'] = fullname || data.fullname;
           data['email'] = email || data.email;
           data['gender'] = gender || data.gender;
           data['phone'] = phone || data.phone
           data['address'] = address || data.address
           data['notes'] = notes || data.notes;
        }
    }
    writeUpdatedData(allData);
    return allData;
    
}



export const deleteData = async function(id: number){
    const allData = await fetchData();
    const index = allData.findIndex((info:IdataSchema) => info.id === id );
    if (index === -1){
        return -1;
    }
    allData.splice(index, 1);
    // Rewrite the database
    writeUpdatedData(allData);
    return allData          
}

export const createNewUser = function (id:string, name:string, email:string, password: string) {
    const newUser:Iuser = {
        id: id,
        fullname: name,
        email: email,
        password: password
    }
    return newUser;
}