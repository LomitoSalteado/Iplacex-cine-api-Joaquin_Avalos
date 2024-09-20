import { ObjectId } from "mongodb";
import client from "../common/db.js";
import { actor } from "./actor.js";

const actorCollection = client.db('cine-db').collection('actores');

async function handleInsertActorRequest(req, res) {
    let data = req.body;
    let actor = {
        idPelicula: data.idPelicula,
        nombre: data.nombre,
        edad: data.edad,
        estaRetirado: data.estaRetirado,
        premios: data.premios
    };

    await actorCollection.insertOne(actor)
    .then((data) => {
        if(data === null) return res.status(400).send('Error al guardar registro')
        return res.status(201).send(data)    
    })
    .catch((e) => {return res.status(500).send({ error: e})

    })
}   


async function handleGetActoresRequest(req, res) {
    await actorCollection.find({}).toArray()
    .then((data) => { return res.status(200).send(data); })
    .catch((e) => { return res.status(500).send({ error: e }); });
}

async function handleGetActorRequest(req, res) {
    let id = req.params.id
    try {
        let oid = ObjectId.createFromHexString(id);
        await actorCollection.findOne({ _id: oid })
        .then((data) => {
            if (data === null) return res.status(404).send(data);
            return res.status(200).send(data);
        })
        .catch((e) => {
            return res.status(500).send({ error: e.code });
        });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleUpdateActorRequest(req, res) {
    let id = req.params.id;
    let actor = req.body;

    try {
        let oid = ObjectId.createFromHexString(id)

        let query = { $set: actor }

        await actorCollection.updateOne({ _id: oid }, query)
        .then((data)  => {return res.status(200).send(data)})
        .catch((e) => { return res.status(500).send({ code: e.code }); });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleDeleteActorRequest(req, res) {
    let id = req.params.id

    try {
        let oid = ObjectId.createFromHexString(id);
        await actorCollection.deleteOne({ _id: oid })
        .then((data) => { return res.status(200).send(data)})
        .catch((e) => { return res.status(500).send({ code: e.code }); });
    } catch (e) {
        return res.status(400).send('Id mal formado');
    }
}

async function handleSearchActorRequest(req, res) {
    let query = req.body

    await actorCollection.find(query).toArray()
    .then((data) => { return res.status(200).send(data); })
    .catch((e) => { return res.status(500).send({ code: e.code }); });
}

export default {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorRequest,
    handleUpdateActorRequest,
    handleDeleteActorRequest,
    handleSearchActorRequest
};
