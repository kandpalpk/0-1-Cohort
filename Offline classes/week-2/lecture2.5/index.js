const express = require('express');
const app = express();
app.use(express.json());
var users = [{
    name: 'John',
    kidneys: [{
        healthy: false
    }]
}]

// gets the status
app.get("/", function(req,res){
    const johnKidneys = users[0].kidneys;
    const totalkidneys = johnKidneys.length;
    let healthyKidneys=0;
    for(let i=0; i<totalkidneys;i++){
        if(johnKidneys[i].healthy){
            healthyKidneys= healthyKidneys+1;
        }
    }
    let unhealthyKidneys = totalkidneys - healthyKidneys;
    res.json({totalkidneys,healthyKidneys,unhealthyKidneys});
})

// adds the kidney
app.post("/", function(req,res){
    const status = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: status
    })
    res.json({
        msg:"done!"
    });
})

// Replaces all of the unhealthy kidneys with the healthy ones
app.put("/", function(req,res){
    if(checkUnhealthyKidney()){
        for(let i=0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true;
       }
       res.json({msg:"put"});
   
}   
    else{
        res.status(411).json({
            msg: "no unhealthy kidneys!"
        })
    }
})

// Deletes all of the unhealthy kidneys
app.delete("/", function(req,res){
    if(checkUnhealthyKidney()){
        let newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy: true
                })
            }
       }
        users[0].kidneys = newKidneys;
        res.json({msg: "deleted"})
    }
    else
    {
        res.status(411).json({
            msg: "All of the unhealthy kidneys removed!"
        })
    }
})


function checkUnhealthyKidney(){
    let flag = false;
    for(let i=0; i<users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy==false){
            flag = true;
        }
   }

   return flag;
}


app.listen(3000);