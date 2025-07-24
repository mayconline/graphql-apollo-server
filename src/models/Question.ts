import { model, Schema } from 'mongoose';

const QuestionSchema = new Schema(
  {
    ask: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Question', QuestionSchema);
