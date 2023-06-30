import fs from "fs";
import path from "path";
import productSchema from "../models/productSchema.js";

const __dirname = path.resolve();

export const addProduct = async(req,res) =>{
    try {
        let product_data = JSON.parse(fs.readFileSync(__dirname + '/products.json'));


        //adding products.json to MongoDB
        for(let i=0;i<product_data.length;i++){
            let p_id = product_data[i]['p_id'];
            let name = product_data[i]['name'];
            let price = product_data[i]['price'];
            let Quantity = product_data[i]['Quantity'];
            let instock = product_data[i]['instock'];
            let description = product_data[i]['description'];
            let category = product_data[i]['category'];

            const newProduct = new productSchema({
                p_id : p_id,
                name : name,
                price : price,
                Quantity : Quantity,
                instock : instock,
                description : description,
                category : category
            });

            await newProduct.save();
        }
        return res.send("Products added successfully.");       
    } catch (error) {
        return res.send(error);
    }
}