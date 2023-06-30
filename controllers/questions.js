import productSchema from "../models/productSchema.js";

export const countProduct = async (req,res) =>{
    try {
        const category = req.query.category;
        const range = req.query.range;

        if(category != 'laptop' && category != 'phone') return res.send("Invalid category. Please check the category field.");
        let countAllProducts =await productSchema.countDocuments();
        if(!category && !range){
            return res.send("Count of all Products : "+ countAllProducts);
        }

        if(category && !range){
            const findProductCategory = await productSchema.find({category}).exec();
            if(!findProductCategory.length) return res.send("Products not found.");
            return res.send({"count of products" : findProductCategory.length, "products" : findProductCategory});
        }
        if(range && !category){
            if(range.includes("-")){
            const [price1, price2] = range.split("-").map(Number);
            const findProductRange = await productSchema.find({}).exec();
            let productFilter = findProductRange.filter(items => items.price >= price1 && items.price <= price2);
            if(!productFilter.length) return res.send("No products found between range.");
            return res.send({"count of products" : productFilter.length, "products" : productFilter});
            }else{
                const price = parseInt(range);
                const findProductRange = await productSchema.find({}).exec();
                let productFilter = findProductRange.filter(items => items.price >= price);
                if(!productFilter.length) return res.send("No products found between range");
                return res.send({"count of products" : productFilter.length, "products" : productFilter});
            }
        }
        if(category && range){
            if(range.includes("-")){
                const [price1, price2] = range.split("-").map(Number);
                const findProductCategory = await productSchema.find({category}).exec();
                let productFilter = findProductCategory.filter(items => items.price >= price1 && items.price <= price2);
                if(!productFilter) return res.send("No products found for the selected category and range.");
                return res.send({"count of products" : productFilter.length, "products" : productFilter});
            }else{
                const price = parseInt(range);
                const findProductCategory = await productSchema.find({category}).exec();
                let productFilter = findProductCategory.filter(items => items.price >= price);
                if(!productFilter) return res.send("No products found for the selected category and single range.");
                return res.send({"count of products" : productFilter.length, "products" : productFilter});
            }
        }
    } catch (error) {
        return res.send(error);
    }
}

export const pagination = async(req,res) =>{
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const defaultLimit = 5;
        const defaultOffset = 0;
        if(!limit && !offset){    
            const product = await productSchema.find({}).skip(defaultOffset).limit(defaultLimit).exec();
            if(!product.length) return res.send("Products not found.");
            let ObjectProduct = {};
            for(let i=0;i<product.length;i++){
                ObjectProduct[i] = product[i]._id;
            }
            return res.send({"count of products" : product.length ,"Object ID's of Products" : ObjectProduct,"products" : product});
        }
        if(offset && !limit){
            const variableOffset = offset * defaultLimit;
            const product = await productSchema.find({}).skip(variableOffset).limit(defaultLimit).exec();
            if(!product.length) return res.send("Products not found.");
            let ObjectProduct = {};
            for(let i=0;i<product.length;i++){
                ObjectProduct[i] = product[i]._id;
            }
            return res.send({"count of products": product.length,"Object ID's of Products" : ObjectProduct, "products": product});
        }
        if(offset && limit){
            const variableOffset = offset * limit;
            const product = await productSchema.find({}).skip(variableOffset).limit(limit).exec();
            if(!product.length) return res.send("Products not found.");
            let ObjectProduct = {};
            for(let i=0;i<product.length;i++){
                ObjectProduct[i] = product[i]._id;
            }
            return res.send({"count of products": product.length,"Object ID's of Products" : ObjectProduct, "products" : product});
        }
        return res.send("error");
    } catch (error) {
        return res.send(error);
    }
}