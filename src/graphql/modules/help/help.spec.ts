import { executeOperation, gql } from '../../../mocks/serverMock';

describe('Help', () => {
  const GET_QUESTIONS = gql`
    query questions {
      questions {
        _id
        ask
        answer
      }
    }
  `;

  const CREATE_QUESTION = gql`
    mutation createQuestion($ask: String!, $answer: String!) {
      createQuestion(input: { ask: $ask, answer: $answer }) {
        _id
        ask
        answer
      }
    }
  `;

  describe('Queries', () => {
    it('should return questions list', async () => {
      const res = await executeOperation(GET_QUESTIONS);

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('questions');
      expect(bodyData.questions[0]).toHaveProperty('_id');
      expect(bodyData.questions[0]).toHaveProperty('ask');
      expect(bodyData.questions[0]).toHaveProperty('answer');
    });
  });

  describe('Mutations', () => {
    it('should create new question', async () => {
      const res = await executeOperation(CREATE_QUESTION, {
        ask: 'ask test',
        answer: 'answer test',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('createQuestion');
      expect(bodyData.createQuestion).toHaveProperty('_id');
      expect(bodyData.createQuestion).toHaveProperty('ask');
      expect(bodyData.createQuestion).toHaveProperty('answer');
    });
  });
});
