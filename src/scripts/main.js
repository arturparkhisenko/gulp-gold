import moduleExample from './module-example';

console.info('%c gulp-gold ', 'background: #333; color: #DCCD69'); // eslint-disable-line

moduleExample();

class TestNewFeatures {
  constructor() {
    this.data = ['Hello'];

    const x = { x: 0 };
    const y = { y: 1 };
    const z = { x, ...y };
    console.log(z); // eslint-disable-line
  }

  static staticProperty = '_';

  instanceProperty = 'world!';

  run = () => {
    const { data } = this;
    console.log('Test', ...data); // eslint-disable-line
  };
}

const t = new TestNewFeatures();
t.run();
