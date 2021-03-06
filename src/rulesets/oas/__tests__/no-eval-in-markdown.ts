import { Spectral } from '../../../spectral';
import { commonOasRules } from '../index';

const ruleset = { rules: commonOasRules() };

describe('no-eval-in-markdown', () => {
  const s = new Spectral();
  s.addRules({
    'no-eval-in-markdown': Object.assign(ruleset.rules['no-eval-in-markdown'], {
      enabled: true,
    }),
  });

  test('validate a correct object', async () => {
    const results = await s.run({
      swagger: '2.0',
      paths: {},
      info: {
        title: 'some title text',
        description: 'some description text',
      },
    });
    expect(results.length).toEqual(0);
  });

  test('return errors if descriptions or titles include eval', async () => {
    const results = await s.run({
      swagger: '2.0',
      paths: {},
      info: {
        title: 'some title contains eval(',
        description: 'some description contains eval(',
      },
    });
    expect(results).toMatchSnapshot();
  });
});
