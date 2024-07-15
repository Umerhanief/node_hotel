const express = require('express');
const router = express.Router();
const MenuItem  = require('../models/menuitem');


//post method of menuItems
router.post('/menuitem',async(req,res)=>{
    try {
  
      const data = req.body
  
      const menuitem = new MenuItem(data);
  
      const response = await menuitem.save();
      console.log("menu data saved");
      res.status(200).json(response)
  
    } catch (error) {
      console.log(error);
      res.status(500).json({error: ' internal error OCUURED'})
      
    }
  })

  //GET METHOD ON MENUITEMS
router.get('/menuitem',async(req,res)=>{
    try {
      const data = await MenuItem.find()
      console.log('menu data fetched');
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'internal error'})
      
    }
  })

  //update the menu
  router.put('/:id',async(req,res)=>{
    try {
      const menuid = req.params.id;
      const updatedMenuid = req.body;
      const response = await MenuItem.findByIdAndUpdate(menuid,updatedMenuid,{
        new:true,
        runValidators:true
      })
      if(!response){
        res.status(404).json({error: 'menu item  not found'})
      }
      console.log('menu data updated')
      res.status(200).json({response});
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'internal error'})
      
      
    }
  })

  //delete menu item
  router.delete('/:id',async(req,res)=>{
    try {
      const menuid = req.params.id;
      const response = await MenuItem.findByIdAndDelete(menuid)
      if(!response){
        res.status(404).json({error:'menu not found'})
      }
      console.log('data deleted');
      res.status(200).json({message:'menu item deleted'})
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'internal error'})
      
    }
  })

  module.exports = router;
