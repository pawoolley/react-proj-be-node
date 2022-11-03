import listModel, {IList} from './listModel'
import {Types} from 'mongoose'

export const getLists = async (): Promise<IList[]> => listModel.find().exec()

export const upsertList = async (list: IList): Promise<IList> => {

    const now: Date = new Date()
    if (!list.createdAt) {
        list.createdAt = now
    }
    list.updatedAt = now

    if (!list._id) {
        list._id = new Types.ObjectId()
    }

    return listModel.findByIdAndUpdate(list._id, list, {upsert: true, new: true}).exec()
}
