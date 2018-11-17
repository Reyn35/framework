import { Spec } from '@hayspec/spec';
import { Cert } from '../../../core/cert';

interface Data {
  schema: any;
}

const spec = new Spec<Data>();

spec.before((ctx) => {
  ctx.set('schema', {
    type: 'object',
    properties: {
      'book': {
        type: 'object',
        properties: {
          'title': {
            type: 'string',
          },
          'date': {
            type: 'string',
          },
          'similar': {
            type: 'object',
            properties: {
              'title': {
                type: 'string',
              },
            },
          }
        },
      },
      // 'books': {
      //   type: 'array',
      //   items: {
      //     type: 'object',
      //     properties: {
      //       'title': {
      //         type: 'string',
      //       },
      //       'date': {
      //         type: 'string',
      //       },
      //     },
      //   },
      // },
      'name': {
        type: 'string',
      },
      // 'tags': {
      //   type: 'array',
      //   items: {
      //     type: 'string',
      //   },
      // },
    },
  });
});

spec.test('creates evidence object from selected JSON paths', async (ctx) => {
  const cert = new Cert({
    schema: ctx.get('schema'),
  });
  const data = {
    book: { title: 'fooA', date: 'fooB', similar: { title: 'fooC' } },
    // books: [
    //   { title: 'bar0', date: 'bar0' },
    //   { title: 'bar1', date: 'bar1' },
    // ],
    name: 'name',
    // tags: [1, 2],
  };
  // const recipe = await cert.notarize(data);
  const evidence = await cert.disclose(data, [
    ['book', 'similar', 'title']
    // ['books', 1, 'title']
  ]);
  // const imprint = await cert.imprint(data, evidence);

  console.log();
  console.log('-------X');
  console.log(
    // recipe
    evidence
  );
  console.log(
    // imprint, recipe[0].evidence.nodes[0]
  );
  console.log('-------');
});

export default spec;
