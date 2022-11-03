import mongoose, {Schema, Types} from 'mongoose'

interface IListItem {
    description: string,
    isTicked: boolean,
}

export interface IList {
    _id: Types.ObjectId,
    name: string,
    description: string,
    listItems: IListItem[],
    createdAt: Date,
    updatedAt: Date,
}

const listItemSchema = new Schema<IListItem>({
    description: String, isTicked: Boolean,
})

const listSchema = new Schema<IList>({
    name: String, description: String, listItems: [listItemSchema], createdAt: Date, updatedAt: Date,
})

const listModel = mongoose.model('list', listSchema);

export default listModel
