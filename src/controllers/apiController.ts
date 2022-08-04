import { Request, Response } from "express";
import { Phrase } from "../models/Phrases";

export const ping = (req: Request, res: Response) => {
    res.json({ping: true});
}

export const random = (req: Request, res: Response) => {
        let nRand: number = Math.floor( Math.random() * 1000);
        res.json({number: nRand});
    
}

export const nome = (req: Request, res: Response) => {
        let nome: string = req.params.nome;
        res.json({nome})
}

export const createPhrase = async (req: Request, res: Response) => {
        let {author, txt} = req.body;

         let newPrase = await Phrase.create({ author, txt });
        res.status(201);
        res.json({id: newPrase.id, author, txt});
}