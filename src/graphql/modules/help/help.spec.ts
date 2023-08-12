import { mockApolloServer, gql, dataSources } from '../../../mocks/serverMock';
import { SingleGraphQLResponse } from '../../../mocks/type';

describe('Query Test', () => {
  const server = mockApolloServer;

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

    const res = (await server.executeOperation(
      {
        query: questions,
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('questions');
    expect(bodyData.questions[0]).toHaveProperty('_id');
    expect(bodyData.questions[0]).toHaveProperty('ask');
    expect(bodyData.questions[0]).toHaveProperty('answer');
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

    const res = (await server.executeOperation(
      {
        query: questions,
        variables: {
          ask: 'ask test',
          answer: 'answer test',
        },
      },
      {
        contextValue: {
          dataSources,
        },
      },
    )) as SingleGraphQLResponse<any>;

    const bodyData = res.body.singleResult.data;

    expect(bodyData).toHaveProperty('createQuestion');
    expect(bodyData.createQuestion).toHaveProperty('_id');
    expect(bodyData.createQuestion).toHaveProperty('ask');
    expect(bodyData.createQuestion).toHaveProperty('answer');
  });
});
