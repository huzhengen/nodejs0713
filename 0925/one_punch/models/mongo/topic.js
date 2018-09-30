const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    creator: Schema.Types.ObjectId,
    content: String,
})

const TopicSchema = new Schema({
    creator: {type: String, required: true},
    title: {type: String},
    content: String,
    replyList: [ReplySchema]
});

const TopicModel = mongoose.model('topic', TopicSchema);

async function createANewTopic(params){
    const topic = new TopicModel({creator: params.creator, title: params.title, content: params.content})
    return await topic.save()
        .catch(e=>{
            switch (e.code) {
                case 11000:
                    throw Error('someone has picked this title');
                    break;
                default:
                    throw new Error(`error creating topic ${JSON.stringify(params)}`);
                    break;
            }
        })
}

async function getTopics(params = {page: 0, pageSize: 10}){
    let flow = TopicModel.find({})
    flow.skip(params.page * params.pageSize)
    flow.limit(params.pageSize)
    return await flow
        .catch(e=>{
            console.log(e);
            throw new Error('error getting topics from db')
        })
}

async function getTopicById(topicId){
    return await TopicModel.findOne({_id: topicId})
        .catch(e=>{
            console.log(e)
            throw new Error(`error getting topic by id: ${topicId}`)
        })
}

async function updateTopicById(topicId, update){
    return await TopicModel.findOneAndUpdate({_id: topicId}, update, {new: true})
        .catch(e=>{
            console.log(e);
            throw new Error(`error updating user by id: ${topicId}`)
        })
}

async function replyATopic(params){
    return await TopicModel.findOneAndUpdate(
        {_id: params.topicId},
        {$push: {replyList: {creator: params.creator, content: params.content}}},
        {new: true}
    )
        .catch(e=>{
            console.log(e);
            throw new Error(`error replying topic ${JSON.stringify(params)}`)
        })
}

module.exports = {
    model: TopicModel,
    createANewTopic,
    getTopics,
    getTopicById,
    updateTopicById,
    replyATopic,
};