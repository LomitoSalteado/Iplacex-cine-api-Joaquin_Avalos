import { BSONType, ObjectId } from "mongodb";

export const pelicula = {
    _id: ObjectId,
    nombre: BSONType.string,
    anioEstreno: BSONType.int,
    generos: BSONType.array,
    director: BSONType.string,
    rating: BSONType.double
};
