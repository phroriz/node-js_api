import { Request, Response } from "express";
import Sequelize from 'sequelize';
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

export const listPhrases = async (req: Request, res: Response) => {
        let list = await Phrase.findAll();
        
        res.json({list});
}

export const getPhrase = async (req: Request, res: Response) => {
        let {id} = req.params;

        let phrase = await Phrase.findByPk(id);
        if(phrase){
                res.json({phrase});
        } else {
                res.json({error: 'Frase nao encontrada'});
        }
        
}

export const updatePhrase = async (req: Request, res: Response) => {
        let { id } = req.params;
        let { author, txt } = req.body;
        let phrase = await Phrase.findByPk(id);
        if(phrase) {
                phrase.author = author;
                phrase.txt = txt;
                await phrase.save();
                res.json({phrase});
        } else {
                res.json({error: 'frase nao encontrada'});        
        }
        
}

export const deletePhrase = async (req: Request, res: Response) => {
        let { id } = req.params;
        await Phrase.destroy({ where: { id } })
        res.json({});
        
}

export const randomPhrase =async (req: Request, res: Response) => {
        let phrase = await Phrase.findOne({
                order:[
                        Sequelize.fn('RANDOM')
                ]
        })
        if(phrase) {
                res.json({phrase});
        } else {
                res.json({error: 'Frase nao ha frases cadastradas'});
        }
        
}