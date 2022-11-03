import mongoose from 'mongoose'

export default async () => mongoose.connect('mongodb://localhost:27017/react-proj-be-node')
