import express, {Request, Response} from 'express';
import {getLists, upsertList} from './listController'
import {IList} from './listModel'
import {Types} from 'mongoose'

const router = express.Router()

interface listDTO extends Omit<IList, "_id"> {
    id: string,
}

const listToDTO = (list: IList): listDTO => ({
    id: list._id.toString(), name: list.name, description: list.description, listItems: list.listItems, createdAt: list.createdAt, updatedAt: list.updatedAt
})

const listFromDTO = (list: listDTO): IList => ({
    _id: new Types.ObjectId(list.id), name: list.name, description: list.description, listItems: list.listItems, createdAt: list.createdAt, updatedAt: list.updatedAt,
})

router.get('/', async (req: Request, res: Response) => {
    const lists = await getLists()
    const listDTOs = lists.map((list) => listToDTO(list))
    return res.status(200).send(listDTOs)
})

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const list = listFromDTO(req.body)
    // If there is a mismatch in the id's, use the one from the query.
    if (id !== list._id?.toString()) {
        list._id = new Types.ObjectId(id)
    }
    await upsertList(list)
    return res.sendStatus(204)
})

export default router
