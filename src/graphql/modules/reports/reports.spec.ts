import { gql, executeOperation } from '../../../mocks/serverMock';

describe('Reports', () => {
  const GET_REPORTS_BY_TYPE = gql`
    query getReportsByType($walletID: ID!, $type: Type!) {
      getReportsByType(walletID: $walletID, type: $type) {
        _id
        key
        value
        color
      }
    }
  `;

  describe('Queries', () => {
    it('should return reports by class', async () => {
      const res = await executeOperation(GET_REPORTS_BY_TYPE, {
        walletID: 'a',
        type: 'CLASS',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getReportsByType');
      expect(bodyData.getReportsByType[0]).toHaveProperty('_id');
      expect(bodyData.getReportsByType[0]).toHaveProperty('key');
      expect(bodyData.getReportsByType[0]).toHaveProperty('value');
      expect(bodyData.getReportsByType[0]).toHaveProperty('color');
    });

    it('should return reports by ticket', async () => {
      const res = await executeOperation(GET_REPORTS_BY_TYPE, {
        walletID: 'a',
        type: 'TICKET',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getReportsByType');
      expect(bodyData.getReportsByType[0]).toHaveProperty('_id');
      expect(bodyData.getReportsByType[0]).toHaveProperty('key');
      expect(bodyData.getReportsByType[0]).toHaveProperty('value');
      expect(bodyData.getReportsByType[0]).toHaveProperty('color');
    });

    it('should return reports by sector', async () => {
      const res = await executeOperation(GET_REPORTS_BY_TYPE, {
        walletID: 'a',
        type: 'SECTOR',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getReportsByType');
      expect(bodyData.getReportsByType[0]).toHaveProperty('_id');
      expect(bodyData.getReportsByType[0]).toHaveProperty('key');
      expect(bodyData.getReportsByType[0]).toHaveProperty('value');
      expect(bodyData.getReportsByType[0]).toHaveProperty('color');
    });

    it('should return reports by industry', async () => {
      const res = await executeOperation(GET_REPORTS_BY_TYPE, {
        walletID: 'a',
        type: 'INDUSTRY',
      });

      const bodyData = res.body.singleResult.data;

      expect(bodyData).toHaveProperty('getReportsByType');
      expect(bodyData.getReportsByType[0]).toHaveProperty('_id');
      expect(bodyData.getReportsByType[0]).toHaveProperty('key');
      expect(bodyData.getReportsByType[0]).toHaveProperty('value');
      expect(bodyData.getReportsByType[0]).toHaveProperty('color');
    });
  });

  describe('Error Cases', () => {
    it('should return error if not exist enum', async () => {
      const res = await executeOperation(GET_REPORTS_BY_TYPE, {
        walletID: 'a',
        type: 'NOT_EXIST',
      });

      const bodyData = res.body.singleResult?.errors?.[0];

      expect(bodyData?.message).toBe(
        'Variable "$type" got invalid value "NOT_EXIST"; Value "NOT_EXIST" does not exist in "Type" enum.',
      );

      expect(bodyData?.extensions?.code).toBe('BAD_USER_INPUT');
    });
  });
});
