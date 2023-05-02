const models = require('../models')


exports.get_landing = (req, res, next) =>{
    res.render('landing', { title: 'Express from Morgan with Controllers' }); 
}

// exports.submit_lead = (req, res, next) => {
//     return models.Lead.create({
//         email:req.body.lead_email,
//         name:req.body.lead_name,
//         id:req.body.lead_id
//     }).then(lead => {
//     res.redirect('/leads');
//     })
//     }

exports.submit_lead = async (req, res, next) => {
    const { lead_email, lead_name, lead_id } = req.body;
  
    // Check for duplicate lead_id
    const lead = await models.Lead.findOne({ where: { id: lead_id } });
    if (lead) {
      return res.render('error', {
        message: 'Duplicate ID: PK must be unique',
        backUrl: '/leads',
      });
    }
  
    // Create a new Lead
    try {
      await models.Lead.create({ email: lead_email, name: lead_name, id: lead_id });
      return res.redirect('/leads');
    } catch (error) {
      // Handle any other errors
      return next(error);
    }
  };
  

exports.show_leads = (req, res, next) => {
    models.Lead.findAll().then(leads => {
    res.render('landing', {title: 'Express from Morgan with Controllers', leads: leads });//passing any object to the view
    })
}
exports.show_lead = (req, res, next) => {
    return models.Lead.findOne({
        where : {
            id: req.params.lead_id
        }
    }).then(lead => {
        if (lead) {
            res.render('lead', {lead: lead });//passing any object to the view
        } else {
            res.status(404).send("Lead not found");
        }
    });
}
exports.show_edit_lead = (req, res, next) => {
    return models.Lead.findOne({
        where : {
            id: req.params.lead_id
    }
    }).then(lead => {
        res.render('lead/edit_lead', {lead: lead });//form to edit
    });
}
exports.edit_lead = (req, res, next) => {
    return models.Lead.update({
        id: parseInt(req.params.lead_id),//parseInt(req.body.lead_id),
        name: req.body.lead_name,
        email: req.body.lead_email//,
        // updatedAt: Date.now()
    }, {
        where: {
            id: req.params.lead_id
        }
    }).then(result =>{
        console.log(result);
        res.redirect('/lead/' + parseInt(req.params.lead_id))
    // res.redirect('/') //from http://localhost:3000/lead/13/edit to http://localhost:3000/lead/13
    })
}

exports.delete_lead = (req, res, next) => {
    return models.Lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.redirect('/leads');
    })
}
exports.delete_lead_json = (req, res, next) => {
    return models.Lead.destroy({
        where: {
            id: req.params.lead_id
        }
    }).then(result => {
        res.send({msg: "Success"});
    })
}


