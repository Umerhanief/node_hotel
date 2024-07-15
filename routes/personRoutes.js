const express = require('express')
const router = express.Router();
const person = require('./../models/person');

//post route to add a person
router.post('/person', async (req,res)=>{

    try {
      const data = req.body  //asume the request body contain the person data
    
      //create new person document using the mongoose model
      const newPerson = new person(data);
    
      //save new prson database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response)
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'internal server error'})
      
    }
  })

  //GET METHOD to get the person
router.get('/person', async(req,res)=>{

    try {
      const data = await person.find();
      console.log('data fetched');
      res.status(200).json(data);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'internal error occured'})
      
    }
  
  })


  //one or more parameters
router.get('/person/:workType',async(req,res)=>{
    try {
      const workType = req.params.workType //extratc work from url
  
      if(workType=='chef' || workType == 'manager' || workType=='waiter'){
  const response = await person.find({work: workType})
  console.log('work data fetched')
  res.status(200).json(response)
  
      }else{
        res.status(400).json({error: 'invalid work type'})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({error: 'internal error'})
      
    }
  })

//UPDATE THE PERSON

router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id; //extarct the data from  url para..
        const upDatedPersonData = req.body; // updated data for the user

        const response = await person.findByIdAndUpdate(personId,upDatedPersonData,{
            new:true, //return the updated document
            runValidators: true //run mongoos validation
        })
        if(!response){
            return res.status(404).json({error:'person not found'});

        }
        console.log('data updated');
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
      res.status(500).json({error: 'internal error'})
        
    }
})

//Delete the person
router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id; //extarct the data from  url para..
        //asume u having person model
        const response = await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data delete');
        res.status(200).json({message: 'person deleted successfully'})
        
    } catch (error) {
        console.log(error)
      res.status(500).json({error: 'internal error'})
        
    }

})



  module.exports = router;