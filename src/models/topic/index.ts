import mongoose from "mongoose";

interface Topic {
  id: number | null;
  topicName: string;
}

const schema = new mongoose.Schema({
  topicName: {
    type: String,
    required: true,
  },
});

const TopicModel = mongoose.model("Topic", schema);

export { TopicModel, Topic };
