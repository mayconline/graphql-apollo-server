import { server, createTestClient, gql } from '../../../mocks/serverMock';

describe('Query Test', () => {
  const { query, mutate } = createTestClient(server);

  it('should return questions list', async () => {
    const questions = gql`
      query questions {
        questions {
          _id
          ask
          answer
        }
      }
    `;

    const res = await query({
      query: questions,
    });

    expect(res.data).toHaveProperty('questions');
    expect(res.data.questions[0]).toHaveProperty('_id');
    expect(res.data.questions[0]).toHaveProperty('ask');
    expect(res.data.questions[0]).toHaveProperty('answer');
  });

  it('should create new question', async () => {
    const questions = gql`
      mutation createQuestion($ask: String!, $answer: String!) {
        createQuestion(input: { ask: $ask, answer: $answer }) {
          _id
          ask
          answer
        }
      }
    `;

    const res = await mutate({
      mutation: questions,
      variables: {
        ask: 'ask test',
        answer: 'answer test',
      },
    });

    expect(res.data).toHaveProperty('createQuestion');
    expect(res.data.createQuestion).toHaveProperty('_id');
    expect(res.data.createQuestion).toHaveProperty('ask');
    expect(res.data.createQuestion).toHaveProperty('answer');
  });
});
