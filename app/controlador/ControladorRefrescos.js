const ModeloRefrescos = require('../modelos/ModeloRefrescos');

function index(req, res){
    ModeloRefrescos.find({})
    .then(refrescos => {
        if(refrescos.length) return res.status(200).send({refrescos});
        return res.status(204).send({message: 'No hay datos que mostrar'});
    }).catch(error => res.status(500).send({error}));
  
}
function crear(req,res){
    new ModeloRefrescos(req.body).save()
    .then(refrescos => res.status(200).send({refrescos}))
    .catch(error => res.status(500).send({error}));
}
function buscar(req,res,next){
    let consulta={};
    consulta[req.params.key]=req.params.value;
    ModeloRefrescos.find(consulta).then(refrescos => {
        if(!refrescos.length) return next();
        req.body.refrescos=refrescos;
        return next();
    }).catch(error => {
        req.body.error=error;
        next();
    })
}

function mostrar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message:'No se encontró el producto'});
    let refrescos=req.body.refrescos;
    return res.status(200).send({refrescos});
}

function actualizar(req,res) {
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message:'No se puede actualizar'});
    let refObj=req.body.refrescos[0];
    refObj=Object.assign(refObj,req.body);
    refObj.save().then(refAlta => {
        res.status(200).send({message:'El registro se actualizo correctamente',refAlta});
    }).catch(error=>res.status(500).send({error}));
}

function eliminar(req,res) {
    if(req.body.error)  return res.status(500).send({error});
    if(!req.body.refrescos) return res.status(404).send({message:'No se puede eliminar el registro'});
    req.body.refrescos[0].remove().then(refDel => {
        res.status(200).send({message:'Eliminado correctamente',refDel});
    }).catch(error=>res.status(500).send({error}));
}

module.exports={
    index,
    crear,
    buscar,
    mostrar,
    actualizar,
    eliminar
}