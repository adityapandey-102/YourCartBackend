const express = require('express');
const router = express.Router();
const Products = require('../models/Product');



//ROUTE 1 :Get all the notes using:  GET "/api/auth//fetchAllNotes".login required.
router.get('/fetchAllProducts',async(req,res)=>{
    try {
        const productList=await Products.find()
        res.json(productList)

    } catch (error) {
        res.status(500).send("Some error ocurred");
    }
})

//ROUTE 2 :Add all the notes using:  POST "/api/notes/addNotes".login required.
router.post('/addProduct', async (req, res) => {

    try {
        const finalList=[]
        const list = req.body
        list.map(async(item) => {
            //Creating new product....
            const product = new Products(item)
            const savedProduct = await product.save();
            finalList.push(savedProduct)
        })


        res.send(finalList)

    } catch (error) {
        res.status(500).send("Some error ocurred");
    }

})


//ROUTE 3 :Update your the notes using:  POST "/api/notes/updateNotes".login required.
// router.put('/updateNotes/:id',fetchuser,async(req,res)=>{

//     try {

//         const {title,description,tag}=req.body;

//         //Creating new note....

//         const newNote={}
//         if(title){newNote.title=title};
//         if(description){newNote.description=description};
//         if(tag){newNote.tag=tag};
//     //Find by id and update notes
//         const note=await Notes.findById(req.params.id);
//         if(!note){return res.status(404).send("Not Found")}
//         //Allow updation if user own this notes
//         if(note.user.toString() !== req.user.id){
//             return res.status(401).send("Not Allowed")
//         }

//         const updatedNotes = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
//         res.json({updatedNotes})

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error ocurred");
//     }

// })


// //ROUTE 4 :Delete your the notes using: DELETE "/api/notes/deleteNotes/:id".login required.
// router.delete('/deleteNotes/:id',fetchuser,async(req,res)=>{

//     try {

//     //Find by id and delete it
//         let note=await Notes.findById(req.params.id);
//         if(!note){return res.status(404).send("Not Found")}
//         //Allow deletion if user own this notes
//         if(note.user.toString() !== req.user.id){
//             return res.status(401).send("Not Allowed")
//         }

//         note = await Notes.findByIdAndDelete(req.params.id)
//         res.json({"sucess":"Note has been deleted",note:note})

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Some error ocurred");
//     }

// })

module.exports = router